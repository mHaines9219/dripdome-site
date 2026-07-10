"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { ACCENT, INK, PAPER, nbShadow } from "@/lib/theme";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isOverlay = pathname === "/brand-activations" || pathname === "/";

  const links = [
    { name: "ABOUT US", href: "/about-us" },
    { name: "PORTFOLIO", href: "/portfolio" },
    { name: "SERVICES", href: "/services" },
    { name: "ACTIVATIONS", href: "/brand-activations" },
    { name: "RENTALS", href: "/rentals" },
    { name: "BLOG", href: "/blog" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <AppBar
        component="nav"
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: INK,
          borderBottom: `4px solid ${ACCENT}`,
          left: 0,
          right: 0,
          width: "100%",

          mx: "auto",
          color: "common.white",
          height: { xs: 95, md: 120 },
          justifyContent: "center",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          px: { md: 5.5 },
        }}
      >
        <Container
          maxWidth={false}
          sx={{ maxWidth: 2000, px: { xs: 2, md: 0 } }}
        >
          <Toolbar disableGutters sx={{ minHeight: "unset" }}>
            <IconButton
              component={Link}
              href="/"
              aria-label="Home"
              sx={{
                display: { md: "none" },
                ml: 0.5,
                borderRadius: 0,
                border: `2px solid ${PAPER}`,
                color: "common.white",
                p: 1,
                "&:hover": { bgcolor: ACCENT, color: INK, borderColor: PAPER },
              }}
            >
              <HomeTwoToneIcon sx={{ width: 28, height: 28 }} />
            </IconButton>

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                alignItems: "center",
              }}
            >
              <Box
                component={Link}
                href="/"
                aria-label="DripDome home"
                sx={{ display: "inline-flex", ml: { md: 2 } }}
              >
                <Image
                  alt="DripDome - Set Design & Production Design Studio"
                  src="/assets/dd_logo_200.png"
                  width={100}
                  height={100}
                  priority
                />
              </Box>
            </Box>

            <IconButton
              aria-label="Open navigation menu"
              onClick={toggleMenu}
              sx={{
                display: { md: "none" },
                mr: 1.5,
                color: "common.white",
                borderRadius: 0,
                border: `2px solid ${PAPER}`,
                "&:hover": { bgcolor: ACCENT, color: INK },
              }}
            >
              <MenuIcon sx={{ width: 32, height: 32 }} />
            </IconButton>

            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Button
                    key={link.name}
                    component={Link}
                    href={link.href}
                    sx={{
                      color: isActive ? INK : "common.white",
                      bgcolor: isActive ? ACCENT : "transparent",
                      fontSize: 17,
                      fontWeight: 700,
                      borderRadius: 0,
                      px: 1.75,
                      border: isActive
                        ? `2px solid ${PAPER}`
                        : "2px solid transparent",
                      boxShadow: isActive ? nbShadow(3, PAPER) : "none",
                      "&:hover": {
                        bgcolor: ACCENT,
                        color: INK,
                        border: `2px solid ${PAPER}`,
                        boxShadow: nbShadow(3, PAPER),
                      },
                    }}
                  >
                    {link.name}
                  </Button>
                );
              })}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="top"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: INK,
            color: "common.white",
            height: "100vh",
          },
        }}
      >
        <Box
          role="presentation"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
          }}
        >
          <List sx={{ width: "100%", maxWidth: 420 }}>
            {links.map((link) => (
              <ListItem key={link.name} disablePadding sx={{ my: 1.25 }}>
                <ListItemButton
                  component={Link}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  sx={{
                    bgcolor: INK,
                    borderRadius: 0,
                    border: `3px solid ${PAPER}`,
                    boxShadow: nbShadow(5, ACCENT),
                    "&:hover": {
                      bgcolor: ACCENT,
                      color: INK,
                      boxShadow: nbShadow(5, PAPER),
                    },
                  }}
                >
                  <ListItemText
                    primary={link.name}
                    primaryTypographyProps={{
                      align: "center",
                      fontSize: 22,
                      fontWeight: 700,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Spacer so content isn't hidden behind the fixed AppBar.
          Skipped on overlay routes where the hero intentionally sits under the navbar. */}
      {!isOverlay && <Box sx={{ height: { xs: 95, md: 120 } }} />}
    </>
  );
}
