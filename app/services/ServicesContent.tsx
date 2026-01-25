"use client";

import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Contact from "../components/Contact";

const services = [
  "Carpentry",
  "Set Design",
  "Photography",
  "CNC Routing",
  "3D Renders",
  "Production",
  "Printing",
  "Murals",
  "Rentals",
  "Props",
];

export default function ServicesContent() {
  return (
    <Box sx={{ bgcolor: "black", overflow: "hidden" }}>
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
            paddingTop: { xs: "120px", md: "150px" },
            marginBottom: { xs: "20px", md: "30px" },
            paddingLeft: "10px",
            paddingRight: "10px",
            textAlign: "center",
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
        <Box sx={{ mx: { xs: 2, md: 10 } }}>
          <Typography
            variant="body1"
            component="p"
            color="white"
            sx={{
              fontSize: { xs: "14px", sm: "20px", md: "24px" },
              marginTop: "10px",
              marginLeft: "30px",
              marginRight: "30px",
              textAlign: "center",
            }}
          >
            From the first spark of an idea to the final reveal, we handle every
            detail of the design and build process. Our expertise spans across a
            variety of services, including custom carpentry, scenic painting,
            props, murals, LED integrations, and more. Whether you&apos;re
            looking to create an unforgettable photo set, a dynamic event
            installation, or a large-scale art piece, Drip Dome Productions has
            the tools and talent to make it happen.
          </Typography>
        </Box>
      </motion.div>
      <Box sx={{ width: "100%", mx: "auto", p: 2 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 2,
            color: "white",
            borderStyle: "solid",
            borderWidth: { xs: 1, md: 4 },
            borderColor: "white",
            my: { xs: 4, md: 20 },
            py: { xs: 6, md: 8 },
            borderRadius: 2,
            mx: { xs: 2, md: 4 },
            px: 2,
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Typography
                variant="h2"
                align="center"
                sx={{
                  fontSize: { xs: "20px", sm: "35px", md: "55px", lg: "55px" },
                }}
              >
                {service.toUpperCase()}
              </Typography>
            </motion.div>
          ))}
        </Box>
      </Box>

      <Box component="section" id="contact" sx={{ bgcolor: "black", py: 10 }}>
        <Contact />
      </Box>
    </Box>
  );
}
