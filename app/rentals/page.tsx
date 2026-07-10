import { Metadata } from "next";
import { Box, Typography } from "@mui/material";
import RentalGrid from "../components/RentalGrid";
import RentalForm from "./RentalForm";
import Footer from "../ui/Footer";
import { INK } from "@/lib/theme";

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
    type: "website",
    locale: "en_US",
    siteName: "DripDome",
    images: [
      {
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
        width: 1200,
        height: 630,
        alt: "DripDome Rentals - Props & Set Piece Rentals NYC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rentals | DripDome - Props & Set Piece Rentals NYC",
    description:
      "Rent props and set pieces from DripDome for your next production in NYC or LA.",
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
    ],
  },
};

export default function RentalsPage() {
  return (
    <>
      <Box sx={{ backgroundColor: INK }}>
        <Box sx={{ backgroundColor: INK }}>
          <Typography
            variant="h1"
            component="h1"
            color="white"
            sx={{
              fontSize: { xs: "55px", sm: "95px", lg: "150px" },
              paddingTop: { xs: 4, md: 8 },
              paddingLeft: "10px",
              paddingRight: "10px",
              textAlign: "center",
            }}
          >
            Rentals
          </Typography>

          {/* Equipment Grid */}
          <Box sx={{ backgroundColor: INK, py: 4, px: { xs: 0, md: 8 } }}>
            <Typography
              variant="h2"
              component="h2"
              color="white"
              sx={{
                fontSize: { xs: "30px", sm: "45px", lg: "50px" },
                marginBottom: { xs: "20px", md: "30px" },
                textAlign: "center",
              }}
            >
              Rental Periods are minimum 1 week.
            </Typography>
            <RentalGrid />
          </Box>

          {/* Rental Request Form */}
          <Box sx={{ backgroundColor: INK, py: 4 }}>
            <RentalForm />
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
