import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { smoothViewport } from "@/lib/motion-presets";

export function DiscussCTA() {
  return (
    <section id="discuss" className="relative section-y container-x overflow-hidden bg-black">
      {/* dotted backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(80% 60% at 50% 40%, #000 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(80% 60% at 50% 40%, #000 30%, transparent 85%)",
        }}
      />
      {/* spotlight glow from top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70%]"
        style={{
          background:
            "radial-gradient(40% 70% at 50% 0%, rgba(255,255,255,0.10), transparent 70%)",
        }}
      />
      {/* sparkle dots */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute left-[8%] top-[18%] h-[2px] w-[2px] rounded-full bg-white/50" />
        <span className="absolute left-[14%] top-[55%] h-[3px] w-[3px] rounded-full bg-white/35" />
        <span className="absolute left-[20%] top-[78%] h-[2px] w-[2px] rounded-full bg-white/45" />
        <span className="absolute right-[6%] top-[12%] h-[3px] w-[3px] rounded-full bg-white/40" />
        <span className="absolute right-[12%] top-[40%] h-[2px] w-[2px] rounded-full bg-white/55" />
        <span className="absolute right-[18%] top-[70%] h-[2px] w-[2px] rounded-full bg-white/35" />
        <span className="absolute right-[24%] top-[88%] h-[3px] w-[3px] rounded-full bg-white/30" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={smoothViewport}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-3xl flex flex-col items-center text-center py-4"
      >
        {/* glossy phone icon */}
        <div className="relative mb-7 sm:mb-9">
          <span
            aria-hidden
            className="absolute -inset-6 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.18), transparent 60%)",
              filter: "blur(18px)",
            }}
          />
          <div
            className="relative inline-flex h-14 w-14 sm:h-[60px] sm:w-[60px] items-center justify-center rounded-[14px] ring-1 ring-white/15"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 100%)",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.35) inset, 0 -1px 0 rgba(0,0,0,0.25) inset, 0 14px 40px -10px rgba(0,0,0,0.7)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <Phone
              className="h-6 w-6 sm:h-7 sm:w-7 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
              strokeWidth={2}
              fill="currentColor"
              stroke="none"
            />
          </div>
        </div>

        <h2 className="text-[28px] sm:text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.1] text-white text-balance">
          Need To Discuss Before
          <br className="hidden sm:block" />
          {" "}Starting?
        </h2>

        <Link
          to="/schedule"
          className="group mt-7 sm:mt-9 inline-flex items-center gap-2 rounded-full bg-black ring-1 ring-white/15 px-5 sm:px-6 py-2.5 sm:py-3 text-[13.5px] sm:text-[14px] font-semibold text-white transition-colors hover:bg-[#0f1218] hover:ring-white/25 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
        >
          Schedule a 1:1 Meeting
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2.2}
          />
        </Link>
      </motion.div>
    </section>
  );
}
