<!--
Template-ID: standards/40-repo-structure-ownership.md
Template-Version: 1
Source: .opencode/templates/standards/40-repo-structure-ownership.md
Copied-On: 2026-02-20
-->

# Repo Structure & Ownership

## Objective
Define where code lives, how it is named, and who owns which boundaries.

## Source of Truth
- Identify the root for production code (e.g., `src/`, `app/`, `packages/*`).
- Prefer a single clear entry point per runtime.

## Naming Conventions
- Names should reflect responsibility (controller/service/repo/feature/entity).
- Avoid ambiguous folders: `misc/`, `stuff/`, `temp/`.

## Ownership Rules
- Each folder should have an implicit owner boundary (layer/feature/package).
- Avoid cross-cutting dependencies that bypass boundaries.

## Anti-Patterns
- A single `utils/` folder accumulating unrelated logic.
- Imports that violate architecture boundaries.

## Refactor Policy
- Refactor in isolated commits (no feature mixing).
- If a move changes boundaries, record it as an ADR or update ADR 0003.

## Governance Ownership Matrix
- `.opencode/rules/*`: low-level behavioral constraints and safety defaults.
- `AGENTS.md`: operational contract for this repository instance.
- `docs/standards/*`: technical governance standards and architecture rules.
- `docs/decisions/*`: decision records and supersede history.
