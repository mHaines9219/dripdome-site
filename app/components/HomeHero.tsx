"use client";

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BRAND_GRADIENT_BUTTON_SX,
  BRAND_GRADIENT_TEXT_SX,
} from "@/lib/theme";

// TODO: replace hero image with a 15s branded reel once produced
// (use <video autoPlay muted loop playsInline> with a webm/mp4 hosted on S3).
const HERO_IMAGE =
  "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_1.JPG";

const BADGES = ["WOMEN OWNED", "NYC + LA", "CONCEPT TO COMPLETION"];

export default function HomeHero() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "90vh", md: "100vh" },
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "black",
      }}
    >
      <Image
        src={HERO_IMAGE}
        alt="DripDome set design and experiential build"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", opacity: 0.55 }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 3, md: 8 },
          py: { xs: 10, md: 12 },
          maxWidth: 1200,
          width: "100%",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 1.5,
              mb: 4,
            }}
          >
            {BADGES.map((badge) => (
              <Box
                key={badge}
                sx={{
                  px: 2,
                  py: 0.75,
                  border: "1px solid rgba(229,199,103,0.6)",
                  borderRadius: "999px",
                  fontSize: { xs: "11px", md: "13px" },
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: "white",
                  bgcolor: "rgba(229,199,103,0.08)",
                }}
              >
                {badge}
              </Box>
            ))}
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "40px", sm: "60px", md: "80px", lg: "96px" },
              fontWeight: "bold",
              lineHeight: 1.05,
              color: "white",
              mb: 3,
            }}
          >
            WE BUILD WORLDS.
            <br />
            <Box component="span" sx={BRAND_GRADIENT_TEXT_SX}>
              SETS. STAGES. STORIES.
            </Box>
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <Typography
            sx={{
              fontSize: { xs: "16px", md: "22px" },
              color: "rgba(255,255,255,0.9)",
              maxWidth: 820,
              mx: "auto",
              mb: 5,
            }}
          >
            Production design and custom fabrication trusted by world-class
            brands and A-list talent. From concept to completion in NYC and LA.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              component={Link}
              href="/portfolio"
              variant="contained"
              sx={{
                px: 4,
                py: 1.75,
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 700,
                letterSpacing: "0.08em",
                ...BRAND_GRADIENT_BUTTON_SX,
              }}
            >
              VIEW PORTFOLIO
            </Button>
            <Button
              component="a"
              href="#contact"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              variant="outlined"
              sx={{
                px: 4,
                py: 1.75,
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "white",
                borderColor: "rgba(255,255,255,0.6)",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              START A PROJECT
            </Button>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
