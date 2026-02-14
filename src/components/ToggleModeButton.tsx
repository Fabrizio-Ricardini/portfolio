"use client";

import { useViewMode } from "@/context/ViewModeContext";
import { Terminal, Monitor } from "lucide-react";

interface ToggleModeButtonProps {
  disabled?: boolean;
}

export default function ToggleModeButton({ disabled = false }: ToggleModeButtonProps) {
  const { mode, toggleMode } = useViewMode();

  return (
    <button
      onClick={toggleMode}
      disabled={disabled}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed ${
        mode === "terminal"
          ? "bg-terminal-accent text-terminal-bg hover:bg-terminal-text"
          : "bg-modern-accent text-modern-accent-fg hover:bg-modern-accent/80"
      }`}
      aria-label="Toggle View Mode"
    >
      {mode === "terminal" ? <Monitor size={20} /> : <Terminal size={20} />}
    </button>
  );
}
