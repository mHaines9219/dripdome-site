"use client";

import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { homeCarouselData } from "../portfolio/data";
import Image from "next/image";

const LogoCarousel = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        overflow: "hidden",
        pr: 4,
      }}
    >
      {homeCarouselData.map((section, index) => (
        <Box key={index} sx={{ maxWidth: "100vw", overflow: "hidden" }}>
          <Swiper
            key={index}
            style={{}}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: true,
              reverseDirection: index % 2 === 1,
            }}
            speed={6000}
            slidesPerView={2}
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
                  style={{ objectFit: "contain" }}
                  alt={`${section.category} ${idx + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      ))}
    </Box>
  );
};

export default LogoCarousel;
