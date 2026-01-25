import { Metadata } from "next";
import { Box, Typography } from "@mui/material";

export const metadata: Metadata = {
  title: "Rentals | DripDome - Props & Set Piece Rentals NYC",
  description:
    "Rent props, set pieces, and production equipment from DripDome in New York City. Quality rentals for film, TV, commercial, and event productions.",
  alternates: {
    canonical: "https://www.dripdome.com/rentals",
  },
  openGraph: {
    title: "Rentals | DripDome - Props & Set Piece Rentals",
    description:
      "Rent props and set pieces from DripDome for your next production in NYC or LA.",
    url: "https://www.dripdome.com/rentals",
  },
};

export default function RentalsPage() {
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
            {/* <RentalGrid /> */}
            <Typography
              variant="h2"
              component="h2"
              color="white"
              sx={{
                fontSize: { xs: "30px", sm: "45px", lg: "50px" },
                fontWeight: "bold",
                marginBottom: { xs: "20px", md: "30px" },
                textAlign: "center",
              }}
            >
              Rentals are currently unavailable. Please check back soon.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
