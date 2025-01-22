import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow } from 'swiper/modules';
import { Typography } from '@mui/material';

import { photographyData } from '../portfolio/data';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const PhotoPageCarousels: React.FC = () => {
  return (
    <>
      {/* Mobile/Tablet Container */}
      <div className="lg:hidden w-screen overflow-hidden">
        {photographyData.map((section, index) => (
          <div key={index} className="max-w-screen overflow-hidden">
            <Typography
              variant="h1"
              component="h1"
              color="white"
              sx={{
                fontSize: { xs: '45px', sm: '60px', md: '75px', lg: '75px' },
                fontWeight: 'bold',
                lineHeight: 1.2,
                marginTop: '20px',
                marginBottom: '20px',
                textAlign: 'center',
                whitespace: 'nowrap',
              }}
            >
              {section.category}
            </Typography>
            <Swiper
              className="w-full max-w-4xl h-full justify-center items-center"
              effect={'coverflow'}
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
                  className="flex h-[20px] justify-center items-center border-4 border-white"
                >
                  <div>
                    <Image
                      src={image}
                      width={500}
                      height={500}
                      objectFit="contain"
                      alt={`${section.category} ${idx + 1}`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>

      {/* Desktop Container */}
      <div className="hidden lg:block w-screen overflow-hidden">
        {photographyData.map((section, index) => (
          <div key={index} className="max-w-screen overflow-hidden">
            <Typography
              variant="h1"
              component="h1"
              color="white"
              sx={{
                fontSize: { xs: '35px', md: '80px', lg: '95px' },
                fontWeight: 'bold',
                lineHeight: 1.2,
                marginTop: '20px',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              {section.category}
            </Typography>
            <Swiper
              className="w-full max-w-4xl h-full justify-center items-center"
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={3}
              initialSlide={1}
              loop={true}
              pagination={{ clickable: true }}
              modules={[Pagination]}
            >
              {section.images.map((image, idx) => (
                <SwiperSlide
                  key={idx}
                  className="flex h-[20px] justify-center items-center border-4 border-black rounded-lg"
                >
                  <div>
                    <Image
                      src={image}
                      width={500}
                      height={500}
                      objectFit="contain"
                      alt={`${section.category} ${idx + 1}`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>
    </>
  );
};

export default PhotoPageCarousels;
