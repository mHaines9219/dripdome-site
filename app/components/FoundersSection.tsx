'use client';
import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const founders = [
  {
    name: 'DIANA HAINES',
    photo:
      'https://dripdome-site.s3.us-east-2.amazonaws.com/about-us/diana_headshot.jpeg',

    blurb:
      'Founder 1 is an expert in custom set design with a passion for creating immersive environments. With years of experience, they bring bold visions to life.',
  },
  {
    name: 'PATRICIA KWIATKOWSKI',
    photo:
      'https://dripdome-site.s3.us-east-2.amazonaws.com/about-us/pat_headshot.jpeg',
    blurb:
      'Founder 2 specializes in scenic painting and graphic design, ensuring every project is visually striking and unforgettable.',
  },
  {
    name: 'MATT HAINES',
    photo:
      'https://dripdome-site.s3.us-east-2.amazonaws.com/about-us/matt_headshot.jpeg',
    blurb:
      'Founder 3 is the driving force behind Drip Dome’s innovative approach to fabrication and installations, delivering exceptional results every time.',
  },
];

const FoundersSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 0.5 }}
      >
        <div className="pt-12 bg-black">
          <Box
            sx={{
              padding: '4rem 2rem',
              paddingTop: '0px',
              margin: '30px,0,0,0',
              textAlign: 'center',
              background: 'black',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: {
                  xs: '35px',
                  sm: '50px',
                  md: '50px',
                  lg: '80px',
                  xl: '80px',
                },
              }}
              gutterBottom
            >
              MEET OUR FOUNDERS
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '2rem',
                justifyContent: 'center',
                alignItems: 'stretch',
              }}
            >
              {founders.map((founder, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: isMobile ? 'none' : '1',
                    maxWidth: isMobile ? '100%' : '33%',
                    textAlign: 'center',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: 'black',
                    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
                  }}
                >
                  <div className="headshot-container h-24 w-24 rounded-full overflow-hidden flex justify-center items-center mx-auto mt-4">
                    <Image
                      src={founder.photo}
                      width={500}
                      height={500}
                      alt={founder.name}
                      className="object-cover"
                    />
                  </div>
                  <Box sx={{ padding: '1rem' }}>
                    <Typography variant="h3" gutterBottom>
                      {founder.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: '14px', sm: '14px', md: '20px' } }}
                      color="white"
                    >
                      {founder.blurb}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </div>
      </motion.div>
    </div>
  );
};

export default FoundersSection;
