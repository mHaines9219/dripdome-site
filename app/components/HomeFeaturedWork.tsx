"use client";

import Link from "next/link";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Box, Typography } from "@mui/material";
import JobFile from "./JobFile";
import { PROJECTS, VERTICALS, featuredProjects } from "@/lib/projects";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_RULE,
} from "@/lib/theme";

export default function HomeFeaturedWork() {
  const featured = featuredProjects();

  return (
    <Box
      component="section"
      id="featured-work"
      sx={{
        bgcolor: NB_COLORS.paper,
        borderBottom: NB_RULE,
        scrollMarginTop: "120px",
      }}
    >
      {/* Section header */}
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
          THE ARCHIVE
        </Typography>
        <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
          MASTER INDEX · EVERY BUILD ON FILE
        </Typography>
      </Box>

      {featured.map((project) => (
        <JobFile key={project.slug} project={project} />
      ))}

      {/* Full index: every job, including legacy verticals */}
      <Box
        sx={{
          px: { xs: 3, md: 6 },
          py: 1.25,
          bgcolor: NB_COLORS.silverLight,
          borderBottom: NB_RULE,
        }}
      >
        <Typography sx={{ ...NB_MONO_SX, fontSize: 12, fontWeight: 700, color: NB_COLORS.ink }}>
          FULL INDEX · {String(PROJECTS.length).padStart(2, "0")} JOBS
        </Typography>
      </Box>

      {PROJECTS.map((project, i) => {
        const vertical = VERTICALS[project.vertical];
        const href = vertical.href ?? "/#contact";
        return (
          <Box
            key={project.slug}
            component={Link}
            href={href}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "auto 1fr auto",
                md: "80px 240px 1fr auto auto",
              },
              alignItems: "center",
              gap: { xs: 2, md: 3 },
              px: { xs: 3, md: 6 },
              py: { xs: 1.75, md: 2 },
              borderBottom: i < PROJECTS.length - 1 ? NB_RULE : "none",
              textDecoration: "none",
              color: NB_COLORS.ink,
              "&:hover": {
                bgcolor: NB_COLORS.ink,
                color: NB_COLORS.paperOnInk,
                "& .index-meta": { color: NB_COLORS.mutedOnInk },
              },
            }}
          >
            <Typography
              className="index-meta"
              sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}
            >
              JOB {project.jobNo}
            </Typography>
            <Typography
              sx={{
                ...NB_MONO_SX,
                fontSize: { xs: 11, md: 13 },
                fontWeight: 700,
                color: "inherit",
              }}
            >
              {project.client}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 13, md: 16 },
                color: "inherit",
                gridColumn: { xs: "2 / 4", md: "auto" },
              }}
            >
              {project.title}
            </Typography>
            <Typography
              className="index-meta"
              sx={{
                ...NB_MONO_SX,
                fontSize: 11,
                color: NB_COLORS.steel,
                display: { xs: "none", md: "block" },
              }}
            >
              {vertical.label}
              {vertical.legacy ? " · LEGACY" : ""}
            </Typography>
            <ArrowOutwardIcon
              sx={{
                fontSize: 18,
                color: "inherit",
                display: { xs: "none", md: "block" },
                justifySelf: "end",
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
}
