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
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevModeRef = useRef(mode);

  // Clear any pending timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

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

    if (prevMode === "terminal" && mode === "gui") {
      // Terminal → Modern: play CRT turn-off, then switch display
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
  }, [mode]);

  const crtClass =
    phase === "crt-off"
      ? "animate-crt-off"
      : phase === "crt-on"
      ? "animate-crt-on"
      : "";

  return (
    <div
      className={`relative w-full h-full ${
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
