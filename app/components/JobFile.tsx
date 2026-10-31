"use client";

import { useRef, useState } from "react";
import NBImage from "./NBImage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, IconButton, Typography } from "@mui/material";
import type { Project, ProjectImage, ProjectRender } from "@/lib/projects";
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

/** Longer stat values (words, dimensions) step down so they fit one line. */
function statValueSize(value: string) {
  if (value.length > 10) return { xs: 16, md: 18, lg: 20 };
  if (value.length > 7) return { xs: 22, md: 24, lg: 26 };
  return { xs: 26, md: 32, lg: 36 };
}

/**
 * `spaced` is for lists that leave room between sheets (home case
 * studies): the sheet gets a top rule too so it reads as a closed card.
 * Flush stacks (vertical pages) share rules and leave it off.
 */
export default function JobFile({
  project,
  spaced = false,
}: {
  project: Project;
  spaced?: boolean;
}) {
  return (
    // Job files sit in an 80% column of the page frame from tablet up (full
    // bleed on phones), with side rules so each sheet reads as its own card.
    <Box
      sx={{
        width: { xs: "100%", md: "80%" },
        mx: "auto",
        borderTop: { md: spaced ? NB_RULE : "none" },
        borderBottom: NB_RULE,
        borderLeft: { md: NB_RULE },
        borderRight: { md: NB_RULE },
      }}
    >
      {/* Title bar */}
      <Box
        sx={{
          bgcolor: NB_COLORS.ink,
          color: NB_COLORS.paperOnInk,
          px: { xs: 3, md: 6 },
          py: { xs: 1.5, md: 2 },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            ...NB_DISPLAY_SX,
            fontSize: { xs: 18, sm: 22, md: 26 },
            color: "inherit",
          }}
        >
          {project.title}
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
        {/* Stat cards fill the left column edge to edge */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridAutoRows: "1fr",
            borderRight: { md: NB_RULE },
            borderBottom: { xs: NB_RULE, md: "none" },
          }}
        >
            {project.stats.map((stat, i) => {
              const last = i === project.stats.length - 1;
              // An odd last cell spans the row so the grid stays full width
              const spans = last && project.stats.length % 2 === 1;
              return (
                <Box
                  key={stat.label}
                  sx={{
                    px: { xs: 3, md: 4 },
                    py: { xs: 2.5, md: 3 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 0.5,
                    gridColumn: spans ? "1 / -1" : "auto",
                    borderRight: i % 2 === 0 && !spans ? NB_RULE : "none",
                    borderBottom: i + 2 < project.stats.length ? NB_RULE : "none",
                    // Checkerboard: tint flips every cell and every row
                    bgcolor:
                      (i + Math.floor(i / 2)) % 2 === 1
                        ? NB_COLORS.silverLight
                        : NB_COLORS.paper,
                  }}
                >
                  <Typography
                    sx={{
                      ...NB_DISPLAY_SX,
                      fontSize: statValueSize(stat.value),
                      lineHeight: 1,
                      // Values stay on one line from tablet up so the grid
                      // holds its third of the column; phones stack freely.
                      whiteSpace: { xs: "normal", md: "nowrap" },
                      color: NB_COLORS.ink,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    sx={{ ...NB_MONO_SX, fontSize: 10, lineHeight: 1.3, color: NB_COLORS.steel }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              );
            })}
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
