import './globals.css';
import Link from 'next/link';
import Hero from './components/Hero';
import { Typography } from '@mui/material';
import Image from 'next/image';

export default function Home() {
  return (
    <main className=" text-white  ">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="hero-container flex flex-col items-center justify-center h-screen ">
        <Hero />
        <div className="flex justify-center  ">
          <Image
            src="/assets/mobile_logo_1.png"
            alt="logos"
            width={350}
            height={300}
            className=" "
          />
        </div>
      </section>
      {/* <Typography
        variant="h2"
        component="h2"
        color="primary"
        sx={{
          fontSize: {},
        }}
      >
        dripdome
      </Typography> */}
      {/* {/* About Section */}
      <section id="about" className=" px-8">
        <Typography
          variant="h1"
          component="h1"
          color="primary"
          sx={{
            fontSize: { xs: '70px', md: '80px', lg: '96px' }, // Define different font sizes for different breakpoints
            fontWeight: 'bold', // Optional: Adjust font weight
            lineHeight: 1.2, // Optional: Adjust line height
          }}
        >
          About Us
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          color="primary"
          sx={{
            fontSize: { sm: '40px', md: '80px', lg: '96px' }, // Define different font sizes for different breakpoints
            fontWeight: 'bold', // Optional: Adjust font weight
            lineHeight: 1.2, // Optional: Adjust line height
          }}
        >
          Trusted by visionaries, creators, and industry professionals.
        </Typography>
        <Typography
          variant="p"
          component="p"
          color="primary"
          sx={{
            fontSize: { sm: '40px', md: '80px', lg: '96px' }, // Define different font sizes for different breakpoints
            fontWeight: 'bold', // Optional: Adjust font weight
            lineHeight: 1.2, // Optional: Adjust line height
          }}
        >
          We bring bold ideas to life with stunning set designs, interactive art
          installations, and custom props. From immersive activations for
          conventions to show-stopping sets for music videos and unforgettable
          party pieces, we turn your wildest concepts into reality. Let’s build
          something extraordinary together.{' '}
        </Typography>
      </section>
      {/* Music Section */}
      <section id="music" className="pt-12 px-8">
        {/* <h2 className="text-3xl font-bold mb-4">Our Music</h2> */}
      </section>
      {/* Tour Dates Section */}
      <section
        id="tour"
        className="flex flex-col text-center  py-8 px-8 justify-center"
      ></section>
      <section
        id="press"
        className="flex flex-col text-center  py-8 px-8 justify-center"
      ></section>
      {/* Merch Section */}
      {/* <section id="merch" className="py-4 px-8 bg-gray-800">
        <h2 className="text-3xl font-bold mb-4">Merch</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-700 rounded-md">T-shirt</div>
          <div className="p-4 bg-gray-700 rounded-md">Vinyl</div>
        </div>
      </section> */}
      {/* Contact Section */}
      {/* <section id="contact" className="py-16 px-8">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <form className="flex flex-col">
          <input
            className="mb-4 p-2 rounded-md bg-gray-700"
            type="text"
            placeholder="Your Name"
          />
          <textarea
            className="mb-4 p-2 rounded-md bg-gray-700"
            placeholder="Your Message"
          ></textarea>
          <button className="bg-blue-500 px-6 py-2 rounded-md">Send</button>
        </form>
      </section> */}
    </main>
  );
}
