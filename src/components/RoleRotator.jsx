import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ROLES = ["Student", "Developer", "Designer", "Photographer"];

/**
 * A continuously rolling label — one role visible at a time, each one
 * sliding up and out while the next slides in underneath it.
 */
export default function RoleRotator({ interval = 2200 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <div className="h-8 md:h-10 overflow-hidden font-mono text-sm md:text-base uppercase tracking-widest">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={{ y: 26, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -26, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="block text-signal"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
