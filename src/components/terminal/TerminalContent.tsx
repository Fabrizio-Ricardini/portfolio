"use client";

import { useActiveFile } from "@/context/ActiveFileContext";
import { portfolioData } from "@/lib/data";
import FolderView from "./FolderView";
import FileView from "./FileView";
import ScriptView from "./ScriptView";
import ProjectView from "./ProjectView";
import Neofetch from "./Neofetch";

export default function TerminalContent() {
  const { activeView } = useActiveFile();

  switch (activeView.type) {
    case "home":
      return <HomeView />;
    case "folder":
      return <FolderView folderPath={activeView.path} />;
    case "file":
      return (
        <FileView
          contentKey={activeView.contentKey}
          filePath={activeView.path}
        />
      );
    case "project":
      return <ProjectView projectId={activeView.projectId} />;
    case "executable":
      return (
        <ScriptView
          contentKey={activeView.contentKey}
          filePath={activeView.path}
        />
      );
    default:
      return <HomeView />;
  }
}

function HomeView() {
  return (
    <article className="font-mono space-y-6 text-sm">
      <h1 className="sr-only">{portfolioData.personal.name} — {portfolioData.personal.role}</h1>
      <p className="text-terminal-accent">
        <span className="text-terminal-secondary">Last login:</span>{" "}
        {new Date().toDateString()} on ttys000
      </p>

      {/* Neofetch display */}
      <div className="mt-2">
        <p className="text-terminal-secondary mb-3">
          <span className="text-terminal-accent">$</span> neofetch
        </p>
        <Neofetch />
      </div>

      {/* Quick ls output */}
      <nav aria-label="File system" className="mt-6">
        <p className="text-terminal-secondary mb-2">
          <span className="text-terminal-accent">$</span> ls
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          {portfolioData.fileSystem.map((item) => (
            <li
              key={item.name}
              className={`${
                item.type === "folder"
                  ? "text-terminal-accent font-bold"
                  : item.type === "executable"
                  ? "text-terminal-executable"
                  : "text-terminal-text"
              }`}
            >
              {item.name}
              {item.type === "folder" ? "/" : ""}
            </li>
          ))}
        </ul>
      </nav>

      {/* Hint */}
      <p className="mt-8 text-terminal-secondary/60 text-xs">
        <span className="hidden md:inline">Click on any file or folder in the sidebar to explore.</span>
        <span className="md:hidden">Tap the menu icon (top-left) to open the file explorer.</span>
      </p>
    </article>
  );
}
