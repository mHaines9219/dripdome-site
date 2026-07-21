"use client";

import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_RULE,
} from "@/lib/theme";

export default function AboutUs() {
  const ref = useRef(null);

  return (
    <Box
      component="section"
      ref={ref}
      sx={{ bgcolor: NB_COLORS.paper, borderBottom: NB_RULE }}
    >
      {/* Section header band */}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.5 }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              ...NB_DISPLAY_SX,
              fontSize: { xs: 40, sm: 64, lg: 80 },
              color: NB_COLORS.ink,
            }}
          >
            ABOUT US
          </Typography>
        </motion.div>
        <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
          THE STUDIO · WOMEN-OWNED · FAMILY-RUN
        </Typography>
      </Box>

      {/* Body band */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Box sx={{ px: { xs: 3, md: 6 }, py: { xs: 4, md: 6 } }}>
          <Typography
            variant="body1"
            component="p"
            sx={{
              fontSize: { xs: 16, sm: 18, md: 20 },
              color: NB_COLORS.ink,
              lineHeight: 1.7,
              maxWidth: 880,
            }}
          >
            <Box component="span" sx={{ fontWeight: 700 }}>
              Drip Dome Productions
            </Box>{" "}
            is a majority women-owned, family-run business based in New York
            City, with a presence in Los Angeles as well. We specialize in set
            design, custom fabrication, murals, graphic design, photography,
            and rentals. From photoshoots and music videos to large-scale
            event installations, we bring creative visions to life with
            artistry and precision. At Drip Dome, family values and
            collaboration fuel our passion for creating extraordinary projects
            that leave a lasting impact.
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
}
