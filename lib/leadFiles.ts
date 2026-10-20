/**
 * Rules for files attached to a lead. Files go from the browser straight to
 * Google Drive (see lib/drive.ts), so these limits are enforced three times:
 * in the form before upload, in /api/contact when it opens the Drive upload
 * sessions (Drive itself then refuses a body of a different size), and in
 * /api/lead-files, which re-reads each file's first bytes from Drive and
 * deletes anything that is not really an image or PDF.
 *
 * Safe to import from client components.
 */

export const MAX_FILES = 10;
export const MAX_FILE_BYTES = 25 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 100 * 1024 * 1024;

/** Declared MIME type to the kind its magic bytes must match. */
export const ALLOWED_FILE_TYPES: Record<string, FileKind> = {
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/heic": "heic",
  "image/heif": "heic",
  "application/pdf": "pdf",
};

/** For the file picker's accept attribute. Extensions help iOS offer HEIC. */
export const FILE_ACCEPT =
  "image/jpeg,image/png,image/gif,image/webp,image/heic,image/heif,application/pdf,.jpg,.jpeg,.png,.gif,.webp,.heic,.heif,.pdf";

/** Bytes needed to tell the allowed kinds apart. */
export const SNIFF_BYTES = 16;

export type FileKind = "jpeg" | "png" | "gif" | "webp" | "heic" | "pdf";

export type FileManifestEntry = { name: string; size: number; type: string };

const ascii = (bytes: Uint8Array, start: number, end: number) =>
  String.fromCharCode(...bytes.slice(start, end));

/** Identifies a file from its leading bytes, or null if it is none of ours. */
export function sniffFileKind(bytes: Uint8Array): FileKind | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "jpeg";
  }
  if (
    bytes.length >= 8 &&
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((b, i) => bytes[i] === b)
  ) {
    return "png";
  }
  if (bytes.length >= 6 && (ascii(bytes, 0, 6) === "GIF87a" || ascii(bytes, 0, 6) === "GIF89a")) {
    return "gif";
  }
  if (bytes.length >= 12 && ascii(bytes, 0, 4) === "RIFF" && ascii(bytes, 8, 12) === "WEBP") {
    return "webp";
  }
  if (bytes.length >= 12 && ascii(bytes, 4, 8) === "ftyp") {
    const brand = ascii(bytes, 8, 12);
    if (["heic", "heix", "hevc", "hevx", "heim", "heis", "mif1", "msf1"].includes(brand)) {
      return "heic";
    }
  }
  if (bytes.length >= 5 && ascii(bytes, 0, 5) === "%PDF-") {
    return "pdf";
  }
  return null;
}

/** Browsers often leave HEIC's type blank; fall back to the extension. */
export function resolveFileType(name: string, type: string): string {
  if (type) return type.toLowerCase();
  const ext = name.toLowerCase().split(".").pop();
  const byExt: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    heic: "image/heic",
    heif: "image/heif",
    pdf: "application/pdf",
  };
  return (ext && byExt[ext]) || "";
}

/** Strips path parts and control characters, and caps the length. */
export function cleanFileName(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? "";
  const cleaned = base.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 150);
  return cleaned || "file";
}

/**
 * Validates the file list a form sends before upload. Returns the cleaned
 * manifest, or an error message a person can act on.
 */
export function checkManifest(
  raw: unknown
): { ok: true; files: FileManifestEntry[] } | { ok: false; error: string } {
  if (raw === undefined || raw === null) return { ok: true, files: [] };
  if (!Array.isArray(raw)) return { ok: false, error: "Invalid file list" };
  if (raw.length > MAX_FILES) return { ok: false, error: `Attach up to ${MAX_FILES} files` };

  const files: FileManifestEntry[] = [];
  let total = 0;
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") return { ok: false, error: "Invalid file list" };
    const { name, size, type } = entry as Record<string, unknown>;
    if (typeof name !== "string" || typeof size !== "number" || typeof type !== "string") {
      return { ok: false, error: "Invalid file list" };
    }
    const resolved = resolveFileType(name, type);
    if (!ALLOWED_FILE_TYPES[resolved]) {
      return { ok: false, error: "Only images and PDFs can be attached" };
    }
    if (!Number.isInteger(size) || size <= 0 || size > MAX_FILE_BYTES) {
      return { ok: false, error: "Each file must be 25MB or smaller" };
    }
    total += size;
    files.push({ name: cleanFileName(name), size, type: resolved });
  }
  if (total > MAX_TOTAL_BYTES) return { ok: false, error: "Attachments must total 100MB or less" };
  return { ok: true, files };
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}
