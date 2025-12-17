# Notional Machine Assessment Strategies

**Integration**: [`/4-notional-machines/`](../4-notional-machines/) ↔ [`/6-assessment-strategies/`](./README.md)

**Purpose**: Connect notional machine theory with assessment design, revealing how to validate student mental models, detect flawed execution models, and assess understanding at appropriate abstraction levels for JavaScript's 12 core notional machines.

---

## Why Notional Machine Assessment Matters

### The Mental Model Problem

**Research foundation** (Sorva 2013, Fincher & Jeuring 2020): Students construct mental models of program execution whether we teach them explicitly or not. Without accurate notional machines, students develop ad-hoc, often incorrect models that impede learning.

**Evidence of flawed models**:
- Students can't predict code behavior accurately (mispredictions reveal model flaws)
- Debugging is trial-and-error rather than systematic (no execution model to reason with)
- Transfer fails because understanding is tied to surface features, not deep structure

**Traditional assessment failure**: Tests whether code works, not whether student understands WHY it works or can explain execution process.

### What Notional Machine Assessment Provides

**Mental model validation**: Assess whether student's execution model matches correct notional machine

**Example contrast**:
```javascript
// Code
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}

// Traditional assessment
Output: 3, 3, 3
Question: "Is this correct?" Yes/No
→ Doesn't test understanding

// Notional machine assessment
Question: "Why does this print 3, 3, 3 instead of 0, 1, 2?"
Options testing different mental models:
A) Closure captures i variable reference, loop completes before callbacks run (Correct NM)
B) setTimeout breaks the loop (Flawed: Event loop misconception)
C) Closures don't work with setTimeout (Flawed: Closure misconception)
D) var has global scope (Flawed: Scope confusion)

→ Reveals which notional machine student holds
```

**Progressive assessment**: Different NMs assessed at different learning stages

**Integration assessment**: Later learning requires integrating multiple NMs

---

## Assessing the 12 JavaScript Notional Machines

### Foundation Layer Notional Machines

These form the basis for all JavaScript execution understanding—must be assessed early and solidly.

---

#### 1. Creation/Execution Phase Model Assessment

**Notional machine**: JavaScript code executes in two phases—parse time (creation phase: declarations hoisted, TDZ established) and runtime (execution phase: code runs sequentially).

**Core understanding to assess**:
- Hoisting: var/function declarations "move" to top of scope
- TDZ: let/const exist but are unreadable before declaration line
- Temporal ordering: Parse happens before execution

**Common flawed models**:
- "Code executes strictly top-to-bottom" (misses hoisting)
- "let/const don't hoist" (they do, but stay in TDZ)
- "Functions are values assigned at runtime" (function declarations hoist)

**Assessment strategies**:

| Assessment Type | Focus | Example |
|----------------|-------|---------|
| **Prediction** | Hoisting behavior | "What does this code print?" <br>`console.log(x); var x = 5;` <br>A) 5 B) undefined C) ReferenceError |
| **Ordering** | Parse vs execution | "When is the function available?" <br>`foo(); function foo() { }` |
| **TDZ detection** | let/const behavior | "What error occurs?" <br>`console.log(y); let y = 5;` <br>A) undefined B) ReferenceError C) TypeError |
| **Model explanation** | Phase understanding | "Explain in your own words: What happens during parse phase vs execution phase?" |

**Trace data requirements for assessment**:
- Variable declaration events (parse-time)
- Variable initialization events (execution-time)
- TDZ access attempts (deadzone detection)
- Function declaration vs expression distinction

**Taxonomy connections**:
- **SOLO Unistructural**: Recognize hoisting exists
- **SOLO Multistructural**: Distinguish var, let, const hoisting behavior
- **SOLO Relational**: Integrate phase model with scope/TDZ into coherent execution model
- **Block Model Level 2**: Trace execution through phases
- **Block Model Level 3**: Explain WHY phases exist (optimization, error detection)

**Assessment progression**:
1. **Beginner**: Can identify hoisting when explicit (`var x; ... x = 5;`)
2. **Intermediate**: Predicts hoisting behavior with var, recognizes TDZ with let/const
3. **Advanced**: Explains phase model systematically, predicts edge cases (function expressions, temporal dead zone across scopes)

---

#### 2. Memory Model Assessment

**Notional machine**: Variables stored in stack (primitives, references) or heap (objects). Stack frames created/destroyed with function calls. Objects persist in heap until garbage collected.

**Core understanding to assess**:
- Stack vs heap storage
- Variable contains primitive value OR object reference
- Multiple variables can reference same object (aliasing)
- Garbage collection reclaims unreferenced objects

**Common flawed models**:
- "Variables store everything" (misses reference distinction)
- "Copying object copies data" (misses shallow copy)
- "Deleted variables free memory immediately" (misses GC)
- "Stack and heap are separate, unrelated" (misses that stack holds references to heap)

**Assessment strategies**:

| Assessment Type | Focus | Example |
|----------------|-------|---------|
| **Memory diagrams** | Stack/heap visualization | "Draw memory state after each line" |
| **Aliasing prediction** | Shared references | `let a = {x: 5}; let b = a; b.x = 10;` <br>"What is a.x?" |
| **GC reasoning** | Object lifecycle | "After this code, is the object garbage collected?" |
| **Shallow copy** | Reference semantics | `let copy = {...original}; copy.nested.value = 10;` <br>"Did original change?" |

**Trace data requirements**:
- Object creation events (heap allocation)
- Variable assignment (reference copying)
- Object mutation (heap modification)
- Scope exit (stack frame destruction)

**Connection to misconceptions**:
- Reference vs value semantics (Tier 1)
- Mutation vs reassignment confusion
- Parameter passing (primitives by-value, objects by-reference-sharing)

**Assessment difficulties**:
- **Memory visualization is abstract**: Students struggle to "see" stack/heap
- **Aliasing is subtle**: Same object through different variables hard to track
- **GC is invisible**: No direct way to observe collection

**Assessment solution strategies**:
1. **Explicit diagrams**: Require students to draw stack/heap states
2. **Prediction with diagrams**: Show diagram, ask what happens next
3. **Trace-based verification**: Compare student predictions to actual trace events

**SOLO progression**:
- **Unistructural**: Knows variables "store" values
- **Multistructural**: Distinguishes primitives vs objects, stack vs heap (separately)
- **Relational**: Integrates stack/heap/references into unified memory model
- **Extended Abstract**: Applies memory model to predict GC, optimize data structures

---

#### 3. Expression Layer Assessment

**Notional machine**: Expressions evaluate via operator precedence and associativity rules, producing values that can be used directly or stored in variables.

**Core understanding to assess**:
- Expression evaluation order (precedence, associativity)
- Operator types (arithmetic, logical, comparison, etc.)
- Expression composition (nested expressions)
- Short-circuit evaluation (&&, ||)
- Ternary operator execution model

**Common flawed models**:
- "Left-to-right always" (misses precedence)
- "Parentheses don't matter" (misses grouping)
- "All operators evaluate all operands" (misses short-circuit)
- "Division always produces integers" (misses floating point)

**Assessment strategies**:

| Assessment Type | Focus | Example |
|----------------|-------|---------|
| **Precedence prediction** | Operator order | `2 + 3 * 4` equals? A) 20 B) 14 C) Error |
| **Associativity** | Evaluation direction | `10 - 5 - 2` equals? A) 7 B) 3 C) Both |
| **Short-circuit** | Conditional evaluation | `false && expensive()` → Does expensive() run? |
| **Type coercion** | Implicit conversions | `"5" + 3` vs `"5" - 3` results? |

**Trace data requirements**:
- Expression evaluation events (operands, operators, results)
- Order of subexpression evaluation
- Short-circuit branch not taken (detect skipped evaluation)
- Type coercion events (implicit conversions)

**Connection to misconceptions**:
- Type coercion surprises (Tier 2)
- Sequential execution (expressions evaluate sub-parts in order)
- Operator overloading (`+` for numbers vs strings)

**BSI dimension**: This is Strategy-adjacent—understanding operator semantics affects algorithm design choices.

---

#### 4. Call Stack Model Assessment

**Notional machine**: Function calls create stack frames (activation records) containing local variables and parameters. Frames stack in LIFO order. Return pops frame off stack.

**Core understanding to assess**:
- Stack frame creation at function call
- Local variables scoped to frame
- Parameters copied into frame
- Return pops frame, makes return value available
- Stack height grows with recursion

**Common flawed models**:
- "Functions execute 'elsewhere'" (no spatial model)
- "All variables global" (no frame isolation)
- "Recursion infinite" (no termination model)
- "Return stops program" (confuses return with exit)

**Assessment strategies**:

| Assessment Type | Focus | Example |
|----------------|-------|---------|
| **Stack diagram** | Frame visualization | "Draw stack after each call" |
| **Recursion depth** | Stack growth | "How many frames exist when factorial(3) calls factorial(2)?" |
| **Local vs global** | Variable scope | "Which variables exist in frame 2?" |
| **Return value flow** | Frame popping | "Where does return value go after function ends?" |

**Trace data requirements**:
- Function call events (frame push)
- Function return events (frame pop)
- Local variable creation within frame
- Parameter binding at call time
- Stack depth tracking

**Connection to other NMs**:
- Scope Chain: Stack frames are scope containers
- Memory Model: Frames stored on stack
- Variable Lifecycle: Local variables live/die with frames

**SOLO progression**:
- **Unistructural**: Knows functions have "their own" variables
- **Multistructural**: Distinguishes local vs global, understands parameters
- **Relational**: Integrates stack frame model with scope, parameter passing, return values
- **Extended Abstract**: Analyzes recursion depth, tail call optimization, stack overflow conditions

**Assessment timing**: Should be assessed AFTER memory model (depends on stack concept) but BEFORE closures (closures extend stack frame lifetime).

---

#### 5. Scope Chain Assessment

**Notional machine**: Variable resolution follows scope chain from innermost to outermost scope. Closures capture outer scope when inner function defined.

**Core understanding to assess**:
- Lexical scoping (determined by code structure, not runtime)
- Scope nesting (inner scopes access outer)
- Variable shadowing (inner declarations hide outer)
- Closure capture (inner functions retain outer scope)
- Block scope vs function scope (let/const vs var)

**Common flawed models**:
- "Functions only see global variables" (misses closure)
- "Variables available everywhere" (no scope understanding)
- "Nested functions copy outer variables" (misses reference capture)
- "var and let are interchangeable" (misses scope difference)

**Assessment strategies**:

| Assessment Type | Focus | Example |
|----------------|-------|---------|
| **Resolution tracing** | Scope chain | "Which `x` does this code access?" (with shadowing) |
| **Closure prediction** | Captured variables | Classic: var in loop, what do closures print? |
| **Scope boundary** | let vs var | "Is variable accessible outside block?" |
| **Shadow detection** | Inner hides outer | "Why doesn't outer `x` change?" |

**Trace data requirements**:
- Scope enter/exit events (block, function)
- Variable declaration with scope marker
- Variable read with resolution path (which scope provided binding)
- Closure creation (capture outer scope)
- Closure invocation (access captured scope)

**Connection to misconceptions**:
- Closure variable capture (Tier 2, classic var-in-loop)
- Block vs function scope (let/const vs var confusion)
- Lifetime vs visibility (closures extend lifetime beyond scope exit)

**Assessment challenge**: Closures are notoriously difficult—students can use them without understanding mechanism.

**Multi-level assessment**:
1. **Syntactic**: Can identify which functions are closures
2. **Behavioral**: Can predict what closures capture/access
3. **Conceptual**: Can explain WHY closures capture references not values
4. **Design**: Can choose when closures appropriate solution

**BSI mapping**:
- **Implementation**: Syntax of closure (function in function)
- **Behavior**: What closure does (accesses outer variable)
- **Strategy**: When to use closures (data hiding, callbacks)

---

#### 6. Reference vs. Value Semantics Assessment

**Notional machine**: Primitives (number, string, boolean, null, undefined, symbol, bigint) pass/assign by value (copy). Objects (including arrays, functions) pass/assign by reference (share).

**Core understanding to assess**:
- Primitive assignment copies value
- Object assignment copies reference (creates alias)
- Mutation affects all references to same object
- Reassignment only affects one reference
- Parameter passing uses same semantics

**Common flawed models**:
- "Everything is pass-by-value" (wrong for objects)
- "Everything is pass-by-reference" (wrong for primitives)
- "Assignment always copies deeply" (shallow copy default)
- "Objects in different variables are independent" (misses aliasing)

**Assessment strategies**:

| Assessment Type | Focus | Example |
|----------------|-------|---------|
| **Mutation prediction** | Object aliasing | `let a = {x: 5}; let b = a; b.x = 10; console.log(a.x);` |
| **Reassignment vs mutation** | Semantic difference | `obj = {}` vs `obj.prop = null` effects |
| **Parameter passing** | Function argument semantics | `function change(x) { x = 10; }` - does caller's variable change? |
| **Array operations** | Reference semantics | `arr.push(5)` vs `arr = arr.concat([5])` - which mutates? |

**Trace data requirements**:
- Object creation (heap allocation)
- Reference assignment (aliasing)
- Object mutation (modify existing object)
- Variable reassignment (change what reference points to)
- Primitive assignment (value copy)

**Connection to memory model**: This NM is application of memory model concepts—stack holds primitives/references, heap holds objects.

**Connection to misconceptions**: Reference vs value semantics is Tier 1 misconception (85%+ frequency in studies).

**Assessment progression**:
1. **Concrete examples**: Predict specific code behavior
2. **Categorization**: Classify operations as mutation vs reassignment
3. **Design**: Choose appropriate semantics for problem
4. **Debugging**: Identify unintended aliasing bugs

**Authentic assessment**: Professional code frequently has aliasing bugs—assess in realistic debugging scenarios.

---

### Execution Layer Notional Machines

These build on foundation layer, adding control flow and asynchrony.

---

#### 7. Event Loop Model Assessment

**Notional machine**: JavaScript has single-threaded event loop with task queue (macrotasks: setTimeout, I/O) and microtask queue (Promises, queueMicrotask). Current task runs to completion, then microtasks drain, then next macrotask.

**Core understanding to assess**:
- Single-threaded execution (no parallel code)
- Run-to-completion (task executes fully before next)
- Microtask vs macrotask priority (microtasks drain first)
- Event loop phases (call stack, microtask queue, macrotask queue)
- Async ≠ concurrent (async = interleaved, not parallel)

**Common flawed models**:
- "async = multi-threaded" (confuses async with parallelism)
- "setTimeout(fn, 0) executes immediately" (misses queue)
- "Promises execute immediately" (executor immediate, handlers queued)
- "await pauses entire program" (only pauses current async function)

**Assessment strategies**:

| Assessment Type | Focus | Example |
|----------------|-------|---------|
| **Execution order** | Queue priority | `console.log('A'); setTimeout(() => console.log('B'), 0); Promise.resolve().then(() => console.log('C')); console.log('D');` <br>Order: A, D, C, B (or A, D, B, C?) |
| **Phase understanding** | Event loop stages | "When does microtask queue drain relative to call stack?" |
| **Concurrency model** | Single-threaded | "Can two functions execute simultaneously in JavaScript?" |
| **await behavior** | Suspension | "What runs while await waits?" |

**Trace data requirements**:
- Task queue events (macrotask enqueue/dequeue)
- Microtask queue events (Promise handlers enqueue/dequeue)
- Call stack empty detection (when does event loop tick?)
- async/await suspension/resumption
- Promise state changes (pending → fulfilled/rejected)

**Connection to misconceptions**:
- Asynchronous execution model (Tier 2)
- Timing confusion (setTimeout delay is minimum, not exact)
- Promise .then() vs async/await (different syntax, same mechanism)

**Assessment difficulty**: Event loop is invisible—no direct observation without tools.

**Solution**: Trace-based visualization showing queue states, or prediction tasks requiring mental simulation.

**SOLO progression**:
- **Unistructural**: Knows setTimeout delays execution
- **Multistructural**: Distinguishes setTimeout, Promises, await behaviors (separately)
- **Relational**: Integrates queues, phases, priorities into unified event loop model
- **Extended Abstract**: Applies model to predict complex async patterns (race conditions, Promise.all timing)

**Assessment timing**: Should be assessed AFTER call stack (event loop manages stack) and AFTER closures (callbacks commonly use closures).

---

#### 8. Prototype Chain Assessment

**Notional machine**: Objects have internal [[Prototype]] link. Property access walks prototype chain until found or chain ends. Methods inherited, not copied.

**Core understanding to assess**:
- Prototype chain linkage (obj → prototype → prototype → ... → null)
- Property lookup walks chain
- Own properties vs inherited
- Constructor.prototype convention
- Object.create(), __proto__, Object.setPrototypeOf()

**Common flawed models**:
- "Objects copy methods from prototype" (they reference)
- "Changing prototype doesn't affect existing objects" (it does, chain is live)
- "All objects share properties" (misses own vs inherited)
- "Prototype chain is class hierarchy" (confuses delegation with inheritance)

**Assessment strategies**:

| Assessment Type | Focus | Example |
|----------------|-------|---------|
| **Chain diagram** | Prototype links | "Draw prototype chain for this object" |
| **Property resolution** | Lookup process | `obj.prop` - where is prop found? Own? Prototype? Higher? |
| **Live updates** | Chain dynamism | "Add method to prototype—do existing objects gain it?" |
| **instanceof** | Chain checking | "Why does `obj instanceof Constructor` return true?" |

**Trace data requirements**:
- Object creation with prototype link
- Property access (own vs inherited)
- Prototype chain traversal (which object in chain provided property)
- Prototype modification (affects lookups)

**Connection to memory model**: Prototype chain is graph of heap objects with [[Prototype]] references.

**Assessment progression**:
1. **Syntactic**: Identify prototype relationships in code
2. **Behavioral**: Predict property lookup results
3. **Conceptual**: Explain delegation vs copying
4. **Design**: Choose appropriate prototype patterns

**Modern JavaScript note**: class syntax hides prototypes—assess whether students understand underlying mechanism or only surface syntax.

---

#### 9. This Binding Assessment

**Notional machine**: `this` value determined by how function called (call-site binding), not where defined. Rules: new binding > explicit (.call/.apply/.bind) > implicit (method call) > default (global/undefined).

**Core understanding to assess**:
- Call-site determines `this`
- Method call: `obj.method()` → `this` is obj
- Function call: `func()` → `this` is global (or undefined in strict)
- new: `new Func()` → `this` is new object
- Arrow functions: lexical `this` (from enclosing scope)

**Common flawed models**:
- "`this` refers to function itself" (no, it's execution context)
- "`this` is determined at definition" (wrong for regular functions)
- "Arrow functions just shorter syntax" (misses lexical `this` difference)
- "`this` inside object literal = the object" (no binding until method called)

**Assessment strategies**:

| Assessment Type | Focus | Example |
|----------------|-------|---------|
| **Call-site analysis** | Binding rules | "What is `this` at each call site?" |
| **Method extraction** | Lost context | `const f = obj.method; f();` - what is `this` in f? |
| **Arrow vs regular** | Lexical vs dynamic | Compare `this` in arrow vs regular function in same context |
| **Explicit binding** | .call/.apply/.bind | "After .bind(obj), what is `this`?" |

**Trace data requirements**:
- Function call events with `this` value
- Arrow function creation (capture lexical `this`)
- .call/.apply/.bind usage
- new invocation (object creation, `this` binding)

**Connection to misconceptions**:
- Context binding (Tier 2)
- Method extraction bugs (common source of errors)
- Arrow function confusion (syntax similarity hides semantic difference)

**Assessment challenge**: `this` rules are complex, numerous—students often memorize without understanding.

**Solution**: Systematic assessment of each binding rule separately, then integration.

**Taxonomy connection**:
- **SOLO Multistructural**: Knows individual binding rules (method call, function call, etc.)
- **SOLO Relational**: Integrates rules into decision algorithm based on call-site
- **Block Model Level 3**: Understands WHY rules exist (flexibility, method borrowing)

---

### OOP Layer Notional Machines

These build on prototype chain and `this` binding to form complete object model.

---

#### 10. Static vs Instance Members Assessment

**Notional machine**: Instance members (methods/properties) exist on objects or prototype chain. Static members exist on constructor function itself. Static methods can't access instance data without explicit instance argument.

**Core understanding to assess**:
- Instance members → accessible via `this` in methods
- Static members → accessible via ClassName.member
- Static methods can't use `this` for instance data
- static = one copy per class, instance = one per object

**Common flawed models**:
- "Static = private" (confuses access with storage)
- "Static methods can access instance properties" (can't without object parameter)
- "All class methods are instance methods" (misses static)

**Assessment strategies**:

| Assessment Type | Focus | Example |
|----------------|-------|---------|
| **Access prediction** | Static vs instance syntax | "How do you call this static method?" |
| **this in static** | Context confusion | "What is `this` in static method?" (the class, not instance) |
| **Member classification** | Categorization | "Which methods are static? Instance?" |
| **Design reasoning** | When to use static | "Should this be static or instance? Why?" |

**Trace data requirements**:
- Method calls distinguished by static vs instance
- Property access on constructor vs instance
- `this` value in static methods (constructor function)

**Connection to memory model**: Static stored on constructor (one location), instance stored per-object (multiple locations).

**BSI mapping**:
- **Behavior**: Static methods execute without instance
- **Strategy**: When to use static (utility methods, factory methods)
- **Implementation**: Syntax for defining/calling static vs instance

---

#### 11. Class Syntax Assessment

**Notional machine**: ES6 class syntax is syntactic sugar over prototypes. class = constructor function + prototype methods. Understanding both representations (class syntax and underlying prototypes) is valuable.

**Core understanding to assess**:
- class desugars to function + prototype
- constructor method = constructor function
- Class methods → prototype methods
- Class fields → instance properties (or static)
- extends = prototype chain setup

**Common flawed models**:
- "Classes are new type" (syntactic sugar over prototypes)
- "Class methods independent of prototypes" (they're prototype methods)
- "Private fields truly private" (WeakMap implementation, not language-level)

**Assessment strategies**:

| Assessment Type | Focus | Example |
|----------------|-------|---------|
| **Desugaring** | Class to function+prototype | "Rewrite this class using function and .prototype" |
| **Equivalence** | Syntax variations | "Are these equivalent?" (class vs function+prototype) |
| **Inheritance** | extends mechanism | "What does `extends` do to prototype chain?" |
| **Field initialization** | Constructor vs field | "When do class fields initialize?" |

**Trace data requirements**:
- Class instantiation (constructor execution)
- Method calls (prototype lookup)
- Field initialization timing
- super calls (parent constructor/method invocation)

**Pedagogical debate**: Should students learn:
1. Prototypes first, class syntax later (deep understanding)?
2. Class syntax first, prototypes optional (pragmatic)?
3. Class syntax only (modern JS, avoid confusion)?

**Assessment depends on pedagogical choice**: If prototypes taught, assess desugaring understanding. If class-only, assess class semantics without prototype references.

**Connection to other NMs**:
- Prototype chain (underlying mechanism)
- This binding (method context)
- Static vs Instance (member categories)

---

### Advanced/Optional Notional Machine

---

#### 12. Type Coercion Assessment

**Notional machine**: JavaScript implicitly converts types in certain contexts (operators, conditions). Coercion follows algorithmic rules (ToPrimitive, ToNumber, ToString, ToBoolean).

**Core understanding to assess**:
- Coercion triggers (operators, conditions)
- Coercion rules (+ → string if one operand string, else number)
- Truthiness rules (falsy: false, 0, "", null, undefined, NaN)
- == vs === (== coerces, === doesn't)
- Edge cases ([] + {}, typeof null, NaN !== NaN)

**Common flawed models**:
- "== and === just different strictness" (misses coercion)
- "Coercion is random/unpredictable" (there are rules)
- "Implicit conversion helpful" (often source of bugs)

**Assessment strategies**:

| Assessment Type | Focus | Example |
|----------------|-------|---------|
| **Coercion prediction** | Type conversion | `"5" + 3` vs `"5" - 3` results? |
| **Truthiness** | Boolean context | Which values are falsy? |
| **Equality** | == vs === | `[] == false` is true, why? |
| **Edge cases** | WTF JavaScript | `typeof null`, `NaN !== NaN` explanations |

**Trace data requirements**:
- Type coercion events (implicit conversions)
- Operator evaluation with type checks
- Conditional evaluation (truthiness testing)

**Assessment philosophy**: Balance between:
- Practical: "Use === always, avoid coercion"
- Comprehensive: "Understand coercion deeply"

**Recommendation**: Assess practical rules (===, explicit conversion) at intermediate level; assess deep understanding (ToPrimitive algorithm) at advanced level only.

---

## Integration Assessment: Multiple Notional Machines Together

### Why Integration Assessment Matters

Real programming requires coordinating multiple notional machines simultaneously. Assessing in isolation misses this complexity.

**Example requiring 5 NMs**:
```javascript
function makeCounter() {  // Call Stack: frame created
  let count = 0;         // Scope Chain: count in closure scope
  return function() {    // Closure: inner captures outer
    count++;             // Reference: count is reference, not copy
    setTimeout(() =>     // Event Loop: callback queued
      console.log(count),
      100
    );
  };
}
const counter = makeCounter();
counter(); // count = 1
counter(); // count = 2
```

**Assessment requires understanding**:
1. Call Stack: makeCounter frame created, returns, frame popped
2. Scope Chain: inner function has access to outer scope
3. Closure: count captured by inner function, outlives makeCounter frame
4. Reference semantics: count is reference, mutation affects all closures
5. Event Loop: setTimeout queues callback, doesn't execute immediately

**Single-NM assessment**: Tests closure OR event loop, not coordination.

**Integration assessment**: Tests whether student can trace execution through multiple interacting models.

### Integration Assessment Strategies

#### Strategy 1: Complete Trace with Multi-NM Annotations

**Task**: "Trace this code, annotating which notional machine explains each step."

```javascript
const obj = {
  value: 1,
  increment() {
    this.value++;
    setTimeout(() => console.log(this.value), 0);
  }
};
obj.increment();
```

**Student must identify**:
- Object creation (Memory Model)
- Method call (This Binding: obj is `this`)
- Property mutation (Reference Semantics)
- Arrow function (This Binding: lexical capture)
- setTimeout (Event Loop: callback queued)

**Assessment rubric**:
- Identifies all NMs: 5 points
- Correctly explains interactions: 5 points
- Predicts output: 2 points
- Total: 12 points (multi-dimensional scoring)

#### Strategy 2: Misconception Diagnosis with NM Attribution

**Task**: "This code has unexpected behavior. Which notional machine does the student misunderstand?"

```javascript
// Student code
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3
// Student expected: 0, 1, 2
```

**Diagnosis requires**:
- Scope Chain: var has function scope, not block scope
- Closure: Callbacks capture i reference, not value
- Event Loop: Callbacks execute after loop completes

**Assessment**: Can student identify which NM(s) contain the flawed understanding?

#### Strategy 3: Design Task Requiring NM Application

**Task**: "Implement a cache that auto-expires entries after 60 seconds."

**Requires applying**:
- Memory Model: Cache is object in heap
- Reference Semantics: Cache mutations visible to all references
- Event Loop: setTimeout for expiration
- Closure (optional): Expiration callback captures entry

**Assessment**: Does student's design reflect correct NM understanding? Common errors reveal flawed models:
- No setTimeout → Event loop misunderstanding
- Copies cache instead of mutating → Reference semantics confusion
- Synchronous expiration check → Event loop confusion

### Progressive Integration Assessment

**Level 1: Adjacent NMs** (2-3 NMs)
- Call Stack + Scope Chain
- Reference Semantics + Memory Model
- Closure + Event Loop

**Level 2: Subsystem Integration** (3-5 NMs)
- Foundation layer: Memory + Call Stack + Scope
- OOP layer: Prototype Chain + This Binding + Static/Instance
- Async layer: Event Loop + Closure + Call Stack

**Level 3: Full System** (5+ NMs)
- Real-world scenarios requiring coordination across layers

**Assessment timing**: Assess integration only after individual NMs solidly understood.

---

## Assessment Strategies by Notional Machine Characteristics

### Visible vs Invisible NMs

**Visible NMs** (Observable in code): Syntax, operators, some control flow
- **Assessment**: Direct code inspection tasks

**Invisible NMs** (Runtime behavior): Memory allocation, scope chains, event loop, prototype chains
- **Assessment**: Requires trace data, diagrams, mental simulation

| NM | Visibility | Assessment Implication |
|----|-----------|------------------------|
| **Expression Layer** | Visible | Can assess from static code |
| **Memory Model** | Invisible | Needs diagrams/traces |
| **Scope Chain** | Semi-visible | Infer from code structure, verify with traces |
| **Event Loop** | Invisible | Prediction/trace essential |
| **Prototype Chain** | Invisible | instanceof/property checks reveal |
| **Type Coercion** | Invisible | Only see result, not process |

**Trace data criticality**: Invisible NMs cannot be fully assessed without execution traces or student-produced diagrams showing runtime state.

### Simple vs Complex NMs

**Simple NMs**: Single concept, few rules (Expression Layer, Reference Semantics)
- **Assessment**: Direct prediction, minimal context

**Complex NMs**: Multiple interacting rules (Event Loop, Scope Chain + Closures)
- **Assessment**: Scaffolded tasks, progressive complexity

**Assessment progression principle**: Start with simple NMs, build to complex. Assess fundamentals before integration.

### Prerequisite Dependencies

**NM dependency graph**:
```
Memory Model
    ↓
Call Stack → Scope Chain → Closures
    ↓            ↓
Event Loop   Reference Semantics
    ↓
(Full integration)
```

**Assessment implication**: Can't assess closures before scope chain, can't assess event loop before call stack.

**Diagnostic value**: If student fails closure assessment but passed scope chain, specific gap identified.

---

## Notional Machine Assessment × Educational Taxonomies

### SOLO Taxonomy × NM Assessment

| SOLO Level | NM Assessment Focus | Example (Scope Chain) |
|-----------|---------------------|----------------------|
| **Prestructural** | No coherent model | Can't distinguish local vs global variables |
| **Unistructural** | Single NM element | Knows nested functions see outer variables (but not why/how) |
| **Multistructural** | Multiple elements, disconnected | Knows lexical scope, closure capture, shadowing (separately) |
| **Relational** | Integrated NM | Explains scope chain as unified variable resolution mechanism |
| **Extended Abstract** | Transfer to novel contexts | Applies scope model to predict module scope, class private fields |

**Assessment design**: Tasks must target appropriate SOLO level. Don't ask Relational questions of Unistructural students.

### Block Model × NM Assessment

| Block Model Level | NM Role | Example |
|-------------------|---------|---------|
| **Text Surface (Level 1)** | Syntax awareness | Identify function, loop, object literal syntax |
| **Program Model (Level 2)** | Execution understanding | Trace program using NM (follow scope chain, stack frames) |
| **Situation Model (Level 3)** | Problem-solution mapping | Choose appropriate NM for problem (closures for data hiding) |

**NM assessment primarily targets Level 2**: Execution tracing using notional machine.

**Level 3 extension**: Assess when students can select/apply NMs strategically for design.

### BSI Framework × NM Assessment

| BSI Dimension | NM Assessment | Example (Closures) |
|--------------|---------------|-------------------|
| **Behavior** | What NM predicts | Closure prints captured variable value |
| **Strategy** | When to apply NM | Use closures for data hiding, callback state |
| **Implementation** | How to implement NM | Syntax: function in function, return inner |

**Assessment breadth**: All three dimensions needed for complete NM mastery.

**Traditional assessment bias**: Focuses on Implementation (can write closure), neglects Strategy (when appropriate).

---

## Research Gaps and Tool Development Opportunities

### Notional Machine Diagnosis Accuracy

**Gap**: No validated instruments for diagnosing which notional machine student misunderstands.

**Challenge**: Student error could stem from multiple flawed NMs—disambiguation difficult.

**Example ambiguity**:
```javascript
const obj = { x: 1 };
function modify(o) { o = { x: 2 }; }
modify(obj);
console.log(obj.x); // 1
```

**Possible flawed NMs**:
- Reference semantics (thinks reassignment affects original)
- Scope chain (thinks parameter assignment affects outer)
- Call stack (doesn't understand parameter scoping)

**Research needed**: Diagnostic item sets that isolate specific NM understanding.

**Tool opportunity**: Trace-based NM diagnosis—correlate execution patterns with NM understanding (or misunderstanding).

### Progressive NM Complexity

**Gap**: Little research on optimal sequencing of NM instruction/assessment.

**Questions**:
- Should closures be taught before or after prototypes?
- Is event loop best understood early or late?
- Can students handle multiple NMs simultaneously or must they be introduced serially?

**Assessment implication**: If optimal sequence unknown, assessment difficulty calibration uncertain.

**Tool opportunity**: Learning analytics showing which NM sequences produce best outcomes.

### NM Integration Assessment

**Gap**: Few assessments explicitly test multi-NM coordination.

**Challenge**: Designing tasks that require multiple NMs without being overwhelmingly complex.

**Research needed**: Rubrics for scoring integration understanding separately from individual NM mastery.

**Tool opportunity**: Trace-based assessment showing which NMs student applied correctly vs incorrectly in complex task.

### Visual vs Textual NM Assessment

**Gap**: Unclear whether visual (diagrams) or textual (traces) NM assessment more effective.

**Hypothesis**: Visual better for spatial models (memory, stack), textual better for sequential (event loop).

**Research needed**: Comparative studies of assessment modality effectiveness.

**Tool opportunity**: Multi-modal assessment allowing student to choose representation (diagram, trace, code, explanation).

### Longitudinal NM Development

**Gap**: No large-scale data on how NMs develop over time in learners.

**Questions**:
- How long to master each NM?
- Do students construct NMs incrementally or through "aha" moments?
- Which NMs are prerequisites for others (empirically, not theoretically)?

**Assessment implication**: Timing of assessments unknown—too early detects lack of exposure, too late misses learning process.

**Tool opportunity**: Longitudinal trace data showing NM mastery progression across multiple sessions.

### Cultural and Language Variations

**Gap**: Most NM research Western-centric, English-language.

**Questions**:
- Do metaphors for NMs (stack, queue, chain) translate across cultures?
- Does native language affect spatial vs sequential model preference?
- Are visual NM representations universally comprehensible?

**Assessment implication**: NM assessment validity may vary across populations.

**Tool opportunity**: Multi-language, culturally-adapted NM assessments with validation studies.

---

## Practical Implications for Assessment Tool Developers

### What Trace Infrastructure Must Provide for NM Assessment

**Per-NM trace requirements**:

| Notional Machine | Critical Trace Events |
|-----------------|----------------------|
| **Creation/Execution Phase** | Variable declarations (parse-time), variable initializations (run-time), TDZ violations |
| **Memory Model** | Object allocations, variable assignments (copy vs reference), scope frame creation/destruction |
| **Expression Layer** | Expression evaluation order, operator applications, type coercions |
| **Call Stack** | Function calls (frame push), function returns (frame pop), local variable lifetimes |
| **Scope Chain** | Scope enter/exit, variable resolution path (which scope), closure capture |
| **Reference Semantics** | Object mutations, object aliasing, reference copies, reassignments |
| **Event Loop** | Task enqueue/dequeue, microtask enqueue/dequeue, callback execution, stack empty detection |
| **Prototype Chain** | Property lookups (own vs inherited), prototype traversal, prototype modifications |
| **This Binding** | Function call contexts (`this` value), arrow function `this` capture, .call/.apply/.bind |
| **Static/Instance** | Static method calls, instance method calls, constructor invocations |
| **Class Syntax** | Class instantiation, constructor execution, field initialization, super calls |
| **Type Coercion** | Implicit conversions, operator type checking, truthiness evaluation |

**Configuration principle**: Granularity must match NM complexity—event loop needs detailed async tracking, expression layer needs operator-level events.

### What Assessment Tools Must Implement

**NM-specific visualization**:
- Call Stack: Stack frame diagrams, dynamic updates
- Scope Chain: Nested scope visualization, variable resolution highlighting
- Memory Model: Stack/heap diagrams, reference arrows
- Event Loop: Queue visualization, task/microtask differentiation
- Prototype Chain: Chain diagrams, property lookup traversal

**NM diagnosis algorithms**:
- Pattern recognition (detect NM-specific errors)
- Model inference (deduce student's NM from behavior)
- Misconception mapping (NM error → specific misconception)

**Assessment generation**:
- NM-targeted question banks (per NM, per difficulty level)
- Integration task generation (multiple NMs combined)
- Adaptive assessment (adjust NM complexity based on student level)

**Feedback design**:
- NM-specific explanations (reference correct model explicitly)
- Contrast with flawed models (show what student likely believes vs reality)
- Scaffolded correction (guide to correct NM understanding)

### Assessment Workflow for NM-Based Tools

**Step 1: Identify target NM(s)** (from 12 JavaScript NMs)

**Step 2: Determine assessment level** (individual NM vs integration, SOLO level, Block Model level)

**Step 3: Design tasks** (prediction, tracing, diagram, explanation, application)

**Step 4: Specify trace requirements** (which events needed to validate student predictions/explanations)

**Step 5: Implement visualization** (make NM explicit through visual/textual representation)

**Step 6: Create rubrics** (score NM understanding at multiple levels: syntactic, behavioral, conceptual, design)

**Step 7: Develop feedback** (NM-specific explanations, contrast correct vs flawed models)

**Step 8: Validate diagnostics** (compare tool diagnosis to expert judgment, measure accuracy)

**Step 9: Iterate** (refine based on student performance data, false positive/negative rates)

---

## Summary: Core Principles from Integration

1. **Notional Machines Are Mental Models**: Assessment validates whether student's execution model matches correct NM, not just whether code works.

2. **12 NMs for JavaScript**: Each requires specific assessment strategies matched to NM complexity and visibility.

3. **Invisible NMs Need Traces**: Memory, scope chains, event loop, prototypes cannot be fully assessed from static code—execution traces essential.

4. **Integration Assessment Critical**: Real programming requires coordinating multiple NMs—assess in isolation AND integration.

5. **Progressive Complexity**: Assess simple NMs before complex, individual before integration, foundation before advanced.

6. **Taxonomy Alignment Essential**: NM assessment difficulty must match SOLO/Block Model level—don't assess Relational understanding with Unistructural tasks.

7. **Multi-Dimensional Assessment**: BSI framework applies—assess Behavior (what NM predicts), Strategy (when to apply), Implementation (how to use).

8. **Diagnosis Requires Inference**: Student errors may stem from multiple flawed NMs—diagnostic assessment must disambiguate.

9. **Research Gaps Are Opportunities**: NM diagnosis validation, optimal sequencing, integration assessment, longitudinal development—all open for tool-driven research.

10. **Trace + Prediction Synergy**: Traces show WHAT happened, predictions reveal student's mental model of WHY—both needed for NM assessment.

---

## Next Steps

**Integration with other chapters**:
- Misconceptions: Which misconceptions reveal flawed NMs?
- Threshold concepts: Are NMs thresholds themselves?
- Learning tools: What tools best teach/assess each NM?

**Step 4** (Use Cases): Practical NM assessment implementations in educational tools.

**Step 5** (Requirements): Translate NM assessment needs into precise trace infrastructure specifications.
