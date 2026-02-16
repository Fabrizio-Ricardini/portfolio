# Comprehensive Code Review Remediation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Corregir hallazgos prioritarios del code review (A11y, arquitectura, performance, DX y seguridad básica) sin romper build, alineado con `AGENTS.md`.

**Architecture:** Ejecutar mejoras por capas: primero riesgos altos de accesibilidad y coherencia de datos, luego robustez de pipeline y refactor de componentes, y por ultimo optimizaciones de performance y deuda tecnica estructural. Mantener como fuente de verdad `src/lib/data.ts` y respetar separacion `components/terminal/` vs `components/modern/`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, framer-motion, lucide-react, Playwright.

---

## 1) Resumen ejecutivo (max 10)

- La base del proyecto es solida: separacion terminal/moderno, contextos y direccion de producto bien definida.
- Se cumple la regla Playwright de `AGENTS.md` (headless true, screenshot/video/trace off).
- No se detectaron riesgos criticos inmediatos de XSS por renderizado HTML inseguro.
- Hallazgo principal P1: accesibilidad incompleta en modal e interacciones por teclado.
- Hallazgo principal P1: contenido moderno duplicado/hardcodeado fuera de `src/lib/data.ts`.
- Hallazgo principal P1: falta de CI con quality gates (`lint` + `build`) para proteger la rama.
- Hallazgo P2: `AsciiEffect` puede quedar con estado stale por memoizacion fija.
- Hallazgo P2: `NoiseBackground` usa `toDataURL()` en loop y penaliza CPU/memoria.
- Hallazgo P2: hay colores hardcodeados que rompen consistencia de tokens semanticos.
- Deuda tecnica relevante: `ModernContent` monolitico con riesgo de escalabilidad.

---

## 2) Hallazgos priorizados

| Severidad | Area | Archivo/Carpeta | Evidencia | Recomendacion concreta | Impacto / tradeoff | Skill base |
|---|---|---|---|---|---|---|
| P1 | A11y | `src/components/modern/ProjectModal.tsx` | Modal sin `role="dialog"`, sin `aria-modal`, sin trap de foco y sin `Escape`. | Implementar dialog accesible completo (semantica, foco inicial/retorno, `Escape`, tab trapping). | Mejora UX/A11y fuerte; agrega complejidad moderada. | `ui-ux-pro-max` |
| P1 | A11y / UX | `src/components/terminal/FileTree.tsx`, `src/components/terminal/FolderView.tsx`, `src/components/modern/ModernContent.tsx` | Elementos clickeables no siempre semanticos ni operables por teclado. | Convertir a `button`/`a` o agregar roles/teclado/focus visible correctos. | Navegacion robusta con teclado y lectores; pequeno refactor de estilos. | `ui-ux-pro-max` |
| P1 | Arch | `src/components/modern/ModernContent.tsx`, `src/lib/data.ts` | About/skills modernos hardcodeados; contradice fuente de verdad en `AGENTS.md` seccion 4. | Unificar contenido en `portfolioData` y consumirlo en ambos modos. | Evita drift de contenido; requiere migracion de tipos/datos. | `next-best-practices` |
| P1 | DX | `package.json`, `.github/workflows/` | Sin CI visible para `lint` + `build`, tensiona "Verificacion Constante" y "No romper la build". | Crear workflow de CI minimo en PR/push con gates obligatorios. | Reduce regresiones; aumenta tiempo de feedback en PR. | `requesting-code-review` |
| P2 | Perf | `src/components/effects/ascii-effect.tsx` | Instancia memoizada con deps vacias puede no reaccionar a cambios de props/uniforms. | Reinstanciar en cambios clave o exponer setters sincronizados. | Corrige visual state stale; posible costo de recomposicion. | `vercel-react-best-practices` |
| P2 | Perf | `src/components/effects/NoiseBackground.tsx` | `canvas.toDataURL()` repetido en loop crea strings pesados y churn. | Reemplazar por noise estatico/CSS o pipeline mas eficiente con throttling. | Menor uso CPU/memoria; posible perdida de dinamismo visual. | `vercel-react-best-practices` |
| P2 | A11y | `src/components/terminal/FileView.tsx` | Contenido visual markdown marcado `aria-hidden`; links visibles no quedan expuestos igual para AT. | Replantear estrategia A11y del typing con contenido accesible y `aria-live` selectivo. | Mejora experiencia AT; requiere ajustar render de typing. | `ui-ux-pro-max` |
| P2 | DX / Arch | `src/components/CommandPalette.tsx`, `src/components/effects/effect-scene.tsx` | Uso de hex hardcodeados (`#...`) fuera de tokens semanticos de tema. | Migrar a variables/clases semanticas de `globals.css` (`@theme inline`). | Consistencia visual y mantenibilidad; refactor CSS menor. | `tailwind-design-system` |
| P3 | Perf / Next | `next.config.ts`, `package.json` | Dependencia de `raw-loader` + flags `--webpack` agrega deuda tecnica. | Evaluar migracion gradual a carga estandar sin loader legacy. | Menor deuda futura; demanda plan de migracion. | `next-best-practices` |
| P3 | Sec / DX | `package.json`, `.github/workflows/` | Sin auditoria automatizada de dependencias en flujo normal. | Agregar chequeo SCA (`npm audit` con politica de severidad) en CI. | Mejora postura sec; puede introducir ruido inicial. | `requesting-code-review` |

---

## 3) Quick wins (1-2 horas)

1. Agregar semantica accesible del modal (`role`, `aria-modal`, `Escape`, foco) en `src/components/modern/ProjectModal.tsx`.
2. Asegurar activacion por teclado (Enter/Espacio) y focus visible en cards/listados interactivos.
3. Sustituir hardcoded colors mas visibles por tokens semanticos en `src/components/CommandPalette.tsx`.
4. Corregir reactvidad de props/uniforms en `src/components/effects/ascii-effect.tsx`.
5. Agregar workflow de CI minimo con `npm run lint` y `npm run build`.
6. Documentar quality gates en `README.md` para DX del equipo.

---

## 4) Plan de accion por fases

### Fase 1 (1 dia): Riesgos altos de accesibilidad y consistencia

**Objetivos**
- Eliminar bloqueos P1 de A11y/UX en modal e interacciones.
- Empezar convergencia de estilos a tokens semanticos.

**Tareas**
1. Modal accesible completo en `src/components/modern/ProjectModal.tsx`.
2. Refactor de interactivos a elementos semanticos en:
   - `src/components/modern/ModernContent.tsx`
   - `src/components/terminal/FileTree.tsx`
   - `src/components/terminal/FolderView.tsx`
3. Migrar hardcoded colors criticos a tokens semanticos en:
   - `src/components/CommandPalette.tsx`
   - `src/components/effects/effect-scene.tsx`

**Riesgos**
- Cambios en foco/teclado pueden alterar estilos de hover/active.
- Ajustes de tokens pueden modificar contraste percibido.

**Done**
- Modal usable solo con teclado.
- Todos los elementos interactivos clave accesibles por teclado.
- Sin hardcoded colors criticos en las vistas principales.

### Fase 2 (1 semana): Arquitectura y DX

**Objetivos**
- Cumplir la fuente de verdad unica en `src/lib/data.ts`.
- Reducir deuda estructural de `ModernContent`.
- Proteger rama con quality gates.

**Tareas**
1. Migrar contenido moderno hardcodeado a `src/lib/data.ts`.
2. Dividir `src/components/modern/ModernContent.tsx` en subcomponentes por seccion.
3. Crear CI en `.github/workflows/` para PR/push:
   - `npm ci`
   - `npm run lint`
   - `npm run build`
4. (Opcional de seguridad) agregar job de auditoria de dependencias.

**Riesgos**
- Riesgo de mismatch de tipos al mover contenido.
- Refactor de componente grande puede introducir regresiones visuales.

**Done**
- Datos de ambos modos salen de `src/lib/data.ts` donde aplique.
- `ModernContent` modularizado y legible.
- CI verde obligatorio para merge.

### Fase 3 (1 mes): Performance y sostenibilidad

**Objetivos**
- Mejorar costo de render/animacion en escenarios reales.
- Reducir deuda de bundling y mantener estabilidad.

**Tareas**
1. Optimizar `src/components/effects/NoiseBackground.tsx` para evitar churn por data URLs.
2. Ajustar `src/components/effects/ascii-effect.tsx` para sincronizacion correcta de props y estado interno.
3. Evaluar plan de salida de `raw-loader` (`next.config.ts`, `package.json`).
4. Agregar e2e basicos de flujo critico (mode switch, modal, navegacion).

**Riesgos**
- Tradeoff entre "wow visual" y rendimiento.
- Migracion de bundling puede requerir cambios de contenido/loader.

**Done**
- Menor carga de CPU/memoria en efectos principales.
- Flujo visual estable sin stale states.
- Plan de migracion de bundling definido o ejecutado.

---

## 5) Checklist de verificacion (manual + comandos)

### Manual

- Navegacion completa con teclado: `Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`.
- Focus visible en elementos interactivos (terminal + modern).
- Contraste y legibilidad aceptables en ambos modos.
- `prefers-reduced-motion` respetado en transiciones clave.
- Confirmar consistencia de contenido entre modos desde `src/lib/data.ts`.
- Validar ausencia de hex hardcodeados no justificados en UI principal.

### Comandos sugeridos

```bash
npm run lint
npm run build
```

### Si se usan tests E2E (Playwright)

Respetar reglas de `AGENTS.md`:

- `headless: true`
- `screenshot: 'off'`
- `video: 'off'`
- `trace: 'off'`

---

## 6) Orden recomendado de implementacion

1. Completar quick wins de A11y y tokens (Fase 1).
2. Ejecutar verificacion rapida (`lint` + smoke manual).
3. Completar migracion de data + CI (Fase 2).
4. Ejecutar optimizaciones de effects y deuda de bundling (Fase 3).
5. Cerrar con verificacion final completa y reporte de estado.
