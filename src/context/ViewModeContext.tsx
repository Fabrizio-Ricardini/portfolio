"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { PORTFOLIO_VIEW_MODE_KEY } from "@/lib/constants";

type ViewMode = "terminal" | "gui";

interface ViewModeContextType {
  mode: ViewMode;
  toggleMode: () => void;
  setMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(
  undefined
);

export const ViewModeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Default to 'terminal' to match server-side rendering
  const [mode, setModeState] = useState<ViewMode>("terminal");

  // Hydrate from localStorage on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedMode = localStorage.getItem(
          PORTFOLIO_VIEW_MODE_KEY
        ) as ViewMode | null;

        if (savedMode === "terminal" || savedMode === "gui") {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setModeState(savedMode);
        }
      } catch {
        // localStorage might be blocked in strict privacy environments
      }
    }
  }, []);

  const setMode = (newMode: ViewMode) => {
    setModeState(newMode);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(PORTFOLIO_VIEW_MODE_KEY, newMode);
      } catch {
        // Ignore storage write failures and keep in-memory state
      }
    }
  };

  const toggleMode = () => {
    const newMode = mode === "terminal" ? "gui" : "terminal";
    setMode(newMode);
  };

  return (
    <ViewModeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error("useViewMode must be used within a ViewModeProvider");
  }
  return context;
};
