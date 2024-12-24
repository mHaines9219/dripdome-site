import React, { useRef } from 'react';
import { Typography } from '@mui/material';
import { motion, useInView } from 'framer-motion';

export default function AboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Trigger once when in view

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div ref={ref}>
      <Typography
        variant="h1"
        component="h1"
        color="primary"
        sx={{
          fontSize: { xs: '60px', md: '80px', lg: '96px' },
          fontWeight: 'bold',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
        }}
      >
        ABOUT US
      </Typography>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      >
        <Typography
          variant="h2"
          component="h2"
          color="primary"
          sx={{
            fontSize: { xs: '20px', md: '80px', lg: '96px' },
            fontWeight: 'bold',
            lineHeight: 1.2,
            marginBottom: '15px',
          }}
        >
          Trusted by creators who dream big and deliver bigger.
        </Typography>
      </motion.div>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 2.6, ease: 'easeOut' }}
      >
        <Typography
          variant="body1"
          component="p"
          color="primary"
          sx={{
            fontSize: { sm: '40px', md: '80px', lg: '96px' },
            fontWeight: 'bold',
            lineHeight: 1.2,
          }}
        >
          With bases in New York and Los Angeles, we specialize in crafting
          unforgettable set designs, interactive art installations, and custom
          props. Whether it’s immersive activations for conventions, cinematic
          sets for music videos, or large-scale props for parties, we bring bold
          ideas to life coast to coast. Let’s create something extraordinary
          together.{' '}
        </Typography>
      </motion.div>
    </div>
  );
}
