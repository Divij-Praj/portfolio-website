import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { getLenisInstance } from "../lib/lenisInstance.js";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Work" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      // Already on home — just snap back to the very top
      const lenis = getLenisInstance();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // On another page — navigate to home (ScrollToTop handles the rest)
      navigate("/");
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-6 md:px-12 py-7 mix-blend-difference">
      <nav className="flex items-center justify-between">
        <button
          onClick={handleLogoClick}
          className="font-display text-xl font-extrabold tracking-tight text-paper bg-transparent border-none cursor-pointer"
          aria-label="Go to top of homepage"
        >
          DIVIJ
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10 font-mono text-xs uppercase tracking-widest">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `transition-opacity duration-200 text-paper ${
                    isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-paper font-mono text-sm"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {open && (
        <ul className="md:hidden mt-6 flex flex-col gap-4 font-mono text-sm uppercase tracking-widest">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={() => setOpen(false)}
                className="block text-paper opacity-80 hover:opacity-100"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
