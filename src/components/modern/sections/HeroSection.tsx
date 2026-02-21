"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { portfolioData } from "@/lib/data";

interface HeroSectionProps {
  reduceMotion: boolean;
}

export default function HeroSection({ reduceMotion }: HeroSectionProps) {
  const heroMainTransition = reduceMotion
    ? { duration: 0.25 }
    : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };
  const heroSecondaryTransition = reduceMotion
    ? { delay: 0, duration: 0.2 }
    : { delay: 0.15, duration: 0.5 };
  const heroCtaTransition = reduceMotion
    ? { delay: 0.05, duration: 0.2 }
    : { delay: 0.3, duration: 0.5 };

  return (
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
  );
}
