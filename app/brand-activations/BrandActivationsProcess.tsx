"use client";

import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_OUTLINE_TEXT_SX,
  NB_RULE,
} from "@/lib/theme";

const STEPS = [
  {
    number: "01",
    label: "DESIGN",
    desc: "Concept, renders, and brand alignment in the first week.",
  },
  {
    number: "02",
    label: "FABRICATION",
    desc: "Built in our NYC shop. No third party vendors, no miscommunication.",
  },
  {
    number: "03",
    label: "INSTALL",
    desc: "Turnkey install and strike. Shot ready on day one.",
  },
];

export default function BrandActivationsProcess() {
  return (
    <Box
      component="section"
      sx={{ bgcolor: NB_COLORS.paper, borderBottom: NB_RULE }}
    >
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
          EVERYTHING UNDER ONE ROOF
        </Typography>
        <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
          PROCESS · DESIGN, FAB, INSTALL
        </Typography>
      </Box>

      <Box
        sx={{
          px: { xs: 3, md: 6 },
          py: { xs: 2.5, md: 3 },
          borderBottom: NB_RULE,
        }}
      >
        <Typography sx={{ fontSize: { xs: 15, md: 17 }, color: NB_COLORS.steel, maxWidth: 720 }}>
          No handoffs between design and build. Brief to install in a single
          team.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        }}
      >
        {STEPS.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ height: "100%" }}
          >
            <Box
              sx={{
                height: "100%",
                px: { xs: 3, md: 4 },
                py: { xs: 3, md: 5 },
                borderRight: { md: i < STEPS.length - 1 ? NB_RULE : "none" },
                borderBottom: {
                  xs: i < STEPS.length - 1 ? NB_RULE : "none",
                  md: "none",
                },
              }}
            >
              <Typography
                sx={{ ...NB_OUTLINE_TEXT_SX, fontSize: { xs: 64, md: 96 }, mb: 2 }}
              >
                {step.number}
              </Typography>
              <Typography
                sx={{
                  ...NB_DISPLAY_SX,
                  fontSize: { xs: 18, md: 22 },
                  color: NB_COLORS.ink,
                  mb: 1.5,
                }}
              >
                {step.label}
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, md: 16 }, color: NB_COLORS.steel }}>
                {step.desc}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
