# Progressive Disclosure in Learning Tools

How educational tools scaffold complexity through strategic revelation of detail and concepts.

## Overview

Progressive disclosure is the design principle of revealing complexity gradually as learners are ready. This document presents patterns for scaffolding complexity in programming learning tools, aligned with cognitive development theories.

## Core Principle

**Progressive Disclosure**: Show simple first, reveal complexity incrementally as learner progresses

**Cognitive Foundation**: Aligns with Zone of Proximal Development (Vygotsky), cognitive load theory, and scaffolding pedagogy

**Benefits**:
- Prevents overwhelm (manages cognitive load)
- Builds foundation before complexity
- Maintains motivation (early success)
- Enables depth when ready (not prematurely)

## Five Disclosure Dimensions

### Dimension 1: Execution Granularity (Micro ← → Meso ← → Macro)

**Level 1 (Macro)**: Program-level behavior
- "This function calculates sum"
- "This uses iteration pattern"
- No execution details shown

**Level 2 (Meso)**: Statement-level execution
- Line-by-line stepping
- Function call/return visibility
- Variable value changes

**Level 3 (Micro)**: Expression-level details
- Operator evaluation order
- Type coercion steps
- Sub-expression results

**Progression**:
```
Week 1-2: Macro (program behavior overview)
Week 3-8: Meso (statement stepping, standard granularity)
Week 9+: Micro (expression details when debugging coercion bugs)
```

**Tool Implementation**:
- Collapsible execution traces (expand for detail)
- Granularity slider (user controls detail level)
- Automatic adjustment (show more detail when student confused, less when proficient)

**Example (Python Tutor)**:
- Default: Statement-level stepping (meso)
- Option: "Show expression evaluation" (micro)
- Summary view: Function calls only (macro)

### Dimension 2: Notional Machine Complexity (Simple NMs → Complex NMs)

**Level 1 (Foundation NMs)**: Basic execution model
- Memory Model (variables store values)
- Call Stack (functions execute LIFO)
- Operator Evaluation (precedence, order)

**Level 2 (Execution NMs)**: Control flow and scope
- Scope Chain (lexical scope, closures)
- Control Flow (loops, conditionals)
- Reference vs. Value (mutation semantics)

**Level 3 (Advanced NMs)**: Async and OOP
- Event Loop (async execution)
- Prototype Chain (delegation inheritance)
- This Binding (dynamic context)
- Creation/Execution Phase (hoisting)

**Progression**:
```
Months 1-3: Foundation (Memory, Call Stack, Operators)
Months 4-8: Execution (Scope, Control Flow, References)
Months 9+: Advanced (Event Loop, Prototypes, This, Hoisting)
```

**Tool Implementation**:
- Teach NMs one at a time (systematic progression)
- Visualization shows only taught NMs initially
- Unlock advanced NMs as foundation solidifies

**Example**:
- Week 1: Visualize only variables and call stack
- Week 5: Add scope chain visualization
- Week 10: Add event loop visualization

**Research Alignment**: Sorva (2013) recommends explicit NM learning objectives - progressive disclosure sequences them

### Dimension 3: Language Features (Core → Edge Cases → Advanced)

**Level 1 (Core Features)**: Fundamental syntax
- Variables (let, const)
- Functions (basic declarations)
- Conditionals (if/else)
- Loops (for, while)
- Arrays (basic operations)

**Level 2 (Common Patterns)**: Frequently-used features
- Objects (properties, methods)
- Array methods (map, filter, reduce)
- Arrow functions
- Template literals
- Destructuring

**Level 3 (Edge Cases & Advanced)**: Complex/rare features
- var hoisting (prefer let/const)
- this binding edge cases
- Prototype manipulation
- Generators
- Proxies

**Progression**:
```
Months 1-2: Core features only
Months 3-6: Common patterns introduced
Months 7+: Edge cases as encountered
```

**Tool Implementation**:
- Examples/exercises use only taught features
- Warnings when student uses untaught feature ("Prototypes not covered yet")
- Unlockable content (advanced features accessible after prerequisites)

**Example**:
- Don't teach var until students master let/const
- Don't teach prototypes until students understand objects
- Edge cases taught when students encounter confusion, not proactively

### Dimension 4: Error Complexity (Syntax → Logic → Conceptual)

**Level 1 (Syntax Errors)**: Immediate, concrete errors
- Missing semicolon, parenthesis
- Typos in keywords
- Incorrect operators

**Level 2 (Logic Errors)**: Runtime errors
- Off-by-one in loops
- Incorrect conditionals
- Wrong function calls

**Level 3 (Conceptual Errors)**: Mental model errors
- Closure bugs (shared variable in loop)
- Reference bugs (unintended mutation)
- Async bugs (race conditions)
- Type coercion surprises

**Progression**:
```
Month 1: Syntax errors (CodeWrite: simple fixes)
Months 2-4: Logic errors (debugging practice)
Months 5+: Conceptual errors (NM-related bugs)
```

**Tool Implementation**:
- Curated buggy code progressing in complexity
- Error messages adapt to student level (simple → detailed explanations)
- Conceptual errors introduced only after NM taught

**Example (CodeWrite)**:
- Week 1 exercises: Syntax errors only
- Week 3 exercises: Logic errors
- Week 8 exercises: Closure bugs (after scope chain NM taught)

### Dimension 5: Assessment Criteria (Correctness → Quality → Design)

**Level 1 (Functional Correctness)**: Does it work?
- Test cases pass
- No runtime errors
- Produces expected output

**Level 2 (Code Quality)**: Is it well-written?
- Meaningful naming
- Appropriate complexity
- Clear structure
- No code smells

**Level 3 (Design Quality)**: Is it well-designed?
- Design patterns
- Abstraction choices
- Scalability
- Maintainability

**Progression**:
```
Months 1-3: Correctness only (test passing)
Months 4-8: Quality introduced (naming, structure)
Months 9+: Design assessed (patterns, architecture)
```

**Tool Implementation** (QLCs):
- Early: Only correctness QLCs ("Does function return correct result?")
- Mid: Quality QLCs ("Are variable names descriptive?")
- Late: Design QLCs ("Is appropriate design pattern used?")

**Example**:
- Beginner assignment: "Write function that sums array" (correctness focus)
- Intermediate: "Write well-named, clear function" (quality focus)
- Advanced: "Design extensible calculator" (design focus)

## Progressive Disclosure Patterns

### Pattern 1: Fading Scaffolding

**Strategy**: Provide support initially, gradually remove it

**Levels**:
1. **Full Scaffolding**: Complete code with blanks to fill ("Fill in the condition")
2. **Partial Scaffolding**: Function skeleton provided, student implements body
3. **Minimal Scaffolding**: Only function signature provided
4. **No Scaffolding**: Student writes entire function

**Example Progression**:
```javascript
// Week 1: Fill blank
function sum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += __________; // Fill this
  }
  return total;
}

// Week 3: Complete body
function sum(arr) {
  // TODO: Calculate sum
}

// Week 5: Write entire function
// Write a function sum(arr) that returns sum of array elements
```

**Tool Support**: Exercise generator with scaffolding levels

**Research Context**: Scaffolding theory (Vygotsky, Bruner)

### Pattern 2: Layered Hints

**Strategy**: Progressive hints from general to specific

**Levels**:
1. **Conceptual Hint**: "Think about how to accumulate values"
2. **Strategic Hint**: "Use a loop and an accumulator variable"
3. **Tactical Hint**: "Initialize total = 0, then add each element"
4. **Code Hint**: "Use: total += arr[i]"

**Example**:
```
Student stuck on sum function:
[Request Hint 1] → "You need to accumulate values"
[Request Hint 2] → "Use a loop with a total variable"
[Request Hint 3] → "Initialize total to 0, add each element in loop"
[Request Hint 4] → Shows code: "total += arr[i]"
```

**Tool Support**: Hint systems with progressive disclosure (Rivers & Koedinger 2017)

**Benefit**: Students get minimum help needed, not maximum help available

### Pattern 3: Unlock Progression

**Strategy**: Features/tools unlock as prerequisites mastered

**Levels**:
1. **Locked**: Feature not yet accessible (grayed out)
2. **Unlocked**: Feature available after prerequisite
3. **Mastered**: Feature understood, next unlocks

**Example**:
```
✅ Variables (let, const) - Mastered
✅ Functions (basic) - Mastered
🔓 Scope Chain - Unlocked (ready to learn)
🔒 Closures - Locked (requires Scope Chain)
🔒 Event Loop - Locked (requires Closures + Async basics)
```

**Tool Support**: Learning management with prerequisite tracking

**Benefit**: Prevents overwhelming choice, guides learning path

### Pattern 4: On-Demand Detail

**Strategy**: Details hidden by default, revealed on request

**Levels**:
1. **Summary View**: High-level overview
2. **Expandable Sections**: Click to reveal details
3. **Full Detail**: All information visible

**Example (Execution Trace)**:
```
Function calls (summary):
  main() ▶

[Click to expand]

Function calls (expanded):
  main()
    ├─ calculateTotal(items)
    │  ├─ sumPrices(items) → 150
    │  └─ applyTax(150) → 165
    └─ formatCurrency(165) → "$165.00"
```

**Tool Support**: Collapsible UI, drill-down navigation

**Benefit**: See forest (summary) or trees (detail) as needed

### Pattern 5: Adaptive Disclosure

**Strategy**: Tool adjusts complexity based on student performance

**Mechanism**:
- Student struggling → show more detail, simpler explanations
- Student succeeding → show less detail, more complex challenges

**Example**:
```
Student gets 3 closure bugs wrong:
→ Tool shows more detailed scope chain visualization
→ Tool provides more scaffolded exercises
→ Tool offers more hints

Student gets 5 exercises right:
→ Tool hides some execution details
→ Tool provides less scaffolding
→ Tool offers harder challenges
```

**Tool Support**: Student modeling, adaptive learning systems

**Research Gap**: Limited research on adaptive disclosure in programming tools

## Alignment with Educational Frameworks

### SOLO Taxonomy Alignment

**Prestructural → Unistructural**: Show single examples, simple tools
**Unistructural → Multistructural**: Show multiple examples, more features
**Multistructural → Relational**: Reveal relationships, connections
**Relational → Extended Abstract**: Enable transfer, generalization

**Progressive Disclosure**: Match tool complexity to SOLO level

### Abstraction Transition Alignment

**Concrete**: Visual, tangible representations
**Symbolic**: Code with conceptual annotations
**Abstract**: Principles, patterns, transfer

**Progressive Disclosure**:
1. Start concrete (visualizations, diagrams)
2. Add symbolic (code examples with explanations)
3. Progress to abstract (design patterns, principles)

### Bloom's Taxonomy Alignment

**Remember → Understand**: Provide examples, simple explanations
**Understand → Apply**: Show application patterns, guided practice
**Apply → Analyze**: Reveal internal mechanisms, debugging tools
**Analyze → Evaluate**: Introduce quality criteria, QLCs
**Evaluate → Create**: Open-ended projects, design challenges

**Progressive Disclosure**: Scaffold from lower to higher cognitive levels

## Tool-Specific Disclosure Strategies

### Visualization Tools (Python Tutor, Jeliot)

**Disclosure Dimensions**:
1. **Granularity**: Start statement-level, add expression details later
2. **NMs**: Start call stack + memory, add scope chain, event loop later
3. **Complexity**: Simple examples first, complex code later

**Implementation**:
- Beginner mode: Show only variables and stack
- Intermediate mode: Add scope chain, references
- Advanced mode: Show event loop, prototypes, all NMs

### Debugging Tools (CodeWrite, Debuggers)

**Disclosure Dimensions**:
1. **Error Types**: Syntax → Logic → Conceptual
2. **Tool Features**: Basic stepping → Breakpoints → Watchpoints → Dynamic slicing
3. **Bug Complexity**: Simple fixes → Multi-step debugging → System-level issues

**Implementation**:
- Week 1: Only stepping, simple syntax bugs
- Week 5: Breakpoints, logic bugs
- Week 10: Watchpoints, dynamic slicing, conceptual bugs

### Assessment Tools (QLCs)

**Disclosure Dimensions**:
1. **Criteria**: Correctness → Quality → Design
2. **Feedback Detail**: Simple → Detailed → Multi-layered
3. **Assessment Scope**: Single function → Multi-function → Architecture

**Implementation**:
- Month 1: "Function works correctly" (binary pass/fail)
- Month 4: "Function works, but naming could improve" (quality feedback)
- Month 9: "Design doesn't scale well, consider strategy pattern" (design feedback)

### AI Tutoring Tools (CodeHelp, CodeAid)

**Disclosure Dimensions**:
1. **Explanation Depth**: Simple analogy → Detailed explanation → Technical depth
2. **Proactivity**: Reactive (answer questions) → Suggestive (offer explanations) → Proactive (detect confusion)
3. **Scaffolding**: High support → Medium → Minimal (productive struggle)

**Implementation**:
- Detect student level from questions/code
- Adapt explanation complexity to level
- Adjust scaffolding amount to performance

## Anti-Patterns (What NOT to Do)

### Anti-Pattern 1: Information Overload

**Problem**: Show everything immediately, overwhelming student

**Example**: Visualization shows call stack, heap, scope chain, event loop, prototype chain, this binding, hoisting, all expression details simultaneously for "hello world"

**Symptoms**: Student paralyzed, asks "What am I supposed to look at?"

**Solution**: Start simple, progressively reveal complexity

### Anti-Pattern 2: Premature Complexity

**Problem**: Introduce advanced concepts before foundation

**Example**: Teach event loop before students understand synchronous call stack

**Symptoms**: Student confused, builds incorrect mental models, frustrated

**Solution**: Establish prerequisites, unlock progression

### Anti-Pattern 3: Locked Forever

**Problem**: Complexity never revealed, student plateaus

**Example**: Tool always shows only beginner-level information, even for advanced students

**Symptoms**: Boredom, lack of growth, student seeks other resources

**Solution**: Progressive disclosure goes both ways - increase complexity as student grows

### Anti-Pattern 4: Abrupt Disclosure

**Problem**: Sudden jump from simple to complex without transition

**Example**: Week 1-4 very simple, Week 5 suddenly very complex

**Symptoms**: Overwhelm at transition point, dropout

**Solution**: Gradual, incremental complexity increases

### Anti-Pattern 5: Hidden Necessity

**Problem**: Hide information student actually needs

**Example**: Hide scope chain when teaching closures (scope chain is essential for closures)

**Symptoms**: Student can't understand concept without information, requests more detail

**Solution**: Disclose what's necessary for current learning objective, hide only truly unnecessary detail

## Implementation Checklist

When implementing progressive disclosure:

**Pedagogical Design**:
- [ ] Identified disclosure dimensions (granularity, NMs, features, errors, assessment)
- [ ] Defined progression levels (beginner → intermediate → advanced)
- [ ] Aligned with cognitive frameworks (SOLO, Bloom's, Abstraction Transition)
- [ ] Established prerequisites (what must be learned before what)

**Tool Design**:
- [ ] Default view is beginner-appropriate (not overwhelming)
- [ ] Complexity can increase (unlock, expand, adjust granularity)
- [ ] Transitions are scaffolded (not abrupt jumps)
- [ ] Student can access detail when needed (on-demand disclosure)

**Adaptive Features** (optional):
- [ ] Tool detects student level (performance, questions, code patterns)
- [ ] Tool adjusts disclosure automatically (more/less detail, scaffolding)
- [ ] Student can override (expert mode, full detail mode)

**UX Design**:
- [ ] Collapsed state is clear (summary visible, detail hidden)
- [ ] Expansion is obvious (clear affordance: "Click to expand")
- [ ] Expanded state is manageable (not overwhelming when revealed)
- [ ] Return to collapsed is easy (can re-hide detail)

## Research Backing

**Citations**:
- Progressive disclosure: Nielsen Norman Group (UX principle)
- Scaffolding: Vygotsky ZPD, Bruner scaffolding theory
- Cognitive load: Sweller cognitive load theory
- Tool research: Guo (2013), Xie (2019), Ben-Ari (2011)
- Adaptive learning: Rivers & Koedinger (2017), VanLehn (2011)
- Taxonomies: Biggs SOLO, Bloom's, Schulte Block Model

**Synthesis**: This document applies general progressive disclosure and scaffolding theory to programming learning tools specifically. Limited published research on progressive disclosure in programming tools - this is synthesis of pedagogy + UX + tool research.

---

**Related Documents**:
- Taxonomy support: [`lt-taxonomy-support.md`](./lt-taxonomy-support.md) (frameworks inform disclosure levels)
- Granularity categorization: [`categorization-by-granularity-level.md`](./categorization-by-granularity-level.md)
- Tool integration: [`tool-integration-patterns.md`](./tool-integration-patterns.md) (progressive tool complexity)
