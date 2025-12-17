# Notional Machines Learning Progression

**Purpose**: Document how notional machines build on each other, identify prerequisites, and suggest effective teaching sequences.

---

## Prerequisite Relationships

### Foundation Layer (No Prerequisites)

These notional machines can be taught first, as they have minimal dependencies:

**1. Creation/Execution Phase Model**
- **Prerequisites**: None (most fundamental)
- **Why first**: Parse vs runtime distinction underlies all JavaScript behavior
- **Enables**: Understanding hoisting, TDZ, when variables/functions become available

**2. Memory Model**
- **Prerequisites**: Creation/Execution Phase (variables created in phases)
- **Why early**: Variables and values are tangible, immediate
- **Enables**: Understanding of all other NMs (everything involves memory)

**3. Operator Evaluation Model**
- **Prerequisites**: Memory Model (values needed for operands)
- **Why early**: Precedence rules are self-contained, expressions are immediate
- **Enables**: Understanding complex expressions across all contexts

**4. Type Coercion Model**
- **Prerequisites**: Operator Evaluation Model (operators trigger coercion)
- **Why after operators**: Explains what happens during operator application
- **Enables**: Understanding comparison behavior, implicit conversions

**5. Reference vs. Value Model**
- **Prerequisites**: Memory Model (extends memory model)
- **Why after memory**: Explains copying semantics for primitives vs objects
- **Enables**: Understanding mutations, parameters, deep copy needs

---

### Execution Layer (Expression Prerequisites)

These require understanding expression evaluation before function calls:

**6. Call Stack Model**
- **Prerequisites**: Memory Model (for local variables), Expression Layer (arguments are expressions)
- **Why after expressions**: Function arguments must be evaluated as expressions; return values can be directly operated on
- **Enables**: Understanding function composition, recursion, execution context

**7. Scope Chain Model**
- **Prerequisites**: Memory Model (variables live in scopes), Call Stack Model (scopes created per call)
- **Why after both**: Scopes are memory regions created by function calls
- **Enables**: Understanding closures, variable resolution, modules

---

### Integration Layer (2+ Prerequisites)

These integrate multiple concepts:

**8. Event Loop Model**
- **Prerequisites**: Call Stack Model (stack must empty), Memory Model (callbacks stored)
- **Why after both**: Async builds on sync understanding
- **Enables**: Understanding promises, async/await, non-blocking I/O

**9. Prototype Chain Model**
- **Prerequisites**: Memory Model (prototypes are references), Reference vs. Value (prototype links are references)
- **Why after both**: Inheritance is reference-based memory structure
- **Enables**: Understanding JavaScript OOP, class syntax

**10. This Binding Model**
- **Prerequisites**: Call Stack Model (binding determined at call), Scope Chain Model (contrast with lexical scope)
- **Why after both**: `this` is dynamic context, contrasts with lexical scope
- **Enables**: Understanding method calls, callbacks, binding strategies

---

### Advanced Layer (3+ Prerequisites)

These are meta-level or integrate many concepts:

**11. Static vs. Instance Model**
- **Prerequisites**: Memory Model (where static/instance data lives), Prototype Chain (instances link to prototypes), This Binding (static methods don't have instance `this`)
- **Why after all three**: Distinguishes class-level from object-level using all three concepts
- **Enables**: Understanding factory patterns, singleton, OOP design

**12. Class Syntax Model**
- **Prerequisites**: Prototype Chain (what classes desugar to), Static vs. Instance (classes have both)
- **Why after both**: Understanding classes requires understanding their implementation
- **Enables**: Understanding language design, syntactic sugar, framework conventions

---

## Suggested Teaching Sequences

### Sequence A: Foundation-First (Recommended for Beginners)

**Best for**: Beginners with no programming experience

```
1. Creation/Execution Phase Model (parse vs runtime, hoisting basics)
2. Memory Model (variables, values, primitives)
3. Operator Evaluation Model (expressions, precedence)
4. Type Coercion Model (comparisons, conversions)
5. Reference vs. Value Model (objects, arrays, copying)
6. Call Stack Model (functions, execution order)
7. Scope Chain Model (closures, variable resolution)
8. Event Loop Model (async, promises)
9. Prototype Chain Model (inheritance, delegation)
10. This Binding Model (context, binding rules)
11. Static vs. Instance Model (OOP patterns)
12. Class Syntax Model (modern syntax, syntactic sugar)
```

**Rationale**: Expression evaluation before function calls; builds from concrete to abstract, imperative to OOP to async.

**Critical ordering**: Expression Layer (3-5) must come before Call Stack (6) because function arguments are evaluated expressions.

**Timeline**: ~16-20 weeks for all 12 NMs

---

### Sequence B: OOP Early

**Best for**: Students with Java/C++ background transitioning to JavaScript

```
1. Memory Model (references different from Java/C++)
2. Call Stack Model (familiar territory)
3. Reference vs. Value Model (critical difference from Java)
4. Prototype Chain Model (early, since OOP familiar)
5. Class Syntax Model (looks like Java, but isn't)
6. Static vs. Instance Model (similar to Java)
7. This Binding Model (different from Java!)
8. Scope Chain Model (closures new to Java students)
9. Event Loop Model (single-threaded different from Java)
10. Operator Evaluation Model (mostly familiar)
11. Type Coercion Model (biggest surprise for Java students)
```

**Rationale**: Leverage OOP knowledge early, highlight JavaScript differences.

**Timeline**: ~8-12 weeks (faster due to prior knowledge)

---

### Sequence C: Async First (Modern Web Dev)

**Best for**: Students learning web development from scratch

```
1. Memory Model (basics)
2. Call Stack Model (sync execution)
3. Event Loop Model (async immediately, for fetch/APIs)
4. Reference vs. Value Model (objects everywhere in web dev)
5. Scope Chain Model (callbacks capture variables)
6. This Binding Model (event handlers lose binding)
7. Operator Evaluation Model (as needed)
8. Type Coercion Model (comparison gotchas)
9. Prototype Chain Model (DOM traversal)
10. Class Syntax Model (React components)
11. Static vs. Instance Model (React patterns)
```

**Rationale**: Web dev is async-first, teach event loop early.

**Timeline**: ~10-14 weeks, with heavy practical focus

---

### Sequence D: Functional Programming First

**Best for**: Students with functional background (Haskell, ML) or bootcamp grads

```
1. Memory Model (immutability focus)
2. Scope Chain Model (closures as first-class)
3. Call Stack Model (recursion emphasis)
4. Reference vs. Value Model (avoiding mutation)
5. Operator Evaluation Model (short-circuit as lazy eval)
6. Event Loop Model (callbacks as continuations)
7. Type Coercion Model (dynamic typing challenges)
8. This Binding Model (avoid entirely with arrows)
9. Prototype Chain Model (optional, object-oriented)
10. Class Syntax Model (optional, prefer functions)
11. Static vs. Instance Model (optional, use closures instead)
```

**Rationale**: Emphasize functional patterns, de-emphasize OOP.

**Timeline**: ~6-10 weeks (skip optional OOP if desired)

---

## Learning Progression Within Each Notional Machine

### Memory Model Progression

**Stage 1**: Primitives only
- Variables hold numbers, strings, booleans
- Assignment copies values

**Stage 2**: Object references
- Variables hold references to objects
- Assignment copies references

**Stage 3**: Stack vs heap
- Primitives on stack
- Objects on heap
- References point from stack to heap

**Stage 4**: Garbage collection
- When no references remain
- Memory freed automatically

**Milestone**: Student can predict mutation behavior correctly

---

### Call Stack Progression

**Stage 1**: Single function call
- Function enters stack
- Executes
- Exits stack

**Stage 2**: Nested calls
- Multiple frames
- LIFO order
- Return flow

**Stage 3**: Recursion
- Same function multiple times
- Base case critical
- Stack growth/collapse

**Stage 4**: Stack overflow
- Limits exist
- Infinite recursion crashes
- Tail call optimization (advanced)

**Milestone**: Student can trace recursive calls correctly

---

### Event Loop Progression

**Stage 1**: Synchronous baseline
- Call stack empties
- Code runs to completion

**Stage 2**: Single setTimeout
- Callback queued
- Runs after sync code

**Stage 3**: Promises (microtasks)
- Separate queue
- Higher priority than setTimeout

**Stage 4**: Mixed async
- Microtasks before macrotasks
- Complex ordering rules

**Milestone**: Student can predict async output order

---

### Scope Chain Progression

**Stage 1**: Single scope
- Variables in immediate scope
- No nesting yet

**Stage 2**: Nested scopes
- Inner can access outer
- Scope chain walking

**Stage 3**: Closures
- Inner functions capture outer variables
- Persist after outer returns

**Stage 4**: var vs let/const
- Function scope vs block scope
- TDZ behavior

**Milestone**: Student can design closures intentionally

---

### Prototype Chain Progression

**Stage 1**: Direct properties
- Objects have own properties
- Access via dot notation

**Stage 2**: Prototype link
- Objects link to one prototype
- Inherit properties

**Stage 3**: Chain walking
- Multiple levels
- Walk until found or null

**Stage 4**: Dynamic mutations
- Changing prototype affects instances
- Shadowing vs delegation

**Milestone**: Student understands inheritance isn't copying

---

### This Binding Progression

**Stage 1**: Method calls (implicit binding)
- `obj.method()` → `this` is `obj`
- Most common case

**Stage 2**: Lost binding
- `const fn = obj.method; fn()` → `this` lost
- Common bug pattern

**Stage 3**: Explicit binding
- `call`, `apply`, `bind` fix lost binding
- Arrow functions capture `this`

**Stage 4**: All four rules + precedence
- Default, implicit, explicit, `new`
- Arrow functions as exception

**Milestone**: Student predicts `this` in complex scenarios

---

## Critical Transitions (Threshold Crossings)

### Transition 1: Value → Reference Semantics

**Before**: Everything copied (primitive mindset)
**After**: Objects shared via references
**Difficulty**: High for beginners
**Support needed**: Memory Model + Reference vs. Value together

---

### Transition 2: Synchronous → Asynchronous

**Before**: Code runs in written order
**After**: Callbacks run later, queues exist
**Difficulty**: Very high
**Support needed**: Event Loop with explicit queue visualization

---

### Transition 3: Global → Lexical Scope

**Before**: All variables global or local
**After**: Nested scopes, closures capture
**Difficulty**: Medium-high
**Support needed**: Scope Chain with nesting visualization

---

### Transition 4: Static → Dynamic Context (`this`)

**Before**: `this` is lexical scope (misconception)
**After**: `this` determined at call time
**Difficulty**: High
**Support needed**: This Binding with call-site highlighting

---

### Transition 5: Classes → Prototypes

**Before**: Classes as types (Java mindset)
**After**: Classes as syntactic sugar over prototypes
**Difficulty**: Medium (if OOP background)
**Support needed**: Class Syntax + Prototype Chain together

---

## Pacing Recommendations

### Beginner Pace (No programming experience)

| Notional Machine | Weeks | Cumulative |
|------------------|-------|------------|
| Memory Model | 2 | 2 |
| Operator Evaluation | 1 | 3 |
| Call Stack | 2 | 5 |
| Reference vs. Value | 2 | 7 |
| Type Coercion | 1 | 8 |
| Scope Chain | 3 | 11 |
| Event Loop | 3 | 14 |
| Prototype Chain | 2 | 16 |
| This Binding | 2 | 18 |
| Static vs. Instance | 1 | 19 |
| Class Syntax | 1 | 20 |

**Total**: ~20 weeks (one semester)

---

### Intermediate Pace (Some programming experience)

| Notional Machine | Weeks | Cumulative |
|------------------|-------|------------|
| Memory Model | 1 | 1 |
| Call Stack | 1 | 2 |
| Reference vs. Value | 1 | 3 |
| Scope Chain | 2 | 5 |
| Event Loop | 2 | 7 |
| Prototype Chain | 1 | 8 |
| This Binding | 2 | 10 |
| Class Syntax | 1 | 11 |
| Static vs. Instance | 1 | 12 |
| Operator Evaluation | 0.5 | 12.5 |
| Type Coercion | 0.5 | 13 |

**Total**: ~13 weeks

---

### Advanced Pace (Strong programming background)

| Notional Machine | Weeks | Cumulative |
|------------------|-------|------------|
| Memory Model | 0.5 | 0.5 |
| Call Stack | 0.5 | 1 |
| Reference vs. Value | 1 | 2 |
| Event Loop | 2 | 4 |
| Scope Chain | 1 | 5 |
| This Binding | 1.5 | 6.5 |
| Prototype Chain | 1 | 7.5 |
| Class Syntax | 0.5 | 8 |
| Static vs. Instance | 0.5 | 8.5 |
| Type Coercion | 1 | 9.5 |
| Operator Evaluation | 0.5 | 10 |

**Total**: ~10 weeks

---

## Integration Points (Teaching Multiple NMs Together)

### Cluster 1: Function Execution (Weeks 3-5 for beginners)

Teach together:
- Call Stack (which function running)
- Memory Model (where data lives)
- Scope Chain (what variables accessible)

**Why together**: Complete picture of function execution

---

### Cluster 2: Object-Oriented (Weeks 16-19 for beginners)

Teach together:
- Prototype Chain (how inheritance works)
- This Binding (method context)
- Static vs. Instance (class vs object level)
- Class Syntax (modern syntax)

**Why together**: Comprehensive OOP understanding

---

### Cluster 3: Async Execution (Weeks 14-15 for beginners)

Teach together:
- Event Loop (when async runs)
- Call Stack (sync vs async boundary)
- Scope Chain (closures in callbacks)

**Why together**: Async requires all three

---

## Assessment Checkpoints

### After Memory Model + Call Stack (Week 5)
**Can student:**
- Trace function calls through stack?
- Predict variable values at any point?
- Draw memory layout?

**If no**: Slow down, reinforce foundations

---

### After Scope Chain (Week 11)
**Can student:**
- Predict closure behavior?
- Explain var vs let scope differences?
- Design intentional closures?

**If no**: Revisit scope chain with more examples

---

### After Event Loop (Week 14)
**Can student:**
- Predict async output order?
- Explain microtask vs macrotask?
- Debug async timing issues?

**If no**: This is a threshold concept; expect struggle, provide extra support

---

### After This Binding (Week 18)
**Can student:**
- Predict `this` in complex scenarios?
- Choose appropriate binding strategy?
- Debug lost binding issues?

**If no**: More contrast examples (regular vs arrow functions)

---

### Final Assessment (Week 20)
**Can student:**
- Integrate multiple NMs for complete understanding?
- Transfer NM knowledge to debugging?
- Explain JavaScript execution to others?

**If yes**: Ready for advanced topics (performance, metaprogramming, design patterns)

---

## Common Sequencing Mistakes to Avoid

**❌ Teaching `this` before closures**
- Students confuse `this` with lexical scope
- Need closure understanding first for contrast

**❌ Teaching event loop without solid synchronous foundation**
- Async is hard; need strong sync understanding first
- Spend adequate time on call stack before event loop

**❌ Teaching prototypes without reference understanding**
- Prototype links ARE references
- Reference vs. Value must come first

**❌ Teaching class syntax without prototype understanding**
- Students think classes are magic
- Need to understand the desugaring

**❌ Rushing through memory model**
- Memory is foundation for everything
- Spend enough time here; everything builds on it

---

## Adaptive Sequencing

**If student struggles with**:
- **Memory Model** → Slow down, use physical props, more examples
- **Call Stack** → Focus on non-recursive cases first, delay recursion
- **Event Loop** → Simplify to just setTimeout first, delay promises
- **Scope Chain** → Focus on reading before writing closures
- **This Binding** → Stick with method calls, delay other binding rules

**If student excels**:
- Accelerate through foundation layer (weeks 1-3)
- Spend more time on integration layer (scope, event loop, prototypes)
- Include advanced topics (performance implications, design patterns)
- Challenge with edge cases and language design discussions
