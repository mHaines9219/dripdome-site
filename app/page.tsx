'use client';
import './globals.css';
import Link from 'next/link';
import Hero from './components/Hero';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import LogoComponent from './components/LogoComponent';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import HomeBlurb from './components/HomeBlurb';
import PageButtons from './components/PageButtons';
import LogoWall from './components/LogoWall';

export default function Home() {
  return (
    <main className="main-container text-white  overflow-x-hidden">
      <section className="hero-container flex flex-col items-center justify-center h-[75dvh]  ">
        <Hero />
      </section>

      <section
        id="home"
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
      {/* <LogoComponent /> */}
      <LogoWall />
      {/* <Box
        sx={{
          display: 'flex',
          fontSize: '30px',
          mt: 2,
          bgcolor: 'black',

          color: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          textAlign: 'center',
          fontFamily: 'Shrikhand',
          width: '100%',
          height: '70px',
          transition: 'background-color 1s ease, color 1s ease',

          '&:hover': {
            bgcolor: 'white',
            color: 'black', // Change text color on hover
          },
          '&:active': {
            bgcolor: 'white', // only while clicking
          },
        }}
      >
        <Link href="/portfolio">PORTFOLIO</Link>
      </Box> */}

      <PageButtons />
      <section id="contact" className="pt-8 pb-8  px-8 bg-black text-white">
        <Contact />
      </section>
    </main>
  );
}
