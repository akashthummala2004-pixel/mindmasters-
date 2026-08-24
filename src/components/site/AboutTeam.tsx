import { motion } from "framer-motion";
import { smoothViewport } from "@/lib/motion-presets";
import { Users } from "lucide-react";

import team1 from "@/assets/team-1-CCFIjNpZ.png";
import team2 from "@/assets/team-2-CiORzvsn.png";
import team3 from "@/assets/team-3-BRdUtP1U.png";

const teamMembers = [
  {
    name: "Akash Thummala",
    role: "Founder",
    funFact: "",
    image: team1,
    col: 0
  },
  {
    name: "Avinash Thummala",
    role: "Co-Founder",
    funFact: "",
    image: team2,
    col: 1
  },
  {
    name: "Mind Masters AI Solutions",
    role: "AI & Development Team",
    funFact: "",
    image: team3,
    col: 2
  }
];

export function AboutTeam() {
  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-24 border-t border-white/[0.04]">
      {/* Background glow effects */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-[10%] top-1/4 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.02), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute right-[10%] top-3/4 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.02), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={smoothViewport}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md px-3 py-1 sm:py-1.5 text-[12px] font-medium text-white/70 mb-6"
          >
            <Users className="h-3 w-3" />
            Our Team
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={smoothViewport}
            transition={{ delay: 0.1 }}
            className="text-[24px] sm:text-[30px] md:text-[36px] font-semibold tracking-tight text-white leading-[1.15] mb-3"
          >
            Meet our leaders.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={smoothViewport}
            transition={{ delay: 0.2 }}
            className="text-[11px] sm:text-[12px] text-white/50"
          >
            Meet the minds shaping our future
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {/* Column 1 */}
          <div className="flex flex-col gap-8 sm:gap-10">
            {teamMembers.filter(m => m.col === 0).map((member, i) => (
              <TeamCard key={i} member={member} delay={0} />
            ))}
          </div>

          {/* Column 2 (Offset on desktop) */}
          <div className="flex flex-col gap-8 sm:gap-10 md:mt-16">
            {teamMembers.filter(m => m.col === 1).map((member, i) => (
              <TeamCard key={i} member={member} delay={0.1} />
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-8 sm:gap-10">
            {teamMembers.filter(m => m.col === 2).map((member, i) => (
              <TeamCard key={i} member={member} delay={0.2} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function TeamCard({ member, delay }: { member: any, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={smoothViewport}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className="group flex flex-col"
    >
      <div className="relative mb-3 sm:mb-4 overflow-hidden rounded-2xl bg-white/[0.02] ring-1 ring-white/[0.05] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
        <img
          src={member.image}
          alt={member.name}
          width={367}
          height={550}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <h3 className="text-[14px] sm:text-[15px] font-semibold tracking-tight text-white mb-2 pb-2 border-b border-white/[0.08]">
        {member.name}
      </h3>
      <div className="flex flex-col gap-1 mt-1">
        <span className="text-[10px] font-bold text-white/80">{member.role}</span>
        {member.funFact && (
          <span className="text-[9px] text-white/40">{member.funFact}</span>
        )}
      </div>
    </motion.div>
  );
}
