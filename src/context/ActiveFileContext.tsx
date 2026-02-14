"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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

export const ActiveFileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeView, setActiveView] = useState<ActiveView>({ type: "home" });

  const breadcrumb = (() => {
    switch (activeView.type) {
      case "home":
        return "~";
      case "folder":
        return `~/${activeView.path}`;
      case "file":
        return `~/${activeView.path}`;
      case "project":
        return `~/projects/${activeView.path}`;
      case "executable":
        return `~/${activeView.path}`;
      default:
        return "~";
    }
  })();

  return (
    <ActiveFileContext.Provider value={{ activeView, setActiveView, breadcrumb }}>
      {children}
    </ActiveFileContext.Provider>
  );
};

export const useActiveFile = () => {
  const context = useContext(ActiveFileContext);
  if (!context) {
    throw new Error("useActiveFile must be used within an ActiveFileProvider");
  }
  return context;
};
