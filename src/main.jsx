import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Tell the browser to never auto-restore scroll position.
// Without this, Chrome remembers where you were scrolled and
// restores it on reload — Lenis then smoothly animates TO that
// saved position, making it look like the page is intentionally
// jumping to the marquee / ContainerScroll section.
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
