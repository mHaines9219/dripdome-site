"use client";

import { useEffect, useRef, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NBImage from "../components/NBImage";
import { RenderPanel } from "../components/JobFile";
import type { ProjectRender } from "@/lib/projects";
import { motion, useInView } from "framer-motion";
import { NB_COLORS, NB_DISPLAY_SX, NB_MONO_SX, NB_RULE } from "@/lib/theme";
import { useDragScroll } from "@/lib/useDragScroll";

// Case studies are limited to the activation vertical (live events, booths,
// installations). Campaign and editorial shoots live on /set-design. Metrics
// reflect real numbers where available; text heroes link to press or reports.

type HeroMetric =
  | {
      kind: "count";
      target: number;
      suffix?: string;
      prefix?: string;
      label: string;
      note?: string;
    }
  | {
      kind: "text";
      value: string;
      label: string;
      link?: string;
    };

type DonutSlice = { label: string; value: number; color: string };

type StatTile = { value: string; label: string };

type CaseStudy = {
  number: string;
  client: string;
  category: string;
  headline: string;
  copy: string;
  image: string;
  /**
   * When set, the plate renders a scroll-snap carousel instead of one image.
   * An object entry overrides the object-position for that frame only.
   */
  images?: (string | { src: string; position?: string })[];
  imageAlt: string;
  /** CSS object-position for the plate image when it crops badly at center. */
  imagePosition?: string;
  /** "contain" letterboxes tall shots instead of cropping them. */
  imageFit?: "cover" | "contain";
  /** Pre-build concept render, shown in its own panel beside the plate. */
  render?: ProjectRender;
  youtubeId?: string;
  hero: HeroMetric;
  breakdown?: { title: string; slices: DonutSlice[] };
  stats?: StatTile[];
};

export const DONUT_COLORS = [
  NB_COLORS.silver,
  NB_COLORS.steel,
  NB_COLORS.silverLight,
  NB_COLORS.mutedOnInk,
];

const CASE_STUDIES: CaseStudy[] = [
  {
    number: "01",
    client: "LOWER EAST SIDE GIRLS CLUB",
    category: "CHARITY ACTIVATION",
    headline: "Alice in Wonderland photo moment for 200 guests.",
    copy: "Built a 10 by 8 foot Alice in Wonderland photo moment featuring custom vinyl wrapped playing cards with the organization's initials and a lush garden wall backdrop. Fabricated off site and installed in under two hours despite strict venue constraints. Organizers cited it as the highlight of the evening.",
    image: "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/view.jpg",
    render: {
      src: "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/render.jpg",
    },
    imageAlt: "Lower East Side Girls Club Alice in Wonderland activation",
    hero: {
      kind: "count",
      target: 200,
      suffix: "+",
      label: "GUESTS IN ATTENDANCE",
    },
    stats: [
      { value: "100+", label: "UGC STORIES" },
      { value: "< 2 HR", label: "VENUE INSTALL" },
      { value: "10 × 8 FT", label: "CUSTOM BUILD" },
    ],
  },
  {
    number: "02",
    client: "VITA KARI",
    category: "PUBLIC ART INSTALLATION",
    headline: "A human billboard on the WeHo Pride parade route.",
    copy: "Fabricated and installed THIS IS NOT A BILLBOARD, artist Vita Kari's 16 foot monochrome light box mounted on the roof of Endless Romance on Santa Monica Blvd for WeHo Pride 2026. From the street it read as a half rendered digital billboard. Up close, live performers inside repeated looping gestures for hours, a nod to Magritte's 'This is not a pipe.' Funded through Instagram's Drafts Fund and covered by WeHo Times and Wonderland.",
    image: "https://dripdome-site.s3.us-east-2.amazonaws.com/vita_tinab/1.png",
    render: {
      src: "https://dripdome-site.s3.us-east-2.amazonaws.com/vita_tinab/render.jpg",
    },
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/vita_tinab/1.png",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/vita_tinab/2.png",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/vita_tinab/3.png",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/vita_tinab/4.png",
    ],
    imageAlt:
      "THIS IS NOT A BILLBOARD by Vita Kari, a rooftop light box installation fabricated by DripDome for WeHo Pride",
    hero: {
      kind: "text",
      value: "8.8M+",
      label: "SOCIAL VIEWS",
      link: "https://wehotimes.com/artist-vita-kari-debuts-human-billboard-installation-in-west-hollywood-for-weho-pride/",
    },
    stats: [
      { value: "16 FT", label: "LIGHT BOX BUILD" },
      { value: "100K+", label: "WEHO PRIDE ATTENDEES" },
      { value: "IG DRAFTS FUND", label: "PROJECT BACKING" },
    ],
  },
  {
    number: "03",
    client: "JAMES ORO",
    category: "COMPLEXCON BOOTH",
    headline: "A deconstructed jail cell on the ComplexCon floor.",
    copy: "Sculptural retail booth for eyewear brand James Oro at ComplexCon 2022, Long Beach Convention Center. Oversized bar-wall forms with cut-through entry points framed the James Oro graffiti wall and cased frames, and pulled the crowd in off the aisle. Every wall was fabricated in-house from plywood, fence posts, and friction-fit PVC, then painted, trucked to Long Beach, and installed on site.",
    image: "https://dripdome-site.s3.us-east-2.amazonaws.com/oro/1.jpg",
    render: {
      src: "https://dripdome-site.s3.us-east-2.amazonaws.com/oro/render.jpg",
    },
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/oro/1.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/oro/2.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/oro/3.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/oro/4.jpg",
    ],
    imageAlt:
      "James Oro ComplexCon booth by DripDome, a deconstructed jail cell of oversized bar walls",
    imageFit: "contain",
    hero: {
      kind: "text",
      value: "LONG BEACH",
      label: "COMPLEXCON 2022",
    },
    stats: [
      { value: "94", label: "HAND-DRILLED PIPE HOLES" },
      { value: "IN-HOUSE", label: "BUILT + PAINTED" },
      { value: "2 DAYS", label: "ON THE SHOW FLOOR" },
    ],
  },
  {
    number: "04",
    client: "ISMYGIRL · NMG MANAGEMENT",
    category: "EXPO SHOWCASE BOOTH",
    headline: "Three photo sets that doubled day-one signups.",
    copy: "Booth for ismygirl and NMG Management at X3 Expo 2023, the creator expo at the Hollywood Palladium. Instead of a branded backdrop, the footprint became three places to be photographed: a marble checkerboard with giant chess pieces, a floral wall with a wire butterfly bench, and a pink classroom with lockers, chalkboard, and picnic tables. Creators and fans lined up to shoot all weekend.",
    image: "https://dripdome-site.s3.us-east-2.amazonaws.com/x3/3.jpg",
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/x3/3.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/x3/1.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/x3/2.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/x3/4.jpg",
    ],
    imageAlt:
      "X3 Expo showcase booth by DripDome with pink classroom, floral wall, and giant chess set",
    hero: {
      kind: "count",
      target: 2,
      suffix: "×",
      label: "DAY-ONE EMAIL SIGNUPS VS PRIOR YEAR",
      note: "Reported by the vendor after day one of the show",
    },
    stats: [
      { value: "3 SETS", label: "ONE BOOTH FOOTPRINT" },
      { value: "PALLADIUM", label: "X3 EXPO · JAN 2023" },
      { value: "2 DAYS", label: "SHOW RUN" },
    ],
  },
];

function useCountUp(target: number, inView: boolean, duration = 1600) {
  // Starts at the target so server HTML carries the real number; the
  // count-up only runs client-side once in view (and never for
  // reduced-motion users).
  const [count, setCount] = useState(target);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // No synchronous reset: the first interval tick (16ms) starts the
    // count-up, so the SSR'd target value never visibly flashes.
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

function HeroMetricView({
  metric,
  inView,
}: {
  metric: HeroMetric;
  inView: boolean;
}) {
  const headlineSx = {
    ...NB_DISPLAY_SX,
    fontSize: { xs: 48, md: 64, lg: 80 },
    color: NB_COLORS.ink,
  } as const;

  const count = useCountUp(metric.kind === "count" ? metric.target : 0, inView);

  return (
    <Box>
      {metric.kind === "count" ? (
        <Typography component="div" sx={headlineSx}>
          {metric.prefix}
          {count.toLocaleString()}
          {metric.suffix}
        </Typography>
      ) : metric.link ? (
        <Typography
          component="a"
          href={metric.link}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            ...headlineSx,
            display: "inline-block",
            textDecoration: "underline",
            textDecorationThickness: 3,
            textUnderlineOffset: 6,
            "&:hover": {
              bgcolor: NB_COLORS.ink,
              color: NB_COLORS.paperOnInk,
            },
          }}
        >
          {metric.value}
        </Typography>
      ) : (
        <Typography component="div" sx={headlineSx}>
          {metric.value}
        </Typography>
      )}

      <Typography
        sx={{
          ...NB_MONO_SX,
          mt: 1,
          fontSize: { xs: 11, md: 12 },
          fontWeight: 700,
          color: NB_COLORS.steel,
        }}
      >
        {metric.label}
      </Typography>

      {metric.kind === "count" && metric.note ? (
        <Typography
          sx={{
            ...NB_MONO_SX,
            mt: 0.75,
            fontSize: { xs: 10, md: 11 },
            color: NB_COLORS.steel,
          }}
        >
          {metric.note}
        </Typography>
      ) : null}
    </Box>
  );
}

function DonutChart({
  slices,
  title,
  size = 140,
  strokeWidth = 22,
}: {
  slices: DonutSlice[];
  title: string;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const total = slices.reduce((sum, s) => sum + s.value, 0);

  const arcs = slices.reduce<
    (DonutSlice & { dash: number; gap: number; offset: number; pct: number })[]
  >((acc, slice) => {
    const fraction = slice.value / total;
    const dash = circumference * fraction;
    const gap = circumference - dash;
    const prev = acc[acc.length - 1];
    const offset = prev ? prev.offset - prev.dash : 0;
    acc.push({ ...slice, dash, gap, offset, pct: Math.round(fraction * 100) });
    return acc;
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        gap: { xs: 2, sm: 3 },
      }}
    >
      <Box sx={{ position: "relative", width: size, height: size }}>
        <svg
          width={size}
          height={size}
          style={{ transform: "rotate(-90deg)" }}
          aria-label={title}
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={NB_COLORS.silverLight}
            strokeWidth={strokeWidth}
          />
          {arcs.map((arc) => (
            <circle
              key={arc.label}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={arc.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${arc.dash} ${arc.gap}`}
              strokeDashoffset={arc.offset}
              strokeLinecap="butt"
            />
          ))}
        </svg>
      </Box>

      <Box sx={{ minWidth: 160 }}>
        <Typography
          sx={{
            ...NB_MONO_SX,
            fontSize: { xs: 10, md: 11 },
            fontWeight: 700,
            color: NB_COLORS.steel,
            mb: 1,
          }}
        >
          {title}
        </Typography>
        {arcs.map((arc) => (
          <Box
            key={arc.label}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              py: 0.4,
              fontSize: { xs: 13, md: 14 },
              color: NB_COLORS.ink,
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: arc.color,
                border: NB_RULE,
                flexShrink: 0,
              }}
            />
            <Typography component="span" sx={{ flex: 1, fontSize: "inherit" }}>
              {arc.label}
            </Typography>
            <Typography
              component="span"
              sx={{ fontWeight: 700, fontSize: "inherit" }}
            >
              {arc.pct}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function StatCluster({ stats }: { stats: StatTile[] }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr 1fr",
          sm: "repeat(auto-fit, minmax(140px, 1fr))",
        },
        gap: 2,
        width: "100%",
      }}
    >
      {stats.map((s, i) => (
        <Box
          key={s.label}
          sx={{
            p: 2,
            border: NB_RULE,
            bgcolor: i % 2 === 1 ? NB_COLORS.silverLight : NB_COLORS.surface,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              ...NB_DISPLAY_SX,
              fontSize: { xs: 22, md: 28 },
              color: NB_COLORS.ink,
            }}
          >
            {s.value}
          </Typography>
          <Typography
            sx={{
              ...NB_MONO_SX,
              mt: 0.75,
              fontSize: { xs: 10, md: 11 },
              color: NB_COLORS.steel,
            }}
          >
            {s.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function Carousel({
  images,
  alt,
  objectPosition = "center",
  objectFit = "contain",
}: {
  images: (string | { src: string; position?: string })[];
  alt: string;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useDragScroll(trackRef);
  const [index, setIndex] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  return (
    <>
      <Box
        ref={trackRef}
        onScroll={handleScroll}
        {...drag}
        sx={{
          cursor: "grab",
          userSelect: "none",
          display: "flex",
          width: "100%",
          height: "100%",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {images.map((image, i) => {
          const src = typeof image === "string" ? image : image.src;
          const position =
            typeof image === "string"
              ? objectPosition
              : (image.position ?? objectPosition);
          return (
            <Box
              key={src}
              sx={{
                flex: "0 0 100%",
                height: "100%",
                position: "relative",
                scrollSnapAlign: "start",
              }}
            >
              <NBImage
                src={src}
                alt={`${alt}, frame ${i + 1}`}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit, objectPosition: position }}
              />
            </Box>
          );
        })}
      </Box>

      {/* Overlaid NB controls: square arrows + frame counter */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          bgcolor: NB_COLORS.paper,
          borderTop: NB_RULE,
          borderRight: NB_RULE,
        }}
      >
        <IconButton
          aria-label="Previous frame"
          onClick={() => nudge(-1)}
          sx={{
            borderRadius: 0,
            borderRight: NB_RULE,
            color: NB_COLORS.ink,
            px: 2,
            py: 0.75,
            "&:hover": { bgcolor: NB_COLORS.ink, color: NB_COLORS.paperOnInk },
          }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="Next frame"
          onClick={() => nudge(1)}
          sx={{
            borderRadius: 0,
            borderRight: NB_RULE,
            color: NB_COLORS.ink,
            px: 2,
            py: 0.75,
            "&:hover": { bgcolor: NB_COLORS.ink, color: NB_COLORS.paperOnInk },
          }}
        >
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
        <Typography
          sx={{ ...NB_MONO_SX, fontSize: 12, px: 2, color: NB_COLORS.steel }}
        >
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </Typography>
      </Box>
    </>
  );
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, amount: 0.3 });

  return (
    <Box sx={{ borderTop: NB_RULE }}>
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
          FILE {study.number}
        </Typography>
        <Typography sx={{ ...NB_MONO_SX, fontSize: 12, fontWeight: 700 }}>
          {study.client}
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
          {study.category}
        </Typography>
      </Box>

      {/* Plate + copy */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "6fr 6fr" },
          borderTop: NB_RULE,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRight: { md: NB_RULE },
            borderBottom: { xs: NB_RULE, md: "none" },
          }}
        >
          {study.render && (
            <RenderPanel
              render={study.render}
              alt={study.imageAlt}
              widthMd={0.3}
            />
          )}
          <Box
            sx={{
              position: "relative",
              flex: 1,
              minWidth: 0,
              aspectRatio: study.youtubeId ? "16 / 9" : "4 / 3",
              bgcolor: NB_COLORS.well,
            }}
          >
            {study.youtubeId ? (
              <Box
                component="iframe"
                src={`https://www.youtube-nocookie.com/embed/${study.youtubeId}?rel=0`}
                title={study.imageAlt}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            ) : study.images ? (
              <Carousel
                images={study.images}
                alt={study.imageAlt}
                objectPosition={study.imagePosition}
                objectFit={study.imageFit}
              />
            ) : (
              <Image
                src={study.image}
                alt={study.imageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{
                  objectFit: "contain",
                  objectPosition: study.imagePosition ?? "center",
                }}
              />
            )}
          </Box>
        </Box>

        <Box
          sx={{
            px: { xs: 3, md: 6 },
            py: { xs: 3, md: 5 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography
            sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}
          >
            {study.category}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              ...NB_DISPLAY_SX,
              fontSize: { xs: 24, sm: 30, md: 34 },
              color: NB_COLORS.ink,
            }}
          >
            {study.headline}
          </Typography>
          <Typography
            sx={{ fontSize: { xs: 15, md: 16 }, color: NB_COLORS.steel }}
          >
            {study.copy}
          </Typography>
        </Box>
      </Box>

      {/* Metrics band */}
      <Box
        ref={metricsRef}
        sx={{
          borderTop: NB_RULE,
          px: { xs: 3, md: 6 },
          py: { xs: 3, md: 4 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "auto 1fr" },
          gap: { xs: 3, md: 6 },
          alignItems: "center",
        }}
      >
        <HeroMetricView metric={study.hero} inView={metricsInView} />
        {study.breakdown ? (
          <DonutChart
            slices={study.breakdown.slices}
            title={study.breakdown.title}
          />
        ) : study.stats ? (
          <StatCluster stats={study.stats} />
        ) : null}
      </Box>
    </Box>
  );
}

export default function CaseStudiesSection() {
  return (
    <Box
      component="section"
      id="case-studies"
      sx={{
        bgcolor: NB_COLORS.paper,
        borderBottom: NB_RULE,
        scrollMarginTop: { xs: 24, md: 40 },
      }}
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
          SELECTED WORK
        </Typography>
        <Typography
          sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}
        >
          CASE FILES · 04 ENTRIES
        </Typography>
      </Box>

      <Box sx={{ px: { xs: 3, md: 6 }, py: { xs: 2.5, md: 3 } }}>
        <Typography
          sx={{
            fontSize: { xs: 15, md: 17 },
            color: NB_COLORS.steel,
            maxWidth: 720,
          }}
        >
          Four recent builds across charity, tech, music, and CPG. Same studio.
          Same team. Very different briefs.
        </Typography>
      </Box>

      {CASE_STUDIES.map((study) => (
        <motion.div
          key={study.number}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <CaseStudyCard study={study} />
        </motion.div>
      ))}
    </Box>
  );
}
