import React, { useRef } from 'react';
import { Typography } from '@mui/material';
import { motion, useInView } from 'framer-motion';

export default function Services() {
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
          fontSize: { xs: '60px', md: '800px', lg: '96px' },
          fontWeight: 'bold',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
        }}
      >
        SERVICES{' '}
      </Typography>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h4 className="font-nova text-2xl">PRODUCTION/SET DESIGN</h4>
      </motion.div>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <h4 className="font-nova text-2xl">FABRICATION</h4>
      </motion.div>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        <h4 className="font-nova text-2xl">CARPENTRY</h4>
      </motion.div>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 2.5, ease: 'easeOut' }}
      >
        <h4 className="font-nova text-2xl">INTERACTIVE ART</h4>
      </motion.div>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 3, ease: 'easeOut' }}
      >
        <h4 className="font-nova text-2xl">INSTALLATIONS</h4>
      </motion.div>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 3.5, ease: 'easeOut' }}
      >
        <h4 className="font-nova text-2xl">3D RENDERS</h4>
      </motion.div>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 4, ease: 'easeOut' }}
      >
        <h4 className="font-nova text-2xl">PROP DESIGN + SOURCING</h4>
      </motion.div>
    </div>
  );
}
