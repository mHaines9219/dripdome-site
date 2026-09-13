"use client";

import { Box, Typography } from "@mui/material";
import JobFile from "./JobFile";
import { featuredProjects } from "@/lib/projects";
import { NB_COLORS, NB_DISPLAY_SX, NB_MONO_SX, NB_RULE } from "@/lib/theme";

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
        <Typography
          sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}
        >
          FEATURED JOB FILES · FULL ARCHIVE BY SPECIALTY
        </Typography>
      </Box>

      {featured.map((project) => (
        <JobFile key={project.slug} project={project} />
      ))}
    </Box>
  );
}
