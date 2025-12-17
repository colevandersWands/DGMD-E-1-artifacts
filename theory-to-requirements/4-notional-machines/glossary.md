# Glossary: Notional Machines & JavaScript Execution Terms

**Purpose**: Definitions of technical terms used throughout the notional machines documentation.

**Target Audience**: Tool developers and educators who need quick reference for specialized terminology.

---

## Educational Theory Terms

### Notional Machine (NM)
**Definition**: A simplified, pedagogical model of how a computer system executes programs, designed specifically for teaching and learning.

**Origin**: Sorva (2013), building on du Boulay (1986)

**Example**: Call Stack Model is a notional machine showing function execution order through LIFO stack visualization.

**Why Important**: Students need accurate mental models to predict program behavior, debug effectively, and transfer knowledge to new contexts.

---

### SOLO Taxonomy
**Definition**: Structure of Observed Learning Outcomes - 5-level hierarchy describing student understanding depth.

**Levels**:
1. **Prestructural**: No coherent understanding
2. **Unistructural**: Single aspect understood
3. **Multistructural**: Multiple separate aspects understood
4. **Relational**: Aspects integrated into coherent structure
5. **Extended Abstract**: Generalization beyond taught context

**Application**: Assess which SOLO level student demonstrates for each notional machine.

**Citation**: Biggs & Collis (1982)

---

### Block Model
**Definition**: Three-level framework for programming comprehension (Pennington 1987).

**Levels**:
1. **Text Surface**: Syntax and keywords (lexical understanding)
2. **Program Execution**: Runtime behavior and dataflow (semantic understanding)
3. **Function/Purpose**: Goals and problem-solving strategies (strategic understanding)

**Application**: Diagnose whether student struggles are syntactic, semantic, or strategic.

---

### BSI Framework
**Definition**: Behavior-Strategy-Implementation abstraction levels (Soloway & Ehrlich 1984).

**Levels**:
- **Behavior**: What the code accomplishes (external observable effects)
- **Strategy**: How the goal is achieved (algorithmic approach)
- **Implementation**: Code-level details (specific language constructs)

**Application**: Teach concepts at appropriate abstraction level for learner stage.

---

### Threshold Concept
**Definition**: Transformative, troublesome knowledge that creates "portal" to new understanding (Meyer & Land 2003).

**Characteristics**:
- **Troublesome**: Counterintuitive, alien, conceptually difficult
- **Transformative**: Fundamentally changes how student sees the domain
- **Integrative**: Connects previously separate concepts
- **Irreversible**: Once understood, can't "unlearn"
- **Bounded**: Defines discipline boundaries

**Examples in JavaScript**: Event loop, closures, prototypal inheritance

---

### Liminal State
**Definition**: Transitional zone where student is "betwixt and between" - has left old mental model but not yet arrived at correct one.

**Indicators**:
- Partial understanding (knows but can't apply)
- Oscillation (correct one moment, incorrect next)
- Frustration ("I thought I understood!")
- Over/under-generalization

**Support Strategy**: Intensive practice, prediction-validation cycles, explicit misconception confrontation.

---

### Misconception
**Definition**: Systematic incorrect mental model that students construct and persistently hold.

**Characteristics**:
- Predictable (same misconceptions across students)
- Coherent (internally consistent, even if wrong)
- Robust (resistant to correction)
- Generative (leads to predictable errors)

**Example**: "Assignment copies objects" (should be "copies references")

**Correction**: Requires confrontation with counterexamples, not just explanation.

---

## JavaScript Execution Terms

### Hoisting
**Definition**: JavaScript's behavior of processing declarations before executing code, making them available throughout their scope.

**Technical Detail**: During creation phase, var/function/class declarations are registered in the execution environment. This is NOT code movement.

**var Hoisting**:
```javascript
console.log(x); // undefined
var x = 5;
```
Variable `x` declared and initialized to `undefined` in creation phase.

**Function Hoisting**:
```javascript
foo(); // Works
function foo() {}
```
Function `foo` fully available in creation phase.

**Misconception**: "JavaScript moves declarations to the top"
**Reality**: Parser registers declarations in creation phase; code stays in original location.

---

### Temporal Dead Zone (TDZ)
**Definition**: Period between entering scope and variable initialization where `let`/`const` variables cannot be accessed.

**Example**:
```javascript
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 5;
```

**Technical Detail**: Variable `x` exists (hoisted) but is uninitialized. Accessing throws ReferenceError.

**TDZ Starts**: When execution enters scope containing `let`/`const`
**TDZ Ends**: When execution reaches declaration line

**Why TDZ Exists**: Prevents use of uninitialized variables (unlike `var` which allows accessing `undefined`).

---

### Creation Phase
**Definition**: First phase of JavaScript execution where the parser reads code, creates execution contexts, and registers declarations without executing code.

**Activities**:
- Parse syntax (SyntaxErrors thrown here)
- Create execution contexts (global, function, module)
- Register `var`, `let`, `const`, `function`, `class` declarations
- Set up scope chains
- Resolve module imports

**No Execution**: Code does not run; no assignments, no function calls, no expressions evaluated.

**Relation to Hoisting**: Declarations registered in creation phase appear "hoisted".

---

### Execution Phase
**Definition**: Second phase where code runs top-to-bottom, assignments happen, functions execute, and expressions evaluate.

**Activities**:
- Execute statements in order
- Assign values to variables
- Call functions
- Evaluate expressions
- Handle control flow (if/while/for)
- Process async operations

**Follows Creation**: Cannot start until creation phase complete for current execution context.

---

### LIFO (Last-In-First-Out)
**Definition**: Data structure access pattern where most recently added item is removed first.

**Application**: Call stack operates LIFO - most recently called function executes and returns first.

**Example**:
```javascript
function a() { b(); }
function b() { c(); }
function c() { }
a();
```

**Stack Growth**: [a] → [a, b] → [a, b, c]
**Stack Shrink**: [a, b, c] → [a, b] → [a] → []

**Contrast**: FIFO (First-In-First-Out) used by event queues.

---

### FIFO (First-In-First-Out)
**Definition**: Data structure access pattern where earliest added item is removed first.

**Application**: Event loop task queues (macrotask and microtask queues) operate FIFO.

**Example**:
```javascript
setTimeout(fn1, 0);
setTimeout(fn2, 0);
setTimeout(fn3, 0);
// Execution order: fn1, fn2, fn3 (FIFO)
```

**Contrast**: Call stack uses LIFO.

---

### Macrotask
**Definition**: Task in the event loop's main task queue, processed after call stack empties and microtasks complete.

**Sources**:
- `setTimeout` / `setInterval`
- `setImmediate` (Node.js)
- I/O operations
- UI rendering
- User events (click, scroll)

**Processing**: One macrotask per event loop iteration.

**Priority**: Lower than microtasks.

---

### Microtask
**Definition**: Task in the event loop's microtask queue, processed after current execution completes but before next macrotask.

**Sources**:
- Promise `.then()` / `.catch()` / `.finally()`
- `queueMicrotask()`
- `MutationObserver`
- `process.nextTick()` (Node.js - technically separate)

**Processing**: All microtasks processed before next macrotask.

**Priority**: Higher than macrotasks.

**Example**:
```javascript
setTimeout(() => console.log('macro'), 0);
Promise.resolve().then(() => console.log('micro'));
console.log('sync');
// Output: sync, micro, macro
```

---

### Event Loop
**Definition**: JavaScript's concurrency model that processes tasks from queues when the call stack is empty.

**Algorithm**:
1. Execute synchronous code (call stack)
2. When stack empty, process ALL microtasks
3. Take ONE macrotask, execute
4. Repeat from step 2

**Single-Threaded**: Only one task executes at a time (no parallelism).

**Non-Blocking**: Async operations don't block main thread.

---

### Closure
**Definition**: Function that captures (closes over) variables from its lexical scope, maintaining access even after outer function returns.

**Example**:
```javascript
function makeCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}
const counter = makeCounter();
counter(); // 1
counter(); // 2
```

**Key Point**: Inner function captures reference to `count`, not value. Scope persists as long as function exists.

**Memory**: Closures prevent garbage collection of captured variables.

---

### Lexical Scope
**Definition**: Scope determined by code structure (where functions are written), not execution context (where functions are called).

**Contrast**: Dynamic scope (not used in JavaScript except for `this` binding).

**Example**:
```javascript
let x = 'global';

function outer() {
  let x = 'outer';
  function inner() {
    console.log(x); // 'outer' (lexical scope)
  }
  return inner;
}

const fn = outer();
fn(); // Prints 'outer', not 'global'
```

**Application**: Closures use lexical scope to capture variables.

---

### Prototype Chain
**Definition**: Mechanism for object inheritance in JavaScript where objects link to other objects (prototypes) for property lookup.

**Structure**: Each object has internal `[[Prototype]]` link to another object (or `null`).

**Lookup**:
```javascript
obj.prop
// 1. Check obj for 'prop'
// 2. Check obj.[[Prototype]] for 'prop'
// 3. Check obj.[[Prototype]].[[Prototype]]...
// 4. Until found or reach null
```

**Delegation**: Properties not copied; inherited via chain walking.

**Example**:
```javascript
const animal = { eats: true };
const rabbit = Object.create(animal);
rabbit.eats; // true (inherited)
```

---

### `this` Binding
**Definition**: JavaScript's mechanism for determining the context object referenced by `this` keyword, based on call-site (not definition site).

**Binding Rules** (in precedence order):
1. **`new` binding**: `new Foo()` → `this` = new object
2. **Explicit binding**: `fn.call(obj)` → `this` = obj
3. **Implicit binding**: `obj.method()` → `this` = obj
4. **Default binding**: `fn()` → `this` = undefined (strict) or global (non-strict)

**Arrow Functions**: Lexical `this` (captured from enclosing scope), not call-site binding.

**Common Error**: Lost binding when extracting methods.

---

### Type Coercion
**Definition**: Implicit or explicit conversion between JavaScript types.

**Implicit** (Automatic):
```javascript
'5' + 3   // '53' (number → string)
'5' - 3   // 2 (string → number)
if (value) // (value → boolean)
```

**Explicit** (Manual):
```javascript
String(123)   // '123'
Number('456') // 456
Boolean(0)    // false
```

**Algorithms**:
- **ToPrimitive**: Convert object to primitive
- **ToNumber**: Convert to number
- **ToString**: Convert to string
- **ToBoolean**: Convert to boolean

**Operators**: Different operators use different coercion rules (`+` prefers string, `-` uses number).

---

### ToPrimitive
**Definition**: Abstract operation converting objects to primitive values.

**Algorithm**:
1. If already primitive, return value
2. Call `obj[Symbol.toPrimitive](hint)` if exists
3. If hint is "string": try `toString()`, then `valueOf()`
4. Otherwise: try `valueOf()`, then `toString()`
5. Throw TypeError if no primitive result

**Example**:
```javascript
const obj = {
  valueOf() { return 42; },
  toString() { return 'forty-two'; }
};

+obj  // 42 (hint: "number", valueOf first)
`${obj}` // 'forty-two' (hint: "string", toString first)
```

---

### ToNumber
**Definition**: Abstract operation converting values to numbers.

**Rules**:
- `undefined` → `NaN`
- `null` → `0`
- `true` → `1`, `false` → `0`
- String → Parse number (`'42'` → `42`, `'hello'` → `NaN`)
- Object → ToPrimitive(hint "number"), then ToNumber recursively

**Example**:
```javascript
Number('123')  // 123
Number('abc')  // NaN
Number(null)   // 0
Number([42])   // 42 ('[42]' → '42' → 42)
```

---

### ToString
**Definition**: Abstract operation converting values to strings.

**Rules**:
- `undefined` → `'undefined'`
- `null` → `'null'`
- Boolean → `'true'` or `'false'`
- Number → String representation
- Object → ToPrimitive(hint "string"), then ToString recursively

**Example**:
```javascript
String(123)    // '123'
String(null)   // 'null'
String([1,2])  // '1,2'
String({})     // '[object Object]'
```

---

### ToBoolean
**Definition**: Abstract operation converting values to booleans.

**Falsy Values** (convert to `false`):
1. `undefined`
2. `null`
3. `false`
4. `0`, `-0`, `0n` (BigInt zero)
5. `NaN`
6. `''` (empty string)

**Truthy**: Everything else converts to `true` (including `[]`, `{}`, `'0'`, `'false'`).

**Example**:
```javascript
Boolean(0)     // false
Boolean('')    // false
Boolean([])    // true (not falsy!)
Boolean({})    // true
```

---

### Garbage Collection (GC)
**Definition**: Automatic memory management that reclaims memory from objects no longer reachable.

**Algorithm** (JavaScript engines typically use mark-and-sweep):
1. **Mark**: Traverse from roots (global, stack), mark reachable objects
2. **Sweep**: Reclaim unmarked (unreachable) objects

**Generational GC**: Optimize based on object lifetime (young generation vs old generation).

**Memory Leaks**: Occur when references prevent GC (e.g., forgotten event listeners, closures capturing large scopes).

---

### Stack (Memory)
**Definition**: Memory region for function execution contexts, local variables, and primitive values.

**Characteristics**:
- Fast allocation/deallocation
- Fixed-size per context
- LIFO access pattern
- Automatic cleanup (when function returns)

**Stores**:
- Local variables (primitives)
- Function parameters
- Return addresses
- References to heap objects

---

### Heap (Memory)
**Definition**: Memory region for dynamic allocations (objects, arrays, closures).

**Characteristics**:
- Slower than stack
- Variable-size allocations
- Manual management (via GC)
- Longer lifetime

**Stores**:
- Objects (`{}`)
- Arrays (`[]`)
- Functions (as objects)
- Closures (captured scope)

---

### Reference
**Definition**: Memory address pointing to a heap-allocated object.

**Behavior**:
- Assignment copies reference (not object)
- Multiple variables can reference same object
- Mutation via one reference affects all

**Example**:
```javascript
let obj1 = {x: 1};
let obj2 = obj1;  // Copy reference
obj2.x = 2;       // Mutate shared object
console.log(obj1.x); // 2
```

---

### Pass by Value
**Definition**: Function parameters receive copies of argument values.

**JavaScript Semantics**: Everything is pass-by-value, but for objects, the value copied is a reference.

**Primitives**:
```javascript
function modify(x) {
  x = 99;
}
let a = 5;
modify(a);
console.log(a); // 5 (unchanged)
```

**Objects**:
```javascript
function modify(obj) {
  obj.x = 99; // Mutation affects original
  obj = null; // Reassignment doesn't affect original
}
let o = {x: 1};
modify(o);
console.log(o.x); // 99
console.log(o);   // {x: 99} (not null)
```

---

### Mutation
**Definition**: Changing the contents of an existing object without creating a new object.

**Operations**:
- Property assignment: `obj.prop = value`
- Array methods: `arr.push()`, `arr.splice()`
- Object.assign: `Object.assign(target, source)`

**Contrast**: Reassignment (`obj = newObj`) creates new binding, doesn't mutate.

**Functional Programming**: Avoids mutation, prefers creating new objects.

---

### Immutability
**Definition**: Pattern where data structures are never modified after creation; operations return new structures.

**Benefits**:
- Predictable (no hidden mutations)
- Easier debugging (state changes explicit)
- Safe sharing (no mutation surprises)

**Implementation**:
```javascript
// Mutable (avoid)
arr.push(item);

// Immutable (prefer)
arr = [...arr, item];
```

**Libraries**: Immutable.js, Immer provide efficient immutable data structures.

---

### Module
**Definition**: Self-contained code unit with explicit imports/exports.

**ES Modules** (ESM):
```javascript
// math.js
export const add = (a, b) => a + b;

// app.js
import { add } from './math.js';
```

**CommonJS**:
```javascript
// math.js
exports.add = (a, b) => a + b;

// app.js
const { add } = require('./math.js');
```

**Key Difference**: ESM imports resolved in creation phase (static), CommonJS at runtime (dynamic).

---

## Tool Implementation Terms

### Trace Data
**Definition**: Recorded information about program execution, capturing events, state changes, and dataflow.

**Components**:
- Execution events (function enter/exit, loop iteration)
- Variable state (values over time)
- Dataflow (where values come from/go to)
- Control flow (branches taken)

**Uses**: Visualization, debugging, replay, assessment.

---

### Visualization
**Definition**: Graphical representation of program execution or data structures.

**Types**:
- **Static**: Code structure (AST, dependency graph)
- **Dynamic**: Runtime behavior (call stack, memory state)
- **Temporal**: Changes over time (animation, timeline)

**Design Principles**: Progressive disclosure, appropriate abstraction level, learner-centered.

---

### Progressive Disclosure
**Definition**: Pedagogical pattern revealing complexity gradually based on learner readiness.

**Implementation**:
- Beginners: Hide advanced details (show results, not mechanisms)
- Intermediates: Show core mechanics, hide edge cases
- Advanced: Full detail, including optimizations and specifications

**Example**: Call Stack visualization might show only function names (beginner) vs full stack frames with variables (advanced).

---

## Usage Note

Terms in this glossary are linked from the main documentation. When you see `[term](#term)` links in the README or NM documents, they point to definitions here.

For academic citations and detailed research background, see [Literature Review](../0-literature-review/notional-machines-literature-review.md).
