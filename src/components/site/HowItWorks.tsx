import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { Calendar, Brain, LineChart, type LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/site/Primitives";
import { smoothViewport } from "@/lib/motion-presets";

type Step = {
  n: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  chip: string;
};

const steps: Step[] = [
  {
    n: "01",
    icon: Calendar,
    title: "Schedule a free call",
    desc:
      "Share your goals and constraints. We gather everything we need to tailor the engagement — no fluff, no pitch theatre.",
    chip: "Discovery",
  },
  {
    n: "02",
    icon: Brain,
    title: "AI design & development",
    desc:
      "We design and build systems shaped around your business processes — and integrate AI cleanly into your existing stack.",
    chip: "Build",
  },
  {
    n: "03",
    icon: LineChart,
    title: "Continuous optimization",
    desc:
      "We measure, refine and automate — turning your product into a system that compounds in value over time.",
    chip: "Iterate",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Drive the rail fill with scaleY (compositor-only) instead of height (layout).
  const railScaleY = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  return (
    <section id="process" className="relative section-y container-x bg-black overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-[8%] left-1/2 -translate-x-1/2 h-[55vw] w-[55vw] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(91,140,255,0.10), transparent 60%)",
            filter: "blur(120px)",
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="How it works"
          title="We streamline product design and development workflow"
          align="center"
        />

        <div ref={sectionRef} className="relative mt-12 sm:mt-20">
          {/* vertical rail (desktop) */}
          <div
            aria-hidden
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-px bg-white/[0.08]"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: railScaleY, x: "-50%", transformOrigin: "top" }}
            className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-white via-white to-white/40"
          />

          <ol className="space-y-12 md:space-y-24">
            {steps.map((s, i) => (
              <StepRow
                key={s.n}
                index={i}
                total={steps.length}
                isLeft={i % 2 === 0}
                scrollYProgress={scrollYProgress}
                step={s}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StepRow({
  index,
  total,
  isLeft,
  scrollYProgress,
  step,
}: {
  index: number;
  total: number;
  isLeft: boolean;
  scrollYProgress: MotionValue<number>;
  step: Step;
}) {
  const Icon = step.icon;

  const lo = 0.08 + (index / total) * 0.6;
  const hi = lo + 0.22;
  const active = useTransform(scrollYProgress, [lo, hi], [0, 1]);
  const dotScale = useTransform(active, [0, 1], [0.85, 1]);
  const dotOpacity = useTransform(active, [0, 1], [0.35, 1]);
  const textOpacity = useTransform(active, [0, 1], [0.55, 1]);

  const textCol = (
    <motion.div style={{ opacity: textOpacity }} className={isLeft ? "md:text-right md:pr-14" : "md:text-left md:pl-14"}>
      <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/45">Step {step.n}</div>
      <h3 className="mt-2 text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-[-0.02em] text-white leading-[1.15]">
        {step.title}
      </h3>
      <p className={`mt-2.5 text-[13.5px] sm:text-[15px] text-white/60 leading-[1.6] max-w-md ${isLeft ? "md:ml-auto" : ""}`}>
        {step.desc}
      </p>
    </motion.div>
  );

  const visualCol = (
    <motion.div style={{ opacity: textOpacity }} className={`${isLeft ? "md:pl-14" : "md:pr-14 md:flex md:justify-end"}`}>
      <div className="card-premium ring-gradient rounded-2xl p-5 lg:p-6 max-w-[360px]">
        <div className="flex items-center justify-between">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] ring-1 ring-white/10 text-white">
            <Icon className="h-[16px] w-[16px]" strokeWidth={2} />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 rounded-md bg-white/[0.04] ring-1 ring-white/[0.08] px-2 py-0.5">
            {step.chip}
          </span>
        </div>
        <div className="mt-4 h-1.5 w-28 rounded-full bg-white/15" />
        <div className="mt-1.5 h-1.5 w-16 rounded-full bg-white/10" />
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {Array.from({ length: 3 }).map((_, k) => (
            <div
              key={k}
              className={`h-8 rounded-md ring-1 ring-white/[0.06] ${
                k <= index
                  ? "bg-[linear-gradient(180deg,rgba(91,140,255,0.30),rgba(91,140,255,0.06))]"
                  : "bg-white/[0.04]"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={smoothViewport}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid grid-cols-1 md:grid-cols-2 md:gap-0 gap-4"
    >
      {/* Mobile step header */}
      <div className="md:hidden flex items-center gap-3 mb-1">
        <motion.span
          style={{ scale: dotScale, opacity: dotOpacity }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(180deg,#ffffff,#e2e8f0)] text-black ring-1 ring-white/30 shadow-[0_8px_24px_-6px_rgba(255,255,255,0.35)]"
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
        </motion.span>
        <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/45">Step {step.n}</span>
      </div>

      {isLeft ? (
        <>
          {textCol}
          {visualCol}
        </>
      ) : (
        <>
          {visualCol}
          {textCol}
        </>
      )}

      {/* Desktop center dot */}
      <motion.div
        style={{ scale: dotScale, opacity: dotOpacity }}
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-2 z-10"
      >
        <span
          aria-hidden
          className="absolute -inset-3 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.25), transparent 65%)",
            filter: "blur(8px)",
          }}
        />
        <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(180deg,#ffffff,#e2e8f0)] text-black ring-1 ring-white/30 shadow-[0_8px_24px_-6px_rgba(255,255,255,0.35)]">
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </span>
      </motion.div>
    </motion.li>
  );
}
