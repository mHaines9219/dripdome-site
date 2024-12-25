'use client';

import React from 'react';

export default function VideoPhoto() {
  // Placeholder data for the gallery
  const galleryImages = [
    { id: 1, src: '/images/work1.jpg', alt: 'Project 1', caption: 'Project 1' },
    { id: 2, src: '/images/work2.jpg', alt: 'Project 2', caption: 'Project 2' },
    { id: 3, src: '/images/work3.jpg', alt: 'Project 3', caption: 'Project 3' },
    { id: 4, src: '/images/work4.jpg', alt: 'Project 4', caption: 'Project 4' },
    { id: 5, src: '/images/work5.jpg', alt: 'Project 5', caption: 'Project 5' },
  ];

  return (
    <section id="work-gallery" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Our Work
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Explore some of the amazing projects we've worked on.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group relative bg-white shadow-md rounded-md overflow-hidden"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {image.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
