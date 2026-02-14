"use client";

import { Project } from "@/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import { Github, ExternalLink, X } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="relative w-full max-w-lg pointer-events-auto rounded-2xl bg-modern-bg/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-modern-accent/5 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Accent gradient bar */}
                <div className="h-1 w-full bg-gradient-to-r from-modern-accent via-modern-accent/60 to-transparent" />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-modern-muted hover:text-modern-text hover:bg-white/5 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                {/* Content */}
                <div className="p-8">
                  {/* Title */}
                  <h2 className="text-2xl font-bold text-modern-text mb-2 pr-8">
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p className="text-modern-muted leading-relaxed mb-6">
                    {project.modern_desc}
                  </p>

                  {/* Terminal description (subtle reference to the dual nature) */}
                  <div className="mb-6 p-3 rounded-lg bg-black/20 border border-white/5 font-mono text-xs text-modern-muted">
                    <span className="text-modern-accent/70">$</span> {project.terminal_desc}
                  </div>

                  {/* Stack */}
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold text-modern-muted uppercase tracking-wider mb-3">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-modern-accent/10 text-modern-accent text-xs font-medium rounded-full border border-modern-accent/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-modern-text transition-colors"
                    >
                      <Github size={16} />
                      Source Code
                    </a>
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-modern-accent hover:bg-modern-accent/90 text-modern-accent-fg text-sm font-medium transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
