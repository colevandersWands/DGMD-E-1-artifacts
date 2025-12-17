# Tool-Theory Co-evolution in TCER

**Why building measurement infrastructure IS research contribution**

---

## The Core Insight

In physics, you cannot fully separate:
- Engineering particle accelerators (tool building)
- Developing theories about particles (theoretical work)

Similarly in CER, you cannot fully separate:
- Building execution tracers (Embody)
- Developing notional machine theories

**This is not a limitation—it's fundamental to how science works.**

---

## The Physics Parallel

### CERN Large Hadron Collider

| Aspect | CERN LHC | Embody Tracer |
|--------|----------|---------------|
| **Purpose** | Measure subatomic particles | Measure program execution |
| **Theory Dependency** | Requires particle physics theories to know *what* to measure | Requires notional machine theories to know *what* to trace |
| **Tool Enables Theory** | Higgs boson discovery (2012) required LHC | Future studies of JS learning require configurable tracers |
| **Research Classification** | Building LHC = physics research, not "just engineering" | Building Embody = CER research, not "just tool development" |
| **TCER Phase** | Phase 4.A (evidence-based prototypes) | Phase 4.A* (evidence-based prototypes, trading zone) |

### The Co-evolution Pattern

```
Theory → Instrumentation Requirements
   ↓              ↓
Notional      Configuration
Machines  →   Capabilities
   ↑              ↑
Usage Data ← Deployed Tracers
```

Neither can advance without the other. This is **co-evolution**, not sequential application.

**Translational Sprint connection**: Stage 2 (Design Alternatives) involves cyclical refinement where theory and tool evolve together. Dead ends in implementation reveal theoretical gaps, theory development exposes new configuration needs.

---

## Why Infrastructure Counts as Research

### From the TCER Model

**Phase 4.A definition** (Cole et al., 2023, p.5):
> "Design evidence-based prototypes for targeted educational outcomes and contexts. Share ongoing designs and process."

**Key phrase**: "evidence-based prototypes"

Embody is a **prototype** because:
- Not production-ready deployment (that would be Phase 5.A)
- Designed to validate trace-based approaches
- Serves as research instrument for future studies

Embody is **evidence-based** because:
- Every configuration option grounded in notional machine theory
- Design decisions traceable to 30+ research papers
- Systematic theory-to-requirements translation documented

### The Trading Zone Function

Phase 4.A* activities coordinate **radically different** groups:

**Who needs Embody**:
- CER researchers → measure learning processes
- Tool developers → build assessment systems
- Educators → support student debugging
- Language experts → ensure correct instrumentation

**Locally coordinated** (what they agree on):
- `trace(code, config) → detailedTrace` interface
- Configuration should be semantic and granular
- Traces should be accurate

**Not globally coordinated** (what they don't need to agree on):
- Which educational theory to use
- How to interpret trace data
- What pedagogy to apply
- When tracing is appropriate

This is exactly what trading zones enable: **coordination without requiring global alignment**.

---

## Measurement Infrastructure as Contribution Type

### Three Types of Research Contribution

1. **Theoretical** (RT): "Here's a theory about how learning works"
   - Example: Notional machines concept (Sorva)
   - Evaluated by: Methodological rigor, empirical validation

2. **Instrumental** (RD): "Here's a tool that lets us test theories"
   - Example: Embody tracer
   - Evaluated by: Enables research that wasn't feasible before

3. **Applied** (PT/PD): "Here's an intervention that improves learning"
   - Example: Deployed educational tools using Embody
   - Evaluated by: Student outcomes, teacher adoption

**Embody is primarily Type 2**, with elements of Type 1 (creates domain-specific theories) and enables future Type 3 work.

### Historical Precedent

This pattern exists across sciences:

| Field | Infrastructure | Theory Enabled |
|-------|----------------|----------------|
| Physics | Cloud chamber (1911) | Subatomic particle theories |
| Biology | Electron microscope (1931) | Cell structure theories |
| Astronomy | Hubble telescope (1990) | Cosmological theories |
| **CER** | **Embody tracer** | **JavaScript learning theories** |

In each case, **building the instrument was research contribution**, not just "enabling" research.

---

## Why TCER Accommodates This

### The Model's Design

From the paper's discussion of Phase 4 (p.5):
> "Translational research can only succeed if researchers and practitioners engage in active collaborations and when all stakeholders have reliable channels of communication and shared knowledge."

**Active collaboration** means:
- Researchers bring theoretical requirements
- Developers bring technical implementation
- Together: Create infrastructure that serves both

**Reliable channels** means:
- Infrastructure becomes the coordination mechanism
- Different groups can use same tool for different purposes
- Local coordination without forced consensus

### Reflexive Analysis Foundation

From Section 3.3 (p.5):
> "A field without the culture and mechanisms to support self-reflection and re-definition cannot stay relevant."

Embody's development required reflexive analysis:
- What should a "trace event" even be? (Required theory development)
- How granular should configuration be? (Required practitioner input)
- What performance overhead is acceptable? (Required deployment constraints)

These questions **couldn't be answered from literature alone**—building the tool created new knowledge.

---

## Implications for Embody

### Not "Applying" Research, "Doing" Research

**Wrong framing**: "We applied notional machine theories to build a tracer"
- Implies theories were complete
- Implies tool building was implementation, not research

**Correct framing**: "We developed domain-specific theories while building measurement infrastructure"
- Acknowledges co-evolution
- Recognizes tool building as knowledge creation
- Accurately represents Phase 1.B + 4.A* simultaneous contribution

### Evidence of Research Contribution

**Phase 1.B (Domain-Specific Theories)**:
- Created 12 JavaScript notional machines (2 validated, 10 extrapolated)
- Developed trace event taxonomy
- Specified variable lifecycle model
- **This is new knowledge**, not just application

**Phase 4.A* (Evidence-Based Prototypes)**:
- Implemented configurable tracer
- Validated trace-based approaches are feasible
- Created reusable infrastructure
- **This enables future research**

Both are research contributions. Both belong in thesis/publications.

---

## The Broader Pattern

### Generalizable to Other Infrastructure

This tool-theory co-evolution pattern applies whenever:

1. **Measurement is non-trivial**
   - Can't just "count clicks" or "measure time"
   - Need theoretical framework to define *what matters*

2. **Instrumentation requires domain knowledge**
   - Can't outsource to generic tool
   - Must understand both CS and education

3. **Infrastructure enables new research**
   - Wasn't feasible before
   - Multiple research groups can benefit

**Other CER examples** (potential):
- Type error message analyzers (requires type theory + pedagogy)
- Collaboration pattern tracers (requires CSCW theory + CS education)
- Code review classifiers (requires software engineering + learning science)

Each of these would be **Phase 4.A* research contributions**, not "just tools."

---

## Connection to Other Sections

- [Infrastructure Dimension](../3-infrastructure-dimension/) - How this fits into TCER without adding new layer
- [Methodology Contribution](../4-methodology-contribution/) - Replicable pattern for similar work
- [Documentation Implications](../5-documentation-implications/) - How to frame this in theory-to-requirements

---

## Key Takeaway

**Building Embody is not a detour from research—it IS the research.**

The tool-theory co-evolution pattern means:
- Theoretical contributions emerged from building process
- Infrastructure enables future empirical work
- Both theory and tool are research deliverables

This is what **translational computing education research** looks like when you take the TCER model seriously.

---

**See diagram**: [measurement-enables-theory.mermaid](./diagrams/measurement-enables-theory.mermaid) for visual representation of bidirectional flow.
