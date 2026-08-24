import { motion } from "framer-motion";
import { fadeUp, smoothViewport, staggerParent } from "@/lib/motion-presets";
import { SectionHeader } from "@/components/site/Primitives";
import {
  ShoppingBag,
  HeartPulse,
  Sparkles,
  Factory,
  GraduationCap,
  Bot,
  LayoutDashboard,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

type Project = {
  icon: LucideIcon;
  label: string;
  description: string;
};

const projects: Project[] = [
  { icon: Sparkles,         label: "AI SaaS Products",       description: "Production-grade AI ecosystems, autonomous agents and multi-tenant SaaS infrastructure." },
  { icon: ShoppingBag,      label: "E-Commerce Platforms",   description: "Headless commerce, recommendation engines and omni-channel storefronts." },
  { icon: HeartPulse,       label: "Hospital Management",    description: "HIPAA-grade EMR, radiology pipelines and AI diagnostic copilots." },
  { icon: Factory,          label: "Factory Automation",     description: "Computer-vision defect detection, predictive maintenance and IoT telemetry." },
  { icon: GraduationCap,    label: "Educational Platforms",  description: "AI tutors, adaptive assessment engines and live-classroom infrastructure." },
  { icon: Bot,              label: "AI Assistants",          description: "Voice, chat and multi-modal assistants with tool use, memory and guardrails." },
  { icon: LayoutDashboard,  label: "Enterprise Dashboards",  description: "Realtime analytics, alerts and AI insights for ops, finance and growth teams." },
];

const stats = [
  { value: "142+", label: "Projects deployed" },
  { value: "10+",  label: "Industries served" },
  { value: "98%",  label: "Systems live" },
  { value: "99%",  label: "Client satisfaction" },
];

export function ProjectCategories() {
  return (
    <section id="projects" className="relative section-y container-x">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <SectionHeader
            eyebrow="Our work"
            title={
              <>
                Systems deployed{" "}
                <span className="font-serif-display italic text-white">across industries</span>
              </>
            }
            desc="From healthcare to retail to enterprise SaaS — products built to ship and scale predictably."
          />
          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 text-[13px] sm:text-sm font-medium text-[color:var(--brand)] hover:text-[color:var(--brand-hover)] transition-colors self-start md:self-auto md:pb-2"
          >
            Discuss a project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
          </a>
        </div>

        {/* Stats row */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={smoothViewport}
          className="mt-8 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-4 sm:gap-8 pb-7 sm:pb-10 mb-7 sm:mb-10 border-b border-white/[0.08]"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <div className="text-[22px] sm:text-3xl font-semibold tracking-[-0.025em] leading-none text-gradient-brand">
                {s.value}
              </div>
              <div className="mt-1.5 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white/45">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project tiles */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={smoothViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {projects.map((p) => {
            const Icon = p.icon;
            return (
              <motion.a
                key={p.label}
                href="#contact"
                variants={fadeUp}
                className="card-premium ring-gradient group block p-4 sm:p-6 tap-press"
              >
                <div className="flex items-start justify-between">
                  <div className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[linear-gradient(180deg,rgba(167,139,250,0.16),rgba(167,139,250,0.04))] ring-1 ring-white/10 text-[color:var(--violet)] shadow-[0_4px_18px_-6px_rgba(167,139,250,0.4)]">
                    <Icon className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" strokeWidth={2} />
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 text-white/30 transition-all duration-300 group-hover:text-[color:var(--violet)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2.2}
                  />
                </div>
                <h3 className="mt-4 sm:mt-5 text-[14.5px] sm:text-base font-semibold text-white tracking-[-0.01em]">
                  {p.label}
                </h3>
                <p className="mt-1.5 sm:mt-2 text-[12.5px] sm:text-[13px] text-white/55 leading-[1.55] sm:leading-relaxed">
                  {p.description}
                </p>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
