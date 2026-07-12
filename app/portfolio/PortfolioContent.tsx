"use client";

import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import PhotoPageCarousels from "../components/PhotoPageCarousels";
import Contact from "../components/Contact";
import FeaturedProjects from "../components/FeaturedProjects";
import PressSection from "../components/PressSection";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_OUTLINE_TEXT_SX,
  NB_RULE,
} from "@/lib/theme";

export default function PortfolioContent() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: NB_COLORS.paper,
        color: NB_COLORS.ink,
      }}
    >
      {/* Hero */}
      <Box component="section" sx={{ bgcolor: NB_COLORS.paper, borderBottom: NB_RULE }}>
        <Box sx={{ px: { xs: 3, md: 6 }, py: { xs: 5, md: 8 }, maxWidth: 1440, mx: "auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel, mb: 2 }}>
              INDEX · SET DESIGN + CUSTOM FABRICATION · NYC + LA
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
                fontSize: { xs: 44, sm: 72, md: 96 },
                color: NB_COLORS.ink,
                mb: 3,
              }}
            >
              PORT
              <Box component="span" sx={{ ...NB_OUTLINE_TEXT_SX, fontSize: "inherit" }}>
                FOLIO
              </Box>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Typography
              component="p"
              sx={{ fontSize: { xs: 15, md: 18 }, color: NB_COLORS.ink, maxWidth: 720 }}
            >
              We specialize in creating unforgettable set designs and custom
              fabrications for photoshoots that demand visual excellence. From
              concept to construction, our team works with photographers,
              stylists, and brands to craft striking, camera-ready environments
              that captivate audiences.
            </Typography>
          </motion.div>
        </Box>
      </Box>

      {/* Featured projects */}
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
            component="h2"
            sx={{
              ...NB_DISPLAY_SX,
              fontSize: { xs: 32, sm: 48, lg: 64 },
              color: NB_COLORS.ink,
            }}
          >
            FEATURED PROJECTS
          </Typography>
          <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
            CASE FILES · 05 PROJECTS
          </Typography>
        </Box>
        <FeaturedProjects />
      </Box>

      {/* Photography archive */}
      <PhotoPageCarousels />

      {/* Press */}
      <PressSection />

      {/* Contact */}
      <Box id="contact" sx={{ scrollMarginTop: { xs: 95, md: 120 } }}>
        <Contact />
      </Box>
    </Box>
  );
}
