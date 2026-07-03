import { motion } from "framer-motion";
import GlassCard from "./GlassCard.jsx";

export default function ProjectCard({ project, index = 0 }) {
  const { title, description, techStack = [], imageUrl, liveLink, githubLink } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4), ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <GlassCard className="h-full flex flex-col overflow-hidden">
        <div className="relative -mx-6 -mt-6 mb-5 aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt={`${title} preview`}
            loading="lazy"
            className="img-grayscale-hover w-full h-full object-cover"
          />
        </div>

        <h3 className="font-display text-xl font-bold uppercase tracking-tight text-paper">
          {title}
        </h3>
        <p className="mt-2 text-sm text-mist flex-1">{description}</p>

        {techStack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <li key={tech} className="tech-tag">
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex gap-4 font-mono text-sm">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-signal hover:underline"
            >
              Live ↗
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mist hover:text-paper hover:underline"
            >
              Source ↗
            </a>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}
