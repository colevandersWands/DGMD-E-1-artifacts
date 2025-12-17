# Educational Patterns Across Notional Machines

**Purpose**: Identify common pedagogical patterns that recur across different notional machines, showing how similar educational goals are achieved in different contexts.

---

## Pattern 1: Progressive Disclosure

**Pattern**: Start with simplified view, gradually reveal complexity as student advances.

**Appears in:**
- **Call Stack**: Begin with function names only → add parameters → add local variables → add return values
- **Memory Model**: Show primitives only → add object references → add garbage collection
- **Event Loop**: Synchronous code only → single setTimeout → promises → mixed async
- **Scope Chain**: Immediate scope only → parent scopes → full chain with closures
- **Prototype Chain**: Object → immediate prototype → full chain
- **Operator Evaluation**: PEMDAS only → all operators → associativity → short-circuit

**Educational Goal**: Prevent cognitive overload, build foundation before complexity.

**Tool Implementation Pattern**:
- Maintain detailed internal model
- Filter display based on student level (detected or configured)
- Provide "show more detail" option for curious students

---

## Pattern 2: Predict-Observe-Explain

**Pattern**: Student predicts outcome → tool shows actual execution → student explains discrepancy.

**Appears in:**
- **Call Stack**: Predict stack state at breakpoint → observe actual → explain if wrong
- **Memory Model**: Draw expected memory layout → observe actual → explain references
- **Event Loop**: Predict async output order → observe actual → explain queue priorities
- **Scope Chain**: Identify variable source → observe resolution → explain chain walking
- **Prototype Chain**: Predict property source → observe lookup → explain chain
- **This Binding**: Predict `this` value → observe actual → explain binding rule
- **Operator Evaluation**: Calculate expression → observe result → explain precedence
- **Type Coercion**: Predict coerced result → observe conversion → explain algorithm

**Educational Goal**: Active learning, surface misconceptions, build accurate mental models.

**Tool Implementation Pattern**:
- Collect prediction before execution
- Run execution and compare
- Highlight discrepancies
- Prompt explanation or provide targeted hint

---

## Pattern 3: Contrast Learning

**Pattern**: Show two similar examples with key difference, highlight what changed.

**Appears in:**
- **Call Stack**: Iteration vs recursion for same problem
- **Memory Model**: Primitive assignment vs object assignment
- **Event Loop**: setTimeout vs Promise.resolve for same delay
- **Scope Chain**: `var` vs `let` in loop closures
- **Prototype Chain**: Class inheritance vs prototype chain
- **Static vs Instance**: Factory method (static) vs constructor (instance)
- **Class Syntax**: Class vs constructor function for same behavior
- **This Binding**: Regular function vs arrow function in callback
- **Operator Evaluation**: `&&` short-circuit vs bitwise `&` full evaluation
- **Type Coercion**: `==` vs `===` for same comparison
- **Reference vs Value**: Mutation vs reassignment

**Educational Goal**: Highlight critical differences through minimal pairs.

**Tool Implementation Pattern**:
- Side-by-side execution visualization
- Synchronized stepping through both
- Highlight where behaviors diverge
- Annotate with "key difference" markers

---

## Pattern 4: Misconception Confrontation

**Pattern**: Generate code that breaks student's incorrect mental model, force accommodation.

**Appears in:**
- **Call Stack**: If student thinks "functions run in definition order" → show out-of-order calls
- **Memory Model**: If student thinks "assignment copies objects" → show shared mutation
- **Event Loop**: If student thinks "setTimeout(fn,0) immediate" → show it runs last
- **Scope Chain**: If student thinks "inner can't access outer" → demonstrate closure
- **Prototype Chain**: If student thinks "objects copy from prototypes" → change prototype after creation
- **This Binding**: If student thinks "`this` is lexical" → show lost binding
- **Type Coercion**: If student thinks "coercion is random" → show systematic rules

**Educational Goal**: Create cognitive conflict forcing mental model revision.

**Tool Implementation Pattern**:
- Detect misconception from prediction patterns
- Generate or select counterexample code
- Run execution highlighting the conflict
- Provide explanation of correct model

---

## Pattern 5: Layered Abstraction

**Pattern**: Multiple notional machines at different abstraction levels for same concept.

**Appears in:**
- **Functions**: Call Stack (control flow) → Scope Chain (data access) → Memory (storage)
- **Objects**: Memory Model (references) → Prototype Chain (inheritance) → Class Syntax (sugar)
- **OOP**: Prototype Chain (mechanism) → Static vs Instance (patterns) → Class Syntax (syntax)
- **Async**: Event Loop (mechanics) → Call Stack (sync/async boundary) → Memory (closure capture)
- **Context**: This Binding (rules) → Scope Chain (lexical vs dynamic) → Call Stack (execution context)

**Educational Goal**: Support understanding at multiple levels, enable progression from concrete to abstract.

**Tool Implementation Pattern**:
- Provide "zoom in/out" controls
- Link between abstraction levels
- Show how high-level concepts map to low-level execution

---

## Pattern 6: Time Travel Debugging

**Pattern**: Allow navigation backward and forward through execution timeline.

**Appears in:**
- **Call Stack**: Step back to previous function call
- **Memory Model**: Rewind to see previous variable values
- **Event Loop**: Replay event loop ticks
- **Scope Chain**: Navigate scope creation/destruction
- **All NMs**: Scrub timeline to any execution point

**Educational Goal**: Explore causality, understand state evolution, debug mentally.

**Tool Implementation Pattern**:
- Record complete execution trace
- Allow bidirectional stepping
- Maintain all notional machine states at each step
- Update visualizations as timeline position changes

---

## Pattern 7: Question-Driven Exploration

**Pattern**: Tool asks targeted questions to guide exploration and assess understanding.

**Appears in:**
- **Call Stack**: "Which function will execute next?" "What will the return value be?"
- **Memory Model**: "What happens if we modify obj2.x?" "Where is this variable stored?"
- **Event Loop**: "When will this callback run?" "What's in the microtask queue now?"
- **Scope Chain**: "Which scope provides this variable?" "What does this closure capture?"
- **Prototype Chain**: "Where is this method defined?" "What happens if we change Animal.prototype?"
- **All NMs**: Socratic questioning to lead to insight

**Educational Goal**: Scaffold thinking process, promote active reasoning, assess comprehension.

**Tool Implementation Pattern**:
- Generate questions based on current code and execution state
- Validate answers against actual execution
- Provide hints if wrong
- Track question performance for assessment

---

## Pattern 8: Pattern Recognition Highlighting

**Pattern**: Automatically identify and highlight recurring patterns in code.

**Appears in:**
- **Call Stack**: Highlight recursive patterns, call-return pairs
- **Memory Model**: Highlight shared references, garbage collection opportunities
- **Event Loop**: Highlight async patterns (Promise chains, async/await)
- **Scope Chain**: Highlight closure creation, module patterns
- **Prototype Chain**: Highlight inheritance patterns, delegation
- **Static vs Instance**: Highlight factory patterns, singleton patterns
- **Operator Evaluation**: Highlight guard patterns (`x && x.prop`), default patterns (`x || default`)

**Educational Goal**: Help students recognize common idioms and patterns.

**Tool Implementation Pattern**:
- Static analysis to identify patterns
- Dynamic analysis to confirm patterns during execution
- Annotate code with pattern names
- Link to pattern documentation/examples

---

## Pattern 9: Multi-Modal Representation

**Pattern**: Present same information through multiple representations (text, diagram, animation).

**Appears in:**
- **Call Stack**: List (text), tree (diagram), timeline (animation)
- **Memory Model**: Table (text), boxes/arrows (diagram), state transitions (animation)
- **Event Loop**: Queue list (text), circular diagram, tick-by-tick animation
- **All NMs**: Support visual, textual, and animated modes

**Educational Goal**: Support different learning styles, reinforce through multiple channels.

**Tool Implementation Pattern**:
- Maintain single internal model
- Render to multiple views simultaneously
- Synchronize across views (hover in one highlights in others)
- Allow view preferences

---

## Pattern 10: Scaffolded Independence

**Pattern**: Gradually reduce support as student demonstrates competence.

**Appears in:**
- **All NMs**:
  - Initially: Full automatic visualization
  - Then: Student must request specific views
  - Then: Student must predict before seeing
  - Finally: Student works without visualization, uses only for verification

**Educational Goal**: Move from guided practice to independent application.

**Tool Implementation Pattern**:
- Track student accuracy over time
- Adapt support level based on performance
- Gradually require more student initiative
- Maintain option to re-enable support if needed

---

## Pattern 11: Error-Driven Learning

**Pattern**: Use execution errors as teaching moments, not just failures.

**Appears in:**
- **Call Stack**: Stack overflow → explain recursion limits, base cases
- **Memory Model**: Memory leak patterns → explain reference retention
- **Event Loop**: Unhandled promise rejection → explain error propagation
- **Scope Chain**: ReferenceError → explain scope boundaries, TDZ
- **Prototype Chain**: TypeError on undefined → explain chain termination
- **This Binding**: `this` undefined → explain lost binding, strict mode
- **Type Coercion**: Unexpected NaN → explain type conversion rules

**Educational Goal**: Transform frustration into learning opportunity.

**Tool Implementation Pattern**:
- Detect errors during execution
- Annotate with relevant notional machine explanation
- Show what led to error (trace backward)
- Suggest fix patterns

---

## Pattern 12: Comparative Diagnosis

**Pattern**: Compare student's code to reference solutions using notional machines.

**Appears in:**
- **Call Stack**: Compare call sequences (iteration vs recursion approaches)
- **Memory Model**: Compare memory efficiency (copying vs sharing)
- **Event Loop**: Compare async patterns (callbacks vs promises vs async/await)
- **Scope Chain**: Compare closure usage (necessary vs unnecessary captures)
- **Prototype Chain**: Compare inheritance depths (composition vs deep chains)
- **All NMs**: "Your approach vs expert approach" comparison

**Educational Goal**: Learn from differences, understand trade-offs.

**Tool Implementation Pattern**:
- Run both student and reference code
- Collect notional machine traces for both
- Highlight differences in execution patterns
- Explain implications of differences

---

## Cross-Cutting Pattern Combinations

Some pedagogical patterns combine multiple notional machines:

### Integrated Debugging Pattern
Combines: Call Stack + Memory + Scope + This Binding
- Show complete execution context at breakpoint
- Student can inspect all four NMs simultaneously
- Navigate between NMs while maintaining execution state

### Performance Analysis Pattern
Combines: Call Stack + Memory + Event Loop
- Count function calls (stack)
- Track memory allocations (memory)
- Measure async delays (event loop)
- Identify bottlenecks across all three

### OOP Comprehension Pattern
Combines: Prototype Chain + Static/Instance + Class Syntax + This Binding
- Show complete object-oriented execution
- Relate class syntax to prototype mechanics
- Track `this` through method calls
- Distinguish class-level from instance-level

### Async Closure Pattern
Combines: Event Loop + Scope Chain + Memory
- Show callback registration and queuing (event loop)
- Demonstrate scope capture (scope chain)
- Track closure memory retention (memory model)

---

## Pattern Selection Guide

**For beginners** (Prestructural → Unistructural):
- Progressive Disclosure
- Multi-Modal Representation
- Error-Driven Learning

**For intermediate** (Unistructural → Multistructural):
- Predict-Observe-Explain
- Contrast Learning
- Pattern Recognition Highlighting

**For advancing** (Multistructural → Relational):
- Misconception Confrontation
- Layered Abstraction
- Integrated Debugging

**For advanced** (Relational → Extended Abstract):
- Time Travel Debugging
- Comparative Diagnosis
- Scaffolded Independence (reduced support)

---

## Implementation Priority

**High priority** (enable core learning):
1. Predict-Observe-Explain (active learning foundation)
2. Progressive Disclosure (manage complexity)
3. Error-Driven Learning (transform failures)
4. Contrast Learning (highlight differences)

**Medium priority** (enhance learning):
5. Misconception Confrontation (force accommodation)
6. Multi-Modal Representation (multiple learning styles)
7. Question-Driven Exploration (scaffold thinking)
8. Pattern Recognition (build expertise)

**Lower priority** (advanced features):
9. Time Travel Debugging (nice but complex)
10. Layered Abstraction (for sophisticated learners)
11. Comparative Diagnosis (requires reference solutions)
12. Scaffolded Independence (long-term adaptation)
