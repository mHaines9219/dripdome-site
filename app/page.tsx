import { Box } from "@mui/material";
import type { Metadata } from "next";
import HomeBlurb from "./components/HomeBlurb";
import Navbar from "./ui/Navbar";
import ProjectsContributed from "./components/ProjectsContributed";
import OurServices from "./components/OurServices";
import Contact from "./components/Contact";

export const metadata: Metadata = {
  title: "DripDome | Set Design & Production Design Studio - NYC & LA",
  description:
    "We build worlds. Production design & custom fabrication trusted by world-class brands and A-list talent — from concept to completion in NYC & LA.",
  openGraph: {
    title: "DripDome | Set Design & Production Design Studio - NYC & LA",
    description:
      "We build worlds. Production design & custom fabrication trusted by world-class brands and A-list talent — from concept to completion in NYC & LA.",
    url: "https://www.dripdome.com",
    type: "website",
    locale: "en_US",
    siteName: "DripDome",
    images: [
      {
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
        width: 1200,
        height: 630,
        alt: "DripDome - Set Design & Production Design Studio in NYC & LA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DripDome | Set Design & Production Design Studio - NYC & LA",
    description:
      "We build worlds. Production design & custom fabrication trusted by world-class brands and A-list talent — from concept to completion in NYC & LA.",
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
    ],
  },
  alternates: {
    canonical: "https://www.dripdome.com",
  },
};

export default function Home() {
  return (
    <>
      <Box
        component="main"
        sx={{
          zIndex: 10,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100dvw",
          maxWidth: "2500px",
          margin: "0 auto",
          color: "common.white",
        }}
      >
        <Navbar />
        <Box
          component="section"
          id="home"
          sx={{
            zIndex: 10,

            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start ",
            justifyContent: "center",
            textAlign: "left",
            px: { xs: 0, md: 8 },
            mb: 2,
            // border: "1px solid white",
          }}
        >
          <HomeBlurb />
        </Box>
        <Box
          sx={{
            // width: "100%",
            // height: "500px",
            bgcolor: "black",
          }}
        >
          {/* <LogoWall /> */}
          <OurServices />
        </Box>
        <ProjectsContributed />
        {/* <OurServices /> */}
        <Contact />
      </Box>
    </>
  );
}
