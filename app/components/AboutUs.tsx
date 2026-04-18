"use client";

import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function AboutUs() {
  const ref = useRef(null);

  return (
    <Box ref={ref} sx={{ bgcolor: "black" }}>
      <Box
        sx={{
          width: "100%",
          height: "auto",
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
              fontSize: { xs: "55px", sm: "95px" },
              fontWeight: "bold",
              paddingTop: { xs: 8 },
              marginBottom: { xs: "20px", md: "30px" },
              paddingLeft: "10px",
              paddingRight: "10px",
              textAlign: "center",
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
          <Box sx={{ mx: { xs: 2, md: 10 } }}>
            <Typography
              variant="body1"
              component="p"
              color="white"
              sx={{
                fontSize: { xs: "14px", sm: "20px", md: "30px" },
                marginTop: "10px",
                marginLeft: "30px",
                marginRight: "30px",
                textAlign: "center",
              }}
            >
              <Box component="span" sx={{ color: "#E5C767", fontWeight: 600 }}>
                Drip Dome Productions
              </Box>{" "}
              is a majority women-owned, family-run business based in New York
              City, with a presence in Los Angeles as well. We specialize in set
              design, custom fabrication, murals, graphic design, photography,
              and rentals. From photoshoots and music videos to large-scale
              event installations, we bring creative visions to life with
              artistry and precision. At Drip Dome, family values and
              collaboration fuel our passion for creating extraordinary projects
              that leave a lasting impact.
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
