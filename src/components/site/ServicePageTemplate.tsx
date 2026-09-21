import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Code2,
  HelpCircle,
  Layers,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { MouseGlow } from "@/components/site/MouseGlow";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { MobileBottomNav } from "@/components/site/MobileBottomNav";
import { useCalModal } from "@/components/site/CalModalContext";
import {
  createBreadcrumbSchema,
  createFAQSchema,
  createServiceSchema,
  SITE_URL,
} from "@/lib/seo-schemas";

export type ServicePageConfig = {
  slug: string;
  serviceTitle: string;
  h1Title: string;
  metaDesc: string;
  heroTag: string;
  overviewDesc: string;
  problemsTitle: string;
  problems: { title: string; desc: string }[];
  features: { title: string; desc: string; icon?: LucideIcon }[];
  technologies: string[];
  useCases: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  offers: string[];
  relatedServices: { name: string; slug: string; desc: string }[];
};

export function ServicePageTemplate({ config }: { config: ServicePageConfig }) {
  const { openCalModal } = useCalModal();

  const canonicalUrl = `${SITE_URL}/${config.slug}`;
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Services", url: `${SITE_URL}/#services` },
    { name: config.serviceTitle, url: canonicalUrl },
  ]);
  const serviceSchema = createServiceSchema(
    config.serviceTitle,
    config.metaDesc,
    canonicalUrl,
    config.offers
  );
  const faqSchema = createFAQSchema(config.faqs);

  return (
    <div className="relative min-h-screen text-foreground bg-background">
      {/* Embedded JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <MouseGlow />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 border-b border-white/[0.08] overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[40vw] max-w-[900px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(116,245,255,0.08), transparent 70%)",
              filter: "blur(120px)",
            }}
          />
        </div>

        <div className="container-x mx-auto max-w-6xl">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-white/50 font-medium">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="h-3.5 w-3.5 text-white/30" />
              </li>
              <li>
                <a href="/#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <ChevronRight className="h-3.5 w-3.5 text-white/30" />
              </li>
              <li className="text-[#74f5ff] truncate max-w-[200px] sm:max-w-none">
                {config.serviceTitle}
              </li>
            </ol>
          </nav>

          {/* Hero Content */}
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-[#74f5ff] uppercase tracking-wider mb-5">
              <Sparkles className="h-3.5 w-3.5" />
              {config.heroTag}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              {config.h1Title}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-white/70 leading-relaxed">
              {config.overviewDesc}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => openCalModal()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#12141c] text-white font-semibold text-sm border border-white/15 shadow-lg hover:border-white/30 hover:bg-[#1a1c25] transition-all cursor-pointer"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="h-4 w-4 text-[#74f5ff]" />
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.06] text-white font-medium text-sm border border-white/10 hover:bg-white/[0.12] transition-all"
              >
                <span>Request Custom Quote</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve Section */}
      <section className="py-16 sm:py-24 border-b border-white/[0.06] bg-[#07080d]">
        <div className="container-x mx-auto max-w-6xl">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase font-mono font-semibold tracking-widest text-[#74f5ff]">
              Challenges We Eliminate
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {config.problemsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.problems.map((prob, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-[#0c0e16] p-6 shadow-md hover:border-[#74f5ff]/30 transition-all"
              >
                <div className="h-9 w-9 rounded-xl bg-[#74f5ff]/10 border border-[#74f5ff]/20 flex items-center justify-center text-[#74f5ff] mb-4 font-mono font-bold text-sm">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{prob.title}</h3>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed">{prob.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Key Capabilities */}
      <section className="py-16 sm:py-24 border-b border-white/[0.06]">
        <div className="container-x mx-auto max-w-6xl">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase font-mono font-semibold tracking-widest text-[#74f5ff]">
              Core Capabilities
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              What We Deliver
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config.features.map((feat, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-[#090a0f] p-6 sm:p-7 flex gap-4 items-start hover:border-white/20 transition-all"
              >
                <div className="h-10 w-10 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-[#74f5ff] shrink-0 mt-0.5">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack & Architecture */}
      <section className="py-16 sm:py-20 border-b border-white/[0.06] bg-[#07080d]">
        <div className="container-x mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <span className="text-xs uppercase font-mono font-semibold tracking-widest text-[#74f5ff]">
                Engineering Ecosystem
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Technologies & Tools We Rely On
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {config.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-xs sm:text-sm font-mono text-white/90"
              >
                <Code2 className="h-4 w-4 text-[#74f5ff]" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Real-World Use Cases */}
      <section className="py-16 sm:py-24 border-b border-white/[0.06]">
        <div className="container-x mx-auto max-w-6xl">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase font-mono font-semibold tracking-widest text-[#74f5ff]">
              Industry Applications
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Real-World Use Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.useCases.map((uc, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-[#090a0f] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-white/[0.06] text-[11px] font-mono text-[#74f5ff] mb-4">
                    Use Case {i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{uc.title}</h3>
                  <p className="text-xs sm:text-sm text-white/65 leading-relaxed">{uc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-16 sm:py-24 border-b border-white/[0.06] bg-[#07080d]">
        <div className="container-x mx-auto max-w-6xl">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase font-mono font-semibold tracking-widest text-[#74f5ff]">
              Proven Methodology
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Development Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.process.map((p, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-[#0c0e16] p-6 relative">
                <span className="text-3xl font-bold text-white/20 font-mono block mb-3">
                  {p.step}
                </span>
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 sm:py-24 border-b border-white/[0.06]">
        <div className="container-x mx-auto max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono font-semibold tracking-widest text-[#74f5ff]">
              Got Questions?
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {config.faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-[#090a0f] p-6"
              >
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 mb-2">
                  <HelpCircle className="h-5 w-5 text-[#74f5ff] shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Link Related Services Section */}
      <section className="py-16 sm:py-24 border-b border-white/[0.06] bg-[#07080d]">
        <div className="container-x mx-auto max-w-6xl">
          <div className="max-w-2xl mb-10">
            <span className="text-xs uppercase font-mono font-semibold tracking-widest text-[#74f5ff]">
              Explore Related Solutions
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Other Software & AI Services We Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.relatedServices.map((rel) => (
              <Link
                key={rel.slug}
                to={rel.slug as any}
                className="group rounded-2xl border border-white/10 bg-[#0c0e16] p-6 hover:border-[#74f5ff]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#74f5ff] transition-colors mb-2">
                    {rel.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                    {rel.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-[#74f5ff]">
                  <span>Learn More</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 text-center container-x mx-auto max-w-4xl">
        <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#12141d] to-[#08090d] p-8 sm:p-12 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Ready to Build Your {config.serviceTitle}?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-white/70 leading-relaxed">
            Partner with Mind Masters AI Solutions Pvt Ltd to turn your technical vision into market-ready software.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => openCalModal()}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all cursor-pointer shadow-lg"
            >
              <span>Book 1:1 Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/[0.08] text-white font-medium text-sm border border-white/15 hover:bg-white/[0.15] transition-all"
            >
              <span>Contact Our Engineers</span>
            </Link>
          </div>
        </div>
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
  );
}
