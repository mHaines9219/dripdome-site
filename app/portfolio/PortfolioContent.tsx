"use client";

import { Box, Container, Typography } from "@mui/material";
import PhotoPageCarousels from "../components/PhotoPageCarousels";
import Contact from "../components/Contact";
import { motion } from "framer-motion";
import FeaturedProjects from "../components/FeaturedProjects";
import PressSection from "../components/PressSection";

export default function PortfolioContent() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "black",
        pt: { xs: 12, md: 16 },
        overflowX: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
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
          <Box sx={{ mx: "auto", maxWidth: "56rem", mb: { xs: 4, md: 12 } }}>
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
          </Box>
        </motion.div>
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 1 }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h2"
                component="h2"
                color="white"
                sx={{
                  fontSize: { xs: "30px", sm: "55px", lg: "70px" },
                  fontWeight: "bold",
                  display: "inline",
                }}
              >
                FEATURED{" "}
              </Typography>
              <Typography
                variant="h2"
                component="span"
                sx={{
                  fontSize: { xs: "30px", sm: "55px", lg: "70px" },
                  fontWeight: "bold",
                  color: "#FF00AA",
                }}
              >
                PROJECTS
              </Typography>
            </Box>
          </motion.div>
        </Box>
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

        <Box sx={{ mt: 16 }}>
          <PressSection />
        </Box>
        <Box
          sx={{
            mt: 8,
            py: 12,
            px: { xs: 2, md: 8 },
            bgcolor: "black",
            color: "white",
          }}
        >
          <Contact />
        </Box>
      </Container>
    </Box>
  );
}
