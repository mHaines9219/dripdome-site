"use client";

import React from "react";
import Navbar from "./ui/Navbar";
import Chatbot from "./components/Chatbot";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Chatbot />
    </>
  );
}
