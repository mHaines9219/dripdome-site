import type { Metadata } from "next";
import { Box } from "@mui/material";
import { INK } from "@/lib/theme";
import TrustWall, { TrustPress } from "../components/TrustWall";
import SocialProofBar from "../components/SocialProofBar";
import Footer from "../ui/Footer";
import BrandActivationsHero from "./BrandActivationsHero";
import BrandActivationsProcess from "./BrandActivationsProcess";
import CaseStudiesSection from "./CaseStudiesSection";
import BrandActivationsFAQ from "./BrandActivationsFAQ";
import BrandActivationForm from "./BrandActivationForm";
import BrandActivationsServiceJsonLd from "./BrandActivationsServiceJsonLd";
import PageViewTracker from "./PageViewTracker";

export const metadata: Metadata = {
  title:
    "Brand Activation Studio NYC | Concept to Install in 2 Weeks | DripDome",
  description:
    "NYC brand activation studio. Design, fabrication, and install all in house. Trusted by Google and top lifestyle brands for pop ups, product launches, and experiential builds.",
  openGraph: {
    title: "Brand Activation Studio NYC | DripDome",
    description:
      "From brief to install in 2 weeks. Turnkey brand activation design and fabrication studio in NYC and LA.",
    url: "https://www.dripdome.com/brand-activations",
    type: "website",
    locale: "en_US",
    siteName: "DripDome",
    images: [
      {
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
        width: 1200,
        height: 630,
        alt: "DripDome Brand Activation Studio NYC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand Activation Studio NYC | DripDome",
    description:
      "From brief to install in 2 weeks. Turnkey brand activation design and fabrication studio in NYC and LA.",
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
    ],
  },
  alternates: {
    canonical: "https://www.dripdome.com/brand-activations",
  },
};

export default function BrandActivationsPage() {
  return (
    <Box sx={{ bgcolor: INK }}>
      <BrandActivationsServiceJsonLd />
      <PageViewTracker />
      <BrandActivationsHero />
      <BrandActivationsProcess />
      <SocialProofBar />
      <TrustWall />
      <CaseStudiesSection />
      <TrustPress />
      <BrandActivationsFAQ />
      <BrandActivationForm />
      <Footer />
    </Box>
  );
}
