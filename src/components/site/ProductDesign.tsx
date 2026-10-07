import { motion } from "framer-motion";
import { TrendingUp, Compass, BadgeCheck } from "lucide-react";
import { fadeUp, smoothViewport, staggerParent } from "@/lib/motion-presets";
import { SectionHeader } from "@/components/site/Primitives";

const features = [
  {
    icon: TrendingUp,
    title: "Increase conversions",
    desc:
      "We tighten sales funnels, sharpen copy and lean on high-converting layouts that move the metric that matters.",
  },
  {
    icon: Compass,
    title: "Stay ahead of the market",
    desc:
      "Every page looks 1:1 to the next. This is your chance to ship something unmistakably yours — distinct, deliberate, durable.",
  },
  {
    icon: BadgeCheck,
    title: "Top-notch quality",
    desc:
      "Pixel-clean interfaces, performance-tuned code and accessibility baked in — websites that look great and just work.",
  },
];

export function ProductDesign() {
  return (
    <section id="services" className="relative section-y container-x overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-[-12%] h-[40vw] w-[40vw] rounded-full" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.10), transparent 60%)", filter: "blur(110px)" }} />
      </div>

      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Design studio for AI"
          title={
            <>
              We streamline{" "}
              <span className="font-serif-display italic text-white">product design</span>
            </>
          }
          desc="Every interface we ship aligns to your product goals. We never design without testing — validation is non-negotiable."
        />

        {/* Hero device mock */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={smoothViewport}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-10 sm:mt-16 rounded-[24px] overflow-hidden ring-1 ring-white/[0.08] bg-[linear-gradient(180deg,#0d1018,#06070b)]"
        >
          {/* Fake dashboard mock */}
          <div className="relative h-[200px] xs:h-[260px] sm:h-[380px] md:h-[440px] lg:h-[520px] p-4 sm:p-8 lg:p-10">
            {/* top bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
              <div className="h-2 w-32 sm:w-44 rounded-full bg-white/10" />
              <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-white/10" />
            </div>

            {/* main content grid */}
            <div className="mt-6 sm:mt-10 grid grid-cols-12 gap-3 sm:gap-5">
              {/* sidebar */}
              <div className="hidden sm:flex col-span-3 lg:col-span-2 flex-col gap-2.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-7 rounded-lg ${
                      i === 1
                        ? "bg-[linear-gradient(90deg,rgba(91,140,255,0.35),rgba(91,140,255,0.10))] ring-1 ring-white/10"
                        : "bg-white/[0.04] ring-1 ring-white/[0.04]"
                    }`}
                  />
                ))}
              </div>

              {/* main panel */}
              <div className="col-span-12 sm:col-span-9 lg:col-span-10 grid grid-cols-6 gap-3 sm:gap-5">
                {/* stat tiles */}
                {[
                  { label: "Revenue", val: "$84,210", up: true },
                  { label: "Users", val: "12,486", up: true },
                  { label: "Sessions", val: "48.2K", up: false },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="col-span-2 rounded-xl ring-1 ring-white/[0.06] bg-[linear-gradient(180deg,rgba(20,23,31,0.85),rgba(10,12,18,0.85))] p-3 sm:p-4"
                  >
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/45">{s.label}</div>
                    <div className="mt-1 sm:mt-2 text-[16px] sm:text-[22px] lg:text-[26px] font-semibold tracking-[-0.02em] text-white">{s.val}</div>
                    <div className={`mt-1 inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium ${s.up ? "text-emerald-400" : "text-rose-400"}`}>
                      {s.up ? "▲ +12.4%" : "▼ -2.1%"}
                    </div>
                  </div>
                ))}

                {/* chart */}
                <div className="col-span-6 rounded-xl ring-1 ring-white/[0.06] bg-[linear-gradient(180deg,rgba(20,23,31,0.85),rgba(10,12,18,0.85))] p-3 sm:p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div>
                      <div className="text-[11px] sm:text-[12px] uppercase tracking-[0.18em] text-white/45">Performance</div>
                      <div className="text-[14px] sm:text-[16px] font-semibold text-white">Last 30 days</div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/45">
                      <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand)]" /> Revenue</span>
                      <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[color:var(--violet)]" /> Conversions</span>
                    </div>
                  </div>
                  <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="w-full h-[100px] sm:h-[160px] lg:h-[200px]">
                    <defs>
                      <linearGradient id="chartA" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(91,140,255,0.55)" />
                        <stop offset="100%" stopColor="rgba(91,140,255,0)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 90 C 40 70 60 60 100 55 S 180 30 220 35 280 25 320 18 360 22 400 14 L 400 120 L 0 120 Z"
                      fill="url(#chartA)"
                    />
                    <path
                      d="M0 90 C 40 70 60 60 100 55 S 180 30 220 35 280 25 320 18 360 22 400 14"
                      fill="none"
                      stroke="rgba(91,140,255,0.9)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M0 100 C 50 90 80 80 120 80 S 200 60 240 65 320 50 400 42"
                      fill="none"
                      stroke="rgba(167,139,250,0.7)"
                      strokeWidth="1.5"
                      strokeDasharray="2 3"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* bottom fade into background */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-b from-transparent to-[#06070b]" />
          </div>
        </motion.div>

        {/* Feature triplet */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={smoothViewport}
          className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
        >
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="card-premium ring-gradient p-5 sm:p-7"
              >
                <div className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.02))] ring-1 ring-white/10 text-white">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                </div>
                <h3 className="mt-4 sm:mt-5 text-[16px] sm:text-[18px] font-semibold tracking-[-0.01em] text-white">
                  {f.title}
                </h3>
                <p className="mt-1.5 sm:mt-2 text-[13px] sm:text-[14px] text-white/60 leading-[1.55] sm:leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
