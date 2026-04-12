"use client";

import { Box, Typography } from "@mui/material";
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
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: "50px", md: "80px", lg: "90px" },
            fontWeight: "bold",
            marginBottom: "15px",
            justifyContent: "center",
            display: "flex",
            color: "white",
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
            color: "white",
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
