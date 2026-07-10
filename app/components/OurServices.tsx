"use client";

import { Box, Typography } from "@mui/material";
import { ACCENT, INK, PAPER, nbShadow } from "@/lib/theme";

const S3_BASE = "https://dripdome-site.s3.us-east-2.amazonaws.com";

export default function OurServices() {
  const services = [
    { label: "FABRICATION", image: `${S3_BASE}/website-assets/fab.png` },
    {
      label: "PRODUCTION & SET DESIGN",
      image: `${S3_BASE}/website-assets/setdes.png`,
    },
    { label: "RENTALS", image: `${S3_BASE}/website-assets/rentals_mag.jpg` },
    { label: "CONSULTING", image: `${S3_BASE}/website-assets/consulting.png` },
  ];

  return (
    <Box
      component="section"
      id="services"
      sx={{
        width: "100%",
        bgcolor: INK,
        mb: 2,
        px: { xs: 2, md: 8 },
      }}
    >
      <Box
        sx={{
          display: "grid",
          width: "80dvw",
          maxWidth: "1900px",
          mx: "auto",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: { xs: 2, md: 3 },
          justifyItems: "center",
          px: 0,
        }}
      >
        {services.map((service) => (
          <Box
            key={service.label}
            sx={{
              width: "100%",
              maxWidth: { xs: 160, sm: 200, md: 280, lg: 340, xl: 400 },
              aspectRatio: "17 / 21",
              border: `3px solid ${PAPER}`,
              borderRadius: 0,
              boxShadow: nbShadow(6, ACCENT),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              p: 2,
              backgroundImage: `url(${service.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "transform 120ms ease, box-shadow 120ms ease",
              "&:hover": {
                transform: "translate(-2px, -2px)",
                boxShadow: nbShadow(8, ACCENT),
              },
              "&:active": {
                transform: "translate(2px, 2px)",
                boxShadow: nbShadow(0, ACCENT),
              },
            }}
          >
            <Typography
              component="span"
              sx={{
                color: PAPER,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontSize: { xs: 14, sm: 18, md: 20 },
                bgcolor: INK,
                border: `2px solid ${PAPER}`,
                boxShadow: nbShadow(3, ACCENT),
                p: 1,
              }}
            >
              {service.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
