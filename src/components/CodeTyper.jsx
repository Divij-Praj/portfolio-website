import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  The "script" — lines of real-looking JS about Divij, typed live   */
/* ------------------------------------------------------------------ */
const TABS = {
  "about.js": [
    'const divij = {',
    "  name:     'Divij Prajapati',",
    "  role:     'Student · Developer · Designer',",
    "  location: 'India 🇮🇳',",
    '',
    '  coffee: Infinity,    // critical dependency',
    '  sleep:  false,       // known bug, wont fix',
    '',
    '  greet() {',
    '    return `Hey! I am ${this.name}.`;',
    '  },',
    '',
    '  build(idea) {',
    '    while (!idea.isShipped) {',
    '      idea.iterate();',
    '      this.coffee--;',
    '    }',
    "    return 'shipped it 🚀';",
    '  },',
    '',
    '  tellStory(moment) {',
    '    return this.camera.capture(moment);',
    '  },',
    '};',
    '',
    '// What is Divij up to?',
    "divij.build({ name: 'portfolio' });",
    "// → shipped it 🚀",
  ],
  "skills.js": [
    "const skills = {",
    "",
    "  code: [",
    "    'React', 'Node.js', 'Express',",
    "    'SQLite', 'REST APIs', 'Git',",
    "  ],",
    "",
    "  design: [",
    "    'Typography', 'Motion Design',",
    "    'Editorial Layout', 'Figma',",
    "  ],",
    "",
    "  photography: [",
    "    'Portrait', 'Street',",
    "    'Film', 'Documentary',",
    "  ],",
    "",
    "  currentlyLearning: [",
    "    'Three.js', 'GSAP',",
    "    '...and always something new',",
    "  ],",
    "",
    "};",
    "",
    "// philosophy:",
    "// every field teaches a different",
    "// way of thinking. use them all.",
  ],
};

const KEYWORDS = /^(const|let|var|function|return|while|for|if|else|new|true|false|this)\b/;

/* Simple tokeniser — splits one line into coloured React spans */
function SyntaxLine({ text }) {
  if (!text) return <span className="text-transparent select-none">_</span>;

  const spans = [];
  let rest = text;
  let i = 0;

  while (rest.length > 0) {
    // Comment
    if (rest.startsWith('//')) {
      spans.push(<span key={i++} className="text-mist opacity-60 italic">{rest}</span>);
      break;
    }
    // String (single or backtick)
    const strM = rest.match(/^(['`])(?:(?!\1).|\\.)*\1/);
    if (strM) {
      spans.push(<span key={i++} className="text-green-400">{strM[0]}</span>);
      rest = rest.slice(strM[0].length);
      continue;
    }
    // Keyword
    const kwM = rest.match(KEYWORDS);
    if (kwM) {
      spans.push(<span key={i++} className="text-signal">{kwM[0]}</span>);
      rest = rest.slice(kwM[0].length);
      continue;
    }
    // Number
    const numM = rest.match(/^\d+/);
    if (numM) {
      spans.push(<span key={i++} className="text-yellow-300">{numM[0]}</span>);
      rest = rest.slice(numM[0].length);
      continue;
    }
    // Regular character
    spans.push(<span key={i++} className="text-paper">{rest[0]}</span>);
    rest = rest.slice(1);
  }

  return <>{spans}</>;
}

const TYPE_SPEED = 32;   // ms per character
const NEXT_LINE_DELAY = 60; // ms between lines

export default function CodeTyper({ className = "" }) {
  const [activeTab, setActiveTab] = useState("about.js");
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentTyped, setCurrentTyped]   = useState("");
  const [lineIndex, setLineIndex]          = useState(0);
  const [phase, setPhase]                  = useState("typing");
  const scrollContainerRef = useRef(null);

  // Reset when tab changes
  useEffect(() => {
    setDisplayedLines([]);
    setCurrentTyped("");
    setLineIndex(0);
    setPhase("typing");
  }, [activeTab]);

  // Scroll the terminal's own container to the bottom — NOT the page.
  // Using scrollTop directly on the containing div instead of
  // scrollIntoView, which would scroll the entire page down to this
  // element on every keystroke.
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [displayedLines, currentTyped]);

  useEffect(() => {
    const script = TABS[activeTab];
    if (!script) return;

    let timeout;

    if (phase === "typing") {
      if (lineIndex >= script.length) {
        // All lines done — pause then restart
        timeout = setTimeout(() => {
          setDisplayedLines([]);
          setCurrentTyped("");
          setLineIndex(0);
        }, 2800);
        return () => clearTimeout(timeout);
      }

      const targetLine = script[lineIndex];

      if (currentTyped.length < targetLine.length) {
        timeout = setTimeout(() => {
          setCurrentTyped(targetLine.slice(0, currentTyped.length + 1));
        }, TYPE_SPEED);
      } else {
        // Line finished — commit it and move on
        timeout = setTimeout(() => {
          setDisplayedLines((prev) => [...prev, targetLine]);
          setCurrentTyped("");
          setLineIndex((n) => n + 1);
        }, NEXT_LINE_DELAY);
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, lineIndex, currentTyped, activeTab]);

  const allLines  = [...displayedLines, currentTyped];

  return (
    <div
      className={`flex flex-col h-full w-full font-mono text-[11px] md:text-xs bg-void-surface select-none ${className}`}
      aria-hidden="true"
    >
      {/* ── title bar ──────────────────────────────────────────── */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-void-line shrink-0">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-3 text-mist tracking-wide">divij.code</span>
      </div>

      {/* ── tab bar ─────────────────────────────────────────────── */}
      <div className="flex border-b border-void-line shrink-0">
        {Object.keys(TABS).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-[11px] tracking-wide transition-colors ${
              activeTab === tab
                ? "text-paper border-b-2 border-signal -mb-px"
                : "text-mist opacity-50 hover:opacity-80"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── code body ───────────────────────────────────────────── */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto py-3 px-0">
        {allLines.map((line, i) => {
          const lineNum = i + 1;
          const isCurrentLine = i === allLines.length - 1;
          return (
            <div key={i} className="flex items-start leading-6 hover:bg-white/5 transition-colors px-2">
              {/* line number */}
              <span className="w-8 shrink-0 text-right pr-4 text-mist opacity-30 text-[10px] select-none">
                {lineNum}
              </span>
              {/* code */}
              <span className="flex-1 whitespace-pre">
                <SyntaxLine text={line} />
                {isCurrentLine && (
                  <span className="inline-block w-[2px] h-3.5 bg-paper ml-px align-middle animate-pulse" />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
