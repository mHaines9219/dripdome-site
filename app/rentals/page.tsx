'use client';
import React from 'react';
import { Typography } from '@mui/material';
import Contact from '../components/Contact';

export default function page() {
  return (
    <>
      <div className="h-screen bg-black">
        <div className="my-24">
          <Typography
            variant="h1"
            component="h1"
            color="white"
            sx={{
              fontSize: { xs: '55px', sm: '95px', lg: '150px' },
              fontWeight: 'bold',
              paddingTop: { xs: '120px', md: '150px' },
              paddingLeft: '10px',
              paddingRight: '10px',
              textAlign: 'center',
            }}
          >
            COMING SOON...
          </Typography>
        </div>
      </div>
      <div className="bg-black"></div>
    </>
  );
}
