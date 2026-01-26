export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "DripDome",
    image: "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
    "@id": "https://www.dripdome.com",
    url: "https://www.dripdome.com",
    description:
      "DripDome is a premier set design, experiential design, and pop-up activation studio in NYC & LA. We specialize in custom fabrication, brand activations, immersive experiences, and production design for film, television, commercials, and experiential marketing campaigns.",
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
    areaServed: ["New York City", "Los Angeles", "Brooklyn", "Manhattan"],
    priceRange: "$$$",
    sameAs: [
      "https://www.instagram.com/dripdome",
      // Add other social media links here
    ],
    serviceType: [
      "Set Design",
      "Experiential Design",
      "Pop-Up Activations",
      "Brand Activations",
      "Production Design",
      "Custom Fabrication",
      "Immersive Experiences",
      "Event Design",
      "Trade Show Design",
      "Retail Activations",
      "Interactive Installations",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
