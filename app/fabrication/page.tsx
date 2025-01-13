'use client';
import React from 'react';
import { Typography } from '@mui/material';
import FabricationCarousel from '../components/FabricationCarousel';
import Contact from '../components/Contact';

export default function page() {
  return (
    <>
      <Typography
        variant="h1"
        component="h1"
        color="black"
        sx={{
          fontSize: { xs: '35px', md: '80px', lg: '96px' },
          fontWeight: 'bold',
          lineHeight: 1.2,
          marginTop: '120px',
          paddingLeft: '10px',
          paddingRight: '10px',
          textAlign: 'center',
        }}
      >
        FABRICATION PORTFOLIO
      </Typography>
      <Typography
        variant="body1"
        component="p"
        color="black"
        sx={{
          fontSize: { xs: '14px', md: '20px', lg: '25px' },
          fontWeight: 'bold',
          marginTop: '10px',
          marginLeft: '30px',
          marginRight: '30px',
          textAlign: 'center',
        }}
      >
        We specialize in creating unforgettable set designs and custom
        fabrications for photoshoots that demand visual excellence. From concept
        to construction, our team works with photographers, stylists, and brands
        to craft striking, camera-ready environments that captivate audiences.
      </Typography>
      <FabricationCarousel />
      <div className="bg-black  py-10">
        <Contact />
      </div>
    </>
  );
}
