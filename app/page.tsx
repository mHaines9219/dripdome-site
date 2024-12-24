'use client';
import './globals.css';
import Link from 'next/link';
import Hero from './components/Hero';
import { Typography } from '@mui/material';
import Image from 'next/image';
import LogoComponent from './components/LogoComponent';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';

export default function Home() {
  return (
    <main className="main-container text-white  ">
      <section className="hero-container flex flex-col items-center justify-center h-screen  ">
        <Hero />
        <LogoComponent />
      </section>

      <section
        id="about"
        className="flex flex-col items-center justify-center text-center px-8 bg-black h-96 "
      >
        <AboutUs />
      </section>

      <section id="contact" className="pb-12  px-8 bg-black text-white">
        <Contact />
      </section>
    </main>
  );
}
