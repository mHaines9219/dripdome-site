import { Metadata } from "next";
import PortfolioContent from "./PortfolioContent";

export const metadata: Metadata = {
  title: "Portfolio | DripDome - Set Design, Pop-Up Activations & Experiential Work NYC",
  description:
    "Explore DripDome's portfolio of set design, pop-up activations, experiential design, and brand activation projects. See our work for film, TV, commercials, immersive brand experiences, and experiential marketing campaigns in NYC and LA.",
  keywords:
    "pop-up activation portfolio, experiential design portfolio, brand activation examples, set design portfolio NYC, immersive experience projects",
  alternates: {
    canonical: "https://www.dripdome.com/portfolio",
  },
  openGraph: {
    title: "Portfolio | DripDome - Set Design, Pop-Up Activations & Experiential Projects",
    description:
      "View our portfolio of set designs, pop-up activations, brand experiences, and immersive installations for film, TV, and experiential marketing.",
    url: "https://www.dripdome.com/portfolio",
    type: "website",
    locale: "en_US",
    siteName: "DripDome",
    images: [
      {
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/southside/ss1.png",
        width: 1200,
        height: 630,
        alt: "DripDome Portfolio - Set Design, Pop-Up Activations & Experiential Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | DripDome - Set Design, Pop-Up Activations & Experiential Work NYC",
    description:
      "View our portfolio of set designs, pop-up activations, brand experiences, and immersive installations for film, TV, and experiential marketing.",
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/southside/ss1.png",
    ],
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
