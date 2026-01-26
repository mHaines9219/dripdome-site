import { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services | DripDome - Set Design, Pop-Up Activations & Experiential Design NYC",
  description:
    "Explore DripDome's services: set design, pop-up activations, experiential design, brand activations, carpentry, CNC routing, murals, props, and immersive environments. Custom fabrication for film, TV, events, and experiential marketing in NYC and LA.",
  keywords:
    "pop-up activation services, experiential design services, brand activation NYC, set design services, custom fabrication, immersive experiences, trade show design, retail pop-ups, event fabrication",
  alternates: {
    canonical: "https://www.dripdome.com/services",
  },
  openGraph: {
    title: "Services | DripDome - Set Design, Pop-Up Activations & Experiential Design",
    description:
      "Full-service set design, pop-up activations, and experiential design. Carpentry, scenic painting, props, murals, LED integrations, and immersive brand experiences.",
    url: "https://www.dripdome.com/services",
    type: "website",
    locale: "en_US",
    siteName: "DripDome",
    images: [
      {
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
        width: 1200,
        height: 630,
        alt: "DripDome Services - Set Design, Pop-Up Activations & Experiential Design NYC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | DripDome - Set Design, Pop-Up Activations & Experiential Design NYC",
    description:
      "Full-service set design, pop-up activations, and experiential design. Carpentry, scenic painting, props, murals, LED integrations, and immersive brand experiences.",
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
    ],
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
