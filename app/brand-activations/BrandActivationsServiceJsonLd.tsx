export default function BrandActivationsServiceJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Brand Activation Design and Build",
    serviceType: "Brand Activation Fabrication",
    description:
      "Turnkey brand activation studio. Concept, design, fabrication, install, and strike, all in house. NYC based, nationally capable.",
    url: "https://www.dripdome.com/brand-activations",
    areaServed: [
      "New York City",
      "Manhattan",
      "Brooklyn",
      "Los Angeles",
    ],
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://www.dripdome.com",
      name: "DripDome",
      url: "https://www.dripdome.com",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        minPrice: 10000,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
