import { Box } from "@mui/material";
import type { Metadata } from "next";
import JobFile from "../components/JobFile";
import HowWeWork from "../components/HowWeWork";
import Contact from "../components/Contact";
import PodcastStudiosHero from "./PodcastStudiosHero";
import PodcastStudiosJsonLd from "./PodcastStudiosJsonLd";
import { projectsByVertical } from "@/lib/projects";
import { NB_COLORS, NB_DISPLAY_SX, NB_MONO_SX, NB_RULE } from "@/lib/theme";
import { Typography } from "@mui/material";

export const metadata: Metadata = {
  title: "Podcast Studio Design & Build - NYC & LA | DripDome",
  description:
    "DripDome designs and builds permanent, camera-ready podcast studios in NYC & LA. Custom fabrication, lighting, LED signage & full wiring. Our builds have 20M+ views. Built in as little as 4 days.",
  keywords:
    "podcast studio builders, podcast studio design, podcast set design, custom podcast studio NYC, podcast studio build LA, podcast set fabrication, camera-ready studio, podcast studio construction",
  openGraph: {
    title: "Podcast Studio Design & Build - NYC & LA | DripDome",
    description:
      "Permanent, camera-ready podcast studios designed, fabricated, and wired in-house. 20M+ views shot on our builds. NYC & LA.",
    url: "https://www.dripdome.com/podcast-studios",
    type: "website",
    locale: "en_US",
    siteName: "DripDome",
    images: [
      {
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_1.JPG",
        width: 1200,
        height: 630,
        alt: "DripDome custom podcast studio build for NotLoveline",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Podcast Studio Design & Build - NYC & LA | DripDome",
    description:
      "Permanent, camera-ready podcast studios designed, fabricated, and wired in-house. 20M+ views shot on our builds.",
    images: ["https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_1.JPG"],
  },
  alternates: {
    canonical: "https://www.dripdome.com/podcast-studios",
  },
};

export default function PodcastStudiosPage() {
  const builds = projectsByVertical("podcast");

  return (
    <Box component="main" sx={{ bgcolor: NB_COLORS.paper, color: NB_COLORS.ink }}>
      <PodcastStudiosJsonLd />
      <PodcastStudiosHero />

      {/* Shipped builds */}
      <Box
        component="section"
        id="builds"
        sx={{ bgcolor: NB_COLORS.paper, borderBottom: NB_RULE, scrollMarginTop: "120px" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            px: { xs: 3, md: 6 },
            py: { xs: 3, md: 4 },
            borderBottom: NB_RULE,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography
            variant="h2"
            sx={{ ...NB_DISPLAY_SX, fontSize: { xs: 32, sm: 48, lg: 64 }, color: NB_COLORS.ink }}
          >
            SHIPPED BUILDS
          </Typography>
          <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
            PODCAST FILES · FROM THE ARCHIVE
          </Typography>
        </Box>
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
