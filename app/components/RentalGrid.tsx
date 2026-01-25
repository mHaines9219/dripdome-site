"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";

const rentals = [
  {
    id: 1,
    name: "Velvet Chaise",
    category: "Furniture",
    image: "/rentals/chaise.jpg",
  },
  {
    id: 2,
    name: "Gothic Mirror",
    category: "Props",
    image: "/rentals/mirror.jpg",
  },
  {
    id: 3,
    name: "Red Fabric Wall Flat",
    category: "Wall Flats",
    image: "/rentals/wallflat.jpg",
  },
  {
    id: 4,
    name: 'Neon Sign "Hell Yes"',
    category: "Lighting",
    image: "/rentals/neon.jpg",
  },
  {
    id: 5,
    name: "Candelabra",
    category: "Props",
    image: "/rentals/candelabra.jpg",
  },
  // add more items here
];

const categories = ["All", "Furniture", "Props", "Wall Flats", "Lighting"];

export default function RentalGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered =
    selectedCategory === "All"
      ? rentals
      : rentals.filter((item) => item.category === selectedCategory);

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          mb: 6,
          justifyContent: "center",
        }}
      >
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat.toUpperCase()}
            onClick={() => setSelectedCategory(cat)}
            variant={selectedCategory === cat ? "filled" : "outlined"}
            color={selectedCategory === cat ? "primary" : "default"}
            sx={{
              bgcolor: selectedCategory === cat ? "#FF00AA" : "black",
              color: "white",
              borderColor: selectedCategory === cat ? "#FF00AA" : "rgba(255,255,255,0.3)",
              "&:hover": {
                bgcolor: selectedCategory === cat ? "#d1008f" : "rgba(255, 0, 170, 0.1)",
                borderColor: "#FF00AA",
              },
            }}
          />
        ))}
      </Box>

      <Grid container spacing={3}>
        {filtered.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id} sx={{ p: 0, m: 0 }}>
            <Card
              sx={{
                height: "40vh",
                width: { xs: "90vw", sm: "40vw", md: "30vw" },
                display: "flex",
                flexDirection: "column",
                backgroundColor: "rgba(100, 100, 100, 0.5)",
                justifyContent: "center",

                alignItems: "center",
                transition: "box-shadow 0.3s ease",
                borderRadius: "10px",
                "&:hover": {
                  boxShadow: 4,
                },
              }}
            >
              <Box sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="192"
                  image={item.image}
                  alt={item.name}
                  sx={{ objectFit: "cover" }}
                />
              </Box>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontFamily: "Nova Mono", color: "white" }}
                >
                  {item.name.toUpperCase()}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Nova Mono",
                    fontSize: "12px",
                    color: "#FF00AA",
                  }}
                  gutterBottom
                >
                  {item.category.toUpperCase()}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    bgcolor: "white",
                    mt: 1,
                    fontFamily: "Nova Mono",
                    borderColor: "black",
                    color: "black",
                    "&:hover": {
                      bgcolor: "black",
                      color: "white",
                      borderColor: "black",
                    },
                  }}
                >
                  Add to List
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
