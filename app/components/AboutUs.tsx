import React from 'react';
import { Typography } from '@mui/material';
export default function AboutUs() {
  return (
    <>
      <Typography
        variant="h1"
        component="h1"
        color="primary"
        sx={{
          fontSize: { xs: '60px', md: '80px', lg: '96px' }, // Define different font sizes for different breakpoints
          fontWeight: 'bold', // Optional: Adjust font weight
          lineHeight: 1.2, // Optional: Adjust line height
          whiteSpace: 'nowrap',
        }}
      >
        ABOUT US{' '}
      </Typography>
      <Typography
        variant="h2"
        component="h2"
        color="primary"
        sx={{
          fontSize: { xs: '20px', md: '80px', lg: '96px' }, // Define different font sizes for different breakpoints
          fontWeight: 'bold', // Optional: Adjust font weight
          lineHeight: 1.2, // Optional: Adjust line height
          marginBottom: '15px',
        }}
      >
        Trusted by creators who dream big and deliver bigger.{' '}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        color="primary"
        sx={{
          fontSize: { sm: '40px', md: '80px', lg: '96px' }, // Define different font sizes for different breakpoints
          fontWeight: 'bold', // Optional: Adjust font weight
          lineHeight: 1.2, // Optional: Adjust line height
        }}
      >
        We bring bold ideas to life with stunning set designs, interactive art
        installations, and custom props. From immersive activations for
        conventions to show-stopping sets for music videos and unforgettable
        party pieces, we turn your wildest concepts into reality. Let’s build
        something extraordinary together.{' '}
      </Typography>
    </>
  );
}
