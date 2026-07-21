"use client";

import { useRef } from "react";
import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";
import { motion, useInView } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  NB_BUTTON_DARK_SX,
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_OUTLINE_TEXT_SX,
  NB_RULE,
} from "@/lib/theme";

const steps = [
  {
    number: "01",
    title: "TELL US YOUR VISION",
    description: "Share your idea. Any stage is fine.",
  },
  {
    number: "02",
    title: "WE DESIGN + BUILD",
    description: "We handle concept, fabrication and logistics.",
  },
  {
    number: "03",
    title: "YOU SHOW UP TO SOMETHING AMAZING",
    description: "On-time, on-budget, every time.",
  },
];

export default function HowWeWork() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <Box
      component="section"
      ref={ref}
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
          HOW WE WORK
        </Typography>
        <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
          PROCESS · THREE STEPS, NO MYSTERY
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        }}
      >
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <Box
              sx={{
                height: "100%",
                px: { xs: 3, md: 4 },
                py: { xs: 3, md: 5 },
                borderRight: { md: i < steps.length - 1 ? NB_RULE : "none" },
                borderBottom: { xs: i < steps.length - 1 ? NB_RULE : "none", md: "none" },
              }}
            >
              <Typography
                sx={{
                  ...NB_OUTLINE_TEXT_SX,
                  fontSize: { xs: 64, md: 96 },
                  mb: 2,
                }}
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
                {step.title}
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, md: 16 }, color: NB_COLORS.steel }}>
                {step.description}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>

      {/* CTA band */}
      <Box
        sx={{
          borderTop: NB_RULE,
          bgcolor: NB_COLORS.silver,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          px: { xs: 3, md: 6 },
          py: { xs: 2.5, md: 3 },
          flexWrap: "wrap",
        }}
      >
        <Typography
          sx={{
            ...NB_DISPLAY_SX,
            fontSize: { xs: 20, md: 28 },
            color: NB_COLORS.onSilver,
          }}
        >
          READY WHEN YOU ARE.
        </Typography>
        <Button
          component={Link}
          href="/#contact"
          disableElevation
          endIcon={<ArrowForwardIcon />}
          sx={{ ...NB_BUTTON_DARK_SX, px: 3.5, py: 1.25, fontSize: 13 }}
        >
          START YOUR PROJECT
        </Button>
      </Box>
    </Box>
  );
}
