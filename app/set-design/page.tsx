import { Box } from "@mui/material";
import type { Metadata } from "next";
import JobFile from "../components/JobFile";
import HowWeWork from "../components/HowWeWork";
import Contact from "../components/Contact";
import SetDesignHero from "./SetDesignHero";
import SetDesignJsonLd from "./SetDesignJsonLd";
import { projectsByVertical } from "@/lib/projects";
import { NB_COLORS, NB_RULE } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Set Design & Fabrication for Campaigns, Music Videos & Shows - NYC & LA | DripDome",
  description:
    "DripDome designs and builds sets for brand campaigns, music videos, and studio shows in NYC & LA. Production design, custom fabrication, prop sourcing, and set dressing from one shop. See the FRAIM Freestyle speakers, Paris Hilton, Crisscut, and Google Photos sets.",
  keywords:
    "set design NYC, set fabrication, production design, set dressing, prop sourcing, music video set design, campaign set design, studio show set, custom props NYC, set builder LA",
  openGraph: {
    title: "Set Design & Fabrication for Campaigns, Music Videos & Shows - NYC & LA | DripDome",
    description:
      "Sets for campaigns, music videos, and studio shows. Designed, fabricated, dressed, and struck by one shop. NYC & LA.",
    url: "https://www.dripdome.com/set-design",
    type: "website",
    locale: "en_US",
    siteName: "DripDome",
    images: [
      {
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/crisscut/1.jpg",
        width: 960,
        height: 720,
        alt: "DripDome set design for the Crisscut New York campaign film",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Set Design & Fabrication - NYC & LA | DripDome",
    description:
      "Sets for campaigns, music videos, and studio shows. Designed, fabricated, dressed, and struck by one shop.",
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/crisscut/1.jpg",
    ],
  },
  alternates: {
    canonical: "https://www.dripdome.com/set-design",
  },
};

export default function SetDesignPage() {
  const builds = projectsByVertical("setDesign");

  return (
    <Box component="main" sx={{ bgcolor: NB_COLORS.paper, color: NB_COLORS.ink }}>
      <SetDesignJsonLd />
      <SetDesignHero />

      {/* Shipped sets */}
      <Box
        component="section"
        id="builds"
        sx={{ bgcolor: NB_COLORS.paper, borderBottom: NB_RULE, scrollMarginTop: "120px" }}
      >
        {builds.map((project) => (
          <JobFile key={project.slug} project={project} />
        ))}
      </Box>

      <HowWeWork />

      <Box id="contact" sx={{ scrollMarginTop: { xs: 95, md: 120 } }}>
        <Contact />
      </Box>
    </Box>
  );
}
