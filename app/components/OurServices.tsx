"use client";

import { Box, Typography } from "@mui/material";
import { GlareCard } from "@/components/ui/glare-card";

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
          <GlareCard key={service.label}>
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                p: 2,
                backgroundImage: `url(${service.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Typography
                component="span"
                sx={{
                  color: "white",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  fontSize: { xs: 14, sm: 18, md: 20 },
                  textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  p: 1,
                }}
              >
                {service.label}
              </Typography>
            </Box>
          </GlareCard>
        ))}
      </Box>
    </Box>
  );
}
