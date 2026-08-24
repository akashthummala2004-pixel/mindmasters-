import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "918500729621";
const MESSAGE = "Hi Mind Masters — I'd like to discuss a project.";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="gpu-layer wa-fab fixed right-3 md:right-6 z-50 group inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.55),0_1px_0_rgba(255,255,255,0.25)_inset] transition-shadow"
      style={{ background: "linear-gradient(180deg, #2ce070, #1ebe57)" }}
    >
      {/* breathing halo */}
      <span aria-hidden className="absolute inset-0 rounded-full opacity-60 animate-glow-pulse" style={{ background: "radial-gradient(circle, rgba(37,211,102,0.6), transparent 70%)" }} />
      <svg
        viewBox="0 0 24 24"
        className="relative h-[18px] w-[18px] sm:h-6 sm:w-6 fill-current"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.55 0 .26 5.29.26 11.8a11.7 11.7 0 0 0 1.6 5.92L0 24l6.45-1.69a11.8 11.8 0 0 0 5.61 1.43h.01c6.51 0 11.8-5.29 11.8-11.8a11.7 11.7 0 0 0-3.35-8.46zM12.06 21.6h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.83 1 1.02-3.73-.24-.39a9.78 9.78 0 0 1-1.51-5.1c0-5.42 4.42-9.84 9.84-9.84 2.63 0 5.1 1.02 6.95 2.88a9.77 9.77 0 0 1 2.88 6.96c0 5.42-4.41 9.8-9.74 9.8zm5.39-7.34c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.77.97-.94 1.17-.17.2-.34.22-.64.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.18-.24-.57-.48-.5-.66-.5-.17-.01-.37-.01-.57-.01s-.52.07-.79.37c-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.34z" />
      </svg>
    </motion.a>
  );
}
