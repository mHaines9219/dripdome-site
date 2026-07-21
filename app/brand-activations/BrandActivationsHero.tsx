"use client";

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
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

// TODO: replace hero image with a 15s branded reel once produced
// (use <video autoPlay muted loop playsInline> with a webm/mp4 hosted on S3).
const HERO_IMAGE =
  "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/view.jpg";

const BADGES = ["WOMEN OWNED", "NYC + LA", "CONCEPT TO INSTALL"];

export default function BrandActivationsHero() {
  return (
    <Box
      component="section"
      sx={{ bgcolor: NB_COLORS.paper, borderBottom: NB_RULE }}
    >
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
              BRAND ACTIVATIONS · DESIGN + FABRICATION + INSTALL · NYC + LA
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                ...NB_DISPLAY_SX,
                fontSize: { xs: 40, sm: 56, md: 60, lg: 76, xl: 88 },
                color: NB_COLORS.ink,
                mb: 3,
              }}
            >
              NYC BRAND
              <Box component="span" sx={{ display: "block" }}>
                ACTIVATION STUDIO.
              </Box>
              <Box component="span" sx={{ ...NB_OUTLINE_TEXT_SX, display: "block" }}>
                DESIGNED. BUILT. INSTALLED.
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
              From brief to install in as little as 2 weeks. Full service
              fabrication studio trusted by Google and top lifestyle brands.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
              <Button
                component="a"
                href="#inquiry"
                disableElevation
                sx={{ ...NB_BUTTON_SX, px: 4, py: 1.5, fontSize: { xs: 13, md: 14 } }}
              >
                REQUEST A QUOTE
              </Button>
              <Button
                component="a"
                href="#case-studies"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  document
                    .getElementById("case-studies")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                disableElevation
                sx={{
                  ...NB_BUTTON_OUTLINE_SX,
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: 13, md: 14 },
                }}
              >
                SEE THE WORK
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
                  alt="DripDome brand activation installation"
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
                  FIG. 01 · LESGC ACTIVATION
                </Typography>
                <Typography sx={{ ...NB_MONO_SX, fontSize: 11, color: NB_COLORS.steel }}>
                  INSTALLED &lt; 2 HR
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}
