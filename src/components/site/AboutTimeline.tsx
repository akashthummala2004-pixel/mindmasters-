import { motion } from "framer-motion";
import { smoothViewport, fadeUp } from "@/lib/motion-presets";
import { Clock } from "lucide-react";

const milestones = [
  {
    year: "Q1",
    title: "Mind Masters launch",
    description: "In early 2026, we joined forces to establish a clear mission: to make cutting-edge design accessible and affordable for all tech innovators. Our studio specializes in AI, SaaS, and tech solutions.",
  },
  {
    year: "Q2",
    title: "Agency debut",
    description: "Building on our launch, the studio quickly expanded, focusing on enhancing user experiences in tech and offering services like UI/UX design, branding, and product development.",
  },
  {
    year: "Q3",
    title: "Global expansion",
    description: "Mind Masters broadened its reach to international markets, launching services in Europe and Asia and opening a new design hub to make its innovative solutions available to a wider audience.",
  },
  {
    year: "Q4",
    title: "Scaling new heights",
    description: "We continued to scale our operations, partnering with specialized design firms and tech platforms, significantly enhancing our global presence and capabilities.",
  },
];

export function AboutTimeline() {
  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-24 border-t border-white/[0.04]">
      {/* Background glow effects */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-[0%] top-1/4 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.02), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16">
          
          {/* Left Column: Heading */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={smoothViewport}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md px-3 py-1 sm:py-1.5 text-[12px] font-medium text-white/70 mb-6"
            >
              <Clock className="h-3 w-3" />
              Timeline
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={smoothViewport}
              transition={{ delay: 0.1 }}
              className="text-[24px] sm:text-[30px] font-semibold tracking-tight text-white leading-[1.15] mb-3 text-balance"
            >
              Company milestones
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={smoothViewport}
              transition={{ delay: 0.2 }}
              className="text-[11px] sm:text-[12px] text-white/50"
            >
              Since our founding in 2026
            </motion.p>
          </div>

          {/* Right Column: Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[19px] sm:left-[21px] top-2 bottom-0 w-[1px] bg-white/[0.08]" />

            <div className="flex flex-col gap-8 sm:gap-12">
              {milestones.map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={smoothViewport}
                  className="relative flex gap-8 sm:gap-10"
                >
                  {/* Timeline Marker */}
                  <div className="relative z-10 flex shrink-0 items-start">
                    <div className="flex h-[38px] w-[38px] sm:h-[42px] sm:w-[42px] items-center justify-center rounded-lg bg-white text-[11px] sm:text-[12px] font-bold tracking-tight text-black ring-6 ring-black">
                      {item.year}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="pt-1.5 sm:pt-2">
                    <h3 className="mb-2 text-[14px] sm:text-[15px] font-semibold tracking-tight text-white">
                      {item.title}
                    </h3>
                    <p className="text-[11.5px] sm:text-[12px] leading-[1.65] text-white/55 text-pretty max-w-xl">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
