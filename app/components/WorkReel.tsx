"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { INK, PAPER } from "@/lib/theme";

const S3 = "https://dripdome-site.s3.us-east-2.amazonaws.com";

const row1 = [
  `${S3}/editorials_x/ed_1.jpeg`,
  `${S3}/goog-photos/ejae.png`,
  `${S3}/editorials_x/ed_5.jpeg`,
  `${S3}/NLL/IMG_1.JPG`,
  `${S3}/editorials_x/ed_10.jpeg`,
  `${S3}/southside/ss1.png`,
  `${S3}/editorials_x/ed_15.jpeg`,
  `${S3}/SETDESIGN/sd_1.JPG`,
];

const row2 = [
  `${S3}/editorials_x/ed_20.jpeg`,
  `${S3}/goog-photos/purple.jpg`,
  `${S3}/editorials_x/ed_25.jpeg`,
  `${S3}/NLL/IMG_3.JPG`,
  `${S3}/editorials_x/ed_30.jpeg`,
  `${S3}/jennifersbody/jb4.png`,
  `${S3}/editorials_x/ed_35.jpeg`,
  `${S3}/lesgc/view.jpg`,
];

function MarqueeRow({
  images,
  reverse,
}: {
  images: string[];
  reverse?: boolean;
}) {
  const doubled = [...images, ...images];

  return (
    <Box
      sx={{
        overflow: "hidden",
        width: "100%",
        "&:hover .marquee-track": {
          animationPlayState: "paused",
        },
      }}
    >
      <Box
        className="marquee-track"
        sx={{
          display: "flex",
          gap: "12px",
          width: "max-content",
          animation: `marquee-reel 40s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((src, i) => (
          <Box
            key={i}
            sx={{
              position: "relative",
              width: { xs: 200, sm: 280, md: 320 },
              height: { xs: 140, sm: 190, md: 220 },
              flexShrink: 0,
              border: `2px solid ${PAPER}`,
              borderRadius: 0,
              overflow: "hidden",
            }}
          >
            <Image
              src={src}
              alt="DripDome project"
              fill
              sizes="320px"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function WorkReel() {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        overflow: "hidden",
        bgcolor: INK,
        py: { xs: 2, md: 4 },
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <MarqueeRow images={row1} />
      <MarqueeRow images={row2} reverse />
    </Box>
  );
}
