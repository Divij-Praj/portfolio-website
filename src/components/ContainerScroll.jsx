import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";

/**
 * Ported from an Aceternity-style Next.js/TSX component into plain JSX —
 * same scroll-driven 3D tilt mechanic, rebuilt without Next/Image or
 * TypeScript since this project doesn't use either. Tokens swapped to
 * this project's own palette instead of the original's hard-coded grays.
 */
export function ContainerScroll({ titleComponent, children }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Spring-smoothed scroll progress — this is what gives the tilt its
  // glide instead of snapping directly to scroll position.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.7, 0.9] : [1.05, 1]);

  const rotate = useTransform(smoothProgress, [0, 1], [20, 0]);
  const scale = useTransform(smoothProgress, [0, 1], scaleDimensions());
  const translate = useTransform(smoothProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[50rem] md:h-[70rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div className="py-10 md:py-40 w-full relative" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
}

function Header({ translate, titleComponent }) {
  return (
    <motion.div style={{ translateY: translate }} className="max-w-4xl mx-auto text-center">
      {titleComponent}
    </motion.div>
  );
}

function Card({ rotate, scale, children }) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[28rem] md:h-[36rem] w-full border-4 border-void-line p-2 md:p-6 bg-void-surface rounded-[24px]"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-void relative">
        {children}
      </div>
    </motion.div>
  );
}

export default ContainerScroll;
