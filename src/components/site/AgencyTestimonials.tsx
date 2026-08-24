import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "Mind Masters embedded with our team and shipped a production-grade RAG platform in eight weeks. The quality of engineering was unlike anything we'd seen from an agency.",
    name: "Sarah Chen",
    role: "VP of Engineering",
    company: "Vantage AI",
  },
  {
    quote:
      "Their AI partnership model is the right shape for modern teams. Senior engineers, fast iteration, and a deep respect for production reliability.",
    name: "Marcus Holt",
    role: "Head of Platform",
    company: "Helix Systems",
  },
  {
    quote:
      "They translated a fuzzy vision into a clear roadmap and then executed it. Our inference costs dropped 60% and reliability improved at the same time.",
    name: "Anika Rao",
    role: "CTO",
    company: "Meridian Labs",
  },
  {
    quote:
      "From the first call it was clear they cared about outcomes, not hours. Best AI engineering partner we've ever worked with.",
    name: "Gregg Oldfield",
    role: "CEO",
    company: "Polaris",
  },
];

export function AgencyTestimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];

  return (
    <section className="relative py-24 md:py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Testimonials
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-foreground">
            What our partners{" "}
            <span className="italic font-normal" style={{ fontFamily: "var(--font-serif)" }}>
              say
            </span>
            .
          </h2>
        </div>

        <div className="mt-14 relative rounded-3xl border border-foreground/8 bg-card p-8 md:p-14">
          <div className="flex items-center justify-between mb-8">
            <div className="flex">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="h-5 w-5 fill-accent text-accent" strokeWidth={0} />
              ))}
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={() => setI((p) => (p - 1 + testimonials.length) % testimonials.length)}
                className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-foreground/10 hover:bg-foreground hover:text-background transition"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setI((p) => (p + 1) % testimonials.length)}
                className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-foreground/10 hover:bg-foreground hover:text-background transition"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-display text-2xl md:text-3xl lg:text-4xl font-normal leading-[1.25] tracking-[-0.02em] text-foreground">
                "{t.quote}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-11 w-11 rounded-full bg-foreground/10 inline-flex items-center justify-center font-display text-sm font-semibold">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-medium text-sm text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-1 rounded-full transition-all ${
                  idx === i ? "w-8 bg-foreground" : "w-4 bg-foreground/15"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
