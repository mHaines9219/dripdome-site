"use client";

import Link from "next/link";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ContactForm from "../../components/ContactForm";
import { getPostBySlug } from "../data";
import {
  FONT_DISPLAY,
  FONT_MONO,
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_RULE,
  NB_TAG_SX,
  nbShadow,
} from "@/lib/theme";

const CRUMB_SX = {
  ...NB_MONO_SX,
  fontSize: 11,
  color: NB_COLORS.steel,
} as const;

const META_SX = {
  ...NB_MONO_SX,
  fontSize: 12,
  color: NB_COLORS.steel,
} as const;

export default function BlogPostContent({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);
  if (!post) return null;

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Box sx={{ bgcolor: NB_COLORS.paper, minHeight: "100vh" }}>
      <Box component="article">
        {/* Breadcrumb band */}
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Box
            component="ol"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              listStyle: "none",
              m: 0,
              px: { xs: 3, md: 6 },
              py: 1.5,
              borderBottom: NB_RULE,
            }}
          >
            <Box component="li">
              <Box
                component={Link}
                href="/"
                sx={{
                  ...CRUMB_SX,
                  textDecoration: "none",
                  "&:hover": { color: NB_COLORS.ink },
                }}
              >
                Home
              </Box>
            </Box>
            <Typography component="li" sx={CRUMB_SX} aria-hidden="true">
              /
            </Typography>
            <Box component="li">
              <Box
                component={Link}
                href="/blog"
                sx={{
                  ...CRUMB_SX,
                  textDecoration: "none",
                  "&:hover": { color: NB_COLORS.ink },
                }}
              >
                Blog
              </Box>
            </Box>
            <Typography component="li" sx={CRUMB_SX} aria-hidden="true">
              /
            </Typography>
            <Typography
              component="li"
              sx={{
                ...CRUMB_SX,
                color: NB_COLORS.ink,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              aria-current="page"
            >
              {post.title}
            </Typography>
          </Box>
        </motion.nav>

        {/* Post header band */}
        <Box
          component="header"
          sx={{
            borderBottom: NB_RULE,
            px: { xs: 3, md: 6 },
            py: { xs: 4, md: 6 },
          }}
        >
          <Box sx={{ maxWidth: 800, mx: "auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category */}
              <Typography sx={{ ...META_SX, fontWeight: 700, mb: 2 }}>
                {post.category}
              </Typography>

              {/* Title */}
              <Typography
                variant="h1"
                sx={{
                  ...NB_DISPLAY_SX,
                  fontSize: { xs: 30, sm: 40, md: 48 },
                  color: NB_COLORS.ink,
                  mb: 3,
                }}
              >
                {post.title}
              </Typography>

              {/* Meta */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: { xs: 1.5, md: 2 },
                }}
              >
                <Typography
                  sx={{ ...META_SX, fontWeight: 700, color: NB_COLORS.ink }}
                >
                  {post.author.name}
                </Typography>
                {post.author.role && (
                  <>
                    <Typography sx={META_SX} aria-hidden="true">
                      ·
                    </Typography>
                    <Typography sx={META_SX}>{post.author.role}</Typography>
                  </>
                )}
                <Typography sx={META_SX} aria-hidden="true">
                  ·
                </Typography>
                <Typography component="time" dateTime={post.date} sx={META_SX}>
                  {formattedDate}
                </Typography>
                <Typography sx={META_SX} aria-hidden="true">
                  ·
                </Typography>
                <Typography sx={META_SX}>{post.readingTime}</Typography>
              </Box>
            </motion.div>
          </Box>
        </Box>

        {/* Featured image band */}
        <Box
          sx={{
            borderBottom: NB_RULE,
            px: { xs: 3, md: 6 },
            py: { xs: 4, md: 6 },
          }}
        >
          <Box sx={{ maxWidth: 800, mx: "auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 220, sm: 300, md: 400 },
                  border: NB_RULE,
                  boxShadow: nbShadow(),
                  bgcolor: NB_COLORS.well,
                }}
              >
                <Image
                  src={post.image.url}
                  alt={post.image.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 800px) 100vw, 800px"
                  priority
                />
              </Box>
            </motion.div>
          </Box>
        </Box>

        {/* Photo gallery band */}
        {post.gallery && post.gallery.length > 0 && (
          <Box
            sx={{
              borderBottom: NB_RULE,
              px: { xs: 3, md: 6 },
              py: { xs: 3, md: 4 },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Typography sx={{ ...META_SX, mb: 2 }}>
                GALLERY · {String(post.gallery.length).padStart(2, "0")} FIGURES
              </Typography>
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                loop
                spaceBetween={12}
                slidesPerView={1}
                breakpoints={{
                  600: { slidesPerView: 1.5, spaceBetween: 16 },
                  900: { slidesPerView: 2, spaceBetween: 20 },
                }}
              >
                {post.gallery.map((src, index) => (
                  <SwiperSlide key={index}>
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: { xs: 220, sm: 280, md: 340 },
                        border: NB_RULE,
                        bgcolor: NB_COLORS.well,
                      }}
                    >
                      <Image
                        src={src}
                        alt={`${post.title} - photo ${index + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 600px) 90vw, (max-width: 900px) 55vw, 45vw"
                      />
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </Box>
        )}

        {/* Post body band */}
        <Box
          sx={{
            borderBottom: NB_RULE,
            px: { xs: 3, md: 6 },
            py: { xs: 4, md: 6 },
          }}
        >
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Box
              sx={{
                maxWidth: 760,
                mx: "auto",
                "& p": {
                  fontSize: { xs: 16, md: 18 },
                  color: NB_COLORS.ink,
                  lineHeight: 1.8,
                  mb: 3,
                },
                "& h2": {
                  fontFamily: FONT_DISPLAY,
                  textTransform: "uppercase",
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                  fontSize: { xs: 22, sm: 26, md: 30 },
                  color: NB_COLORS.ink,
                  lineHeight: 1.1,
                  mt: { xs: 5, md: 6 },
                  mb: { xs: 2, md: 3 },
                },
                "& h3": {
                  fontFamily: FONT_DISPLAY,
                  textTransform: "uppercase",
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                  fontSize: { xs: 18, sm: 20, md: 22 },
                  color: NB_COLORS.ink,
                  lineHeight: 1.15,
                  mt: { xs: 4, md: 5 },
                  mb: { xs: 1.5, md: 2 },
                },
                "& figure": {
                  m: 0,
                  my: { xs: 3, md: 4 },
                },
                "& img": {
                  width: "100%",
                  height: "auto",
                  border: NB_RULE,
                  borderRadius: 0,
                  display: "block",
                },
                "& figcaption": {
                  fontFamily: FONT_MONO,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: NB_COLORS.steel,
                  fontSize: 12,
                  mt: 1.5,
                },
                "& a": {
                  color: NB_COLORS.ink,
                  textDecoration: "underline",
                  textDecorationThickness: "2px",
                  textUnderlineOffset: "3px",
                  "&:hover": {
                    bgcolor: NB_COLORS.ink,
                    color: NB_COLORS.paperOnInk,
                  },
                },
                "& strong": {
                  color: NB_COLORS.ink,
                },
                "& blockquote": {
                  m: 0,
                  my: { xs: 3, md: 4 },
                  px: { xs: 2.5, md: 3 },
                  py: { xs: 2, md: 2.5 },
                  borderLeft: NB_RULE,
                  bgcolor: NB_COLORS.silverLight,
                  "& p:last-of-type": { mb: 0 },
                },
                "& code": {
                  fontFamily: FONT_MONO,
                  fontSize: "0.9em",
                  bgcolor: NB_COLORS.silverLight,
                  px: 0.75,
                  py: 0.25,
                },
                "& pre": {
                  fontFamily: FONT_MONO,
                  bgcolor: NB_COLORS.surface,
                  border: NB_RULE,
                  p: 2,
                  overflowX: "auto",
                  mb: 3,
                },
                "& hr": {
                  border: "none",
                  borderTop: NB_RULE,
                  my: { xs: 4, md: 5 },
                },
                "& ul, & ol": {
                  pl: { xs: 2.5, md: 3.5 },
                  mb: 3,
                  "& li": {
                    fontSize: { xs: 16, md: 18 },
                    color: NB_COLORS.ink,
                    lineHeight: 1.8,
                    mb: 1,
                    "&::marker": { color: NB_COLORS.steel },
                  },
                },
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.section>
        </Box>

        {/* Tags + back link band */}
        <Box
          sx={{
            borderBottom: NB_RULE,
            px: { xs: 3, md: 6 },
            py: { xs: 3, md: 4 },
          }}
        >
          <Box sx={{ maxWidth: 760, mx: "auto" }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {post.tags.map((tag) => (
                  <Box key={tag} sx={{ ...NB_TAG_SX, fontSize: 11 }}>
                    {tag}
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: { xs: 3, md: 4 } }}>
                <Box
                  component={Link}
                  href="/blog"
                  sx={{
                    ...NB_MONO_SX,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: 13,
                    fontWeight: 700,
                    color: NB_COLORS.ink,
                    textDecoration: "none",
                    "&:hover": {
                      bgcolor: NB_COLORS.ink,
                      color: NB_COLORS.paperOnInk,
                    },
                  }}
                >
                  <ArrowBackIcon sx={{ fontSize: 18, color: "inherit" }} />
                  Back to all posts
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Box>

        {/* Contact CTA band */}
        <Box
          component="section"
          sx={{ px: { xs: 3, md: 6 }, py: { xs: 5, md: 8 } }}
        >
          <Box sx={{ maxWidth: 760, mx: "auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Typography sx={{ ...META_SX, mb: 2 }}>
                PROJECT INTAKE · FORM A
              </Typography>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  ...NB_DISPLAY_SX,
                  fontSize: { xs: 30, sm: 40, md: 48 },
                  color: NB_COLORS.ink,
                  mb: 1.5,
                }}
              >
                Need Our Services?
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 15, md: 17 },
                  color: NB_COLORS.steel,
                  mb: { xs: 3, md: 4 },
                  maxWidth: 520,
                }}
              >
                Tell us about your project and let&apos;s build something
                together.
              </Typography>
              <ContactForm />
            </motion.div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
