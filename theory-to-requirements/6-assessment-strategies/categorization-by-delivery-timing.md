# Assessment Use Cases by Delivery Timing

**Step 4 Deliverable**: Organize assessment by when feedback is delivered

**Who this serves**:
- **Educators**: Balance immediate vs delayed feedback strategies
- **Tool developers**: Design appropriate feedback architectures
- **Researchers**: Study timing effects on learning

---

## Introduction

Feedback timing affects learning differently based on skill type (Keuning et al. 2019):
- **Procedural skills** (syntax): Benefit from immediate feedback
- **Conceptual understanding**: Benefit from delayed feedback allowing reflection
- **Strategic thinking**: Benefit from on-demand analysis

---

## 1. Real-Time During Typing

**When**: As student types, sub-second response

**Best for**: Syntax, conventions, obvious errors

### Use Cases

**Syntax error highlighting**
- What: Flag parse errors immediately, prevent syntax practice of broken code
- Why: Syntax is procedural - immediate correction prevents bad habits
- Example: Missing semicolon, unclosed bracket highlighted instantly

**Variable shadowing warnings**
- What: Detect inner scope variable hiding outer scope variable
- Why: Common source of bugs, easy to miss without highlighting
- Example: `let x = 5; { let x = 10; }` → Warning on inner `x`

**Undefined variable detection**
- What: Reference to undeclared variable flagged
- Why: Typos caught early, prevents runtime confusion
- Example: `consol.log()` → "Did you mean console?"

**Convention violations**
- What: Naming style, formatting issues
- Why: Consistency matters, easier to learn during writing
- Example: `let UserName` → "Use camelCase for variables: userName"

**Simple type mismatches**
- What: Obvious type errors (string + array, etc.)
- Why: Prevents conceptual confusion from type coercion
- Example: `"5" + [1,2]` → "String + Array produces '51,2' via coercion"

### Timing Trade-offs

**Advantages**:
- Prevents practicing errors
- Builds muscle memory for correct syntax
- Reduces debugging time later

**Disadvantages**:
- Can interrupt flow if too aggressive
- May not allow exploration/experimentation
- Procedural focus misses conceptual issues

**Configuration**: Toggle-able, severity-filtered (errors vs warnings)

**Framework implications**: Real-time timing best for Tier 1 misconceptions (variable auto-initialization, basic syntax errors) with high frequency (65%+ of students). QLCs naming/convention checks appropriate for real-time. Threshold concepts (async, closures) NOT appropriate for real-time detection—require retrospective pattern analysis.

---

## 2. Immediate Post-Execution

**When**: After code runs, within seconds

**Best for**: Output correctness, basic quality, simple misconceptions

### Use Cases

**Test result feedback**
- What: Pass/fail status with failing test details
- Why: Students need to know if solution works
- Example: "3 of 5 tests pass. Failing: edge case with empty array"

**Output comparison**
- What: Show expected vs actual output side-by-side
- Why: Discrepancies reveal logic errors
- Example: Expected [1,2,3], Got [1,2,2] → Off-by-one in loop

**Simple misconception detection**
- What: Pattern-based diagnosis from single execution
- Why: Common errors have recognizable patterns
- Example: NaN result → "Uninitialized variable used in arithmetic"

**Basic quality metrics**
- What: Naming, complexity, length checks
- Why: Quality feedback while code fresh in mind
- Example: "Function is 75 lines - consider breaking into smaller functions"

**Execution visualization**
- What: Animated trace of what just ran
- Why: Connects code to behavior immediately
- Example: Step-through showing variable values at each line

### Timing Trade-offs

**Advantages**:
- Fast enough to inform next attempt
- Concrete (based on actual execution)
- Supports iterative debugging

**Disadvantages**:
- Single execution may miss edge cases
- Doesn't allow reflection time
- Can encourage trial-and-error

**Best practice**: Pair with encouragement to predict before running

**Framework implications**: Post-execution ideal for notional machine visualization—show scope chain after execution, call stack state at error, event loop phases for async code. Misconception pattern detection feasible from single execution for simple patterns (uninitialized variable, type coercion). POE (Predict-Observe-Explain) pedagogy requires immediate post-execution comparison.

---

## 3. On-Demand Analysis

**When**: Student triggers analysis manually

**Best for**: Deep analysis, quality assessment, complex misconceptions

### Use Cases

**Comprehensive quality assessment**
- What: Full QLCs analysis (naming, API, algorithm, patterns)
- Why: Deep analysis takes time, student controls when ready
- Example: "Run Quality Check" → 2-minute analysis report

**Multi-execution pattern detection**
- What: Analyze behavior across multiple test cases
- Why: Some misconceptions only visible in edge cases
- Example: "Your code works for positive numbers but fails for negatives"

**Trace-based NM diagnosis**
- What: Detailed execution trace with NM annotations
- Why: Understanding execution model requires careful study
- Example: Scope chain visualization, prototype lookup diagram

**Complexity analysis**
- What: Big-O estimation, performance profiling
- Why: Performance understanding needs focused attention
- Example: "This nested loop is O(n²) - see hotspots in profiler"

**Misconception deep-dive**
- What: Detailed explanation of why code exhibits misconception
- Why: Conceptual understanding benefits from reflection time
- Example: Closure variable capture explanation with diagrams

**Code comparison**
- What: Side-by-side with reference solution
- Why: Learning from differences requires analysis
- Example: "Your solution works but uses manual loop. Compare with .reduce()"

### Timing Trade-offs

**Advantages**:
- Student controls timing (readiness)
- Allows reflection and deep thinking
- No interruption during coding flow

**Disadvantages**:
- Students may not trigger when needed
- Delayed feedback may lose relevance
- Requires self-regulation

**Best practice**: Suggest when to trigger ("Before submitting, run quality check")

**Framework implications**: On-demand timing necessary for threshold state detection (requires longitudinal inconsistency patterns, not single execution). Comprehensive QLCs analysis (all four dimensions: naming, API, algorithm, patterns) computationally expensive—on-demand appropriate. Taxonomy level diagnosis (SOLO, Block Model, BSI) requires careful analysis unsuitable for real-time interruption.

---

## 4. Retrospective/Portfolio

**When**: Hours to weeks later, cross-session

**Best for**: Progress tracking, pattern analysis, growth measurement

### Use Cases

**Longitudinal misconception tracking**
- What: Show which misconceptions persist across assignments
- Why: Reveals learning trajectory, intervention timing
- Example: "Scope confusion appeared in 4 of 6 assignments, improving recently"

**Progress visualization**
- What: Quality metrics over time (naming, complexity, etc.)
- Why: Growth evidence motivates, shows learning
- Example: Graph showing cyclomatic complexity decreasing over semester

**Pattern evolution analysis**
- What: Track API usage, algorithm choices across projects
- Why: Shows sophistication growth
- Example: "Early assignments: manual loops. Recent: array methods, recursion"

**Threshold crossing detection**
- What: Identify when student crossed async/closure/prototype/recursion thresholds
- Why: Recognize major milestones, celebrate breakthroughs
- Example: "Week 6: Closure understanding breakthrough detected"

**Portfolio quality summary**
- What: Aggregate QLCs across all submitted code
- Why: Holistic view of programming maturity
- Example: "Semester summary: Naming A-, API B+, Algorithm B, Patterns C+"

**Comparative analytics**
- What: Student progress vs class average (anonymized)
- Why: Context for self-assessment
- Example: "Your quality improvement rate above class median"

### Timing Trade-offs

**Advantages**:
- Reveals patterns invisible in single assignments
- Non-linear learning becomes visible
- Metacognitive awareness

**Disadvantages**:
- Too delayed for immediate correction
- Requires longitudinal data infrastructure
- Privacy concerns with tracking

**Best practice**: End-of-unit reflections using retrospective data

**Framework implications**: Retrospective timing essential for threshold crossing detection—liminal state indicators (prediction inconsistency, partial correctness) only visible across multiple attempts over weeks. Taxonomy level progression (Unistructural → Multistructural → Relational) requires longitudinal evidence. Misconception persistence tracking differentiates persistent conceptual gaps from transient errors. QLCs quality trajectory shows professional skill development over time.

---

## 5. Adaptive Timing

**When**: Tool determines optimal timing based on context

**Best for**: State-responsive feedback (pre-threshold vs post-threshold, liminal support)

### Use Cases

**Liminal state scaffolding**
- What: Detect threshold liminal state → Increase scaffolding frequency
- Why: Confusion during transition needs more support
- Example: Student struggling with closures → Daily guided exercises with immediate feedback

**Mastery-based delay**
- What: Pre-threshold: Immediate. Post-threshold: Delayed for challenge
- Why: Timing should match learning state
- Example: Beginner gets instant syntax help. Advanced student gets end-of-session analysis

**Error frequency adaptation**
- What: Repeated errors → More immediate feedback. Rare errors → Less intrusive
- Why: Struggling students need more support, proficient students need less interruption
- Example: 5 syntax errors in 10 minutes → Enable real-time checking

**Cognitive load detection**
- What: Complex task + many errors → Delay non-critical feedback
- Why: Overload impairs learning
- Example: During difficult recursion task, defer style warnings until task complete

**Engagement-based triggers**
- What: Student stuck (no changes for 5 min) → Offer hint
- Why: Productive struggle good, unproductive frustration bad
- Example: "No changes in 5 minutes. Want a hint?"

### Timing Trade-offs

**Advantages**:
- Personalized to student state
- Reduces cognitive load
- Supports when needed, challenges when ready

**Disadvantages**:
- Requires sophisticated state detection
- May misclassify student state
- Complexity in implementation

**Best practice**: Allow student override of adaptive decisions

**Framework implications**: Adaptive timing required for liminal state support (threshold concepts)—pre-threshold needs instruction, liminal needs frequent scaffolding, post-threshold needs minimal interruption. Misconception frequency adaptation—first occurrence gets full explanation (immediate), repeated pattern triggers review suggestion (delayed batch). Taxonomy level adaptation—Unistructural students need immediate corrective feedback, Relational students benefit from delayed reflection opportunity.

---

## Cross-Timing Patterns

| Assessment Type | Real-Time | Post-Exec | On-Demand | Retrospective | Adaptive |
|-----------------|-----------|-----------|-----------|---------------|----------|
| **Syntax errors** | ✓ primary | ✓ | | | ✓ |
| **Test results** | | ✓ primary | ✓ | | |
| **Quality (QLCs)** | ✓ basic | ✓ basic | ✓ deep | ✓ trend | ✓ |
| **Misconceptions** | ✓ simple | ✓ pattern | ✓ diagnosis | ✓ longitudinal | ✓ |
| **NM understanding** | | ✓ trace | ✓ primary | | ✓ |
| **Threshold state** | | | ✓ | ✓ primary | ✓ |
| **Progress tracking** | | | | ✓ primary | |

---

## Design Principles

**Match timing to skill type**:
- Procedural (syntax) → Real-time
- Conceptual (models) → Delayed
- Strategic (design) → On-demand

**Balance support and autonomy**:
- Too immediate → Dependence, flow interruption
- Too delayed → Relevance loss, frustration
- Adaptive middle ground

**Allow student control**:
- Toggle real-time feedback
- Trigger on-demand analysis
- Access retrospective data
- Override adaptive decisions

**Escalate appropriately**:
- Repeated error → More immediate feedback
- Mastery → More delayed feedback
- Struggle → More frequent support

---

## References

- Keuning, H., Jeuring, J., & Heeren, B. (2019). A systematic literature review of automated feedback generation for programming exercises. *ACM Transactions on Computing Education*, 19(1), 1-43. (Feedback timing and specificity levels)
- Shute, V. J. (2008). Focus on formative feedback. *Review of Educational Research*, 78(1), 153-189. (Timing effects on learning)
- Hattie, J., & Timperley, H. (2007). The power of feedback. *Review of Educational Research*, 77(1), 81-112. (Immediacy vs delay trade-offs)
- Butler, A. C., Karpicke, J. D., & Roediger III, H. L. (2008). Correcting a metacognitive error: Feedback increases retention of low-confidence correct responses. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, 34(4), 918-928. (Delayed feedback for retention)

---

## Summary

**Real-Time**: Procedural skills, syntax, conventions
**Post-Execution**: Correctness, basic quality, simple patterns
**On-Demand**: Deep analysis, quality, complex diagnosis
**Retrospective**: Progress tracking, patterns, growth
**Adaptive**: State-responsive, personalized timing

**Universal principle**: Faster feedback for procedural skills, slower for conceptual understanding.
