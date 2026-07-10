import React from "react";
import { Box, Typography } from "@mui/material";
import { ACCENT, INK, PAPER, SURFACE, nbShadow } from "@/lib/theme";

const pressItems = [
  {
    headline: "BUSINESS INSIDER - BELLA THORNE COACHELLA AFTERPARTY",
    url: "https://www.businessinsider.com/bella-thorne-coachella-after-party-photos-diplo-2022-4",
  },
  {
    headline: "FORBES - BEST CANNED COCKTAIL ORIGINAL SOUTHSIDE",
    url: "https://www.forbes.com/sites/karlaalindahao/2024/03/01/best-canned-cocktail-original-southside/",
  },
  {
    headline: "ROLLING STONE - THEIA RETURNS TO ALT-POP",
    url: "https://au.rollingstone.com/music/music-news/theia-crucified-by-u-45218/",
  },
];

const PressSection = () => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          textAlign: "center",
          width: "80vw",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            textDecoration: "none",
            color: "white",

            mb: 2,
            fontSize: { xs: "30px", sm: "80px" },
          }}
        >
          Our Work in the{" "}
          <Box component="span" sx={{ color: ACCENT }}>
            Press
          </Box>
        </Typography>
        {pressItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              padding: 2,
              border: `3px solid ${PAPER}`,
              borderRadius: 0,
              backgroundColor: SURFACE,
              boxShadow: nbShadow(6, ACCENT),
              textAlign: "center",
              color: INK,
              transition: "transform 120ms ease, box-shadow 120ms ease",
              "&:hover": {
                backgroundColor: ACCENT,
                color: INK,
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
              variant="h2"
              component="a"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                fontSize: { xs: "20px", sm: "30px" },
              }}
            >
              {item.headline}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PressSection;
