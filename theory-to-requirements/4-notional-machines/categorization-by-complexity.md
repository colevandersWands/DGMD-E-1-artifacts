# Notional Machines Categorized by Complexity

**Purpose**: Group notional machines by learning complexity to guide teaching sequences and adaptive scaffolding.

**Complexity Factors**:
- Cognitive load (how many concepts integrated)
- Prerequisites (what must be understood first)
- Abstraction level (concrete vs abstract)
- Counterintuitiveness (alignment with naive intuitions)

---

## Beginner Level (Foundation)

**Characteristics**: Concrete, observable, minimal prerequisites, aligns with intuition

### 1. Memory Model ★★☆☆☆
**Complexity**: Low
**Why beginner**:
- Most concrete (variables have locations, hold values)
- Immediate visual feedback
- Primitives align with intuition (numbers, strings)
- Foundation for everything else

**Prerequisites**: None
**Cognitive load**: Low (one concept: variables store values)
**Teaching time**: 1-2 weeks

**Start here**: Memory is most tangible entry point

---

### 2. Call Stack Model ★★☆☆☆
**Complexity**: Low-Medium
**Why beginner**:
- Observable (functions called, executed, returned)
- Intuitive LIFO ordering
- Limited integration (just function execution)

**Prerequisites**:
- Memory Model (for local variables)
- Expression Layer (operators, coercion, reference/value) - function arguments must be evaluated as expressions first

**Cognitive load**: Low (one main concept: execution order)
**Teaching time**: 1-2 weeks

**Pedagogical note**: Expression evaluation should be taught before Call Stack because function arguments are expressions that must be evaluated, and return values can be directly operated on without variable capture

---

### 3. Operator Evaluation Model ★★☆☆☆
**Complexity**: Low-Medium
**Why beginner**:
- Concrete (PEMDAS familiar from math)
- Rules-based (precedence table)
- Limited scope (expression evaluation only)

**Prerequisites**: None (can teach independently)
**Cognitive load**: Low (precedence rules, one at a time)
**Teaching time**: 0.5-1 week

**Optional early**: Can introduce alongside Memory

---

## Intermediate Level (Integration)

**Characteristics**: Integrates 2-3 concepts, some counterintuitive elements, moderate abstraction

### 4. Reference vs. Value Model ★★★☆☆
**Complexity**: Medium
**Why intermediate**:
- Builds on Memory Model
- Counterintuitive (assignment sometimes copies, sometimes shares)
- Critical distinction (primitives vs objects)

**Prerequisites**: Memory Model (stack/heap)
**Cognitive load**: Medium (two assignment semantics)
**Teaching time**: 1-2 weeks

**After primitives mastered**: Need solid Memory foundation

---

### 5. Type Coercion Model ★★★☆☆
**Complexity**: Medium
**Why intermediate**:
- Counterintuitive (implicit conversions)
- Many rules (ToPrimitive, ToNumber, ToString)
- Operator-dependent (+ vs - behave differently)

**Prerequisites**: Operator Evaluation (operators trigger coercion)
**Cognitive load**: Medium (conversion algorithms)
**Teaching time**: 1-2 weeks

**After operators**: Explains operator behavior

---

### 6. Scope Chain Model ★★★★☆
**Complexity**: Medium-High
**Why intermediate**:
- Integrates Memory + Call Stack
- Closures counterintuitive
- Multiple scope types (`var` vs `let`/`const`)

**Prerequisites**: Memory Model, Call Stack Model
**Cognitive load**: High (scope chain walking, closure capture)
**Teaching time**: 2-3 weeks

**Key threshold**: Closures are difficult

---

### 7. This Binding Model ★★★★☆
**Complexity**: Medium-High
**Why intermediate**:
- Highly counterintuitive (dynamic binding)
- Four rules with precedence
- Contrasts with lexical scope

**Prerequisites**: Call Stack (call-site concept), Scope Chain (contrast)
**Cognitive load**: High (multiple binding rules)
**Teaching time**: 2-3 weeks

**After closures**: Need lexical scope understanding for contrast

---

## Advanced Level (Synthesis)

**Characteristics**: Integrates 3+ concepts, highly counterintuitive, abstract, threshold concepts

### 8. Event Loop Model ★★★★★
**Complexity**: Very High
**Why advanced**:
- Threshold concept (transformative)
- Integrates Call Stack + Memory + async
- Highly counterintuitive (code doesn't run in order)
- Multiple queues with priorities

**Prerequisites**: Call Stack (sync execution), Memory (closure capture)
**Cognitive load**: Very High (event loop mechanics, queue priorities)
**Teaching time**: 3-4 weeks

**Major threshold**: Most difficult for beginners

---

### 9. Prototype Chain Model ★★★★☆
**Complexity**: High
**Why advanced**:
- Alien concept (delegation, not copying)
- Integrates Memory (references) + This Binding (methods)
- Counterintuitive (prototype changes affect instances)

**Prerequisites**: Memory Model (references), Reference vs. Value
**Cognitive load**: High (chain walking, delegation)
**Teaching time**: 2-3 weeks

**OOP foundation**: JavaScript's unique approach

---

### 10. Static vs. Instance Model ★★★☆☆
**Complexity**: Medium-High
**Why advanced**:
- Requires OOP understanding
- Integrates Memory + Prototype + This Binding
- Design pattern knowledge

**Prerequisites**: Prototype Chain, This Binding, Memory Model
**Cognitive load**: Medium (class vs instance distinction)
**Teaching time**: 1-2 weeks

**After prototypes**: Need inheritance understanding

---

### 11. Class Syntax Model ★★★☆☆
**Complexity**: Medium
**Why advanced**:
- Meta-level (syntactic sugar understanding)
- Requires prototype knowledge for desugaring
- Language design concepts

**Prerequisites**: Prototype Chain Model (what classes desugar to)
**Cognitive load**: Medium (syntax vs semantics distinction)
**Teaching time**: 1 week

**Final OOP piece**: After prototypes mastered

---

## Summary Table

| Notional Machine | Complexity | Prerequisites | Teaching Time | SOLO Target |
|------------------|------------|---------------|---------------|-------------|
| **Memory Model** | ★★☆☆☆ | None | 1-2 weeks | Uni→Multi |
| **Call Stack** | ★★☆☆☆ | Memory | 1-2 weeks | Uni→Multi |
| **Operator Evaluation** | ★★☆☆☆ | None | 0.5-1 week | Uni→Multi |
| **Reference vs. Value** | ★★★☆☆ | Memory | 1-2 weeks | Multi→Rel |
| **Type Coercion** | ★★★☆☆ | Operators | 1-2 weeks | Multi→Rel |
| **Scope Chain** | ★★★★☆ | Memory, Call Stack | 2-3 weeks | Multi→Rel |
| **This Binding** | ★★★★☆ | Call Stack, Scope | 2-3 weeks | Multi→Rel |
| **Event Loop** | ★★★★★ | Call Stack, Memory | 3-4 weeks | Rel→Ext |
| **Prototype Chain** | ★★★★☆ | Memory, Reference | 2-3 weeks | Multi→Rel |
| **Static vs. Instance** | ★★★☆☆ | Prototype, This | 1-2 weeks | Rel→Ext |
| **Class Syntax** | ★★★☆☆ | Prototype | 1 week | Rel→Ext |

**Total teaching time**: 16-24 weeks (one semester to two semesters)

---

## Progressive Learning Paths

### Path 1: Minimal Prerequisites (Fastest)
**For students with strong programming background**

1. Memory Model (1 week)
2. Call Stack Model (1 week)
3. Reference vs. Value (1 week)
4. Scope Chain (2 weeks)
5. Event Loop (2 weeks)
6. Prototype Chain (1 week)
7. This Binding (1.5 weeks)
8. Others as needed (2 weeks)

**Total**: ~11.5 weeks

---

### Path 2: Solid Foundation (Recommended)
**For typical CS students**

1. Memory Model (2 weeks)
2. Operator Evaluation (0.5 weeks)
3. Call Stack Model (2 weeks)
4. Reference vs. Value (2 weeks)
5. Type Coercion (1 week)
6. Scope Chain (3 weeks)
7. Event Loop (3 weeks)
8. Prototype Chain (2 weeks)
9. This Binding (2 weeks)
10. Static vs. Instance (1 week)
11. Class Syntax (1 week)

**Total**: ~19.5 weeks

---

### Path 3: Gentle Progression (Beginners)
**For students new to programming**

1. Memory Model (3 weeks)
2. Operator Evaluation (1 week)
3. Call Stack Model (2 weeks)
4. Reference vs. Value (2 weeks)
5. Type Coercion (2 weeks)
6. Scope Chain (4 weeks)
7. This Binding (3 weeks)
8. Prototype Chain (3 weeks)
9. Event Loop (4 weeks)
10. Static vs. Instance (2 weeks)
11. Class Syntax (1 week)

**Total**: ~27 weeks

---

## Adaptive Sequencing Based on Performance

### If student excels at Memory Model:
- Accelerate to Call Stack immediately
- Introduce Reference vs. Value early
- Can handle Scope Chain sooner

### If student struggles with Memory Model:
- Extend time with primitives only
- Delay objects and references
- Use more concrete examples

### If student excels at Call Stack:
- Introduce recursion early
- Can handle Scope Chain sooner
- Prepare for Event Loop (call stack prerequisite)

### If student struggles with Scope Chain:
- Delay Event Loop (closure prerequisite)
- More practice with nested scopes
- Delay `var` vs `let` distinction

### If student excels at Scope Chain:
- Event Loop ready (closures in callbacks)
- This Binding ready (contrast with lexical)
- Can introduce advanced patterns

### If student struggles with Event Loop:
- This is normal (threshold concept)
- Extend time to 4-5 weeks
- Heavy prediction practice
- Delay async/await

---

## Complexity Assessment Questions

**Memory Model Assessment**:
```javascript
let x = {a: 1};
let y = x;
y.a = 2;
console.log(x.a); // What prints?
```
**Beginner passes**: Can predict shared mutation

---

**Call Stack Assessment**:
```javascript
function a() { return b() + 1; }
function b() { return 5; }
console.log(a()); // What prints?
```
**Beginner passes**: Traces calls correctly

---

**Scope Chain Assessment**:
```javascript
function outer() {
  let x = 1;
  return function() { return ++x; };
}
const counter = outer();
console.log(counter()); // What prints?
console.log(counter()); // What prints?
```
**Intermediate passes**: Understands closure

---

**Event Loop Assessment**:
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// What order?
```
**Advanced passes**: Predicts 1, 4, 3, 2

---

## Complexity Factors Deep Dive

### Cognitive Load Analysis

**Low Cognitive Load** (1-2 concepts):
- Memory Model: Variables + values
- Call Stack: Function execution order
- Operator Evaluation: Precedence rules

**Medium Cognitive Load** (2-3 concepts):
- Reference vs. Value: Primitives + objects + assignment
- Type Coercion: Operators + types + conversion
- Static vs. Instance: Classes + instances + static

**High Cognitive Load** (3-4 concepts):
- Scope Chain: Functions + scopes + closures + capture
- This Binding: Call sites + binding rules + context
- Prototype Chain: Objects + prototypes + delegation

**Very High Cognitive Load** (4+ concepts):
- Event Loop: Call stack + queues + priorities + timing

---

### Counterintuitiveness Scale

**Intuitive** (aligns with naive expectations):
- Memory Model (mostly - variables hold values)
- Call Stack (functions run when called)
- Operator Evaluation (PEMDAS familiar)

**Somewhat Counterintuitive**:
- Reference vs. Value (assignment sometimes shares)
- Type Coercion (conversions happen implicitly)
- Scope Chain (closures persist after return)

**Highly Counterintuitive**:
- Event Loop (`setTimeout(fn, 0)` doesn't run immediately)
- Prototype Chain (changes affect existing instances)
- This Binding (`this` not lexical scope)

---

### Integration Requirements

**Standalone** (minimal integration):
- Operator Evaluation (just expressions)
- Memory Model (just storage)

**Some Integration** (2 NMs):
- Call Stack (uses Memory for locals)
- Reference vs. Value (extends Memory)
- Type Coercion (extends Operators)

**Heavy Integration** (3+ NMs):
- Scope Chain (Memory + Call Stack + closures)
- Event Loop (Call Stack + Memory + async)
- This Binding (Call Stack + Scope + context)
- Prototype Chain (Memory + References + OOP)

**Meta-Level** (requires understanding of other NMs):
- Static vs. Instance (Prototype + This + Memory)
- Class Syntax (Prototype + syntax)

---

## Teaching Strategy by Complexity

**Beginner Level Strategy**:
- Concrete examples only
- Immediate visual feedback
- High repetition
- Prediction-validation cycles
- Avoid integration initially

**Intermediate Level Strategy**:
- Introduce integration gradually
- Compare/contrast patterns
- Practice with counterintuitive cases
- Scaffold complexity
- Connect to previous NMs

**Advanced Level Strategy**:
- Expect threshold crossing difficulty
- Extended practice periods
- Multiple perspectives
- Design patterns and best practices
- Meta-level discussions

---

## Complexity-Based Tool Priorities

**Must-Have NMs** (for MVP educational tools):
1. Memory Model (foundation)
2. Call Stack (execution)
3. Scope Chain (closures critical for JS)

**Should-Have NMs** (for V1):
4. Event Loop (async critical for modern JS)
5. Reference vs. Value (common confusion)
6. This Binding (pervasive in JS)

**Nice-to-Have NMs** (for V2+):
7. Prototype Chain (OOP understanding)
8. Type Coercion (avoid bugs)
9. Operator Evaluation (expression understanding)
10. Static vs. Instance (OOP patterns)
11. Class Syntax (modern syntax)

**Priority Rationale**: Start with low-complexity, high-impact NMs for quickest learner success.
