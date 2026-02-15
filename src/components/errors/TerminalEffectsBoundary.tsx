"use client";

import React from "react";

type TerminalEffectsBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type TerminalEffectsBoundaryState = {
  hasError: boolean;
};

export default class TerminalEffectsBoundary extends React.Component<
  TerminalEffectsBoundaryProps,
  TerminalEffectsBoundaryState
> {
  state: TerminalEffectsBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): TerminalEffectsBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Terminal effect render error", error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex h-full w-full items-center justify-center bg-terminal-bg text-terminal-secondary text-xs">
            3D effect unavailable on this device.
          </div>
        )
      );
    }

    return this.props.children;
  }
}
