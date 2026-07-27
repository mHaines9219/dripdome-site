export default function InteriorOfficeDesignJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Interior and Office Design and Build",
    serviceType: "Commercial Interior Design and Office Buildout",
    description:
      "Turnkey office and interior design. Space planning, custom CNC signage, furniture and FF&E, and styling, managed end to end. Design-forward workplaces in NYC and LA.",
    url: "https://www.dripdome.com/interior-office-design",
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
