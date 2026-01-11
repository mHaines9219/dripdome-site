import React, { useRef } from "react";
import { Typography } from "@mui/material";
import { motion, useInView } from "framer-motion";

export default function HomeBlurb() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Trigger once when in view

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div ref={ref} className="w-full  px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Typography
          variant="h1"
          component="h1"
          color="primary"
          sx={{
            fontSize: { xs: "32px", sm: "60px", lg: "70px" },
            fontWeight: "bold",
            color: "white",
          }}
        >
          Production Design & Fabrication for Film, TV & Experiential Projects
          in NYC
        </Typography>
      </motion.div>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        <Typography
          variant="body1"
          component="p"
          color="primary"
          sx={{
            fontSize: { xs: "14px", sm: "18px", md: "20px", lg: "24px" },
          }}
        >
          {" "}
          Drip Dome Productions. Based in New York City, we are a majority
          women-owned, family-run business specializing in production design,
          custom fabrication, murals, graphic design, photography, and rentals.
          From immersive installations to unforgettable photoshoot backdrops,
          our expert team transforms bold ideas into stunning realities.
        </Typography>
      </motion.div>
    </div>
  );
}
