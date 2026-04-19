import type { Metadata, Viewport } from "next";
import { Source_Sans_3 } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "./components/JsonLd";
import ThemeRegistry from "./ThemeRegistry";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

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
        <Script
          id="google-ads-gtag"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18099031816"
          strategy="afterInteractive"
          async
        />
        <Script id="google-ads-gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18099031816');`}
        </Script>
        <JsonLd />
        {GTM_ID && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
      </head>
      <body className={sourceSans.className}>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
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
