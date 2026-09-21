import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { MotionConfig, motion } from "framer-motion";
import { Clock, Video, Globe, Sparkles } from "lucide-react";
import { smoothTransition, smoothViewport } from "@/lib/motion-presets";
import { Navbar } from "@/components/site/Navbar";
import { MouseGlow } from "@/components/site/MouseGlow";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { MobileBottomNav } from "@/components/site/MobileBottomNav";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { WebGLBoundary } from "@/components/site/WebGLBoundary";
import contactImage from "@/assets/contact.png";
import companyLogo from "@/assets/companylogo.png";

import { createBreadcrumbSchema, SITE_URL, COMPANY_NAME } from "@/lib/seo-schemas";

const scheduleBreadcrumb = createBreadcrumbSchema([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Schedule Consultation", url: `${SITE_URL}/schedule` },
]);

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: `Book 1:1 Consultation | AI & Software Solutions | ${COMPANY_NAME}` },
      {
        name: "description",
        content:
          "Schedule a 1:1 technical strategy session with Mind Masters AI Solutions Pvt Ltd to evaluate your project scope, AI architecture, timeline, and budget.",
      },
      {
        name: "keywords",
        content:
          "book AI consultation, schedule software meeting, AI project strategy session, hire software engineers consultation",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: `Book 1:1 Consultation | AI & Software Solutions | ${COMPANY_NAME}` },
      {
        property: "og:description",
        content:
          "Schedule a 1:1 technical strategy session with Mind Masters AI Solutions Pvt Ltd to evaluate your project scope, AI architecture, timeline, and budget.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/schedule` },
      { property: "og:image", content: `${SITE_URL}/companylogo.png` },
      { property: "og:site_name", content: COMPANY_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `Book 1:1 Consultation | AI & Software Solutions | ${COMPANY_NAME}` },
      {
        name: "twitter:description",
        content:
          "Schedule a 1:1 technical strategy session with Mind Masters AI Solutions Pvt Ltd to evaluate your project scope, AI architecture, timeline, and budget.",
      },
      { name: "twitter:image", content: `${SITE_URL}/companylogo.png` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/schedule` }],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  useEffect(() => {
    (async () => {
      try {
        const cal = await getCalApi({ namespace: "30min" });
        cal("ui", {
          theme: "dark",
          styles: { branding: { brandColor: "#74f5ff" } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      } catch (err) {
        console.error("Cal.com init error:", err);
      }
    })();
  }, []);

  return (
    <MotionConfig reducedMotion="user" transition={smoothTransition}>
      <div className="relative min-h-screen text-foreground bg-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(scheduleBreadcrumb) }}
        />
        <MouseGlow />
        <Navbar />

        {/* Hero Header */}
        <section className="relative container-x pt-28 sm:pt-36 pb-4 sm:pb-6 overflow-hidden">
          <WebGLBoundary>
            <DottedSurface
              className="absolute inset-x-0 -top-16 md:-top-24 h-[400px] sm:h-[500px] -z-20 opacity-100 pointer-events-none mask-image-bottom"
              style={{ WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)" }}
            />
          </WebGLBoundary>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80%]"
            style={{
              background:
                "radial-gradient(45% 70% at 50% 0%, rgba(91,140,255,0.10), transparent 70%)",
            }}
          />

          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 sm:gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider text-[#74f5ff] bg-[#74f5ff]/10 border border-[#74f5ff]/25 mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Real-Time Availability</span>
                </div>
                <h1 className="text-[24px] sm:text-3xl md:text-[36px] font-semibold tracking-[-0.025em] leading-[1.05] text-white text-balance max-w-2xl">
                  Book a Free 1:1 Discovery Call
                </h1>
                <p className="mt-3 text-xs sm:text-sm text-white/60 max-w-xl leading-relaxed">
                  Select an available date and time slot directly from our calendar to discuss your project, technical architecture, and launch goals.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="hidden md:block relative shrink-0"
              >
                <span
                  aria-hidden
                  className="absolute -inset-10 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(91,140,255,0.18), transparent 60%)",
                    filter: "blur(40px)",
                  }}
                />
                <img
                  src={contactImage}
                  alt="Contact Support"
                  width={524}
                  height={524}
                  loading="lazy"
                  decoding="async"
                  className="relative h-[200px] lg:h-[240px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Real Cal.com Direct Inline Embed Container */}
        <section className="relative container-x pb-20 sm:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={smoothViewport}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto max-w-5xl rounded-3xl bg-[#090a0d] border border-white/15 overflow-hidden shadow-[0_24px_60px_-20px_rgba(0,0,0,0.95)] grid grid-cols-1 lg:grid-cols-[280px_1fr]"
          >
            {/* Left Branding Panel */}
            <div className="p-6 sm:p-8 bg-[#0c0e14] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <img
                    src={companyLogo}
                    alt="Mind Masters AI Logo"
                    className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_2px_10px_rgba(0,242,255,0.2)]"
                  />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-6">
                  30 min Meeting
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-white/70">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#74f5ff]" />
                    <span>30 Minutes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Video className="w-4 h-4 text-[#74f5ff]" />
                    <span>Cal Video / Google Meet</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-[#74f5ff]" />
                    <span>Automatic Timezone</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-[11.5px] text-white/40 leading-relaxed">
                Single seamless booking flow powered by Cal.com. Times automatically adjust to your local timezone.
              </div>
            </div>

            {/* Right Panel: Official Inline Cal.com Embed */}
            <div className="relative min-h-[640px] h-[680px] w-full bg-[#06070b] overflow-hidden">
              <Cal
                namespace="30min"
                calLink="mm-ai-solutions-mzfol6/30min"
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                config={{ layout: "month_view", theme: "dark" }}
              />
            </div>
          </motion.div>
        </section>

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
