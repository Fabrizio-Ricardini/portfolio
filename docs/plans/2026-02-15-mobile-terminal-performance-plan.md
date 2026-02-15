# Mobile Terminal + Modern Performance Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix the "terminal not visible on real mobile" issue and improve modern mode animation performance on real mobile devices.

**Architecture:** Use progressive enhancement. Keep full effects on capable devices and add safe fallback/lite modes for mobile or low-capability devices. Split work into three streams: (1) terminal render stability, (2) modern mode performance, and (3) verification on real devices.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, Framer Motion, R3F (three.js), postprocessing.

---

## 1) Core findings with code evidence

- **Hypothesis A (high probability): WebGL/3D failure in terminal home**
  - `src/components/terminal/TerminalContent.tsx:54` always mounts `Neofetch` in Home.
  - `src/components/terminal/Neofetch.tsx:100` mounts `EffectScene`.
  - `src/components/effects/effect-scene.tsx:64` creates `Canvas` + postprocessing.
  - `src/components/effects/ascii-effect.tsx:293` uses a complex shader/effect pipeline.
- **Hypothesis B (high): mobile viewport + fixed overlays stack is fragile**
  - `src/components/terminal/TerminalLayout.tsx:17` uses `h-screen w-screen overflow-hidden`.
  - `src/app/layout.tsx:63` also sets `h-screen w-screen` on `<body>`.
  - `src/components/effects/NoiseBackground.tsx:80` and `src/components/effects/NoiseBackground.tsx:87` add fixed full-screen overlays.
  - `src/app/globals.css:133` adds fixed scanlines full-screen layer.
- **Hypothesis C (medium): mode hydration/transition can leave hidden state**
  - `src/context/ViewModeContext.tsx:27` reads localStorage without try/catch.
  - `src/components/ModeSwitcher.tsx:40` and `src/components/ModeSwitcher.tsx:44` rely on timer + CRT class transitions.
- **Modern mode performance bottlenecks (high)**
  - Large animated blurred background: `src/components/effects/AuroraBackground.tsx:20`, `src/components/effects/AuroraBackground.tsx:36`, `src/components/effects/AuroraBackground.tsx:52`.
  - Multiple `backdrop-blur` surfaces: `src/components/modern/ModernLayout.tsx:36`, `src/components/modern/ModernLayout.tsx:72`, `src/components/modern/ModernContent.tsx:263`, `src/components/modern/ModernContent.tsx:343`, `src/components/modern/ModernContent.tsx:362`, `src/components/modern/ModernContent.tsx:419`, `src/components/modern/ModernContent.tsx:488`.
  - High Framer Motion node count across sections/cards: `src/components/modern/ModernContent.tsx`.

---

## 2) Action plan by phase

### Phase 0 - Reproduce and collect evidence (30-45 min)

**Objective:** Confirm root cause on physical devices before implementing fixes.

1. Reproduce on at least 2 real devices (iOS Safari + Android Chrome minimum).
2. Attach remote debugging:
   - iOS: Safari Web Inspector.
   - Android: Chrome Remote Devices.
3. Capture:
   - Console errors (WebGL/shader/storage/hydration).
   - Performance profile during initial load.
   - Computed heights for `html`, `body`, root containers, and overlay layers.
4. Save a short per-device checklist with findings.

**Exit criteria:** main hypothesis validated with concrete evidence.

### Phase 1 - Terminal mobile stability (highest priority)

**Objective:** Ensure terminal always renders on real mobile devices.

#### Task 1.1: Add Neofetch 3D/WebGL fallback

**Files**
- Modify: `src/components/terminal/Neofetch.tsx`
- Create: `src/lib/webgl.ts`
- Optional create: `src/components/terminal/NeofetchFallback.tsx`

**Steps**
1. Add safe WebGL support detection (`try/catch`, context validation).
2. For unsupported/low-capability mobile, render static fallback (ASCII/text/image), not `Canvas`.
3. Ensure effect failure cannot break terminal root rendering.

#### Task 1.2: Add error boundary around terminal effects

**Files**
- Create: `src/components/errors/TerminalEffectsBoundary.tsx`
- Modify: `src/components/terminal/TerminalLayout.tsx` and/or `src/components/terminal/Neofetch.tsx`

**Steps**
1. Wrap heavy visual effects in boundary.
2. Show lightweight fallback UI when errors occur.
3. Log errors in development for diagnostics.

#### Task 1.3: Normalize mobile viewport strategy

**Files**
- Modify: `src/app/layout.tsx`
- Modify: `src/components/terminal/TerminalLayout.tsx`
- Modify: `src/components/ModeSwitcher.tsx`
- Modify: `src/app/globals.css`

**Steps**
1. Replace chained `h-screen/w-screen` locks with mobile-safe sizing (`min-h-dvh`, `w-full`, controlled overflow).
2. Avoid relying on ambiguous `h-full` chains.
3. Keep content layer explicit above effects with predictable z-index.

#### Task 1.4: Harden mode hydration and transition fail-safe

**Files**
- Modify: `src/context/ViewModeContext.tsx`
- Modify: `src/components/ModeSwitcher.tsx`

**Steps**
1. Guard localStorage access with `try/catch`.
2. Add transition watchdog reset (force `phase: idle` if timer flow fails).
3. Keep first-load state deterministic for mobile.

**Phase 1 exit criteria:** terminal is visible and interactive on real mobile first load (no blank state with only toggle button).

### Phase 2 - Modern mode mobile performance

**Objective:** Improve smoothness of scrolling and transitions on low/mid mobile devices.

#### Task 2.1: Add mobile-lite visual mode

**Files**
- Modify: `src/components/effects/AuroraBackground.tsx`
- Modify: `src/components/modern/ModernLayout.tsx`
- Modify: `src/components/modern/ModernContent.tsx`
- Modify: `src/components/modern/ProjectModal.tsx`

**Steps**
1. Reduce/disable blur on mobile (`backdrop-blur-none md:backdrop-blur-md`).
2. Simplify aurora on mobile (fewer blobs, lower blur, slower or static option).
3. Reduce expensive shadow + transform transitions for touch.

#### Task 2.2: Lower Framer Motion workload

**Files**
- Modify: `src/components/modern/ModernContent.tsx`

**Steps**
1. Keep section-level animations; reduce per-item animations where impact is low.
2. Shorten durations and delays on mobile.
3. Replace `transition-all` usage with scoped transitions where possible.

#### Task 2.3: Add adaptive motion behavior

**Files**
- Modify: `src/components/modern/ModernContent.tsx`
- Modify: `src/components/ModeSwitcher.tsx`
- Modify: `src/components/effects/AuroraBackground.tsx`

**Steps**
1. Use `useReducedMotion` for runtime animation simplification.
2. Add reduced-animation path specifically for mobile.
3. Preserve visual identity while prioritizing stable frame pacing.

**Phase 2 exit criteria:** no major scroll jank or delayed interactions on target mobile devices.

### Phase 3 - Required verification (per AGENTS)

1. Run linter:
   - `npm run lint`
2. Run production build:
   - `npm run build`
3. Manual real-device checks:
   - Initial load in terminal mode.
   - Toggle terminal <-> modern.
   - Long scroll in modern mode.
   - Open/close project modal.
4. Store a compact test matrix (device, browser, result, notes).

**Phase 3 exit criteria:** lint/build pass and no critical regressions on real mobile.

---

## 3) Recommended implementation order

1. Complete Phase 1 (terminal stability first).
2. Run quick smoke verification.
3. Complete Phase 2 (modern performance optimizations).
4. Run final full verification suite.

---

## 4) Risks and mitigations

- **Risk:** visual downgrade after performance optimizations.
  - **Mitigation:** apply lite changes only on mobile; keep desktop full visuals.
- **Risk:** viewport fixes introduce desktop layout regressions.
  - **Mitigation:** atomic changes + cross-device checks after each task.
- **Risk:** WebGL fallback still inconsistent across browsers.
  - **Mitigation:** capability detection + error boundary + deterministic fallback.

---

## 5) Success metrics

- Terminal visible on first mobile load in target test matrix.
- Noticeably smoother modern mode interactions on low/mid devices.
- No critical console errors related to WebGL/hydration.
- `npm run lint` and `npm run build` both pass.
