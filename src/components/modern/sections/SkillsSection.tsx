"use client";

import { motion } from "framer-motion";
import { Code2, Layers, Wrench } from "lucide-react";
import { portfolioData, type ModernSkillIcon } from "@/lib/data";
import type { ComponentType } from "react";
import SectionHeading from "./SectionHeading";
import { fadeUp, stagger } from "./motion";

const skillIconMap: Record<ModernSkillIcon, ComponentType<{ size?: number }>> = {
  code2: Code2,
  layers: Layers,
  wrench: Wrench,
};

interface SkillsSectionProps {
  reduceMotion: boolean;
}

export default function SkillsSection({ reduceMotion }: SkillsSectionProps) {
  const staggerVariant = reduceMotion
    ? { animate: { transition: { staggerChildren: 0.02 } } }
    : stagger;
  const itemTransition = reduceMotion ? { duration: 0.2 } : { duration: 0.4 };
  const skillCategories = portfolioData.modern.skills.map((category) => ({
    ...category,
    icon: skillIconMap[category.icon],
  }));

  return (
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
              <h3 className="font-semibold text-modern-text">{category.title}</h3>
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
  );
}
