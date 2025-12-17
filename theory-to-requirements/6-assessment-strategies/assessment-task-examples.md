# Practical Assessment Task Examples

**Step 4 Deliverable**: Concrete assessment tasks demonstrating theory → practice

**Who this serves**:
- **Educators**: Ready-to-use assessment templates
- **Tool developers**: Implementation examples showing "what tools do"
- **Researchers**: Concrete operationalization of frameworks

---

## Introduction

Each example shows complete assessment cycle:
1. **Educational context** (course level, prior knowledge)
2. **Learning objective** (what we're assessing)
3. **Assessment task** (what student does)
4. **What tool does** (without specifying HOW trace enables it)
5. **Framework connections** (links to Step 3 theory)
6. **Evidence basis** (🔬/📐/🧪)

---

## Example 1: Formative Misconception Assessment (Scope)

### Educational Context
- **Course**: CS1, week 4
- **Prior knowledge**: Functions, basic variable declaration
- **Just learned**: Block scope (`let`/`const`) vs function scope (`var`)

### Learning Objective
Understand block scope vs function scope, predict variable accessibility

### Assessment Task

```javascript
// Task: Predict what each console.log prints, then execute and compare

let x = 10;
{
  let x = 20;
  console.log(x);  // Prediction: _____
}
console.log(x);    // Prediction: _____

var y = 10;
{
  var y = 20;
  console.log(y);  // Prediction: _____
}
console.log(y);    // Prediction: _____
```

### What Tool Does

**Before execution**:
- Record student predictions for all 4 console.logs
- Don't execute yet (force prediction first)

**After execution**:
- Show actual output: 20, 10, 20, 20
- Compare to predictions
- Identify misconception pattern:
  - All correct → Understands block scope
  - Wrong on `let` block → Doesn't understand block scope
  - Wrong on `var` block → Thinks `var` has block scope (common misconception)
  - All wrong → Confusion about both

**Feedback based on pattern**:
- `var` confusion: "Variables declared with `var` have function scope, not block scope. The block's `var y = 20` reassigns the same `y` from outer scope."
- `let` confusion: "Variables declared with `let` have block scope. Inner `x` is different variable than outer `x`, shadowing it within the block."

### Framework Connections

**Misconceptions** (Tier 1, universal):
- Variable auto-initialization (not present here, but related)
- Block vs function scope confusion (65% frequency)

**Notional Machines**:
- Scope Chain NM (variable resolution)
- Variable Lifecycle NM (where variables exist)

**Taxonomy**:
- SOLO Multistructural → Relational (integrating `let` and `var` rules)
- Block Model Level 2 (trace execution to understand scope)

### Evidence Basis
📐 Framework (POE is established pedagogy, scope-specific application is framework)

---

## Example 2: Summative Quality Assessment (QLCs)

### Educational Context
- **Course**: CS1, end of semester
- **Prior knowledge**: Arrays, loops, functions, basic quality awareness
- **Summative milestone**: Final project

### Learning Objective
Write quality code beyond functional correctness (QLCs framework)

### Assessment Task

```javascript
// Task: Implement function that returns sum of even numbers in array

// Student submission example:
function f(a) {
  let s = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] % 2 == 0) {
      s = s + a[i];
    }
  }
  return s;
}
```

### What Tool Does

**Correctness assessment** (40% of grade):
- Run test suite
- All tests pass → 40/40 points

**Quality assessment** (60% of grade):

**Naming (20 points)**:
- Function name `f` → Non-descriptive (-10): "Use descriptive name like `sumEvenNumbers`"
- Parameter `a` → Non-descriptive (-5): "Use `numbers` or `arr`"
- Variable `s` → Minimal context (-3): "Use `sum` or `total`"
- Loop variable `i` → Acceptable (0): "Standard convention for loop index"
- **Score**: 2/20

**API Usage (20 points)**:
- Manual loop → Acceptable but not modern (-5): "Consider `.filter().reduce()` for functional approach"
- Array length check → Correct (0)
- Modulo operator → Appropriate (0)
- **Score**: 15/20

**Algorithm/Logic (20 points)**:
- Accumulator pattern → Correct (0)
- Early return opportunities → None needed (0)
- Edge cases → Not handled (-5): "No check for empty array (works but could be explicit)"
- Efficiency → O(n), optimal (0)
- **Score**: 15/20

**Total**: 72/100 (C)

**Feedback**: "Your solution is functionally correct (all tests pass) but needs quality improvements. Focus on descriptive naming - professional code is self-documenting. Consider modern array methods for cleaner, more maintainable code."

### Framework Connections

**QLCs** (Lehtinen et al. 2023):
- Naming quality assessment
- API usage evaluation
- Algorithmic approach detection

**BSI Framework**:
- Behavior: Works (40 points)
- Implementation: Naming/syntax (20 points)
- Strategy: API/algorithm choices (40 points)

**Taxonomy**:
- Measures SOLO Relational level (integrates correctness + quality)

### Evidence Basis
🔬 Established (QLCs validated at MOOC scale, BSI established framework)

---

## Example 3: Diagnostic Threshold State Assessment (Async)

### Educational Context
- **Course**: CS1, week 8
- **Just introduced**: Promises, `async`/`await`
- **Instruction time**: 2 weeks

### Learning Objective
Detect student's threshold state for asynchronous execution (pre/liminal/post)

### Assessment Task

```javascript
// Task: Predict execution order (A, B, C, D, E, F)

console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => console.log('C'));

console.log('D');

Promise.resolve().then(() => {
  console.log('E');
  setTimeout(() => console.log('F'), 0);
});
```

### What Tool Does

**Collect prediction**: Student provides order: _________

**Execute code**: Actual order: A, D, C, E, B, F

**Analyze prediction pattern**:

**Pre-threshold indicators**:
- Linear order (A, B, C, D, E, F) → No async model
- setTimeout and Promise treated identically → No queue distinction
- Feedback: "You're treating async code as sequential. The event loop coordinates multiple execution phases. Let's review the event loop model."

**Liminal indicators**:
- Partial correctness (A, D correct, async mostly wrong) → Emerging understanding
- Knows async differs but can't predict precisely
- Feedback: "You're building toward understanding async! You correctly identified sync code runs first. Now notice: Promises (microtasks) drain before setTimeout (macrotasks). This is event loop phase ordering."

**Post-threshold indicators**:
- Fully correct or minor error → Has event loop model
- Feedback: "You've crossed the async threshold! Your prediction shows systematic event loop understanding. Ready for more complex async patterns."

**Threshold state classification**:
- Pre → Recommend event loop tutorial, delay async assessment
- Liminal → Provide scaffolded practice, frequent formative feedback
- Post → Ready for summative async assessment

### Framework Connections

**Threshold Concepts** (Meyer & Land 2003):
- Async as transformative threshold
- Liminal state detection
- No grading during confusion period

**Notional Machines**:
- Event Loop NM
- Call Stack NM (stack must empty before event loop ticks)

**Assessment Timing**:
- Week 2-3: Expect pre/liminal
- Week 4-6: Liminal common
- Week 7+: Post-threshold emerging

### Evidence Basis
🔬 Established (Threshold concept theory, async as documented threshold)

---

## Example 4: Authentic Debugging Assessment

### Educational Context
- **Course**: CS2, mid-semester
- **Prior knowledge**: Closures, scope, debugging tools
- **Authentic context**: Debugging realistic code

### Learning Objective
Debug production-style code using professional debugging workflow

### Assessment Task

```javascript
// Bug report: "Click counter shows wrong count after multiple clicks"
// Task: Find and fix the bug, explain the root cause

function setupCounters() {
  const buttons = document.querySelectorAll('.counter-btn');

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      alert('Button ' + i + ' clicked');
    });
  }
}

setupCounters();
```

### What Tool Does

**Debugging support**:
- Provide debugger access
- Allow setting breakpoints
- Show closure captured variables
- Trace event handler execution

**Assessment dimensions**:

**Bug identification** (25%):
- Recognizes closure captures `var i` reference
- All handlers share same `i` (value: 3 after loop)

**Root cause explanation** (25%):
- "Closures capture references not values"
- "`var` has function scope, single `i` shared"
- "Loop completes before any click events"

**Fix implementation** (25%):
- Option A: Use `let i` (block scope, new binding per iteration)
- Option B: IIFE to capture value: `(function(index) { ... })(i)`
- Option C: `.forEach()` (callback creates new scope)

**Professional debugging process** (25%):
- Used debugger to inspect closure
- Checked `i` value at handler execution
- Tested fix before submitting
- Explained with correct terminology

### Framework Connections

**Authentic Assessment** (Gulikers et al. 2004):
- Task: Realistic bug (closure + loop + var)
- Context: Professional debugger tools
- Criteria: Professional debugging workflow

**Misconceptions**:
- Closure variable capture (Tier 2)
- `var` scope confusion

**Notional Machines**:
- Scope Chain (closure captures environment)
- Event Loop (handlers execute after loop)

### Evidence Basis
📐 Framework (Authentic assessment established, closure debugging application is framework)

---

## Example 5: Adaptive Taxonomy-Level Assessment (Recursion)

### Educational Context
- **Course**: CS1/CS2 bridge
- **Mixed preparation**: Some students have recursion, others don't
- **Goal**: Adaptive assessment matching current level

### Learning Objective
Assess recursion understanding at appropriate SOLO level

### Assessment Task (Adaptive)

**Level 1 (Unistructural) - Basic recognition**:
```javascript
// Is this recursive? Yes/No
function countdown(n) {
  if (n === 0) return;
  console.log(n);
  countdown(n - 1);
}
```

**If correct → Level 2 (Multistructural) - Trace execution**:
```javascript
// Trace countdown(3), show call stack at each step
```

**If correct → Level 3 (Relational) - Construction**:
```javascript
// Implement: sum array recursively
function sum(arr) {
  // Your code here
}
```

**If correct → Level 4 (Extended Abstract) - Transfer**:
```javascript
// Flatten nested array recursively
// [1, [2, [3, 4]], 5] → [1, 2, 3, 4, 5]
```

### What Tool Does

**Adaptive progression**:
- Start at estimated level based on course progress
- Success → Advance to next level
- Struggle → Stay at level, provide scaffolding
- Repeated failure → Drop to previous level

**Scaffolding by level**:
- Level 1: Definition reminders
- Level 2: Partial trace, student completes
- Level 3: Base case template provided
- Level 4: Minimal hints only

**Final assessment**:
- Highest level reached = SOLO classification
- Detailed feedback on current level strengths/gaps
- Recommended practice for next level

### Framework Connections

**SOLO Taxonomy** (Biggs & Collis 1982):
- Progressive complexity assessment
- Level-appropriate tasks
- Avoids ceiling/floor effects

**Threshold Concepts**:
- Recursion as threshold (Booth 1992)
- Adaptive scaffolding during liminal state

**BSI Framework**:
- Levels 1-2: Implementation/Behavior
- Levels 3-4: Strategy (when to use recursion)

### Evidence Basis
🔬 Established (SOLO taxonomy, recursion as researched threshold)

---

## Example 6: Multi-Framework Integration Assessment

### Educational Context
- **Course**: CS2, late semester
- **Cumulative assessment**: Tests multiple concepts together
- **Realistic complexity**: Professional-level integration

### Learning Objective
Apply closures + async + quality practices in integrated task

### Assessment Task

```javascript
// Task: Implement rate-limited API caller
// - Maximum 5 calls per second
// - Queue excess calls for later
// - Return Promises for all calls
// - Use closures for state encapsulation

function createRateLimiter(maxPerSecond) {
  // Your implementation
}

// Example usage:
const limiter = createRateLimiter(5);
for (let i = 0; i < 20; i++) {
  limiter.call(() => fetch(`/api/${i}`))
    .then(response => console.log(`Call ${i} completed`));
}
```

### What Tool Does

**Multi-dimensional scoring**:

**Correctness** (30%):
- Rate limiting works
- Promises returned correctly
- Queuing functions properly

**Closure usage** (20%):
- State encapsulated (queue, timer, count)
- No global variables
- Multiple limiters independent

**Async handling** (20%):
- setTimeout for rate control
- Promise chaining correct
- Execution order managed

**Quality** (20%):
- Descriptive naming
- Appropriate APIs used
- Clear logic flow

**Code explanation** (10%):
- Can explain closure mechanism
- Can explain async timing
- Demonstrates integrated understanding

**Rubric applies**:
- Each dimension scored separately
- Integration bonus for clean interaction between concepts
- Partial credit for attempts showing understanding

### Framework Connections

**Integration Assessment** (Step 3 theme):
- Closures (Threshold 2)
- Async (Threshold 1)
- Quality (QLCs)

**SOLO Relational level required**:
- Integrates multiple concepts
- Not testable at Multistructural

**Authentic Assessment**:
- Rate limiting is real professional problem
- Realistic complexity
- Professional quality standards

### Evidence Basis
📐 Framework (Integration importance established, specific task is framework)

---

## Summary: Task Design Patterns

**Prediction-based tasks** (POE):
- Force mental model externalization
- Example 1 (scope), Example 3 (async)

**Quality-focused tasks** (QLCs):
- Assess beyond correctness
- Example 2 (summative QLCs)

**Debugging tasks** (authentic):
- Realistic problem-solving
- Example 4 (closure bug)

**Adaptive tasks** (taxonomy-aligned):
- Match current level
- Example 5 (recursion SOLO)

**Integration tasks** (threshold + quality):
- Multiple concepts together
- Example 6 (rate limiter)

**Common elements**:
- Clear learning objective
- Concrete "what tool does"
- Framework connections explicit
- Evidence basis classified
- No trace specifications (Step 5)

---

## Using These Examples

**For educators**:
- Adapt examples to your context
- Adjust complexity to course level
- Combine assessment types as needed

**For tool developers**:
- Implement "what tool does" from examples
- Framework connections inform feature design
- Evidence basis guides priority

**For researchers**:
- Operationalize frameworks concretely
- Study effectiveness of task types
- Validate automated implementations
