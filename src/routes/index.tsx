import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { smoothTransition } from "@/lib/motion-presets";
import { Navbar } from "@/components/site/Navbar";
import { MouseGlow } from "@/components/site/MouseGlow";
import { AgencyHero } from "@/components/site/AgencyHero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { ServicesProvided } from "@/components/site/ServicesProvided";
import { BuildChooser } from "@/components/site/BuildChooser";
import { DiscussCTA } from "@/components/site/DiscussCTA";
import { FAQ } from "@/components/site/FAQ";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { MobileBottomNav } from "@/components/site/MobileBottomNav";
import {
  organizationSchema,
  websiteSchema,
  createBreadcrumbSchema,
  createFAQSchema,
  SITE_URL,
  COMPANY_NAME,
} from "@/lib/seo-schemas";

const homepageFaqs = [
  {
    question: "What types of clients do you work with?",
    answer:
      "We specialize in AI startups, SaaS companies and tech-forward businesses. Our clients range from early-stage founders establishing brand identity to established companies modernizing their digital presence.",
  },
  {
    question: "Can we start with a single page or smaller scope?",
    answer:
      "Absolutely. We offer flexible engagement options — a single landing page, a complete website redesign or ongoing design support.",
  },
  {
    question: "How fast can you deliver?",
    answer:
      "Typical turnaround is 1–2 weeks for a landing page and 4–6 weeks for full website projects, depending on complexity.",
  },
  {
    question: "Do you handle development too?",
    answer:
      "Yes. We offer end-to-end design and development services including AI agents, web apps, mobile apps, SaaS platforms, and custom software.",
  },
];

const homeBreadcrumb = createBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
]);

const faqPageSchema = createFAQSchema(homepageFaqs);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `AI Development & Software Solutions Company | ${COMPANY_NAME}` },
      {
        name: "description",
        content:
          "Mind Masters AI Solutions provides AI agents, automation, AI/ML, web and mobile applications, SaaS, and custom software development services.",
      },
      {
        name: "keywords",
        content:
          "AI development company, AI automation services, AI agents development, AI voice agent development, AI chatbot development, AI/ML development services, generative AI solutions, business automation solutions, web application development company, mobile app development company, SaaS development company, custom software development company, software development services, API integration services, workflow automation services, AI integration services",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: `AI Development & Software Solutions Company | ${COMPANY_NAME}` },
      {
        property: "og:description",
        content:
          "Mind Masters AI Solutions provides AI agents, automation, AI/ML, web and mobile applications, SaaS, and custom software development services.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}/companylogo.png` },
      { property: "og:site_name", content: COMPANY_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `AI Development & Software Solutions Company | ${COMPANY_NAME}` },
      {
        name: "twitter:description",
        content:
          "Mind Masters AI Solutions provides AI agents, automation, AI/ML, web and mobile applications, SaaS, and custom software development services.",
      },
      { name: "twitter:image", content: `${SITE_URL}/companylogo.png` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Index,
});

function Index() {
  return (
    <MotionConfig reducedMotion="user" transition={smoothTransition}>
      <div id="top" className="relative min-h-screen text-foreground bg-background">
        {/* Inject JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        />

        <MouseGlow />
        <Navbar />
        <AgencyHero />
        <HowItWorks />
        <ServicesProvided />
        <BuildChooser />

        <DiscussCTA />
        <FAQ />
        <Footer />
        <WhatsAppButton />
        <MobileBottomNav />
        {/* Spacer so content doesn't hide under the floating dock + safe area */}
        <div
          className="md:hidden"
          aria-hidden
          style={{ height: "calc(var(--dock-h) + var(--dock-gap) + env(safe-area-inset-bottom, 0px) + 16px)" }}
        />
      </div>
    </MotionConfig>
  );
}

