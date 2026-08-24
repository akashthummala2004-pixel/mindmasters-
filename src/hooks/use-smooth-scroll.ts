import Lenis from "lenis";
import { useEffect } from "react";

/** Fixed nav clearance for in-page anchor targets */
const ANCHOR_OFFSET = -92;

export const smoothEase = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Touch-primary devices (phones/tablets) keep the browser's native,
    // hardware-accelerated scrolling. Running Lenis there hijacks scrolling and
    // its scroll-lock puts `overflow: clip` on <html>, which can leave the page
    // unable to scroll on mobile. Since touch is already native (syncTouch:false),
    // Lenis only benefits mouse-wheel users — so skip it entirely on touch.
    const isTouchPrimary = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;

    let lenis: Lenis | null = null;
    let raf = 0;
    let bodyObserver: MutationObserver | null = null;

    if (!isTouchPrimary) {
      lenis = new Lenis({
        // Snappier follow so content tracks the wheel 1:1 instead of drifting.
        lerp: 0.1,
        duration: 1.1,
        easing: smoothEase,
        smoothWheel: true,
        wheelMultiplier: 1,
        syncTouch: false,
        touchMultiplier: 1.5,
        autoRaf: false,
      });

      const instance = lenis;
      const tick = (time: number) => {
        instance.raf(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      // Pause Lenis while the body is scroll-locked (e.g. mobile menu open on a
      // small desktop window) and resume afterwards.
      const syncLenisWithBodyLock = () => {
        if (document.body.style.overflow === "hidden") instance.stop();
        else instance.start();
      };
      bodyObserver = new MutationObserver(syncLenisWithBodyLock);
      bodyObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["style"],
      });
    }

    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest(
        "a[href^='#']",
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#" || href.length < 2) return;

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      e.preventDefault();

      if (lenis) {
        lenis.scrollTo(target, {
          offset: ANCHOR_OFFSET,
          duration: 1.1,
          easing: smoothEase,
        });
      } else {
        // Native smooth scroll with fixed-nav offset (touch devices).
        const top =
          target.getBoundingClientRect().top + window.scrollY + ANCHOR_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
      }

      window.history.pushState(null, "", href);
    };

    document.addEventListener("click", onAnchorClick, { capture: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onAnchorClick, { capture: true });
      bodyObserver?.disconnect();
      lenis?.destroy();
    };
  }, []);
}
