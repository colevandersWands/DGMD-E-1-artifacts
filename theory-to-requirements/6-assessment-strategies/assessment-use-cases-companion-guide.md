# Assessment Use Cases: Practical Companion Guide

**Purpose**: Quick reference for using the assessment use case table in practice

**Audience**: Educators and tool developers who need immediate, actionable guidance

**What this guide does**:
- Explains assessment frameworks briefly (no deep theory - see categorizations for that)
- Shows how to read and use the assessment-use-cases-table.md
- Provides 8 common assessment scenarios with specific use case recommendations
- Demonstrates framework combination strategies
- Points to implementation examples

**What this guide doesn't do**:
- Comprehensive theory (see categorization documents for depth)
- Technical implementation (Step 5 will cover trace requirements)
- Research literature review (see Step 1-3 documents)

**Two reading paths**:
1. **Scenario-driven**: Jump to Part 3, find your situation, get use case recommendations
2. **Framework-driven**: Start with Part 1 to understand foundations, then explore scenarios

---

## Introduction

### This Guide Helps You Answer

**"I want to assess [CONCEPT] for [N STUDENTS] focusing on [GOAL]. Which assessment use cases should I use?"**

Examples:
- "I want to assess closures for 30 students focusing on helping them through the threshold" → Scenario 1
- "I want to assess code quality for 1000+ MOOC students with grading" → Scenario 2
- "I want a solo learner working independently to build async skills" → Scenario 3

### The Assessment Use Case Table

The core deliverable: `assessment-use-cases-table.md`

**50 use cases organized into 10 categories**:
1. Formative Assessment (7 use cases)
2. Summative Assessment (5 use cases)
3. Diagnostic Assessment (6 use cases)
4. Quality Assessment - QLCs (6 use cases)
5. Process Assessment (4 use cases)
6. Comprehension Verification (5 use cases)
7. Authentic Assessment (5 use cases)
8. Adaptive Assessment (5 use cases)
9. Fairness & Bias Detection (4 use cases)
10. Multi-Dimensional Evaluation (4 use cases)

**Each use case has**:
- Descriptive name
- Evidence basis (🔬 Established / 📐 Framework / 🧪 Extension)
- "What Educational Tools Do" (pedagogical function, not technical implementation)

---

## Part 1: Quick Framework Primer

The 5 integrated assessment frameworks explained briefly.

### Framework 1: Misconceptions (Qian & Lehman 2017)

**What**: Common programming errors with underlying mental model confusions

**Why it matters**: Generic "error" feedback doesn't teach. Misconception-specific feedback addresses root cause.

**JavaScript misconceptions** (examples):
- **Tier 1** (65%+ frequency): Variable auto-initialization, reference vs value confusion, sequential execution assumption
- **Tier 2** (40-60%): Async timing, closure variable capture, `this` binding context
- **Tier 3** (<20%): Edge cases, advanced features

**Assessment use**: Detect specific misconception patterns → Provide targeted explanations ("Variables don't auto-initialize to 0" not "undefined error")

**In the table**: Misconception pattern detection, misconception-triggered feedback, misconception persistence tracking

---

### Framework 2: Notional Machines (Sorva 2013)

**What**: Mental models of how code executes (the "machine" students imagine running their code)

**Why it matters**: Wrong execution model → Persistent bugs. Correct model → Systematic problem-solving.

**12 JavaScript Notional Machines** (examples):
- Memory Model (stack/heap, references)
- Scope Chain (variable resolution, closures)
- Event Loop (async coordination, queues)
- Call Stack (function execution, recursion)
- Prototype Chain (inheritance, delegation)
- [7 more...]

**Assessment use**: Verify student has correct execution model via prediction tasks, trace completion, visualization

**In the table**: NM understanding diagnosis, trace completion exercises, execution visualization

---

### Framework 3: Threshold Concepts (Meyer & Land 2003)

**What**: Transformative concepts that irreversibly change understanding, integrate prior knowledge, and are troublesome (counter-intuitive)

**Why it matters**: Threshold crossing involves productive confusion ("liminal state"). Grading confusion punishes normal learning.

**4 JavaScript Thresholds**:
1. **Asynchronous execution** (event loop, Promises, async/await)
2. **Closures** (scope chain, lexical environment capture)
3. **Prototypes** (delegation, prototype chain navigation)
4. **Recursion** (call stack, base cases, recursive thinking)

**Three states**:
- **Pre-threshold**: No systematic understanding yet
- **Liminal**: Partial understanding, inconsistent predictions, productive confusion (weeks-long transition)
- **Post-threshold**: Integrated understanding, consistent accuracy

**Assessment use**: Detect threshold state → Adapt support (liminal = scaffold without grading, post-threshold = summative assessment appropriate)

**In the table**: Threshold state detection, liminal state scaffolding, threshold crossing verification

---

### Framework 4: Taxonomies (SOLO, Block Model, BSI)

**What**: Learning progression models showing stages from novice to expert

**Why it matters**: Tasks must match current level (too hard = frustration, too easy = boredom). Progression shows growth path.

**SOLO Taxonomy** (Structure of Observed Learning Outcomes):
1. **Prestructural**: No coherent approach
2. **Unistructural**: One relevant aspect ("I know variables exist")
3. **Multistructural**: Multiple aspects, disconnected ("Variables have types, scope, values")
4. **Relational**: Integrated understanding ("Scope and lifetime interact for closures")
5. **Extended Abstract**: Transfer to novel contexts ("Apply closure pattern to Python decorators")

**Block Model** (program comprehension):
- Level 1: Text Surface (syntax recognition)
- Level 2: Program Model (execution tracing)
- Level 3: Situation Model (problem-solving application)

**BSI Framework** (Behavior-Strategy-Implementation):
- **Behavior**: Correct output (tests pass)
- **Strategy**: Appropriate algorithm/design choice
- **Implementation**: Code quality (syntax, idioms, structure)

**Assessment use**: Diagnose current level → Assign appropriate difficulty tasks → Measure progression

**In the table**: Taxonomy-level adaptive tasks, taxonomy-aligned progression rubrics, SOLO Extended Abstract transfer tasks

---

### Framework 5: QLCs (Questions about Learners' Code - Lehtinen et al. 2023)

**What**: Automated code quality assessment beyond functional correctness, validated at MOOC scale

**Why it matters**: Professional programming requires quality, not just "tests pass." 1/3 of students produce working code they don't comprehend. Quality assessment detects this.

**Four Quality Dimensions**:
1. **Naming**: Descriptive identifiers, convention adherence (camelCase), consistency
2. **API Usage**: Modern methods vs reinventing wheels, appropriate library choices, idiomatic patterns
3. **Algorithmic Approach**: Efficiency awareness (O(n) vs O(n²)), clarity, appropriate complexity
4. **Design Patterns**: Professional patterns (accumulator, filter-map-reduce) vs anti-patterns (callback hell, spaghetti code)

**Assessment use**: Automated quality feedback during development and graded quality rubrics

**In the table**: Identifier naming quality assessment, API usage appropriateness evaluation, algorithmic approach detection, design pattern recognition, code complexity measurement, code structure evaluation

---

### How Frameworks Complement Each Other

Same assessment goal, different framework perspectives:

**Example: Assessing scope understanding**

- **Misconceptions**: Detect var/let confusion (Tier 1 misconception)
- **Notional Machines**: Verify scope chain mental model
- **Threshold Concepts**: Support if liminal state (scope as closure prerequisite)
- **Taxonomies**: Ensure Relational level (integrates scope types, not isolated facts)
- **QLCs**: Check modern scope usage in projects (const/let over var)

**Each framework adds information. Together = comprehensive assessment.**

---

## Part 2: Reading the Use Case Table

### Table Structure

**Three columns** (Step 4 deliverable):
1. **Use Case**: Descriptive name of assessment approach
2. **Evidence**: Research backing (🔬/📐/🧪)
3. **What Educational Tools Do**: Pedagogical/analytical function

**Critical boundary**: Column 3 describes educational goals ONLY. NO trace event types, configuration parameters, or data formats (Step 5 territory).

### Evidence Basis Classification

**🔬 Established** - Direct research backing with empirical validation:
- QLCs framework (Lehtinen et al. 2023 - validated at MOOC scale)
- POE pedagogy (established predict-observe-explain method)
- Threshold concepts (Meyer & Land 2003, Boustedt et al. 2007)

**📐 Framework** - Established theory applied to assessment context:
- SOLO taxonomy levels applied to code complexity assessment (SOLO established, mapping is our framework)
- Misconception categories applied to automated detection (misconceptions established, detection strategies are framework)

**🧪 Extension** - Experience-based extrapolation not yet empirically validated:
- Longitudinal misconception persistence tracking (logical but no large-scale validation)
- Threshold crossing celebration mechanisms (intuitively valuable but not researched)

**Classification principle**: Conservative (if uncertain between levels, use lower confidence)

### The 10 Categories

**Category 1: Formative Assessment** (7 use cases)
- **Purpose**: Support ongoing learning through feedback, not grading
- **Use cases**: Real-time syntax detection, misconception-triggered feedback, POE cycle support, progressive hint scaffolding, live coding quality feedback, liminal state scaffolding, integrated concept practice feedback
- **When to use**: During learning, before high-stakes assessment

**Category 2: Summative Assessment** (5 use cases)
- **Purpose**: Measure achievement at course milestones with grading
- **Use cases**: Quality-based grading (QLCs), taxonomy-aligned progression rubrics, multi-dimensional evaluation, threshold crossing verification, integration task assessment
- **When to use**: End of unit, semester, course - graded milestones

**Category 3: Diagnostic Assessment** (6 use cases)
- **Purpose**: Identify specific gaps/misconceptions for targeted intervention
- **Use cases**: Misconception pattern detection, pre-assessment readiness testing, threshold state detection, taxonomy level diagnosis, NM understanding diagnosis, prerequisite gap identification
- **When to use**: Before instruction (readiness), during learning (strugglers), before summative (verification)

**Category 4: Quality Assessment - QLCs** (6 use cases)
- **Purpose**: Evaluate code quality dimensions beyond correctness
- **Use cases**: Identifier naming assessment, API usage evaluation, algorithmic approach detection, design pattern recognition, code complexity assessment, code structure evaluation
- **When to use**: After functionality established, formative early then summative later

**Category 5: Process Assessment** (4 use cases)
- **Purpose**: Evaluate development/debugging process quality
- **Use cases**: Debugging strategy classification, development pattern analysis, revision behavior tracking, tool usage appropriateness
- **When to use**: During development, retrospective code history analysis

**Category 6: Comprehension Verification** (5 use cases)
- **Purpose**: Test whether student understands WHY code works
- **Use cases**: Code explanation assessment, prediction task verification, concept application tasks, trace completion exercises, minimal pair comparison
- **When to use**: After functional code produced, before advancing to dependent topics

**Category 7: Authentic Assessment** (5 use cases)
- **Purpose**: Evaluate performance in professional-realistic contexts
- **Use cases**: Debug legacy code, code review assignments, production bug triage simulation, refactor working code, professional tool integration
- **When to use**: Throughout course, especially advanced students

**Category 8: Adaptive Assessment** (5 use cases)
- **Purpose**: Personalize assessment to student state/level/history
- **Use cases**: Taxonomy-level adaptive tasks, threshold state-responsive feedback, misconception persistence adaptation, error frequency-based intervention, engagement-responsive triggers
- **When to use**: Continuous adaptation based on detected state

**Category 9: Fairness & Bias Detection** (4 use cases)
- **Purpose**: Ensure equitable assessment across demographics
- **Use cases**: Psychometric item validation, differential item functioning (DIF) analysis, bias pattern detection, accessibility compliance verification
- **When to use**: High-stakes summative assessment, MOOC scale, diverse populations

**Category 10: Multi-Dimensional Evaluation** (4 use cases)
- **Purpose**: Assess multiple competency dimensions simultaneously
- **Use cases**: BSI framework assessment, correctness + quality combined grading, process + product evaluation, knowledge + application integration
- **When to use**: Comprehensive assessment, avoid single correctness score

---

## Part 3: Common Assessment Scenarios

8 practical scenarios with specific use case recommendations.

### Scenario 1: Supporting Threshold Crossing (Closures, Classroom)

**Your situation**: 30-student CS1 course, week 6, students learning closures (JavaScript threshold concept)

**Your goal**: Help students cross the closure threshold without grading confusion during liminal state

**Recommended use cases from table**:

**From Category 1 (Formative)**:
- **Liminal state scaffolding**: Detect threshold liminal state indicators (inconsistent predictions, partial understanding), increase scaffolding frequency and specificity, normalize confusion as productive
- **POE cycle support**: Enable predict-observe-explain workflow - record prediction, execute code, compare predicted vs actual, prompt explanation of discrepancy
- **Integrated concept practice feedback**: Present tasks requiring closures + other concepts, provide formative feedback on connections

**From Category 3 (Diagnostic)**:
- **Threshold state detection**: Distinguish pre-threshold, liminal, and post-threshold states, enable state-appropriate intervention type selection

**From Category 6 (Comprehension)**:
- **Prediction task verification**: Require prediction of closure behavior before execution, comparing predictions to actual execution to expose mental model accuracy
- **Minimal pair comparison**: Show `var i` vs `let i` in loop closure, predict behavior differences, explain cause

**Configuration**:
- **Purpose**: Formative (no grading weeks 6-8), Diagnostic (detect liminal state)
- **Timing**: Adaptive (increase frequency during struggle), Retrospective (detect crossing over weeks)
- **Feedback**: Explanatory (scope chain model) + Scaffolded (progressive hints)
- **Scale**: Classroom (automated detection → instructor dashboard → targeted sessions)

**Implementation approach**:
1. Week 6: Diagnostic tasks (detect liminal vs pre-threshold)
2. Week 7-8: Daily POE exercises, adaptive scaffolding, NO GRADING
3. Week 9: Retrospective analysis detects crossing → Celebrate
4. Week 10+: Summative assessment appropriate

**See also**: Synthesis document Profile 1, Case Study 1

---

### Scenario 2: Quality Assessment at MOOC Scale

**Your situation**: 5,000-student MOOC, end-of-unit assessment, need to assess code quality beyond correctness

**Your goal**: Graded quality assessment at scale, ensure fairness across diverse population

**Recommended use cases from table**:

**From Category 2 (Summative)**:
- **Quality-based grading (QLCs)**: Assess code quality dimensions (naming, API usage, algorithmic approach, design patterns) at scale beyond functional correctness, enabling objective multidimensional grading rubrics

**From Category 4 (Quality - QLCs)**:
- **Identifier naming quality assessment**: Evaluate variable/function names for descriptiveness, convention adherence, consistency
- **API usage appropriateness evaluation**: Assess chosen APIs for task appropriateness (modern array methods vs manual loops)
- **Algorithmic approach detection**: Identify algorithm category, estimate complexity class, recognize patterns
- **Design pattern recognition**: Detect usage of professional patterns vs anti-patterns

**From Category 9 (Fairness)**:
- **Psychometric item validation**: Apply Item Response Theory to detect assessment items with poor discrimination, inappropriate difficulty, or low information value
- **Differential item functioning (DIF) analysis**: Detect items that disadvantage specific demographic groups despite equal overall ability

**Configuration**:
- **Purpose**: Summative (graded), Quality (QLCs)
- **Timing**: Batch retrospective (overnight processing), On-demand preview
- **Feedback**: Comparative (reference solutions), Automated explanatory
- **Scale**: MOOC (100% automation, fairness critical)

**Implementation approach**:
1. Pre-assessment: IRT calibration, DIF analysis removes biased items
2. Assessment: QLCs automated analysis (naming, API, algorithm, patterns)
3. Scoring: Multi-dimensional (Correctness 40%, Quality 60%)
4. Feedback: Automated explanations + comparative examples
5. Validation: Post-hoc DIF check for demographic disparities

**Automation requirements**: 100% (no manual intervention possible at this scale)

**See also**: Synthesis document Profile 2, Case Study 2

---

### Scenario 3: Individual Self-Paced Learning

**Your situation**: Solo learner working through JavaScript independently, self-paced, no instructor

**Your goal**: Support self-directed learning with sustained motivation and systematic skill development

**Recommended use cases from table**:

**From Category 1 (Formative)**:
- **Progressive hint scaffolding**: Provide multi-level hints (conceptual → strategic → tactical → code-specific) based on progress, supporting zone of proximal development without giving away solutions

**From Category 3 (Diagnostic)**:
- **Misconception persistence tracking**: Flag repeatedly occurring errors for focused review (auto-suggest review materials)

**From Category 8 (Adaptive)**:
- **Adaptive difficulty progression**: Adjust task complexity based on performance history
- **Threshold state-responsive feedback**: Adapt feedback type and frequency to threshold state (pre/liminal/post)
- **Engagement-responsive triggers**: Detect productive struggle vs unproductive frustration, offer hints only when struggle becomes unproductive

**From Category 6 (Comprehension)**:
- **Prediction task verification**: Force prediction before execution (prevent skipping to answer), compare predictions to actual execution

**Configuration**:
- **Purpose**: Formative (self-directed), Adaptive (personalize to progress)
- **Timing**: On-demand (student controls), Retrospective (show growth)
- **Feedback**: Scaffolded (progressive hints), Adaptive (state-responsive)
- **Scale**: Individual (100% automation, motivation critical)

**Implementation approach**:
1. Locked progression (must demonstrate readiness before unlocking)
2. Forced prediction (can't execute until prediction submitted)
3. Progressive hint disclosure (must view Level 1 before Level 2)
4. Longitudinal dashboard (quality improvement visualization)
5. Milestone celebrations (threshold crossing recognition)
6. Gamification (progress bars, achievements, streaks)

**Motivation mechanisms**: Essential at individual scale (no external accountability)

**See also**: Synthesis document Profile 3, Case Study 3

---

### Scenario 4: Diagnostic Pre-Assessment

**Your situation**: Classroom course starting new unit, want to identify existing misconceptions before instruction

**Your goal**: Detect gaps and misconceptions to adapt curriculum, target reteaching

**Recommended use cases from table**:

**From Category 3 (Diagnostic)**:
- **Pre-assessment readiness testing**: Identify existing misconceptions before instruction begins (from prior courses, self-teaching, other languages)
- **Misconception pattern detection**: Analyze execution patterns during normal coding to detect specific misconception signatures automatically
- **Prerequisite gap identification**: Verify prerequisites met before threshold concept instruction

**From Category 6 (Comprehension)**:
- **Prediction task verification**: Before execution, require prediction to expose mental model accuracy
- **Minimal pair comparison**: Show nearly identical code with single critical difference, predict behavior differences

**Configuration**:
- **Purpose**: Diagnostic (no grading, inform instruction)
- **Timing**: Immediate post-execution (quick pattern detection)
- **Feedback**: Explanatory (misconception-specific)
- **Scale**: Classroom (class-wide dashboard)

**Implementation approach**:
1. Week 1: Pre-assessment targeting known misconceptions for upcoming content
2. Analyze patterns: Which misconceptions present in class? (Dashboard shows 15 students: scope confusion)
3. Adapt instruction: Address prevalent misconceptions explicitly
4. Targeted review: Students with specific gaps get focused materials
5. Post-instruction: Re-assess to verify misconception resolution

**Instructor value**: Class-wide patterns guide lecture focus

**See also**: Synthesis document Profile 4

---

### Scenario 5: Authentic Debugging Assessment

**Your situation**: Advanced CS course, assess professional debugging and code reading skills

**Your goal**: Measure authentic debugging competence in realistic contexts

**Recommended use cases from table**:

**From Category 7 (Authentic)**:
- **Debug legacy code tasks**: Present buggy, poorly-documented code for students to read, comprehend, trace, debug, and fix without breaking other functionality
- **Production bug triage simulation**: Present error stack traces, logs, bug reports for categorization by likely cause, severity assessment, debugging strategy proposal

**From Category 5 (Process)**:
- **Debugging strategy classification**: Distinguish systematic hypothesis-driven debugging from trial-and-error random changes, recognizing debugging sophistication as learnable skill
- **Tool usage appropriateness**: Assess whether student uses professional tools appropriately (debugger for logic errors, profiler for performance)

**From Category 6 (Comprehension)**:
- **Code explanation assessment**: Require explanation of code's execution model before attempting fix (understand before modifying)

**Configuration**:
- **Purpose**: Authentic (professional context), Process (strategy not just product)
- **Timing**: On-demand (multi-day window for complex bugs)
- **Feedback**: Minimal (authentic = figure it out)
- **Scale**: Classroom (instructor reviews process) OR Professional

**Implementation approach**:
1. Provide realistic buggy code (poor documentation, complex interactions)
2. Require professional workflow (hypothesis → test → narrow scope)
3. Assess both strategy (systematic vs trial-and-error) and product (fix quality)
4. Use professional tools (IDE debugger, not educational toys)
5. Deliverable: Fixed code + commented explanation + strategy description

**Authenticity dimensions** (Gulikers et al. 2004):
- Task: Real bug types
- Context: Professional tools
- Criteria: Fix without breaking other functionality

**See also**: Synthesis document Profile 5

---

### Scenario 6: Real-Time Formative Feedback

**Your situation**: Students coding live in IDE, want to provide supportive feedback during development

**Your goal**: Build good habits early without interrupting flow

**Recommended use cases from table**:

**From Category 1 (Formative)**:
- **Real-time syntax error detection**: Flag parse errors as students type with immediate contextual explanations
- **Live coding quality feedback**: Analyze code during development, provide immediate feedback on quality dimensions (naming, structure, conventions) beyond correctness

**From Category 4 (Quality - QLCs)**:
- **Identifier naming quality assessment**: Evaluate variable names for descriptiveness and convention adherence
- **Code complexity assessment**: Measure cyclomatic complexity, nesting depth, function length in real-time

**Configuration**:
- **Purpose**: Formative (build habits, no grading)
- **Timing**: Real-time (during typing) - but toggle-able
- **Feedback**: Corrective (syntax) + Explanatory (quality suggestions)
- **Scale**: Any (automation 100%)

**Implementation approach**:
1. Syntax errors: Immediate red squiggles with explanations
2. Quality suggestions: Gentle warnings (not errors) for conventions
3. Severity filtering: Errors (red) vs warnings (yellow)
4. Toggle-able: Student can disable if distracting
5. Non-blocking: Suggestions don't prevent execution

**Balance**: Support vs interruption (procedural skills benefit from immediate, conceptual don't)

**Timing research** (Keuning et al. 2019): Procedural skills (syntax) benefit from immediate; conceptual understanding needs reflection

---

### Scenario 7: Multi-Dimensional Summative Evaluation

**Your situation**: End-of-semester assessment, want to measure correctness + quality + comprehension + process

**Your goal**: Comprehensive evaluation beyond "tests pass"

**Recommended use cases from table**:

**From Category 10 (Multi-Dimensional)**:
- **BSI framework assessment**: Score Behavior (correct output), Strategy (algorithm choice), Implementation (syntax quality) as separate dimensions with independent rubrics
- **Correctness + quality combined grading**: Weight functional correctness and code quality independently (e.g., 40% correctness, 60% quality breakdown)
- **Process + product evaluation**: Assess both development process quality and final product quality
- **Knowledge + application integration**: Test conceptual understanding separately from application skill

**From Category 2 (Summative)**:
- **Quality-based grading (QLCs)**: Assess naming, API usage, algorithm choice beyond correctness
- **Multi-dimensional evaluation**: Score correctness + quality + comprehension + process separately with weighted rubric

**Configuration**:
- **Purpose**: Summative (graded milestone)
- **Timing**: On-demand (comprehensive analysis after submission)
- **Feedback**: Comparative (reference solutions), Detailed per dimension
- **Scale**: Classroom OR MOOC (with IRT validation)

**Implementation approach**:
1. **Behavior dimension** (30%): Correctness - tests pass, edge cases handled
2. **Strategy dimension** (30%): Algorithm appropriateness, design decisions
3. **Implementation dimension** (25%): Code quality (naming, structure, conventions)
4. **Comprehension dimension** (15%): Explanation quality (requires code + written explanation)
5. Independent rubrics per dimension, weighted combination for final grade

**Why multi-dimensional**: Single correctness score misses crucial competencies (1/3 of students produce working code they don't comprehend - Ko 2019)

**See also**: Synthesis document Profile 6

---

### Scenario 8: Peer Code Review Learning

**Your situation**: Classroom setting, want students to learn through reviewing others' code

**Your goal**: Develop critical evaluation skills while reinforcing own understanding

**Recommended use cases from table**:

**From Category 7 (Authentic)**:
- **Code review assignments**: Students review peer code, identify issues (bugs, quality problems, misconceptions), suggest improvements using professional code review conventions

**From Category 4 (Quality - QLCs)**:
- All quality dimensions (naming, API usage, patterns, complexity) - students apply quality rubric to peer code

**From Category 6 (Comprehension)**:
- **Code explanation assessment**: Reviewing requires understanding others' code (can't critique what you don't comprehend)

**From Category 5 (Process)**:
- **Tool usage appropriateness**: Evaluate whether peer used professional tools/workflows appropriately

**Configuration**:
- **Purpose**: Formative (peer learning) OR Summative (graded task)
- **Timing**: Post-execution (review after code written)
- **Feedback**: Socratic (questions to peer) + Comparative (alternative approaches)
- **Scale**: Classroom (manageable peer assignments)

**Implementation approach**:
1. Anonymous peer assignments (2 peer solutions per student)
2. Structured rubric (find 1 strength + 1 improvement using QLCs framework)
3. Written review using professional conventions (GitHub PR-style comments)
4. Metacognitive reflection: "What did reviewing teach you?"
5. Instructor spot-checks review quality

**Educational value**: Reviewing others' code deepens own understanding (explain to others = internalize)

**Authenticity**: Code review is core professional activity (social context dimension)

---

## Part 4: Framework Combination Guidance

How to use multiple frameworks together for robust assessment.

### Combination 1: Assessing Scope Understanding

**Goal**: Comprehensive scope/closure understanding verification

**Framework contributions**:

**Misconceptions framework**:
- **Use case**: Misconception pattern detection
- **What it does**: Detect var/let confusion (Tier 1, 65% frequency), TDZ errors, closure variable capture mistakes
- **Diagnostic value**: Identifies specific errors, enables targeted remediation

**Notional Machines framework**:
- **Use case**: NM understanding diagnosis (Scope Chain NM)
- **What it does**: Verify scope chain mental model through tracing and explanation tasks
- **Comprehension value**: Builds correct execution model, generalizes beyond examples

**Threshold Concepts framework**:
- **Use case**: Threshold state detection (closures as threshold concept)
- **What it does**: Identify liminal state, scaffold transition, avoid grading confusion
- **Support value**: Normalizes struggle during threshold crossing

**Taxonomies framework**:
- **Use case**: Taxonomy level diagnosis (SOLO progression)
- **What it does**: Progress from Unistructural (isolated scope facts) to Relational (integrated scope chain model)
- **Progression value**: Shows learning trajectory, prevents tasks too hard/easy

**QLCs framework**:
- **Use case**: Identifier naming + API usage
- **What it does**: Analyze scope variable naming patterns, detect inappropriate var usage in modern code
- **Quality value**: At-scale implicit assessment during normal coding

### Combined Assessment Strategy

**Week 3**: Misconception detector identifies var scope confusion in 60% of class → Instructor adds targeted scope lecture

**Week 4**: NM assessment shows 40% have partial scope chain model (liminal) → Threshold-aware scaffolding

**Week 6**: Taxonomy assessment shows class reaching Relational level → Ready for closure integration

**Week 8**: QLCs shows improving const/let usage, decreasing var → Quality trajectory positive

**Result**: Robust multi-dimensional understanding verified through 5 complementary lenses

---

### Combination 2: Debugging Skill Assessment

**Goal**: Measure debugging competence (not just error identification)

**Framework contributions**:

**Misconceptions**: Categorize what student debugs (conceptual vs procedural errors)

**Notional Machines**: Verify student uses correct execution model during debugging (not trial-and-error)

**Threshold Concepts**: Recognize debugging sophistication as transformative skill (random → hypothesis-driven)

**Taxonomies (BSI)**: Strategy dimension - assess approach appropriateness for bug type

**QLCs**: N/A (doesn't directly address process)

**Combined approach**: Process assessment (debugging strategy) + Product assessment (fix quality) + Comprehension (explain bug cause)

---

### Combination 3: Async Competence Verification

**Optimal multi-framework assessment across learning timeline**:

**Week 1-2** (Introduction):
- **Taxonomies**: Assess prerequisite (callback understanding) before async
- **Threshold**: Diagnostic tasks identify pre-threshold state

**Week 3-5** (Liminal period):
- **Threshold**: Detect liminal state, increase scaffolding, no grading
- **Misconceptions**: Identify specific timing/queue confusions
- **Notional Machines**: Build event loop model through visualization

**Week 6+** (Post-threshold emerging):
- **Threshold**: Detect crossing (consistent predictions, model-based explanations)
- **Taxonomies**: Assess SOLO Relational level (integrates sync + async)
- **QLCs**: Evaluate async code quality (anti-pattern detection: callback hell, Promise misuse)

**Week 8+** (Integration):
- **BSI**: Assess Behavior (correct timing) + Strategy (appropriate async choice) + Implementation (clean syntax)

**Result**: Comprehensive async competence, not just "can use Promises"

---

### General Combination Principles

**1. Use Misconceptions for diagnosis** (what's wrong?)

**2. Use NMs for model building** (what execution model do they have?)

**3. Use Thresholds for state-aware support** (where in transition? adjust accordingly)

**4. Use Taxonomies for progression planning** (what level? what next?)

**5. Use QLCs for quality measurement** (writing professional code?)

**Don't choose one framework exclusively - they're complementary.**

---

## Part 5: Implementation Examples

Quick pointers to concrete assessment tasks.

### From assessment-task-examples.md

**Example 1: Formative Misconception Assessment (Scope)**
- POE cycle with var/let minimal pairs
- Detect scope confusion, provide targeted explanations
- Framework: Misconceptions + NMs (scope chain)

**Example 2: Summative Quality Assessment (QLCs)**
- End-of-unit code quality grading
- Multi-dimensional rubric (correctness + naming + API + algorithm)
- Framework: QLCs + BSI

**Example 3: Diagnostic Threshold State (Async)**
- Prediction task with setTimeout vs Promise.resolve
- Detect pre/liminal/post-threshold state
- Framework: Threshold + NMs (event loop)

**Example 4: Authentic Debugging**
- Legacy code with closure + var loop bug
- Assess strategy (systematic vs trial-and-error) + product (fix quality)
- Framework: Authentic + Process + Misconceptions

**Example 5: Adaptive Taxonomy-Level (Recursion)**
- Progressive difficulty (Unistructural → Extended Abstract)
- Adjust task complexity based on performance
- Framework: Taxonomies (SOLO) + Threshold (recursion)

**Example 6: Multi-Framework Integration**
- Rate-limited API caller (closures + async + quality)
- Multi-dimensional scoring (correctness + closures + async + quality)
- Framework: ALL FIVE integrated

**See assessment-task-examples.md for full code and rubrics**

---

## Navigation

**Start here if you're**:
- Educator planning assessment → Part 3 (find your scenario)
- Developer understanding requirements → Part 1 (framework primer) + Part 2 (table structure)
- Researcher studying integration → Part 4 (framework combinations)

**For more depth**:
- Scholarly analysis → Four categorization documents (by-purpose, by-timing, by-feedback-type, by-scale)
- Integration guidance → categorization-synthesis-and-integration.md
- Framework comparison → framework-comparison-matrix.md
- Entry point guide → assessment-strategies-for-educators.md

**The core deliverable**: assessment-use-cases-table.md (50 use cases, 3-column table)

---

## Summary

**This guide helps you**:
1. Understand the 5 assessment frameworks briefly
2. Read and use the assessment use case table effectively
3. Find your scenario and get specific use case recommendations
4. Combine frameworks for robust assessment
5. See implementation examples

**The assessment use case table** is your primary reference. This guide helps you use it.

**Next step**: Find your scenario in Part 3, consult the table for specific use cases, check synthesis document for configuration profiles.
