"use client";

import { portfolioData } from "@/lib/data";
import { useActiveFile } from "@/context/ActiveFileContext";


interface FolderViewProps {
  folderPath: string;
}

export default function FolderView({ folderPath }: FolderViewProps) {
  const { setActiveView } = useActiveFile();

  // Find the folder in fileSystem to get its children
  const folder = portfolioData.fileSystem.find(
    (item) => item.name === folderPath && item.type === "folder"
  );

  const items = folder?.children ?? [];

  // Map children to projects if they have ids
  const rows = items.map((item) => {
    const project = item.id
      ? portfolioData.projects.find((p) => p.id === item.id)
      : null;

    return {
      perms: project ? "drwxr-xr-x" : "-rw-r--r--",
      user: "root",
      size: project ? `${(item.name.length * 10) % 90 + 10}K` : "4.0K",
      date: "Feb 12",
      name: item.name,
      stack: project?.stack ?? [],
      item,
    };
  });

  const handleRowClick = (item: (typeof items)[0]) => {
    if (item.id) {
      setActiveView({ type: "project", path: item.name, projectId: item.id });
    } else if (item.content) {
      setActiveView({
        type: item.type === "executable" ? "executable" : "file",
        path: `${folderPath}/${item.name}`,
        contentKey: item.content,
      });
    }
  };

  return (
    <nav aria-label={`Contents of ${folderPath}`} className="font-mono text-sm">
      <p className="text-terminal-secondary mb-2">
        <span className="text-terminal-accent">$</span> ls -la {folderPath}/
      </p>
      <p className="text-terminal-secondary text-xs mb-1">
        total {rows.length}
      </p>

      {/* Header */}
      <div className="flex text-terminal-secondary border-b border-terminal-border pb-1 mb-1 uppercase text-xs tracking-wider" role="row" aria-hidden="true">
        <div className="w-28 hidden md:block">Perms</div>
        <div className="w-16 hidden lg:block">User</div>
        <div className="w-14 hidden md:block">Size</div>
        <div className="w-20 hidden sm:block">Date</div>
        <div className="flex-1">Name</div>
      </div>

      {/* Rows */}
      <ul>
        {rows.map((row) => (
          <li key={row.name}>
            <button
              type="button"
              className="group flex w-full text-left hover:bg-terminal-border/30 cursor-pointer py-2.5 sm:py-1 px-1 rounded transition-colors active:bg-terminal-border/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-terminal-accent/60"
              onClick={() => handleRowClick(row.item)}
            >
              <span className="w-28 text-terminal-secondary opacity-60 hidden md:block" aria-hidden="true">
                {row.perms}
              </span>
              <span className="w-16 text-terminal-accent hidden lg:block" aria-hidden="true">
                {row.user}
              </span>
              <span className="w-14 text-terminal-secondary hidden md:block" aria-hidden="true">
                {row.size}
              </span>
              <span className="w-20 text-terminal-secondary hidden sm:block" aria-hidden="true">
                {row.date}
              </span>
              <span className="flex-1 text-terminal-text group-hover:text-terminal-accent transition-colors font-bold">
                {row.name}
                {row.stack.length > 0 && (
                  <span className="ml-2 text-terminal-secondary font-normal opacity-50 group-hover:opacity-100 transition-opacity text-xs">
                    [{row.stack.join(", ")}]
                  </span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
