"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { portfolioData } from "@/lib/data";

// ── Lazy-load the 3D ASCII scene (WebGL requires browser) ──────────
const EffectScene = dynamic(
  () => import("@/components/effects/effect-scene").then((mod) => mod.EffectScene),
  { ssr: false }
);

// ── Uptime counter hook ────────────────────────────────────────────
function useUptime() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}

// ── Spec line component ────────────────────────────────────────────
function SpecLine({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex gap-1">
      <span className="text-terminal-accent font-bold">{label}:</span>
      <span className="text-terminal-text">{value}</span>
    </li>
  );
}

// ── Color palette row ──────────────────────────────────────────────
function ColorPalette() {
  const colors = [
    "bg-red-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-cyan-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-zinc-400",
  ];

  return (
    <li className="flex gap-1 mt-2" aria-label="Terminal color palette">
      {colors.map((color) => (
        <span
          key={color}
          className={`${color} inline-block w-3 h-3 rounded-[2px]`}
          aria-hidden="true"
        />
      ))}
    </li>
  );
}

// ── Main Neofetch Component ────────────────────────────────────────
export default function Neofetch() {
  const uptime = useUptime();
  const { personal, projects, fileSystem } = portfolioData;

  const fileCount = fileSystem.reduce((count, item) => {
    if (item.type === "folder" && item.children) {
      return count + item.children.length;
    }
    return count + 1;
  }, 0);

  const specs = [
    { label: "OS", value: "Next.js 16 x86_64" },
    { label: "Host", value: `${personal.name} — ${personal.role}` },
    { label: "Uptime", value: uptime },
    { label: "Packages", value: `${fileCount} files, ${projects.length} projects` },
    { label: "Resolution", value: "responsive x adaptive" },
    { label: "Theme", value: "Cyberpunk Violet [dark]" },
    { label: "Terminal", value: "portfolio-next v1.0.0" },
    { label: "Shell", value: "bash 5.2.0" },
    { label: "Font", value: "JetBrains Mono" },
  ];

  return (
    <section
      aria-label="System information"
      className="font-mono text-sm flex flex-col md:flex-row md:items-stretch gap-4 md:gap-8"
    >
      {/* 3D ASCII Art — stretches to match specs panel height */}
      <div className="shrink-0 w-48 h-48 md:w-64 md:h-auto rounded overflow-hidden border border-terminal-border/30">
        <EffectScene />
      </div>

      {/* System Specs */}
      <div className="min-w-0">
        <p className="text-terminal-accent font-bold">
          {personal.name.toLowerCase()}@portfolio
        </p>
        <hr className="border-terminal-border my-1 w-48" aria-hidden="true" />
        <ul className="space-y-0.5">
          {specs.map(({ label, value }) => (
            <SpecLine key={label} label={label} value={value} />
          ))}
          <ColorPalette />
        </ul>
      </div>
    </section>
  );
}
