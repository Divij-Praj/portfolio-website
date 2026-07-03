/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // "void" tokens = the editorial black/white/ember system.
        // Names kept stable from the previous palette so every component
        // that already referenced them (text-signal, bg-void, etc.)
        // repaints automatically instead of needing per-file edits.
        void: {
          DEFAULT: "#0E0E0E", // base background
          surface: "#1A1A1A", // slightly raised panels / cards
          line: "#2A2A2A", // hairline borders
        },
        signal: {
          DEFAULT: "#FF3E00", // the one accent colour — ember orange
          dim: "#B32B00",
        },
        pulse: {
          DEFAULT: "#FF8A3D", // secondary accent, used sparingly (blob glow, gradients)
          dim: "#7A4A2A",
        },
        mist: {
          DEFAULT: "#9A9A9A", // body copy on dark
          dim: "#555555",
        },
        paper: "#FFFFFF", // pure white — headlines, outline-text fill
      },
      fontFamily: {
        display: ["Syne", "sans-serif"], // huge, heavy editorial headlines
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"], // kept for tech-stack tags only
      },
      animation: {
        marquee: "marquee 22s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
