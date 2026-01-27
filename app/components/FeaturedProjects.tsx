"use client";

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Autoplay, EffectCards } from "swiper/modules";

const sections = [
  {
    header: "LOWER EAST SIDE GIRLS CLUB CHARITY EVENT",
    blurb: `For a charity event hosted by Lower East Side Girls Club, DripDome Productions created a 10’ × 8’ Alice in Wonderland–inspired photo moment featuring custom, vinyl-wrapped playing cards with the organization’s initials, set against a lush garden wall backdrop. Fabricated off-site and installed in under two hours despite strict venue constraints, the installation was experienced by roughly 200 guests and cited by organizers as the highlight of the evening.
`,
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/view.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/render.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/frame.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/mattdiana.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/twogirls.jpg",
    ],
  },
  {
    header: "GOOGLE PHOTOS VIDEO RECAP CAMPAIGN",
    blurb: `For a branded project with Google Photos, DripDome Productions led production design, including set design, prop and furniture sourcing, and full set dressing. The shoot featured K-pop star EJAE as the model, with every visual element curated to support a clean, lifestyle-driven aesthetic aligned with the brand.`,
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/goog-photos/ejae.png",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/goog-photos/purple.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/goog-photos/red.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/goog-photos/laydown.jpg",
    ],
  },
  {
    header: "THE SET OF NOTLOVELINE",
    blurb: `Our team designed and fabricated the podcast set for Trisha Paytas and Tana Mongeau's NotLoveline show. We created a vaporwave inspired set with retro wallpaper, a neon sign, and a custom built and wired heart wall with alternating colors.`,
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_1.JPG",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_2.JPG",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_3.JPG",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_4.jpeg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_5.jpeg",
    ],
  },
  {
    header: "THE ORIGINAL SOUTH SIDE",
    blurb: `We collaborated with The Original Southside™ on their ad campaign, managing prop sourcing, styling, and custom vinyl wraps. Our team ensured each element reflected the brand's modern twist on the classic 1920s Southside cocktail, effectively communicating their commitment to quality and style.`,
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/southside/ss1.png",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/southside/ss2.png",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/southside/ss3.png",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/southside/ss4.png",
    ],
  },
  {
    header: "JENNIFERS BODY PHOTO SHOOT",
    blurb: `We meticulously recreated the iconic pool scene from Jennifers Body by constructing a 20x20-foot structure featuring a functional pool. To authentically capture the scene's atmosphere, we employed specialized techniques to distress the walls, achieving a realistic, aged appearance. This project highlights our commitment to detail and our ability to bring cinematic visions to life.`,
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/jennifersbody/jb4.png",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/jennifersbody/jb2.png",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/jennifersbody/jb1.png",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/jennifersbody/jb3.png",
    ],
  },
];

const FeaturedProjects = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ px: 3, width: "100%", overflow: "hidden" }}>
      {sections.map((section, index) => (
        <Box
          key={index}
          sx={{
            borderRadius: 4,
            pt: { md: 8, lg: 8 },
            mb: 6,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile
                ? "column"
                : index % 2 === 0
                  ? "row"
                  : "row-reverse",
              alignItems: "center",
              mb: "2rem",
              width: "100%",
              gap: "1.5rem",
              overflow: "hidden",
              border: "4px solid rgba(255, 0, 170, 0.3)",
              borderRadius: "30px",
              backgroundColor: "#121212",
              paddingTop: {
                xs: "20px",
                sm: "20px",
                md: "20px",
                lg: "20px",
                xl: "20px",
              },
              paddingBottom: {
                xs: "0px",
                sm: "20px",
                md: "20px",
                lg: "20px",
                xl: "20px",
              },
              paddingLeft: {
                xs: "0px",
                sm: "20px",
                md: "20px",
                lg: "20px",
                xl: "20px",
              },
              paddingRight: {
                xs: "0px",
                sm: "20px",
                md: "20px",
                lg: "20px",
                xl: "20px",
              },
            }}
          >
            {/* Swiper with Cards Effect */}
            <Box
              sx={{
                flex: 1,
                width: "100%",
                maxWidth: isMobile ? "100%" : "50%",
                minWidth: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Swiper
                effect="cards"
                grabCursor={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: true,
                }}
                cardsEffect={{
                  perSlideOffset: 8,
                  perSlideRotate: 2,
                  rotate: true,
                  slideShadows: true,
                }}
                modules={[EffectCards, Autoplay]}
                style={{ width: "100%" }}
              >
                {section.images.map((image, idx) => (
                  <SwiperSlide
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: {
                          xs: "300px",
                          sm: "400px",
                          md: "500px",
                          lg: "600px",
                        },
                        position: "relative",
                        borderRadius: "15px",
                        overflow: "hidden",
                        boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <Image
                        src={image}
                        alt={`${section.header}`}
                        fill
                        sizes="(max-width: 600px) 90vw, (max-width: 900px) 40vw, 40vw"
                        style={{
                          objectFit: "contain",
                          borderRadius: "15px",
                        }}
                      />
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>

            {/* Header and Blurb */}
            <Box
              sx={{
                flex: 1,
                maxWidth: isMobile ? "100%" : "50%",
                minWidth: 0,
                textAlign: isMobile ? "center" : "left",
                p: "0 10px 20px 10px",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "28px", sm: "36px", md: "40px", lg: "50px" },
                  mb: "1.5rem",
                  color: "white",
                  "& span": { color: "#FF00AA" },
                }}
              >
                {section.header}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "14px", sm: "18px", md: "20px" },
                  color: "#e0e0e0",
                }}
              >
                {section.blurb}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default FeaturedProjects;
