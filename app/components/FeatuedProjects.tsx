import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { Pagination, EffectCoverflow } from 'swiper/modules';

const sections = [
  {
    header: 'THE ORIGINAL SOUTH SIDE',
    blurb: `We collaborated with The Original Southside™ on their ad campaign, managing prop sourcing, styling, and custom vinyl wraps. Our team ensured each element reflected the brand's modern twist on the classic 1920s Southside cocktail, effectively communicating their commitment to quality and style.`,
    images: [
      'https://dripdome-site.s3.us-east-2.amazonaws.com/southside/ss1.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/southside/ss2.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/southside/ss3.jpg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/southside/ss4.jpg',
    ],
  },
  {
    header: 'JENNIFERS BODY PHOTO SHOOT',
    blurb: `We meticulously recreated the iconic pool scene from Jennifers Body by constructing a 20x20-foot structure featuring a functional pool. To authentically capture the scene's atmosphere, we employed specialized techniques to distress the walls, achieving a realistic, aged appearance. This project highlights our commitment to detail and our ability to bring cinematic visions to life.`,
    images: [
      'https://dripdome-site.s3.us-east-2.amazonaws.com/jennifersbody/jb2.jpeg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/jennifersbody/jb1.jpeg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/jennifersbody/jb3.jpeg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/jennifersbody/jb4.jpeg',
    ],
  },
  {
    header: 'X3 EXPO',
    blurb: `At the X3 Expo, held at the historic Hollywood Palladium, we designed and constructed a multi-set activation featuring three distinct environments. This eye-catching setup significantly enhanced attendee engagement, leading our client to report a doubling of sign-up numbers compared to the previous year, all within the first day of the event. This success underscores our ability to create immersive and effective brand experiences that drive measurable results.`,
    images: [
      'https://dripdome-site.s3.us-east-2.amazonaws.com/about-us/x3/x3_2.jpeg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/about-us/x3/x3_1.jpeg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/about-us/x3/x3_3.jpeg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/about-us/x3/x3_4.jpeg',
    ],
  },
];

const FeaturedProjects = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="px-6 pt-6">
      {sections.map((section, index) => (
        <div key={index} className="rounded-3xl md:pt-12 lg:pt-24  mb-6">
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile
                ? 'column'
                : index % 2 === 0
                ? 'row'
                : 'row-reverse',
              alignItems: 'center',
              mb: '1rem',
              gap: '1rem',
              p: 0,
              height: 'auto',
            }}
          >
            {/* Carousel */}
            <Box
              sx={{
                flex: 1,
                maxWidth: '100%',
                width: isMobile ? '70vw' : '20vw',
                height: isMobile ? 'auto' : '300px', // Height for larger screens
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Swiper
                className="w-full flex justify-center items-center"
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
                    className="flex justify-center items-center rounded-3xl overflow-hidden"
                    style={{ width: '100%', height: '100%' }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: { xs: '400px', lg: '600px' }, // Responsive height using sx
                        position: 'relative',
                        borderRadius: 'inherit',
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src={image}
                        alt={`${section.header}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </Box>
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
                p: '0 10px 10px 0',
                m: '10px',
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '30px', sm: '40px', md: '50px', lg: '60px' },
                  mb: '1rem',
                }}
              >
                {section.header}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: { xs: '14px', sm: '20px', md: '30px' } }}
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
