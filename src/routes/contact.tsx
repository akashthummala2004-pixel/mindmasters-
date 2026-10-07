import { createFileRoute, Link } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { smoothTransition } from "@/lib/motion-presets";
import { Navbar } from "@/components/site/Navbar";
import { MouseGlow } from "@/components/site/MouseGlow";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { MobileBottomNav } from "@/components/site/MobileBottomNav";
import { ContactSection } from "@/components/site/ContactSection";

import { createBreadcrumbSchema, SITE_URL, COMPANY_NAME } from "@/lib/seo-schemas";

const contactBreadcrumb = createBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Contact Us", url: `${SITE_URL}/contact` },
]);

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact Us | AI & Software Engineering Services | ${COMPANY_NAME}` },
      {
        name: "description",
        content:
          "Get in touch with Mind Masters AI Solutions Pvt Ltd. Discuss your AI, web application, mobile app, SaaS, or custom software development project with our engineers.",
      },
      {
        name: "keywords",
        content:
          "contact Mind Masters AI, hire AI developers, software development inquiry, AI automation quote, contact software agency",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: `Contact Us | AI & Software Engineering Services | ${COMPANY_NAME}` },
      {
        property: "og:description",
        content:
          "Get in touch with Mind Masters AI Solutions Pvt Ltd. Discuss your AI, web application, mobile app, SaaS, or custom software development project with our engineers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/contact` },
      { property: "og:image", content: `${SITE_URL}/companylogo.png` },
      { property: "og:site_name", content: COMPANY_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `Contact Us | AI & Software Engineering Services | ${COMPANY_NAME}` },
      {
        name: "twitter:description",
        content:
          "Get in touch with Mind Masters AI Solutions Pvt Ltd. Discuss your AI, web application, mobile app, SaaS, or custom software development project with our engineers.",
      },
      { name: "twitter:image", content: `${SITE_URL}/companylogo.png` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <MotionConfig reducedMotion="user" transition={smoothTransition}>
      <div className="relative min-h-screen text-foreground bg-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactBreadcrumb) }}
        />
        <MouseGlow />
        <Navbar />

        {/* Spacer for fixed navbar */}
        <div className="pt-12 sm:pt-16" />

        {/* The actual Contact Section from before */}
        <div className="pb-20 sm:pb-28">
          <ContactSection />
        </div>

        <Footer />
        <WhatsAppButton />
        <MobileBottomNav />
        <div
          className="md:hidden"
          aria-hidden
          style={{
            height:
              "calc(var(--dock-h) + var(--dock-gap) + env(safe-area-inset-bottom, 0px) + 16px)",
          }}
        />
      </div>
    </MotionConfig>
  );
}
