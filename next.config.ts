import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // Placeholder.com
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos', // Lorem Picsum
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com', // Unsplash Source
      },
    ],
  },
};

export default nextConfig;
