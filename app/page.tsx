'use client';
import './globals.css';
import Link from 'next/link';
import Hero from './components/Hero';
import { Typography } from '@mui/material';
import Image from 'next/image';
import LogoComponent from './components/LogoComponent';
import AboutUs from './components/AboutUs';

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

      <section id="contact" className="py-16 px-8 bg-gray-900 text-white">
        <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
        <form
          className="flex flex-col max-w-md mx-auto"
          onSubmit={async (e) => {
            e.preventDefault();

            // Form Data
            const formData = {
              name: (e.target as any).name.value,
              email: (e.target as any).email.value,
              message: (e.target as any).message.value,
            };

            try {
              const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });

              if (response.ok) {
                alert('Thank you! Your message has been sent.');
                (e.target as any).reset(); // Clear the form
              } else {
                throw new Error('Failed to send message');
              }
            } catch (error) {
              alert('An error occurred. Please try again.');
            }
          }}
        >
          <input
            className="mb-4 p-3 rounded-md bg-gray-800 text-white"
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />
          <input
            className="mb-4 p-3 rounded-md bg-gray-800 text-white"
            type="email"
            name="email"
            placeholder="Your Email"
            required
          />
          <textarea
            className="mb-4 p-3 rounded-md bg-gray-800 text-white"
            name="message"
            rows={4}
            placeholder="Your Message"
            required
          ></textarea>
          <button
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md font-semibold transition duration-200"
            type="submit"
          >
            Send
          </button>
        </form>
      </section>
    </main>
  );
}
