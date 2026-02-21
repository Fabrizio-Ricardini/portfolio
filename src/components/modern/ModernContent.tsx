"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { type Project } from "@/lib/data";
import ProjectModal from "./ProjectModal";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import ExperienceSection from "./sections/ExperienceSection";
import HeroSection from "./sections/HeroSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";

export default function ModernContent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(max-width: 767px)");
    const syncMobile = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    const initTimer = window.setTimeout(() => setIsMobile(media.matches), 0);

    media.addEventListener("change", syncMobile);

    return () => {
      window.clearTimeout(initTimer);
      media.removeEventListener("change", syncMobile);
    };
  }, []);

  const reduceMotion = Boolean(prefersReducedMotion || isMobile);

  const openProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleProjectCardKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    project: Project
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(project);
    }
  };

  return (
    <>
      <div className="space-y-28 pb-16">
        <HeroSection reduceMotion={reduceMotion} />
        <ProjectsSection
          reduceMotion={reduceMotion}
          onOpenProject={openProject}
          onProjectCardKeyDown={handleProjectCardKeyDown}
        />
        <AboutSection reduceMotion={reduceMotion} />
        <ExperienceSection reduceMotion={reduceMotion} />
        <SkillsSection reduceMotion={reduceMotion} />
        <ContactSection reduceMotion={reduceMotion} />
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
