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
  "https://dripdome-site.s3.us-east-2.amazonaws.com/fraim/2.jpg";

const PROOF = [
  { value: "325K+", label: "VIEWS ON THE FRAIM FREESTYLE SET" },
  { value: "214K+", label: "ENGAGEMENTS FOR GOOGLE PHOTOS" },
  { value: "7", label: "CAMPAIGNS, SHOOTS + SHOWS ON FILE" },
  { value: "IN-HOUSE", label: "SHOP TO SET TO STRIKE" },
];

const SPECS = [
  {
    index: "A",
    title: "PRODUCTION DESIGN",
    copy: "Concept, look, and set plan built around the script and the shot list, not the other way round.",
  },
  {
    index: "B",
    title: "CUSTOM FABRICATION",
    copy: "Oversized props, flats, and hero pieces built in our NYC shop, like FRAIM's two giant red speakers.",
  },
  {
    index: "C",
    title: "PROP SOURCING",
    copy: "Period furniture, objects, and hero props pulled to hold up in extreme close up.",
  },
  {
    index: "D",
    title: "SET DRESSING",
    copy: "Every surface layered and styled on location so the frame reads the moment the camera rolls.",
  },
  {
    index: "E",
    title: "STUDIO SHOW SETS",
    copy: "Permanent, repeatable sets for series and studio shows that carry a whole season.",
  },
  {
    index: "F",
    title: "STRIKE + STORAGE",
    copy: "Load-in, load-out, and storage for pieces that come back for the next shoot.",
  },
];

export default function SetDesignHero() {
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
                SPECIALTY 04 · SET DESIGN · NYC + LA
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
                BUILT FOR
                <Box component="span" sx={{ ...NB_OUTLINE_TEXT_SX, display: "block" }}>
                  THE CAMERA.
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
                Sets, props, and production design for brand campaigns, music
                videos, and studio shows. We design it, fabricate it in our
                NYC shop, dress it on location, and strike it when the shoot
                wraps.
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
                  SEE THE SETS
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
              alt="DripDome set fabrication: two giant red speaker cabinets built for the FRAIM Freestyle series, photographed in the shop"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 42vw"
              style={{ objectFit: "cover", objectPosition: "50% 62%" }}
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
            SCOPE · EVERY SET
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
