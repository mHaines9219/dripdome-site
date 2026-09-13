"use client";

import { useRef, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useInView } from "framer-motion";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_RULE,
} from "@/lib/theme";

function AnimatedNumber({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  inView,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  inView: boolean;
}) {
  // Initialize at the target so server HTML (and no-JS crawlers) carry the
  // real numbers; the count-up runs client-side once the bar scrolls into view.
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

  return (
    <Typography
      component="span"
      sx={{
        ...NB_DISPLAY_SX,
        fontSize: { xs: 40, sm: 52, md: 64 },
        color: NB_COLORS.ink,
      }}
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </Typography>
  );
}

const stats = [
  { label: "PROJECTS DELIVERED", prefix: "", target: 100, suffix: "+" },
  { label: "VIEWS ON OUR SET BUILDS", prefix: "", target: 30, suffix: "M+" },
  { label: "BRANDS SERVED", prefix: "", target: 100, suffix: "+" },
  { label: "AVG TURNAROUND, DAYS", prefix: "", target: 14, suffix: "" },
];

export default function SocialProofBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <Box
      component="section"
      ref={ref}
      sx={{
        width: "100%",
        bgcolor: NB_COLORS.paper,
        borderBottom: NB_RULE,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
        }}
      >
        {stats.map((stat, i) => (
          <Box
            key={stat.label}
            sx={{
              px: { xs: 2, md: 4 },
              py: { xs: 3, md: 5 },
              borderRight: {
                xs: i % 2 === 0 ? NB_RULE : "none",
                md: i < stats.length - 1 ? NB_RULE : "none",
              },
              borderBottom: { xs: i < 2 ? NB_RULE : "none", md: "none" },
              bgcolor: i % 2 === 1 ? NB_COLORS.silverLight : NB_COLORS.paper,
            }}
          >
            <AnimatedNumber
              target={stat.target}
              suffix={stat.suffix}
              prefix={stat.prefix}
              inView={inView}
            />
            <Typography
              sx={{
                ...NB_MONO_SX,
                mt: 1,
                fontSize: { xs: 10, sm: 12 },
                color: NB_COLORS.steel,
                fontWeight: 500,
              }}
            >
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          borderTop: NB_RULE,
          px: { xs: 2, md: 4 },
          py: 1,
        }}
      >
        <Typography
          sx={{ ...NB_MONO_SX, fontSize: { xs: 10, md: 11 }, color: NB_COLORS.steel }}
        >
          AS SEEN IN FORBES, ROLLING STONE + BUSINESS INSIDER
        </Typography>
      </Box>
    </Box>
  );
}
