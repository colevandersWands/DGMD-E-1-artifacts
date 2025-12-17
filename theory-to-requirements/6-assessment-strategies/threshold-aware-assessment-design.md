# Threshold-Aware Assessment Design

**Integration**: [`/3-threshold-concepts/`](../3-threshold-concepts/) ↔ [`/6-assessment-strategies/`](./README.md)

**Purpose**: Apply threshold concept theory to assessment design, revealing how to detect liminal states, time interventions appropriately, and measure transformative understanding shifts in JavaScript learning.

---

## Why Threshold-Aware Assessment Matters

### The Transformative Learning Problem

**Research foundation** (Meyer & Land 2003, Boustedt et al. 2007): Some concepts are qualitatively different from incremental learning—they transform how students see the entire domain. Traditional assessment treats all learning as cumulative, missing these discontinuous shifts.

**Threshold concept characteristics**:
1. **Transformative**: Irreversibly changes understanding
2. **Integrative**: Connects previously disconnected knowledge
3. **Troublesome**: Counter-intuitive, emotionally difficult
4. **Bounded**: Defines disciplinary territory
5. **Irreversible**: Unlikely to be unlearned

**JavaScript threshold concepts** (from `/3-threshold-concepts/`):
1. **Asynchronous Execution**: Understanding event loop coordination (not sequential line-by-line)
2. **Closures & Lexical Scoping**: Functions capturing environment (not isolated units)
3. **Prototypal Inheritance**: Delegation chains (not class copying)
4. **Recursion**: Self-reference with base cases (not just iteration)

### Traditional Assessment Failure

**What traditional assessment tests**:
- Incremental skill accumulation
- Knowledge recall
- Isolated concept application
- Performance on known problem types

**What it misses**:
- **Pre-threshold vs post-threshold states**: Student in liminal zone needs different assessment than post-threshold mastery
- **Transformation timing**: Can't assess threshold mastery before crossing—premature assessment frustrates
- **Integrative understanding**: Threshold crossing connects concepts; assess integration, not isolated pieces
- **Troublesome knowledge**: Confusion is normal pre-threshold; assess willingness to persist, not just correctness

**Example**:
```javascript
// Assessing closures traditionally
Question: "What does this code print?"
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}

// Traditional scoring: Correct (3,3,3) or Incorrect
// Problem: Doesn't distinguish:
// - Pre-threshold: "Closures are broken/confusing"
// - Liminal: "I see closures capture something, but why references not values?"
// - Post-threshold: "Closures capture references, var is function-scoped, callbacks execute after loop"
```

### What Threshold-Aware Assessment Provides

**Liminal state detection**: Identify students in transition, provide supportive scaffolding rather than grading

**Timing sensitivity**: Assess readiness for threshold crossing, not premature mastery

**Integration measurement**: Test whether concepts connected post-threshold, not just individual skill presence

**Longitudinal tracking**: Measure transformative shifts across sessions, not single-point performance

---

## Assessing the 4 JavaScript Threshold Concepts

### Threshold 1: Asynchronous Execution

**The transformation**: From "code runs line-by-line" → "event loop coordinates interleaved execution"

**Pre-threshold indicators**:
- Treats `setTimeout`, Promises, `await` as identical "wait" mechanisms
- Expects async code to complete before next synchronous line
- Confused by callback timing, no mental model of queues
- Trial-and-error with async patterns

**Liminal state indicators** (stuck between models):
- Recognizes timing issues but can't predict order
- Understands callbacks queue "somewhere" but not event loop phases
- Can use `await` syntax but confused when multiple async operations combine
- Partial understanding: "Promises are async" but not microtask vs macrotask distinction

**Post-threshold indicators**:
- Confidently predicts execution order (sync → microtask → macrotask)
- Explains event loop phases systematically
- Transfers understanding to novel async patterns
- Debugging async issues reveals model-based reasoning (not trial-and-error)

#### Assessment Strategies for Async Threshold

**Pre-threshold assessment** (Diagnostic, not graded):
- **Purpose**: Detect conceptual readiness
- **Format**: Prediction tasks with explanation
  ```javascript
  console.log('A');
  setTimeout(() => console.log('B'), 0);
  console.log('C');
  // Predict order: ____
  // Explain why: ____
  ```
- **Analysis**: Incorrect predictions with "line-by-line" explanations → Pre-threshold state
- **Intervention**: Don't assess mastery yet—teach event loop model explicitly

**Liminal state assessment** (Formative, scaffolded):
- **Purpose**: Support transition, detect progress
- **Format**: Guided tracing with partial model provided
  ```javascript
  // Event loop phases: 1) Execute sync code 2) Run microtasks 3) Run next macrotask
  // Label each console.log with phase number
  console.log('A');              // Phase: ___
  Promise.resolve().then(() =>   // Phase: ___
    console.log('B')
  );
  setTimeout(() =>                // Phase: ___
    console.log('C'), 0
  );
  console.log('D');               // Phase: ___
  ```
- **Analysis**: Partial correctness indicates liminal state—some event loop understanding emerging
- **Feedback**: Reinforce correct phase identifications, explain errors with explicit event loop model

**Post-threshold assessment** (Summative, full mastery):
- **Purpose**: Verify transformation, test integration
- **Format**: Complex async scenarios, transfer to novel contexts
  ```javascript
  // Predict order, explain using event loop model
  async function complex() {
    console.log('1');
    setTimeout(() => console.log('2'), 0);
    await Promise.resolve();
    console.log('3');
    setTimeout(() => console.log('4'), 0);
  }
  Promise.resolve().then(() => console.log('5'));
  complex();
  console.log('6');
  ```
- **Rubric**:
  - Correct order: 4 points (Behavior)
  - Event loop explanation: 4 points (Conceptual model—Strategy)
  - Transfer: Novel scenario prediction: 4 points (Extended Abstract)
  - Total: 12 points (BSI-style multi-dimensional)

**Trace data requirements**:
- Task queue events (macrotask enqueue/dequeue)
- Microtask queue events (Promise .then() handlers)
- Call stack state (empty triggers event loop tick)
- async/await suspension/resumption
- Promise state transitions

**Taxonomy connections**:
- **SOLO Relational**: Event loop integrates sync execution + callbacks + Promises into unified model
- **Block Model Level 2**: Trace async execution (what happens)
- **Block Model Level 3**: Explain why event loop designed this way (single-threaded concurrency)

**Assessment timing**:
- **Pre-threshold**: After basic function/callback exposure, before expecting mastery
- **Liminal**: During first 2-4 weeks of async instruction
- **Post-threshold**: After sustained practice, typically 4-8 weeks

**Critical insight**: Async is troublesome—confusion is normal. Premature grading discourages persistence. Formative assessment during liminal phase is critical.

---

### Threshold 2: Closures & Lexical Scoping

**The transformation**: From "functions are isolated units" → "functions capture their lexical environment"

**Pre-threshold indicators**:
- Treats functions as procedure boxes with inputs/outputs only
- Surprised when inner function accesses outer variable
- Confused by variable persistence after function returns
- No mental model of scope chains or capture

**Liminal state indicators**:
- Recognizes closures "remember" something but vague about what/how
- Confused by closure + loop variable capture (classic var mistake)
- Can create simple closures but can't predict behavior in novel contexts
- Uses closures without understanding why they work

**Post-threshold indicators**:
- Explains closures as capturing environment (references not values)
- Predicts closure behavior systematically using scope chain model
- Understands let vs var in closures (block vs function scope interaction)
- Applies closures intentionally for data hiding, callbacks, function factories

#### Assessment Strategies for Closure Threshold

**Pre-threshold assessment**:
- **Purpose**: Detect scope understanding readiness
- **Format**: Simple nested function scenarios
  ```javascript
  function outer() {
    let x = 5;
    function inner() {
      console.log(x);
    }
    inner();
  }
  outer(); // What prints?
  ```
- **Analysis**: If student surprised inner accesses x → Pre-threshold (no scope chain model)
- **Intervention**: Teach lexical scoping explicitly before closure complexity

**Liminal state assessment**:
- **Purpose**: Scaffold transition with guided exploration
- **Format**: Contrast cases revealing capture mechanism
  ```javascript
  // Scenario A
  function makeAdder(n) {
    return function(x) { return x + n; };
  }
  const add5 = makeAdder(5);
  console.log(add5(3)); // ?

  // Scenario B
  for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
  }
  // What prints?

  // Scenario C
  for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
  }
  // What prints?
  ```
- **Analysis**:
  - A correct, B incorrect → Understands basic closure, not var scoping
  - A correct, B/C both incorrect → Partial closure model, no reference vs value distinction
  - All correct → Post-threshold emerging
- **Feedback**: Use minimal pairs (B vs C) to make scope difference explicit

**Post-threshold assessment**:
- **Purpose**: Verify integration with memory model, scope chain, variable lifecycle
- **Format**: Design task requiring intentional closure use
  ```javascript
  // Task: Implement private counter (no globals)
  // Counter should:
  // - Start at 0
  // - increment() increases by 1
  // - getValue() returns current count
  // - reset() sets to 0
  // - Multiple counters independent
  ```
- **Rubric**:
  - Uses closure: 3 points (Implementation)
  - Encapsulates state: 3 points (Design—Strategy)
  - Correct behavior: 3 points (Behavior)
  - Explains mechanism: 3 points (Conceptual—Block Model L3)
  - Total: 12 points

**Trace data requirements**:
- Scope enter/exit events (function scope, block scope)
- Variable capture events (closure creation)
- Closure invocation with captured scope access
- Variable resolution path (which scope provided binding)

**Assessment progression**:
1. **Week 1-2**: Pre-threshold (nested functions, scope awareness)
2. **Week 3-5**: Liminal (closure recognition, partial understanding)
3. **Week 6+**: Post-threshold assessment (integration, design application)

**Connection to other thresholds**: Closures + async = powerful but complex. Assess closures before async+closure integration.

---

### Threshold 3: Prototypal Inheritance

**The transformation**: From "objects inherit by copying" → "objects delegate to prototype chain"

**Pre-threshold indicators**:
- Applies class-based OOP mental model to JavaScript
- Expects method copying when creating objects
- Confused by property lookup behavior
- Doesn't distinguish own properties vs inherited

**Liminal state indicators**:
- Recognizes prototype exists but vague about mechanism
- Confused by `__proto__` vs `prototype` distinction
- Can use `class` syntax but doesn't understand underlying prototypes
- Surprised when prototype changes affect existing objects

**Post-threshold indicators**:
- Explains delegation vs copying systematically
- Traces property lookup through prototype chain
- Understands `class` as syntactic sugar over prototypes
- Chooses appropriate patterns (delegation, composition, mixins)

#### Assessment Strategies for Prototype Threshold

**Pre-threshold assessment**:
- **Purpose**: Detect OOP background, class-based assumptions
- **Format**: Property lookup prediction
  ```javascript
  const obj = { a: 1 };
  console.log(obj.toString); // ?
  ```
- **Analysis**: Student who expects undefined has no prototype model
- **Intervention**: Teach delegation before prototype complexity

**Liminal state assessment**:
- **Format**: Diagram tasks making chain explicit
  ```javascript
  function Animal(name) { this.name = name; }
  Animal.prototype.speak = function() { return 'Sound'; };

  const dog = new Animal('Rex');

  // Draw memory diagram showing:
  // - dog object
  // - Animal.prototype object
  // - Links between them
  // - Where is 'name' stored?
  // - Where is 'speak' stored?
  ```
- **Analysis**: Correct diagram indicates emerging prototype chain understanding

**Post-threshold assessment**:
- **Format**: Design comparison task
  ```javascript
  // Compare two approaches for creating animals:
  // Approach A: Methods in constructor
  function AnimalA(name) {
    this.name = name;
    this.speak = function() { return 'Sound'; };
  }

  // Approach B: Methods on prototype
  function AnimalB(name) { this.name = name; }
  AnimalB.prototype.speak = function() { return 'Sound'; };

  // Questions:
  // 1. What's different in memory for 1000 animals?
  // 2. What happens if you change speak() after creating animals?
  // 3. Which is better? Why?
  ```
- **Rubric**: Assesses memory model + prototype chain integration

**Trace data requirements**:
- Object creation with prototype link
- Property access (own vs inherited)
- Prototype chain traversal
- `new` invocation (constructor execution, prototype linking)

**Modern JavaScript note**: Many students only learn `class` syntax. Assessment should verify understanding of underlying mechanism, not just surface syntax.

---

### Threshold 4: Recursion

**The transformation**: From "loops solve repeated tasks" → "self-reference with base cases solves decomposable problems"

**Pre-threshold indicators**:
- Attempts iteration for all repetition
- Confused by self-referencing function calls
- No base case concept (infinite recursion)
- Can't decompose problems into smaller subproblems

**Liminal state indicators**:
- Recognizes recursion pattern but struggles to construct
- Understands base case necessity but unclear when it applies
- Can trace simple recursion (factorial) but not complex (tree traversal)
- Stack overflow confusion (no call stack mental model)

**Post-threshold indicators**:
- Confidently identifies recursive vs iterative problems
- Constructs base case + recursive case systematically
- Traces recursion using call stack visualization
- Explains when recursion preferable (tree structures, divide-and-conquer)

#### Assessment Strategies for Recursion Threshold

**Pre-threshold assessment**:
- **Format**: Tracing simple recursion
  ```javascript
  function countdown(n) {
    if (n === 0) return;
    console.log(n);
    countdown(n - 1);
  }
  countdown(3);
  // What prints?
  ```
- **Analysis**: Student who can't trace lacks call stack model—prerequisite for recursion

**Liminal state assessment**:
- **Format**: Guided construction with scaffolding
  ```javascript
  // Task: Sum array recursively
  // Given: function sum(arr)
  // Base case: If array empty, return ___
  // Recursive case: Return arr[0] + sum(___)
  ```
- **Analysis**: Can complete with guidance → Liminal. Needs scaffolding removal progressively.

**Post-threshold assessment**:
- **Format**: Problem requiring recursion (tree, graph, divide-conquer)
  ```javascript
  // Task: Flatten nested array
  // Input: [1, [2, [3, 4]], 5]
  // Output: [1, 2, 3, 4, 5]
  // Implement recursively
  ```
- **Rubric**:
  - Identifies recursion needed: 2 points (Strategy)
  - Correct base case: 3 points (Conceptual)
  - Correct recursive case: 3 points (Conceptual)
  - Working implementation: 2 points (Behavior)
  - Explains call stack: 2 points (Integration with Call Stack NM)
  - Total: 12 points

**Trace data requirements**:
- Function call depth tracking (stack frames)
- Parameter values at each recursion level
- Return value propagation up stack
- Base case execution detection

**Research backing**: Recursion is well-researched threshold (Booth 1992, Sanders & McCartney 2017). Most students struggle initially, breakthrough often sudden.

---

## Threshold-Aware Assessment Design Principles

### Principle 1: Detect Liminal States, Don't Grade Them

**Rationale**: Students in liminal state are confused but learning—grading confusion punishes normal learning process.

**Strategy**: Formative assessment during transition, summative only post-threshold.

**Example**:
- **Week 1-3** (async instruction): Prediction tasks with feedback, no grades
- **Week 4-6** (liminal period): Scaffolded practice, track progress, no penalties
- **Week 7+** (post-threshold): Graded assessments verifying transformation

**Implementation**: Trace-based tools can detect liminal patterns (inconsistent predictions, partial correctness) and trigger supportive feedback instead of grading.

### Principle 2: Assess Integration, Not Isolation

**Rationale**: Threshold crossing connects previously separate knowledge—assess connections, not memorized facts.

**Strategy**: Post-threshold tasks require applying multiple concepts together.

**Example** (Closures threshold):
- **Pre-threshold**: "What is a closure?" (Definition recall—insufficient)
- **Post-threshold**: "Use closures to implement private state + async callbacks" (Integration of closure + memory model + event loop)

**Rubric focus**: Integration points explicitly scored separately from individual concept correctness.

### Principle 3: Expect Non-Linearity

**Rationale**: Threshold crossing is discontinuous—students may show sudden improvement or prolonged struggle followed by rapid mastery.

**Strategy**: Longitudinal tracking, not single-point assessment.

**Implementation**:
- Track student performance on threshold-related tasks across sessions
- Detect breakthrough patterns (sudden accuracy increase, explanation quality shift)
- Don't conclude "can't learn recursion" from early struggle—threshold may still be crossed later

**Trace data value**: Longitudinal traces show learning trajectory, revealing liminal→post-threshold transitions.

### Principle 4: Provide Liminal Scaffolding

**Rationale**: Confusion during transition is productive if scaffolded, destructive if abandoned.

**Strategy**: Liminal-specific interventions (not beginner nor advanced support).

**Scaffolding types**:
- **Partial model provision**: Give event loop diagram, ask students to map code to phases
- **Contrast cases**: Show working vs broken examples, ask what differs
- **Guided tracing**: Trace first 2 steps, student continues
- **Meta-cognitive prompts**: "What's confusing here? What do you predict vs observe?"

**Adaptive assessment**: Tools detect liminal state → Trigger scaffolding → Gradually reduce as post-threshold emerges.

### Principle 5: Celebrate Transformation

**Rationale**: Threshold crossing is significant achievement—recognition reinforces learning.

**Strategy**: Explicit threshold-crossing acknowledgment when detected.

**Example feedback**:
- Pre-threshold: "You're building toward understanding async execution—confusion is normal"
- Liminal: "You're starting to see how the event loop coordinates execution—keep exploring"
- Post-threshold: "You've crossed the async threshold! You're now consistently predicting execution order using the event loop model. This is a major milestone."

**Motivation impact**: Students who recognize threshold crossing are more likely to persist with next threshold.

---

## Assessment Timing: The Threshold-Readiness Problem

### The Challenge

Assessing threshold mastery before student is ready is:
- **Invalid**: Measures lack of exposure, not inability
- **Frustrating**: Student knows they haven't learned yet
- **Demotivating**: Failure on concepts they weren't taught

**But**: How to know when student is threshold-ready?

### Readiness Indicators

**Pre-requisites met**:
- Closures: Requires scope understanding, function execution model
- Async: Requires callback understanding, event loop exposure
- Prototypes: Requires object creation, property access understanding
- Recursion: Requires call stack model, base case concept

**Assessment strategy**: Check pre-requisites first. If lacking, assess pre-requisites, not threshold.

**Engagement patterns**:
- Student attempting threshold-related problems (signals readiness)
- Repeated errors in threshold domain (indicates liminal state, not lack of exposure)
- Asking threshold-specific questions

**Trace indicators**:
- Code patterns showing partial threshold application (e.g., closures used but incorrectly)
- Increasing task complexity in threshold domain
- Debugging behavior shift (from random changes to model-based reasoning)

### Progressive Exposure Strategy

**Phase 1: Pre-threshold** (1-2 weeks)
- Introduce concept, build pre-requisites
- No threshold assessment, focus on foundations
- Diagnostic tasks detect readiness

**Phase 2: Liminal** (3-6 weeks)
- Intensive practice with scaffolding
- Formative assessment frequent, summative rare
- Track progress, detect transition

**Phase 3: Post-threshold** (ongoing)
- Integration practice, transfer tasks
- Summative assessment appropriate
- Maintenance, application to novel contexts

**Individual variation**: Some students cross quickly (2-3 weeks), others slowly (2-3 months). Assessment timing must adapt.

**Tool opportunity**: Learning analytics detect when individual students transition phases, trigger appropriate assessment type.

---

## Threshold Assessment × Educational Taxonomies

### SOLO Taxonomy × Threshold Concepts

| SOLO Level | Threshold State | Assessment Focus | Example (Async) |
|-----------|----------------|------------------|-----------------|
| **Prestructural** | Pre-threshold, no model | Foundation building | Can write callback syntax? |
| **Unistructural** | Pre-threshold, single elements | Element recognition | Knows setTimeout delays execution? |
| **Multistructural** | Liminal, multiple elements disconnected | Element coordination | Distinguishes setTimeout, Promises (separately)? |
| **Relational** | Post-threshold, integrated model | Model application | Predicts execution order using event loop? |
| **Extended Abstract** | Post-threshold, transfer | Novel context application | Applies event loop to Node.js streams, workers? |

**Key insight**: Threshold crossing often coincides with SOLO Multistructural → Relational transition. This is the integrative moment.

**Assessment implication**: Relational-level assessment detects threshold crossing. Don't assess Relational before liminal period—tests transformation prematurely.

### Block Model × Threshold Concepts

| Block Model Level | Threshold Assessment | Example |
|-------------------|---------------------|---------|
| **Text Surface (Level 1)** | Pre-threshold syntax | Identify async keywords (async, await, Promise) |
| **Program Model (Level 2)** | Liminal/Post-threshold execution | Trace async code through event loop phases |
| **Situation Model (Level 3)** | Post-threshold design | Choose async patterns for problem (callbacks vs Promises vs async/await) |

**Block Model Level 2** is the threshold crossing zone—students move from syntax (L1) to execution understanding (L2).

**Assessment strategy**: Level 2 tasks detect threshold state (can trace = post-threshold, can't trace = liminal or pre-threshold).

### BSI × Threshold Concepts

| BSI Dimension | Threshold Assessment | Example (Closures) |
|--------------|---------------------|-------------------|
| **Behavior** | Post-threshold prediction | Closure prints captured variable value correctly |
| **Strategy** | Post-threshold design | Uses closure for data hiding when appropriate |
| **Implementation** | Pre-threshold syntax | Can write function-in-function syntax |

**Threshold progression**: Implementation → Behavior → Strategy. Students learn syntax (Implementation) before understanding (Behavior) before appropriate application (Strategy).

**Assessment focus**: Implementation assessment pre-threshold, Behavior assessment during liminal/post-threshold, Strategy assessment post-threshold only.

---

## Research Gaps and Tool Development Opportunities

### Threshold Detection Validation

**Gap**: No validated instruments for detecting threshold states in programming.

**Challenge**: Distinguishing liminal from simply confused, post-threshold from memorized patterns.

**Research needed**: Ground truth threshold state labels (expert coding of student work), automated detection correlation with expert judgment.

**Tool opportunity**: Trace-based liminal state detection—correlate execution patterns with liminal indicators (inconsistent predictions, partial correctness, struggle duration).

### Threshold Crossing Timing

**Gap**: Unknown average crossing time, individual variation, factors predicting speed.

**Questions**:
- How long does typical student spend in liminal state per threshold?
- What percentage never cross certain thresholds?
- Do some thresholds require maturation time (can't be rushed)?

**Tool opportunity**: Longitudinal trace data tracking students from pre-threshold through post-threshold, identifying crossing moments and duration.

### Scaffolding Effectiveness

**Gap**: Limited research on what interventions help during liminal state.

**Questions**:
- Diagrams vs traces vs explanations—what works best?
- Should liminal students practice or receive more instruction?
- Can peer discussion accelerate threshold crossing?

**Tool opportunity**: A/B testing scaffold types, measuring impact on crossing speed and success rate.

### Multiple Threshold Interactions

**Gap**: Unknown whether thresholds must be crossed sequentially or can be simultaneous.

**Questions**:
- Is closures prerequisite for async, or independent?
- Does recursion threshold help or hinder prototypes?
- Can students cross multiple thresholds in single course?

**Tool opportunity**: Correlation analysis of threshold crossing order and overall success.

### Cultural Variations

**Gap**: Threshold research largely Western; threshold characteristics may vary across cultures.

**Questions**:
- Are same concepts troublesome across cultures?
- Do metaphors (stack, queue, chain) work universally?
- Does pedagogical sequence affect which concepts become thresholds?

**Tool opportunity**: Multi-cultural deployment, threshold detection comparison across populations.

---

## Practical Implications for Assessment Tool Developers

### What Trace Infrastructure Must Provide

**For threshold detection**:

| Threshold | Critical Trace Data |
|----------|---------------------|
| **Async** | Task/microtask queues, callback execution timing, stack empty detection, Promise state changes |
| **Closures** | Scope chains, variable capture, closure invocation with captured scope access |
| **Prototypes** | Property lookup paths (own vs inherited), prototype chain traversal, object creation with links |
| **Recursion** | Call depth tracking, parameter values per level, return value propagation, base case hits |

**Longitudinal requirements**:
- Cross-session tracking (student ID, timestamp)
- Task history (which problems attempted, success/failure)
- Performance trends (accuracy over time, explanation quality)

### What Assessment Tools Must Implement

**Threshold state detection**:
- Pre-threshold: Recognize lack of model (random predictions, no systematic errors)
- Liminal: Detect partial understanding (inconsistent correct predictions, model emerging)
- Post-threshold: Verify transformation (consistent accuracy, model-based explanations)

**Adaptive assessment**:
- Select task difficulty based on detected threshold state
- Provide scaffolding during liminal state
- Challenge post-threshold students with integration/transfer

**Longitudinal tracking**:
- Chart progress across sessions
- Detect breakthrough moments (sudden accuracy increase)
- Flag prolonged liminal state (intervention needed)

**Feedback design**:
- Pre-threshold: Foundation building, no expectation of mastery
- Liminal: Normalize confusion, provide scaffolding, encourage persistence
- Post-threshold: Celebrate achievement, provide integration challenges

### Assessment Workflow

**Step 1**: Assess pre-requisites (scope before closures, callbacks before async)

**Step 2**: If pre-requisites met, expose threshold concept (instruction + practice)

**Step 3**: After exposure, assess threshold state:
- Prediction tasks reveal mental model
- Explanation tasks reveal conceptual understanding
- Trace analysis detects patterns (consistent vs inconsistent)

**Step 4**: Based on state detection:
- Pre-threshold → More instruction needed
- Liminal → Scaffolded practice, formative assessment
- Post-threshold → Summative assessment, integration tasks

**Step 5**: Longitudinal monitoring (repeat Step 3 periodically)

**Step 6**: Threshold crossing detected → Celebration + new challenges

---

## Summary: Core Principles from Integration

1. **Threshold Crossing Is Transformative**: Assessment must detect qualitative shifts, not just quantitative improvement.

2. **Liminal States Are Normal**: Confusion during transition is productive—formative support, not grading.

3. **Integration Defines Thresholds**: Post-threshold assessment tests connections between previously separate concepts.

4. **Timing Matters Critically**: Premature threshold assessment is invalid and demotivating.

5. **Four JavaScript Thresholds**: Async, closures, prototypes, recursion—each requires specific detection and support.

6. **Trace Data Reveals States**: Execution patterns distinguish pre-threshold, liminal, post-threshold understanding.

7. **Taxonomy Alignment**: Threshold crossing often coincides with SOLO Relational, Block Model Level 2 transition.

8. **Non-Linear Learning**: Sudden breakthroughs common—longitudinal tracking essential.

9. **Scaffolding During Transition**: Liminal-specific interventions accelerate crossing.

10. **Research Gaps Are Opportunities**: Detection validation, crossing timing, scaffolding effectiveness—all open for tool-driven research.

---

## Next Steps

**Integration with other chapters**:
- Learning tools: What tools best support threshold crossing?
- Misconceptions: Are some misconceptions threshold-related?
- Notional machines: Are threshold concepts = NM acquisition?

**Step 4** (Use Cases): Practical threshold-aware assessment implementations in educational tools.

**Step 5** (Requirements): Translate threshold detection needs into precise trace infrastructure specifications.
