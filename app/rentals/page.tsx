import { Metadata } from "next";
import { Box, Typography } from "@mui/material";
import RentalGrid from "../components/RentalGrid";
import RentalForm from "./RentalForm";
import Footer from "../ui/Footer";

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
              paddingTop: { xs: 4, md: 8 },
              paddingLeft: "10px",
              paddingRight: "10px",
              textAlign: "center",
            }}
          >
            Rentals
          </Typography>

          {/* Equipment Grid */}
          <Box sx={{ backgroundColor: "black", py: 4, px: { xs: 0, md: 8 } }}>
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
              Available Equipment
            </Typography>
            <RentalGrid />
          </Box>

          {/* Rental Request Form */}
          <Box sx={{ backgroundColor: "black", py: 4 }}>
            <RentalForm />
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
