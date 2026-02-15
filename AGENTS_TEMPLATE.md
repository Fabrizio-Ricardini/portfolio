# AGENTS.md - Operational Protocol & Technical Roadmap

This file defines the technical roadmap, operational rules, and quality standards for AI agents working within this repository. It serves as the primary source of truth for agent behavior and project architecture.

## 1. Core Principles

1.  **Safety First:** Never execute destructive commands (`rm -rf`, `git reset --hard`) or expose secrets (`.env`) without explicit user confirmation and impact analysis.
2.  **Continuous Verification:** Assume code might fail. Always run linters and build processes before marking a task as complete.
3.  **Don't Break the Build:** The main branch (`main` or `master`) must always be deployable.
4.  **Production Approval:** **CRITICAL RULE:** Never push to the production branch or deploy without explicit final approval from the user.

## 2. Technology Stack (Template)

*Adapt this section based on the specific project context.*

*   **Core:** [Next.js 16 / React / Node / Python]
*   **Styling:** [Tailwind CSS v4 / CSS Modules / Sass]
*   **State Management:** [Context API / Zustand / Redux]
*   **Testing:** [Playwright / Jest / Vitest]
*   **Package Manager:** [npm / pnpm / yarn]

## 3. Agent Workflow

### Phase A: Understanding
1.  Read `README.md` and project structure.
2.  If the task is ambiguous, **ask clarifying questions before acting**.
3.  Search existing code to maintain consistency in style and patterns.

### Phase B: Implementation
1.  **Atomicity:** Make small, testable changes.
2.  **Dry Run:** If the operation is complex, explain the plan before writing code.
3.  **Error Handling:** Implement `try/catch` blocks or Error Boundaries for new features.

### Phase C: Verification
1.  Run the project's linter/formatter.
2.  Verify no build errors exist (`npm run build` or equivalent).
3.  If tests are touched or added, run them to ensure no regressions.

## 4. Git Protocol & Commits

### Standard: Conventional Commits
Strictly adhere to the format: `<type>(<scope>): <description>`

*   `feat`: New feature.
*   `fix`: Bug fix.
*   `docs`: Documentation changes.
*   `style`: Formatting, semi-colons (no logic changes).
*   `refactor`: Code refactoring.
*   `test`: Adding or correcting tests.
*   `chore`: Maintenance tasks, build tools.

### Git Rules
1.  **Atomic Commits:** One logical purpose per commit. Do not mix refactors with new features.
2.  **Clear Messages:** Use the imperative mood ("add" not "added").
3.  **Branching:**
    *   Develop on new branches (`feat/feature-name`) for complex tasks.
    *   Direct commit to `main` is only allowed for trivial tasks or if explicitly requested.
4.  **Pushing to Remote:**
    *   **STOP:** Before running `git push`, ask: "Do you want me to push these changes to remote?".
    *   Never use `--force` on shared branches.

## 5. Testing Standards (Playwright/E2E)

*If applicable to the project:*

*   `headless: true` (Always).
*   `screenshot: 'off'`, `video: 'off'`, `trace: 'off'` (To keep the repo lightweight).
*   Do not generate heavy binary artifacts during local runs.

## 6. Available Agent Skills

This agent has access to the following specialized skills. Use them when the task matches the description.

| Skill Name | Description |
| :--- | :--- |
| **writing-skills** | Use when creating new skills, editing existing skills, or verifying skills work before deployment. |
| **writing-plans** | Use when you have a spec or requirements for a multi-step task, before touching code. |
| **web-tailwind-ui** | Design or fix UI using semantic HTML and Tailwind CSS. |
| **web-express-route** | Create or modify full-stack feature in Node/Express (Route + Controller + View). |
| **verification-before-completion** | **Mandatory:** Use when claiming work is complete, fixed, or passing. Requires running verification commands and confirming output. |
| **vercel-react-best-practices** | React and Next.js performance optimization guidelines from Vercel Engineering. |
| **using-superpowers** | Use when starting any conversation - establishes how to find and use skills. |
| **using-git-worktrees** | Use when starting feature work that needs isolation or before executing implementation plans. |
| **ui-ux-pro-max** | UI/UX design intelligence. 50 styles, 21 palettes, font pairings, charts, stacks. Comprehensive design system knowledge. |
| **test-driven-development** | Use when implementing any feature or bugfix, before writing implementation code. |
| **tailwind-design-system** | Build scalable design systems with Tailwind CSS v4, tokens, and libraries. |
| **systematic-debugging** | Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes. |
| **subagent-driven-development** | Use when executing implementation plans with independent tasks in the current session. |
| **requesting-code-review** | Use when completing tasks, implementing major features, or before merging. |
| **receiving-code-review** | Use when receiving code review feedback, before implementing suggestions. |
| **python-tkinter-gui** | Build or modify non-blocking desktop GUI (Tkinter/CustomTkinter). |
| **python-script-logic** | Backend logic, data processing, or automation scripts in Python. |
| **project-triage** | Use when the request is ambiguous, large, or requires analysis before coding. |
| **next-best-practices** | Next.js best practices - file conventions, RSC boundaries, data patterns, async APIs, metadata, etc. |
| **interface-design** | Design for dashboards, admin panels, apps, tools (not marketing sites). |
| **implementation** | Use for generic code changes, small fixes, or refactors that don't have a specific skill. |
| **git-commit** | Execute git commit with conventional commit message analysis, intelligent staging, and message generation. |
| **frontend-design** | Create distinctive, production-grade frontend interfaces with high design quality. |
| **finishing-a-development-branch** | Use when implementation is complete to decide integration strategy (merge, PR, cleanup). |
| **executing-plans** | Use when you have a written implementation plan to execute in a separate session. |
| **dispatching-parallel-agents** | Use when facing 2+ independent tasks that can be worked on without shared state. |
| **crafting-effective-readmes** | Use when writing or improving README files with templates matched to audience. |
| **changelog-generator** | Automatically creates user-facing changelogs from git commits. |
| **brainstorming** | **Mandatory:** Use before any creative work - explores user intent, requirements, and design. |

## 7. Documentation

*   Keep `README.md` updated with new commands or environment variables.
*   If complex logic is added, add comments explaining *why* (not *what*) in the code.
*   Update this file (`AGENTS.md`) if the rules of engagement change.
