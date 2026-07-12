"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_RULE,
} from "@/lib/theme";

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
    headline: "Best Canned Cocktail, Original Southside",
    url: "https://www.forbes.com/sites/karlaalindahao/2024/03/01/best-canned-cocktail-original-southside/",
  },
  {
    outlet: "Rolling Stone",
    headline: "Theia Returns to Alt-Pop",
    url: "https://au.rollingstone.com/music/music-news/theia-crucified-by-u-45218/",
  },
];

function LogoBelt() {
  const strip = (key: string) => (
    <Box
      key={key}
      aria-hidden={key === "b"}
      sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}
    >
      {logos.map((logo) => (
        <Box
          key={logo.alt}
          sx={{
            width: { xs: 120, md: 170 },
            height: { xs: 88, md: 120 },
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: `2px solid ${NB_COLORS.mutedOnInk}`,
            px: { xs: 2, md: 3 },
          }}
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={140}
            height={140}
            style={{ width: "100%", height: "70%", objectFit: "contain" }}
          />
        </Box>
      ))}
    </Box>
  );

  return (
    <Box sx={{ overflow: "hidden", display: "flex", bgcolor: NB_COLORS.well }}>
      <Box
        sx={{
          display: "flex",
          width: "max-content",
          animation: "nb-ticker 24s linear infinite",
          "&:hover": { animationPlayState: "paused" },
        }}
      >
        {strip("a")}
        {strip("b")}
      </Box>
    </Box>
  );
}

export default function TrustWall() {
  return (
    <Box
      component="section"
      sx={{ bgcolor: NB_COLORS.ink, borderBottom: NB_RULE }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 3, md: 6 },
          py: 1.25,
          borderBottom: `2px solid ${NB_COLORS.mutedOnInk}`,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            ...NB_MONO_SX,
            fontSize: 12,
            fontWeight: 700,
            color: NB_COLORS.paperOnInk,
          }}
        >
          TRUSTED BY
        </Typography>
        <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.mutedOnInk }}>
          WORLD-CLASS BRANDS + A-LIST TALENT
        </Typography>
      </Box>
      <LogoBelt />
    </Box>
  );
}

export function TrustPress() {
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
          IN THE PRESS
        </Typography>
        <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
          PRESS INDEX · EXTERNAL LINKS
        </Typography>
      </Box>

      {pressLinks.map((item, i) => (
        <Box
          key={item.url}
          component="a"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "auto 1fr auto", md: "80px 240px 1fr auto" },
            alignItems: "center",
            gap: { xs: 2, md: 3 },
            px: { xs: 3, md: 6 },
            py: { xs: 2, md: 2.5 },
            borderBottom: i < pressLinks.length - 1 ? NB_RULE : "none",
            textDecoration: "none",
            color: NB_COLORS.ink,
            "&:hover": {
              bgcolor: NB_COLORS.ink,
              color: NB_COLORS.paperOnInk,
              "& .press-meta": { color: NB_COLORS.mutedOnInk },
            },
          }}
        >
          <Typography
            className="press-meta"
            sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}
          >
            P.{String(i + 1).padStart(2, "0")}
          </Typography>
          <Typography
            sx={{
              ...NB_MONO_SX,
              fontSize: { xs: 12, md: 14 },
              fontWeight: 700,
              color: "inherit",
            }}
          >
            {item.outlet}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, md: 17 },
              color: "inherit",
              gridColumn: { xs: "2 / 4", md: "auto" },
            }}
          >
            {item.headline}
          </Typography>
          <ArrowOutwardIcon
            sx={{
              fontSize: 20,
              color: "inherit",
              display: { xs: "none", md: "block" },
              justifySelf: "end",
            }}
          />
        </Box>
      ))}
    </Box>
  );
}
