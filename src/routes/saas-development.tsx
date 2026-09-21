import { createFileRoute } from "@tanstack/react-router";
import { ServicePageTemplate, ServicePageConfig } from "@/components/site/ServicePageTemplate";
import { SITE_URL, COMPANY_NAME } from "@/lib/seo-schemas";

const config: ServicePageConfig = {
  slug: "saas-development",
  serviceTitle: "SaaS Development Company",
  h1Title: "SaaS Application Development Company for Scalable Cloud Products",
  metaDesc:
    "End-to-end SaaS application development company building multi-tenant architecture, secure cloud infrastructure, and AI-powered SaaS platforms.",
  heroTag: "Multi-Tenant SaaS & Cloud Platform Engineering",
  overviewDesc:
    "We design, build, and scale multi-tenant Software-as-a-Service (SaaS) products from MVP to enterprise — incorporating robust subscription billing, role-based access control (RBAC), multi-tenant data isolation, and AI capabilities.",
  problemsTitle: "SaaS Architectural Hurdles We Architect Around",
  problems: [
    {
      title: "Complex Multi-Tenancy Data Leakage",
      desc: "Building isolation schemas that guarantee customer tenant data remains completely segregated across database queries.",
    },
    {
      title: "Subscription Billing & Metering Friction",
      desc: "Integrating tier upgrades, usage-based metering, webhooks, and prorated billing without payment state bugs.",
    },
    {
      title: "High Churn Due to Weak Onboarding",
      desc: "Complex user onboarding flows that fail to deliver immediate time-to-value for new self-serve signups.",
    },
  ],
  features: [
    {
      title: "Multi-Tenant Cloud Architecture",
      desc: "Database isolation (schema-per-tenant or row-level security), custom domain routing, and tenant onboarding APIs.",
    },
    {
      title: "Subscription & Usage-Based Billing",
      desc: "Stripe Billing, Paddle, and Chargebee integrations with automated usage tracking, invoices, and payment retry flows.",
    },
    {
      title: "AI Features & Copilot Integration",
      desc: "Differentiating your SaaS product with native AI features, automated summaries, smart search, and generative tools.",
    },
    {
      title: "Granular RBAC & Team Workspaces",
      desc: "Organization workspaces, member invites, audit logs, single sign-on (SSO / SAML / OAuth), and custom permissions.",
    },
  ],
  technologies: [
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "PostgreSQL (Row-Level Security)",
    "Stripe / Paddle APIs",
    "Redis",
    "AWS / GCP",
    "Docker",
    "Clerk / Auth0",
  ],
  useCases: [
    {
      title: "B2B AI Productivity Software",
      desc: "Multi-tenant workspace SaaS automating content creation, code review, or document management with embedded AI.",
    },
    {
      title: "Vertical Industry CRM & ERP Systems",
      desc: "Niche operational SaaS tailored for healthcare, real estate, logistics, or legal industry workflows.",
    },
    {
      title: "Developer Tools & API SaaS Platforms",
      desc: "API-first SaaS with developer documentation, API key management, rate limiting, and developer dashboards.",
    },
  ],
  process: [
    {
      step: "01",
      title: "SaaS Product Discovery",
      desc: "Defining target buyer personas, feature matrix, pricing tiers, data privacy constraints, and technical architecture.",
    },
    {
      step: "02",
      title: "MVP Engineering (15-30 Days)",
      desc: "Rapid development of core value features, authentication, multi-tenancy, and subscription billing.",
    },
    {
      step: "03",
      title: "Security & Compliance Hardening",
      desc: "Implementing SOC 2 readiness controls, audit logs, data encryption at rest and in transit, and vulnerability scans.",
    },
    {
      step: "04",
      title: "Launch & CI/CD Infrastructure",
      desc: "Setting up auto-scaling cloud infrastructure, telemetry dashboards, error monitoring, and continuous deployment pipelines.",
    },
  ],
  faqs: [
    {
      question: "How fast can you build a market-ready SaaS MVP?",
      answer:
        "We can launch a fully functional SaaS MVP — complete with user authentication, multi-tenancy, Stripe subscription billing, core product feature set, and responsive UI — in 15 to 30 days.",
    },
    {
      question: "Which multi-tenancy model do you implement?",
      answer:
        "Depending on security and scale requirements, we implement PostgreSQL Row-Level Security (RLS) for cost-effective SaaS scaling, or separate schema / separate database isolation for enterprise tenants.",
    },
    {
      question: "Can you add AI features to an existing SaaS application?",
      answer:
        "Yes, we frequently audit and enhance existing SaaS platforms by building AI copilots, automated report generation, RAG document search, and intelligent workflow triggers.",
    },
  ],
  offers: [
    "SaaS MVP Development (15-30 Days)",
    "Multi-Tenant SaaS Architecture Design",
    "SaaS Subscription Billing & Stripe Integration",
    "AI-Powered SaaS Product Engineering",
  ],
  relatedServices: [
    {
      name: "Web Application Development",
      slug: "/web-application-development",
      desc: "Custom web applications, dashboards, and enterprise portals.",
    },
    {
      name: "AI/ML Development Services",
      slug: "/ai-ml-solutions",
      desc: "Custom machine learning models, fine-tuning, and predictive analytics.",
    },
    {
      name: "Custom Software Development",
      slug: "/custom-software-development",
      desc: "Enterprise software modernization, API integrations, and backend engineering.",
    },
  ],
};

export const Route = createFileRoute("/saas-development")({
  head: () => ({
    meta: [
      { title: `${config.serviceTitle} | ${COMPANY_NAME}` },
      { name: "description", content: config.metaDesc },
      {
        name: "keywords",
        content:
          "SaaS development company, SaaS application development, multi-tenant SaaS architecture, cloud SaaS platform, AI SaaS development, subscription software development",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: `${config.serviceTitle} | ${COMPANY_NAME}` },
      { property: "og:description", content: config.metaDesc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/saas-development` },
      { property: "og:image", content: `${SITE_URL}/companylogo.png` },
      { property: "og:site_name", content: COMPANY_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${config.serviceTitle} | ${COMPANY_NAME}` },
      { name: "twitter:description", content: config.metaDesc },
      { name: "twitter:image", content: `${SITE_URL}/companylogo.png` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/saas-development` }],
  }),
  component: () => <ServicePageTemplate config={config} />,
});
