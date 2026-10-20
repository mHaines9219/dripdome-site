"use client";

import { useId, useState, type DragEvent } from "react";
import { Box, Button, Typography } from "@mui/material";
import {
  ALLOWED_FILE_TYPES,
  FILE_ACCEPT,
  MAX_FILE_BYTES,
  MAX_FILES,
  MAX_TOTAL_BYTES,
  SNIFF_BYTES,
  formatBytes,
  resolveFileType,
  sniffFileKind,
} from "@/lib/leadFiles";
import { readHead } from "@/lib/uploadToDrive";
import {
  NB_BUTTON_OUTLINE_SX,
  NB_COLORS,
  NB_FIELD_LABEL_SX,
  NB_MONO_SX,
  NB_RULE,
  nbShadow,
} from "@/lib/theme";

export type AttachedFile = {
  id: string;
  file: File;
  type: string;
  /** 0 to 1 while uploading */
  progress: number;
  state: "ready" | "uploading" | "done" | "failed";
};

let nextId = 0;

/**
 * Attachment picker for the intake form: tap to browse or drop files.
 * Checks type, size and magic bytes before anything is uploaded; the
 * server checks again once the files are in Drive.
 */
export default function FileDrop({
  files,
  onChange,
  disabled,
}: {
  files: AttachedFile[];
  onChange: (files: AttachedFile[]) => void;
  disabled: boolean;
}) {
  const inputId = useId();
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const addFiles = async (incoming: FileList | null) => {
    if (!incoming || disabled) return;
    const next = [...files];
    const problems: string[] = [];
    for (const file of Array.from(incoming)) {
      const type = resolveFileType(file.name, file.type);
      const expected = ALLOWED_FILE_TYPES[type];
      const total = next.reduce((sum, item) => sum + item.file.size, 0) + file.size;
      if (next.length >= MAX_FILES) {
        problems.push(`UP TO ${MAX_FILES} FILES`);
        break;
      }
      if (!expected) {
        problems.push(`${file.name}: IMAGES AND PDFS ONLY`);
        continue;
      }
      if (file.size === 0 || file.size > MAX_FILE_BYTES) {
        problems.push(`${file.name}: 25MB MAX`);
        continue;
      }
      if (total > MAX_TOTAL_BYTES) {
        problems.push(`${file.name}: 100MB TOTAL MAX`);
        continue;
      }
      if (sniffFileKind(await readHead(file, SNIFF_BYTES)) !== expected) {
        problems.push(`${file.name}: NOT A VALID IMAGE OR PDF`);
        continue;
      }
      nextId += 1;
      next.push({ id: `file-${nextId}`, file, type, progress: 0, state: "ready" });
    }
    setError(problems.join(" · "));
    onChange(next);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    void addFiles(event.dataTransfer.files);
  };

  return (
    <Box>
      <Typography component="label" htmlFor={inputId} sx={NB_FIELD_LABEL_SX}>
        PLANS, SKETCHES, PHOTOS OF THE SPACE (OPTIONAL)
      </Typography>
      <Box
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        sx={{
          border: NB_RULE,
          bgcolor: dragging ? NB_COLORS.silverLight : NB_COLORS.surface,
          boxShadow: dragging ? nbShadow(4) : "none",
          p: { xs: 2, md: 2.5 },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
        }}
      >
        <Button
          component="label"
          htmlFor={inputId}
          disableElevation
          disabled={disabled || files.length >= MAX_FILES}
          sx={{ ...NB_BUTTON_OUTLINE_SX, px: 2.5, py: 1.25, fontSize: 12, flexShrink: 0 }}
        >
          + ADD FILES
        </Button>
        <Typography sx={{ ...NB_MONO_SX, fontSize: 11, color: NB_COLORS.steel, lineHeight: 1.6 }}>
          OR DROP THEM HERE · JPG, PNG, HEIC, WEBP, PDF · 25MB EACH · UP TO {MAX_FILES}
        </Typography>
        <input
          id={inputId}
          type="file"
          multiple
          accept={FILE_ACCEPT}
          disabled={disabled}
          onChange={(event) => {
            void addFiles(event.currentTarget.files);
            event.currentTarget.value = "";
          }}
          style={{ display: "none" }}
        />
      </Box>

      {error && (
        <Typography
          role="alert"
          sx={{ ...NB_MONO_SX, fontSize: 11, fontWeight: 700, color: NB_COLORS.ink, mt: 1 }}
        >
          {error}
        </Typography>
      )}

      {files.length > 0 && (
        <Box component="ul" sx={{ listStyle: "none", m: 0, mt: 1, p: 0 }}>
          {files.map((item) => (
            <Box
              component="li"
              key={item.id}
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                border: NB_RULE,
                borderTop: 0,
                "&:first-of-type": { borderTop: NB_RULE },
                px: 1.5,
                minHeight: 44,
                bgcolor: NB_COLORS.surface,
                overflow: "hidden",
              }}
            >
              {/* Progress fill */}
              <Box
                aria-hidden
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: `${Math.round(item.progress * 100)}%`,
                  bgcolor: NB_COLORS.silverLight,
                  transition: "width 120ms linear",
                }}
              />
              <Typography
                sx={{
                  ...NB_MONO_SX,
                  position: "relative",
                  flex: 1,
                  minWidth: 0,
                  fontSize: 11,
                  color: NB_COLORS.ink,
                  textTransform: "none",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.file.name}
              </Typography>
              <Typography
                sx={{ ...NB_MONO_SX, position: "relative", fontSize: 11, color: NB_COLORS.steel }}
              >
                {item.state === "done"
                  ? "SENT"
                  : item.state === "failed"
                    ? "FAILED"
                    : item.state === "uploading"
                      ? `${Math.round(item.progress * 100)}%`
                      : formatBytes(item.file.size)}
              </Typography>
              {item.state === "ready" && (
                <Box
                  component="button"
                  type="button"
                  disabled={disabled}
                  aria-label={`Remove ${item.file.name}`}
                  onClick={() => onChange(files.filter((other) => other.id !== item.id))}
                  sx={{
                    ...NB_MONO_SX,
                    position: "relative",
                    width: 32,
                    height: 32,
                    border: NB_RULE,
                    bgcolor: "transparent",
                    color: NB_COLORS.ink,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    "&:hover": { bgcolor: NB_COLORS.ink, color: NB_COLORS.paperOnInk },
                    "&:focus-visible": {
                      outline: `3px solid ${NB_COLORS.silver}`,
                      outlineOffset: "2px",
                    },
                  }}
                >
                  ×
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
