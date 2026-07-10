"use client";

import { Box, Typography } from "@mui/material";
import { ACCENT, INK, PAPER } from "@/lib/theme";
import Footer from "../ui/Footer";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: { xs: 4, md: 8 },
          py: { xs: 6, md: 8 },
          bgcolor: PAPER,
          borderTop: `4px solid ${ACCENT}`,
          borderBottom: `4px solid ${INK}`,
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: "50px", md: "80px", lg: "90px" },
            marginBottom: "15px",
            justifyContent: "center",
            display: "flex",
            color: INK,
            whiteSpace: "nowrap",
          }}
        >
          Contact Us
        </Typography>

        <Typography
          variant="body2"
          component="p"
          sx={{
            fontSize: { sm: "20px", md: "25px", lg: "30px" },
            display: "flex",
            textAlign: "center",
            maxWidth: 900,
            marginBottom: "30px",
            color: INK,
          }}
        >
          Big or small, every idea has the potential to shine. Tell us about
          your project and let&apos;s build something amazing!
        </Typography>
        <ContactForm />
      </Box>
      <Footer />
    </>
  );
}
