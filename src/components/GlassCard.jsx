/**
 * Flat, hard-edged "paper" surface — the editorial/brutalist replacement
 * for the old glassmorphism. Kept the component name (GlassCard) and prop
 * signature so every page importing it keeps working untouched.
 */
export default function GlassCard({ children, className = "", as: Tag = "div", ...rest }) {
  return (
    <Tag className={`panel p-6 ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
