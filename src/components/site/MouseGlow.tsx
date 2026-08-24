import { useEffect, useRef } from "react";

/**
 * Ambient cursor light — subtle, expensive-feeling.
 * Disabled on touch + reduced-motion. Performance-friendly (raf-throttled).
 */
export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      const el = ref.current;
      if (el) el.style.transform = `translate3d(${cx - 320}px, ${cy - 320}px, 0)`;
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[640px] w-[640px] rounded-full opacity-60 mix-blend-screen will-change-transform"
      style={{
        background:
          "radial-gradient(closest-side, rgba(91,140,255,0.18) 0%, rgba(167,139,250,0.08) 35%, transparent 70%)",
        filter: "blur(12px)",
      }}
    />
  );
}
