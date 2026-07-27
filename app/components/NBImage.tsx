"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { Box, Typography } from "@mui/material";
import { NB_COLORS, NB_MONO_SX } from "@/lib/theme";

/**
 * next/image wrapper that renders a neobrutalist loading placeholder until the
 * image reports loaded, then fades it in. Parent must be `position: relative`
 * (these are always used with `fill`).
 */
export default function NBImage({ style, onLoad, alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: NB_COLORS.silverLight,
          }}
        >
          <Typography
            sx={{
              ...NB_MONO_SX,
              fontSize: 11,
              color: NB_COLORS.steel,
              animation: "nb-pulse 1.2s ease-in-out infinite",
            }}
          >
            LOADING
          </Typography>
        </Box>
      )}
      <Image
        {...props}
        alt={alt}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transition: "opacity 300ms ease",
        }}
      />
    </>
  );
}
