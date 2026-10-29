import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { OOYE_URL } from "../lib/links.js";

const EASE = [0.22, 1, 0.36, 1];

/* All keyframes live here so this block is fully self-contained.
   The global prefers-reduced-motion rule in index.css already flattens
   every animation below for people who ask for less motion. */
const CSS = `
.arc-card{position:relative;overflow:hidden;height:100%;min-height:340px;display:flex;flex-direction:column;justify-content:flex-end;padding:1.5rem;border:1px solid #2A2A2A;background:#0E0E0E}
.arc-label{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.25em;text-transform:uppercase}

/* ---- 01 OOYE: drifting dotted globe ---- */
.arc-ooye{background:#040906;border-color:rgba(90,179,128,.35);transition:border-color .4s}
.arc-ooye:hover{border-color:#B7DCC3}
.arc-globe{position:absolute;left:50%;top:38%;width:78%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;
  background-image:radial-gradient(rgba(183,220,195,.6) 1px,transparent 1.6px);background-size:12px 12px;
  -webkit-mask-image:radial-gradient(circle,#000 52%,transparent 70%);mask-image:radial-gradient(circle,#000 52%,transparent 70%);
  opacity:.4;animation:arc-drift 30s linear infinite;transition:opacity .4s}
.arc-ooye:hover .arc-globe{opacity:.7}
.arc-glow{position:absolute;inset:0;background:radial-gradient(circle at 50% 38%,rgba(90,179,128,.25),transparent 62%)}
@keyframes arc-drift{to{background-position:120px 0}}

/* ---- 02 scanner ---- */
.arc-scan-line{position:absolute;left:0;right:0;height:90px;top:-90px;
  background:linear-gradient(to bottom,transparent,rgba(255,62,0,.28),transparent);animation:arc-scan 3.4s ease-in-out infinite}
@keyframes arc-scan{0%{top:-90px}100%{top:100%}}
.arc-bars{position:absolute;left:1.5rem;right:1.5rem;top:1.5rem;display:grid;gap:10px}
.arc-bar{height:10px;background:#2A2A2A;transform-origin:left;animation:arc-bar 2.8s ease-in-out infinite}
@keyframes arc-bar{0%,100%{transform:scaleX(.35);background:#2A2A2A}50%{transform:scaleX(1);background:#4a2a20}}
.arc-corner{position:absolute;width:16px;height:16px;border:0 solid #FF3E00}
.arc-progress{height:3px;background:#2A2A2A;overflow:hidden;margin-top:1rem}
.arc-progress>i{display:block;height:100%;width:100%;background:#FF3E00;transform-origin:left;animation:arc-load 4.2s cubic-bezier(.6,0,.2,1) infinite}
@keyframes arc-load{0%{transform:scaleX(0)}70%{transform:scaleX(.73)}82%{transform:scaleX(.73)}100%{transform:scaleX(.74);opacity:.2}}

.arc-glitch{position:relative;display:inline-block}
.arc-glitch::before,.arc-glitch::after{content:attr(data-t);position:absolute;left:0;top:0;width:100%;overflow:hidden;pointer-events:none}
.arc-glitch::before{color:#FF3E00;animation:arc-g1 3.2s infinite steps(1)}
.arc-glitch::after{color:#6cf;animation:arc-g2 3.2s infinite steps(1)}
@keyframes arc-g1{0%,100%{clip-path:inset(0 0 100% 0)}8%{clip-path:inset(10% 0 55% 0);transform:translate(-4px,0)}10%{clip-path:inset(60% 0 12% 0);transform:translate(4px,0)}12%{clip-path:inset(0 0 100% 0)}62%{clip-path:inset(35% 0 40% 0);transform:translate(-3px,0)}64%{clip-path:inset(0 0 100% 0)}}
@keyframes arc-g2{0%,100%{clip-path:inset(0 0 100% 0)}9%{clip-path:inset(50% 0 20% 0);transform:translate(4px,0)}11%{clip-path:inset(0 0 100% 0)}63%{clip-path:inset(15% 0 60% 0);transform:translate(3px,0)}65%{clip-path:inset(0 0 100% 0)}}

/* ---- 03 orbit ---- */
.arc-orbit{position:absolute;left:50%;top:30%;border-radius:50%;border:1px solid #2A2A2A;transform:translate(-50%,-50%)}
.arc-orbit>i{position:absolute;top:-4px;left:50%;width:8px;height:8px;margin-left:-4px;border-radius:50%;background:#FF3E00;box-shadow:0 0 14px 2px rgba(255,62,0,.7)}
.arc-spin{animation:arc-rot linear infinite}
@keyframes arc-rot{to{transform:translate(-50%,-50%) rotate(360deg)}}
.arc-core{position:absolute;left:50%;top:30%;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;
  background:radial-gradient(circle,#fff 0%,#FF8A3D 35%,#FF3E00 70%,transparent 72%);animation:arc-pulse 2.4s ease-in-out infinite}
@keyframes arc-pulse{0%,100%{transform:scale(.8);opacity:.75}50%{transform:scale(1.15);opacity:1}}
`;

/** Mouse-driven 3D tilt shared by all three cards. */
function Tilt({ children, index }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 160, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 160, damping: 18 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  );
}

function OoyeCard() {
  return (
    <a
      href={OOYE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="arc-card arc-ooye group"
      aria-label="Open OOYE, a one-stop finance board"
    >
      <div className="arc-glow" aria-hidden />
      <div className="arc-globe" aria-hidden />
      <span className="arc-label relative mb-2" style={{ color: "#5AB380" }}>
        01 / Live
      </span>
      <h3
        className="huge-type relative"
        style={{ fontSize: "clamp(2.8rem, 6vw, 3.6rem)", color: "#B7DCC3", textShadow: "0 0 40px rgba(90,179,128,.35)" }}
      >
        OOYE
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed" style={{ color: "rgba(183,220,195,.75)" }}>
        A one-stop finance board: live global markets, a particle globe and a
        built-in portfolio analyzer.
      </p>
      <span
        className="relative mt-4 font-mono text-xs uppercase tracking-widest transition-transform group-hover:translate-x-1"
        style={{ color: "#B7DCC3" }}
      >
        Enter OOYE ↗
      </span>
    </a>
  );
}

function ScannerCard() {
  return (
    <div className="arc-card">
      <div className="arc-bars" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="arc-bar" style={{ animationDelay: `${i * 0.28}s`, width: `${92 - i * 13}%` }} />
        ))}
      </div>
      <div className="arc-scan-line" aria-hidden />
      <span className="arc-corner" style={{ top: 10, left: 10, borderTopWidth: 2, borderLeftWidth: 2 }} aria-hidden />
      <span className="arc-corner" style={{ top: 10, right: 10, borderTopWidth: 2, borderRightWidth: 2 }} aria-hidden />
      <span className="arc-corner" style={{ bottom: 10, left: 10, borderBottomWidth: 2, borderLeftWidth: 2 }} aria-hidden />
      <span className="arc-corner" style={{ bottom: 10, right: 10, borderBottomWidth: 2, borderRightWidth: 2 }} aria-hidden />

      <span className="arc-label relative mb-2 text-signal">02 / Incoming</span>
      <h3 className="huge-type relative text-paper" style={{ fontSize: "clamp(2rem, 4.4vw, 2.6rem)" }}>
        <span className="arc-glitch" data-t="CLASSIFIED">CLASSIFIED</span>
      </h3>
      <p className="relative mt-3 text-sm text-mist">Something crazy is loading.</p>
      <div className="arc-progress relative" aria-hidden>
        <i />
      </div>
    </div>
  );
}

function OrbitCard() {
  return (
    <div className="arc-card">
      <div aria-hidden>
        <div className="arc-orbit arc-spin" style={{ width: "52%", aspectRatio: 1, animationDuration: "14s" }}>
          <i />
        </div>
        <div className="arc-orbit arc-spin" style={{ width: "38%", aspectRatio: 1, animationDuration: "9s", animationDirection: "reverse" }}>
          <i style={{ background: "#fff", boxShadow: "0 0 12px 2px rgba(255,255,255,.6)" }} />
        </div>
        <div className="arc-orbit arc-spin" style={{ width: "25%", aspectRatio: 1, animationDuration: "5s" }}>
          <i style={{ background: "#FF8A3D" }} />
        </div>
        <div className="arc-core" />
      </div>

      <span className="arc-label relative mb-2 text-signal">03 / Incoming</span>
      <h3 className="huge-type relative text-paper" style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.4rem)" }}>
        Under wraps
      </h3>
      <p className="relative mt-3 text-sm text-mist">A motion-heavy build. Not telling yet.</p>
      <span className="relative mt-4 font-mono text-xs uppercase tracking-widest text-mist-dim">Stay tuned</span>
    </div>
  );
}

/**
 * Row of three cards shown at the top of the Project archive page:
 * OOYE (live) plus two teaser slots with their own motion treatments.
 * Static content, so it renders regardless of whether the API responds.
 */
export default function ArchiveHighlights() {
  return (
    <div className="mb-16">
      <style>{CSS}</style>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Tilt index={0}>
          <OoyeCard />
        </Tilt>
        <Tilt index={1}>
          <ScannerCard />
        </Tilt>
        <Tilt index={2}>
          <OrbitCard />
        </Tilt>
      </div>
    </div>
  );
}
