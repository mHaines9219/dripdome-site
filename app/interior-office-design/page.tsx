import { Box } from "@mui/material";
import type { Metadata } from "next";
import JobFile from "../components/JobFile";
import HowWeWork from "../components/HowWeWork";
import Contact from "../components/Contact";
import InteriorOfficeDesignHero from "./InteriorOfficeDesignHero";
import InteriorOfficeDesignJsonLd from "./InteriorOfficeDesignJsonLd";
import { projectsByVertical } from "@/lib/projects";
import { NB_COLORS, NB_RULE } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Interior & Office Design Build - NYC & LA | DripDome",
  description:
    "DripDome designs design-forward offices and interiors in NYC & LA. Space planning, custom CNC signage, furniture, FF&E & styling, managed end to end. See our Flatiron HQ buildout for Seismic Systems.",
  keywords:
    "office design NYC, interior design build, commercial interior design, office buildout NYC, custom signage, workspace design LA, office fit out, branded office signage, Flatiron office design",
  openGraph: {
    title: "Interior & Office Design Build - NYC & LA | DripDome",
    description:
      "Design-forward offices and interiors, space-planned, furnished, and styled end to end. See our Flatiron HQ buildout for Seismic Systems. NYC & LA.",
    url: "https://www.dripdome.com/interior-office-design",
    type: "website",
    locale: "en_US",
    siteName: "DripDome",
    images: [
      {
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/seismic/hero.jpg",
        width: 1200,
        height: 630,
        alt: "DripDome interior buildout for Seismic Systems in the Flatiron District",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior & Office Design Build - NYC & LA | DripDome",
    description:
      "Design-forward offices and interiors, space-planned, furnished, and styled end to end. See our Flatiron HQ buildout for Seismic Systems.",
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/seismic/hero.jpg",
    ],
  },
  alternates: {
    canonical: "https://www.dripdome.com/interior-office-design",
  },
};

export default function InteriorOfficeDesignPage() {
  const builds = projectsByVertical("interior");

  return (
    <Box component="main" sx={{ bgcolor: NB_COLORS.paper, color: NB_COLORS.ink }}>
      <InteriorOfficeDesignJsonLd />
      <InteriorOfficeDesignHero />

      {/* Shipped builds */}
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
