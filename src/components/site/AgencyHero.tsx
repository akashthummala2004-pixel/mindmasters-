import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ShapeLandingBackground } from "@/components/ui/shape-landing-hero";

// How long each slide stays on screen before auto-advancing (ms).
// Change this single value to speed up / slow down the rotation.
const SLIDE_DURATION = 5000;

type Slide = {
  tag: string;
  // Each entry renders on its own line. Use one entry for a single-line
  // headline, or several to control exactly where the line breaks fall.
  title: string[];
  description: string;
};

const SLIDES: Slide[] = [
  {
    tag: "Design studio for AI, SaaS & Tech",
    title: ["Meet your new AI", "Design Agency"],
    description:
      "We collaborate with forward-thinking teams to create unique brands, launch intelligent products, and grow with intention.",
  },
  {
    tag: "Speed to market",
    title: ["Idea to product in 15 days"],
    description:
      "Quickly validate your concept with a market-ready MVP that captures your core idea and accelerates your launch.",
  },
  {
    tag: "Scalable architecture",
    title: ["Production-ready AI", "products built to scale"],
    description:
      "Deploy robust, intelligent applications designed with strong, flexible architectures that effortlessly adapt as your user base grows.",
  },
];

export function AgencyHero() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  const go = useCallback((next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-advance. The timer resets whenever `index` changes (including manual
  // jumps via the progress bars), keeping the bar fill in sync.
  useEffect(() => {
    const id = window.setTimeout(() => go(index + 1), SLIDE_DURATION);
    return () => window.clearTimeout(id);
  }, [index, go]);

  return (
    <section className="relative overflow-hidden min-h-[100svh] flex items-center justify-center pt-24 sm:pt-28 pb-28 sm:pb-24">
      {/* ── Background ────────────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#0a0a0f]">
        {/* Animated elegant floating shapes */}
        <ShapeLandingBackground />
        {/* Top & bottom fade blends the shapes into the page and keeps the
            headline legible against them. */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/80" />
      </div>

      {/* ── Foreground content ─────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 text-center flex flex-col items-center sm:translate-y-12">
        {/* Rotating slide: reason tag + headline + subtext */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Reason indicator + tag */}
            <div className="flex items-center gap-3 sm:gap-4 mb-7 sm:mb-10">
              <span className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Reason {String(index + 1).padStart(2, "0")}
              </span>
              <span className="hidden sm:block h-px w-10 bg-white/15" />
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md px-3.5 py-1.5 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-white/80 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_8px_24px_-12px_rgba(0,0,0,0.6)]">
                {slide.tag}
              </span>
            </div>

            {/* Headline */}
            <h1 className="main-section-heading text-white text-balance">
              {slide.title.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Subheading */}
            <p className="mt-5 sm:mt-7 max-w-2xl text-[14.5px] sm:text-[17px] md:text-[18px] text-white/60 leading-[1.55] sm:leading-[1.6] text-pretty">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA — stays fixed across slides */}
        <div className="mt-7 sm:mt-10 flex">
          <Link
            to="/schedule"
            className="group relative inline-flex items-center gap-2 rounded-full bg-[#12141c] text-white text-[14px] sm:text-[15px] font-medium px-6 sm:px-7 py-3 sm:py-3.5 ring-1 ring-white/10 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_12px_30px_-12px_rgba(0,0,0,0.9)] hover:ring-white/25 hover:bg-[#1a1c24] hover:-translate-y-0.5 transition-all duration-300"
          >
            <span className="relative">Schedule a 1:1 Meeting</span>
            <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.4} />
          </Link>
        </div>

        {/* Progress bars + counter */}
        <div className="mt-12 sm:mt-16 flex items-center gap-4">
          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className="relative h-1 w-8 sm:w-10 overflow-hidden rounded-full bg-white/15 transition-colors hover:bg-white/25"
              >
                {i < index && <span className="absolute inset-0 rounded-full bg-white/50" />}
                {i === index && (
                  <motion.span
                    key={index}
                    className="absolute inset-y-0 left-0 rounded-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
          <span className="text-[12px] sm:text-[13px] font-medium tabular-nums text-white/50">
            {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
