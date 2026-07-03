import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Clean, minimal hero — pure black background, single oversized
 * wordmark, grey tagline. No photo, no parallax, no drift.
 * Matches the reference screenshot exactly.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center bg-void px-4"
    >
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: EASE }}
        className="huge-type text-paper text-center"
        style={{ fontSize: "clamp(5rem, 20vw, 14rem)" }}
      >
        Divij
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.3, ease: EASE }}
        className="mt-5 font-body text-sm md:text-base text-mist text-center tracking-wide"
      >
        I build. I design.{" "}
        <span className="text-paper font-semibold">I tell stories.</span>
      </motion.p>
    </section>
  );
}
