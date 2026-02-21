# Bootstrap Governance Adoption Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Incorporar governance (AGENTS + standards + ADRs + opencode instructions) sin romper la estructura actual del repo ni forzar refactor arquitectural.

**Architecture:** Adoptar Frontend-Layered como governance activa porque coincide con la estructura existente en `src/`. Aplicar cambios solo en artefactos de governance (`docs/*`, `AGENTS.md`, `opencode.json`) y archivar templates no usados en `.opencode/_unused` en modo archive.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Playwright (config liviana), OpenCode templates.

---

### Task 1: Crear manifest de bootstrap

**Files:**
- Create: `docs/plans/bootstrap-manifest.yml`
- Read: `.opencode/templates/manifests/bootstrap-manifest.frontend-layered.yml`
- Read: `README.md`
- Read: `package.json`
- Read: `.github/workflows/ci.yml`

**Step 1: Baseline del manifest**
- Tomar como base el preset `frontend-layered`.
- Resultado esperado: estructura YAML completa con secciones obligatorias.

**Step 2: Completar campos deterministicos**
- Cargar `project_profile.*`, `verification.*`, `mcp.context7.*`, `adr_inputs.*`, `standards.keep`, `agents.include_skills.*`.
- Resultado esperado: sin `TBD` salvo comandos explicitamente `not-configured`.

**Step 3: Verificar contrato minimo**
Run: `rg "project_profile:|verification:|mcp:|adr_inputs:|standards:|agents:" docs/plans/bootstrap-manifest.yml`
Expected: aparecen todas las secciones requeridas.

---

### Task 2: Publicar standards activos

**Files:**
- Create: `docs/standards/_index.md`
- Create: `docs/standards/00-core-quality.md`
- Create: `docs/standards/05-decision-making-rubric.md`
- Create: `docs/standards/10-architecture-frontend-layered.md`
- Create: `docs/standards/20-testing-strategy.md`
- Create: `docs/standards/30-error-handling-logging.md`
- Create: `docs/standards/40-repo-structure-ownership.md`
- Create: `docs/standards/90-change-management.md`
- Create: `docs/standards/_meta.md`

**Step 1: Crear `docs/standards/`**
- Crear directorio si no existe.
- Resultado esperado: carpeta lista para publicar.

**Step 2: Copiar templates exactos + header de versionado**
- Copiar cuerpo exacto de cada template `standards.keep`.
- Prepend header obligatorio (Template-ID, Template-Version, Source, Copied-On).
- Resultado esperado: standards publicados sin cambios libres de redaccion.

**Step 3: Generar indice de standards activos**
- `docs/standards/_index.md` debe listar solo activos y arquitectura `Frontend-Layered`.
- Resultado esperado: indice coherente con `standards.keep`.

---

### Task 3: Generar ADRs deterministicos

**Files:**
- Create: `docs/decisions/0001-architecture.md`
- Create: `docs/decisions/0002-testing-quality-gates.md`
- Create: `docs/decisions/0003-repo-structure-ownership.md`
- Create: `docs/decisions/_index.md`
- Create: `docs/decisions/_meta.md`
- Read: `.opencode/templates/decisions/0001-architecture.md`
- Read: `.opencode/templates/decisions/0002-testing-quality-gates.md`
- Read: `.opencode/templates/decisions/0003-repo-structure-ownership.md`
- Read: `.opencode/templates/decisions/_index.md`

**Step 1: Interpolar placeholders por mapping deterministico**
- Renderizar cada ADR desde `adr_inputs.*` y `project_profile.*`.
- Resultado esperado: documentos sin placeholders pendientes.

**Step 2: Verificacion de placeholders**
Run: `rg "{{|}}" docs/decisions/0001-architecture.md docs/decisions/0002-testing-quality-gates.md docs/decisions/0003-repo-structure-ownership.md`
Expected: sin coincidencias.

---

### Task 4: Compilar AGENTS operativo

**Files:**
- Modify/Create: `AGENTS.md`
- Read: `.opencode/templates/agents/AGENTS.template.md`

**Step 1: Renderizar AGENTS desde template**
- Usar mapping deterministico del comando `/apply-bootstrap`.
- Resultado esperado: AGENTS alineado con manifest y standards activos.

**Step 2: Verificar placeholders y policy Context7**
Run: `rg "{{|}}" AGENTS.md`
Expected: sin coincidencias.
Run: `rg "Context7|Verification Matrix|Recommended Skills" AGENTS.md`
Expected: secciones presentes.

---

### Task 5: Crear/actualizar `opencode.json`

**Files:**
- Create/Modify: `opencode.json`

**Step 1: Escribir `opencode.instructions` exactamente desde el manifest**
- Incluir explicitamente index de standards, MUST standards, arquitectura activa, index de decisiones y ADR 0001/0002/0003.
- Resultado esperado: lista completa y ordenada.

**Step 2: Verificar rutas criticas en instrucciones**
Run: `rg "docs/standards/_index.md|docs/standards/00-core-quality.md|docs/standards/20-testing-strategy.md|docs/standards/40-repo-structure-ownership.md|docs/standards/10-architecture-frontend-layered.md|docs/decisions/_index.md|docs/decisions/0001-architecture.md|docs/decisions/0002-testing-quality-gates.md|docs/decisions/0003-repo-structure-ownership.md" opencode.json`
Expected: todas las rutas requeridas presentes.

---

### Task 6: Prune por allowlist (archive, no delete)

**Files:**
- Move to archive: `.opencode/templates/standards/10-architecture-clean-hex.md`
- Move to archive: `.opencode/templates/standards/10-architecture-mvc.md`
- Move to archive: `.opencode/templates/standards/10-architecture-frontend-feature-sliced.md`
- Move to archive: `.opencode/templates/standards/10-architecture-viper.md`
- Move stale published standards (if any): `docs/standards/*.md` -> `docs/standards/_archived/`

**Step 1: Archivar templates no activos**
- Mover todo template de standards fuera de `standards.keep` a `.opencode/_unused/templates/standards/`.
- Resultado esperado: no se elimina nada, solo archive.

**Step 2: Alinear standards publicados**
- Archivar en `docs/standards/_archived/` cualquier standard publicado fuera del set activo.
- Resultado esperado: `docs/standards/` contiene solo activos + meta/index.

---

### Task 7: Verificacion final de governance y calidad

**Files:**
- Verify: `docs/plans/bootstrap-manifest.yml`
- Verify: `docs/standards/_index.md`
- Verify: `docs/decisions/0001-architecture.md`
- Verify: `docs/decisions/0002-testing-quality-gates.md`
- Verify: `docs/decisions/0003-repo-structure-ownership.md`
- Verify: `AGENTS.md`
- Verify: `opencode.json`

**Step 1: Checks de coherencia governance**
Run: `rg "{{|}}" AGENTS.md docs/decisions/0001-architecture.md docs/decisions/0002-testing-quality-gates.md docs/decisions/0003-repo-structure-ownership.md`
Expected: sin placeholders.
Run: `rg "Frontend-Layered" docs/plans/bootstrap-manifest.yml docs/decisions/0001-architecture.md docs/standards/_index.md AGENTS.md`
Expected: arquitectura consistente en todos los artefactos.

**Step 2: Quality gates reales del repo**
Run: `npm run lint`
Expected: success.
Run: `npm run build`
Expected: success.

**Step 3: Registrar comandos no configurados**
- Mantener `test_cmd` y `e2e_cmd` como `not-configured`.
- Resultado esperado: ADR 0002 deja trazable el gap y el plan incremental.

---

### Task 8: Cierre y handoff

**Step 1: Resumen de cambios**
- Entregar lista de archivos creados/modificados/archivados y rationale.

**Step 2: Handoff operativo**
- Ejecutar `/apply-bootstrap` en Build mode para materializar `docs/plans/bootstrap-manifest.yml`.
