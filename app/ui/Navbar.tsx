"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import {
  FONT_DISPLAY,
  NB_BUTTON_SX,
  NB_COLORS,
  NB_FOCUS_VISIBLE_SX,
  NB_MONO_SX,
  NB_RULE,
} from "@/lib/theme";

const links = [
  { name: "PODCAST STUDIOS", href: "/podcast-studios" },
  { name: "ACTIVATIONS", href: "/brand-activations" },
  { name: "OFFICE DESIGN", href: "/interior-office-design" },
  { name: "ABOUT", href: "/about-us" },
  { name: "BLOG", href: "/blog" },
  // Legacy pages kept live but out of nav: /portfolio, /services
  // Rentals page taken down from nav for now; route still live at /rentals
  // { name: "RENTALS", href: "/rentals" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AppBar
        component="nav"
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: NB_COLORS.paper,
          color: NB_COLORS.ink,
          borderBottom: NB_RULE,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 64, md: 76 },
            px: { xs: 2, md: 4 },
            gap: 2,
          }}
        >
          <Box
            component={Link}
            href="/"
            aria-label="DripDome home"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
              color: NB_COLORS.ink,
              mr: "auto",
            }}
          >
            <Typography
              sx={{
                fontFamily: FONT_DISPLAY,
                fontSize: { xs: 18, md: 22 },
                letterSpacing: "0.02em",
              }}
            >
              DRIPDOME
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", lg: "flex" } }}>
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Button
                  key={link.name}
                  component={Link}
                  href={link.href}
                  disableRipple
                  sx={{
                    ...NB_MONO_SX,
                    ...NB_FOCUS_VISIBLE_SX,
                    fontSize: 13,
                    fontWeight: 700,
                    borderRadius: 0,
                    px: 1.75,
                    py: 1,
                    color: isActive ? NB_COLORS.paperOnInk : NB_COLORS.ink,
                    bgcolor: isActive ? NB_COLORS.ink : "transparent",
                    "&:hover": {
                      bgcolor: NB_COLORS.ink,
                      color: NB_COLORS.paperOnInk,
                    },
                  }}
                >
                  {link.name}
                </Button>
              );
            })}
          </Box>

          <Button
            component={Link}
            href="/#contact"
            disableElevation
            sx={{
              ...NB_BUTTON_SX,
              display: "inline-flex",
              px: { xs: 1.75, md: 2.5 },
              py: 1,
              fontSize: 12,
            }}
          >
            <Box component="span" sx={{ display: { xs: "none", md: "inline" } }}>
              START A PROJECT
            </Box>
            <Box component="span" sx={{ display: { xs: "inline", md: "none" } }}>
              START
            </Box>
          </Button>

          <Button
            aria-label="Open navigation menu"
            onClick={() => setIsOpen(true)}
            disableRipple
            sx={{
              display: { xs: "inline-flex", lg: "none" },
              ...NB_MONO_SX,
              ...NB_FOCUS_VISIBLE_SX,
              fontSize: 13,
              fontWeight: 700,
              color: NB_COLORS.ink,
              border: NB_RULE,
              borderRadius: 0,
              px: 2,
              py: 0.75,
              "&:hover": {
                bgcolor: NB_COLORS.ink,
                color: NB_COLORS.paperOnInk,
              },
            }}
          >
            MENU
          </Button>
        </Toolbar>
      </AppBar>

      {/* Full-screen takeover menu */}
      <Drawer
        anchor="top"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: NB_COLORS.paper,
            color: NB_COLORS.ink,
            height: "100dvh",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1.5,
            borderBottom: NB_RULE,
          }}
        >
          <Typography sx={{ ...NB_MONO_SX, fontSize: 11 }}>
            DRIPDOME · INDEX
          </Typography>
          <IconButton
            aria-label="Close navigation menu"
            onClick={() => setIsOpen(false)}
            sx={{
              ...NB_FOCUS_VISIBLE_SX,
              color: NB_COLORS.ink,
              border: NB_RULE,
              borderRadius: 0,
              p: 0.75,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box component="nav" sx={{ flex: 1, overflowY: "auto" }}>
          {links.map((link, i) => (
            <Box
              key={link.name}
              component={Link}
              href={link.href}
              onClick={() => setIsOpen(false)}
              sx={{
                ...NB_FOCUS_VISIBLE_SX,
                display: "flex",
                alignItems: "baseline",
                gap: 2,
                px: 2.5,
                py: 2,
                borderBottom: NB_RULE,
                textDecoration: "none",
                color: NB_COLORS.ink,
                "&:hover": {
                  bgcolor: NB_COLORS.ink,
                  color: NB_COLORS.paperOnInk,
                },
              }}
            >
              <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel }}>
                {String(i + 1).padStart(2, "0")}
              </Typography>
              <Typography
                sx={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: { xs: 34, sm: 44 },
                  lineHeight: 1,
                  color: "inherit",
                }}
              >
                {link.name}
              </Typography>
            </Box>
          ))}

          <Box
            component={Link}
            href="/#contact"
            onClick={() => setIsOpen(false)}
            sx={{
              ...NB_FOCUS_VISIBLE_SX,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2.5,
              py: 2.5,
              bgcolor: NB_COLORS.ink,
              color: NB_COLORS.paperOnInk,
              textDecoration: "none",
              "&:hover": { bgcolor: NB_COLORS.steel },
            }}
          >
            <Typography
              sx={{ fontFamily: FONT_DISPLAY, fontSize: { xs: 34, sm: 44 }, lineHeight: 1 }}
            >
              START A PROJECT
            </Typography>
            <ArrowOutwardIcon sx={{ fontSize: 36 }} />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
