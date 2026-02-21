"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
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

export const ViewModeProvider = ({ children }: { children: ReactNode }) => {
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

  const persistMode = useCallback((newMode: ViewMode) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(PORTFOLIO_VIEW_MODE_KEY, newMode);
      } catch {
        // Ignore storage write failures and keep in-memory state.
      }
    }
  }, []);

  const setMode = useCallback(
    (newMode: ViewMode) => {
      setModeState(newMode);
      persistMode(newMode);
    },
    [persistMode]
  );

  const toggleMode = useCallback(() => {
    setModeState((currentMode) => {
      const nextMode = currentMode === "terminal" ? "gui" : "terminal";
      persistMode(nextMode);
      return nextMode;
    });
  }, [persistMode]);

  const contextValue = useMemo(
    () => ({ mode, toggleMode, setMode }),
    [mode, setMode, toggleMode]
  );

  return (
    <ViewModeContext.Provider value={contextValue}>{children}</ViewModeContext.Provider>
  );
};

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error("useViewMode must be used within a ViewModeProvider");
  }
  return context;
};
