import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

type AboutSection = {
  header: string;
  text: string;
  image: string;
  imageAlt: string;
};

const aboutSections: AboutSection[] = [
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

const FabricationSection = () => {
  return (
    <Box
      sx={{
        padding: { xs: '24px', md: '48px' },
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'blue',
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
            border: '2px solid black',
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
              src={section.image}
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
              variant="h4"
              sx={{
                fontWeight: 'bold',
                marginBottom: '16px',
              }}
            >
              {section.header.toUpperCase()}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {section.text}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default FabricationSection;
