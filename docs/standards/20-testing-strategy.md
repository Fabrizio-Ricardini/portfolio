<!--
Template-ID: standards/20-testing-strategy.md
Template-Version: 1
Source: .opencode/templates/standards/20-testing-strategy.md
Copied-On: 2026-02-20
-->

# Testing Strategy & Quality Gates

## Objective
Define what we test, where we test it, and what "done" means.

## Pyramid (Adaptable)
- **Unit tests:** fast, deterministic, pure logic
- **Integration tests:** IO boundaries (DB, HTTP, adapters)
- **E2E tests:** critical user flows only

## Quality Gates (Default)
- Lint/format (if configured)
- Tests required for changed logic
- Build required for deployable artifacts

## Verification Matrix (Filled per Repo)
List the real commands here once known:
- Lint: `<cmd>`
- Tests: `<cmd>`
- Build: `<cmd>`
- E2E: `<cmd>` (if applicable)

> If unknown, keep placeholders and record the decision in ADR 0002.

## Guidelines
- Prefer behavior tests over implementation details.
- Avoid flaky E2E unless absolutely necessary.
- Keep tests readable; name by behavior.

## CI Expectations (Optional)
- Which commands run on PR vs main vs release
