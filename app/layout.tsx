import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Archivo_Black, IBM_Plex_Mono } from "next/font/google";
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

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dripdome.com"),
  title:
    "DripDome | Set Design, Podcast Studio Builds & Brand Activations | NYC + LA",
  description:
    "DripDome is a women-owned set design and custom fabrication studio in NYC & LA. We design and build permanent podcast studios, brand activations, pop-ups, and immersive environments. 30M+ views on our set builds. Trusted by Google.",
  keywords:
    "set design, podcast studio builders, podcast studio design, brand activations, custom fabrication, experiential design, pop-up activations, experiential marketing, immersive experiences, production design, New York City, NYC, Los Angeles, event design, trade show design, retail activations, interactive installations, brand experiences",
  openGraph: {
    title:
      "DripDome | Set Design, Podcast Studio Builds & Brand Activations | NYC + LA",
    description:
      "Women-owned set design and custom fabrication studio in NYC & LA. Podcast studios, brand activations, and immersive environments designed, built, and installed in-house.",
    type: "website",
    locale: "en_US",
    siteName: "DripDome",
    images: [
      {
        url: "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_1.JPG",
        width: 1200,
        height: 630,
        alt: "DripDome set build for the NotLoveline podcast studio",
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
      "DripDome | Set Design, Podcast Studio Builds & Brand Activations | NYC + LA",
    description:
      "Women-owned set design and custom fabrication studio in NYC & LA. Podcast studios, brand activations, and immersive environments designed, built, and installed in-house.",
    images: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_1.JPG",
    ],
  },
  alternates: {
    canonical: "https://www.dripdome.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#131313",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${archivoBlack.variable} ${plexMono.variable}`}
    >
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
