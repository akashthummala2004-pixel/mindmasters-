import { createFileRoute } from "@tanstack/react-router";
import { ServicePageTemplate, ServicePageConfig } from "@/components/site/ServicePageTemplate";
import { SITE_URL, COMPANY_NAME } from "@/lib/seo-schemas";

const config: ServicePageConfig = {
  slug: "web-application-development",
  serviceTitle: "Web Application Development",
  h1Title: "Web Application Development Company for Scalable Digital Products",
  metaDesc:
    "Custom web application development company building high-performance, scalable web apps, portals, and cloud platforms with modern tech stacks.",
  heroTag: "High-Performance Modern Web Engineering",
  overviewDesc:
    "We engineer fast, secure, and intuitive web applications, custom enterprise portals, and complex cloud-native web systems utilizing React, Next.js, TypeScript, Tailwind CSS, Node.js, and edge computing architectures.",
  problemsTitle: "Common Web Development Hurdles We Solve",
  problems: [
    {
      title: "Slow Page Performance & Poor Core Web Vitals",
      desc: "Legacy monoliths with bloated scripts and unoptimized rendering that hurt Google SEO rankings and drop conversion rates.",
    },
    {
      title: "Clunky UI & Poor User Experience",
      desc: "Outdated web interfaces that confuse users and fail to adapt seamlessly across mobile, tablet, and desktop viewports.",
    },
    {
      title: "Unscalable Backend Architecture",
      desc: "Web servers incapable of handling traffic surges, real-time WebSocket connections, or heavy API database reads.",
    },
  ],
  features: [
    {
      title: "Modern React & Next.js Frontends",
      desc: "Server-side rendered (SSR) and static site generated (SSG) web applications built for blazing-fast page loads.",
    },
    {
      title: "Custom Enterprise Web Portals",
      desc: "Role-based customer portals, admin dashboards, data visualization suites, and internal workflow tools.",
    },
    {
      title: "High-Throughput REST & GraphQL APIs",
      desc: "Secure backend microservices, database ORMs, caching layers, and third-party API integrations.",
    },
    {
      title: "Progressive Web Apps (PWAs)",
      desc: "Installable web applications with offline capabilities, push notifications, and native-like desktop performance.",
    },
  ],
  technologies: [
    "React 19",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Express / NestJS",
    "PostgreSQL",
    "Redis",
    "GraphQL",
    "Prisma",
    "Vercel / Cloudflare",
  ],
  useCases: [
    {
      title: "E-Commerce & Digital Commerce Platforms",
      desc: "Custom headless storefronts, checkout pipelines, and inventory management systems engineered for conversion.",
    },
    {
      title: "Enterprise Admin & Analytics Dashboards",
      desc: "Real-time telemetry dashboards rendering complex data streams, charting, and customizable reports.",
    },
    {
      title: "Client Self-Service Portals",
      desc: "Secure customer account portals with document uploads, billing history, subscription management, and ticketing.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Architecture & UX Planning",
      desc: "We define system architecture, database schemas, wireframes, user journeys, and component design tokens.",
    },
    {
      step: "02",
      title: "Agile Frontend & Backend Build",
      desc: "Clean modular code development in two-week sprints with continuous staging preview deployments.",
    },
    {
      step: "03",
      title: "Performance & Security Audits",
      desc: "Rigorously testing Lighthouse scores, OWASP security standards, cross-browser compatibility, and accessibility.",
    },
    {
      step: "04",
      title: "Production Launch & CDN Scaling",
      desc: "Deploying to edge networks with SSL, global CDN caching, automated backups, and 24/7 uptime monitoring.",
    },
  ],
  faqs: [
    {
      question: "Which technology stack do you recommend for custom web apps?",
      answer:
        "We primarily recommend React, Next.js, and TypeScript for the frontend due to superior speed, SEO, and developer ecosystem. For backends, we build high-concurrency Node.js, Python, or Go microservices with PostgreSQL or Supabase.",
    },
    {
      question: "Will our web application be fully mobile responsive and optimized for SEO?",
      answer:
        "Yes, 100%. Every web application we develop adheres strictly to responsive design guidelines, fast Core Web Vitals performance, semantic HTML5, clean canonical indexing, and structured data schemas.",
    },
    {
      question: "Do you offer ongoing maintenance and feature upgrades after launch?",
      answer:
        "Yes, we provide flexible ongoing maintenance packages including security updates, performance monitoring, infrastructure scaling, and continuous feature updates.",
    },
  ],
  offers: [
    "Custom Web Application Development",
    "React & Next.js Development Services",
    "Enterprise Web Portal Development",
    "Progressive Web App (PWA) Development",
  ],
  relatedServices: [
    {
      name: "SaaS Development Company",
      slug: "/saas-development",
      desc: "Multi-tenant SaaS architectures, billing integration, and cloud platforms.",
    },
    {
      name: "Mobile App Development Services",
      slug: "/mobile-app-development",
      desc: "Native iOS and Android mobile apps with shared backend services.",
    },
    {
      name: "Custom Software Development",
      slug: "/custom-software-development",
      desc: "Bespoke software systems, API integrations, and legacy modernization.",
    },
  ],
};

export const Route = createFileRoute("/web-application-development")({
  head: () => ({
    meta: [
      { title: `${config.serviceTitle} Company | ${COMPANY_NAME}` },
      { name: "description", content: config.metaDesc },
      {
        name: "keywords",
        content:
          "web application development company, custom web development, web app developers, enterprise web portals, React Next.js web applications, cloud web platforms",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: `${config.serviceTitle} Company | ${COMPANY_NAME}` },
      { property: "og:description", content: config.metaDesc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/web-application-development` },
      { property: "og:image", content: `${SITE_URL}/companylogo.png` },
      { property: "og:site_name", content: COMPANY_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${config.serviceTitle} Company | ${COMPANY_NAME}` },
      { name: "twitter:description", content: config.metaDesc },
      { name: "twitter:image", content: `${SITE_URL}/companylogo.png` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/web-application-development` }],
  }),
  component: () => <ServicePageTemplate config={config} />,
});
