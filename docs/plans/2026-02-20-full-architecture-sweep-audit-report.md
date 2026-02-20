# Full Architecture Sweep Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Capture a full architecture and governance audit for this repository, plus an incremental patch strategy, without applying code changes yet.

**Architecture:** The project remains Frontend-Layered in the short term, but with clear drift points that should be corrected incrementally. The plan prioritizes governance consistency first, then architecture hardening, then testing/verification upgrades. No big-bang rewrite is proposed.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Three.js/R3F, Playwright (installed), OpenCode Governance Kit.

---

## 1) Audit Report

### System Map

- App shell is minimal and clear:
  - `src/app/layout.tsx`
  - `src/app/page.tsx`
  - `src/app/providers.tsx`
- Global state flow:
  - View mode state in `src/context/ViewModeContext.tsx`
  - Active terminal view state in `src/context/ActiveFileContext.tsx`
  - Providers wired in `src/app/providers.tsx`
- Data/content flow:
  - Shared source loaded from `src/content/*` into `src/lib/data.ts`
  - Both UIs consume `portfolioData` / `fileContents` from `src/lib/data.ts`
- UI split:
  - Terminal UI: `src/components/terminal/*`
  - Modern UI: `src/components/modern/*`
  - Effects: `src/components/effects/*`
  - Error boundaries: `src/components/errors/*`
- Effects path (heavy runtime chain):
  - `src/components/terminal/Neofetch.tsx`
  - `src/components/effects/effect-scene.tsx`
  - `src/components/effects/ascii-effect.tsx`

### Current Strengths

- Dual-mode product architecture is explicit and easy to reason about.
- Shared content contract is real (not only documented): `src/lib/data.ts` + `src/content/*`.
- Error and fallback safety exists for graphics-heavy parts:
  - `src/components/errors/TerminalRenderBoundary.tsx`
  - `src/components/errors/TerminalEffectsBoundary.tsx`
- Baseline CI quality gates are active for lint/build in `.github/workflows/ci.yml`.

### Current Risks and Drift

- Frontend-Layer boundaries are drifting:
  - UI components include orchestration/business-like logic (not only presentation), especially:
    - `src/components/terminal/InteractiveTerminal.tsx`
    - `src/components/terminal/FileView.tsx`
    - `src/components/modern/ModernContent.tsx`
- `src/lib/data.ts` is growing toward a god module (types + content + tree + projects + modern blocks).
- `src/components/modern/ModernContent.tsx` is monolithic (535 lines) and hard to evolve safely.
- Navigation intent is duplicated across places:
  - `src/components/CommandPalette.tsx`
  - `src/components/modern/ModernLayout.tsx`
- Client boundary is broad (`"use client"` in many files), increasing runtime payload and re-render surface.

### Frontend-Layered Compliance

| Area | Status | Assessment |
|---|---|---|
| Layering and boundaries | drifting | Structure exists, but logic leakage into view components is growing. |
| State management | aligned | Context pattern is reasonable for current scope, but rerender scope needs tightening. |
| UI composition split | drifting | Terminal/modern separation is good, but duplication and component size reduce scalability. |

---

## 2) Governance Fit Report

### AGENTS Quality

- Strong baseline:
  - Non-negotiables are clear.
  - Verification matrix exists.
  - MCP policy is explicit.
  - Skills policy is intentionally minimal.
- Key drift:
  - Repository tracks `AGENTS.MD`, while many governance docs/scripts reference `AGENTS.md`.
  - This casing mismatch can break deterministic checks and cross-platform workflows.

### Standards and ADR Alignment

- Standards set is coherent and aligned to Frontend-Layered.
- ADR 0001/0002/0003 are active but still marked `proposed`, which is inconsistent with real usage.
- Testing posture mismatch:
  - AGENTS says tests/e2e `not-configured`.
  - Repo contains Playwright dependency and config:
    - `package.json`
    - `playwright.config.ts`
  - This should be clarified as "tooling present, gate not required yet".

### Kit and Determinism Health

- Reconfigure command exists and is conceptually correct:
  - `.opencode/commands/reconfigure-bootstrap.md`
- Consistency checker currently fails due to header parsing assumptions:
  - `.opencode/scripts/check-bootstrap-consistency.py`
  - Published standards contain HTML comment header, while checker expects plain `Template-ID:` at line 1.
- Export seed plan path is stale in exporter:
  - `.opencode/scripts/export-kit.py` references `docs/plans/2026-02-17-bootstrap-architecture.md`.

### Skills Policy Review

- Current recommended set is valid for governance operations:
  - `project-triage`
  - `systematic-debugging`
  - `verification-before-completion`
  - `requesting-code-review`
  - `git-commit`
  - `writing-plans`
  - `next-best-practices`
- Suggested improvement for this repo profile:
  - Add `vercel-react-best-practices` for runtime/rendering discipline.
  - Optional: add UI review skill if design-heavy iterations continue.

---

## 3) Optimization Recommendations

### P0 (incorrect, inconsistent, or risky)

1. Fix governance consistency checker to parse current standards header format.
   - Target: `.opencode/scripts/check-bootstrap-consistency.py`
2. Normalize AGENTS canonical filename and references.
   - Targets: `AGENTS.MD` (rename target), docs/scripts referencing `AGENTS.md`.
3. Reconcile ADR lifecycle state with actual governance usage.
   - Targets:
     - `docs/decisions/0001-architecture.md`
     - `docs/decisions/0002-testing-quality-gates.md`
     - `docs/decisions/0003-repo-structure-ownership.md`

### P1 (high-value improvements)

1. Decompose modern monolith component.
   - Target: `src/components/modern/ModernContent.tsx`
   - Create sectional components under `src/components/modern/sections/*`.
2. Extract terminal command engine from UI component.
   - Target: `src/components/terminal/InteractiveTerminal.tsx`
   - Create dedicated logic module (`src/hooks/*` or `src/features/terminal-shell/*`).
3. Split data source into owned modules while preserving shared-source contract.
   - Target: `src/lib/data.ts` -> `src/lib/data/*` + stable index export.
4. Reduce broad context rerender impact.
   - Targets:
     - `src/context/ViewModeContext.tsx`
     - `src/context/ActiveFileContext.tsx`
     - High-frequency consumers in `src/components/*`.
5. Define minimal but real tests.
   - Targets:
     - `package.json` scripts
     - `e2e/*` smoke scenarios

### P2 (nice-to-have refinements)

1. Evaluate migration away from `raw-loader` usage.
   - Targets: `next.config.ts`, `package.json`
2. Consolidate repeated media query logic in reusable hooks.
   - Targets:
     - `src/components/ModeSwitcher.tsx`
     - `src/components/terminal/TerminalLayout.tsx`
     - `src/components/effects/AuroraBackground.tsx`
     - `src/components/modern/ModernContent.tsx`
3. Add governance consistency check to CI pipeline.
   - Target: `.github/workflows/ci.yml`

---

## 4) Patch Plan (No Code Yet)

### Phase A - Governance Integrity First

1. Standardize AGENTS filename and all references.
2. Patch checker parsing for standards header compatibility.
3. Re-run consistency checks until green.

Files to update in this phase:

- `AGENTS.MD` (canonicalization step)
- `docs/plans/bootstrap-manifest.yml`
- `.opencode/scripts/check-bootstrap-consistency.py`
- Any docs/scripts that reference the non-canonical AGENTS path

### Phase B - ADR and Documentation Reality Sync

1. Update ADR status and wording to reflect real active governance.
2. Clarify testing/e2e posture in AGENTS + README + ADR 0002.

Files to update in this phase:

- `docs/decisions/0001-architecture.md`
- `docs/decisions/0002-testing-quality-gates.md`
- `docs/decisions/0003-repo-structure-ownership.md`
- `docs/decisions/_index.md`
- `AGENTS.md`
- `README.md`

### Phase C - Incremental Architecture Hardening

1. Introduce feature islands without big-bang folder migration.
2. Refactor large components into modular composition.
3. Modularize shared data sources while keeping existing imports stable during transition.

Likely targets:

- `src/components/modern/ModernContent.tsx`
- `src/components/terminal/InteractiveTerminal.tsx`
- `src/lib/data.ts`
- New folders under `src/features/*`, `src/hooks/*`, `src/lib/data/*`

### Phase D - Verification Matrix Upgrade

1. Add realistic smoke e2e commands and scripts.
2. Stage e2e in CI as non-blocking first, then blocking when stable.

Likely targets:

- `package.json`
- `playwright.config.ts`
- `.github/workflows/ci.yml`
- New `e2e/*` files

---

## Big Change Workflow Proposal (Plan -> Approval -> Build)

### If architecture changes from Frontend-Layered to Feature-Sliced

1. **Plan**
   - Run reconfiguration plan flow.
   - Update manifest fields:
     - `project_profile.architecture.primary`
     - `standards.keep`
     - `opencode.instructions`
     - `agents.include_skills`
2. **Approval**
   - Approve ADR supersede chain and allowlist diffs.
   - Confirm what gets archived vs regenerated.
3. **Build**
   - Apply bootstrap materialization.
   - Recompile AGENTS and regenerate active standards/ADRs.
   - Run consistency checks + lint + build.

### Determinism Gaps to Close

- Auto-unarchive architecture standards when switching architecture family.
- Hard rule for ADR supersede chain generation.
- Canonical filename casing validation for AGENTS.
- Single-source sync check across manifest, ADRs, AGENTS, README verification matrix.

### Should AGENTS be recompiled automatically?

Yes. Trigger recompilation when any of these change:

- `project_profile.architecture.primary`
- `verification.*`
- `standards.keep`
- `agents.include_skills`
- `mcp.context7.*`

Recommended workflow:

1. `/reconfigure-bootstrap` (plan)
2. Explicit human approval
3. `/apply-bootstrap` (build)
4. `python .opencode/scripts/check-bootstrap-consistency.py`
5. `npm run lint`
6. `npm run build`

---

## Final Verification Checklist (after patch execution)

- `python .opencode/scripts/check-bootstrap-consistency.py` passes.
- `npm run lint` passes.
- `npm run build` passes.
- AGENTS canonical path is consistent in docs/scripts.
- `docs/standards/_index.md`, ADRs, `AGENTS.md`, and `opencode.json` all agree on architecture and verification matrix.
- If e2e baseline is introduced, smoke specs execute reliably in CI profile.
