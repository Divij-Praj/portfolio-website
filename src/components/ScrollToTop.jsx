import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenisInstance } from "../lib/lenisInstance.js";

/**
 * Without this, navigating from a long page (e.g. clicking "Let's — Work"
 * in the footer while scrolled all the way down) leaves the next page's
 * scroll position wherever the browser last left it — so Contact, for
 * example, opens already scrolled past the heading. This resets to the
 * top on every route change, going through Lenis when it's active so its
 * internal scroll state stays in sync with the real DOM scroll position.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Always reset the native scroll position immediately — this works
    // even during AnimatePresence's exit animation (when Lenis may be
    // mid-ease and ignoring programmatic scrollTo calls).
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Then sync Lenis's internal state so its next tick doesn't
    // animate back to wherever it thought it was.
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}
