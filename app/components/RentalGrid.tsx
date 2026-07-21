"use client";

import { useState } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { rentalEquipment, categories } from "../rentals/data";
import {
  NB_BORDER_WIDTH,
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_RULE,
} from "@/lib/theme";

export default function RentalGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered =
    selectedCategory === "All"
      ? rentalEquipment
      : rentalEquipment.filter((item) => item.category === selectedCategory);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Filter bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1.5,
          px: { xs: 3, md: 6 },
          py: { xs: 2, md: 2.5 },
          borderBottom: NB_RULE,
        }}
      >
        <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel, mr: 0.5 }}>
          FILTER:
        </Typography>
        {categories.map((cat) => {
          const selected = selectedCategory === cat;
          return (
            <ButtonBase
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={selected}
              sx={{
                ...NB_MONO_SX,
                fontSize: 12,
                fontWeight: 700,
                px: 1.5,
                py: 0.5,
                border: NB_RULE,
                borderRadius: 0,
                bgcolor: selected ? NB_COLORS.ink : NB_COLORS.surface,
                color: selected ? NB_COLORS.paperOnInk : NB_COLORS.ink,
                "&:hover": {
                  bgcolor: selected ? NB_COLORS.ink : NB_COLORS.silverLight,
                },
              }}
            >
              {cat.toUpperCase()}
            </ButtonBase>
          );
        })}
      </Box>

      {/* Equipment index grid: cells share NB_RULE dividers; the outer
          negative margin hides the trailing right/bottom rules so the
          section band supplies the outer frame. */}
      <Box sx={{ overflow: "hidden" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            mr: `-${NB_BORDER_WIDTH}px`,
            mb: `-${NB_BORDER_WIDTH}px`,
          }}
        >
          {filtered.map((item, i) => (
            <Box
              key={item.name}
              sx={{
                display: "flex",
                flexDirection: "column",
                borderRight: NB_RULE,
                borderBottom: NB_RULE,
                bgcolor: i % 2 === 1 ? NB_COLORS.silverLight : NB_COLORS.paper,
              }}
            >
              {/* Framed image plate */}
              <Box
                sx={{
                  borderBottom: NB_RULE,
                  bgcolor: NB_COLORS.surface,
                  aspectRatio: "4 / 3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  p: 2,
                }}
              >
                {item.image ? (
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                ) : (
                  <Typography
                    sx={{ ...NB_MONO_SX, fontSize: 11, color: NB_COLORS.steel }}
                  >
                    IMAGE COMING SOON
                  </Typography>
                )}
              </Box>

              {/* Spec sheet */}
              <Box sx={{ px: { xs: 2.5, md: 3 }, py: 2, flexGrow: 1 }}>
                <Typography
                  sx={{ ...NB_MONO_SX, fontSize: 11, color: NB_COLORS.steel, mb: 1 }}
                >
                  ITEM {String(i + 1).padStart(2, "0")} · {item.category.toUpperCase()}
                </Typography>
                <Typography
                  component="h3"
                  sx={{
                    ...NB_DISPLAY_SX,
                    fontSize: { xs: 16, md: 18 },
                    color: NB_COLORS.ink,
                  }}
                >
                  {item.name}
                </Typography>
              </Box>

              {/* Terms strip */}
              <Box
                sx={{
                  px: { xs: 2.5, md: 3 },
                  py: 1,
                  borderTop: NB_RULE,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Typography sx={{ ...NB_MONO_SX, fontSize: 10, color: NB_COLORS.steel }}>
                  MIN RENTAL
                </Typography>
                <Typography
                  sx={{ ...NB_MONO_SX, fontSize: 10, fontWeight: 700, color: NB_COLORS.ink }}
                >
                  1 WEEK
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
