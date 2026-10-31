"use client";

import { Box, Typography } from "@mui/material";
import Footer from "../ui/Footer";
import ContactForm from "./ContactForm";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_OUTLINE_TEXT_SX,
} from "@/lib/theme";

/** `projectType` preselects the intake's project chip on vertical pages */
export default function Contact({ projectType }: { projectType?: string } = {}) {
  return (
    <>
      <Box component="section" sx={{ bgcolor: NB_COLORS.paper }}>
        {/* One centered column at 90% of the band: the headline sits
            directly over the form. Locations and contact details live in
            the footer below. */}
        <Box
          sx={{
            width: { xs: "100%", md: "90%" },
            mx: "auto",
            px: { xs: 3, md: 0 },
            py: { xs: 4, md: 8 },
          }}
        >
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
            sx={{ fontSize: { xs: 15, md: 17 }, color: NB_COLORS.ink, maxWidth: 560, mb: { xs: 4, md: 5 } }}
          >
            Big or small, every idea has the potential to shine. Tell us about
            your project and let&apos;s build something amazing.
          </Typography>

          <ContactForm projectType={projectType} />
        </Box>
      </Box>
      <Footer />
    </>
  );
}
