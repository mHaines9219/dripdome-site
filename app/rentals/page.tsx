import React from 'react';
import { Typography } from '@mui/material';
export default function page() {
  return (
    <>
      {' '}
      <div className=" h-screen bg-black">
        <Typography
          variant="h1"
          component="h1"
          color="white"
          sx={{
            fontSize: { xs: '55px', sm: '95px', lg: '150px' },
            fontWeight: 'bold',
            paddingTop: { xs: '120px', md: '150px' },
            marginBottom: { xs: '20px', md: '30px' },
            paddingLeft: '10px',
            paddingRight: '10px',
            textAlign: 'center',
          }}
        >
          COMING SOON...
        </Typography>
      </div>
    </>
  );
}
