"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_RULE,
} from "@/lib/theme";

// Metrics below reflect real numbers where available. LESGC reach is estimated
// (see note field on the hero). Southside has no quantitative data yet, so the
// hero renders the Forbes "Best Canned Cocktail" press placement as a text
// hero linking to the article.

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
  imageAlt: string;
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
    client: "GOOGLE PHOTOS",
    category: "BRAND VIDEO CAMPAIGN",
    headline: "K-pop talent spot designed for a global platform.",
    copy: "Led production design for Google Photos' video recap campaign featuring K-pop star EJAE. Full scope: set design, prop and furniture sourcing, and complete set dressing across multiple color stories. Every visual element curated to support a clean, lifestyle driven aesthetic aligned with the brand.",
    image:
      "https://dripdome-site.s3.us-east-2.amazonaws.com/goog-photos/ejae.png",
    imageAlt: "Google Photos brand campaign set design with EJAE",
    hero: {
      kind: "count",
      target: 214,
      suffix: "K+",
      label: "INSTAGRAM ENGAGEMENTS",
      note: "Combined across @ejae_k and @googlephotos",
    },
    stats: [
      { value: "208K+", label: "LIKES" },
      { value: "2.5K+", label: "REPOSTS" },
      { value: "2.5K+", label: "SHARES" },
      { value: "1K+", label: "COMMENTS" },
    ],
  },
  {
    number: "03",
    client: "TRISHA PAYTAS x TANA MONGEAU",
    category: "PODCAST SET BUILD",
    headline: "Vaporwave set delivered in 4 days for a show now past 20M views.",
    copy: "Designed and fabricated the NotLoveLine podcast studio for Trisha Paytas and Tana Mongeau in four days. Vaporwave inspired environment anchored by a hand wired LED neon heart wall with alternating color sequences. The set has since carried 65+ episodes and crossed 20 million YouTube views with 230K+ subscribers.",
    image: "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_3.JPG",
    imageAlt: "NotLoveline podcast set build",
    hero: {
      kind: "count",
      target: 20,
      suffix: "M+",
      label: "YOUTUBE VIEWS",
      note: "Across 65+ episodes on the permanent build",
    },
    stats: [
      { value: "230K+", label: "SUBSCRIBERS" },
      { value: "65+", label: "EPISODES SHOT" },
      { value: "4 DAYS", label: "BUILD TIMELINE" },
    ],
  },
  {
    number: "04",
    client: "WHETHAN x EMEI",
    category: "PROMOTIONAL MUSIC VIDEO",
    headline: "Sunny D coded world built for the 'SUNNYD' music video.",
    copy: "Transformed a vacant office building into the world of the 'SUNNYD' music video for Whethan and Emei. Instead of building a set from scratch, we worked with the bones of the space, trucking in custom props, branded vinyl, and layered dressing to modify what was already there. Empty corridors, lobbies, and offices became distinct performance and narrative beats inside the track's saturated Sunny D palette.",
    image: "https://dripdome-site.s3.us-east-2.amazonaws.com/sunnyd/still.jpg",
    imageAlt: "Whethan x Emei SUNNYD music video set design",
    youtubeId: "zLY71gPk8Ms",
    hero: {
      kind: "count",
      target: 444,
      suffix: "K+",
      label: "YOUTUBE VIEWS",
      note: "Official 'SUNNYD' music video, Whethan x Emei",
    },
    stats: [
      { value: "7K+", label: "LIKES" },
      { value: "400+", label: "COMMENTS" },
      { value: "OFFICIAL", label: "MUSIC VIDEO" },
    ],
  },
  {
    number: "05",
    client: "THE ORIGINAL SOUTHSIDE",
    category: "AD CAMPAIGN + PRODUCT LAUNCH",
    headline: "Forbes-featured launch for a modern bottled cocktail brand.",
    copy: "Collaborated with The Original Southside on their launch ad campaign. Scope included prop sourcing, styling, and custom vinyl wraps that reinforced a modern twist on the classic 1920s Southside cocktail. The campaign and product were later named among Forbes' Best Canned Cocktails.",
    image: "https://dripdome-site.s3.us-east-2.amazonaws.com/southside/ss1.png",
    imageAlt: "The Original Southside ad campaign set",
    hero: {
      kind: "text",
      value: "FORBES",
      label: "FEATURED: 'BEST CANNED COCKTAIL'",
      link: "https://www.forbes.com/sites/karlaalindahao/2024/03/01/best-canned-cocktail-original-southside/",
    },
    stats: [
      { value: "LAUNCH", label: "CAMPAIGN SCOPE" },
      { value: "CUSTOM", label: "VINYL FABRICATION" },
      { value: "EDITORIAL", label: "SHOT LIST" },
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

  const count = useCountUp(
    metric.kind === "count" ? metric.target : 0,
    inView,
  );

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
            position: "relative",
            width: "100%",
            aspectRatio: study.youtubeId ? "16 / 9" : "4 / 3",
            bgcolor: NB_COLORS.well,
            borderRight: { md: NB_RULE },
            borderBottom: { xs: NB_RULE, md: "none" },
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
          ) : (
            <Image
              src={study.image}
              alt={study.imageAlt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          )}
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
          <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
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
          <Typography sx={{ fontSize: { xs: 15, md: 16 }, color: NB_COLORS.steel }}>
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
        <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
          CASE FILES · 05 ENTRIES
        </Typography>
      </Box>

      <Box sx={{ px: { xs: 3, md: 6 }, py: { xs: 2.5, md: 3 } }}>
        <Typography sx={{ fontSize: { xs: 15, md: 17 }, color: NB_COLORS.steel, maxWidth: 720 }}>
          Five recent builds across charity, tech, creator, music, and CPG.
          Same studio. Same team. Very different briefs.
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
