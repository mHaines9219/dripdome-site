'use client';
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

export default function Hero() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'HOME', href: '/' },
    { name: 'VIDEO/PHOTO', href: '/buildingdesigner' },
    { name: 'FABRICATION', href: '/portfolio' },
    { name: 'CONVENTIONS', href: '/finance' },
    { name: 'RENTALS', href: '/finance' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative h-screen w-full">
      {/* Navbar */}
      {pathname === '/' && (
        <nav className="absolute top-0 left-0 w-full bg-[var(--main-brown)] font-nova text-white z-50 h-[95px] flex items-center">
          <div className="w-full flex items-center justify-between md:justify-start mt-[19px] mb-[19px] pl-4">
            <Link href="/" className="flex items-center space-x-3">
              <HomeOutlinedIcon
                className="h-[45px] w-[45px] rounded-xl bg-black bg-opacity-70 p-2"
                alt="Shiner Steel Logo"
                width={40}
                height={40}
              />
            </Link>
            <button
              className="md:hidden text-white text-3xl bg-opacity-70 pb-2 px-2  mr-8 z-50 bg-black  rounded-xl"
              onClick={toggleMenu}
            >
              ☰
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex md:flex-row md:space-x-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  'flex h-[48px] items-center justify-center gap-2 p-3 text-sm font-medium transition hover:text-[var(--main-gold)] whitespace-nowrap',
                  {
                    'border-b-2 border-yellow-500': pathname === link.href,
                    'text-white': pathname !== link.href,
                  }
                )}
              >
                {link.name}
              </Link>
            ))}
          </ul>

          {/* Mobile Menu */}
          <ul
            className={clsx(
              'md:hidden absolute top-[95px] left-0 w-full bg-[var(--main-brown)] flex flex-col items-center justify-start transition-all ease-in-out duration-300 mt-24',
              {
                'opacity-100 pointer-events-auto': isOpen, // Show menu when open
                'opacity-0 pointer-events-none': !isOpen, // Hide menu when closed
              }
            )}
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xl font-medium text-white p-4 hover:text-[var(--main-gold)] transition bg-black bg-opacity-60 w-3/4 text-center my-1 rounded-xl"
                onClick={() => setIsOpen(false)} // Close menu after click
              >
                {link.name}
              </Link>
            ))}
          </ul>
        </nav>
      )}

      {/* Video Background */}
      <video
        preload="auto"
        src="https://dripdome-site.s3.us-east-2.amazonaws.com/1223.mp4"
        loop
        autoPlay
        playsInline
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
