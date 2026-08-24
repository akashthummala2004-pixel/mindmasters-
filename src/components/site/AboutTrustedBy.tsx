import { motion } from "framer-motion";
import { smoothViewport, staggerParent, fadeUp } from "@/lib/motion-presets";
import { ShieldCheck } from "lucide-react";

// Replace these placeholders with actual logo images when available
const companies = [
  "LOGOIPSUM", "Luminous", "LOGOIPSUM",
  "Logoipsum", "LOGOIPSUM", "Logoipsum"
];

export function AboutTrustedBy() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0f] py-20 sm:py-32 border-t border-white/[0.04]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Heading */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={smoothViewport}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md px-3 py-1 sm:py-1.5 text-[12px] font-medium text-white/70 mb-6"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Trusted by
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={smoothViewport}
              transition={{ delay: 0.1 }}
              className="text-[32px] sm:text-[40px] md:text-[44px] font-semibold tracking-tight text-white leading-[1.15]"
            >
              We work with<br />high-impact<br />Companies
            </motion.h2>
          </div>

          {/* Right Column: Grid */}
          <motion.div 
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={smoothViewport}
            className="grid grid-cols-2 md:grid-cols-3 gap-[1px] bg-white/[0.06] border border-white/[0.06] rounded-[24px] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
          >
            {companies.map((name, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                className="bg-[#0e0e14] flex items-center justify-center h-[120px] sm:h-[140px] px-8"
              >
                {/* Fallback to text if no image, can swap to <img> when ready */}
                <span className="text-[17px] sm:text-[19px] font-bold tracking-tighter text-white/40 flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-white/20 shrink-0" />
                  {name}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
