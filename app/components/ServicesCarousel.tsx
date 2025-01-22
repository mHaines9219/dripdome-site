import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow } from 'swiper/modules';
import { Typography } from '@mui/material';

import { fabricationData } from '../services/data';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const ServicesCarousel: React.FC = () => {
  return (
    <>
      {/* Mobile/Tablet Container */}

      <div className="lg:hidden w-screen overflow-hidden mb-8">
        {fabricationData.map((section, index) => (
          <div key={index} className="max-w-screen overflow-hidden">
            <Swiper
              className="w-full max-w-4xl h-[355px] justify-center items-center"
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
                  className=" flex h-[20px] justify-center items-center border-4 border-black"
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
      <div className="hidden lg:block w-screen ">
        {fabricationData.map((section, index) => (
          <div key={index} className="max-w-screen overflow-hidden">
            <Typography
              variant="h1"
              component="h1"
              color="black"
              sx={{
                fontSize: { xs: '35px', md: '40px', lg: '45px' },
                fontWeight: 'bold',
                lineHeight: 1.2,
                marginTop: '24px',
                marginBottom: '24px',
                textAlign: 'center',
              }}
            >
              {section.category}
            </Typography>
            <Swiper
              className="w-full max-w-4xl h-[550px] justify-center items-center mb-12"
              grabCursor={true}
              spaceBetween={100}
              centeredSlides={true}
              slidesPerView={4}
              initialSlide={1}
              loop={true}
              pagination={{ clickable: true }}
              modules={[Pagination]}
            >
              {section.images.map((image, idx) => (
                <SwiperSlide
                  key={idx}
                  className="flex h-[20px] mx-48 justify-center items-center"
                >
                  <div className="h-96 w-96">
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

export default ServicesCarousel;
