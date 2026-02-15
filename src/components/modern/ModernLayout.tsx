"use client";

import { ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";
import AuroraBackground from "@/components/effects/AuroraBackground";

const navLinks = [
  { label: "Proyectos", href: "#projects" },
  { label: "Sobre mí", href: "#about" },
  { label: "Experiencia", href: "#experience" },
  { label: "Habilidades", href: "#skills" },
  { label: "Contacto", href: "#contact" },
];

function scrollToSection(href: string) {
  const el = document.querySelector(href);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function ModernLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-modern-bg text-modern-text font-sans selection:bg-modern-accent/20 selection:text-modern-accent overflow-y-auto h-screen">
      {/* Aurora ambient background */}
      <AuroraBackground />

      {/* Navbar — glassmorphism */}
      <nav className="fixed top-0 w-full h-16 z-50 flex items-center justify-between px-6 bg-modern-bg/80 backdrop-blur-md border-b border-white/5">
        <div className="flex flex-col">
          <button
            onClick={() => handleNavClick("#hero")}
            className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-modern-text to-modern-accent hover:opacity-80 transition-opacity"
          >
            Fabrizio
          </button>

        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="px-4 py-2 text-sm font-medium text-modern-muted hover:text-modern-accent rounded-lg hover:bg-white/5 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-modern-muted hover:text-modern-accent transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 md:hidden bg-modern-bg/95 backdrop-blur-md border-b border-white/5 shadow-lg">
          <div className="flex flex-col p-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-3 text-sm font-medium text-modern-muted hover:text-modern-accent hover:bg-white/5 rounded-lg transition-colors text-left"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 flex-1 pt-24 px-4 sm:px-6 container mx-auto max-w-7xl">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-sm text-modern-muted border-t border-white/5 mt-12">
        <p>&copy; {new Date().getFullYear()} Fabrizio. All rights reserved.</p>
      </footer>
    </div>
  );
}
