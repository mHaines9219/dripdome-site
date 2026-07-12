"use client";

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
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
  NB_TAG_SX,
  nbShadow,
} from "@/lib/theme";

const HERO_IMAGE =
  "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_1.JPG";

const BADGES = ["WOMEN OWNED", "NYC + LA", "CONCEPT TO COMPLETION"];

const TICKER_ITEMS = [
  "SET DESIGN",
  "CUSTOM FABRICATION",
  "POP-UP ACTIVATIONS",
  "PRODUCTION DESIGN",
  "PODCAST STUDIOS",
  "IMMERSIVE ENVIRONMENTS",
];

function Ticker() {
  const strip = (key: string) => (
    <Box
      key={key}
      aria-hidden={key === "b"}
      sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}
    >
      {TICKER_ITEMS.map((item) => (
        <Typography
          key={item}
          component="span"
          sx={{
            ...NB_MONO_SX,
            fontSize: { xs: 12, md: 14 },
            fontWeight: 700,
            color: NB_COLORS.paperOnInk,
            px: 3,
            py: 1.25,
            display: "inline-flex",
            alignItems: "center",
            gap: 3,
            whiteSpace: "nowrap",
            "&::after": { content: '"●"', fontSize: 8, color: NB_COLORS.mutedOnInk },
          }}
        >
          {item}
        </Typography>
      ))}
    </Box>
  );

  return (
    <Box
      sx={{
        bgcolor: NB_COLORS.ink,
        borderTop: NB_RULE,
        overflow: "hidden",
        display: "flex",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "max-content",
          animation: "nb-ticker 28s linear infinite",
        }}
      >
        {strip("a")}
        {strip("b")}
      </Box>
    </Box>
  );
}

export default function HomeHero() {
  return (
    <Box component="section" sx={{ bgcolor: NB_COLORS.paper, borderBottom: NB_RULE }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
          maxWidth: 1440,
          mx: "auto",
        }}
      >
        {/* Left: type column */}
        <Box
          sx={{
            px: { xs: 3, md: 6 },
            py: { xs: 5, md: 8 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRight: { md: NB_RULE },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel, mb: 2 }}
            >
              DRIPDOME PRODUCTIONS · SPEC 001 · EXPERIENTIAL DESIGN STUDIO
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
                fontSize: { xs: 52, sm: 76, md: 84, lg: 104, xl: 120 },
                color: NB_COLORS.ink,
                mb: 3,
              }}
            >
              WE BUILD
              <Box component="span" sx={{ ...NB_OUTLINE_TEXT_SX, display: "block" }}>
                WORLDS.
              </Box>
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  fontSize: "0.35em",
                  bgcolor: NB_COLORS.silver,
                  color: NB_COLORS.onSilver,
                  border: NB_RULE,
                  boxShadow: nbShadow(),
                  px: 1.5,
                  py: 0.5,
                  mt: 2,
                }}
              >
                SETS. STAGES. STORIES.
              </Box>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Typography
              sx={{
                fontSize: { xs: 16, md: 18 },
                color: NB_COLORS.ink,
                maxWidth: 560,
                mb: 4,
              }}
            >
              Production design and custom fabrication trusted by world-class
              brands and A-list talent. From concept to completion in NYC and LA.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
              <Button
                component={Link}
                href="/#contact"
                disableElevation
                sx={{ ...NB_BUTTON_SX, px: 4, py: 1.5, fontSize: { xs: 13, md: 14 } }}
              >
                START A PROJECT
              </Button>
              <Button
                component={Link}
                href="/portfolio"
                disableElevation
                sx={{
                  ...NB_BUTTON_OUTLINE_SX,
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: 13, md: 14 },
                }}
              >
                VIEW PORTFOLIO
              </Button>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              {BADGES.map((badge) => (
                <Box key={badge} sx={{ ...NB_TAG_SX, fontSize: { xs: 10, md: 11 } }}>
                  {badge}
                </Box>
              ))}
            </Box>
          </motion.div>
        </Box>

        {/* Right: mounted exhibit plate */}
        <Box
          sx={{
            px: { xs: 3, md: 5 },
            py: { xs: 4, md: 8 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: { md: NB_COLORS.silverLight },
            borderTop: { xs: NB_RULE, md: "none" },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ width: "100%", maxWidth: 520 }}
          >
            <Box
              sx={{
                border: NB_RULE,
                bgcolor: NB_COLORS.surface,
                boxShadow: nbShadow(10),
                p: 1,
              }}
            >
              <Box sx={{ position: "relative", aspectRatio: "4 / 3", border: NB_RULE }}>
                <Image
                  src={HERO_IMAGE}
                  alt="DripDome set build for the NotLoveline podcast"
                  fill
                  priority
                  sizes="(max-width: 900px) 90vw, 40vw"
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  pt: 1,
                  px: 0.5,
                }}
              >
                <Typography sx={{ ...NB_MONO_SX, fontSize: 11, color: NB_COLORS.steel }}>
                  FIG. 01 · NOTLOVELINE SET
                </Typography>
                <Typography sx={{ ...NB_MONO_SX, fontSize: 11, color: NB_COLORS.steel }}>
                  19M+ VIEWS
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Box>

      <Ticker />
    </Box>
  );
}
