"use client";

import React from "react";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Box, Typography } from "@mui/material";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_FOCUS_VISIBLE_SX,
  NB_MONO_SX,
} from "@/lib/theme";

const NAV = [
  { name: "PODCAST STUDIOS", href: "/podcast-studios" },
  { name: "ACTIVATIONS", href: "/brand-activations" },
  { name: "ABOUT", href: "/about-us" },
  { name: "BLOG", href: "/blog" },
];

// Legacy pages: out of the main nav but kept crawlable via the footer
const ARCHIVE = [
  { name: "PORTFOLIO", href: "/portfolio" },
  { name: "SERVICES", href: "/services" },
  { name: "RENTALS", href: "/rentals" },
  { name: "VIDEO + PHOTO", href: "/video-photo" },
];

const STEEL_RULE = `2px solid ${NB_COLORS.mutedOnInk}`;

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: NB_COLORS.ink, color: NB_COLORS.paperOnInk, borderTop: `2px solid ${NB_COLORS.ink}` }}
    >
      {/* Giant wordmark */}
      <Box sx={{ px: { xs: 2, md: 4 }, pt: { xs: 4, md: 6 }, overflow: "hidden" }}>
        <Typography
          aria-hidden
          sx={{
            ...NB_DISPLAY_SX,
            fontSize: { xs: "17vw", md: "11vw" },
            lineHeight: 0.85,
            color: NB_COLORS.paperOnInk,
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          DRIPDOME
        </Typography>
      </Box>

      {/* Link columns */}
      <Box
        sx={{
          borderTop: STEEL_RULE,
          mt: { xs: 3, md: 4 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
        }}
      >
        <Box
          sx={{
            px: { xs: 3, md: 4 },
            py: 3,
            borderRight: { md: STEEL_RULE },
            borderBottom: { xs: STEEL_RULE, md: "none" },
          }}
        >
          <Typography sx={{ ...NB_MONO_SX, fontSize: 11, color: NB_COLORS.mutedOnInk, mb: 1.5 }}>
            INDEX
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 3, rowGap: 1 }}>
            {NAV.map((link) => (
              <Typography
                key={link.href}
                component={Link}
                href={link.href}
                sx={{
                  ...NB_MONO_SX,
                  ...NB_FOCUS_VISIBLE_SX,
                  fontSize: 13,
                  fontWeight: 700,
                  color: NB_COLORS.paperOnInk,
                  textDecoration: "none",
                  "&:hover": { color: NB_COLORS.mutedOnInk },
                }}
              >
                {link.name}
              </Typography>
            ))}
          </Box>

          <Typography
            sx={{ ...NB_MONO_SX, fontSize: 11, color: NB_COLORS.mutedOnInk, mt: 3, mb: 1.5 }}
          >
            ARCHIVE
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 3, rowGap: 1 }}>
            {ARCHIVE.map((link) => (
              <Typography
                key={link.href}
                component={Link}
                href={link.href}
                sx={{
                  ...NB_MONO_SX,
                  ...NB_FOCUS_VISIBLE_SX,
                  fontSize: 13,
                  fontWeight: 700,
                  color: NB_COLORS.paperOnInk,
                  textDecoration: "none",
                  "&:hover": { color: NB_COLORS.mutedOnInk },
                }}
              >
                {link.name}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            px: { xs: 3, md: 4 },
            py: 3,
            borderRight: { md: STEEL_RULE },
            borderBottom: { xs: STEEL_RULE, md: "none" },
          }}
        >
          <Typography sx={{ ...NB_MONO_SX, fontSize: 11, color: NB_COLORS.mutedOnInk, mb: 1.5 }}>
            LOCATIONS
          </Typography>
          <Typography sx={{ ...NB_MONO_SX, fontSize: 13, fontWeight: 700 }}>
            NEW YORK CITY
          </Typography>
          <Typography sx={{ ...NB_MONO_SX, fontSize: 13, fontWeight: 700 }}>
            LOS ANGELES
          </Typography>
        </Box>

        <Box sx={{ px: { xs: 3, md: 4 }, py: 3 }}>
          <Typography sx={{ ...NB_MONO_SX, fontSize: 11, color: NB_COLORS.mutedOnInk, mb: 1.5 }}>
            CONTACT
          </Typography>
          <Typography
            component="a"
            href="mailto:info@dripdome.com"
            sx={{
              ...NB_MONO_SX,
              ...NB_FOCUS_VISIBLE_SX,
              display: "block",
              fontSize: 13,
              fontWeight: 700,
              color: NB_COLORS.paperOnInk,
              textDecoration: "none",
              mb: 1,
              "&:hover": { color: NB_COLORS.mutedOnInk },
            }}
          >
            INFO@DRIPDOME.COM
          </Typography>
          <Box
            component="a"
            href="https://www.instagram.com/dripdome"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="DripDome Instagram"
            sx={{
              ...NB_FOCUS_VISIBLE_SX,
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              color: NB_COLORS.paperOnInk,
              textDecoration: "none",
              "&:hover": { color: NB_COLORS.mutedOnInk },
            }}
          >
            <InstagramIcon sx={{ fontSize: 20 }} />
            <Typography sx={{ ...NB_MONO_SX, fontSize: 13, fontWeight: 700 }}>
              @DRIPDOME
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Fine print */}
      <Box
        sx={{
          borderTop: STEEL_RULE,
          px: { xs: 3, md: 4 },
          py: 1.5,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography sx={{ ...NB_MONO_SX, fontSize: 10, color: NB_COLORS.mutedOnInk }}>
          © {new Date().getFullYear()} DRIPDOME PRODUCTIONS · WOMEN OWNED · BUILT IN-HOUSE
        </Typography>
        <Typography
          component={Link}
          href="/privacy"
          sx={{
            ...NB_MONO_SX,
            ...NB_FOCUS_VISIBLE_SX,
            fontSize: 10,
            color: NB_COLORS.mutedOnInk,
            textDecoration: "none",
            "&:hover": { color: NB_COLORS.paperOnInk },
          }}
        >
          PRIVACY POLICY
        </Typography>
      </Box>
    </Box>
  );
}
