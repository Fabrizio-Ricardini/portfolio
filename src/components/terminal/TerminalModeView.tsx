"use client";

import TerminalRenderBoundary from "@/components/errors/TerminalRenderBoundary";
import TerminalLayout from "./TerminalLayout";

export default function TerminalModeView() {
  return (
    <TerminalRenderBoundary>
      <TerminalLayout />
    </TerminalRenderBoundary>
  );
}
