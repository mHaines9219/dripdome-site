"use client";

import React from "react";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { ACCENT, INK, PAPER, nbShadow } from "@/lib/theme";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: INK, py: 2.5, borderTop: `4px solid ${ACCENT}` }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton
            component="a"
            href="https://www.instagram.com/dripdome"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="DripDome Instagram"
            sx={{
              bgcolor: INK,
              borderRadius: 0,
              border: `2px solid ${PAPER}`,
              boxShadow: nbShadow(3, ACCENT),
              p: 1,
              color: "common.white",
              transition: "transform 120ms ease, box-shadow 120ms ease",
              "&:hover": {
                bgcolor: ACCENT,
                color: INK,
                transform: "translate(-2px, -2px)",
                boxShadow: nbShadow(5, PAPER),
              },
            }}
          >
            <InstagramIcon sx={{ width: 28, height: 28 }} />
          </IconButton>

          <Typography
            component={Link}
            href="/privacy"
            sx={{
              color: PAPER,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              borderBottom: "2px solid transparent",
              "&:hover": { color: ACCENT, borderBottom: `2px solid ${ACCENT}` },
            }}
          >
            Privacy Policy
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
