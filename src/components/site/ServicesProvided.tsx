import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Bot, Cloud, Cpu, Globe, Smartphone, Zap, Layers, type LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

// Mockup cyan accent
const CYAN = "#74f5ff";

type Service = {
  num: string;
  title: string;
  desc: string;
  href: string;
  icon: LucideIcon;
  features: string[];
  image: string;
  alt: string;
};

const services: Service[] = [
  {
    num: "01",
    title: "AI Agents & Automation",
    desc: "Autonomous AI agents, voice assistants, self-learning chatbots, and multi-tool workflow pipelines built for scale.",
    href: "/ai-agents-automation",
    icon: Bot,
    features: ["Autonomous AI Agents", "AI Voice Call Agents", "Workflow Automation", "RAG Knowledge Base"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200&auto=format&fit=crop",
    alt: "AI Agents and Voice Call Automation Solution by Mind Masters AI Solutions",
  },
  {
    num: "02",
    title: "AI/ML Solutions",
    desc: "Bespoke machine learning models, predictive analytics, generative AI fine-tuning, and computer vision systems.",
    href: "/ai-ml-solutions",
    icon: Cpu,
    features: ["Custom Model Training", "Predictive Analytics", "Computer Vision OCR", "Enterprise MLOps"],
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop",
    alt: "AI and Machine Learning Infrastructure by Mind Masters AI Solutions",
  },
  {
    num: "03",
    title: "Web Application Development",
    desc: "High-performance web applications, customer portals, and cloud platforms engineered with React and Next.js.",
    href: "/web-application-development",
    icon: Globe,
    features: ["React & Next.js Stacks", "Enterprise Web Portals", "High-Throughput APIs", "PWA Applications"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    alt: "Web Application Development Platform by Mind Masters AI Solutions",
  },
  {
    num: "04",
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile apps for iOS and Android with 60FPS UIs, offline sync, and AI features.",
    href: "/mobile-app-development",
    icon: Smartphone,
    features: ["iOS & Android Code", "React Native / Flutter", "Biometric Auth", "Offline Sync"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    alt: "Mobile App Development for iOS and Android by Mind Masters AI Solutions",
  },
  {
    num: "05",
    title: "SaaS Development",
    desc: "End-to-end SaaS products with multi-tenant architecture, Stripe subscription billing, and embedded AI tools.",
    href: "/saas-development",
    icon: Cloud,
    features: ["Multi-Tenant Architecture", "Subscription Billing", "Workspace RBAC", "Rapid MVP Launch"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    alt: "SaaS Application Development Platform by Mind Masters AI Solutions",
  },
  {
    num: "06",
    title: "Custom Software Development",
    desc: "Tailored enterprise software, microservices APIs, monolith modernizations, and back-office automation.",
    href: "/custom-software-development",
    icon: Layers,
    features: ["Bespoke Business Logic", "API Integration Layer", "Legacy Modernization", "Full IP Ownership"],
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200&auto=format&fit=crop",
    alt: "Custom Software Development and System Integration by Mind Masters AI Solutions",
  },
];

export function ServicesProvided() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const serviceCards = document.querySelectorAll(".service-card");

      serviceCards.forEach((section) => {
        const media = section.querySelector(".service-media");
        const content = section.querySelector(".service-content");

        if (media) {
          gsap.fromTo(
            media,
            { yPercent: -30 },
            {
              yPercent: 30,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        if (content) {
          gsap.from(content, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className="relative section-y container-x bg-[#06070b] overflow-hidden">
      {/* Background Ambient Glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-[12%] left-[-10%] h-[35vw] w-[35vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,242,255,0.06), transparent 60%)", filter: "blur(110px)" }}
        />
        <div
          className="absolute bottom-[8%] right-[-10%] h-[35vw] w-[35vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(167,139,250,0.06), transparent 60%)", filter: "blur(110px)" }}
        />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <span
            className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: CYAN }}
          >
            Our Core Expertise
          </span>
          <h2 className="main-section-heading text-white text-balance mt-2.5">
            AI & Software Services We Provide
          </h2>
          <span
            className="mt-3 block h-[2.5px] w-12 rounded-full"
            style={{ background: "linear-gradient(90deg, #00f2ff, #a78bfa)" }}
          />
          <p className="mt-3.5 max-w-lg text-[13.5px] sm:text-[15px] text-white/65 leading-relaxed">
            From autonomous AI agents and machine learning to custom web, mobile, SaaS, and enterprise software.
          </p>
        </div>

        {/* 6-Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="service-card group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c12] shadow-xl flex flex-col justify-between p-5 sm:p-6 transition-all duration-300 hover:border-[#74f5ff]/35 hover:shadow-[0_0_25px_rgba(0,242,255,0.08)]"
              >
                {/* Parallax Background Media */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                  <picture>
                    <source srcSet={s.image} type="image/webp" />
                    <img
                      src={s.image}
                      alt={s.alt}
                      className="service-media absolute inset-x-0 -top-[20%] -bottom-[20%] h-[140%] w-full object-cover opacity-20 transition-opacity duration-500 group-hover:opacity-35"
                    />
                  </picture>
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06070b] via-[#06070b]/90 to-[#06070b]/50" />
                </div>

                {/* Service Content */}
                <div className="service-content relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.08] border border-white/15 text-[#74f5ff] backdrop-blur-md">
                        <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#74f5ff]/80 uppercase">
                        {s.num}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white mb-2 group-hover:text-[#74f5ff] transition-colors">
                      {s.title}
                    </h3>

                    <p className="text-xs text-white/65 leading-relaxed mb-4">
                      {s.desc}
                    </p>

                    {/* Features list */}
                    <div className="space-y-1.5 mb-5">
                      {s.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-[11.5px] text-white/80 font-medium">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#74f5ff] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={s.href as any}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#74f5ff] uppercase tracking-wider group/link hover:underline pt-2.5 border-t border-white/[0.08]"
                  >
                    <span>View Service Details</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" strokeWidth={2} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

