"use client";

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { rentalEquipment, categories } from "../rentals/data";

export default function RentalGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered =
    selectedCategory === "All"
      ? rentalEquipment
      : rentalEquipment.filter((item) => item.category === selectedCategory);

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
              borderColor:
                selectedCategory === cat ? "#FF00AA" : "rgba(255,255,255,0.3)",
              "&:hover": {
                bgcolor:
                  selectedCategory === cat
                    ? "#d1008f"
                    : "rgba(255, 0, 170, 0.1)",
                borderColor: "#FF00AA",
              },
            }}
          />
        ))}
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {filtered.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card
              sx={{
                height: { xs: "300px", sm: "350px", md: "400px" },
                width: "100%",
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
              <Box
                sx={{
                  height: "60%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    item.image ||
                    "https://placehold.co/400x300/1a1a1a/666666?text=Coming+Soon"
                  }
                  alt={item.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
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
                  sx={{ color: "white" }}
                >
                  {item.name.toUpperCase()}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "12px",
                    color: "#FF00AA",
                  }}
                  gutterBottom
                >
                  {item.category.toUpperCase()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
