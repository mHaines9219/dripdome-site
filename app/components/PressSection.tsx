import React from 'react';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';

const pressItems = [
  { headline: 'Exciting New Project Launches', url: '/news/project-launch' },
  { headline: 'Company Achieves Record Growth', url: '/news/record-growth' },
  {
    headline: 'Innovative Solutions in Development',
    url: '/news/innovative-solutions',
  },
];

const PressSection = () => {
  return (
    <div className="mx-6">
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
            fontSize: { xs: '70px', sm: '80px' },
          }}
        >
          PRESS
        </Typography>
        {pressItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              padding: 2,
              border: '1px solid #ccc',
              borderRadius: 1,
              backgroundColor: 'black',
              textAlign: 'center',
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
