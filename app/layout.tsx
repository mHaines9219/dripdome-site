import type { Metadata, Viewport } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "./components/JsonLd";
import ThemeRegistry from "./ThemeRegistry";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dripdome.com"),
  title:
    "DripDome | Interior Design, Podcast Studio Builders, Experiential Design & Pop-Up Activations NYC",
  description:
    "DripDome is a premier interior design, podcast studio builders, and experiential design studio in NYC & LA. We specialize in pop-up activations, brand experiences, custom fabrication, and immersive environments for film, TV, commercials, and experiential marketing campaigns.",
  keywords:
    "interior design, podcast studio builders, set design, experiential design, pop-up activations, brand activations, experiential marketing, immersive experiences, pop-up shops, production design, fabrication, New York City, NYC, Los Angeles, custom fabrication, event design, trade show design, retail activations, interactive installations, brand experiences",
  openGraph: {
    title:
      "DripDome | Interior Design, Podcast Studio Builders, Experiential Design & Pop-Up Activations NYC",
    description:
      "Expert interior design, podcast studio builders, set design, experiential design, and pop-up activations in NYC & LA. Custom fabrication for film, TV, brand activations, and immersive experiences.",
    type: "website",
    locale: "en_US",
    siteName: "DripDome",
    images: [
      {
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
        width: 1200,
        height: 630,
        alt: "DripDome | Interior Design, Podcast Studio Builders, Experiential Design & Pop-Up Activations NYC",
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
    title:
      "DripDome | Interior Design, Podcast Studio Builders, Experiential Design & Pop-Up Activations NYC",
    description:
      "Expert interior design, podcast studio builders, set design, experiential design, and pop-up activations in NYC & LA. Custom fabrication for film, TV, brand activations, and immersive experiences.",
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
    ],
  },
  alternates: {
    canonical: "https://www.dripdome.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sourceSans.variable}>
      <head>
        <JsonLd />
      </head>
      <body className={sourceSans.className}>
        <ThemeRegistry>
          <ClientLayout>
            {children}
            <Analytics />
          </ClientLayout>
        </ThemeRegistry>
      </body>
    </html>
  );
}
