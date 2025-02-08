import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ThemeProviderWrapper from './ThemeProviderWrapper';
import Navbar from './ui/Navbar';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title:
    'DripDome | Set Design & Production Design Collective in Los Angeles and NYC',
  description:
    'Premier set design and production design studio in Los Angeles. Professional fabrication and creative services for media professionals. Custom solutions for film, television, and commercial projects.',
  keywords:
    'set design, production design, Los Angeles, fabrication, creative services, media production, studio services, custom sets, film sets, TV production',
  openGraph: {
    title: 'DripDome | Set Design & Production Design Studio Los Angeles',
    description:
      'Professional set design, production design, and fabrication services in Los Angeles.',
    type: 'website',
    locale: 'en_US',
    siteName: 'DripDome',
    images: [
      {
        url: 'https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png',
        width: 1200,
        height: 630,
        alt: 'DripDome Set Design & Production in Los Angeles',
      },
    ],
  },
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <ThemeProviderWrapper>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
