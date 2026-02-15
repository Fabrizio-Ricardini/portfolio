"use client";

import React from "react";

type TerminalRenderBoundaryProps = {
  children: React.ReactNode;
};

type TerminalRenderBoundaryState = {
  hasError: boolean;
};

export default class TerminalRenderBoundary extends React.Component<
  TerminalRenderBoundaryProps,
  TerminalRenderBoundaryState
> {
  state: TerminalRenderBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): TerminalRenderBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Terminal render error", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen min-h-dvh w-full bg-terminal-bg text-terminal-text font-mono p-4">
          <p className="text-terminal-accent mb-3">$ terminal --safe-mode</p>
          <p className="text-terminal-secondary text-sm">
            Terminal view fallback enabled due to device rendering issue.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
