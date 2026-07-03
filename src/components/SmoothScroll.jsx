import { useEffect } from "react";
import Lenis from "lenis";
import { setLenisInstance } from "../lib/lenisInstance.js";

/**
 * Wraps the app and replaces native scroll with Lenis's eased scroll —
 * this is the single biggest contributor to the "buttery" feel, since
 * every scroll-linked animation in the app (Hero parallax, the
 * ContainerScroll tilt, fade-up reveals) reads from this smoothed
 * scroll position instead of the browser's raw, instant one.
 *
 * Respects prefers-reduced-motion by simply not engaging — native
 * scroll behavior is left untouched for anyone who's asked for that.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Hard-reset the native scroll position to zero before handing
    // control to Lenis. If the browser somehow still has a saved
    // scroll offset (e.g. after a hard refresh), this ensures Lenis
    // starts at the very top rather than animating toward that offset.
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
    });
    setLenisInstance(lenis);

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return children;
}
