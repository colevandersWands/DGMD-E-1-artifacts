# Notional Machines for Threshold Concept Support

**Purpose**: Map notional machines to threshold concepts from `/3-threshold-concepts/`, showing how NMs help students cross troublesome, transformative, and integrative barriers.

**Threshold Concepts** (Meyer & Land 2003):
- **Troublesome**: Counterintuitive, alien, conceptually difficult
- **Transformative**: Changes how student sees the subject
- **Integrative**: Connects previously separate concepts
- **Irreversible**: Once understood, can't be "unlearned"
- **Bounded**: Defines discipline boundaries

---

## Primary Threshold Concepts in JavaScript

### 1. Asynchronous Execution (Event Loop)

**Why Troublesome**:
- Counterintuitive: Code doesn't run in written order
- Alien: Single-threaded concurrency unfamiliar
- Conceptually difficult: Queue priorities, timing

**Why Transformative**:
- Changes understanding of program flow entirely
- Enables new patterns (non-blocking I/O, reactive programming)
- Fundamental to modern web development

**Why Integrative**:
- Connects call stack (sync), promises (micro), timers (macro)
- Unifies callbacks, promises, async/await under one model
- Explains browser vs Node.js event handling

**Liminal State Indicators**:
- Student knows async exists but can't predict order
- Mixes synchronous mental model with async code
- Surprised by every async timing result
- Uses `setTimeout` but expects immediate execution

**Event Loop NM Support**:
- **Pre-liminal**: Animate task queues explicitly
- **Liminal**: Show microtask vs macrotask priorities
- **Post-liminal**: Explain event loop phases, optimization

**Crossing Strategy**:
1. Start with synchronous baseline (call stack only)
2. Add single `setTimeout` (one macrotask)
3. Introduce promises (microtask priority)
4. Mix both (full event loop)
5. Practice prediction-validation cycles

---

### 2. Closures (Scope Chain)

**Why Troublesome**:
- Counterintuitive: Inner functions "remember" outer state
- Alien: Lexical scope capture mechanism
- Conceptually difficult: Reference vs value capture

**Why Transformative**:
- Enables functional programming patterns
- Provides encapsulation without classes
- Foundation for module pattern, React hooks

**Why Integrative**:
- Connects scope, memory model, function execution
- Unifies variable lifetime with function lifetime
- Explains callbacks capturing context

**Liminal State Indicators**:
- Can write closures but can't explain why they work
- Surprised when outer variable persists
- Confused by `var` in loop creating shared closure
- Uses closures accidentally, not intentionally

**Scope Chain NM Support**:
- **Pre-liminal**: Show nested scopes visually
- **Liminal**: Demonstrate closure capturing scope reference
- **Post-liminal**: Explain memory implications, intentional design

**Crossing Strategy**:
1. Start with nested scopes (inner accessing outer)
2. Show inner function persisting after outer returns
3. Demonstrate captured variables changing
4. Practice: `var` vs `let` in loop closures
5. Design patterns: module, factory, memoization

---

### 3. Prototypal Inheritance (Prototype Chain)

**Why Troublesome**:
- Alien: Delegation-based, not class-based inheritance
- Counterintuitive: Properties shared via links, not copied
- Conceptually difficult: Dynamic prototype modification

**Why Transformative**:
- Reveals JavaScript's true OOP model
- Enables dynamic object augmentation
- Explains class syntax as sugar

**Why Integrative**:
- Connects objects, functions, constructors
- Unifies property access with inheritance
- Explains `this` binding in prototypal context

**Liminal State Indicators**:
- Expects prototype copying like Java/C++ inheritance
- Surprised by prototype changes affecting instances
- Confused about `class` vs `function` equivalence
- Uses classes without understanding underlying mechanism

**Prototype Chain NM Support**:
- **Pre-liminal**: Show direct properties only
- **Liminal**: Demonstrate prototype links and lookup
- **Post-liminal**: Explain class desugaring, performance implications

**Crossing Strategy**:
1. Object literals with own properties
2. `Object.create()` showing explicit link
3. Constructor functions setting prototype
4. Dynamic prototype mutation
5. Class syntax revealing sugar over prototypes

---

### 4. References vs. Values (Memory Model + Reference vs. Value)

**Why Troublesome**:
- Counterintuitive: Some assignments copy, others share
- Conceptually difficult: Mutation vs reassignment distinction
- Alien: Reference semantics for objects

**Why Transformative**:
- Changes understanding of assignment operator
- Enables reasoning about shared state
- Foundation for immutability patterns

**Why Integrative**:
- Connects memory layout with behavior
- Unifies parameter passing with assignment
- Explains shallow vs deep copy needs

**Liminal State Indicators**:
- Expects all assignment to copy or all to share
- Surprised by shared mutations
- Confused when reassignment doesn't affect other variables
- Can't predict function parameter behavior

**Memory Model + Reference vs. Value NM Support**:
- **Pre-liminal**: Show stack with values only (primitives)
- **Liminal**: Introduce heap and references
- **Post-liminal**: Explain garbage collection, optimization

**Crossing Strategy**:
1. Primitives: assignment copies
2. Objects: assignment copies reference
3. Mutation affects all references
4. Reassignment breaks sharing
5. Practice: function parameters, array operations

---

### 5. Dynamic Context (`this` Binding)

**Why Troublesome**:
- Alien: Context determined at call-time, not write-time
- Counterintuitive: Same function, different `this`
- Conceptually difficult: Four binding rules with precedence

**Why Transformative**:
- Reveals dynamic vs lexical binding distinction
- Enables flexible API design
- Foundation for OOP patterns in JavaScript

**Why Integrative**:
- Contrasts with lexical scope (closures)
- Connects with prototype chain (method inheritance)
- Explains arrow functions as lexical alternative

**Liminal State Indicators**:
- Treats `this` as lexical variable
- Expects `this` is the function itself
- Surprised by lost binding in callbacks
- Uses `this` inconsistently

**This Binding NM Support**:
- **Pre-liminal**: Show method calls (implicit binding)
- **Liminal**: Demonstrate binding rules and precedence
- **Post-liminal**: Explain arrow functions, best practices

**Crossing Strategy**:
1. Method calls (implicit binding)
2. Lost binding (extracted methods)
3. Explicit binding (`.bind()`, `.call()`, `.apply()`)
4. Arrow functions (lexical binding)
5. Avoiding `this` (functional approach)

---

## Secondary Threshold Concepts

### Type Coercion

**Why Troublesome**: Implicit conversions seem arbitrary
**Why Transformative**: Reveals dynamic typing implications
**Liminal Indicators**: Treats coercion as random, avoids `==` entirely

**Type Coercion NM Support**:
- Show systematic conversion algorithms
- Demonstrate ToPrimitive/ToNumber/ToString
- Practice: prediction-validation for coercion scenarios

---

### Recursion (Call Stack)

**Why Troublesome**: Self-reference counterintuitive
**Why Transformative**: Enables divide-and-conquer thinking
**Liminal Indicators**: Can't trace recursive calls, afraid of recursion

**Call Stack NM Support**:
- Visualize recursive frames building
- Highlight base case importance
- Show stack unwinding with return values

---

## Portal Moments (Breakthrough Experiences)

**Portal Moment**: Sudden insight that crosses threshold, transforms understanding

### Event Loop Portal
**Trigger**: Student correctly predicts complex async order independently
**Before**: Confused by every async timing
**After**: Understands queue processing, can explain to others
**NM Role**: Provides visualization for mental model construction

### Closure Portal
**Trigger**: Student intentionally designs closure for encapsulation
**Before**: Uses closures accidentally
**After**: Recognizes closure patterns, designs with purpose
**NM Role**: Makes scope capture explicit and inspectable

### Prototype Portal
**Trigger**: Student modifies prototype to affect all instances intentionally
**Before**: Treats objects as independent
**After**: Understands delegation, designs inheritance intentionally
**NM Role**: Visualizes links vs copies distinction

### Reference Portal
**Trigger**: Student predicts mutation vs reassignment correctly in complex scenario
**Before**: Surprised by sharing behavior
**After**: Reasons about memory layout, chooses copy strategy appropriately
**NM Role**: Shows memory structure making semantics clear

### This Binding Portal
**Trigger**: Student chooses binding strategy based on call-site analysis
**Before**: Uses `this` inconsistently, confused by errors
**After**: Understands binding rules, uses arrows vs regular appropriately
**NM Role**: Makes call-site determination visible

---

## Supporting Students Through Liminal States

### Recognizing Liminal State

**Signs student is in liminal zone**:
- Partial understanding (knows but can't apply)
- Oscillation (correct one moment, incorrect next)
- Frustration ("I thought I understood this!")
- Overgeneralization (wrong patterns)
- Undergeneralization (can't transfer)

### NM-Based Support Strategies

**1. Graduated Complexity** (Progressive Disclosure):
- Simple cases first (one concept at a time)
- Gradually add integration
- Use NM to control complexity shown

**2. Prediction-Observation Cycles**:
- Student predicts using current mental model
- NM shows actual behavior
- Student explains discrepancy
- Repeat until consistent correct predictions

**3. Contrast Examples**:
- Show minimal pairs (one key difference)
- Use NM to highlight critical distinction
- Practice: identifying which case applies

**4. Explicit Mental Model Construction**:
- Ask student to draw/explain NM
- Compare student's model to actual NM
- Identify gaps and misconceptions
- Refine model iteratively

**5. Portal Moment Facilitation**:
- Create scenarios likely to trigger insight
- Use NM to make "aha!" moment explicit
- Consolidate understanding after breakthrough
- Practice newly-integrated concept

---

## NM-Supported Threshold Crossing Timelines

### Event Loop: 3-4 Weeks (Typical)

**Week 1 - Pre-liminal**:
- Call Stack NM: Master synchronous execution
- Introduce single `setTimeout`
- Event Loop NM: Show task queue

**Week 2-3 - Liminal**:
- Add promises (microtask queue)
- Mix promises and setTimeout
- Intensive prediction practice
- High frustration expected

**Week 4 - Post-liminal**:
- Portal moment (correct complex prediction)
- Consolidation exercises
- Event Loop NM: Explore advanced patterns

---

### Closures: 2-3 Weeks (Typical)

**Week 1 - Pre-liminal**:
- Scope Chain NM: Nested scopes
- Inner accessing outer
- Basic closure examples

**Week 2 - Liminal**:
- `var` vs `let` in loops
- Closure memory implications
- Intentional closure design
- Portal moment (deliberate encapsulation)

**Week 3 - Post-liminal**:
- Module patterns
- Factory functions
- React hooks context

---

### Prototypes: 2-3 Weeks (Typical)

**Week 1 - Pre-liminal**:
- Prototype Chain NM: Direct properties
- Object.create() introduction
- Single-level inheritance

**Week 2 - Liminal**:
- Multi-level chains
- Dynamic prototype modification
- Class syntax introduction
- Portal moment (understands delegation)

**Week 3 - Post-liminal**:
- Class desugaring
- Design patterns
- Performance implications

---

### References: 1-2 Weeks (Typical)

**Week 1 - Pre-liminal + Liminal**:
- Memory Model NM: Stack and heap
- Reference vs. Value NM: Primitives vs objects
- Mutation vs reassignment
- Portal moment (predicts function behavior)

**Week 2 - Post-liminal**:
- Deep vs shallow copy
- Immutability patterns
- Parameter passing strategies

---

### This Binding: 2-3 Weeks (Typical)

**Week 1 - Pre-liminal**:
- This Binding NM: Method calls
- Implicit binding only
- Simple examples

**Week 2 - Liminal**:
- Lost binding in callbacks
- Explicit binding (`.bind()`)
- Arrow functions
- High confusion expected

**Week 3 - Post-liminal**:
- Portal moment (predicts binding correctly)
- All four rules mastered
- Design patterns using `this`

---

## Assessment: Has Student Crossed Threshold?

### Event Loop Assessment
**Question**: "Predict output order for code mixing sync, promises, and setTimeout"
- **Pre-liminal**: Random guesses
- **Liminal**: Partial correctness
- **Post-liminal**: Consistent correctness with explanation

### Closure Assessment
**Question**: "Design a function using closure for encapsulation"
- **Pre-liminal**: Can't create closure
- **Liminal**: Creates but can't explain
- **Post-liminal**: Intentional design with rationale

### Prototype Assessment
**Question**: "Modify prototype to add method to all instances"
- **Pre-liminal**: Tries to modify each instance
- **Liminal**: Modifies prototype but surprised it works
- **Post-liminal**: Deliberately uses delegation

### Reference Assessment
**Question**: "Predict behavior when function mutates parameter"
- **Pre-liminal**: Wrong prediction
- **Liminal**: Correct but can't explain
- **Post-liminal**: Correct with memory model explanation

### This Binding Assessment
**Question**: "Fix lost binding in event handler three ways"
- **Pre-liminal**: Can't fix
- **Liminal**: Fixes one way (usually `.bind()`)
- **Post-liminal**: Shows multiple solutions, discusses trade-offs

---

## Irreversibility: Once Crossed, Always Understood

**Characteristic of true threshold concepts**: Can't go back to naive understanding

**Evidence of irreversible crossing**:
- Student can't remember not understanding
- Concept seems "obvious" in retrospect
- Can teach concept to others
- Applies concept in new contexts without prompting
- Recognizes related patterns elsewhere

**NM Role in Irreversibility**:
- Provides persistent mental model
- Student can mentally "run" NM
- Visualization becomes internalized
- Tool-independent understanding achieved

---

## Bounded Nature: Defining JavaScript Understanding

**These threshold concepts define JavaScript expertise**:
- Event Loop: Distinguishes JS from synchronous languages
- Closures: Enables functional patterns unique to JS
- Prototypes: JavaScript's distinctive OOP model
- References: Dynamic language memory semantics
- This Binding: JavaScript's context model

**Expert Recognition**: Has crossed all five primary thresholds, can navigate between them fluidly

**NM Support for Expert Development**: All NMs integrated into holistic program understanding
