"use client";

import { useRef, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useInView } from "framer-motion";

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

  return (
    <Typography
      component="span"
      sx={{
        fontSize: { xs: "28px", sm: "36px", md: "44px" },
        fontWeight: 800,
        color: "white",
        lineHeight: 1,
      }}
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </Typography>
  );
}

const stats = [
  { label: "Projects\nDelivered", prefix: "", target: 100, suffix: "+" },
  { label: "Views on Our\nSet Builds", prefix: "", target: 19, suffix: "M+" },
  { label: "Brands\nServed", prefix: "", target: 100, suffix: "+" },
  { label: "Avg\nTurnaround", prefix: "", target: 14, suffix: " DAYS" },
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
        maxWidth: "1200px",
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
          gap: { xs: 3, md: 4 },
          textAlign: "center",
          py: { xs: 3, md: 4 },
          px: { xs: 2, md: 4 },
          borderRadius: "16px",
          border: "1px solid rgba(229,199,103,0.15)",
          background:
            "linear-gradient(135deg, rgba(229,199,103,0.04) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
        {stats.map((stat) => (
          <Box key={stat.label}>
            <AnimatedNumber
              target={stat.target}
              suffix={stat.suffix}
              prefix={stat.prefix}
              inView={inView}
            />
            <Typography
              sx={{
                mt: 0.5,
                fontSize: { xs: "11px", sm: "13px" },
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.08em",
                fontWeight: 600,
                textTransform: "uppercase",
                whiteSpace: "pre-line",
              }}
            >
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>
      <Typography
        sx={{
          mt: 2.5,
          textAlign: "center",
          fontSize: { xs: "12px", sm: "14px" },
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.06em",
        }}
      >
        As seen in Forbes, Rolling Stone &amp; Business Insider
      </Typography>
    </Box>
  );
}
