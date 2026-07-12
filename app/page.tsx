import { Box } from "@mui/material";
import type { Metadata } from "next";
import { NB_COLORS } from "@/lib/theme";
import HomeHero from "./components/HomeHero";
import SocialProofBar from "./components/SocialProofBar";
import Specialties from "./components/Specialties";
import HomeFeaturedWork from "./components/HomeFeaturedWork";
import TrustWall, { TrustPress } from "./components/TrustWall";
import OurServices from "./components/OurServices";
import HowWeWork from "./components/HowWeWork";
import Contact from "./components/Contact";

export const metadata: Metadata = {
  title:
    "DripDome | Set Design, Pop-Up Activations & Experiential Design - NYC & LA",
  description:
    "We build worlds. Set design, pop-up activations & experiential design trusted by world-class brands and A-list talent. Custom fabrication for brand experiences, immersive environments & productions in NYC & LA.",
  keywords:
    "set design NYC, pop-up activations, experiential design, brand activations NYC, immersive experiences, custom fabrication, production design, pop-up shops NYC, experiential marketing, event design",
  openGraph: {
    title:
      "DripDome | Set Design, Pop-Up Activations & Experiential Design - NYC & LA",
    description:
      "We build worlds. Set design, pop-up activations & experiential design trusted by world-class brands. Custom fabrication for brand experiences & immersive environments in NYC & LA.",
    url: "https://www.dripdome.com",
    type: "website",
    locale: "en_US",
    siteName: "DripDome",
    images: [
      {
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
        width: 1200,
        height: 630,
        alt: "DripDome - Set Design, Pop-Up Activations & Experiential Design NYC & LA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "DripDome | Set Design, Pop-Up Activations & Experiential Design - NYC & LA",
    description:
      "We build worlds. Set design, pop-up activations & experiential design trusted by world-class brands. Custom fabrication for brand experiences & immersive environments in NYC & LA.",
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
    ],
  },
  alternates: {
    canonical: "https://www.dripdome.com",
  },
};

export default function Home() {
  return (
    <Box component="main" sx={{ bgcolor: NB_COLORS.paper, color: NB_COLORS.ink }}>
      <HomeHero />
      <SocialProofBar />
      <Specialties />
      <HomeFeaturedWork />
      <TrustWall />
      {/* <OurServices /> */}
      <HowWeWork />
      <TrustPress />
      <Box id="contact" sx={{ scrollMarginTop: { xs: 95, md: 120 } }}>
        <Contact />
      </Box>
    </Box>
  );
}
