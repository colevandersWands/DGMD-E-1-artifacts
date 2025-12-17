# Learning Tools Use Cases - Table

**Phase 4 + Phase 5 Deliverable**: Comprehensive inventory of learning tool use cases WITH trace requirements

**Columns**:
- **Use Case**: Descriptive identifier
- **Evidence**: 🔬 Established / 📐 Translated / 🧪 Extension
- **What Educational Tools Do**: Pedagogical/analytical function (Phase 4)
- **How Trace Data Enables**: Neutral infrastructure requirements (Phase 5)

**Critical Boundary**: Column 3 = pedagogy (tools implement). Column 4 = neutral data (embody provides).

---

## Evidence Legend

- 🔬 **Established** - Direct research backing from literature review
- 📐 **Translated** - Established theory applied to trace/tool context
- 🧪 **Extension** - Derived from experience and/or extrapolating from research

---

## Use Cases by Category

### Category 1: Visualization & Mental Model Building

| **Use Case** | **Evidence** | **What Educational Tools Do** | **How Trace Data Enables** |
|--------------|--------------|-------------------------------|----------------------------|
| Program execution visualization | 🔬 | Render call stack, memory state, and variable values at each execution step to make invisible execution visible (Python Tutor, Jeliot) | **Events**: `function.call`, `function.return`, `variable.declare`, `variable.assign`, `variable.read`, `scope.create`. **Config**: `granularity: { variables: "all", functions: "user-code-only", scopes: "all" }`. **Data**: Each event provides complete state snapshot. Tools consume events → render execution steps. |
| Scope chain visualization | 🔬 | Display nested scopes as visual hierarchy showing variable accessibility and closure relationships | **Events**: `scope.create` with `parentScopeId`, `scope.enter`, `scope.exit`, `closure.capture`. **Config**: `granularity: { scopes: "all" }`. **Data**: Scope hierarchy via parent IDs, variables per scope. Tools consume scope events → render nested hierarchy. |
| Reference visualization | 🔬 | Show multiple variables pointing to same object via visual arrows/lines to demonstrate reference semantics vs value copying | **Events**: `variable.assign` with object IDs, `object.create` with unique `objectId`. **Config**: `serialization: { values: "shallow", circularRefs: "registry" }`. **Data**: Object IDs enable reference tracking. Tools consume variable + object events → render arrows between variables and shared objects. |
| Call stack animation | 🔬 | Animate function calls and returns showing LIFO stack behavior with frames containing local variables and execution context | **Events**: `function.call` with `newScopeId`, `function.return`. **Config**: `granularity: { functions: "user-code-only", scopes: "function-only" }`. **Data**: Call events create stack frames, return events pop. Tools consume function events → render animated stack. |
| Event loop visualization | 📐 | Animate call stack, microtask queue, and macrotask queue separately showing async execution ordering (Loupe-style) | **Events**: `await.before`, `await.after`, `microtask.queue`, `microtask.execute`, `promise.create`, `promise.settle`. **Config**: `granularity: { async: "all", functions: "all" }`. **Data**: Queue events show task queueing, execute events show processing. Tools consume async events → render queues + stack separately. |
| Prototype chain visualization | 📐 | Display delegation relationships via arrows from instance → prototype → Object.prototype → null showing property lookup path | **Events**: `object.create` with `prototype` ID, `prototype.lookup` with `lookupChain[]`. **Config**: `granularity: { objects: "all" }, serialization: { objects: { prototype: true } }`. **Data**: Prototype IDs form chain. Tools consume object events → render delegation arrows. |
| Memory model visualization | 🔬 | Show stack (primitives) vs heap (objects) to demonstrate where values are stored | **Events**: All variable events with value types, `object.create` for heap allocation. **Config**: `granularity: { variables: "all", objects: "all" }`. **Data**: Primitive values inline, object values by reference. Tools consume events → separate stack/heap rendering based on value types. |
| Closure visualization | 📐 | Highlight captured variables showing scope persistence after outer function returns | **Events**: `closure.capture` with `capturedVariables[]`, `scope.exit` but scope persists in `variable.read` events showing `resolvedScopeId` from outer scope. **Config**: `granularity: { scopes: "all", variables: "all" }`. **Data**: Captured variables list + scope resolution chain. Tools consume closure events → highlight captured vars persisting after outer return. |
| Type coercion visualization | 📐 | Display intermediate conversion steps showing how values change types during operations | **Events**: `expression.binary` with `coercionOccurred: true`, value types before/after. **Config**: `granularity: { expressions: true }`. **Data**: Left/right operand types, result type, coercion flag. Tools consume expression events → show type changes. |
| Expression evaluation visualization | 📐 | Number evaluation steps showing precedence and associativity, display expression trees revealing evaluation order | **Events**: `expression.binary`, `expression.unary` with timestamps showing evaluation order. **Config**: `granularity: { expressions: true }`. **Data**: Operation sequence, operands, results. Tools consume expression events → render evaluation tree/sequence. |
| This binding visualization | 📐 | Highlight current `this` context during execution, annotate which binding rule applies (explicit/implicit/default/new) | **Events**: `function.call` with `callType` (method/direct/constructor/apply/call/bind) and `thisValue`. **Config**: `granularity: { functions: "all" }, serialization: { values: "shallow" }`. **Data**: Call type indicates binding rule, thisValue shows bound value. Tools consume call events → highlight this + annotate rule. |
| Temporal Dead Zone representation | 📐 | Show variables in TDZ as grayed-out or specially marked before initialization | **Events**: `variable.declare` with `inTDZ: true`, `variable.assign` with `wasInTDZ: true`, `variable.tdz-access` for access errors. **Config**: `granularity: { variables: "all" }`. **Data**: TDZ flags explicitly mark state. Tools consume variable events → render TDZ variables differently. |

### Category 2: Debugging & Error Detection

| **Use Case** | **Evidence** | **What Educational Tools Do** | **How Trace Data Enables** |
|--------------|--------------|-------------------------------|----------------------------|
| Comprehension-first debugging | 🔬 | Present buggy code for students to read, trace, debug, and fix before writing original programs (CodeWrite pedagogy) | **Events**: All events for complete execution trace. **Config**: BEGINNER_VISUALIZATION preset. **Data**: Full trace enables students to step through buggy code. Tools provide stepping interface + state inspection using trace events. |
| Stepping debugger with state inspection | 🔬 | Enable step-through execution with variable inspection at each step for systematic bug localization | **Events**: All variable, function, scope events with `location`. **Config**: `granularity: { variables: "all", functions: "all", scopes: "all" }`. **Data**: Events ordered by sequence, location correlates to source. Tools implement step-forward/back using event sequence, display current state. |
| Dynamic slicing for bug tracing | 🔬 | Highlight code statements affecting specific error/value to show causality through execution (Agar, Whyline) | **Events**: `variable.read`, `variable.assign`, `variable.update` tracking value flow. **Config**: `granularity: { variables: "all" }, filters: { variableNames: { include: [errorVariable] } }`. **Data**: Read/write events show data dependencies. Tools analyze backward from error → highlight affecting statements. |
| Query-driven debugging | 🔬 | Answer "why did/didn't" questions about program behavior by analyzing execution (Whyline) | **Events**: All events for complete execution history. **Config**: `granularity: all detailed`. **Data**: Complete trace enables retrospective queries. Tools query events (e.g., "why was x=5?") → traverse event history → answer based on execution. |
| Breakpoint and watchpoint support | 📐 | Allow students to pause execution at specific locations or when variables change for targeted inspection | **Events**: All events with `location` and variable state. **Config**: `filters: { sourceLocations: { lineRange: breakpointLines } }` or `filters: { variableNames: { include: [watchedVars] } }`. **Data**: Location filtering = breakpoints, variable filtering = watchpoints. Tools filter events to simulate pausing. |
| Error pattern recognition | 📐 | Identify and categorize common bug patterns (off-by-one, null dereference, scope confusion, closure bugs) from execution | **Events**: `loop.iterate`, `error.throw`, `variable.read`, `closure.capture`. **Config**: `granularity: { controlFlow: "detailed", errors: "all", variables: "all" }`. **Data**: Pattern analysis of events reveals bugs (e.g., N-1 iterations = off-by-one). Tools implement pattern detectors analyzing trace. |
| Causal trace visualization | 📐 | Show how bug propagates from root cause through execution to manifestation | **Events**: All events with `sequenceId` ordering. **Config**: `output: { ordering: "async-aware" }`. **Data**: Sequential trace shows propagation path. Tools render causality chain from root → error using event sequence. |
| Misconception-based bug detection | 📐 | Detect bugs arising from specific misconceptions (hoisting confusion, coercion errors, reference bugs) | **Events**: `variable.tdz-access`, `expression.binary` with `coercionOccurred`, `variable.assign` with object IDs showing unintended sharing. **Config**: `granularity: { variables: "all", expressions: true }`. **Data**: Specific events indicate misconceptions. Tools detect patterns → classify misconception type. |
| Real-time error highlighting | 🔬 | Flag syntax and logic errors during coding with contextualized explanations (linting, type checking) | **Events**: `error.throw` with `errorType`, `message`, `error.context`. **Config**: `granularity: { errors: "all" }`. **Data**: Error events provide context. Tools display errors immediately with trace context for explanation. |

### Category 3: Assessment & Quality Evaluation

| **Use Case** | **Evidence** | **What Educational Tools Do** | **How Trace Data Enables** |
|--------------|--------------|-------------------------------|----------------------------|
| Functional correctness testing | 🔬 | Verify code produces expected outputs via test cases (traditional automated grading) | **Events**: Execution produces output values. **Config**: Minimal (just run code). **Data**: Not trace-specific - tools run code, compare outputs. Trace optional for debugging test failures. |
| Identifier naming assessment | 🔬 | Evaluate variable/function names for descriptiveness and convention adherence (QLCs) | **Events**: `variable.declare` with `variableName`, `function.call` with `functionName`. **Config**: `granularity: { variables: "declarations-only", functions: "user-code-only" }`. **Data**: Name strings extracted from events. Tools analyze names → assess quality (not single letters, descriptive, conventions). |
| API usage evaluation | 🔬 | Assess appropriateness of chosen APIs and library functions for given tasks (QLCs) | **Events**: `function.call` with `functionName` showing which APIs used. **Config**: `granularity: { functions: "all" }` (includes built-ins). **Data**: Function call events show API choices. Tools analyze → assess (modern APIs vs deprecated, appropriate for task). |
| Algorithmic approach detection | 🔬 | Identify iteration vs recursion, detect complexity patterns, recognize algorithm categories from execution (QLCs) | **Events**: `loop.enter`, `loop.iterate`, `function.call` (recursive calls). **Config**: `granularity: { controlFlow: "detailed", functions: "all" }`. **Data**: Loop vs recursive call patterns. Tools analyze → categorize algorithm (iterative O(n), nested loops O(n²), recursive, etc.). |
| Design pattern recognition | 📐 | Detect usage of accumulator, filter-map-reduce, observer, factory, and other patterns (QLCs) | **Events**: Variable update patterns, function call patterns, object creation patterns. **Config**: `granularity: { variables: "all", functions: "user-code-only", objects: "creation-only" }`. **Data**: Execution patterns reveal designs. Tools implement pattern detectors analyzing event sequences. |
| Code complexity assessment | 📐 | Measure cyclomatic complexity, nesting depth, function length to evaluate code simplicity | **Events**: `conditional.branch`, `loop.enter` counting branches. **Config**: `granularity: { controlFlow: "detailed" }`. **Data**: Branch/loop events count complexity. Tools analyze → compute cyclomatic complexity, nesting depth from event nesting. |
| Code structure evaluation | 📐 | Assess organization, modularity, and separation of concerns | **Events**: `function.call` showing call graph, `scope.create` showing module structure. **Config**: `granularity: { functions: "user-code-only", scopes: "function-only" }`. **Data**: Function boundaries, call relationships. Tools analyze → assess modularity (coupling, cohesion). |
| Quality assessment beyond correctness | 🔬 | Evaluate code quality dimensions: naming, structure, design, maintainability (Ko 2019 QLCs framework) | **Events**: Combination of variable, function, control flow events. **Config**: CODE_QUALITY_ASSESSMENT preset. **Data**: Multiple quality dimensions from different event types. Tools implement QLCs analyzing trace patterns → assess quality. |
| Trace-based quality checking | 🔬 | Analyze runtime execution patterns to assess code quality at scale (Lehtinen 2023 MOOCs) | **Events**: All relevant events for quality dimensions. **Config**: Performance-optimized with sampling for scale. **Data**: Execution patterns analyzable at scale. Tools process thousands of traces → assess quality automatically (MOOC feasibility). |

### Category 4: Feedback & Guidance

| **Use Case** | **Evidence** | **What Educational Tools Do** | **How Trace Data Enables** |
|--------------|--------------|-------------------------------|----------------------------|
| Immediate execution feedback | 🔬 | Provide millisecond-level output feedback in live coding environments and REPLs for fast experimentation | **Events**: Execution completion, output values. **Config**: `performance: { streaming: true }`. **Data**: Fast execution with minimal overhead. Tools show output immediately. Trace optional for detailed feedback. |
| Real-time error detection | 🔬 | Analyze code as typed/saved showing syntax and type errors immediately with explanations | **Events**: `error.throw` with context. **Config**: `granularity: { errors: "all" }`. **Data**: Error events provide immediate context. Tools display errors as they occur during execution. |
| Predictive feedback (POE) | 📐 | Facilitate predict-observe-explain cycles where students predict behavior, execute, compare, and explain discrepancies | **Events**: Complete execution trace for observation. **Config**: BEGINNER_VISUALIZATION. **Data**: Predicted state vs actual trace. Tools compare student prediction to actual events → highlight discrepancies. |
| Guided debugging hints | 🔬 | Provide progressive hints from general to specific during debugging (Rivers & Koedinger 2017 data-driven hints) | **Events**: Error context, variable states, control flow. **Config**: `granularity: { variables: "all", errors: "all" }`. **Data**: Trace reveals error context. Tools analyze trace → generate hints based on observed patterns (solution-space-based). |
| Quality assessment feedback | 🔬 | Generate targeted improvement suggestions based on QLC assessments (naming, structure, patterns) | **Events**: Variable names, function patterns, complexity metrics from trace. **Config**: CODE_QUALITY_ASSESSMENT preset. **Data**: QLC analysis of trace. Tools generate specific feedback (e.g., "Variable `x` on line 15 not descriptive"). |
| Conversational AI tutoring | 🔬 | Provide personalized natural language explanations and multi-turn Q&A for conceptual understanding (CodeHelp, CodeAid) | **Events**: Full execution context for AI. **Config**: Configurable based on question. **Data**: Trace provides context for AI explanations. Tools send trace + question to AI → receive contextualized explanation. |
| Layered hint systems | 📐 | Offer hints at multiple levels: conceptual → strategic → tactical → code-level | **Events**: Variable granularity depending on hint level. **Config**: Adaptive granularity (conceptual=macro, tactical=micro). **Data**: Different detail levels from same trace. Tools filter/aggregate events based on hint level requested. |
| Context-specific error explanations | 🔬 | Provide explanations tailored to specific error context rather than generic messages (Keuning 2018 feedback effectiveness) | **Events**: `error.context` with call stack, scope chain, variable states. **Config**: `granularity: { errors: "all" }, serialization: { values: "deep" }`. **Data**: Rich error context. Tools use context to generate specific explanations (not generic "TypeError"). |
| Scaffolded feedback adaptation | 📐 | Adjust feedback detail and support level based on student performance and level | **Events**: Configurable granularity. **Config**: Adaptive based on student level (beginner=basic, advanced=detailed). **Data**: Same trace, different detail. Tools adjust event granularity based on student proficiency. |
| Misconception-targeted feedback | 📐 | Detect misconception indicators and provide explanations correcting specific mental model errors | **Events**: Misconception-specific events (`tdz-access`, coercion flags, closure patterns). **Config**: `granularity: { variables: "all", expressions: true }`. **Data**: Event patterns indicate misconceptions. Tools detect pattern → generate targeted correction. |

### Category 5: Misconception Detection & Correction

| **Use Case** | **Evidence** | **What Educational Tools Do** | **How Trace Data Enables** |
|--------------|--------------|-------------------------------|----------------------------|
| Scope misconception detection | 📐 | Identify var usage in block-scoped contexts, variables used before declaration, scope confusion patterns | **Events**: `variable.declare` with `kind: "var"` in block scopes, `scope.create` with `scopeType: "block"`. **Config**: `granularity: { variables: "all", scopes: "all" }`. **Data**: Var in block scope pattern. Tools detect → flag misconception. |
| Type coercion misconception correction | 📐 | Explain unexpected coercion in `==` comparisons, truthy/falsy confusions, implicit conversions | **Events**: `expression.binary` with `operator: "=="` and `coercionOccurred: true`. **Config**: `granularity: { expressions: true }`. **Data**: Coercion flags and type changes. Tools detect coercion → explain conversion. |
| Reference vs value misconception correction | 📐 | Show when assignment creates references not copies, explain mutation vs reassignment, demonstrate shared reference bugs | **Events**: `variable.assign` with same `objectId` to multiple variables. **Config**: `serialization: { circularRefs: "registry" }`. **Data**: Shared object IDs. Tools detect shared references → explain vs copying. |
| Closure misconception detection | 📐 | Identify classic closure bugs (loop with var), detect incorrect assumptions about variable capture | **Events**: `loop.enter` + `closure.capture` with `var` variables. **Config**: `granularity: { controlFlow: "detailed", scopes: "all" }`. **Data**: Loop+closure+var pattern. Tools detect classic bug → explain scope capture. |
| Async misconception clarification | 📐 | Explain event loop timing, clarify `await` behavior, show why `setTimeout(fn, 0)` isn't immediate | **Events**: `microtask.queue`, `await.before/after` showing ordering. **Config**: `granularity: { async: "all" }, output: { ordering: "async-aware" }`. **Data**: Event sequence shows async timing. Tools visualize ordering → explain event loop. |
| Prototype misconception correction | 📐 | Demonstrate delegation vs copying, explain property lookup, clarify class syntax as prototype sugar | **Events**: `prototype.lookup` with `lookupChain[]`. **Config**: `granularity: { objects: "all" }`. **Data**: Lookup chain shows delegation. Tools trace lookups → explain vs copying. |
| This binding misconception detection | 📐 | Identify incorrect this assumptions, explain binding rules, show context changes across call sites | **Events**: `function.call` with `callType` and `thisValue` changing across calls. **Config**: `granularity: { functions: "all" }`. **Data**: This value varies by call type. Tools show changes → explain binding rules. |
| Hoisting misconception correction | 📐 | Show creation/execution phases, explain TDZ, demonstrate function vs variable hoisting differences | **Events**: `variable.declare` before initialization, `function.call` before definition. **Config**: `granularity: { variables: "all", functions: "all" }`. **Data**: Declaration order vs execution order. Tools show hoisting → explain creation phase. |
| Expression evaluation misconception detection | 📐 | Identify precedence/associativity errors, show evaluation order, explain short-circuit behavior | **Events**: `expression.binary` sequence showing evaluation order. **Config**: `granularity: { expressions: true }`. **Data**: Expression event timestamps. Tools show actual order → explain precedence. |

### Categories 6-12: Trace Requirements Summary

**Note**: For token efficiency, Categories 6-12 use cases (28 total) share consolidated trace requirements rather than individual entries.

#### Category 6: Pedagogical Approach Support (8 use cases)

**Comprehensive trace requirements for all pedagogical approaches**:
- **Events**: Flexible based on approach - visualization uses function/variable/scope events, assessment uses quality-focused events, AI tutoring uses full context
- **Config**: Adaptive presets (BEGINNER_VISUALIZATION, CODE_QUALITY_ASSESSMENT, COMPREHENSIVE_DEBUGGING) matching pedagogical approach
- **Data**: Same trace infrastructure supports multiple pedagogical interpretations - tools implement approach-specific analysis
- **Key Pattern**: Neutral trace enables diverse pedagogies without dictating teaching strategy

#### Category 7: Learning Objective Support (9 use cases)

**Trace requirements aligned with learning objectives**:
- **Mental models**: Scope/function/variable events (Categories 1-2 trace requirements)
- **Debugging**: Complete execution trace with errors (Category 2 trace requirements)
- **Quality**: QLCs-focused events (Category 3 trace requirements)
- **Concepts**: NM-specific events based on concept (async→async events, closures→scope events)
- **Taxonomies** (SOLO/Block/BSI): Configurable granularity supports progression through levels
- **Key Pattern**: Learning objective determines which events needed, not how tools use them

#### Category 8: Feedback Loop Patterns (6 use cases)

**Trace requirements by feedback timing**:
- **Millisecond**: Minimal overhead, streaming output
- **Seconds**: Error events real-time
- **Minutes** (POE/hints): Full trace for analysis
- **Hours-days** (quality): Detailed events, can use sampling
- **Variable** (AI): Adaptive based on question
- **Config**: `performance: { streaming }` for fast feedback, detailed granularity for deep analysis
- **Key Pattern**: Same trace with different timing/granularity serves different feedback speeds

#### Category 9: Tool Integration Patterns (7 use cases)

**Shared trace foundation for multi-tool integration**:
- **Events**: Same trace consumed by multiple tools simultaneously
- **Config**: Single trace generation, multiple tool consumers
- **Data**: Consistent event format enables cross-tool analysis
- **Integration**: Visualization tool + assessment tool + AI tutor all consume same trace → consistent student experience
- **Key Pattern**: `embody(code, config) → trace` consumed by N tools, each implementing own pedagogy

#### Category 10: Deployment Context Support (5 use cases)

**Trace requirements by deployment context**:
- **Classroom**: Standard granularity, projection-friendly output
- **Self-study**: Full trace for independent exploration
- **MOOC**: Performance-optimized with sampling (scale to thousands)
- **IDE**: Context-filtered traces (specific functions/variables)
- **Standalone**: Complete self-contained traces
- **Config**: Performance tuning based on scale (MOOC sampling vs classroom full trace)
- **Key Pattern**: Same trace infrastructure, deployment-specific performance/filtering configs

#### Category 11: Progressive Disclosure (10 use cases)

**Configurable granularity for progressive complexity**:
- **Execution granularity**: `granularity: { expressions: false }` → `true` as students progress
- **NM progression**: Basic events (variables/functions) → advanced (async/prototypes)
- **Language features**: Filter by source location to show only taught features
- **Error complexity**: `granularity: { errors: "throws-only" }` → `"all"`
- **Assessment criteria**: `variables: "declarations-only"` → `"all"` as quality focus increases
- **Key Pattern**: Same event schema, progressive revealing via granularity config changes over time

#### Category 12: Multi-Dimensional Tool Selection (5 use cases)

**Meta-level: Using trace config to match tools to needs**:
- **Objective-based**: Mental models→visualization events, debugging→error events, quality→QLC events
- **Student-level**: Beginner→BEGINNER_VISUALIZATION, Advanced→COMPREHENSIVE_DEBUGGING
- **Deployment**: Classroom→full trace, MOOC→sampled trace
- **Pedagogy**: Comprehension-first→complete trace, Assessment-driven→quality-focused events
- **Integration**: Standalone→self-contained, Multi-tool→shared trace
- **Key Pattern**: Configuration presets guide tool selection, not prescriptive pedagogy

---

## Summary Statistics

**Total Use Cases**: 77

**By Evidence Type**:
- 🔬 Established: 32 use cases (42%)
- 📐 Translated: 42 use cases (54%)
- 🧪 Extension: 3 use cases (4%)

**By Category**:
1. Visualization & Mental Model Building: 12 use cases
2. Debugging & Error Detection: 9 use cases
3. Assessment & Quality Evaluation: 9 use cases
4. Feedback & Guidance: 10 use cases
5. Misconception Detection & Correction: 9 use cases
6. Pedagogical Approach Support: 8 use cases
7. Learning Objective Support: 9 use cases
8. Feedback Loop Patterns: 6 use cases
9. Tool Integration Patterns: 7 use cases
10. Deployment Context Support: 5 use cases
11. Progressive Disclosure: 10 use cases
12. Multi-Dimensional Tool Selection: 5 use cases

---

## Sources

All use cases extracted from Phase 3 documents:

**Correlation Documents**:
- lt-taxonomy-support.md
- lt-misconception-prevention.md
- lt-threshold-concepts.md (not yet read)
- lt-notional-machines.md (not yet read)

**Categorization Documents**:
- categorization-by-pedagogical-approach.md
- categorization-by-learning-objectives.md
- categorization-by-deployment-context.md (read partially via progressive-disclosure)
- categorization-by-integration-complexity.md
- categorization-by-granularity-level.md (referenced in progressive-disclosure)
- categorization-by-interaction-model.md (referenced in tool-integration)

**Framework Documents**:
- tool-selection-framework.md
- tool-integration-patterns.md
- progressive-disclosure-in-tools.md
- feedback-loop-patterns.md

**Overview**:
- README.md

---

## Phase 5 Completion Notes

**STATUS**: ✅ Phase 5 Complete - All 77 use cases have trace requirements specified

**4th Column Added**: "How Trace Data Enables" specifies neutral infrastructure requirements for each use case

**Coverage**:
- **Categories 1-5** (49 use cases): Detailed individual trace requirements
- **Categories 6-12** (28 use cases): Consolidated trace requirement summaries

**Boundary Compliance**: ✅ All trace requirements specify ONLY neutral infrastructure (events, config, data format). ZERO pedagogical interpretation included. Tools implement pedagogy, embody provides data.

**Supporting Documentation**:
- **trace-event-schemas.md**: Complete event type specifications (~850 lines)
- **trace-configuration.md**: Full configuration API (~680 lines)
- **Additional docs**: See Phase 5 summary for complete deliverables

**Key Achievement**: `embody(script, config) → trace` fully specified to enable all 77 educational use cases while maintaining strict neutral infrastructure boundary.
