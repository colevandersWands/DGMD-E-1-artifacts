# Embody Boundary Compliance Guide (Phase 3)

**Purpose**: Clear guidance on embody scope boundary - what belongs in infrastructure vs tools

**Audience**: Embody developers, tool developers, educators designing assessment tools

**Critical Principle**: Embody is neutral execution tracer providing DATA. Tools layer educational INTELLIGENCE on that data.

---

## The Boundary: Infrastructure vs Intelligence

### Embody's Responsibility (Infrastructure Layer)

**What embody does**:
```
embody(script, config) → trace
```

**Provides**:
1. **Execution event data**: 30+ event types capturing JavaScript execution semantics
2. **Configurable granularity**: 8-dimensional config system (variables, functions, scopes, control flow, async, objects, errors, expressions)
3. **Neutral data structures**: JSON/binary trace with events, timestamps, sequence IDs, source locations
4. **Performance options**: Sampling, streaming, event limits
5. **Value serialization**: Objects, primitives, functions, special values (TDZ, NaN)
6. **Ordering guarantees**: Sequence IDs for async ordering, timestamps for timing

**Does NOT provide**:
- ❌ Pedagogical interpretation (which patterns = which misconceptions)
- ❌ Feedback messages or explanations
- ❌ UI components or visualizations
- ❌ Assessment rubrics or scoring algorithms
- ❌ Student modeling or history tracking
- ❌ Task selection or difficulty adaptation
- ❌ Integration with external data (IDE logs, version control, test frameworks)

### Tool's Responsibility (Intelligence Layer)

**What tools do**:
```
tool(embody_trace, student_context, pedagogical_goals) → educational_outcome
```

**Provides**:
1. **Pattern interpretation**: Map trace patterns to educational constructs (misconceptions, threshold states, QLCs dimensions)
2. **Feedback generation**: Create explanations, hints, corrections based on trace analysis
3. **Visualization**: Render traces as tables, graphs, diagrams, animations
4. **Assessment logic**: Implement rubrics, scoring, grading based on trace data
5. **Student modeling**: Track student progress, misconception persistence, threshold crossing over time (longitudinal)
6. **Adaptive decisions**: Select tasks, adjust difficulty, trigger interventions based on student model
7. **Multi-source integration**: Combine trace data with IDE logs, version control, demographics, test results

**Uses embody for**:
- ✅ Execution behavior data (what happened during runtime)
- ✅ Event patterns revealing pedagogical constructs
- ✅ Ground truth for validating predictions, explanations
- ✅ Objective metrics for quality, complexity, correctness

---

## Decision Tree: Is This In Scope for Embody?

```
┌─────────────────────────────────────────────────┐
│  Does this require EXECUTING JavaScript code?  │
└─────────────┬───────────────────────────────────┘
              │
         Yes  │  No → OUT OF SCOPE
              ▼      (Use static analysis, IDE logs, etc.)
┌─────────────────────────────────────────────────┐
│  Does this involve RUNTIME BEHAVIOR?            │
│  (values, execution order, state changes)       │
└─────────────┬───────────────────────────────────┘
              │
         Yes  │  No → Probably OUT OF SCOPE
              ▼      (But check if observable at runtime)
┌─────────────────────────────────────────────────┐
│  Can this be captured as NEUTRAL EVENTS         │
│  without pedagogical interpretation?            │
└─────────────┬───────────────────────────────────┘
              │
         Yes  │  No → OUT OF SCOPE
              ▼      (Tool interprets events)
┌─────────────────────────────────────────────────┐
│  Is this a LANGUAGE FEATURE execution pattern?  │
│  (not tool-specific or context-specific)        │
└─────────────┬───────────────────────────────────┘
              │
         Yes  │  No → OUT OF SCOPE
              ▼      (Tool adds context/interpretation)
┌─────────────────────────────────────────────────┐
│           ✅ IN SCOPE for embody                │
│  Add as event type or extend existing event     │
└─────────────────────────────────────────────────┘
```

### Examples Through Decision Tree

#### Example 1: Hoisting misconception detection
- **Executes JS?** Yes (TDZ errors occur at runtime)
- **Runtime behavior?** Yes (accessing variable before declaration)
- **Neutral events?** Yes (`variable.tdz-access` event - no pedagogy, just fact)
- **Language feature?** Yes (TDZ is JavaScript semantic)
- **Result**: ✅ IN SCOPE - `variable.tdz-access` event type

#### Example 2: Misconception explanation generation
- **Executes JS?** No (explaining is tool function)
- **Result**: ❌ OUT OF SCOPE - Tool uses `variable.tdz-access` events to generate explanation

#### Example 3: Version control usage patterns
- **Executes JS?** No (git commits aren't JavaScript execution)
- **Result**: ❌ OUT OF SCOPE - IDE/environment concern, not execution tracer

#### Example 4: Event loop ordering
- **Executes JS?** Yes (microtasks execute at runtime)
- **Runtime behavior?** Yes (queue ordering affects execution)
- **Neutral events?** Yes (`microtask.queue`, `microtask.execute` - just facts)
- **Language feature?** Yes (microtask queue is JavaScript semantic)
- **Result**: ✅ IN SCOPE - `microtask.*` event types

#### Example 5: Naming quality assessment
- **Executes JS?** Yes (need to run to see which names are used)
- **Runtime behavior?** Yes (which variables are declared)
- **Neutral events?** Partially (variable name is fact; "quality" is interpretation)
- **Result**: ✅ Embody provides `variable.declare.variableName`, ❌ Tool assesses quality

#### Example 6: Code complexity visualization
- **Executes JS?** Yes (need execution to count branches taken)
- **Runtime behavior?** Yes (which branches execute, how many iterations)
- **Neutral events?** Partially (event counts are facts; "complex" is interpretation)
- **Result**: ✅ Embody provides `conditional.branch`, `loop.*` events, ❌ Tool calculates complexity metrics and renders visualization

---

## Common Boundary Violations to Avoid

### ❌ Violation 1: Pedagogical Metadata in Events

**Wrong** (embody providing pedagogical interpretation):
```typescript
interface VariableTDZAccessEvent {
  type: "variable.tdz-access";
  variableName: string;
  misconceptionType: "hoisting-confusion";  // ❌ Pedagogy in event
  suggestedFeedback: "Variables declared with let/const..."  // ❌ Feedback in event
}
```

**Correct** (neutral event, tool interprets):
```typescript
// Embody provides:
interface VariableTDZAccessEvent {
  type: "variable.tdz-access";
  scopeId: string;
  variableName: string;
  kind: "let" | "const";  // ✅ Neutral fact
}

// Tool interprets:
function detectMisconception(event: VariableTDZAccessEvent): Misconception {
  if (event.type === "variable.tdz-access") {
    return {
      type: "hoisting-confusion",
      feedback: "Variables declared with let/const..."
    };
  }
}
```

### ❌ Violation 2: Assessment Rubrics in Config

**Wrong** (embody implementing assessment logic):
```javascript
embody(script, {
  assessment: {
    gradingRubric: "QLCs",  // ❌ Grading logic in embody
    passingScore: 70,  // ❌ Scoring in embody
    feedbackLevel: "detailed"  // ❌ Feedback strategy in embody
  }
});
```

**Correct** (embody provides data, tool grades):
```javascript
// Embody config (neutral granularity):
const trace = embody(script, {
  granularity: {
    variables: "declarations-only",  // ✅ What to capture
    functions: "user-code-only",
    controlFlow: "detailed"
  },
  filters: { excludeBuiltins: true }
});

// Tool implements grading:
const qlcScore = assessQLCs(trace, {
  rubric: "QLCs",  // ✅ Tool's pedagogical choice
  passingScore: 70,
  feedbackLevel: "detailed"
});
```

### ❌ Violation 3: UI Rendering in Embody

**Wrong** (embody providing visualization):
```javascript
embody(script, {
  output: {
    format: "html-table",  // ❌ UI format
    highlightMisconceptions: true,  // ❌ Visual behavior
    colorScheme: "dark"  // ❌ Presentation
  }
});
```

**Correct** (embody provides data, tool renders):
```javascript
// Embody provides structured data:
const trace = embody(script, {
  output: {
    format: "json",  // ✅ Data format (neutral)
    ordering: "async-aware"  // ✅ Data structure choice
  }
});

// Tool renders:
const tableUI = renderTraceTable(trace, {
  highlightMisconceptions: true,  // ✅ Tool's UI choice
  colorScheme: "dark"
});
```

### ❌ Violation 4: Student Modeling in Embody

**Wrong** (embody tracking student history):
```javascript
embody(script, {
  studentId: "student123",  // ❌ Student tracking
  previousAttempts: 5,  // ❌ Longitudinal data
  knownMisconceptions: ["hoisting", "coercion"]  // ❌ Student model
});
```

**Correct** (embody is stateless, tool tracks):
```javascript
// Embody is stateless (one execution):
const trace = embody(script, {
  // No student-specific info
  granularity: { ... }
});

// Tool maintains student model:
studentModel.addTrace(trace, {
  studentId: "student123",  // ✅ Tool's data
  attemptNumber: 6,
  updateMisconceptions: (trace) => detectNewMisconceptions(trace)
});
```

### ❌ Violation 5: Task Selection in Embody

**Wrong** (embody selecting exercises):
```javascript
embody(script, {
  adaptive: {
    selectNextTask: true,  // ❌ Pedagogical decision
    difficultyLevel: "medium",  // ❌ Task choice
    scaffoldingLevel: 3  // ❌ Intervention strategy
  }
});
```

**Correct** (embody traces, tool adapts):
```javascript
// Embody traces whatever code is given:
const trace = embody(currentTask.script, {
  granularity: { ... }  // ✅ Just config for this execution
});

// Tool selects next task:
const nextTask = adaptiveEngine.selectTask({
  previousTrace: trace,  // ✅ Tool uses trace as input
  studentModel: model,
  difficultyProgression: "gradual"
});
```

---

## Scope Classification by Assessment Use Case

### ✅ Fully In Scope (36 use cases - 72%)

**Embody provides ALL needed execution data**:

- **Misconception detection**: Events reveal misconception patterns (TDZ, coercion, closures)
- **QLCs quality assessment**: Events provide naming, API usage, algorithm patterns
- **Threshold concept verification**: Events show threshold-specific behaviors (closure capture, async ordering, prototype delegation)
- **Comprehension verification**: Traces provide ground truth for prediction comparison
- **Algorithm detection**: Control flow events reveal algorithmic approaches
- **Pattern recognition**: Event sequences match design patterns

**Examples**: 1.2 (Misconception feedback), 2.1 (QLCs grading), 3.1 (Pattern detection), 4.1-4.6 (All QLCs), 6.2 (Prediction tasks), 10.1 (BSI assessment)

### 🟡 Partially In Scope (6 use cases - 12%)

**Embody provides execution data, tools add external data**:

- **Longitudinal tracking**: Embody provides per-execution data; tools track across time
  - Threshold state detection (pre/liminal/post requires multiple traces)
  - Misconception persistence (same misconception across executions)
  - Adaptive profiling (student model evolves with history)

- **Multi-source integration**: Embody provides execution; tools add environment data
  - Debugging strategy classification (execution errors + IDE debugger usage)
  - Process + product evaluation (execution quality + version control patterns)

**Examples**: 1.6 (Liminal state scaffolding), 3.3 (Threshold state detection), 5.1 (Debugging strategy), 8.1-8.5 (All adaptive - require longitudinal data)

### ❌ Out of Scope (8 use cases - 16%)

**Require non-execution data**:

- **Static analysis**: 1.1 (Syntax error detection) - no execution, parser/linter concern
- **Development environment**: 5.2 (Development patterns), 5.3 (Revision behavior), 5.4 (Tool usage) - version control, IDE logs
- **Hybrid assessment**: 7.5 (Professional tool integration) - tool usage patterns, not execution

**Strategy**: Tools combine embody traces with other data sources for hybrid assessment.

---

## Boundary Rationale: Why This Separation Matters

### 1. **Enables Innovation**

**Neutral infrastructure allows tools to experiment with pedagogy without changing embody**:

- Same trace data can support formative feedback (immediate), diagnostic detection (passive), adaptive scaffolding (personalized)
- Tools can implement different pedagogies (constructivist, behaviorist, socratic) using same events
- New pedagogical theories (not yet invented) can use existing infrastructure

**Example**: `variable.tdz-access` event enables:
- Formative tool: "You accessed `x` before declaration - let/const are hoisted differently than var"
- Diagnostic tool: Silent logging "Student has hoisting misconception"
- Adaptive tool: "This is the 3rd TDZ error - triggering intensive hoisting review"

**Same event, three pedagogical approaches** - innovation at tool layer.

### 2. **Prevents Lock-In**

**Embody doesn't dictate pedagogy, so tools can compete on educational quality**:

- Different tools can target different learning theories
- Educators choose tools based on pedagogical fit, not infrastructure limitations
- Tools improve through competition (better feedback, better visualizations, better adaptation)

**If embody encoded pedagogy**, all tools would be constrained to embody's pedagogical assumptions.

### 3. **Simplifies Maintenance**

**Embody focuses on execution semantics (stable), tools focus on pedagogy (evolving)**:

- JavaScript semantics change slowly (ECMAScript spec updates)
- Pedagogical research evolves rapidly (new misconception findings, new frameworks)
- Separation allows independent evolution

**Example**: If new research identifies a misconception, tools update detection logic - embody unchanged.

### 4. **Enables Composition**

**Neutral data allows tools to combine in unanticipated ways**:

- Tool A: Misconception detector using embody traces
- Tool B: Visualization library rendering embody traces
- Tool C: Adaptive engine using Tool A's detections + embody traces
- Tool D: Assessment platform combining Tool A + Tool B + Tool C

**If embody had opinions**, composition would be constrained by those opinions.

### 5. **Supports Research**

**Researchers can validate pedagogical hypotheses using neutral data**:

- Hypothesis: "Coercion misconceptions predict poor performance in X"
- Test: Analyze embody traces for coercion patterns, correlate with outcomes
- No embody changes needed - data is already neutral

**If embody encoded pedagogy**, research would test embody's assumptions, not independent hypotheses.

---

## Boundary Checklist for Developers

### When Adding Event Types

Ask yourself:

- ✅ Is this a JavaScript language feature execution pattern?
- ✅ Can this be described neutrally without pedagogical interpretation?
- ✅ Would multiple tools with different pedagogies find this event useful?
- ❌ Does this event presuppose a specific pedagogical theory?
- ❌ Does this event contain feedback, explanations, or assessment logic?

**If ANY ❌ is "yes"**, reconsider - might be tool responsibility.

### When Adding Config Options

Ask yourself:

- ✅ Does this control WHAT events are generated (granularity)?
- ✅ Does this control performance/output format (technical concerns)?
- ❌ Does this control HOW events are interpreted (pedagogical concerns)?
- ❌ Does this control WHEN feedback is shown (educational timing)?
- ❌ Does this control WHO gets what difficulty (adaptive concerns)?

**If ANY ❌ is "yes"**, move to tool layer.

### When Adding Data Fields

Ask yourself:

- ✅ Is this field an objective fact about execution (value, type, location)?
- ✅ Is this field derivable from language semantics (not pedagogy)?
- ❌ Is this field an interpretation or categorization (misconception type, quality score)?
- ❌ Is this field a recommendation or suggestion (feedback level, next task)?

**If ANY ❌ is "yes"**, tool should compute from neutral fields.

---

## Examples of Correct Boundary Application

### Example 1: Type Coercion Detection

**Embody provides**:
```typescript
{
  type: "expression.binary",
  operator: "==",
  left: { type: "primitive", valueType: "number", value: 0 },
  right: { type: "primitive", valueType: "string", value: "" },
  result: { type: "primitive", valueType: "boolean", value: true },
  coercionOccurred: true  // ✅ Objective fact
}
```

**Tool interprets**:
```javascript
function detectCoercionMisconception(events) {
  const coercionEvents = events.filter(e =>
    e.type === "expression.binary" && e.coercionOccurred
  );

  if (coercionEvents.length > 3) {
    return {
      misconception: "type-coercion-confusion",  // Tool's categorization
      feedback: "You're using == which coerces types. Consider === for strict equality.",  // Tool's pedagogy
      severity: "medium"  // Tool's assessment
    };
  }
}
```

**Boundary respected**: Embody provides `coercionOccurred` boolean (fact), tool decides what it means and what to do about it.

### Example 2: Closure Understanding

**Embody provides**:
```typescript
{
  type: "closure.capture",
  functionId: "fn_123",
  capturedScopeId: "scope_outer",
  capturedVariables: ["counter"]
}
```

**Tool interprets**:
```javascript
function assessClosureUnderstanding(trace, studentPrediction) {
  const closureEvents = trace.filter(e => e.type === "closure.capture");

  // Tool checks if student predicted closure correctly
  if (studentPrediction.capturedVars !== closureEvents[0].capturedVariables) {
    return {
      state: "pre-threshold",  // Tool's classification
      feedback: "The inner function captured 'counter' from outer scope...",  // Tool's explanation
      scaffoldingLevel: "high"  // Tool's adaptive decision
    };
  }
}
```

**Boundary respected**: Embody provides which variables were captured (fact), tool assesses understanding and provides scaffolding.

### Example 3: QLCs Naming Quality

**Embody provides**:
```typescript
{
  type: "variable.declare",
  scopeId: "scope_1",
  variableName: "x",  // ✅ Objective fact
  kind: "let",
  inTDZ: true
}
```

**Tool assesses**:
```javascript
function assessNamingQuality(trace) {
  const declarations = trace.filter(e => e.type === "variable.declare");
  const names = declarations.map(e => e.variableName);

  // Tool's quality rules
  const singleLetterNames = names.filter(n => n.length === 1 && n !== 'i');
  const quality = {
    descriptiveness: singleLetterNames.length === 0 ? "good" : "poor",  // Tool's assessment
    feedback: singleLetterNames.length > 0
      ? `Avoid single-letter names like ${singleLetterNames.join(', ')}`  // Tool's feedback
      : "Good descriptive names!",
    score: 100 - (singleLetterNames.length * 10)  // Tool's scoring
  };

  return quality;
}
```

**Boundary respected**: Embody provides variable name string (fact), tool evaluates quality against conventions.

---

## Future-Proofing the Boundary

### Anticipated Challenges

**Challenge 1**: "But we need assessment-specific optimizations!"

**Response**: Use config granularity, not assessment modes.
- ❌ Wrong: `embody(script, { mode: "formative" })`
- ✅ Correct: `embody(script, { granularity: { variables: "declarations-only", ... } })`

Tools choose config based on assessment needs; embody just provides requested granularity.

**Challenge 2**: "But detecting misconceptions requires pedagogy!"

**Response**: Detection PATTERNS are tool responsibility, EVENTS are embody responsibility.
- Embody: Provides `variable.tdz-access`, `expression.binary` with `coercionOccurred`
- Tools: Implement pattern matching ("3+ coercion events = misconception")

**Challenge 3**: "But different tools need different events!"

**Response**: If multiple tools with different pedagogies need an event, it's infrastructure.
- Example: Formative tool, diagnostic tool, adaptive tool ALL need `closure.capture`
- Solution: Add `closure.capture` to embody (multiple pedagogies use it)

**If ONLY ONE pedagogical approach needs it**, likely tool-specific logic, not infrastructure.

---

## Meta-Principle: The "Google Maps" Analogy

**Embody is like GPS satellites** (infrastructure):
- Provides location data (lat/long coordinates)
- Neutral to use case (driving, walking, running, cycling)
- Doesn't dictate routes or destinations

**Tools are like navigation apps** (intelligence):
- Use GPS data to provide directions
- Optimize for different goals (fastest route, scenic route, avoid tolls)
- Add context (traffic, elevation, points of interest)
- Provide user experience (voice guidance, visual maps)

**If GPS satellites started dictating routes**, navigation apps couldn't innovate.

**Same principle**: Embody provides execution data (coordinates), tools provide educational guidance (navigation).

---

## Summary: The Boundary in One Sentence

**Embody answers "WHAT happened during execution?" (facts)**

**Tools answer "What does this MEAN for learning?" (pedagogy)**

Keep this distinction clear, and embody will enable unimagined pedagogical innovations.
