"use client";

import { useEffect, useState } from "react";
import FileTree from "./FileTree";
import TerminalContent from "./TerminalContent";
import InteractiveTerminal from "./InteractiveTerminal";
import { useActiveFile } from "@/context/ActiveFileContext";
import Scanlines from "@/components/effects/Scanlines";
import NoiseBackground from "@/components/effects/NoiseBackground";
import { Menu, X } from "lucide-react";

export default function TerminalLayout() {
  const { breadcrumb } = useActiveFile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showVisualEffects, setShowVisualEffects] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof window.matchMedia !== "function") return;

    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopMedia = window.matchMedia("(min-width: 768px)");
    const syncEffects = () =>
      setShowVisualEffects(!motionMedia.matches && desktopMedia.matches);

    const initTimer = window.setTimeout(syncEffects, 0);

    if (typeof motionMedia.addEventListener === "function") {
      motionMedia.addEventListener("change", syncEffects);
      desktopMedia.addEventListener("change", syncEffects);
    } else {
      motionMedia.addListener(syncEffects);
      desktopMedia.addListener(syncEffects);
    }

    return () => {
      window.clearTimeout(initTimer);
      if (typeof motionMedia.removeEventListener === "function") {
        motionMedia.removeEventListener("change", syncEffects);
        desktopMedia.removeEventListener("change", syncEffects);
      } else {
        motionMedia.removeListener(syncEffects);
        desktopMedia.removeListener(syncEffects);
      }
    };
  }, []);

  return (
    <div className="relative flex h-screen min-h-dvh w-full bg-terminal-bg text-terminal-text font-mono overflow-hidden crt-glow">
      {/* Scanlines overlay */}
      {showVisualEffects && <Scanlines />}

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — desktop: static, mobile: slide-in */}
      <aside
        className={`
          fixed md:relative z-40 top-0 left-0 h-full w-64 shrink-0
          border-r border-terminal-border p-4 flex flex-col bg-terminal-bg
          transition-transform duration-200 ease-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:flex
        `}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-bold text-terminal-secondary tracking-widest">
            EXPLORER
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 text-terminal-secondary hover:text-terminal-accent transition-colors"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>
        <div
          className="flex-1 min-h-0 overflow-y-auto bg-terminal-bg"
          onClick={() => setSidebarOpen(false)}
        >
          <FileTree />
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col min-w-0 bg-terminal-bg">
        {/* Top Bar */}
        <header className="h-9 border-b border-terminal-border flex items-center px-4 text-xs text-terminal-secondary bg-terminal-bg/80 backdrop-blur select-none glitch-hover">
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden mr-3 p-0.5 text-terminal-secondary hover:text-terminal-accent transition-colors"
            aria-label="Open sidebar"
          >
            <Menu size={16} />
          </button>

          <span className="mr-2">user@portfolio:</span>
          <span className="text-terminal-accent truncate">{breadcrumb}</span>
          <span className="ml-1 text-terminal-text">$</span>
          <span className="ml-1 w-1.5 h-3.5 bg-terminal-accent animate-cursor-blink shrink-0" />
          <span className="ml-auto text-terminal-secondary text-xs hidden md:inline">Ctrl+K: comandos rápidos</span>
        </header>

        {/* Content Area */}
        <div className="relative flex-1 overflow-auto p-4 md:p-6 scroll-smooth">
          {showVisualEffects && <NoiseBackground />}
          <div className="relative z-10">
            <TerminalContent />
            <InteractiveTerminal />
          </div>
        </div>
      </main>
    </div>
  );
}
