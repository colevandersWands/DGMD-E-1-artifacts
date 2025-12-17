# Notional Machines Categorized by Granularity

**Purpose**: Group notional machines by the granularity of execution they model - from individual operations to entire program lifecycles.

**Granularity Levels**:
- **Micro**: Individual operations (expressions, operators, single statements)
- **Meso**: Function/scope level (function calls, variable lifetimes, scope boundaries)
- **Macro**: Program-wide concerns (event loop, memory management, async coordination)

**Educational Implication**: Teaching should progress from appropriate granularity for student level - beginners need meso/macro (function-level thinking), advanced students need micro (operation-level).

---

## Micro-Granularity Notional Machines

**Focus**: Individual operations and expression-level execution

### Operator Evaluation Model

**Granularity**: Sub-statement (expression tree nodes)

**What It Models**:
- Single operator application
- Precedence resolution
- Left/right operand evaluation
- Type conversion per operator

**Execution Span**: Microseconds
**Code Span**: Single expression
**Mental Model**: "How does this expression evaluate?"

**Example**:
```javascript
2 + 3 * 4
```
**Models 3 operations**:
- Multiply: `3 * 4 = 12`
- Add: `2 + 12 = 14`

**Teaching Value**: Beginners often skip this level (treat expressions as atomic). Advanced students debug operator precedence bugs.

---

### Type Coercion Model

**Granularity**: Per-operation (type conversion per operator)

**What It Models**:
- ToPrimitive algorithm execution
- ToNumber/ToString/ToBoolean conversions
- Operator-specific coercion rules
- Implicit conversion timing

**Execution Span**: Nanoseconds (per coercion)
**Code Span**: Single operator or comparison
**Mental Model**: "What type conversions happen here?"

**Example**:
```javascript
'5' + 3  // String concatenation after number→string coercion
```
**Models**: Single coercion operation (3 → '3')

**Teaching Value**: Critical for debugging surprising behavior. Too granular for beginners.

---

## Meso-Granularity Notional Machines

**Focus**: Function/scope-level execution

### Call Stack Model

**Granularity**: Function call level

**What It Models**:
- Function entry/exit
- Parameter binding
- Return value flow
- Stack frame lifetime

**Execution Span**: Milliseconds to seconds (per function)
**Code Span**: Function body
**Mental Model**: "Which function is executing? What's the call order?"

**Example**:
```javascript
function a() { return b() + 1; }
function b() { return 5; }
a();
```
**Models 3 function-level events**:
- Enter `a`
- Call `b` (enter/exit)
- Exit `a`

**Teaching Value**: Perfect granularity for beginners. Matches mental chunking of "what does this function do?"

---

### Scope Chain Model

**Granularity**: Variable resolution per scope

**What It Models**:
- Scope creation/destruction
- Variable declaration/initialization
- Closure capture
- Scope chain walking for resolution

**Execution Span**: Milliseconds (per scope lifetime)
**Code Span**: Block or function body
**Mental Model**: "What variables are accessible? Where are they stored?"

**Example**:
```javascript
function outer() {
  let x = 1;
  return function inner() { return ++x; };
}
```
**Models 2 scope-level lifetimes**:
- `outer` scope (persists after return via closure)
- `inner` scope (created per call)

**Teaching Value**: Right level for understanding closures. Too detailed for "hello world", essential for real programs.

---

### This Binding Model

**Granularity**: Per function call (binding resolution)

**What It Models**:
- Call-site analysis
- Binding rule selection
- Context object determination
- Binding precedence resolution

**Execution Span**: Per function call (instant binding resolution)
**Code Span**: Function invocation
**Mental Model**: "What is `this` for this call?"

**Example**:
```javascript
obj.method();  // Implicit binding to obj
const fn = obj.method;
fn();          // Default binding (undefined/global)
```
**Models**: 2 distinct binding resolutions (different call-sites)

**Teaching Value**: Matches OOP mental model (method = function + context). Meso-level appropriate.

---

### Memory Model (Variable-Level)

**Granularity**: Per variable/value

**What It Models**:
- Variable allocation (stack)
- Object creation (heap)
- Reference copying
- Individual value lifetime

**Execution Span**: Variable lifetime (milliseconds to program duration)
**Code Span**: Variable declaration to last use
**Mental Model**: "Where is this value stored? Who can access it?"

**Example**:
```javascript
let x = 5;           // Stack allocation
let obj = {a: 1};    // Heap allocation + stack reference
```
**Models**: 2 variable-level allocations

**Teaching Value**: Good for beginners (one variable at a time). Scales to complex programs.

---

### Reference vs. Value Model

**Granularity**: Per assignment/parameter pass

**What It Models**:
- Assignment semantics (copy value vs copy reference)
- Mutation vs reassignment distinction
- Sharing determination
- Parameter passing behavior

**Execution Span**: Per assignment operation
**Code Span**: Single assignment or function call
**Mental Model**: "Does this copy or share?"

**Example**:
```javascript
let a = [1, 2];
let b = a;  // Reference copy (single operation)
```
**Models**: Single assignment operation

**Teaching Value**: Perfect meso-granularity (per-operation clear, but affects program-wide behavior).

---

### Prototype Chain Model

**Granularity**: Per property access

**What It Models**:
- Property lookup steps
- Chain walking
- Delegation vs own property
- Prototype link following

**Execution Span**: Per property access (nanoseconds)
**Code Span**: Single property access
**Mental Model**: "Where is this property found?"

**Example**:
```javascript
dog.speak()  // Walk chain: dog → Dog.prototype → Animal.prototype
```
**Models**: Single property lookup (may traverse multiple chain levels)

**Teaching Value**: Right level for OOP (per-access granularity, but object-level thinking).

---

### Static vs. Instance Model

**Granularity**: Class vs object level

**What It Models**:
- Class-level data/methods
- Instance-level data/methods
- Memory sharing patterns
- Access patterns (Class.static vs instance.method)

**Execution Span**: Class lifetime vs instance lifetime
**Code Span**: Class definition
**Mental Model**: "Is this shared by all instances or per-instance?"

**Example**:
```javascript
class User {
  static count = 0;  // Class-level
  name = '';         // Instance-level
}
```
**Models**: 2 granularity levels (class-wide vs per-object)

**Teaching Value**: Matches OOP design granularity (architectural level, not operation level).

---

### Class Syntax Model

**Granularity**: Class definition level

**What It Models**:
- Class desugaring to prototypes
- Private field mechanism
- Constructor pattern
- Method definitions

**Execution Span**: Class definition evaluation
**Code Span**: Entire class body
**Mental Model**: "What does this class syntax mean?"

**Example**:
```javascript
class Animal {
  constructor(name) { this.name = name; }
  speak() { return '...'; }
}
```
**Models**: Single class definition (desugaring to prototype structure)

**Teaching Value**: Meta-level (syntax understanding). Higher abstraction than operation-level.

---

## Macro-Granularity Notional Machines

**Focus**: Program-wide execution and lifecycle

### Event Loop Model

**Granularity**: Task/callback level (program-wide coordination)

**What It Models**:
- Queue processing
- Task scheduling
- Microtask vs macrotask prioritization
- Async coordination across entire program

**Execution Span**: Entire program lifetime
**Code Span**: Full program (all async operations)
**Mental Model**: "How does async code coordinate? What runs when?"

**Example**:
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
```
**Models**: 4 task-level events + queue processing across entire execution

**Teaching Value**: Macro-level essential for modern JS. Coordinates all async operations program-wide.

---

### Memory Model (Program-Wide)

**Granularity**: Heap/stack management (entire program memory)

**What It Models**:
- Total memory layout
- Garbage collection cycles
- Memory leaks (references preventing GC)
- Cross-function memory relationships

**Execution Span**: Entire program lifetime
**Code Span**: All allocations across program
**Mental Model**: "How is memory managed? Where are leaks?"

**Example**: Entire program's memory footprint
```javascript
// All objects, closures, references across entire program
```

**Teaching Value**: Too broad for beginners (overwhelming). Critical for performance optimization.

---

## Granularity Comparison Table

| Notional Machine | Granularity | Execution Span | Code Span | Best For |
|------------------|-------------|----------------|-----------|----------|
| **Operator Evaluation** | Micro | Microseconds | Expression | Advanced debugging |
| **Type Coercion** | Micro | Nanoseconds | Single operator | Advanced debugging |
| **Call Stack** | Meso | Milliseconds+ | Function | Beginners+ |
| **Memory (variable)** | Meso | Variable lifetime | Declaration to last use | Beginners+ |
| **Scope Chain** | Meso | Scope lifetime | Block/function | Intermediate+ |
| **This Binding** | Meso | Per call | Function invocation | Intermediate+ |
| **Reference vs. Value** | Meso | Per assignment | Single operation | Intermediate+ |
| **Prototype Chain** | Meso | Per access | Property access | Intermediate+ |
| **Static vs. Instance** | Meso | Class/object lifetime | Class definition | Intermediate+ |
| **Class Syntax** | Meso | Class definition | Class body | Intermediate+ |
| **Event Loop** | Macro | Program lifetime | Entire program | Advanced |
| **Memory (program)** | Macro | Program lifetime | All allocations | Advanced |

---

## Teaching Progression by Granularity

### Beginner Focus: Meso-Granularity

**Why**: Matches human cognitive chunking. Functions are natural units of thought.

**Primary NMs**:
1. Call Stack (function-level thinking)
2. Memory Model (variable-level)
3. Reference vs. Value (assignment-level)

**Avoid**:
- Micro (too detailed, overwhelming)
- Macro (too abstract, not yet relevant)

**Example Lesson**: "Trace this function call step-by-step"
```javascript
function double(x) { return x * 2; }
double(5);
```
**Meso-level**: Enter double, parameter x=5, return 10, exit
**Micro-level (skip)**: Evaluate `x * 2` with multiply operator precedence
**Macro-level (skip)**: Memory layout of entire program

---

### Intermediate Focus: Meso + Selective Micro

**Why**: Ready for finer-grained debugging. Still building on function-level mental models.

**Primary NMs**:
- All meso-level NMs
- Operator Evaluation (when debugging precedence bugs)
- Type Coercion (when debugging `==` vs `===`)

**Introduce**:
- Prototype Chain (meso, but OOP-specific)
- This Binding (meso, but requires strong fundamentals)
- Scope Chain (meso, but closures are complex)

**Example Lesson**: "Why does this equality fail?"
```javascript
console.log(5 == '5');   // true
console.log(5 === '5');  // false
```
**Meso**: Equality comparison (operation-level)
**Micro (introduce)**: Type coercion steps (ToPrimitive)

---

### Advanced Focus: All Granularities + Macro Integration

**Why**: Building full mental model of JavaScript execution. Performance optimization requires macro view.

**Primary NMs**:
- Event Loop (macro coordination)
- Memory Model (program-wide view)
- All micro-level detail (debugging)

**Synthesis**:
- Multi-NM analysis (closures + async + memory)
- Performance implications (GC, event loop blocking)
- Architectural patterns (leveraging macro understanding)

**Example Lesson**: "Optimize this async code"
```javascript
for (let i = 0; i < 1000; i++) {
  await fetch(`/api/${i}`);  // Sequential, slow
}
```
**Macro-level analysis**: Event loop blocked, serial execution
**Optimization**: `Promise.all()` for parallel requests
**Memory consideration**: 1000 promises in memory

---

## Granularity Mismatch Errors

**Common teaching mistakes from wrong granularity level:**

### Teaching Micro to Beginners (Too Detailed)

**Error**: Explaining operator precedence before function understanding
```javascript
2 + 3 * 4  // "First, multiply has precedence 14, add has 13..."
```
**Problem**: Beginners not ready for operator-level thinking. Functions are right granularity.

**Fix**: Teach meso-level (functions) first. Introduce micro only when debugging.

---

### Teaching Macro to Intermediates Too Early (Too Abstract)

**Error**: Full event loop model before solid sync execution understanding
```javascript
setTimeout(() => console.log('later'), 0);
```
**Problem**: Can't understand async coordination without sync execution mastery.

**Fix**: Ensure meso-level solid (Call Stack, Memory) before macro (Event Loop).

---

### Staying Meso for Advanced Students (Insufficient Detail)

**Error**: Not diving into GC, event loop phases for performance work
```javascript
const cache = new Map();  // When does this get GC'd?
```
**Problem**: Performance optimization requires macro memory view.

**Fix**: Introduce macro-granularity for architecture and performance discussions.

---

## Tool Implications by Granularity

### Beginner Tools: Meso-Level Visualization

**Features**:
- Function call visualization (stack)
- Variable state per function
- Step-through at function level

**Avoid**:
- Operator-level stepping (too granular)
- Program-wide memory diagrams (too broad)

**Example**: Show function calls as discrete steps, not expression evaluation trees.

---

### Intermediate Tools: Meso + Selective Micro

**Features**:
- All meso-level features
- Expression evaluation on demand
- Type coercion annotation (when relevant)

**Adaptive**:
- Show micro detail only when error occurs at that level
- Default to meso-level (functions, scopes)

**Example**: Highlight type coercion only when `==` causes unexpected behavior.

---

### Advanced Tools: Multi-Granularity

**Features**:
- Zoom between granularities (micro ↔ meso ↔ macro)
- Event loop visualization (macro)
- Memory profiling (macro)
- Full expression trees (micro)

**Integration**:
- Show macro event loop + meso call stack + micro operations
- Link granularities (this closure impacts macro memory)

**Example**: Click function in call stack → zoom to micro expression evaluation. Zoom out → see macro event loop coordination.

---

## Granularity and Debugging

### Bug at Micro-Level: Operator Precedence

**Bug**:
```javascript
const result = 2 + 3 * 4;  // Expected 20, got 14
```
**Micro-level debugging**: Expression tree shows multiply first
**Meso-level insufficient**: Call stack doesn't reveal operator order
**Fix**: Use micro-granularity NM (Operator Evaluation)

---

### Bug at Meso-Level: Closure Capture

**Bug**:
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);  // Logs: 3, 3, 3
}
```
**Meso-level debugging**: Scope Chain shows one `i` variable (function scope)
**Macro-level insufficient**: Event loop doesn't reveal closure issue
**Fix**: Use meso-granularity NM (Scope Chain)

---

### Bug at Macro-Level: Memory Leak

**Bug**:
```javascript
const cache = new Map();
setInterval(() => {
  cache.set(Date.now(), fetchData());  // Never cleared
}, 1000);
```
**Macro-level debugging**: Memory Model (program-wide) shows growing heap
**Meso-level insufficient**: Per-function view misses accumulation
**Fix**: Use macro-granularity NM (Memory Model program view)

---

## Cognitive Load by Granularity

**Micro-Granularity**:
- **High cognitive load**: Many operations per line
- **Short-term memory strain**: Track intermediate values
- **Best for**: Small, focused debugging

**Meso-Granularity**:
- **Moderate cognitive load**: Natural function-level chunks
- **Matches working memory**: ~7 function calls trackable
- **Best for**: General comprehension and learning

**Macro-Granularity**:
- **Variable load**: Low for overview, high for details
- **Requires abstraction skill**: Holding program-wide view
- **Best for**: Architecture and optimization

**Teaching Implication**: Match granularity to student cognitive capacity. Beginners: meso only. Advanced: all three.

---

## Summary: Granularity Guidelines

### For Beginners
- **Focus**: Meso-level (functions, variables, assignments)
- **Avoid**: Micro (overwhelming detail), Macro (too abstract)
- **Tools**: Function-level stepping, variable state per function

### For Intermediates
- **Focus**: Meso-level + selective micro (when debugging)
- **Introduce**: OOP meso-level NMs (prototypes, this)
- **Tools**: Expression-level detail on demand

### For Advanced
- **Focus**: All granularities + integration
- **Emphasize**: Macro-level (event loop, memory management)
- **Tools**: Zoom between granularities, performance profiling

### General Principle
**Match granularity to task**:
- Learning fundamentals → Meso
- Debugging edge cases → Micro
- Optimizing performance → Macro
- Understanding architecture → Macro
