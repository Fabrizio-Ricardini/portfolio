"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import { fadeUp, stagger } from "./motion";

interface AboutSectionProps {
  reduceMotion: boolean;
}

export default function AboutSection({ reduceMotion }: AboutSectionProps) {
  const staggerVariant = reduceMotion
    ? { animate: { transition: { staggerChildren: 0.02 } } }
    : stagger;
  const itemTransition = reduceMotion ? { duration: 0.2 } : { duration: 0.4 };

  return (
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
        <motion.div variants={fadeUp} transition={itemTransition} className="space-y-4">
          <p className="text-modern-text leading-relaxed">
            {portfolioData.modern.about.intro[0]}
          </p>
          <p className="text-modern-muted leading-relaxed">
            {portfolioData.modern.about.intro[1]}
          </p>
        </motion.div>

        <motion.div variants={fadeUp} transition={itemTransition} className="space-y-6">
          <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6">
            <h4 className="font-semibold text-modern-text mb-3">Filosofía</h4>
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
            <h4 className="font-semibold text-modern-text mb-3">Actualidad</h4>
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
  );
}
