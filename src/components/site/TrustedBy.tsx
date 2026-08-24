import { motion } from "framer-motion";
import { fadeUp, smoothViewport, staggerParent } from "@/lib/motion-presets";
import { SectionHeader } from "@/components/site/Primitives";

const logos: { name: string; mark: string }[] = [
  { name: "Acme", mark: "ACME" },
  { name: "Linear", mark: "Linear" },
  { name: "Notion", mark: "Notion" },
  { name: "Vercel", mark: "▲ Vercel" },
  { name: "Stripe", mark: "Stripe" },
  { name: "OpenAI", mark: "OpenAI" },
  { name: "Loom", mark: "Loom" },
  { name: "Figma", mark: "Figma" },
  { name: "Framer", mark: "Framer" },
];

export function TrustedBy() {
  return (
    <section className="relative section-y container-x">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[40%] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(91,140,255,0.08),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Trusted By"
          title={
            <>
              We work with{" "}
              <span className="font-serif-display italic text-white">high-impact</span> companies
            </>
          }
          desc="Operators, founders and product teams that ship — across SaaS, AI, fintech and DTC."
          align="center"
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={smoothViewport}
          className="mt-8 sm:mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3"
        >
          {logos.map((l) => (
            <motion.div
              key={l.name}
              variants={fadeUp}
              className="group relative flex items-center justify-center h-20 sm:h-28 rounded-2xl overflow-hidden ring-1 ring-white/[0.06] bg-[linear-gradient(180deg,rgba(20,23,31,0.55),rgba(10,12,18,0.35))] transition-all duration-500 hover:ring-white/15 hover:bg-[linear-gradient(180deg,rgba(26,30,44,0.65),rgba(14,17,25,0.45))]"
            >
              {/* hover spotlight */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(60% 80% at 50% 50%, rgba(255,255,255,0.06), transparent 60%)",
                }}
              />
              <span className="relative text-[15px] sm:text-[17px] font-semibold tracking-[-0.02em] text-white/55 group-hover:text-white/85 transition-colors duration-500">
                {l.mark}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
