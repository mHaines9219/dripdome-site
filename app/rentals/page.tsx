import React from "react";
import { Box, Typography } from "@mui/material";
import RentalGrid from "../components/RentalGrid";
export default function page() {
  return (
    <>
      <Box sx={{ backgroundColor: "black" }}>
        <Box sx={{ backgroundColor: "black" }}>
          <Typography
            variant="h1"
            component="h1"
            color="white"
            sx={{
              fontSize: { xs: "55px", sm: "95px", lg: "150px" },
              fontWeight: "bold",
              paddingTop: { xs: "120px", md: "150px" },
              paddingLeft: "10px",
              paddingRight: "10px",
              textAlign: "center",
            }}
          >
            RENTALS
          </Typography>
          <Box sx={{ backgroundColor: "black", minHeight: "100vh" }}>
            <RentalGrid />
          </Box>
        </Box>
      </Box>
    </>
  );
}
