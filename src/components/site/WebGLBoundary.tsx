import { Component, type ErrorInfo, type ReactNode } from "react";

interface WebGLBoundaryProps {
  children: ReactNode;
  /** Static stand-in shown if a WebGL child throws while rendering. */
  fallback?: ReactNode;
}

interface WebGLBoundaryState {
  hasError: boolean;
}

/**
 * Render/commit-phase safety net for WebGL-backed background effects. If a 3D
 * background throws during React rendering, we swap in a static fallback rather
 * than letting the exception unmount the whole page.
 *
 * Note: errors thrown inside async/`requestAnimationFrame` callbacks (e.g. a
 * lost GL context mid-loop) are NOT caught by React error boundaries — the
 * effect components handle those internally via try/catch + capability checks.
 * This boundary covers the remaining synchronous render-time failures.
 */
export class WebGLBoundary extends Component<
  WebGLBoundaryProps,
  WebGLBoundaryState
> {
  state: WebGLBoundaryState = { hasError: false };

  static getDerivedStateFromError(): WebGLBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.warn(
        "[WebGLBoundary] background effect failed, using static fallback:",
        error,
        info,
      );
    }
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}
