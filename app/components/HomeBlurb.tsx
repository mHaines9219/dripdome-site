"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";
import { motion, useInView } from "framer-motion";
import WomanIcon from "@mui/icons-material/Woman";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
export default function HomeBlurb() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Trigger once when in view

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const badges = [
    {
      label: "WOMEN OWNED",
      ariaLabel: "Women owned",
      icon: <WomanIcon fontSize="small" />,
    },
    {
      label: "FAMILY OPERATED",
      ariaLabel: "Family operated",
      icon: <Diversity3Icon fontSize="small" />,
    },
    {
      label: "NYC - LA",
      ariaLabel: "NYC to LA",
      icon: <AirplaneTicketIcon fontSize="small" />,
    },
  ] as const;

  const badgeSx = {
    borderRadius: 999,
    px: 1.25,
    py: 0.5,
    minHeight: 0,
    borderColor: "rgba(255,255,255,0.6)",
    color: "common.white",
    letterSpacing: "0.08em",
    fontWeight: 700,
    zIndex: 10,

    fontSize: { xs: "10px", sm: "12px" },
    lineHeight: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
    "& .MuiButton-startIcon": { mr: 0.75 },
    "&:hover": {
      borderColor: "rgba(255,255,255,0.85)",
      backgroundColor: "rgba(255,255,255,0.08)",
    },
  } as const;

  const ctaPrimarySx = {
    borderRadius: 999,
    px: { xs: 2, sm: 2.5 },
    py: { xs: 1, sm: 1.1 },
    fontWeight: 800,
    letterSpacing: "0.08em",
    fontSize: { xs: "12px", sm: "13px" },
    color: "common.white",
    background: "linear-gradient(90deg, #ec4899 0%, #3b82f6 100%)",
    boxShadow: "0 10px 30px rgba(59,130,246,0.15)",
    "&:hover": {
      background: "linear-gradient(90deg, #db2777 0%, #2563eb 100%)",
      boxShadow: "0 12px 34px rgba(59,130,246,0.22)",
    },
  } as const;

  const ctaSecondarySx = {
    borderRadius: 999,
    px: { xs: 2, sm: 2.5 },
    py: { xs: 1, sm: 1.1 },
    fontWeight: 800,
    letterSpacing: "0.08em",
    fontSize: { xs: "12px", sm: "13px" },
    color: "common.white",
    bgcolor: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.18)",
    "&:hover": {
      bgcolor: "rgba(255,255,255,0.18)",
      borderColor: "rgba(255,255,255,0.28)",
    },
  } as const;

  return (
    <Box
      ref={ref}
      sx={{ width: "100%", px: 2, py: 4, zIndex: 10, position: "relative" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Typography
          variant="h1"
          component="h1"
          color="primary"
          sx={{
            fontSize: { xs: "24px", sm: "60px", lg: "70px" },
            fontWeight: "bold",
            color: "white",
          }}
        >
          Production Design & Fabrication for Film, TV & Experiential Projects
          in NYC
        </Typography>
        <Typography
          variant="body1"
          component="p"
          color="primary"
          sx={{
            fontSize: { xs: "14px", sm: "18px", md: "20px", lg: "24px" },
            color: "white",
          }}
        >
          Production Design & Fabrication for Film, TV & Experiential Projects
          in NYC
        </Typography>
      </motion.div>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        <Box
          sx={{
            mt: 2.25,
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            flexWrap: "wrap",
          }}
        >
          <Button
            component={Link}
            href="/services#contact"
            variant="contained"
            disableElevation
            sx={ctaPrimarySx}
          >
            GET A QUOTE
          </Button>
          <Button
            component={Link}
            href="/portfolio"
            variant="contained"
            disableElevation
            sx={ctaSecondarySx}
          >
            VIEW PORTFOLIO
          </Button>
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {badges.map((badge) => (
            <Button
              key={badge.label}
              size="small"
              variant="outlined"
              startIcon={badge.icon}
              disableElevation
              disableRipple
              aria-label={badge.ariaLabel}
              sx={badgeSx}
            >
              {badge.label}
            </Button>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
}
