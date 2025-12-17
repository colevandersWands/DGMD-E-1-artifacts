# Documentation Implications

**How to apply TCER framing to theory-to-requirements**

---

## Purpose of This Section

This is the **actionable guide** for the next step: systematically updating `/theory-to-requirements` with TCER framing.

Everything learned in `/embodying-tcer` gets applied here.

---

## High-Level Strategy

### Current State

`/theory-to-requirements` documents the design process but doesn't explicitly frame it as:
- Translational research (spanning multiple TCER phases)
- Methodological contribution (replicable pattern)
- Trading zone coordination (multiple stakeholder types)
- Tool-theory co-evolution (infrastructure IS research)

### Target State

Update documentation to:
1. **Position Embody correctly** in TCER phases (1.B, 3.A, 3.B*, 4.A*)
2. **Claim research contributions** explicitly (not just "background" or "implementation")
3. **Show methodological pattern** that others can replicate
4. **Connect to broader CER** via TCER framework

### Scope of Changes

**Major rewrites**:
- Root README (`theory-to-requirements/README.md`)
- Notional machines README (`4-notional-machines/README.md`)
- Taxonomies README (`1-taxonomies/README.md`)

**Minor updates**:
- Add TCER phase labels to section headers
- Update terminology (avoid "background", "preparation")
- Add cross-references to `/embodying-tcer`

**New content**:
- Intro section on translational research
- Methodology section explaining theory-to-requirements process
- Trading zones explanation

---

## File-by-File Update Plan

### 1. Root README (`theory-to-requirements/README.md`)

**Current structure** (~100 lines):
- Overview of 5 phases
- List of deliverables per phase
- How to navigate

**Add before existing content**:

```markdown
## Translational Research Framing

This directory documents **translational computing education research** that spans multiple phases of the TCER model (Cole, Malaise, & Signer, 2023):

- **Phase 1.B** (Domain-Specific Theories): JavaScript notional machines
- **Phase 3.A** (Researcher-Facing Synthesis): Literature reviews
- **Phase 3.B*** (Practitioner-Facing Guidelines): Tool developer taxonomies
- **Phase 4.A*** (Evidence-Based Prototypes): Embody tracer infrastructure

This multi-phase presence is expected for translational work—see [/embodying-tcer](../../embodying-tcer/) for complete analysis.

### Research Contributions

This directory contains **three types of research contribution**:

1. **Theoretical** (Phase 1.B): 12 JavaScript notional machines
2. **Synthesizing** (Phases 3.A/B): Literature reviews and practitioner guides
3. **Methodological** (Spans 1-4): Theory-to-requirements process as replicable pattern

The Embody tracer (Phase 4.A*) is documented elsewhere but emerges from this process.
```

**Update existing Phase descriptions**:

```markdown
### Phase 0: Literature Review (TCER Phase 3.A)

**Research Activity**: Researcher-facing synthesis

Comprehensive literature review establishing the evidence base. This is **not background reading** for tool development—it's **research synthesis** contributing to the State of the Art body of knowledge.

**Outputs**:
- 30+ paper bibliography with evidence hierarchy
- Cross-paper analysis and synthesis
- Gap identification for domain-specific theory development

**See**: [TCER Phase 3.A explanation](../../embodying-tcer/0-tcer-model-foundations/tcer-complete-model.md#phase-3-research-synthesis)
```

```markdown
### Phase 4: Notional Machines (TCER Phase 1.B)

**Research Activity**: Domain-specific theory development

Development of 12 JavaScript-specific notional machines. This is **theory creation**, not theory application—a Phase 1.B research contribution to Theoretical CER body of knowledge.

**Key insight**: Building the tracer (Phase 4.A*) required creating these theories. This is tool-theory co-evolution—see [Tool-Theory Co-evolution](../../embodying-tcer/2-tool-theory-coevolution/).

**Outputs**:
- 12 notional machines (2 validated from literature, 10 systematically extrapolated)
- Confidence levels documented
- Cross-references to supporting literature

**See**: [Phase 1.B Contribution](../../embodying-tcer/1-embody-in-tcer/README.md#phase-1b-domain-specific-theories)
```

### 2. Notional Machines README (`4-notional-machines/README.md`)

**Current structure**:
- Lists 12 notional machines
- Validation status (2 validated, 10 extrapolated)
- Methodology for extrapolation

**Add at top**:

```markdown
# JavaScript Notional Machines

**TCER Classification**: Phase 1.B (Domain-Specific Theories)
**Contribution Type**: Theoretical CER body of knowledge
**Research vs. Practice**: Research Theories (RT) position

---

## Research Contribution

These 12 notional machines are **new theoretical contributions**, not applications of existing theory. While the notional machine concept exists (Sorva, 2013), JavaScript-specific instances required systematic development.

This work is **Phase 1.B (Domain-Specific Theories)** in the TCER model—creating theories specific to computing education domains rather than borrowing general learning theories.

### Validation Status

| Status | Count | Approach |
|--------|-------|----------|
| **Validated** | 2 | Direct evidence in literature (Sorva 2013, Guo 2013) |
| **Extrapolated** | 10 | Systematic extension using established principles |

**Why extrapolation counts as research**: Creating domain-specific theories requires applying general principles to specific language features. This is theory development work, documented with explicit confidence levels.

See [Tool-Theory Co-evolution](../../../embodying-tcer/2-tool-theory-coevolution/) for why this theory development was necessary for building the tracer.
```

**For each notional machine**, add TCER framing:

```markdown
### 1. Scope Chain Notional Machine

**Status**: ⚠️ Extrapolated
**Theoretical Basis**: Sorva (2013) notional machines + ECMAScript scope semantics
**Why This Matters**: Students struggle with closure behavior—this NM predicts which scope concepts are troublesome

**Key Concepts** (unchanged)...
**Common Misconceptions** (unchanged)...

**Trace Requirements for Tools** (NEW):
- `enter_scope`: When execution enters new lexical scope
- `exit_scope`: When execution exits scope
- `scope_chain_lookup`: When variable resolution traverses chain
- `closure_capture`: When function captures outer scope

**Research Justification**: Scope chain understanding is prerequisite for closure comprehension (Sorva, 2013, p.45). Tool developers need these events to diagnose scope-related errors.
```

### 3. Taxonomies README (`1-taxonomies/README.md`)

**Current structure**:
- Categories of trace events
- Tool use cases
- Config-to-pedagogy mappings

**Add at top**:

```markdown
# Tool Developer Taxonomy Guide

**TCER Classification**: Phase 3.B* (Practitioner-Facing Guidelines, Trading Zone)
**Contribution Type**: State of the Art body of knowledge (practitioner-facing)
**Research vs. Practice**: Research Designs (RD) → Practice Theories (PT) span

---

## Trading Zone Function

This taxonomy serves as a **trading zone** between:

- **CER Researchers**: Who need precise trace event definitions
- **Educational Tool Developers**: Who need pragmatic implementation guidance
- **Programming Educators**: Who need mappings to pedagogical goals

**Locally coordinated** (what all three agree on):
- These event categories are semantically meaningful
- Configuration should be granular per category
- Examples clarify abstract concepts

**Not globally coordinated** (what they don't need to agree on):
- Which pedagogy is best
- When to show traces to students
- How to interpret trace data

See [Trading Zones](../../../embodying-tcer/0-tcer-model-foundations/trading-zones.md) for concept explanation.

## Research to Practice Translation

This is **Phase 3.B* work**—translating researcher-facing synthesis (Phase 3.A literature reviews) into practitioner-usable guidance.

**Translation chain**:
```
Academic papers → Literature synthesis (3.A) → Practitioner taxonomies (3.B*) → Tool requirements (4.A*)
```

Each taxonomy entry includes:
- **What**: Abstract concept from research
- **Why**: Educational justification (theory)
- **How**: Trace events that operationalize it (practice)
```

### 4. Literature Review README (`0-literature-review/README.md`)

**Add at top**:

```markdown
# Literature Review

**TCER Classification**: Phase 3.A (Researcher-Facing Synthesis)
**Contribution Type**: State of the Art body of knowledge
**Research vs. Practice**: Research Theories (RT) position

---

## Research Synthesis Contribution

This is **not "background reading"** for tool development. It's **systematic synthesis** of CER literature contributing to State of the Art body of knowledge.

### Evidence Hierarchy

We categorize papers by evidence strength:

| Level | Type | Count | Examples |
|-------|------|-------|----------|
| **High** | RCTs, large-N studies | 5 | Guo (2013), Sorva (2013) |
| **Medium** | Qualitative, small-N empirical | 15 | Ben-Ari (2001), ... |
| **Low** | Position papers, reviews | 10 | ... |

This hierarchy guides how strongly we rely on each source for theory development (Phase 1.B) and requirement specification (Phase 4.A*).

### Synthesis Approach

**Method**: Systematic review with thematic analysis

1. **Search strategy**: ACM DL, Google Scholar, snowball from key papers
2. **Inclusion criteria**: Relevant to program execution understanding, JavaScript or transferable concepts
3. **Analysis**: Extract key concepts, common findings, gaps
4. **Synthesis**: Identify patterns across papers, resolve conflicts

**This is Phase 3.A methodology**—not ad-hoc reading, but systematic research synthesis.
```

### 5. Use Cases (`2-use-cases/`)

**Minor updates**:

```markdown
# Concrete Use Cases

**TCER Classification**: Phase 3.B* (Practitioner-Facing Guidelines)

These 15 scenarios translate abstract taxonomies into concrete tool development guidance...
```

### 6. Threshold Concepts (`3-threshold-concepts/`)

**Minor updates**:

```markdown
# Threshold Concepts in JavaScript

**TCER Classification**: Phase 1.A* (General/Borrowed Theories, Trading Zone)

We adapt threshold concept theory (Meyer & Land, 2003) from general education to JavaScript-specific troublesome knowledge...
```

### 7. Configuration Schemas (`5-configuration-schemas/`)

**If this directory exists**, add:

```markdown
# Configuration Schemas

**TCER Classification**: Phase 4.A* (Evidence-Based Prototypes)

These schemas operationalize theories (Phase 1.B) into implementation requirements. Every config option traces back to educational theory or practitioner need.

**Theory-to-config examples**:

| Theory | Config Option | Justification |
|--------|---------------|---------------|
| Scope chain NM | `traceScope: true/false` | Sorva (2013): scope visualization aids comprehension |
| Closure capture | `traceClosureCapture: true/false` | Students struggle with closure (Guo, 2013) |
| Async execution | `traceAsync: 'full'|'minimal'|'none'` | Event loop understanding is threshold concept |

See [Methodology](../../../embodying-tcer/4-methodology-contribution/) for theory-to-requirements process.
```

---

## New Content to Add

### New File: `theory-to-requirements/METHODOLOGY.md`

**Purpose**: Explain the theory-to-requirements process as replicable methodology

**Content**:

```markdown
# Theory-to-Requirements Methodology

This document explains the **theory-to-requirements process** used to develop Embody's infrastructure. This methodology is **itself a research contribution**—a replicable pattern for translational infrastructure projects in CER.

## The Process

### 5-Phase Translation Pipeline

[Full content from 4-methodology-contribution/README.md, adapted for this audience]

## TCER Mapping

[Table showing how each phase maps to TCER phases]

## Replication Guide

[Step-by-step instructions for others to use this methodology]

## Why This Matters

This systematic process:
1. Makes design decisions traceable to research
2. Enables critique and validation
3. Provides template for other infrastructure projects
4. Demonstrates how Phase 4.A* work integrates theory development (1.B) and synthesis (3.A/B*)

See [/embodying-tcer](../../embodying-tcer/4-methodology-contribution/) for deeper analysis.
```

### New File: `theory-to-requirements/TCER-OVERVIEW.md`

**Purpose**: Quick reference for how this work fits TCER model

**Content**:

```markdown
# Embody in the TCER Model: Quick Reference

## Multi-Phase Contribution

| TCER Phase | Embody Activity | Deliverables | Location |
|------------|-----------------|--------------|----------|
| **1.B** | Domain-specific theories | 12 JS notional machines | `/4-notional-machines/` |
| **3.A** | Researcher synthesis | Lit review, bibliography | `/0-literature-review/` |
| **3.B*** | Practitioner guidelines | Tool dev taxonomies | `/1-taxonomies/` |
| **4.A*** | Infrastructure prototype | Embody tracer | (codebase) |

## Bodies of Knowledge

- **Theoretical CER**: Notional machines (Phase 1.B)
- **State of the Art**: Lit reviews (3.A), practitioner guides (3.B*)
- **Applied CER**: Tracer infrastructure (4.A*)

## Continuum Position

Embody spans **RT → RD → PT**:
- **RT** (Research Theories): Notional machines validated through systematic literature
- **RD** (Research Designs): Config schemas as research instruments
- **PT** (Practice Theories): Tool developer heuristics

## Trading Zones

Phase 3.B* and 4.A* coordinate:
- CER researchers (measurement needs)
- Tool developers (implementation constraints)
- Educators (pedagogical context)
- Language experts (semantic accuracy)

**Locally**: Agree on trace accuracy, config granularity
**Not globally**: Don't need to agree on pedagogy, theory, or tool design

## For Complete Analysis

See [/embodying-tcer](../../embodying-tcer/) for full TCER framing discussion.
```

---

## Terminology Updates

### Global Search-and-Replace

| Current Term | Replace With | Reason |
|--------------|--------------|--------|
| "background work" | "Phase 3.A synthesis" | Elevates to research status |
| "preparation for building" | "theory development (Phase 1.B)" | Clarifies research contribution |
| "tool implementation" | "infrastructure prototype (Phase 4.A*)" | Uses TCER terminology |
| "based on these theories" | "operationalizing Phase 1.B theories" | Shows explicit connection |

### Avoid These Framings

❌ "This background helps us understand..."
✅ "This Phase 3.A synthesis establishes..."

❌ "We applied notional machine theory to build..."
✅ "We developed domain-specific notional machines (Phase 1.B) while building..."

❌ "The tracer implements these concepts..."
✅ "The Phase 4.A* infrastructure operationalizes these Phase 1.B theories..."

❌ "These examples are for practitioners..."
✅ "These Phase 3.B* guidelines serve as trading zone between researchers and practitioners..."

---

## Cross-Reference Strategy

### Within theory-to-requirements

Add at top of each README:

```markdown
**Part of**: [Theory-to-Requirements](../README.md) translational research
**TCER Phase**: [Phase X.Y](../../embodying-tcer/0-tcer-model-foundations/tcer-complete-model.md#phase-X)
**Methodology**: [Theory-to-Requirements Process](../METHODOLOGY.md)
```

### From theory-to-requirements → embodying-tcer

Key link points:

- Root README → `/embodying-tcer/README.md` (complete TCER analysis)
- Notional machines → `/embodying-tcer/2-tool-theory-coevolution/` (why this is research)
- Taxonomies → `/embodying-tcer/0-tcer-model-foundations/trading-zones.md` (Phase 3.B* function)
- METHODOLOGY.md → `/embodying-tcer/4-methodology-contribution/` (deep dive)

### From embodying-tcer → theory-to-requirements

Evidence pointers:

- Phase 1.B claims → `/theory-to-requirements/4-notional-machines/`
- Phase 3.A claims → `/theory-to-requirements/0-literature-review/`
- Phase 3.B* claims → `/theory-to-requirements/1-taxonomies/`
- Methodology claims → `/theory-to-requirements/METHODOLOGY.md`

---

## Publication Framing

### For Thesis Introduction

**Opening paragraph template**:

> This thesis presents translational computing education research that spans multiple phases of the TCER model (Cole, Malaise, & Signer, 2023). The work makes three primary research contributions: (1) **theoretical** — 12 JavaScript-specific notional machines (Phase 1.B); (2) **synthesizing** — comprehensive literature reviews and practitioner guidelines (Phases 3.A/B*); and (3) **methodological** — a replicable theory-to-requirements process for infrastructure research (spanning Phases 1-4). The Embody execution tracer emerges from this process as a Phase 4.A* infrastructure prototype that enables future empirical work (Phase 2) and scaled interventions (Phase 5).

### For Paper Abstract

**Template**:

> We present a translational approach to educational infrastructure research, demonstrated through the development of Embody, a configurable JavaScript execution tracer. Our theory-to-requirements methodology integrates domain-specific theory development (TCER Phase 1.B) with infrastructure prototyping (Phase 4.A*), producing three research contributions: 12 JavaScript notional machines, systematic practitioner guidelines, and a replicable methodology for similar projects. We situate this work within the Translational Computing Education Research framework, showing how infrastructure research operates in trading zones between researchers, practitioners, and tool developers. This approach addresses a methodological gap in CER for systematically developing measurement infrastructure.

### For Conference Talk

**Key slides**:

1. **Problem**: CER needs measurement infrastructure, but how to develop it systematically?
2. **Approach**: Theory-to-requirements methodology spanning TCER Phases 1.B → 3.A/B* → 4.A*
3. **Contributions**: Theoretical (notional machines) + Methodological (replicable process) + Infrastructural (Embody)
4. **Insight**: Building infrastructure IS research when you integrate theory development
5. **Generalization**: Other projects can adapt this methodology (type systems, collaboration, debugging)

---

## Priority Order for Updates

### High Priority (Do First)

1. **Root README** — Sets framing for entire directory
2. **Notional machines README** — Biggest theoretical contribution
3. **METHODOLOGY.md** (new) — Explains research approach
4. **TCER-OVERVIEW.md** (new) — Quick reference

### Medium Priority

5. **Taxonomies README** — Trading zone function
6. **Literature review README** — Phase 3.A status
7. **Terminology search-and-replace** — Consistency

### Low Priority

8. Individual notional machine files — Add trace requirements
9. Use cases — Minor TCER labels
10. Threshold concepts — Phase 1.A* note

---

## Validation Checks

After updates, verify:

**Consistency**:
- [ ] Every phase labeled correctly
- [ ] Terminology consistent (no "background" language)
- [ ] Cross-references work

**Completeness**:
- [ ] All three contribution types claimed (theoretical, synthesizing, methodological)
- [ ] Trading zone function explained
- [ ] Tool-theory co-evolution acknowledged

**Accessibility**:
- [ ] Quick reference available (TCER-OVERVIEW.md)
- [ ] Deep dive available (/embodying-tcer)
- [ ] Methodology documented (METHODOLOGY.md)

**Accuracy**:
- [ ] TCER phase assignments correct
- [ ] Paper citations accurate (Cole et al. 2023)
- [ ] No overclaiming (e.g., don't claim Phase 2 work that's future)

---

## Expected Impact

**Before updates**:
- Theory-to-requirements looks like "tool design documentation"
- Contributions unclear (is this research or implementation?)
- Methodology implicit (can't be replicated)

**After updates**:
- Clear multi-phase research contribution
- Explicit theoretical, synthesizing, and methodological claims
- Replicable pattern for other infrastructure projects
- Proper positioning in CER field via TCER framework

**Bottom line**: This transforms Embody from "I built a tool" to "I conducted translational research that produced theoretical, methodological, and infrastructural contributions."

---

## Next Steps

1. Create METHODOLOGY.md and TCER-OVERVIEW.md (new files)
2. Update root README with translational framing
3. Update notional machines README with Phase 1.B claims
4. Systematic terminology updates
5. Add cross-references throughout
6. Validation check against criteria above

See [Reflexive Analysis](../6-reflexive-analysis/) for what we learned during this TCER framing process.

---

**This section is the payoff** — everything in `/embodying-tcer` gets applied here to produce research-quality documentation.
