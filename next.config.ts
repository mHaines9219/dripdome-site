import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dripdome-site.s3.us-east-2.amazonaws.com', // Replace with your S3 bucket's domain
        pathname: '**', // Allow all paths under the domain
      },
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
