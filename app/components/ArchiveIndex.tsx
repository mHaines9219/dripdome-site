"use client";

import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { jobAnchorId } from "./JobFile";
import type { Project } from "@/lib/projects";
import { PROJECTS, VERTICALS } from "@/lib/projects";
import {
  NB_COLORS,
  NB_FOCUS_VISIBLE_SX,
  NB_HAIRLINE,
  NB_MONO_SX,
} from "@/lib/theme";

/** Featured jobs sit on this page; the rest live on their vertical page. */
const indexHref = (project: Project) => {
  const hash = `#${jobAnchorId(project.slug)}`;
  if (project.featured) return hash;
  const href = VERTICALS[project.vertical].href;
  return href ? `${href}${hash}` : undefined;
};

const CELL_SX = {
  ...NB_MONO_SX,
  fontSize: 12,
  textAlign: "left",
  verticalAlign: "top",
  px: { xs: 1.5, md: 2 },
  py: 1,
  borderBottom: NB_HAIRLINE,
  "&:first-of-type": { pl: { xs: 3, md: 6 } },
  "&:last-of-type": { pr: { xs: 3, md: 6 } },
} as const;

const TITLE_SX = { display: { xs: "none", md: "table-cell" } } as const;

/**
 * Every job in the registry as one mono table row, linked to its sheet. Gives
 * the archive a scannable table of contents above the featured sheets.
 */
export default function ArchiveIndex() {
  return (
    <Box
      component="table"
      aria-label="Archive index"
      sx={{
        width: "100%",
        borderCollapse: "collapse",
        color: NB_COLORS.ink,
        "& tbody tr:hover": { bgcolor: NB_COLORS.silverLight },
      }}
    >
      <Box component="thead">
        <Box component="tr">
          {(["JOB", "CLIENT", "TITLE", "VERTICAL"] as const).map((col) => (
            <Typography
              key={col}
              component="th"
              scope="col"
              sx={{
                ...CELL_SX,
                ...(col === "TITLE" ? TITLE_SX : null),
                fontWeight: 700,
                color: NB_COLORS.steel,
              }}
            >
              {col}
            </Typography>
          ))}
        </Box>
      </Box>
      <Box component="tbody">
        {PROJECTS.map((project) => {
          const href = indexHref(project);
          return (
            <Box component="tr" key={project.slug}>
              <Typography component="td" sx={{ ...CELL_SX, whiteSpace: "nowrap" }}>
                {project.jobNo}
              </Typography>
              <Typography component="td" sx={{ ...CELL_SX, fontWeight: 700 }}>
                {href ? (
                  <Box
                    component={Link}
                    href={href}
                    sx={{
                      color: "inherit",
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                      "&:hover": { color: NB_COLORS.silver },
                      ...NB_FOCUS_VISIBLE_SX,
                    }}
                  >
                    {project.client}
                  </Box>
                ) : (
                  project.client
                )}
              </Typography>
              <Typography
                component="td"
                sx={{ ...CELL_SX, ...TITLE_SX, color: NB_COLORS.steel }}
              >
                {project.title}
              </Typography>
              <Typography
                component="td"
                sx={{ ...CELL_SX, color: NB_COLORS.steel, whiteSpace: "nowrap" }}
              >
                {VERTICALS[project.vertical].label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
