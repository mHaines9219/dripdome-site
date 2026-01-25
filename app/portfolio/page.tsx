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
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
