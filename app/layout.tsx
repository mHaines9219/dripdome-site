import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "./components/JsonLd";
import ThemeRegistry from "./ThemeRegistry";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dripdome.com"),
  title:
    "DripDome | Set Design, Experiential Design & Pop-Up Activations NYC",
  description:
    "DripDome is a premier set design and experiential design studio in NYC & LA. We specialize in pop-up activations, brand experiences, custom fabrication, and immersive environments for film, TV, commercials, and experiential marketing campaigns.",
  keywords:
    "set design, experiential design, pop-up activations, brand activations, experiential marketing, immersive experiences, pop-up shops, production design, fabrication, New York City, NYC, Los Angeles, custom fabrication, event design, trade show design, retail activations, interactive installations, brand experiences",
  openGraph: {
    title:
      "DripDome | Set Design, Experiential Design & Pop-Up Activations NYC",
    description:
      "Expert set design, experiential design, and pop-up activations in NYC & LA. Custom fabrication for film, TV, brand activations, and immersive experiences.",
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
    title: "DripDome | Set Design & Experiential Design Studio",
    description:
      "Expert set design, experiential design, and pop-up activations in NYC & LA. Custom fabrication for film, TV, brand activations, and immersive experiences.",
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
    <html lang="en">
      <head>
        <JsonLd />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&family=Zalando+Sans+Expanded:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
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
