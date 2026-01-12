import React from "react";
import { Box } from "@mui/material";
import AboutUs from "../components/AboutUs";
import FoundersSection from "../components/FoundersSection";
import Contact from "../components/Contact";

export default function page() {
  return (
    <Box>
      <AboutUs />
      <FoundersSection />
      <Box sx={{ bgcolor: "black", py: 10 }}>
        <Contact />
      </Box>
    </Box>
  );
}
