"use client";

import { ViewModeProvider } from "@/context/ViewModeContext";
import { ActiveFileProvider } from "@/context/ActiveFileContext";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ViewModeProvider>
      <ActiveFileProvider>{children}</ActiveFileProvider>
    </ViewModeProvider>
  );
}
