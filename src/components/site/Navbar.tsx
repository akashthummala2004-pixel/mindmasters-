import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useCalModal } from "@/components/site/CalModalContext";

import companyLogo from "@/assets/companylogo.png";

type NavLink = {
  href: string;
  label: string;
  external?: boolean;
};

const links: NavLink[] = [
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
  {
    href: "https://cold-call-demo.mindmastersai.services/static/index.html",
    label: "AI Voice Agent",
    external: true,
  },
];

export function Navbar() {
  const { openCalModal } = useCalModal();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* track active section for nav highlight */
  useEffect(() => {
    const ids = links
      .filter((l) => !l.external)
      .map((l) => l.href.split("#")[1])
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`/#${visible.target.id}`);
      },
      { threshold: [0.2, 0.5], rootMargin: "-25% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`gpu-layer fixed inset-x-0 top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
          scrolled
            ? "bg-[#08090c]/90 border-white/[0.08]"
            : "bg-[#08090c]/75 border-white/[0.06]"
        }`}
      >
        <nav className="mx-auto flex h-16 sm:h-[72px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* Logo + brand — LEFT (Clickable link to home route /) */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group cursor-pointer">
            <div className="relative flex items-center">
              <span className="absolute -inset-1 rounded-full bg-[radial-gradient(circle,rgba(91,140,255,0.45),transparent_60%)] opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
              <img
                src={companyLogo}
                alt="Mind Masters AI Solutions"
                width={1536}
                height={1024}
                decoding="async"
                className="relative h-8 sm:h-9 lg:h-10 w-auto object-contain rounded-lg drop-shadow-[0_2px_12px_rgba(56,189,248,0.3)] transition-transform group-hover:scale-[1.02]"
              />
            </div>
            <span className="text-[15px] sm:text-[17px] font-semibold tracking-tight text-white whitespace-nowrap group-hover:text-white/95 transition-colors">
              <span>Mind Masters</span>
              <span className="text-[color:var(--violet)] mx-1">·</span>
              <span className="font-serif-display italic text-white/85">AI</span>
            </span>
          </Link>

          {/* Desktop links — CENTER (Single Pill Container) */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1.5 p-1.5 rounded-full bg-[#0d0e12]/85 border border-white/10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]">
            {links.map((l) => {
              const isActive = !l.external && active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  className={`px-4 lg:px-5 py-1.5 text-[13.5px] lg:text-[14px] font-medium transition-all rounded-full ${
                    isActive
                      ? "text-white bg-white/[0.10] shadow-sm"
                      : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </div>

          {/* CTA — RIGHT (Rounded Pill Button) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => openCalModal()}
              className="hidden sm:inline-flex group items-center gap-2 rounded-full bg-gradient-to-b from-[#1c1d24] via-[#14151b] to-[#0c0d10] border border-white/15 text-white text-[13.5px] lg:text-[14px] font-medium px-5 lg:px-6 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12)] hover:border-white/25 transition-all cursor-pointer"
            >
              <span>Schedule a 1:1 Meeting</span>
              <ArrowRight
                className="h-3.5 w-3.5 text-white/90 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2.2}
              />
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              suppressHydrationWarning
              className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/[0.06] ring-1 ring-white/10 text-white tap-press transition-colors hover:bg-white/[0.10]"
            >
              {open ? (
                <X className="h-4.5 w-4.5" strokeWidth={2.4} />
              ) : (
                <Menu className="h-4.5 w-4.5" strokeWidth={2.4} />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: -12, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -12, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed left-3 right-3 top-[72px] z-50 dock-glass rounded-3xl p-3 shadow-[0_20px_60px_rgb(0,0,0,0.5)] border border-white/10"
            >
              <div className="flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-between px-3.5 py-2.5 text-[14.5px] font-medium text-white/90 rounded-2xl hover:bg-white/[0.06] transition-colors tap-press"
                  >
                    {l.label}
                    <ArrowRight
                      className="h-4 w-4 text-[color:var(--brand)]/80"
                      strokeWidth={2.2}
                    />
                  </motion.a>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openCalModal();
                }}
                className="mt-3 flex items-center justify-center gap-2 w-full rounded-full bg-gradient-to-b from-[#1c1d24] via-[#14151b] to-[#0c0d10] border border-white/15 text-white text-sm font-medium px-4 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:bg-[#14171f] transition-all cursor-pointer"
              >
                <span>Schedule a 1:1 Meeting</span>
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

