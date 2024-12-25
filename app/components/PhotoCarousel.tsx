import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './styles/swiper-bundle.min.css'; // Import Swiper CSS

// Import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper';

// Install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const PhotoCarousel = () => {
  const slides = [1, 2, 3, 4, 5]; // Placeholder slide data

  return (
    <div style={{ width: '80%', margin: '0 auto', paddingTop: '50px' }}>
      <Swiper
        className="w-full max-w-6xl h-[250px] mt-12"
        spaceBetween={50}
        slidesPerView={2}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide}
            className="flex rounded-lg justify-between items-center text-xl  "
          >
            <div className="flex flex-col w-full ">
              <div
                id={`image-container-${slide}`}
                className="relative w-full m-auto group h-[150px]  "
              ></div>
              <div className="flex flex-col h-full w-full p-4 shadow max-mobile:h-12">
                <div className="text-black whitespace-nowrap h-full flex items-center max-mobile:justify-center ">
                  <h3 className="text-black text-4xl max-mobile:text-[1rem]">
                    {slide}
                  </h3>
                  <span className="text-base ml-auto max-mobile:hidden">
                    SIZE: {slide} x {slide}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PhotoCarousel;
