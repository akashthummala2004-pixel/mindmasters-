import { motion } from "framer-motion";
import { Palette, Target, Clock } from "lucide-react";
import { smoothViewport, fadeUp, staggerParent } from "@/lib/motion-presets";

const features = [
  {
    icon: Palette,
    title: "End-to-end creative services",
    description: "We help to improve the sales funnels, improve the copy, use more high-converting layout",
  },
  {
    icon: Target,
    title: "Stay Ahead of the Market",
    description: "Every page on the web is 1:1 similar to each other. But it's your chance to get something unique.",
  },
  {
    icon: Clock,
    title: "48-Hour Updates",
    description: "We move at lightning speed. We provide drafts, usually within 48 hours.",
  },
];

export function AboutCollaboration() {
  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-24 border-t border-white/[0.04]">
      {/* Subtle light spots on the edges matching the design */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-[-15%] top-1/4 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.03), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute right-[-15%] top-1/4 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.03), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={smoothViewport}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[24px] sm:text-[30px] md:text-[36px] font-semibold tracking-tight text-white leading-[1.15] text-balance mb-12 sm:mb-16 max-w-3xl"
        >
          Collaboration that creates value<br className="hidden sm:block" />
          for everyone
        </motion.h2>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={smoothViewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div key={idx} variants={fadeUp} className="flex flex-col">
                <div className="mb-5 flex h-[36px] w-[36px] sm:h-[40px] sm:w-[40px] items-center justify-center rounded-[12px] bg-white/[0.02] ring-1 ring-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                  <Icon className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px] text-white/70" strokeWidth={1.8} />
                </div>
                <h3 className="mb-2 text-[14px] sm:text-[15px] font-semibold tracking-tight text-white">
                  {feature.title}
                </h3>
                <p className="text-[12px] sm:text-[13px] leading-[1.65] text-white/60 text-pretty max-w-[280px] sm:max-w-none">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
