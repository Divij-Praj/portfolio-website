import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Wrap any block of content to have it fade + slide up into view the
 * moment it scrolls into the viewport, instead of animating on mount.
 * The shared easing curve here is what gives reveals across the whole
 * site a consistent, "designed" feel rather than each one looking
 * slightly different.
 */
export default function Reveal({ children, delay = 0, y = 28, className = "", once = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
