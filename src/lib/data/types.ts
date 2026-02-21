export interface Project {
  id: string;
  title: string;
  terminal_desc: string;
  modern_desc: string;
  stack: string[];
  links: { repo: string; demo: string };
}

export type ModernSkillIcon = "code2" | "layers" | "wrench";

export interface ModernSkillCategory {
  title: string;
  icon: ModernSkillIcon;
  items: string[];
}

export interface FileSystemItem {
  name: string;
  type: "folder" | "file" | "executable";
  id?: string;
  content?: string;
  children?: FileSystemItem[];
}
