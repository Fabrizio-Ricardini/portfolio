export type NavigationIcon = "home" | "code2" | "user" | "fileText" | "mail";

export type TerminalNavigationTarget =
  | { type: "home" }
  | { type: "folder"; path: string }
  | { type: "file"; path: string; contentKey: string }
  | { type: "executable"; path: string; contentKey: string };

export interface NavigationSection {
  id: "hero" | "projects" | "about" | "experience" | "skills" | "contact";
  navLabel: string;
  commandLabel: string;
  icon: NavigationIcon;
  href: string;
  showInNavbar: boolean;
  terminalTarget: TerminalNavigationTarget;
}

export const NAVIGATION_SECTIONS: NavigationSection[] = [
  {
    id: "hero",
    navLabel: "Inicio",
    commandLabel: "Go to Home",
    icon: "home",
    href: "#hero",
    showInNavbar: false,
    terminalTarget: { type: "home" },
  },
  {
    id: "projects",
    navLabel: "Proyectos",
    commandLabel: "View Projects",
    icon: "code2",
    href: "#projects",
    showInNavbar: true,
    terminalTarget: { type: "folder", path: "projects" },
  },
  {
    id: "about",
    navLabel: "Sobre mi",
    commandLabel: "About Me",
    icon: "user",
    href: "#about",
    showInNavbar: true,
    terminalTarget: { type: "file", path: "about.md", contentKey: "about" },
  },
  {
    id: "experience",
    navLabel: "Experiencia",
    commandLabel: "Experience",
    icon: "fileText",
    href: "#experience",
    showInNavbar: true,
    terminalTarget: {
      type: "file",
      path: "experience.md",
      contentKey: "experience",
    },
  },
  {
    id: "skills",
    navLabel: "Habilidades",
    commandLabel: "Skills",
    icon: "fileText",
    href: "#skills",
    showInNavbar: true,
    terminalTarget: { type: "file", path: "skills.md", contentKey: "skills" },
  },
  {
    id: "contact",
    navLabel: "Contacto",
    commandLabel: "Contact",
    icon: "mail",
    href: "#contact",
    showInNavbar: true,
    terminalTarget: {
      type: "executable",
      path: "contact.sh",
      contentKey: "contact",
    },
  },
];

export function scrollToSection(href: string): void {
  if (typeof document === "undefined") return;
  const section = document.querySelector(href);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
