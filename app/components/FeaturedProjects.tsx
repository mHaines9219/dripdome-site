"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, IconButton, Typography } from "@mui/material";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_RULE,
} from "@/lib/theme";

const sections = [
  {
    header: "LOWER EAST SIDE GIRLS CLUB CHARITY EVENT",
    blurb: `For a charity event hosted by Lower East Side Girls Club, DripDome Productions created a 10' × 8' Alice in Wonderland inspired photo moment featuring custom, vinyl-wrapped playing cards with the organization's initials, set against a lush garden wall backdrop. Fabricated off-site and installed in under two hours despite strict venue constraints, the installation was experienced by roughly 200 guests and cited by organizers as the highlight of the evening.`,
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/view.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/render.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/frame.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/mattdiana.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/twogirls.jpg",
    ],
  },
  {
    header: "GOOGLE PHOTOS VIDEO RECAP CAMPAIGN",
    blurb: `For a branded project with Google Photos, DripDome Productions led production design, including set design, prop and furniture sourcing, and full set dressing. The shoot featured K-pop star EJAE as the model, with every visual element curated to support a clean, lifestyle-driven aesthetic aligned with the brand.`,
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/goog-photos/ejae.png",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/goog-photos/purple.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/goog-photos/red.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/goog-photos/laydown.jpg",
    ],
  },
  {
    header: "THE SET OF NOTLOVELINE",
    blurb: `Our team designed and fabricated the podcast set for Trisha Paytas and Tana Mongeau's NotLoveline show. We created a vaporwave inspired set with retro wallpaper, a neon sign, and a custom built and wired heart wall with alternating colors.`,
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_1.JPG",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_2.JPG",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_3.JPG",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_4.jpeg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_5.jpeg",
    ],
  },
  {
    header: "THE ORIGINAL SOUTH SIDE",
    blurb: `We collaborated with The Original Southside™ on their ad campaign, managing prop sourcing, styling, and custom vinyl wraps. Our team ensured each element reflected the brand's modern twist on the classic 1920s Southside cocktail, effectively communicating their commitment to quality and style.`,
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/southside/ss1.png",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/southside/ss2.png",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/southside/ss3.png",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/southside/ss4.png",
    ],
  },
  {
    header: "JENNIFERS BODY PHOTO SHOOT",
    blurb: `We meticulously recreated the iconic pool scene from Jennifers Body by constructing a 20x20-foot structure featuring a functional pool. To authentically capture the scene's atmosphere, we employed specialized techniques to distress the walls, achieving a realistic, aged appearance. This project highlights our commitment to detail and our ability to bring cinematic visions to life.`,
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/jennifersbody/jb4.png",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/jennifersbody/jb2.png",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/jennifersbody/jb1.png",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/jennifersbody/jb3.png",
    ],
  },
];

function Filmstrip({ images, alt }: { images: string[]; alt: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    setIndex(Math.round((el.scrollLeft / maxScroll) * (images.length - 1)));
  };

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: "smooth" });
  };

  return (
    <Box>
      <Box
        ref={trackRef}
        onScroll={handleScroll}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {images.map((image, idx) => (
          <Box
            key={image}
            sx={{
              flex: "0 0 auto",
              width: { xs: "82%", sm: "60%", md: "44%" },
              scrollSnapAlign: "start",
              borderRight: idx < images.length - 1 ? NB_RULE : "none",
              position: "relative",
              aspectRatio: "4 / 3",
              bgcolor: NB_COLORS.well,
            }}
          >
            <Image
              src={image}
              alt={`${alt}, frame ${idx + 1}`}
              fill
              sizes="(max-width: 600px) 82vw, 44vw"
              style={{ objectFit: "cover" }}
            />
          </Box>
        ))}
      </Box>

      {/* Control bar */}
      <Box sx={{ display: "flex", alignItems: "center", borderTop: NB_RULE }}>
        <IconButton
          aria-label="Previous frame"
          onClick={() => nudge(-1)}
          sx={{
            borderRadius: 0,
            borderRight: NB_RULE,
            color: NB_COLORS.ink,
            px: 2.5,
            py: 1,
            "&:hover": { bgcolor: NB_COLORS.ink, color: NB_COLORS.paperOnInk },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          aria-label="Next frame"
          onClick={() => nudge(1)}
          sx={{
            borderRadius: 0,
            borderRight: NB_RULE,
            color: NB_COLORS.ink,
            px: 2.5,
            py: 1,
            "&:hover": { bgcolor: NB_COLORS.ink, color: NB_COLORS.paperOnInk },
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
        <Typography sx={{ ...NB_MONO_SX, fontSize: 12, px: 2, color: NB_COLORS.steel }}>
          FRAME {String(index + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </Typography>
        <Typography
          sx={{
            ...NB_MONO_SX,
            fontSize: 12,
            px: 2,
            ml: "auto",
            color: NB_COLORS.steel,
            display: { xs: "none", sm: "block" },
          }}
        >
          DRAG OR SCROLL →
        </Typography>
      </Box>
    </Box>
  );
}

const FeaturedProjects = () => {
  return (
    <Box sx={{ bgcolor: NB_COLORS.paper }}>
      {sections.map((section, index) => (
        <Box
          key={section.header}
          sx={{ borderBottom: index < sections.length - 1 ? NB_RULE : "none" }}
        >
          {/* Project header bar */}
          <Box
            sx={{
              bgcolor: NB_COLORS.ink,
              color: NB_COLORS.paperOnInk,
              display: "flex",
              alignItems: "center",
              gap: { xs: 1.5, md: 3 },
              px: { xs: 3, md: 6 },
              py: 1.25,
              flexWrap: "wrap",
            }}
          >
            <Typography
              sx={{
                ...NB_MONO_SX,
                fontSize: 12,
                fontWeight: 700,
                bgcolor: NB_COLORS.silver,
                color: NB_COLORS.onSilver,
                px: 1,
                py: 0.25,
              }}
            >
              PROJECT {String(index + 1).padStart(2, "0")}
            </Typography>
            <Typography sx={{ ...NB_MONO_SX, fontSize: 12, fontWeight: 700 }}>
              CASE FILE
            </Typography>
            <Typography
              sx={{
                ...NB_MONO_SX,
                fontSize: 12,
                ml: "auto",
                color: NB_COLORS.mutedOnInk,
                display: { xs: "none", md: "block" },
              }}
            >
              {String(section.images.length).padStart(2, "0")} FRAMES ON FILE
            </Typography>
          </Box>

          <Filmstrip images={section.images} alt={section.header} />

          {/* Project sheet copy */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
              borderTop: NB_RULE,
            }}
          >
            <Box
              sx={{
                px: { xs: 3, md: 6 },
                py: { xs: 2.5, md: 4 },
                borderRight: { md: NB_RULE },
                borderBottom: { xs: NB_RULE, md: "none" },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  ...NB_DISPLAY_SX,
                  fontSize: { xs: 26, sm: 32, md: 38 },
                  color: NB_COLORS.ink,
                }}
              >
                {section.header}
              </Typography>
            </Box>
            <Box sx={{ px: { xs: 3, md: 6 }, py: { xs: 2.5, md: 4 } }}>
              <Typography sx={{ fontSize: { xs: 15, md: 17 }, color: NB_COLORS.ink }}>
                {section.blurb}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default FeaturedProjects;
