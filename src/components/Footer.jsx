import { Link } from "react-router-dom";
import { getLenisInstance } from "../lib/lenisInstance.js";

function hardScrollReset() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  const lenis = getLenisInstance();
  if (lenis) lenis.scrollTo(0, { immediate: true });
}

export default function Footer() {
  return (
    <footer className="border-t border-void-line">
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <Link
          to="/contact"
          onClick={hardScrollReset}
          className="huge-type inline-block text-paper hover:text-signal transition-colors"
          style={{ fontSize: "clamp(2.5rem, 9vw, 6rem)" }}
        >
          Let's — Work
        </Link>
      </div>

      <div className="border-t border-void-line">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-xs uppercase tracking-widest text-mist-dim">
          <p>© {new Date().getFullYear()} Divij Prajapati</p>
          <div className="flex gap-6">
            <a
              href="https://github.com/Divij-Praj"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-signal transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/divij-prajapati"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-signal transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/ohh_divij"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-signal transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
