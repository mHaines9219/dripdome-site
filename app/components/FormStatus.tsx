"use client";

import { Box, Typography } from "@mui/material";
import { NB_COLORS, NB_MONO_SX, NB_RULE, nbShadow } from "@/lib/theme";

export type FormStatusState = {
  type: "success" | "error";
  message: string;
} | null;

/**
 * Inline form feedback in the NB visual language. The wrapper stays
 * mounted with role="status" so screen readers announce updates.
 */
export default function FormStatus({ status }: { status: FormStatusState }) {
  return (
    <Box role="status" aria-live="polite">
      {status && (
        <Box
          sx={{
            border: NB_RULE,
            boxShadow: nbShadow(4),
            px: 2.5,
            py: 1.75,
            bgcolor:
              status.type === "success" ? NB_COLORS.ink : NB_COLORS.surface,
          }}
        >
          <Typography
            sx={{
              ...NB_MONO_SX,
              fontSize: 12,
              fontWeight: 700,
              lineHeight: 1.6,
              color:
                status.type === "success"
                  ? NB_COLORS.paperOnInk
                  : NB_COLORS.ink,
            }}
          >
            {status.message}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
