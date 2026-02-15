"use client";

import { fileContents } from "@/lib/data";
import { useEffect, useState, useCallback } from "react";

interface ScriptViewProps {
  contentKey: string;
  filePath: string;
}

interface LogEntry {
  text: string;
  type: "info" | "success" | "cmd" | "output" | "blank";
}

const parseScript = (raw: string): LogEntry[] => {
  const entries: LogEntry[] = [];
  const lines = raw.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("#!") || trimmed === "") continue;
    if (trimmed.startsWith("# ")) {
      entries.push({ text: trimmed, type: "info" });
    } else if (trimmed.startsWith("echo")) {
      // Extract the string inside quotes
      const match = trimmed.match(/echo\s+["'](.*)["']/);
      if (match) {
        entries.push({ text: match[1], type: "output" });
      }
    } else if (trimmed.startsWith("exit")) {
      entries.push({ text: `Process exited with code ${trimmed.split(" ")[1] ?? "0"}`, type: "success" });
    }
  }

  return entries;
};

export default function ScriptView({ contentKey, filePath }: ScriptViewProps) {
  const content = fileContents[contentKey] ?? "echo 'Script not found'";
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const runScript = useCallback(() => {
    setLogs([]);
    setIsRunning(true);
    setHasRun(true);

    const entries = parseScript(content);
    let i = 0;

    const interval = setInterval(() => {
      if (i < entries.length) {
        const entry = entries[i];
        i++;
        setLogs((prev) => [...prev, entry]);
      } else {
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [content]);

  // Auto-run on mount
  useEffect(() => {
    const cleanup = runScript();
    return cleanup;
  }, [runScript]);

  const getLogColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "info":
        return "text-terminal-secondary italic";
      case "success":
        return "text-terminal-success";
      case "cmd":
        return "text-terminal-accent";
      case "output":
        return "text-terminal-text";
      case "blank":
        return "";
    }
  };

  const renderLogText = (text: string, type: LogEntry["type"]) => {
    if (type !== "output") return text;

    // Detect URLs and Emails
    const urlRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    const parts = text.split(urlRegex);

    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        const isEmail = part.includes("@") && !part.startsWith("http");
        return (
          <a
            key={i}
            href={isEmail ? `mailto:${part}` : part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-accent underline hover:text-white transition-colors cursor-pointer"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <article className="font-mono text-sm">
      <p className="text-terminal-secondary mb-1">
        <span className="text-terminal-accent">$</span> chmod +x {filePath}
      </p>
      <p className="text-terminal-secondary mb-3">
        <span className="text-terminal-accent">$</span> ./{filePath}
      </p>

      <pre className="bg-terminal-bg/50 border border-terminal-border rounded-md p-4 overflow-auto max-h-[calc(100vh-200px)] whitespace-pre-wrap">
        <code>
          {logs.map((log, index) => (
            <div key={index} className={`leading-7 ${getLogColor(log.type)}`}>
              {renderLogText(log.text, log.type)}
            </div>
          ))}
        </code>

        {/* Running indicator */}
        {isRunning && (
          <div className="flex items-center gap-2 leading-7 text-terminal-accent" aria-hidden="true">
            <span className="inline-block w-2 h-4 bg-terminal-accent animate-cursor-blink" />
          </div>
        )}

        {/* Re-run button */}
        {!isRunning && hasRun && (
          <div className="mt-4 pt-3 border-t border-terminal-border">
            <button
              onClick={runScript}
              className="text-xs text-terminal-secondary hover:text-terminal-accent active:text-terminal-accent transition-colors cursor-pointer py-2 px-3 -ml-3 rounded"
            >
              [Re-run script]
            </button>
          </div>
        )}
      </pre>
    </article>
  );
}
