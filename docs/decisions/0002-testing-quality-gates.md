# ADR 0002 - Testing Strategy & Quality Gates
**Status:** proposed

## Context
- Delivery risk: medium
- Quality needs: Mantener estabilidad de entrega mientras se incorpora governance en forma incremental.
- Constraints: Hoy solo hay comandos explicitos de lint/build; test/e2e no estan configurados como gate.

## Decision
We will adopt the following testing strategy:
- Unit: not-configured
- Integration: not-configured
- E2E: not-configured

Quality gates:
- Lint: npm run lint
- Tests: not-configured
- Build: npm run build
- E2E: not-configured

## Alternatives Considered
- More E2E: Agregar E2E intensivo sin base estable de escenarios aumenta costo y fragilidad temprana.
- Less testing: Reduciria demasiado la confianza para cambios de arquitectura/governance.

## Consequences
- Tradeoffs: Adopcion rapida y segura ahora, con huecos de testing documentados y trazables para cierre incremental.

## Links
- Standard: `docs/standards/20-testing-strategy.md`
