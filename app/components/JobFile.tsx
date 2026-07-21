"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, IconButton, Typography } from "@mui/material";
import type { Project } from "@/lib/projects";
import { VERTICALS } from "@/lib/projects";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_RULE,
} from "@/lib/theme";

function Filmstrip({ images, alt }: { images: string[]; alt: string }) {
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
              width: { xs: "82%", sm: "60%", md: "44%" },
              scrollSnapAlign: "start",
              borderRight: idx < images.length - 1 ? NB_RULE : "none",
              position: "relative",
              aspectRatio: "4 / 3",
              bgcolor: NB_COLORS.silverLight,
            }}
          >
            <Image
              src={image}
              alt={`${alt}, frame ${idx + 1}`}
              fill
              sizes="(max-width: 600px) 82vw, 44vw"
              style={{ objectFit: "cover" }}
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

export default function JobFile({ project }: { project: Project }) {
  const vertical = VERTICALS[project.vertical];

  return (
    <Box sx={{ borderBottom: NB_RULE }}>
      {/* Job header bar */}
      <Box
        sx={{
          bgcolor: NB_COLORS.ink,
          color: NB_COLORS.paperOnInk,
          display: "flex",
          alignItems: "center",
          gap: { xs: 1.5, md: 3 },
          px: { xs: 3, md: 6 },
          py: 1.25,
          flexWrap: "wrap",
        }}
      >
        <Typography
          sx={{
            ...NB_MONO_SX,
            fontSize: 12,
            fontWeight: 700,
            bgcolor: NB_COLORS.silver,
            color: NB_COLORS.onSilver,
            px: 1,
            py: 0.25,
          }}
        >
          JOB {project.jobNo}
        </Typography>
        {vertical.href ? (
          <Typography
            component={Link}
            href={vertical.href}
            sx={{
              ...NB_MONO_SX,
              fontSize: 12,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "underline",
              textUnderlineOffset: 3,
              "&:hover": { color: NB_COLORS.mutedOnInk },
            }}
          >
            {vertical.label}
          </Typography>
        ) : (
          <Typography sx={{ ...NB_MONO_SX, fontSize: 12, fontWeight: 700 }}>
            {vertical.label}
          </Typography>
        )}
        <Typography sx={{ ...NB_MONO_SX, fontSize: 12 }}>
          CLIENT: {project.client}
        </Typography>
        <Typography
          sx={{
            ...NB_MONO_SX,
            fontSize: 12,
            ml: "auto",
            color: NB_COLORS.mutedOnInk,
            display: { xs: "none", md: "block" },
          }}
        >
          {project.scope}
        </Typography>
      </Box>

      <Filmstrip images={project.images} alt={project.title} />

      {/* Job sheet copy */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
          borderTop: NB_RULE,
        }}
      >
        <Box
          sx={{
            px: { xs: 3, md: 6 },
            py: { xs: 2.5, md: 4 },
            borderRight: { md: NB_RULE },
            borderBottom: { xs: NB_RULE, md: "none" },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              ...NB_DISPLAY_SX,
              fontSize: { xs: 26, sm: 32, md: 38 },
              color: NB_COLORS.ink,
              mb: 2,
            }}
          >
            {project.title}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {project.stats.map((stat) => (
              <Box
                key={stat.label}
                sx={{ border: NB_RULE, px: 1.25, py: 0.5 }}
              >
                <Typography
                  component="span"
                  sx={{ ...NB_MONO_SX, fontSize: 12, fontWeight: 700, color: NB_COLORS.ink }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  component="span"
                  sx={{ ...NB_MONO_SX, fontSize: 10, color: NB_COLORS.steel, ml: 0.75 }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ px: { xs: 3, md: 6 }, py: { xs: 2.5, md: 4 } }}>
          <Typography sx={{ fontSize: { xs: 15, md: 17 }, color: NB_COLORS.ink }}>
            {project.blurb}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
