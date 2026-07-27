"use client";

import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import NBImage from "../components/NBImage";
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

const HERO_IMAGE =
  "https://dripdome-site.s3.us-east-2.amazonaws.com/seismic/hero.jpg";

const PROOF = [
  { value: "FLATIRON", label: "NYC HEADQUARTERS DELIVERED" },
  { value: "FULL FLOOR", label: "RAW LOFT TO WORKING OFFICE" },
  { value: "2 SIGNS", label: "FROM ONE CNC-CUT PANEL" },
  { value: "TURNKEY", label: "DESIGN THROUGH STYLING" },
];

const SPECS = [
  {
    index: "A",
    title: "SPACE PLANNING",
    copy: "One open floor zoned into focus, meeting, and lounge without boxing it in with walls.",
  },
  {
    index: "B",
    title: "CNC-CUT SIGNAGE",
    copy: "Wordmarks and wayfinding cut to spec. On Seismic, one panel yielded two signs from the cut and its negative.",
  },
  {
    index: "C",
    title: "BRANDED MOMENTS",
    copy: "Signage and material details that make the room read as your company on sight.",
  },
  {
    index: "D",
    title: "GLASS + STEEL ROOMS",
    copy: "Crittall-style conference rooms that divide the floor without darkening it.",
  },
  {
    index: "E",
    title: "FURNITURE + FF&E",
    copy: "Desks, seating, and lighting sourced and specified to the build, delivered installed.",
  },
  {
    index: "F",
    title: "STYLING + BIOPHILIA",
    copy: "Plants, art, and objects that make the space feel lived-in from the first day back.",
  },
];

export default function InteriorOfficeDesignHero() {
  return (
    <>
      {/* Hero */}
      <Box component="section" sx={{ bgcolor: NB_COLORS.paper, borderBottom: NB_RULE }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
            maxWidth: 1440,
            mx: "auto",
          }}
        >
          {/* Type column */}
          <Box
            sx={{
              px: { xs: 3, md: 6 },
              py: { xs: 5, md: 8 },
              borderRight: { md: NB_RULE },
              borderBottom: { xs: NB_RULE, md: "none" },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel, mb: 2 }}>
                SPECIALTY 03 · INTERIOR + OFFICE DESIGN · NYC + LA
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
                  fontSize: { xs: 44, sm: 64, md: 68, lg: 84 },
                  color: NB_COLORS.ink,
                  mb: 3,
                }}
              >
                WHERE YOUR
                <Box component="span" sx={{ ...NB_OUTLINE_TEXT_SX, display: "block" }}>
                  TEAM SHOWS UP.
                </Box>
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <Typography
                sx={{ fontSize: { xs: 16, md: 18 }, color: NB_COLORS.ink, maxWidth: 560, mb: 4 }}
              >
                We design offices, studios, and interiors that look like the
                company inside them. Space planning, custom signage, furniture
                and FF&amp;E, and styling, managed end to end and installed
                turnkey.
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
                  SEE THE BUILDOUT
                </Button>
              </Box>
            </motion.div>
          </Box>

          {/* Image column */}
          <Box
            sx={{
              position: "relative",
              minHeight: { xs: 320, md: "auto" },
              bgcolor: NB_COLORS.silverLight,
            }}
          >
            <NBImage
              src={HERO_IMAGE}
              alt="DripDome interior design for Seismic Systems: CNC-cut Seismic wordmark on a fluted metal wall in a Flatiron loft office"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 42vw"
              style={{ objectFit: "cover" }}
            />
          </Box>
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
                sx={{ ...NB_DISPLAY_SX, fontSize: { xs: 26, md: 40 }, color: NB_COLORS.ink }}
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
            WHAT WE BUILD
          </Typography>
          <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
            SCOPE · EVERY INTERIOR
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
                SCOPE {spec.index}
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
