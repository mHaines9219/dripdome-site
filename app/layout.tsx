import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProviderWrapper from "./ThemeProviderWrapper";
import Navbar from "./ui/Navbar";
import ClientLayout from "./ClientLayout";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "./components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dripdome.com"),
  title:
    "DripDome | Set Design, Production Design & Fabrication Experts in New York City",
  description:
    "DripDome is a premier set design and production design studio based in New York City. Our team specializes in professional fabrication and creative services for film, television, commercial, and experiential projects. Custom-built sets and tailored production solutions for media professionals.",
  keywords:
    "set design, production design, fabrication, New York City, NYC, Manhattan, Brooklyn, Queens, custom fabrication, creative services, media production, studio services, custom sets, film sets, TV production, Los Angeles set design",
  openGraph: {
    title:
      "DripDome | Set Design, Production Design & Fabrication Studio in New York City",
    description:
      "Expert set design, production design, and fabrication services in New York City and Los Angeles. Custom solutions for film, TV, commercials, and events.",
    type: "website",
    locale: "en_US",
    siteName: "DripDome",
    images: [
      {
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
        width: 1200,
        height: 630,
        alt: "DripDome | Set Design, Production Design & Fabrication in NYC",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "DripDome | Set Design & Production Design Studio",
    description:
      "Expert set design, production design, and fabrication services in New York City and Los Angeles. Custom solutions for film, TV, commercials, and events.",
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
    ],
  },
  alternates: {
    canonical: "https://www.dripdome.com",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className={` antialiased`}>
        <ThemeProviderWrapper>
          <ClientLayout>
            {children}
            <Analytics />
          </ClientLayout>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
