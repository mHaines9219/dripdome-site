import { Metadata } from "next";
import PortfolioContent from "./PortfolioContent";

export const metadata: Metadata = {
  title: "Portfolio | DripDome - Set Design & Fabrication Work NYC",
  description:
    "Explore DripDome's portfolio of set design, custom fabrication, and production design projects. See our work for film, TV, commercials, and experiential events in NYC and LA.",
  alternates: {
    canonical: "https://www.dripdome.com/portfolio",
  },
  openGraph: {
    title: "Portfolio | DripDome - Set Design & Fabrication Projects",
    description:
      "View our portfolio of custom set designs, fabrications, and production work for film, TV, and events.",
    url: "https://www.dripdome.com/portfolio",
    type: "website",
    locale: "en_US",
    siteName: "DripDome",
    images: [
      {
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
        width: 1200,
        height: 630,
        alt: "DripDome Portfolio - Set Design & Fabrication Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | DripDome - Set Design & Fabrication Work NYC",
    description:
      "View our portfolio of custom set designs, fabrications, and production work for film, TV, and events.",
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
    ],
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
