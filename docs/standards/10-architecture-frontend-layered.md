<!--
Template-ID: standards/10-architecture-frontend-layered.md
Template-Version: 1
Source: .opencode/templates/standards/10-architecture-frontend-layered.md
Copied-On: 2026-02-20
-->

# Architecture Standard: Frontend Layered (MVP Default)

## When to Use
- MVPs and small/medium frontends needing order without a heavy framework
- Teams who want conventions but minimal ceremony

## Suggested Layers
- `components/` - presentational UI
- `features/` - feature-level orchestration (smart components)
- `hooks/` - reusable logic and side effects
- `services/` - API clients and IO
- `state/` - state management (if used)
- `lib/` - utilities (strict ownership; no dumping ground)

## Boundary Rules
- Presentational components: no IO and minimal state.
- Side effects live in hooks/features/services.
- `lib/` only for truly shared, owned utilities.

## Testing Mapping
- Components: UI tests (behavior-focused)
- Features: integration tests (UI + state)
- Services: contract tests (mock server)

## Tradeoffs
- Less strict than Feature-Sliced: requires discipline to avoid drift into "misc folders".
