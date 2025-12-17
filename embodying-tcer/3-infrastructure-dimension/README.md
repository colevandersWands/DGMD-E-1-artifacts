# Infrastructure Dimension in TCER

**How measurement infrastructure fits without needing a separate layer**

---

## The Question We Asked

When first analyzing Embody through the TCER lens, it seemed like **measurement infrastructure** might need its own dimension in the model. After all:

- Embody isn't a learning theory (Phase 1)
- Embody isn't an experiment (Phase 2)
- Embody isn't just synthesis (Phase 3)
- Embody isn't a deployed intervention (Phase 5)

So... where does it fit?

---

## The Answer: Phase 4.A* Trading Zones

**Infrastructure fits perfectly in the existing TCER model** as **Phase 4.A* (Evidence-Based Prototypes)**.

No new layer needed. Here's why.

### Phase 4.A Definition

From Cole et al. (2023, p.5):

> "**4.A*** Evidence-based Prototypes: Design evidence-based prototypes for targeted educational outcomes and contexts. Share ongoing designs and process."

**Key characteristics**:
1. **Evidence-based**: Grounded in research (not ad-hoc)
2. **Prototypes**: Research instruments (not production systems)
3. **Trading zone** (*): Coordinates multiple stakeholder types
4. **Shared process**: Development is transparent, replicable

**Embody matches all four**:
1. Every design decision traceable to 30+ papers
2. Research-grade tool for enabling studies (not commercial deployment)
3. Serves researchers, educators, tool developers, language experts
4. Theory-to-requirements documents the entire process

### Why "Infrastructure" Doesn't Need Its Own Phase

**Infrastructure is a type of prototype**, not a separate category:

| Phase 4.A Type | Example | Purpose |
|----------------|---------|---------|
| **Intervention Prototype** | New curriculum design | Test pedagogical approach |
| **Assessment Prototype** | Novel quiz format | Measure learning outcomes |
| **Infrastructure Prototype** | Execution tracer | Enable measurement capability |

All three are **evidence-based prototypes**. Infrastructure's special property is that it **enables other research** rather than directly intervening, but that doesn't require a separate phase.

---

## The Neutral Infrastructure Principle

### Why Embody Stays Theory-Neutral

**The key design decision**: Embody does **not** encode a specific pedagogy.

**What Embody provides**:
```
trace(code, config) → detailedTrace
```

**What Embody does NOT provide**:
- ❌ "This trace shows good/bad code"
- ❌ "Students should see this level of detail"
- ❌ "This pedagogical approach is best"

**Why neutrality matters for trading zones**:

From [Trading Zones concept](../0-tcer-model-foundations/trading-zones.md):

> "Trading zones [are] 'an arena in which radically different activities could be locally, but not globally, coordinated.'" (Galison 1996, via Cole et al. 2023)

**Locally coordinated** (what diverse users agree on):
- Traces should be accurate
- Configuration should be granular
- Output should be structured

**Not globally coordinated** (what diverse users don't need to agree on):
- Which educational theory to use
- How to interpret trace data
- When tracing is appropriate
- What pedagogy to apply

**Example**: Same Embody infrastructure can serve:

| User Type | Their Theory | How They Use Embody |
|-----------|--------------|---------------------|
| **Constructivist educator** | Discovery learning | Provide traces for students to explore patterns |
| **Direct instruction advocate** | Explicit teaching | Use traces to demonstrate exact execution steps |
| **Cognitive load researcher** | CLT | Measure complexity via trace event counts |
| **Threshold concept researcher** | Troublesome knowledge | Identify where trace patterns shift (liminal moments) |

All four use the **same infrastructure** but for **radically different purposes**. This is only possible because Embody stays neutral.

---

## How Infrastructure Coordinates Stakeholders

### The Four Stakeholder Types

**Phase 4.A* trading zones** bring together:

#### 1. CER Researchers
- **Need from Embody**: Measurement capability for testing theories
- **Contribute to Embody**: Requirements for what to trace (notional machines)
- **Don't need to agree with others on**: Which theories are correct

#### 2. Educational Tool Developers
- **Need from Embody**: Trace data for building assessment/debugging tools
- **Contribute to Embody**: Performance requirements, API usability feedback
- **Don't need to agree with others on**: Commercial viability, UI design

#### 3. Programming Educators
- **Need from Embody**: Support for student learning (via tools that use Embody)
- **Contribute to Embody**: Pedagogical constraints, classroom feasibility
- **Don't need to agree with others on**: Teaching philosophy, curriculum design

#### 4. Language/Runtime Experts
- **Need from Embody**: Correctly instrumented JavaScript semantics
- **Contribute to Embody**: Technical implementation, accuracy validation
- **Don't need to agree with others on**: Educational theory, learning outcomes

### Local Coordination Without Global Alignment

All four groups coordinate on:
- **Interface**: `trace(code, config) → detailedTrace`
- **Accuracy**: Traces must reflect actual execution
- **Configurability**: Different uses require different detail levels

All four groups **maintain their own perspectives** on:
- What education is for
- How people learn
- What outcomes matter
- When tracing helps

**This is exactly what trading zones enable**: Productive collaboration without forced consensus.

---

## Why Phase 4.A*, Not Phase 2 or 5

### Not Phase 2.A (Theory-based Designs)

**Phase 2.A** creates controlled experimental interventions to test specific theories.

**Embody is different**:
- Not testing a single theory
- Not a controlled intervention
- **Enables** experiments rather than being an experiment

**Example Phase 2.A work**: "Curriculum that teaches closures via scope diagrams (testing visualization theory)"

**Embody**: "Infrastructure that provides trace data for ANY theory-testing study"

### Not Phase 5.A (Scaled Interventions)

**Phase 5.A** deploys successful interventions at scale across institutions.

**Embody is different**:
- Prototype stage (not production-ready)
- Serves research purposes (not direct student intervention)
- **Infrastructure** for interventions, not itself an intervention

**Example Phase 5.A work**: "Nationwide deployment of CS curriculum"

**Embody**: "Research infrastructure that future interventions might use"

### Perfectly Phase 4.A*

**Phase 4.A*** is for evidence-based prototypes that:
- Serve as research instruments
- Coordinate diverse stakeholders
- Enable future research or practice
- Are shared openly for replication

**Embody matches exactly**:
- Research-grade tracer (instrument)
- Trading zone for researchers/practitioners/developers/language experts
- Enables Phase 2 experiments and Phase 5 interventions
- Theory-to-requirements documents entire process

---

## The Infrastructure → Research Flow

### Current State (Phases 1, 3, 4.A)

```
Phase 1.B Theories → Phase 4.A Infrastructure
         ↓                      ↓
   Notional Machines    →   Embody Tracer
   Trace Requirements   →   Config API
   Event Taxonomy       →   Instrumentation
```

**Infrastructure operationalizes theories**, making them measurable.

### Future State (Phases 2, 4.B, 5)

```
Phase 4.A Infrastructure → Phase 2.B Experiments
         ↓                          ↓
   Embody provides           Studies test
   measurement capability    learning theories

Phase 4.A Infrastructure → Phase 5.A Interventions
         ↓                          ↓
   Embody enables              Deployed tools use
   trace-based tools           traces for assessment
```

**Infrastructure enables research and practice**, without being either.

### The Feedback Loop (When Deployed)

```
Phase 4.B/5.B Usage Data → Refine Infrastructure (4.A)
         ↓                          ↓
   Tool developers report    Update config options
   Student data reveals  →   Adjust trace detail

Phase 4.B/5.B Usage Data → Refine Theories (1.B)
         ↓                          ↓
   Unexpected patterns       Challenge notional
   Validate/invalidate   →   machine assumptions
```

**Infrastructure mediates the bidirectional translation** between theory and practice.

---

## Comparison to Other Sciences

This "infrastructure as Phase 4 research" pattern exists across fields:

| Field | Infrastructure | TCER Phase | Enables |
|-------|----------------|------------|---------|
| **Physics** | Particle accelerators | 4.A | Phase 2 experiments testing particle theories |
| **Biology** | Gene sequencers | 4.A | Phase 2 studies of genetic mechanisms |
| **Astronomy** | Space telescopes | 4.A | Phase 2 observations testing cosmological theories |
| **Psychology** | fMRI scanners | 4.A | Phase 2 experiments on brain function |
| **CER** | **Execution tracers** | **4.A*** | **Phase 2 studies of programming learning** |

In each case:
- Building the infrastructure required domain expertise (not "just engineering")
- Infrastructure is research contribution (not "enabling" research)
- Fits Phase 4.A (evidence-based prototypes)
- Enables future Phase 2 work

---

## Key Takeaways

### 1. Infrastructure Fits Existing Model

**No need for new TCER layer**—Phase 4.A* trading zones accommodate measurement infrastructure perfectly.

### 2. Neutrality Enables Trading Zones

**Theory-neutral design** allows diverse stakeholders to coordinate locally without global alignment on pedagogy.

### 3. Infrastructure IS Research

**Building Embody is Phase 4.A research contribution**, not preparation for research or application of research.

### 4. Enables Future Phases

**Phase 4.A infrastructure unlocks**:
- Phase 2.B experiments (measure learning with traces)
- Phase 5.A interventions (deploy trace-based tools)
- Phase 4.B feedback (usage refines theories)

---

## Connection to Other Sections

- [Tool-Theory Co-evolution](../2-tool-theory-coevolution/) - Why building tools creates theoretical knowledge
- [Embody in TCER](../1-embody-in-tcer/) - Complete mapping of Embody to all phases
- [Documentation Implications](../5-documentation-implications/) - How to frame infrastructure in thesis/publications

---

## The Resolution

**Initial worry**: "Infrastructure doesn't fit TCER model cleanly"

**Resolution**: "Infrastructure IS Phase 4.A*, and trading zones are designed for exactly this coordination challenge"

**Insight**: The TCER model's strength is that it **already accommodates infrastructure** through the trading zone concept. No modification needed—just deeper understanding of what Phase 4.A* can do.
