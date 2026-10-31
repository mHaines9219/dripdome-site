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
} as const;

/**
 * Per-column layout. Phones show JOB and CLIENT only, with CLIENT taking the
 * leftover width so most rows stay on one line; VERTICAL joins from tablet
 * up and TITLE from desktop up. The outer gutters sit on whichever column is
 * outermost at each width.
 */
const COL = {
  JOB: { whiteSpace: "nowrap", pl: { xs: 3, md: 6 } },
  CLIENT: {
    fontWeight: 700,
    width: { xs: "100%", sm: "auto" },
    pr: { xs: 3, sm: 2 },
  },
  TITLE: { display: { xs: "none", md: "table-cell" }, color: NB_COLORS.steel },
  VERTICAL: {
    display: { xs: "none", sm: "table-cell" },
    whiteSpace: "nowrap",
    color: NB_COLORS.steel,
    pr: { xs: 3, md: 6 },
  },
} as const;

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
          {(Object.keys(COL) as (keyof typeof COL)[]).map((col) => (
            <Typography
              key={col}
              component="th"
              scope="col"
              sx={{
                ...CELL_SX,
                ...COL[col],
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
              <Typography component="td" sx={{ ...CELL_SX, ...COL.JOB }}>
                {project.jobNo}
              </Typography>
              <Typography component="td" sx={{ ...CELL_SX, ...COL.CLIENT }}>
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
              <Typography component="td" sx={{ ...CELL_SX, ...COL.TITLE }}>
                {project.title}
              </Typography>
              <Typography component="td" sx={{ ...CELL_SX, ...COL.VERTICAL }}>
                {VERTICALS[project.vertical].label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
