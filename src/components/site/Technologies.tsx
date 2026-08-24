import { motion } from "framer-motion";
import { fadeUp, smoothViewport, staggerParent } from "@/lib/motion-presets";
import { SectionHeader } from "@/components/site/Primitives";
import {
  Layout,
  Smartphone,
  Server,
  Database,
  Cloud,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type Stack = {
  icon: LucideIcon;
  title: string;
  items: string[];
};

const stacks: Stack[] = [
  { icon: Layout,     title: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { icon: Smartphone, title: "Mobile",   items: ["Kotlin", "Flutter", "React Native"] },
  { icon: Server,     title: "Backend",  items: ["Spring Boot", "Node.js", "Python", "FastAPI"] },
  { icon: Database,   title: "Database", items: ["MySQL", "Postgres", "MongoDB", "Firebase"] },
  { icon: Cloud,      title: "Cloud",    items: ["AWS", "Cloudflare", "Docker", "Vercel"] },
  { icon: Sparkles,   title: "AI",       items: ["OpenAI", "Gemini", "LangChain", "TensorFlow"] },
];

export function Technologies() {
  return (
    <section id="technologies" className="relative section-y container-x">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_100%,rgba(91,140,255,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-dot opacity-[0.35] [mask-image:radial-gradient(60%_50%_at_50%_50%,#000_40%,transparent_85%)]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Technology"
          title={
            <>
              A modern stack,{" "}
              <span className="font-serif-display italic text-white">picked on purpose</span>
            </>
          }
          desc="Tools chosen for shipping speed and predictable scale — not for fashion."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={smoothViewport}
          className="mt-8 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {stacks.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className="card-premium ring-gradient group p-4 sm:p-6"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[linear-gradient(180deg,rgba(91,140,255,0.18),rgba(91,140,255,0.04))] ring-1 ring-white/10 text-[color:var(--brand)]">
                    <Icon className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" strokeWidth={2} />
                  </div>
                  <h3 className="text-[14.5px] sm:text-base font-semibold text-white tracking-[-0.01em]">
                    {s.title}
                  </h3>
                </div>
                <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5">
                  {s.items.map((t) => (
                    <span
                      key={t}
                      className="text-[10.5px] sm:text-xs text-white/70 bg-white/[0.03] ring-1 ring-white/[0.06] px-2 py-0.5 sm:py-1 rounded-md font-medium tracking-tight"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
