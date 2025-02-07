import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const bucketUrl = 'https://dripdome-site.s3.us-east-2.amazonaws.com/LOGOS/';
const imageNames = [
  'complexcon_square.png',
  'doechii_square.png',
  'dollskill_square.png',
  'sunnyd_square.png',
  'playboy_square.png',
  'tinydesk.svg_square.png',
  'x3_square.png',
  'bilogo_square.png',
  'chapsqfix.png',
  'paper_square.png',
  'degree_square.png',
  'calpak_square.png',
  'piercetheveil_square.png',
  'rsau_square.png',
  'offtherails_square.png',
  'inkedsquare.png',
  'galore_square.png',
  'llsqfix.png',
  'prana_square.png',
  'polyester_square.png',
  'calarts_square.png',
  'Luna_square.png',
];

// Split the array into two halves.
const halfIndex = Math.ceil(imageNames.length / 2);
const firstHalf = imageNames
  .slice(0, halfIndex)
  .map((name) => `${bucketUrl}${name.trim()}`);
const secondHalf = imageNames
  .slice(halfIndex)
  .map((name) => `${bucketUrl}${name.trim()}`);

const LogoCarousel = () => {
  return (
    <div className="w-auto mt-6  h-[245px]  md:h-[300px] lg:h-[300px] ">
      <div>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          speed={1000}
          onInit={(swiper) => {
            swiper.wrapperEl.style.transitionTimingFunction = 'linear';
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: false,
          }}
          modules={[Autoplay]}
          style={{ width: '100%', marginBottom: '20px' }}
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {firstHalf.map((src, index) => (
            <SwiperSlide
              key={`top-${index}`}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <img
                src={src}
                alt={`logo-${index}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'cover',
                  backgroundColor: 'white',
                  borderRadius: 4,
                }}
                className=" w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          speed={1000}
          onInit={(swiper) => {
            swiper.wrapperEl.style.transitionTimingFunction = 'linear';
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          modules={[Autoplay]}
          style={{ width: '100%' }}
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {secondHalf.map((src, index) => (
            <SwiperSlide
              key={`bottom-${index}`}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <img
                src={src}
                alt={`logo-${index}`}
                style={{
                  maxWidth: '105px',
                  maxHeight: '105px',
                  objectFit: 'cover',
                  backgroundColor: 'white',
                  borderRadius: 4,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LogoCarousel;
