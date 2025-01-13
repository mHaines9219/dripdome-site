'use client';
import React from 'react';
import { Typography } from '@mui/material';
import FabricationCarousel from '../components/FabricationCarousel';
import { motion } from 'framer-motion';

import Contact from '../components/Contact';

export default function page() {
  const services = [
    'Carpentry',
    'Metalwork',
    'Scenic Painting',
    'Murals',
    'CNC Routing',
    '3D Renders',
    'Props',
    'Graphic Design',
    'Printing',
    'LED/Light Integration',
  ];
  return (
    <>
      <Typography
        variant="h1"
        component="h1"
        color="black"
        sx={{
          fontSize: { xs: '35px', md: '80px', lg: '96px' },
          fontWeight: 'bold',
          lineHeight: 1.2,
          marginTop: '120px',
          paddingLeft: '10px',
          paddingRight: '10px',
          textAlign: 'center',
        }}
      >
        FABRICATION PORTFOLIO
      </Typography>
      <Typography
        variant="body1"
        component="p"
        color="black"
        sx={{
          fontSize: { xs: '14px', md: '20px', lg: '25px' },
          fontWeight: 'bold',
          marginTop: '10px',
          marginLeft: '30px',
          marginRight: '30px',
          textAlign: 'center',
        }}
      >
        We specialize in turning creative ideas into stunning realities. Our
        skilled team combines artistry and precision to fabricate custom
        solutions tailored to your unique needs. Whether you're creating
        immersive sets, intricate props, or large-scale installations, we have
        the expertise to make it happen.
      </Typography>
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-2 gap-4 text-lg text-gray-700 my-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Typography
                variant="h2"
                align="center"
                sx={{
                  fontSize: { xs: '20px', md: '25px', lg: '35px' },
                }}
              >
                {service.toUpperCase()}
              </Typography>
            </motion.div>
          ))}
        </div>
      </div>

      <FabricationCarousel />
      <div className="bg-black  py-10">
        <Contact />
      </div>
    </>
  );
}
