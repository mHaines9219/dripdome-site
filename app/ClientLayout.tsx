'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './ui/Navbar';

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
    </>
  );
}
