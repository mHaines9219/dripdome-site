import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Typography } from '@mui/material';

import { photographyData } from '../photo/data';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/swiper-styles.css';

const PhotoPageCarousels: React.FC = () => {
  const [activeIndexes, setActiveIndexes] = useState<number[]>(
    photographyData.map(() => 1) // Start each carousel on the second image
  );

  const handleSlideChange = (index: number, activeIndex: number) => {
    setActiveIndexes((prev) => {
      const newIndexes = [...prev];
      newIndexes[index] = activeIndex;
      return newIndexes;
    });
  };

  return (
    <div className="w-screen overflow-hidden">
      {photographyData.map((section, index) => (
        <div key={index}>
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
            className="justify-center items-center"
            spaceBetween={15}
            slidesPerView={2}
            centeredSlides={true}
            loop={true} // Enable looping for the carousel
            pagination={{ clickable: true }}
            modules={[Pagination]}
            onSlideChange={(swiper) =>
              handleSlideChange(index, swiper.realIndex)
            } // Update active index for the specific carousel
          >
            {section.images.map((image, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className="relative "
                  style={{
                    filter: idx === activeIndexes[index] ? 'none' : 'blur(2px)', // Blur all slides except the active one for the specific carousel

                    zIndex: idx === activeIndexes[index] ? 100 : 1, // Set higher zIndex for active image
                    transform:
                      idx === activeIndexes[index] ? 'scale(1.1)' : 'scale(1)', // Slightly enlarge the active image
                    transition:
                      'filter 0.3s ease-in-out, transform 0.3s ease-in-out',
                  }}
                >
                  <Image
                    src={image}
                    width={200}
                    height={200}
                    objectFit="cover"
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
