"use client";

import { Box, Typography } from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import BuildIcon from "@mui/icons-material/Build";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { motion } from "framer-motion";
import { BRAND_GRADIENT_TEXT_SX } from "@/lib/theme";

const STEPS = [
  {
    icon: BrushIcon,
    label: "DESIGN",
    desc: "Concept, renders, and brand alignment in the first week.",
  },
  {
    icon: BuildIcon,
    label: "FABRICATION",
    desc: "Built in our NYC shop. No third party vendors, no miscommunication.",
  },
  {
    icon: LocalShippingIcon,
    label: "INSTALL",
    desc: "Turnkey install and strike. Shot ready on day one.",
  },
];

export default function BrandActivationsProcess() {
  return (
    <Box
      sx={{
        bgcolor: "black",
        color: "white",
        px: { xs: 3, md: 8 },
        py: { xs: 8, md: 12 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", textAlign: "center" }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: "32px", md: "50px", lg: "60px" },
            fontWeight: "bold",
            mb: 2,
          }}
        >
          <Box component="span" sx={{ color: "white" }}>
            EVERYTHING UNDER{" "}
          </Box>
          <Box component="span" sx={BRAND_GRADIENT_TEXT_SX}>
            ONE ROOF
          </Box>
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "16px", md: "20px" },
            color: "rgba(255,255,255,0.8)",
            maxWidth: 720,
            mx: "auto",
            mb: { xs: 6, md: 8 },
          }}
        >
          No handoffs between design and build. Brief to install in a single
          team.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: { xs: 4, md: 6 },
          }}
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Box
                  sx={{
                    p: { xs: 3, md: 4 },
                    border: "1px solid rgba(229,199,103,0.2)",
                    borderRadius: 3,
                    bgcolor: "rgba(229,199,103,0.04)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Icon sx={{ fontSize: 48, color: "#E5C767", mb: 2 }} />
                  <Typography
                    sx={{
                      fontSize: { xs: "20px", md: "24px" },
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      mb: 1.5,
                    }}
                  >
                    {step.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "15px", md: "16px" },
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {step.desc}
                  </Typography>
                </Box>
              </motion.div>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
