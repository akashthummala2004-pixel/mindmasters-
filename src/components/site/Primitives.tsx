import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fadeUp, smoothViewport, staggerParent } from "@/lib/motion-presets";

/* ────────────────────────────────────────────────────────────────────────
   SECTION HEADER — eyebrow + display heading + lede
   ──────────────────────────────────────────────────────────────────────── */
export function SectionHeader({
  eyebrow,
  title,
  desc,
  align = "left",
  tone = "default",
  titleClassName,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  desc?: React.ReactNode;
  align?: "left" | "center";
  tone?: "default" | "muted";
  titleClassName?: string;
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={smoothViewport}
      variants={staggerParent}
      className={`max-w-2xl ${alignment}`}
    >
      {eyebrow && (
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full glass px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[11px] uppercase tracking-[0.20em] sm:tracking-[0.22em] text-[color:var(--foreground-dim)] mb-3 sm:mb-5"
        >
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--brand)] opacity-60 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--brand)]" />
          </span>
          {eyebrow}
        </motion.div>
      )}

      <motion.h2
        variants={fadeUp}
        className={titleClassName || "main-section-heading text-white text-balance"}
      >
        {title}
      </motion.h2>

      {desc && (
        <motion.p
          variants={fadeUp}
          className={`mt-3 sm:mt-5 text-[14px] sm:text-base md:text-lg leading-[1.55] sm:leading-relaxed text-pretty ${
            tone === "muted" ? "text-[color:var(--foreground-dim)]" : "text-[color:var(--foreground-muted)]"
          } max-w-xl ${align === "center" ? "mx-auto" : ""}`}
        >
          {desc}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   ANIMATED STAT — counts up on scroll into view
   ──────────────────────────────────────────────────────────────────────── */
export function Stat({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col">
      <div className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-gradient-brand tabular-nums">
        {n.toLocaleString()}
        <span className="text-[color:var(--brand)]">{suffix}</span>
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.18em] text-[color:var(--foreground-dim)]">
        {label}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   AURORA BACKGROUND — soft mesh blobs (per-section)
   ──────────────────────────────────────────────────────────────────────── */
export function Aurora({
  className = "",
  variant = "blue",
}: {
  className?: string;
  variant?: "blue" | "violet" | "mixed" | "subtle";
}) {
  const swatches: Record<string, [string, string]> = {
    blue: ["rgba(91,140,255,0.22)", "rgba(91,140,255,0.10)"],
    violet: ["rgba(167,139,250,0.22)", "rgba(167,139,250,0.10)"],
    mixed: ["rgba(91,140,255,0.22)", "rgba(167,139,250,0.18)"],
    subtle: ["rgba(91,140,255,0.10)", "rgba(167,139,250,0.08)"],
  };
  const [a, b] = swatches[variant];
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <div
        className="absolute -top-[20%] -left-[10%] h-[55vw] w-[55vw] rounded-full"
        style={{ background: `radial-gradient(circle, ${a}, transparent 60%)`, filter: "blur(110px)" }}
      />
      <div
        className="absolute -bottom-[20%] -right-[10%] h-[45vw] w-[45vw] rounded-full"
        style={{ background: `radial-gradient(circle, ${b}, transparent 60%)`, filter: "blur(110px)" }}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   SECTION DIVIDER — hairline glow line between sections
   ──────────────────────────────────────────────────────────────────────── */
export function SectionDivider() {
  return (
    <div aria-hidden className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
      <div className="divider-glow" />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   GRADIENT BUTTON — premium primary CTA
   ──────────────────────────────────────────────────────────────────────── */
export function PrimaryButton({
  children,
  href,
  onClick,
  className = "",
  size = "md",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "text-[13px] px-4 py-2",
    md: "text-sm px-5 py-2.5",
    lg: "text-[15px] sm:text-base px-6 py-3.5",
  };
  const cls = `group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white ${sizes[size]} ${className} bg-[linear-gradient(180deg,#7099ff,#3b67ff)] hover:bg-[linear-gradient(180deg,#85a8ff,#4d77ff)] shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_8px_24px_-8px_rgba(91,140,255,0.55)] transition-colors`;
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls} suppressHydrationWarning>
      {children}
    </button>
  );
}
