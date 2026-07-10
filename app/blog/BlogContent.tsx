"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Typography, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { blogPosts, getAllCategories } from "./data";
import {
  ACCENT,
  INK,
  NB_BORDER,
  NB_BORDER_THIN,
  PAPER,
  SURFACE,
  nbShadow,
} from "@/lib/theme";

export default function BlogContent() {
  const categories = getAllCategories();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory
    ? blogPosts.filter((post) => post.category === activeCategory)
    : blogPosts;

  const chipSx = (active: boolean) => ({
    bgcolor: active ? ACCENT : SURFACE,
    color: INK,
    border: NB_BORDER_THIN,
    borderRadius: 0,
    boxShadow: active ? nbShadow(3) : "none",
    fontWeight: 700,
    fontSize: "14px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.04em",
    transition: "transform 120ms ease, box-shadow 120ms ease",
    "&:hover": {
      bgcolor: active ? ACCENT : SURFACE,
      transform: "translate(-2px, -2px)",
      boxShadow: nbShadow(active ? 5 : 3),
    },
    "&:active": {
      transform: "translate(2px, 2px)",
      boxShadow: nbShadow(0),
    },
  });

  return (
    <Box sx={{ bgcolor: PAPER, overflow: "hidden", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          pt: { xs: 6, md: 10 },
          pb: { xs: 4, md: 6 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "42px", sm: "64px", md: "80px", lg: "96px" },
              color: INK,
              textAlign: "center",
              mb: { xs: 3, md: 4 },
              letterSpacing: "-0.02em",
            }}
          >
            THE{" "}
            <Box
              component="span"
              sx={{
                display: "inline-block",
                bgcolor: ACCENT,
                color: INK,
                px: { xs: 1.5, md: 3 },
                boxShadow: nbShadow(8),
                transform: "rotate(-1.5deg)",
              }}
            >
              BLOG
            </Box>
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <Typography
            sx={{
              fontSize: { xs: "16px", sm: "18px", md: "22px" },
              color: INK,
              textAlign: "center",
              maxWidth: "900px",
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Behind-the-scenes looks at our builds, fabrication deep dives, and
            insights from the{" "}
            <Box component="span" sx={{ color: INK, fontWeight: 700 }}>
              DripDome
            </Box>{" "}
            studio.
          </Typography>
        </motion.div>
      </Box>

      {/* Category Filter */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          pb: { xs: 3, md: 4 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <Box
            component="nav"
            aria-label="Blog categories"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              justifyContent: "center",
            }}
          >
            <Chip
              label="All"
              onClick={() => setActiveCategory(null)}
              sx={chipSx(!activeCategory)}
            />
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setActiveCategory(category)}
                sx={chipSx(activeCategory === category)}
              />
            ))}
          </Box>
        </motion.div>
      </Box>

      {/* Blog Post Grid */}
      <Box
        component="section"
        aria-label="Blog posts"
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          pb: { xs: 6, md: 10 },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "1fr 1fr 1fr",
            },
            gap: { xs: 3, md: 4 },
          }}
        >
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              style={{ height: "100%" }}
            >
              <Link
                href={`/blog/${post.slug}`}
                style={{ textDecoration: "none", display: "block", height: "100%" }}
              >
                <Box
                  sx={{
                    bgcolor: SURFACE,
                    border: NB_BORDER,
                    borderRadius: 0,
                    boxShadow: nbShadow(6),
                    transition: "transform 120ms ease, box-shadow 120ms ease",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "translate(-2px, -2px)",
                      boxShadow: nbShadow(8),
                    },
                    "&:active": {
                      transform: "translate(2px, 2px)",
                      boxShadow: nbShadow(0),
                    },
                  }}
                >
                  {/* Post Image */}
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 200,
                      bgcolor: PAPER,
                      borderBottom: NB_BORDER,
                    }}
                  >
                    <Image
                      src={post.image.url}
                      alt={post.image.alt}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </Box>

                  {/* Post Content */}
                  <Box
                    sx={{
                      p: { xs: 2.5, md: 3 },
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Category + Reading Time */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 700,
                          bgcolor: ACCENT,
                          color: INK,
                          border: NB_BORDER_THIN,
                          px: 1,
                          py: 0.25,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {post.category}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "rgba(17,17,17,0.6)",
                        }}
                      >
                        {post.readingTime}
                      </Typography>
                    </Box>

                    {/* Title */}
                    <Typography
                      component="h2"
                      sx={{
                        fontSize: { xs: "18px", md: "20px" },
                        fontWeight: 700,
                        color: INK,
                        lineHeight: 1.3,
                        mb: 1.5,
                      }}
                    >
                      {post.title}
                    </Typography>

                    {/* Excerpt */}
                    <Typography
                      sx={{
                        fontSize: { xs: "14px", md: "15px" },
                        color: "rgba(17,17,17,0.75)",
                        lineHeight: 1.6,
                        flex: 1,
                      }}
                    >
                      {post.excerpt}
                    </Typography>

                    {/* Date */}
                    <Typography
                      component="time"
                      dateTime={post.date}
                      sx={{
                        fontSize: "13px",
                        color: "rgba(17,17,17,0.55)",
                        mt: 2,
                      }}
                    >
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </motion.article>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
