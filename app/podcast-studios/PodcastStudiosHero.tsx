"use client";

import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  NB_BUTTON_OUTLINE_SX,
  NB_BUTTON_SX,
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_OUTLINE_TEXT_SX,
  NB_RULE,
} from "@/lib/theme";

const PROOF = [
  { value: "30M+", label: "VIEWS SHOT ON OUR BUILDS" },
  { value: "230K+", label: "SUBSCRIBERS ON THE FLAGSHIP SET" },
  { value: "65+", label: "EPISODES AND COUNTING" },
  { value: "4 DAYS", label: "FASTEST FULL BUILD" },
];

const SPECS = [
  {
    index: "A",
    title: "CAMERA-READY DESIGN",
    copy: "Backdrops composed for your framing, not an empty room with chairs.",
  },
  {
    index: "B",
    title: "CINEMATIC LIGHTING",
    copy: "Key, fill, and practicals planned into the build, no fix-it-in-post.",
  },
  {
    index: "C",
    title: "CUSTOM DESKS + SEATING",
    copy: "Fabricated to your show's format: solo, panel, or face-to-face.",
  },
  {
    index: "D",
    title: "LED + NEON SIGNAGE",
    copy: "Hand wired statement pieces, like the NotLoveline heart wall.",
  },
  {
    index: "E",
    title: "TECH + CABLE INTEGRATION",
    copy: "Cameras, mics, and monitors wired clean and hidden from lens view.",
  },
  {
    index: "F",
    title: "SPONSOR-READY MOMENTS",
    copy: "Set zones designed to carry brand integrations without breaking the look.",
  },
];

export default function PodcastStudiosHero() {
  return (
    <>
      {/* Hero */}
      <Box component="section" sx={{ bgcolor: NB_COLORS.paper, borderBottom: NB_RULE }}>
        <Box sx={{ px: { xs: 3, md: 6 }, py: { xs: 5, md: 8 }, maxWidth: 1440, mx: "auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel, mb: 2 }}>
              SPECIALTY 01 · PODCAST STUDIO DESIGN + BUILD · NYC + LA
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Typography
              variant="h1"
              sx={{
                ...NB_DISPLAY_SX,
                fontSize: { xs: 44, sm: 64, md: 80, lg: 96 },
                color: NB_COLORS.ink,
                mb: 3,
              }}
            >
              YOUR SHOW
              <Box component="span" sx={{ ...NB_OUTLINE_TEXT_SX, display: "block" }}>
                DESERVES A SET.
              </Box>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Typography
              sx={{ fontSize: { xs: 16, md: 18 }, color: NB_COLORS.ink, maxWidth: 640, mb: 4 }}
            >
              Permanent, camera-ready podcast studios designed, fabricated, and
              wired in-house. Your audience judges the room before they judge
              the conversation. We build rooms that win that judgment.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              <Button
                component={Link}
                href="#contact"
                disableElevation
                sx={{ ...NB_BUTTON_SX, px: 4, py: 1.5, fontSize: { xs: 13, md: 14 } }}
              >
                START YOUR BUILD
              </Button>
              <Button
                component={Link}
                href="#builds"
                disableElevation
                sx={{ ...NB_BUTTON_OUTLINE_SX, px: 4, py: 1.5, fontSize: { xs: 13, md: 14 } }}
              >
                SEE A BUILD
              </Button>
            </Box>
          </motion.div>
        </Box>

        {/* Proof band */}
        <Box
          sx={{
            borderTop: NB_RULE,
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
          }}
        >
          {PROOF.map((stat, i) => (
            <Box
              key={stat.label}
              sx={{
                px: { xs: 2, md: 4 },
                py: { xs: 2.5, md: 4 },
                borderRight: {
                  xs: i % 2 === 0 ? NB_RULE : "none",
                  md: i < PROOF.length - 1 ? NB_RULE : "none",
                },
                borderBottom: { xs: i < 2 ? NB_RULE : "none", md: "none" },
                bgcolor: i % 2 === 1 ? NB_COLORS.silverLight : NB_COLORS.paper,
              }}
            >
              <Typography
                sx={{ ...NB_DISPLAY_SX, fontSize: { xs: 32, md: 48 }, color: NB_COLORS.ink }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{ ...NB_MONO_SX, mt: 1, fontSize: { xs: 10, sm: 11 }, color: NB_COLORS.steel }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Build spec sheet */}
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
            sx={{ ...NB_DISPLAY_SX, fontSize: { xs: 32, sm: 48, lg: 64 }, color: NB_COLORS.ink }}
          >
            WHAT&apos;S IN A BUILD
          </Typography>
          <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
            STANDARD SPEC · EVERY STUDIO
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" },
          }}
        >
          {SPECS.map((spec, i) => (
            <Box
              key={spec.index}
              sx={{
                px: { xs: 3, md: 4 },
                py: { xs: 3, md: 4 },
                borderRight: {
                  sm: i % 2 === 0 ? NB_RULE : "none",
                  md: (i + 1) % 3 !== 0 ? NB_RULE : "none",
                },
                borderBottom: {
                  xs: i < SPECS.length - 1 ? NB_RULE : "none",
                  sm: i < SPECS.length - 2 ? NB_RULE : "none",
                  md: i < SPECS.length - 3 ? NB_RULE : "none",
                },
              }}
            >
              <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel, mb: 1.5 }}>
                SPEC {spec.index}
              </Typography>
              <Typography
                sx={{ ...NB_DISPLAY_SX, fontSize: { xs: 17, md: 20 }, color: NB_COLORS.ink, mb: 1 }}
              >
                {spec.title}
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, md: 15 }, color: NB_COLORS.steel }}>
                {spec.copy}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
