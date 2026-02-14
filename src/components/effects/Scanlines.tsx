"use client";

/**
 * Scanlines overlay for the terminal mode.
 * Pure CSS — renders two pseudo-elements via the `.terminal-scanlines` class:
 *   ::before → static horizontal line mesh (subtle darkening every 2px)
 *   ::after  → slow-moving blue highlight band (scrolls down every 8s)
 *
 * pointer-events: none so it never blocks interaction.
 */
export default function Scanlines() {
  return <div className="terminal-scanlines" aria-hidden="true" />;
}
