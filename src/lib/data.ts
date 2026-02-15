import aboutContent from "@/content/about.md";
import experienceContent from "@/content/experience.md";
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
  experience: experienceContent,
  skills: skillsContent,
  contact: contactContent,
};

// ── Portfolio Data ──────────────────────────────────────────────────

export const portfolioData = {
  personal: {
    name: "Fabrizio",
    role: "Full Stack Developer",
    bio: "Soy un desarrollador enfocado en crear herramientas prácticas y aplicaciones web que reduzcan fricción para equipos y usuarios. Me gusta detectar dónde se pierde tiempo y convertir eso en automatización clara e interfaces simples.",
    contact: {
      email: "fabrizio.ricardini@gmail.com",
      github: "https://github.com/fabrizio-ricardini",
      linkedin: "https://linkedin.com/in/fabrizio-ricardini",
    },
  },
  experience: [
    {
      role: "Tier II/III Support Analyst",
      company: "FK {tech}",
      period: "2024 — Present",
      description:
        "Soporte N2/N3 regional de integraciones e-commerce y logística. Liderazgo en monitoreo, diagnóstico de fallas (ELK/OpenSearch) y automatización de procesos operativos.",
      achievements: [
        "Desarrollo de interfaz web de soporte (Node.js + Express + Tailwind) para estandarización y reducción de error humano.",
        "Automatización AWS S3 (ETL): script automático que redujo el tiempo de procesamiento de archivos de ~1 hora a 5-10 minutos.",
        "Automatización de diagnóstico: herramienta que compara configuraciones SQL para detectar errores automáticamente.",
        "Generación de reportes y visualizador de configuraciones tipo 'Metabase' con filtros automáticos.",
        "Scripts verificadores de tiendas: validación proactiva de APIs externas antes del alta.",
        "Gestión de incidencias y requerimientos (Jira/InvGate) con seguimiento de casos recurrentes.",
        "Monitoreo de órdenes integradas y métricas operativas en dashboards de Metabase.",
      ],
    },
    {
      role: "Desarrollo Web Full Stack",
      company: "JPMorgan | Artech | EducaciónIT | Fundación Pescar",
      period: "2024-03 — 2024-10",
      description: "Proyecto educativo (ChanGo): plataforma marketplace de servicios para conectar profesionales por oficio/conocimiento.",
      achievements: [
        "PM/Developer: Liderazgo de planning, presentaciones y revisión de PRs.",
        "Desarrollo de REST API (Node + Express + SQL Server) y diseño UI/UX en Figma.",
      ],
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "E-commerce Platform",
      terminal_desc: "drwxr-xr-x  12K  Jan 15  build/",
      modern_desc:
        "A comprehensive e-commerce platform built with Next.js, Stripe, and PostgreSQL. Features include real-time inventory, cart management, and payment processing.",
      stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
      links: { repo: "https://github.com/fabrizio-ricardini", demo: "https://github.com/fabrizio-ricardini" },
    },
    {
      id: "proj-2",
      title: "AI Chatbot",
      terminal_desc: "-rwxr-xr-x  8.2K  Feb 03  bot.py",
      modern_desc:
        "An intelligent chatbot powered by OpenAI API with context retention, multi-turn conversations, and embeddings-based knowledge retrieval.",
      stack: ["Python", "OpenAI", "FastAPI", "Redis"],
      links: { repo: "https://github.com/fabrizio-ricardini", demo: "https://github.com/fabrizio-ricardini" },
    },
    {
      id: "proj-3",
      title: "Dev Portfolio",
      terminal_desc: "drwxr-xr-x  4.1K  Feb 12  src/",
      modern_desc:
        "A dual-mode portfolio website featuring a terminal interface and a modern UI with seamless animated transitions between modes.",
      stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
      links: { repo: "https://github.com/fabrizio-ricardini", demo: "https://github.com/fabrizio-ricardini" },
    },
    {
      id: "proj-4",
      title: "Task CLI",
      terminal_desc: "-rwxr-xr-x  3.5K  Dec 28  taskr",
      modern_desc:
        "A blazing-fast CLI task manager written in Rust. Supports projects, tags, priorities, and syncs with GitHub Issues via the API.",
      stack: ["Rust", "Clap", "SQLite", "GitHub API"],
      links: { repo: "https://github.com/fabrizio-ricardini", demo: "https://github.com/fabrizio-ricardini" },
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
    { name: "experience.md", type: "file", content: "experience" },
    { name: "skills.md", type: "file", content: "skills" },
    { name: "contact.sh", type: "executable", content: "contact" },
  ] as FileSystemItem[],
};
