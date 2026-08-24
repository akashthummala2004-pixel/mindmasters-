import { motion } from "framer-motion";

const metrics = [
  { value: "$120M+", label: "Client funding supported" },
  { value: "15+", label: "Industries served" },
  { value: "90%", label: "Client retention rate" },
  { value: "2x", label: "Faster time to market" },
];

export function WhyUs() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-card border-y border-foreground/8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Why Mind Masters
          </span>
          <h2 className="mt-4 font-display text-[26px] sm:text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-foreground leading-[1.15]">
            Outcomes, not{" "}
            <span className="italic font-normal" style={{ fontFamily: "var(--font-serif)" }}>
              deliverables
            </span>
            .
          </h2>
        </div>

        <div className="mt-8 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/8 rounded-2xl sm:rounded-3xl overflow-hidden border border-foreground/8">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-background p-5 sm:p-8 md:p-10 text-center"
            >
              <div className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-foreground">
                {m.value}
              </div>
              <div className="mt-2 sm:mt-3 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
