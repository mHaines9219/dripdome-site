'use client';
import './globals.css';
import Link from 'next/link';
import Hero from './components/Hero';
import { Typography } from '@mui/material';
import Image from 'next/image';
import LogoComponent from './components/LogoComponent';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import HomeBlurb from './components/HomeBlurb';

export default function Home() {
  return (
    <main className="main-container text-white  overflow-x-hidden">
      <section className="hero-container flex flex-col items-center justify-center h-[75dvh]  ">
        <Hero />
      </section>

      <section
        id="services"
        className="flex flex-col items-center justify-center text-center px-8 bg-black p  "
      >
        <HomeBlurb />
      </section>
      {/* <section
        id="about"
        className="flex flex-col items-center justify-center text-center px-8 bg-black h-80  "
      >
        <AboutUs />
      </section> */}
      <LogoComponent />

      <section id="contact" className="pt-8 pb-8  px-8 bg-black text-white">
        <Contact />
      </section>
    </main>
  );
}
