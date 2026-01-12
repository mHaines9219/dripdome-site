"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow } from "swiper/modules";
import { Box, Typography } from "@mui/material";

import { fabricationData } from "../services/data";
import Image from "next/image";
import "../styles/swiper-pagination.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const ServicesCarousel: React.FC = () => {
  return (
    <>
      {/* Mobile/Tablet Container */}

      <Box
        sx={{
          display: { xs: "block", lg: "none" },
          width: "100vw",
          overflow: "hidden",
          mb: 8,
        }}
      >
        {fabricationData.map((section, index) => (
          <Box key={index} sx={{ maxWidth: "100vw", overflow: "hidden" }}>
            <Swiper
              style={{
                width: "100%",
                maxWidth: "56rem",
                height: "355px",
              }}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1.5}
              loop={true}
              pagination={{ clickable: true }}
              modules={[Pagination, EffectCoverflow]}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
            >
              {section.images.map((image, idx) => (
                <SwiperSlide
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "2px solid white",
                    borderRadius: "16px",
                    overflow: "hidden",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{ position: "relative", width: "100%", height: "100%" }}
                  >
                    <Image
                      src={image}
                      fill
                      style={{ objectFit: "contain" }}
                      alt={`${section.category} ${idx + 1}`}
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        ))}
      </Box>

      {/* Desktop Container */}
      <Box sx={{ display: { xs: "none", lg: "block" }, width: "100vw", mx: 2 }}>
        {fabricationData.map((section, index) => (
          <Box key={index} sx={{ width: "100vw", overflow: "hidden" }}>
            <Typography
              variant="h1"
              component="h1"
              color="black"
              sx={{
                fontSize: { xs: "35px", md: "40px", lg: "45px" },
                fontWeight: "bold",
                lineHeight: 1.2,
                marginTop: "24px",
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              {section.category}
            </Typography>
            <Swiper
              style={{
                width: "100%",
                maxWidth: "80rem",
                height: "700px",
                marginBottom: "96px",
                marginTop: "-80px",
              }}
              grabCursor={true}
              slidesPerView={2.5} // Adjust based on your preference
              spaceBetween={10} // Add space between slides
              loop={true}
              pagination={{ clickable: true }}
              modules={[Pagination]}
            >
              {section.images.map((image, idx) => (
                <SwiperSlide
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "4px solid white",
                    borderRadius: "16px",
                  }}
                >
                  <Box
                    sx={{
                      width: 600,
                      height: 600,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={image}
                      height={500}
                      width={500}
                      style={{ objectFit: "contain" }}
                      alt={`${section.category} ${idx + 1}`}
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ServicesCarousel;
