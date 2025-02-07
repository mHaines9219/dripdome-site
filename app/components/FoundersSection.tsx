'use client';
import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { motion } from 'framer-motion';

const founders = [
  {
    name: 'DIANA HAINES',
    photo:
      'https://dripdome-site.s3.us-east-2.amazonaws.com/about-us/diana_headshot.jpeg',
  },
  {
    name: (
      <>
        PATRICIA <br /> KWIATKOWSKI
      </>
    ),
    photo:
      'https://dripdome-site.s3.us-east-2.amazonaws.com/about-us/pat_4.jpeg',
  },
  {
    name: 'MATT HAINES',
    photo:
      'https://dripdome-site.s3.us-east-2.amazonaws.com/about-us/matt_headshot.jpeg',
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
              paddingTop: '0px',
              textAlign: 'center',
              background: 'black',
            }}
          >
            {/* <Typography
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
            </Typography> */}

            {/* Founders Box */}
            <Box
              sx={{
                padding: '2rem',
                backgroundColor: 'black',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: '2rem',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {founders.map((founder, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  >
                    <Box
                      sx={{
                        textAlign: 'center',
                        flexShrink: 0,
                        flexBasis: '12rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <div className="headshot-container w-48 h-48 lg:w-72 lg:h-72  rounded-full overflow-hidden flex justify-center align-center items-center mb-4">
                        <Image
                          src={founder.photo}
                          width={192}
                          height={192}
                          alt={typeof founder.name === 'string' ? founder.name : 'Founder image'}
                          className="object-cover w-full h-full self-center "
                        />
                      </div>
                      <Typography
                        variant="h5"
                        fontFamily={'Shrikhand'}
                        sx={{ textAlign: 'center' }}
                      >
                        {founder.name}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </Box>
        </div>
      </motion.div>
    </div>
  );
};

export default FoundersSection;
