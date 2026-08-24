/**
 * WebGL capability + device-tier helpers used to gracefully degrade the
 * decorative WebGL backgrounds (Three.js `GLSLHills`/`DottedSurface` and the
 * ogl-based `LightRays`) on machines that can't create a WebGL context — or
 * shouldn't, for performance — instead of crashing the whole app.
 */

let cachedSupport: boolean | null = null;

/**
 * True only if the browser can actually create a WebGL (2 or 1) context.
 * Result is cached because the answer never changes for a given session and
 * creating throwaway contexts is not free.
 */
export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }
  if (cachedSupport !== null) return cachedSupport;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    cachedSupport =
      !!gl && typeof (gl as WebGLRenderingContext).getParameter === "function";
  } catch {
    cachedSupport = false;
  }
  return cachedSupport;
}

/**
 * Conservative heuristic for genuinely low-end / old hardware (or an explicit
 * user preference) where the GPU-heavy animated background should be skipped
 * in favour of a lightweight static fallback. Intentionally strict so we don't
 * disable effects for mainstream laptops/phones.
 */
export function prefersLightweightGraphics(): boolean {
  if (typeof window === "undefined") return false;

  const reducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const nav = navigator as Navigator & { deviceMemory?: number };
  const veryLowMemory =
    typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2;
  const veryFewCores =
    typeof nav.hardwareConcurrency === "number" &&
    nav.hardwareConcurrency <= 2;

  return Boolean(reducedMotion || veryLowMemory || veryFewCores);
}

/** Should we attempt to mount a WebGL effect at all on this device? */
export function canRenderWebGL(): boolean {
  return isWebGLAvailable() && !prefersLightweightGraphics();
}
