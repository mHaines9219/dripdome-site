import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import {
  Pagination,
  EffectCoverflow,
  Autoplay,
  EffectCards,
} from 'swiper/modules';

const sections = [
  {
    header: 'THE ORIGINAL SOUTH SIDE',
    blurb: `We collaborated with The Original Southside™ on their ad campaign, managing prop sourcing, styling, and custom vinyl wraps. Our team ensured each element reflected the brand's modern twist on the classic 1920s Southside cocktail, effectively communicating their commitment to quality and style.`,
    images: [
      'https://dripdome-site.s3.us-east-2.amazonaws.com/southside/ss1.png',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/southside/ss2.png',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/southside/ss3.png',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/southside/ss4.png',
    ],
  },
  {
    header: 'JENNIFERS BODY PHOTO SHOOT',
    blurb: `We meticulously recreated the iconic pool scene from Jennifers Body by constructing a 20x20-foot structure featuring a functional pool. To authentically capture the scene's atmosphere, we employed specialized techniques to distress the walls, achieving a realistic, aged appearance. This project highlights our commitment to detail and our ability to bring cinematic visions to life.`,
    images: [
      'https://dripdome-site.s3.us-east-2.amazonaws.com/jennifersbody/jb4.png',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/jennifersbody/jb2.png',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/jennifersbody/jb1.png',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/jennifersbody/jb3.png',
    ],
  },
  {
    header: 'X3 EXPO',
    blurb: `At the X3 Expo, held at the historic Hollywood Palladium, we designed and constructed a multi-set activation featuring three distinct environments. This eye-catching setup significantly enhanced attendee engagement, leading our client to report a doubling of sign-up numbers compared to the previous year, all within the first day of the event. This success underscores our ability to create immersive and effective brand experiences that drive measurable results.`,
    images: [
      'https://dripdome-site.s3.us-east-2.amazonaws.com/about-us/x3/x3_4.png',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/about-us/x3/x3_2.png',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/about-us/x3/x3_1.png',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/about-us/x3/x3_3.png',
    ],
  },
  {
    header: 'GOOD DYE YOUNG BRAND SHOOT',
    blurb: `We partnered with Good Dye Young to create surreal, colorful sets that brought their vibrant hair dye products to life. Our team fabricated custom picket fences, reimagined window blinds, and curated unique props to craft immersive environments that perfectly captured the brand's creative spirit.`,
    images: [
      'https://dripdome-site.s3.us-east-2.amazonaws.com/gooddyeyoung/gdy1.jpeg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/gooddyeyoung/gdy2.jpeg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/gooddyeyoung/gdy3.jpeg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/gooddyeyoung/gdy5.jpeg',
      'https://dripdome-site.s3.us-east-2.amazonaws.com/gooddyeyoung/gdy4.jpeg',
    ],
  },
];

const FeaturedProjects = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="px-6 ">
      {sections.map((section, index) => (
        <div key={index} className="rounded-3xl md:pt-12 lg:pt-20 mb-6">
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile
                ? 'column'
                : index % 2 === 0
                ? 'row'
                : 'row-reverse',
              alignItems: 'center',
              mb: '2rem',
              gap: '1.5rem',
              border: '2px solid white',
              borderRadius: '30px',
              backgroundColor: '#121212',
              paddingTop: {
                xs: '20px',
                sm: '20px',
                md: '20px',
                lg: '20px',
                xl: '20px',
              },
              paddingBottom: {
                xs: '0px',
                sm: '20px',
                md: '20px',
                lg: '20px',
                xl: '20px',
              },
              paddingLeft: {
                xs: '0px',
                sm: '20px',
                md: '20px',
                lg: '20px',
                xl: '20px',
              },
              paddingRight: {
                xs: '0px',
                sm: '20px',
                md: '20px',
                lg: '20px',
                xl: '20px',
              },
            }}
          >
            {/* Swiper with Cards Effect */}
            <Box
              sx={{
                flex: 1,
                width: isMobile ? '90vw' : '40vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Swiper
                effect="cards"
                grabCursor={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: true,
                }}
                cardsEffect={{
                  perSlideOffset: 8,
                  perSlideRotate: 2,
                  rotate: true,
                  slideShadows: true,
                }}
                modules={[EffectCards, Autoplay]}
                className="w-full lg:h-[600px] flex justify-center items-center lg:my-6 lg:-mb-6 xl:mb-10"
              >
                {section.images.map((image, idx) => (
                  <SwiperSlide
                    key={idx}
                    className="flex justify-center items-center"
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: {
                          xs: '300px',
                          sm: '400px',
                          md: '500px',
                          lg: '600px',
                        },
                        position: 'relative',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      <Image
                        src={image}
                        alt={`${section.header}`}
                        fill
                        sizes="(max-width: 600px) 90vw, (max-width: 900px) 40vw, 40vw"
                        style={{
                          objectFit: 'contain',
                          borderRadius: '15px',
                        }}
                      />
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>

            {/* Header and Blurb */}
            <Box
              sx={{
                flex: 1,
                maxWidth: isMobile ? '100%' : '50%',
                textAlign: isMobile ? 'center' : 'left',
                p: '0 10px 20px 10px',
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '28px', sm: '36px', md: '40px', lg: '50px' },
                  mb: '1.5rem',
                  color: 'white',
                }}
              >
                {section.header}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '14px', sm: '18px', md: '20px' },
                  color: '#e0e0e0',
                }}
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
