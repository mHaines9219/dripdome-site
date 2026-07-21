"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_RULE,
  nbShadow,
} from "@/lib/theme";

const founders = [
  {
    name: "DIANA HAINES",
    photo:
      "https://dripdome-site.s3.us-east-2.amazonaws.com/about-us/diana_headshot.jpeg",
  },
  {
    name: (
      <>
        PATRICIA <br /> KWIATKOWSKI
      </>
    ),
    photo:
      "https://dripdome-site.s3.us-east-2.amazonaws.com/about-us/pat_4.jpeg",
  },
  {
    name: "MATT HAINES",
    photo:
      "https://dripdome-site.s3.us-east-2.amazonaws.com/about-us/matt_headshot.jpeg",
  },
];

const FoundersSection = () => {
  return (
    <Box
      component="section"
      sx={{ bgcolor: NB_COLORS.paper, borderBottom: NB_RULE }}
    >
      {/* Slim index bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 3, md: 6 },
          py: 1.25,
          borderBottom: NB_RULE,
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            ...NB_MONO_SX,
            fontSize: 12,
            fontWeight: 700,
            color: NB_COLORS.ink,
          }}
        >
          FOUNDERS
        </Typography>
        <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
          PERSONNEL FILE · 03 ENTRIES
        </Typography>
      </Box>

      {/* Founder plates */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
        }}
      >
        {founders.map((founder, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            style={{ height: "100%" }}
          >
            <Box
              sx={{
                height: "100%",
                px: { xs: 3, md: 4 },
                py: { xs: 4, md: 5 },
                borderRight: { sm: index < founders.length - 1 ? NB_RULE : "none" },
                borderBottom: {
                  xs: index < founders.length - 1 ? NB_RULE : "none",
                  sm: "none",
                },
              }}
            >
              <Typography
                sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel, mb: 2 }}
              >
                FOUNDER {String(index + 1).padStart(2, "0")}
              </Typography>
              <Box
                sx={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  border: NB_RULE,
                  boxShadow: nbShadow(),
                  bgcolor: NB_COLORS.surface,
                  mb: 3,
                }}
              >
                <Image
                  src={founder.photo}
                  fill
                  sizes="(max-width: 600px) 90vw, 33vw"
                  alt={
                    typeof founder.name === "string"
                      ? founder.name
                      : "Founder image"
                  }
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Typography
                variant="h3"
                sx={{
                  ...NB_DISPLAY_SX,
                  fontSize: { xs: 20, md: 24 },
                  color: NB_COLORS.ink,
                }}
              >
                {founder.name}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default FoundersSection;
