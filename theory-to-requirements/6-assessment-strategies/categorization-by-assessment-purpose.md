# Assessment Use Cases by Purpose

**Step 4 Deliverable**: Categorization scheme organizing assessment use cases by educational purpose

**Purpose**: Different audiences need different organizational lenses. This document organizes assessment approaches by WHY we assess, helping educators select appropriate strategies for their goals.

**Who this serves**:
- **Educators**: Planning course assessment strategy, balancing multiple purposes
- **Tool developers**: Understanding which assessment purposes to support
- **Researchers**: Studying effectiveness of different assessment types

---

## Introduction: The Five Assessment Purposes

Programming assessment serves multiple educational purposes, each requiring different approaches:

1. **Formative Assessment**: Support ongoing learning through feedback (not grading)
2. **Summative Assessment**: Measure achievement at course milestones
3. **Diagnostic Assessment**: Identify specific gaps/misconceptions for targeted intervention
4. **Authentic Assessment**: Evaluate performance in professional-realistic contexts
5. **Quality Assessment**: Measure code quality beyond functional correctness

**Research foundation**: These categories come from established assessment theory (Black & Wiliam 1998 on formative; Gulikers et al. 2004 on authentic; Lehtinen et al. 2023 on quality/QLCs).

**Key insight**: Same code trace can support multiple purposes—tools determine interpretation.

---

## 1. Formative Assessment

**Educational Goal**: Support learning in progress, provide actionable feedback, enable self-correction

**Timing**: During learning, before high-stakes assessment

**Grading**: Minimal or no grading—focus on improvement

### Core Principle

"Assessment FOR learning" (not OF learning). Formative assessment's purpose is growth, not measurement. Research shows formative feedback consistently more effective than grades alone for learning outcomes (Black & Wiliam 1998).

### Use Cases in This Category

#### Real-Time Syntax/Error Detection

**What tools do**: Flag syntax errors and common mistakes as students type, with immediate contextual explanations to prevent practice of incorrect patterns.

**Educational value**: Immediate correction prevents misconception reinforcement. Students learn correct syntax through consistent real-time feedback.

**Example**: Student writes `let x;` then attempts `x + 5`. Tool immediately shows "undefined + number = NaN" with explanation that variables aren't auto-initialized.

---

#### Misconception-Triggered Explanations

**What tools do**: Detect execution patterns indicating specific misconceptions (var/let confusion, coercion errors, reference bugs), provide targeted explanations correcting mental model errors.

**Educational value**: Generic "error" messages don't teach—misconception-specific feedback addresses root cause. "You're reading `total` before assigning a value. Variables don't auto-initialize to 0 in JavaScript."

**Example**: Student's loop produces NaN. Tool detects uninitialized variable read pattern, explains initialization requirement, connects to variable lifecycle concept from prior lessons.

---

#### POE (Predict-Observe-Explain) Cycle Support

**What tools do**: Enable predict-observe-explain workflow by recording student predictions, executing code, comparing predicted vs actual behavior, prompting explanation of discrepancies to reveal mental model gaps.

**Educational value**: Predictions expose mental models. Reality provides counterevidence. Cognitive dissonance drives conceptual change. Student ownership of discovery enhances learning.

**Example**: Predict async operation order. Execute. Observe actual order. Explain difference reveals event loop understanding gaps.

---

#### Progressive Hint Scaffolding

**What tools do**: Provide multi-level hints (conceptual → strategic → tactical → code-specific) based on student progress and error patterns, supporting zone of proximal development without giving away solutions.

**Educational value**: Scaffolding enables independent problem-solving. Progressive disclosure prevents learned helplessness from immediate solutions.

**Example sequence**:
1. "Which line produces the unexpected value?" (location hint)
2. "The loop runs, but the accumulator isn't updating correctly" (conceptual)
3. "Check whether you're using += or just =" (strategic)
4. "You need `sum += arr[i]` not `sum = arr[i]`" (specific)

---

#### Live Coding Feedback

**What tools do**: Analyze code during development, provide immediate feedback on quality issues (naming, structure, patterns) beyond correctness to build good habits early.

**Educational value**: Quality habits form during practice. Waiting until summative assessment means bad habits already reinforced.

**Example**: Student uses single-letter variables. Tool suggests: "Variable `x` could be more descriptive. Consider `userCount` or `totalScore` to make code self-documenting."

---

#### Liminal State Support (Threshold Concepts)

**What tools do**: Detect when student in liminal state for threshold concepts (async, closures, prototypes, recursion), provide scaffolding without grading confusion.

**Educational value**: Threshold crossing involves productive confusion—grading it punishes normal learning. Supportive feedback during struggle accelerates breakthrough.

**Example**: Student inconsistently predicts closure behavior. Tool detects liminal state: "You're building toward understanding closures—confusion is normal. Notice that closures capture references, not values."

---

#### Integrated Concept Practice

**What tools do**: Present tasks requiring multiple concepts together (closure + async, NM integration), provide formative feedback on connections without grading.

**Educational value**: Real programming requires coordination. Formative practice with integration prepares for summative assessment.

**Example**: Task uses closures with async callbacks. Formative feedback addresses scope chain + event loop coordination, building toward integrated understanding.

---

### Formative Assessment Principles

**From research (Keuning et al. 2019 systematic review)**:

1. **Immediacy varies by skill**: Procedural (syntax) benefits from immediate feedback; conceptual understanding benefits from slight delay allowing reflection.

2. **Specificity matters**: Level 4-5 feedback (misconception diagnosis + corrective strategy) superior to generic "incorrect."

3. **Scaffolding over solutions**: Guide discovery rather than provide answers.

4. **Normalize struggle**: Threshold concepts, complex integration—confusion is expected, not failure.

5. **Fairness considerations**: Ensure feedback accessible to students with disabilities (screen reader compatibility, keyboard navigation), adjusts for English proficiency in explanations (avoid idioms in automated feedback), available across time zones (asynchronous access critical for distributed learners).

---

## 2. Summative Assessment

**Educational Goal**: Measure achievement at course milestones, verify learning objectives met

**Timing**: End of unit, semester, course

**Grading**: Yes—determines course outcomes

### Core Principle

"Assessment OF learning." Summative assessment measures whether students have achieved learning objectives. Must be valid (tests what it claims), reliable (consistent results), and fair (equitable across demographics).

### Use Cases in This Category

#### Quality-Based Grading (QLCs)

**What tools do**: Assess code quality dimensions (naming, API usage, algorithmic approach, design patterns) at scale, enabling grading beyond functional correctness.

**Educational value**: Professional programming requires quality, not just correctness. Assessment must reflect this from introductory courses onward (Lehtinen et al. 2023).

**Example rubric**:
- Correctness (tests pass): 40%
- Naming quality (descriptive, conventional): 20%
- API appropriateness (modern, idiomatic): 20%
- Algorithmic approach (efficiency, clarity): 20%

---

#### Taxonomy-Aligned Rubrics

**What tools do**: Evaluate student work against learning progression models (SOLO levels, Block Model phases, BSI dimensions), determining current level and readiness for advancement.

**Educational value**: Grades should reflect learning trajectory, not just final state. Taxonomy alignment shows growth path.

**SOLO example**:
- Prestructural (F): No coherent approach
- Unistructural (D): Isolated correct elements
- Multistructural (C): Multiple elements, disconnected
- Relational (B): Integrated solution
- Extended Abstract (A): Transfers to novel contexts

---

#### Multi-Dimensional Evaluation

**What tools do**: Assess correctness + quality + process + comprehension simultaneously, providing multifaceted score.

**Educational value**: Single correctness score misses crucial dimensions. Multidimensional assessment reveals strengths/weaknesses.

**Example dimensions**:
- Behavior: Does code produce correct output? (30%)
- Strategy: Appropriate algorithm choice? (25%)
- Implementation: Idiomatic, maintainable code? (25%)
- Comprehension: Can explain how code works? (20%)

---

#### Threshold Crossing Verification

**What tools do**: Verify threshold concepts (async, closures, prototypes, recursion) have been crossed before advancing to next unit.

**Educational value**: Threshold concepts prerequisite for advanced topics. Summative verification prevents advancing students lacking foundations.

**Assessment approach**:
- Complex scenarios requiring threshold understanding
- Transfer to novel contexts (Extended Abstract level)
- Model-based explanations required (not memorization)

---

#### Integration Tasks

**What tools do**: Require applying multiple concepts from entire unit together in complex tasks.

**Educational value**: Real problems don't isolate concepts. Integration assessment tests authentic capability.

**Example**: "Implement async data processor using closures for state management, prototypes for shared methods, recursion for nested structures."

---

### Summative Assessment Principles

**From research (Ko 2019, 2021 on validity)**:

1. **Constructive alignment**: Assessment tasks must match stated learning objectives.

2. **Psychometric validation**: Use IRT/DIF analysis to detect biased items that disadvantage specific groups.

3. **Avoid ceiling/floor effects**: Tasks should differentiate across achievement levels, not cluster at extremes.

4. **Comprehensive sampling**: Test representative subset of course content, not exhaustive coverage.

5. **Fairness imperative**: Summative assessment (affects grades, advancement, credentials) demands rigorous fairness validation. Apply Item Response Theory to detect items with poor discrimination or inappropriate difficulty. Use Differential Item Functioning (DIF) analysis to identify items showing demographic bias (gender, race, English proficiency, socioeconomic status). Ensure accessibility compliance (WCAG standards for screen readers, keyboard navigation, time extensions for disabilities). Fairness failures in high-stakes assessment have serious consequences—validation is ethical requirement, not optional enhancement.

---

## 3. Diagnostic Assessment

**Educational Goal**: Identify specific knowledge gaps, misconceptions, or prerequisite deficits for targeted intervention

**Timing**: Pre-unit (readiness), during learning (struggling students), before summative (verification)

**Grading**: No—diagnostic purpose is identification, not measurement

### Core Principle

"Assessment TO inform instruction." Diagnostic assessment reveals WHAT student doesn't understand and WHY, enabling precise intervention rather than generic reteaching.

### Use Cases in This Category

#### Misconception Pattern Detection

**What tools do**: Analyze execution traces to detect specific misconception patterns (uninitialized reads, closure variable capture errors, async timing bugs, reference aliasing) automatically without explicit tests.

**Educational value**: Implicit assessment during normal coding avoids test anxiety. Scale to detect misconceptions in practice code across entire class.

**Pattern example**: Repeated `undefined + number = NaN` → Variable initialization misconception (Tier 1, 65% frequency).

---

#### Pre-Assessment for Readiness

**What tools do**: Identify existing misconceptions before instruction begins (from prior courses, self-teaching, other languages).

**Educational value**: Instructor knows which misconceptions to address explicitly vs assume mastery. Curriculum adapts to student background.

**Example task**: "Predict output" questions targeting known misconceptions:
- Pass-by-reference for primitives?
- Variable auto-initialization?
- Closure + loop variable confusion?

---

#### Threshold State Detection

**What tools do**: Distinguish pre-threshold, liminal, and post-threshold states for each of 4 JavaScript thresholds (async, closures, prototypes, recursion).

**Educational value**: Different states need different interventions. Pre-threshold needs instruction. Liminal needs scaffolded practice. Post-threshold ready for integration.

**Detection indicators**:
- Pre-threshold: No systematic errors (random)
- Liminal: Inconsistent predictions, partial correctness
- Post-threshold: Consistent accuracy, model-based explanations

---

#### Taxonomy Level Diagnosis

**What tools do**: Determine student's current SOLO level, Block Model level, or BSI dimension mastery.

**Educational value**: Instruction and tasks must match current level. Diagnosis enables appropriately challenging work.

**SOLO diagnosis example**:
- Can list scope types → Unistructural
- Can't integrate into scope chain model → Not yet Relational
- Needs Multistructural practice before Relational tasks

---

#### NM Understanding Diagnosis

**What tools do**: Identify which of the 12 JavaScript notional machines student misunderstands when error occurs.

**Educational value**: Generic debugging help isn't targeted. NM diagnosis enables specific model correction.

**Example**: Student's code shows unexpected `this` value. Diagnostic: This Binding NM misunderstanding (likely call-site confusion). Intervention: Systematic this binding rule practice.

---

### Diagnostic Assessment Principles

**From misconception research (Qian & Lehman 2017; Sorva et al.)**:

1. **Minimal pairs**: Isolate specific misconceptions by changing single variable between scenarios.

2. **Prediction before execution**: Student predictions expose mental models better than observing behavior alone.

3. **Pattern recognition**: Automated detection requires multiple instances to distinguish misconception from typo.

4. **Severity assessment**: Persistent misconceptions require more intervention than sporadic errors.

5. **Fairness in diagnosis**: Misconception detection patterns validated on diverse populations may not transfer to all student backgrounds. Prior language experience (Python developers bring different misconceptions to JavaScript than Java developers), cultural context (coding education norms vary internationally), and English proficiency (misconception explanations must be linguistically accessible) affect diagnostic accuracy. Avoid misdiagnosing language/background differences as conceptual gaps.

---

## 4. Authentic Assessment

**Educational Goal**: Evaluate performance in professional-realistic contexts that mirror actual programming work

**Timing**: Throughout course, especially for advanced students

**Grading**: Can be formative or summative depending on course design

### Core Principle

"Assessment resembles criterion situation." Authentic assessment has five dimensions (Gulikers et al. 2004):
1. Task complexity (real-world messiness)
2. Physical context (professional tools/environment)
3. Social context (collaboration, code review)
4. Assessment criteria (professional quality standards)
5. Result form (deliverable resembles professional output)

### Use Cases in This Category

#### Debug Legacy Code

**What tools do**: Present buggy, poorly-documented code (realistic) for students to read, trace, debug, and fix.

**Educational value**: Professionals debug others' code constantly. CodeWrite pedagogy (comprehension before production) uses debugging as primary learning mode.

**Authenticity dimensions**:
- Task: Real bug types (not contrived)
- Context: Professional debugger tools
- Criteria: Fix without breaking other functionality
- Result: Commented explanation of bug + fix

---

#### Code Review Tasks

**What tools do**: Students review peer code, identify misconceptions, suggest improvements using professional code review conventions.

**Educational value**: Professional developers review code daily. Reviewing others' code deepens own understanding.

**Authenticity**: Social context (peer interaction), criteria (professional review standards), result form (GitHub-style PR comments).

---

#### Production Bug Triage

**What tools do**: Categorize errors by likely misconception type, prioritize by severity, propose debugging strategies—professional debugging workflow.

**Educational value**: Real debugging isn't single-step. It's hypothesis-test-refine cycle requiring systematic reasoning.

**Example**: Student sees error stack trace. Tasks:
1. Categorize error type (which NM or misconception?)
2. Severity (crash vs incorrect output)?
3. Debugging strategy (add logging where, inspect which values)?
4. Hypothesis (what do you think caused it)?

---

#### Refactor Working Code

**What tools do**: Improve code quality without changing behavior—professional maintenance task.

**Educational value**: Shipping code must be maintainable. Refactoring tests whether student understands WHY code works, not just THAT it works.

**Authenticity**: Result form (improved code + rationale document), criteria (quality standards without behavior change), task complexity (requires deep comprehension).

---

#### Professional Tool Integration

**What tools do**: Use professional debuggers, profilers, linters, type checkers—authentic programming environment.

**Educational value**: Students should learn tools they'll use professionally. Assessment in authentic context transfers better.

**Example**: Debug async code using browser DevTools, understanding call stack, network tab, async stack traces—professional workflow.

---

### Authentic Assessment Principles

**From research (Gulikers et al. 2004)**:

1. **Tension with automation**: Authenticity allows multiple valid solutions, complicating automated assessment. Balance needed.

2. **Physical context matters**: Assessment in IDE/debugger more authentic than isolated code editor.

3. **Social context**: Pair programming, code review, team debugging more authentic than solo work.

4. **Graduated complexity**: Start with simplified authenticity (toy bug in clean code), progress to full realism (production codebase bug).

---

## 5. Quality Assessment

**Educational Goal**: Evaluate code quality dimensions beyond correctness (QLCs framework)

**Timing**: After functionality established—quality on top of correctness

**Grading**: Often formative early, summative later

### Core Principle

"Professional code must be good, not just working." Lehtinen et al. (2023) demonstrated QLCs (Questions about Learners' Code) at MOOC scale: automated assessment of naming, API usage, algorithm choice, design patterns—invisible to functional tests.

### Use Cases in This Category

#### Identifier Naming Assessment

**What tools do**: Evaluate variable/function names for descriptiveness, convention adherence, consistency.

**Educational value**: Self-documenting code starts with naming. Quality assessment makes implicit knowledge explicit.

**Quality criteria**:
- Not single letters (except loop counters)
- Descriptive (role/purpose clear from name)
- Conventional (camelCase for variables, PascalCase for classes)
- Consistent (same naming style throughout)

---

#### API Usage Evaluation

**What tools do**: Assess appropriateness of chosen APIs and library functions for given tasks.

**Educational value**: Modern APIs exist for reasons (performance, security, clarity). Quality assessment teaches idiomatic programming.

**Example**: Student uses manual loop for array sum. Tool suggests: "Array.reduce() more idiomatic for accumulation. Your loop works but modern JavaScript has built-in patterns for this."

---

#### Algorithmic Approach Detection

**What tools do**: Identify iteration vs recursion, detect complexity patterns (O(n), O(n²)), recognize algorithm categories from execution.

**Educational value**: Same problem, multiple algorithms. Quality assessment teaches efficiency awareness.

**Detection example**: Nested loops → O(n²). Tool notes: "This algorithm is quadratic. For large inputs, consider linear alternative (Set-based lookup)."

---

#### Design Pattern Recognition

**What tools do**: Detect usage of accumulator, filter-map-reduce, observer, factory patterns.

**Educational value**: Patterns are professional vocabulary. Recognition assessment teaches when patterns appropriate.

**Example**: Student manually builds result array. Tool recognizes pattern: "This is filter-map pattern. Consider: `arr.filter(condition).map(transform)`."

---

#### Code Complexity Assessment

**What tools do**: Measure cyclomatic complexity, nesting depth, function length to evaluate code simplicity.

**Educational value**: Simple code easier to understand, debug, maintain. Complexity metrics make quality objective.

**Criteria**:
- Cyclomatic complexity < 10 (good)
- Nesting depth ≤ 3 levels (readable)
- Function length < 50 lines (focused responsibility)

---

#### Code Structure Evaluation

**What tools do**: Assess organization, modularity, separation of concerns.

**Educational value**: Professional code well-structured. Quality assessment teaches architectural thinking.

**Metrics**: Coupling (low), cohesion (high), single responsibility, clear module boundaries.

---

### Quality Assessment Principles

**From QLCs research (Lehtinen et al. 2023)**:

1. **Scalability**: Automated quality assessment enables feedback for thousands (MOOCs).

2. **Beyond correctness**: 1/3 of students produce working code they don't comprehend. Quality assessment detects this.

3. **Progressive standards**: Early course: basic quality (naming). Late course: advanced (patterns, architecture).

4. **Explicit criteria**: Quality is subjective without rubrics. Make standards concrete and justified.

---

## 6. Process Assessment

**Educational Goal**: Evaluate development/debugging process quality beyond final product

**Timing**: During development, retrospective code history analysis

**Grading**: Often formative (build good habits), can be summative (professional skills)

### Core Principle

Programming is problem-solving activity with processes that can be systematic or haphazard. "Process quality predicts product quality" - teaching process evaluation makes implicit professional skills explicit and measurable.

### Use Cases in This Category

#### Debugging Strategy Classification

**What tools do**: Distinguish systematic hypothesis-driven debugging (using debugger, forming hypotheses, narrowing scope) from trial-and-error random changes (print spam, uncommenting lines, guess-and-check).

**Educational value**: Debugging sophistication is learnable skill, not magic. Systematic strategies transfer across problems. Recognition enables explicit instruction.

**Assessment approach**:
- Track student debugging actions (tool usage, code changes, test runs)
- Classify strategy: hypothesis-driven, documentation-based, example-based, trial-and-error
- Provide feedback on strategy effectiveness

---

#### Development Pattern Analysis

**What tools do**: Track whether student writes tests first or after implementation, uses version control checkpoints appropriately, refactors incrementally vs big bang rewrites, providing process quality feedback beyond product assessment.

**Educational value**: Professional development practices (TDD, incremental refactoring, version control discipline) separate novices from experts but rarely taught explicitly.

**Patterns tracked**:
- Test-first vs test-after
- Incremental commits vs infrequent large commits
- Continuous refactoring vs rewrite
- Feature branches vs direct-to-main

---

#### Revision Behavior Tracking

**What tools do**: Analyze code revision patterns (incremental refinement vs complete rewrites, addressing feedback systematically vs ignoring), measuring growth mindset indicators and self-regulation quality.

**Educational value**: How students respond to feedback reveals self-regulation and growth mindset. Students who iteratively refine show better long-term learning than those who repeatedly restart.

**Indicators tracked**:
- Feedback incorporation rate
- Refinement vs rewrite ratio
- Persistence through difficulty
- Help-seeking timing

---

#### Tool Usage Appropriateness

**What tools do**: Assess whether student uses professional tools appropriately for task (debugger for logic errors vs print debugging for quick checks, profiler for performance issues, linter for style enforcement), teaching authentic workflows.

**Educational value**: Tool selection is professional judgment. Print debugging appropriate for quick checks, systematic debugger for complex bugs. Teaching when to use which tool builds authentic competence.

**Tool usage patterns**:
- Debugger vs print debugging (context-appropriate?)
- Profiler usage for performance problems
- Linter/type checker integration
- Documentation consultation timing

---

### Process Assessment Principles

**From professional practice observation and debugging research**:

1. **Process predicts product**: Students with systematic debugging produce fewer bugs, resolve faster.

2. **Implicit → Explicit**: Professionals have internalized processes novices lack. Assessment makes these visible and teachable.

3. **Formative focus**: Process assessment most valuable during learning (build habits), less for grading (can feel invasive).

4. **Authentic tools**: Assess process in realistic contexts (IDE debuggers, git history, actual tools) not isolated exercises.

---

## 7. Comprehension Verification

**Educational Goal**: Test whether student understands WHY code works, not just that it works

**Timing**: After functional code produced, before advancing

**Grading**: Can be formative (build understanding) or summative (verify comprehension prerequisite)

### Core Principle

"Tests pass" doesn't guarantee understanding. Students produce working code through pattern matching, trial-and-error, or copying without comprehension. Asking students to explain, predict, or apply concepts distinguishes genuine understanding from cargo cult programming.

**Research foundation**: Ko (2019) demonstrates students regularly produce functionally correct code they cannot explain, predict behavior for, or transfer to novel contexts.

### Use Cases in This Category

#### Code Explanation Assessment

**What tools do**: Require students to explain their working code's execution model, logic flow, and design decisions in own words, distinguishing memorized patterns from genuine understanding.

**Educational value**: Explanation forces articulation of mental model. "Can explain = understands, can't explain = cargo cult programming."

**Assessment approach**:
- Student submits working code
- Tool prompts: "Explain in your own words how this code works"
- Evaluate for: execution model correctness, logic flow understanding, design rationale
- Pattern matching vs genuine understanding

---

#### Prediction Task Verification

**What tools do**: Before execution, require prediction of code behavior (output values, execution order, variable states), comparing predictions to actual execution to expose mental model accuracy.

**Educational value**: Predictions externalize mental models. Wrong predictions reveal exactly where model diverges from reality. Cognitive dissonance between prediction and observation drives learning.

**Prediction tasks**:
- Output values for given inputs
- Execution order (especially async code)
- Variable states at breakpoints
- Error occurrence and type

**From Predict-Observe-Explain (POE) pedagogy**: Prediction phase critical - can't skip to observation or learning opportunity lost.

---

#### Concept Application Tasks

**What tools do**: Present problem requiring specific concept application (use closures for data hiding, apply scope chain for variable resolution, leverage event loop for async coordination), assessing whether student recognizes appropriate contexts for concepts not just definition recall.

**Educational value**: Understanding includes knowing WHEN to apply concepts, not just WHAT they are. "Can define closure" ≠ "Recognizes when closures solve problems."

**Application tasks**:
- "Use closures to create counter with private state"
- "Apply scope chain to resolve this variable"
- "Leverage event loop to coordinate these async operations"
- "Use prototypes to share methods across instances"

---

#### Trace Completion Exercises

**What tools do**: Provide partial execution trace table, student fills missing values/steps, detecting specific misconception patterns from completion errors.

**Educational value**: Traces make execution concrete. Errors in trace completion reveal specific mental model gaps (skipped initialization indicates declaration/initialization confusion, wrong loop iterations indicate off-by-one misunderstanding).

**Trace types**:
- Variable value progression
- Scope chain states
- Call stack evolution
- Event loop queue states

**From notional machine research (Sorva 2013)**: Tracing exercises build correct execution models more effectively than reading code alone.

---

#### Minimal Pair Comparison

**What tools do**: Show nearly identical code pairs with single critical difference (var vs let in loop closure, == vs ===, mutation vs reassignment), student predicts behavior differences and explains cause.

**Educational value**: Minimal pairs isolate specific concept understanding without confounding variables. Single difference = clear diagnostic.

**Minimal pair examples**:
- `var i` vs `let i` in loop closure (scope difference)
- `==` vs `===` (coercion difference)
- `arr.push(x)` vs `arr = arr.concat([x])` (mutation vs reassignment)
- `setTimeout` vs `Promise.resolve().then` (microtask vs macrotask)

**From misconception research**: Minimal pairs effective for diagnosing specific confusions vs general errors.

---

### Comprehension Verification Principles

**From research (Ko 2019; Sorva 2013)**:

1. **Correctness ≠ Comprehension**: 1/3 of students produce working code they cannot explain.

2. **Externalize models**: Predictions, explanations, traces force mental model articulation.

3. **Prerequisite checking**: Don't advance students who pass tests but fail comprehension - foundational understanding required for complex topics.

4. **Multiple verification methods**: Combine explanation, prediction, application, tracing for robust comprehension assessment.

---

## Cross-Purpose Patterns

Many assessment use cases serve multiple purposes:

| Use Case | Formative | Summative | Diagnostic | Authentic | Quality | Process | Comprehension |
|----------|-----------|-----------|------------|-----------|---------|---------|---------------|
| **POE Cycle** | ✓ (primary) | | ✓ (reveals model) | | | | ✓ (prediction) |
| **Code Review** | ✓ (peer learning) | ✓ (graded task) | | ✓ (professional) | ✓ (quality focus) | ✓ (review process) | ✓ (explain others' code) |
| **Debug Legacy** | ✓ (practice) | ✓ (can grade) | ✓ (misconceptions visible) | ✓ (realistic) | | ✓ (debug strategy) | ✓ (understand before fix) |
| **Quality Feedback** | ✓ (during dev) | ✓ (graded quality) | | | ✓ (primary) | | |
| **Trace Completion** | ✓ (practice) | | ✓ (NM understanding) | | | | ✓ (primary) |
| **Prediction Tasks** | ✓ (formative practice) | ✓ (can grade) | ✓ (model accuracy) | | | | ✓ (primary) |
| **Debugging Classification** | ✓ (build habits) | ✓ (professional skill) | | ✓ (realistic) | | ✓ (primary) | |

**Key insight**: Purpose determined by instructor's use, not tool's capability. Same trace data supports all purposes.

---

## Using This Categorization

**For educators planning assessment strategy**:
1. Identify course goals (learning? measurement? both?)
2. Select purposes matching goals
3. Choose use cases from relevant categories
4. Balance formative (frequent) with summative (milestones)

**For tool developers**:
1. Don't hardcode single purpose
2. Enable educators to configure purpose
3. Provide multi-purpose data (traces serve all categories)
4. Separate trace generation (neutral) from interpretation (pedagogical)

**For researchers**:
1. Study effectiveness by purpose (formative research ≠ summative research)
2. Measure appropriate outcomes (formative → learning gains, summative → measurement validity)
3. Consider purpose-specific validation needs

---

## References

- Black, P., & Wiliam, D. (1998). Assessment and classroom learning. *Assessment in Education*, 5(1), 7-74.
- Gulikers, J. T. M., Bastiaens, T. J., & Kirschner, P. A. (2004). A five-dimensional framework for authentic assessment. *Educational Technology Research and Development*, 52(3), 67-86.
- Keuning, H., Jeuring, J., & Heeren, B. (2019). A systematic literature review of automated feedback generation for programming exercises. *ACM Transactions on Computing Education*, 19(1), 1-43.
- Ko, A. J. (2019). *Foundations of Information*. University of Washington. (Instructional framework chapters)
- Ko, A. J., et al. (2021). Item response theory in CS education. *SIGCSE 2021*.
- Lehtinen, T., et al. (2023). Questions about learners' code. *SIGCSE 2023*.

---

## Summary: Purpose-Based Assessment Selection

**Formative** → Frequent, supportive, feedback-focused, no/minimal grading
**Summative** → Milestone-based, valid/reliable, graded, measures achievement
**Diagnostic** → Targeted, identifies gaps, informs intervention, no grading
**Authentic** → Professional context, realistic complexity, real tools, transferable
**Quality** → Beyond correctness, teaches professionalism, objective criteria

**Universal principle**: Assessment purpose should align with educational goals, not technical constraints.
