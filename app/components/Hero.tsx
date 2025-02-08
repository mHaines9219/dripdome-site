'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

export default function Hero() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'ABOUT US', href: '/about-us' },
    { name: 'PORTFOLIO', href: '/portfolio' },
    { name: 'SERVICES', href: '/services' },
    // { name: 'CONVENTIONS', href: '/conventions' },
    { name: 'RENTALS', href: '/rentals' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative h-full w-full">
      {/* Navbar */}
      {pathname === '/' && (
        <nav className="absolute top-0 left-0 w-full bg-[var(--main-brown)] font-nova text-white z-50 h-[95px] flex items-center">
          <div className="w-full flex items-center justify-between mt-[19px] mb-[19px] pl-4">
            <Link href="/" className="flex items-center space-x-3">
              <HomeTwoToneIcon className="h-[45px] w-[45px] rounded-xl bg-black bg-opacity-60 p-2" />
            </Link>
            <button
              className="text-white text-3xl bg-opacity-60 pb-2 px-2 mr-8 z-50 bg-black rounded-xl"
              onClick={toggleMenu}
            >
              ☰
            </button>
          </div>

          {/* Mobile Menu */}
          <ul
            className={clsx(
              'absolute top-[95px] left-0 w-full bg-[var(--main-brown)] flex flex-col items-center justify-start transition-all ease-in-out duration-300 mt-24',
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
        src="https://dripdome-site.s3.us-east-2.amazonaws.com/dd_hero.mp4"
        loop
        autoPlay
        playsInline
        muted
        className="absolute top-0 left-0 w-full h-full object-cover lg:object-contain bg-black"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
