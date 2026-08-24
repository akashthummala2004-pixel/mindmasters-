import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { fadeUp, smoothViewport, staggerParent } from "@/lib/motion-presets";
import { SectionHeader } from "@/components/site/Primitives";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  detail: string;
  rating: number;
  initials: string;
};

const featured: Testimonial = {
  name: "Jordan Taylor",
  role: "Project Coordinator",
  company: "Northwind Labs",
  quote:
    "Mind Masters revolutionized our data analysis with their AI tools. We're now making quicker, smarter decisions than ever before.",
  detail:
    "Their computer-vision pipeline and assistant tooling enhanced our entire operations stack. The accuracy and dependability are simply unmatched.",
  rating: 5,
  initials: "JT",
};

const others: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "CEO",
    company: "TechFlow",
    quote:
      "Working with Mind Masters was a game-changer for our startup. They delivered beyond expectations in record time.",
    detail:
      "Attention to detail and commitment to quality showed in every interaction. Highly recommend.",
    rating: 5,
    initials: "SC",
  },
  {
    name: "Marcus Williams",
    role: "CTO",
    company: "DataVerse",
    quote:
      "The team's expertise in AI-driven solutions helped us scale our operations 3x in just six months.",
    detail:
      "From concept to execution, their process was seamless. They genuinely understand modern business needs.",
    rating: 5,
    initials: "MW",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative section-y container-x">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-[-10%] h-[40vw] w-[40vw] rounded-full" style={{ background: "radial-gradient(circle, rgba(91,140,255,0.10), transparent 60%)", filter: "blur(110px)" }} />
      </div>

      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Testimonials"
          title={
            <>
              What our{" "}
              <span className="font-serif-display italic text-white">clients say</span>
            </>
          }
          desc="Empowering rapidly expanding firms with design-focused, AI-enhanced solutions crafted for growth."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={smoothViewport}
          className="mt-10 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Featured testimonial */}
          <motion.article
            variants={fadeUp}
            className="relative overflow-hidden rounded-[24px] p-6 sm:p-9 ring-1 ring-white/[0.10] bg-[linear-gradient(135deg,rgba(91,140,255,0.10),rgba(167,139,250,0.06)_45%,transparent_75%),linear-gradient(180deg,#12151f,#0a0c12)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(91,140,255,0.25), transparent 60%)", filter: "blur(80px)" }}
            />

            <Quote className="h-9 w-9 text-white/15" strokeWidth={1.5} />

            <p className="mt-4 sm:mt-6 text-[18px] sm:text-[22px] md:text-[26px] font-medium text-white tracking-[-0.015em] leading-[1.35]">
              &ldquo;{featured.quote}&rdquo;
            </p>

            <p className="mt-4 sm:mt-5 text-[13.5px] sm:text-[14.5px] text-white/55 leading-[1.6] max-w-prose">
              {featured.detail}
            </p>

            <div className="mt-6 sm:mt-8 flex items-center gap-3">
              <Avatar initials={featured.initials} tone="blue" />
              <div className="min-w-0">
                <div className="text-[14px] sm:text-[15px] font-semibold text-white truncate">
                  {featured.name}
                </div>
                <div className="text-[12px] sm:text-[12.5px] text-white/55 truncate">
                  {featured.role} · {featured.company}
                </div>
              </div>
              <div className="ml-auto flex items-center gap-0.5">
                {Array.from({ length: featured.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 text-amber-300 fill-amber-300" strokeWidth={1.5} />
                ))}
              </div>
            </div>
          </motion.article>

          {/* Stacked column */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {others.map((t) => (
              <motion.article
                key={t.name}
                variants={fadeUp}
                className="relative overflow-hidden rounded-[20px] p-5 sm:p-7 ring-1 ring-white/[0.08] bg-[linear-gradient(180deg,rgba(20,23,31,0.85),rgba(10,12,18,0.85))] hover:ring-white/15 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar initials={t.initials} tone="neutral" />
                    <div>
                      <div className="text-[14px] font-semibold text-white">{t.name}</div>
                      <div className="text-[11.5px] sm:text-[12px] text-white/55">
                        {t.role} · {t.company}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-amber-300 fill-amber-300" strokeWidth={1.5} />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-[14px] sm:text-[15px] text-white/85 leading-[1.55]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-2 text-[12.5px] sm:text-[13px] text-white/50 leading-[1.55]">
                  {t.detail}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Avatar({ initials, tone }: { initials: string; tone: "blue" | "violet" | "neutral" }) {
  const bg =
    tone === "blue"
      ? "linear-gradient(135deg, rgba(91,140,255,0.50), rgba(91,140,255,0.20))"
      : tone === "violet"
      ? "linear-gradient(135deg, rgba(167,139,250,0.50), rgba(167,139,250,0.20))"
      : "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04))";
  return (
    <span
      className="inline-flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full text-[12px] sm:text-[13px] font-semibold text-white ring-1 ring-white/15"
      style={{ background: bg }}
    >
      {initials}
    </span>
  );
}
