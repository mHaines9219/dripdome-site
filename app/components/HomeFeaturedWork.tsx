"use client";

import Link from "next/link";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Autoplay, EffectCards } from "swiper/modules";
import { ACCENT, INK, PAPER, nbShadow } from "@/lib/theme";

const S3 = "https://dripdome-site.s3.us-east-2.amazonaws.com";

const projects = [
  {
    header: "GOOGLE PHOTOS VIDEO RECAP CAMPAIGN",
    blurb: `For a branded project with Google Photos, DripDome Productions led production design, including set design, prop and furniture sourcing, and full set dressing. The shoot featured K-pop star EJAE as the model, with every visual element curated to support a clean, lifestyle-driven aesthetic aligned with the brand.`,
    images: [
      `${S3}/goog-photos/ejae.png`,
      `${S3}/goog-photos/purple.jpg`,
      `${S3}/goog-photos/red.jpg`,
      `${S3}/goog-photos/laydown.jpg`,
    ],
  },
  {
    header: "THE SET OF NOTLOVELINE",
    blurb: `Our team designed and fabricated the podcast set for Trisha Paytas and Tana Mongeau's NotLoveline show — racking up 19M+ views. We created a vaporwave inspired set with retro wallpaper, a neon sign, and a custom built and wired heart wall with alternating colors.`,
    images: [
      `${S3}/NLL/IMG_1.JPG`,
      `${S3}/NLL/IMG_2.JPG`,
      `${S3}/NLL/IMG_3.JPG`,
      `${S3}/NLL/IMG_4.jpeg`,
      `${S3}/NLL/IMG_5.jpeg`,
    ],
  },
];

export default function HomeFeaturedWork() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="section"
      id="featured-work"
      sx={{
        px: 3,
        width: "100%",
        overflow: "hidden",
        py: { xs: 4, md: 6 },
        scrollMarginTop: "80px",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "28px", sm: "45px", lg: "55px" },
          color: "white",
          textAlign: "center",
          mb: { xs: 3, md: 5 },
        }}
      >
        Featured{" "}
        <Box component="span" sx={{ color: ACCENT }}>
          Work
        </Box>
      </Typography>

      {projects.map((section, index) => (
        <Box
          key={index}
          sx={{
            pt: { md: 4, lg: 4 },
            mb: 4,
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
              border: `3px solid ${PAPER}`,
              borderRadius: 0,
              backgroundColor: INK,
              boxShadow: nbShadow(8, ACCENT),
              p: { xs: "20px 0 0 0", sm: "20px" },
            }}
          >
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
                autoplay={{ delay: 2500, disableOnInteraction: true }}
                cardsEffect={{
                  perSlideOffset: 8,
                  perSlideRotate: 2,
                  rotate: true,
                  slideShadows: false,
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
                        borderRadius: 0,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={image}
                        alt={section.header}
                        fill
                        sizes="(max-width: 600px) 90vw, 40vw"
                        style={{ objectFit: "contain" }}
                      />
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>

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
                variant="h3"
                sx={{
                  fontSize: { xs: "24px", sm: "32px", md: "36px", lg: "44px" },
                  mb: "1.5rem",
                  color: "white",
                }}
              >
                {section.header}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "14px", sm: "18px", md: "20px" },
                  color: PAPER,
                }}
              >
                {section.blurb}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}

      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography
          component={Link}
          href="/portfolio"
          sx={{
            display: "inline-block",
            color: ACCENT,
            fontSize: { xs: "14px", sm: "16px" },
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            textDecoration: "none",
            px: 1,
            py: 0.5,
            "&:hover": { bgcolor: ACCENT, color: INK },
          }}
        >
          See All Projects &rarr;
        </Typography>
      </Box>
    </Box>
  );
}
