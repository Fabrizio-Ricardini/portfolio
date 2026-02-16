"use client";

import { type ComponentType, type KeyboardEvent, useEffect, useState } from "react";
import { portfolioData, type ModernSkillIcon, Project } from "@/lib/data";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Mail,
  Linkedin,
  MapPin,
  Clock,
  Code2,
  Layers,
  Wrench,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ProjectModal from "./ProjectModal";

// ── Animation Variants ───────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const skillIconMap: Record<ModernSkillIcon, ComponentType<{ size?: number }>> = {
  code2: Code2,
  layers: Layers,
  wrench: Wrench,
};

// ── Contact Data ─────────────────────────────────────────────────────

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: portfolioData.personal.contact.email,
    href: `mailto:${portfolioData.personal.contact.email}`,
  },
  {
    icon: Github,
    label: "GitHub",
    value: portfolioData.personal.contact.github.replace("https://", ""),
    href: portfolioData.personal.contact.github,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: portfolioData.personal.contact.linkedin.replace("https://", ""),
    href: portfolioData.personal.contact.linkedin,
  },
];

// ── Experience Item Component ────────────────────────────────────────

type Job = typeof portfolioData.experience[number];

function ExperienceItem({ job }: { job: Job }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialAchievements = job.achievements.slice(0, 2);
  const remainingAchievements = job.achievements.slice(2);
  const hasMore = remainingAchievements.length > 0;

  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.4 }}
      className="relative pl-8 border-l border-white/10"
    >
      {/* Timeline dot */}
      <span className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-modern-accent ring-4 ring-modern-bg" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
        <h3 className="text-xl font-bold text-modern-text">{job.role}</h3>
        <span className="text-sm font-mono text-modern-accent bg-modern-accent/10 px-2 py-1 rounded w-fit mt-1 sm:mt-0">
          {job.period}
        </span>
      </div>

      <div className="text-lg text-modern-muted font-medium mb-3">
        {job.company}
      </div>

      <p className="text-modern-muted mb-4">{job.description}</p>

      <ul className="space-y-2">
        {initialAchievements.map((item: string, i: number) => (
          <li key={i} className="flex items-start gap-2 text-sm text-modern-muted/80">
            <span className="text-modern-accent mt-1.5 text-[10px]">➢</span>
            {item}
          </li>
        ))}
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-2"
            >
              {remainingAchievements.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-modern-muted/80 pt-2">
                  <span className="text-modern-accent mt-1.5 text-[10px]">➢</span>
                  {item}
                </li>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </ul>

      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-1.5 text-xs font-medium text-modern-accent hover:text-modern-accent/80 transition-colors cursor-pointer"
        >
          {isExpanded ? (
            <>
              Ver menos <ChevronUp size={14} />
            </>
          ) : (
            <>
              Ver más logros <ChevronDown size={14} />
            </>
          )}
        </button>
      )}
    </motion.div>
  );
}

// ── Section Heading ──────────────────────────────────────────────────

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold text-modern-text">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-modern-muted text-lg">{subtitle}</p>
      )}
      <div className="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-modern-accent to-modern-accent/30" />
    </motion.div>
  );
}

// ── Main Component ───────────────────────────────────────────────────

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
  const staggerVariant = reduceMotion
    ? { animate: { transition: { staggerChildren: 0.02 } } }
    : stagger;
  const heroMainTransition = reduceMotion
    ? { duration: 0.25 }
    : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };
  const heroSecondaryTransition = reduceMotion
    ? { delay: 0, duration: 0.2 }
    : { delay: 0.15, duration: 0.5 };
  const heroCtaTransition = reduceMotion
    ? { delay: 0.05, duration: 0.2 }
    : { delay: 0.3, duration: 0.5 };
  const itemTransition = reduceMotion ? { duration: 0.2 } : { duration: 0.4 };
  const skillCategories = portfolioData.modern.skills.map((category) => ({
    ...category,
    icon: skillIconMap[category.icon],
  }));
  const openProject = (project: Project) => setSelectedProject(project);
  const handleProjectCardKeyDown = (event: KeyboardEvent<HTMLElement>, project: Project) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(project);
    }
  };

  return (
    <>
      <div className="space-y-28 pb-16">
        {/* ── Hero Section ─────────────────────────────────────────── */}
        <section id="hero" className="text-center space-y-6 py-20 scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={heroMainTransition}
            >
            <p className="text-modern-accent font-medium text-sm tracking-wide uppercase mb-4">
              {portfolioData.personal.role}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-modern-text via-modern-text to-modern-accent leading-tight">
              Hola, soy {portfolioData.personal.name}.
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={heroSecondaryTransition}
            className="text-xl text-modern-muted max-w-2xl mx-auto leading-relaxed"
          >
            {portfolioData.personal.bio}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={heroCtaTransition}
            className="flex justify-center gap-4 pt-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-modern-accent text-modern-accent-fg font-medium text-sm hover:bg-modern-accent/90 transition-colors shadow-lg shadow-modern-accent/20"
            >
              Ver Proyectos
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-modern-surface text-modern-text font-medium text-sm border border-modern-border hover:bg-modern-card-hover transition-colors"
            >
              Contacto
            </a>
          </motion.div>
        </section>

        {/* ── Projects Section ─────────────────────────────────────── */}
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
                onClick={() => openProject(project)}
                onKeyDown={(event) => handleProjectCardKeyDown(event, project)}
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
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-modern-muted hover:text-modern-accent transition-colors"
                      aria-label="Live Demo"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
                <p className="text-modern-muted text-sm mb-4 line-clamp-3 flex-grow">
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

        {/* ── About Section ────────────────────────────────────────── */}
        <section id="about" className="scroll-mt-24">
          <SectionHeading
            title="Sobre mí"
            subtitle="Un poco sobre quién soy y qué me impulsa."
          />
          <motion.div
            variants={staggerVariant}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Main bio */}
            <motion.div
              variants={fadeUp}
              transition={itemTransition}
              className="space-y-4"
            >
              <p className="text-modern-text leading-relaxed">
                {portfolioData.modern.about.intro[0]}
              </p>
              <p className="text-modern-muted leading-relaxed">
                {portfolioData.modern.about.intro[1]}
              </p>
            </motion.div>

            {/* Philosophy & Currently */}
            <motion.div
              variants={fadeUp}
              transition={itemTransition}
              className="space-y-6"
            >
              <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6">
                <h4 className="font-semibold text-modern-text mb-3">
                  Filosofía
                </h4>
                <ul className="space-y-2 text-sm text-modern-muted">
                  {portfolioData.modern.about.philosophy.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-modern-accent mt-0.5">&#8226;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6">
                <h4 className="font-semibold text-modern-text mb-3">
                  Actualidad
                </h4>
                <ul className="space-y-2 text-sm text-modern-muted">
                  {portfolioData.modern.about.current.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-modern-accent mt-0.5">&#8226;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Experience Section ────────────────────────────────────── */}
        <section id="experience" className="scroll-mt-24">
          <SectionHeading title="Experiencia" subtitle="Mi trayectoria profesional." />
          <motion.div
            variants={staggerVariant}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-8 max-w-3xl"
          >
            {portfolioData.experience.map((job, index) => (
              <ExperienceItem key={index} job={job} />
            ))}
          </motion.div>
        </section>

        {/* ── Skills Section ───────────────────────────────────────── */}
        <section id="skills" className="scroll-mt-24">
          <SectionHeading
            title="Habilidades"
            subtitle="Tecnologías y herramientas con las que trabajo."
          />
          <motion.div
            variants={staggerVariant}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={fadeUp}
                transition={itemTransition}
                className="rounded-2xl bg-white/5 backdrop-blur-none md:backdrop-blur-md border border-white/10 p-6 hover:border-modern-accent/20 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-white/5 text-modern-accent">
                    <category.icon size={20} />
                  </div>
                  <h3 className="font-semibold text-modern-text">
                    {category.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-modern-muted flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-modern-accent/50 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Contact Section ──────────────────────────────────────── */}
        <section id="contact" className="scroll-mt-24">
          <SectionHeading
            title="Contacto"
            subtitle="Construyamos algo juntos."
          />
          <motion.div
            variants={staggerVariant}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-2xl"
          >
            {/* Status bar */}
            <motion.div
              variants={fadeUp}
              transition={itemTransition}
              className="flex items-center gap-6 mb-8 text-sm text-modern-muted"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {portfolioData.modern.availability.openToOpportunitiesLabel}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} />
                {portfolioData.modern.availability.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {portfolioData.modern.availability.timezone}
              </span>
            </motion.div>

            {/* Contact links grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactLinks.map((link) => (
                <motion.a
                  key={link.label}
                  variants={fadeUp}
                  transition={itemTransition}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-none md:backdrop-blur-md border border-white/10 hover:border-modern-accent/30 md:hover:shadow-lg md:hover:shadow-modern-accent/5 transition-colors duration-300"
                >
                  <div className="p-2.5 rounded-xl bg-white/5 text-modern-muted group-hover:text-modern-accent group-hover:bg-modern-accent/10 transition-colors">
                    <link.icon size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-modern-muted font-medium uppercase tracking-wider">
                      {link.label}
                    </div>
                    <div className="text-sm text-modern-text group-hover:text-modern-accent transition-colors">
                      {link.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Response time note */}
            <motion.p
              variants={fadeUp}
              transition={itemTransition}
              className="mt-6 text-xs text-modern-muted"
            >
              {portfolioData.modern.availability.responseTimeLabel}
            </motion.p>
          </motion.div>
        </section>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
