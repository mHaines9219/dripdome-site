"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import PhotoPageCarousels from "../components/PhotoPageCarousels";
import Contact from "../components/Contact";

import { motion } from "framer-motion";
import FeaturedProjects from "../components/FeatuedProjects";
import PressSection from "../components/PressSection";

export default function page() {
  return (
    <Box className="min-h-screen w-full bg-black pt-24 md:pt-32 overflow-x-hidden">
      <div className="container mx-auto px-4">
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
              fontSize: { xs: "55px", sm: "95px", lg: "96px" },
              fontWeight: "bold",
              marginBottom: { xs: "20px", md: "30px" },
              textAlign: "center",
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
          <div className="text-container mx-auto max-w-4xl mb-4 md:mb-12">
            <Typography
              variant="body1"
              component="p"
              color="white"
              sx={{
                fontSize: { xs: "14px", sm: "20px", md: "24px" },
                textAlign: "center",
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
          transition={{ delay: 0, duration: 1 }}
          className="mb-8 md:mb-12"
        >
          <Typography
            variant="h2"
            component="h2"
            color="white"
            sx={{
              fontSize: { xs: "30px", sm: "55px", lg: "70px" },
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            FEATURED PROJECTS
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 1.5 }}
        >
          <FeaturedProjects />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 1.5 }}
        >
          <PhotoPageCarousels />
        </motion.div>

        <div className="mt-16">
          <PressSection />
        </div>
        <div className="mt-8 py-12 px-8 bg-black text-white">
          <Contact />
        </div>
      </div>
    </Box>
  );
}
