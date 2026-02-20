<!--
Template-ID: standards/05-decision-making-rubric.md
Template-Version: 1
Source: .opencode/templates/standards/05-decision-making-rubric.md
Copied-On: 2026-02-20
-->

# Decision-Making Rubric (Architecture & Tooling)

## Objective
Provide a consistent way to choose architecture patterns and tooling. Prevent decisions driven by novelty or preference alone.

## Inputs (Collect First)
- Project type: API / Frontend / CLI / Library / Monorepo
- Expected scale: number of screens/features/modules, team size
- Domain complexity: simple CRUD vs complex rules
- External integrations: DBs, queues, APIs, payment, auth
- Constraints: deadline, performance, security, portability, DX

## Rubric (Weighted Criteria)
Rate options (0-5) and weight them by priorities:
- Maintainability
- Speed to deliver
- Testability
- Performance
- Risk (unknowns, immature tech)
- Operational fit (logging, monitoring, deploy)
- Team familiarity / onboarding cost

## Recommendation Discipline
For any significant decision:
1. **Recommended option** (A): why it fits the rubric
2. **Alternative** (B): why it's not chosen (tradeoffs)
3. **Consequences:** what changes in structure/testing/docs
4. **Decision Record:** capture the result as an ADR if it affects architecture/testing/repo structure/tooling.

## Red Flags
- "We chose this because it's trendy."
- "We chose this without constraints or a rubric."
- "We introduced a layer without a real boundary."

## ADR Trigger Rules
Create or update an ADR when:
- Architecture changes (MVC <-> Clean-Hex <-> Feature-Sliced <-> VIPER)
- Testing strategy or quality gates change
- Repo boundaries/ownership rules change
- Tooling impacts CI/build/test workflows significantly
