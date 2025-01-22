'use client';
import React, { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, useInView } from 'framer-motion';

export default function AboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Trigger once when in view

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="   bg-black " ref={ref}>
      <Box
        sx={{
          width: '100%',
          height: 'auto',
        }}
      >
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
              fontSize: { xs: '55px', sm: '95px' },
              fontWeight: 'bold',
              paddingTop: { xs: '120px', md: '150px' },
              marginBottom: { xs: '20px', md: '30px' },
              paddingLeft: '10px',
              paddingRight: '10px',
              textAlign: 'center',
            }}
          >
            ABOUT US
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="text-container mx-2 md:mx-10">
            <Typography
              variant="body1"
              component="p"
              color="white"
              sx={{
                fontSize: { xs: '14px', sm: '20px', md: '30px' },
                fontWeight: 'bold',
                marginTop: '10px',
                marginLeft: '30px',
                marginRight: '30px',
                textAlign: 'center',
              }}
            >
              Drip Dome Productions is a majority women-owned, family-run
              business based in Los Angeles, with a growing presence in New
              York. We specialize in set design, custom fabrication, murals,
              graphic design, photography, and rentals. From photoshoots and
              music videos to large-scale event installations, we bring creative
              visions to life with artistry and precision. At Drip Dome, family
              values and collaboration fuel our passion for creating
              extraordinary projects that leave a lasting impact.
            </Typography>
          </div>
        </motion.div>
      </Box>
    </div>
  );
}
