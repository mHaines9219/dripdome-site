'use client';
import { Typography } from '@mui/material';
import React from 'react';
import PhotoPageCarousels from '../components/PhotoPageCarousels';
import Contact from '../components/Contact';

export default function page() {
  return (
    <>
      <div className="page-container flex flex-col items-center  justify-center">
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
          SET DESIGN
        </Typography>
        <Typography
          variant="body1"
          component="p"
          color="black"
          sx={{
            fontSize: { xs: '14px', md: 'px', lg: '96px' },
            fontWeight: 'bold',
            marginTop: '10px',
            marginLeft: '30px',
            marginRight: '30px',
            textAlign: 'center',
          }}
        >
          We specialize in creating unforgettable set designs and custom
          fabrications for photoshoots that demand visual excellence. From
          concept to construction, our team works with photographers, stylists,
          and brands to craft striking, camera-ready environments that captivate
          audiences.
        </Typography>
        <PhotoPageCarousels />
        <div className=" mt-8 py-12 px-8 bg-black text-white">
          <Contact />
        </div>
      </div>
    </>
  );
}
