import React from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';

const pages = [
  { name: 'PORTFOLIO', href: '/portfolio' },
  { name: 'SERVICES', href: '/services' },
  { name: 'ABOUT US', href: '/about-us' },
];

function PageButtons() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {pages.map(({ name, href }) => (
        <Link
          key={name}
          href={href}
          style={{
            textDecoration: 'none',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              fontSize: { xs: '30px', sm: '50px', md: '60px' },
              bgcolor: 'black',
              color: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              fontFamily: 'Shrikhand',
              border: '2px solid white',
              borderRadius: '15px',
              width: '100%',
              height: { xs: '70px', sm: '80px', md: '90px' },
              transition: 'background-color 1s ease, color 1s ease',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'white',
                color: 'black',
              },
              '&:active': {
                bgcolor: 'white',
              },
            }}
          >
            {name}
          </Box>
        </Link>
      ))}
    </Box>
  );
}

export default PageButtons;
