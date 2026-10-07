import { motion } from "framer-motion";
import { useState } from "react";
import mascot from "@/assets/chatbot.png";

export function FloatingChatbot() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.6 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="hidden sm:block fixed bottom-6 right-6 z-50 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="relative pointer-events-auto"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Pulsing aura behind mascot */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.82 0.18 210 / 0.35) 0%, transparent 65%)",
            filter: "blur(20px)",
          }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Eye-glow layer (pink) */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 38%, oklch(0.78 0.21 25 / 0.55) 0%, transparent 35%)",
            filter: "blur(8px)",
            mixBlendMode: "screen",
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Mascot — idle float + subtle tilt */}
        <motion.img
          src={mascot}
          alt="Mind Masters AI chatbot"
          width={96}
          height={96}
          draggable={false}
          className="relative block w-24 h-24 md:w-28 md:h-28 select-none"
          style={{
            filter: "drop-shadow(0 12px 24px oklch(0 0 0 / 0.45))",
          }}
          animate={
            hovered
              ? { y: -8, rotate: [-3, 3, -3], scale: 1.08 }
              : { y: [0, -10, 0], rotate: [-2, 2, -2] }
          }
          transition={{
            duration: hovered ? 0.9 : 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Hover speech bubble */}
        <motion.div
          initial={false}
          animate={
            hovered
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 8, scale: 0.92 }
          }
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap glass rounded-full px-4 py-2 text-xs font-medium pointer-events-none"
        >
          Need an AI partner? Let's talk.
        </motion.div>
      </div>
    </motion.div>
  );
}
