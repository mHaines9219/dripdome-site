'use client';
import React from 'react';
import { Typography } from '@mui/material';
import FabricationCarousel from '../components/ServicesCarousel';
import { motion } from 'framer-motion';
import '../globals.css';

import Contact from '../components/Contact';

export default function ServicesPage() {
  const services = [
    'Carpentry',
    'Set Design',
    'Metalwork',

    'CNC Routing',
    '3D Renders',
    'Props',
    'Production',
    'Printing',
    'Murals',
    'Rentals',
  ];
  return (
    <div className="bg-black">
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
            fontSize: { xs: '55px', md: '80px', lg: '96px' },
            fontWeight: 'bold',
            paddingTop: { xs: '120px', md: '150px' },
            marginBottom: { xs: '20px', md: '30px' },
            paddingLeft: '10px',
            paddingRight: '10px',
            textAlign: 'center',
          }}
        >
          SERVICES
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Typography
          variant="body1"
          component="p"
          color="white"
          sx={{
            fontSize: { xs: '14px', md: '20px', lg: '25px' },
            fontWeight: 'bold',
            marginTop: '10px',
            marginLeft: '30px',
            marginRight: '30px',
            textAlign: 'center',
          }}
        >
          From the first spark of an idea to the final reveal, we handle every
          detail of the design and build process. Our expertise spans across a
          variety of services, including custom carpentry, scenic painting,
          props, murals, LED integrations, and more. Whether you're looking to
          create an unforgettable photo set, a dynamic event installation, or a
          large-scale art piece, Drip Dome Productions has the tools and talent
          to make it happen.
        </Typography>
      </motion.div>
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-2 gap-4 text-lg text-white my-8">
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
                  fontSize: { xs: '20px', md: '25px', lg: '45px' },
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
    </div>
  );
}
