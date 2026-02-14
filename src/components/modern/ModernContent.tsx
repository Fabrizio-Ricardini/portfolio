"use client";

import { useState } from "react";
import { portfolioData, Project } from "@/lib/data";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Mail,
  Linkedin,
  Twitter,
  MapPin,
  Clock,
  Code2,
  Layers,
  Wrench,
  ArrowRight,
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

// ── Skills Data (parsed from fileContents for modern display) ────────

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    items: ["TypeScript", "JavaScript", "Python", "SQL", "Rust"],
  },
  {
    title: "Frontend",
    icon: Layers,
    items: [
      "React / Next.js / Remix",
      "Tailwind CSS / CSS Modules",
      "Framer Motion / GSAP",
      "Zustand / React Query",
    ],
  },
  {
    title: "Backend & Tools",
    icon: Wrench,
    items: [
      "Node.js / Express / Fastify",
      "PostgreSQL / Redis / MongoDB",
      "Docker / AWS / Vercel",
      "Git / GitHub Actions / CI/CD",
    ],
  },
];

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
    value: "github.com/fabrizio",
    href: portfolioData.personal.contact.github,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/fabrizio",
    href: portfolioData.personal.contact.linkedin,
  },
  {
    icon: Twitter,
    label: "Twitter",
    value: "twitter.com/fabrizio",
    href: portfolioData.personal.contact.twitter,
  },
];

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

  return (
    <>
      <div className="space-y-28 pb-16">
        {/* ── Hero Section ─────────────────────────────────────────── */}
        <section id="hero" className="text-center space-y-6 py-20 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-modern-accent font-medium text-sm tracking-wide uppercase mb-4">
              {portfolioData.personal.role}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-modern-text via-modern-text to-modern-accent leading-tight">
              Hi, I&apos;m {portfolioData.personal.name}.
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-xl text-modern-muted max-w-2xl mx-auto leading-relaxed"
          >
            {portfolioData.personal.bio}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center gap-4 pt-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-modern-accent text-modern-accent-fg font-medium text-sm hover:bg-modern-accent/90 transition-colors shadow-lg shadow-modern-accent/20"
            >
              View Projects
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-modern-surface text-modern-text font-medium text-sm border border-modern-border hover:bg-modern-card-hover transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        </section>

        {/* ── Projects Section ─────────────────────────────────────── */}
        <section id="projects" className="scroll-mt-24">
          <SectionHeading
            title="Projects"
            subtitle="Selected work and side projects."
          />
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {portfolioData.projects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer rounded-2xl bg-white/5 backdrop-blur-md p-6 border border-white/10 hover:border-modern-accent/30 shadow-sm hover:shadow-lg hover:shadow-modern-accent/5 transition-all duration-300 h-full flex flex-col"
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
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── About Section ────────────────────────────────────────── */}
        <section id="about" className="scroll-mt-24">
          <SectionHeading
            title="About"
            subtitle="A bit about who I am and what drives me."
          />
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Main bio */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <blockquote className="border-l-2 border-modern-accent/40 pl-4 italic text-modern-muted">
                &ldquo;First, solve the problem. Then, write the code.&rdquo;
                <span className="block text-xs mt-1 not-italic">
                  &mdash; John Johnson
                </span>
              </blockquote>
              <p className="text-modern-text leading-relaxed">
                I&apos;m a developer passionate about building performant web
                applications and crafting elegant user experiences. With 5+ years of
                experience shipping production software, I specialize in the
                React/Node.js ecosystem and cloud-native architectures.
              </p>
              <p className="text-modern-muted leading-relaxed">
                Started coding at 16 with Python scripts to automate repetitive
                tasks. Quickly moved to web development and never looked back.
                Today I work across the full stack — from database design to
                pixel-perfect UIs.
              </p>
            </motion.div>

            {/* Philosophy & Currently */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6">
                <h4 className="font-semibold text-modern-text mb-3">
                  Philosophy
                </h4>
                <ul className="space-y-2 text-sm text-modern-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-modern-accent mt-0.5">&#8226;</span>
                    Write code for humans first, machines second.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-modern-accent mt-0.5">&#8226;</span>
                    Ship early, iterate often.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-modern-accent mt-0.5">&#8226;</span>
                    Every abstraction has a cost; choose wisely.
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6">
                <h4 className="font-semibold text-modern-text mb-3">
                  Currently
                </h4>
                <ul className="space-y-2 text-sm text-modern-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-modern-accent mt-0.5">&#8226;</span>
                    Building dual-mode portfolio experiences.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-modern-accent mt-0.5">&#8226;</span>
                    Exploring AI-assisted development workflows.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-modern-accent mt-0.5">&#8226;</span>
                    Contributing to open source when time allows.
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Skills Section ───────────────────────────────────────── */}
        <section id="skills" className="scroll-mt-24">
          <SectionHeading
            title="Skills"
            subtitle="Technologies and tools I work with."
          />
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 hover:border-modern-accent/20 transition-colors"
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
            title="Contact"
            subtitle="Let's build something together."
          />
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-2xl"
          >
            {/* Status bar */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-6 mb-8 text-sm text-modern-muted"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Open to opportunities
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} />
                Buenos Aires, AR
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                UTC-3
              </span>
            </motion.div>

            {/* Contact links grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactLinks.map((link) => (
                <motion.a
                  key={link.label}
                  variants={fadeUp}
                  transition={{ duration: 0.4 }}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-modern-accent/30 hover:shadow-lg hover:shadow-modern-accent/5 transition-all duration-300"
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
              transition={{ duration: 0.4 }}
              className="mt-6 text-xs text-modern-muted"
            >
              Average response time: ~24h
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
