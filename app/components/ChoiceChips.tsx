"use client";

import { Box, Typography } from "@mui/material";
import type { LeadOption } from "@/lib/leadFields";
import { NB_COLORS, NB_FIELD_LABEL_SX, NB_MONO_SX, NB_RULE, nbShadow } from "@/lib/theme";

/**
 * Single-choice question rendered as square NB chips. Native radios under
 * the hood, so required-field validation, keyboard arrows, form.reset()
 * and FormData all work without extra state.
 */
export default function ChoiceChips({
  name,
  label,
  options,
  required = false,
  defaultValue,
}: {
  name: string;
  label: string;
  options: LeadOption[];
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <Box component="fieldset" sx={{ border: 0, m: 0, p: 0, minWidth: 0 }}>
      <Typography component="legend" sx={{ ...NB_FIELD_LABEL_SX, p: 0 }}>
        {label}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {options.map((option) => (
          <Box
            key={option.value}
            component="label"
            sx={{
              ...NB_MONO_SX,
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              minHeight: 44,
              px: 1.75,
              fontSize: 12,
              fontWeight: 700,
              border: NB_RULE,
              bgcolor: NB_COLORS.surface,
              color: NB_COLORS.ink,
              cursor: "pointer",
              userSelect: "none",
              transition: "transform 80ms ease, box-shadow 80ms ease",
              "&:hover": { boxShadow: nbShadow(3) },
              "&:has(input:checked)": {
                bgcolor: NB_COLORS.ink,
                color: NB_COLORS.paperOnInk,
                boxShadow: nbShadow(3, NB_COLORS.steel),
              },
              "&:has(input:focus-visible)": {
                outline: `3px solid ${NB_COLORS.silver}`,
                outlineOffset: "2px",
              },
            }}
          >
            <Box
              component="input"
              type="radio"
              name={name}
              value={option.value}
              required={required}
              defaultChecked={option.value === defaultValue}
              sx={{
                // Visually hidden but still focusable, so the browser can
                // point its "please select one" bubble at the group
                position: "absolute",
                inset: 0,
                m: 0,
                opacity: 0,
                cursor: "pointer",
              }}
            />
            {option.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
