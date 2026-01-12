import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";

export default function VideoPhoto() {
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
      sx={{ py: 16, bgcolor: "grey.100" }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: "center",
            color: "grey.900",
            mb: 4,
            fontWeight: 800,
          }}
        >
          Our Work
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{ textAlign: "center", color: "grey.700", mb: 8 }}
        >
          Explore some of the amazing projects we've worked on.
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
                borderRadius: 2,
                boxShadow: 3,
                "&:hover .MuiCardMedia-root": { transform: "scale(1.08)" },
                "&:hover .MuiCardContent-root": { opacity: 1 },
              }}
            >
              <CardMedia
                component="img"
                image={image.src}
                alt={image.alt}
                height={192}
                sx={{
                  height: 192,
                  transition: "transform 300ms ease",
                  objectFit: "cover",
                }}
              />
              <CardContent
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "common.white",
                  textAlign: "center",
                  py: 1,
                  opacity: 0,
                  transition: "opacity 300ms ease",
                }}
              >
                <Typography variant="body2">{image.caption}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
