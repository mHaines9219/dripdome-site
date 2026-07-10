import { Metadata } from "next";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { ACCENT, INK, PAPER, nbShadow } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Video & Photo | DripDome - Set Design for Film & Photography NYC",
  description:
    "Explore DripDome's video and photo production work. Custom set design and fabrication for film, TV, commercials, and photography in New York City.",
  alternates: {
    canonical: "https://www.dripdome.com/video-photo",
  },
  openGraph: {
    title: "Video & Photo | DripDome - Set Design for Productions",
    description:
      "View our portfolio of video and photo production sets crafted by DripDome in NYC and LA.",
    url: "https://www.dripdome.com/video-photo",
    type: "website",
    locale: "en_US",
    siteName: "DripDome",
    images: [
      {
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
        width: 1200,
        height: 630,
        alt: "DripDome Video & Photo - Set Design for Productions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Video & Photo | DripDome - Set Design for Film & Photography NYC",
    description:
      "View our portfolio of video and photo production sets crafted by DripDome in NYC and LA.",
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
    ],
  },
};

export default function VideoPhotoPage() {
  // Placeholder data for the gallery
  const galleryImages = [
    { id: 1, src: "/images/work1.jpg", alt: "Project 1", caption: "Project 1" },
    { id: 2, src: "/images/work2.jpg", alt: "Project 2", caption: "Project 2" },
    { id: 3, src: "/images/work3.jpg", alt: "Project 3", caption: "Project 3" },
    { id: 4, src: "/images/work4.jpg", alt: "Project 4", caption: "Project 4" },
    { id: 5, src: "/images/work5.jpg", alt: "Project 5", caption: "Project 5" },
  ];

  return (
    <Box
      component="section"
      id="work-gallery"
      sx={{ py: 16, bgcolor: INK }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: "center",
            color: PAPER,
            mb: 4,
          }}
        >
          Our Work
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{ textAlign: "center", color: "rgba(243,237,226,0.8)", mb: 8 }}
        >
          Explore some of the amazing projects we&apos;ve worked on.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {galleryImages.map((image) => (
            <Card
              key={image.id}
              sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 0,
                bgcolor: INK,
                border: `3px solid ${PAPER}`,
                boxShadow: nbShadow(6, ACCENT),
                transition: "transform 120ms ease, box-shadow 120ms ease",
                "&:hover": {
                  transform: "translate(-2px, -2px)",
                  boxShadow: nbShadow(8, ACCENT),
                },
              }}
            >
              <CardMedia
                component="img"
                image={image.src}
                alt={image.alt}
                height={192}
                sx={{
                  height: 192,
                  objectFit: "cover",
                }}
              />
              <CardContent
                sx={{
                  bgcolor: INK,
                  borderTop: `2px solid ${PAPER}`,
                  color: PAPER,
                  textAlign: "center",
                  py: 1,
                  "&:last-child": { pb: 1 },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {image.caption}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
