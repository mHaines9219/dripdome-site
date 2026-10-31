"use client";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import JobFile from "./JobFile";
import {
  VERTICALS,
  featuredProjects,
  projectsByVertical,
  type Project,
  type VerticalKey,
} from "@/lib/projects";
import {
  NB_BUTTON_SX,
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_RULE,
  NB_SHADOW_OFFSET,
  nbShadow,
} from "@/lib/theme";

type ArchiveFilter = "featured" | VerticalKey;

/** How far the selected tab sinks toward its shadow, in px */
const PRESSED = NB_SHADOW_OFFSET / 2;

/** Narrowest width at which the heading and all five tabs share one row */
const ONE_ROW = "@media (min-width: 1240px)";

/** On phones the two longest labels drop to a second row together so the
 *  five tabs fit in two rows instead of three. */
const PHONE_SECOND_ROW: ArchiveFilter[] = ["activation", "interior"];

interface ArchiveTab {
  key: ArchiveFilter;
  label: string;
  projects: Project[];
}

/** FEATURED first, then one tab per live vertical. Sunset verticals with no
 *  projects of their own (music videos file under set design) get no tab. */
const TABS: ArchiveTab[] = [
  { key: "featured", label: "FEATURED", projects: featuredProjects() },
  ...Object.values(VERTICALS)
    .filter((v) => !v.legacy)
    .map((v) => ({ key: v.key, label: v.label, projects: projectsByVertical(v.key) })),
];

export default function HomeFeaturedWork() {
  const [active, setActive] = useState<ArchiveFilter>("featured");
  const tab = TABS.find((t) => t.key === active) ?? TABS[0];

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
          // Heading and tabs share one row once they fit; below that the
          // tabs drop under the heading as their own row.
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          [ONE_ROW]: { flexDirection: "row", alignItems: "center" },
          px: { xs: 3, md: 6 },
          py: { xs: 3, md: 4 },
          borderBottom: NB_RULE,
          gap: { xs: 2, md: 3 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            ...NB_DISPLAY_SX,
            fontSize: { xs: 32, sm: 48 },
            whiteSpace: "nowrap",
            [ONE_ROW]: { fontSize: "min(3.2vw, 56px)" },
            color: NB_COLORS.ink,
          }}
        >
          CASE STUDIES
        </Typography>
        <Box
          role="group"
          aria-label="Filter case studies by specialty"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexShrink: 0,
            gap: { xs: 1, md: 2 },
            [ONE_ROW]: { flexWrap: "nowrap" },
          }}
        >
          {TABS.map((t) => {
            const selected = t.key === active;
            return (
              <Button
                key={t.key}
                disableElevation
                aria-pressed={selected}
                onClick={() => setActive(t.key)}
                sx={{
                  ...NB_BUTTON_SX,
                  px: { xs: 1.25, md: 1.75 },
                  py: 1,
                  fontSize: { xs: 10, md: 11 },
                  whiteSpace: "nowrap",
                  order: { xs: PHONE_SECOND_ROW.includes(t.key) ? 1 : 0, md: 0 },
                  // The selected tab sits half pressed in on a silver face,
                  // keeping a sliver of its shadow so it still reads raised
                  ...(selected && {
                    bgcolor: NB_COLORS.silver,
                    color: NB_COLORS.onSilver,
                    transform: `translate(${PRESSED}px, ${PRESSED}px)`,
                    boxShadow: nbShadow(NB_SHADOW_OFFSET - PRESSED),
                    "&:hover": {
                      bgcolor: NB_COLORS.silver,
                      transform: `translate(${PRESSED}px, ${PRESSED}px)`,
                      boxShadow: nbShadow(NB_SHADOW_OFFSET - PRESSED),
                    },
                  }),
                }}
              >
                {t.label}
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* Case studies sit spaced apart from tablet up so each reads as its
          own card. Phones stack them flush. */}
      <Box
        sx={{
          display: "grid",
          gap: { xs: 0, md: 6 },
          px: { xs: 0, md: 6 },
          py: { xs: 0, md: 6 },
        }}
      >
        {tab.projects.map((project) => (
          <JobFile key={project.slug} project={project} spaced />
        ))}
      </Box>
    </Box>
  );
}
