import { createHmac, createSign, timingSafeEqual } from "crypto";
import { SNIFF_BYTES, type FileManifestEntry } from "@/lib/leadFiles";

/**
 * Server-only Google Drive client for lead attachments. A service account
 * (shared into a Workspace shared drive) creates one folder per lead and a
 * resumable upload session per file; the browser then PUTs each file to its
 * session URL, so attachments never pass through Vercel's request limit.
 *
 * Env (see the Drive setup guide in the PR):
 *   GOOGLE_DRIVE_CLIENT_EMAIL     service account email
 *   GOOGLE_DRIVE_PRIVATE_KEY      its private key (literal \n is fine)
 *   GOOGLE_DRIVE_LEADS_FOLDER_ID  shared drive or folder that holds lead folders
 */

const DRIVE_API = "https://www.googleapis.com/drive/v3";
const UPLOAD_API = "https://www.googleapis.com/upload/drive/v3";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const FOLDER_MIME = "application/vnd.google-apps.folder";

/** How long the browser has to finish uploads and call /api/lead-files. */
const FINALIZE_WINDOW_MS = 2 * 60 * 60 * 1000;

function config() {
  const clientEmail = process.env.GOOGLE_DRIVE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const parentId = process.env.GOOGLE_DRIVE_LEADS_FOLDER_ID;
  if (!clientEmail || !privateKey || !parentId) return null;
  return { clientEmail, privateKey, parentId };
}

export function isDriveConfigured() {
  return config() !== null;
}

const base64url = (input: string | Buffer) => Buffer.from(input).toString("base64url");

let cachedToken: { value: string; expiresAt: number } | null = null;

async function accessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;
  const cfg = config();
  if (!cfg) throw new Error("Google Drive is not configured");

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: cfg.clientEmail,
      scope: "https://www.googleapis.com/auth/drive",
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    })
  );
  const signature = createSign("RSA-SHA256")
    .update(`${header}.${claims}`)
    .sign(cfg.privateKey)
    .toString("base64url");

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claims}.${signature}`,
    }).toString(),
  });
  const data = (await response.json()) as { access_token?: string; expires_in?: number };
  if (!response.ok || !data.access_token) {
    throw new Error(`Drive token request failed (${response.status})`);
  }
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  };
  return cachedToken.value;
}

async function driveFetch(url: string, init: RequestInit = {}) {
  const token = await accessToken();
  return fetch(url, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...(init.headers ?? {}) },
  });
}

export function folderUrl(folderId: string) {
  return `https://drive.google.com/drive/folders/${folderId}`;
}

/** Creates the lead's folder, e.g. "2026-10-21 Jane Smith (a1b2c3d4)". */
export async function createLeadFolder(leadName: string, leadId: string): Promise<string> {
  const cfg = config();
  if (!cfg) throw new Error("Google Drive is not configured");
  const date = new Date().toISOString().slice(0, 10);
  const safeName = leadName.replace(/[\u0000-\u001f\u007f/\\]/g, " ").trim().slice(0, 80);
  const response = await driveFetch(`${DRIVE_API}/files?supportsAllDrives=true&fields=id`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: `${date} ${safeName} (${leadId.slice(0, 8)})`,
      mimeType: FOLDER_MIME,
      parents: [cfg.parentId],
      description: `Website lead ${leadId}`,
    }),
  });
  const data = (await response.json()) as { id?: string };
  if (!response.ok || !data.id) {
    throw new Error(`Drive folder create failed (${response.status})`);
  }
  return data.id;
}

/**
 * Opens a resumable upload session for one file. Drive rejects a body that
 * does not match the declared length, so the size cap holds. `origin` must
 * be the visitor's page origin or the browser's PUT is blocked by CORS.
 */
export async function createUploadSession(
  folderId: string,
  file: FileManifestEntry,
  origin: string
): Promise<string> {
  const response = await driveFetch(
    `${UPLOAD_API}/files?uploadType=resumable&supportsAllDrives=true&fields=id`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "X-Upload-Content-Type": file.type,
        "X-Upload-Content-Length": String(file.size),
        Origin: origin,
      },
      body: JSON.stringify({ name: file.name, parents: [folderId], mimeType: file.type }),
    }
  );
  const location = response.headers.get("location");
  if (!response.ok || !location) {
    throw new Error(`Drive upload session failed (${response.status})`);
  }
  return location;
}

export type DriveFile = { id: string; name: string; mimeType: string; size?: string };

export async function listFolderFiles(folderId: string): Promise<DriveFile[]> {
  const params = new URLSearchParams({
    q: `'${folderId.replace(/[^\w-]/g, "")}' in parents and trashed = false`,
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
    corpora: "allDrives",
    fields: "files(id,name,mimeType,size)",
    pageSize: "100",
  });
  const response = await driveFetch(`${DRIVE_API}/files?${params}`);
  const data = (await response.json()) as { files?: DriveFile[] };
  if (!response.ok) throw new Error(`Drive list failed (${response.status})`);
  return data.files ?? [];
}

/** First bytes of a file, for checking magic bytes after upload. */
export async function readFileHead(fileId: string): Promise<Uint8Array> {
  const response = await driveFetch(
    `${DRIVE_API}/files/${encodeURIComponent(fileId)}?alt=media&supportsAllDrives=true`,
    { headers: { Range: `bytes=0-${SNIFF_BYTES - 1}` } }
  );
  if (!response.ok) throw new Error(`Drive read failed (${response.status})`);
  return new Uint8Array(await response.arrayBuffer()).slice(0, SNIFF_BYTES);
}

export async function trashFile(fileId: string): Promise<void> {
  const response = await driveFetch(
    `${DRIVE_API}/files/${encodeURIComponent(fileId)}?supportsAllDrives=true`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trashed: true }),
    }
  );
  if (!response.ok) throw new Error(`Drive trash failed (${response.status})`);
}

/**
 * Origins allowed to PUT straight to Drive: the live site, Vercel previews
 * and local dev, plus any in LEAD_UPLOAD_ORIGINS (comma separated).
 */
export function allowedUploadOrigin(origin: unknown): string | null {
  if (typeof origin !== "string") return null;
  let url: URL;
  try {
    url = new URL(origin);
  } catch {
    return null;
  }
  const host = url.hostname.toLowerCase();
  const extra = (process.env.LEAD_UPLOAD_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  const ok =
    (url.protocol === "https:" &&
      (host === "dripdome.com" || host.endsWith(".dripdome.com") || host.endsWith(".vercel.app"))) ||
    ((url.protocol === "http:" || url.protocol === "https:") &&
      (host === "localhost" || host === "127.0.0.1")) ||
    extra.includes(url.origin.toLowerCase());
  return ok ? url.origin : null;
}

/* Finalize token: proves a /api/lead-files call is for a folder this server
   created for a verified lead, without storing anything. */

function tokenKey() {
  const cfg = config();
  if (!cfg) throw new Error("Google Drive is not configured");
  return createHmac("sha256", cfg.privateKey).update("lead-files-finalize").digest();
}

export function signFinalizeToken(leadId: string, folderId: string): string {
  const expires = Date.now() + FINALIZE_WINDOW_MS;
  const mac = createHmac("sha256", tokenKey())
    .update(`${leadId}.${folderId}.${expires}`)
    .digest("base64url");
  return `${expires}.${mac}`;
}

export function verifyFinalizeToken(leadId: string, folderId: string, token: unknown): boolean {
  if (typeof token !== "string") return false;
  const [expiresRaw, mac] = token.split(".");
  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || expires < Date.now() || !mac) return false;
  const expected = createHmac("sha256", tokenKey())
    .update(`${leadId}.${folderId}.${expires}`)
    .digest();
  const given = Buffer.from(mac, "base64url");
  return given.length === expected.length && timingSafeEqual(given, expected);
}
