import { motion } from "framer-motion";
import {
  TrendingUp,
  Layers,
  ShieldCheck,
  Compass,
  Sparkles,
  Timer,
  type LucideIcon,
} from "lucide-react";
import { fadeUp, smoothViewport, staggerParent } from "@/lib/motion-presets";
import { SectionHeader } from "@/components/site/Primitives";

type Benefit = {
  icon: LucideIcon;
  title: string;
  desc: string;
  tone: "blue" | "violet" | "neutral";
};

const benefits: Benefit[] = [
  {
    icon: TrendingUp,
    title: "Increase conversions",
    desc:
      "Sharper funnels, sharper copy, sharper layouts — moves the metrics that actually pay rent.",
    tone: "blue",
  },
  {
    icon: Layers,
    title: "End-to-end creative",
    desc:
      "Brand, product, marketing site, app — one team carrying it from idea to live.",
    tone: "violet",
  },
  {
    icon: ShieldCheck,
    title: "Fixed price, no surprises",
    desc:
      "You know exactly what you're paying for. Clear scope, clear price, no surprise invoices.",
    tone: "neutral",
  },
  {
    icon: Compass,
    title: "Stay ahead of the market",
    desc:
      "Every page on the web is starting to look the same. We help you ship something distinctly yours.",
    tone: "blue",
  },
  {
    icon: Sparkles,
    title: "Top-notch quality",
    desc:
      "Beautifully crafted UI, fast performance and clean code — premium on every layer.",
    tone: "violet",
  },
  {
    icon: Timer,
    title: "48-hour updates",
    desc:
      "We move at lightning speed. Drafts, edits and reviews land in your inbox in under two days.",
    tone: "neutral",
  },
];

export function Benefits() {
  return (
    <section className="relative section-y container-x overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[20%] right-[-10%] h-[40vw] w-[40vw] rounded-full" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.10), transparent 60%)", filter: "blur(110px)" }} />
        <div className="absolute bottom-[10%] left-[-10%] h-[35vw] w-[35vw] rounded-full" style={{ background: "radial-gradient(circle, rgba(91,140,255,0.10), transparent 60%)", filter: "blur(110px)" }} />
      </div>

      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Speed, simplicity"
          title={
            <>
              Benefits of{" "}
              <span className="font-serif-display italic text-white">working with us</span>
            </>
          }
          desc="Swift replies, careful edits, and adaptable support after launch — designed for contemporary teams."
          align="center"
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={smoothViewport}
          className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {benefits.map((b) => (
            <motion.div key={b.title} variants={fadeUp}>
              <BenefitCard benefit={b} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BenefitCard({ benefit }: { benefit: Benefit }) {
  const Icon = benefit.icon;
  const toneBg =
    benefit.tone === "blue"
      ? "from-[rgba(91,140,255,0.18)] to-[rgba(91,140,255,0.04)] text-[color:var(--brand)]"
      : benefit.tone === "violet"
      ? "from-[rgba(167,139,250,0.18)] to-[rgba(167,139,250,0.04)] text-[color:var(--violet)]"
      : "from-[rgba(255,255,255,0.10)] to-[rgba(255,255,255,0.02)] text-white";

  const toneGlow =
    benefit.tone === "blue"
      ? "radial-gradient(80% 60% at 10% 10%, rgba(91,140,255,0.08), transparent 60%)"
      : benefit.tone === "violet"
      ? "radial-gradient(80% 60% at 10% 10%, rgba(167,139,250,0.08), transparent 60%)"
      : "radial-gradient(80% 60% at 10% 10%, rgba(255,255,255,0.05), transparent 60%)";

  return (
    <div className="card-premium ring-gradient relative overflow-hidden p-5 sm:p-7 h-full">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
        style={{ background: toneGlow }}
      />
      <div className="relative">
        <div className={`inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-b ${toneBg} ring-1 ring-white/10`}>
          <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
        </div>
        <h3 className="mt-4 sm:mt-5 text-[16px] sm:text-[17px] font-semibold tracking-[-0.01em] text-white">
          {benefit.title}
        </h3>
        <p className="mt-1.5 sm:mt-2 text-[13px] sm:text-[14px] text-white/60 leading-[1.55] sm:leading-relaxed">
          {benefit.desc}
        </p>
      </div>
    </div>
  );
}
