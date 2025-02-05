import React from 'react';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';

const pressItems = [
  {
    headline: 'BUSINESS INSIDER - BELLA THORNE COACHELLA AFTERPARTY',
    url: 'https://www.businessinsider.com/bella-thorne-coachella-after-party-photos-diplo-2022-4',
  },
  {
    headline: 'FORBES - BEST CANNED COCKTAIL ORIGINAL SOUTHSIDE',
    url: 'https://www.forbes.com/sites/karlaalindahao/2024/03/01/best-canned-cocktail-original-southside/',
  },
  {
    headline: 'ROLLING STONE - THEIA RETURNS TO ALT-POP',
    url: 'https://au.rollingstone.com/music/music-news/theia-crucified-by-u-45218/',
  },
];

const PressSection = () => {
  return (
    <div className="flex items-center justify-center">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          textAlign: 'center',
          width: '80vw',
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            fontSize: { xs: '30px', sm: '80px' },
          }}
        >
          OUR WORK IN THE PRESS
        </Typography>
        {pressItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              padding: 2,
              border: '1px solid #ccc',
              borderRadius: 1,
              backgroundColor: 'white',
              textAlign: 'center',
              color: 'black',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'black',
                color: 'white',
              },
            }}
          >
            <Link href={item.url} passHref>
              <Typography
                variant="h2"
                component="a"
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  fontSize: { xs: '20px', sm: '30px' },
                }}
              >
                {item.headline}
              </Typography>
            </Link>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default PressSection;
