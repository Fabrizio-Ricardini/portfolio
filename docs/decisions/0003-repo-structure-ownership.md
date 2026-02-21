# ADR 0003 - Repo Structure & Ownership
**Status:** accepted

## Context
- Monorepo? no
- Source of truth path: src/

## Decision
We will use the following structure and ownership rules:
- Source of truth: src/
- Boundary rules: source_of_truth en src/; wiring en src/app; UI en src/components (terminal/modern/effects/errors); estado en src/context; utilidades y data compartida en src/lib; contenido en src/content.
- Ownership by layer/feature/package: Ownership por capa/superficie funcional: app shell, terminal UI, modern UI, effects, estado y contratos de datos.

## Alternatives Considered
- Alternative structure: Migrar ahora a esquema totalmente por dominio introduce churn sin beneficio inmediato para el objetivo actual.

## Consequences
- Pros/cons: Maxima compatibilidad con el estado actual y onboarding claro; requiere reforzar disciplina de imports con el tiempo.

## Links
- Standard: `docs/standards/40-repo-structure-ownership.md`
