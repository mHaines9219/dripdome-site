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

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "ABOUT US", href: "/about-us" },
    { name: "PORTFOLIO", href: "/portfolio" },
    { name: "SERVICES", href: "/services" },
    { name: "RENTALS", href: "/rentals" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <AppBar
        component="nav"
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "black",
          left: 0,
          right: 0,
          width: "100%",
          maxWidth: 2000,
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
                bgcolor: "rgba(0,0,0,0.6)",
                borderRadius: 2,
                p: 1,
                "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
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
                  alt="Company Logo"
                  src="/assets/dd_logo.png"
                  width={100}
                  height={100}
                  priority
                />
              </Box>
            </Box>

            <IconButton
              aria-label="Open navigation menu"
              onClick={toggleMenu}
              sx={{ display: { md: "none" }, mr: 1.5, color: "common.white" }}
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
                      color: "common.white",
                      fontSize: 18,
                      fontWeight: 600,
                      borderRadius: 0,
                      borderBottom: isActive
                        ? "2px solid #FF00AA"
                        : "2px solid transparent",
                      "&:hover": { color: "#FF00AA", bgcolor: "transparent" },
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
            bgcolor: "black",
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
              <ListItem key={link.name} disablePadding sx={{ my: 0.75 }}>
                <ListItemButton
                  component={Link}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  sx={{
                    bgcolor: "rgba(0,0,0,0.7)",
                    borderRadius: 2,
                    "&:hover": { color: "#FF00AA" },
                  }}
                >
                  <ListItemText
                    primary={link.name}
                    primaryTypographyProps={{
                      align: "center",
                      fontSize: 22,
                      fontWeight: 600,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Spacer so content isn't hidden behind the fixed AppBar */}
      <Box sx={{ height: { xs: 95, md: 120 } }} />
    </>
  );
}
