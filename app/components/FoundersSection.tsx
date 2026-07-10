"use client";
import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import { ACCENT, INK, PAPER, nbShadow } from "@/lib/theme";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ bgcolor: INK }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 0.5 }}
      >
        <Box sx={{ pt: 12, bgcolor: INK }}>
          <Box
            sx={{
              paddingTop: "0px",
              textAlign: "center",
              background: INK,
            }}
          >
            {/* <Typography
              variant="h3"
              sx={{
                fontSize: {
                  xs: '35px',
                  sm: '50px',
                  md: '50px',
                  lg: '80px',
                  xl: '80px',
                },
              }}
              gutterBottom
            >
              MEET OUR FOUNDERS
            </Typography> */}

            {/* Founders Box */}
            <Box
              sx={{
                padding: "2rem",
                backgroundColor: INK,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: "2rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {founders.map((founder, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  >
                    <Box
                      sx={{
                        textAlign: "center",
                        flexShrink: 0,
                        flexBasis: "12rem",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 192, lg: 288 },
                          height: { xs: 192, lg: 288 },
                          border: `3px solid ${PAPER}`,
                          boxShadow: nbShadow(6, ACCENT),
                          overflow: "hidden",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          mb: 4,
                        }}
                      >
                        <Image
                          src={founder.photo}
                          width={192}
                          height={192}
                          alt={
                            typeof founder.name === "string"
                              ? founder.name
                              : "Founder image"
                          }
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "white",
                          textAlign: "center",
                          position: "relative",
                          "&::after": {
                            content: '""',
                            display: "block",
                            width: "40px",
                            height: "3px",
                            bgcolor: ACCENT,
                            mx: "auto",
                            mt: 1,
                          },
                        }}
                      >
                        {founder.name}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default FoundersSection;
