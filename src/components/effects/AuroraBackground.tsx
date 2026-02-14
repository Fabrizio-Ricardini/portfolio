"use client";

import { motion } from "framer-motion";

/**
 * AuroraBackground — Animated gradient mesh for the Modern UI.
 *
 * Renders large, blurred orbs that slowly drift and pulse,
 * plus a faint dot-grid overlay for structural texture.
 * Fully pointer-events-none so it never blocks interaction.
 */
export default function AuroraBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* ── Blob 1 — Primary Violet (top-left) ─────────────────────── */}
      <motion.div
        className="absolute -top-[10%] -left-[5%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full blur-[140px]"
        style={{ backgroundColor: "rgba(124, 58, 237, 0.2)" }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -50, 60, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ── Blob 2 — Indigo (bottom-right) ─────────────────────────── */}
      <motion.div
        className="absolute -bottom-[10%] -right-[5%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full blur-[140px]"
        style={{ backgroundColor: "rgba(67, 56, 202, 0.18)" }}
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 70, -40, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ── Blob 3 — Accent center (adds depth) ───────────────────── */}
      <motion.div
        className="absolute top-[35%] left-[25%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-[120px]"
        style={{ backgroundColor: "rgba(139, 92, 246, 0.1)" }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -60, 40, 0],
          scale: [0.85, 1.1, 0.8, 0.85],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ── Dot Grid Overlay ───────────────────────────────────────── */}
      <div className="aurora-grid absolute inset-0 opacity-[0.4]" />

      {/* ── Vignette — soft fade at edges, transparent center ───────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, var(--modern-bg) 100%)",
        }}
      />
    </div>
  );
}
