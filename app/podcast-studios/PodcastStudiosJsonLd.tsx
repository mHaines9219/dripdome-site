export default function PodcastStudiosJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Podcast Studio Design and Build",
    serviceType: "Podcast Studio Fabrication",
    description:
      "Turnkey podcast studio builder. Studio design, custom fabrication, lighting, and wiring, all in house. Permanent camera-ready podcast sets in NYC and LA.",
    url: "https://www.dripdome.com/podcast-studios",
    areaServed: ["New York City", "Manhattan", "Brooklyn", "Los Angeles"],
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://www.dripdome.com",
      name: "DripDome",
      url: "https://www.dripdome.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
