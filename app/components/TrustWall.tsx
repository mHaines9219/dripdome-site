"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

const S3 = "https://dripdome-site.s3.us-east-2.amazonaws.com/nu_logo";

const logos = [
  { src: `${S3}/biw.png`, alt: "Business Insider" },
  { src: `${S3}/ccw.png`, alt: "Complex" },
  { src: `${S3}/googtrans.png`, alt: "Google" },
  { src: `${S3}/paperw.png`, alt: "Paper Magazine" },
  { src: `${S3}/phw.png`, alt: "Product Hunt" },
  { src: `${S3}/sunny2.png`, alt: "Sunny Vodka" },
];

const pressLinks = [
  {
    outlet: "Business Insider",
    headline: "Bella Thorne Coachella Afterparty",
    url: "https://www.businessinsider.com/bella-thorne-coachella-after-party-photos-diplo-2022-4",
  },
  {
    outlet: "Forbes",
    headline: "Best Canned Cocktail — Original Southside",
    url: "https://www.forbes.com/sites/karlaalindahao/2024/03/01/best-canned-cocktail-original-southside/",
  },
  {
    outlet: "Rolling Stone",
    headline: "Theia Returns to Alt-Pop",
    url: "https://au.rollingstone.com/music/music-news/theia-crucified-by-u-45218/",
  },
];

function LogoMarquee() {
  const doubled = [...logos, ...logos];

  return (
    <Box
      sx={{
        overflow: "hidden",
        width: "100%",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: { xs: 4, md: 6 },
          width: "max-content",
          animation: "marquee-logos 30s linear infinite",
          alignItems: "center",
        }}
      >
        {doubled.map((logo, i) => (
          <Box
            key={i}
            sx={{
              width: { xs: 80, sm: 110, md: 140 },
              height: { xs: 80, sm: 110, md: 140 },
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.7,
              transition: "opacity 0.3s",
              "&:hover": { opacity: 1 },
            }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={140}
              height={140}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export function TrustPress() {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        py: { xs: 5, md: 8 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Typography
          sx={{
            fontSize: { xs: "24px", sm: "40px", lg: "50px" },
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            mb: { xs: 2, md: 3 },
          }}
        >
          In the Press
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            alignItems: "center",
          }}
        >
          {pressLinks.map((item) => (
            <Typography
              key={item.url}
              component="a"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: { xs: "14px", sm: "16px", md: "18px" },
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "color 0.2s",
                "&:hover": { color: "#E5C767" },
              }}
            >
              <Box
                component="span"
                sx={{ fontWeight: 700, color: "rgba(255,255,255,0.85)" }}
              >
                {item.outlet}
              </Box>
              {" — "}
              {item.headline}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default function TrustWall() {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        py: { xs: 5, md: 8 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "24px", sm: "40px", lg: "50px" },
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          mb: { xs: 3, md: 5 },
        }}
      >
        Trusted By
      </Typography>

      <LogoMarquee />
    </Box>
  );
}
