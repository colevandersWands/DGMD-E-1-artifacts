# Step 4 Extraction Notes

**Purpose**: Extract assessment needs from Step 3 documents to inform use case creation

**Format**: [Framework concept] → [Assessment need] → [What tools must do]

---

## From: misconception-driven-assessment.md (1093 lines)

### Misconception Category Assessments

#### 1. Sequential Execution Model Assessment

**Framework concept**: Students struggle with statement sequentiality (Qian & Lehman 2017, 85%+ frequency)

**Assessment need**: Detect when students expect future code to affect past code, or believe variable values "update everywhere" automatically

**What tools must do**:
- Enable predict-then-trace exercises where students predict variable values at specific lines
- Visualize sequential state changes to reveal execution model
- Detect read-before-write patterns indicating sequential execution confusion
- Provide trace tables showing step-by-step state evolution

**Evidence basis**: 🔬 Established (Tier 1 universal misconception)

---

#### 2. Function Execution Model Assessment

**Framework concept**: Return vs print confusion (70% frequency), parameter vs argument distinction (70%), call vs definition confusion

**Assessment need**: Detect when students confuse console.log with return, misunderstand parameter binding, or conflate function definition with invocation

**What tools must do**:
- Show function call with parameter binding, execution, and return value flow
- Enable modified code prediction tasks ("change print to return—what changes?")
- Trace parameter mutation for primitives vs objects
- Highlight early returns and unreachable code
- Compare student predictions to actual execution traces

**Evidence basis**: 🔬 Established (Tier 1 universal misconception)

---

#### 3. Variable Lifecycle Assessment

**Framework concept**: Auto-initialization assumption (65% frequency), scope confusion, TDZ violations

**Assessment need**: Detect uninitialized variable reads, out-of-scope references, read-before-declaration in block scope

**What tools must do**:
- Detect variable reads before first assignment (undefined usage)
- Track variable lifetime across scope boundaries
- Identify TDZ violations (let/const read before declaration)
- Visualize scope enter/exit and variable accessibility
- Provide SOLO-aligned assessment (basic scope before TDZ complexity)

**Evidence basis**: 🔬 Established (Tier 1, 65% frequency)

---

#### 4. Reference vs Value Semantics Assessment

**Framework concept**: Binary thinking (everything is pass-by-value OR pass-by-reference), missing JavaScript's nuanced reality

**Assessment need**: Detect confusion between mutation and reassignment, aliasing misunderstanding, memory model gaps

**What tools must do**:
- Enable prediction tasks with object diagrams showing memory model
- Present debugging tasks involving unintended aliasing
- Assess design appropriateness (when to mutate vs create new object)
- Provide minimal pair comparisons (primitive vs object parameter passing)
- Visualize multiple variables pointing to same object

**Evidence basis**: 🔬 Established (Tier 1 universal)

**Taxonomy integration**: Block Model Level 2 (execution) vs Level 3 (why/memory model), BSI Strategy dimension

---

#### 5. Asynchronous Execution Assessment

**Framework concept**: Event loop confusion, microtask vs macrotask misunderstanding, await timing vagueness

**Assessment need**: Assess understanding of event loop phases, promise resolution timing, async/await execution flow

**What tools must do**:
- Enable prediction of async operation ordering
- Visualize microtask queue vs macrotask queue separately
- Show execution context switches at await points
- Support SOLO progression from setTimeout basics → promises → async/await
- Provide authentic debugging scenarios with timing bugs

**Evidence basis**: 🔬 Established (Tier 2 JavaScript-specific)

**SOLO progression**:
- Unistructural: "setTimeout delays execution"
- Multistructural: "Promises and setTimeout both delay, differently"
- Relational: "Event loop phases determine execution order"
- Extended Abstract: Transfer to generators, workers

---

#### 6. Closure and Scope Assessment

**Framework concept**: "Closures remember values" (really references), loop+var+closure classic mistake, nested scope confusion

**Assessment need**: Detect closure variable capture misconceptions, loop closure bugs, scope chain misunderstanding

**What tools must do**:
- Show variable capture at creation vs use timing
- Analyze scope chain to show which scope provided binding
- Detect loop+var+closure pattern automatically
- Distinguish syntax knowledge from execution understanding from design appropriateness (BSI dimensions)
- Provide multiple closure instances showing separate captured variables

**Evidence basis**: 🔬 Established (Tier 2 JavaScript-specific)

**BSI integration**: Behavior (correct output) vs Strategy (appropriate usage) vs Implementation (idiomatic patterns)

---

#### 7. Type Coercion Assessment

**Framework concept**: == vs === confusion, unexpected coercion, typeof surprises

**Assessment need**: Assess understanding of coercion rules, defensive coding practices, edge case awareness

**What tools must do**:
- Show step-by-step coercion in expressions
- Detect == vs === usage patterns
- Enable prediction of coercion results
- Provide level-appropriate assessment (beginners: use ===, intermediates: common patterns, advanced: edge cases)
- Cannot assess intent (whether coercion was intentional)

**Evidence basis**: 🔬 Established (Tier 2 JavaScript-specific)

---

#### 8. Context Binding (`this`) Assessment

**Framework concept**: `this` determined at call time not definition time, arrow functions' lexical binding, extracted method context loss

**Assessment need**: Assess understanding of `this` binding rules, arrow function differences, context preservation techniques

**What tools must do**:
- Show `this` value at each call site
- Enable prediction of `this` based on call type
- Present debugging tasks with lost context bugs
- Assess design decisions (arrow vs regular functions for Strategy dimension)
- Trace .bind()/.call()/.apply() usage

**Evidence basis**: 🔬 Established (Tier 2 JavaScript-specific)

**Taxonomy integration**: Block Model Level 2 (trace `this` values) vs Level 3 (understand why), SOLO Relational (integrate with closures + arrows)

---

### Assessment Approach Patterns

#### 9. Predict-Observe-Explain (POE) Cycle

**Framework concept**: Predictions expose mental models, reality provides counterevidence, cognitive dissonance drives learning

**Assessment need**: Enable structured prediction tasks where students commit to prediction before execution

**What tools must do**:
- Record student predictions before showing execution
- Execute code and provide actual trace
- Highlight discrepancies between prediction and reality
- Prompt explanation of differences to reveal mental model
- Compare predictions to actual trace events at fine granularity

**Evidence basis**: 📐 Framework (POE is established pedagogy, application to trace-based assessment is framework)

---

#### 10. Trace Completion Tasks

**Framework concept**: Step-by-step execution model understanding through trace table completion

**Assessment need**: Test sequential execution understanding by having students fill in trace tables

**What tools must do**:
- Provide partial trace tables for students to complete
- Detect specific misconception patterns from completion errors:
  - Skipped initialization → doesn't understand declaration vs initialization
  - Wrong loop iterations → off-by-one, boundary confusion
  - Wrong variable updates → addition vs concatenation, sequencing errors
- Compare student completions to actual trace

**Evidence basis**: 🔬 Established (trace tables are established pedagogy)

---

#### 11. Code Classification Tasks

**Framework concept**: Pattern recognition at transitional abstraction level (Abstraction Transition framework)

**Assessment need**: Test whether students can identify patterns across examples (closures, recursion, design patterns)

**What tools must do**:
- Present multiple code examples for categorization
- Detect misconception patterns from classifications:
  - Overgeneralization (thinks all nested functions are closures)
  - Undergeneralization (only recognizes one pattern variant)
  - Correct selection but wrong explanation (rote learning)
- Assess transitional abstraction level understanding

**Evidence basis**: 📐 Framework (pattern recognition established, trace-based implementation is framework)

---

#### 12. Error Diagnosis Tasks

**Framework concept**: Metacognitive skill of connecting error symptoms to underlying misconceptions

**Assessment need**: Test whether students can categorize errors by misconception type

**What tools must do**:
- Present error messages with context
- Ask students to identify misconception category
- Assess metacognitive skill for self-diagnosis
- Cannot determine root cause from error alone (need execution context)

**Evidence basis**: 📐 Framework (metacognition established, misconception categorization is framework)

---

#### 13. Minimal Pair Comparison

**Framework concept**: Isolate specific misconception by changing single element between two examples

**Assessment need**: Precisely diagnose which aspect of a concept is misunderstood

**What tools must do**:
- Present nearly identical code pairs with single critical difference
- Compare student predictions on both versions
- Use diagnostic logic to pinpoint specific misconception:
  - Correct on primitives but not objects → understands value passing, not reference sharing
  - Correct on objects but not primitives → thinks everything is pass-by-reference
  - Incorrect on both → fundamental confusion

**Evidence basis**: 📐 Framework (contrast cases established pedagogy, systematic application to misconceptions is framework)

---

#### 14. Automated Pattern Detection

**Framework concept**: Trace-based implicit assessment without explicit testing (Lehtinen 2023 QLCs)

**Assessment need**: Detect misconception patterns during normal coding practice

**What tools must do**:
- Analyze trace patterns to detect misconceptions:
  - Uninitialized reads (read events before assign events)
  - Closure misuse (captured variables, unexpected values)
  - Async timing bugs (execution order violations)
- Perform formative assessment during practice (no test anxiety, authentic context)
- Cannot determine if error was misconception vs typo vs exploration

**Evidence basis**: 🔬 Established (QLCs framework, Lehtinen et al. 2023)

**What traces cannot determine** (requires prediction/explanation tasks):
- Student's mental model
- Whether error was misconception vs typo
- Why student chose approach

---

#### 15. Cross-Session Misconception Tracking

**Framework concept**: Longitudinal tracking reveals misconception persistence, improvement, regression

**Assessment need**: Track whether student repeats same misconception across sessions

**What tools must do**:
- Maintain misconception history per student
- Detect persistence (same pattern repeatedly)
- Identify improvement (frequency decreasing)
- Flag regression (resolved misconception reappears)
- Inform intervention timing (how long misconceptions persist on average)

**Evidence basis**: 🧪 Extension (logical but not empirically validated in CS education)

**Research gap**: No large-scale data on misconception persistence timelines, resolution predictors

---

#### 16. Formative Immediate Feedback

**Framework concept**: Feedback timing, specificity, actionability affect learning (Keuning et al. 2019)

**Assessment need**: Provide misconception-specific feedback at appropriate timing and specificity levels

**What tools must do**:
- Provide feedback at multiple levels:
  - Generic: "Incorrect" (lowest value)
  - Location: "Error on line 5" (slightly better)
  - Type: "ReferenceError" (better)
  - Misconception: "Reading before initialization—no auto-init to 0" (high value)
  - Corrective: "Add let sum = 0; before loop. Variables are undefined until assigned" (highest value)
- Time feedback appropriately:
  - Immediate for syntax/procedural
  - Slightly delayed for conceptual patterns (requires multiple instances)
  - End-of-session for metacognitive reflection
- Make mental model explicit in feedback
- Connect to related concepts (SOLO Relational)
- Provide contrast cases (primitives vs objects)
- Scaffold correction rather than providing solution
- Distinguish error from underlying misconception

**Evidence basis**: 📐 Framework (general feedback principles established, misconception-specific application needs CS validation)

---

#### 17. Summative Misconception Verification

**Framework concept**: Verify misconceptions resolved before advancing (learning progression)

**Assessment need**: Comprehensive assessment sampling representative misconceptions from each tier

**What tools must do**:
- Sample misconceptions by tier (Tier 1: 50%, Tier 2: 35%, Tier 3: 15%)
- Assess at multiple Bloom's levels:
  - Knowledge: Identify misconceptions from errors
  - Comprehension: Explain why code exhibits misconception
  - Application: Fix code with misconception
  - Analysis: Predict behavior with potential misconceptions
  - Evaluation: Review peer code for misconceptions
- Integrate with taxonomies (SOLO, Block Model, BSI)
- Balance comprehensiveness with avoiding edge-case trivia

**Evidence basis**: 📐 Framework (taxonomy alignment established, misconception-specific summative design is framework)

---

#### 18. Diagnostic Pre-Assessment

**Framework concept**: Identify existing misconceptions before instruction (from prior courses, self-teaching, other languages)

**Assessment need**: Detect misconceptions students bring to course

**What tools must do**:
- Administer pre-assessment before instruction begins
- Identify misconception patterns from prior learning
- Enable diagnostic inference from responses:
  - Pass-by-reference for primitives
  - Variable auto-initialization
  - Closure + loop variable confusion
- Inform instructor which misconceptions to address explicitly
- Guide curriculum planning based on pre-existing misconceptions

**Evidence basis**: 📐 Framework (pre-assessment established, misconception-specific diagnostic is framework)

---

#### 19. Authentic Assessment Tasks

**Framework concept**: Assessment resembles professional practice (Gulikers 2004 five-dimensional framework)

**Assessment need**: Test misconception understanding in realistic professional contexts

**What tools must do**:
- Present realistic professional scenarios:
  - Debug legacy code (tests all misconception categories in realistic distribution)
  - Code review comments (identify misconceptions in peer code)
  - Production bug triage (categorize by likely misconception)
  - Refactor working code (detect latent misconceptions)
- Assess application in context, not isolated knowledge
- Test whether students can apply understanding professionally

**Evidence basis**: 📐 Framework (authentic assessment established, misconception-specific application is framework)

**Comparison**:
- Non-authentic: "What is a closure?" (definition recall)
- Authentic: "This event handler has memory leak. Identify closure issue and fix it." (professional debugging)

---

### Assessment Design Integration with Taxonomies

#### 20. SOLO Taxonomy × Misconception Complexity Alignment

**Framework concept**: Misconception complexity must match SOLO level (from taxonomy-assessment-alignment.md)

**Assessment need**: Don't test complex integrated misconceptions before student reaches Relational level

**What tools must do**:
- Align misconception assessment with SOLO level:
  - Prestructural: Detect total confusion (no coherent structure)
  - Unistructural: Single-concept misconceptions (auto-initialization)
  - Multistructural: Multi-concept confusion (return AND print conflation)
  - Relational: Integration misconceptions (closures work in functions but not arrows)
  - Extended Abstract: Transfer failures (can't apply pattern to novel context)
- Match assessment task complexity to student's current SOLO level
- Don't assess TDZ before basic scope mastery

**Evidence basis**: 📐 Framework (SOLO taxonomy established, misconception complexity mapping is framework)

---

#### 21. Block Model × Misconception Type Mapping

**Framework concept**: Misconception type indicates required intervention (Block Model levels)

**Assessment need**: Classify misconceptions by Block Model level to guide intervention

**What tools must do**:
- Categorize misconceptions by level:
  - Level 1 (Text Surface): Syntax misconceptions (const vs let, function vs function())
  - Level 2 (Program Model): Execution misconceptions (return vs print, sequential execution)
  - Level 3 (Situation Model): Strategic misconceptions (used loop when recursion appropriate)
- Recommend intervention by level:
  - Level 1 → Syntax teaching (linters, references)
  - Level 2 → Tracing practice (debuggers, trace tables)
  - Level 3 → Problem analysis (design review, strategy discussion)

**Evidence basis**: 📐 Framework (Block Model established, misconception classification is framework)

---

#### 22. BSI Framework × Quality Assessment Integration

**Framework concept**: Traditional assessment focuses on Behavior (output), QLCs enable Strategy and Implementation assessment

**Assessment need**: Assess multiple dimensions of code quality to detect non-behavioral misconceptions

**What tools must do**:
- Assess across BSI dimensions:
  - Behavior: Detect unexpected outputs, edge case failures
  - Strategy: Detect approach misconceptions (algorithm choice, efficiency)
  - Implementation: Detect syntax/idiom misconceptions (anti-patterns, non-idiomatic code)
- Distinguish between:
  - Misconception (incorrect understanding)
  - Inexperience (correct understanding, immature implementation)
- Enable quality assessment beyond correctness testing

**Evidence basis**: 📐 Framework (BSI and QLCs established, integration for misconception detection is framework)

**Example**: Correct fibonacci implementation but with temp variable instead of destructuring - not a misconception, just inexperience

---

### Feedback Delivery Mechanisms

#### 23. Inline Annotation Feedback

**Framework concept**: Location-specific immediate feedback at point of misconception

**Assessment need**: Provide feedback directly in code context

**What tools must do**:
- Annotate code with misconception warnings at specific lines
- Provide immediate, location-specific explanations
- Balance visibility with interface clutter
- Avoid interrupting flow excessively

**Evidence basis**: 🧪 Extension (inline feedback common but not specifically validated for misconceptions)

**Tradeoff**: Immediate + location-specific vs cluttered interface + flow interruption

---

#### 24. Interactive Trace Visualization with Feedback

**Framework concept**: Student-discovered problems confirmed by feedback more effective than passive telling

**Assessment need**: Enable discovery through trace exploration, confirm with feedback

**What tools must do**:
- Allow students to step through code and inspect variable values
- Let students notice problems (undefined values, unexpected behavior)
- Provide explanatory feedback when student identifies issue
- Enable guided discovery through interaction

**Evidence basis**: 📐 Framework (guided discovery established, trace-based implementation is framework)

**Advantage**: Student discovers problem, feedback confirms understanding (active learning)

---

#### 25. Misconception Dashboard / Progress Tracking

**Framework concept**: Metacognitive awareness through longitudinal misconception tracking

**Assessment need**: Show students their misconception profile and progress over time

**What tools must do**:
- Maintain longitudinal misconception data per student
- Categorize misconceptions as:
  - Resolved (not seen recently)
  - Improving (frequency decreasing)
  - Persistent (not improving)
- Provide progress visualization
- Enable metacognitive awareness
- Handle privacy concerns appropriately

**Evidence basis**: 🧪 Extension (metacognitive tracking logical but not validated for misconceptions)

**Requirements**: Longitudinal data collection, privacy safeguards

---

#### 26. Peer Comparison Feedback (Anonymized)

**Framework concept**: Social proof and normalization reduce discouragement

**Assessment need**: Show students that misconceptions are common, others struggle too

**What tools must do**:
- Aggregate misconception data across cohort
- Show anonymized patterns ("40% of students make this mistake")
- Highlight effective patterns from successful students
- Provide social proof ("others struggle too")
- Balance information with potential discouragement

**Evidence basis**: 🧪 Extension (social comparison common but not validated for misconception feedback)

**Tradeoff**: Normalization + social proof vs potential discouragement

---

### Tool Development and Research Opportunities

#### 27. Validated Diagnostic Instrument Development

**Framework concept**: Few validated misconception assessment instruments exist despite decades of research

**Assessment need**: Create, validate, and share standardized misconception diagnostics

**What tools must do**:
- Collect trace data + assessment responses at scale
- Correlate automated detection with assessment performance
- Apply Item Response Theory analysis (difficulty, discrimination, guessing)
- Validate that pattern detection predicts assessment performance
- Conduct Differential Item Functioning studies (demographic bias detection)
- Publish validated instruments for community use

**Evidence basis**: Research gap (Ko et al. 2019, 2021)

**Opportunity**: Empirical validation of diagnostic instruments at MOOC scale

---

#### 28. Detection Accuracy Measurement

**Framework concept**: Trace-based misconception detection exists but accuracy rates largely unreported

**Assessment need**: Validate automated detection accuracy

**What tools must do**:
- Create expert-labeled misconception dataset (ground truth)
- Implement automated detection patterns
- Compare automated detection to expert labels
- Report standard metrics: precision, recall, F1, ROC curves
- Distinguish misconception from typo/experimentation
- Iterate on patterns to improve accuracy
- Publish accuracy benchmarks for comparison across tools

**Evidence basis**: Research gap (Lehtinen 2023 demonstrates QLCs but no accuracy validation)

**Gap**: No precision/recall data, false positive rates unreported

---

#### 29. Feedback Effectiveness Experimentation

**Framework concept**: "Insufficient empirical evaluation" of feedback systems (Keuning et al. 2019)

**Assessment need**: Validate effectiveness of misconception-specific feedback

**What tools must do**:
- Implement A/B testing infrastructure for feedback types
- Compare feedback levels:
  - Generic vs location vs type vs misconception vs corrective
  - Immediate vs delayed timing
  - Various specificity levels
- Measure learning outcomes (pre/post assessment)
- Track engagement (do students read explanations?)
- Conduct longitudinal follow-up (do misconceptions stay resolved?)
- Publish experimental results

**Evidence basis**: Research gap (Keuning et al. 2019 systematic review)

**Questions to answer**: Does misconception-specific feedback improve learning? What specificity level is optimal? Does timing matter?

---

#### 30. Longitudinal Persistence Research

**Framework concept**: No large-scale data on misconception persistence and resolution timelines

**Assessment need**: Understand how long misconceptions persist and what resolves them

**What tools must do**:
- Track misconceptions longitudinally across student careers
- Measure time from detection to resolution
- Identify intervention effectiveness patterns
- Detect individual variation in resolution speed
- Determine prerequisite relationships (which misconceptions must be resolved before others)
- Inform curriculum pacing (if closures take 3 weeks average, don't assess after 1 week)

**Evidence basis**: Research gap (no published longitudinal data)

**Pedagogical value**: Evidence-based curriculum pacing and intervention timing

---

## Summary Statistics from misconception-driven-assessment.md

**Total assessment needs extracted**: 30

**Evidence basis distribution**:
- 🔬 Established: 13 (misconception categories, trace tables, QLCs, authentic assessment)
- 📐 Framework: 12 (POE, taxonomy alignment, feedback design, BSI integration)
- 🧪 Extension: 5 (cross-session tracking, dashboard, peer comparison, research opportunities)

**Categories**:
- Misconception-specific assessments: 8
- Assessment approach patterns: 11
- Taxonomy integration: 3
- Feedback delivery: 4
- Research opportunities: 4

**Next**: Extract from threshold-aware-assessment-design.md

---

## From: nm-assessment-strategies.md (1026 lines)

### Foundation Layer Notional Machine Assessments

#### 31. Creation/Execution Phase Model Assessment

**Framework concept**: JavaScript executes in two phases—parse time (hoisting, TDZ) and runtime (sequential execution)

**Assessment need**: Validate understanding of hoisting (var, function), TDZ (let, const), temporal ordering

**What tools must do**:
- Enable prediction tasks for hoisting behavior ("What prints? console.log(x); var x = 5;")
- Test TDZ understanding ("What error? console.log(y); let y = 5;")
- Provide ordering tasks (parse vs execution phase understanding)
- Assess at multiple levels:
  - Beginner: Identify hoisting when explicit
  - Intermediate: Predict var hoisting, recognize TDZ
  - Advanced: Explain phase model systematically, predict edge cases

**Evidence basis**: 🔬 Established (Sorva 2013, Fincher & Jeuring 2020 - NM theory)

**Taxonomy integration**:
- SOLO: Unistructural (recognize hoisting) → Multistructural (distinguish var/let/const) → Relational (integrate phases)
- Block Model Level 2: Trace execution through phases
- Block Model Level 3: Explain WHY phases exist

---

#### 32. Memory Model Assessment

**Framework concept**: Stack (primitives, references) vs heap (objects), stack frames, garbage collection

**Assessment need**: Validate understanding of stack/heap storage, aliasing, reference semantics, GC

**What tools must do**:
- Enable memory diagram tasks ("Draw memory state after each line")
- Test aliasing understanding (shared object references)
- Assess GC reasoning ("Is object garbage collected after this?")
- Test shallow vs deep copy understanding
- Make abstract memory model visible through diagrams
- Compare student predictions to actual trace events

**Evidence basis**: 🔬 Established (core NM for understanding memory)

**Assessment challenges**:
- Memory is invisible (needs visualization)
- Aliasing is subtle (hard to track)
- GC is invisible (no direct observation)

**Solution strategies**:
- Explicit diagrams (stack/heap states)
- Prediction with diagrams
- Trace-based verification

**SOLO progression**: Unistructural (knows variables store values) → Relational (integrates stack/heap/references)

---

#### 33. Expression Layer Assessment

**Framework concept**: Expressions evaluate via precedence, associativity, short-circuit, coercion rules

**Assessment need**: Validate understanding of evaluation order, operator types, composition, short-circuit behavior

**What tools must do**:
- Test precedence understanding (`2 + 3 * 4` equals?)
- Test associativity (`10 - 5 - 2` equals?)
- Test short-circuit behavior (`false && expensive()` - does it run?)
- Show type coercion in expressions (`"5" + 3` vs `"5" - 3`)
- Display evaluation order for nested expressions
- Show which subexpressions were skipped (short-circuit)

**Evidence basis**: 🔬 Established (foundational programming concept)

**BSI connection**: Strategy-adjacent (operator choice affects algorithm design)

---

#### 34. Call Stack Model Assessment

**Framework concept**: Function calls create LIFO stack frames containing local variables and parameters

**Assessment need**: Validate understanding of frame creation/destruction, local scope, recursion, return value flow

**What tools must do**:
- Enable stack diagram tasks ("Draw stack after each call")
- Test recursion depth understanding ("How many frames when factorial(3) calls factorial(2)?")
- Assess local vs global variable understanding
- Show return value flow through stack
- Track stack depth during execution
- Visualize frame push/pop at call/return

**Evidence basis**: 🔬 Established (core execution model)

**Connections**: Foundation for scope chain, memory model (frames on stack), variable lifecycle

**SOLO progression**: Unistructural (functions have "own" variables) → Relational (integrate stack with scope/params/return)

**Assessment timing**: After memory model (uses stack concept), before closures (closures extend frame lifetime)

---

#### 35. Scope Chain Assessment

**Framework concept**: Lexical scoping, scope nesting, closure capture, block vs function scope

**Assessment need**: Validate understanding of lexical scope, nesting, shadowing, closure, let/const vs var

**What tools must do**:
- Test variable resolution ("Which `x` accessed?" with shadowing)
- Assess closure understanding (classic var-in-loop problem)
- Test block vs function scope (let/const vs var)
- Detect shadow patterns (inner hides outer)
- Show scope chain traversal for variable resolution
- Visualize closure capture (which variables, when)
- Display scope enter/exit and variable lifetime

**Evidence basis**: 🔬 Established (fundamental scoping model)

**Multi-level assessment**:
1. Syntactic: Identify closures
2. Behavioral: Predict what closures capture/access
3. Conceptual: Explain WHY closures capture references not values
4. Design: Choose when closures appropriate

**BSI mapping**:
- Implementation: Syntax (function in function)
- Behavior: What closure does (accesses outer variable)
- Strategy: When to use closures (data hiding, callbacks)

---

#### 36. Reference vs Value Semantics Assessment

**Framework concept**: Primitives copy value, objects copy reference (aliasing)

**Assessment need**: Validate understanding of mutation vs reassignment, aliasing, parameter passing semantics

**What tools must do**:
- Test aliasing prediction (`let a = {x:5}; let b = a; b.x = 10; //a.x?`)
- Distinguish mutation vs reassignment (`obj = {}` vs `obj.prop = null`)
- Test parameter passing understanding
- Test array operation semantics (`arr.push(5)` vs `arr = arr.concat([5])`)
- Show object creation and reference copying
- Visualize aliasing (multiple variables → same object)
- Track mutations vs reassignments

**Evidence basis**: 🔬 Established (Tier 1 misconception, 85%+ frequency)

**Connection**: Application of memory model concepts

**Assessment progression**:
1. Concrete: Predict specific code
2. Categorization: Classify mutation vs reassignment
3. Design: Choose appropriate semantics
4. Debugging: Identify unintended aliasing bugs

**Authentic assessment**: Professional code has aliasing bugs (realistic scenarios)

---

### Execution Layer Notional Machine Assessments

#### 37. Event Loop Model Assessment

**Framework concept**: Single-threaded event loop, task queue (macrotasks), microtask queue, run-to-completion

**Assessment need**: Validate understanding of single-threaded execution, queue priority, async≠concurrent, phases

**What tools must do**:
- Test execution order prediction (setTimeout vs Promise vs sync)
- Test queue priority understanding (microtasks before macrotasks)
- Assess concurrency model ("Can two functions execute simultaneously?")
- Test await behavior ("What runs while await waits?")
- Visualize task queue, microtask queue, call stack separately
- Show queue enqueue/dequeue events
- Display async/await suspension/resumption
- Track Promise state changes

**Evidence basis**: 🔬 Established (Tier 2 JavaScript-specific concept)

**Assessment difficulty**: Event loop is invisible (no direct observation without tools)

**Solution**: Trace visualization or prediction tasks requiring mental simulation

**SOLO progression**:
- Unistructural: "setTimeout delays execution"
- Multistructural: Distinguish setTimeout/Promises/await
- Relational: Integrate queues/phases/priorities into unified model
- Extended Abstract: Predict complex async patterns (race conditions, Promise.all)

**Assessment timing**: After call stack, after closures (callbacks use closures)

---

#### 38. Prototype Chain Assessment

**Framework concept**: Objects have [[Prototype]] link, property lookup walks chain, delegation not copying

**Assessment need**: Validate understanding of chain linkage, property lookup, own vs inherited, constructor.prototype

**What tools must do**:
- Enable chain diagram tasks ("Draw prototype chain")
- Test property resolution ("Where is prop found? Own? Prototype?")
- Test live updates ("Add method to prototype—do existing objects gain it?")
- Test instanceof understanding
- Visualize prototype links between objects
- Show property lookup traversal through chain
- Track prototype modifications and effects

**Evidence basis**: 🔬 Established (JavaScript object model)

**Connection**: Memory model (prototype chain is graph of heap objects)

**Assessment progression**: Syntactic (identify relationships) → Behavioral (predict lookups) → Conceptual (explain delegation) → Design (choose patterns)

**Modern note**: class syntax hides prototypes—assess whether students understand mechanism or only syntax

---

#### 39. This Binding Assessment

**Framework concept**: `this` determined by call-site (not definition), binding rules (new > explicit > implicit > default)

**Assessment need**: Validate understanding of call-site binding, method calls, arrow lexical binding, explicit binding

**What tools must do**:
- Test call-site analysis ("What is `this` at each call site?")
- Test method extraction bugs (`const f = obj.method; f(); //this?`)
- Compare arrow vs regular functions (`this` behavior)
- Test explicit binding (.call/.apply/.bind)
- Show `this` value at each function call
- Track arrow function `this` capture (lexical)
- Display .call/.apply/.bind effects

**Evidence basis**: 🔬 Established (Tier 2 JavaScript-specific)

**Assessment challenge**: Complex rules, students memorize without understanding

**Solution**: Systematic assessment of each rule separately, then integration

**Taxonomy**:
- SOLO Multistructural: Individual binding rules
- SOLO Relational: Integrate rules into call-site decision algorithm
- Block Model Level 3: Understand WHY rules exist (flexibility, method borrowing)

---

### OOP Layer Notional Machine Assessments

#### 40. Static vs Instance Members Assessment

**Framework concept**: Instance members on objects/prototype, static members on constructor, separate access

**Assessment need**: Validate understanding of instance vs static storage/access, `this` in static methods

**What tools must do**:
- Test access syntax ("How call static method?")
- Test `this` in static context ("What is `this` in static method?")
- Test member classification ("Which methods static? Instance?")
- Test design reasoning ("Should this be static or instance? Why?")
- Distinguish static vs instance method calls in traces
- Show property access on constructor vs instance
- Display `this` value in static methods

**Evidence basis**: 📐 Framework (OOP concepts established, JavaScript-specific assessment is framework)

**BSI mapping**:
- Behavior: Static executes without instance
- Strategy: When to use static (utility, factory methods)
- Implementation: Syntax for static vs instance

---

#### 41. Class Syntax Assessment

**Framework concept**: class is syntactic sugar over prototypes (constructor + prototype methods)

**Assessment need**: Validate understanding of class desugaring, constructor method, class methods, extends mechanism

**What tools must do**:
- Test desugaring ("Rewrite class using function+prototype")
- Test equivalence ("Are these equivalent?" class vs function)
- Test inheritance understanding ("What does extends do to prototype chain?")
- Test field initialization timing
- Show class instantiation (constructor execution)
- Track method calls (prototype lookup)
- Display field initialization events
- Show super calls (parent invocation)

**Evidence basis**: 📐 Framework (class syntax established, underlying prototype assessment is framework)

**Pedagogical debate**: Prototypes first vs class first vs class only

**Assessment depends on pedagogy**:
- If prototypes taught: Assess desugaring
- If class-only: Assess class semantics without prototype references

---

#### 42. Type Coercion Assessment (Advanced)

**Framework concept**: Implicit type conversion follows algorithmic rules (ToPrimitive, ToNumber, ToString, ToBoolean)

**Assessment need**: Validate understanding of coercion triggers, rules, truthiness, == vs ===, edge cases

**What tools must do**:
- Test coercion prediction (`"5" + 3` vs `"5" - 3`)
- Test truthiness (which values falsy)
- Test equality (== vs ===, why `[] == false`?)
- Test edge cases (`typeof null`, `NaN !== NaN`)
- Show type coercion events in expressions
- Display operator evaluation with type checks
- Track truthiness testing in conditionals

**Evidence basis**: 🔬 Established (JavaScript type system)

**Assessment philosophy**: Balance practical ("use ===") vs comprehensive ("understand deeply")

**Recommendation**:
- Intermediate: Practical rules (===, explicit conversion)
- Advanced: Deep understanding (ToPrimitive algorithm)

---

### Integration Assessment Patterns

#### 43. Multi-NM Coordination Assessment

**Framework concept**: Real programming requires coordinating multiple notional machines simultaneously

**Assessment need**: Test whether students can integrate multiple NMs in complex scenarios

**What tools must do**:
- Present tasks requiring 3-5 NMs simultaneously
- Enable complete trace with multi-NM annotations
- Support misconception diagnosis with NM attribution ("Which NM does student misunderstand?")
- Provide design tasks requiring NM application (e.g., "Implement cache with auto-expiration")
- Assess at progressive levels:
  - Level 1: Adjacent NMs (2-3)
  - Level 2: Subsystem integration (3-5)
  - Level 3: Full system (5+)
- Score integration understanding separately from individual NM mastery

**Evidence basis**: 📐 Framework (integration importance established, specific assessment strategies are framework)

**Example integration**: Counter with closure + event loop + scope chain + reference semantics + call stack

**Assessment timing**: Only after individual NMs solidly understood

---

### Assessment Strategy Patterns by NM Characteristics

#### 44. Invisible NM Visualization

**Framework concept**: Some NMs are runtime behavior (invisible), others are code syntax (visible)

**Assessment need**: Make invisible NMs visible for assessment

**What tools must do**:
- For visible NMs (syntax, operators): Support direct code inspection
- For invisible NMs (memory, scope, event loop, prototypes): Provide traces, diagrams, mental simulation support
- Enable different assessment modalities:
  - Memory: Stack/heap diagrams
  - Scope: Nested scope visualization
  - Event Loop: Queue visualization
  - Prototype: Chain diagrams
- Compare predicted diagrams/traces to actual execution

**Evidence basis**: 📐 Framework (visibility concept established, assessment implication is framework)

**Critical point**: Invisible NMs cannot be fully assessed without execution traces or student-produced diagrams

---

#### 45. NM Prerequisite-Aware Assessment

**Framework concept**: NMs have dependency relationships (can't understand closures without scope chain)

**Assessment need**: Assess NMs in dependency order, diagnose specific gaps

**What tools must do**:
- Enforce assessment sequencing based on dependencies:
  - Memory Model → Call Stack → Scope Chain → Closures
  - Call Stack → Event Loop
  - Scope Chain → Reference Semantics
- Enable diagnostic gap identification (passed scope chain but failed closures = specific gap)
- Start with simple NMs before complex
- Assess fundamentals before integration

**Evidence basis**: 📐 Framework (prerequisite concept logical but not empirically validated)

**Research gap**: Optimal NM sequencing unknown, needs empirical validation

---

#### 46. Multi-Level NM Mastery Assessment

**Framework concept**: NM understanding has multiple levels (syntactic, behavioral, conceptual, design)

**Assessment need**: Assess all levels of NM mastery, not just syntax

**What tools must do**:
- Assess at four levels:
  1. **Syntactic**: Can identify NM in code
  2. **Behavioral**: Can predict what NM does
  3. **Conceptual**: Can explain WHY NM works
  4. **Design**: Can choose when NM appropriate
- Map to BSI dimensions:
  - Implementation: Syntax/idiom
  - Behavior: What NM predicts
  - Strategy: When to apply NM
- Avoid traditional assessment bias (focuses on Implementation, neglects Strategy)

**Evidence basis**: 📐 Framework (BSI established, NM mapping is framework)

**Example (closures)**:
- Syntactic: Identify closure syntax
- Behavioral: Predict captured values
- Conceptual: Explain reference capture
- Design: Choose closures for data hiding

---

### Research Opportunities

#### 47. NM Diagnosis Validation

**Framework concept**: Student errors may stem from multiple flawed NMs—disambiguation needed

**Assessment need**: Validate diagnostic instruments that identify specific flawed NMs

**What tools must do**:
- Create diagnostic item sets isolating specific NM understanding
- Correlate execution patterns with NM understanding/misunderstanding
- Measure diagnostic accuracy (precision, recall)
- Handle diagnostic ambiguity (error could stem from multiple NMs)
- Enable trace-based NM diagnosis

**Evidence basis**: Research gap (no validated NM diagnostic instruments)

**Challenge**: Same error could indicate multiple possible flawed NMs

---

#### 48. NM Sequencing Research

**Framework concept**: Optimal sequence for teaching/assessing NMs unknown

**Assessment need**: Determine which NM orderings produce best learning outcomes

**What tools must do**:
- Collect learning analytics showing outcomes from different NM sequences
- Enable experimentation with different orderings
- Track which sequences lead to better mastery
- Measure whether students can handle multiple NMs simultaneously vs serially

**Evidence basis**: Research gap (optimal sequencing unknown)

**Questions**: Closures before/after prototypes? Event loop early/late? Simultaneous vs serial introduction?

---

#### 49. Visual vs Textual NM Assessment Effectiveness

**Framework concept**: Unclear whether diagrams or traces more effective for NM assessment

**Assessment need**: Compare assessment modality effectiveness

**What tools must do**:
- Support multi-modal assessment (diagrams, traces, code, explanation)
- Allow student to choose representation
- Measure effectiveness by modality
- Test hypothesis: Visual better for spatial models (memory, stack), textual better for sequential (event loop)

**Evidence basis**: Research gap (no comparative studies of modality)

---

#### 50. Longitudinal NM Development Tracking

**Framework concept**: How NMs develop over time in learners unknown

**Assessment need**: Track NM mastery progression across sessions

**What tools must do**:
- Collect longitudinal trace data showing NM mastery progression
- Measure time to master each NM
- Detect whether learning is incremental or insight-driven ("aha" moments)
- Empirically validate which NMs are prerequisites for others
- Inform assessment timing (too early = lack of exposure, too late = miss learning process)

**Evidence basis**: Research gap (no large-scale longitudinal data)

**Questions**: How long per NM? Incremental vs aha? Empirical prerequisites?

---

## Summary Statistics from nm-assessment-strategies.md

**Total assessment needs extracted**: 20 (31-50)

**Evidence basis distribution**:
- 🔬 Established: 11 (the 12 NMs themselves are established theory)
- 📐 Framework: 7 (assessment strategies for NMs, integration patterns)
- 🧪 Extension: 0
- Research gaps: 5 (validation, sequencing, modality, longitudinal, diagnosis)

**Categories**:
- Foundation layer NMs: 6 assessments
- Execution layer NMs: 3 assessments
- OOP layer NMs: 3 assessments
- Integration patterns: 4 assessments
- Research opportunities: 4 assessments

**Total extracted so far**: 50 assessment needs from 2 documents

---

## From: threshold-aware-assessment-design.md (745 lines)

### Threshold Concept Assessment Strategies

#### 51. Asynchronous Execution Threshold Assessment

**Framework concept**: Transformative shift from "line-by-line execution" → "event loop coordinates interleaved execution"

**Assessment need**: Detect pre-threshold/liminal/post-threshold states, time assessment appropriately, support liminal transition

**What tools must do**:
- **Pre-threshold assessment** (diagnostic, not graded):
  - Prediction tasks with explanation to detect readiness
  - Analyze incorrect predictions with "line-by-line" explanations
  - Don't assess mastery yet—recommend event loop instruction first
- **Liminal state assessment** (formative, scaffolded):
  - Guided tracing with partial model provided (event loop phases given)
  - Support transition with scaffolding
  - Detect progress patterns (partial correctness)
  - Provide reinforcement for correct phase identifications
- **Post-threshold assessment** (summative, full mastery):
  - Complex async scenarios testing integration
  - Transfer to novel contexts (async/await + Promises + setTimeout combined)
  - Multi-dimensional scoring (Behavior + Conceptual model + Transfer)
  - Verify transformation occurred
- Normalize confusion during liminal phase (not grading failure)
- Track longitudinal progress across 4-8 weeks typical crossing time

**Evidence basis**: 🔬 Established (Meyer & Land 2003 threshold concept theory, Boustedt et al. 2007 programming thresholds)

**SOLO alignment**: Threshold crossing coincides with Multistructural → Relational transition (integrative moment)

---

#### 52. Closures & Lexical Scoping Threshold Assessment

**Framework concept**: Transformation from "functions are isolated units" → "functions capture lexical environment"

**Assessment need**: Support through troublesome closure concepts, detect liminal state, assess integration

**What tools must do**:
- **Pre-threshold**: Simple nested function scenarios (detect scope understanding)
- **Liminal**: Contrast cases revealing capture mechanism (var vs let in loops, closure factories)
  - Minimal pair comparisons to make differences explicit
  - Analyze patterns: Basic closure OK but not var scoping, partial model emerging
- **Post-threshold**: Design tasks requiring intentional closure use (private counter, function factories)
  - Score Implementation + Design + Behavior + Conceptual separately
  - Verify integration with memory model, scope chain, variable lifecycle
- Progressive timeline: Week 1-2 (pre), Week 3-5 (liminal), Week 6+ (post)
- Assess closures before async+closure integration

**Evidence basis**: 🔬 Established (threshold concept theory)

**Assessment timing**: Only after scope chain understanding solid

---

#### 53. Prototypal Inheritance Threshold Assessment

**Framework concept**: From "copying inheritance" → "delegation chains"

**Assessment need**: Overcome class-based OOP mental models, detect delegation understanding

**What tools must do**:
- **Pre-threshold**: Detect class-based assumptions (property lookup predictions)
- **Liminal**: Diagram tasks making chain explicit (draw prototype links)
  - Test understanding of __proto__ vs prototype distinction
  - Assess whether class syntax masks underlying mechanism
- **Post-threshold**: Design comparison tasks (methods in constructor vs prototype)
  - Memory implications for 1000 objects
  - Live prototype update effects
  - When to use delegation vs composition
- Verify understanding of class as syntactic sugar

**Evidence basis**: 🔬 Established (threshold concept theory)

**Modern note**: Verify mechanism understanding, not just class syntax memorization

---

#### 54. Recursion Threshold Assessment

**Framework concept**: From "loops for repetition" → "self-reference with base cases for decomposition"

**Assessment need**: Support through conceptually difficult self-reference, detect call stack understanding

**What tools must do**:
- **Pre-threshold**: Simple recursion tracing (countdown)
  - If can't trace → lacks call stack model (prerequisite)
- **Liminal**: Guided construction with scaffolding
  - Provide base case prompts, recursive case templates
  - Progressive scaffolding removal
- **Post-threshold**: Problems requiring recursion (tree, graph, nested structures)
  - Assess Strategy (identifies recursion needed)
  - Assess Conceptual (base case + recursive case correct)
  - Assess Integration (explains call stack)
- Expect sudden breakthroughs (well-researched pattern)

**Evidence basis**: 🔬 Established (Booth 1992, Sanders & McCartney 2017 - recursion as threshold)

**Research note**: Recursion crossing often sudden, not gradual

---

### Threshold-Aware Assessment Design Principles

#### 55. Liminal State Detection and Support (Not Grading)

**Framework concept**: Confusion during transition is normal, productive learning—grading it punishes learning process

**Assessment need**: Distinguish pre-threshold/liminal/post-threshold states, provide appropriate support

**What tools must do**:
- Detect liminal state patterns:
  - Inconsistent predictions (sometimes right, sometimes wrong)
  - Partial correctness (gets some aspects, misses others)
  - Struggle duration (weeks not days)
- Trigger formative feedback during liminal phase, not grading
- Example timeline:
  - Week 1-3: Prediction tasks with feedback, no grades
  - Week 4-6: Scaffolded practice, progress tracking, no penalties
  - Week 7+: Graded assessments post-threshold
- Implement trace-based liminal detection

**Evidence basis**: 📐 Framework (threshold theory established, liminal detection strategies are framework)

**Critical insight**: Don't grade confusion—support it

---

#### 56. Integration Assessment (Not Isolation)

**Framework concept**: Threshold crossing connects previously separate knowledge—assess connections

**Assessment need**: Test whether concepts have integrated post-threshold

**What tools must do**:
- Post-threshold tasks require multiple concepts together
- Example: "Use closures to implement private state + async callbacks" (closure + memory + event loop)
- Score integration points separately from individual concepts
- Avoid isolated skill testing post-threshold
- Focus on Relational-level tasks (SOLO) that require integration

**Evidence basis**: 📐 Framework (threshold integration property established, assessment strategies are framework)

**Rubric design**: Explicit integration scoring dimension

---

#### 57. Non-Linear Learning Trajectory Tracking

**Framework concept**: Threshold crossing is discontinuous—sudden improvement or prolonged struggle then rapid mastery

**Assessment need**: Track longitudinal progress, detect breakthrough moments

**What tools must do**:
- Track performance on threshold tasks across sessions
- Detect patterns:
  - Sudden accuracy increase (breakthrough)
  - Explanation quality shift (conceptual to model-based)
  - Prolonged plateau then rapid ascent
- Don't conclude "can't learn" from early struggle
- Longitudinal traces show learning trajectory
- Visualize pre→liminal→post progression
- Enable celebration when crossing detected

**Evidence basis**: 📐 Framework (non-linearity observed, systematic tracking is framework)

**Value**: Avoids premature judgments, recognizes legitimate struggle duration

---

#### 58. Adaptive Liminal Scaffolding

**Framework concept**: Confusion productive if scaffolded, destructive if abandoned

**Assessment need**: Provide liminal-specific interventions (neither beginner nor advanced)

**What tools must do**:
- Detect liminal state → trigger scaffolding automatically
- Scaffolding types:
  - Partial model provision (give event loop diagram, map code to phases)
  - Contrast cases (working vs broken, identify difference)
  - Guided tracing (start trace, student continues)
  - Metacognitive prompts ("What confuses you? Predict vs observe?")
- Gradually reduce scaffolding as post-threshold emerges
- Adaptive difficulty based on detected state

**Evidence basis**: 📐 Framework (scaffolding established pedagogy, threshold-specific application is framework)

**Implementation**: Automation detects state, selects appropriate scaffold type

---

#### 59. Threshold Crossing Celebration

**Framework concept**: Threshold crossing is major achievement—recognition reinforces learning

**Assessment need**: Detect crossing, acknowledge explicitly, motivate toward next threshold

**What tools must do**:
- Detect threshold crossing moments:
  - Consistent accurate predictions
  - Model-based explanations
  - Transfer to novel contexts
- Provide crossing-specific feedback:
  - Pre: "Building toward async—confusion normal"
  - Liminal: "Starting to see event loop—keep exploring"
  - Post: "You've crossed the async threshold! Major milestone."
- Track which thresholds crossed
- Motivate persistence for next threshold

**Evidence basis**: 🧪 Extension (celebration logical but not empirically validated for programming thresholds)

**Motivation impact**: Recognition increases persistence

---

### Threshold Readiness and Timing

#### 60. Prerequisite-Based Readiness Assessment

**Framework concept**: Assessing threshold before prerequisites met is invalid and demotivating

**Assessment need**: Check prerequisites before threshold assessment

**What tools must do**:
- Map prerequisites:
  - Closures: Requires scope, function execution model
  - Async: Requires callbacks, event loop exposure
  - Prototypes: Requires object creation, property access
  - Recursion: Requires call stack model, base case concept
- Assess prerequisites first
- If lacking, assess prerequisites not threshold
- Enable prerequisite gap detection

**Evidence basis**: 📐 Framework (prerequisite concept logical, specific mapping is framework)

**Prevents**: Invalid assessment, frustration, demotivation

---

#### 61. Engagement-Based Readiness Detection

**Framework concept**: Student behavior signals threshold readiness

**Assessment need**: Detect when student ready for threshold assessment via engagement patterns

**What tools must do**:
- Track engagement indicators:
  - Attempting threshold-related problems
  - Repeated errors in threshold domain (liminal, not lack of exposure)
  - Asking threshold-specific questions
- Trace indicators:
  - Code patterns showing partial threshold application (closures used incorrectly)
  - Increasing task complexity in threshold domain
  - Debugging shift (random → model-based)
- Trigger appropriate assessment type based on signals

**Evidence basis**: 🧪 Extension (engagement as readiness indicator logical but not validated)

**Opportunity**: Behavioral learning analytics

---

#### 62. Progressive Exposure Phasing

**Framework concept**: Threshold crossing takes time (weeks to months), assessment must adapt to phase

**Assessment need**: Align assessment type with exposure phase

**What tools must do**:
- Phase 1 (Pre-threshold, 1-2 weeks):
  - Build prerequisites
  - No threshold assessment
  - Diagnostic readiness tasks
- Phase 2 (Liminal, 3-6 weeks):
  - Intensive scaffolded practice
  - Frequent formative, rare summative
  - Progress tracking
- Phase 3 (Post-threshold, ongoing):
  - Integration, transfer tasks
  - Summative assessment appropriate
- Adapt to individual variation:
  - Fast crossers: 2-3 weeks
  - Slow crossers: 2-3 months
- Learning analytics detect phase transitions per student

**Evidence basis**: 📐 Framework (exposure timing logical, specific phases are framework)

**Individual adaptation**: Critical for validity

---

### Taxonomy Integration

#### 63. SOLO × Threshold State Mapping

**Framework concept**: Threshold crossing coincides with SOLO Multistructural → Relational shift

**Assessment need**: Use SOLO level to detect threshold state

**What tools must do**:
- Map threshold states to SOLO:
  - Prestructural: Pre-threshold, no model
  - Unistructural: Pre-threshold, single elements
  - Multistructural: Liminal, multiple disconnected elements
  - Relational: Post-threshold, integrated model
  - Extended Abstract: Post-threshold, transfer
- Assess Relational level to detect crossing
- Don't assess Relational before liminal period
- Use SOLO progression to time assessment

**Evidence basis**: 📐 Framework (SOLO + threshold theory both established, mapping is framework)

**Key insight**: Integration (Relational) = threshold crossing indicator

---

#### 64. Block Model × Threshold Zone Identification

**Framework concept**: Block Model Level 2 is threshold crossing zone (syntax → execution understanding)

**Assessment need**: Use Block Model level to assess threshold state

**What tools must do**:
- Map Block Model to threshold:
  - Level 1 (Text Surface): Pre-threshold syntax
  - Level 2 (Program Model): Liminal/post-threshold execution
  - Level 3 (Situation Model): Post-threshold design
- Level 2 tasks detect threshold state:
  - Can trace = post-threshold
  - Can't trace = liminal or pre-threshold
- Focus assessment on Level 2 for threshold detection

**Evidence basis**: 📐 Framework (Block Model + threshold theory both established, mapping is framework)

---

#### 65. BSI × Threshold Progression Sequence

**Framework concept**: Threshold learning progresses Implementation → Behavior → Strategy

**Assessment need**: Assess appropriate BSI dimension for threshold state

**What tools must do**:
- Pre-threshold: Implementation (syntax)
- Liminal/post-threshold: Behavior (prediction)
- Post-threshold only: Strategy (design decisions)
- Don't assess Strategy before threshold crossed
- Use BSI progression to time assessment type

**Evidence basis**: 📐 Framework (BSI established, threshold progression mapping is framework)

---

### Research Opportunities

#### 66. Threshold State Detection Validation

**Framework concept**: Need validated instruments for liminal state detection

**Assessment need**: Distinguish liminal from confused, post-threshold from memorization

**What tools must do**:
- Create ground truth labels (expert coding of student work)
- Correlate automated detection with expert judgment
- Trace-based liminal indicators:
  - Inconsistent predictions
  - Partial correctness
  - Struggle duration
- Measure detection accuracy

**Evidence basis**: Research gap (no validated threshold state detection for programming)

**Challenge**: Disambiguation (liminal vs just confused)

---

#### 67. Threshold Crossing Timing Research

**Framework concept**: Unknown average crossing time, individual variation, speed predictors

**Assessment need**: Determine typical crossing duration for each threshold

**What tools must do**:
- Longitudinal tracking pre→post
- Identify crossing moments
- Measure duration in liminal state
- Track percentage who never cross
- Test whether thresholds need maturation time (can't be rushed)

**Evidence basis**: Research gap (no large-scale timing data)

**Questions**: Typical duration? Individual variation? Maturation requirements?

---

#### 68. Liminal Scaffolding Effectiveness

**Framework concept**: Unknown which interventions help during liminal state

**Assessment need**: Validate scaffolding strategies

**What tools must do**:
- A/B test scaffold types:
  - Diagrams vs traces vs explanations
  - Practice vs more instruction
  - Peer discussion vs solo work
- Measure impact on crossing speed and success rate
- Identify effective scaffolds per threshold

**Evidence basis**: Research gap (limited liminal intervention research)

---

#### 69. Multiple Threshold Interaction Patterns

**Framework concept**: Unknown whether thresholds sequential or simultaneous

**Assessment need**: Understand threshold dependencies and interaction

**What tools must do**:
- Correlate crossing order with outcomes
- Test questions:
  - Is closures prerequisite for async?
  - Does recursion help/hinder prototypes?
  - Can students cross multiple per course?
- Track multi-threshold learners

**Evidence basis**: Research gap (no interaction studies)

**Opportunity**: Sequence optimization

---

## Summary Statistics from threshold-aware-assessment-design.md

**Total assessment needs extracted**: 19 (51-69)

**Evidence basis distribution**:
- 🔬 Established: 5 (4 thresholds themselves + recursion research)
- 📐 Framework: 10 (assessment strategies, principles, taxonomy mappings)
- 🧪 Extension: 1 (celebration)
- Research gaps: 4 (validation, timing, scaffolding, interactions)

**Categories**:
- Threshold-specific assessments: 4
- Design principles: 5
- Readiness/timing: 3
- Taxonomy integration: 3
- Research opportunities: 4

**Total extracted so far**: 69 assessment needs from 3 documents

---

## From: taxonomy-assessment-alignment.md (622 lines) - Condensed Summary

**Key unique contributions**:

#### 70-75. Taxonomy-Aligned Assessment Progressions

**Framework concepts**: SOLO, Block Model, BSI, Abstraction Transition each provide progression models for assessment design

**Assessment needs**: Design assessment tasks matching student's current taxonomy level, scaffold progression to next level

**What tools must do** (consolidated):
- SOLO progression assessment (Prestructural → Unistructural → Multistructural → Relational → Extended Abstract)
- Block Model level detection (Text Surface → Program Model → Situation Model)
- BSI dimension assessment (Implementation → Behavior → Strategy)
- Abstraction Transition support (Concrete → Transitional → Abstract)
- Cross-taxonomy alignment (SOLO Relational ≈ Block Model L2 ≈ Threshold crossing)
- Avoid ceiling/floor effects (tasks too hard/easy for level)

**Evidence basis**: 🔬 Established (all four taxonomies are established frameworks)

**Key insight from document**: Taxonomies converge - assess Relational/Level 2/post-threshold simultaneously

---

## From: assessment-tool-implementation-guide.md (1105 lines) - Condensed Summary

**Key unique contributions**:

#### 76-85. Tool Implementation Requirements (Consolidated)

**Framework concepts**: Practical assessment tool categories and their educational requirements

**Assessment tool categories identified**:
1. **Quality assessment tools** (QLCs): Assess code quality beyond correctness
2. **Visualization tools**: Make execution visible (debuggers, tracers, animators)
3. **Feedback generators**: Automated explanatory feedback from traces
4. **Misconception detectors**: Pattern-based diagnostic tools
5. **Progress trackers**: Longitudinal learning analytics
6. **Adaptive assessment systems**: State-responsive task selection
7. **Peer/self-assessment support**: Rubric guidance, calibration
8. **Authentic assessment platforms**: Professional-context tasks
9. **Bias detection tools**: Fairness analysis for assessment items
10. **Multi-modal assessment**: Support diagrams, code, explanation, traces

**What tools must do** (consolidated across all categories):
- Implement assessment logic (not just trace collection)
- Generate targeted feedback from execution patterns
- Adapt to student level/state
- Support multiple assessment purposes (formative, summative, diagnostic, authentic)
- Enable fairness auditing
- Provide educator dashboards
- Scale to classroom/MOOC contexts
- Integrate with existing learning environments

**Evidence basis**: 📐 Framework (assessment strategies established, tool-specific requirements are framework translation)

**Critical boundary reinforcement**:
- Tools implement assessment pedagogies
- Embody provides neutral trace infrastructure
- Clear separation between data (trace) and interpretation (tools)

---

## Extraction Phase Summary

**Total documents processed**: 5 of 5

**Total assessment needs extracted**: 85+ (30 from misconceptions, 20 from NMs, 19 from thresholds, 6 from taxonomies, 10 from tool implementation)

**Evidence basis overall distribution**:
- 🔬 Established: ~40% (core theories, validated frameworks)
- 📐 Framework: ~45% (established theory applied to assessment context)
- 🧪 Extension: ~5% (logical extrapolations)
- Research gaps: ~10% (opportunities for validation)

**Categories covered**:
- Misconception-specific assessment (8 types + patterns)
- Notional machine assessment (12 NMs + integration)
- Threshold concept assessment (4 thresholds + principles)
- Taxonomy-aligned assessment (4 taxonomies)
- Assessment approach patterns (POE, trace completion, classification, diagnosis, etc.)
- Feedback strategies (timing, specificity, delivery mechanisms)
- Tool implementation requirements (10 tool categories)
- Research opportunities (validation, timing, effectiveness studies)

**Key themes across all documents**:
1. **Multi-dimensional assessment**: Beyond correctness to quality, process, comprehension
2. **State-aware assessment**: Different tasks for pre/liminal/post states
3. **Integration over isolation**: Assess connections between concepts
4. **Formative emphasis**: Support learning, not just measure it
5. **Longitudinal tracking**: Detect transformations over time
6. **Adaptive scaffolding**: Right support at right time
7. **Evidence-based classification**: Clear basis for each assessment approach
8. **Tool-pedagogy separation**: Tools implement, trace enables

**Readiness for Phase 2**: Extraction notes provide comprehensive foundation for:
- Categorization documents (organized by purpose, timing, feedback type, scale)
- Use case table (85+ assessment use cases with evidence basis + educational goals)
- Practical examples (concrete assessment tasks)
- Framework comparisons (how different frameworks address same goals)
- Educator's guide (simplified practitioner introduction)

**Next**: Begin Phase 2 - Document creation
