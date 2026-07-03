import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import AboutSection from "../components/AboutSection.jsx";
import Marquee from "../components/Marquee.jsx";
import ContainerScroll from "../components/ContainerScroll.jsx";
import CodeTyper from "../components/CodeTyper.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Reveal from "../components/Reveal.jsx";
import { fetchProjects } from "../services/api.js";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchProjects({ featured: true })
      .then((data) => mounted && setFeatured(data.slice(0, 3)))
      .catch(() => mounted && setFeatured([]))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Hero />
      <AboutSection />

      {/* Rolling roles, now running as a marquee instead of sitting
          inline in the hero */}
      <Marquee text="STUDENT • DEVELOPER • DESIGNER • PHOTOGRAPHER • " />

      {/* Scroll-tilt showcase — the terminal fills the entire card */}
      <ContainerScroll
        titleComponent={
          <h2 className="huge-type text-paper" style={{ fontSize: "clamp(2rem, 7vw, 4.5rem)" }}>
            Work
          </h2>
        }
      >
        <CodeTyper />
      </ContainerScroll>

      <section className="max-w-5xl mx-auto px-6 py-24">
        <Reveal className="flex items-end justify-between mb-12">
          <h2 className="huge-type text-paper" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>
            Selected
          </h2>
          <Link
            to="/projects"
            className="font-mono text-xs uppercase tracking-widest text-signal hover:underline whitespace-nowrap"
          >
            All Work →
          </Link>
        </Reveal>

        {loading ? (
          <p className="text-mist-dim font-mono text-sm">Loading projects…</p>
        ) : featured.length === 0 ? (
          <p className="text-mist-dim font-mono text-sm">
            No featured projects yet — check back soon.
          </p>
        ) : (
          <motion.div className="grid gap-6 md:grid-cols-3">
            {featured.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </motion.div>
        )}
      </section>
    </>
  );
}
