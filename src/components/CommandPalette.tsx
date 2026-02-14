"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Search, 
  Terminal, 
  Home, 
  Code2, 
  User, 
  Mail, 
  FileText,
  Monitor
} from "lucide-react";
import { useViewMode } from "@/context/ViewModeContext";
import { useActiveFile } from "@/context/ActiveFileContext";

type Command = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  group: string;
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mode, setMode } = useViewMode();
  const { setActiveView } = useActiveFile();

  // Define commands
  const commands: Command[] = [
    {
      id: "mode-terminal",
      label: "Switch to Terminal Mode",
      icon: Terminal,
      group: "Mode",
      action: () => setMode("terminal"),
    },
    {
      id: "mode-modern",
      label: "Switch to Modern Mode",
      icon: Monitor,
      group: "Mode",
      action: () => setMode("gui"),
    },
    {
      id: "nav-home",
      label: "Go to Home",
      icon: Home,
      group: "Navigation",
      action: () => {
        if (mode === "terminal") setActiveView({ type: "home" });
        else document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-projects",
      label: "View Projects",
      icon: Code2,
      group: "Navigation",
      action: () => {
        if (mode === "terminal") setActiveView({ type: "folder", path: "projects" });
        else document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-about",
      label: "About Me",
      icon: User,
      group: "Navigation",
      action: () => {
        if (mode === "terminal") setActiveView({ type: "file", path: "about.md", contentKey: "about" });
        else document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-skills",
      label: "Skills",
      icon: FileText,
      group: "Navigation",
      action: () => {
        if (mode === "terminal") setActiveView({ type: "file", path: "skills.md", contentKey: "skills" });
        else document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "nav-contact",
      label: "Contact",
      icon: Mail,
      group: "Navigation",
      action: () => {
        if (mode === "terminal") setActiveView({ type: "executable", path: "contact.sh", contentKey: "contact" });
        else document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  // Filter commands
  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  // Handle navigation inside palette
  const handlePaletteKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        setIsOpen(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[70] w-full max-w-lg p-2"
          >
            <div className="bg-[#0a0a0a]/95 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-[var(--terminal-border)] flex flex-col ring-1 ring-white/10">
              {/* Search Input */}
              <div className="flex items-center px-4 py-3 border-b border-[var(--terminal-border)]">
                <Search className="w-5 h-5 text-[var(--terminal-accent)] mr-3 opacity-70" />
                <input
                  ref={inputRef}
                  autoFocus
                  type="text"
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent outline-none text-zinc-100 placeholder-zinc-500 font-mono text-sm"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handlePaletteKeyDown}
                />
                <div className="text-[10px] font-mono text-zinc-500 border border-zinc-800 bg-zinc-900/50 px-2 py-1 rounded">
                  ESC
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[300px] overflow-y-auto py-2">
                {filteredCommands.length === 0 ? (
                  <div className="px-4 py-8 text-center text-zinc-500 text-sm font-mono">
                    No results found.
                  </div>
                ) : (
                  <ul className="space-y-1 px-2">
                    {filteredCommands.map((cmd, index) => (
                      <li key={cmd.id}>
                        <button
                          onClick={() => {
                            cmd.action();
                            setIsOpen(false);
                          }}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`w-full flex items-center px-3 py-2.5 rounded-md text-sm transition-all duration-200 border-l-2 ${
                            index === selectedIndex
                              ? "bg-white/5 border-[var(--terminal-accent)] text-white pl-4" // Active state
                              : "border-transparent text-zinc-400 hover:bg-white/5 pl-3" // Default state
                          }`}
                        >
                          <cmd.icon 
                            className={`w-4 h-4 mr-3 transition-colors ${
                              index === selectedIndex ? "text-[var(--terminal-accent)]" : "text-zinc-600"
                            }`} 
                          />
                          <span className="flex-1 text-left font-mono">{cmd.label}</span>
                          {index === selectedIndex && (
                            <span className="text-xs text-[var(--terminal-accent)] opacity-60 font-mono">↵</span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              {/* Footer */}
              <div className="px-4 py-2 bg-black/40 border-t border-[var(--terminal-border)] text-[10px] text-zinc-600 font-mono flex justify-between uppercase tracking-wider">
                <span>Navigate: ↑↓</span>
                <span>Select: Enter</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
