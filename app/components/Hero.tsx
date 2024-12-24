import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';

export default function Hero() {
  return (
    <>
      {/* Video Background */}
      <Box // Box container for responsive image
      >
        <video
          preload="auto"
          loop
          autoPlay
          playsInline
          muted
          className="absolute top-0 left-0 w-full h-3/4 object-cover lg:object-contain "
        >
          <source src="/assets/1223.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    </>
  );
}
