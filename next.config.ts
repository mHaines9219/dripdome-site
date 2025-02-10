import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dripdome-site.s3.us-east-2.amazonaws.com', // Replace with your S3 bucket's domain
        pathname: '**', // Allow all paths under the domain
      },
    ],
  },
};

export default nextConfig;
