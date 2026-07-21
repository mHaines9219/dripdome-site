"use client";

import { Box, Typography } from "@mui/material";
import Footer from "../ui/Footer";
import ContactForm from "./ContactForm";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_OUTLINE_TEXT_SX,
  NB_RULE,
} from "@/lib/theme";

const DETAILS: { label: string; value: string; href?: string }[] = [
  { label: "LOCATIONS", value: "NEW YORK CITY + LOS ANGELES" },
  { label: "EMAIL", value: "INFO@DRIPDOME.COM", href: "mailto:info@dripdome.com" },
  { label: "INSTAGRAM", value: "@DRIPDOME" },
  { label: "RESPONSE TIME", value: "WITHIN 48 HOURS" },
];

export default function Contact() {
  return (
    <>
      <Box component="section" sx={{ bgcolor: NB_COLORS.paper }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
          }}
        >
          {/* Left: intake header */}
          <Box
            sx={{
              px: { xs: 3, md: 6 },
              py: { xs: 4, md: 6 },
              borderRight: { md: NB_RULE },
              borderBottom: { xs: NB_RULE, md: "none" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel, mb: 2 }}>
              PROJECT INTAKE · FORM A
            </Typography>
            <Typography
              variant="h2"
              sx={{
                ...NB_DISPLAY_SX,
                fontSize: { xs: 40, sm: 56, lg: 72 },
                color: NB_COLORS.ink,
                mb: 1,
              }}
            >
              LET&apos;S BUILD
            </Typography>
            <Typography
              sx={{
                ...NB_OUTLINE_TEXT_SX,
                fontSize: { xs: 40, sm: 56, lg: 72 },
                mb: 3,
              }}
            >
              SOMETHING.
            </Typography>
            <Typography
              sx={{ fontSize: { xs: 15, md: 17 }, color: NB_COLORS.ink, maxWidth: 420, mb: 4 }}
            >
              Big or small, every idea has the potential to shine. Tell us about
              your project and let&apos;s build something amazing.
            </Typography>

            <Box sx={{ mt: "auto" }}>
              {DETAILS.map((row) => (
                <Box
                  key={row.label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                    py: 1.25,
                    borderTop: NB_RULE,
                  }}
                >
                  <Typography sx={{ ...NB_MONO_SX, fontSize: 11, color: NB_COLORS.steel }}>
                    {row.label}
                  </Typography>
                  <Typography
                    component={row.href ? "a" : "p"}
                    href={row.href}
                    sx={{
                      ...NB_MONO_SX,
                      fontSize: 11,
                      fontWeight: 700,
                      color: NB_COLORS.ink,
                      textDecoration: row.href ? "underline" : "none",
                      textUnderlineOffset: 3,
                    }}
                  >
                    {row.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right: form */}
          <Box sx={{ px: { xs: 3, md: 6 }, py: { xs: 4, md: 6 } }}>
            <ContactForm />
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
