"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import NBImage from "./NBImage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, IconButton, Typography } from "@mui/material";
import type { Project, ProjectImage, ProjectRender } from "@/lib/projects";
import { VERTICALS } from "@/lib/projects";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_RULE,
  NB_SHADOW_OFFSET,
  nbShadow,
} from "@/lib/theme";
import { useDragScroll } from "@/lib/useDragScroll";

// Concept render column: a small outlined figure pinned beside the build
// frames, not a full-bleed panel. Frames keep their normal width.
const RENDER_WIDTH_MD = 0.22;
// Silver gutter that separates the concept render from the build frames.
const RENDER_DIVIDER_PX = 28;

/**
 * Concept render figure plus the silver "RENDER -> BUILD" gutter. Shared by
 * the home / vertical job files and the brand activations case studies so a
 * render reads the same on every surface. Stacks above the frames on phones.
 */
export function RenderPanel({
  render,
  alt,
  widthMd = RENDER_WIDTH_MD,
}: {
  render: ProjectRender;
  alt: string;
  /** Fraction of the row the render column takes from tablet up. */
  widthMd?: number;
}) {
  return (
    <>
      <Box
        sx={{
          flex: { xs: "none", md: `0 0 ${widthMd * 100}%` },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: NB_COLORS.silverLight,
          px: { xs: 3, md: 2.5 },
          py: { xs: 2.5, md: 2 },
        }}
      >
        {/* Outlined figure: ink frame + hard offset shadow, mono caption */}
        <Box
          component="figure"
          sx={{
            m: 0,
            width: { xs: "62%", sm: "44%", md: "100%" },
            maxWidth: 360,
            bgcolor: NB_COLORS.paper,
            border: NB_RULE,
            boxShadow: nbShadow(),
            // Leave room for the shadow inside the padded column.
            mr: `${NB_SHADOW_OFFSET}px`,
            mb: `${NB_SHADOW_OFFSET}px`,
          }}
        >
          <Box
            sx={{
              position: "relative",
              aspectRatio: "4 / 3",
              borderBottom: NB_RULE,
            }}
          >
            <NBImage
              src={render.src}
              alt={`${alt}, concept render`}
              fill
              sizes="(max-width: 900px) 60vw, 22vw"
              style={{
                objectFit: "cover",
                objectPosition: render.position ?? "center",
              }}
            />
          </Box>
          <Typography
            component="figcaption"
            sx={{
              ...NB_MONO_SX,
              px: 1,
              py: 0.5,
              fontSize: 10,
              fontWeight: 700,
              bgcolor: NB_COLORS.ink,
              color: NB_COLORS.paperOnInk,
            }}
          >
            FIG. 00 · 3D RENDER
          </Typography>
        </Box>
      </Box>
      <Box
        aria-hidden
        sx={{
          flex: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: NB_COLORS.silver,
          color: NB_COLORS.onSilver,
          width: { xs: "auto", md: RENDER_DIVIDER_PX },
          height: { xs: RENDER_DIVIDER_PX, md: "auto" },
          borderTop: { xs: NB_RULE, md: "none" },
          borderBottom: { xs: NB_RULE, md: "none" },
          borderLeft: { md: NB_RULE },
          borderRight: { md: NB_RULE },
        }}
      >
        <Typography
          sx={{
            ...NB_MONO_SX,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.12em",
            whiteSpace: "nowrap",
            writingMode: { xs: "horizontal-tb", md: "vertical-rl" },
            transform: { md: "rotate(180deg)" },
          }}
        >
          RENDER → BUILD
        </Typography>
      </Box>
    </>
  );
}

function Filmstrip({
  images,
  alt,
  objectPosition = "center",
  objectFit = "contain",
  render,
}: {
  images: ProjectImage[];
  alt: string;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
  render?: ProjectRender;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useDragScroll(trackRef);
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
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        {render && <RenderPanel render={render} alt={alt} />}
        <Box
          ref={trackRef}
          onScroll={handleScroll}
          {...drag}
          sx={{
            cursor: "grab",
            userSelect: "none",
            flex: 1,
            minWidth: 0,
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {images.map((image, idx) => {
            const src = typeof image === "string" ? image : image.src;
            const position =
              typeof image === "string"
                ? objectPosition
                : (image.position ?? objectPosition);
            return (
              <Box
                key={src}
                sx={{
                  flex: "0 0 auto",
                  width: { xs: "82%", sm: "60%", md: "44%" },
                  scrollSnapAlign: "start",
                  borderRight: idx < images.length - 1 ? NB_RULE : "none",
                  position: "relative",
                  aspectRatio: "4 / 3",
                  // Frames letterbox the whole photo; the dark well hides
                  // the bars instead of drawing light bands around them.
                  bgcolor: NB_COLORS.well,
                }}
              >
                <NBImage
                  src={src}
                  alt={`${alt}, frame ${idx + 1}`}
                  fill
                  sizes="(max-width: 600px) 82vw, 44vw"
                  style={{ objectFit, objectPosition: position }}
                />
              </Box>
            );
          })}
        </Box>
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
        <Typography
          sx={{ ...NB_MONO_SX, fontSize: 12, px: 2, color: NB_COLORS.steel }}
        >
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
    // Job files sit in an 80% column of the page frame from tablet up (full
    // bleed on phones), with side rules so each sheet reads as its own card.
    <Box
      sx={{
        width: { xs: "100%", md: "80%" },
        mx: "auto",
        borderBottom: NB_RULE,
        borderLeft: { md: NB_RULE },
        borderRight: { md: NB_RULE },
      }}
    >
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

      <Filmstrip
        images={project.images}
        alt={project.title}
        objectPosition={project.imagePosition}
        objectFit={project.imageFit}
        render={project.render}
      />

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
              <Box key={stat.label} sx={{ border: NB_RULE, px: 1.25, py: 0.5 }}>
                <Typography
                  component="span"
                  sx={{
                    ...NB_MONO_SX,
                    fontSize: 12,
                    fontWeight: 700,
                    color: NB_COLORS.ink,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    ...NB_MONO_SX,
                    fontSize: 10,
                    color: NB_COLORS.steel,
                    ml: 0.75,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ px: { xs: 3, md: 6 }, py: { xs: 2.5, md: 4 } }}>
          <Typography
            sx={{ fontSize: { xs: 15, md: 17 }, color: NB_COLORS.ink }}
          >
            {project.blurb}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
