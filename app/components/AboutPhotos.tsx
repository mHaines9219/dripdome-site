import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

type AboutPhotos = {
  header: string;
  text: string;
  image: string;
  imageAlt: string;
};

const aboutSections: AboutPhotos[] = [
  {
    header: 'Our Mission',
    text: 'Our mission is to revolutionize the real estate industry with cutting-edge technology that empowers agents, streamlines transactions, and creates delightful experiences for clients.',
    image: '/images/about-us/mission.jpg',
    imageAlt: 'Team working together',
  },
  {
    header: 'Our Values',
    text: 'We value innovation, collaboration, and transparency. These principles guide everything we do, from product development to client interactions.',
    image: '/images/about-us/values.jpg',
    imageAlt: 'Collaboration in action',
  },
  {
    header: 'Our Vision',
    text: 'Our vision is to create a world where buying and selling homes is as seamless as possible, leveraging AI and smart tools to remove friction and add value.',
    image: '/images/about-us/vision.jpg',
    imageAlt: 'Technology in real estate',
  },
];

const AboutPhotos = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0, duration: 0.5 }}
    >
      <Box
        sx={{
          padding: { xs: '24px', md: '48px' },
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: 'black',
        }}
      >
        {aboutSections.map((section, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: index % 2 === 0 ? 'row' : 'row-reverse',
              },
              alignItems: 'center',
              marginBottom: '64px',
              gap: '32px',
              // border: '2px solid black',
            }}
          >
            {/* Image Section */}
            <Box
              sx={{
                flex: '1',
                textAlign: 'center',
              }}
            >
              <Image
                src="https://picsum.photos/800/800?random=4,"
                alt={section.imageAlt}
                width={500} // Adjust width
                height={300} // Adjust height
                style={{
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
            </Box>

            {/* Text Section */}
            <Box
              sx={{
                flex: '1',
                textAlign: { xs: 'center', md: 'left' },
                padding: '16px',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  marginBottom: '16px',
                }}
              >
                {section.header.toUpperCase()}
              </Typography>
              <Typography variant="body1" color="">
                {section.text}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </motion.div>
  );
};

export default AboutPhotos;
