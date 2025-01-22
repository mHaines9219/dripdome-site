'use client';
import { Typography } from '@mui/material';
import React from 'react';
import PhotoPageCarousels from '../components/PhotoPageCarousels';
import Contact from '../components/Contact';

import { motion } from 'framer-motion';

export default function page() {
  return (
    <>
      <div className="page-container flex flex-col items-center bg-black justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.5 }}
        >
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
            PORTFOLIO
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 1 }}
        >
          <div className="text-container mx-2 md:mx-10 mb-4 md:mb-12">
            <Typography
              variant="body1"
              component="p"
              color="white"
              sx={{
                fontSize: { xs: '14px', sm: '20px', md: '30px' },
                fontWeight: 'bold',
                marginLeft: '30px',
                marginRight: '30px',
                textAlign: 'center',
              }}
            >
              We specialize in creating unforgettable set designs and custom
              fabrications for photoshoots that demand visual excellence. From
              concept to construction, our team works with photographers,
              stylists, and brands to craft striking, camera-ready environments
              that captivate audiences.
            </Typography>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 1.5 }}
        >
          <PhotoPageCarousels />
        </motion.div>
        <div className=" mt-8 py-12 px-8 bg-black text-white">
          <Contact />
        </div>
      </div>
    </>
  );
}
