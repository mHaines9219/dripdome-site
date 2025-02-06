import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { Typography } from '@mui/material';
import { photographyData } from '../portfolio/data';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import type { Swiper as SwiperInstance } from 'swiper';

const PhotoPageCarousels: React.FC = () => {
  return (
    <>
      {/* Mobile Container */}
      <div className="lg:hidden w-screen overflow-hidden">
        {photographyData.map((section, index) => (
          <div key={index} className="max-w-screen overflow-hidden">
            <Typography
              variant="h1"
              component="h1"
              color="white"
              sx={{
                fontSize: { xs: '30px', sm: '55px', lg: '70px' },
                fontWeight: 'bold',
                paddingTop: { xs: '30px', sm: '50px', md: '80px' },
                marginBottom: { xs: '20px', md: '30px', lg: '40px' },
                paddingLeft: '10px',
                paddingRight: '10px',
                textAlign: 'center',
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
              spaceBetween={0}
              modules={[Autoplay]}
              freeMode={true}
            >
              {section.images.map((image, idx) => (
                <SwiperSlide
                  key={idx}
                  className="flex justify-center items-center rounded-lg"
                  style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '500px',
                    aspectRatio: '1',
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
          </div>
        ))}
      </div>

      {/* Desktop Container */}
      <div className="hidden lg:block w-screen overflow-hidden">
        {photographyData.map((section, index) => {
          // Offset index for desktop containers to avoid collision with mobile ones
          const desktopIndex = index + photographyData.length;
          return (
            <div key={index} className="max-w-screen overflow-hidden">
              <Typography
                variant="h1"
                component="h1"
                color="white"
                sx={{
                  fontSize: { xs: '30px', sm: '55px', lg: '70px' },
                  fontWeight: 'bold',
                  paddingTop: { xs: '30px', md: '30px' },
                  marginBottom: { xs: '20px', md: '30px' },
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  textAlign: 'center',
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
                spaceBetween={0}
                modules={[Autoplay]}
                freeMode={true}
              >
                {section.images.map((image, idx) => (
                  <SwiperSlide
                    key={idx}
                    className="flex justify-center items-center rounded-lg"
                    style={{ width: '500px', height: '500px' }}
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
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PhotoPageCarousels;
