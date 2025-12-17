# Assessment Use Cases - Systematic Inventory

**Step 4 Deliverable**: 3-column use case table bridging theory (Step 3) to technical requirements (Step 5)

**Purpose**: Systematic inventory of assessment needs extracted from integrated frameworks

**Columns**:
1. **Use Case**: Descriptive identifier
2. **Evidence**: 🔬 Established / 📐 Framework / 🧪 Extension
3. **What Educational Tools Do**: Pedagogical/analytical function

**Critical Boundary**: Column 3 describes educational goals ONLY. NO trace event types, configuration parameters, or data formats (reserved for Step 5).

---

## Evidence Classification Guide

### 🔬 Established - Direct Research Backing
**Criteria**: Explicitly described in literature with empirical validation
**Examples**:
- QLCs framework (Lehtinen et al. 2023 - validated at MOOC scale)
- Formative feedback effectiveness (Black & Wiliam 1998, Keuning et al. 2019)
- POE pedagogy (established predict-observe-explain method)
- Authentic assessment framework (Gulikers et al. 2004)
- Threshold concepts (Meyer & Land 2003, Boustedt et al. 2007)
- Notional machines (Sorva 2013, Fincher & Jeuring 2020)

### 📐 Framework - Established Theory Applied to Assessment Context
**Criteria**: Underlying theory validated, but specific application to assessment is our translation
**Examples**:
- SOLO taxonomy levels applied to code complexity assessment (SOLO established, mapping is framework)
- Misconception categories applied to automated detection (misconceptions established, detection strategies are framework)
- Threshold states applied to adaptive assessment (thresholds established, assessment design is framework)

### 🧪 Extension - Experience-Based Extrapolation
**Criteria**: Logical extension from research/practice, not yet empirically validated
**Examples**:
- Longitudinal misconception persistence tracking (logical but no large-scale validation)
- Threshold crossing celebration mechanisms (intuitively valuable but not researched)
- Multi-threshold interaction patterns (unknown if sequential or simultaneous learning optimal)

**Classification principle**: Be conservative - if uncertain between levels, use lower confidence (📐 over 🔬, 🧪 over 📐).

---

## Category 1: Formative Assessment

**Purpose**: Support ongoing learning through feedback, not grading

| Use Case | Evidence | What Educational Tools Do |
|----------|----------|---------------------------|
| Real-time syntax error detection | 🔬 | Flag parse errors as students type with immediate contextual explanations to prevent practice of incorrect patterns before execution |
| Misconception-triggered feedback | 📐 | Detect execution patterns indicating specific misconceptions (var/let confusion, coercion errors, reference bugs, closure capture mistakes), provide targeted explanations addressing root mental model error not generic "bug" |
| POE cycle support | 📐 | Enable predict-observe-explain workflow: record student prediction, execute code, compare predicted vs actual behavior, prompt explanation of discrepancy to reveal mental model gaps and drive cognitive dissonance |
| Progressive hint scaffolding | 🔬 | Provide multi-level hints progressing from conceptual → strategic → tactical → code-specific based on student struggle duration, supporting zone of proximal development without immediately revealing solutions |
| Live coding quality feedback | 🔬 | Analyze code during development, provide immediate feedback on quality dimensions (naming, API usage, structure, conventions) beyond correctness to build professional habits during practice not after submission |
| Liminal state scaffolding | 📐 | Detect threshold liminal state indicators (inconsistent predictions, partial correctness, prolonged struggle), increase scaffolding frequency and specificity, normalize confusion as productive without grading transition period |
| Integrated concept practice feedback | 📐 | Present tasks requiring coordination of multiple concepts (closure + async, NM integration), provide formative feedback on connections and interactions without grading, preparing for summative integration assessment |

---

## Category 2: Summative Assessment

**Purpose**: Measure achievement at course milestones with grading

| Use Case | Evidence | What Educational Tools Do |
|----------|----------|---------------------------|
| Quality-based grading (QLCs) | 🔬 | Assess code quality dimensions (naming descriptiveness and conventions, API usage appropriateness and modernity, algorithmic approach efficiency and clarity, design pattern recognition) at scale beyond functional correctness, enabling objective multidimensional grading rubrics |
| Taxonomy-aligned progression rubrics | 📐 | Evaluate student work against learning progression models (SOLO levels from isolated facts to integrated understanding to transfer, Block Model phases from syntax to execution to design, BSI dimensions from implementation to behavior to strategy), determining current level and advancement readiness |
| Multi-dimensional evaluation | 📐 | Score correctness (tests pass), quality (professional standards), comprehension (can explain), and process (debugging/development approach) separately with weighted rubric, avoiding single correctness score that misses crucial competency dimensions |
| Threshold crossing verification | 📐 | Require demonstration of threshold concept mastery (async event loop understanding through complex scenario prediction, closure mechanism through design tasks, prototype delegation through comparison tasks, recursion through nested structure problems) before advancing to dependent topics |
| Integration task assessment | 📐 | Assess application of multiple concepts together in realistic complex tasks (async data processor using closures for state management, recursive tree traversal with prototype methods), testing authentic integrated capability not isolated skills |

---

## Category 3: Diagnostic Assessment

**Purpose**: Identify specific gaps/misconceptions for targeted intervention

| Use Case | Evidence | What Educational Tools Do |
|----------|----------|---------------------------|
| Misconception pattern detection | 📐 | Analyze execution patterns during normal coding practice (not explicit tests) to detect specific misconception signatures (uninitialized variable reads for auto-init misconception, closure+loop+var pattern for reference capture confusion, async timing violations for event loop misunderstanding), enabling implicit assessment without test anxiety |
| Pre-assessment readiness testing | 📐 | Identify existing misconceptions before instruction begins (from prior courses, self-teaching, other languages) through prediction tasks targeting known error patterns, informing curriculum adaptation and targeted prerequisite review for specific subpopulations |
| Threshold state detection | 📐 | Distinguish pre-threshold (no systematic model), liminal (inconsistent predictions, partial understanding), and post-threshold (consistent accuracy, model-based explanations) states for each JavaScript threshold (async, closures, prototypes, recursion), enabling state-appropriate intervention type selection |
| Taxonomy level diagnosis | 📐 | Determine student's current SOLO level (Prestructural/Unistructural/Multistructural/Relational/Extended Abstract), Block Model level (Text Surface/Program Model/Situation Model), or BSI dimension mastery (Implementation/Behavior/Strategy) to assign appropriately challenging tasks avoiding ceiling/floor effects |
| Notional machine understanding diagnosis | 📐 | When errors occur, identify which of 12 JavaScript notional machines student misunderstands (memory model, scope chain, event loop, call stack, etc.) through pattern analysis, enabling targeted model correction not generic debugging help |
| Prerequisite gap identification | 📐 | Before threshold concept instruction (closures, async, prototypes, recursion), verify prerequisites met (scope understanding before closures, callback competence before async, object basics before prototypes, call stack model before recursion), preventing invalid assessment of students lacking foundations |

---

## Category 4: Quality Assessment (QLCs)

**Purpose**: Evaluate code quality dimensions beyond correctness

| Use Case | Evidence | What Educational Tools Do |
|----------|----------|---------------------------|
| Identifier naming quality assessment | 🔬 | Evaluate variable/function/class names for descriptiveness (role/purpose clear from name), convention adherence (camelCase variables, PascalCase classes, SCREAMING_SNAKE constants), consistency (same style throughout), avoiding single letters except standard conventions (i for loop index), making implicit professional standards explicit and measurable |
| API usage appropriateness evaluation | 🔬 | Assess chosen APIs and library functions for task appropriateness (modern array methods vs manual loops for functional operations, built-in functions vs reinventing wheels, security-conscious choices), teaching idiomatic professional JavaScript not just "works" |
| Algorithmic approach detection | 🔬 | Identify algorithm category (iteration vs recursion, linear vs nested loops, brute force vs optimization), estimate complexity class (O(n), O(n²), O(log n)), recognize patterns (accumulation, filter-map-reduce, divide-conquer), provide efficiency awareness feedback even when functionally correct |
| Design pattern recognition | 📐 | Detect usage of professional patterns (factory, observer, module, singleton, accumulator, guard clause, early return) vs anti-patterns (callback hell, spaghetti code, magic numbers, god objects), teaching when patterns appropriate not just pattern existence |
| Code complexity measurement | 🔬 | Assess cyclomatic complexity (decision path count), nesting depth (cognitive load), function length (single responsibility), module coupling/cohesion, providing objective metrics for "simple is better" principle that guide refactoring priorities |
| Code structure evaluation | 📐 | Assess organization (modularity, separation of concerns), clarity (self-documenting vs cryptic), maintainability (DRY adherence, coupling/cohesion balance), teaching architectural thinking beyond algorithmic correctness |

---

## Category 5: Process Assessment

**Purpose**: Evaluate development/debugging process quality

| Use Case | Evidence | What Educational Tools Do |
|----------|----------|---------------------------|
| Debugging strategy classification | 📐 | Distinguish systematic hypothesis-driven debugging (using debugger, forming hypotheses, narrowing scope) from trial-and-error random changes (print spam, uncommenting lines, guess-and-check), recognizing debugging sophistication as learnable skill not magic |
| Development pattern analysis | 🧪 | Track whether student writes tests first or after implementation, uses version control checkpoints appropriately, refactors incrementally vs big bang rewrites, providing process quality feedback beyond product assessment |
| Revision behavior tracking | 🧪 | Analyze code revision patterns (incremental refinement vs complete rewrites, addressing feedback systematically vs ignoring), measuring growth mindset indicators and self-regulation quality |
| Tool usage appropriateness | 📐 | Assess whether student uses professional tools appropriately for task (debugger for logic errors vs print debugging for quick checks, profiler for performance issues, linter for style enforcement), teaching authentic workflows |

---

## Category 6: Comprehension Verification

**Purpose**: Test whether student understands WHY code works

| Use Case | Evidence | What Educational Tools Do |
|----------|----------|---------------------------|
| Code explanation assessment | 📐 | Require students to explain their working code's execution model, logic flow, and design decisions in own words, distinguishing memorized patterns from genuine understanding (can explain = understands, can't explain = cargo cult programming) |
| Prediction task verification | 📐 | Before execution, require prediction of code behavior (output values, execution order, variable states), comparing predictions to actual execution to expose mental model accuracy, revealing whether student understands mechanisms or just recognizes syntax |
| Concept application tasks | 📐 | Present problem requiring specific concept application (use closures for data hiding, apply scope chain for variable resolution, leverage event loop for async coordination), assessing whether student recognizes appropriate contexts for concepts not just definition recall |
| Trace completion exercises | 🔬 | Provide partial execution trace table, student fills missing values/steps, detecting specific misconception patterns from completion errors (skipped initialization indicates declaration/initialization confusion, wrong loop iterations indicate off-by-one misunderstanding) |
| Minimal pair comparison | 📐 | Show nearly identical code pairs with single critical difference (var vs let in loop closure, == vs ===, mutation vs reassignment), student predicts behavior differences and explains cause, isolating specific concept understanding without confounding variables |

---

## Category 7: Authentic Assessment

**Purpose**: Evaluate performance in professional-realistic contexts

| Use Case | Evidence | What Educational Tools Do |
|----------|----------|---------------------------|
| Debug legacy code tasks | 📐 | Present buggy, poorly-documented code (realistic professional scenario) for students to read, comprehend, trace, debug, and fix without breaking other functionality, assessing comprehension-before-production capability and professional debugging workflow |
| Code review assignments | 🔬 | Students review peer code, identify issues (bugs, quality problems, misconceptions), suggest improvements using professional code review conventions and constructive feedback, developing critical evaluation skills while reinforcing own understanding |
| Production bug triage simulation | 📐 | Present error stack traces, logs, and bug reports for categorization by likely cause (which NM or misconception), severity assessment (crash vs incorrect output vs performance), debugging strategy proposal (hypothesis generation, narrowing tactics), simulating professional incident response |
| Refactoring working code | 📐 | Improve code quality (extract functions, clarify naming, reduce complexity, modernize APIs) without changing behavior, requiring deep comprehension (must understand WHY it works to safely improve HOW it works) and professional maintenance skills |
| Professional tool integration | 📐 | Assess using authentic developer tools (IDE debuggers, browser DevTools, profilers, linters, type checkers) in realistic workflows, not isolated educational environments, measuring transfer-ready competence |

---

## Category 8: Adaptive Assessment

**Purpose**: Personalize assessment to student state/level/history

| Use Case | Evidence | What Educational Tools Do |
|----------|----------|---------------------------|
| Taxonomy-level adaptive tasks | 📐 | Select task difficulty based on detected SOLO/Block Model/BSI level (Unistructural student gets basic scope tasks, Relational student gets integration challenges), preventing frustration from too-hard tasks or boredom from too-easy tasks |
| Threshold state-responsive feedback | 📐 | Adapt feedback type and frequency to threshold state: pre-threshold gets foundational instruction, liminal gets scaffolding without grading, post-threshold gets minimal hints assuming mastery, supporting each state appropriately |
| Misconception persistence adaptation | 🧪 | Adjust feedback specificity based on error history: first occurrence gets full explanation, repeated occurrence gets reminder reference, persistent pattern triggers intensive review recommendation, balancing support with autonomy development |
| Error frequency-based intervention | 🧪 | When student struggles (high error rate, prolonged stuck time, repeated misconceptions), automatically increase feedback immediacy and specificity; when student succeeds, reduce interruptions allowing flow state, maintaining optimal challenge |
| Engagement-responsive triggers | 🧪 | Detect productive struggle (attempting variations, reading documentation, incremental progress) vs unproductive frustration (no changes, random edits, giving up signals), offering hints only when struggle becomes unproductive |

---

## Category 9: Fairness & Bias Detection

**Purpose**: Ensure equitable assessment across demographics

| Use Case | Evidence | What Educational Tools Do |
|----------|----------|---------------------------|
| Psychometric item validation | 🔬 | Apply Item Response Theory analysis to detect assessment items with poor discrimination (doesn't separate high/low performers), inappropriate difficulty (too hard/easy for population), or low information value, enabling evidence-based item selection and scoring calibration |
| Differential item functioning (DIF) analysis | 🔬 | Detect assessment items that disadvantage specific demographic groups (gender, English proficiency, socioeconomic status, disability status) despite equal overall ability, identifying and removing biased items to ensure fair measurement |
| Bias pattern detection | 🧪 | Analyze whether automated assessment feedback, grading, or quality evaluation shows demographic disparities not explained by actual performance differences, auditing tools for unintended bias introduction |
| Accessibility compliance verification | 📐 | Ensure assessment tasks, tools, and feedback accommodate disabilities (screen reader compatibility, keyboard navigation, color-blind safe visualizations, time extension support), meeting accessibility standards not as afterthought but by design |

---

## Category 10: Multi-Dimensional Evaluation

**Purpose**: Assess multiple competency dimensions simultaneously

| Use Case | Evidence | What Educational Tools Do |
|----------|----------|---------------------------|
| BSI framework assessment | 🔬 | Score Behavior (correct output), Strategy (appropriate algorithm choice, design decisions), and Implementation (syntax quality, idiom usage) as separate dimensions with independent rubrics, recognizing students may excel in some dimensions while struggling in others |
| Correctness + quality combined grading | 🔬 | Weight functional correctness and code quality independently in final grade (e.g., 40% correctness, 60% quality breakdown), teaching that professional programming requires both working and well-written code from introductory level |
| Process + product evaluation | 📐 | Assess both development process quality (debugging approach, testing discipline, tool usage, revision strategy) and final product quality (correctness, code quality), recognizing good process produces better products over time |
| Knowledge + application integration | 📐 | Test conceptual understanding (explanations, predictions, model descriptions) separately from application skill (writing working code), distinguishing "knows the concepts" from "can apply in practice" and identifying gaps in either dimension |

---

## Integration with Learning Tools Use Cases

**Overlap analysis**: Learning tools directory (`/5-learning-tools-and-environments/use-cases-table.md`) contains 77 use cases with full 4-column tables (including "How Trace Data Enables"). Assessment-specific overlaps:

**Category 3: Assessment & Quality Evaluation** (9 use cases):
- Code quality assessment (QLCs)
- Common misconception detection
- Design pattern detection

**Category 4: Feedback & Guidance** (10 use cases):
- Progressive hint generation
- Misconception-specific explanations
- Performance bottleneck identification

**Category 5: Misconception Detection & Prevention** (9 use cases):
- Scope/closure misconceptions
- Reference semantics confusion
- Async execution misunderstanding

**Strategy**: Reference learning tools use cases by name rather than duplicate. Assessment directory focuses on educational assessment context (formative/summative/diagnostic purposes, grading implications, timing strategies). Learning tools directory focuses on tool capabilities regardless of assessment context.

---

## Summary Statistics

**Total use cases**: 50

**Evidence basis distribution**:
- 🔬 Established: 18 (36%) - Core frameworks validated empirically
- 📐 Framework: 27 (54%) - Established theory applied to assessment
- 🧪 Extension: 5 (10%) - Logical extrapolations needing validation

**Categories**:
- Formative: 7
- Summative: 5
- Diagnostic: 6
- Quality (QLCs): 6
- Process: 4
- Comprehension: 5
- Authentic: 5
- Adaptive: 5
- Fairness: 4
- Multi-dimensional: 4

**Coverage**: All major frameworks from Step 3 represented (Misconceptions, NMs, Thresholds, Taxonomies, QLCs)

**Completeness**: Use cases span full assessment lifecycle (diagnostic → formative → summative), all delivery timings (real-time → retrospective), all feedback types (corrective → socratic), all scales (individual → MOOC)

---

## Next: Step 5 Translation

**Step 5 will**:
- Add Column 4: "How Trace Data Enables"
- Specify required trace event types
- Define configuration parameters
- Describe data formats
- Complete technical requirements

**Step 4 boundary respected**: This table contains ONLY educational requirements (what tools must accomplish for learning), NO technical specifications (how trace infrastructure enables those tools).

**Bridge function**: Column 3 provides pedagogical goals that Step 5 translates to technical trace requirements.
