import { motion } from "framer-motion";
import { fadeUp, smoothViewport, staggerParent } from "@/lib/motion-presets";

const items = [
  { value: "100+", label: "Projects delivered" },
  { value: "50+", label: "Happy clients" },
  { value: "15+", label: "Industries served" },
  { value: "24/7", label: "Support" },
];

export function ClientStats() {
  return (
    <section className="relative">
      {/* hairline divider with glow */}
      <div className="mx-auto max-w-7xl container-x">
        <div className="divider-glow" />
      </div>

      <div className="relative">
        {/* soft underlay */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_50%,rgba(91,140,255,0.05),transparent_70%)]" />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={smoothViewport}
          className="mx-auto max-w-7xl container-x py-9 sm:py-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 sm:gap-x-6 md:gap-12">
            {items.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="relative pl-3 sm:pl-4 md:pl-5"
              >
                {/* left accent bar */}
                <span
                  aria-hidden
                  className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full bg-[linear-gradient(180deg,var(--brand),transparent)]"
                  style={{ opacity: 0.7 - i * 0.08 }}
                />
                <div className="text-[26px] sm:text-4xl md:text-[44px] font-semibold tracking-[-0.03em] leading-none text-gradient-brand">
                  {s.value}
                </div>
                <div className="mt-1.5 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white/45">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl container-x">
        <div className="divider-glow" />
      </div>
    </section>
  );
}
