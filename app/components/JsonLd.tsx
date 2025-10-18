export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "DripDome",
    image: "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
    "@id": "https://www.dripdome.com",
    url: "https://www.dripdome.com",
    description:
      "DripDome is a premier set design and production design studio based in New York City. Our team specializes in professional fabrication and creative services for film, television, commercial, and experiential projects.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "New York",
      addressRegion: "NY",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.7128,
      longitude: -74.006,
    },
    areaServed: ["New York City", "Los Angeles"],
    priceRange: "$$$",
    sameAs: [
      "https://www.instagram.com/dripdome",
      // Add other social media links here
    ],
    serviceType: [
      "Set Design",
      "Production Design",
      "Fabrication",
      "Creative Services",
      "Studio Services",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
