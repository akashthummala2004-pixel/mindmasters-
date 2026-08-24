import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="contact" className="relative py-12 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-foreground text-background p-6 sm:p-10 md:p-16 lg:p-20 text-center"
        >
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, oklch(0.78 0.18 80 / 0.4), transparent 60%)",
            }}
          />
          <div className="relative">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-background/60">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Let's build
            </span>
            <h2 className="mt-3 sm:mt-5 font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em]">
              Let's kickstart your{" "}
              <span className="italic font-normal" style={{ fontFamily: "var(--font-serif)" }}>
                vision
              </span>
              .
            </h2>
            <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-background/70 max-w-xl mx-auto">
              No long forms. No back-and-forth. Just one call to shape what's next.
            </p>
            <p className="mt-2 text-sm text-background/50">
              Founders love us for how fast we get the ball rolling.
            </p>

            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              <a
                href="mailto:mmaisolutions.pvt@gmail.com"
                className="group inline-flex items-center gap-2 rounded-full bg-background px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-semibold text-foreground transition hover:opacity-90"
              >
                Schedule a 30 min call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="mailto:mmaisolutions.pvt@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-background/20 px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-medium text-background hover:bg-background/10 transition"
              >
                mmaisolutions.pvt@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
