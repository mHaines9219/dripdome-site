"use client";

import Link from "next/link";
import { Box, Typography } from "@mui/material";
import NBImage from "./NBImage";
import {
  JOB_LINK_SX,
  JOB_SHEET_SX,
  JobHeaderBar,
  StatLine,
  jobAnchorId,
} from "./JobFile";
import type { Project } from "@/lib/projects";
import { VERTICALS } from "@/lib/projects";
import { NB_COLORS, NB_DISPLAY_SX, NB_HAIRLINE, NB_MONO_SX } from "@/lib/theme";

/**
 * Compact archive entry: the job header bar, one wide still, and the title,
 * client, lead stat, and a link to the full job file on the vertical page.
 * Featured projects that are not anchors render as this on the home archive.
 */
export default function JobRow({ project }: { project: Project }) {
  const vertical = VERTICALS[project.vertical];
  const first = project.images[0];
  const src = typeof first === "string" ? first : first.src;
  const position =
    typeof first === "string"
      ? (project.imagePosition ?? "center")
      : (first.position ?? project.imagePosition ?? "center");
  const fullHref = vertical.href
    ? `${vertical.href}#${jobAnchorId(project.slug)}`
    : undefined;

  return (
    <Box component="article" id={jobAnchorId(project.slug)} sx={JOB_SHEET_SX}>
      <JobHeaderBar project={project} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
        }}
      >
        <Box
          sx={{
            position: "relative",
            aspectRatio: "16 / 9",
            bgcolor: NB_COLORS.well,
            borderRight: { md: NB_HAIRLINE },
            borderBottom: { xs: NB_HAIRLINE, md: "none" },
          }}
        >
          <NBImage
            src={src}
            alt={`${project.title}, frame 1`}
            fill
            sizes="(max-width: 900px) 100vw, 47vw"
            style={{ objectFit: "cover", objectPosition: position }}
          />
        </Box>

        <Box
          sx={{
            px: { xs: 3, md: 4 },
            py: { xs: 2.5, md: 3 },
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              ...NB_DISPLAY_SX,
              fontSize: { xs: 22, sm: 26, md: 30 },
              color: NB_COLORS.ink,
            }}
          >
            {project.title}
          </Typography>
          <Typography
            sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}
          >
            {project.client}
          </Typography>
          <StatLine stats={project.stats.slice(0, 1)} />
          {fullHref && (
            <Typography
              component={Link}
              href={fullHref}
              sx={{ ...JOB_LINK_SX, mt: "auto", alignSelf: "flex-start" }}
            >
              FULL JOB FILE →
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
