"use client";

import { Box, Typography } from "@mui/material";
import ArchiveIndex from "./ArchiveIndex";
import JobFile from "./JobFile";
import JobRow from "./JobRow";
import { PROJECTS, featuredArchive, type FeaturedTier } from "@/lib/projects";
import { NB_COLORS, NB_DISPLAY_SX, NB_MONO_SX, NB_RULE } from "@/lib/theme";

const SHEET_BY_TIER: Record<FeaturedTier, typeof JobFile> = {
  anchor: JobFile,
  row: JobRow,
};

export default function HomeFeaturedWork() {
  const archive = featuredArchive();

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
          {PROJECTS.length} JOBS · {archive.length} FEATURED
        </Typography>
      </Box>

      <Box sx={{ borderBottom: NB_RULE }}>
        <ArchiveIndex />
      </Box>

      {archive.map(({ project, tier }) => {
        const Sheet = SHEET_BY_TIER[tier];
        return <Sheet key={project.slug} project={project} />;
      })}
    </Box>
  );
}
