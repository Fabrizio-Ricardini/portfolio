"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { portfolioData } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import { fadeUp, stagger } from "./motion";

type Job = (typeof portfolioData.experience)[number];

function ExperienceItem({ job, reduceMotion }: { job: Job; reduceMotion: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialAchievements = job.achievements.slice(0, 2);
  const remainingAchievements = job.achievements.slice(2);
  const hasMore = remainingAchievements.length > 0;
  const itemTransition = reduceMotion ? { duration: 0.2 } : { duration: 0.4 };

  return (
    <motion.div
      variants={fadeUp}
      transition={itemTransition}
      className="relative pl-8 border-l border-white/10"
    >
      <span className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-modern-accent ring-4 ring-modern-bg" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
        <h3 className="text-xl font-bold text-modern-text">{job.role}</h3>
        <span className="text-sm font-mono text-modern-accent bg-modern-accent/10 px-2 py-1 rounded w-fit mt-1 sm:mt-0">
          {job.period}
        </span>
      </div>

      <div className="text-lg text-modern-muted font-medium mb-3">{job.company}</div>

      <p className="text-modern-muted mb-4">{job.description}</p>

      <ul className="space-y-2">
        {initialAchievements.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-modern-muted/80">
            <span className="text-modern-accent mt-1.5 text-[10px]">➢</span>
            {item}
          </li>
        ))}

        <AnimatePresence>
          {isExpanded ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-2"
            >
              {remainingAchievements.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-modern-muted/80 pt-2"
                >
                  <span className="text-modern-accent mt-1.5 text-[10px]">➢</span>
                  {item}
                </li>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </ul>

      {hasMore ? (
        <button
          onClick={() => setIsExpanded((current) => !current)}
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
      ) : null}
    </motion.div>
  );
}

interface ExperienceSectionProps {
  reduceMotion: boolean;
}

export default function ExperienceSection({ reduceMotion }: ExperienceSectionProps) {
  const staggerVariant = reduceMotion
    ? { animate: { transition: { staggerChildren: 0.02 } } }
    : stagger;

  return (
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
          <ExperienceItem key={index} job={job} reduceMotion={reduceMotion} />
        ))}
      </motion.div>
    </section>
  );
}
