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
  modern: {
    about: {
      intro: [
        "Soy un desarrollador enfocado en crear herramientas prácticas y aplicaciones web que reduzcan fricción para equipos y usuarios. Me gusta trabajar cerca de los procesos reales: detectar dónde se pierde tiempo y convertir eso en automatización clara e interfaces simples.",
        "Arranqué con scripting y automatización, y esa mentalidad sigue guiando cómo construyo hoy: simplificar procesos, eliminar pasos manuales y hacer que los resultados sean fáciles de verificar.",
      ],
      philosophy: [
        "Priorizar claridad y mantenibilidad antes que lo ingenioso.",
        "Automatizar lo repetitivo y dejar decisiones importantes a las personas.",
        "Construir mejoras pequeñas y medibles que se acumulen.",
      ],
      current: [
        "Mejorando herramientas de automatización (scripting + web UI).",
        "Trabajando con LLMs: prompt engineering y agent workflows.",
        "Evolucionando este portfolio con proyectos y resultados reales.",
      ],
    },
    skills: [
      {
        title: "Lenguajes",
        icon: "code2",
        items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML", "CSS"],
      },
      {
        title: "Frontend & Backend",
        icon: "layers",
        items: [
          "React / Next.js",
          "Tailwind CSS / Framer Motion",
          "Node.js / Express",
          "REST APIs / SQL Server",
        ],
      },
      {
        title: "Data & Automatización",
        icon: "wrench",
        items: [
          "Metabase / OpenSearch / Elasticsearch",
          "Automation / Scripting / AWS S3",
          "LLM Tools / Agent Workflows",
          "Git / Jira / Figma",
        ],
      },
    ] as ModernSkillCategory[],
    availability: {
      openToOpportunitiesLabel: "Abierto a oportunidades",
      location: "Buenos Aires, AR",
      timezone: "UTC-3",
      responseTimeLabel: "Tiempo medio de respuesta: ~24h",
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
      id: "proj-fundacion-pescar",
      title: "ChanGo!",
      terminal_desc: "drwxr-xr-x  18K  2024  chango-marketplace/",
      modern_desc:
        "Marketplace de oficios creado en Fundacion Pescar para conectar personas que ofrecen y buscan servicios. Trabaje como PM/Dev, coordinando el roadmap del equipo y desarrollando partes clave del frontend con HTML, CSS, JavaScript, Sass y Bootstrap. Se entrego un MVP funcional y publicado, enfocado en resolver una necesidad real de oferta y demanda local.",
      stack: ["HTML", "CSS", "JavaScript", "Sass", "Bootstrap"],
      links: {
        repo: "https://github.com/k1000oEnz/ChanGo--Main/tree/main",
        demo: "https://changomain.netlify.app/",
      },
    },
    {
      id: "proj-talleres-abiertos",
      title: "Talleres Abiertos",
      terminal_desc: "drwxr-xr-x  14K  2024  evento-central-park/",
      modern_desc:
        "Sitio web para difundir el evento Talleres Abiertos del Complejo Empresarial Central Park, con foco en comunicar agenda, talleres y convocatoria de artistas. Participe como PM/Dev, organizando entregas y desarrollando modulos de interfaz en HTML, CSS y JavaScript. El resultado fue una landing publicada, clara y orientada a facilitar la participacion.",
      stack: ["HTML", "CSS", "JavaScript"],
      links: {
        repo: "https://github.com/Fabrizio-Ricardini/ProyectoTalleresAbiertos",
        demo: "https://talleresabiertos.netlify.app/",
      },
    },
    {
      id: "proj-portfolio-dual-ui",
      title: "Portfolio Dual UI",
      terminal_desc: "drwxr-xr-x  22K  2026  portfolio-terminal-gui/",
      modern_desc:
        "Aplicacion en Next.js/TypeScript con arquitectura de datos centralizada y renderizado dual (Terminal + Modern UI) sobre una misma fuente de contenido. Implementa manejo de estado compartido, transiciones con Framer Motion y criterios de accesibilidad para interaccion por teclado. Resultado: deploy productivo en Vercel y base extensible para iteraciones de producto.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      links: {
        repo: "https://github.com/Fabrizio-Ricardini/portfolio",
        demo: "https://portfolio-fabrizio.vercel.app/",
      },
    },
  ] as Project[],
  fileSystem: [
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
  ] as FileSystemItem[],
};
