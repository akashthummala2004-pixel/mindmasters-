import { motion } from "framer-motion";
import mascot from "@/assets/chatbot.png";

export function HeroMascot() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Floating mascot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-[85%] max-w-[560px]"
        style={{ perspective: "1000px" }}
      >
        <motion.img
          src={mascot}
          alt="Mind Masters AI mascot — a hooded teal robot with glowing eyes"
          className="w-full h-auto"
          style={{ filter: "drop-shadow(0 25px 50px oklch(0 0 0 / 0.45))" }}
          animate={{
            y: [0, -18, 0],
            rotateY: [-6, 6, -6],
            rotateX: [2, -2, 2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          draggable={false}
        />
      </motion.div>

      {/* HUD chips — pushed to corners so they don't cover the mascot */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute top-[6%] left-0 glass rounded-xl px-3 py-2 text-[10px] z-20"
      >
        <div className="text-muted-foreground uppercase tracking-[0.22em]">Neural Core</div>
        <div className="font-display text-base">Online</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-[6%] right-0 glass rounded-xl px-3 py-2 text-[10px] z-20"
      >
        <div className="text-muted-foreground uppercase tracking-[0.22em]">Latency</div>
        <div className="font-display text-base">12.4ms</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="absolute top-[42%] right-0 translate-x-2 glass rounded-xl px-3 py-2 text-[10px] z-20"
      >
        <div className="text-muted-foreground uppercase tracking-[0.22em]">Agents</div>
        <div className="font-display text-base">42 active</div>
      </motion.div>
    </div>
  );
}
