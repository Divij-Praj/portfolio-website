/**
 * A duplicated string scrolling endlessly — the seam is invisible because
 * the content is rendered twice back to back and the track moves exactly
 * -50% (one full copy's width) before looping.
 */
export default function Marquee({
  text = "FULL-STACK ENGINEERING — SECURE BY DEFAULT — REACT — NODE.JS — ",
}) {
  return (
    <div className="border-y border-void-line py-10 overflow-hidden" aria-hidden="true">
      <div className="marquee-track animate-marquee">
        <span className="huge-type outline-text pr-8">{text}</span>
        <span className="huge-type outline-text pr-8">{text}</span>
      </div>
    </div>
  );
}
