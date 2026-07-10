"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Box, Typography } from "@mui/material";
import { photographyData } from "../portfolio/data";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const PhotoPageCarousels: React.FC = () => {
  return (
    <>
      {/* Mobile Container */}
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          p: 1,
        }}
      >
        {photographyData.map((section, index) => (
          <Box key={index} sx={{ width: "100%", overflow: "hidden" }}>
            <Typography
              variant="h1"
              component="h1"
              color="white"
              sx={{
                fontSize: { xs: "30px", sm: "55px", lg: "70px" },
                paddingTop: { xs: "30px", sm: "50px", md: "80px" },
                marginBottom: { xs: "20px", md: "30px", lg: "40px" },
                paddingLeft: "10px",
                paddingRight: "10px",
                textAlign: "center",
              }}
            >
              {section.category}
            </Typography>
            <Swiper
              key={index}
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: true,
                reverseDirection: index % 2 === 1,
              }}
              speed={1000}
              slidesPerView={2.5}
              spaceBetween={30}
              modules={[Autoplay]}
              freeMode={true}
            >
              {section.images.map((image, idx) => (
                <SwiperSlide
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    maxWidth: "500px",
                    aspectRatio: "1",
                  }}
                >
                  <Image
                    src={image}
                    fill
                    objectFit="contain"
                    alt={`${section.category} ${idx + 1}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        ))}
      </Box>

      {/* Desktop Container */}
      <Box
        sx={{
          display: { xs: "none", lg: "block" },
          width: "90dvw",
          justifySelf: "center",
          overflow: "hidden",
        }}
      >
        {photographyData.map((section, index) => {
          return (
            <Box key={index} sx={{ width: "100%", overflow: "hidden" }}>
              <Typography
                variant="h1"
                component="h1"
                color="white"
                sx={{
                  fontSize: { xs: "30px", sm: "55px", lg: "70px" },
                  paddingTop: { xs: "30px", md: "30px" },
                  marginBottom: { xs: "20px", md: "30px" },
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  textAlign: "center",
                }}
              >
                {section.category}
              </Typography>
              <Swiper
                key={index}
                loop={true}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: true,
                  reverseDirection: index % 2 === 1,
                }}
                speed={3000}
                slidesPerView={3}
                spaceBetween={40}
                modules={[Autoplay]}
                freeMode={true}
              >
                {section.images.map((image, idx) => (
                  <SwiperSlide
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "500px",
                      height: "600px",
                    }}
                  >
                    <Image
                      src={image}
                      fill
                      objectFit="contain"
                      alt={`${section.category} ${idx + 1}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default PhotoPageCarousels;
