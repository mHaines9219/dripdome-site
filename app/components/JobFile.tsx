"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import NBImage from "./NBImage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, IconButton, Typography } from "@mui/material";
import type {
  Project,
  ProjectImage,
  ProjectRender,
  ProjectStat,
} from "@/lib/projects";
import { VERTICALS } from "@/lib/projects";
import {
  NB_BORDER_WIDTH,
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_FOCUS_VISIBLE_SX,
  NB_HAIRLINE,
  NB_MONO_SX,
  NB_RULE,
} from "@/lib/theme";
import { useDragScroll } from "@/lib/useDragScroll";

/** DOM id of a project's sheet, the target of archive index and job row links. */
export const jobAnchorId = (slug: string) => `job-${slug}`;

/** Clears the sticky navbar when a #job-<slug> link lands. Same as #featured-work. */
export const JOB_SCROLL_MARGIN = "120px";

/**
 * Card shell shared by the full job file and the compact job row: an 80%
 * column of the page frame from tablet up (full bleed on phones), with side
 * rules so each sheet reads as its own card.
 */
export const JOB_SHEET_SX = {
  width: { xs: "100%", md: "80%" },
  mx: "auto",
  scrollMarginTop: JOB_SCROLL_MARGIN,
  borderBottom: NB_RULE,
  borderLeft: { md: NB_RULE },
  borderRight: { md: NB_RULE },
} as const;

// Concept render column: a small outlined figure pinned beside the build
// frames, not a full-bleed panel. Frames keep their normal width.
const RENDER_WIDTH_MD = 0.22;
// Silver gutter that separates the concept render from the build frames.
const RENDER_DIVIDER_PX = 28;

const pad = (n: number) => String(n).padStart(2, "0");

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
        <Box
          component="figure"
          sx={{
            m: 0,
            width: { xs: "62%", sm: "44%", md: "100%" },
            maxWidth: 360,
            bgcolor: NB_COLORS.paper,
            border: NB_RULE,
          }}
        >
          <Box
            sx={{
              position: "relative",
              aspectRatio: "4 / 3",
              borderBottom: NB_HAIRLINE,
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
            RENDER
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
          borderTop: { xs: NB_HAIRLINE, md: "none" },
          borderBottom: { xs: NB_HAIRLINE, md: "none" },
          borderLeft: { md: NB_HAIRLINE },
          borderRight: { md: NB_HAIRLINE },
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

/**
 * Ink header bar: job number, vertical, client, and the scope line. Shared by
 * the full job file and the compact job row so the two never drift.
 */
export function JobHeaderBar({ project }: { project: Project }) {
  const vertical = VERTICALS[project.vertical];
  const label = { ...NB_MONO_SX, fontSize: 12, fontWeight: 700 } as const;

  return (
    <Box
      sx={{
        bgcolor: NB_COLORS.ink,
        color: NB_COLORS.paperOnInk,
        display: "flex",
        alignItems: "center",
        gap: { xs: 1.5, md: 3 },
        px: { xs: 3, md: 4 },
        py: 1.25,
        flexWrap: "wrap",
      }}
    >
      <Typography
        sx={{
          ...label,
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
            ...label,
            color: "inherit",
            textDecoration: "underline",
            textUnderlineOffset: 3,
            "&:hover": { color: NB_COLORS.mutedOnInk },
          }}
        >
          {vertical.label}
        </Typography>
      ) : (
        <Typography sx={label}>{vertical.label}</Typography>
      )}
      <Typography sx={{ ...NB_MONO_SX, fontSize: 12 }}>
        CLIENT: {project.client}
      </Typography>
      <Typography
        sx={{
          ...NB_MONO_SX,
          fontSize: 11,
          color: NB_COLORS.mutedOnInk,
          ml: { md: "auto" },
          flexBasis: { xs: "100%", md: "auto" },
        }}
      >
        {project.scope}
      </Typography>
    </Box>
  );
}

/** Stats as one wrapping mono line: bold value, steel label, dot separators. */
export function StatLine({ stats }: { stats: ProjectStat[] }) {
  return (
    <Typography
      component="p"
      sx={{
        ...NB_MONO_SX,
        fontSize: 12,
        lineHeight: 1.9,
        color: NB_COLORS.steel,
        m: 0,
      }}
    >
      {stats.map((stat, i) => (
        <Box component="span" key={stat.label}>
          {i > 0 && " · "}
          <Box component="span" sx={{ display: "inline-block" }}>
            <Box
              component="span"
              sx={{ fontWeight: 700, color: NB_COLORS.ink }}
            >
              {stat.value}
            </Box>{" "}
            {stat.label}
          </Box>
        </Box>
      ))}
    </Typography>
  );
}

const ARROW_SIZE = 32;
const ARROW_OUTLINE = `${NB_BORDER_WIDTH}px solid ${NB_COLORS.paperOnInk}`;

function ArrowButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <IconButton
      aria-label={label}
      onClick={onClick}
      sx={{
        width: ARROW_SIZE,
        height: ARROW_SIZE,
        borderRadius: 0,
        color: "inherit",
        transition: "transform 120ms ease",
        "&:hover": { bgcolor: NB_COLORS.paperOnInk, color: NB_COLORS.ink },
        "&:active": { transform: "translate(1px, 1px)" },
        ...NB_FOCUS_VISIBLE_SX,
      }}
    >
      {children}
    </IconButton>
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
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
      {render && <RenderPanel render={render} alt={alt} />}
      {/* The overlay sits on this wrapper, not the track, so it stays put while the track scrolls. */}
      <Box sx={{ position: "relative", flex: 1, minWidth: 0 }}>
        <Box
          ref={trackRef}
          onScroll={handleScroll}
          {...drag}
          sx={{
            cursor: "grab",
            userSelect: "none",
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
                  borderRight: idx < images.length - 1 ? NB_HAIRLINE : "none",
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

        {images.length > 1 && (
          <Box
            sx={{
              position: "absolute",
              left: 12,
              bottom: 12,
              display: "flex",
              alignItems: "center",
              bgcolor: NB_COLORS.ink,
              color: NB_COLORS.paperOnInk,
              border: ARROW_OUTLINE,
            }}
          >
            <ArrowButton label="Previous frame" onClick={() => nudge(-1)}>
              <ArrowBackIcon fontSize="small" />
            </ArrowButton>
            <Typography
              aria-live="polite"
              sx={{
                ...NB_MONO_SX,
                fontSize: 11,
                fontWeight: 700,
                px: 1.25,
                borderLeft: ARROW_OUTLINE,
                borderRight: ARROW_OUTLINE,
                lineHeight: `${ARROW_SIZE}px`,
              }}
            >
              {pad(index + 1)}/{pad(images.length)}
            </Typography>
            <ArrowButton label="Next frame" onClick={() => nudge(1)}>
              <ArrowForwardIcon fontSize="small" />
            </ArrowButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default function JobFile({ project }: { project: Project }) {
  return (
    <Box component="article" id={jobAnchorId(project.slug)} sx={JOB_SHEET_SX}>
      <JobHeaderBar project={project} />

      <Filmstrip
        images={project.images}
        alt={project.title}
        objectPosition={project.imagePosition}
        objectFit={project.imageFit}
        render={project.render}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
          borderTop: NB_HAIRLINE,
        }}
      >
        <Box
          sx={{
            px: { xs: 3, md: 4 },
            py: { xs: 2.5, md: 3 },
            borderRight: { md: NB_HAIRLINE },
            borderBottom: { xs: NB_HAIRLINE, md: "none" },
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
          <StatLine stats={project.stats} />
        </Box>
        <Box sx={{ px: { xs: 3, md: 4 }, py: { xs: 2.5, md: 3 } }}>
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
