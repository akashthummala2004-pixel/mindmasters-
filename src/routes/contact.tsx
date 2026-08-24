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

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Mind Masters AI Solutions" },
      {
        name: "description",
        content:
          "Get in touch with us to build something amazing together.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <MotionConfig reducedMotion="user" transition={smoothTransition}>
      <div className="relative min-h-screen text-foreground bg-background">
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
