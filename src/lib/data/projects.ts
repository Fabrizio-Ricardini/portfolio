import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "proj-fundacion-pescar",
    title: "ChanGo!",
    terminal_desc: "drwxr-xr-x  18K  2024  chango-marketplace/",
    modern_desc:
      "Marketplace de oficios creado en Fundacion Pescar para conectar personas que ofrecen y buscan servicios. Trabajé como PM/Dev, coordinando el roadmap del equipo y desarrollando partes clave del frontend con HTML, CSS, JavaScript, Sass y Bootstrap. Se entregó un MVP funcional y publicado, enfocado en resolver una necesidad real de oferta y demanda local.",
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
      "Sitio web para difundir el evento Talleres Abiertos del Complejo Empresarial Central Park, con foco en comunicar agenda, talleres y convocatoria de artistas. Participé como PM/Dev, organizando entregas y desarrollando módulos de interfaz en HTML, CSS y JavaScript. El resultado fue una landing publicada, clara y orientada a facilitar la participación.",
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
      "Aplicación en Next.js/TypeScript con arquitectura de datos centralizada y renderizado dual (Terminal + Modern UI) sobre una misma fuente de contenido. Implementa manejo de estado compartido, transiciones con Framer Motion y criterios de accesibilidad para interacción por teclado. Resultado: deploy productivo en Vercel y base extensible para iteraciones de producto.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    links: {
      repo: "https://github.com/Fabrizio-Ricardini/portfolio",
      demo: "https://portfolio-fabrizio.vercel.app/",
    },
  },
];
