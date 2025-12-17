# Assessment Use Cases by Feedback Type

**Step 4 Deliverable**: Organize assessment by feedback specificity and pedagogical approach

**Who this serves**:
- **Educators**: Design feedback strategies matching learning goals
- **Tool developers**: Implement appropriate feedback generation
- **Researchers**: Study feedback effectiveness

---

## Introduction

Feedback specificity levels (Keuning et al. 2019):

1. **Generic**: "Incorrect" (lowest value)
2. **Location**: "Error on line 5"
3. **Type**: "ReferenceError"
4. **Misconception**: "Reading before initialization" (high value)
5. **Corrective**: "Add `let sum = 0` before loop" (highest value, but risks learned helplessness)

**Research finding**: Level 4 (misconception diagnosis) optimal - specific enough to teach, vague enough to require thinking.

---

## 1. Corrective Feedback

**What**: Direct error identification + specific fix suggestion

**When appropriate**: Procedural skills, syntax, conventions

**When inappropriate**: Conceptual understanding, design decisions

### Use Cases

**Syntax error corrections**
- What: Parse error → Exact fix suggestion
- Example: `if (x = 5)` → "Assignment in condition. Use `===` for comparison"
- Why works: Syntax is procedural, one correct answer

**Off-by-one loop fixes**
- What: Detect iteration mismatch → Show correct bounds
- Example: `for (let i = 0; i <= arr.length; i++)` → "Use `i < arr.length` to avoid out-of-bounds"
- Why works: Common pattern, specific fix

**Variable initialization**
- What: Uninitialized read → Suggest initialization
- Example: `sum += arr[i]` without `let sum = 0` → "Initialize sum to 0 before loop"
- Why works: Clear procedural fix

**API modernization**
- What: Old pattern → Suggest modern equivalent
- Example: Manual loop → "Consider `Array.reduce()` for accumulation"
- Why works: Objective improvement, teaches idioms

### Trade-offs

**Advantages**:
- Fast correction
- Prevents frustration
- Teaches conventions

**Disadvantages**:
- Learned helplessness if overused
- Doesn't build debugging skill
- Misses conceptual understanding

**Best practice**: Corrective for syntax/conventions, not for logic/design

---

## 2. Explanatory Feedback

**What**: Explains WHY code behaves as it does, using correct mental models

**When appropriate**: Conceptual misconceptions, model building, "aha" moments

**When inappropriate**: Simple typos, already-understood concepts

### Use Cases

**Type coercion explanations**
- What: Unexpected result → Explain coercion rules
- Example: `"5" + 3 = "53"` → "String + number: JavaScript converts number to string via ToString, then concatenates"
- Why works: Builds mental model of type system

**Scope chain clarification**
- What: Variable resolution confusion → Explain scope lookup
- Example: Closure captures wrong variable → "Closures capture references not values. Loop completes before callbacks run, so all closures see final `i`"
- Why works: Addresses root misconception

**Event loop mechanics**
- What: Async timing surprise → Explain queue phases
- Example: Promise resolves before setTimeout → "Microtasks (Promises) drain before macrotasks (setTimeout) in event loop"
- Why works: Makes invisible execution model visible

**Memory model (reference vs value)**
- What: Unexpected aliasing → Explain stack/heap
- Example: `let b = a; b.x = 5` changes `a` → "Objects stored in heap. `b = a` copies reference, both point to same object"
- Why works: Fundamental understanding for all object code

### Trade-offs

**Advantages**:
- Builds correct mental models
- Transfers to novel situations
- "Why" not just "what"

**Disadvantages**:
- Can be overwhelming
- Requires prior knowledge
- May need multiple exposures

**Best practice**: Progressive depth - simple explanation first, detailed on request

---

## 3. Scaffolded/Hint-Based Feedback

**What**: Multi-level hints from general → specific, student chooses depth

**When appropriate**: Problem-solving, debugging, threshold liminal states

**When inappropriate**: When student needs answer immediately (deadlines, high stress)

### Use Cases

**Progressive hint sequences**
- Level 1 (Conceptual): "This is an accumulation problem"
- Level 2 (Strategic): "You need a variable to track the running total"
- Level 3 (Tactical): "Initialize a sum variable to 0 before the loop"
- Level 4 (Code-specific): "Add `let sum = 0;` before line 5"

**Debugging scaffolds**
- Level 1 (Locate): "The bug is in the loop body"
- Level 2 (Identify): "Check how you're updating the accumulator"
- Level 3 (Diagnose): "You're reassigning instead of adding"
- Level 4 (Fix): "Change `=` to `+=` on line 7"

**Threshold concept scaffolds (Closures)**
- Level 1 (Awareness): "Closures capture their environment"
- Level 2 (Mechanism): "They capture references, not values"
- Level 3 (Application): "In loops with `var`, all closures share same `i` reference"
- Level 4 (Solution): "Use `let` for block scope, or immediately-invoked function to capture value"

**Metacognitive prompts**
- "What did you expect to happen?"
- "What actually happened?"
- "Why might that difference occur?"
- "What concept might explain this behavior?"

### Trade-offs

**Advantages**:
- Student controls depth
- Maintains challenge
- Builds self-regulation

**Disadvantages**:
- Requires hint design effort
- Students may skip to deepest
- Slower than direct answer

**Best practice**: Force viewing each level before revealing next (progressive disclosure)

---

## 4. Adaptive Feedback

**What**: Feedback adjusts to student level, state, history

**When appropriate**: Personalized learning, threshold states, diverse classrooms

**When inappropriate**: Standardized testing, comparison-based grading

### Use Cases

**Taxonomy-level adaptation**
- Unistructural student + scope error → Basic explanation with examples
- Relational student + scope error → Integration prompt: "How does this relate to closures?"
- Extended Abstract → Transfer challenge: "How would module scope differ?"

**Threshold state adaptation**
- Pre-threshold (async): "Event loop not yet covered, focus on callback syntax"
- Liminal (async): "You're building toward understanding - confusion normal. Notice microtask vs macrotask"
- Post-threshold (async): Minimal feedback, assume understanding

**Misconception persistence adaptation**
- First occurrence: Full explanation
- Second occurrence: "Remember uninitialized variables don't auto-zero?"
- Third+ occurrence: "This is the variable initialization pattern we've discussed. Need review?"

**Prior error pattern adaptation**
- Common student error (var scope): Detailed explanation
- Rare student error (generator syntax): Brief note, assume typo

**Time-based adaptation**
- Early semester: More corrective, build foundations
- Mid semester: More explanatory, build models
- Late semester: Minimal hints, expect mastery

### Trade-offs

**Advantages**:
- Personalized to needs
- Efficient (right amount)
- Respects individual differences

**Disadvantages**:
- Requires sophisticated student modeling
- May misclassify state
- Fairness concerns (different students, different feedback)

**Best practice**: Adapt amount, not correctness. All students get accurate information.

---

## 5. Socratic/Question-Based Feedback

**What**: Questions that guide discovery rather than telling answers

**When appropriate**: Conceptual development, threshold crossing, reflection

**When inappropriate**: Urgent syntax fixes, time pressure

### Use Cases

**Prediction questions (POE)**
- "What do you predict this code will output?"
- "Why do you think that?"
- Execute → "Why was your prediction different from the result?"

**Comparison questions**
- "What's different between the working and broken versions?"
- "When does this pattern succeed vs fail?"
- "How does `let` behavior differ from `var` here?"

**Explanation questions**
- "In your own words, what is this function doing?"
- "How does the event loop decide what runs next?"
- "Why does changing `=` to `===` fix the bug?"

**Transfer questions**
- "Where else might you encounter this pattern?"
- "How would this work with async code?"
- "What real-world problem does this solve?"

**Metacognitive questions**
- "What's confusing about this?"
- "What have you tried?"
- "What would help clarify your understanding?"

### Trade-offs

**Advantages**:
- Deep engagement
- Metacognition development
- Student-discovered knowledge more durable

**Disadvantages**:
- Time-intensive
- Requires instructor availability (or sophisticated automation)
- May frustrate students wanting quick answers

**Best practice**: Use for threshold concepts, not procedural fixes

---

## 6. Comparative Feedback

**What**: Show contrast between student code and alternatives (reference, peer, improved)

**When appropriate**: Quality improvement, idiom learning, multiple valid solutions

**When inappropriate**: When correct answer is singular

### Use Cases

**Reference solution comparison**
- What: Student's working code vs elegant reference
- Why: Teaches quality beyond correctness
- Example: Manual loop vs `.reduce()`, both work

**Peer code comparison (anonymized)**
- What: Show alternative approaches from classmates
- Why: Multiple valid solutions, different trade-offs
- Example: Iterative vs recursive solutions side-by-side

**Before/after refactoring**
- What: Student's code vs improved version
- Why: Concrete quality improvement demonstration
- Example: Complex nested conditionals → Guard clauses + early returns

**Minimal pairs (misconception targeting)**
- What: Nearly identical code, one works, one doesn't
- Why: Isolates specific misconception
- Example: `var i` vs `let i` in loop closure - single change, different behavior

### Trade-offs

**Advantages**:
- Concrete learning from differences
- Shows quality dimensions
- Less prescriptive than corrective

**Disadvantages**:
- Requires good reference solutions
- May demoralize if gap too large
- Comparison can feel judgmental

**Best practice**: Frame as "alternative approaches" not "better/worse"

---

## Cross-Type Patterns

| Assessment Need | Corrective | Explanatory | Scaffolded | Adaptive | Socratic | Comparative |
|-----------------|------------|-------------|------------|----------|----------|-------------|
| **Syntax errors** | ✓ primary | | | ✓ | | |
| **Misconceptions** | | ✓ primary | ✓ | ✓ | ✓ | ✓ |
| **Threshold liminal** | | ✓ | ✓ primary | ✓ | ✓ | |
| **Quality improvement** | ✓ API | | | | | ✓ primary |
| **Debugging** | | ✓ | ✓ primary | | ✓ | ✓ |
| **NM understanding** | | ✓ primary | | | ✓ | ✓ |

---

## Design Principles

**Match feedback type to learning goal**:
- Procedural skills → Corrective
- Conceptual understanding → Explanatory
- Problem-solving → Scaffolded
- Personalization → Adaptive
- Deep thinking → Socratic
- Quality awareness → Comparative

**Progressive specificity**:
- Start vague (learning opportunity)
- Increase specificity with struggle
- Don't jump to corrective immediately

**Respect student autonomy**:
- Offer hints, don't force
- Allow requesting more/less detail
- Enable opting out of adaptive

**Avoid over-specification**:
- Level 4 (misconception) usually optimal
- Level 5 (corrective) risks dependence
- Generic feedback wastes opportunity

---

## References

- Keuning, H., Jeuring, J., & Heeren, B. (2019). Feedback specificity levels. *ACM TOCE*, 19(1).

---

## Summary

**Corrective**: Direct fixes for procedural skills
**Explanatory**: Mental model building for concepts
**Scaffolded**: Progressive hints for problem-solving
**Adaptive**: Personalized to student state
**Socratic**: Questions driving discovery
**Comparative**: Learn from contrasts

**Universal principle**: More specific isn't always better. Optimal feedback specific enough to teach, vague enough to require thinking.
