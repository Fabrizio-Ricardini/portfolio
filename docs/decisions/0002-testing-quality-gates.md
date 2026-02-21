# ADR 0002 - Testing Strategy & Quality Gates
**Status:** accepted

## Context
- Delivery risk: medium
- Quality needs: Mantener estabilidad de entrega mientras se incorpora governance en forma incremental.
- Constraints: Lint/build estan activos como gates; todavia no hay suite unitaria/integracion/e2e definida como gate obligatorio.
- Tooling state: Playwright esta instalado y configurado (`@playwright/test`, `playwright.config.ts`), con smoke suite inicial en `e2e/smoke/` y ejecucion CI no bloqueante.

## Decision
We will adopt the following testing strategy:
- Unit: not-configured (adopcion pendiente)
- Integration: not-configured (adopcion pendiente)
- E2E: Playwright disponible para adopcion incremental, sin gate obligatorio por ahora

Quality gates:
- Lint: npm run lint
- Tests: not-configured
- Build: npm run build
- E2E: npm run test:e2e:smoke (no gate obligatorio de CI en esta etapa)

Graduation rule:
- E2E pasara a gate obligatorio cuando la smoke suite mantenga estabilidad sostenida en CI (modo terminal/gui, modal de proyectos, navegacion principal) durante una ventana acordada.

## Alternatives Considered
- More E2E now: Hacer E2E obligatorio sin escenarios estables aumenta costo y fragilidad temprana.
- Less testing: Reduciria demasiado la confianza para cambios de arquitectura/governance.

## Consequences
- Tradeoffs: Calidad base protegida con lint/build hoy, con smoke E2E como red temprana de regresion y camino explicito para endurecer gates luego.

## Links
- Standard: `docs/standards/20-testing-strategy.md`
