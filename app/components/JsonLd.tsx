export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "DripDome",
    alternateName: ["Drip Dome Productions", "DRIPDOME PRODUCTIONS"],
    image: [
      "https://dripdome-site.s3.us-east-2.amazonaws.com/NLL/IMG_1.JPG",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/goog-photos/purple.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/lesgc/view.jpg",
      "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
    ],
    logo: "https://dripdome-site.s3.us-east-2.amazonaws.com/dripdome_logo.png",
    "@id": "https://www.dripdome.com",
    url: "https://www.dripdome.com",
    email: "info@dripdome.com",
    description:
      "DripDome is a women-owned set design and custom fabrication studio in NYC and LA. We design and build permanent podcast studios, brand activations, pop-ups, and immersive environments for film, television, commercials, and experiential marketing campaigns. Our set builds have generated over 20 million views.",
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
    areaServed: [
      "New York City",
      "Los Angeles",
      "Brooklyn",
      "Manhattan",
      "New York Metro Area",
      "Southern California",
    ],
    priceRange: "$$$",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "info@dripdome.com",
      areaServed: ["US"],
      availableLanguage: "English",
    },
    founder: [
      {
        "@type": "Person",
        name: "Diana Haines",
        jobTitle: "Co-Founder",
      },
      {
        "@type": "Person",
        name: "Patricia Kwiatkowski",
        jobTitle: "Co-Founder",
      },
      {
        "@type": "Person",
        name: "Matt Haines",
        jobTitle: "Co-Founder",
      },
    ],
    sameAs: [
      "https://www.instagram.com/dripdome",
      // Add other social media links here
    ],
    serviceType: [
      "Podcast Studio Design and Build",
      "Brand Activations",
      "Set Design",
      "Custom Fabrication",
      "Experiential Design",
      "Pop-Up Activations",
      "Production Design",
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
