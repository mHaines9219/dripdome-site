"use client";

import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Typography } from "@mui/material";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_OUTLINE_TEXT_SX,
  NB_RULE,
} from "@/lib/theme";

const SPECIALTIES = [
  {
    index: "S.01",
    title: "PODCAST STUDIOS",
    href: "/podcast-studios",
    buyer: "FOR PODCASTERS + NETWORKS",
    proof: "20M+ VIEWS SHOT ON OUR BUILDS",
    copy: "Permanent, camera-ready studios designed and fabricated around your show. Acoustics, lighting, and a set your audience remembers.",
  },
  {
    index: "S.02",
    title: "BRAND ACTIVATIONS",
    href: "/brand-activations",
    buyer: "FOR CMOS + BRAND TEAMS",
    proof: "TRUSTED BY GOOGLE · FEATURED IN FORBES",
    copy: "Pop-ups, photo moments, and launch campaigns. Concept to strike, fabricated in-house and installed on your timeline.",
  },
];

export default function Specialties() {
  return (
    <Box component="section" sx={{ bgcolor: NB_COLORS.paper, borderBottom: NB_RULE }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          px: { xs: 3, md: 6 },
          py: { xs: 3, md: 4 },
          borderBottom: NB_RULE,
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            ...NB_DISPLAY_SX,
            fontSize: { xs: 32, sm: 48, lg: 64 },
            color: NB_COLORS.ink,
          }}
        >
          WHAT DO YOU NEED BUILT?
        </Typography>
        <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
          TWO SPECIALTIES · ONE SHOP
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        }}
      >
        {SPECIALTIES.map((spec, i) => (
          <Box
            key={spec.href}
            component={Link}
            href={spec.href}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              px: { xs: 3, md: 6 },
              py: { xs: 4, md: 6 },
              borderRight: { md: i === 0 ? NB_RULE : "none" },
              borderBottom: { xs: i === 0 ? NB_RULE : "none", md: "none" },
              textDecoration: "none",
              color: NB_COLORS.ink,
              "&:hover": {
                bgcolor: NB_COLORS.ink,
                color: NB_COLORS.paperOnInk,
                "& .spec-outline": {
                  WebkitTextStroke: `2px ${NB_COLORS.paperOnInk}`,
                },
                "& .spec-muted": { color: NB_COLORS.mutedOnInk },
                "& .spec-arrow": { transform: "translateX(8px)" },
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <Typography
                className="spec-muted"
                sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}
              >
                {spec.index} · {spec.buyer}
              </Typography>
            </Box>
            <Typography
              className="spec-outline"
              sx={{
                ...NB_OUTLINE_TEXT_SX,
                fontSize: { xs: 36, sm: 48, lg: 60 },
              }}
            >
              {spec.title}
            </Typography>
            <Typography sx={{ fontSize: { xs: 14, md: 16 }, color: "inherit", maxWidth: 480 }}>
              {spec.copy}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: "auto", pt: 1 }}>
              <Typography
                sx={{ ...NB_MONO_SX, fontSize: 12, fontWeight: 700, color: "inherit" }}
              >
                {spec.proof}
              </Typography>
              <ArrowForwardIcon
                className="spec-arrow"
                sx={{ fontSize: 28, color: "inherit", transition: "transform 150ms ease" }}
              />
            </Box>
          </Box>
        ))}
      </Box>

      {/* Sunset services: available for the right project, not promoted */}
      <Box
        sx={{
          borderTop: NB_RULE,
          px: { xs: 3, md: 6 },
          py: 1.25,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography sx={{ ...NB_MONO_SX, fontSize: 11, color: NB_COLORS.steel }}>
          ALSO ON FILE: SET DESIGN · MUSIC VIDEOS
        </Typography>
        <Typography
          component={Link}
          href="/#contact"
          sx={{
            ...NB_MONO_SX,
            fontSize: 11,
            color: NB_COLORS.steel,
            textDecoration: "underline",
            textUnderlineOffset: 3,
            "&:hover": { color: NB_COLORS.ink },
          }}
        >
          FOR THE RIGHT PROJECT, ASK →
        </Typography>
      </Box>
    </Box>
  );
}
