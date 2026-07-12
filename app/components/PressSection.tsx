import React from "react";
import { Box, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_RULE,
} from "@/lib/theme";

const pressItems = [
  {
    outlet: "Business Insider",
    headline: "Bella Thorne Coachella Afterparty",
    url: "https://www.businessinsider.com/bella-thorne-coachella-after-party-photos-diplo-2022-4",
  },
  {
    outlet: "Forbes",
    headline: "Best Canned Cocktail Original Southside",
    url: "https://www.forbes.com/sites/karlaalindahao/2024/03/01/best-canned-cocktail-original-southside/",
  },
  {
    outlet: "Rolling Stone",
    headline: "Theia Returns to Alt-Pop",
    url: "https://au.rollingstone.com/music/music-news/theia-crucified-by-u-45218/",
  },
];

const PressSection = () => {
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
          OUR WORK IN THE PRESS
        </Typography>
        <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
          PRESS INDEX · EXTERNAL LINKS
        </Typography>
      </Box>

      {pressItems.map((item, i) => (
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
            borderBottom: i < pressItems.length - 1 ? NB_RULE : "none",
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
};

export default PressSection;
