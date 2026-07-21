"use client";

import { useState } from "react";
import { Box, ButtonBase, Typography, Collapse } from "@mui/material";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Contact from "../components/Contact";
import {
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_FOCUS_VISIBLE_SX,
  NB_MONO_SX,
  NB_OUTLINE_TEXT_SX,
  NB_RULE,
} from "@/lib/theme";

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
        sx={{
          borderBottom: NB_RULE,
          color: NB_COLORS.ink,
          bgcolor: isExpanded ? NB_COLORS.silverLight : NB_COLORS.paper,
        }}
      >
        <ButtonBase
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={`service-details-${service.number}`}
          sx={{
            ...NB_FOCUS_VISIBLE_SX,
            width: "100%",
            px: { xs: 3, md: 6 },
            py: { xs: 2.5, md: 3 },
            borderRadius: 0,
            color: "inherit",
            textAlign: "left",
            display: "grid",
            gridTemplateColumns: { xs: "auto 1fr auto", md: "100px 1fr auto" },
            alignItems: "start",
            gap: { xs: 2, md: 3 },
            "&:hover": {
              bgcolor: NB_COLORS.ink,
              color: NB_COLORS.paperOnInk,
              "& .svc-muted": { color: NB_COLORS.mutedOnInk },
            },
          }}
        >
          <Typography
            className="svc-muted"
            sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel, pt: 0.5 }}
          >
            SVC.{service.number}
          </Typography>
          <Box>
            <Typography
              variant="h3"
              sx={{
                ...NB_DISPLAY_SX,
                fontSize: { xs: 18, sm: 22, md: 26 },
                color: "inherit",
                mb: 1,
              }}
            >
              {service.title}
            </Typography>
            <Typography
              className="svc-muted"
              sx={{
                fontSize: { xs: 14, md: 16 },
                color: NB_COLORS.steel,
                lineHeight: 1.6,
              }}
            >
              {service.description}
            </Typography>
          </Box>
          <ExpandMoreIcon
            sx={{
              fontSize: 24,
              color: "inherit",
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </ButtonBase>

        <Collapse in={isExpanded} timeout={300} id={`service-details-${service.number}`}>
          <Box
            sx={{
              px: { xs: 3, md: 6 },
              pb: { xs: 2.5, md: 3 },
            }}
          >
            <Box
              sx={{
                pt: 2.5,
                ml: { md: "100px" },
                pl: { md: 3 },
                borderTop: "2px solid currentColor",
              }}
            >
            <Typography
              className="svc-muted"
              sx={{ ...NB_MONO_SX, fontSize: 11, color: NB_COLORS.steel, mb: 1.5 }}
            >
              INCLUDES
            </Typography>
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
                    color: "inherit",
                    fontSize: { xs: 13, md: 15 },
                    lineHeight: 1.6,
                    "&::marker": { color: "inherit" },
                  }}
                >
                  {detail}
                </Box>
              ))}
            </Box>
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
    <Box sx={{ bgcolor: NB_COLORS.paper, color: NB_COLORS.ink, minHeight: "100vh" }}>
      {/* Hero band */}
      <Box component="section" sx={{ bgcolor: NB_COLORS.paper, borderBottom: NB_RULE }}>
        <Box sx={{ px: { xs: 3, md: 6 }, py: { xs: 5, md: 8 }, maxWidth: 1440, mx: "auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel, mb: 2 }}>
              SERVICES INDEX · NYC + LA
            </Typography>
            <Typography
              variant="h1"
              sx={{
                ...NB_DISPLAY_SX,
                fontSize: { xs: 42, sm: 64, md: 80, lg: 96 },
                color: NB_COLORS.ink,
                mb: { xs: 3, md: 4 },
              }}
            >
              WHAT WE{" "}
              <Box component="span" sx={{ ...NB_OUTLINE_TEXT_SX }}>
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
                fontSize: { xs: 16, sm: 18, md: 20 },
                color: NB_COLORS.ink,
                maxWidth: 820,
                lineHeight: 1.7,
              }}
            >
              At{" "}
              <Box component="span" sx={{ fontWeight: 700 }}>
                Drip Dome Productions
              </Box>
              , we bring ideas to life through design, fabrication, and
              storytelling. Our studio blends creativity, technical skill, and
              resourceful problem solving to create sets, environments, and brand
              moments that stand out.
            </Typography>
          </motion.div>
        </Box>
      </Box>

      {/* Services index */}
      <Box component="section" sx={{ bgcolor: NB_COLORS.paper }}>
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
            sx={{
              ...NB_DISPLAY_SX,
              fontSize: { xs: 32, sm: 48, lg: 64 },
              color: NB_COLORS.ink,
            }}
          >
            OUR CORE SERVICES
          </Typography>
          <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
            11 LINES · TAP TO EXPAND
          </Typography>
        </Box>

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

      {/* CTA band */}
      <Box
        component="section"
        sx={{
          bgcolor: NB_COLORS.silver,
          borderBottom: NB_RULE,
          px: { xs: 3, md: 6 },
          py: { xs: 4, md: 6 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Typography
            variant="h2"
            sx={{
              ...NB_DISPLAY_SX,
              fontSize: { xs: 24, sm: 32, md: 40 },
              color: NB_COLORS.onSilver,
              mb: 2,
            }}
          >
            Ready to Build Something Amazing?
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, md: 18 },
              color: NB_COLORS.onSilver,
              maxWidth: 600,
            }}
          >
            From the first spark of an idea to the final reveal, we handle
            every detail. Let&apos;s create something unforgettable together.
          </Typography>
        </motion.div>
      </Box>

      {/* Contact Section */}
      <Box component="section" id="contact" sx={{ scrollMarginTop: { xs: 95, md: 120 } }}>
        <Contact />
      </Box>
    </Box>
  );
}
