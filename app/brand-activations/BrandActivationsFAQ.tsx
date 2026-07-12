"use client";

import { useState } from "react";
import { Box, ButtonBase, Collapse, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_FOCUS_VISIBLE_SX,
  NB_MONO_SX,
  NB_RULE,
} from "@/lib/theme";
import { FAQS } from "./faqData";

export default function BrandActivationsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Box
      component="section"
      sx={{ bgcolor: NB_COLORS.paper, borderBottom: NB_RULE }}
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
          COMMONLY ASKED
        </Typography>
        <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
          FAQ INDEX · 04 ENTRIES
        </Typography>
      </Box>

      {FAQS.map((item, i) => {
        const open = openIndex === i;
        return (
          <Box
            key={item.q}
            sx={{ borderBottom: i < FAQS.length - 1 ? NB_RULE : "none" }}
          >
            <ButtonBase
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              aria-controls={`faq-answer-${i}`}
              sx={{
                ...NB_FOCUS_VISIBLE_SX,
                width: "100%",
                display: "grid",
                gridTemplateColumns: { xs: "auto 1fr auto", md: "80px 1fr auto" },
                alignItems: "center",
                textAlign: "left",
                gap: { xs: 2, md: 3 },
                px: { xs: 3, md: 6 },
                py: { xs: 2, md: 2.5 },
                borderRadius: 0,
                color: NB_COLORS.ink,
                bgcolor: open ? NB_COLORS.ink : "transparent",
                ...(open && { color: NB_COLORS.paperOnInk }),
                "&:hover": {
                  bgcolor: NB_COLORS.ink,
                  color: NB_COLORS.paperOnInk,
                  "& .faq-index": { color: NB_COLORS.mutedOnInk },
                },
                "& .faq-index": {
                  color: open ? NB_COLORS.mutedOnInk : NB_COLORS.steel,
                },
              }}
            >
              <Typography
                className="faq-index"
                sx={{ ...NB_MONO_SX, fontSize: 12 }}
              >
                Q.{String(i + 1).padStart(2, "0")}
              </Typography>
              <Typography
                component="h3"
                sx={{
                  fontSize: { xs: 15, md: 18 },
                  fontWeight: 600,
                  color: "inherit",
                }}
              >
                {item.q}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  border: `2px solid currentColor`,
                  flexShrink: 0,
                }}
              >
                {open ? (
                  <RemoveIcon sx={{ fontSize: 18 }} />
                ) : (
                  <AddIcon sx={{ fontSize: 18 }} />
                )}
              </Box>
            </ButtonBase>

            <Collapse in={open} id={`faq-answer-${i}`}>
              <Box
                sx={{
                  px: { xs: 3, md: 6 },
                  py: { xs: 2.5, md: 3 },
                  borderTop: NB_RULE,
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "80px 1fr" },
                  gap: { xs: 0, md: 3 },
                }}
              >
                <Typography
                  sx={{
                    ...NB_MONO_SX,
                    fontSize: 12,
                    color: NB_COLORS.steel,
                    display: { xs: "none", md: "block" },
                  }}
                >
                  A.{String(i + 1).padStart(2, "0")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 15, md: 16 },
                    color: NB_COLORS.ink,
                    lineHeight: 1.6,
                    maxWidth: 780,
                  }}
                >
                  {item.a}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        );
      })}
    </Box>
  );
}
