import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow } from 'swiper/modules';
import { Typography } from '@mui/material';

import { photographyData } from '../photo/data';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const PhotoPageCarousels: React.FC = () => {
  return (
    <div className="w-screen overflow-hidden">
      {' '}
      {/* Prevent horizontal scroll */}
      {photographyData.map((section, index) => (
        <div key={index} className="max-w-screen overflow-hidden ">
          {' '}
          {/* Prevent expanding beyond viewport */}
          <Typography
            variant="h1"
            component="h1"
            color="black"
            sx={{
              fontSize: { xs: '30px', md: '80px', lg: '96px' },
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
            effect={'coverflow'} // Use coverflow effect
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1.5} // Show partial slides on the sides
            loop={true} // Enable looping for the carousel
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
                className="flex h-[20px] justify-center items-center"
              >
                <div className="">
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
  );
};

export default PhotoPageCarousels;
