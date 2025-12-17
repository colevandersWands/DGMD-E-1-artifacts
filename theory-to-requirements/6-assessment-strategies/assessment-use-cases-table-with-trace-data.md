# Assessment Use Cases - Complete 4-Column Table (Step 5 Complete)

**Step 5 Deliverable**: Added Column 4 "How Trace Data Enables" to all 50 assessment use cases

**Purpose**: Bridge educational assessment needs (Step 4) to technical trace infrastructure (Phase 5)

**Columns**:
1. **Use Case**: Descriptive identifier
2. **Evidence**: 🔬 Established / 📐 Framework / 🧪 Extension
3. **What Educational Tools Do**: Pedagogical/analytical function (Step 4)
4. **How Trace Data Enables**: Required events, config, and data structures (Step 5)

**Critical Boundary**: Column 4 specifies ONLY what embody provides (`embody(script, config) → trace`). Educational interpretation, UI rendering, feedback generation, and pedagogical strategies remain tool responsibilities.

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

| Use Case | Evidence | What Educational Tools Do | How Trace Data Enables |
|----------|----------|---------------------------|------------------------|
| 1.1 Real-time syntax error detection | 🔬 | Flag parse errors as students type with immediate contextual explanations to prevent practice of incorrect patterns before execution | **OUT OF SCOPE** for execution tracer. Requires static analysis (parser/linter) before code executes. Embody traces execution only. Tools combine static analysis with execution tracing. |
| 1.2 Misconception-triggered feedback | 📐 | Detect execution patterns indicating specific misconceptions (var/let confusion, coercion errors, reference bugs, closure capture mistakes), provide targeted explanations addressing root mental model error not generic "bug" | Comprehensive event set: `variable.tdz-access` (hoisting), `expression.binary` with `coercionOccurred` flag (type coercion), `closure.capture` + `variable.read` with `resolvedScopeId` (closure bugs), `prototype.lookup` with `lookupChain` (delegation). Config: `variables: "all"`, `functions: "all"`, `scopes: "all"`, `controlFlow: "detailed"`, `async: "all"`, `objects: "all"`, `errors: "all"`, `expressions: true` (expensive - 4.6x overhead, enable selectively). Tools pattern-match event sequences to detect misconception signatures (Qian & Lehman 2017). **Performance**: 2.6x without expressions (acceptable for real-time), 4.6x with expressions (batch only). |
| 1.3 POE cycle support | 📐 | Enable predict-observe-explain workflow: record student prediction, execute code, compare predicted vs actual behavior, prompt explanation of discrepancy to reveal mental model gaps and drive cognitive dissonance | Full execution trace with all relevant events for comparison: comprehensive config (`variables: "all"`, `functions: "all"`, `scopes: "all"`, `controlFlow: "detailed"`, `async: "all"`, `objects: "all"`). Tools store student prediction, execute with embody to generate actual trace, compute diff (predicted vs actual values, execution order, variable states), highlight discrepancies. Embody provides reference data; tools manage prediction recording and diff visualization. **Performance**: 2.6x overhead (offline workflow, acceptable). |
| 1.4 Progressive hint scaffolding | 🔬 | Provide multi-level hints progressing from conceptual → strategic → tactical → code-specific based on student struggle duration, supporting zone of proximal development without immediately revealing solutions | Event data reveals WHERE student is stuck (which function, loop iteration, variable state) via `sequenceId` ordering and `location` fields. Comprehensive events enable tools to analyze stuck context: function call stack (`function.call/return`), loop progress (`loop.iterate` count), variable values (`variable.assign/read`). Tools determine hint level based on stuck duration + context analysis. Embody provides execution state; tools implement hint selection logic. **Performance**: 2.6x (real-time feedback). |
| 1.5 Live coding quality feedback | 🔬 | Analyze code during development, provide immediate feedback on quality dimensions (naming, API usage, structure, conventions) beyond correctness to build professional habits during practice not after submission | Optimized QLCs config: `variables: "declarations-only"` (naming quality from `variableName` field), `functions: "user-code-only"` (API usage from `functionName`, exclude built-ins with `excludeBuiltins: true`), `controlFlow: "detailed"` (algorithm detection), `objects: "creation-only"` (design patterns). Minimal overhead (1.8x) enables real-time feedback. Tools analyze variable/function names, API choices, control flow patterns. **Performance**: 1.8x (acceptable for real-time). |
| 1.6 Liminal state scaffolding | 📐 | Detect threshold liminal state indicators (inconsistent predictions, partial correctness, prolonged struggle), increase scaffolding frequency and specificity, normalize confusion as productive without grading transition period | **PARTIALLY IN SCOPE**: Single execution trace shows threshold-relevant behavior (closure usage via `closure.capture`, async ordering via `microtask.*`, prototype access via `prototype.lookup`). Liminal state detection requires LONGITUDINAL data (multiple traces over time showing inconsistency). Embody provides per-execution data; tools track predictions across multiple executions, detect inconsistency patterns (correct → incorrect → correct), trigger scaffolding. Config: threshold-specific (closures: `scopes: "all"`, `variables: "all"`; async: `async: "all"`). **Performance**: 1.5-2.3x per threshold. |
| 1.7 Integrated concept practice feedback | 📐 | Present tasks requiring coordination of multiple concepts (closure + async, NM integration), provide formative feedback on connections and interactions without grading, preparing for summative integration assessment | Comprehensive events for multiple concepts simultaneously: `closure.capture` + `async: "all"` (closure + async tasks), `scope.*` + `prototype.lookup` (scope + inheritance). Config enables all relevant event categories (`variables: "all"`, `functions: "all"`, `scopes: "all"`, `controlFlow: "detailed"`, `async: "all"`, `objects: "all"`). Tools detect concept coordination patterns (e.g., closure capturing async context). **Performance**: 2.6x (formative context tolerates overhead). |

---

## Category 2: Summative Assessment

**Purpose**: Measure achievement at course milestones with grading

| Use Case | Evidence | What Educational Tools Do | How Trace Data Enables |
|----------|----------|---------------------------|------------------------|
| 2.1 Quality-based grading (QLCs) | 🔬 | Assess code quality dimensions (naming descriptiveness and conventions, API usage appropriateness and modernity, algorithmic approach efficiency and clarity, design pattern recognition) at scale beyond functional correctness, enabling objective multidimensional grading rubrics | Optimized QLCs config for minimal overhead at scale: `variables: "declarations-only"` (names), `functions: "user-code-only"` (API choices), `controlFlow: "detailed"` (algorithms), `objects: "creation-only"` (patterns), `excludeBuiltins: true`. For MOOC scale, add sampling (`sampling: {enabled: true, rate: 3-5, strategy: "systematic"}`) reducing to 1.15x overhead for aggregate statistics. Tools extract names from `variable.declare.variableName`, APIs from `function.call.functionName`, algorithms from `loop.*` + `conditional.branch` patterns. **Performance**: 1.8x individual, 1.15x MOOC aggregate. |
| 2.2 Taxonomy-aligned progression rubrics | 📐 | Evaluate student work against learning progression models (SOLO levels from isolated facts to integrated understanding to transfer, Block Model phases from syntax to execution to design, BSI dimensions from implementation to behavior to strategy), determining current level and advancement readiness | Event patterns reveal taxonomy levels: SOLO Unistructural (simple linear execution, few events), Multistructural (multiple independent functions), Relational (scope chains, closures connecting parts), Extended Abstract (recursion, advanced patterns). Comprehensive events (`variables: "all"`, `functions: "all"`, `scopes: "all"`, `controlFlow: "detailed"`) enable tools to detect structural complexity, scope usage patterns, integration indicators. Embody provides execution data; tools map patterns to taxonomy levels. **Performance**: 2.6x (summative context, batch processing acceptable). |
| 2.3 Multi-dimensional evaluation | 📐 | Score correctness (tests pass), quality (professional standards), comprehension (can explain), and process (debugging/development approach) separately with weighted rubric, avoiding single correctness score that misses crucial competency dimensions | Correctness: test execution traces (pass/fail from test framework events). Quality: QLCs config (1.8x overhead). Comprehension: full trace for comparison to student explanation (comprehensive config, 2.6x). Process: **MOSTLY OUT OF SCOPE** (needs development environment logs). Embody provides execution dimension only; tools combine with external data (test results, student explanations, IDE logs) for multi-dimensional scoring. |
| 2.4 Threshold crossing verification | 📐 | Require demonstration of threshold concept mastery (async event loop understanding through complex scenario prediction, closure mechanism through design tasks, prototype delegation through comparison tasks, recursion through nested structure problems) before advancing to dependent topics | Threshold-specific configs: **Closures** (`variables: "all"` for reads, `scopes: "all"`, `closure.capture`); **Async** (`async: "all"` with `microtask.queue/execute`, `sequenceId` for ordering); **Prototypes** (`objects: "all"`, `prototype.lookup` with `lookupChain`); **Recursion** (`function.call/return` with matching `functionId`). Tools verify threshold indicators in trace (closure captured variables, microtask queue ordering, prototype chain traversal, recursive call patterns). **Performance**: 1.5-2.3x per threshold (focused configs reduce overhead 30-50% vs comprehensive). |
| 2.5 Integration task assessment | 📐 | Assess application of multiple concepts together in realistic complex tasks (async data processor using closures for state management, recursive tree traversal with prototype methods), testing authentic integrated capability not isolated skills | Comprehensive events for multiple concepts: async + closures requires `async: "all"` + `scopes: "all"` + `closure.capture`; recursion + prototypes requires `function.call/return` + `objects: "all"` + `prototype.lookup`. Tools verify correct integration patterns in trace (closure capturing async context, recursive calls accessing prototype methods). Config: all relevant categories enabled (2.6x overhead). **Performance**: 2.6x (summative batch context). |

---

## Category 3: Diagnostic Assessment

**Purpose**: Identify specific gaps/misconceptions for targeted intervention

| Use Case | Evidence | What Educational Tools Do | How Trace Data Enables |
|----------|----------|---------------------------|------------------------|
| 3.1 Misconception pattern detection | 📐 | Analyze execution patterns during normal coding practice (not explicit tests) to detect specific misconception signatures (uninitialized variable reads for auto-init misconception, closure+loop+var pattern for reference capture confusion, async timing violations for event loop misunderstanding), enabling implicit assessment without test anxiety | Same events as 1.2 (misconception-triggered feedback) but PASSIVE detection (no immediate feedback): `variable.tdz-access`, `expression.binary` with `coercionOccurred`, `closure.capture` + loop context, `microtask.*` ordering violations. Config: comprehensive (`variables: "all"`, `scopes: "all"`, `async: "all"`, `expressions: true` if targeting coercion). Tools silently log misconception occurrences for later analysis. **Difference from formative**: Same trace data, different tool behavior (silent vs immediate feedback). **Performance**: 2.6x without expressions, 4.6x with (batch processing acceptable). |
| 3.2 Pre-assessment readiness testing | 📐 | Identify existing misconceptions before instruction begins (from prior courses, self-teaching, other languages) through prediction tasks targeting known error patterns, informing curriculum adaptation and targeted prerequisite review for specific subpopulations | Prediction task workflow (same as 1.3 POE): comprehensive trace for comparison to student predictions. Tools execute misconception-revealing code (var hoisting, coercion edge cases, closure capture), compare student predictions to actual trace, categorize misconceptions by type. Config: comprehensive events targeting known misconceptions (`variables: "all"`, `scopes: "all"`, `expressions: true` for coercion). **Performance**: 2.6-4.6x (pre-assessment context, one-time overhead acceptable). |
| 3.3 Threshold state detection | 📐 | Distinguish pre-threshold (no systematic model), liminal (inconsistent predictions, partial understanding), and post-threshold (consistent accuracy, model-based explanations) states for each JavaScript threshold (async, closures, prototypes, recursion), enabling state-appropriate intervention type selection | **PARTIALLY IN SCOPE**: Single trace shows threshold concept usage patterns (closure: `closure.capture`, async: `microtask.*` ordering, prototypes: `prototype.lookup`). State classification (pre/liminal/post) requires LONGITUDINAL data (multiple predictions over time). Embody provides per-execution data; tools track prediction accuracy across executions, detect state (consistently wrong = pre, inconsistent = liminal, consistently right = post). Config: threshold-focused (1.5-2.3x per threshold). **Longitudinal tracking is tool responsibility**. |
| 3.4 Taxonomy level diagnosis | 📐 | Determine student's current SOLO level (Prestructural/Unistructural/Multistructural/Relational/Extended Abstract), Block Model level (Text Surface/Program Model/Situation Model), or BSI dimension mastery (Implementation/Behavior/Strategy) to assign appropriately challenging tasks avoiding ceiling/floor effects | Event pattern complexity reveals taxonomy level (same as 2.2 but diagnostic purpose): Simple event sequences (Unistructural), multiple independent patterns (Multistructural), scope chains + closures (Relational), advanced patterns (Extended Abstract). Comprehensive config enables pattern detection (`variables: "all"`, `functions: "all"`, `scopes: "all"`, `controlFlow: "detailed"`). Tools analyze trace complexity, map to taxonomy level. **Performance**: 2.6x (diagnostic batch context). |
| 3.5 Notional machine understanding diagnosis | 📐 | When errors occur, identify which of 12 JavaScript notional machines student misunderstands (memory model, scope chain, event loop, call stack, etc.) through pattern analysis, enabling targeted model correction not generic debugging help | Notional machine-specific events: **Memory model** (`variable.assign` values, object IDs), **Scope chain** (`variable.read` with `resolvedScopeId`, `scope.*` hierarchy), **Event loop** (`microtask.*`, `await.*`, `sequenceId` ordering), **Call stack** (`function.call/return` matching). Tools analyze error context (which NM events involved), diagnose NM misunderstanding. Config: comprehensive (`variables: "all"`, `scopes: "all"`, `async: "all"`). **Performance**: 2.6x (diagnostic context). |
| 3.6 Prerequisite gap identification | 📐 | Before threshold concept instruction (closures, async, prototypes, recursion), verify prerequisites met (scope understanding before closures, callback competence before async, object basics before prototypes, call stack model before recursion), preventing invalid assessment of students lacking foundations | Prerequisite-specific configs: **Scope** (prerequisite for closures) uses `scopes: "all"`, `variable.read` resolution patterns; **Callbacks** (prerequisite for async) uses `function.call` with function arguments; **Objects** (prerequisite for prototypes) uses `object.create`, `property.access`. Tools execute prerequisite-testing code, verify expected patterns in trace (scope resolution, callback invocation, object manipulation). Config: focused on prerequisite concept (lower overhead than comprehensive). **Performance**: 1.5-2.0x per prerequisite. |

---

## Category 4: Quality Assessment (QLCs)

**Purpose**: Evaluate code quality dimensions beyond correctness

| Use Case | Evidence | What Educational Tools Do | How Trace Data Enables |
|----------|----------|---------------------------|------------------------|
| 4.1 Identifier naming quality assessment | 🔬 | Evaluate variable/function/class names for descriptiveness (role/purpose clear from name), convention adherence (camelCase variables, PascalCase classes, SCREAMING_SNAKE constants), consistency (same style throughout), avoiding single letters except standard conventions (i for loop index), making implicit professional standards explicit and measurable | Minimal overhead config: `variables: "declarations-only"` (one event per variable), `functions: "user-code-only"` (function names), `scopes: "none"`, `controlFlow: "none"`, `async: "none"`, `objects: "none"`, `expressions: false`. Extract `variable.declare.variableName` and `function.call.functionName` fields. Tools analyze name strings (descriptiveness, conventions, consistency). **Performance**: 1.05x overhead (near-native, enables real-time quality feedback). **Critical**: Most efficient QLCs config. |
| 4.2 API usage appropriateness evaluation | 🔬 | Assess chosen APIs and library functions for task appropriateness (modern array methods vs manual loops for functional operations, built-in functions vs reinventing wheels, security-conscious choices), teaching idiomatic professional JavaScript not just "works" | Two configs: **User code only** (`functions: "user-code-only"`, `excludeBuiltins: true`, 1.8x overhead) to see what student writes; **All functions** (`functions: "all"`, 2.3x overhead) to see which built-ins student calls. Tools compare: manual loop vs `Array.map` usage, string manipulation vs regex, etc. Extract `function.call.functionName` field, distinguish built-in vs user-defined. **Performance**: 1.8x user-only (sufficient for most cases), 2.3x with built-ins (if assessing API choices). |
| 4.3 Algorithmic approach detection | 🔬 | Identify algorithm category (iteration vs recursion, linear vs nested loops, brute force vs optimization), estimate complexity class (O(n), O(n²), O(log n)), recognize patterns (accumulation, filter-map-reduce, divide-conquer), provide efficiency awareness feedback even when functionally correct | Critical config: `controlFlow: "detailed"` (iteration counts from `loop.iterate.iterationNumber`, nesting from `loop.enter` hierarchy). Recursion detection: `function.call/return` with matching `functionId`. Config: `variables: "declarations-only"`, `functions: "user-code-only"`, `controlFlow: "detailed"` (40% overhead from detailed control flow). Tools analyze: nested loops (O(n²)), iteration counts (linear growth), recursive calls (divide-conquer). **Performance**: 1.7x (control flow overhead justified for algorithm detection). |
| 4.4 Design pattern recognition | 📐 | Detect usage of professional patterns (factory, observer, module, singleton, accumulator, guard clause, early return) vs anti-patterns (callback hell, spaghetti code, magic numbers, god objects), teaching when patterns appropriate not just pattern existence | Pattern detection from event sequences: **Factory** (`object.create` within function returning objects), **Module** (`closure.capture` for encapsulation), **Accumulator** (loop + variable updates), **Observer** (function registration + calls). Config: moderate detail (`functions: "user-code-only"`, `scopes: "all"`, `controlFlow: "basic"`, `objects: "creation-only"`, `closure.capture`). Tools pattern-match event sequences. **Performance**: 1.8x (balanced detail vs overhead). |
| 4.5 Code complexity measurement | 🔬 | Assess cyclomatic complexity (decision path count), nesting depth (cognitive load), function length (single responsibility), module coupling/cohesion, providing objective metrics for "simple is better" principle that guide refactoring priorities | Complexity metrics from event patterns: **Cyclomatic** (count `conditional.branch` events per function), **Nesting** (depth of nested `function.call`, `loop.enter`, `conditional.branch`), **Length** (events between `function.call` and `function.return`). Config: `functions: "user-code-only"`, `controlFlow: "detailed"`. Tools count branches, measure nesting depth, estimate function complexity. **Performance**: 1.7x (detailed control flow overhead). |
| 4.6 Code structure evaluation | 📐 | Assess organization (modularity, separation of concerns), clarity (self-documenting vs cryptic), maintainability (DRY adherence, coupling/cohesion balance), teaching architectural thinking beyond algorithmic correctness | Structure indicators from events: **Modularity** (function count, call patterns), **Separation** (which functions call which - coupling analysis from `function.call.functionName` sequences), **DRY** (repeated `function.call` patterns vs abstractions). Config: `functions: "user-code-only"`, `scopes: "all"`, `controlFlow: "basic"`, `objects: "creation-only"`. Tools analyze call graphs, scope usage, object creation patterns. **Performance**: 1.8x. |

---

## Category 5: Process Assessment

**Purpose**: Evaluate development/debugging process quality

| Use Case | Evidence | What Educational Tools Do | How Trace Data Enables |
|----------|----------|---------------------------|------------------------|
| 5.1 Debugging strategy classification | 📐 | Distinguish systematic hypothesis-driven debugging (using debugger, forming hypotheses, narrowing scope) from trial-and-error random changes (print spam, uncommenting lines, guess-and-check), recognizing debugging sophistication as learnable skill not magic | **PARTIALLY IN SCOPE**: Trace reveals error patterns (`error.throw/catch/context` events, error frequency, error types from `error.throw.errorType`). Debugging STRATEGY (hypothesis formation, tool usage) requires development environment data (debugger usage, edit patterns). Embody provides error execution data; tools combine with IDE logs to classify strategy (systematic vs trial-and-error based on error→fix cycles). Config: `errors: "all"`, minimal other events. **Performance**: Low overhead (~1.1x). |
| 5.2 Development pattern analysis | 🧪 | Track whether student writes tests first or after implementation, uses version control checkpoints appropriately, refactors incrementally vs big bang rewrites, providing process quality feedback beyond product assessment | **OUT OF SCOPE**: Requires development environment data (version control history, file timestamps, test writing order). Embody traces execution only, not development timeline or version history. Tools combine execution traces with version control logs, IDE events. No embody-specific config. |
| 5.3 Revision behavior tracking | 🧪 | Analyze code revision patterns (incremental refinement vs complete rewrites, addressing feedback systematically vs ignoring), measuring growth mindset indicators and self-regulation quality | **OUT OF SCOPE**: Requires version control history, diff analysis across commits, feedback correlation. Embody traces single execution, not revision history. Tools use version control data, not execution traces. No embody-specific config. |
| 5.4 Tool usage appropriateness | 📐 | Assess whether student uses professional tools appropriately for task (debugger for logic errors vs print debugging for quick checks, profiler for performance issues, linter for style enforcement), teaching authentic workflows | **OUT OF SCOPE**: Requires IDE logs (debugger usage, profiler runs, linter invocations). Embody traces code execution, not tool usage. Tools analyze IDE telemetry, not execution traces. No embody-specific config. |

---

## Category 6: Comprehension Verification

**Purpose**: Test whether student understands WHY code works

| Use Case | Evidence | What Educational Tools Do | How Trace Data Enables |
|----------|----------|---------------------------|------------------------|
| 6.1 Code explanation assessment | 📐 | Require students to explain their working code's execution model, logic flow, and design decisions in own words, distinguishing memorized patterns from genuine understanding (can explain = understands, can't explain = cargo cult programming) | Execution trace is REFERENCE for validating explanation accuracy, not direct assessment input. Tools compare student explanation to actual trace: if student says "X happens then Y", verify with `sequenceId` ordering; if student says "variable holds value V", verify with `variable.assign.value`. Comprehensive config for complete reference trace (`variables: "all"`, `functions: "all"`, `scopes: "all"`, `controlFlow: "detailed"`). Embody provides ground truth; tools compare student explanation to ground truth. **Performance**: 2.6x (offline validation). |
| 6.2 Prediction task verification | 📐 | Before execution, require prediction of code behavior (output values, execution order, variable states), comparing predictions to actual execution to expose mental model accuracy, revealing whether student understands mechanisms or just recognizes syntax | POE workflow (same as 1.3): comprehensive trace for comparison to predictions. Tools store predictions (values, ordering, states), execute with embody, compute diff (predicted vs actual). Mismatch reveals misconceptions. Config: comprehensive to match prediction granularity (`variables: "all"` for state predictions, `sequenceId` for ordering, `async: "all"` for event loop predictions). **Performance**: 2.6x (comprehension context, offline). |
| 6.3 Concept application tasks | 📐 | Present problem requiring specific concept application (use closures for data hiding, apply scope chain for variable resolution, leverage event loop for async coordination), assessing whether student recognizes appropriate contexts for concepts not just definition recall | Concept-specific events verify correct application: **Closures** (`closure.capture` with expected variables), **Scope chain** (`variable.read` with `resolvedScopeId` showing correct scope lookup), **Event loop** (`microtask.*` with correct ordering). Tools check for concept indicators in trace. Config: concept-focused (closures: `scopes: "all"`; async: `async: "all"`). **Performance**: 1.5-2.0x per concept (focused configs). |
| 6.4 Trace completion exercises | 🔬 | Provide partial execution trace table, student fills missing values/steps, detecting specific misconception patterns from completion errors (skipped initialization indicates declaration/initialization confusion, wrong loop iterations indicate off-by-one misunderstanding) | Complete trace is ground truth for validating student's filled values. Tools generate partial trace (hide some values/events), student completes, compare to full trace. Errors reveal misconceptions (e.g., student skips `variable.declare` if they have auto-initialization misconception). Config: comprehensive for complete ground truth (`variables: "all"`, `controlFlow: "detailed"`). **Performance**: 2.6x (trace generation for ground truth). |
| 6.5 Minimal pair comparison | 📐 | Show nearly identical code pairs with single critical difference (var vs let in loop closure, == vs ===, mutation vs reassignment), student predicts behavior differences and explains cause, isolating specific concept understanding without confounding variables | Execute both code variants with focused config targeting the difference: **var vs let** (needs `variables: "all"`, `scopes: "all"`, `closure.capture`); **== vs ===** (needs `expressions: true` for coercion detection); **mutation vs reassignment** (needs `variable.update` vs `variable.assign`). Tools compute trace diff between variants, verify student correctly predicts difference. Config: focused on difference dimension (reduces overhead vs comprehensive). **Performance**: 1.5-4.6x depending on difference (coercion = expensive, scope = moderate). |

---

## Category 7: Authentic Assessment

**Purpose**: Evaluate performance in professional-realistic contexts

| Use Case | Evidence | What Educational Tools Do | How Trace Data Enables |
|----------|----------|---------------------------|------------------------|
| 7.1 Debug legacy code tasks | 📐 | Present buggy, poorly-documented code (realistic professional scenario) for students to read, comprehend, trace, debug, and fix without breaking other functionality, assessing comprehension-before-production capability and professional debugging workflow | Comprehensive trace of buggy code execution reveals: error location (`error.throw` with `location`, `error.context` with call stack), incorrect values (`variable.assign` showing wrong values), incorrect logic (`conditional.branch` showing unexpected paths). Tools provide trace as debugging aid. After student fix, trace again to verify bug fixed + no regressions. Config: comprehensive (`variables: "all"`, `functions: "all"`, `scopes: "all"`, `errors: "all"`, `controlFlow: "detailed"`). **Performance**: 2.6x (offline debugging context). |
| 7.2 Code review assignments | 🔬 | Students review peer code, identify issues (bugs, quality problems, misconceptions), suggest improvements using professional code review conventions and constructive feedback, developing critical evaluation skills while reinforcing own understanding | Trace of peer code provides execution behavior for review: QLCs quality assessment (same as 4.1-4.6 configs, 1.8x), misconception detection (same as 3.1, 2.6x), correctness verification (test execution). Student reviewer analyzes trace alongside code. Tools provide trace as review artifact. Config: comprehensive to enable multiple review dimensions (`variables: "all"` for quality, `expressions: true` if targeting coercion, `controlFlow: "detailed"` for algorithms). **Performance**: 2.6x (offline review). |
| 7.3 Production bug triage simulation | 📐 | Present error stack traces, logs, and bug reports for categorization by likely cause (which NM or misconception), severity assessment (crash vs incorrect output vs performance), debugging strategy proposal (hypothesis generation, narrowing tactics), simulating professional incident response | Simulated production trace provides bug context: `error.throw` with `errorType`, `error.context` with call stack (correlates to production stack traces), `error.catch` (whether handled). Tools present trace snippets mimicking production logs, student triages (categorize cause, assess severity). Config: `errors: "all"`, relevant context events (`functions: "all"` for call stack). **Performance**: Low overhead (~1.2x, errors are infrequent). |
| 7.4 Refactoring working code | 📐 | Improve code quality (extract functions, clarify naming, reduce complexity, modernize APIs) without changing behavior, requiring deep comprehension (must understand WHY it works to safely improve HOW it works) and professional maintenance skills | Trace before refactoring serves as behavioral specification: comprehensive trace captures all behaviors (`variables: "all"`, `functions: "all"`, `scopes: "all"`, `controlFlow: "detailed"`). After student refactor, trace again. Tools verify traces are behaviorally equivalent (same outputs, same logic flow, allowing implementation differences). Embody provides behavioral equivalence verification. Config: comprehensive (2.6x). **Performance**: 2.6x per trace (before + after refactoring). |
| 7.5 Professional tool integration | 📐 | Assess using authentic developer tools (IDE debuggers, browser DevTools, profilers, linters, type checkers) in realistic workflows, not isolated educational environments, measuring transfer-ready competence | **MOSTLY OUT OF SCOPE**: Tool usage assessment requires IDE telemetry. Embody traces execution as input to professional tools (embody trace → DevTools-like visualization). Tools can consume embody traces in authentic workflows. No embody-specific config (professional tools configure based on their needs). |

---

## Category 8: Adaptive Assessment

**Purpose**: Personalize assessment to student state/level/history

| Use Case | Evidence | What Educational Tools Do | How Trace Data Enables |
|----------|----------|---------------------------|------------------------|
| 8.1 Taxonomy-level adaptive tasks | 📐 | Select task difficulty based on detected SOLO/Block Model/BSI level (Unistructural student gets basic scope tasks, Relational student gets integration challenges), preventing frustration from too-hard tasks or boredom from too-easy tasks | **PARTIALLY IN SCOPE**: Current trace execution reveals taxonomy level (same as 2.2, 3.4 - event pattern complexity indicates level). Adaptive task SELECTION is tool responsibility using detected level. Embody provides execution data for level diagnosis; tools maintain student model, select appropriate tasks. Config: comprehensive for level detection (`variables: "all"`, `scopes: "all"`, `controlFlow: "detailed"`, 2.6x). **Longitudinal student modeling is tool responsibility**. |
| 8.2 Threshold state-responsive feedback | 📐 | Adapt feedback type and frequency to threshold state: pre-threshold gets foundational instruction, liminal gets scaffolding without grading, post-threshold gets minimal hints assuming mastery, supporting each state appropriately | **PARTIALLY IN SCOPE**: Current execution shows threshold behavior (same as 3.3 - threshold-specific events). State classification (pre/liminal/post) requires longitudinal data (multiple traces). Embody provides per-execution data; tools track state across time, adapt feedback based on detected state. Config: threshold-focused (closures: `scopes: "all"`, `closure.capture`; async: `async: "all"`; prototypes: `objects: "all"`, `prototype.lookup`). **Performance**: 1.5-2.3x per threshold. |
| 8.3 Misconception persistence adaptation | 🧪 | Adjust feedback specificity based on error history: first occurrence gets full explanation, repeated occurrence gets reminder reference, persistent pattern triggers intensive review recommendation, balancing support with autonomy development | **PARTIALLY IN SCOPE**: Current trace shows misconceptions (same as 1.2, 3.1). Persistence tracking requires longitudinal data (same misconception across multiple traces). Embody provides per-execution misconception data; tools track occurrence count, adapt feedback specificity. Config: comprehensive misconception detection (`variables: "all"`, `scopes: "all"`, `expressions: true` for coercion, 4.6x). **Performance**: 4.6x with expressions (batch profiling), 2.6x without. **Longitudinal tracking is tool responsibility**. |
| 8.4 Error frequency-based intervention | 🧪 | When student struggles (high error rate, prolonged stuck time, repeated misconceptions), automatically increase feedback immediacy and specificity; when student succeeds, reduce interruptions allowing flow state, maintaining optimal challenge | **PARTIALLY IN SCOPE**: Current trace shows errors (`error.throw`, frequency, types). Struggle detection (prolonged stuck time, repeated errors) requires longitudinal data (multiple attempts over time). Embody provides per-execution error data; tools track error frequency across time, trigger intervention escalation. Config: `errors: "all"`, comprehensive for misconception detection (2.6x). **Time tracking is tool responsibility**. |
| 8.5 Engagement-responsive triggers | 🧪 | Detect productive struggle (attempting variations, reading documentation, incremental progress) vs unproductive frustration (no changes, random edits, giving up signals), offering hints only when struggle becomes unproductive | **MOSTLY OUT OF SCOPE**: Struggle classification requires development environment data (edit patterns, attempt variations, documentation access). Embody provides execution success/failure data (`error.throw`, test pass/fail); tools combine with IDE telemetry to classify struggle type. Minimal embody config (`errors: "all"`, low overhead). |

---

## Category 9: Fairness & Bias Detection

**Purpose**: Ensure equitable assessment across demographics

| Use Case | Evidence | What Educational Tools Do | How Trace Data Enables |
|----------|----------|---------------------------|------------------------|
| 9.1 Psychometric item validation | 🔬 | Apply Item Response Theory analysis to detect assessment items with poor discrimination (doesn't separate high/low performers), inappropriate difficulty (too hard/easy for population), or low information value, enabling evidence-based item selection and scoring calibration | Aggregate trace data across population enables item analysis: extract correctness (test results from trace), quality scores (QLCs from trace), misconception indicators (from comprehensive traces). Tools perform IRT analysis on trace-derived metrics across demographics. Embody provides execution data per student; tools aggregate, perform psychometric analysis. Config: varies by item (correctness = minimal, quality = QLCs 1.8x, comprehension = comprehensive 2.6x). **Population-scale aggregation is tool responsibility**. |
| 9.2 Differential item functioning (DIF) analysis | 🔬 | Detect assessment items that disadvantage specific demographic groups (gender, English proficiency, socioeconomic status, disability status) despite equal overall ability, identifying and removing biased items to ensure fair measurement | Same as 9.1 - aggregate trace data enables DIF detection. Tools stratify trace-derived metrics by demographics, detect items showing disparate impact. Embody provides execution data; tools perform statistical DIF analysis across groups. Config: same as 9.1 (varies by item type). **Demographic data and statistical analysis are tool responsibilities**. |
| 9.3 Bias pattern detection | 🧪 | Analyze whether automated assessment feedback, grading, or quality evaluation shows demographic disparities not explained by actual performance differences, auditing tools for unintended bias introduction | Trace data enables bias auditing: Tools grade/assess using traces (e.g., QLCs quality scoring), then audit if scores differ by demographics controlling for actual performance. Embody provides neutral execution data; tools implement grading algorithms, audit for bias. Config: same as underlying assessment (QLCs = 1.8x, comprehensive = 2.6x). **Bias auditing is tool responsibility using trace-derived scores**. |
| 9.4 Accessibility compliance verification | 📐 | Ensure assessment tasks, tools, and feedback accommodate disabilities (screen reader compatibility, keyboard navigation, color-blind safe visualizations, time extension support), meeting accessibility standards not as afterthought but by design | **MOSTLY OUT OF SCOPE**: Accessibility is UI/tool concern, not execution trace concern. Trace events are neutral data structures (JSON/binary); tools render accessibly. Embody ensures trace data is machine-readable (supports assistive tech consumption); tools implement accessible UI. One embody consideration: time extension (unlimited runtime, no time limits in trace generation). No special config. |

---

## Category 10: Multi-Dimensional Evaluation

**Purpose**: Assess multiple competency dimensions simultaneously

| Use Case | Evidence | What Educational Tools Do | How Trace Data Enables |
|----------|----------|---------------------------|------------------------|
| 10.1 BSI framework assessment | 🔬 | Score Behavior (correct output), Strategy (appropriate algorithm choice, design decisions), and Implementation (syntax quality, idiom usage) as separate dimensions with independent rubrics, recognizing students may excel in some dimensions while struggling in others | **Behavior** (correctness): Test execution traces (pass/fail). **Strategy** (algorithms): Control flow patterns (`loop.*`, `conditional.branch`, recursion from `function.call/return`, detailed config 1.7x). **Implementation** (quality): QLCs config (naming, API usage, 1.8x). Tools score each dimension from trace. Config: combined (`controlFlow: "detailed"`, `variables: "declarations-only"`, `functions: "user-code-only"` = ~2.0x overhead for all three dimensions). **Embody provides execution data; tools implement independent rubrics**. |
| 10.2 Correctness + quality combined grading | 🔬 | Weight functional correctness and code quality independently in final grade (e.g., 40% correctness, 60% quality breakdown), teaching that professional programming requires both working and well-written code from introductory level | **Correctness**: Test execution (minimal overhead). **Quality**: QLCs config (1.8x). Tools weight dimensions (e.g., 40% test pass rate from correctness traces, 60% quality score from QLCs traces). Embody provides both datasets; tools implement weighted grading formula. Config: separate traces or combined (QLCs config sufficient for both if tests are instrumented, ~1.8x). |
| 10.3 Process + product evaluation | 📐 | Assess both development process quality (debugging approach, testing discipline, tool usage, revision strategy) and final product quality (correctness, code quality), recognizing good process produces better products over time | **Process**: MOSTLY OUT OF SCOPE (needs IDE logs, version control). **Product**: Correctness + quality (same as 10.2, 1.8x). Tools combine embody traces (product assessment) with development environment data (process assessment). Embody provides product dimension; tools add process data. Config: QLCs for product (1.8x). |
| 10.4 Knowledge + application integration | 📐 | Test conceptual understanding (explanations, predictions, model descriptions) separately from application skill (writing working code), distinguishing "knows the concepts" from "can apply in practice" and identifying gaps in either dimension | **Knowledge** (comprehension): Prediction task traces for comparison (same as 6.2, comprehensive 2.6x). **Application** (writing code): Correctness + quality from student-written code traces (QLCs 1.8x or comprehensive 2.6x depending on depth). Tools assess both dimensions from separate tasks. Embody provides execution data for both; tools implement separate scoring. Config: comprehensive for knowledge verification (2.6x), QLCs for application quality (1.8x). |

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

**Scope distribution** (from Phase 1 analysis):
- **Fully in scope**: 36 use cases (72%) - Embody provides all needed execution data
- **Partially in scope**: 6 use cases (12%) - Embody provides execution data, tools add external data (longitudinal tracking, IDE logs, demographics)
- **Out of scope**: 8 use cases (16%) - Require non-execution data (static analysis, version control, IDE telemetry)

**Coverage**: All major frameworks from Step 3 represented (Misconceptions, NMs, Thresholds, Taxonomies, QLCs)

**Completeness**: Use cases span full assessment lifecycle (diagnostic → formative → summative), all delivery timings (real-time → retrospective), all feedback types (corrective → socratic), all scales (individual → MOOC)

---

## Performance Summary by Assessment Type

| Assessment Type | Primary Use Cases | Recommended Config | Expected Overhead | Rationale |
|-----------------|-------------------|-------------------|-------------------|-----------|
| **Formative (real-time)** | 1.2-1.5 | QLCs minimal or threshold-focused | 1.8-2.3x | Responsive feedback needed |
| **Formative (coercion)** | 1.2 | Comprehensive + expressions | 4.6x | Batch/selective only |
| **Summative (comprehensive)** | 2.1-2.5 | Comprehensive or QLCs | 1.8-2.6x | Offline acceptable |
| **Diagnostic** | 3.1-3.6 | Comprehensive | 2.6-4.6x | Batch processing |
| **QLCs (individual)** | 4.1-4.6 | QLCs minimal | 1.8x | Real-time quality feedback |
| **QLCs (MOOC aggregate)** | 4.1-4.6 | QLCs + sampling | 1.15x | Near-native, statistical |
| **Comprehension** | 6.1-6.5 | Comprehensive or focused | 1.5-2.6x | Offline, student-paced |
| **Authentic** | 7.1-7.5 | Comprehensive | 2.6x | Async review |
| **Adaptive** | 8.1-8.5 | Varies by dimension | 1.5-4.6x | Profiling + delivery |

**Key principle**: Real-time requires <2x overhead (QLCs configs), batch tolerates >4x (comprehensive + expressions).

---

## Critical Warnings for Tool Developers

⚠️ **Expressions**: `expressions: true` adds ~200% overhead (3x total slowdown). Enable ONLY for type coercion detection. Default: OFF.

⚠️ **Functions "all"**: Includes built-in function calls (Array.map, etc.), adding ~35% overhead. Use `excludeBuiltins: true` unless assessing API usage. Default: `"user-code-only"`.

⚠️ **Sampling**: Acceptable for AGGREGATE statistics (MOOC-scale QLCs), NOT for individual feedback. Loses event precision.

⚠️ **Event limits**: Use `maxEvents` to protect against infinite loops in student code. Recommended: 50,000 for large programs.

⚠️ **Longitudinal tracking**: Threshold state detection, misconception persistence, adaptive profiling require MULTIPLE traces over time. Embody provides per-execution data; tools maintain student history.

⚠️ **Out-of-scope use cases**: 8 use cases (16%) require non-execution data (static analysis, version control, IDE logs). Tools must combine embody traces with external data sources.

---

## Boundary Compliance Summary

**Embody provides** (neutral infrastructure):
- Execution event data (30+ event types)
- Configurable granularity (8 dimensions)
- Serialized values and object/function IDs
- Sequence ordering for async contexts
- Performance options (sampling, streaming, limits)

**Tools decide** (educational intelligence):
- Pedagogical interpretation (which patterns = which misconceptions)
- Feedback generation (what to say, when, how)
- UI/visualization rendering
- Grading rubrics and scoring algorithms
- Student modeling and longitudinal tracking
- Integration with external data (IDE logs, version control, demographics)
- Adaptive task selection and intervention triggering

**Step 5 complete**: Column 4 added to all 50 use cases, specifying HOW trace data enables educational goals while maintaining strict embody boundary (infrastructure vs intelligence).
