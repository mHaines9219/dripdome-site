'use client';
import React from 'react';
import AboutUs from '../components/AboutUs';
import FoundersSection from '../components/FoundersSection';
import Contact from '../components/Contact';

export default function page() {
  return (
    <div>
      <AboutUs />
      <FoundersSection />
      <div className="bg-black  py-10">
        <Contact />
      </div>
    </div>
  );
}
