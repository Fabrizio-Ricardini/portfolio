"use client";

import { portfolioData } from "@/lib/data";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import { useActiveFile } from "@/context/ActiveFileContext";

interface ProjectViewProps {
  projectId: string;
}

export default function ProjectView({ projectId }: ProjectViewProps) {
  const { setActiveView } = useActiveFile();
  const project = portfolioData.projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="font-mono text-sm text-terminal-error">
        <span className="text-terminal-accent">$</span> cat project
        <div className="mt-2">Error: Project not found (id: {projectId})</div>
      </div>
    );
  }

  return (
    <article className="font-mono text-sm">
      <p className="text-terminal-secondary mb-3">
        <span className="text-terminal-accent">$</span> cat projects/
        {project.title.toLowerCase().replace(/\s+/g, "-")}
      </p>

      <div className="bg-terminal-bg/50 border border-terminal-border rounded-md p-4 space-y-4">
        {/* Header */}
        <header className="border-b border-terminal-border pb-3">
          <h2 className="text-terminal-accent font-bold text-lg">
            {project.title}
          </h2>
          <p className="text-terminal-secondary mt-1 text-xs">
            {project.terminal_desc}
          </p>
        </header>

        {/* Description */}
        <section>
          <h3 className="text-terminal-secondary text-xs uppercase tracking-wider mb-1">
            Description
          </h3>
          <p className="text-terminal-text leading-6">{project.modern_desc}</p>
        </section>

        {/* Stack */}
        <section>
          <h3 className="text-terminal-secondary text-xs uppercase tracking-wider mb-2">
            Stack
          </h3>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="px-2 py-0.5 text-xs border border-terminal-accent/30 text-terminal-accent rounded bg-terminal-accent/5"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>

        {/* Links */}
        <nav aria-label="Project links">
          <h3 className="text-terminal-secondary text-xs uppercase tracking-wider mb-2">
            Links
          </h3>
          <div className="flex gap-4">
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-terminal-accent hover:underline active:opacity-80 transition-colors py-1"
            >
              <Github size={14} />
              Repository
            </a>
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-terminal-accent hover:underline active:opacity-80 transition-colors py-1"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          </div>
        </nav>

        {/* Back */}
        <div className="pt-3 border-t border-terminal-border">
          <button
            onClick={() =>
              setActiveView({ type: "folder", path: "projects" })
            }
            className="flex items-center gap-1.5 text-xs text-terminal-secondary hover:text-terminal-accent active:text-terminal-accent transition-colors cursor-pointer py-2 px-2 -ml-2 rounded"
          >
            <ArrowLeft size={12} />
            cd ../projects
          </button>
        </div>
      </div>
    </article>
  );
}
