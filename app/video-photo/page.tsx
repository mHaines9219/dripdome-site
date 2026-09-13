import { Metadata } from "next";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_MONO_SX,
  NB_RULE,
} from "@/lib/theme";

export const metadata: Metadata = {
  title: "Video & Photo | DripDome - Set Design for Film & Photography NYC",
  description:
    "Explore DripDome's video and photo production work. Custom set design and fabrication for film, TV, commercials, and photography in New York City.",
  alternates: {
    canonical: "https://www.dripdome.com/video-photo",
  },
  openGraph: {
    title: "Video & Photo | DripDome - Set Design for Productions",
    description:
      "View our portfolio of video and photo production sets crafted by DripDome in NYC and LA.",
    url: "https://www.dripdome.com/video-photo",
    type: "website",
    locale: "en_US",
    siteName: "DripDome",
    images: [
      {
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/sunnyd/1.jpg",
        width: 1200,
        height: 630,
        alt: "DripDome Video & Photo - Set Design for Productions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Video & Photo | DripDome - Set Design for Film & Photography NYC",
    description:
      "View our portfolio of video and photo production sets crafted by DripDome in NYC and LA.",
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/sunnyd/1.jpg",
    ],
  },
};

const S3 = "https://dripdome-site.s3.us-east-2.amazonaws.com";

export default function VideoPhotoPage() {
  const galleryImages = [
    {
      id: 1,
      src: `${S3}/NLL/IMG_1.JPG`,
      alt: "NotLoveline podcast set designed and fabricated by DripDome",
      caption: "NOTLOVELINE PODCAST SET",
    },
    {
      id: 2,
      src: `${S3}/goog-photos/ejae.png`,
      alt: "Google Photos video recap campaign set design featuring EJAE",
      caption: "GOOGLE PHOTOS CAMPAIGN",
    },
    {
      id: 3,
      src: `${S3}/jennifersbody/jb4.png`,
      alt: "Jennifers Body pool scene recreation built by DripDome",
      caption: "JENNIFERS BODY POOL SET",
    },
    {
      id: 4,
      src: `${S3}/southside/ss1.png`,
      alt: "The Original Southside ad campaign styling and props",
      caption: "ORIGINAL SOUTHSIDE CAMPAIGN",
    },
    {
      id: 5,
      src: `${S3}/lesgc/view.jpg`,
      alt: "Lower East Side Girls Club charity event photo installation",
      caption: "LESGC PHOTO MOMENT",
    },
    {
      id: 6,
      src: `${S3}/SETDESIGN/sd_1.JPG`,
      alt: "Custom set design build for an editorial photoshoot",
      caption: "EDITORIAL SET BUILD",
    },
  ];

  return (
    <Box component="main" sx={{ bgcolor: NB_COLORS.paper, color: NB_COLORS.ink }}>
      <Box
        component="section"
        id="work-gallery"
        sx={{ bgcolor: NB_COLORS.paper, borderBottom: NB_RULE }}
      >
        {/* Section header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            px: { xs: 3, md: 6 },
            py: { xs: 3, md: 4 },
            borderBottom: NB_RULE,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              ...NB_DISPLAY_SX,
              fontSize: { xs: 32, sm: 48, lg: 64 },
              color: NB_COLORS.ink,
            }}
          >
            OUR WORK
          </Typography>
          <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
            VIDEO + PHOTO · CONTACT SHEET
          </Typography>
        </Box>

        {/* Intro band */}
        <Box sx={{ px: { xs: 3, md: 6 }, py: { xs: 2, md: 2.5 }, borderBottom: NB_RULE }}>
          <Typography
            component="p"
            sx={{ fontSize: { xs: 14, md: 16 }, color: NB_COLORS.steel }}
          >
            Explore some of the amazing projects we&apos;ve worked on.
          </Typography>
        </Box>

        {/* Framed plates */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          {galleryImages.map((image, i) => (
            <Box
              key={image.id}
              sx={{
                bgcolor: NB_COLORS.well,
                borderRight: {
                  sm: i % 2 === 0 ? NB_RULE : "none",
                  md: (i + 1) % 3 !== 0 ? NB_RULE : "none",
                },
                borderBottom: {
                  xs: i < galleryImages.length - 1 ? NB_RULE : "none",
                  sm: i < galleryImages.length - 2 ? NB_RULE : "none",
                  md: i < galleryImages.length - 3 ? NB_RULE : "none",
                },
              }}
            >
              <Box sx={{ p: { xs: 2, md: 3 } }}>
                <Box
                  sx={{
                    position: "relative",
                    aspectRatio: "4 / 3",
                    border: NB_RULE,
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              </Box>
              <Box sx={{ px: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 } }}>
                <Typography
                  sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}
                >
                  FIG. {String(i + 1).padStart(2, "0")} · {image.caption}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
