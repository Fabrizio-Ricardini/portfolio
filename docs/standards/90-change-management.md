<!--
Template-ID: standards/90-change-management.md
Template-Version: 1
Source: .opencode/templates/standards/90-change-management.md
Copied-On: 2026-02-20
-->

# Change Management (Prevent Drift)

## Objective
Avoid architectural drift and uncontrolled migrations.

## ADR Policy
Create or update an ADR when:
- Architecture changes
- Testing strategy/quality gates change
- Repo structure/ownership rules change
- Tooling changes affect build/CI

For major changes, supersede previous ADRs instead of editing accepted records in place.

## Refactor Rules
- Keep refactors atomic and isolated.
- Plan migrations in steps; avoid "big bang" rewrites.
- Prefer incremental improvements aligned with standards.

## Deprecation
- Mark deprecated modules explicitly.
- Provide a migration path.
- Remove deprecated items after a defined window.

## Documentation Updates
- Update `docs/standards/_index.md` if active standards change.
- Update ADRs when decisions change.

## Reconfiguration Workflow
- Plan: generate new `docs/plans/bootstrap-manifest.yml` + reconfigure plan.
- Approval: review standards allowlist, ADR supersede chain, and instruction updates.
- Build: run `/apply-bootstrap` to regenerate standards/ADRs/AGENTS/opencode and archive obsolete standards.
