'use client';
import { Typography } from '@mui/material';
import React from 'react';
import PhotoPageCarousels from '../components/PhotoPageCarousels';

export default function page() {
  return (
    <>
      <div className="page-container flex flex-col items-center  justify-center">
        <Typography
          variant="h1"
          component="h1"
          color="black"
          sx={{
            fontSize: { xs: '60px', md: '80px', lg: '96px' },
            fontWeight: 'bold',
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            marginTop: '120px',
          }}
        >
          PHOTO
        </Typography>
        <Typography
          variant="body1"
          component="p"
          color="black"
          sx={{
            fontSize: { xs: '15px', md: '80px', lg: '96px' },
            fontWeight: 'bold',
            lineHeight: 1.2,
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
      </div>
    </>
  );
}
