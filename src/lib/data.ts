import aboutContent from "@/content/about.md";
import skillsContent from "@/content/skills.md";
import readmeContent from "@/content/README.md";
import contactContent from "@/content/contact.sh";

export interface Project {
  id: string;
  title: string;
  terminal_desc: string;
  modern_desc: string;
  stack: string[];
  links: { repo: string; demo: string };
}

export interface FileSystemItem {
  name: string;
  type: "folder" | "file" | "executable";
  id?: string;
  content?: string;
  children?: FileSystemItem[];
}

// ── File Contents (Templates) ──────────────────────────────────────
// Keys match the `content` field in fileSystem items.
// Replace with real content in Phase 7.

export const fileContents: Record<string, string> = {
  readme: readmeContent,
  about: aboutContent,
  skills: skillsContent,
  contact: contactContent,
};

// ── Portfolio Data ──────────────────────────────────────────────────

export const portfolioData = {
  personal: {
    name: "Fabrizio",
    role: "Full Stack Developer",
    bio: "Passionate developer building digital experiences. Specialized in React, Node.js and Cloud Architecture.",
    contact: {
      email: "fabrizio@example.com",
      github: "https://github.com/fabrizio",
      linkedin: "https://linkedin.com/in/fabrizio",
      twitter: "https://twitter.com/fabrizio",
    },
  },
  projects: [
    {
      id: "proj-1",
      title: "E-commerce Platform",
      terminal_desc: "drwxr-xr-x  12K  Jan 15  build/",
      modern_desc:
        "A comprehensive e-commerce platform built with Next.js, Stripe, and PostgreSQL. Features include real-time inventory, cart management, and payment processing.",
      stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
      links: { repo: "#", demo: "#" },
    },
    {
      id: "proj-2",
      title: "AI Chatbot",
      terminal_desc: "-rwxr-xr-x  8.2K  Feb 03  bot.py",
      modern_desc:
        "An intelligent chatbot powered by OpenAI API with context retention, multi-turn conversations, and embeddings-based knowledge retrieval.",
      stack: ["Python", "OpenAI", "FastAPI", "Redis"],
      links: { repo: "#", demo: "#" },
    },
    {
      id: "proj-3",
      title: "Dev Portfolio",
      terminal_desc: "drwxr-xr-x  4.1K  Feb 12  src/",
      modern_desc:
        "A dual-mode portfolio website featuring a terminal interface and a modern UI with seamless animated transitions between modes.",
      stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
      links: { repo: "#", demo: "#" },
    },
    {
      id: "proj-4",
      title: "Task CLI",
      terminal_desc: "-rwxr-xr-x  3.5K  Dec 28  taskr",
      modern_desc:
        "A blazing-fast CLI task manager written in Rust. Supports projects, tags, priorities, and syncs with GitHub Issues via the API.",
      stack: ["Rust", "Clap", "SQLite", "GitHub API"],
      links: { repo: "#", demo: "#" },
    },
  ] as Project[],
  fileSystem: [
    {
      name: "projects",
      type: "folder",
      children: [
        { name: "ecommerce", type: "file", id: "proj-1" },
        { name: "chatbot", type: "file", id: "proj-2" },
        { name: "portfolio", type: "file", id: "proj-3" },
        { name: "taskr", type: "file", id: "proj-4" },
      ],
    },
    { name: "README.md", type: "file", content: "readme" },
    { name: "about.md", type: "file", content: "about" },
    { name: "skills.md", type: "file", content: "skills" },
    { name: "contact.sh", type: "executable", content: "contact" },
  ] as FileSystemItem[],
};
