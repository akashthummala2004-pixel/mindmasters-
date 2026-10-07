import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { fadeUp, smoothViewport, staggerParent } from "@/lib/motion-presets";
import { SectionHeader } from "@/components/site/Primitives";
import {
  Globe,
  Smartphone,
  Brain,
  Palette,
  Cloud,
  Settings,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { useRef } from "react";

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  items: string[];
};

const services: Service[] = [
  { icon: Globe,      title: "Web Development", desc: "Business sites, SaaS platforms, admin dashboards and storefronts — engineered to grow with you.", items: ["Business sites", "SaaS", "Dashboards", "E-commerce"] },
  { icon: Smartphone, title: "Mobile Apps",     desc: "Native and cross-platform apps that feel right on every device.",                                  items: ["Android", "iOS", "Flutter", "React Native"] },
  { icon: Brain,      title: "AI Solutions",    desc: "Chatbots, agents, automation and analytics — built to ship, not to demo.",                          items: ["Chatbots", "Agents", "Automation", "Vision"] },
  { icon: Palette,    title: "UI / UX Design",  desc: "Product design that earns trust — wireframes, prototypes and a polished identity.",                items: ["Wireframes", "Prototypes", "Branding"] },
  { icon: Cloud,      title: "Cloud & Backend", desc: "APIs, databases, authentication and DevOps — the rails your product runs on.",                     items: ["APIs", "Cloud", "Auth", "DevOps"] },
  { icon: Settings,   title: "Custom Software", desc: "ERPs, CRMs, internal tools and automation tailored to your team.",                                 items: ["ERP", "CRM", "Internal tools", "Automation"] },
];

export function ServiceCategories() {
  return (
    <section id="services" className="relative section-y container-x overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[20%] right-[-10%] h-[40vw] w-[40vw] rounded-full" style={{ background: "radial-gradient(circle, rgba(91,140,255,0.10), transparent 60%)", filter: "blur(110px)" }} />
      </div>

      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="What we do"
          title={
            <>
              Six disciplines.{" "}
              <span className="font-serif-display italic text-white">One team.</span>
            </>
          }
          desc="Pick what you need — or hand us the whole product. We engineer with the same standard either way."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={smoothViewport}
          className="mt-8 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {services.map((s) => (
            <motion.div key={s.title} variants={fadeUp}>
              <ServiceCard service={s} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  const ref = useRef<HTMLAnchorElement>(null);

  /* Mouse-follow spotlight on the card */
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 200, damping: 30 });
  const sy = useSpring(my, { stiffness: 200, damping: 30 });
  const bgX = useTransform(sx, (v) => `${v}%`);
  const bgY = useTransform(sy, (v) => `${v}%`);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <motion.a
      ref={ref}
      href="#contact"
      onMouseMove={onMove}
      className="card-premium ring-gradient group relative block p-4 sm:p-6 overflow-hidden tap-press"
    >
      {/* spotlight */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [bgX, bgY],
            ([x, y]) =>
              `radial-gradient(280px circle at ${x} ${y}, rgba(91,140,255,0.18), transparent 60%)`
          ) as unknown as string,
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[linear-gradient(180deg,rgba(91,140,255,0.18),rgba(91,140,255,0.06))] ring-1 ring-white/10 text-[color:var(--brand)] shadow-[0_4px_18px_-6px_rgba(91,140,255,0.4)]">
            <Icon className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" strokeWidth={2} />
          </div>
          <ArrowUpRight
            className="h-4 w-4 text-white/30 transition-all duration-300 group-hover:text-[color:var(--brand)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2.2}
          />
        </div>

        <h3 className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] font-semibold text-white tracking-[-0.01em]">
          {service.title}
        </h3>
        <p className="mt-1.5 sm:mt-2 text-[12.5px] sm:text-sm text-white/60 leading-[1.55] sm:leading-relaxed">
          {service.desc}
        </p>

        <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5">
          {service.items.map((t) => (
            <span
              key={t}
              className="text-[10.5px] sm:text-[11px] text-white/65 bg-white/[0.04] ring-1 ring-white/[0.06] px-2 py-0.5 sm:py-1 rounded-md font-medium tracking-tight"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
