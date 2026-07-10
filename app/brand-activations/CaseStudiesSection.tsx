"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ACCENT,
  INK,
  NB_CARD_DARK_SX,
  PAPER,
  POP,
  SURFACE,
  nbShadow,
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

const DONUT_COLORS = [ACCENT, POP, PAPER, SURFACE];

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
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
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
    fontSize: { xs: "56px", md: "80px", lg: "96px" },
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    color: ACCENT,
  } as const;

  const count = useCountUp(
    metric.kind === "count" ? metric.target : 0,
    inView,
  );

  return (
    <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
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
            textDecoration: "none",
            display: "inline-block",
            transition: "color 0.2s",
            "&:hover": { color: POP },
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
          mt: 1,
          fontSize: { xs: "11px", md: "13px" },
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.65)",
          fontWeight: 700,
        }}
      >
        {metric.label}
      </Typography>

      {metric.kind === "count" && metric.note ? (
        <Typography
          sx={{
            mt: 0.75,
            fontSize: { xs: "11px", md: "12px" },
            color: "rgba(255,255,255,0.45)",
            fontStyle: "italic",
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

  let cumulative = 0;
  const arcs = slices.map((slice) => {
    const fraction = slice.value / total;
    const dash = circumference * fraction;
    const gap = circumference - dash;
    const offset = -cumulative;
    cumulative += dash;
    return { ...slice, dash, gap, offset, pct: Math.round(fraction * 100) };
  });

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
            stroke="#333333"
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
            fontSize: { xs: "10px", md: "11px" },
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.55)",
            fontWeight: 700,
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
              fontSize: { xs: "13px", md: "14px" },
              color: "rgba(255,255,255,0.9)",
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                bgcolor: arc.color,
                border: `1px solid ${PAPER}`,
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
        gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(auto-fit, minmax(140px, 1fr))" },
        gap: 2,
        width: "100%",
      }}
    >
      {stats.map((s) => (
        <Box
          key={s.label}
          sx={{
            p: 2,
            border: `2px solid ${PAPER}`,
            borderRadius: 0,
            bgcolor: INK,
            boxShadow: nbShadow(3, ACCENT),
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "22px", md: "28px" },
              fontWeight: 800,
              color: ACCENT,
            }}
          >
            {s.value}
          </Typography>
          <Typography
            sx={{
              mt: 0.5,
              fontSize: { xs: "10px", md: "11px" },
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.55)",
              fontWeight: 700,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, amount: 0.3 });

  return (
    <Box
      sx={{
        ...NB_CARD_DARK_SX,
        p: { xs: 2.5, md: 4 },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" },
          gap: { xs: 3, md: 6 },
          alignItems: "center",
          direction: !isMobile && parseInt(study.number) % 2 === 0 ? "rtl" : "ltr",
        }}
      >
        <Box
          sx={{
            direction: "ltr",
            position: "relative",
            width: "100%",
            aspectRatio: study.youtubeId
              ? "16 / 9"
              : { xs: "4 / 3", md: "5 / 4" },
            border: `3px solid ${PAPER}`,
            borderRadius: 0,
            overflow: "hidden",
            boxShadow: nbShadow(6, ACCENT),
            bgcolor: INK,
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
              sizes="(max-width: 900px) 100vw, 55vw"
              style={{ objectFit: "cover" }}
            />
          )}
        </Box>

        <Box
          sx={{
            direction: "ltr",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
            <Typography
              sx={{
                fontSize: { xs: "60px", md: "96px" },
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: ACCENT,
              }}
            >
              {study.number}
            </Typography>
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "10px", md: "12px" },
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                {study.category}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "18px", md: "22px" },
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                {study.client}
              </Typography>
            </Box>
          </Box>

          <Typography
            sx={{
              fontSize: { xs: "22px", md: "30px" },
              fontWeight: 600,
              lineHeight: 1.25,
              mb: 1,
            }}
          >
            {study.headline}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "15px", md: "16px" },
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.6,
            }}
          >
            {study.copy}
          </Typography>
        </Box>
      </Box>

      <Box
        ref={metricsRef}
        sx={{
          mt: { xs: 4, md: 5 },
          pt: { xs: 3, md: 4 },
          borderTop: `2px solid ${PAPER}`,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "auto 1fr" },
          gap: { xs: 4, md: 6 },
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
      id="case-studies"
      sx={{
        bgcolor: INK,
        color: "white",
        px: { xs: 2, md: 6 },
        py: { xs: 8, md: 14 },
        scrollMarginTop: { xs: 24, md: 40 },
      }}
    >
      <Box sx={{ maxWidth: 1280, mx: "auto" }}>
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: "34px", md: "56px", lg: "68px" },
              mb: 2,
            }}
          >
            <Box component="span" sx={{ color: "white" }}>
              SELECTED{" "}
            </Box>
            <Box component="span" sx={{ color: ACCENT }}>
              WORK
            </Box>
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "16px", md: "20px" },
              color: "rgba(255,255,255,0.8)",
              maxWidth: 720,
              mx: "auto",
            }}
          >
            Five recent builds across charity, tech, creator, music, and CPG.
            Same studio. Same team. Very different briefs.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 6, md: 10 },
          }}
        >
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
      </Box>
    </Box>
  );
}
