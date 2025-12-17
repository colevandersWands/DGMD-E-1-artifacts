# Assessment Categorization Synthesis & Integration

**Step 4 Deliverable**: Integration guidance showing how to combine insights from four categorization lenses

**Purpose**: The four categorization documents (by-purpose, by-timing, by-feedback-type, by-scale) provide complementary perspectives on assessment. This document shows how to synthesize across them for comprehensive assessment design.

**Who this serves**:
- **Educators**: Get complete assessment system designs combining all four dimensions
- **Tool developers**: Understand how different dimensions interact and constrain each other
- **Researchers**: See how frameworks integrate in practice

---

## Introduction

### Why Four Lenses Exist

Assessment has multiple independent dimensions:
- **Purpose** (WHY assess): Educational goal (formative/summative/diagnostic/authentic/quality)
- **Timing** (WHEN deliver feedback): Temporal strategy (real-time/post-execution/on-demand/retrospective/adaptive)
- **Feedback Type** (HOW provide feedback): Pedagogical approach (corrective/explanatory/scaffolded/adaptive/socratic/comparative)
- **Scale** (WHERE/WITH WHOM): Deployment context (individual/classroom/MOOC/professional)

Each dimension reveals patterns invisible in others. **Same assessment use case** appears across all four lenses, but each lens highlights different aspect.

### How They Complement Each Other

**Example: Misconception-triggered feedback**

Viewed through each lens:
- **Purpose lens**: Formative (support learning) OR Diagnostic (identify gaps) - same mechanism, different instructor intent
- **Timing lens**: Immediate post-execution (simple patterns) OR On-demand (complex diagnosis) - depends on misconception type
- **Feedback lens**: Explanatory Level 4 (misconception-specific) - pedagogical specificity
- **Scale lens**: Individual (full automation) vs Classroom (dashboard + flagged review) vs MOOC (batch processing) - automation requirements differ

**No single lens provides complete picture.** Assessment design requires considering ALL FOUR simultaneously.

### How to Use This Document

**Configuration Profiles** (Part 1): Common combinations for specific assessment goals (e.g., "Threshold liminal state support")

**Cross-Reference Tables** (Part 2): Quick lookup showing which combinations work together

**Case Studies** (Part 3): Detailed walkthroughs applying all four lenses to specific scenarios

**Decision Guidance** (Part 4): Step-by-step process for designing assessment systems

**Integration Principles** (Part 5): When to prioritize which dimension, avoiding conflicts

---

## Part 1: Configuration Profiles

Common assessment system designs showing Purpose + Timing + Feedback + Scale combinations.

### Profile 1: Threshold Liminal State Support (Classroom)

**Educational scenario**: 30-student CS1 course, helping students cross async threshold during weeks 4-6

**Purpose dimension** (from categorization-by-assessment-purpose.md):
- **Primary**: Formative assessment (support learning, no grading during liminal period)
- **Secondary**: Diagnostic (detect liminal state indicators)
- **Use cases**: Liminal state scaffolding, POE cycle support, integrated concept practice feedback

**Timing dimension** (from categorization-by-delivery-timing.md):
- **Primary**: Adaptive timing (increase frequency during struggle, decrease when mastery emerging)
- **Secondary**: Retrospective (detect threshold crossing across multiple weeks)
- **Avoid**: Real-time (async understanding requires reflection, not immediate feedback)

**Feedback dimension** (from categorization-by-feedback-type.md):
- **Primary**: Explanatory (build event loop mental model) + Scaffolded (progressive hints for complex scenarios)
- **Adaptive**: Increase scaffolding during liminal state, decrease post-threshold
- **Avoid**: Corrective (don't give away solutions during productive struggle)

**Scale dimension** (from categorization-by-scale-deployment.md):
- **Context**: Classroom (20-50 students)
- **Automation**: 70% automated detection + 30% instructor scaffolding sessions
- **Instructor role**: Dashboard shows liminal state students → targeted office hours

**Implementation notes**:
- Week 4: Introduce async, diagnostic pre-assessment (callback understanding prerequisite)
- Week 4-6: Formative only (no grading), adaptive scaffolding, frequent POE exercises
- Week 6: Retrospective analysis detects crossing → Celebrate milestone
- Week 7+: Post-threshold, ready for summative async assessment

**Research backing**: Threshold concepts (Meyer & Land 2003), Liminal state support (Boustedt et al. 2007), POE pedagogy (White & Gunstone 1992)

---

### Profile 2: MOOC Quality Assessment at Scale

**Educational scenario**: 5,000-student MOOC, end-of-unit code quality evaluation

**Purpose dimension**:
- **Primary**: Summative assessment (graded, affects course completion)
- **Secondary**: Quality assessment (QLCs framework - beyond correctness)
- **Use cases**: Quality-based grading (QLCs), psychometric item validation, DIF analysis

**Timing dimension**:
- **Primary**: Batch retrospective (overnight processing of all submissions acceptable)
- **Secondary**: On-demand (student can trigger pre-submission quality check)
- **Latency**: Minutes for batch processing, seconds for preview

**Feedback dimension**:
- **Primary**: Comparative (show reference solutions with different quality levels)
- **Secondary**: Explanatory (automated quality explanations: "Variable `x` could be `userCount`")
- **Avoid**: Socratic (requires instructor, impossible at this scale)

**Scale dimension**:
- **Context**: MOOC (1000s of students)
- **Automation**: 100% required (no human intervention possible)
- **Fairness**: IRT/DIF validation essential (affects grades for diverse population)

**Implementation notes**:
- Pre-processing: IRT analysis calibrates item difficulty, removes biased items
- Assessment: QLCs analyzes naming, API usage, algorithm choice, patterns
- Scoring: Multi-dimensional rubric (correctness 40%, quality 60%)
- Feedback: Automated explanations + comparative examples
- Validation: Post-hoc DIF analysis detects demographic disparities

**Research backing**: QLCs at MOOC scale (Lehtinen et al. 2023), IRT validation (Ko et al. 2021), Fairness in automated assessment (Zumbo 2007)

---

### Profile 3: Individual Self-Study Learning System

**Educational scenario**: Solo learner working through JavaScript independently, self-paced

**Purpose dimension**:
- **Primary**: Formative assessment (support ongoing learning, self-directed)
- **Secondary**: Adaptive assessment (personalize to current level)
- **Use cases**: Adaptive difficulty progression, longitudinal progress visualization, misconception persistence tracking

**Timing dimension**:
- **Primary**: On-demand (student controls when to attempt assessment)
- **Secondary**: Retrospective (show progress over weeks/months for motivation)
- **Challenge**: No external deadlines → Requires intrinsic motivation support

**Feedback dimension**:
- **Primary**: Scaffolded (progressive hint sequences, student chooses depth)
- **Secondary**: Adaptive (adjust to detected threshold state)
- **Metacognitive**: "What did you expect? What happened? Why different?" prompts

**Scale dimension**:
- **Context**: Individual (1 student)
- **Automation**: 100% (no instructor available)
- **Motivation**: Gamification, progress visualization, milestone celebration critical

**Implementation notes**:
- Forced prediction before reveal (prevent skipping to answer)
- Progressive hint disclosure (Level 1-4, must view each before next)
- Longitudinal dashboard (quality improvement over time)
- Threshold readiness detection (when to unlock next concept)
- Misconception persistence → Automatic review suggestions

**Research backing**: Self-regulated learning (Zimmerman 2002), Adaptive learning systems (VanLehn 2011), Gamification for motivation (Dicheva et al. 2015)

---

### Profile 4: Diagnostic Misconception Intervention (Classroom)

**Educational scenario**: Classroom diagnostic after poor midterm results, identify specific gaps for targeted reteaching

**Purpose dimension**:
- **Primary**: Diagnostic assessment (identify specific misconceptions, no grading)
- **Secondary**: Formative (targeted intervention after diagnosis)
- **Use cases**: Misconception pattern detection, pre-assessment readiness testing, NM understanding diagnosis

**Timing dimension**:
- **Primary**: Immediate post-execution (detect patterns from assignment submissions)
- **Secondary**: On-demand (student can request misconception analysis)
- **Urgent**: Need quick diagnosis to inform reteaching strategy

**Feedback dimension**:
- **Primary**: Explanatory (misconception-specific, address root cause)
- **Targeted**: Level 4 feedback (diagnosis not correction)
- **Avoid**: Generic "study harder" - need specific identified gaps

**Scale dimension**:
- **Context**: Classroom (20-50 students)
- **Instructor role**: Dashboard shows class-wide patterns (15 students: scope confusion, 8 students: async timing)
- **Action**: Group students by misconception type for targeted reteaching sessions

**Implementation notes**:
- Analyze recent submissions for misconception patterns
- Generate class-wide misconception dashboard
- Create targeted intervention groups (scope group, async group, closure group)
- Provide misconception-specific materials and exercises
- Re-assess after intervention to verify misconception resolution

**Research backing**: Misconception-driven instruction (Qian & Lehman 2017), Diagnostic assessment (Sadler 1989), Targeted intervention effectiveness (Keuning et al. 2019)

---

### Profile 5: Authentic Professional Context Assessment

**Educational scenario**: Advanced CS course, assess professional debugging and code review skills

**Purpose dimension**:
- **Primary**: Authentic assessment (professional-realistic context)
- **Secondary**: Process assessment (debugging strategy, not just product)
- **Use cases**: Debug legacy code, code review assignments, production bug triage simulation

**Timing dimension**:
- **Primary**: On-demand (student works at own pace on complex problems)
- **Realistic**: No artificial time pressure (professionals debug carefully)
- **Assessment window**: Multi-day (complex bugs take time)

**Feedback dimension**:
- **Primary**: Minimal (authentic context = figure it out, limited help)
- **Available**: Documentation, professional tools (debugger, profiler), search
- **Avoid**: Scaffolded hints (unrealistic - production doesn't provide hints)

**Scale dimension**:
- **Context**: Classroom OR Professional (authentic tools in both)
- **Assessment**: Instructor reviews process (debugging strategy) + product (fix quality)
- **Criteria**: Professional standards (fix without breaking other functionality)

**Implementation notes**:
- Provide realistic buggy legacy code (poor documentation, complex interactions)
- Require professional debugging workflow (hypothesis → test → narrow scope)
- Assess both process (strategy sophistication) and product (fix correctness)
- Use professional tools (IDE debugger, git history, not educational toys)
- Deliverable: Fixed code + commented explanation of bug + strategy description

**Research backing**: Authentic assessment framework (Gulikers et al. 2004), Professional competence development (Perkins et al. 1995), Debugging as core skill (McCauley et al. 2008)

---

### Profile 6: Summative Multi-Dimensional Evaluation

**Educational scenario**: End-of-semester comprehensive assessment measuring correctness + quality + comprehension + process

**Purpose dimension**:
- **Primary**: Summative assessment (graded milestone)
- **Secondary**: Multi-dimensional evaluation (BSI framework - Behavior + Strategy + Implementation)
- **Use cases**: Multi-dimensional evaluation, BSI framework assessment, correctness + quality combined grading

**Timing dimension**:
- **Primary**: On-demand (comprehensive analysis after submission)
- **Summative**: Single assessment point (not ongoing), high-stakes
- **Latency**: Hours acceptable for thorough analysis

**Feedback dimension**:
- **Primary**: Comparative (show reference solutions at different quality levels)
- **Multi-dimensional**: Separate feedback for correctness, quality, comprehension, process
- **Detailed**: Specific strengths and weaknesses in each dimension

**Scale dimension**:
- **Context**: Classroom (20-50) or MOOC (1000s)
- **Automation**: High (80-90%) for correctness/quality, some manual for comprehension/process
- **Fairness**: Critical (affects final grades) - IRT validation if MOOC scale

**Implementation notes**:
- **Behavior dimension** (30%): Correctness - tests pass, handles edge cases
- **Strategy dimension** (30%): Algorithm appropriateness, design decisions, API choices
- **Implementation dimension** (25%): Code quality (QLCs), naming, structure, conventions
- **Comprehension dimension** (15%): Explanation quality, prediction accuracy (included in assessment)
- Independent rubrics per dimension, weighted combination for final grade

**Research backing**: Multi-dimensional assessment (Keuning et al. 2018), BSI framework (Lister et al. 2006), Comprehensive evaluation (Ko 2019)

---

## Part 2: Cross-Reference Tables

Quick lookup showing which combinations work together.

### Table 1: Purpose × Scale Matrix

| Purpose | Individual | Classroom | MOOC | Professional |
|---------|------------|-----------|------|--------------|
| **Formative** | ✅ Full personalization possible | ✅ Primary use case | 🟡 Challenging (limited personalization) | ✅ Continuous improvement |
| **Summative** | 🟡 Self-assessment only | ✅ Graded milestones | ✅ Large-scale validated | 🟡 Performance reviews |
| **Diagnostic** | ✅ Identify gaps | ✅ Class-wide patterns | 🟡 Limited (automated only) | 🟡 Less relevant (experts) |
| **Authentic** | 🟡 Limited (no peers/team) | ✅ Realistic scenarios | ❌ Difficult to automate | ✅ Primary context |
| **Quality** | ✅ Continuous feedback | ✅ Teachable at scale | ✅ QLCs designed for this | ✅ CI/CD integration |
| **Process** | 🟡 Self-regulation focus | ✅ Observable patterns | 🟡 Limited (no observation) | ✅ Primary assessment |
| **Comprehension** | ✅ POE, explanation tasks | ✅ Verify understanding | 🟡 Automated only (limited) | ✅ Assumed prerequisite |

Legend: ✅ Well-suited | 🟡 Possible with constraints | ❌ Impractical

---

### Table 2: Feedback Type × Timing Matrix

| Feedback Type | Real-Time | Post-Execution | On-Demand | Retrospective | Adaptive |
|---------------|-----------|----------------|-----------|---------------|----------|
| **Corrective** | ✅ Syntax fixes | ✅ Quick corrections | 🟡 Can delay | ❌ Too late | ✅ Adjust frequency |
| **Explanatory** | ❌ Too interruptive | ✅ Build models | ✅ Primary use | 🟡 Summary insights | ✅ State-responsive |
| **Scaffolded** | ❌ Breaks flow | 🟡 Brief hints | ✅ Progressive levels | ❌ Too late | ✅ Adjust depth |
| **Adaptive** | 🟡 Simple adaptation | ✅ Adjust to performance | ✅ Personalized | ✅ Longitudinal patterns | ✅ Primary use |
| **Socratic** | ❌ Too slow | 🟡 Brief questions | ✅ Primary use | ✅ Reflective prompts | ✅ State-responsive |
| **Comparative** | ❌ Distracting | ✅ Show differences | ✅ Primary use | ✅ Progress comparisons | 🟡 Can adapt |

---

### Table 3: Framework × Scale Implications

| Framework | Individual | Classroom | MOOC | Professional |
|-----------|------------|-----------|------|--------------|
| **Misconceptions** | Persistence tracking | Dashboard patterns | Automated detection | Anti-pattern focus |
| **Notional Machines** | Adaptive visualization | Instructor verification | Automated viz only | Advanced debugging |
| **Threshold Concepts** | Full longitudinal tracking | Liminal scaffolding | Pattern recognition | Already crossed |
| **Taxonomies (SOLO/BSI)** | Portfolio progression | Differentiated grouping | IRT calibration | Architectural level |
| **QLCs** | Continuous improvement | Automated + review | Designed for this | CI/CD integration |

---

## Part 3: Case Studies

Detailed walkthroughs applying all four lenses to specific scenarios.

### Case Study 1: Assessing Closures in 30-Student Classroom

**Context**: CS1 course week 6, just introduced closures (JavaScript threshold concept #2)

#### Step 1: Start with Purpose (WHY assess?)

**Educational goal**: Support students through closure threshold crossing, not grade during confusion

**Categorization-by-assessment-purpose analysis**:
- **Formative**: Primary purpose (support learning, build correct mental model)
- **Diagnostic**: Secondary (detect liminal state vs post-threshold)
- **Comprehension**: Verify understanding (can explain closure capture mechanism)

**Selected use cases** (from assessment-use-cases-table.md):
- Liminal state scaffolding (formative)
- POE cycle support (formative + comprehension)
- Threshold crossing verification (comprehension + diagnostic)
- Prediction task verification (comprehension)

#### Step 2: Check Scale Constraints (WHERE/WITH WHOM?)

**Deployment context**: Classroom (30 students), instructor available

**Categorization-by-scale-deployment analysis**:
- **Automation**: 70% automated detection + 30% instructor intervention
- **Instructor role**: Dashboard shows liminal state students → targeted sessions
- **Feasibility**: Classroom scale enables manual verification for flagged cases

**Scale implications**:
- Can use instructor-led scaffolding sessions (impossible at MOOC scale)
- Automated detection flags students for review (infeasible for individual self-study without instructor)
- Class-wide patterns visible (15 students struggling → adjust instruction)

#### Step 3: Select Timing Strategy (WHEN deliver feedback?)

**Categorization-by-delivery-timing analysis**:
- **Adaptive timing**: Primary strategy (increase frequency during liminal state)
- **Retrospective**: Detect crossing over multiple weeks
- **Avoid real-time**: Closures require reflection, not immediate feedback

**Timing decisions**:
- Week 6 (introduction): Diagnostic tasks (immediate post-execution feedback)
- Week 7-8 (liminal): Adaptive (daily practice with frequent scaffolding)
- Week 9+ (post-threshold): Retrospective analysis confirms crossing

**Framework timing implications** (from categorization-by-delivery-timing.md):
- Threshold state detection requires longitudinal patterns (weeks of data)
- Liminal indicators (inconsistent predictions) only visible across multiple attempts
- Post-execution good for POE cycle (predict → execute → compare → explain)

#### Step 4: Choose Feedback Approach (HOW provide feedback?)

**Categorization-by-feedback-type analysis**:
- **Explanatory**: Primary (build scope chain mental model)
- **Scaffolded**: Secondary (progressive hints for complex scenarios)
- **Adaptive**: Adjust to threshold state (pre/liminal/post)

**Feedback decisions**:
- **Pre-threshold**: Explanatory (teach scope chain mechanism)
- **Liminal**: Scaffolded + Explanatory (support struggle without giving away)
- **Post-threshold**: Minimal (assume mastery)

**Feedback specificity** (from categorization-by-feedback-type.md):
- Level 4 optimal: "Closures capture references not values. Loop's `i` increments before callback executes."
- Avoid Level 5 corrective: "Change `var i` to `let i`" (learned helplessness)

#### Complete Assessment System Design

**Week 6** (Introduction):
- **Purpose**: Diagnostic (prerequisite check - scope understanding)
- **Timing**: Immediate post-execution (detect initial confusions)
- **Feedback**: Explanatory (scope chain review if needed)
- **Scale**: Automated prerequisite quiz

**Week 7-8** (Liminal Period):
- **Purpose**: Formative (no grading), Diagnostic (liminal detection)
- **Timing**: Adaptive (frequent practice, increase support for strugglers)
- **Feedback**: Explanatory (closure mechanism) + Scaffolded (progressive hints)
- **Scale**: Automated detection → Instructor dashboard → Targeted office hours for liminal students

**Week 9** (Crossing Detection):
- **Purpose**: Diagnostic (verify threshold crossed)
- **Timing**: Retrospective (analyze week 7-9 patterns)
- **Feedback**: Celebratory (recognize milestone)
- **Scale**: Automated crossing detection + instructor confirmation

**Week 10+** (Post-Threshold):
- **Purpose**: Summative (ready to grade closures), Integration (closures + async)
- **Timing**: On-demand (comprehensive assessment)
- **Feedback**: Minimal (expect mastery)
- **Scale**: Automated grading + instructor review edge cases

**Outcome**: Students supported through difficult transition without grading confusion. Threshold crossing celebrated. Post-threshold summative assessment validates mastery.

---

### Case Study 2: Quality Assessment in 5,000-Student MOOC

**Context**: End-of-unit JavaScript assessment for MOOC, need to assess code quality beyond correctness

#### All Four Lenses Applied

**Purpose**: Summative (graded) + Quality (QLCs framework)

**Scale**: MOOC (5,000 students) → 100% automation required, fairness critical

**Timing**: Batch retrospective (overnight processing acceptable) + On-demand preview

**Feedback**: Comparative (reference solutions) + Automated explanatory

#### Scale Constraints Drive Everything

**What scale eliminates**:
- ❌ Instructor-led scaffolding (impossible)
- ❌ Socratic questioning (requires human)
- ❌ Manual code review (infeasible)
- ❌ Real-time feedback (server load)

**What scale requires**:
- ✅ Psychometric validation (IRT/DIF to ensure fairness)
- ✅ Automated quality analysis (QLCs designed for this)
- ✅ Efficient algorithms (O(n log n) max)
- ✅ Clear rubrics (automated application)

#### Implementation

**Pre-assessment validation**:
- IRT analysis: Calibrate item difficulty
- DIF analysis: Remove demographically biased items
- Pilot testing: Verify automated scoring accuracy

**Assessment execution**:
- QLCs analysis: Naming, API usage, algorithm choice, patterns
- Multi-dimensional scoring: Correctness 40%, Quality 60%
- Automated feedback: Specific quality suggestions

**Fairness verification**:
- Post-hoc DIF analysis: Check for demographic disparities
- Accessibility audit: Screen reader compatibility
- English proficiency: Feedback linguistic complexity

**Outcome**: Scalable quality assessment (validated at MOOC scale by Lehtinen 2023), fair measurement, actionable feedback.

---

### Case Study 3: Individual Self-Study Async Learning

**Context**: Solo learner working through JavaScript async independently

#### Unique Challenges

**No external accountability** → Motivation critical
**No instructor** → 100% automation required
**No peers** → Social comparison unavailable
**Self-paced** → Easy to skip hard topics

#### All Four Lenses Applied

**Purpose**: Formative (self-directed learning) + Adaptive (personalize to progress)

**Timing**: On-demand (student controls) + Retrospective (show growth for motivation)

**Feedback**: Scaffolded (progressive hints) + Adaptive (adjust to detected state)

**Scale**: Individual → Full personalization possible, motivation support critical

#### System Design

**Forced structure** (prevent skipping):
- Locked progression: Must demonstrate threshold readiness before unlocking next concept
- Prediction required: Can't execute until prediction submitted (POE discipline)
- Progressive disclosure: Must view hint Level 1 before Level 2 unlocks

**Motivation mechanisms**:
- Longitudinal dashboard: Show quality improvement week-over-week
- Milestone celebrations: "You've crossed the async threshold!"
- Gamification: Progress bars, achievement badges, streaks
- Concrete progress: "Naming quality: D → B in 3 weeks"

**Adaptive personalization**:
- Threshold state detection: Adjust async task difficulty based on prediction consistency
- Misconception persistence: Auto-suggest review after repeated pattern
- Readiness detection: Unlock closures only after scope mastery demonstrated

**Outcome**: Self-regulated learner maintains motivation, systematic skill development, threshold concepts crossed at individual pace.

---

## Part 4: Decision Guidance

Step-by-step process for designing assessment systems using all four categorizations.

### Decision Process

**Step 1: Start with Purpose (Educational Goal)**

Ask: What do I want students to learn/demonstrate?

Navigate to `categorization-by-assessment-purpose.md`, find relevant category:
- Learning support → Formative
- Achievement measurement → Summative
- Gap identification → Diagnostic
- Professional skills → Authentic
- Code craftsmanship → Quality
- Development habits → Process
- Mental models → Comprehension

**Identify use cases** from selected category, note constraints (grading implications, timing requirements)

---

**Step 2: Check Scale Constraints (Deployment Context)**

Ask: How many students? Is instructor available? What automation is feasible?

Navigate to `categorization-by-scale-deployment.md`, find context:
- 1 student → Individual (100% automation, motivation critical)
- 20-50 students → Classroom (instructor oversight possible)
- 1000+ students → MOOC (100% automation required, fairness critical)
- Professional developers → Authentic tools, team context

**Identify automation requirements**, instructor role, fairness considerations

**Filter use cases** from Step 1: Eliminate those infeasible at your scale

---

**Step 3: Select Timing Strategy (When to Deliver Feedback)**

Ask: When does this learning benefit from feedback? What's computationally feasible?

Navigate to `categorization-by-delivery-timing.md`, consider:
- Procedural skills (syntax) → Real-time
- Conceptual understanding → Delayed (post-execution or on-demand)
- Strategic thinking → On-demand
- Pattern visibility → Retrospective
- Personalization → Adaptive

**Match timing to skill type**, check framework implications (threshold detection needs longitudinal, NM visualization works post-execution)

---

**Step 4: Choose Feedback Approach (How to Provide Feedback)**

Ask: What pedagogical approach serves my purpose? What's automatable at my scale?

Navigate to `categorization-by-feedback-type.md`, consider:
- Procedural fixes → Corrective (but risk learned helplessness)
- Conceptual understanding → Explanatory (Level 4 optimal)
- Problem-solving → Scaffolded (progressive hints)
- Personalization → Adaptive (state-responsive)
- Deep thinking → Socratic (but requires instructor at classroom scale)
- Quality awareness → Comparative (reference solutions)

**Select feedback type**, verify compatible with scale (Socratic impossible at MOOC scale)

---

**Step 5: Consult Use Case Table**

Navigate to `assessment-use-cases-table.md`

Find specific use cases matching your Purpose + Scale + Timing + Feedback combination

**Use "What Educational Tools Do" column** for technical requirements (this is Step 4 deliverable - Step 5 will translate to trace requirements)

---

**Step 6: Check Integration Document** (this document)

Look for **Configuration Profile** matching your scenario

Review **Cross-Reference Tables** for compatibility warnings

Study relevant **Case Study** for implementation examples

---

### Example Decision Walkthrough

**Scenario**: "I want to help 25 CS1 students debug code systematically"

**Step 1 - Purpose**:
- Authentic assessment (professional skill)
- Process assessment (debugging strategy)
→ Use cases: Debugging strategy classification, tool usage appropriateness

**Step 2 - Scale**:
- Classroom (25 students)
- Instructor available for targeted help
- 70% automation feasible

**Step 3 - Timing**:
- On-demand (students debug at own pace)
- Retrospective (review debugging history afterward)

**Step 4 - Feedback**:
- Minimal during (authentic = figure it out)
- Explanatory after (review strategy with student)

**Step 5 - Use Case Table**:
- "Debugging strategy classification" - distinguish systematic vs trial-and-error
- "Tool usage appropriateness" - debugger vs print debugging

**Step 6 - Integration**:
- Profile 5 (Authentic Professional Context) closely matches
- Case study shows implementation approach
- Note: Combine authentic (minimal help) with process assessment (detailed review after)

---

## Part 5: Integration Principles

### Principle 1: Purpose Takes Priority

When dimensions conflict, educational purpose wins.

**Example conflict**: Scale suggests "100% automation" (MOOC), but Purpose requires "Socratic questioning" (comprehension verification)

**Resolution**: Redesign assessment for automated Socratic (forced predictions, comparison tasks, MCQ explanations) OR accept scale limitation (small-group comprehension spot-checks)

---

### Principle 2: Scale Constrains Feedback

Feedback type must be automatable at your scale.

**Feasibility by scale**:
- Individual: Any feedback type (automation required, but personalization possible)
- Classroom: Most types (Socratic requires instructor time)
- MOOC: Corrective, Explanatory, Comparative only (Scaffolded/Adaptive/Socratic challenging)
- Professional: Context-appropriate only (minimal scaffolding, authentic help sources)

---

### Principle 3: Timing Depends on Skill Type

Procedural vs conceptual skills need different timing (from Keuning et al. 2019):
- **Procedural** (syntax, conventions) → Immediate (real-time or post-execution)
- **Conceptual** (mental models, NMs) → Delayed (on-demand or retrospective)
- **Strategic** (design decisions) → Delayed (reflection time essential)

**Threshold concepts**: Always delayed (liminal state requires longitudinal patterns, weeks not minutes)

---

### Principle 4: Avoid Formative-Summative Conflicts

Don't grade confusion during threshold liminal states.

**Conflicting configuration**:
- Purpose: Formative (no grading)
- Timing: Real-time (during learning)
- But also: Summative (graded)

**Resolution**: Temporal separation
- Weeks 1-6: Formative only (no grades)
- Week 7+: Post-threshold, summative appropriate

---

### Principle 5: Fairness Increases with Stakes

High-stakes assessment (summative, affects grades/credentials) demands rigorous fairness validation.

**Fairness requirements by purpose**:
- Formative: Basic accessibility (screen reader compatible)
- Diagnostic: Avoid cultural bias in misconception detection
- Summative: Full psychometric validation (IRT, DIF analysis) + accessibility compliance

**Scale amplifies fairness concerns**: MOOC summative = maximum fairness requirement

---

### Principle 6: Integration Reveals Patterns

Viewing assessment through multiple lenses reveals patterns invisible in single lens.

**Example**: "Misconception-triggered feedback"
- Purpose: Formative (support) OR Diagnostic (identify) - same mechanism, instructor chooses purpose
- Timing: Immediate (simple patterns) OR On-demand (complex diagnosis) - misconception type determines
- Feedback: Explanatory Level 4 (specificity research-backed)
- Scale: Classroom dashboard (class-wide patterns) vs Individual tracking (persistence)

Each lens adds information. Together = comprehensive system design.

---

### Principle 7: Frameworks Interact with Scale

Framework implications differ by deployment scale (from categorization-by-scale-deployment.md):

**Threshold concepts**:
- Individual: Full longitudinal tracking possible
- Classroom: Automated detection + instructor scaffolding
- MOOC: Pattern recognition only (no human liminal support)
- Professional: Already crossed

**QLCs**:
- Individual: Continuous improvement feedback
- Classroom: Automated + instructor review
- MOOC: Designed explicitly for this scale
- Professional: CI/CD integration

**Design implication**: Choose frameworks appropriate for your scale.

---

## Summary

**The four categorizations are complementary, not competing.** Each reveals different aspect of assessment design:

- **Purpose**: Educational goals (WHY)
- **Timing**: Temporal strategy (WHEN)
- **Feedback**: Pedagogical approach (HOW)
- **Scale**: Deployment context (WHERE/WITH WHOM)

**Comprehensive assessment design requires ALL FOUR dimensions.**

Use this synthesis document to:
1. Find configuration profiles matching your scenario
2. Check cross-reference tables for compatibility
3. Study case studies for implementation patterns
4. Follow decision guidance for systematic design
5. Apply integration principles to resolve conflicts

**Result**: Research-grounded, multi-dimensional assessment systems serving educational goals within practical constraints.

---

## Navigation

**For depth**, consult individual categorization documents:
- `categorization-by-assessment-purpose.md` (645 lines) - Educational goals and research foundations
- `categorization-by-delivery-timing.md` (330 lines) - Temporal effects on learning
- `categorization-by-feedback-type.md` (371 lines) - Pedagogical sophistication
- `categorization-by-scale-deployment.md` (381 lines) - Practical deployment constraints

**For quick reference**, consult:
- `assessment-use-cases-table.md` (450 lines) - 50 use cases, 10 categories
- `assessment-use-cases-companion-guide.md` (800 lines) - Practical scenarios

**For implementation examples**:
- `assessment-task-examples.md` (540 lines) - 6 concrete tasks
- `framework-comparison-matrix.md` (280 lines) - Framework integration

**For practitioners**:
- `assessment-strategies-for-educators.md` (265 lines) - Entry point guide
