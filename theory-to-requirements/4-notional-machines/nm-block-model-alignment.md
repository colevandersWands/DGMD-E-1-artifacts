# Notional Machines → Block Model Alignment

**Purpose**: Map each notional machine to Block Model comprehension levels, showing how NMs support diagnosis of syntax, semantic, and strategic understanding.

**Block Model Levels** (Pennington 1987):
1. **Text Surface** - Syntactic understanding (keywords, operators, syntax rules)
2. **Program Execution** - Semantic understanding (runtime behavior, concept relationships)
3. **Function/Purpose** - Strategic understanding (problem-solving, design choices)

---

## Call Stack Model → Block Model

### Text Surface (Level 1)
**What syntax understanding NM provides:**
- Function declaration syntax (`function` vs arrow vs method)
- Function call syntax (parentheses, arguments)
- Return statement syntax

**Detectable errors:**
- Missing parentheses in function call
- Incorrect number of arguments
- Return outside function

### Program Execution (Level 2)
**How NM shows runtime behavior:**
- Functions execute in LIFO order, not definition order
- Each call creates new stack frame with local variables
- Return removes frame and resumes caller
- Recursion adds multiple frames for same function

**Detectable errors:**
- Expecting parallel execution (all functions run at once)
- Confusion about return flow in nested calls
- Stack overflow from missing base case in recursion

### Function/Purpose (Level 3)
**How NM connects to problem-solving:**
- Choose iteration vs recursion based on problem nature
- Consider stack depth limits for recursive solutions
- Understand performance implications of call depth
- Design function composition patterns

**Detectable errors:**
- Using recursion when iteration more appropriate
- Infinite recursion without considering limits
- Poor function decomposition leading to deep nesting

---

## Memory Model → Block Model

### Text Surface (Level 1)
**What syntax understanding NM provides:**
- Variable declaration keywords (`let`, `const`, `var`)
- Object literal syntax
- Array literal syntax
- Assignment operator

**Detectable errors:**
- Using undeclared variables
- Reassigning `const` variables
- Incorrect object/array syntax

### Program Execution (Level 2)
**How NM shows runtime behavior:**
- Variables stored in stack (primitives) or heap (objects)
- References vs values in assignment
- Multiple variables can reference same object
- Garbage collection when no references remain

**Detectable errors:**
- Expecting object copy on assignment
- Not understanding shared references cause shared mutations
- Memory leaks from unintended reference retention

### Function/Purpose (Level 3)
**How NM connects to problem-solving:**
- Choose data structures considering memory layout
- Decide when to copy vs share data
- Manage memory for performance (avoid unnecessary copies)
- Design for garbage collector efficiency

**Detectable errors:**
- Inappropriate deep copying (performance)
- Unintentional sharing (bugs)
- Poor data structure choice for memory efficiency

---

## Event Loop Model → Block Model

### Text Surface (Level 1)
**What syntax understanding NM provides:**
- `async`/`await` keywords
- `Promise` constructor and methods
- `setTimeout`/`setInterval` syntax
- `.then()` and `.catch()` chaining

**Detectable errors:**
- Missing `await` before promise
- Incorrect promise chaining syntax
- Wrong setTimeout parameter order

### Program Execution (Level 2)
**How NM shows runtime behavior:**
- Async code doesn't run immediately
- Microtasks (promises) run before macrotasks (setTimeout)
- Call stack must empty before event loop processes tasks
- Callback order determined by queue priority, not code order

**Detectable errors:**
- Expecting `setTimeout(fn, 0)` to run immediately
- Not understanding promise resolution timing
- Confusion about async execution order
- Blocking event loop with long synchronous operations

### Function/Purpose (Level 3)
**How NM connects to problem-solving:**
- Choose appropriate async pattern (callbacks vs promises vs async/await)
- Design non-blocking architectures
- Handle concurrent operations appropriately
- Consider event loop phases for Node.js optimization

**Detectable errors:**
- Using sync code in async context (blocking)
- Poor error handling across async boundaries
- Race conditions from misunderstanding execution order
- Inappropriate async pattern for use case

---

## Scope Chain Model → Block Model

### Text Surface (Level 1)
**What syntax understanding NM provides:**
- Block scope delimiters (`{}`)
- Function scope rules
- `var` vs `let`/`const` scoping differences
- Closure syntax (functions returning functions)

**Detectable errors:**
- Variable declared in wrong scope
- Missing braces creating unintended scope
- Using `var` when block scope needed

### Program Execution (Level 2)
**How NM shows runtime behavior:**
- Variable resolution walks up scope chain
- Inner functions access outer variables (closures)
- Scopes created at function call, destroyed at exit
- Closures capture outer scope, persist after outer returns

**Detectable errors:**
- Expecting inner functions can't access outer
- Not understanding closure variable capture
- `var` in loop creating unintended sharing
- TDZ (Temporal Dead Zone) with `let`/`const`

### Function/Purpose (Level 3)
**How NM connects to problem-solving:**
- Use closures for private data (module pattern)
- Choose appropriate scope granularity
- Design for intentional vs accidental captures
- Manage closure memory implications

**Detectable errors:**
- Unnecessary global variables (scope pollution)
- Unintended closure captures (memory leaks)
- Poor module organization
- Exposing private data through scope mistakes

---

## Prototype Chain Model → Block Model

### Text Surface (Level 1)
**What syntax understanding NM provides:**
- `Object.create()` syntax
- Constructor function syntax
- `class` syntax (syntactic sugar)
- `extends` keyword

**Detectable errors:**
- Missing `new` keyword with constructor
- Incorrect `class` syntax
- Wrong `extends` usage

### Program Execution (Level 2)
**How NM shows runtime behavior:**
- Property lookup walks up prototype chain
- Objects link to prototypes, don't copy
- Prototype changes affect all instances immediately
- Shadowing vs delegation

**Detectable errors:**
- Expecting prototype copy instead of link
- Surprised by prototype mutation affecting instances
- Not understanding property lookup order
- Confusion about `hasOwnProperty` vs inherited

### Function/Purpose (Level 3)
**How NM connects to problem-solving:**
- Choose inheritance depth appropriately
- Decide composition vs inheritance
- Design prototype hierarchies for performance
- Consider prototype pollution security

**Detectable errors:**
- Overly deep inheritance chains
- Inappropriate inheritance (prefer composition)
- Prototype pollution vulnerabilities
- Performance issues from property lookup depth

---

## Static vs. Instance Model → Block Model

### Text Surface (Level 1)
**What syntax understanding NM provides:**
- `static` keyword in classes
- Instance property declarations
- Constructor syntax
- Method definition syntax

**Detectable errors:**
- Missing `static` keyword
- Trying to access static from instance
- Incorrect constructor syntax

### Program Execution (Level 2)
**How NM shows runtime behavior:**
- Static members belong to class, not instances
- Each instance has own copy of instance properties
- Static methods called on class, instance methods on objects
- Static methods don't have instance `this`

**Detectable errors:**
- Calling static method on instance
- Expecting `this` in static method refers to instance
- Not understanding static vs instance memory layout
- Confusion about factory method patterns

### Function/Purpose (Level 3)
**How NM connects to problem-solving:**
- Use static for utility functions, factories, singletons
- Use instance for object-specific behavior
- Design appropriate use of class-level data
- Choose static vs instance based on use case

**Detectable errors:**
- Inappropriate static usage (should be instance)
- Missing static utilities (duplicated across instances)
- Poor singleton/factory pattern implementation
- Confused class vs instance responsibilities

---

## Class Syntax Model → Block Model

### Text Surface (Level 1)
**What syntax understanding NM provides:**
- Class declaration syntax
- Private field syntax (`#field`)
- Static block syntax
- Getter/setter syntax

**Detectable errors:**
- Incorrect class syntax
- Private field syntax errors
- Missing constructor
- Wrong getter/setter syntax

### Program Execution (Level 2)
**How NM shows runtime behavior:**
- Classes desugar to constructor functions + prototypes
- Private fields are truly private (not just convention)
- Classes must be called with `new`
- Classes are not hoisted (TDZ)

**Detectable errors:**
- Calling class without `new`
- Accessing class before declaration
- Expecting JavaScript classes work like Java/C++ classes
- Not understanding desugaring to prototypes

### Function/Purpose (Level 3)
**How NM connects to problem-solving:**
- Choose class syntax vs prototype-based approach
- Decide when to use private fields
- Design class hierarchies appropriately
- Understand transpilation implications

**Detectable errors:**
- Using classes when simpler pattern works
- Not using private fields when encapsulation needed
- Over-engineering with unnecessary class hierarchies
- Transpilation issues from class features

---

## This Binding Model → Block Model

### Text Surface (Level 1)
**What syntax understanding NM provides:**
- Arrow function syntax (lexical `this`)
- `.bind()`, `.call()`, `.apply()` syntax
- Method shorthand syntax
- `new` keyword

**Detectable errors:**
- Arrow function with wrong context
- Incorrect bind/call/apply usage
- Missing `new` changing `this` binding

### Program Execution (Level 2)
**How NM shows runtime behavior:**
- `this` determined at call time, not definition time
- Four binding rules: default, implicit, explicit, `new`
- Arrow functions capture lexical `this`
- Lost binding in callbacks

**Detectable errors:**
- Expecting `this` is lexical scope (it's not)
- Lost binding when extracting methods
- Confused about arrow vs regular function `this`
- Not understanding binding rule precedence

### Function/Purpose (Level 3)
**How NM connects to problem-solving:**
- Choose arrow vs regular based on `this` needs
- Design APIs considering `this` binding
- Handle event handlers appropriately
- Avoid `this` entirely (functional approach)

**Detectable errors:**
- Poor API design forcing awkward `this` binding
- Unnecessary use of `this` (functional alternative better)
- Event handler bugs from lost binding
- Framework confusion from `this` binding

---

## Operator Evaluation Model → Block Model

### Text Surface (Level 1)
**What syntax understanding NM provides:**
- Operator symbols and syntax
- Precedence order
- Associativity rules
- Short-circuit operator syntax

**Detectable errors:**
- Incorrect operator usage
- Missing parentheses
- Wrong operator for intended operation

### Program Execution (Level 2)
**How NM shows runtime behavior:**
- Operators evaluated by precedence, not left-to-right
- Short-circuit operators skip evaluation
- Side effects in expressions execute in specific order
- Expression evaluation builds tree bottom-up

**Detectable errors:**
- Expecting left-to-right evaluation
- Not understanding short-circuit behavior
- Surprised by side effect order
- Wrong precedence assumptions

### Function/Purpose (Level 3)
**How NM connects to problem-solving:**
- Use short-circuit for guards (`x && x.prop`)
- Use precedence for concise expressions
- Avoid side effects in complex expressions
- Consider readability vs brevity trade-offs

**Detectable errors:**
- Overly clever precedence usage (unreadable)
- Side effects making code unpredictable
- Not using short-circuit for performance
- Precedence bugs in complex expressions

---

## Type Coercion Model → Block Model

### Text Surface (Level 1)
**What syntax understanding NM provides:**
- `==` vs `===` syntax
- Explicit conversion functions (`Number()`, `String()`)
- Template literal syntax
- `+` operator overloading

**Detectable errors:**
- Using `==` when `===` intended
- Missing conversion causing type errors
- Concatenation vs addition confusion

### Program Execution (Level 2)
**How NM shows runtime behavior:**
- Implicit coercion follows ToPrimitive/ToNumber/ToString
- Different operators coerce differently
- `==` performs type coercion, `===` doesn't
- Truthiness vs equality

**Detectable errors:**
- Expecting no coercion or random coercion
- Surprised by `'5' + 3` vs `'5' - 3`
- Not understanding `==` coercion rules
- Truthy/falsy confusion

### Function/Purpose (Level 3)
**How NM connects to problem-solving:**
- Prefer explicit coercion for clarity
- Use `===` by default
- Design APIs considering coercion
- Understand framework coercion patterns

**Detectable errors:**
- Relying on implicit coercion (fragile)
- Type errors from unexpected coercion
- Security issues from coercion
- Poor type checking strategy

---

## Reference vs. Value Model → Block Model

### Text Surface (Level 1)
**What syntax understanding NM provides:**
- Assignment operator behavior
- Object/array literal syntax
- Spread operator syntax
- Destructuring syntax

**Detectable errors:**
- Expecting object copy from assignment
- Wrong spread syntax
- Incorrect destructuring

### Program Execution (Level 2)
**How NM shows runtime behavior:**
- Primitives assigned by value (copy)
- Objects assigned by reference (share)
- Mutation changes shared object
- Reassignment breaks reference link

**Detectable errors:**
- Expecting all assignment copies
- Not understanding shared mutations
- Confusion about mutation vs reassignment
- Parameter passing misconceptions

### Function/Purpose (Level 3)
**How NM connects to problem-solving:**
- Choose shallow vs deep copy appropriately
- Design for immutability when appropriate
- Manage shared state carefully
- Consider copying performance implications

**Detectable errors:**
- Unnecessary deep copies (performance)
- Unintentional mutations (bugs)
- Poor immutability patterns
- Sharing when isolation needed

---

## Summary: NMs by Primary Block Model Level

### Primarily Level 1 (Text Surface)
*These NMs most directly address syntax understanding:*
- Operator Evaluation Model (precedence is syntax)
- Type Coercion Model (`==` vs `===` syntax choice)

### Primarily Level 2 (Program Execution)
*These NMs most directly address runtime behavior:*
- Call Stack Model (execution order)
- Memory Model (storage behavior)
- Event Loop Model (async execution)
- Scope Chain Model (variable resolution)
- Prototype Chain Model (property lookup)
- This Binding Model (context determination)
- Reference vs. Value Model (assignment semantics)

### Primarily Level 3 (Function/Purpose)
*These NMs most directly address design choices:*
- Static vs. Instance Model (architecture patterns)
- Class Syntax Model (language design decisions)

**Note**: All NMs span multiple levels - this categorization shows where each has strongest impact.

---

## Using NMs for Block Model Diagnosis

**Diagnostic Strategy**:

1. **Student makes error** → Identify which Block Model level
2. **Level 1 (syntax)** → Use NM to show correct syntax in context
3. **Level 2 (execution)** → Use NM to reveal actual runtime behavior
4. **Level 3 (design)** → Use NM to compare alternative approaches

**Example: Event Loop Misconception**

Student writes:
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// Student predicts: 1, 2, 3
// Actual output: 1, 3, 2
```

**Diagnosis using Block Model**:
- **Level 1 (syntax)**: ✓ Syntax correct
- **Level 2 (execution)**: ✗ Wrong execution model
- **Level 3 (design)**: N/A (syntax works, just wrong mental model)

**Intervention**: Show **Event Loop NM** visualizing queue processing

**Result**: Student sees Level 2 execution behavior, corrects mental model
