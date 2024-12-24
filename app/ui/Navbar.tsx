'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
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
    <nav className="bg-[var(--main-brown)]  font-nova text-white fixed top-0 left-0 w-screen z-50 h-[95px] flex items-center md:pr-[43px]">
      <div className="w-full flex items-center justify-between md:justify-start mt-[19px] mb-[19px] pl-4">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src=""
            className="h-[51px] w-[62px]"
            alt="Shiner Steel Logo"
            width={40}
            height={40}
          />
        </Link>
        <button
          className="md:hidden text-white mr-6 text-3xl pr-8 z-50"
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex md:flex-row md:space-x-4 bg-[var(--main-brown)]">
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
      {/* Mobile Menu */}
      <ul
        className={clsx(
          'md:hidden fixed top-0 -mt-12 left-0 w-screen h-screen flex flex-col items-center bg-black  justify-center bg-[var(--main-brown)] transition-all ease-in-out duration-300',
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
            className="text-xl font-medium text-white p-4 hover:text-[var(--main-gold)] transition bg-black w-3/4 text-center my-1 rounded-xl bg-opacity-70"
            onClick={() => setIsOpen(false)} // Close menu after click
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
}