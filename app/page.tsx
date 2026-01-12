import { Box, Typography } from "@mui/material";
import Contact from "./components/Contact";
import HomeBlurb from "./components/HomeBlurb";
import PageButtons from "./components/PageButtons";
import LogoWall from "./components/LogoWall";
import Navbar from "./ui/Navbar";
import Dither from "@/app/components/Dither";

export default function Home() {
  return (
    <>
      <div className="absolute">
        <Dither />
      </div>
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
            zIndex: 10,
            width: "100%",
            // border: "1px solid white",
            mb: 2,
            px: { xs: 2, md: 8 },
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            color="white"
            sx={{
              fontSize: { xs: "24px", sm: "45px", lg: "50px" },
              fontWeight: "bold",
              marginBottom: "15px",
              paddingLeft: "10px",
              paddingRight: "10px",
              justifyContent: "flex-start",
              display: "flex",
              zIndex: 10,
            }}
          >
            Projects We've Contributed To{" "}
          </Typography>
          <Box
            sx={{
              zIndex: 10,
              flexWrap: "wrap",
              gap: { xs: 2, sm: 4 },
              display: "grid",
              justifyItems: "center",
              gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
              justifyContent: { xs: "center", sm: "flex-start" },
              px: 1,
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Box
                key={num}
                sx={{
                  width: { xs: 120, sm: 170, md: 200 },
                  height: { xs: 120, sm: 170, md: 200 },
                  borderRadius: 4,
                  bgcolor: "#222",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: 3,
                  border: "2px solid #333",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: "90%",
                    height: "90%",
                    borderRadius: 3,
                    bgcolor: "#444",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#aaa",
                    fontWeight: 600,
                    fontSize: { xs: 18, sm: 24 },
                    letterSpacing: 1,
                  }}
                >
                  Image {num}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          component="section"
          id="services"
          sx={{
            width: "100%",
            mb: 2,
            px: { xs: 2, md: 8 },
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            color="white"
            sx={{
              fontSize: { xs: "24px", sm: "45px", lg: "50px" },
              fontWeight: "bold",
              marginBottom: "15px",
              paddingLeft: "10px",
              paddingRight: "10px",
              justifyContent: "flex-start",
              display: "flex",
            }}
          >
            Our Services
          </Typography>

          <Box
            sx={{
              display: "grid",
              gap: { xs: 2, sm: 4 },
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                sm: "repeat(4, minmax(0, 1fr))",
              },
              px: 1,
            }}
          >
            {[
              "FABRICATION",
              "SET DESIGN",
              "CONSULTING",
              "PRODUCTION DESIGN",
            ].map((label) => (
              <Box
                key={label}
                sx={{
                  aspectRatio: "1 / 1",
                  borderRadius: 4,
                  bgcolor: "#222",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  boxShadow: 3,
                  border: "2px solid #333",
                  overflow: "hidden",
                  transition: "transform 150ms ease, border-color 150ms ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    borderColor: "rgba(255,255,255,0.5)",
                  },
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    px: 2,
                    color: "rgba(255,255,255,0.85)",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    fontSize: { xs: 12, sm: 14, md: 16 },
                  }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        {/* <Box
        sx={{
          width: "100%",

          bgcolor: "white",
          marginBottom: "auto",
          textAlign: "center",
          border: "1px solid red",
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          color="black"
          sx={{
            fontSize: { xs: "30px", sm: "45px", lg: "50px" }, // Define different font sizes for different breakpoints
            fontWeight: "bold", // Optional: Adjust font weight
            marginBottom: "15px",
            paddingLeft: "10px",
            paddingRight: "10px",
            justifyContent: "center",
            display: "flex",
          }}
        >
          PROJECTS WE'VE CONTRIBUTED TO
        </Typography>
      </Box> */}
        {/* <LogoWall /> */}

        {/* <PageButtons /> */}
        {/* <Box
        component="section"
        id="contact"
        sx={{
          pt: 8,
          pb: 8,
          px: { xs: 2, md: 8 },
          bgcolor: "black",
          color: "common.white",
        }}
      >
        <Contact />
      </Box> */}
      </Box>
    </>
  );
}
