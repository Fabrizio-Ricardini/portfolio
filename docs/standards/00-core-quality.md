<!--
Template-ID: standards/00-core-quality.md
Template-Version: 1
Source: .opencode/templates/standards/00-core-quality.md
Copied-On: 2026-02-20
-->

# Core Quality Standard

## Scope
This standard defines universal code quality rules applied across stacks and languages. It is deliberately practical and focuses on decisions that reduce maintenance cost.

## Core Rules
- **SRP / Separation of Concerns:** Each module/class/function has one primary reason to change.
- **DRY (with judgment):** Avoid duplicated business rules. Do not abstract prematurely.
- **YAGNI:** Do not introduce layers/frameworks "just in case".
- **KISS:** Prefer readable, simple solutions over clever abstractions.

## Boundaries & Dependencies (General)
- Define clear boundaries (layers/zones). Pick the matching architecture standard and follow its dependency direction.
- Prefer dependencies flowing toward the most stable core (domain/use-cases) and away from frameworks/IO.

## Practical Guidelines
- Prefer early returns to reduce deep nesting.
- Prefer explicit naming over comments.
- Use named constants instead of "magic numbers" when values matter (business rules, timeouts, limits).
- Keep functions small and cohesive; extract helpers only when it improves clarity.

## Anti-Patterns (Avoid)
- "God" modules: controllers/services/components that do everything.
- "Utils dumping ground": generic helpers with no ownership.
- Hidden global state without boundaries or ownership.
- Abstraction-first design without proven need.

## Definition of Done (Quality)
A change is "done" only if:
- It fits the repo's chosen architecture boundaries,
- It has verification steps (tests/build) executed,
- It doesn't introduce new global complexity,
- It updates docs/ADRs when a decision changes.
