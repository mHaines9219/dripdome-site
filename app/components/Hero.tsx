import React from 'react';
import { Typography } from '@mui/material';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative h-full w-full mb-auto">
      {/* Video Background */}
      <video
        preload="auto"
        src="https://dripdome-site.s3.us-east-2.amazonaws.com/1223.mp4"
        loop
        autoPlay
        playsInline
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        Your browser does not support the video tag.
      </video>

      {/* Buttons Overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="relative grid grid-cols-2 gap-4">
          {/* Button 1 */}
          <button className="bg-black bg-opacity-40 border-2 text-white px-2 py-3 rounded-md shadow-md hover:bg-blue-600 transition mx-2">
            <Typography
              variant="body2"
              component="p"
              sx={{
                fontSize: { xs: '20px' },
              }}
            >
              FABRICATION{' '}
            </Typography>
          </button>
          {/* Button 2 */}
          <button className="bg-black bg-opacity-40 border-2 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition mx-2">
            <Link href="/photo">
              <Typography
                variant="body2"
                component="p"
                sx={{
                  fontSize: { xs: '20px' },
                }}
              >
                PHOTO{' '}
              </Typography>
            </Link>
          </button>
          {/* Button 3 */}
          <button className="bg-black bg-opacity-40 border-2 text-white px-2 py-3 rounded-md shadow-md hover:bg-blue-600 transition mx-2">
            <Typography
              variant="body2"
              component="p"
              sx={{
                fontSize: { xs: '20px' },
              }}
            >
              CONVENTIONS{' '}
            </Typography>
          </button>
          {/* Button 4 */}
          <button className="bg-black bg-opacity-40 border-2 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition mx-2">
            <Typography
              variant="body2"
              component="p"
              sx={{
                fontSize: { xs: '20px' },
              }}
            >
              VIDEO{' '}
            </Typography>
          </button>
        </div>
      </div>
    </div>
  );
}
