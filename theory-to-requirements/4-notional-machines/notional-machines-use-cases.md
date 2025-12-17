# Notional Machines Use Cases

**Purpose**: Comprehensive inventory of educational use cases for JavaScript notional machines, documenting WHAT educational tools need to accomplish.

**Critical Boundary**: This document focuses entirely on pedagogical goals and tool capabilities. Technical specifications about HOW trace data enables these use cases belong in Phase 5.

---

## Evidence Legend

- 🔬 **Established** - Direct validation in education research (Sorva 2013, Fincher & Jeuring 2020, Guo 2013, Ben-Ari 2011)
- 📐 **Translated** - Established NM theory applied to JavaScript-specific concepts
- 🧪 **Extension** - Derived from educational practice and student misconception patterns

---

## Use Cases by Category

### Visualization Use Cases

| Use Case | Evidence | What Educational Tools Do | How Trace Data Enables |
|----------|----------|---------------------------|------------------------|
| Call stack frame rendering | 🔬 Guo 2013 | Display stack frames showing function names, parameters, local variables, and return values in visual hierarchy | `function-called`, `function-returned` events build stack frames; `arguments`, `local-variables`, `return-value` provide frame content |
| Recursive call visualization | 🔬 Ben-Ari 2011 | Animate stack growth and collapse during recursion, highlight base case, show parameter changes across calls | `function-called` shows stack growth with depth tracking; `arguments` show parameter evolution; `function-returned` shows collapse order |
| Memory layout display | 🔬 Guo 2013 | Render two-region view (stack/heap) with variables pointing to values or references, update in real-time | `variable-declared` tracks stack allocations; `object-created` tracks heap allocations; `value-assigned` shows connections |
| Reference relationship arrows | 🔬 Guo 2013 | Draw arrows from variables to objects they reference, show when multiple variables share objects | `value-assigned` with reference tracking; `object-id` correlates shared references; `reference-copied` shows aliasing |
| Event loop animation | 📐 Async threshold | Visualize call stack, microtask queue, macrotask queue, show event loop processing order | `callback-queued`, `microtask-queued`, `macrotask-scheduled`, `task-executed` events show queue state and processing order |
| Callback queue progression | 📐 Async threshold | Display callbacks moving from registration → queue → execution, show timing relationships | `timer-set` / `promise-created` for registration; `callback-queued` for queuing; `callback-executed` for execution with timestamps |
| Scope chain nesting | 📐 Scope/closure | Render nested boxes showing scope hierarchy, highlight variable resolution path | `scope-entered`, `scope-exited` establish hierarchy; `parent-scope` links create chain; `variable-declared` populates each scope |
| Closure capture visualization | 📐 Scope/closure | Show which outer variables are captured by inner functions, persist across outer function returns | `closure-created` with `captured-variables` list; `scope-persisted` after outer `function-returned`; `variable-read` from captured scope |
| Prototype chain walking | 📐 OOP patterns | Display prototype chain with arrows, highlight property lookup path, show shadowing | `prototype-lookup` with `lookup-path` array; `property-found-at` shows resolution level; `property-shadowed` marks overrides |
| Class vs instance separation | 📐 OOP patterns | Render two-tier diagram (class level/instance level) showing static vs instance members | `class-defined` with `static-members`; `object-created` with `instance-members`; `property-access` shows which tier accessed |
| Expression evaluation tree | 🧪 Operator precedence | Build tree showing operator precedence, animate evaluation order bottom-up | `expression-evaluated` with AST structure; `operator-applied` with operands/result; `evaluation-order` sequence numbers |
| Type coercion steps | 🧪 Type system | Display before/after types at each coercion point, show ToPrimitive/ToNumber/ToString steps | `type-coerced` with `before-type`, `after-type`, `coercion-steps` (ToPrimitive→ToNumber→etc.), `algorithm-used` |
| Reference vs value copying | 🧪 Assignment semantics | Visualize assignment showing value copy (primitives) vs reference copy (objects) | `value-assigned` with `is-primitive` flag; `reference-copied` vs `value-copied` distinction; `shared-object-id` for references |
| This binding determination | 🧪 Context binding | Highlight `this` value at each call site, show which binding rule applies | `this-bound` with `this-value`, `binding-type` (implicit/explicit/new/arrow/default), `call-site` location |

### Validation Use Cases

| Use Case | Evidence | What Educational Tools Do | How Trace Data Enables |
|----------|----------|---------------------------|------------------------|
| Mental model comparison | 🔬 Fincher & Jeuring 2020 | Collect student predictions of execution, compare to actual execution, identify discrepancies | Complete trace with all events; compare predicted vs actual event sequences; flag mismatches with `prediction-error` markers |
| Stack frame prediction | 🔬 Guo 2013 | Ask student to predict stack state at breakpoint, validate against actual state | `function-called` / `function-returned` build actual stack; student prediction compared at `breakpoint-hit`; show differences |
| Memory state prediction | 🔬 Guo 2013 | Student draws expected memory layout, tool compares to actual layout | `variable-declared`, `object-created`, `value-assigned` build actual memory state; compare to student diagram; highlight differences |
| Async order prediction | 📐 Event loop | Student predicts output order of async code, tool validates against actual execution | `console-output` / `side-effect` events in sequence order; compare to student's predicted order; show queue processing that led to actual order |
| Scope resolution validation | 📐 Closures | Student identifies which scope provides variable, tool confirms resolution path | `variable-read` with `resolved-from-scope` indicates actual resolution; compare to student's prediction; show full `scope-chain` |
| Prototype lookup verification | 📐 Inheritance | Student predicts property source in chain, tool validates actual lookup | `prototype-lookup` with `lookup-path` shows actual resolution; compare to prediction; highlight where property actually found |
| Expression result prediction | 🧪 Operators | Student calculates expression manually, tool validates against actual result | `expression-evaluated` with `result` value; `operator-applied` sub-steps show calculation; compare to student's work |
| Coercion outcome verification | 🧪 Type system | Student predicts coercion result, tool shows actual conversion steps | `type-coerced` with `before-value`, `after-value`, `coercion-algorithm` steps; compare to student prediction; show ToPrimitive/ToNumber/ToString |
| Reference sharing detection | 🧪 References | Student identifies which variables share objects, tool validates | `value-assigned` with `object-id` tracking; compare student's "shared" markings to actual `shared-object-id` matches |
| This value prediction | 🧪 Context | Student predicts `this` at call site, tool validates actual binding | `this-bound` with `this-value` and `binding-type`; compare to prediction; show which binding rule actually applied |

### Assessment Use Cases

| Use Case | Evidence | What Educational Tools Do | How Trace Data Enables |
|----------|----------|---------------------------|------------------------|
| Misconception detection (call stack) | 🔬 Sorva 2013 | Identify "functions run in definition order" misconception from incorrect predictions | `function-called` sequence vs source order; if student predicts textual order but trace shows call order differs, flag misconception |
| Misconception detection (references) | 🔬 Sorva 2013 | Detect "assignment copies objects" misconception when student expects independent objects | `value-assigned` with `object-id` tracking; if student marks objects as independent but `shared-object-id` shows aliasing, flag misconception |
| Misconception detection (async) | 📐 Threshold concepts | Identify "setTimeout(fn,0) runs immediately" from incorrect output order predictions | `timer-set`, `callback-queued`, `callback-executed` with timestamps; if student predicts immediate execution but trace shows deferred, flag misconception |
| Misconception detection (closures) | 📐 Threshold concepts | Detect confusion about captured variable values, especially in loops | `closure-created` with `captured-variables`; `variable-read` from closure; if student expects value capture but trace shows reference capture, flag misconception |
| Misconception detection (prototypes) | 📐 OOP patterns | Identify "objects copy from prototypes" when student expects static properties | `prototype-mutation` followed by `property-read`; if student expects old value but trace shows new value from shared prototype, flag misconception |
| Misconception detection (this) | 🧪 Context binding | Detect "`this` is lexical scope" from incorrect predictions in callbacks | `this-bound` with `binding-type`; if student predicts lexical `this` but trace shows dynamic binding, flag misconception |
| Misconception detection (coercion) | 🧪 Type system | Identify random/magical thinking about type conversions | `type-coerced` with `coercion-algorithm` steps; if student can't predict or gives inconsistent rules, flag lack of systematic understanding |
| SOLO level classification | 🔬 Biggs & Collis | Classify responses into prestructural/uni/multi/relational/extended abstract levels | Analyze prediction patterns across multiple traces; uni = single NM correct; multi = multiple NMs separate; relational = NMs integrated; extended = generalization |
| Block Model diagnosis | 🔬 Schulte & Bennedsen | Categorize errors as lack (syntax), mob (semantics), or exp (strategy) | Syntax errors from parse failures; semantic errors from incorrect execution predictions; strategy errors from poor decomposition despite correct semantics |
| Threshold concept crossing | 📐 Meyer & Land | Identify when student transitions from liminal to integrated understanding | Track prediction accuracy over time; sudden improvement across related concepts indicates threshold crossing; use `learning-event` markers |
| Abstraction level assessment | 📐 BSI framework | Determine if student thinking at behavior/strategy/implementation level | Behavior = focus on `console-output`; Strategy = focus on `control-flow`; Implementation = focus on `variable-assigned`, `function-called` details |

### Scaffolding Use Cases

| Use Case | Evidence | What Educational Tools Do | How Trace Data Enables |
|----------|----------|---------------------------|------------------------|
| Progressive stack detail | 🔬 Ben-Ari 2011 | Start with simple frame labels, progressively add parameters, locals, return values | Filter `function-called` events: Level 1 = name only; Level 2 = + `arguments`; Level 3 = + `local-variables`; Level 4 = + `return-value` |
| Memory model simplification | 🔬 Guo 2013 | Begin with primitives only, add references, then add garbage collection visualization | Filter events: Level 1 = primitives via `variable-declared` with `is-primitive`; Level 2 = + `object-created`; Level 3 = + `garbage-collected` |
| Event loop introduction | 📐 Complexity ordering | Start with synchronous code, add single setTimeout, then promises, then mixed | Filter async events: Level 1 = none; Level 2 = `macrotask-scheduled` only; Level 3 = + `promise-created`, `microtask-queued`; Level 4 = full queue detail |
| Scope chain gradual reveal | 📐 Complexity ordering | Show immediate scope first, reveal parent scopes progressively as needed | Filter `scope-entered` depth: Level 1 = current scope only; Level 2 = + parent; Level 3 = full `scope-chain` with captured scopes |
| Prototype chain depth control | 📐 OOP complexity | Start with object → immediate prototype, add deeper chains later | Filter `prototype-lookup`: Level 1 = immediate proto only; Level 2 = up to Object.prototype; Level 3 = full chain with custom prototypes |
| Operator precedence levels | 🧪 Learning progression | Teach PEMDAS first, add other operators, then associativity, finally short-circuit | Filter `operator-applied`: Level 1 = PEMDAS only; Level 2 = + comparison; Level 3 = + logical with `short-circuit-triggered` |
| Coercion rule introduction | 🧪 Learning progression | Start with string concatenation, add numeric coercion, then comparison, then advanced | Filter `type-coerced`: Level 1 = string concat; Level 2 = + numeric; Level 3 = + comparison; Level 4 = full `coercion-algorithm` steps |
| Reference complexity staging | 🧪 Learning progression | Begin with single references, add shared references, then nested object references | Filter `object-created`: Level 1 = single ref; Level 2 = + `shared-object-id` > 1; Level 3 = + nested with `object-contains-object` |
| This binding rule sequencing | 🧪 Learning progression | Teach method calls first, then lost binding, then explicit binding, finally arrows | Filter `this-bound` by `binding-type`: Level 1 = implicit only; Level 2 = + default; Level 3 = + explicit; Level 4 = all including arrow |
| Adaptive detail level | 🔬 Ben-Ari 2011 | Adjust visualization complexity based on detected student SOLO level | Use SOLO classification from assessment; apply corresponding event filters automatically based on detected level |

### Intervention Use Cases

| Use Case | Evidence | What Educational Tools Do | How Trace Data Enables |
|----------|----------|---------------------------|------------------------|
| Targeted hints (call stack) | 🔬 Sorva 2013 | When recursion confusion detected, highlight base case and return flow | Use `function-called` depth to identify recursion depth; highlight `function-returned` showing LIFO unwinding; mark base case with `recursion-base-case` |
| Targeted hints (references) | 🔬 Sorva 2013 | When copy confusion detected, emphasize reference arrows and shared objects | Highlight all `value-assigned` events with same `shared-object-id`; animate changes showing simultaneous updates across references |
| Targeted hints (async) | 📐 Threshold concepts | When timing confusion detected, explain event loop queue ordering | Show `macrotask-scheduled` → `callback-queued` → `callback-executed` timeline; highlight why queue processing happens after synchronous code |
| Targeted hints (closures) | 📐 Threshold concepts | When capture confusion detected, show which variables captured at creation time | Highlight `closure-created` with `captured-variables` list; show `variable-read` resolving to captured scope not current scope |
| Targeted hints (prototypes) | 📐 OOP patterns | When copy confusion detected, demonstrate live prototype changes affecting instances | Show `prototype-mutation` event followed by `property-read` from instances getting new value; prove shared prototype not copied |
| Counterexample generation | 🔬 Fincher & Jeuring 2020 | Generate code that breaks student's incorrect mental model | Analyze prediction errors; generate minimal code where trace will contradict prediction; show actual trace proving misconception wrong |
| Comparison examples | 🧪 Pedagogical patterns | Show contrasting examples (e.g., var vs let in loop) highlighting key difference | Run both variants; show side-by-side traces; highlight differing `scope-created`, `variable-declared`, `closure-created` events |
| Step-through guidance | 🔬 Ben-Ari 2011 | Walk student through execution step-by-step with focused questions | Use `sequence-number` to step through trace; at each step show relevant NM state; ask prediction question before revealing next event |
| Prediction refinement | 🧪 Active learning | Ask student to revise prediction after seeing partial execution | Show trace up to midpoint; collect revised prediction; compare to remaining trace; identify if misconception persists |
| Pattern recognition support | 📐 Abstraction transition | Highlight recurring patterns in code (e.g., factory pattern, module pattern) | Detect patterns in trace: repeated `object-created` + `closure-created` = factory; `function-called` once + `closure-created` = module |

### Analysis Use Cases

| Use Case | Evidence | What Educational Tools Do | How Trace Data Enables |
|----------|----------|---------------------------|------------------------|
| Variable role identification | 🔬 Research established | Classify variables as counters, accumulators, flags, steppers based on usage patterns | Analyze `value-assigned` patterns: counter = incremental; accumulator = compound assignment; flag = boolean toggle; stepper = iteration tracking |
| Function role classification | 🧪 Program comprehension | Categorize functions as utilities, handlers, components, factories | Utility = pure (no side effects in trace); handler = `this-bound` + event-related; factory = `object-created` + `closure-created`; component = returns object with methods |
| Execution pattern recognition | 📐 Algorithm understanding | Identify iteration vs recursion, sequential vs branching, sync vs async patterns | Iteration = repeated `loop-iteration`; recursion = `function-called` calling self; branching = `conditional-evaluated`; async = `promise-created` / `callback-queued` |
| Algorithm complexity analysis | 🧪 Performance education | Count loop iterations, call depth, show how input size affects execution | Count `loop-iteration` events; track max `call-stack-depth`; correlate input size (from `arguments`) to iteration/recursion counts |
| Control flow path tracing | 🧪 Debugging education | Highlight which branches taken, which loops executed, show decision points | `conditional-evaluated` with `condition-result` shows branches taken; `loop-iteration` shows which loops executed; `function-called` shows call paths |
| Data flow tracking | 🧪 Debugging education | Follow value transformations through variables, function calls, returns | Track value through: `value-assigned` → `variable-read` → `function-called` with `arguments` → `function-returned` with `return-value` → `value-assigned` |
| Error propagation analysis | 🧪 Exception handling | Show where errors thrown, how they propagate up stack, where caught | `exception-thrown` with `call-stack` shows throw point; track through `function-exited-with-exception`; `exception-caught` shows catch point |
| Closure lifetime analysis | 📐 Memory understanding | Show when closures created, what they capture, when garbage collected | `closure-created` with `captured-variables`; track `variable-read` from closure; `garbage-collected` when closure no longer referenced |
| Prototype mutation impact | 📐 OOP understanding | Demonstrate how prototype changes affect all instances | `prototype-mutation` event; identify all objects with that `prototype-id`; show subsequent `property-read` getting mutated value |
| This binding diagnosis | 🧪 Context debugging | Identify where `this` binding lost, suggest fixes (bind, arrow) | Find `this-bound` with unexpected `this-value`; compare `binding-type` to desired; suggest fix based on which rule would give correct binding |

### Exploration Use Cases

| Use Case | Evidence | What Educational Tools Do | How Trace Data Enables |
|----------|----------|---------------------------|------------------------|
| Interactive stack manipulation | 🔬 Ben-Ari 2011 | Allow students to step forward/backward, jump to function entry/exit | Use `sequence-number` for navigation; jump to `function-called` / `function-returned` events; rebuild stack state at any sequence point |
| Memory state time travel | 🔬 Guo 2013 | Let students scrub through execution timeline, inspect memory at any point | Index all `variable-declared`, `value-assigned`, `object-created` by `sequence-number`; rebuild memory state by replaying events up to selected point |
| Async execution replay | 📐 Event loop | Replay event loop ticks, show queue state at each tick | Use `macrotask-executed`, `microtask-executed` as tick boundaries; show `callback-queued` state before each tick; animate queue consumption |
| Scope exploration | 📐 Closures | Click on variable to see its scope chain, captured scopes | `variable-read` links to `scope-id`; follow `parent-scope` chain; show `captured-by-closure` to identify which functions captured it |
| Prototype chain navigation | 📐 Prototypes | Click on object to navigate prototype chain, see all inherited properties | `object-created` has `prototype-id`; follow `prototype-chain` links; aggregate properties at each level with `property-defined-at` |
| Breakpoint-based inspection | 🧪 Debugging tools | Set breakpoints, inspect all notional machines at that point | Find events at `source-location` matching breakpoint; reconstruct all NM states (stack, memory, scopes, etc.) at that `sequence-number` |
| Variable watch expressions | 🧪 Debugging tools | Track specific variables across entire execution | Filter all `value-assigned`, `variable-read` events for watched `variable-name`; show timeline of value changes and access points |
| Execution speed control | 🔬 Ben-Ari 2011 | Adjust animation speed, pause, step, run to completion | Use `sequence-number` with adjustable playback rate; pause = stop advancing; step = advance by 1; run = advance continuously with `timestamp` delays |
| Multiple visualization modes | 🔬 Guo 2013 | Switch between notional machines (stack vs memory vs event loop) for same execution | Single complete trace; filter events by NM: Call Stack = `function-*`; Memory = `variable-*`, `object-*`; Event Loop = `callback-*`, `promise-*` |
| Code annotation | 🧪 Learning tools | Student adds notes to code about what notional machines show | Link student notes to `source-location`; show note alongside trace events from that location; persist annotations across multiple runs |

### Comparison Use Cases

| Use Case | Evidence | What Educational Tools Do | How Trace Data Enables |
|----------|----------|---------------------------|------------------------|
| Side-by-side execution | 🧪 Contrast learning | Run similar code variants, show how notional machines differ | Generate trace for each variant; align by `source-location` or `sequence-number`; highlight event differences (e.g., different `scope-created` patterns) |
| Before/after refactoring | 🧪 Code quality | Show how refactoring changes execution patterns | Compare traces: same behavior = same `console-output` but possibly fewer `function-called`, `object-created`; show efficiency improvements |
| Language comparison | 📐 Transfer learning | Compare JavaScript notional machines to other languages (Python, Java) | Generate traces from equivalent code in each language; map language-specific events to common concepts (e.g., all have `function-called`) |
| Paradigm comparison | 📐 OOP understanding | Compare class-based vs prototype-based inheritance execution | Trace class version shows `class-defined`, `constructor-called`; trace prototype shows `object-created`, `prototype-assigned`; same behavior, different mechanisms |
| Pattern comparison | 🧪 Design patterns | Show how different patterns achieve same goal (closure vs class for encapsulation) | Closure: `function-called` + `closure-created`; Class: `class-defined` + `constructor-called`; both achieve encapsulation with different trace patterns |
| Performance comparison | 🧪 Optimization | Compare execution characteristics (loop iterations, memory allocations) | Count `loop-iteration`, `function-called`, `object-created` events; compare execution times via `timestamp` differences; identify bottlenecks |
| Error handling comparison | 🧪 Exception patterns | Show try/catch vs promise.catch vs async/await error handling | try/catch: `exception-thrown` + `exception-caught` sync; promise: `promise-rejected` + `callback-queued`; async/await: combines both patterns |
| Binding method comparison | 🧪 This binding | Compare bind vs arrow vs manual `const self = this` | bind: `this-bound` with explicit type; arrow: lexical `this-value` from enclosing; self: `value-assigned` copying `this-value` |
| Coercion strategy comparison | 🧪 Type safety | Compare `==` vs `===`, implicit vs explicit coercion | `==`: shows `type-coerced` before comparison; `===`: no coercion, direct comparison; explicit: `type-coerced` visible in code, not operator |
| Scope pattern comparison | 📐 Module patterns | Compare IIFE vs modules vs closures for encapsulation | IIFE: `function-called` immediately + `closure-created`; modules: `module-loaded` + `scope-created` persistent; closures: `closure-created` on demand |

---

## Use Cases by Notional Machine

### Call Stack Model Use Cases

- Stack frame rendering (visualization)
- Recursive call animation (visualization)
- Stack frame prediction (validation)
- Misconception detection: execution order (assessment)
- Progressive stack detail (scaffolding)
- Targeted hints: recursion (intervention)
- Function role classification (analysis)
- Interactive stack manipulation (exploration)
- Side-by-side recursion vs iteration (comparison)

### Memory Model Use Cases

- Memory layout display (visualization)
- Reference relationship arrows (visualization)
- Memory state prediction (validation)
- Misconception detection: object copying (assessment)
- Memory model simplification (scaffolding)
- Targeted hints: references (intervention)
- Variable role identification (analysis)
- Memory state time travel (exploration)
- Before/after memory optimization (comparison)

### Event Loop Model Use Cases

- Event loop animation (visualization)
- Callback queue progression (visualization)
- Async order prediction (validation)
- Misconception detection: setTimeout immediate (assessment)
- Event loop introduction (scaffolding)
- Targeted hints: async timing (intervention)
- Execution pattern recognition: async (analysis)
- Async execution replay (exploration)
- Promise vs callback comparison (comparison)

### Scope Chain Model Use Cases

- Scope chain nesting (visualization)
- Closure capture visualization (visualization)
- Scope resolution validation (validation)
- Misconception detection: closure capture (assessment)
- Scope chain gradual reveal (scaffolding)
- Targeted hints: closures (intervention)
- Closure lifetime analysis (analysis)
- Scope exploration (exploration)
- var vs let scope comparison (comparison)

### Prototype Chain Model Use Cases

- Prototype chain walking (visualization)
- Prototype lookup verification (validation)
- Misconception detection: prototype copying (assessment)
- Prototype chain depth control (scaffolding)
- Targeted hints: prototypes (intervention)
- Prototype mutation impact (analysis)
- Prototype chain navigation (exploration)
- Class vs prototype comparison (comparison)

### Static vs. Instance Model Use Cases

- Class vs instance separation (visualization)
- Static/instance prediction (validation)
- Factory pattern recognition (analysis)
- Static method comparison (comparison)

### Class Syntax Model Use Cases

- Class desugaring visualization (visualization)
- Class feature comparison (validation)
- Class vs function comparison (comparison)

### This Binding Model Use Cases

- This binding determination (visualization)
- This value prediction (validation)
- Misconception detection: this lexical (assessment)
- This binding rule sequencing (scaffolding)
- This binding diagnosis (analysis)
- Binding method comparison (comparison)

### Operator Evaluation Model Use Cases

- Expression evaluation tree (visualization)
- Expression result prediction (validation)
- Operator precedence levels (scaffolding)
- Execution pattern: short-circuit (analysis)
- Operator precedence comparison (comparison)

### Type Coercion Model Use Cases

- Type coercion steps (visualization)
- Coercion outcome verification (validation)
- Misconception detection: random coercion (assessment)
- Coercion rule introduction (scaffolding)
- Coercion strategy comparison (comparison)

### Reference vs. Value Model Use Cases

- Reference vs value copying (visualization)
- Reference sharing detection (validation)
- Misconception detection: assignment copying (assessment)
- Reference complexity staging (scaffolding)
- Shallow vs deep copy comparison (comparison)

---

## Cross-Cutting Concerns

### Multi-NM Use Cases

Some use cases require coordination across multiple notional machines:

| Use Case | NMs Involved | What Educational Tools Do | How Trace Data Enables |
|----------|--------------|---------------------------|------------------------|
| Complete program comprehension | All 12 | Provide integrated view showing how all NMs work together for complete understanding | Complete trace with all event types; UI switches between NM views filtering same trace; synchronized `sequence-number` navigation across views |
| Debugging workflow support | Call Stack, Memory, Scope | Guide student through systematic debugging using multiple NMs | Correlate `function-called` (stack), `variable-declared` (memory), `scope-entered` (scope) by `sequence-number`; show coordinated state across NMs |
| Async closure debugging | Event Loop, Scope, Memory | Show how async callbacks capture scope and persist in memory | Link `callback-queued` to `closure-created` to `captured-variables` to `scope-persisted`; trace variable access chain across async boundary |
| OOP pattern analysis | Prototype, Static/Instance, This, Class | Analyze object-oriented code using all OOP-related NMs | Correlate `class-defined`, `object-created`, `prototype-lookup`, `this-bound` events; show how static/instance/inherited members interact |
| Function execution deep dive | Call Stack, Scope, Memory, This | Complete picture of function call including context, scope, memory | Single `function-called` event links to: stack frame, `scope-entered`, `this-bound`, `arguments` in memory; full context at one sequence point |
| Performance profiling | Call Stack, Memory, Event Loop | Identify bottlenecks using execution time, memory usage, async delays | Aggregate `timestamp` diffs per function; count `object-created` for memory; measure `callback-queued` to `callback-executed` latency |

---

## Integration with Previous Chapters

### Connection to Taxonomies

Use cases support assessment using SOLO, Block Model, BSI, and Abstraction Transition taxonomies:
- SOLO level classification uses multiple validation use cases
- Block Model diagnosis uses misconception detection use cases
- BSI assessment uses execution pattern recognition
- Abstraction transition tracking uses pattern recognition and transfer use cases

### Connection to Misconceptions

Use cases directly address misconceptions identified in `/2-misconceptions/`:
- Each misconception detection use case maps to specific misconception from catalog
- Targeted hint use cases provide intervention for each misconception type
- Counterexample generation creates code to break incorrect mental models

### Connection to Threshold Concepts

Use cases support students crossing threshold concepts:
- Validation use cases identify liminal states
- Scaffolding use cases provide graduated support through integration
- Intervention use cases offer targeted help at troublesome points
- Exploration use cases enable self-discovery of transformative insights

---

## Phase 5 Status

✅ **4th Column Added**: All use case tables now include "How Trace Data Enables" showing specific trace events and data structures required.

**Next Phase 5 Tasks**:
- Create comprehensive trace event catalog with object schemas
- Document trace requirements by notional machine
- Add trace requirement sections to individual NM documentation

See main `/4-notional-machines/README.md` for complete Phase 5 plan and progress.
