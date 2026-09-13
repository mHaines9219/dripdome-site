export default function SetDesignJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Set Design and Fabrication",
    serviceType:
      "Production Design, Set Fabrication, Prop Sourcing and Set Dressing",
    description:
      "Set design for campaigns, music videos, and studio shows. Production design, custom fabrication, prop sourcing, and set dressing, built in our NYC shop and installed on location in NYC and LA.",
    url: "https://www.dripdome.com/set-design",
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
