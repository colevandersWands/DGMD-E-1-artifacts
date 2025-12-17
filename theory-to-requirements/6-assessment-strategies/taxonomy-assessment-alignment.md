# Taxonomy-Assessment Alignment

**Integration**: [`/1-taxonomies/`](../1-taxonomies/) ↔ [`/6-assessment-strategies/`](./README.md)

**Purpose**: Map educational taxonomies (SOLO, Block Model, BSI, Abstraction Transition) to assessment strategies, revealing how learning progression frameworks inform assessment design, difficulty calibration, diagnostic capabilities, and validity considerations.

---

## Why Taxonomy-Assessment Alignment Matters

Educational taxonomies provide **progression models** describing how learners develop from novice to expert. Assessment strategies provide **measurement frameworks** for determining competence and supporting learning. The intersection is critical:

**Without taxonomy grounding**, assessment risks:
- Arbitrary difficulty (no principled progression)
- Mismatched expectations (assessing advanced skills with novice tasks)
- Invalid inferences (measuring wrong construct for student's level)
- Fragmented evaluation (testing disconnected skills rather than integrated understanding)

**With taxonomy alignment**, assessment gains:
- Principled progression (difficulty matches developmental stage)
- Diagnostic power (identifies specific gaps in progression)
- Scaffolded growth (assessment targets next level, not current)
- Construct validity (measures intended learning at appropriate abstraction)

**Research foundation**: SOLO taxonomy (Biggs & Collis), Block Model (Schulte & Borowitz), BSI Framework (Robins et al.), Abstraction Transition Framework (Waite et al.) provide validated progression models. Assessment strategies research (Gulikers 2004, van Merriënboer 2019, Lehtinen 2023, Ko 2019-2021) establishes validity, alignment, and quality principles. This document synthesizes both streams.

---

## SOLO Taxonomy × Assessment Strategies

### SOLO Levels Recap (from `/1-taxonomies/`)

**Five-level progression** (Biggs & Collis): Prestructural → Unistructural → Multistructural → Relational → Extended Abstract. See `/1-taxonomies/` for complete definitions.

### Assessment Difficulty Progression

**Principle**: Assessment tasks must target student's current SOLO level and scaffold to next.

| SOLO Level | Assessment Focus | Task Characteristics | Example (JavaScript) |
|------------|------------------|----------------------|----------------------|
| **Prestructural** | Diagnose confusion | Very simple, single-step, explicit instructions | "What does `let x = 5` do?" (diagnostic only, not graded) |
| **Unistructural** | Isolated concept | Single concept application, minimal context | "Write a function that adds two numbers" |
| **Multistructural** | Multiple concepts | Multiple steps, concepts used separately | "Write a function using variables, conditionals, and loops" |
| **Relational** | Integration | Concepts must interact, emergent behavior | "Explain why your solution uses a loop here but conditional there" |
| **Extended Abstract** | Transfer | Novel context, abstraction required | "Adapt your solution to handle async data streams" |

**Assessment Implication**: Lower SOLO levels (1-3) accommodate automated assessment (test-based correctness). Higher SOLO levels (4-5) require human judgment (integration, transfer, explanation).

### SOLO × Assessment Type Matrix

|  | **Formative** | **Summative** | **Automated (QLCs)** | **Manual** | **Authentic** |
|--|---------------|---------------|----------------------|------------|---------------|
| **Prestructural** | ✅ Diagnostic feedback | ❌ Don't grade confusion | ⚠️ Can detect, not assess | ✅ Tutor identifies gaps | ❌ Too early |
| **Unistructural** | ✅ Immediate correction | ✅ Simple skills | ✅ Syntax, naming | ✅ Concept checks | ⚠️ Isolated skills |
| **Multistructural** | ✅ Step-by-step feedback | ✅ Component skills | ✅ Test-based correctness | ✅ Partial credit | ⚠️ Disconnected from practice |
| **Relational** | ✅ Integration prompts | ✅ Explanation required | ⚠️ Hard to automate | ✅ Essential for rubrics | ✅ Design explanations |
| **Extended Abstract** | ✅ Transfer guidance | ✅ Capstone projects | ❌ Can't automate transfer | ✅ Only manual works | ✅ Professional contexts |

**Key Findings**:
- **Automated assessment ceiling**: SOLO 3 (multistructural correctness)
- **Human assessment necessary**: SOLO 4-5 (integration, transfer, explanation)
- **Formative assessment**: Effective at all SOLO levels (different feedback types)
- **Authentic assessment**: Requires SOLO 4+ (professional practice involves integration/transfer)

### SOLO-Based Assessment Design Principles

**1. Scaffold from Current to Next Level**

Students at SOLO 2 (unistructural) should receive:
- **Current-level assessment**: Can you use a loop correctly?
- **Next-level scaffolding**: Try combining loop + conditional to solve this problem

Assessment targeting two levels above current (SOLO 2 → SOLO 4 task) produces frustration, not learning.

**2. Diagnostic Assessment at Prestructural**

Prestructural responses signal fundamental confusion:
- **Don't grade prestructural work** (unreliable measurement)
- **Use diagnostically** to identify conceptual barriers
- **Provide scaffolding** to reach unistructural understanding
- **Example**: Student writes `let x = 5 + 5` expecting `x` to always equal 10, even after `x = 3`. → Diagnose: variable assignment misconception

**3. Relational Assessment Requires Explanation**

SOLO 4 (relational) understanding cannot be measured by output alone:
- **Insufficient**: "Code produces correct output"
- **Necessary**: "Student explains why design integrates concepts appropriately"
- **Assessment method**: Code + written explanation, oral defense, or design document
- **QLCs application**: "Why did you use recursion here instead of iteration?" (explanation probes integration)

**4. Transfer Assessment Validates Extended Abstract**

SOLO 5 (extended abstract) requires novel contexts:
- **Insufficient**: "Solve similar problem with different numbers"
- **Necessary**: "Apply pattern to unfamiliar domain" (e.g., DOM manipulation → Node.js streams)
- **Whole-task connection**: van Merriënboer's transfer paradox—varied practice produces better transfer than blocked practice
- **Assessment timing**: After SOLO 4 mastery, not before

### Research Gaps: SOLO × Assessment

- **Limited empirical validation**: SOLO application to programming assessment mostly theoretical (Lister et al. 2006 provides some CS-specific work, but limited)
- **Automated assessment at SOLO 4-5**: No validated methods for automating integration/transfer assessment
- **Cross-domain transfer measurement**: How to assess SOLO 5 competence when contexts are truly novel?
- **Progression timing**: When do students naturally progress through SOLO levels? Individual variation large, assessment implications unclear

**Tool implementation impact**: Current assessment tools lack validated SOLO-aligned rubrics, forcing each tool developer to create ad-hoc level definitions. Standardized, empirically-validated SOLO assessment instruments would enable consistent implementation across tools.

---

## Block Model × Assessment Strategies

### Block Model Recap (from `/1-taxonomies/`)

**Three-level comprehension model** (Schulte et al., 2010): Text Surface → Program Model → Situation Model. Progression from syntax awareness through execution understanding to problem-domain mapping. See `/1-taxonomies/` for complete framework.

### Block Model Enables Diagnostic Assessment

**Diagnostic principle**: Error classification reveals comprehension breakdown location.

| Error Type | Block Model Level | Example | Diagnostic Inference | Assessment Implication |
|------------|-------------------|---------|----------------------|------------------------|
| **Syntax error** | Text Surface | `let x 5` (missing `=`) | Struggling with language syntax | Needs syntax reference, not semantic explanation |
| **Execution error** | Program Model | Off-by-one in loop | Can't trace execution | Needs tracing practice, step-through debugging |
| **Logic error** | Situation Model | Sorts ascending instead of descending | Misunderstood problem requirements | Needs problem clarification, not code help |

**Assessment strategy**: When student fails, diagnose which Block Model level failed, provide targeted feedback.

### Block Model × Assessment Type Matrix

|  | **Text Surface Assessment** | **Program Model Assessment** | **Situation Model Assessment** |
|--|----------------------------|------------------------------|-------------------------------|
| **Formative** | Syntax checking, linting | Trace predictions, step-through | Problem restatement, design review |
| **Summative** | Grammar tests (rarely useful) | Execution explanation required | Design + implementation + rationale |
| **Automated (QLCs)** | ✅ Syntax, naming conventions | ⚠️ Can check trace correctness, not comprehension | ❌ Problem understanding hard to automate |
| **Manual** | ⚠️ Tedious for graders | ✅ Trace analysis, mental model checks | ✅ Essential for design quality |
| **Authentic** | ❌ Professionals use linters | ✅ Professional debugging = tracing | ✅ Professional work = problem-solving |

**Key Findings**:
- **Text Surface**: Automated tools (linters) suffice; manual assessment wasteful
- **Program Model**: Critical bottleneck for novices; trace-based assessment essential (Nelson, Xie, & Ko 2017)
- **Situation Model**: Requires human judgment; automated assessment insufficient

### Block Model-Based Assessment Design Principles

**1. Layer Assessment by Comprehension Level**

Assessment should explicitly test all three levels:
- **Level 1 (syntax)**: Automated linting (formative feedback)
- **Level 2 (execution)**: Predict-Observe-Explain tasks (trace accuracy)
- **Level 3 (semantics)**: Explanation questions (problem-solution mapping)

**Example assessment** (complete):
```javascript
// Given function:
function mystery(arr) {
  let result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}

// Level 1: "Identify any syntax errors" (none - automated check)
// Level 2: "Trace execution for mystery([1,2,3]), showing i and result after each iteration"
// Level 3: "Explain in plain English what problem this function solves and why it works"
```

**2. Prioritize Program Model for Novices**

Research (Xie et al., 2019): Comprehension-first pedagogy (read-trace-write) produces 10-15% learning gains.

**Assessment implication**:
- **Novice assessment**: Heavy emphasis on Level 2 (tracing, execution understanding)
- **Code reading assessment**: Before code writing assessment
- **Prediction tasks**: Force mental execution before running code

**3. Situation Model Assessment Requires Context**

Level 3 assessment can't be isolated code:
- **Insufficient**: "What does this function do?" (can answer by tracing)
- **Necessary**: "What problem does this solve? Why is this approach appropriate? What are trade-offs?"
- **Authentic assessment connection**: Professional code exists in problem context; assessment should too

### Block Model × QLCs Integration

QLCs (Lehtinen et al., 2023) primarily assess Levels 1-2:
- **Variable naming** → Level 1 (syntax conventions)
- **API usage** → Level 2 (understanding what APIs do)
- **Algorithmic approach** → Level 2/3 bridge (execution + problem fit)
- **Design decisions** → Level 3 (problem-solution mapping)

**Gap**: QLCs struggle with pure Level 3 assessment (why this design solves this problem?). Automated comprehension checking remains open research problem.

### Research Gaps: Block Model × Assessment

- **Progression measurement**: How to assess movement through levels? Students may master Level 1 but remain stuck at Level 2
- **Level 2 automation**: Trace-based assessment demonstrated (Lehtinen 2023), but explanation automation unsolved
- **Level 3 validity**: How to assess situation model understanding without human graders?
- **Cross-level integration**: Do students need Level 1 + Level 2 mastery before Level 3 assessment, or can levels develop in parallel?

**Tool implementation impact**: Level 2 (Program Model) assessments are feasible with trace data, enabling automated tracing tools. Level 3 (Situation Model) requires natural language explanations, forcing tools to either integrate LLMs or fall back to human grading.

---

## BSI Framework × Quality Dimensions (QLCs)

### BSI Recap (from `/1-taxonomies/`)

**Three-dimensional competency model** (Robins et al., 2003): Behavior × Strategy × Implementation. Traditional assessment over-focuses on Implementation. See `/1-taxonomies/` for complete framework.

### BSI × QLCs Natural Alignment

QLCs (Questions about Learners' Code) explicitly assess code properties beyond correctness:

| QLCs Category | BSI Dimension | What It Assesses | Automated? |
|---------------|---------------|------------------|------------|
| **Variable naming** | Implementation | Naming conventions, descriptiveness | ✅ Yes (pattern matching) |
| **API usage** | Strategy + Implementation | Appropriate library selection, idiomatic usage | ⚠️ Partial (can detect usage, harder to assess appropriateness) |
| **Algorithmic approach** | Strategy | Algorithm category (iterative/recursive), efficiency pattern | ⚠️ Partial (can classify, harder to assess optimality) |
| **Design decisions** | Behavior + Strategy | Conceptual understanding, trade-off reasoning | ❌ No (requires explanation) |
| **Control flow** | Implementation | Correct language feature usage | ✅ Yes (structural analysis) |

**Key Finding**: QLCs assess all three BSI dimensions, unlike traditional test-based assessment (only Behavior: does output match?).

### BSI-Aware Rubric Design

**Traditional rubric problem**: Single "correctness" dimension collapses B/S/I.

**Example traditional rubric**:
```
5 points: Code works
3 points: Code mostly works
1 point: Code doesn't work
0 points: No attempt
```
**Problem**: "Code works" could mean perfect Implementation with terrible Strategy (inefficient algorithm) or vice versa.

**BSI-aware rubric structure**:

| Dimension | Excellent (4) | Proficient (3) | Developing (2) | Novice (1) |
|-----------|--------------|----------------|----------------|------------|
| **Behavior** | Correct output for all test cases including edge cases | Correct for typical cases, fails on edge cases | Partially correct output | Incorrect output |
| **Strategy** | Efficient algorithm, appropriate data structures, good design decisions | Reasonable approach, minor inefficiencies | Inefficient but functional approach | Poor algorithm choice |
| **Implementation** | Clean code, good naming, proper idioms | Functional code, adequate naming | Code works but hard to read | Syntax issues, poor style |

**Total**: 12 points possible (4+4+4), not 5 points collapsed.

**Advantage**: Separate scores reveal specific strengths/weaknesses:
- Student A: (4,2,3) = Good Behavior/Implementation, weak Strategy → Needs algorithm design practice
- Student B: (3,4,2) = Good Strategy, weak Implementation → Needs syntax/style practice
- Traditional rubric: Both students score ~75%, missing diagnostic information

### BSI × Assessment Type Matrix

|  | **Behavior Assessment** | **Strategy Assessment** | **Implementation Assessment** |
|--|------------------------|------------------------|------------------------------|
| **Formative** | Test-based feedback (immediate) | Design review, algorithm discussion | Linting, style feedback |
| **Summative** | Test suite (multiple cases) | Explanation + justification required | Code quality metrics |
| **Automated** | ✅ Test frameworks | ⚠️ Partial (can detect patterns, not assess optimality) | ✅ Static analysis tools |
| **Manual** | ⚠️ Tedious (tests automate this) | ✅ Essential for design quality | ⚠️ Tedious (linters automate this) |
| **Authentic** | ✅ Professional code must work | ✅ Professional design decisions critical | ✅ Professional code quality standards |

**Key Findings**:
- **Behavior + Implementation**: Automatable (tests + linters)
- **Strategy**: Requires human judgment (design quality, trade-off reasoning)
- **Authentic assessment**: Must assess all three dimensions (professional work involves B+S+I together)

### BSI-Based Assessment Design Principles

**1. Assess Dimensions Separately**: Single "correctness" score masks diagnostic information. Rubrics should explicitly score B/S/I to reveal specific strengths/weaknesses.

**2. Strategy Requires Explanation**: Can't infer strategy from code alone. "Code uses recursion" (Implementation observation) ≠ "Why recursion over iteration?" (Strategy justification). Assessment method: Code + written/oral explanation.

**3. Apply Professional Standards Across All Dimensions**:
- **Behavior**: Beyond "works/doesn't"—assess correctness, robustness, edge cases, error handling, performance
- **Strategy**: Appropriate algorithm choice, efficiency awareness, trade-off reasoning
- **Implementation**: Professional code quality matching experience level (basic naming → modular design → team-ready code)

### BSI × Constructive Alignment

**Alignment principle** (Biggs & Tang): Learning objectives, teaching activities, assessment tasks must align.

**BSI application**:

| Learning Objective | Teaching Activities | Assessment Tasks (BSI-aligned) |
|--------------------|---------------------|--------------------------------|
| "Students will write correct programs" | Practice writing code, debugging | **Behavior**: Test-based correctness |
| "Students will design efficient solutions" | Algorithm analysis, complexity discussion | **Strategy**: Explain algorithm choice + justify trade-offs |
| "Students will write maintainable code" | Code review practice, refactoring exercises | **Implementation**: Code quality rubrics (naming, modularity, style) |

**Misalignment example**:
- Objective: "Design efficient solutions" (Strategy)
- Teaching: Algorithm lectures, complexity analysis
- Assessment: Tests check correctness only (Behavior)
- **Problem**: Teaching Strategy, assessing only Behavior

**Alignment example**:
- Objective: "Design efficient solutions" (Strategy)
- Teaching: Algorithm analysis, complexity discussion, design critique
- Assessment: Code + explanation of algorithm choice + trade-off justification (Strategy explicitly assessed)

### Research Gaps: BSI × Assessment

- **No validated BSI rubrics**: Despite framework existence since 2003, no widely-adopted, empirically-validated rubrics explicitly using BSI structure
- **Strategy automation**: Can we automate strategy assessment? Pattern detection vs optimality judgment unclear
- **BSI progression**: Do students develop B/S/I in sequence or parallel? Assessment timing implications?
- **Tool support**: What tools help assess Strategy dimension? (Code metrics assess Implementation, tests assess Behavior, Strategy underserved)

**Tool implementation impact**: Without validated BSI rubrics, assessment tools cannot reliably provide multi-dimensional feedback. Strategy detection remains an open challenge - tools can identify patterns (iteration vs recursion) but not judge appropriateness without problem context. This gap limits automated formative assessment at scale.

---

## Abstraction Transition × Transfer Assessment

### Abstraction Transition Recap (from `/1-taxonomies/`)

**Three-level abstraction progression** (Waite et al., 2016): Concrete → Transitional → Abstract. Progression from instance-based through pattern recognition to generalizable understanding. See `/1-taxonomies/` for complete framework and examples.

### Abstraction Levels Map to Assessment Difficulty

| Abstraction Level | Cognitive Load | Assessment Challenge | Example |
|-------------------|----------------|----------------------|---------|
| **Concrete** | Low | Recognize/recall specific instance | "What does `arr.push(5)` do?" |
| **Transitional** | Medium | Apply pattern to similar context | "Use push to add elements from another array" |
| **Abstract** | High | Transfer to novel context | "Implement append without push" |

**Whole-task connection**: van Merriënboer's transfer paradox demonstrates abstract-level thinking requires varied practice, not blocked practice.

### Abstraction × Transfer Assessment

**Transfer** (Barnett & Ceci, 2002): Applying learning to novel contexts differing from instruction.

**Transfer dimensions**:
- **Near transfer**: Similar problem, slightly different context (Concrete → Transitional)
- **Far transfer**: Different problem type, unfamiliar domain (Transitional → Abstract)

**Assessment principle**: Measure transfer to validate abstraction level.

| Assessment Type | Abstraction Level Required | Transfer Type | Example |
|-----------------|----------------------------|---------------|---------|
| **Reproduction** | Concrete (memorization) | None | "Write the factorial function from lecture" |
| **Near transfer** | Transitional (pattern recognition) | Near | "Write Fibonacci (similar to factorial structure)" |
| **Far transfer** | Abstract (generalization) | Far | "Implement memoization decorator (recursion + state abstraction)" |

**Key Finding**: Most traditional assessment tests reproduction or near transfer. Far transfer (abstraction mastery) rarely assessed.

### Abstraction-Based Assessment Design Principles

**1. Progression from Concrete to Abstract Assessment**

Novices operate at concrete level; experts at abstract level. Assessment difficulty should match:

**Novice assessment** (concrete):
- "Write a function that reverses an array using a loop"
- Specific instance, explicit structure

**Intermediate assessment** (transitional):
- "Write a function that transforms arrays using higher-order patterns"
- Pattern recognition, multiple valid approaches

**Advanced assessment** (abstract):
- "Design an abstraction for deferred computation"
- Generalization beyond specific data structures or operations

**2. Transfer Tasks Validate Abstraction**

**Insufficient** (concrete assessment):
```javascript
// Lecture example:
function sumArray(arr) {
  let total = 0;
  for (let x of arr) total += x;
  return total;
}

// Assessment: "Write a similar function to find the product"
// → Near transfer, tests pattern recognition
```

**Necessary** (abstract assessment):
```javascript
// Lecture: Array iteration patterns
// Assessment: "Implement reduce from scratch, then use it to implement sum and product"
// → Far transfer, tests abstraction understanding (reduce generalizes accumulation)
```

**3. Abstraction Level Determines Automation Feasibility**

- **Concrete**: Automatable (test-based, specific outputs)
- **Transitional**: Partially automatable (pattern detection possible, optimality judgment hard)
- **Abstract**: Requires human judgment (transfer assessment needs semantic understanding)

### Abstraction × QLCs Integration

**QLCs effectiveness varies by abstraction level**:

| QLCs Category | Concrete Level | Transitional Level | Abstract Level |
|---------------|----------------|--------------------| ---------------|
| **Variable naming** | ✅ Automatable (conventions) | ✅ Automatable (pattern consistency) | ⚠️ Requires context (appropriateness judgment) |
| **API usage** | ✅ Automatable (correct usage) | ⚠️ Partial (can detect patterns) | ❌ Manual (transfer context needed) |
| **Algorithm approach** | ✅ Automatable (classification) | ⚠️ Partial (efficiency patterns) | ❌ Manual (appropriateness requires problem understanding) |

**Key insight**: QLCs excel at concrete-level assessment (Lehtinen 2023 demonstrated at MOOC scale), struggle with abstract transfer assessment. This limitation affects automated formative assessment for advanced students.

### Abstraction × SOLO Correlation

Abstraction levels correlate strongly with SOLO levels:

| Abstraction | SOLO | Cognitive Characteristic |
|-------------|------|--------------------------|
| Concrete | Unistructural | Single instance, isolated understanding |
| Transitional | Multistructural → Relational | Multiple instances, pattern recognition, beginning integration |
| Abstract | Relational → Extended Abstract | Generalized understanding, transfer across contexts |

**Assessment implication**: SOLO assessment principles (scaffold to next level, integration requires explanation, transfer validates mastery) apply to Abstraction assessment.

### Abstraction × Authentic Assessment

**Authentic assessment** (Gulikers 2004): Assessment should resemble professional practice (criterion situation).

**Abstraction connection**: Professional programming requires abstract-level thinking:
- Professionals recognize patterns across codebases (Transitional)
- Professionals generalize solutions across domains (Abstract)
- Professionals don't memorize specific code snippets (Concrete)

**Assessment principle**: Authentic assessment should emphasize Transitional → Abstract levels, not Concrete recall.

**Example authentic task** (abstract level):
"Review this unfamiliar codebase. Identify design patterns used, propose refactoring to improve modularity, justify your recommendations."
- Requires pattern recognition (Transitional)
- Requires generalization and transfer (Abstract)
- Mirrors professional code review practice

### Research Gaps: Abstraction × Assessment

- **Progression measurement**: How to assess movement from Concrete → Transitional → Abstract? Students may stall at Transitional
- **Transfer task design**: What constitutes valid "far transfer" assessment? Too far → unsolvable; too near → not measuring abstraction
- **Automated abstraction assessment**: Can we automate abstract-level assessment? Current tools limited to concrete pattern detection
- **Individual variation**: Some students skip Transitional, moving directly Concrete → Abstract. Assessment implications?

**Tool implementation impact**: Transfer assessment requires cross-context comparison capabilities that most tools lack. Tools need to present multiple varied problems and analyze pattern transfer, not just single-problem correctness. This architectural requirement affects fundamental tool design.

---

## Taxonomy-Driven Assessment: Trace Data Considerations

**Core principle**: Different taxonomy levels present different assessment requirements, with implications for what trace data educational tools need to collect.

**Boundary reminder**: Step 5 specifies HOW trace infrastructure provides data; this section discusses WHAT assessment conceptually requires at each level.

### Trace Data Richness by Taxonomy Complexity

| Assessment Complexity | Conceptual Data Needs | Example Taxonomies | Rationale |
|-----------------------|----------------------|-------------------|-----------|
| **Basic** | Minimal execution data (errors, completion) | SOLO 1-2, Concrete, Text Surface | Students working with isolated concepts need simple feedback |
| **Moderate** | Detailed execution traces (variables, control flow) | SOLO 3, Transitional, Program Model | Multiple concepts integration requires comprehensive execution visibility |
| **Comprehensive** | Full semantic context (async, objects, metadata) | SOLO 4-5, Abstract, Situation Model | Transfer and integration assessment needs rich execution context |

**Key insight**: Assessment tools designed for higher taxonomy levels require richer trace data than those targeting basic levels. The trace infrastructure must support this range.

### Performance vs Richness Trade-offs

**Educational context impacts acceptable overhead**:
- **Formative practice**: Students tolerate ~30% slowdown for rich feedback
- **Timed assessments**: Minimal overhead critical (<5% slowdown)
- **Portfolio work**: Any overhead acceptable (students submit pre-traced code)

**Design tension**: Comprehensive traces enable better assessment but increase execution overhead. Tools must balance pedagogical value against performance impact.

### Taxonomy-Specific Data Examples

**SOLO progression needs**:
- **Unistructural**: Single concept verification (e.g., "Did loop execute?")
- **Multistructural**: Multiple concept detection (e.g., "Used both loops AND arrays?")
- **Relational**: Integration patterns (e.g., "Nested iteration accessing related data structures?")

**Block Model progression needs**:
- **Text Surface**: Static analysis sufficient (no execution trace)
- **Program Model**: Execution flow and state changes
- **Situation Model**: Execution data + problem context linkage

**BSI dimension needs**:
- **Behavior**: Output correctness (minimal trace)
- **Strategy**: Algorithm pattern detection (control flow + data structures)
- **Implementation**: Code quality metrics (naming, structure, idioms)

### Tool Developer Considerations

**Assessment capability depends on trace access**:
1. **Diagnostic tools** (identifying misconceptions) need rich execution data to detect error patterns
2. **Formative feedback tools** need moderate data for actionable guidance
3. **Summative grading tools** often need minimal data (correctness sufficient)

**Configuration decisions** (deferred to Step 5):
- What granularity levels to support?
- What performance profiles to enable?
- What serialization depth to offer?

**Forward reference**: See Step 5 for trace configuration specifications enabling these assessment approaches.

---

## Practical Implications for Tool Developers

### 1. Taxonomy Selection Determines Assessment Capabilities

**Decision**: Which taxonomy(-ies) does your tool support?

**Implications**:
- SOLO → Need difficulty progression, scaffold to next level
- Block Model → Need diagnostic capabilities (syntax vs execution vs semantic errors)
- BSI → Need multi-dimensional rubrics (Behavior/Strategy/Implementation separate scores)
- Abstraction → Need transfer task design, cross-context comparison

**Example**: Tool supporting SOLO must implement:
- Level detection (what SOLO level is this student?)
- Next-level task generation (scaffold upward)
- Assessment appropriate to level (don't grade prestructural, require explanation at relational)

### 2. Configuration Follows Taxonomy Requirements

**Principle**: Taxonomy determines required trace granularity.

**Pattern**: Tools select trace configuration matching target taxonomy level. Lower levels (SOLO 1-2, Concrete, Text Surface) need minimal data; higher levels (SOLO 4-5, Abstract, Situation Model) require comprehensive traces. See Step 5 for configuration specifications.

### 3. Assessment Logic Lives in Tools, Not Embody

**Embody provides**: Raw trace events (variable.declare, function.call, etc.)

**Tools implement**:
- SOLO level detection (analyzing trace patterns for concept count, integration, transfer)
- Block Model error classification (syntax vs execution vs semantic errors)
- BSI dimension scoring (Behavior via output tests, Strategy via algorithm patterns, Implementation via code quality)
- Abstraction level inference (pattern recognition across multiple problem contexts)

**Conceptual approach**: Tools analyze trace data to infer student's current taxonomy level, then generate appropriate assessment tasks and feedback targeting next level in progression.

### 4. Rubric Generation from Taxonomy + Trace

**Pattern**: Tools generate multi-dimensional rubrics aligned with taxonomy frameworks, using both static code analysis and dynamic trace data for comprehensive assessment across taxonomy dimensions.

### 5. Alignment Verification

**Tool responsibility**: Verify assessment aligns with taxonomy-guided instruction.

**Checklist**:
- ✅ Does assessment target same taxonomy level as instruction?
- ✅ Does trace configuration provide needed data for this taxonomy?
- ✅ Do rubrics score taxonomy-relevant dimensions?
- ✅ Does feedback guide progression through taxonomy levels?

**Anti-pattern**: Teaching at SOLO 4 (relational integration), assessing at SOLO 2 (isolated concepts).

---

## Research Gaps and Future Directions

### Validated Assessment Frameworks Needed

**Gap**: Despite taxonomy existence (SOLO since 1982, BSI since 2003, Block Model since 2010), few validated assessment instruments explicitly using these frameworks.

**Need**: Empirically-validated rubrics, question banks, automated assessment methods for each taxonomy.

**Opportunity**: Trace data enables novel validation approaches (correlate trace patterns with expert taxonomy-level judgments).

### Automated Assessment at Higher Taxonomy Levels

**Gap**: Automation ceiling at SOLO 3, Block Model Level 2, BSI Behavior+Implementation only.

**Challenge**: Higher levels (SOLO 4-5 integration/transfer, Block Model Level 3 semantics, BSI Strategy) require semantic understanding beyond current AI capabilities.

**Promising direction**: LLM-based assessment may enable automated explanation evaluation, but validation needed (does AI feedback actually improve learning?).

### Cross-Taxonomy Correlation

**Gap**: How do taxonomies relate? Is SOLO 4 equivalent to Block Model Level 3? Does BSI Strategy map to Abstraction Transition's Transitional level?

**Need**: Empirical studies correlating student progression across multiple taxonomies.

**Assessment implication**: Tools supporting multiple taxonomies need principled mapping, not arbitrary assumptions.

### Individual Variation in Progression

**Gap**: Taxonomies assume linear progression; students show asynchronous development (strong in Strategy, weak in Implementation; high SOLO in one domain, low in another).

**Assessment challenge**: How to assess students who don't fit taxonomy assumptions? Multi-dimensional assessment required, but validity unclear.

### Taxonomy-Driven Adaptive Assessment

**Opportunity**: Use trace data to detect current taxonomy level, adapt assessment difficulty dynamically.

**Challenge**: Requires real-time taxonomy-level inference (feasible with trace patterns?) and validated task difficulty calibration.

**Research needed**: Can we reliably infer SOLO level, Block Model level, BSI competencies, Abstraction level from traces alone? Validation against expert judgments needed.

### Fair Assessment Across Taxonomy Levels

**Gap**: Ko (2021) demonstrates assessment bias, but no research on taxonomy-specific bias. Do higher taxonomy level assessments systematically disadvantage certain student groups?

**Example concern**: Abstract-level assessment may favor students with broader prior experience (more exposure to pattern transfer contexts).

**Need**: Fairness analysis at each taxonomy level, mitigation strategies for identified biases.

---

## Summary: Taxonomy-Assessment Integration

**Key Takeaways**:

1. **Taxonomies provide principled progression frameworks** for assessment difficulty calibration, diagnostic capabilities, and validity grounding.

2. **Different taxonomies serve different assessment purposes**:
   - SOLO: Difficulty progression, scaffold to next level
   - Block Model: Diagnostic error classification, targeted feedback
   - BSI: Multi-dimensional quality assessment beyond correctness
   - Abstraction: Transfer assessment, generalization validation

3. **Assessment logic lives in tools**: Embody provides neutral trace events; tools implement taxonomy-specific assessment algorithms.

4. **Research gaps substantial**: Validated instruments, automated higher-level assessment, cross-taxonomy correlation, adaptive assessment all need empirical work.

**Integration complete**: Taxonomy frameworks inform assessment design; assessment validates taxonomy progression. Next integration: [Misconception-Driven Assessment](./misconception-driven-assessment.md).
