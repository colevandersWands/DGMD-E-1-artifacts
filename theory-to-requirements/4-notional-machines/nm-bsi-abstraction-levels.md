# Notional Machines → BSI Abstraction Levels

**Purpose**: Map each notional machine to Behavior-Strategy-Implementation (BSI) abstraction levels, showing progression from "what code does" to "how it works" to "implementation details."

**BSI Framework** (Soloway & Ehrlich 1984, adapted):
- **Behavior**: Observable external behavior (what the code accomplishes)
- **Strategy**: Algorithmic approach (how the goal is achieved)
- **Implementation**: Code-level details (specific language constructs used)

---

## Call Stack Model → BSI Levels

### Behavior Level
**What the code accomplishes:**
- Functions execute to completion before returning
- Results flow back to callers
- Complex tasks decomposed into subtasks

**Student understanding at this level:**
- "This function calculates the factorial"
- "The program calls helper functions"
- "Functions return values to their callers"

### Strategy Level
**How the goal is achieved:**
- LIFO (Last-In-First-Out) execution order
- Stack frames manage function state
- Recursion uses self-reference for repetition
- Depth-first execution through call tree

**Student understanding at this level:**
- "Recursive calls build up the stack, then unwind"
- "The most recently called function executes first"
- "Each function maintains its own local state"

### Implementation Level
**Specific language constructs:**
- `function` keyword, arrow functions, methods
- `return` statement mechanics
- Parameter passing mechanisms
- Stack memory allocation

**Student understanding at this level:**
- "Arrow functions don't have their own `this`"
- "Parameters are copied into the stack frame"
- "Stack overflow occurs at ~10,000 frames in Chrome"

**NM Support for Progression:**
- Behavior: Show function accomplishing task
- Strategy: Reveal LIFO ordering, frame relationships
- Implementation: Display exact stack frame contents

---

## Memory Model → BSI Levels

### Behavior Level
**What the code accomplishes:**
- Variables store data
- Objects group related data
- Data persists and changes over time

**Student understanding at this level:**
- "This variable holds the user's name"
- "The array contains the shopping cart items"
- "Variables can be updated"

### Strategy Level
**How the goal is achieved:**
- Stack for primitives and references
- Heap for objects and arrays
- Reference-based sharing
- Garbage collection for cleanup

**Student understanding at this level:**
- "Multiple variables can point to the same object"
- "When no references remain, memory is freed"
- "Primitives are copied, objects are shared"

### Implementation Level
**Specific language constructs:**
- `let`, `const`, `var` scoping differences
- Object literal `{}` creates heap allocation
- Assignment operator copies value or reference
- WeakMap/WeakRef for advanced memory management

**Student understanding at this level:**
- "`const` prevents reassignment but not mutation"
- "Object properties stored as key-value pairs in heap"
- "V8 uses generational garbage collection"

**NM Support for Progression:**
- Behavior: Show variable holding value
- Strategy: Reveal stack/heap distinction, references
- Implementation: Display exact memory addresses, GC timing

---

## Event Loop Model → BSI Levels

### Behavior Level
**What the code accomplishes:**
- Async operations don't block
- Multiple tasks can be in progress
- Callbacks execute when operations complete

**Student understanding at this level:**
- "The fetch happens in the background"
- "setTimeout delays execution"
- "Promises handle async results"

### Strategy Level
**How the goal is achieved:**
- Event loop processes queues
- Call stack must empty before next task
- Microtasks (promises) prioritized over macrotasks
- Single-threaded concurrency via task switching

**Student understanding at this level:**
- "Promises run before setTimeout even with same delay"
- "The event loop checks: stack empty? → process microtasks → take macrotask"
- "Async/await is syntactic sugar over promises"

### Implementation Level
**Specific language constructs:**
- `setTimeout`, `setInterval` queue macrotasks
- Promise `.then()` queues microtasks
- `async`/`await` desugars to promise chains
- `process.nextTick` in Node.js (special microtask)

**Student understanding at this level:**
- "`await` suspends async function execution"
- "Promise microtask queue processed completely before next macrotask"
- "Node.js event loop has multiple phases"

**NM Support for Progression:**
- Behavior: Show async operations completing
- Strategy: Reveal queue processing order
- Implementation: Display exact queue contents, event loop phases

---

## Scope Chain Model → BSI Levels

### Behavior Level
**What the code accomplishes:**
- Inner functions access outer variables
- Functions remember their creation environment
- Private data encapsulation

**Student understanding at this level:**
- "The counter function remembers the count"
- "Inner functions can use outer variables"
- "Closures create private data"

### Strategy Level
**How the goal is achieved:**
- Lexical scoping (scope determined at write-time)
- Scope chain walking for variable resolution
- Closure captures outer scope reference
- Nested scope hierarchy

**Student understanding at this level:**
- "Variable lookup walks from inner to outer scope"
- "Closures capture references, not values"
- "Each function call creates a new scope"

### Implementation Level
**Specific language constructs:**
- `var` (function scope) vs `let`/`const` (block scope)
- Temporal Dead Zone for `let`/`const`
- `[[Environment]]` internal slot captures scope
- Hoisting behavior

**Student understanding at this level:**
- "`let` in loop creates new binding per iteration"
- "TDZ causes ReferenceError before declaration"
- "Arrow functions inherit lexical scope, no own scope"

**NM Support for Progression:**
- Behavior: Show inner accessing outer variable
- Strategy: Reveal scope chain structure and walking
- Implementation: Display scope objects, TDZ, hoisting

---

## Prototype Chain Model → BSI Levels

### Behavior Level
**What the code accomplishes:**
- Objects inherit properties
- Methods shared across instances
- Object hierarchies for reusability

**Student understanding at this level:**
- "All arrays have `.map()` method"
- "Dog inherits from Animal"
- "Objects can use methods from their parent"

### Strategy Level
**How the goal is achieved:**
- Prototype chain for property delegation
- Chain walking until property found or null
- Prototype links, not copies
- Dynamic prototype modification affects instances

**Student understanding at this level:**
- "Property lookup walks up the chain"
- "Changing prototype affects all linked objects"
- "Own properties shadow prototype properties"

### Implementation Level
**Specific language constructs:**
- `Object.create()` sets `[[Prototype]]`
- `__proto__` accessor (legacy)
- Constructor `.prototype` property
- `Object.getPrototypeOf()` / `Object.setPrototypeOf()`

**Student understanding at this level:**
- "`new` sets instance `[[Prototype]]` to constructor.prototype"
- "`Object.prototype` is the root (prototype is null)"
- "Prototype pollution security vulnerability"

**NM Support for Progression:**
- Behavior: Show inherited method usage
- Strategy: Reveal chain walking and delegation
- Implementation: Display `[[Prototype]]` links, prototype objects

---

## Static vs. Instance Model → BSI Levels

### Behavior Level
**What the code accomplishes:**
- Class-level data and methods
- Instance-specific data and methods
- Factory patterns and singletons

**Student understanding at this level:**
- "Static methods create instances"
- "Each instance has its own data"
- "Utility methods are static"

### Strategy Level
**How the goal is achieved:**
- Static members on constructor function
- Instance members on prototype or own properties
- Static methods don't receive instance context
- Separation of concerns: class-level vs object-level

**Student understanding at this level:**
- "Static members shared by all instances"
- "Instance methods access instance data via `this`"
- "Factory methods are static because they create instances"

### Implementation Level
**Specific language constructs:**
- `static` keyword in classes
- Constructor function properties (pre-class)
- Instance properties in constructor
- Prototype methods vs own methods

**Student understanding at this level:**
- "Static methods are properties on the constructor"
- "Instance methods typically on prototype for memory efficiency"
- "Own properties created in constructor, prototype properties shared"

**NM Support for Progression:**
- Behavior: Show class vs instance usage
- Strategy: Reveal memory layout and sharing
- Implementation: Display constructor properties vs prototype

---

## Class Syntax Model → BSI Levels

### Behavior Level
**What the code accomplishes:**
- Object-oriented programming
- Inheritance hierarchies
- Encapsulation with private fields

**Student understanding at this level:**
- "Classes create objects with methods"
- "Subclasses extend parent classes"
- "Private fields hide implementation"

### Strategy Level
**How the goal is achieved:**
- Syntactic sugar over prototypes
- Private fields use WeakMap-like mechanism
- Classes enforce `new` requirement
- Stricter semantics than functions

**Student understanding at this level:**
- "Classes desugar to constructor + prototype"
- "Private fields truly inaccessible outside class"
- "Classes in TDZ, not hoisted"

### Implementation Level
**Specific language constructs:**
- `class` keyword and body syntax
- `#privateField` syntax
- `extends` and `super` keywords
- Static initialization blocks

**Student understanding at this level:**
- "`class` creates function + sets prototype"
- "Private fields implemented with internal slots"
- "`super` refers to parent prototype"

**NM Support for Progression:**
- Behavior: Show class usage patterns
- Strategy: Reveal desugaring to prototypes
- Implementation: Display transpiled code, private field mechanism

---

## This Binding Model → BSI Levels

### Behavior Level
**What the code accomplishes:**
- Methods access object data
- Context-dependent function behavior
- Event handlers reference DOM elements

**Student understanding at this level:**
- "Methods use `this` to access object properties"
- "`this` gives the function context"
- "Event handlers have `this` as the element"

### Strategy Level
**How the goal is achieved:**
- Dynamic binding based on call-site
- Four binding rules with precedence
- Arrow functions capture lexical context
- Explicit binding via `bind`/`call`/`apply`

**Student understanding at this level:**
- "`this` determined by how function is called"
- "Method call → implicit binding"
- "Extracted method → lost binding"
- "Arrow functions ignore call-site"

### Implementation Level
**Specific language constructs:**
- Implicit binding: `obj.method()`
- Explicit binding: `.bind()`, `.call()`, `.apply()`
- `new` binding: constructor calls
- Arrow function lexical `this`
- Default binding in strict vs non-strict mode

**Student understanding at this level:**
- "`.bind()` returns new function with fixed `this`"
- "Arrow functions store `this` at creation time"
- "Strict mode default `this` is undefined, not global"

**NM Support for Progression:**
- Behavior: Show method accessing object
- Strategy: Reveal call-site determining binding
- Implementation: Display which binding rule applied, precedence

---

## Operator Evaluation Model → BSI Levels

### Behavior Level
**What the code accomplishes:**
- Mathematical calculations
- Logical operations
- Comparisons and conditionals

**Student understanding at this level:**
- "This calculates the total"
- "The condition checks if valid"
- "Short-circuit operators optimize"

### Strategy Level
**How the goal is achieved:**
- Precedence determines evaluation order
- Associativity for same-precedence operators
- Short-circuit evaluation skips unnecessary work
- Expression tree evaluation bottom-up

**Student understanding at this level:**
- "Multiply before add due to precedence"
- "Right-associative: `a = b = c` means `a = (b = c)`"
- "`&&` stops evaluating if left is false"

### Implementation Level
**Specific language constructs:**
- Operator symbols and precedence table
- `&&`, `||`, `??` short-circuit behavior
- Postfix vs prefix increment
- Comma operator

**Student understanding at this level:**
- "Precedence 14 vs 13 determines order"
- "Postfix `x++` returns old value, then increments"
- "Comma operator evaluates left, returns right"

**NM Support for Progression:**
- Behavior: Show expression result
- Strategy: Reveal evaluation order via tree
- Implementation: Display precedence levels, intermediate values

---

## Type Coercion Model → BSI Levels

### Behavior Level
**What the code accomplishes:**
- Flexible comparisons
- String concatenation
- Numeric operations on strings

**Student understanding at this level:**
- "JavaScript converts types automatically"
- "`==` is more lenient than `===`"
- "Can add strings and numbers"

### Strategy Level
**How the goal is achieved:**
- ToPrimitive, ToNumber, ToString algorithms
- Different operators trigger different coercions
- `==` uses coercion rules, `===` doesn't
- Truthy/falsy for boolean context

**Student understanding at this level:**
- "String + anything → string concatenation"
- "Numeric operators convert to number"
- "`==` coerces both sides, then compares"
- "6 falsy values, everything else truthy"

### Implementation Level
**Specific language constructs:**
- `+` operator overloading (string vs numeric)
- `==` coercion algorithm steps
- `valueOf` and `toString` methods for objects
- Explicit conversions: `Number()`, `String()`, `Boolean()`

**Student understanding at this level:**
- "ToPrimitive calls `valueOf` then `toString`"
- "`null == undefined` by special rule"
- "Boolean coerced to number: true=1, false=0"

**NM Support for Progression:**
- Behavior: Show flexible type usage
- Strategy: Reveal coercion algorithms
- Implementation: Display conversion steps, intermediate types

---

## Reference vs. Value Model → BSI Levels

### Behavior Level
**What the code accomplishes:**
- Variables hold data
- Function parameters receive values
- Data can be copied or shared

**Student understanding at this level:**
- "Changing one variable affects another sometimes"
- "Function can modify objects passed to it"
- "Arrays and objects behave differently from numbers"

### Strategy Level
**How the goal is achieved:**
- Primitives pass by value (copy)
- Objects pass by reference (share)
- Mutation changes shared data
- Reassignment breaks sharing

**Student understanding at this level:**
- "Assignment copies primitives, references objects"
- "Mutation affects all references"
- "Reassignment only affects one variable"
- "Shallow copy copies references, not nested objects"

### Implementation Level
**Specific language constructs:**
- Primitive types: number, string, boolean, null, undefined, symbol, bigint
- Reference types: object, array, function
- Spread operator for shallow copy
- `structuredClone` for deep copy
- Object.assign vs spread

**Student understanding at this level:**
- "Spread creates new array/object, but copies references inside"
- "`const` prevents reassignment, not mutation"
- "`structuredClone` recursive copy, but can't clone functions"

**NM Support for Progression:**
- Behavior: Show shared mutations
- Strategy: Reveal reference vs value semantics
- Implementation: Display memory addresses, copy mechanisms

---

## Summary: NM Primary Focus by BSI Level

### Primarily Behavior-Focused NMs
*These NMs help students understand what code accomplishes:*
- Call Stack Model (functions accomplish tasks)
- Event Loop Model (async operations complete)

### Primarily Strategy-Focused NMs
*These NMs help students understand algorithmic approaches:*
- Memory Model (storage and sharing strategy)
- Scope Chain Model (variable resolution strategy)
- Prototype Chain Model (inheritance strategy)
- Operator Evaluation Model (evaluation order strategy)
- Type Coercion Model (type conversion strategy)
- Reference vs. Value Model (data sharing strategy)

### Primarily Implementation-Focused NMs
*These NMs help students understand language-specific details:*
- Static vs. Instance Model (class vs instance mechanics)
- Class Syntax Model (syntactic sugar details)
- This Binding Model (context binding mechanics)

**Note**: All NMs span all three levels - this categorization shows primary educational focus.

---

## Using NMs to Support BSI Progression

**Teaching Strategy**:

1. **Start at Behavior**: Show what the code does using NM
2. **Progress to Strategy**: Reveal how it achieves the goal
3. **Detail Implementation**: Explore language-specific mechanics

**Example: Closure Teaching Progression**

**Behavior Level** (Week 1):
```javascript
function makeCounter() {
  let count = 0;
  return function() { return ++count; };
}
const counter = makeCounter();
counter(); // 1
counter(); // 2
```
**Use Scope Chain NM to show**: "Inner function remembers outer variable"

**Strategy Level** (Week 2):
```javascript
// Same code, deeper analysis
```
**Use Scope Chain NM to show**: "Closure captures reference to outer scope, scope persists after return"

**Implementation Level** (Week 3):
```javascript
// Same code, language details
```
**Use Scope Chain NM to show**: "Function object has `[[Environment]]` slot pointing to lexical scope"

**Assessment at Each Level**:
- Behavior: "What does this code output?"
- Strategy: "Why does the counter persist?"
- Implementation: "How does JavaScript maintain the closure?"

---

## Detecting Student Abstraction Level

**Behavior-Level Indicators**:
- Can predict output but not explain why
- Describes what code does, not how
- Uses analogies and everyday language
- Focuses on use cases and examples

**Strategy-Level Indicators**:
- Explains algorithmic approach
- Compares different strategies for same goal
- Understands trade-offs
- Can adapt pattern to new context

**Implementation-Level Indicators**:
- References language specification
- Discusses performance implications
- Knows edge cases and gotchas
- Can explain desugaring or transpilation

**Using NMs for Detection**:
- Ask student to explain NM visualization
- Behavior-level: describes what they see
- Strategy-level: explains relationships and patterns
- Implementation-level: references language mechanics
