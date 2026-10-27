"use client";

import { useId } from "react";
import { Box } from "@mui/material";
import { HONEYPOT_FIELD } from "@/lib/leadScreen";

/**
 * Off-screen field that only bots fill in. Hidden from sighted users,
 * screen readers, keyboard focus and password managers.
 */
export default function HoneypotField() {
  const id = useId();
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        left: "-10000px",
        top: "auto",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    >
      <label htmlFor={id}>Leave this field empty</label>
      <input
        id={id}
        type="text"
        name={HONEYPOT_FIELD}
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </Box>
  );
}
