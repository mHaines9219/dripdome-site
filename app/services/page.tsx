import { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services | DripDome - Set Design & Fabrication Services NYC",
  description:
    "Explore DripDome's professional services: carpentry, set design, CNC routing, 3D renders, murals, props, and more. Custom fabrication for film, TV, and events in NYC and LA.",
  alternates: {
    canonical: "https://www.dripdome.com/services",
  },
  openGraph: {
    title: "Services | DripDome - Professional Set Design & Fabrication",
    description:
      "Full-service set design and fabrication: carpentry, scenic painting, props, murals, LED integrations, and more.",
    url: "https://www.dripdome.com/services",
    type: "website",
    locale: "en_US",
    siteName: "DripDome",
    images: [
      {
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
        width: 1200,
        height: 630,
        alt: "DripDome Services - Set Design & Fabrication NYC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | DripDome - Set Design & Fabrication Services NYC",
    description:
      "Full-service set design and fabrication: carpentry, scenic painting, props, murals, LED integrations, and more.",
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
    ],
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
