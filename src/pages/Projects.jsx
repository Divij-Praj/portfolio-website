import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard.jsx";
import Reveal from "../components/Reveal.jsx";
import ArchiveHighlights from "../components/ArchiveHighlights.jsx";
import { fetchProjects } from "../services/api.js";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    let mounted = true;
    fetchProjects()
      .then((data) => {
        if (!mounted) return;
        setProjects(data);
        setStatus("success");
      })
      .catch(() => mounted && setStatus("error"));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-28">
      <Reveal>
        <p className="eyebrow mb-3">Project archive</p>
        <h1 className="huge-type text-paper mb-12" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
          Archive
        </h1>
      </Reveal>

      <ArchiveHighlights />

      {status === "loading" && (
        <p className="text-mist-dim font-mono text-sm">Fetching projects…</p>
      )}

      {status === "error" && (
        <p className="text-mist-dim font-mono text-sm">
          Couldn't reach the API right now. Please try again shortly.
        </p>
      )}

      {status === "success" && projects.length === 0 && (
        <p className="text-mist-dim font-mono text-sm">
          No projects published yet.
        </p>
      )}

      {status === "success" && projects.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
