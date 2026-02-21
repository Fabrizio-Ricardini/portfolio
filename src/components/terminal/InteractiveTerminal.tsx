import { useEffect, useRef, useState } from "react";
import { useActiveFile } from "@/context/ActiveFileContext";
import {
  completeTerminalInput,
  runTerminalCommand,
  type TerminalCommandEffect,
} from "@/features/terminal-shell/commands";

type OutputLine = { type: "cmd" | "resp"; text: string };

export default function InteractiveTerminal() {
  const { activeView, setActiveView, breadcrumb } = useActiveFile();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState<OutputLine[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const executeCommand = (commandInput: string) => {
    const effects = runTerminalCommand(commandInput, {
      activeView,
      breadcrumb,
    });

    if (effects.length === 0) return;

    setOutput((prev) => applyOutputEffects(prev, effects));

    for (const effect of effects) {
      if (effect.type === "setActiveView") {
        setActiveView(effect.view);
      }
    }
  };

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
      const completedInput = completeTerminalInput(input);
      if (completedInput) {
        setInput(completedInput);
      }
    }
  };

  return (
    <div
      className="mt-4 pt-4 border-t border-terminal-border"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="space-y-1 mb-2">
        {output.map((line, i) => (
          <div
            key={i}
            className={`${line.type === "cmd" ? "text-terminal-secondary" : "text-terminal-text"} break-words whitespace-pre-wrap`}
          >
            {line.type === "cmd" && <span className="text-terminal-accent mr-2">$</span>}
            {line.text}
          </div>
        ))}
      </div>

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

function applyOutputEffects(
  currentOutput: OutputLine[],
  effects: TerminalCommandEffect[]
): OutputLine[] {
  let nextOutput = currentOutput;

  for (const effect of effects) {
    switch (effect.type) {
      case "appendCommand":
        nextOutput = [...nextOutput, { type: "cmd", text: effect.text }];
        break;
      case "appendResponse":
        nextOutput = [...nextOutput, { type: "resp", text: effect.text }];
        break;
      case "clearOutput":
        nextOutput = [];
        break;
      case "setActiveView":
        break;
      default:
        break;
    }
  }

  return nextOutput;
}
