"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, ButtonBase, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { blogPosts, getAllCategories } from "./data";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_RULE,
  NB_TAG_SX,
} from "@/lib/theme";

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <ButtonBase
      onClick={onClick}
      aria-pressed={active}
      sx={{
        ...NB_TAG_SX,
        fontSize: 11,
        fontWeight: 700,
        cursor: "pointer",
        bgcolor: active ? NB_COLORS.ink : NB_COLORS.surface,
        color: active ? NB_COLORS.paperOnInk : NB_COLORS.ink,
        "&:hover": {
          bgcolor: active ? NB_COLORS.ink : NB_COLORS.silverLight,
        },
      }}
    >
      {label}
    </ButtonBase>
  );
}

export default function BlogContent() {
  const categories = getAllCategories();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory
    ? blogPosts.filter((post) => post.category === activeCategory)
    : blogPosts;

  return (
    <Box component="main" sx={{ bgcolor: NB_COLORS.paper, minHeight: "100vh" }}>
      {/* Hero band */}
      <Box component="section" sx={{ borderBottom: NB_RULE }}>
        <Box
          sx={{
            px: { xs: 3, md: 6 },
            py: { xs: 5, md: 8 },
            maxWidth: 1440,
            mx: "auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel, mb: 2 }}
            >
              DRIPDOME JOURNAL · FIELD NOTES FROM THE SHOP
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Typography
              variant="h1"
              sx={{
                ...NB_DISPLAY_SX,
                fontSize: { xs: 44, sm: 64, md: 80, lg: 96 },
                color: NB_COLORS.ink,
                mb: 3,
              }}
            >
              THE JOURNAL
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography
              sx={{
                fontSize: { xs: 16, md: 18 },
                color: NB_COLORS.ink,
                maxWidth: 640,
              }}
            >
              Behind-the-scenes looks at our builds, fabrication deep dives,
              and insights from the DripDome studio.
            </Typography>
          </motion.div>
        </Box>
      </Box>

      {/* Category filter band */}
      <Box
        component="nav"
        aria-label="Blog categories"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          px: { xs: 3, md: 6 },
          py: { xs: 2, md: 2.5 },
          borderBottom: NB_RULE,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            sx={{ ...NB_MONO_SX, fontSize: 11, color: NB_COLORS.steel, mr: 1 }}
          >
            FILTER:
          </Typography>
          <FilterButton
            label="ALL"
            active={!activeCategory}
            onClick={() => setActiveCategory(null)}
          />
          {categories.map((category) => (
            <FilterButton
              key={category}
              label={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </Box>
        <Typography sx={{ ...NB_MONO_SX, fontSize: 11, color: NB_COLORS.steel }}>
          INDEX · {String(filteredPosts.length).padStart(2, "0")}{" "}
          {filteredPosts.length === 1 ? "ENTRY" : "ENTRIES"}
        </Typography>
      </Box>

      {/* Editorial index */}
      <Box component="section" aria-label="Blog posts">
        {filteredPosts.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.5 }}
          >
            <Box
              component={Link}
              href={`/blog/${post.slug}`}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "64px 260px 1fr 48px" },
                gap: { xs: 2, md: 4 },
                alignItems: "center",
                px: { xs: 3, md: 6 },
                py: { xs: 3, md: 3.5 },
                borderBottom: NB_RULE,
                textDecoration: "none",
                color: NB_COLORS.ink,
                "&:hover": {
                  bgcolor: NB_COLORS.ink,
                  color: NB_COLORS.paperOnInk,
                  "& .journal-meta": { color: NB_COLORS.mutedOnInk },
                },
              }}
            >
              {/* Entry index */}
              <Typography
                className="journal-meta"
                sx={{
                  ...NB_MONO_SX,
                  fontSize: 12,
                  color: NB_COLORS.steel,
                  display: { xs: "none", md: "block" },
                }}
              >
                E.{String(index + 1).padStart(2, "0")}
              </Typography>

              {/* Thumbnail */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 200, md: 150 },
                  border: NB_RULE,
                  bgcolor: NB_COLORS.well,
                }}
              >
                <Image
                  src={post.image.url}
                  alt={post.image.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 900px) 100vw, 260px"
                />
              </Box>

              {/* Entry copy */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1.5,
                    mb: 1,
                  }}
                >
                  <Typography
                    className="journal-meta"
                    sx={{
                      ...NB_MONO_SX,
                      fontSize: 11,
                      fontWeight: 700,
                      color: NB_COLORS.steel,
                    }}
                  >
                    {post.category}
                  </Typography>
                  <Typography
                    className="journal-meta"
                    component="time"
                    dateTime={post.date}
                    sx={{ ...NB_MONO_SX, fontSize: 11, color: NB_COLORS.steel }}
                  >
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                  <Typography
                    className="journal-meta"
                    sx={{ ...NB_MONO_SX, fontSize: 11, color: NB_COLORS.steel }}
                  >
                    {post.readingTime}
                  </Typography>
                </Box>

                <Typography
                  component="h2"
                  sx={{
                    ...NB_DISPLAY_SX,
                    fontSize: { xs: 20, md: 24 },
                    color: "inherit",
                    mb: 1,
                  }}
                >
                  {post.title}
                </Typography>

                <Typography
                  className="journal-meta"
                  sx={{
                    fontSize: { xs: 14, md: 15 },
                    lineHeight: 1.6,
                    color: NB_COLORS.steel,
                  }}
                >
                  {post.excerpt}
                </Typography>
              </Box>

              <ArrowOutwardIcon
                sx={{
                  fontSize: 22,
                  color: "inherit",
                  display: { xs: "none", md: "block" },
                  justifySelf: "end",
                }}
              />
            </Box>
          </motion.article>
        ))}
      </Box>
    </Box>
  );
}
