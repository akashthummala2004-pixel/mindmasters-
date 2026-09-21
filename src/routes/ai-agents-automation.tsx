import { createFileRoute } from "@tanstack/react-router";
import { ServicePageTemplate, ServicePageConfig } from "@/components/site/ServicePageTemplate";
import { SITE_URL, COMPANY_NAME } from "@/lib/seo-schemas";

const config: ServicePageConfig = {
  slug: "ai-agents-automation",
  serviceTitle: "AI Agents & Automation",
  h1Title: "AI Agents & Automation Services for Business Growth",
  metaDesc:
    "Deploy autonomous AI agents, voice assistants, LLM workflows, and enterprise process automation solutions engineered by Mind Masters AI Solutions.",
  heroTag: "AI Automation & Autonomous Systems",
  overviewDesc:
    "We engineer autonomous AI agents, intelligent voice assistants, self-learning chatbots, and multi-tool workflow pipelines that automate operations, reduce costs, and elevate customer experiences 24/7.",
  problemsTitle: "Operational Bottlenecks We Eliminate With Autonomous AI",
  problems: [
    {
      title: "Manual Workflow Delays",
      desc: "Repetitive multi-step business tasks that consume operational hours and introduce human errors into data processing.",
    },
    {
      title: "High Customer Support Costs",
      desc: "Scaling support teams linearly as user volume expands, leading to delayed response times and high overheads.",
    },
    {
      title: "Disconnected Enterprise Systems",
      desc: "Siloed SaaS applications and legacy databases that require manual data synchronization across teams.",
    },
  ],
  features: [
    {
      title: "Autonomous Multi-Step AI Agents",
      desc: "Goal-driven AI agents capable of reasoning, planning, executing tool calls, and interacting with external APIs securely.",
    },
    {
      title: "AI Voice Agent Development",
      desc: "Ultra low-latency conversational voice agents for inbound call routing, outbound lead qualification, and customer service.",
    },
    {
      title: "Enterprise Workflow Automation",
      desc: "Event-driven pipelines connecting CRMs, ERPs, communication tools, and databases with automated AI decision engines.",
    },
    {
      title: "AI Chatbots & Copilots",
      desc: "Custom RAG-powered knowledge bots trained on your internal documentation with strict guardrails and privacy.",
    },
  ],
  technologies: [
    "LangChain",
    "LlamaIndex",
    "OpenAI GPT-4o",
    "Anthropic Claude",
    "Python",
    "FastAPI",
    "Node.js",
    "Pinecone",
    "Qdrant",
    "WebSockets",
    "Twilio Voice",
  ],
  useCases: [
    {
      title: "24/7 Customer Support Automation",
      desc: "Voice and text agents resolving over 80% of tier-1 customer inquiries instantly with CRM context.",
    },
    {
      title: "Automated Lead Qualification",
      desc: "AI voice agents calling inbound leads, collecting requirements, and scheduling sales meetings directly on calendars.",
    },
    {
      title: "Document & Invoice Processing",
      desc: "Extracting structured data from complex unstructured PDFs, financial documents, and receipts automatically.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Discovery & Workflow Audit",
      desc: "We analyze your business operations, identify high-ROI automation opportunities, and design system architecture.",
    },
    {
      step: "02",
      title: "Agent Design & Integration",
      desc: "We configure prompts, tool schemas, memory vector stores, and connect your business APIs securely.",
    },
    {
      step: "03",
      title: "Testing & Guardrails",
      desc: "Rigorously testing agent edge cases, establishing safety guardrails, and enforcing privacy protocols.",
    },
    {
      step: "04",
      title: "Deployment & Scaling",
      desc: "Deploying to cloud infrastructure with real-time evaluation metrics, logging, and performance telemetry.",
    },
  ],
  faqs: [
    {
      question: "What are AI agents and how do they differ from simple chatbots?",
      answer:
        "Traditional chatbots follow rigid decision trees. AI agents use advanced LLM reasoning to understand context, make decisions, execute multi-step tools, and query databases to achieve complex goals autonomously.",
    },
    {
      question: "Can AI voice agents integrate with our existing CRM and phone systems?",
      answer:
        "Yes. Our AI voice agents integrate seamlessly with phone providers (Twilio, Retell, Vapi) and enterprise CRMs (Salesforce, HubSpot, Zoho, custom backends) to read and write lead records live during calls.",
    },
    {
      question: "How do you guarantee security and data privacy?",
      answer:
        "We implement zero-data-retention pipelines, tenant-isolated vector stores, encrypted API communication, and enterprise RBAC to ensure your proprietary business data remains fully secure.",
    },
  ],
  offers: [
    "Autonomous AI Agents Development",
    "AI Voice Agent Development",
    "AI Chatbot & Knowledge Copilots",
    "Enterprise Workflow Automation Services",
  ],
  relatedServices: [
    {
      name: "AI/ML Development Services",
      slug: "/ai-ml-solutions",
      desc: "Custom machine learning models, predictive analytics, and generative AI infrastructure.",
    },
    {
      name: "Web Application Development",
      slug: "/web-application-development",
      desc: "High-performance modern web applications, portals, and cloud platforms.",
    },
    {
      name: "Custom Software Development",
      slug: "/custom-software-development",
      desc: "Tailored enterprise software, API integrations, and system modernization.",
    },
  ],
};

export const Route = createFileRoute("/ai-agents-automation")({
  head: () => ({
    meta: [
      { title: `${config.serviceTitle} Services | ${COMPANY_NAME}` },
      { name: "description", content: config.metaDesc },
      {
        name: "keywords",
        content:
          "AI agents development, AI voice agent development, AI chatbot development, business automation solutions, workflow automation services, AI integration services",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: `${config.serviceTitle} Services | ${COMPANY_NAME}` },
      { property: "og:description", content: config.metaDesc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/ai-agents-automation` },
      { property: "og:image", content: `${SITE_URL}/companylogo.png` },
      { property: "og:site_name", content: COMPANY_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${config.serviceTitle} Services | ${COMPANY_NAME}` },
      { name: "twitter:description", content: config.metaDesc },
      { name: "twitter:image", content: `${SITE_URL}/companylogo.png` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ai-agents-automation` }],
  }),
  component: () => <ServicePageTemplate config={config} />,
});
