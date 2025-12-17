# Notional Machines Categorized by Programming Paradigm

**Purpose**: Group notional machines by programming paradigm to show which NMs support which mental models and programming styles.

**Key Insight**: Different paradigms emphasize different NMs - imperative code needs Call Stack + Memory, OOP needs Prototypes + This Binding, functional needs Scope Chain + closures, async needs Event Loop.

---

## Paradigm Overview

JavaScript is **multi-paradigm**, supporting:
- **Imperative (Procedural)**: Sequential execution, mutable state, function decomposition
- **Imperative (Control-Flow Only)**: Sequential execution without procedures (inline code)
- **Declarative (Method Chaining)**: Fluent APIs, data transformations, pipeline patterns
- **Object-Oriented**: Objects, inheritance, encapsulation
- **Functional**: Functions as values, closures, immutability
- **Asynchronous**: Non-blocking operations, callbacks, promises
- **Event-Driven**: User interactions, DOM events, reactive patterns

**Educational Implication**: Students need different NM subsets depending on programming style being taught.

---

## Imperative (Procedural) Programming Paradigm

**Characteristics**: Sequential execution, explicit control flow, mutable state, function decomposition

### Core NMs for Imperative

#### 1. Call Stack Model ★★★★★
**Why Essential**:
- Fundamental to understanding sequential execution
- Shows function call order explicitly
- Required for all imperative patterns

**Imperative Patterns Supported**:
- Procedural decomposition
- Step-by-step execution
- Iteration (loop frames)
- Recursion as iteration alternative

**Example**:
```javascript
function processData(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(transform(arr[i]));
  }
  return result;
}
```
**Call Stack NM shows**: Function entry, loop iterations on stack, return flow

---

#### 2. Memory Model ★★★★★
**Why Essential**:
- Core to imperative style (mutable state)
- Shows variable storage and updates
- Required for understanding side effects

**Imperative Patterns Supported**:
- Variable assignment and reassignment
- Accumulator patterns
- State machines
- In-place mutations

**Example**:
```javascript
let total = 0;
for (let i = 0; i < 10; i++) {
  total += i;  // Mutation central to imperative style
}
```
**Memory Model shows**: `total` updating in place, loop variable `i` changing

---

#### 3. Operator Evaluation Model ★★★☆☆
**Why Important**:
- Expressions are building blocks
- Evaluation order matters for side effects
- Precedence impacts imperative code correctness

**Imperative Patterns Supported**:
- Complex expressions with side effects
- Conditional evaluation
- Short-circuit guards

**Example**:
```javascript
let x = 0;
if (x++ < 10 && process(x)) {
  // Side effect in condition
}
```
**Operator Model shows**: Left-to-right, short-circuit, side effect timing

---

#### 4. Reference vs. Value Model ★★★★☆
**Why Important**:
- Mutation semantics differ for primitives vs objects
- Imperative code relies on shared mutable state
- Parameter passing affects imperative patterns

**Imperative Patterns Supported**:
- Shared mutable data structures
- In-place transformations
- Output parameters (via mutation)

**Example**:
```javascript
function addToCart(cart, item) {
  cart.push(item);  // Mutates shared cart
}
```
**Reference Model shows**: `cart` parameter is reference, mutation affects caller

---

### Secondary NMs for Imperative (Procedural)

#### Type Coercion Model ★★☆☆☆
- Affects conditional evaluation
- Impacts operator semantics
- Less paradigm-specific

---

## Imperative (Control-Flow Only) Programming Paradigm

**Characteristics**: Sequential execution, explicit control structures (if/while/for), mutable state, NO function decomposition

**Typical Context**: Beginner programming, scripting, small standalone scripts

### Core NMs for Control-Flow Imperative

#### 1. Memory Model ★★★★★
**Why Essential**:
- Variables are the primary abstraction (no functions to hide complexity)
- All state visible and mutable
- Direct manipulation of values

**Control-Flow Patterns Supported**:
- Global/script-level variables
- Loop counters and accumulators
- Conditional state changes
- Sequential mutations

**Example**:
```javascript
let count = 0;
let total = 0;

while (count < 10) {
  total += count;
  count++;
}

if (total > 45) {
  console.log('Large total');
}
```
**Memory Model shows**: All variables at script level, direct mutations, no function boundaries

---

#### 2. Operator Evaluation Model ★★★★☆
**Why Essential**:
- Expressions are primary computational unit (no function abstractions)
- Control flow depends on expression evaluation
- No function calls to hide complexity

**Control-Flow Patterns Supported**:
- Complex conditional expressions
- Loop condition evaluation
- Inline calculations
- Short-circuit logic

**Example**:
```javascript
let x = 5;
let y = 10;

if (x > 0 && y / x < 5) {  // Expression-heavy control flow
  x = x * 2 + y;
}
```
**Operator Model shows**: Precedence, short-circuit, evaluation order for control decisions

---

#### 3. Type Coercion Model ★★★☆☆
**Why Important**:
- No type abstractions (functions with type checks)
- Direct comparisons and operations
- Truthiness in conditions

**Control-Flow Patterns Supported**:
- Truthy/falsy in conditions
- Implicit conversions in operations
- Type-flexible comparisons

**Example**:
```javascript
let input = '5';
let threshold = 10;

if (input < threshold) {  // String coerced to number
  console.log('Below threshold');
}
```
**Type Coercion shows**: Implicit string→number conversion in comparison

---

### Minimal NMs for Control-Flow Imperative

#### Call Stack Model ★☆☆☆☆
- **Not needed**: No function calls (or only built-in functions)
- If present: Only for built-in functions (console.log, etc.)

#### Scope Chain Model ★☆☆☆☆
- **Not needed**: No nested scopes (all script-level or simple blocks)
- Block scopes minimal (if/while blocks)

**Teaching Value**: This paradigm teaches fundamentals without function abstraction complexity. Good for absolute beginners (first week of programming).

**Educational Progression**: Control-Flow → Procedural (add functions) → OOP/Functional

---

## Declarative (Method Chaining) Programming Paradigm

**Characteristics**: Fluent APIs, data transformations through pipelines, expression-oriented, minimal explicit state

**Typical Context**: Array methods, jQuery-style APIs, LINQ-like patterns, functional pipelines

### Core NMs for Declarative Chaining

#### 1. Call Stack Model ★★★★☆
**Why Important**:
- Method chains create deep call stacks
- Understanding callback execution order
- Each method call is a stack frame

**Declarative Patterns Supported**:
- Chained method calls (arr.map().filter().reduce())
- Callback execution within methods
- Fluent API patterns
- Builder patterns

**Example**:
```javascript
const result = [1, 2, 3, 4, 5]
  .map(x => x * 2)
  .filter(x => x > 5)
  .reduce((sum, x) => sum + x, 0);
```
**Call Stack shows**:
```
[reduce callback]
  (processes filtered values)
[filter callback]
  (checks condition for each element after map)
[map callback]
  (transforms each element)
```

---

#### 2. Scope Chain Model ★★★★☆
**Why Important**:
- Callbacks capture outer scope
- Arrow functions inherit context
- Closure-based data passing

**Declarative Patterns Supported**:
- Callbacks accessing outer variables
- Parameterized transformations via closures
- Context preservation in chains

**Example**:
```javascript
function processData(threshold) {
  return data
    .filter(item => item.value > threshold)  // Closure captures threshold
    .map(item => item.value)
    .reduce((sum, val) => sum + val, 0);
}
```
**Scope Chain shows**: `threshold` captured in filter callback closure

---

#### 3. Memory Model ★★★☆☆
**Why Relevant**:
- Intermediate arrays created per method
- Immutable transformations (new arrays)
- Understanding memory implications

**Declarative Patterns Supported**:
- Copy-on-transform (map returns new array)
- Avoiding mutations
- Builder pattern accumulation

**Example**:
```javascript
const original = [1, 2, 3];
const doubled = original.map(x => x * 2);
// original unchanged, doubled is new array
```
**Memory Model shows**: Two separate arrays (no mutation)

---

#### 4. Reference vs. Value Model ★★★☆☆
**Why Relevant**:
- Understanding when methods mutate vs return new values
- Copying vs sharing in transformations
- Immutability patterns

**Declarative Patterns Supported**:
- Non-mutating methods (map, filter) vs mutating (push, splice)
- Chaining requires immutability
- Builder pattern reference passing

**Example**:
```javascript
[1, 2, 3]
  .map(x => x * 2)     // Returns new array
  .push(7);            // ❌ Error: push returns number, not array

// Correct immutable version:
[1, 2, 3]
  .map(x => x * 2)
  .concat([7]);        // Returns new array
```
**Reference Model shows**: map returns new reference, concat preserves chain

---

### Secondary NMs for Declarative Chaining

#### This Binding Model ★★☆☆☆
- Arrow functions avoid `this` binding issues in callbacks
- Method chaining preserves context (jQuery pattern)

**Teaching Value**: Teaches data transformations without explicit loops or mutations. Bridges imperative and functional styles. Common in modern JavaScript (array methods, promises).

---

## Event-Driven Programming Paradigm

**Characteristics**: User interactions trigger execution, reactive patterns, handler registration, non-sequential flow

**Typical Context**: DOM events, UI frameworks, reactive systems, observer patterns

**Key Distinction from Async**: Event-driven is about *reacting to user/system events*, async is about *non-blocking operations*. Often combined, but conceptually distinct.

### Core NMs for Event-Driven

#### 1. Call Stack Model ★★★★★
**Why Essential**:
- Event handlers execute independently (separate stack contexts)
- Understanding when handlers run
- Handler call stack is separate from registration

**Event-Driven Patterns Supported**:
- Event handler execution
- Event bubbling/capturing (nested handlers)
- Handler registration vs execution distinction
- Multiple handlers for same event

**Example**:
```javascript
button.addEventListener('click', function handleClick() {
  console.log('Clicked!');
  // This runs in its own call stack, separate from registration
});

console.log('Handler registered');
// Registration completes immediately, handler runs later on click
```
**Call Stack shows**:
```
Registration time:
[addEventListener]
[console.log('Handler registered')]

Click time (later):
[handleClick]  ← Separate stack, triggered by event
```

---

#### 2. Event Loop Model ★★★★☆
**Why Important**:
- Event handlers queued as macrotasks
- Understanding event timing
- Event queue processing

**Event-Driven Patterns Supported**:
- Event handler queuing
- Event processing order
- Interaction with async code
- Debouncing/throttling patterns

**Example**:
```javascript
button.addEventListener('click', () => console.log('1'));
button.click();  // Programmatic click
console.log('2');
// Output: 2, 1 (handler queued, sync code first)
```
**Event Loop shows**: Handler queued in macrotask queue, processed after sync code

---

#### 3. This Binding Model ★★★★☆
**Why Important**:
- Event handlers have `this` bound to event target
- Context preservation in nested handlers
- Arrow functions vs regular functions in handlers

**Event-Driven Patterns Supported**:
- Handler context (this = clicked element)
- Event delegation patterns
- Preserving outer context in handlers

**Example**:
```javascript
const widget = {
  name: 'Widget',
  setup: function() {
    button.addEventListener('click', function(event) {
      console.log(this);  // button element (implicit binding)
      console.log(this.name);  // undefined (not widget)
    });

    button.addEventListener('click', (event) => {
      console.log(this);  // widget object (lexical binding)
      console.log(this.name);  // 'Widget'
    });
  }
};
```
**This Binding shows**: Regular function gets event target, arrow function captures outer context

---

#### 4. Scope Chain Model ★★★☆☆
**Why Relevant**:
- Handlers capture registration-time scope
- Closures preserve state across events
- Handler factories with parameterized behavior

**Event-Driven Patterns Supported**:
- Handlers with closure state
- Parameterized handler creation
- State preservation across events

**Example**:
```javascript
function createCounter(initialValue) {
  let count = initialValue;  // Closure state

  button.addEventListener('click', () => {
    count++;  // Accesses closure
    display.textContent = count;
  });
}

createCounter(0);  // Handler captures count
```
**Scope Chain shows**: Handler closure captures `count`, persists across clicks

---

#### 5. Memory Model ★★★☆☆
**Why Relevant**:
- Handler references prevent garbage collection
- Memory leaks from unremoved handlers
- DOM element lifecycle vs handler lifecycle

**Event-Driven Patterns Supported**:
- Handler cleanup (removeEventListener)
- Avoiding memory leaks
- Handler reference management

**Example**:
```javascript
const handler = () => console.log('Clicked');
button.addEventListener('click', handler);

// Later: cleanup
button.removeEventListener('click', handler);  // Allows GC
```
**Memory Model shows**: Handler reference keeps button in memory until removed

---

### Secondary NMs for Event-Driven

#### Reference vs. Value Model ★★☆☆☆
- Event objects are references (mutation visible across handlers)
- Handler parameters are references to shared state

**Teaching Value**: Explains reactive UI patterns, DOM interaction fundamentals, modern framework internals (React, Vue use event-driven model underneath). Critical for web development.

**Key Distinction**:
- **Event-Driven**: User clicks → handler runs (discrete events)
- **Async**: fetch() → wait → callback (time-based, non-blocking)
- Often combined: event handler initiates async operation

---

## Object-Oriented Programming Paradigm

**Characteristics**: Objects, encapsulation, inheritance, polymorphism

### Core NMs for OOP

#### 1. Prototype Chain Model ★★★★★
**Why Essential**:
- JavaScript's inheritance mechanism
- Central to OOP understanding
- Explains object relationships

**OOP Patterns Supported**:
- Inheritance hierarchies
- Method delegation
- Dynamic type augmentation
- Polymorphism

**Example**:
```javascript
function Animal(name) { this.name = name; }
Animal.prototype.speak = function() { return '...'; };

function Dog(name) { Animal.call(this, name); }
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.speak = function() { return 'woof'; };
```
**Prototype Chain shows**: Link from Dog → Animal → Object, method resolution

---

#### 2. This Binding Model ★★★★★
**Why Essential**:
- Context is central to OOP
- Methods need object reference
- JavaScript's unique `this` semantics

**OOP Patterns Supported**:
- Method calls (implicit binding)
- Object encapsulation
- Constructor pattern
- Method borrowing

**Example**:
```javascript
const dog = {
  name: 'Buddy',
  bark: function() { return `${this.name} says woof`; }
};
dog.bark();  // 'this' bound to dog
```
**This Binding shows**: Implicit binding to `dog` at call-site

---

#### 3. Static vs. Instance Model ★★★★☆
**Why Essential**:
- Class-level vs object-level distinction
- OOP design patterns (factory, singleton)
- Separation of concerns

**OOP Patterns Supported**:
- Static factory methods
- Class utilities
- Singleton pattern
- Instance data encapsulation

**Example**:
```javascript
class User {
  static count = 0;

  constructor(name) {
    this.name = name;
    User.count++;
  }

  static fromJSON(json) {
    return new User(json.name);
  }
}
```
**Static/Instance Model shows**: `count` on class, `name` on instance, factory pattern

---

#### 4. Class Syntax Model ★★★☆☆
**Why Important**:
- Modern OOP syntax
- Desugars to prototypes
- Language design understanding

**OOP Patterns Supported**:
- Class-based inheritance
- Private fields encapsulation
- Getter/setter patterns
- Static initialization

**Example**:
```javascript
class BankAccount {
  #balance = 0;  // Private field

  deposit(amount) { this.#balance += amount; }
  get balance() { return this.#balance; }
}
```
**Class Syntax Model shows**: Desugaring to prototype, private field mechanism

---

### Secondary NMs for OOP

#### Memory Model ★★★★☆
- Object storage on heap
- Reference semantics for objects
- Shared state via references

#### Reference vs. Value Model ★★★★☆
- Objects passed by reference
- Mutation vs reassignment
- Critical for OOP patterns

---

## Functional Programming Paradigm

**Characteristics**: Functions as values, immutability, composition, higher-order functions

### Core NMs for Functional

#### 1. Scope Chain Model ★★★★★
**Why Essential**:
- Closures enable functional patterns
- Lexical scoping is fundamental
- Functions capture environment

**Functional Patterns Supported**:
- Closures for private state
- Partial application
- Currying
- Module pattern (pre-modules)
- Factory functions

**Example**:
```javascript
const makeCounter = () => {
  let count = 0;
  return {
    increment: () => ++count,
    get: () => count
  };
};
```
**Scope Chain shows**: Closure capturing `count`, lexical scope persistence

---

#### 2. Call Stack Model ★★★★☆
**Why Important**:
- Recursion instead of loops
- Function composition
- Call chains in pipelines

**Functional Patterns Supported**:
- Recursive algorithms
- Tail call optimization (when available)
- Function composition chains
- Continuation-passing style

**Example**:
```javascript
const sum = (arr) =>
  arr.length === 0 ? 0 : arr[0] + sum(arr.slice(1));
```
**Call Stack shows**: Recursive frames building, base case, unwinding with values

---

#### 3. Reference vs. Value Model ★★★★☆
**Why Important**:
- Immutability patterns
- Avoiding mutations
- Pure functions

**Functional Patterns Supported**:
- Immutable updates (copy-on-write)
- Pure functions (no side effects)
- Value-based transformations
- Persistent data structures

**Example**:
```javascript
const addItem = (cart, item) => [...cart, item];  // Copy, don't mutate
```
**Reference Model shows**: New array created, original unchanged, no shared mutation

---

#### 4. Memory Model ★★★☆☆
**Why Relevant**:
- Understanding immutability costs
- Closure memory implications
- Garbage collection for copies

**Functional Patterns Supported**:
- Value semantics
- Closure capture
- Memory trade-offs

---

### Secondary NMs for Functional

#### Operator Evaluation Model ★★☆☆☆
- Expression evaluation
- Short-circuit in guards
- Less paradigm-critical

---

## Asynchronous Programming Paradigm

**Characteristics**: Non-blocking operations, callbacks, promises, async/await

### Core NMs for Async

#### 1. Event Loop Model ★★★★★
**Why Essential**:
- Fundamental to async JavaScript
- Explains non-blocking execution
- Queue processing mechanics

**Async Patterns Supported**:
- Callbacks (macrotask queue)
- Promises (microtask queue)
- `async`/`await` (syntactic sugar)
- Event handlers
- Timer functions

**Example**:
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2
```
**Event Loop shows**: Sync code first, microtasks (promise), then macrotasks (setTimeout)

---

#### 2. Call Stack Model ★★★★☆
**Why Important**:
- Stack must empty for event loop
- Async callbacks are separate calls
- Understanding async flow

**Async Patterns Supported**:
- Callback execution timing
- Stack frames for async functions
- Error handling across async boundaries
- Async stack traces

**Example**:
```javascript
async function fetchUser() {
  const response = await fetch('/user');
  return response.json();
}
```
**Call Stack shows**: Function suspends at `await`, resumes later in new call

---

#### 3. Scope Chain Model ★★★★☆
**Why Important**:
- Closures capture context for callbacks
- Async functions access outer scope
- Variable lifetime beyond sync execution

**Async Patterns Supported**:
- Callback closures
- Event handler context
- Async function scope capture
- Memory persistence for pending operations

**Example**:
```javascript
function startTimer(duration) {
  setTimeout(() => {
    console.log(`${duration}ms elapsed`);  // Closure captures duration
  }, duration);
}
```
**Scope Chain shows**: `duration` captured in callback closure, persists for timer

---

#### 4. Memory Model ★★★☆☆
**Why Relevant**:
- Callback references
- Promise state storage
- Memory leaks from pending promises

**Async Patterns Supported**:
- Reference retention in callbacks
- Promise lifecycle
- Cleanup patterns

---

### Secondary NMs for Async

#### This Binding Model ★★★☆☆
- Lost binding in callbacks
- Arrow functions for context preservation
- Event handler `this`

---

## Multi-Paradigm JavaScript Patterns

**Real-world JavaScript mixes paradigms** - some patterns require multiple NM perspectives.

### Hybrid Pattern 1: React Hooks (Functional + Async)

**NMs Required**:
- Scope Chain (closure in hooks)
- Event Loop (state updates are async)
- Call Stack (hook call order matters)
- Memory Model (state persistence)

**Example**:
```javascript
function useCounter() {
  const [count, setCount] = useState(0);  // Closure + async update

  const increment = () => {
    setCount(c => c + 1);  // Async state update
  };

  return [count, increment];
}
```
**Multiple NMs needed**: Closure (counter), async (setCount queues update), memory (state location)

---

### Hybrid Pattern 2: OOP with Async (OOP + Async)

**NMs Required**:
- Prototype Chain (inheritance)
- This Binding (method context)
- Event Loop (async methods)
- Scope Chain (closures in methods)

**Example**:
```javascript
class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetch() {
    const response = await fetch(this.url);  // 'this' in async
    return response.json();
  }
}
```
**Multiple NMs needed**: This binding (method), event loop (async), prototype (inheritance)

---

### Hybrid Pattern 3: Functional OOP (Functional + OOP)

**NMs Required**:
- Scope Chain (closures)
- Prototype Chain (prototype delegation)
- This Binding (optional, often avoided)
- Memory Model (object references)

**Example**:
```javascript
const createCounter = (proto) => {
  let count = 0;  // Closure
  return Object.assign(Object.create(proto), {
    increment: () => ++count,
    get: () => count
  });
};
```
**Multiple NMs needed**: Closure (private count), prototype (delegation), memory (object creation)

---

## Paradigm-Based Teaching Sequences

### Sequence 1: Imperative-First (Traditional)

**Week 1-4: Imperative Foundation**
1. Memory Model
2. Call Stack Model
3. Operator Evaluation

**Week 5-8: OOP Introduction**
4. Prototype Chain
5. This Binding
6. Static vs. Instance

**Week 9-12: Functional Patterns**
7. Scope Chain (closures)
8. Reference vs. Value (immutability)

**Week 13-16: Async**
9. Event Loop

**Rationale**: Matches traditional CS curriculum, gradual complexity increase

---

### Sequence 2: Functional-First (Modern)

**Week 1-4: Functional Foundation**
1. Memory Model (values only)
2. Call Stack (recursion)
3. Scope Chain (closures)

**Week 5-8: Imperative Extensions**
4. Reference vs. Value (mutation)
5. Operator Evaluation

**Week 9-12: Async**
6. Event Loop
7. Call Stack (async)

**Week 13-16: OOP (as needed)**
8. Prototype Chain
9. This Binding
10. Class Syntax

**Rationale**: Aligns with React/functional JS trends, delays OOP complexity

---

### Sequence 3: Async-First (Web-Focused)

**Week 1-4: Async Fundamentals**
1. Call Stack (sync baseline)
2. Event Loop (callbacks, promises)
3. Memory Model (references in callbacks)

**Week 5-8: Functional Async Patterns**
4. Scope Chain (closures in callbacks)
5. Reference vs. Value (immutability)

**Week 9-12: OOP with Async**
6. Prototype Chain
7. This Binding
8. Class Syntax (async methods)

**Week 13-16: Advanced**
9. Static vs. Instance
10. Operator Evaluation
11. Type Coercion

**Rationale**: Teaches async early (immediate web relevance), adds OOP later

---

## NM Emphasis by Paradigm

### Imperative (Procedural) JavaScript
**Essential**: Memory, Call Stack, Reference vs. Value
**Important**: Operator Evaluation, Type Coercion
**Optional**: Others (as needed for patterns)

### Imperative (Control-Flow Only) JavaScript
**Essential**: Memory, Operator Evaluation
**Important**: Type Coercion
**Not Needed**: Call Stack (no functions), Scope Chain (no nesting)

### Declarative (Method Chaining) JavaScript
**Essential**: Call Stack (chains), Scope Chain (closures), Reference vs. Value (immutability)
**Important**: Memory (intermediate values), This Binding (context)
**Optional**: Others (less relevant)

### Event-Driven JavaScript
**Essential**: Call Stack (handlers), Event Loop (queuing), This Binding (context), Scope Chain (closures)
**Important**: Memory (leaks from handlers)
**Optional**: Reference vs. Value

### Object-Oriented JavaScript
**Essential**: Prototype Chain, This Binding, Memory, Reference vs. Value
**Important**: Static vs. Instance, Class Syntax, Call Stack
**Optional**: Others (less OOP-specific)

### Functional JavaScript
**Essential**: Scope Chain, Call Stack, Reference vs. Value
**Important**: Memory (closures), Operator Evaluation
**Optional**: Others (OOP NMs rarely needed)

### Asynchronous JavaScript
**Essential**: Event Loop, Call Stack, Scope Chain
**Important**: Memory (leaks), Reference vs. Value (state)
**Optional**: This Binding (callback context)

---

## Paradigm Mismatch Errors

**Common mistakes from applying wrong paradigm mental model:**

### Imperative Mindset in Functional Code

**Error**: Mutating instead of copying
```javascript
// Imperative approach (wrong in functional context)
const addItem = (cart, item) => {
  cart.push(item);  // Mutation
  return cart;
};

// Functional approach (correct)
const addItem = (cart, item) => [...cart, item];  // Copy
```
**NM Help**: Reference vs. Value Model shows mutation vs copy distinction

---

### Functional Mindset in OOP Code

**Error**: Avoiding `this`, making OOP awkward
```javascript
// Functional approach (awkward for OOP)
class Dog {
  bark(dog) {  // Passing 'dog' explicitly
    return `${dog.name} barks`;
  }
}

// OOP approach (correct)
class Dog {
  bark() {  // Use 'this'
    return `${this.name} barks`;
  }
}
```
**NM Help**: This Binding Model explains OOP context patterns

---

### Sync Mindset in Async Code

**Error**: Expecting immediate execution
```javascript
// Sync mindset (wrong)
let data = null;
fetch('/api').then(response => data = response.json());
console.log(data);  // null (expects immediate)

// Async mindset (correct)
fetch('/api')
  .then(response => response.json())
  .then(data => console.log(data));
```
**NM Help**: Event Loop Model shows async timing

---

### OOP Mindset in Functional Code

**Error**: Overusing `this` and classes
```javascript
// OOP approach (overengineered for functional context)
class Counter {
  constructor() { this.count = 0; }
  increment() { this.count++; }
}

// Functional approach (simpler)
const makeCounter = () => {
  let count = 0;
  return () => ++count;
};
```
**NM Help**: Scope Chain Model shows closure as OOP alternative

---

## Paradigm-Agnostic NMs

**Some NMs are fundamental across all paradigms:**

### Memory Model
- Imperative: Mutable state
- OOP: Object storage
- Functional: Value semantics
- Async: Reference persistence

### Call Stack
- Imperative: Sequential execution
- OOP: Method calls
- Functional: Recursion
- Async: Callback execution

### Reference vs. Value
- Imperative: Mutation semantics
- OOP: Shared object state
- Functional: Immutability patterns
- Async: Closure captures

**Teaching Implication**: These NMs should be taught early, with paradigm-specific applications layered later.

---

## Summary: Paradigm Coverage Matrix

| Notional Machine | Imp(Proc) | Imp(Ctrl) | Decl | Event | OOP | Func | Async |
|------------------|-----------|-----------|------|-------|-----|------|-------|
| **Call Stack** | ★★★★★ | ★☆☆☆☆ | ★★★★☆ | ★★★★★ | ★★★☆☆ | ★★★★☆ | ★★★★☆ |
| **Memory Model** | ★★★★★ | ★★★★★ | ★★★☆☆ | ★★★☆☆ | ★★★★☆ | ★★★☆☆ | ★★★☆☆ |
| **Event Loop** | ★☆☆☆☆ | ★☆☆☆☆ | ★☆☆☆☆ | ★★★★☆ | ★☆☆☆☆ | ★☆☆☆☆ | ★★★★★ |
| **Scope Chain** | ★★☆☆☆ | ★☆☆☆☆ | ★★★★☆ | ★★★☆☆ | ★★☆☆☆ | ★★★★★ | ★★★★☆ |
| **Prototype Chain** | ★☆☆☆☆ | ★☆☆☆☆ | ★☆☆☆☆ | ★☆☆☆☆ | ★★★★★ | ★☆☆☆☆ | ★☆☆☆☆ |
| **This Binding** | ★☆☆☆☆ | ★☆☆☆☆ | ★★☆☆☆ | ★★★★☆ | ★★★★★ | ★☆☆☆☆ | ★★★☆☆ |
| **Static vs. Instance** | ★☆☆☆☆ | ★☆☆☆☆ | ★☆☆☆☆ | ★☆☆☆☆ | ★★★★☆ | ★☆☆☆☆ | ★☆☆☆☆ |
| **Class Syntax** | ★☆☆☆☆ | ★☆☆☆☆ | ★☆☆☆☆ | ★☆☆☆☆ | ★★★☆☆ | ★☆☆☆☆ | ★☆☆☆☆ |
| **Operator Evaluation** | ★★★☆☆ | ★★★★☆ | ★★☆☆☆ | ★★☆☆☆ | ★★☆☆☆ | ★★☆☆☆ | ★★☆☆☆ |
| **Type Coercion** | ★★★☆☆ | ★★★☆☆ | ★★☆☆☆ | ★★☆☆☆ | ★★☆☆☆ | ★★☆☆☆ | ★★☆☆☆ |
| **Reference vs. Value** | ★★★★☆ | ★★☆☆☆ | ★★★☆☆ | ★★☆☆☆ | ★★★★☆ | ★★★★☆ | ★★★☆☆ |

**Columns**:
- **Imp(Proc)**: Imperative with procedures/functions
- **Imp(Ctrl)**: Imperative control-flow only (no functions)
- **Decl**: Declarative method chaining
- **Event**: Event-driven (DOM, interactions)
- **OOP**: Object-oriented
- **Func**: Functional
- **Async**: Asynchronous

**Legend**: ★★★★★ Essential | ★★★★☆ Very Important | ★★★☆☆ Important | ★★☆☆☆ Somewhat Relevant | ★☆☆☆☆ Rarely Needed

---

## Tool Implications

**Educational tools should:**

1. **Support paradigm selection**: Let educators choose paradigm focus
2. **Customize NM visibility**: Show only relevant NMs for chosen paradigm
3. **Detect paradigm from code**: Highlight appropriate NMs automatically
4. **Support hybrid patterns**: Allow multiple NM perspectives simultaneously
5. **Sequence appropriately**: Follow paradigm-appropriate teaching sequences

**Example**: React course (functional + async) should emphasize Scope Chain, Event Loop, Call Stack, and Memory Model - not Prototype Chain or This Binding (unless contrasting).
