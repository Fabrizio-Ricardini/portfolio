import type { ActiveView } from "@/context/ActiveFileContext";
import { portfolioData, type FileSystemItem } from "@/lib/data";

export const TERMINAL_COMMANDS = [
  "help",
  "clear",
  "ls",
  "cd",
  "cat",
  "open",
  "pwd",
  "whoami",
  "exit",
] as const;

export type TerminalCommandEffect =
  | { type: "appendCommand"; text: string }
  | { type: "appendResponse"; text: string }
  | { type: "clearOutput" }
  | { type: "setActiveView"; view: ActiveView };

interface TerminalCommandState {
  activeView: ActiveView;
  breadcrumb: string;
}

export function completeTerminalInput(input: string): string | null {
  const parts = input.trim().split(" ");
  const current = parts[parts.length - 1];

  if (parts.length !== 1) {
    return null;
  }

  const matches = TERMINAL_COMMANDS.filter((command) =>
    command.startsWith(current)
  );

  if (matches.length === 1) {
    return `${matches[0]} `;
  }

  return null;
}

export function runTerminalCommand(
  commandInput: string,
  state: TerminalCommandState
): TerminalCommandEffect[] {
  const trimmed = commandInput.trim();
  if (!trimmed) return [];

  const effects: TerminalCommandEffect[] = [
    { type: "appendCommand", text: trimmed },
  ];

  const parts = trimmed.split(" ");
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (command) {
    case "help": {
      effects.push(
        {
          type: "appendResponse",
          text: `Available commands: ${TERMINAL_COMMANDS.join(", ")}`,
        },
        { type: "appendResponse", text: "  cd <dir>   Change directory" },
        { type: "appendResponse", text: "  cat <file> View file content" },
        { type: "appendResponse", text: "  ls         List files" },
        { type: "appendResponse", text: "  clear      Clear terminal" }
      );
      break;
    }

    case "clear": {
      effects.push({ type: "clearOutput" });
      break;
    }

    case "whoami": {
      effects.push({ type: "appendResponse", text: "visitor@portfolio" });
      break;
    }

    case "pwd": {
      effects.push({
        type: "appendResponse",
        text: state.breadcrumb.replace("~", "/home/visitor"),
      });
      break;
    }

    case "ls": {
      const files = getFilesAtCurrentPath(state.activeView);
      effects.push({
        type: "appendResponse",
        text: files
          .map((file) => `${file.name}${file.type === "folder" ? "/" : ""}`)
          .join("  "),
      });
      break;
    }

    case "cd": {
      if (args.length === 0 || args[0] === "~") {
        effects.push({ type: "setActiveView", view: { type: "home" } });
        break;
      }

      if (args[0] === "..") {
        if (state.activeView.type !== "home") {
          effects.push({ type: "setActiveView", view: { type: "home" } });
        }
        break;
      }

      const target = args[0].replace(/\/$/, "");
      const item = findItem(target, state.activeView);

      if (!item) {
        effects.push({
          type: "appendResponse",
          text: `cd: no such file or directory: ${target}`,
        });
        break;
      }

      if (item.type === "folder") {
        effects.push({
          type: "setActiveView",
          view: { type: "folder", path: item.name },
        });
      } else {
        effects.push({
          type: "appendResponse",
          text: `cd: not a directory: ${target}`,
        });
      }

      break;
    }

    case "cat":
    case "open": {
      if (args.length === 0) {
        effects.push({ type: "appendResponse", text: "usage: cat <filename>" });
        return effects;
      }

      const targetFile = args[0];
      const item = findItem(targetFile, state.activeView);

      if (!item) {
        effects.push({
          type: "appendResponse",
          text: `cat: ${targetFile}: No such file or directory`,
        });
        return effects;
      }

      if (item.type === "folder") {
        effects.push({
          type: "appendResponse",
          text: `cat: ${targetFile}: Is a directory`,
        });
        return effects;
      }

      if (item.type === "executable") {
        effects.push({
          type: "setActiveView",
          view: {
            type: "executable",
            path: item.name,
            contentKey: item.content || "",
          },
        });
        return effects;
      }

      if (item.id) {
        effects.push({
          type: "setActiveView",
          view: {
            type: "project",
            path: item.name,
            projectId: item.id,
          },
        });
      } else {
        effects.push({
          type: "setActiveView",
          view: {
            type: "file",
            path: item.name,
            contentKey: item.content || "",
          },
        });
      }
      break;
    }

    case "exit": {
      effects.push({
        type: "appendResponse",
        text: "Bye! (Use the toggle button to switch modes)",
      });
      break;
    }

    default: {
      effects.push({
        type: "appendResponse",
        text: `command not found: ${command}`,
      });
      break;
    }
  }

  return effects;
}

function findItem(name: string, activeView: ActiveView): FileSystemItem | undefined {
  const topLevel = portfolioData.fileSystem.find((item) => item.name === name);
  if (topLevel) return topLevel;

  if (activeView.type === "folder" && activeView.path === "projects") {
    const projectsFolder = portfolioData.fileSystem.find(
      (item) => item.name === "projects"
    );
    return projectsFolder?.children?.find((item) => item.name === name);
  }

  if (name.startsWith("projects/")) {
    const parts = name.split("/");
    const projectsFolder = portfolioData.fileSystem.find(
      (item) => item.name === "projects"
    );
    return projectsFolder?.children?.find((item) => item.name === parts[1]);
  }

  return undefined;
}

function getFilesAtCurrentPath(activeView: ActiveView): FileSystemItem[] {
  if (activeView.type === "folder" && activeView.path === "projects") {
    const projects = portfolioData.fileSystem.find(
      (item) => item.name === "projects"
    );
    return projects?.children || [];
  }

  return portfolioData.fileSystem;
}
