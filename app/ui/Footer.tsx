"use client";

import React from "react";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Box, Container, IconButton, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "black", py: 2 }}>
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
              bgcolor: "rgba(0,0,0,0.6)",
              borderRadius: 2,
              p: 1,
              color: "common.white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.75)", color: "#E5C767" },
            }}
          >
            <InstagramIcon sx={{ width: 28, height: 28 }} />
          </IconButton>

          <Typography
            component={Link}
            href="/privacy"
            sx={{
              color: "grey.500",
              textDecoration: "none",
              fontSize: 14,
              "&:hover": { color: "grey.300" },
            }}
          >
            Privacy Policy
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
