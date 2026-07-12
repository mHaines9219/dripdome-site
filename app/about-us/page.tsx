import { Metadata } from "next";
import { Box } from "@mui/material";
import AboutUs from "../components/AboutUs";
import FoundersSection from "../components/FoundersSection";
import Contact from "../components/Contact";
import { NB_COLORS } from "@/lib/theme";

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
    type: "website",
    locale: "en_US",
    siteName: "DripDome",
    images: [
      {
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
        width: 1200,
        height: 630,
        alt: "DripDome - Women-Owned Set Design Studio NYC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | DripDome - Women-Owned Set Design Studio NYC",
    description:
      "Meet the team behind DripDome. A women-owned, family-run production design studio specializing in set design and fabrication.",
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
    ],
  },
};

export default function AboutUsPage() {
  return (
    <Box component="main" sx={{ bgcolor: NB_COLORS.paper, color: NB_COLORS.ink }}>
      <AboutUs />
      <FoundersSection />
      <Box id="contact" sx={{ scrollMarginTop: { xs: 95, md: 120 } }}>
        <Contact />
      </Box>
    </Box>
  );
}
