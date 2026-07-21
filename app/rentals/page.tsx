import { Metadata } from "next";
import { Box, Typography } from "@mui/material";
import RentalGrid from "../components/RentalGrid";
import RentalForm from "./RentalForm";
import Footer from "../ui/Footer";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_RULE,
} from "@/lib/theme";

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
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_2.JPG",
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
      "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_2.JPG",
    ],
  },
};

export default function RentalsPage() {
  return (
    <>
      <Box component="main" sx={{ bgcolor: NB_COLORS.paper, color: NB_COLORS.ink }}>
        {/* Hero band */}
        <Box component="section" sx={{ borderBottom: NB_RULE }}>
          <Box sx={{ px: { xs: 3, md: 6 }, py: { xs: 5, md: 8 } }}>
            <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel, mb: 2 }}>
              INVENTORY · PROPS + SET PIECES · NYC
            </Typography>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                ...NB_DISPLAY_SX,
                fontSize: { xs: 56, sm: 96, lg: 140 },
                color: NB_COLORS.ink,
              }}
            >
              RENTALS
            </Typography>
          </Box>
        </Box>

        {/* Equipment index */}
        <Box component="section" sx={{ borderBottom: NB_RULE }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              px: { xs: 3, md: 6 },
              py: { xs: 3, md: 4 },
              borderBottom: NB_RULE,
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                ...NB_DISPLAY_SX,
                fontSize: { xs: 32, sm: 48, lg: 64 },
                color: NB_COLORS.ink,
              }}
            >
              EQUIPMENT INDEX
            </Typography>
            <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
              RENTAL PERIODS ARE MINIMUM 1 WEEK.
            </Typography>
          </Box>
          <RentalGrid />
        </Box>

        {/* Rental Request Form */}
        <RentalForm />
      </Box>
      <Footer />
    </>
  );
}
