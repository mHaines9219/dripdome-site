import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const bucketUrl = 'https://dripdome-site.s3.us-east-2.amazonaws.com/LOGOS/';
const imageNames = [
  'complexcon.png',
  'x3.png',
  'paper.png',
  'degree.png',
  'calpak.png',
  'piercetheveil.png',
  'rsau.png',
  'tinydesk.svg.png',
  'chappelroan.png',
  'offtherails.png',
  'inked.jpg',
  'sunnyd.jpg',
  'galore.jpg',
  'looseleaf.jpg',
  'prana.jpg',
  'polyester.png',
  'calarts.png',
  'bilogo.png',
  'playboy.png',
  'Lunda.png',
  'dollskill.jpg',
  'rsau.png',
  'rsau.png',
];
const LogoCarousel = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setImages(imageNames.map((name) => `${bucketUrl}${name.trim()}`));
  }, []);

  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        padding: '10px',
        height: '200px',
      }}
    >
      <Swiper
        slidesPerView={5} // Adjust the number of visible logos
        spaceBetween={20}
        loop={true}
        speed={1200} // Controls the scroll speed (lower = faster)
        autoplay={{
          delay: 0, // Continuous scroll
          disableOnInteraction: false, // Keep autoplay even after user interacts
        }}
        modules={[Autoplay]}
        style={{ width: '100%' }}
      >
        {images.map((src, index) => (
          <SwiperSlide
            key={index}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <img
              src={src}
              alt={`logo-${index}`}
              style={{
                maxWidth: '200px', // Adjust size of logos
                maxHeight: '200px',
                objectFit: 'contain',
                backgroundColor: 'white',
                padding: '5px',
                borderRadius: 4,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LogoCarousel;
