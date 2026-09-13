"use client";

import React from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./ui/Navbar";
import PageFrame from "./components/PageFrame";
// Chatbot temporarily disabled — not working in prod
// import Chatbot from "./components/Chatbot";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <PageFrame>{children}</PageFrame>
      {/* <Chatbot /> */}
    </MotionConfig>
  );
}
