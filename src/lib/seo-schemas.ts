export const SITE_URL = "https://www.mindmastersai.services";
export const COMPANY_NAME = "Mind Masters AI Solutions Pvt Ltd";
export const BRAND_NAME = "Mind Masters AI Solutions";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/companylogo.png`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": COMPANY_NAME,
  "legalName": COMPANY_NAME,
  "alternateName": "Mind Masters AI",
  "url": `${SITE_URL}/`,
  "logo": DEFAULT_OG_IMAGE,
  "image": DEFAULT_OG_IMAGE,
  "description":
    "Mind Masters AI Solutions provides AI agents, automation, AI/ML, web and mobile applications, SaaS, and custom software development services.",
  "email": "mmaisolutions.pvt@gmail.com",
  "telephone": "+918500729621",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "telephone": "+918500729621",
    "email": "mmaisolutions.pvt@gmail.com",
    "url": `${SITE_URL}/contact`,
    "availableLanguage": ["English"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/mind-masters-ai-solutions-pvt-ltd/",
    "https://twitter.com"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": BRAND_NAME,
  "url": `${SITE_URL}/`,
  "publisher": {
    "@type": "Organization",
    "name": COMPANY_NAME
  }
};

export function createServiceSchema(
  serviceName: string,
  serviceDescription: string,
  serviceUrl: string,
  offers: string[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName,
    "provider": {
      "@type": "Organization",
      "name": COMPANY_NAME,
      "url": `${SITE_URL}/`
    },
    "areaServed": "Global",
    "description": serviceDescription,
    "url": serviceUrl,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${serviceName} Catalog`,
      "itemListElement": offers.map((offer) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": offer
        }
      }))
    }
  };
}

export function createBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function createFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
