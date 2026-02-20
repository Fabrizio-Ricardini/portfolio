# ADR 0001 - Architecture
**Status:** proposed

## Context
- Project type: frontend
- Primary stack: Next.js 16 + React 19 + TypeScript + Tailwind CSS v4
- Constraints/priorities: Adopcion incremental de governance sin romper la estructura vigente ni forzar migraciones de carpetas.

## Decision
We will use **Frontend-Layered** as the primary architecture pattern.

## Alternatives Considered
- Feature-Sliced: Implica reestructuracion inmediata de carpetas/imports y contradice el objetivo de no refactor en esta primera pasada.
- VIPER: Exceso de ceremonia para este frontend en Next.js y no corresponde a los presets oficiales MVP.

## Consequences
- Pros: Alinea governance con la estructura actual (app/components/context/lib) minimizando riesgo de adopcion.
- Cons: Las fronteras por capas requieren disciplina para evitar crecimiento desordenado.
- Impacts:
  - Repo structure: Se conserva src/ como fuente; se formalizan boundaries entre app, components (terminal/modern/effects), context, lib y content.
  - Testing approach: Se consolidan quality gates de lint/build ahora y se deja evolutivo test/e2e para ADRs posteriores.

## Links
- Standards: `docs/standards/_index.md`
- Plan: `docs/plans/2026-02-20-bootstrap-architecture.md`
