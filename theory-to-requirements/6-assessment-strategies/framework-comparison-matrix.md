# Assessment Framework Comparison Matrix

**Step 4 Deliverable**: Compare how different frameworks address same assessment goals

**Who this serves**:
- **Educators**: Understand complementary vs competing approaches
- **Tool developers**: Design for multi-framework support
- **Researchers**: Study framework integration effectiveness

---

## Introduction

Step 3 integrated 5 assessment frameworks:
1. **Misconceptions** (Qian & Lehman 2017; Sorva et al.)
2. **Notional Machines** (Sorva 2013; Fincher & Jeuring 2020)
3. **Threshold Concepts** (Meyer & Land 2003; Boustedt et al. 2007)
4. **Taxonomies** (SOLO, Block Model, BSI, Abstraction Transition)
5. **QLCs** (Lehtinen et al. 2023)

**Key insight**: These frameworks are **complementary**, not competing. Each provides different lens on same assessment challenges.

---

## Comparison 1: Assessing "Understanding Scope"

### The Assessment Goal
Verify student understands JavaScript scope (lexical scoping, block vs function scope, scope chain, closures)

### Framework Approaches

| Framework | Assessment Approach | Tool Requirements | Strengths | Limitations |
|-----------|---------------------|-------------------|-----------|-------------|
| **Misconception-Driven** | Detect var/let confusion, TDZ errors, closure variable capture mistakes | Variable tracking, scope tracking, pattern detection for common errors | Targets specific known errors, diagnostic precision | May miss correct-but-fragile understanding, doesn't validate complete mental model |
| **Notional Machine** | Verify scope chain mental model through tracing and explanation tasks | Scope visualization, variable resolution path display, closure capture tracking | Builds correct execution model, generalizes beyond examples | Requires student to externalize mental model (difficult), can't assess implicit understanding |
| **Threshold-Aware** | Identify liminal state indicators (inconsistent predictions, partial understanding), scaffold transition | Longitudinal tracking, liminal pattern detection, state-responsive feedback | Supports through difficult transition, avoids premature grading | Subjective threshold identification, unclear crossing criteria |
| **Taxonomy-Aligned** | Progress from isolated scope facts (Unistructural) to integrated scope chain model (Relational) | SOLO level detection, progressive task complexity, ceiling/floor avoidance | Shows learning trajectory, prevents tasks too hard/easy for level | Doesn't pinpoint specific gaps, level boundaries fuzzy |
| **QLCs** | Analyze scope variable naming patterns, detect inappropriate var usage in modern code | Code quality metrics, idiom detection, convention checking | At-scale assessment, implicit evaluation during normal coding | Doesn't directly test comprehension, quality ≠ understanding |

### Synthesis: Multi-Framework Assessment Strategy

**Complementary use**:
1. **Diagnostic** (Misconceptions): Detect if student has var/let confusion → Targeted remediation
2. **Mental model** (NM): Verify scope chain understanding → Explanation tasks
3. **Support** (Threshold): If liminal state detected → Increase scaffolding, delay grading
4. **Progression** (Taxonomy): Ensure student at Relational level before complex closure tasks
5. **Quality** (QLCs): Check for appropriate modern scope usage in projects

**Integration example**:
- Week 3: Misconception detector identifies var scope confusion in 60% of class → Instructor adds scope lecture
- Week 4: NM assessment shows 40% have partial scope chain model (liminal) → Threshold-aware scaffolding
- Week 6: Taxonomy assessment shows class reaching Relational level → Ready for closure integration
- Week 8: QLCs shows improving const/let usage, decreasing var → Quality trajectory positive

**Result**: Robust multi-dimensional understanding, not single-framework blind spots.

---

## Comparison 2: Assessing "Debugging Skill"

### The Assessment Goal
Measure student's ability to systematically debug code (not trial-and-error)

### Framework Approaches

| Framework | Assessment Approach | Tool Requirements | Strengths | Limitations |
|-----------|---------------------|-------------------|-----------|-------------|
| **Misconception-Driven** | Detect whether debugging reveals misconception vs typo, categorize error types | Error pattern analysis, debugging trace recording, misconception catalog matching | Distinguishes conceptual from procedural errors, informs instruction | Can't assess debugging process quality, only error identification |
| **Notional Machine** | Trace student's execution model during debugging (do they use scope chain? call stack?) | Debugging tool usage tracking, NM invocation monitoring, model application detection | Reveals which NMs student applies, shows model-based vs random debugging | Requires tool instrumentation, can't infer from code alone |
| **Threshold-Aware** | Assess debugging sophistication as threshold (random → hypothesis-driven), detect transition | Debugging strategy analysis, hypothesis tracking, breakthrough detection | Recognizes debugging maturity as conceptual shift, not skill accumulation | Threshold not well-researched for debugging specifically |
| **Taxonomy-Aligned** | BSI Strategy dimension: appropriate debugging approach selection | Strategy choice evaluation, efficiency assessment, approach appropriateness | Distinguishes novice (print debugging) from expert (systematic narrowing) | Strategy choice varies by context (prints sometimes appropriate) |
| **QLCs** | N/A - QLCs doesn't directly address debugging | N/A | N/A | Not applicable to process assessment |

### Synthesis

**Best combination**:
- **Misconceptions**: Categorize what student debugs (conceptual vs procedural)
- **NM**: Verify student uses correct model during debugging (not trial-and-error)
- **Threshold**: Recognize debugging sophistication as transformative skill
- **BSI**: Assess strategy appropriateness for bug type

**QLCs limitation**: Process assessment beyond QLCs scope (analyzes product, not process).

---

## Comparison 3: Assessing "Code Quality"

### The Assessment Goal
Evaluate code quality beyond functional correctness (naming, structure, idioms, efficiency)

### Framework Approaches

| Framework | Assessment Approach | Tool Requirements | Strengths | Limitations |
|-----------|---------------------|-------------------|-----------|-------------|
| **Misconception-Driven** | Limited - quality issues may indicate misconceptions (e.g., confusing names suggest unclear understanding) | Naming analysis as misconception indicator | Connects quality to comprehension | Most quality issues aren't misconceptions |
| **Notional Machine** | Limited - NM application quality (uses correct model but awkwardly) | NM usage pattern detection | Distinguishes understanding from expression | Doesn't assess style/conventions |
| **Threshold-Aware** | Quality improves post-threshold (novice code vs expert code patterns) | Longitudinal quality tracking | Contextualizes quality relative to learning state | Doesn't define quality standards |
| **Taxonomy-Aligned** | BSI Strategy and Implementation dimensions directly assess quality | Multi-dimensional quality rubrics | Comprehensive quality framework (not just correctness) | Requires clear quality criteria definition |
| **QLCs** | Primary framework - naming, API usage, algorithm choice, pattern detection | Automated quality metrics, idiom detection, convention checking | Scalable, objective, validated at MOOC scale | Requires language-specific quality definitions |

### Synthesis

**Primary**: QLCs provides comprehensive quality assessment framework

**Complementary**:
- **BSI**: Organize quality dimensions (Implementation = syntax quality, Strategy = design quality)
- **Threshold**: Calibrate expectations (pre-threshold: basic quality, post-threshold: professional quality)
- **Misconceptions**: Poor quality may indicate conceptual confusion (diagnose cause)

**Example**: Student uses single-letter variables → QLCs flags naming issue → BSI classifies as Implementation dimension → Misconception detector checks if indicates confusion → Threshold-aware feedback calibrates to student level.

---

## Comparison 4: Assessing "Async Understanding"

### The Assessment Goal
Verify student understands JavaScript asynchronous execution (event loop, Promises, async/await)

### Framework Approaches

| Framework | Assessment Approach | Tool Requirements | Strengths | Limitations |
|-----------|---------------------|-------------------|-----------|-------------|
| **Misconception-Driven** | Detect timing assumptions, setTimeout/Promise conflation, await blocking misconceptions | Execution order tracking, async pattern detection, timing misconception catalog | Targets specific async errors, validated high-frequency patterns | Async misconceptions less researched than sync |
| **Notional Machine** | Verify event loop mental model through queue visualization and tracing | Event loop phase tracking, queue state visualization, microtask/macrotask differentiation | Makes invisible execution visible, builds complete model | Event loop is complex NM, difficult to assess |
| **Threshold-Aware** | Async as primary threshold - detect pre/liminal/post states, scaffold appropriately | Liminal state detection, non-linear learning tracking, scaffolding triggers | Normalizes confusion, avoids grading during transition, celebrates crossing | Crossing detection criteria unclear |
| **Taxonomy-Aligned** | SOLO progression: setTimeout → Promises → async/await → integration | Progressive complexity tasks, prerequisite checking, level-appropriate challenges | Ensures solid foundations before complexity | Progression order not empirically validated |
| **QLCs** | Detect anti-patterns (callback hell, Promise misuse, missing error handling) | Async pattern analysis, anti-pattern detection, idiom checking | Scalable quality assessment for async code | Doesn't test understanding, only usage patterns |

### Synthesis

**Optimal multi-framework approach**:

1. **Week 1-2** (Introduction):
   - Taxonomy: Assess prerequisite (callback understanding) before async
   - Threshold: Diagnostic tasks identify pre-threshold state

2. **Week 3-5** (Liminal period):
   - Threshold: Detect liminal state, increase scaffolding, no grading
   - Misconceptions: Identify specific timing/queue confusions
   - NM: Build event loop model through visualization

3. **Week 6+** (Post-threshold emerging):
   - Threshold: Detect crossing (consistent predictions, model-based explanations)
   - Taxonomy: Assess SOLO Relational level (integrates sync + async)
   - QLCs: Evaluate async code quality in projects

4. **Ongoing**:
   - BSI: Assess Behavior (correct timing) + Strategy (appropriate async choice) + Implementation (clean syntax)

**Result**: Comprehensive async competence assessment, not just "can use Promises."

---

## Comparison 5: Assessing "Transfer & Generalization"

### The Assessment Goal
Measure whether student can apply learning to novel contexts (not just memorized solutions)

### Framework Approaches

| Framework | Assessment Approach | Tool Requirements | Strengths | Limitations |
|-----------|---------------------|-------------------|-----------|-------------|
| **Misconception-Driven** | Limited - tests if misconception resolved or persists in new context | Cross-context misconception tracking | Validates misconception resolution | Doesn't assess positive transfer, only error absence |
| **Notional Machine** | Apply NM to novel language features, edge cases, combinations | NM application to unfamiliar code, model generalization testing | Tests deep model understanding vs surface memorization | Novel contexts hard to generate automatically |
| **Threshold-Aware** | Extended Abstract as post-threshold capability - apply threshold concept to new domains | Transfer task generation, novel context presentation, application assessment | Transfer is threshold-crossing indicator, validates transformation | "Novel" is relative to prior exposure (hard to control) |
| **Taxonomy-Aligned** | SOLO Extended Abstract level explicitly tests transfer | Novel context tasks, cross-domain application, abstraction detection | Direct transfer measurement, highest SOLO level | Boundary between Relational and Extended Abstract fuzzy |
| **QLCs** | N/A - QLCs assesses production code quality, not transfer | N/A | N/A | Not designed for transfer assessment |

### Synthesis

**Primary frameworks for transfer**:
- **SOLO Extended Abstract**: Direct transfer measurement
- **Threshold Extended Abstract**: Transfer validates threshold crossing

**Supporting frameworks**:
- **Misconceptions**: Verify resolved misconceptions don't reappear in new contexts
- **NM**: Test model application to unfamiliar scenarios

**Example assessment**:
- Threshold crossed (closures) → Test transfer: "Apply closures to Python decorators"
- SOLO Extended Abstract task: "Use closure pattern in different language/paradigm"
- Misconceptions: Ensure scope confusion doesn't reappear despite syntax changes
- NM: Verify scope chain model applies despite different language scoping rules

---

## Framework Convergence Patterns

### Where Frameworks Align

**Relational Integration = Threshold Crossing**:
- SOLO Relational level
- Threshold post-threshold state
- Block Model Level 2 → Level 3 transition
- BSI Strategy dimension accessible

All indicate: Student moved from isolated facts to integrated understanding.

**Multistructural = Liminal**:
- SOLO Multistructural (disconnected elements)
- Threshold liminal state (partial understanding)
- Block Model Level 2 incomplete
- BSI mixed performance

All indicate: Student has pieces but not connections.

### Where Frameworks Diverge

**Misconceptions vs NM**:
- Misconceptions: Deficit model (what's wrong)
- NM: Asset model (what model they have)

Both valuable, different diagnostic information.

**QLCs vs Comprehension**:
- QLCs: Product quality (what they write)
- Comprehension: Process understanding (what they know)

Quality doesn't guarantee understanding, but correlation exists.

**Taxonomy vs Threshold**:
- Taxonomy: Gradual progression
- Threshold: Discontinuous transformation

Both true - learning has both incremental and breakthrough moments.

---

## Practical Integration Guidelines

### For Educators

**Don't choose one framework - use multiple**:
1. **Misconceptions**: Diagnostic (what's wrong?)
2. **NM**: Model building (what model do they have?)
3. **Threshold**: State-aware support (where are they in transition?)
4. **Taxonomy**: Progression planning (what level, what next?)
5. **QLCs**: Quality measurement (are they writing professional code?)

### For Tool Developers

**Multi-framework support**:
- Collect neutral trace data
- Interpret through multiple framework lenses
- Allow educators to choose emphasis
- Integrate frameworks (detect liminal + provide NM scaffolding)

### For Researchers

**Study framework integration**:
- Which combinations most effective?
- Do frameworks predict different outcomes?
- Can automated detection work across frameworks?
- How to balance framework complexity vs practical use?

---

## Summary

**Frameworks are complementary**:
- Misconceptions: Diagnostic precision
- NMs: Model building
- Thresholds: Transformative learning support
- Taxonomies: Progressive structuring
- QLCs: Scalable quality assessment

**Optimal assessment uses multiple frameworks**, not one exclusively.

**Integration provides**:
- Comprehensive understanding assessment
- Multiple diagnostic angles
- State-appropriate support
- Quality + comprehension measurement

**Avoid**:
- Framework tribalism ("only use X")
- Single-dimension assessment
- One-size-fits-all approaches

**Embrace**:
- Multi-framework diagnosis
- Complementary strengths
- Integrated tool support
