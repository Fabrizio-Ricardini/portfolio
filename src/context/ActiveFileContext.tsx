"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ActiveView =
  | { type: "home" }
  | { type: "folder"; path: string }
  | { type: "file"; path: string; contentKey: string }
  | { type: "project"; path: string; projectId: string }
  | { type: "executable"; path: string; contentKey: string };

interface ActiveFileContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  breadcrumb: string;
}

const ActiveFileContext = createContext<ActiveFileContextType | undefined>(
  undefined
);

export const ActiveFileProvider = ({ children }: { children: ReactNode }) => {
  const [activeView, setActiveViewState] = useState<ActiveView>({ type: "home" });

  const setActiveView = useCallback((view: ActiveView) => {
    setActiveViewState(view);
  }, []);

  const breadcrumb = useMemo(() => {
    switch (activeView.type) {
      case "home":
        return "~";
      case "folder":
      case "file":
      case "executable":
        return `~/${activeView.path}`;
      case "project":
        return `~/projects/${activeView.path}`;
      default:
        return "~";
    }
  }, [activeView]);

  const contextValue = useMemo(
    () => ({ activeView, setActiveView, breadcrumb }),
    [activeView, breadcrumb, setActiveView]
  );

  return (
    <ActiveFileContext.Provider value={contextValue}>{children}</ActiveFileContext.Provider>
  );
};

export const useActiveFile = () => {
  const context = useContext(ActiveFileContext);
  if (!context) {
    throw new Error("useActiveFile must be used within an ActiveFileProvider");
  }
  return context;
};
