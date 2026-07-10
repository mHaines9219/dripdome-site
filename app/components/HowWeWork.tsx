"use client";

import { useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { ACCENT, INK, NB_BUTTON_SX, PAPER, nbShadow } from "@/lib/theme";

const steps = [
  {
    number: "01",
    title: "TELL US YOUR VISION",
    description: "Share your idea — any stage is fine",
  },
  {
    number: "02",
    title: "WE DESIGN & BUILD",
    description: "We handle concept, fabrication & logistics",
  },
  {
    number: "03",
    title: "YOU SHOW UP TO SOMETHING AMAZING",
    description: "On-time, on-budget, every time",
  },
];

export default function HowWeWork() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <Box
      component="section"
      ref={ref}
      sx={{
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        px: { xs: 3, md: 6 },
        py: { xs: 6, md: 10 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "28px", sm: "40px", lg: "50px" },
          color: "white",
          textAlign: "center",
          mb: { xs: 4, md: 6 },
        }}
      >
        How We{" "}
        <Box component="span" sx={{ color: ACCENT }}>
          Work
        </Box>
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "flex-start" },
          gap: { xs: 0, md: 3 },
          position: "relative",
        }}
      >
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            style={{ flex: 1, width: "100%" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                alignItems: { xs: "flex-start", md: "center" },
                textAlign: { xs: "left", md: "center" },
                gap: { xs: 2, md: 0 },
                position: "relative",
                pb: { xs: 3, md: 0 },
              }}
            >
              {/* Step number block */}
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  minWidth: 52,
                  bgcolor: ACCENT,
                  border: `2px solid ${PAPER}`,
                  boxShadow: nbShadow(4, PAPER),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: { md: 2.5 },
                }}
              >
                <Typography
                  sx={{
                    color: INK,
                    fontWeight: 800,
                    fontSize: "16px",
                  }}
                >
                  {step.number}
                </Typography>
              </Box>

              {/* Connecting line (desktop only, between steps) */}
              {i < steps.length - 1 && (
                <Box
                  sx={{
                    display: { xs: "none", md: "block" },
                    position: "absolute",
                    top: 24,
                    left: "calc(50% + 34px)",
                    width: "calc(100% - 68px)",
                    height: "3px",
                    bgcolor: PAPER,
                  }}
                />
              )}

              {/* Connecting line (mobile only, vertical) */}
              {i < steps.length - 1 && (
                <Box
                  sx={{
                    display: { xs: "block", md: "none" },
                    position: "absolute",
                    top: 54,
                    left: 24,
                    width: "3px",
                    height: "calc(100% - 54px)",
                    bgcolor: PAPER,
                  }}
                />
              )}

              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", sm: "16px", md: "18px" },
                    fontWeight: 800,
                    color: "white",
                    letterSpacing: "0.06em",
                    mb: 0.5,
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "13px", sm: "14px" },
                    color: "rgba(243,237,226,0.7)",
                  }}
                >
                  {step.description}
                </Typography>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>

      <Box sx={{ textAlign: "center", mt: { xs: 4, md: 6 } }}>
        <Button
          component="a"
          href="#contact"
          variant="contained"
          disableElevation
          sx={{
            px: 3,
            py: 1.25,
            letterSpacing: "0.08em",
            fontSize: "13px",
            ...NB_BUTTON_SX,
          }}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          START YOUR PROJECT
        </Button>
      </Box>
    </Box>
  );
}
