# AGENTS.md - Operational Protocol

## 1) Non-Negotiables
1. **Safety First:** No destructive commands or irreversible actions without explicit approval (e.g., `rm -rf`, `git reset --hard`, forced pushes).
2. **No Secrets:** Never expose `.env` / tokens / credentials in logs, commits, or chat messages.
3. **Don't Break the Build:** The default branch must remain deployable.
4. **Production Approval:** Never push/deploy to production (or production-like branches) without explicit final user approval.

## 2) Project Profile
- **Type:** frontend
- **Primary Stack:** Next.js 16 + React 19 + TypeScript + Tailwind CSS v4
- **Architecture:** Frontend-Layered
- **Repo Structure (source of truth):** src/
- **Key Constraints:** Incremental governance adoption without breaking current structure or forcing architecture refactors.

## 3) Read Before Coding (MANDATORY)
Agents must read:
- `docs/standards/_index.md`
- `docs/decisions/_index.md`

> If a task affects architecture/testing/structure/tooling decisions, update or add an ADR (Decision Record).

## 4) Active Standards (Installed Set)
The following standards are active for this repository:
- `docs/standards/00-core-quality.md`
- `docs/standards/05-decision-making-rubric.md`
- `docs/standards/10-architecture-frontend-layered.md`
- `docs/standards/20-testing-strategy.md`
- `docs/standards/30-error-handling-logging.md`
- `docs/standards/40-repo-structure-ownership.md`
- `docs/standards/90-change-management.md`

## 5) Decision Records (ADRs)
Active ADRs:
- `docs/decisions/0001-architecture.md`
- `docs/decisions/0002-testing-quality-gates.md`
- `docs/decisions/0003-repo-structure-ownership.md`

## 6) Core Workflow
### Phase A: Understanding
1. Read `README.md`, standards index, and ADRs.
2. Clarify requirements; propose alternatives with tradeoffs when relevant.
3. Inspect existing patterns; match the repo's conventions.

### Phase B: Implementation
1. Make small, testable changes.
2. Prefer minimal solutions (DRY/YAGNI/KISS).
3. Keep boundaries aligned with the chosen architecture standard.

### Phase C: Verification
1. Run verification matrix commands.
2. Ensure no regressions (tests/build).
3. Update docs/ADRs when needed.

## 7) Verification Matrix (Repository Commands)
- **Lint:** npm run lint
- **Tests:** not-configured
- **Build:** npm run build
- **E2E (if applicable):** not-configured

> If commands are unknown, use `not-configured` and record the decision in ADR 0002.

## 8) Git Protocol & Commits
- Conventional Commits: `<type>(<scope>): <description>`
- Atomic commits; do not mix refactors with features.
- Before `git push`, ask for explicit approval.
- Never force-push shared branches.

## 9) MCP Policy (Context7)
- **Enabled:** true
- **Mode:** auto
- **Auto triggers:** framework_or_library_api_question, version_upgrade_or_migration, integration_error_with_external_dependency, uncertain_stack_syntax_or_behavior

Policy:
- Use Context7 automatically when a trigger matches.
- Do not require the user to explicitly ask for "use context7".
- Skip Context7 for purely local repo edits that do not depend on external stack docs.

## 10) Skills Policy (Tool-First)
Prefer specialized skills when applicable. Keep the "recommended" list minimal.

**Recommended Skills (minimal set):**
- `project-triage`
- `systematic-debugging`
- `verification-before-completion`
- `requesting-code-review`
- `git-commit`
- `writing-plans`
- `next-best-practices`

> Discover/load additional skills only when the task requires it.
