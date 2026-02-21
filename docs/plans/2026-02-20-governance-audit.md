# Governance Audit Mini-Sweep Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Alinear governance de testing (AGENTS + ADR 0002 + README) con el estado real del repo antes del frontend deep dive, sin tocar `src/*`.

**Architecture:** Mantener Frontend-Layered sin cambios estructurales. Aplicar un saneamiento documental y operativo de bajo riesgo: definir con precision que lint/build son gates activos, que Playwright tooling existe, y que E2E todavia no es gate obligatorio.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, GitHub Actions CI, Playwright tooling.

---

## Alcance y restricciones

- Sin cambios en `src/*`.
- Sin refactor de componentes.
- Sin cambios de arquitectura.
- Cambios pequenos, atomicos y verificables.

## Estado observado (baseline)

- Gates activos hoy:
  - `npm run lint`
  - `npm run build`
- Tooling de E2E presente:
  - `@playwright/test` en `package.json`
  - `playwright.config.ts` con config liviana
- Estado de E2E hoy:
  - no hay suite minima estable en `e2e/`
  - no existe gate obligatorio de E2E en CI

## Gaps de governance detectados

1. Mensajes parcialmente ambiguos entre `AGENTS.md`, `README.md` y `docs/decisions/0002-testing-quality-gates.md`.
2. ADR 0002 no explicita suficientemente la diferencia entre tooling presente y gate obligatorio.
3. `check-bootstrap-consistency.py` falla en comparacion de standards cuando el header publicado usa bloque HTML.

## Tareas atomicas

### Task 1: Alinear AGENTS con estado real de testing

**Files:**
- Modify: `AGENTS.md`

**Steps:**
1. Mantener matriz de verificacion con `lint/build` activos.
2. Mantener `tests` y `e2e` como `not-configured` para gate obligatorio.
3. Agregar nota explicita sobre Playwright presente para adopcion incremental.

### Task 2: Alinear ADR 0002 con politica real

**Files:**
- Modify: `docs/decisions/0002-testing-quality-gates.md`

**Steps:**
1. Actualizar contexto para reflejar estado real (gates activos + tooling Playwright).
2. Clarificar decision: E2E disponible, pero no obligatorio como gate.
3. Agregar criterio de promotion para volver E2E gate obligatorio.

### Task 3: Alinear README con politica de calidad vigente

**Files:**
- Modify: `README.md`

**Steps:**
1. Confirmar que el bloque de calidad menciona lint/build como gates.
2. Aclarar que E2E es incremental y aun no gate obligatorio.
3. Mantener referencia a `playwright.config.ts` y config liviana.

### Task 4 (opcional): Fix parsing de standards en checker

**Files:**
- Modify: `.opencode/scripts/check-bootstrap-consistency.py`

**Steps:**
1. Ajustar `remove_standard_header()` para soportar header en bloque HTML (`<!-- ... -->`).
2. Mantener compatibilidad con formato plano existente.
3. Verificar que no cambie el comportamiento fuera de parsing de header.

## Verificacion final

Run:

```bash
python .opencode/scripts/check-bootstrap-consistency.py
npm run lint
npm run build
```

Expected:

- Checker sin errores por parsing de header.
- Lint OK.
- Build OK.

## Salida esperada

- Governance testing policy consistente entre:
  - `AGENTS.md`
  - `docs/decisions/0002-testing-quality-gates.md`
  - `README.md`
- Plan de auditoria guardado en:
  - `docs/plans/2026-02-20-governance-audit.md`
