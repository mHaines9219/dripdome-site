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
  // Array to hold Swiper instances
  const swiperRefs = useRef<SwiperInstance[]>([]);
  // Array to hold container DOM nodes for each carousel
  const containerRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Observer callback: start autoplay if at least 50% visible, otherwise stop autoplay
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const indexAttr = entry.target.getAttribute('data-index');
          if (!indexAttr) return;
          const index = parseInt(indexAttr, 10);
          const swiper = swiperRefs.current[index];
          if (swiper && swiper.autoplay) {
            if (entry.isIntersecting) {
              swiper.autoplay.start();
            } else {
              swiper.autoplay.stop();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    containerRefs.current.forEach((container) => {
      if (container) {
        observer.observe(container);
      }
    });

    return () => {
      containerRefs.current.forEach((container) => {
        if (container) {
          observer.unobserve(container);
        }
      });
    };
  }, []);

  return (
    <>
      {/* Mobile Container */}
      <div className="lg:hidden w-screen overflow-hidden">
        {photographyData.map((section, index) => (
          <div
            key={index}
            className="max-w-screen overflow-hidden"
            ref={(el) => {
              if (el) containerRefs.current[index] = el;
            }}
            data-index={index.toString()}
          >
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
                waitForTransition: false,
                reverseDirection: index % 2 === 1,
              }}
              speed={10000}
              slidesPerView="auto"
              spaceBetween={0}
              modules={[Autoplay]}
              onSwiper={(swiper: SwiperInstance) => {
                swiperRefs.current[index] = swiper;
              }}
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
            <div
              key={index}
              className="max-w-screen overflow-hidden"
              ref={(el) => {
                if (el) containerRefs.current[desktopIndex] = el;
              }}
              data-index={desktopIndex.toString()}
            >
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
                  delay: 2000,
                  disableOnInteraction: true,
                  waitForTransition: false,
                  reverseDirection: index % 2 === 1,
                }}
                speed={5000}
                slidesPerView="auto"
                spaceBetween={0}
                modules={[Autoplay]}
                onSwiper={(swiper: SwiperInstance) => {
                  swiperRefs.current[desktopIndex] = swiper;
                }}
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
