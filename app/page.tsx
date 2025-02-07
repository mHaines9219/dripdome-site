'use client';
import './globals.css';
import Hero from './components/Hero';
import { Typography } from '@mui/material';
import Contact from './components/Contact';
import HomeBlurb from './components/HomeBlurb';
import PageButtons from './components/PageButtons';
import LogoWall from './components/LogoWall';

export default function Home() {
  return (
    <main className="main-container text-white  max-w-[1444px] overflow-hidden ">
      <section className="hero-container flex flex-col items-center justify-center h-[500px] overflow-x-hidden ">
        <Hero />
      </section>

      <section
        id="home"
        className="flex flex-col items-center justify-center text-center px-8 bg-black p  "
      >
        <HomeBlurb />
      </section>

      <div className="w-full flex justify-center items-center bg-white text-center mt-4 -mb-8 md:-mb-2">
        <Typography
          variant="h2"
          component="h2"
          color="black"
          sx={{
            fontSize: { xs: '30px', sm: '45px', lg: '50px' }, // Define different font sizes for different breakpoints
            fontWeight: 'bold', // Optional: Adjust font weight
            marginBottom: '15px',
            paddingLeft: '10px',
            paddingRight: '10px',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          PROJECTS WE'VE CONTRIBUTED TO
        </Typography>
      </div>
      <LogoWall />

      <PageButtons />
      <section id="contact" className="pt-8 pb-8  px-8 bg-black text-white">
        <Contact />
      </section>
    </main>
  );
}
