"use client";

import { useState } from "react";
import { Box, ButtonBase, Collapse, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_RULE,
} from "@/lib/theme";

// TODO: refine copy with founder-voice answers. Draft answers below are
// placeholders that reflect the Ads plan's positioning (2 week turnaround,
// $10K-$200K+ range, NYC/LA reach, insurance in place).
const FAQS = [
  {
    q: "What is the typical timeline from brief to install?",
    a: "Two to four weeks for most activations. We have hit two week turnarounds for Google and other top brands when the brief is tight. Complex installs with permits or travel are quoted on a custom timeline.",
  },
  {
    q: "What budget range do you typically work with?",
    a: "Most brand activations we take on run between $10K and $30K all in. Larger projects can reach around $100K depending on scope, timeline, and fabrication complexity. Share a range in the inquiry form and we'll tell you honestly what's realistic for your brief.",
  },
  {
    q: "Where do you build and install?",
    a: "Design and fabrication happen in our NYC shop. We install anywhere in NYC and the surrounding metro, and we travel for the right project. A second LA presence serves West Coast shoots and activations.",
  },
  {
    q: "Do you handle permits and insurance?",
    a: "Yes. We carry general liability and coordinate permits, COIs, and venue approvals as part of the install scope. Nothing gets left to the client on day of.",
  },
];

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
