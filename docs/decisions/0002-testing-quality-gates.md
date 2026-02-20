# ADR 0002 - Testing Strategy & Quality Gates
**Status:** accepted

## Context
- Delivery risk: medium
- Quality needs: Mantener estabilidad de entrega mientras se incorpora governance en forma incremental.
- Constraints: Lint/build estan activos como gates; todavia no hay suite unitaria/integracion/e2e definida como gate obligatorio.
- Tooling state: Playwright esta instalado y configurado (`@playwright/test`, `playwright.config.ts`) pero no existe una suite E2E minima estable en `e2e/`.

## Decision
We will adopt the following testing strategy:
- Unit: not-configured (adopcion pendiente)
- Integration: not-configured (adopcion pendiente)
- E2E: Playwright disponible para adopcion incremental, sin gate obligatorio por ahora

Quality gates:
- Lint: npm run lint
- Tests: not-configured
- Build: npm run build
- E2E: not-configured (no gate obligatorio de CI en esta etapa)

Graduation rule:
- E2E pasara a gate obligatorio cuando exista una smoke suite estable (modo terminal/gui, modal de proyectos, navegacion principal) y se ejecute consistentemente en CI.

## Alternatives Considered
- More E2E now: Hacer E2E obligatorio sin escenarios estables aumenta costo y fragilidad temprana.
- Less testing: Reduciria demasiado la confianza para cambios de arquitectura/governance.

## Consequences
- Tradeoffs: Calidad base protegida con lint/build hoy, y camino explicito para endurecer gates cuando la suite E2E minima exista.

## Links
- Standard: `docs/standards/20-testing-strategy.md`
