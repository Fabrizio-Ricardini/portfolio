import type { FileSystemItem } from "./types";

export const fileSystem: FileSystemItem[] = [
  {
    name: "projects",
    type: "folder",
    children: [
      { name: "chango", type: "file", id: "proj-fundacion-pescar" },
      { name: "talleres-abiertos", type: "file", id: "proj-talleres-abiertos" },
      { name: "portfolio-dual-ui", type: "file", id: "proj-portfolio-dual-ui" },
    ],
  },
  { name: "README.md", type: "file", content: "readme" },
  { name: "about.md", type: "file", content: "about" },
  { name: "experience.md", type: "file", content: "experience" },
  { name: "skills.md", type: "file", content: "skills" },
  { name: "contact.sh", type: "executable", content: "contact" },
];
