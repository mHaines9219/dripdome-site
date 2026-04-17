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

export default function BlogPostContent({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);
  if (!post) return null;

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Box sx={{ bgcolor: "black", overflow: "hidden", minHeight: "100vh" }}>
      <Box
        component="article"
        sx={{
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 4 },
          pt: { xs: 4, md: 8 },
          pb: { xs: 6, md: 10 },
        }}
      >
        {/* Breadcrumb Navigation */}
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
              gap: 1,
              listStyle: "none",
              p: 0,
              m: 0,
              mb: { xs: 3, md: 4 },
            }}
          >
            <Box component="li">
              <Link
                href="/"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Home
              </Link>
            </Box>
            <Typography
              component="li"
              sx={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}
              aria-hidden="true"
            >
              /
            </Typography>
            <Box component="li">
              <Link
                href="/blog"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Blog
              </Link>
            </Box>
            <Typography
              component="li"
              sx={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}
              aria-hidden="true"
            >
              /
            </Typography>
            <Typography
              component="li"
              sx={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "14px",
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

        {/* Post Header */}
        <Box component="header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category */}
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#E5C767",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              {post.category}
            </Typography>

            {/* Title */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "28px", sm: "36px", md: "44px" },
                fontWeight: 800,
                color: "white",
                lineHeight: 1.2,
                mb: 3,
                letterSpacing: "-0.02em",
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
                mb: { xs: 4, md: 5 },
                pb: { xs: 3, md: 4 },
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.7)",
                  fontWeight: 600,
                }}
              >
                {post.author.name}
              </Typography>
              {post.author.role && (
                <>
                  <Typography
                    sx={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}
                    aria-hidden="true"
                  >
                    |
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {post.author.role}
                  </Typography>
                </>
              )}
              <Typography
                sx={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}
                aria-hidden="true"
              >
                |
              </Typography>
              <Typography
                component="time"
                dateTime={post.date}
                sx={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {formattedDate}
              </Typography>
              <Typography
                sx={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}
                aria-hidden="true"
              >
                |
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {post.readingTime}
              </Typography>
            </Box>
          </motion.div>
        </Box>

        {/* Featured Image */}
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
              borderRadius: 3,
              overflow: "hidden",
              mb: { xs: 4, md: 5 },
              bgcolor: "rgba(255,255,255,0.05)",
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

        {/* Photo Gallery */}
        {post.gallery && post.gallery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Box
              sx={{
                mb: { xs: 4, md: 5 },
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
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
                        borderRadius: 3,
                        overflow: "hidden",
                        bgcolor: "rgba(255,255,255,0.05)",
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
            </Box>
          </motion.div>
        )}

        {/* Post Body */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Box
            sx={{
              "& p": {
                fontSize: { xs: "16px", md: "18px" },
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.8,
                mb: 3,
              },
              "& h2": {
                fontSize: { xs: "22px", sm: "26px", md: "30px" },
                fontWeight: 700,
                color: "white",
                mt: { xs: 5, md: 6 },
                mb: { xs: 2, md: 3 },
                lineHeight: 1.3,
              },
              "& h3": {
                fontSize: { xs: "18px", sm: "20px", md: "24px" },
                fontWeight: 700,
                color: "white",
                mt: { xs: 4, md: 5 },
                mb: { xs: 1.5, md: 2 },
                lineHeight: 1.3,
              },
              "& figure": {
                m: 0,
                my: { xs: 3, md: 4 },
              },
              "& figure img": {
                width: "100%",
                height: "auto",
                borderRadius: 3,
                display: "block",
              },
              "& figcaption": {
                textAlign: "center",
                color: "rgba(255,255,255,0.5)",
                fontSize: "14px",
                mt: 1,
              },
              "& a": {
                color: "#E5C767",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                "&:hover": {
                  opacity: 0.8,
                },
              },
              "& ul, & ol": {
                pl: { xs: 2.5, md: 3.5 },
                mb: 3,
                "& li": {
                  fontSize: { xs: "16px", md: "18px" },
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.8,
                  mb: 1,
                  "&::marker": { color: "#E5C767" },
                },
              },
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.section>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mt: { xs: 4, md: 5 },
              pt: { xs: 3, md: 4 },
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {post.tags.map((tag) => (
              <Box
                key={tag}
                sx={{
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {tag}
              </Box>
            ))}
          </Box>
        </motion.div>

        {/* Back to Blog */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Box sx={{ mt: { xs: 5, md: 6 } }}>
            <Link
              href="/blog"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <ArrowBackIcon
                sx={{ fontSize: 18, color: "#E5C767" }}
              />
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#E5C767",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Back to all posts
              </Typography>
            </Link>
          </Box>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Box
            sx={{
              mt: { xs: 6, md: 8 },
              pt: { xs: 5, md: 6 },
              borderTop: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: "28px", sm: "36px", md: "44px" },
                fontWeight: 800,
                color: "white",
                textAlign: "center",
                mb: 1.5,
              }}
            >
              Need Our Services?
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "18px" },
                color: "rgba(255,255,255,0.6)",
                textAlign: "center",
                mb: { xs: 3, md: 4 },
                maxWidth: 500,
              }}
            >
              Tell us about your project and let&apos;s build something
              together.
            </Typography>
            <ContactForm />
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
