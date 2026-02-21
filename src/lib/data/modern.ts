import type { ModernSkillCategory } from "./types";

export const modern = {
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
};
