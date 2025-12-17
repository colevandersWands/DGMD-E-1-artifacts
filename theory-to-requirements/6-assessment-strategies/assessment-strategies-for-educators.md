# Research-Based Assessment Strategies: Practitioner Guide

**Step 4 Deliverable**: Simplified introduction for educators

**Purpose**: Make research accessible without comprehensive theoretical background

**Not**: Comprehensive literature review (see Step 1-3 for that)
**Is**: Practical "what works and why" guide with actionable strategies

---

## Core Principle: Beyond "Tests Pass"

### The Problem

Traditional CS assessment:
```javascript
function sum(arr) { /* student code */ }

assert(sum([1,2,3]) === 6);  // PASS
assert(sum([])      === 0);  // PASS
// Grade: 100%
```

**Missing**:
- Does student understand WHY it works?
- Can they explain to others?
- Would they write quality code in practice?
- Are there misconceptions hidden by working code?

### The Solution

Multi-dimensional assessment:
1. **Correctness**: Does it work? (40%)
2. **Quality**: Is it well-written? (30%)
3. **Comprehension**: Can they explain it? (20%)
4. **Process**: How did they arrive at solution? (10%)

**Research backing**: Students can produce working code they don't comprehend (Ko 2019). Tests-pass isn't enough.

---

## Strategy 1: Assess the Code They Write (QLCs)

### What Research Shows

Lehtinen et al. (2023) demonstrated automated quality assessment at MOOC scale (thousands of students). Four dimensions:

1. **Naming**: Descriptive identifiers vs cryptic abbreviations
2. **API Usage**: Modern methods vs reinventing wheels
3. **Algorithm Choice**: Appropriate approach vs brute force
4. **Patterns**: Professional idioms vs anti-patterns

### How to Apply

**In assignments**:
- Grade correctness (does it work?) as baseline
- Add quality rubric (is it professional?)
- Provide quality feedback during development (not just final grade)

**Rubric template**:
```
Correctness (40%): Tests pass
Naming (20%): Descriptive, conventional, consistent
API (20%): Modern, appropriate, idiomatic
Algorithm (20%): Efficient, clear, maintainable
```

**Example quality feedback**:
- "Your loop works, but `.reduce()` is more idiomatic for accumulation"
- "Variable `x` could be `userCount` for self-documenting code"
- "Nested conditionals hard to read - consider guard clauses"

### Tool Support Needed

- Automated naming analysis
- API usage detection
- Complexity metrics
- Pattern matching

**Scalability**: Fully automated → Works for MOOCs

---

## Strategy 2: Assess the Mental Model (Notional Machines)

### What Research Shows

Students construct mental models of how code executes (Sorva 2013). Wrong models → Persistent bugs. Correct models → Systematic problem-solving.

**JavaScript notional machines** (12 total):
- Memory model (stack/heap)
- Scope chain (variable resolution)
- Event loop (async coordination)
- Call stack (function execution)
- [8 more...]

### How to Apply

**Prediction tasks** (externalize model):
```javascript
// What does this print?
let x = [1, 2];
let y = x;
y.push(3);
console.log(x);  // ?
```

**Why it works**:
- Wrong prediction → Reveals flawed memory model
- Explanation requirement → Can't fake understanding
- Discrepancy discussion → Cognitive dissonance drives learning

**Visualization tasks**:
- "Draw memory diagram showing stack and heap"
- "Trace scope chain for this variable"
- "Show event loop phases for this async code"

### Tool Support Needed

- Execution trace visualization
- Memory/scope/stack diagrams
- Prediction recording + comparison
- Model-based feedback

**Scalability**: Partial automation (prediction grading easy, explanation grading hard)

---

## Strategy 3: Target Known Misconceptions

### What Research Shows

Programming misconceptions are well-documented (Qian & Lehman 2017):
- **Tier 1** (85%+ frequency): Reference vs value, function execution, sequential model
- **Tier 2** (40-60%): Async, closures, context binding
- **Tier 3** (<20%): Edge cases, advanced features

### How to Apply

**Diagnostic pre-assessment**:
- Before teaching closures, test for scope misconceptions
- Before async, test for callback understanding
- Target known errors in your population

**Pattern-based detection**:
- Uninitialized variable reads → Auto-init misconception
- Var in loop closures → Reference capture confusion
- == vs === misuse → Type coercion confusion

**Targeted feedback**:
- Generic: "Incorrect"
- Location: "Error on line 5"
- Type: "ReferenceError"
- **Misconception**: "Variables don't auto-initialize to 0 in JavaScript" ← Best
- Corrective: "Add let sum = 0" ← Too specific, learned helplessness risk

### Tool Support Needed

- Misconception pattern detection
- Targeted explanation generation
- Longitudinal misconception tracking

**Scalability**: Fully automated for known patterns

---

## Strategy 4: Support Through Thresholds

### What Research Shows

Some concepts are **transformative thresholds** (Meyer & Land 2003):
- Irreversibly change understanding
- Integrative (connect prior knowledge)
- Troublesome (counter-intuitive, emotionally difficult)

**JavaScript thresholds**: Async, closures, prototypes, recursion

**Liminal state** = Transition period (confusion is normal, productive)

### How to Apply

**Recognize liminal indicators**:
- Inconsistent predictions (sometimes right, sometimes wrong)
- Partial understanding ("I get it in simple cases but...")
- Prolonged struggle (weeks, not days)

**Liminal support** (DON'T GRADE):
- Week 1-3: Introduce concept, build foundations
- Week 4-6: **Liminal period** → Scaffolded practice, formative feedback only, no grades
- Week 7+: Post-threshold → Summative assessment appropriate

**Scaffold types**:
- Partial model provided ("Event loop has 3 phases: sync, microtask, macrotask. Map code to phases.")
- Contrast cases ("What's different between working and broken versions?")
- Progressive hints (conceptual → strategic → tactical)

### Tool Support Needed

- Liminal state detection (inconsistency patterns)
- Scaffolding triggers
- Longitudinal progress tracking
- Threshold crossing celebration

**Scalability**: Pattern recognition automated, scaffolding requires design

---

## Strategy 5: Align with Learning Progression

### What Research Shows

**SOLO Taxonomy** (Biggs & Collis 1982) describes 5 learning levels:
1. **Prestructural**: No coherent structure
2. **Unistructural**: One relevant aspect
3. **Multistructural**: Multiple aspects, disconnected
4. **Relational**: Integrated understanding
5. **Extended Abstract**: Transfers to novel contexts

**Assessment implication**: Match task difficulty to student level.

### How to Apply

**Task progression example (loops)**:

**Unistructural**: "Identify the loop in this code"
**Multistructural**: "This loop has initialization, condition, update - label each"
**Relational**: "Explain how loop parts work together to iterate"
**Extended Abstract**: "Apply loop concept to recursion - what's similar/different?"

**Avoid**:
- Relational tasks for Unistructural students (too hard → frustration)
- Unistructural tasks for Relational students (too easy → boredom)

**Adaptive assessment**:
- Start at estimated level
- Success → Advance
- Struggle → Provide scaffolding, stay at level

### Tool Support Needed

- SOLO level detection
- Adaptive task selection
- Progressive scaffolding

**Scalability**: Level detection partially automated

---

## Putting It Together: Practical Workflow

### Week-by-Week Example (Async Unit)

**Week 1** (Pre-threshold):
- Introduce event loop concept
- Diagnostic: Test callback understanding (prerequisite)
- No async assessment yet

**Week 2-3** (Introduction):
- Simple setTimeout examples
- Prediction tasks (formative, no grades)
- Misconception detector identifies timing confusions

**Week 4-6** (Liminal period):
- Complex async scenarios
- **Formative only** - scaffolded practice, frequent feedback
- Tool detects inconsistent predictions → Increase scaffolding
- Celebrate small wins ("You correctly predicted microtask order!")

**Week 7** (Threshold detection):
- Consistent accurate predictions → Crossing detected
- Explanation quality improved → Model-based reasoning
- Celebrate: "You've crossed the async threshold!"

**Week 8+** (Post-threshold):
- Summative assessment appropriate
- Integration tasks (async + closures)
- QLCs assesses async code quality
- Transfer: Apply event loop to Node.js, Workers

### Assessment Balance

**Formative (70%)**:
- During learning
- Frequent, low-stakes
- Focused feedback
- Support improvement

**Summative (30%)**:
- Milestones only
- High-stakes
- Comprehensive
- Measure achievement

---

## Common Pitfalls to Avoid

### Pitfall 1: Grading Confusion

**Wrong**: Grade liminal state (threshold confusion)
**Right**: Scaffold liminal state, grade post-threshold

**Why**: Confusion during transition is productive, not failure.

### Pitfall 2: Single-Dimension Assessment

**Wrong**: "Tests pass = 100%"
**Right**: Correctness + quality + comprehension

**Why**: Working code ≠ understanding or quality.

### Pitfall 3: Immediate Corrective Feedback

**Wrong**: "The answer is..."
**Right**: "This is accumulation pattern. What variable tracks the running total?"

**Why**: Level 5 feedback (corrective) → Learned helplessness. Level 4 (misconception diagnosis) → Thinking.

### Pitfall 4: Premature Threshold Assessment

**Wrong**: Assess async mastery week 2
**Right**: Assess readiness week 2, mastery week 7+

**Why**: Thresholds take time (typically 4-8 weeks). Early assessment measures lack of exposure, not inability.

### Pitfall 5: Ignoring Misconceptions

**Wrong**: "Just read the docs"
**Right**: "You have scope chain misconception - closures capture references not values"

**Why**: Generic help doesn't address specific mental model errors.

---

## Getting Started Checklist

**This semester**:
- [ ] Add quality dimension to one assignment (QLCs)
- [ ] Use prediction task for one concept (NM)
- [ ] Identify one threshold concept in your curriculum
- [ ] Try formative-only assessment for 2 weeks (liminal support)

**Tool requirements** (start simple):
- Prediction recording (Google Form works)
- Basic quality rubric (can be manual initially)
- Misconception list for your content

**Gradual adoption**:
- Don't overhaul everything at once
- Pick one strategy per semester
- Build tooling incrementally
- Share with colleagues

---

## Further Reading (Optional)

**If you want deeper understanding**:
- Misconceptions: Qian & Lehman (2017) - programming misconception catalog
- Notional machines: Sorva (2013) - visualization and mental models
- Threshold concepts: Meyer & Land (2003) - transformative learning theory
- QLCs: Lehtinen et al. (2023) - automated quality assessment
- Feedback: Keuning et al. (2019) - systematic review of CS feedback

**Step 1-3 documents in this directory**: Comprehensive integration of these frameworks

---

## Summary: Five Strategies

1. **Assess code quality** (QLCs) - Beyond correctness
2. **Assess mental models** (NM) - Verify execution understanding
3. **Target misconceptions** - Specific diagnosis + feedback
4. **Support thresholds** - Scaffold transitions, don't grade confusion
5. **Align with progression** (SOLO) - Match tasks to level

**Universal principle**: Assessment should support learning, not just measure it.

**Start small**: Pick one strategy, try it, iterate.

**Tool support**: Automation enables these strategies at scale.
