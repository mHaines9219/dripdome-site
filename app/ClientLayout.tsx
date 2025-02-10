'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './ui/Navbar'; // Adjust the path to your Navbar component
import Footer from './ui/Footer'; // Adjust the path to your Footer component

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <>
      {pathname !== '/' && <Navbar />}
      {children}
      {/* <Footer /> */}
    </>
  );
}
