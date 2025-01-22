import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { Pagination, EffectCoverflow } from 'swiper/modules';

const sections = [
  {
    header: 'THE ORIGINAL SOUTH SIDE',
    blurb: `We collaborated with The Original Southside™ on their ad campaign, managing prop sourcing, styling, and custom vinyl wraps. Our team ensured each element reflected the brand's modern twist on the classic 1920s Southside cocktail, effectively communicating their commitment to quality and style. 
`,
    images: [
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/paperhoney.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/paperhoney.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/paperhoney.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/paperhoney.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/paperhoney.jpg',
    ], // Replace with actual image paths
  },
  {
    header: 'JENNIFERS BODY PHOTO SHOOT',
    blurb: `We meticulously recreated the iconic pool scene from Jennifers Body by constructing a 20x20-foot structure featuring a functional pool. To authentically capture the scene's atmosphere, we employed specialized techniques to distress the walls, achieving a realistic, aged appearance. This project highlights our commitment to detail and our ability to bring cinematic visions to life.`,
    images: [
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/paperhoney.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/paperhoney.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/paperhoney.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/paperhoney.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/paperhoney.jpg',
    ], // Replace with actual image paths
  },
  {
    header: 'X3 CONVENTION',
    blurb: ` At the X3 Expo, held at the historic Hollywood Palladium  we designed and constructed a multi-set activation featuring three distinct environments. This eye-catching setup significantly enhanced attendee engagement, leading our client to report a doubling of sign-up numbers compared to the previous year, all within the first day of the event. This success underscores our ability to create immersive and effective brand experiences that drive measurable results.`,
    images: [
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/paperhoney.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/paperhoney.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/paperhoney.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/paperhoney.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/editorials/paperhoney.jpg',
    ], // Replace with actual image paths
  },
];

const FeaturedProjects = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="  px-6 pt-6">
      {sections.map((section, index) => (
        <div className="rounded-3xl border-4 mb-6">
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: isMobile
                ? 'column'
                : index % 2 === 0
                ? 'row'
                : 'row-reverse',
              alignItems: 'center',
              marginBottom: '1rem',
              gap: '1rem',
              padding: '20px',
            }}
          >
            {/* Carousel */}
            <Box
              sx={{
                flex: 1,
                maxWidth: isMobile ? '100%' : '100%',
                height: '50vh',
                width: '70vw',
              }}
            >
              <Swiper
                className="w-full  h-full justify-center items-center"
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                initialSlide={1}
                slidesPerView={1}
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
                    key={idx + 1}
                    className="flex justify-center border border-4 border-white items-center rounded-2xl  "
                  >
                    <div className="">
                      <Image
                        src={image}
                        className=""
                        alt={`${section.header} `}
                        objectFit="contain"
                        width={500} // Replace with actual image dimensions
                        height={300} // Replace with actual image dimensions
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
            {/* Header and Text */}
            <Box
              sx={{
                flex: 1,
                maxWidth: isMobile ? '100%' : '50%',
                textAlign: isMobile ? 'center' : 'left',
                padding: '0px,10px,10px,0px',
                margin: '10px',
              }}
            >
              <Typography
                variant="h1"
                sx={{ fontSize: '1.8rem', marginBottom: '1rem' }}
              >
                {section.header}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: { xs: '14px', sm: '30px' } }}
              >
                {section.blurb}
              </Typography>
            </Box>
          </Box>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProjects;
