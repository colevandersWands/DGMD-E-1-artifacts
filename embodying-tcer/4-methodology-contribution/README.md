# Methodology Contribution

**Theory-to-requirements as translational research methodology**

---

## The Core Insight

Embody's `theory-to-requirements/` directory doesn't just document design decisions—it **demonstrates a replicable methodology** for translational infrastructure projects.

This methodology itself is a **research contribution**.

---

## The Theory-to-Requirements Process

### The 5-Phase Pipeline (From Embody)

```
Phase 0: Literature Review
   ↓
Phase 1: Taxonomies (Concepts → Categories)
   ↓
Phase 2: Use Cases (Abstract → Concrete)
   ↓
Phase 3: Threshold Concepts (Troublesome Knowledge)
   ↓
Phase 4: Notional Machines (Domain-Specific Theories)
   ↓
Phase 5: Configuration Schemas (Requirements)
```

### How This Maps to TCER

| Embody Phase | TCER Phase | Activity | Output |
|--------------|-----------|----------|--------|
| **Phase 0** | Phase 3.A | Literature synthesis | 30+ papers analyzed, evidence hierarchy |
| **Phase 1** | Phase 3.B* | Practitioner translation | Tool developer taxonomy guides |
| **Phase 2** | Phase 3.B* | Use case development | 15 concrete scenarios mapping theory → practice |
| **Phase 3** | Phase 1.A* | Borrowed theories | Threshold concepts from educational theory |
| **Phase 4** | Phase 1.B | Domain-specific theories | 12 JavaScript notional machines |
| **Phase 5** | Phase 4.A* | Evidence-based prototype | Configuration API, instrumentation design |

**Key observation**: This isn't strictly linear—it's **iterative translation** between TCER phases.

**Translational Sprint mapping**: This 5-phase pipeline IS Stage 2 (Design Alternatives) work. Multiple passes through the pipeline represent cyclical returns when design alternatives reach dead ends or reveal new requirements.

---

## The Translational Pattern

### Forward Translation: Theory → Requirements

**Step 1: Comprehensive Synthesis (TCER 3.A)**

```
Input:  Distributed research literature
Method: Systematic review with evidence hierarchy
Output: Synthesized understanding of domain
```

**Embody example**:
- Sorva (2013) on notional machines
- Guo (2013) on visualization tools
- Ben-Ari (2001) on mental models
→ **Comprehensive understanding of program execution theories**

**Step 2: Practitioner Translation (TCER 3.B*)**

```
Input:  Academic research papers
Method: Extract actionable patterns for non-researchers
Output: Tool developer guides, concrete examples
```

**Embody example**:
- Abstract theory: "Notional machines aid program comprehension"
- Practitioner translation: "Trace these 7 event types to support debugging tools"
→ **Usable guidance for developers**

**Step 3: Domain-Specific Theory Development (TCER 1.B)**

```
Input:  General theories + domain knowledge
Method: Systematic extrapolation with validation checks
Output: New domain-specific theoretical frameworks
```

**Embody example**:
- General theory: Notional machines concept (Sorva)
- Domain specifics: JavaScript closure semantics, async execution
→ **12 JavaScript-specific notional machines** (2 validated, 10 extrapolated)

**Step 4: Operational Requirements (TCER 4.A*)**

```
Input:  Domain-specific theories
Method: Theory-to-implementation translation
Output: Configuration schemas, instrumentation specs
```

**Embody example**:
- Theory: "Scope capture is critical for closure understanding"
- Requirement: `config.traceClosureScopeCapture = true/false`
→ **Granular configuration API**

### Reverse Translation: Implementation → Theory Refinement

**Future Step 5: Usage Feedback (TCER 4.B)**

```
Input:  Tool deployment data
Method: Pattern analysis, developer reports
Output: Infrastructure refinement priorities
```

**Embody future**:
- Which config options are actually used?
- Which trace events are most diagnostic?
→ **Config API v2 informed by real usage**

**Future Step 6: Theory Validation (TCER 2.B → 1.B)**

```
Input:  Student data from deployed tools
Method: Empirical validation of theoretical assumptions
Output: Refined or validated theories
```

**Embody future**:
- Do students with closure traces learn faster?
- Which notional machine predictions hold empirically?
→ **Validated JavaScript notional machines**

---

## Why This Is Methodological Contribution

### 1. Systematic, Not Ad-Hoc

**Problem with typical tool development**:
- "Let's build something and see if it works"
- Design decisions not traceable to research
- Can't tell why specific features exist

**Theory-to-requirements approach**:
- Every design decision has research justification
- Explicit chains: Theory → Requirement → Implementation
- Replicable process for others

### 2. Transdisciplinary Coordination

**Bridges multiple expertise types**:

| Expertise | Contributes | Phase |
|-----------|-------------|-------|
| **CER researchers** | Theoretical requirements | 1.A, 1.B |
| **Educational psychologists** | Learning theory foundations | 1.A |
| **Programming language experts** | Semantic accuracy requirements | 4.A |
| **Tool developers** | Feasibility constraints | 3.B, 4.A |
| **Educators** | Classroom applicability | 3.B |

**Theory-to-requirements provides coordination mechanism** for all five groups to contribute systematically.

### 3. Explicit Translation Layers

**Documents the translation work**:

- Phase 0 → Phase 1: How we moved from papers to taxonomies
- Phase 1 → Phase 2: How we moved from categories to concrete scenarios
- Phase 3 → Phase 4: How we applied threshold concepts to notional machines
- Phase 4 → Phase 5: How we moved from theories to config schemas

**Each translation step is visible and critiqueable**.

### 4. Enables Replication

**Other projects can use this pattern**:

Want to build:
- Type error message analyzer? Use theory-to-requirements process
- Collaboration pattern tracer? Use theory-to-requirements process
- Code review classifier? Use theory-to-requirements process

**General template**:
1. Synthesize relevant research (TCER 3.A)
2. Translate for practitioners (TCER 3.B*)
3. Develop domain-specific theories (TCER 1.B)
4. Operationalize as infrastructure (TCER 4.A*)
5. Deploy and gather feedback (TCER 4.B)
6. Refine theories (TCER 1.B, cycle)

---

## Comparison to Other Methodologies

### Design-Based Research (DBR)

**DBR** (Brown 1992, Collins 1992):
- Iterative design-test cycles
- Theory emerges from practice
- Strong practitioner involvement

**Similarities to theory-to-requirements**:
- Iterative refinement
- Theory-practice integration
- Design is research contribution

**Differences**:
- DBR focuses on interventions (curricula, pedagogies)
- Theory-to-requirements focuses on infrastructure
- DBR less prescriptive about theory → design translation

### Evidence-Based Practice (EBP)

**EBP** (medical model):
- Best available evidence
- Clinical expertise
- Patient values

**Similarities**:
- Research grounds decisions
- Practitioner knowledge valued
- Systematic process

**Differences**:
- EBP applies existing evidence
- Theory-to-requirements creates new domain theories
- EBP for interventions, not infrastructure

### Theory-to-Requirements Is Unique

**Distinctive features**:

1. **Explicit infrastructure focus**: Not interventions or pedagogy
2. **Transdisciplinary by design**: Coordinates 5+ stakeholder types
3. **Theory development integrated**: Not just applying theories, creating new ones
4. **Bidirectional translation**: Forward (theory → tool) and reverse (use → theory)
5. **Fully documented process**: Every translation step is visible

---

## Contribution to CER Field

### Methodological Gap Addressed

**Problem**: CER lacks systematic methodologies for infrastructure research

**Evidence from TCER paper** (Cole et al. 2023, p.5):
> "Phase 4 activities are vital as they are directly beneficial to both CE practitioners and CER researchers, thus motivating active collaboration."

But **how to conduct Phase 4.A* work systematically**? Paper doesn't specify.

**Theory-to-requirements fills this gap**:
- Replicable process for infrastructure projects
- Explicit coordination mechanisms for trading zones
- Integration of theory development (1.B) and prototyping (4.A*)

### Enables Other Infrastructure Projects

**Potential applications**:

| Domain | Infrastructure Need | Theory-to-Requirements Phases |
|--------|---------------------|-------------------------------|
| **Type systems** | Error message analyzer | Lit review → Type theory → Error taxonomies → Analyzer spec |
| **Collaboration** | Pair programming tracer | CSCW research → Collab patterns → Interaction taxonomy → Tracer spec |
| **Code quality** | Style violation explainer | SE research → Quality theories → Violation categories → Explainer spec |
| **Debugging** | Causality tracer | Mental models → Debug strategies → Causality taxonomy → Tracer spec |

Each could use the **same 5-phase process** adapted to their domain.

### Documentation as Research Artifact

**Traditional research artifacts**:
- Papers (describe what was learned)
- Code (implement the system)
- Data (empirical evidence)

**Theory-to-requirements adds**:
- **Process documentation** (how theory became system)
- **Translation layers** (visible reasoning chains)
- **Methodological template** (replicable by others)

**This is a research contribution** beyond the tool itself.

---

## Implications for Embody Thesis

### What to Claim

**Primary contribution**: "A systematic methodology for translational infrastructure research in CER"

**Evidence**:
- Complete theory-to-requirements documentation
- Demonstrates replicable process
- Maps explicitly to TCER phases
- Can be applied to other infrastructure projects

**Secondary contributions**:
- 12 JavaScript notional machines (Phase 1.B)
- Embody tracer prototype (Phase 4.A*)
- Practitioner taxonomy guides (Phase 3.B*)

### How to Frame

**Not**: "I built a tool that applies notional machine theories"
- Undersells the contribution
- Makes it sound like implementation, not research

**Instead**: "I developed a translational methodology that integrates theory development and infrastructure building"
- Recognizes methodological contribution
- Shows tool as demonstration of methodology
- Positions work as replicable pattern

### Where It Fits in TCER

**Multi-phase research contribution**:

| Contribution Type | TCER Phase | Deliverable |
|-------------------|-----------|-------------|
| **Methodological** | 3.A, 3.B* | Theory-to-requirements process documentation |
| **Theoretical** | 1.B | Domain-specific notional machines |
| **Infrastructural** | 4.A* | Embody tracer prototype |
| **Synthesizing** | 3.A | Comprehensive literature review |

**All four are research contributions**. The methodology ties them together.

---

## Replication Guide for Others

### Adapting Theory-to-Requirements

**Step 1: Identify Your Domain**
- What phenomena need measurement?
- What theories exist (general and domain-specific)?
- What infrastructure is missing?

**Step 2: Follow the 5 Phases**

```
0. Literature Review (TCER 3.A)
   → Synthesize existing research
   → Identify gaps in theory or tools

1. Taxonomies (TCER 3.B*)
   → Extract key concepts from literature
   → Translate for practitioner audience
   → Create categorical frameworks

2. Use Cases (TCER 3.B*)
   → Generate concrete scenarios
   → Map abstract concepts to practical needs
   → Validate with potential users

3. Borrowed Theories (TCER 1.A*)
   → Identify relevant theories from other fields
   → Assess applicability to your domain
   → Document adaptations needed

4. Domain-Specific Theories (TCER 1.B)
   → Extend general theories to your domain
   → Systematically extrapolate with validation checks
   → Document confidence levels (validated vs. extrapolated)

5. Requirements (TCER 4.A*)
   → Translate theories into operational specs
   → Create configuration/instrumentation designs
   → Build evidence-based prototype
```

**Step 3: Document Everything**
- Make translation layers visible
- Trace every design decision to theory
- Enable critique and replication

**Step 4: Deploy and Iterate**
- Gather usage feedback (TCER 4.B)
- Refine infrastructure and theories
- Complete bidirectional translation cycle

### Expected Outputs

**For your project**:
- Comprehensive process documentation (like `theory-to-requirements/`)
- Domain-specific theoretical contributions (like 12 notional machines)
- Working infrastructure prototype (like Embody)
- Methodological template others can adapt

**For CER field**:
- Replication increases confidence in methodology
- Variations reveal what's generalizable vs. domain-specific
- Accumulation of infrastructure research examples

---

## Key Takeaways

### 1. Methodology Is Contribution

**Theory-to-requirements process** is not just documentation—it's a replicable methodology for translational infrastructure research.

### 2. Maps to TCER Naturally

**The 5 phases** span TCER Phases 1.A, 1.B, 3.A, 3.B*, and 4.A*, demonstrating the translational spectrum.

### 3. Enables Replication

**Other infrastructure projects** can adapt this process to their domains, accelerating CER's infrastructure research.

### 4. Justifies Effort

**Extensive documentation** is not "extra work"—it's the methodological contribution that makes this research, not just tool building.

---

## Connection to Other Sections

- [Tool-Theory Co-evolution](../2-tool-theory-coevolution/) - Why the methodology integrates theory development
- [Documentation Implications](../5-documentation-implications/) - How to present methodology in publications
- [Embody in TCER](../1-embody-in-tcer/) - Where each methodological phase fits in TCER

---

**Bottom line**: Theory-to-requirements isn't background work for the "real" research—it IS the research contribution that Embody demonstrates.
