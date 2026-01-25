import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Contact from "./components/Contact";
import HomeBlurb from "./components/HomeBlurb";
import PageButtons from "./components/PageButtons";
import LogoWall from "./components/LogoWall";
import Navbar from "./ui/Navbar";
import Dither from "@/app/components/Dither";
import ProjectsContributed from "./components/ProjectsContributed";
import OurServices from "./components/OurServices";
import ExpandableCardDemo from "./components/expandable-card-demo-grid";
import { LiquidMetalCard } from "@/components/ui/liquid-metal-card";
import { LiquidMetalCardDefault } from "./components/LiquidMetalCardDefault";

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
          maxWidth: "2000px",
          // margin: "0 auto",
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
            px: { xs: 2, md: 8 },
            mb: 2,
            // border: "1px solid white",
          }}
        >
          <HomeBlurb />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "500px",
            bgcolor: "gray",
          }}
        >
          {/* <ExpandableCardDemo /> */}
          {/* <LiquidMetalCard /> */}
          <LiquidMetalCardDefault />
        </Box>
        <ProjectsContributed />
        <OurServices />
      </Box>
    </>
  );
}
