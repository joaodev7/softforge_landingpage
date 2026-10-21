import { faqs, projects, services, siteConfig } from "@/lib/site";

/** Dados estruturados (schema.org) para rich results no Google e SEO Local. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        slogan: siteConfig.slogan,
        url: siteConfig.url,
        logo: `${siteConfig.url}/icon.svg`,
        email: siteConfig.email,
        telephone: siteConfig.phoneDisplay,
        sameAs: Object.values(siteConfig.social),
        address: {
          "@type": "PostalAddress",
          addressLocality: "Fortaleza",
          addressRegion: "CE",
          addressCountry: "BR",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: "pt-BR",
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "ProfessionalService",
        name: siteConfig.name,
        url: siteConfig.url,
        telephone: siteConfig.phoneDisplay,
        priceRange: "$$",
        image: `${siteConfig.url}/opengraph-image`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Fortaleza",
          addressRegion: "CE",
          addressCountry: "BR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -3.7319,
          longitude: -38.5267,
        },
        areaServed: [
          {
            "@type": "City",
            name: "Fortaleza",
          },
          {
            "@type": "State",
            name: "Ceará",
          },
          {
            "@type": "Country",
            name: "Brasil",
          },
        ],
        provider: { "@id": `${siteConfig.url}/#organization` },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços SoftForge",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.description },
          })),
        },
      },
      ...projects.map((p) => ({
        "@type": "SoftwareApplication",
        name: p.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, Android, iOS",
        description: p.summary,
        creator: { "@id": `${siteConfig.url}/#organization` },
      })),
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
