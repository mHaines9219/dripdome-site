"use client";

import { useEffect, useRef, useState, type Ref } from "react";
import { Box } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

/**
 * Mounts the reCAPTCHA widget (and its ~350 KB of Google script) only once
 * the form scrolls near the viewport, so it never costs page load.
 */
export default function LazyRecaptcha({ ref }: { ref: Ref<ReCAPTCHA> }) {
  const anchor = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = anchor.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={anchor}
      sx={{
        minHeight: 78,
        display: "flex",
        justifyContent: { xs: "center", md: "flex-start" },
      }}
    >
      {visible && (
        <ReCAPTCHA
          ref={ref}
          theme="dark"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
        />
      )}
    </Box>
  );
}
