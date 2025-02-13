import React from 'react';
import Link from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <footer className="bg-black ">
      <div className="container mx-auto px-4">
        <div className="flex  md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4  md:mb-0">
            <Link
              href="https://instagram.com/dripdome"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-gray-600 hover:text-gray-800">
                <Link href="/" className="flex items-center space-x-3">
                  <InstagramIcon
                    style={{ height: '45px', width: '45px' }}
                    className="h-[45px] w-[45px] rounded-xl bg-black bg-opacity-60 p-2"
                  />
                </Link>
              </div>
            </Link>
          </div>
          <div className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Drip Dome Productions.
          </div>
          <Link href="/privacy" className=" text-sm text-gray-500 ">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
