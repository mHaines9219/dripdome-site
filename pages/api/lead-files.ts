import type { NextApiRequest, NextApiResponse } from "next";
import {
  isDriveConfigured,
  listFolderFiles,
  readFileHead,
  trashFile,
  verifyFinalizeToken,
} from "@/lib/drive";
import { ALLOWED_FILE_TYPES, MAX_FILE_BYTES, sniffFileKind } from "@/lib/leadFiles";

/**
 * Called by the contact form after its files reach Drive. The browser
 * uploads straight to Drive, so this is where the server finally sees the
 * bytes: anything whose magic bytes are not the image or PDF it claimed to
 * be (or that is oversized) is moved to the shared drive's trash.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { leadId, folderId, token } = req.body ?? {};
  if (
    typeof leadId !== "string" ||
    typeof folderId !== "string" ||
    !isDriveConfigured() ||
    !verifyFinalizeToken(leadId, folderId, token)
  ) {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const files = await listFolderFiles(folderId);
    let kept = 0;
    const removed: string[] = [];
    for (const file of files) {
      const expected = ALLOWED_FILE_TYPES[file.mimeType];
      const tooBig = Number(file.size ?? 0) > MAX_FILE_BYTES;
      const kind = expected && !tooBig ? sniffFileKind(await readFileHead(file.id)) : null;
      if (kind && kind === expected) {
        kept += 1;
      } else {
        await trashFile(file.id);
        removed.push(file.name);
      }
    }
    if (removed.length) {
      console.warn(`Lead ${leadId}: removed ${removed.length} file(s) that failed checks`);
    }
    return res.status(200).json({ kept, removed });
  } catch (error) {
    console.error("Lead file check error:", error);
    return res.status(500).json({ error: "Could not check files" });
  }
}
