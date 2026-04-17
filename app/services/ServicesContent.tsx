"use client";

import { useState } from "react";
import { Box, Typography, Collapse, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Contact from "../components/Contact";
import { BRAND_GRADIENT_TEXT_SX } from "@/lib/theme";

const services = [
  {
    number: "01",
    title: "Production Design",
    description:
      "Full visual world building for photo, video, music, and branded content.",
    details: [
      "Full visual concept creation for photo, video, commercials, and branded content",
      "Art department leadership",
      "Sourcing, styling, and creative oversight",
    ],
  },
  {
    number: "02",
    title: "Brand Activations & Experiential",
    description:
      "Pop ups, retail displays, immersive environments, and experiential moments.",
    details: [
      "Pop ups",
      "Immersive environments",
      "Event installations",
      "Retail window displays",
      "Festival and convention booth design",
    ],
  },
  {
    number: "03",
    title: "Custom Fabrication",
    description:
      "Carpentry, scenic, custom props, foam carving, flats, platforms, and specialty builds.",
    details: [
      "Carpentry builds",
      "Custom props",
      "Foam carving",
      "Scenic painting",
      "Freestanding walls, flats, platforms, and stage pieces",
      "Signage and branded elements",
    ],
  },
  {
    number: "04",
    title: "CNC Routing",
    description:
      "Precision cutting and custom shapes for signage, props, and detailed fabrication work.",
    details: [
      "Custom signage and lettering",
      "Precision-cut props and set pieces",
      "Intricate patterns and detailed cutouts",
      "Wood, foam, acrylic, and composite materials",
      "Prototyping and production runs",
    ],
  },
  {
    number: "05",
    title: "3D Printing",
    description:
      "Rapid prototyping and custom parts for props, set pieces, and specialty elements.",
    details: [
      "Custom prop fabrication",
      "Rapid prototyping",
      "Scaled models and miniatures",
      "Specialty hardware and fittings",
      "Complex geometries and detailed pieces",
    ],
  },
  {
    number: "06",
    title: "Vinyl Services",
    description:
      "Custom decals, wall and floor vinyl, branded graphics, and specialty textures.",
    details: [
      "Custom vinyl decals",
      "Wall, floor, and prop vinyl applications",
      "Branding for events, activations, and retail",
      "Specialty finishes and textures",
    ],
  },
  {
    number: "07",
    title: "Set Design",
    description:
      "Concepts, design decks, 3D renderings, and on site art direction.",
    details: [
      "Concept development",
      "Creative direction",
      "Mood boards and design decks",
      "3D renderings and SketchUp models",
      "On-site art direction",
    ],
  },
  {
    number: "08",
    title: "Photo & Video Set Builds",
    description:
      "Campaign sets, e-commerce, studio backdrops, and performance builds.",
    details: [
      "Campaign sets",
      "E-commerce sets",
      "Music video + performance environments",
      "Interview and studio backdrops",
    ],
  },
  {
    number: "09",
    title: "Content Production Support",
    description:
      "Behind the scenes, timelapses, and brand friendly social content.",
    details: [
      "From render to reality behind the scenes",
      "Build timelapses",
      "Studio content for product launches",
      "Social content creation for brands",
    ],
  },
  {
    number: "10",
    title: "Styling & Artful Details",
    description:
      "Prop styling, scenic finishing, hand painted textures, and custom color palettes.",
    details: [
      "Prop styling",
      "Scenic finishing",
      "Hand painted textures",
      "Custom color palettes",
      "Micro set styling for tabletop shoots",
    ],
  },
  {
    number: "11",
    title: "Creative Consulting",
    description:
      "Concept development, budget friendly solutions, sourcing, and pre-production support.",
    details: [
      "Budget friendly concept solutions",
      "Brand storytelling",
      "Pre-production planning",
      "Vendor and material sourcing",
    ],
  },
];

interface ServiceCardProps {
  service: (typeof services)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function ServiceCard({
  service,
  index,
  isExpanded,
  onToggle,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Box
        onClick={onToggle}
        sx={{
          cursor: "pointer",
          position: "relative",
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 3,
          bgcolor: "rgba(255,255,255,0.03)",
          border: "1px solid",
          borderColor: isExpanded
            ? "rgba(229,199,103,0.5)"
            : "rgba(255,255,255,0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.06)",
            borderColor: isExpanded
              ? "rgba(229,199,103,0.7)"
              : "rgba(255,255,255,0.2)",
            transform: "translateY(-2px)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: { xs: "12px", md: "14px" },
                  fontWeight: 700,
                  color: "#E5C767",
                  letterSpacing: "0.1em",
                }}
              >
                {service.number}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "18px", sm: "22px", md: "26px" },
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1.2,
                }}
              >
                {service.title}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "14px", md: "16px" },
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.6,
              }}
            >
              {service.description}
            </Typography>
          </Box>
          <IconButton
            size="small"
            sx={{
              color: "rgba(255,255,255,0.5)",
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        <Collapse in={isExpanded} timeout={300}>
          <Box
            sx={{
              mt: 2.5,
              pt: 2.5,
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Box
              component="ul"
              sx={{
                m: 0,
                pl: { xs: 2, md: 3 },
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {service.details.map((detail, idx) => (
                <Box
                  component="li"
                  key={idx}
                  sx={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: { xs: "13px", md: "15px" },
                    lineHeight: 1.6,
                    "&::marker": {
                      color: "#E5C767",
                    },
                  }}
                >
                  {detail}
                </Box>
              ))}
            </Box>
          </Box>
        </Collapse>
      </Box>
    </motion.div>
  );
}

export default function ServicesContent() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Box sx={{ bgcolor: "black", overflow: "hidden", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          pt: { xs: 6, md: 10 },
          pb: { xs: 4, md: 8 },
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
              fontWeight: 800,
              color: "white",
              textAlign: "center",
              mb: { xs: 3, md: 4 },
              letterSpacing: "-0.02em",
            }}
          >
            WHAT WE{" "}
            <Box
              component="span"
              sx={{ display: "inline", ...BRAND_GRADIENT_TEXT_SX }}
            >
              DO
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
              color: "rgba(255,255,255,0.85)",
              textAlign: "center",
              maxWidth: "900px",
              mx: "auto",
              lineHeight: 1.7,
              mb: { xs: 2, md: 3 },
            }}
          >
            At{" "}
            <Box component="span" sx={{ color: "#E5C767", fontWeight: 600 }}>
              Drip Dome Productions
            </Box>
            , we bring ideas to life through design, fabrication, and
            storytelling. Our studio blends creativity, technical skill, and
            resourceful problem solving to create sets, environments, and brand
            moments that stand out.
          </Typography>
        </motion.div>
      </Box>

      {/* Core Services Header */}
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, md: 6 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: { xs: 3, md: 4 },
            }}
          >
            <Box
              sx={{
                height: "2px",
                flex: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(229,199,103,0.5))",
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: "12px", md: "14px" },
                fontWeight: 700,
                color: "#E5C767",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Our Core Services
            </Typography>
            <Box
              sx={{
                height: "2px",
                flex: 1,
                background:
                  "linear-gradient(90deg, rgba(229,199,103,0.5), transparent)",
              }}
            />
          </Box>
        </motion.div>
      </Box>

      {/* Services Grid */}
      <Box
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
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: { xs: 2, md: 3 },
          }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </Box>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          pb: { xs: 6, md: 10 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Box
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              background:
                "linear-gradient(135deg, rgba(229,199,103,0.1) 0%, rgba(59,130,246,0.1) 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "24px", sm: "32px", md: "40px" },
                fontWeight: 700,
                color: "white",
                mb: 2,
              }}
            >
              Ready to Build Something Amazing?
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "14px", md: "18px" },
                color: "rgba(255,255,255,0.7)",
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              From the first spark of an idea to the final reveal, we handle
              every detail. Let&apos;s create something unforgettable together.
            </Typography>
          </Box>
        </motion.div>
      </Box>

      {/* Contact Section */}
      <Box component="section" id="contact" sx={{ py: { xs: 6, md: 10 } }}>
        <Contact />
      </Box>
    </Box>
  );
}
