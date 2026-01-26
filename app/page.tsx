import { Box } from "@mui/material";
import HomeBlurb from "./components/HomeBlurb";
import LogoWall from "./components/LogoWall";
import Navbar from "./ui/Navbar";
import ProjectsContributed from "./components/ProjectsContributed";
import OurServices from "./components/OurServices";
import Contact from "./components/Contact";
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
