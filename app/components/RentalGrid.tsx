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
import { ACCENT, INK, NB_CARD_DARK_SX, PAPER, nbShadow } from "@/lib/theme";

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
            sx={{
              borderRadius: 0,
              fontWeight: 700,
              letterSpacing: "0.06em",
              border: `2px solid ${PAPER}`,
              bgcolor: selectedCategory === cat ? ACCENT : INK,
              color: selectedCategory === cat ? INK : PAPER,
              boxShadow:
                selectedCategory === cat ? nbShadow(3, PAPER) : "none",
              transition: "transform 120ms ease, box-shadow 120ms ease",
              "&:hover": {
                bgcolor: selectedCategory === cat ? ACCENT : INK,
                color: selectedCategory === cat ? INK : ACCENT,
                borderColor: ACCENT,
                transform: "translate(-2px, -2px)",
                boxShadow: nbShadow(
                  3,
                  selectedCategory === cat ? PAPER : ACCENT,
                ),
              },
              "&:active": {
                transform: "translate(2px, 2px)",
                boxShadow: "none",
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
                justifyContent: "center",
                alignItems: "center",
                ...NB_CARD_DARK_SX,
                transition: "transform 120ms ease, box-shadow 120ms ease",
                "&:hover": {
                  transform: "translate(-2px, -2px)",
                  boxShadow: nbShadow(10, ACCENT),
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
                    color: ACCENT,
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
