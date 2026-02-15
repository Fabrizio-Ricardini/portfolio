# AGENTS.md - Protocolo de Ejecución del Portfolio Dual

Este archivo define la hoja de ruta técnica y las reglas operativas para la construcción del Portfolio Personal con UI Híbrida (Terminal/Moderna).

## 1. Principios Fundamentales
1.  **Seguridad Primero:** Nunca ejecutar comandos destructivos (`rm -rf`, `git reset --hard`) o exponer secretos (.env) sin confirmación explícita y análisis de impacto.
2.  **Verificación Constante:** Asumir que el código puede fallar. Ejecutar linter y build antes de dar una tarea por finalizada.
3.  **No Romper la Build:** La rama principal (`main`) siempre debe ser desplegable.
4.  **Aprobación para Producción:** **REGLA CRÍTICA:** Nunca hacer push a la rama de producción o desplegar sin la aprobación explícita y final del usuario.

## 2. Objetivo del Proyecto
Crear una aplicación web que simule una experiencia de **Terminal Avanzada** (modo default) para desarrolladores, con la capacidad de transicionar fluidamente a una **UI Moderna** tipo landing page.

## 3. Stack Tecnológico & Decisiones
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

## 4. Arquitectura de Datos
La "verdad" del contenido reside en `lib/data.ts`. No hay base de datos.
*   **Estrategia:** Usar *templates* (lorem ipsum / datos mock) durante el desarrollo. Reemplazar con contenido real en Fase 7.
*   **Estructura:**
    *   `fileSystem`: Árbol recursivo para el sidebar de la terminal.
    *   `projects`: Array de objetos con metadatos duales (terminal_desc / modern_desc).
    *   `fileContents`: Mapa de contenidos para archivos individuales (about, skills, contact).

## 5. Flujo de Trabajo del Agente

### Fase A: Entendimiento
1.  Leer `README.md` y estructura de carpetas.
2.  Si la tarea es ambigua, **preguntar antes de actuar**.
3.  Buscar código existente para mantener consistencia en estilos y patrones.

### Fase B: Implementación
1.  **Atomicidad:** Realizar cambios pequeños y testables.
2.  **Dry Run:** Si la operación es compleja, explicar el plan antes de escribir código.
3.  **Manejo de Errores:** Implementar `try/catch` o fronteras de error (Error Boundaries) en nuevas funcionalidades.

### Fase C: Verificación
1.  Ejecutar linter/formatter del proyecto.
2.  Verificar que no haya errores de compilación (`npm run build` o equivalente).
3.  Si se tocan tests, ejecutarlos para asegurar no regresión.

## 6. Plan de Implementación (Fases)

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
*   [x] **Experiencia:** Sección de Experience con timeline vertical.

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

## 7. Protocolo Git & Commits

### Estándar: Conventional Commits
Usar estrictamente el formato: `<tipo>(<scope>): <descripción>`
*   `feat`: Nueva funcionalidad.
*   `fix`: Corrección de errores.
*   `docs`: Cambios en documentación.
*   `style`: Formato, puntos y comas (sin cambios de lógica).
*   `refactor`: Refactorización de código.
*   `test`: Añadir o corregir tests.
*   `chore`: Tareas de mantenimiento, build, herramientas.

### Reglas de Git
1.  **Commits Atómicos:** Un propósito lógico por commit. No mezclar refactors con features.
2.  **Mensajes Claros:** Usar imperativo ("add" no "added").
3.  **Ramas:**
    *   Desarrollo en ramas nuevas (`feat/nombre-feature`) si la tarea es compleja.
    *   Commit directo a `main` solo permitido en tareas triviales o si el usuario lo indica explícitamente.
4.  **Push a Remoto:**
    *   **STOP:** Antes de hacer `git push`, preguntar: "¿Deseas que suba los cambios al remoto?".
    *   Nunca usar `--force` en ramas compartidas.

## 8. Skills Disponibles

Este agente tiene acceso a las siguientes skills especializadas.

| Skill Name | Description |
| :--- | :--- |
| **writing-skills** | Use when creating new skills, editing existing skills, or verifying skills work before deployment. |
| **writing-plans** | Use when you have a spec or requirements for a multi-step task, before touching code. |
| **web-tailwind-ui** | Design or fix UI using semantic HTML and Tailwind CSS. |
| **web-express-route** | Create or modify full-stack feature in Node/Express (Route + Controller + View). |
| **verification-before-completion** | **Mandatory:** Use when claiming work is complete, fixed, or passing. Requires running verification commands and confirming output. |
| **vercel-react-best-practices** | React and Next.js performance optimization guidelines from Vercel Engineering. |
| **using-superpowers** | Use when starting any conversation - establishes how to find and use skills. |
| **using-git-worktrees** | Use when starting feature work that needs isolation or before executing implementation plans. |
| **ui-ux-pro-max** | UI/UX design intelligence. 50 styles, 21 palettes, font pairings, charts, stacks. Comprehensive design system knowledge. |
| **test-driven-development** | Use when implementing any feature or bugfix, before writing implementation code. |
| **tailwind-design-system** | Build scalable design systems with Tailwind CSS v4, tokens, and libraries. |
| **systematic-debugging** | Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes. |
| **subagent-driven-development** | Use when executing implementation plans with independent tasks in the current session. |
| **requesting-code-review** | Use when completing tasks, implementing major features, or before merging. |
| **receiving-code-review** | Use when receiving code review feedback, before implementing suggestions. |
| **python-tkinter-gui** | Build or modify non-blocking desktop GUI (Tkinter/CustomTkinter). |
| **python-script-logic** | Backend logic, data processing, or automation scripts in Python. |
| **project-triage** | Use when the request is ambiguous, large, or requires analysis before coding. |
| **next-best-practices** | Next.js best practices - file conventions, RSC boundaries, data patterns, async APIs, metadata, etc. |
| **interface-design** | Design for dashboards, admin panels, apps, tools (not marketing sites). |
| **implementation** | Use for generic code changes, small fixes, or refactors that don't have a specific skill. |
| **git-commit** | Execute git commit with conventional commit message analysis, intelligent staging, and message generation. |
| **frontend-design** | Create distinctive, production-grade frontend interfaces with high design quality. |
| **finishing-a-development-branch** | Use when implementation is complete to decide integration strategy (merge, PR, cleanup). |
| **executing-plans** | Use when you have a written implementation plan to execute in a separate session. |
| **dispatching-parallel-agents** | Use when facing 2+ independent tasks that can be worked on without shared state. |
| **crafting-effective-readmes** | Use when writing or improving README files with templates matched to audience. |
| **changelog-generator** | Automatically creates user-facing changelogs from git commits. |
| **brainstorming** | **Mandatory:** Use before any creative work - explores user intent, requirements, and design. |

## 9. Reglas para Agentes (Específicas del Proyecto)
1.  **Templates First:** No bloquearse por falta de contenido real. Usar placeholders descriptivos.
2.  **Seguridad:** No ejecutar comandos destructivos sin confirmar.
3.  **Consistencia:** Usar siempre las variables de color definidas en Tailwind, no hex codes hardcodeados.
4.  **UX:** La terminal es *falsa* pero debe sentirse *viva* (feedback visual constante: hover, active, focus).
5.  **Clean Code:** Separación estricta: `components/terminal/` vs `components/modern/`. Componentes compartidos en `components/`.
6.  **Tailwind v4:** No usar `tailwind.config.ts`. Los temas se definen en `globals.css` con `@theme inline`.

## 10. Estándares de Testing (Playwright)
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
