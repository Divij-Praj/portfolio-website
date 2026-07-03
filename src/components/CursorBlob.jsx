import { useEffect, useRef } from "react";

export default function CursorBlob() {
  const blobRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    if (prefersReducedMotion || isTouchDevice) return;

    const handleMouseMove = (e) => {
      if (!blobRef.current) return;
      blobRef.current.style.transform = `translate(${e.clientX - 210}px, ${e.clientY - 210}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div ref={blobRef} className="cursor-blob" aria-hidden="true" />;
}
