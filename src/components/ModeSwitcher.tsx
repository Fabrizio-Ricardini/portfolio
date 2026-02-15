"use client";

import { useViewMode } from "@/context/ViewModeContext";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import TerminalLayout from "./terminal/TerminalLayout";
import ModernLayout from "./modern/ModernLayout";
import ModernContent from "./modern/ModernContent";
import ToggleModeButton from "./ToggleModeButton";
import { CRT_ANIMATION_DURATION_MS, CRT_TURN_ON_DURATION_MS } from "@/lib/constants";

type TransitionPhase = "idle" | "crt-off" | "crt-on";

export default function ModeSwitcher() {
  const { mode } = useViewMode();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [displayMode, setDisplayMode] = useState(mode);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const guardTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevModeRef = useRef(mode);

  // Clear any pending timer on unmount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches);

    const initTimer = window.setTimeout(() => {
      setPrefersReducedMotion(media.matches);
    }, 0);

    media.addEventListener("change", onChange);

    return () => {
      window.clearTimeout(initTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (guardTimerRef.current) clearTimeout(guardTimerRef.current);
      media.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    if (guardTimerRef.current) {
      clearTimeout(guardTimerRef.current);
      guardTimerRef.current = null;
    }

    if (phase !== "idle") {
      guardTimerRef.current = setTimeout(() => {
        setDisplayMode(mode);
        setPhase("idle");
        guardTimerRef.current = null;
      }, Math.max(CRT_ANIMATION_DURATION_MS, CRT_TURN_ON_DURATION_MS) + 250);
    }
  }, [phase, mode]);

  // Only react when the *context* mode changes (not displayMode)
  useEffect(() => {
    if (mode === prevModeRef.current) return;
    const prevMode = prevModeRef.current;
    prevModeRef.current = mode;

    // Clear any in-flight transition
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayMode(mode);
      setPhase("idle");
      return;
    }

    if (prevMode === "terminal" && mode === "gui") {
      // Terminal → Modern: play CRT turn-off, then switch display
      setPhase("crt-off");
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        setDisplayMode("gui");
        setPhase("idle");
      }, CRT_ANIMATION_DURATION_MS);
    } else if (prevMode === "gui" && mode === "terminal") {
      // Modern → Terminal: switch display immediately, then play CRT turn-on
      setDisplayMode("terminal");
      setPhase("crt-on");
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        setPhase("idle");
      }, CRT_TURN_ON_DURATION_MS);
    } else {
      // Fallback: sync immediately
      setDisplayMode(mode);
      setPhase("idle");
    }
  }, [mode, prefersReducedMotion]);

  const crtClass =
    phase === "crt-off"
      ? "animate-crt-off"
      : phase === "crt-on"
      ? "animate-crt-on"
      : "";

  return (
    <div
      className={`relative w-full min-h-dvh ${
        displayMode === "terminal" ? "overflow-hidden" : "overflow-y-auto"
      }`}
    >
      <AnimatePresence mode="wait">
        {displayMode === "terminal" ? (
          <motion.div
            key="terminal"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            className={`w-full h-full ${crtClass}`}
          >
            <TerminalLayout />
          </motion.div>
        ) : (
          <motion.div
            key="modern"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <ModernLayout>
              <ModernContent />
            </ModernLayout>
          </motion.div>
        )}
      </AnimatePresence>
      <ToggleModeButton disabled={phase !== "idle"} />
    </div>
  );
}
