"use client";

import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import {
  NB_COLORS,
  NB_PAGE_GUTTER_SX,
  NB_PAGE_WIDTH_SX,
  NB_RULE,
  isFullBleedRoute,
} from "@/lib/theme";

/**
 * Page sheet. Wraps every route below the navbar in a centered,
 * width-capped column with a gutter to the window edge, so section
 * bands stop short of the viewport on wide screens. Phones stay full
 * bleed; the frame and its side rules appear from tablet width up.
 * Full-bleed routes (the home page) skip the sheet entirely so their
 * section rules and tickers run across the whole window.
 */
export default function PageFrame({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (isFullBleedRoute(usePathname())) {
    return <Box sx={{ bgcolor: NB_COLORS.paper }}>{children}</Box>;
  }
  return (
    <Box
      sx={{
        ...NB_PAGE_GUTTER_SX,
        pt: { xs: 0, md: 4, lg: 5 },
        pb: { xs: 0, md: 4, lg: 5 },
        bgcolor: NB_COLORS.paper,
      }}
    >
      <Box
        sx={{
          ...NB_PAGE_WIDTH_SX,
          border: { xs: "none", md: NB_RULE },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
