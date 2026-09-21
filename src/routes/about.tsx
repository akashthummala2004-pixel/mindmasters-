import { createFileRoute, Link } from "@tanstack/react-router";
import { MotionConfig, motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { smoothTransition, smoothViewport, fadeUp, staggerParent } from "@/lib/motion-presets";
import { Navbar } from "@/components/site/Navbar";
import { MouseGlow } from "@/components/site/MouseGlow";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { MobileBottomNav } from "@/components/site/MobileBottomNav";
import { GlowyWavesBackground } from "@/components/ui/glowy-waves";
import LightRays from "@/components/ui/LightRays";
import { WebGLBoundary } from "@/components/site/WebGLBoundary";
import { AboutCollaboration } from "@/components/site/AboutCollaboration";
import { AboutTimeline } from "@/components/site/AboutTimeline";
import { AboutTeam } from "@/components/site/AboutTeam";
import { DiscussCTA } from "@/components/site/DiscussCTA";
import { AboutTrustedBy } from "@/components/site/AboutTrustedBy";

import { createBreadcrumbSchema, SITE_URL, COMPANY_NAME } from "@/lib/seo-schemas";

const aboutBreadcrumb = createBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "About Us", url: `${SITE_URL}/about` },
]);

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About ${COMPANY_NAME} | AI & Software Engineering Studio` },
      {
        name: "description",
        content:
          "Learn about Mind Masters AI Solutions Pvt Ltd — an engineering and design studio delivering production-grade AI agents, SaaS apps, and enterprise software.",
      },
      {
        name: "keywords",
        content:
          "about Mind Masters AI, AI engineering studio, software development agency, AI team, custom software engineers",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: `About ${COMPANY_NAME} | AI & Software Engineering Studio` },
      {
        property: "og:description",
        content:
          "Learn about Mind Masters AI Solutions Pvt Ltd — an engineering and design studio delivering production-grade AI agents, SaaS apps, and enterprise software.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/about` },
      { property: "og:image", content: `${SITE_URL}/companylogo.png` },
      { property: "og:site_name", content: COMPANY_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `About ${COMPANY_NAME} | AI & Software Engineering Studio` },
      {
        name: "twitter:description",
        content:
          "Learn about Mind Masters AI Solutions Pvt Ltd — an engineering and design studio delivering production-grade AI agents, SaaS apps, and enterprise software.",
      },
      { name: "twitter:image", content: `${SITE_URL}/companylogo.png` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
  }),
  component: AboutPage,
});

// Staggered entrance for the glowy-waves hero layout.
const heroContainerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, staggerChildren: 0.12 },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const logos: { name: string; mark: string }[] = [
  { name: "Acme", mark: "ACME" },
  { name: "Luminous", mark: "Luminous" },
  { name: "Linear", mark: "Linear" },
  { name: "Vercel", mark: "▲ Vercel" },
  { name: "Figma", mark: "Figma" },
];

function AboutPage() {
  return (
    <MotionConfig reducedMotion="user" transition={smoothTransition}>
      <div className="relative min-h-screen text-foreground bg-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutBreadcrumb) }}
        />
        <MouseGlow />
        <Navbar />

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden min-h-[100svh] flex items-center justify-center pt-24 sm:pt-28 pb-16 sm:pb-24">
          {/* Background — Dotted particle surface with light beam */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-background pointer-events-none">
            {/* Animated glowing waves base layer */}
            <GlowyWavesBackground />
            {/* LightRays WebGL effect */}
            <div className="absolute inset-0">
              <WebGLBoundary>
                <LightRays
                  raysOrigin="top-center"
                  raysColor="#ffffff"
                  raysSpeed={1}
                  lightSpread={1}
                  rayLength={2}
                  pulsating={false}
                  fadeDistance={1}
                  saturation={1}
                  followMouse
                  mouseInfluence={0.1}
                  noiseAmount={0}
                  distortion={0}
                />
              </WebGLBoundary>
            </div>
            {/* Edge vignette for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_45%,rgba(0,0,0,0.65)_100%)]" />
          </div>

          {/* ── Foreground content (glowy-waves hero layout, About copy) ──── */}
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 text-center flex flex-col items-center"
          >
            {/* Pill badge */}
            <motion.div
              variants={heroItemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md px-4 py-1.5 sm:py-2 text-[12px] sm:text-[13.5px] font-medium text-white/70 mb-7 sm:mb-10 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_8px_24px_-12px_rgba(0,0,0,0.6)]"
            >
              <Sparkles className="h-3.5 w-3.5 text-white/70" strokeWidth={2.2} />
              Design studio for AI, SaaS &amp; tech startups
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={heroItemVariants}
              className="font-sans font-bold tracking-[-0.03em] leading-[1.04] text-white text-balance text-[40px] xs:text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px]"
            >
              <span className="block">Good design makes</span>
              <span className="block">life better.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={heroItemVariants}
              className="mt-5 sm:mt-7 max-w-2xl text-[14.5px] sm:text-[17px] md:text-[18px] text-white/60 leading-[1.55] sm:leading-[1.6] text-pretty"
            >
              We design delightful experiences that make life simpler and more enjoyable.
            </motion.p>

            {/* CTA */}
            <motion.div variants={heroItemVariants} className="mt-7 sm:mt-10 flex">
              <Link
                to="/schedule"
                className="group relative inline-flex items-center gap-2 rounded-full bg-[#12141c] text-white text-[14px] sm:text-[15px] font-medium px-6 sm:px-7 py-3 sm:py-3.5 ring-1 ring-white/10 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_12px_30px_-12px_rgba(0,0,0,0.9)] hover:ring-white/25 hover:bg-[#1a1c24] hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="relative">Schedule a 1:1 Meeting</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.4} />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <AboutCollaboration />
        <AboutTimeline />
        <AboutTeam />

        <DiscussCTA />
        <Footer />
        <WhatsAppButton />
        <MobileBottomNav />
        {/* Spacer so content doesn't hide under the floating dock + safe area */}
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
