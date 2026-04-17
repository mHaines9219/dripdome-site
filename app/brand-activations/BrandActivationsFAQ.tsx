"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BRAND_GRADIENT_TEXT_SX } from "@/lib/theme";

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
  return (
    <Box
      sx={{
        bgcolor: "black",
        color: "white",
        px: { xs: 3, md: 8 },
        py: { xs: 8, md: 12 },
      }}
    >
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: "32px", md: "50px", lg: "60px" },
            fontWeight: "bold",
            textAlign: "center",
            mb: { xs: 4, md: 6 },
          }}
        >
          <Box component="span" sx={{ color: "white" }}>
            COMMONLY{" "}
          </Box>
          <Box component="span" sx={BRAND_GRADIENT_TEXT_SX}>
            ASKED
          </Box>
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {FAQS.map((item, i) => (
            <Accordion
              key={i}
              disableGutters
              sx={{
                bgcolor: "rgba(255,255,255,0.04)",
                color: "white",
                border: "1px solid rgba(229,199,103,0.2)",
                borderRadius: "12px !important",
                "&:before": { display: "none" },
                overflow: "hidden",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#E5C767" }} />}
                sx={{
                  px: { xs: 2, md: 3 },
                  py: 1,
                  "& .MuiAccordionSummary-content": { my: 2 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: 600,
                  }}
                >
                  {item.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: { xs: 2, md: 3 }, pb: 3 }}>
                <Typography
                  sx={{
                    fontSize: { xs: "15px", md: "16px" },
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
