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
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
