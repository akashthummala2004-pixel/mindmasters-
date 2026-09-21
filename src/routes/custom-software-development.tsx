import { createFileRoute } from "@tanstack/react-router";
import { ServicePageTemplate, ServicePageConfig } from "@/components/site/ServicePageTemplate";
import { SITE_URL, COMPANY_NAME } from "@/lib/seo-schemas";

const config: ServicePageConfig = {
  slug: "custom-software-development",
  serviceTitle: "Custom Software Development",
  h1Title: "Custom Software Development Company for Enterprise Solutions",
  metaDesc:
    "Tailored software development services, API integrations, enterprise system modernization, and custom business automation engineered for growth.",
  heroTag: "Bespoke Enterprise Software & Systems Engineering",
  overviewDesc:
    "We engineer tailored software solutions, complex API integration layers, microservices architectures, and legacy system modernizations that align perfectly with your unique business workflows and long-term scalability targets.",
  problemsTitle: "Software Bottlenecks We Help Enterprises Resolve",
  problems: [
    {
      title: "Off-the-Shelf Software Limitations",
      desc: "Generic SaaS tools that force your business to compromise unique workflows or charge exorbitant per-user licensing fees.",
    },
    {
      title: "Brittle Legacy Codebases",
      desc: "Outdated software monoliths that are difficult to maintain, slow to deploy, and vulnerable to security flaws.",
    },
    {
      title: "Manual Multi-System Data Sync",
      desc: "Lack of clean API integrations between legacy databases, ERP systems, accounting platforms, and modern cloud services.",
    },
  ],
  features: [
    {
      title: "Tailored Business Automation Systems",
      desc: "Custom internal tools, workflow engines, inventory systems, and operational back-office platforms.",
    },
    {
      title: "API Integration & Microservices",
      desc: "Designing scalable RESTful APIs, gRPC channels, and event-driven message brokers (Kafka/RabbitMQ).",
    },
    {
      title: "Legacy Monolith Modernization",
      desc: "Refactoring legacy code into cloud-native microservices with zero downtime migration strategies.",
    },
    {
      title: "Enterprise Data Pipelines",
      desc: "High-throughput ETL data ingestion, data warehouse integration, and real-time operational analytics.",
    },
  ],
  technologies: [
    "Python",
    "Node.js",
    "Go",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Apache Kafka",
    "Docker",
    "Kubernetes",
    "AWS / Azure / GCP",
  ],
  useCases: [
    {
      title: "Supply Chain & ERP Orchestration",
      desc: "Custom inventory management, warehouse tracking, and multi-vendor logistics orchestration platforms.",
    },
    {
      title: "Financial Transaction & Reconciliation",
      desc: "High-concurrency payment gateway routing, automated ledger balancing, and compliance reporting tools.",
    },
    {
      title: "Healthcare Data Exchange Systems",
      desc: "HL7 / FHIR compliant data exchange pipelines connecting hospital EMRs with diagnostic laboratories.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Requirements & System Audit",
      desc: "We analyze your business architecture, data schemas, security compliance requirements, and integration points.",
    },
    {
      step: "02",
      title: "Technical Design & Prototyping",
      desc: "Creating detailed technical spec documents, API contracts, database ERDs, and interactive UI wireframes.",
    },
    {
      step: "03",
      title: "Full-Stack Development",
      desc: "Writing clean, documented, unit-tested code with continuous automated integration and static analysis.",
    },
    {
      step: "04",
      title: "Deployment & Maintenance",
      desc: "Containerized deployment with zero-downtime rollouts, telemetry dashboards, SLA support, and scaling.",
    },
  ],
  faqs: [
    {
      question: "Why should we choose custom software development over commercial off-the-shelf software?",
      answer:
        "Custom software gives your organization complete ownership of IP, zero recurring per-seat SaaS licensing fees, perfect alignment with your proprietary operational workflows, and unlimited scalability.",
    },
    {
      question: "Can you modernize our legacy software without interrupting current business operations?",
      answer:
        "Yes. We specialize in strangler-fig pattern modernizations — gradually extracting business logic from legacy systems into modular cloud APIs while maintaining 100% operational continuity.",
    },
    {
      question: "Who owns the code and intellectual property (IP)?",
      answer:
        "You retain 100% full ownership of all source code, repository access, documentation, architecture diagrams, and intellectual property rights upon project completion.",
    },
  ],
  offers: [
    "Custom Software Engineering Services",
    "Enterprise API Integration Services",
    "Legacy Monolith Modernization",
    "Custom Internal Operations & ERP Software",
  ],
  relatedServices: [
    {
      name: "Web Application Development",
      slug: "/web-application-development",
      desc: "Custom web applications, portals, and cloud frontend platforms.",
    },
    {
      name: "AI Agents & Automation Services",
      slug: "/ai-agents-automation",
      desc: "Autonomous AI agents, voice assistants, and workflow automation.",
    },
    {
      name: "AI/ML Development Services",
      slug: "/ai-ml-solutions",
      desc: "Custom machine learning models, predictive analytics, and AI infrastructure.",
    },
  ],
};

export const Route = createFileRoute("/custom-software-development")({
  head: () => ({
    meta: [
      { title: `${config.serviceTitle} Company | ${COMPANY_NAME}` },
      { name: "description", content: config.metaDesc },
      {
        name: "keywords",
        content:
          "custom software development company, software development services, enterprise software solutions, API integration services, legacy software modernization",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: `${config.serviceTitle} Company | ${COMPANY_NAME}` },
      { property: "og:description", content: config.metaDesc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/custom-software-development` },
      { property: "og:image", content: `${SITE_URL}/companylogo.png` },
      { property: "og:site_name", content: COMPANY_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${config.serviceTitle} Company | ${COMPANY_NAME}` },
      { name: "twitter:description", content: config.metaDesc },
      { name: "twitter:image", content: `${SITE_URL}/companylogo.png` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/custom-software-development` }],
  }),
  component: () => <ServicePageTemplate config={config} />,
});
