"use client";

import { motion } from "framer-motion";
import type { KeyboardEvent } from "react";
import { ExternalLink, Github } from "lucide-react";
import { portfolioData, type Project } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import { fadeUp, stagger } from "./motion";

interface ProjectsSectionProps {
  reduceMotion: boolean;
  onOpenProject: (project: Project) => void;
  onProjectCardKeyDown: (
    event: KeyboardEvent<HTMLElement>,
    project: Project
  ) => void;
}

export default function ProjectsSection({
  reduceMotion,
  onOpenProject,
  onProjectCardKeyDown,
}: ProjectsSectionProps) {
  const staggerVariant = reduceMotion
    ? { animate: { transition: { staggerChildren: 0.02 } } }
    : stagger;
  const itemTransition = reduceMotion ? { duration: 0.2 } : { duration: 0.4 };

  return (
    <section id="projects" className="scroll-mt-24">
      <SectionHeading
        title="Proyectos"
        subtitle="Trabajos seleccionados y proyectos paralelos."
      />
      <motion.div
        variants={staggerVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {portfolioData.projects.map((project) => (
          <motion.article
            key={project.id}
            variants={fadeUp}
            transition={itemTransition}
            onClick={() => onOpenProject(project)}
            onKeyDown={(event) => onProjectCardKeyDown(event, project)}
            role="button"
            tabIndex={0}
            aria-label={`Open details for ${project.title}`}
            className="group cursor-pointer rounded-2xl bg-white/5 backdrop-blur-none md:backdrop-blur-md p-6 border border-white/10 hover:border-modern-accent/30 shadow-sm md:hover:shadow-lg md:hover:shadow-modern-accent/5 transition-colors duration-300 h-full flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg text-modern-text group-hover:text-modern-accent transition-colors">
                {project.title}
              </h3>
              <div className="flex space-x-2">
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-modern-muted hover:text-modern-accent transition-colors"
                  aria-label="Repository"
                  onClick={(event) => event.stopPropagation()}
                >
                  <Github size={18} />
                </a>
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-modern-muted hover:text-modern-accent transition-colors"
                  aria-label="Live Demo"
                  onClick={(event) => event.stopPropagation()}
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
            <p className="text-modern-muted text-sm mb-4 line-clamp-4 lg:line-clamp-5 flex-grow">
              {project.modern_desc}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-white/5 text-modern-muted text-xs rounded-md border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
