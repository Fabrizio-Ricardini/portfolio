"use client";

import { motion } from "framer-motion";
import { fadeUp } from "./motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
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
      {subtitle ? <p className="mt-2 text-modern-muted text-lg">{subtitle}</p> : null}
      <div className="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-modern-accent to-modern-accent/30" />
    </motion.div>
  );
}
