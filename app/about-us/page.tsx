import { Metadata } from "next";
import { Box } from "@mui/material";
import AboutUs from "../components/AboutUs";
import FoundersSection from "../components/FoundersSection";
import Contact from "../components/Contact";

export const metadata: Metadata = {
  title: "About Us | DripDome - Women-Owned Set Design Studio NYC",
  description:
    "Learn about DripDome, a women-owned, family-run production design studio based in NYC and LA. We specialize in set design, custom fabrication, murals, and creative services.",
  alternates: {
    canonical: "https://www.dripdome.com/about-us",
  },
  openGraph: {
    title: "About Us | DripDome - Women-Owned Set Design Studio",
    description:
      "Meet the team behind DripDome. A women-owned, family-run production design studio specializing in set design and fabrication.",
    url: "https://www.dripdome.com/about-us",
  },
};

export default function AboutUsPage() {
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
