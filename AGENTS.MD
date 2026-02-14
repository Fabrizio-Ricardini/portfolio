# AGENTS.md - Protocolo de Ejecución del Portfolio Dual

Este archivo define la hoja de ruta técnica y las reglas operativas para la construcción del Portfolio Personal con UI Híbrida (Terminal/Moderna).

## 1. Objetivo del Proyecto
Crear una aplicación web que simule una experiencia de **Terminal Avanzada** (modo default) para desarrolladores, con la capacidad de transicionar fluidamente a una **UI Moderna** tipo landing page.

## 2. Stack Tecnológico & Decisiones
*   **Core:** Next.js 16 (App Router) + TypeScript.
*   **Estilos:** Tailwind CSS v4 + `clsx` + `tailwind-merge`.
*   **Animaciones:** `framer-motion` (Crítico para `layoutId`, transiciones CRT y Typing Effects).
*   **Iconos:**
    *   Modo Terminal: `lucide-react` (con estilo monospace).
    *   Modo Moderno: `lucide-react`.
*   **Fuentes:**
    *   Terminal: `JetBrains Mono` (Google Fonts).
    *   Moderno: `Inter` (Google Fonts).
*   **Estado:** React Context (`ViewModeContext` + `ActiveFileContext`).

## 3. Arquitectura de Datos
La "verdad" del contenido reside en `lib/data.ts`. No hay base de datos.
*   **Estrategia:** Usar *templates* (lorem ipsum / datos mock) durante el desarrollo. Reemplazar con contenido real en Fase 7.
*   **Estructura:**
    *   `fileSystem`: Árbol recursivo para el sidebar de la terminal.
    *   `projects`: Array de objetos con metadatos duales (terminal_desc / modern_desc).
    *   `fileContents`: Mapa de contenidos para archivos individuales (about, skills, contact).

## 4. Plan de Implementación (Fases)

### Fase 1: Inicialización (Completado)
*   [x] Ejecutar `npx create-next-app@latest`.
*   [x] Instalar dependencias base.
*   [x] Configurar Tailwind con colores semánticos (`terminal-bg`, `terminal-accent`, etc.).
*   [x] Configurar fuentes en `layout.tsx`.

### Fase 2: Core Logic & Layouts (Completado)
*   [x] Crear `lib/data.ts` con datos mock.
*   [x] Implementar `ViewModeContext` (Default: `'terminal'`).
*   [x] Crear `ModeSwitcher` con `AnimatePresence`.
*   [x] Crear `TerminalLayout` y `ModernLayout` básicos.
*   [x] Implementar botón `ToggleModeButton` flotante.

### Fase 3: Interactividad Terminal (Completado)
*   [x] **Estado de Archivo Activo:** Crear `ActiveFileContext` para trackear qué archivo/carpeta se está viendo.
*   [x] **FileTree Funcional:** Clicks en sidebar actualizan `activeFile` y renderizan contenido dinámico.
*   [x] **Vistas Dinámicas (Renderers):**
    *   [x] `FolderView`: Tabla estilo `ls -la` (con columnas responsive).
    *   [x] `FileView`: Visor de contenido con efecto de escritura ("typing effect").
    *   [x] `ScriptView`: Simulación de ejecución de script (logs progresivos con delays).
*   [x] **Contenido Template:** Agregar contenido mock para `about.md`, `skills.md`, `contact.sh` en `data.ts`.

### Fase 4: Profundidad Modo Moderno (Completado)
*   [x] **Project Details:** Modal con AnimatePresence al hacer clic en una tarjeta de proyecto.
*   [x] **Glassmorphism:** Refinar estilos de Navbar y Cards (blur, bordes, sombras, tokens semánticos).
*   [x] **Secciones:** About, Skills y Contact como secciones del modo moderno con scroll navigation.

### Fase 5: Visual Polish & FX (The "Wow") (Completado)
*   [x] **CRT Turn-Off:** Efecto de apagado de monitor antiguo al salir de la terminal (línea blanca que colapsa al centro).
*   [x] **Glitch Effect:** Distorsión sutil en hover de elementos clave o durante transición de modos.
*   [x] **Scanlines:** Overlay opcional de líneas de escaneo sobre el modo terminal (baja opacidad).
*   [x] **Typing Effect:** Contenido de archivos `.md` se "escribe" progresivamente al abrirse.

### Fase 6: Mobile & Responsive (Completado)
*   [x] **Sidebar Colapsable:** Menú hamburguesa o panel deslizante para la terminal en móviles.
*   [x] **Tablas Adaptativas:** Ocultar columnas menos relevantes (permisos, usuario) en pantallas pequeñas.
*   [x] **Touch:** Asegurar que el toggle y todos los elementos interactivos funcionen bien en touch.

### Fase 7: Contenido Final
*   [ ] Reemplazar templates de `data.ts` con información personal real.
*   [ ] Generar assets finales (imágenes de proyectos si aplica).
*   [ ] SEO y metadata final.

## 5. Reglas para Agentes
1.  **Templates First:** No bloquearse por falta de contenido real. Usar placeholders descriptivos.
2.  **Seguridad:** No ejecutar comandos destructivos sin confirmar.
3.  **Consistencia:** Usar siempre las variables de color definidas en Tailwind, no hex codes hardcodeados.
4.  **UX:** La terminal es *falsa* pero debe sentirse *viva* (feedback visual constante: hover, active, focus).
5.  **Clean Code:** Separación estricta: `components/terminal/` vs `components/modern/`. Componentes compartidos en `components/`.
6.  **Tailwind v4:** No usar `tailwind.config.ts`. Los temas se definen en `globals.css` con `@theme inline`.

## 6. Estándares de Testing (Playwright)
Para mantener el repositorio ligero y la ejecución rápida, cualquier implementación de Playwright (o uso de @playwright/test) en este proyecto debe respetar estas reglas obligatorias:

*  `headless: true` — Ejecutar siempre en modo headless (sin interfaz gráfica visible).
*  `screenshot: 'off'` — Desactivar capturas de pantalla totalmente.
*  `video: 'off'` — Desactivar grabación de video.
*  `trace: 'off'` — Desactivar traces (archivos ZIP con historial de ejecución).

Estas opciones deben fijarse por defecto en el archivo `playwright.config.ts` del repositorio o, si la ejecución no permite editar archivos, pasarse explícitamente al runner (CLI/env) para asegurarse de que no se generen artefactos pesados.

Ejemplo de configuración que los agentes deben usar en `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    // Desactiva las capturas de pantalla totalmente
    screenshot: 'off', 
    // Desactiva la grabación de video (también pesa mucho)
    video: 'off',
    // Desactiva los traces (archivos zip con todo el historial, pesan muchísimo)
    trace: 'off', 
    // Asegúrate de que corra en modo headless (sin interfaz gráfica visible)
    headless: true,
  },
});
```

Reglas operativas para agentes:

*  Si el agente necesita añadir pruebas E2E al repositorio, debe crear `playwright.config.ts` con la configuración anterior.
*  Nunca habilitar screenshots, video o trace por defecto en PRs o runs locales sin permiso explícito del propietario.
*  Si el agente ejecuta Playwright desde un entorno controlado (MCP/u otro runner externo), debe documentar en el PR/commit el motivo por el cual se omitieron estas reglas si aplica alguna excepción.

Opcional: considerar crear una `skill` llamada `playwright-light` que encapsule estas reglas y ofrezca utilidades para generar un `playwright.config.ts` conforme a este estándar.
