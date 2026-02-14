"use client";

import { FileSystemItem, portfolioData } from "@/lib/data";
import { useActiveFile } from "@/context/ActiveFileContext";
import { ChevronRight, ChevronDown, Folder, FileText, Terminal } from "lucide-react";
import React, { useState } from "react";

const FileTreeItem = ({
  item,
  depth = 0,
  parentPath = "",
}: {
  item: FileSystemItem;
  depth?: number;
  parentPath?: string;
}) => {
  const [isOpen, setIsOpen] = useState(item.type === "folder");
  const { activeView, setActiveView } = useActiveFile();

  const currentPath = parentPath ? `${parentPath}/${item.name}` : item.name;

  const isActive = (() => {
    if (activeView.type === "home") return false;
    if (activeView.type === "folder") return activeView.path === currentPath;
    if (activeView.type === "file") return activeView.path === currentPath;
    if (activeView.type === "project") return activeView.path === item.name;
    if (activeView.type === "executable") return activeView.path === currentPath;
    return false;
  })();

  const handleClick = () => {
    if (item.type === "folder") {
      setIsOpen(!isOpen);
      setActiveView({ type: "folder", path: currentPath });
    } else if (item.id) {
      setActiveView({ type: "project", path: item.name, projectId: item.id });
    } else if (item.type === "executable" && item.content) {
      setActiveView({ type: "executable", path: currentPath, contentKey: item.content });
    } else if (item.content) {
      setActiveView({ type: "file", path: currentPath, contentKey: item.content });
    }
  };

  const getIcon = () => {
    if (item.type === "folder")
      return <Folder size={14} className="text-terminal-accent" />;
    if (item.type === "executable")
      return <Terminal size={14} className="text-terminal-executable" />;
    return <FileText size={14} className="text-terminal-text" />;
  };

  return (
    <div>
      <div
        className={`flex items-center cursor-pointer py-3 md:py-1 select-none text-sm group transition-colors glitch-hover min-h-[44px] md:min-h-0 ${
          isActive
            ? "bg-terminal-accent/15 text-terminal-accent"
            : "hover:bg-terminal-border/30"
        }`}
        style={{ paddingLeft: `${depth * 12 + 4}px` }}
        onClick={handleClick}
      >
        <span className="mr-1 w-4 flex justify-center text-terminal-secondary">
          {item.type === "folder" &&
            (isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />)}
        </span>
        <span className="mr-2">{getIcon()}</span>
        <span
          className={`transition-colors ${
            isActive
              ? "text-terminal-accent"
              : item.type === "executable"
              ? "text-terminal-executable group-hover:text-terminal-executable/80"
              : "text-terminal-text group-hover:text-terminal-accent"
          }`}
        >
          {item.name}
        </span>
      </div>
      {item.type === "folder" && isOpen && item.children && (
        <div>
          {item.children.map((child, index) => (
            <FileTreeItem
              key={index}
              item={child}
              depth={depth + 1}
              parentPath={currentPath}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function FileTree() {
  const { setActiveView } = useActiveFile();

  return (
    <div className="text-terminal-text font-mono">
      <div
        className="flex items-center cursor-pointer py-3 md:py-1 px-1 mb-1 text-xs text-terminal-secondary hover:text-terminal-accent transition-colors select-none min-h-[44px] md:min-h-0"
        onClick={() => setActiveView({ type: "home" })}
      >
        ~ (root)
      </div>
      {portfolioData.fileSystem.map((item, index) => (
        <FileTreeItem key={index} item={item} />
      ))}
    </div>
  );
}
