import { motion } from "framer-motion";
import { LayoutGrid, Info, Mail, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";

type Tab = {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Route this tab navigates to. */
  to: string;
  /** Optional in-page section id (lives on the `to` route). */
  hash?: string;
};

const tabs: Tab[] = [
  { id: "services", label: "Services", icon: LayoutGrid, to: "/", hash: "process" },
  { id: "about",    label: "About us", icon: Info,       to: "/about" },
  { id: "contact",  label: "Contact",  icon: Mail,       to: "/contact" },
];

export function MobileBottomNav() {
  const { pathname } = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Track which in-page (hash) section is currently visible, so the matching
  // tab highlights while scrolling the home route.
  useEffect(() => {
    const ids = tabs.map((t) => t.hash).filter(Boolean) as string[];
    if (!ids.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { threshold: [0.25, 0.5], rootMargin: "-30% 0px -30% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const isActive = (t: Tab) => {
    if (t.to !== "/") return pathname === t.to;
    return pathname === "/" && (!t.hash || activeSection === t.hash);
  };

  // When already on the target route, smooth-scroll to the section instead of
  // a full navigation (keeps the in-page jump snappy on mobile).
  const handleTabClick =
    (t: Tab) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!t.hash || pathname !== t.to) return;
      const el = document.getElementById(t.hash);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `${t.to}#${t.hash}`);
    };

  return (
    <motion.nav
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="gpu-layer md:hidden fixed inset-x-3 z-40 bottom-safe"
      style={{ bottom: "calc(12px + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="relative flex items-center justify-between dock-glass rounded-[22px] px-1 py-1">
        {tabs.map((t) => {
          const active = isActive(t);
          const Icon = t.icon;
          return (
            <Link
              key={t.id}
              to={t.to}
              hash={t.hash}
              onClick={handleTabClick(t)}
              aria-label={t.label}
              aria-current={active ? "page" : undefined}
              className="relative flex flex-1 flex-col items-center justify-center gap-[3px] px-1 py-1.5 rounded-[16px] tap-press"
            >
              {active && (
                <motion.span
                  layoutId="mobile-nav-pill"
                  className="absolute inset-0 rounded-[16px] bg-white/[0.07] ring-1 ring-white/[0.08]"
                  style={{
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px -4px rgba(91,140,255,0.25)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon
                className={`relative h-[18px] w-[18px] transition-colors ${
                  active ? "text-[color:var(--brand)]" : "text-white/55"
                }`}
                strokeWidth={2}
              />
              <span
                className={`relative whitespace-nowrap text-[9.5px] leading-none tracking-[0.01em] transition-colors ${
                  active ? "text-white font-semibold" : "text-white/55 font-medium"
                }`}
              >
                {t.label}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
