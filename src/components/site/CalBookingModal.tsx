import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Calendar, Sparkles } from "lucide-react";

type CalBookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  calLink?: string;
};

export function CalBookingModal({
  isOpen,
  onClose,
  calLink = "mm-ai-solutions-mzfol6/30min",
}: CalBookingModalProps) {
  useEffect(() => {
    (async () => {
      try {
        const cal = await getCalApi({ namespace: "30min" });
        cal("ui", {
          theme: "dark",
          styles: { branding: { brandColor: "#74f5ff" } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      } catch (err) {
        console.error("Cal.com API init error:", err);
      }
    })();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] h-[720px] rounded-3xl bg-[#090a0d] border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-[#0c0e14]">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#74f5ff]/10 text-[#74f5ff] border border-[#74f5ff]/20">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-1.5">
                    Schedule 1:1 Meeting
                    <Sparkles className="w-3.5 h-3.5 text-[#74f5ff]" />
                  </h3>
                  <p className="text-[11px] text-white/50">Mind Masters AI Solutions</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close booking modal"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Cal.com Embedded Frame */}
            <div className="relative flex-1 w-full bg-[#06070b] overflow-hidden">
              <Cal
                namespace="30min"
                calLink={calLink}
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                config={{ layout: "month_view", theme: "dark" }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
