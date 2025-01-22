import React from 'react';
import FabricationSection from '../components/AboutPhotos';
import { Typography } from '@mui/material';

function ConventionsPage() {
  return (
    <>
      <div className="mt-[95px] bg-black ">
        <Typography
          variant="h1"
          component="h1"
          color="white"
          sx={{
            fontSize: { xs: '35px', md: '80px', lg: '80px' },
            fontWeight: 'bold',
            lineHeight: 1.2,
            marginTop: '24px',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          CONVENTIONS
        </Typography>
        <FabricationSection />
      </div>
    </>
  );
}

export default ConventionsPage;
