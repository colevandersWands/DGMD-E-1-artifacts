# JavaScript Notional Machines

Detailed documentation of **12 pedagogical models** for teaching JavaScript execution, from parsing to runtime.

**Pedagogical ordering note**: Expression evaluation (operators, coercion, reference/value) is foundational because function arguments must be evaluated as expressions first, and return values can be directly operated on without variable capture.

## Foundation Layer (Parse + Basic Runtime + Expression Evaluation)

### [1. Creation/Execution Phase Model](./creation-execution-phase-model.md)
Parse-time vs run-time distinction, hoisting behavior, temporal dead zone (TDZ), module loading, error types.

**Key learning**: Why `var x` is hoisted but `let y` has TDZ; functions available before definition.

---

### [2. Memory Model](./memory-model.md)
Variable lifecycle, storage locations (stack vs heap), reference relationships, garbage collection.

**Key learning**: Where values live and how long they persist.

---

### [3. Operator Evaluation Model](./operator-evaluation-model.md)
Expression evaluation order, operator precedence, short-circuiting, side effects.

**Key learning**: Why `2 + 3 * 4` equals `14`, not `20`.

---

### [4. Type Coercion Model](./type-coercion-model.md)
Implicit type conversion, comparison behavior, truthiness, `ToPrimitive`/`ToNumber`/`ToString`.

**Key learning**: Why `'5' + 3` is `'53'` but `'5' - 3` is `2`.

---

### [5. Reference vs. Value Model](./reference-vs-value-model.md)
Assignment semantics, mutation vs reassignment, parameter passing, copying strategies.

**Key learning**: Primitives passed by value, objects passed by reference.

---

## Execution Layer (Control Flow & Scoping)

### [6. Call Stack Model](./call-stack-model.md)
Function execution order, activation records, return flow, recursion mechanics.

**Key learning**: How functions execute sequentially in LIFO order, not simultaneously.

---

### [7. Scope Chain Model](./scope-chain-model.md)
Variable resolution, lexical scoping, closure creation, block vs function scopes.

**Key learning**: How inner functions access outer variables and why closures work.

---

### [8. Event Loop Model](./event-loop-model.md)
Asynchronous execution, callback queues (micro vs macro tasks), non-blocking I/O.

**Key learning**: Why `setTimeout(fn, 0)` doesn't run immediately.

---

## OOP Layer

### [9. Prototype Chain Model](./prototype-chain-model.md)
Object inheritance, property lookup, prototype relationships, constructor functions.

**Key learning**: Objects link to prototypes; properties aren't copied.

---

### [10. This Binding Model](./this-binding-model.md)
`this` as context-dependent free variable, binding rules (implicit, explicit, `new`, arrow), execution context.

**Key learning**: `this` determined at call time, not definition time (except arrows).

---

### [11. Static vs. Instance Model](./static-vs-instance-model.md)
Class-level vs object-level properties/methods, `this` binding contexts, factory patterns.

**Key learning**: Static members belong to the class, instance members belong to objects.

---

### [12. Class Syntax Model](./class-syntax-model.md)
Class syntax as syntactic sugar, unique class features (private fields), class vs prototype semantics.

**Key learning**: Classes are functions with stricter rules and new capabilities.

---

## Categorization by Complexity

**Beginner** (concrete, immediate feedback):
- Memory Model (variables have locations)
- Call Stack Model (functions stack up)
- Operator Evaluation Model (precedence rules)

**Intermediate** (requires multiple concepts):
- Creation/Execution Phase (hoisting, TDZ)
- Reference vs. Value Model (copy vs share)
- Scope Chain Model (nested scopes, closures)
- Type Coercion Model (implicit conversions)
- Prototype Chain Model (delegation)
- This Binding Model (dynamic context)

**Advanced** (abstract, JavaScript-specific threshold concepts):
- Event Loop Model (async execution)
- Static vs. Instance Model (OOP patterns)
- Class Syntax Model (syntactic sugar)

## Categorization by Paradigm

**Imperative (Procedural)**:
- Creation/Execution Phase (hoisting)
- Call Stack Model
- Memory Model
- Operator Evaluation Model

**Imperative (Control-Flow Only)**:
- Memory Model (primary abstraction)
- Operator Evaluation Model (expression-heavy)
- Type Coercion Model (truthy/falsy)

**Declarative (Method Chaining)**:
- Call Stack Model (chains)
- Scope Chain Model (closures)
- Reference vs. Value Model (immutability)

**Event-Driven**:
- Call Stack Model (handlers)
- Event Loop Model (queuing)
- This Binding Model (context)
- Scope Chain Model (closures)

**Object-Oriented**:
- Prototype Chain Model
- This Binding Model
- Static vs. Instance Model
- Class Syntax Model
- Reference vs. Value Model

**Functional**:
- Scope Chain Model (closures essential)
- Call Stack Model (recursion)
- Reference vs. Value Model (immutability)

**Asynchronous**:
- Event Loop Model (essential)
- Call Stack Model (prerequisite)
- Scope Chain Model (closure capture)

## Categorization by Granularity

**Micro-level** (sub-statement, expression nodes):
- Operator Evaluation Model
- Type Coercion Model

**Meso-level** (function/scope level):
- Creation/Execution Phase (per-scope setup)
- Call Stack Model
- Memory Model (per-variable)
- Scope Chain Model
- This Binding Model (per-call)
- Reference vs. Value Model (per-assignment)
- Prototype Chain Model (per-access)
- Static vs. Instance Model (class vs object)
- Class Syntax Model (class definition)

**Macro-level** (program-wide):
- Event Loop Model (entire program coordination)
- Memory Model (program-wide heap/GC)

## Common Student Misconceptions Addressed

| Misconception | Addressed by Model |
|---------------|-------------------|
| "Hoisting moves code to the top" | Creation/Execution Phase |
| "`let`/`const` are not hoisted" | Creation/Execution Phase |
| "JavaScript runs code twice" | Creation/Execution Phase |
| "Functions run in definition order" | Call Stack |
| "Variables contain objects" | Memory, Reference vs. Value |
| "`setTimeout(fn, 0)` runs immediately" | Event Loop |
| "Async code runs in parallel" | Event Loop |
| "Inner functions can't access outer vars" | Scope Chain |
| "Closures capture values (not references)" | Scope Chain |
| "`var` and `let` work the same" | Scope Chain (+ Creation/Execution) |
| "Objects copy from prototypes" | Prototype Chain |
| "`this` refers to the function itself" | This Binding |
| "`this` is lexical scope" | This Binding |
| "Static methods work on instances" | Static vs. Instance |
| "Classes are a new type" | Class Syntax |
| "Expressions evaluate left-to-right" | Operator Evaluation |
| "Type conversions are random" | Type Coercion |
| "`==` and `===` are almost the same" | Type Coercion |
| "Assignment copies objects" | Reference vs. Value |
| "Everything is passed by reference/value" | Reference vs. Value |

## Research Validation Status

**🔬 Directly validated in education research:**
- Call Stack Model (Guo 2013, Ben-Ari 2011)
- Memory Model (Guo 2013, Ben-Ari 2011)

**📐 Extrapolated from established NM principles to JavaScript:**
- Creation/Execution Phase Model (parse vs runtime, no direct NM research)
- Event Loop Model (async execution, no direct NM research)
- Scope Chain Model (closures widely taught, not studied as NM)
- Prototype Chain Model (OOP patterns, not studied as NM)
- This Binding Model (dynamic binding, not studied as NM)
- Operator Evaluation Model (precedence, foundational CS concept)
- Type Coercion Model (JS-specific, no academic validation)
- Reference vs. Value Model (parameter passing, established concept)
- Static vs. Instance Model (OOP patterns, not studied as NM)
- Class Syntax Model (JS-specific syntax, no academic validation)

## Next Steps

These notional machines will be used in Phase 4-5 to specify:
- Use cases for educational tools
- Required trace data and event types
- Configuration granularity options
- Implementation patterns for tool developers
