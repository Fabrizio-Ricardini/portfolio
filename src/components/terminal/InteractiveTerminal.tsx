import { useState, useRef, useEffect } from "react";
import { useActiveFile } from "@/context/ActiveFileContext";
import { portfolioData, FileSystemItem } from "@/lib/data";

const COMMANDS = ["help", "clear", "ls", "cd", "cat", "open", "pwd", "whoami", "exit"];

export default function InteractiveTerminal() {
  const { activeView, setActiveView, breadcrumb } = useActiveFile();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState<{ type: "cmd" | "resp"; text: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  // Focus input on mount and click
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setHistory((prev) => [input, ...prev]);
      setHistoryIndex(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
        e.preventDefault();
        // Simple autocomplete
        const parts = input.trim().split(" ");
        const current = parts[parts.length - 1];
        
        if (parts.length === 1) {
            // Command completion
            const matches = COMMANDS.filter(c => c.startsWith(current));
            if (matches.length === 1) {
                setInput(matches[0] + " ");
            }
        } else {
            // File completion (naive)
            // Ideally we'd look up files in the current directory
            // For now, let's just ignore or implement later
        }
    }
  };

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    // Add command to output
    setOutput((prev) => [...prev, { type: "cmd", text: trimmed }]);

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case "help":
        addOutput("Available commands: " + COMMANDS.join(", "));
        addOutput("  cd <dir>   Change directory");
        addOutput("  cat <file> View file content");
        addOutput("  ls         List files");
        addOutput("  clear      Clear terminal");
        break;
      
      case "clear":
        setOutput([]);
        break;

      case "whoami":
        addOutput("visitor@portfolio");
        break;

      case "pwd":
        addOutput(breadcrumb.replace("~", "/home/visitor"));
        break;

      case "ls":
        // Naive implementation: just show top-level files or project subfiles
        // Real implementation requires traversing fileSystem based on current path
        const files = getFilesAtCurrentPath();
        addOutput(files.map(f => f.name + (f.type === 'folder' ? '/' : '')).join("  "));
        break;

      case "cd":
        if (args.length === 0 || args[0] === "~") {
            setActiveView({ type: "home" });
        } else if (args[0] === "..") {
            // Go back logic
            if (activeView.type !== "home") {
                setActiveView({ type: "home" }); // Simplification for MVP
            }
        } else {
            const target = args[0].replace(/\/$/, "");
            const item = findItem(target);
            
            if (!item) {
                 addOutput(`cd: no such file or directory: ${target}`);
            } else if (item.type === "folder") {
                setActiveView({ type: "folder", path: item.name });
            } else {
                 addOutput(`cd: not a directory: ${target}`);
            }
        }
        break;

      case "cat":
      case "open":
        if (args.length === 0) {
            addOutput("usage: cat <filename>");
            return;
        }
        const targetFile = args[0];
        const fileItem = findItem(targetFile);
        if (fileItem) {
            if (fileItem.type === "file") {
                if (fileItem.id) {
                     setActiveView({ type: "project", path: fileItem.name, projectId: fileItem.id });
                } else {
                     setActiveView({ type: "file", path: fileItem.name, contentKey: fileItem.content || "" });
                }
            } else if (fileItem.type === "executable") {
                 setActiveView({ type: "executable", path: fileItem.name, contentKey: fileItem.content || "" });
            } else {
                 addOutput(`cat: ${targetFile}: Is a directory`);
            }
        } else {
            addOutput(`cat: ${targetFile}: No such file or directory`);
        }
        break;

      case "exit":
        // Maybe switch to GUI mode?
        // For now just print bye
        addOutput("Bye! (Use the toggle button to switch modes)");
        break;

      default:
        addOutput(`command not found: ${cmd}`);
    }
  };

  const addOutput = (text: string) => {
    setOutput((prev) => [...prev, { type: "resp", text }]);
  };

  // Helper to find item in current context
  // This is a simplified lookup that assumes flat structure for MVP 
  // or top-level + projects folder.
  const findItem = (name: string): FileSystemItem | undefined => {
      // 1. Search in top level
      const topLevel = portfolioData.fileSystem.find(i => i.name === name);
      if (topLevel) return topLevel;

      // 2. If we are in 'projects', search children
      if (activeView.type === "folder" && activeView.path === "projects") {
          const projectsFolder = portfolioData.fileSystem.find(i => i.name === "projects");
          return projectsFolder?.children?.find(i => i.name === name);
      }
      
      // 3. Search inside projects if name is path-like 'projects/chatbot'
      if (name.startsWith("projects/")) {
           const parts = name.split("/");
           const projectsFolder = portfolioData.fileSystem.find(i => i.name === "projects");
           return projectsFolder?.children?.find(i => i.name === parts[1]);
      }

      return undefined;
  };

  const getFilesAtCurrentPath = (): FileSystemItem[] => {
      if (activeView.type === "folder" && activeView.path === "projects") {
          const projects = portfolioData.fileSystem.find(i => i.name === "projects");
          return projects?.children || [];
      }
      // Default to root
      return portfolioData.fileSystem;
  };

  return (
    <div 
        className="mt-4 pt-4 border-t border-terminal-border" 
        onClick={() => inputRef.current?.focus()}
    >
      {/* Output History */}
      <div className="space-y-1 mb-2">
        {output.map((line, i) => (
          <div key={i} className={`${line.type === "cmd" ? "text-terminal-secondary" : "text-terminal-text"} break-words whitespace-pre-wrap`}>
            {line.type === "cmd" && <span className="text-terminal-accent mr-2">$</span>}
            {line.text}
          </div>
        ))}
      </div>

      {/* Input Line */}
      <div className="flex items-center">
        <span className="text-terminal-accent mr-2 shrink-0">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none text-terminal-text w-full font-mono caret-terminal-accent"
          autoComplete="off"
          spellCheck="false"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
