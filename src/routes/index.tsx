import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { smoothTransition } from "@/lib/motion-presets";
import { Navbar } from "@/components/site/Navbar";
import { MouseGlow } from "@/components/site/MouseGlow";
import { AgencyHero } from "@/components/site/AgencyHero";
import { TrustedBy } from "@/components/site/TrustedBy";
import { ProductDesign } from "@/components/site/ProductDesign";
import { HowItWorks } from "@/components/site/HowItWorks";
import { ServicesProvided } from "@/components/site/ServicesProvided";
import { BuildChooser } from "@/components/site/BuildChooser";
import { Testimonials } from "@/components/site/Testimonials";

import { DiscussCTA } from "@/components/site/DiscussCTA";
import { FAQ } from "@/components/site/FAQ";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { MobileBottomNav } from "@/components/site/MobileBottomNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mind Masters AI Solutions — Premium Web Design & Development" },
      {
        name: "description",
        content:
          "We design and develop websites, mobile apps, AI systems and custom software for startups, enterprises and growing businesses.",
      },
      { property: "og:title", content: "Mind Masters AI Solutions" },
      {
        property: "og:description",
        content: "Build powerful digital products with AI — websites, mobile apps and custom software.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <MotionConfig reducedMotion="user" transition={smoothTransition}>
      <div id="top" className="relative min-h-screen text-foreground bg-background">
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
