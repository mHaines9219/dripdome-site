import type { IncomingMessage } from "http";
import { SNIFF_BYTES, type FileManifestEntry } from "@/lib/leadFiles";

/**
 * Server-only Google Drive client for lead attachments. A service account
 * (shared into a Workspace shared drive) creates one folder per lead and a
 * resumable upload session per file; the browser then PUTs each file to its
 * session URL, so attachments never pass through Vercel's request limit.
 *
 * No key file: the function signs in with Vercel's OIDC token through Google
 * Workload Identity Federation, then impersonates the service account.
 *
 * Env (see the Drive setup guide in the PR):
 *   GCP_PROJECT_NUMBER                     Google Cloud project number
 *   GCP_WORKLOAD_IDENTITY_POOL_ID          e.g. "vercel"
 *   GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID e.g. "vercel"
 *   GOOGLE_DRIVE_CLIENT_EMAIL              service account email
 *   GOOGLE_DRIVE_LEADS_FOLDER_ID           shared drive or folder that holds lead folders
 */

const DRIVE_API = "https://www.googleapis.com/drive/v3";
const UPLOAD_API = "https://www.googleapis.com/upload/drive/v3";
const STS_URL = "https://sts.googleapis.com/v1/token";
const FOLDER_MIME = "application/vnd.google-apps.folder";

/** How long after the lead the browser may ask for its files to be checked. */
const FINALIZE_WINDOW_MS = 2 * 60 * 60 * 1000;

function config() {
  const projectNumber = process.env.GCP_PROJECT_NUMBER;
  const poolId = process.env.GCP_WORKLOAD_IDENTITY_POOL_ID;
  const providerId = process.env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID;
  const clientEmail = process.env.GOOGLE_DRIVE_CLIENT_EMAIL;
  const parentId = process.env.GOOGLE_DRIVE_LEADS_FOLDER_ID;
  if (!projectNumber || !poolId || !providerId || !clientEmail || !parentId) return null;
  return {
    audience: `//iam.googleapis.com/projects/${projectNumber}/locations/global/workloadIdentityPools/${poolId}/providers/${providerId}`,
    clientEmail,
    parentId,
  };
}

export function isDriveConfigured() {
  return config() !== null;
}

/*
 * Vercel hands each function invocation an OIDC token in the
 * x-vercel-oidc-token header (VERCEL_OIDC_TOKEN in local dev via
 * `vercel env pull`). Any current token for this project is equally valid,
 * so remembering the latest one is safe across concurrent requests.
 */
let oidcToken = "";

export function rememberOidcToken(req: IncomingMessage) {
  const header = req.headers["x-vercel-oidc-token"];
  const token = Array.isArray(header) ? header[0] : header;
  if (token) oidcToken = token;
}

let cachedToken: { value: string; expiresAt: number } | null = null;

async function accessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;
  const cfg = config();
  if (!cfg) throw new Error("Google Drive is not configured");
  const subjectToken = oidcToken || process.env.VERCEL_OIDC_TOKEN;
  if (!subjectToken) throw new Error("No Vercel OIDC token (is OIDC federation enabled?)");

  // 1. Vercel OIDC token -> federated Google token
  const sts = await fetch(STS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grantType: "urn:ietf:params:oauth:grant-type:token-exchange",
      audience: cfg.audience,
      scope: "https://www.googleapis.com/auth/cloud-platform",
      requestedTokenType: "urn:ietf:params:oauth:token-type:access_token",
      subjectToken,
      subjectTokenType: "urn:ietf:params:oauth:token-type:jwt",
    }),
  });
  const federated = (await sts.json()) as { access_token?: string };
  if (!sts.ok || !federated.access_token) {
    throw new Error(`Google token exchange failed (${sts.status})`);
  }

  // 2. Federated token -> short-lived service account token for Drive
  const impersonate = await fetch(
    `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${encodeURIComponent(cfg.clientEmail)}:generateAccessToken`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${federated.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scope: ["https://www.googleapis.com/auth/drive"], lifetime: "3600s" }),
    }
  );
  const data = (await impersonate.json()) as { accessToken?: string; expireTime?: string };
  if (!impersonate.ok || !data.accessToken) {
    throw new Error(`Service account impersonation failed (${impersonate.status})`);
  }
  cachedToken = {
    value: data.accessToken,
    expiresAt: data.expireTime ? Date.parse(data.expireTime) : Date.now() + 3600_000,
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
      description: leadFolderDescription(leadId),
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

/**
 * Confirms a folder is a lead folder this server made for `leadId` in the
 * last couple of hours, so /api/lead-files can only touch fresh lead
 * uploads. Folder IDs are unguessable and the check only removes invalid
 * files, so no extra secret is needed.
 */
export async function isFreshLeadFolder(folderId: string, leadId: string): Promise<boolean> {
  const cfg = config();
  if (!cfg) return false;
  const response = await driveFetch(
    `${DRIVE_API}/files/${encodeURIComponent(folderId)}?supportsAllDrives=true&fields=mimeType,parents,description,createdTime,trashed`
  );
  if (!response.ok) return false;
  const folder = (await response.json()) as {
    mimeType?: string;
    parents?: string[];
    description?: string;
    createdTime?: string;
    trashed?: boolean;
  };
  return (
    folder.mimeType === FOLDER_MIME &&
    !folder.trashed &&
    (folder.parents ?? []).includes(cfg.parentId) &&
    folder.description === leadFolderDescription(leadId) &&
    Date.now() - Date.parse(folder.createdTime ?? "") < FINALIZE_WINDOW_MS
  );
}

function leadFolderDescription(leadId: string) {
  return `Website lead ${leadId}`;
}
