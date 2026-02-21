"use client";

import { motion } from "framer-motion";
import { Clock, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { portfolioData } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import { fadeUp, stagger } from "./motion";

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

interface ContactSectionProps {
  reduceMotion: boolean;
}

export default function ContactSection({ reduceMotion }: ContactSectionProps) {
  const staggerVariant = reduceMotion
    ? { animate: { transition: { staggerChildren: 0.02 } } }
    : stagger;
  const itemTransition = reduceMotion ? { duration: 0.2 } : { duration: 0.4 };

  return (
    <section id="contact" className="scroll-mt-24">
      <SectionHeading title="Contacto" subtitle="Construyamos algo juntos." />
      <motion.div
        variants={staggerVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-2xl"
      >
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

        <motion.p
          variants={fadeUp}
          transition={itemTransition}
          className="mt-6 text-xs text-modern-muted"
        >
          {portfolioData.modern.availability.responseTimeLabel}
        </motion.p>
      </motion.div>
    </section>
  );
}
