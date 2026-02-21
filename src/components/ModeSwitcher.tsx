"use client";

import { useViewMode } from "@/context/ViewModeContext";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import ToggleModeButton from "./ToggleModeButton";
import TerminalModeView from "./terminal/TerminalModeView";
import { CRT_ANIMATION_DURATION_MS, CRT_TURN_ON_DURATION_MS } from "@/lib/constants";

const ModernModeView = dynamic(() => import("./modern/ModernModeView"), {
  loading: () => (
    <div className="w-full min-h-screen min-h-dvh grid place-items-center bg-modern-bg text-modern-muted text-sm">
      Loading modern mode...
    </div>
  ),
});

type TransitionPhase = "idle" | "crt-off" | "crt-on";

export default function ModeSwitcher() {
  const { mode } = useViewMode();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [displayMode, setDisplayMode] = useState(mode);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const guardTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevModeRef = useRef(mode);
  const transitionsDisabled = prefersReducedMotion || isMobileViewport;

  // Clear any pending timer on unmount
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof window.matchMedia !== "function") {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMedia = window.matchMedia("(max-width: 767px)");
    const onChange = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches);
    const onMobileChange = (event: MediaQueryListEvent) =>
      setIsMobileViewport(event.matches);

    const initTimer = window.setTimeout(() => {
      setPrefersReducedMotion(media.matches);
      setIsMobileViewport(mobileMedia.matches);
    }, 0);

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", onChange);
      mobileMedia.addEventListener("change", onMobileChange);
    } else {
      media.addListener(onChange);
      mobileMedia.addListener(onMobileChange);
    }

    return () => {
      window.clearTimeout(initTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (guardTimerRef.current) clearTimeout(guardTimerRef.current);
      if (typeof media.removeEventListener === "function") {
        media.removeEventListener("change", onChange);
        mobileMedia.removeEventListener("change", onMobileChange);
      } else {
        media.removeListener(onChange);
        mobileMedia.removeListener(onMobileChange);
      }
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

    if (transitionsDisabled) {
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
  }, [mode, transitionsDisabled]);

  const crtClass =
    phase === "crt-off"
      ? "animate-crt-off"
      : phase === "crt-on"
      ? "animate-crt-on"
      : "";

  if (transitionsDisabled) {
    return (
      <div
        className={`relative w-full min-h-screen min-h-dvh ${
          mode === "terminal" ? "overflow-hidden" : "overflow-y-auto"
        }`}
      >
        {mode === "terminal" ? (
          <div className="w-full h-full">
            <TerminalModeView />
          </div>
        ) : (
          <div className="w-full h-full">
            <ModernModeView />
          </div>
        )}
        <ToggleModeButton disabled={false} />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full min-h-screen min-h-dvh ${
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
            <TerminalModeView />
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
            <ModernModeView />
          </motion.div>
        )}
      </AnimatePresence>
      <ToggleModeButton disabled={phase !== "idle"} />
    </div>
  );
}
