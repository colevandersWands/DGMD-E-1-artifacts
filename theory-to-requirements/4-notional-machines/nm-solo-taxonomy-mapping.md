# Notional Machines → SOLO Taxonomy Mapping

**Purpose**: Map each JavaScript notional machine to SOLO taxonomy levels, showing how notional machines support progression from prestructural to extended abstract understanding.

## SOLO Levels Overview

1. **Prestructural**: Complete confusion, missed the point
2. **Unistructural**: Single aspect focus, simple procedures
3. **Multistructural**: Multiple unconnected elements
4. **Relational**: Integrated understanding, coherent whole
5. **Extended Abstract**: Transfer to new domains, metacognition

---

## Call Stack Model → SOLO Progression

### Prestructural (Level 1)
- **Manifestation**: Believes all functions run simultaneously or in random order
- **NM Support**: Visualization shows concrete stack frames in sequence
- **Detection**: Cannot predict which function executes when

### Unistructural (Level 2)
- **Manifestation**: Understands one function executes, but not the return-to-caller mechanism
- **NM Support**: Shows single function entry/exit
- **Detection**: Can trace one function call but not nested calls

### Multistructural (Level 3)
- **Manifestation**: Understands individual function calls but not the stack as a whole
- **NM Support**: Shows multiple frames but student treats each independently
- **Detection**: Can describe each call separately but not their relationship

### Relational (Level 4)
- **Manifestation**: Understands LIFO ordering, frame relationships, recursion mechanics
- **NM Support**: Shows how frames build and collapse in relationship to each other
- **Detection**: Can trace recursive calls and explain return flow

### Extended Abstract (Level 5)
- **Manifestation**: Transfers stack concept to debugging, performance analysis, other languages
- **NM Support**: Provides data for metacognitive reflection on execution order
- **Detection**: Can predict stack overflow, optimize tail recursion, explain call stack across paradigms

---

## Memory Model → SOLO Progression

### Prestructural (Level 1)
- **Manifestation**: Believes variables don't have locations or that all variables are global
- **NM Support**: Shows explicit memory locations (stack/heap)
- **Detection**: Cannot identify where a variable lives

### Unistructural (Level 2)
- **Manifestation**: Knows variables have values but not about storage locations or references
- **NM Support**: Shows variable declaration and assignment to specific locations
- **Detection**: Can track one variable but not relationships between variables

### Multistructural (Level 3)
- **Manifestation**: Understands individual variables but not reference relationships
- **NM Support**: Shows multiple variables in memory but student doesn't see connections
- **Detection**: Confused when multiple variables share same object

### Relational (Level 4)
- **Manifestation**: Understands references, stack vs heap, garbage collection
- **NM Support**: Shows reference arrows, shared objects, memory lifecycle
- **Detection**: Can predict when changes to one variable affect another

### Extended Abstract (Level 5)
- **Manifestation**: Designs data structures considering memory layout, optimizes for GC
- **NM Support**: Provides data for reasoning about memory performance
- **Detection**: Can discuss memory trade-offs, choose appropriate data structures

---

## Event Loop Model → SOLO Progression

### Prestructural (Level 1)
- **Manifestation**: Expects async code to run immediately or in written order
- **NM Support**: Shows explicit task queues and event loop ticks
- **Detection**: Surprised by async behavior, cannot predict output order

### Unistructural (Level 2)
- **Manifestation**: Knows `setTimeout` delays execution but not why or how
- **NM Support**: Shows single async operation queued
- **Detection**: Can use one async pattern but not multiple together

### Multistructural (Level 3)
- **Manifestation**: Uses promises, callbacks, setTimeout separately but doesn't understand priorities
- **NM Support**: Shows multiple queues (micro/macro) but student treats separately
- **Detection**: Confused when promises resolve before setTimeout(fn, 0)

### Relational (Level 4)
- **Manifestation**: Understands microtask vs macrotask, event loop mechanics
- **NM Support**: Shows queue priorities, stack-emptying requirement
- **Detection**: Can predict complex async execution order

### Extended Abstract (Level 5)
- **Manifestation**: Designs async architectures, optimizes for event loop, understands Node.js phases
- **NM Support**: Provides data for performance analysis and optimization
- **Detection**: Can explain event loop across environments, optimize async patterns

---

## Scope Chain Model → SOLO Progression

### Prestructural (Level 1)
- **Manifestation**: Believes all variables are global or randomly accessible
- **NM Support**: Shows explicit scope boundaries
- **Detection**: Tries to access variables from wrong scopes

### Unistructural (Level 2)
- **Manifestation**: Knows local variables exist but not scope chain walking
- **NM Support**: Shows single scope with its variables
- **Detection**: Can work with variables in immediate scope only

### Multistructural (Level 3)
- **Manifestation**: Understands nested scopes but not closure capture
- **NM Support**: Shows multiple scopes but student doesn't understand chain walking
- **Detection**: Confused why inner functions can access outer variables

### Relational (Level 4)
- **Manifestation**: Understands scope chain, closures, lexical scoping
- **NM Support**: Shows scope chain walking and closure captures
- **Detection**: Can predict variable resolution and design closures intentionally

### Extended Abstract (Level 5)
- **Manifestation**: Uses closures for module patterns, designs scope hierarchies
- **NM Support**: Provides data for architectural decisions about scope
- **Detection**: Can discuss scope-based design patterns, trade-offs

---

## Prototype Chain Model → SOLO Progression

### Prestructural (Level 1)
- **Manifestation**: Believes objects copy properties from each other
- **NM Support**: Shows explicit prototype links
- **Detection**: Expects changing prototype to not affect existing objects

### Unistructural (Level 2)
- **Manifestation**: Can use object methods but doesn't understand prototype lookup
- **NM Support**: Shows single-step lookup (object → prototype)
- **Detection**: Can call methods but can't explain where they come from

### Multistructural (Level 3)
- **Manifestation**: Understands prototype exists but not the chain mechanism
- **NM Support**: Shows multi-level chain but student doesn't understand walking
- **Detection**: Confused by inheritance depth, can't predict property source

### Relational (Level 4)
- **Manifestation**: Understands prototype chain walking, shadowing, inheritance
- **NM Support**: Shows complete chain traversal and property resolution
- **Detection**: Can design inheritance hierarchies, predict property lookups

### Extended Abstract (Level 5)
- **Manifestation**: Chooses between composition/inheritance, understands class vs prototype trade-offs
- **NM Support**: Provides data for architectural decisions
- **Detection**: Can discuss OOP patterns, when to use prototypes vs classes

---

## Static vs. Instance Model → SOLO Progression

### Prestructural (Level 1)
- **Manifestation**: Tries to call static methods on instances or vice versa
- **NM Support**: Shows clear separation between class and instance level
- **Detection**: Cannot distinguish class-level from object-level

### Unistructural (Level 2)
- **Manifestation**: Can use either static or instance methods but not both together
- **NM Support**: Shows one level at a time
- **Detection**: Uses patterns mechanically without understanding

### Multistructural (Level 3)
- **Manifestation**: Understands static and instance separately but not their relationship
- **NM Support**: Shows both levels but student doesn't see how they interact
- **Detection**: Doesn't understand when to use which

### Relational (Level 4)
- **Manifestation**: Understands class vs instance distinction, factory patterns
- **NM Support**: Shows how static methods create instances, class-level state
- **Detection**: Can design appropriate use of static vs instance

### Extended Abstract (Level 5)
- **Manifestation**: Designs class hierarchies, singleton patterns, metaclass concepts
- **NM Support**: Provides data for design pattern implementation
- **Detection**: Can discuss design patterns involving static/instance trade-offs

---

## Class Syntax Model → SOLO Progression

### Prestructural (Level 1)
- **Manifestation**: Treats classes as entirely new mechanism, not related to prototypes
- **NM Support**: Shows desugaring to prototype-based code
- **Detection**: Confused when class behavior differs from expectations

### Unistructural (Level 2)
- **Manifestation**: Can write basic classes but doesn't understand what they become
- **NM Support**: Shows single class → prototype translation
- **Detection**: Uses class syntax mechanically without deeper understanding

### Multistructural (Level 3)
- **Manifestation**: Knows class features (private, static) but not how they relate to prototypes
- **NM Support**: Shows multiple features but not their implementation
- **Detection**: Can list class features but can't predict behavior edge cases

### Relational (Level 4)
- **Manifestation**: Understands class as sugar, knows when features are unique vs sugared
- **NM Support**: Shows which class features translate and which are unique
- **Detection**: Can choose between class and prototype syntax appropriately

### Extended Abstract (Level 5)
- **Manifestation**: Discusses language design trade-offs, transpilation implications
- **NM Support**: Provides data for meta-level reasoning about syntax choices
- **Detection**: Can explain why JavaScript added classes, when to avoid them

---

## This Binding Model → SOLO Progression

### Prestructural (Level 1)
- **Manifestation**: Believes `this` refers to the function or its lexical scope
- **NM Support**: Shows explicit `this` value at each call site
- **Detection**: Completely confused by `this` behavior

### Unistructural (Level 2)
- **Manifestation**: Knows `this` exists but only understands one binding rule
- **NM Support**: Shows single binding pattern (e.g., method calls)
- **Detection**: Can use `this` in one context but fails in others

### Multistructural (Level 3)
- **Manifestation**: Knows multiple binding rules but applies them inconsistently
- **NM Support**: Shows different binding rules but student can't predict which applies
- **Detection**: Confused by lost binding, arrow functions, explicit binding

### Relational (Level 4)
- **Manifestation**: Understands all four binding rules and their precedence
- **NM Support**: Shows binding determination at call time
- **Detection**: Can predict `this` value in complex scenarios

### Extended Abstract (Level 5)
- **Manifestation**: Designs APIs considering `this` binding, chooses arrows vs regular appropriately
- **NM Support**: Provides data for API design decisions
- **Detection**: Can discuss `this` design patterns, framework conventions

---

## Operator Evaluation Model → SOLO Progression

### Prestructural (Level 1)
- **Manifestation**: Expects left-to-right evaluation regardless of precedence
- **NM Support**: Shows explicit evaluation order
- **Detection**: Surprised by `2 + 3 * 4` result

### Unistructural (Level 2)
- **Manifestation**: Memorizes precedence for one or two operators
- **NM Support**: Shows single operator precedence
- **Detection**: Can handle simple expressions but not complex ones

### Multistructural (Level 3)
- **Manifestation**: Knows multiple precedence rules but applies manually/slowly
- **NM Support**: Shows multiple precedence levels but student must work through each
- **Detection**: Can solve with effort but no intuition

### Relational (Level 4)
- **Manifestation**: Intuitively understands precedence, associativity, short-circuiting
- **NM Support**: Shows complete evaluation tree
- **Detection**: Can predict complex expression results instantly

### Extended Abstract (Level 5)
- **Manifestation**: Uses precedence for code golf, optimizes with short-circuiting
- **NM Support**: Provides data for optimization decisions
- **Detection**: Can discuss operator overloading design, DSL creation

---

## Type Coercion Model → SOLO Progression

### Prestructural (Level 1)
- **Manifestation**: Believes type conversions are random or "JavaScript is broken"
- **NM Support**: Shows explicit coercion steps
- **Detection**: Cannot predict `'5' + 3` vs `'5' - 3`

### Unistructural (Level 2)
- **Manifestation**: Memorizes one or two coercion rules
- **NM Support**: Shows single coercion type (e.g., string concatenation)
- **Detection**: Can handle one operator but not others

### Multistructural (Level 3)
- **Manifestation**: Knows multiple coercion rules but applies inconsistently
- **NM Support**: Shows multiple coercions but student doesn't see patterns
- **Detection**: Surprised by complex coercion scenarios

### Relational (Level 4)
- **Manifestation**: Understands ToPrimitive, ToNumber, ToString algorithms
- **NM Support**: Shows coercion algorithm steps
- **Detection**: Can predict coercion results, explain `==` vs `===`

### Extended Abstract (Level 5)
- **Manifestation**: Chooses explicit over implicit coercion, writes safer code
- **NM Support**: Provides data for code quality decisions
- **Detection**: Can discuss language design, why coercion exists

---

## Reference vs. Value Model → SOLO Progression

### Prestructural (Level 1)
- **Manifestation**: Expects all assignment to copy or all to share
- **NM Support**: Shows explicit value vs reference copying
- **Detection**: Completely confused by mutation behavior

### Unistructural (Level 2)
- **Manifestation**: Knows primitives and objects differ but not the mechanism
- **NM Support**: Shows one assignment type at a time
- **Detection**: Can work with primitives OR objects but not both

### Multistructural (Level 3)
- **Manifestation**: Understands difference but confuses mutation vs reassignment
- **NM Support**: Shows both but student doesn't distinguish operations
- **Detection**: Confused when `obj = {}` doesn't affect other references

### Relational (Level 4)
- **Manifestation**: Understands value/reference semantics, mutation vs reassignment
- **NM Support**: Shows parameter passing, reference sharing
- **Detection**: Can predict all assignment and mutation scenarios

### Extended Abstract (Level 5)
- **Manifestation**: Designs immutable architectures, chooses copy strategies appropriately
- **NM Support**: Provides data for architectural decisions
- **Detection**: Can discuss immutability patterns, deep vs shallow copy trade-offs

---

## Summary Table: NMs Most Critical at Each SOLO Level

| SOLO Level | Critical Notional Machines | Why |
|------------|---------------------------|-----|
| **Prestructural → Unistructural** | Memory Model, Call Stack | Concrete visualization needed to escape complete confusion |
| **Unistructural → Multistructural** | Operator Evaluation, Type Coercion | Learning multiple separate concepts |
| **Multistructural → Relational** | Scope Chain, Event Loop, Prototype Chain | Understanding how concepts integrate |
| **Relational → Extended Abstract** | Class Syntax, This Binding, Static vs Instance | Meta-level understanding of design choices |

## Teaching Implications

**For beginners (Pre → Uni → Multi)**:
- Focus on Memory Model and Call Stack first (concrete foundations)
- Add Reference vs. Value when ready for distinction
- Keep other NMs simple (single aspect at a time)

**For intermediate (Multi → Relational)**:
- Emphasize Scope Chain (closure integration)
- Introduce Event Loop (async integration)
- Add Prototype Chain (inheritance integration)

**For advanced (Relational → Extended Abstract)**:
- Discuss Class Syntax vs Prototypes (design choices)
- Explore This Binding (API design implications)
- Analyze Coercion patterns (language design trade-offs)
