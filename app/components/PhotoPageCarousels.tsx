"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, IconButton, Typography } from "@mui/material";
import { photographyData } from "../portfolio/data";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_RULE,
} from "@/lib/theme";

function ArchiveFilmstrip({ images, alt }: { images: string[]; alt: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    setIndex(Math.round((el.scrollLeft / maxScroll) * (images.length - 1)));
  };

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: "smooth" });
  };

  return (
    <Box>
      <Box
        ref={trackRef}
        onScroll={handleScroll}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {images.map((image, idx) => (
          <Box
            key={image}
            sx={{
              flex: "0 0 auto",
              width: { xs: "72%", sm: "44%", md: "30%", lg: "24%" },
              scrollSnapAlign: "start",
              borderRight: idx < images.length - 1 ? NB_RULE : "none",
              position: "relative",
              aspectRatio: "3 / 4",
              bgcolor: NB_COLORS.well,
            }}
          >
            <Image
              src={image}
              alt={`${alt}, frame ${idx + 1}`}
              fill
              sizes="(max-width: 600px) 72vw, (max-width: 900px) 44vw, 24vw"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </Box>
        ))}
      </Box>

      {/* Control bar */}
      <Box sx={{ display: "flex", alignItems: "center", borderTop: NB_RULE }}>
        <IconButton
          aria-label="Previous frame"
          onClick={() => nudge(-1)}
          sx={{
            borderRadius: 0,
            borderRight: NB_RULE,
            color: NB_COLORS.ink,
            px: 2.5,
            py: 1,
            "&:hover": { bgcolor: NB_COLORS.ink, color: NB_COLORS.paperOnInk },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          aria-label="Next frame"
          onClick={() => nudge(1)}
          sx={{
            borderRadius: 0,
            borderRight: NB_RULE,
            color: NB_COLORS.ink,
            px: 2.5,
            py: 1,
            "&:hover": { bgcolor: NB_COLORS.ink, color: NB_COLORS.paperOnInk },
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
        <Typography sx={{ ...NB_MONO_SX, fontSize: 12, px: 2, color: NB_COLORS.steel }}>
          FRAME {String(index + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </Typography>
        <Typography
          sx={{
            ...NB_MONO_SX,
            fontSize: 12,
            px: 2,
            ml: "auto",
            color: NB_COLORS.steel,
            display: { xs: "none", sm: "block" },
          }}
        >
          DRAG OR SCROLL →
        </Typography>
      </Box>
    </Box>
  );
}

const PhotoPageCarousels: React.FC = () => {
  return (
    <>
      {photographyData.map((section, index) => (
        <Box
          key={section.category}
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
              {section.category}
            </Typography>
            <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
              ARCHIVE {String(index + 1).padStart(2, "0")} ·{" "}
              {String(section.images.length).padStart(2, "0")} FRAMES
            </Typography>
          </Box>

          <ArchiveFilmstrip images={section.images} alt={section.category} />
        </Box>
      ))}
    </>
  );
};

export default PhotoPageCarousels;
