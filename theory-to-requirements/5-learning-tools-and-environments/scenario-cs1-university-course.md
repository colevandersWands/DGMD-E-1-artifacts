# Scenario: University CS1 Course (JavaScript)

**Complete tool selection walkthrough for introductory university programming course**

This scenario demonstrates how Phase 3 frameworks guide comprehensive tool selection for a realistic educational context.

## Course Context

**Setting**: University CS1 (Introduction to Programming)
**Language**: JavaScript
**Student Level**: Absolute beginners (no prior programming experience)
**Class Size**: 60 students
**Duration**: 14-week semester
**Delivery**: 2 lectures/week (75 min each), 1 lab session/week (110 min), homework assignments
**Instructor Resources**: 1 professor, 2 teaching assistants (TAs)

**Learning Objectives**:
1. Build accurate mental models of program execution
2. Develop systematic debugging skills
3. Write functional, readable code
4. Understand core programming concepts (variables, functions, control flow, data structures)
5. Prepare for CS2 (data structures course)

## Tool Selection Process

Following the [Tool Selection Framework](./tool-selection-framework.md), we apply multiple decision trees:

### Decision Tree 1: By Learning Objectives

**Primary Objective**: Mental model building (Weeks 1-8)

**Recommended Tools**:
- Program Visualization (Python Tutor-style)
- Notional Machine Validators
- Live Programming Environments

**Rationale**: Beginners need accurate mental models as foundation for all programming.

**Secondary Objective**: Debugging skills (Weeks 4-12)

**Recommended Tools**:
- Comprehension-First Debugging (CodeWrite-style)
- Simple Debugging Environments

**Tertiary Objective**: Conceptual Understanding (Weeks 8-14)

**Recommended Tools**:
- AI Tutoring (conceptual support)
- Threshold Concept Tools (async, closures introduced late)

**Later Objectives** (CS2 and beyond):
- Code Quality (not primary focus in CS1, but introduce)
- Misconception Correction (ongoing throughout)

### Decision Tree 2: By Student Level

**Beginner (Weeks 1-6)**:
- **Primary**: Domain-Specific Platform OR Visualization
- **Secondary**: Immediate Feedback (scaffolded)
- **Tertiary**: AI Tutoring (conceptual help)
- **Avoid**: QLCs, Complex Debugging, Macro-Level Analysis

**Beginner → Intermediate Transition (Weeks 7-14)**:
- Add systematic debugging (CodeWrite approach)
- Introduce basic quality awareness (naming conventions)
- Expand mental models (scope chain, closures)

### Decision Tree 3: By Deployment Context

**Classroom (Lectures)**:
- **Mode**: Passive Visualization (demos)
- **Tools**: Python Tutor projected, live coding demonstrations
- **Requirements**: Projection-friendly, offline-capable, quick setup

**Lab Sessions**:
- **Mode**: Interactive Stepping (pairs/small groups)
- **Tools**: CodeWrite exercises, Python Tutor exploration
- **Requirements**: Self-contained, 110-minute friendly, TA-supportable

**Homework**:
- **Mode**: Independent exploration + AI support
- **Tools**: Autograders (correctness), AI Tutoring (stuck questions)
- **Requirements**: 24/7 accessible, immediate feedback, robust

### Decision Tree 4: By Pedagogical Approach

**Chosen Philosophy**: Comprehension-First + Notional Machine Validation

**Rationale**:
- Xie et al. (2019): Comprehension-first yields 10-15% gains for beginners
- Sorva (2013): Explicit NM instruction recommended
- Combination proven effective

**Implementation**:
1. Read code examples (lectures)
2. Visualize execution (Python Tutor)
3. Trace execution (lab exercises)
4. Debug broken code (CodeWrite-style homework)
5. Modify working code (scaffolded assignments)
6. Write original code (later weeks)

## Selected Tool Suite

### Tool 1: Python Tutor (JavaScript Mode) - Primary Visualization

**Role**: Mental model building, execution visualization

**Usage**:

**Weeks 1-4** (Heavy Usage):
- Lecture demos: Every new concept visualized
- Lab exercises: 30-40 min per session exploring visualization
- Homework: "Predict execution then visualize" exercises

**Weeks 5-10** (Moderate Usage):
- Lecture: Visualize complex examples only
- Lab: Debugging exercises with visualization
- Homework: Optional visualization aid

**Weeks 11-14** (Light Usage):
- Occasional complex concept visualization
- Students encouraged to visualize mentally first

**Why Python Tutor**:
- ✅ Guo (2013): 75M+ visualizations, proven effectiveness
- ✅ Free, web-based, no setup required
- ✅ Shows call stack, heap, scope chain, references
- ✅ Familiar to TAs (widely used)
- ✅ JavaScript support adequate for CS1

**Limitations**:
- ⚠️ No event loop visualization (acceptable: async introduced Week 12)
- ⚠️ Not JavaScript-specific (but general execution model fine for CS1)

### Tool 2: CodeWrite-Style Debugging Exercises - Comprehension-First

**Role**: Debugging skill development through comprehension-first pedagogy

**Implementation**:

**Week 4**: Introduce approach
- Read buggy code examples in lecture
- Trace execution to find bugs
- Fix bugs in lab

**Weeks 5-10**: Primary debugging practice
- Homework: 1-2 debugging exercises per week
- Lab: Debugging pairs, systematic strategies
- Progression: Syntax bugs → Logic bugs → Conceptual bugs

**Weeks 11-14**: Advanced debugging
- Closure bugs (after scope chain taught)
- Async bugs (if time)

**Why Comprehension-First**:
- ✅ Xie et al. (2019): 10-15% learning gains, higher engagement
- ✅ Reduces "blank page" overwhelm
- ✅ Builds reading/tracing skills before writing
- ✅ Aligns with professional development (experts read code constantly)

**Implementation Options**:
- Option A: Use actual CodeWrite platform (if available/affordable)
- Option B: Create curated buggy code exercises manually
- Option C: Use existing debugging exercise platforms (varied quality)

**Selected**: Option B (curated exercises) - instructor control, no cost

### Tool 3: AI Tutoring (ChatGPT/Claude + Guardrails) - 24/7 Support

**Role**: Conceptual understanding, homework support, 24/7 availability

**Usage**:

**Week 1: AI Literacy Session**
- "How to use AI for learning (not cheating)"
- Demonstrate good vs bad AI usage
- Practice asking effective questions
- Establish guidelines

**Weeks 2-14: Guided AI Use**
- Homework: "Try for 15 minutes, then you may ask AI"
- AI may explain concepts, NOT provide complete solutions
- Students must explain AI's reasoning in submission comments

**Guardrails**:

**Technical**:
- Embed execution environment with AI tutoring
- AI-suggested code must run and pass tests
- AI responses validated by TAs (spot checks)

**Pedagogical**:
- Explicit instructions: "AI should explain, not solve"
- Assignment design: Require justification/explanation
- Assessment: Oral quizzes verifying understanding (not just code submission)

**Why AI Tutoring**:
- ✅ Liffiton et al. (2023), Kazemitabaar et al. (2024): Effective when scaffolded
- ✅ 60 students > 3 instructors = Can't answer all questions immediately
- ✅ Homework often done late night (no instructor available)
- ✅ Personalized explanations adapt to student confusion

**Cautions**:
- ⚠️ Finnie-Ansley (2022), Prather (2023): Uncritical acceptance risk
- ⚠️ Must teach verification and critical thinking
- ⚠️ Monitor for over-reliance

### Tool 4: Autograders - Homework Correctness Checking

**Role**: Immediate functional correctness feedback at scale

**Usage**:

**All Weeks**:
- Homework submissions auto-graded for correctness
- Immediate pass/fail feedback
- Hidden test cases prevent hardcoding
- Unlimited resubmissions (encourages iteration)

**Why Autograders**:
- ✅ Scale: 60 students × 12 assignments = 720 submissions
- ✅ Immediate feedback enables rapid iteration
- ✅ Frees TA time for higher-value activities (debugging help, concept explanation)

**Limitations**:
- ⚠️ Only assesses correctness, not quality
- ⚠️ Can be gamed (trial-and-error without understanding)

**Mitigation**:
- Combine with explanation requirements
- Oral quizzes on select assignments
- TAs review code samples for quality (spot checking)

### Tool 5 (Optional): Basic Quality Feedback - Weeks 10-14

**Role**: Introduce code quality awareness

**Usage**:

**Week 10**: Introduce quality concepts
- Lecture: "What makes code good beyond correctness"
- Topics: Naming, structure, complexity

**Weeks 11-14**: Basic quality feedback
- Autograder includes simple quality checks (ESLint-style)
- Variable names not single letters
- Functions not excessively long
- Basic naming conventions

**Why Introduce Quality**:
- Preparation for CS2 (where quality matters more)
- Habits formed early
- Professional expectations

**Why NOT Heavy Focus**:
- Beginners overwhelmed if too many criteria
- Correctness must come first
- Quality deepened in CS2

## Weekly Tool Integration

### Weeks 1-2: Foundation

**Lecture** (Python Tutor Heavy):
- Demonstrate variables, basic types, operators
- Visualize every concept
- Students predict → observe → explain

**Lab** (Python Tutor Exploration):
- Guided exploration: "Change this value, predict, observe"
- Pair work: One predicts, one checks with visualization
- Build initial mental models

**Homework** (Tracing + Simple Coding):
- Trace provided code using Python Tutor
- Write simple functions (1-2 lines of logic)
- Autograder provides correctness feedback
- AI available for conceptual questions

### Weeks 3-4: Control Flow Introduction

**Lecture** (Visualization + Live Coding):
- Introduce conditionals and loops
- Visualize branching and iteration
- Common beginner errors demonstrated

**Lab** (Tracing + First Debugging):
- Trace loop execution
- Debug simple loop bugs (off-by-one, wrong condition)
- Pair debugging exercises

**Homework** (CodeWrite Approach Begins):
- Read and trace buggy loop code
- Fix bugs
- Write similar correct functions
- Autograder checks correctness

### Weeks 5-8: Functions and Scope

**Lecture** (Mental Models Focus):
- Call stack visualization (fundamental)
- Scope chain introduction
- Function execution lifecycle

**Lab** (Debugging Focus):
- Debug function bugs (wrong parameters, scope errors)
- Systematic debugging strategies introduced
- TAs coach debugging process

**Homework** (Debugging + Writing):
- 1-2 debugging exercises (comprehension-first)
- 1-2 writing exercises (apply understanding)
- AI tutoring for conceptual questions (scope confusion common)

### Weeks 9-10: Objects and References

**Lecture** (Critical Concept):
- Reference vs value visualization (essential)
- Object mutation demonstration
- Common reference bugs shown

**Lab** (Hands-On Exploration):
- Modify objects, observe shared references
- Debug reference-related bugs
- Pair discussions: "Why did both variables change?"

**Homework** (Challenging Material):
- Reference bugs to debug
- Object manipulation exercises
- Quality feedback introduced (naming)

### Weeks 11-12: Advanced Concepts (Threshold Concepts)

**Lecture** (Closures and Async):
- Closure scope persistence visualization
- Event loop introduction (if time)
- Acknowledge complexity, multi-semester learning

**Lab** (Supported Exploration):
- Closure debugging exercises
- TAs available for confusion (expect high TA demand)
- AI tutoring heavily used

**Homework** (Scaffolded Difficulty):
- Simpler closure examples (not loop closure bug yet)
- Async optional/bonus (CS2 topic mainly)

### Weeks 13-14: Review and Synthesis

**Lecture** (Integration):
- Review all NMs taught (call stack, scope chain, references)
- Discuss learning progression
- Preview CS2 topics

**Lab** (Open Problem Solving):
- Integrate multiple concepts
- Debugging complex problems
- Quality feedback on all code

**Homework** (Final Assignment):
- Multi-concept integration
- Quality expectations clear
- Demonstrates CS1 learning objectives met

## Assessment Strategy

### Formative Assessment (Weekly Homework)

**Grading**:
- 60%: Correctness (autograder)
- 20%: Debugging explanations (TA-graded, selected samples)
- 20%: Code quality (automated checks Weeks 10-14)

**Resubmissions**: Unlimited for correctness, encourages iteration

### Midterm Exam (Week 7)

**Format**: On-paper coding + tracing (no computer)

**Rationale**:
- Verify mental models (can students trace without visualization?)
- Ensure understanding (not just AI/tool reliance)
- Traditional assessment (university requirements)

**Content**:
- Trace execution by hand
- Predict output
- Debug buggy code (written)
- Write simple functions

### Final Exam (Week 15)

**Format**: Hybrid - written + computer-based

**Written Section** (50%):
- Trace complex execution
- Explain concepts (closures, scope, references)
- Debug code on paper

**Computer Section** (50%):
- Implement functions (with autograder)
- Debug provided broken code
- Integrate multiple concepts
- **No AI allowed** (verify independent capability)

### Participation (Lab Attendance)

**Grading**: Attendance + engagement

**Rationale**: Lab sessions critical for hands-on practice

## Workload Distribution

### Instructor (Professor)

**Lectures** (3 hours/week):
- Concept introduction with visualization demos
- Live coding with Python Tutor

**Office Hours** (2 hours/week):
- Conceptual questions
- Career guidance
- Struggling student support

**Grading** (2 hours/week):
- Midterm/final exam creation and grading
- Spot-check homework for quality
- Monitor TA grading

**Total**: ~7-8 hours/week

### Teaching Assistants (2 TAs)

**Lab Sessions** (110 min/week each = 3.7 hours total):
- Guide debugging exercises
- Answer student questions
- Support pair work

**Office Hours** (2 hours/week each = 4 hours total):
- Debugging help
- Homework questions
- Concept clarification

**Grading** (4 hours/week total):
- Spot-check debugging explanations (not all submissions)
- Midterm/final assistance
- Quality feedback sampling

**Total per TA**: ~6-7 hours/week (each)

### Students

**Lectures** (2.5 hours/week):
- Active learning (predict-observe with visualization)

**Lab** (1.8 hours/week):
- Hands-on debugging and coding practice

**Homework** (6-8 hours/week):
- Debugging exercises (2-3 hours)
- Writing exercises (2-3 hours)
- Reading/tracing (1-2 hours)
- Autograder iteration (variable time)

**Total**: ~10-12 hours/week (typical for 4-credit CS1 course)

## Tool Costs and Resources

### Costs

**Python Tutor**: Free (web-based)
**AI Tutoring**: Free (ChatGPT free tier, Claude free tier)
**Autograders**: Depends on platform
  - Gradescope: ~$1,500/year university license (already have)
  - Custom autograder: TA development time
**CodeWrite Exercises**: Free (curated by instructor)

**Total**: $0 incremental (using existing university resources)

### Technical Requirements

**Students**: Computer with web browser (no special software)
**Instructor/TAs**: Same, plus autograder access
**Infrastructure**: University LMS for assignment submission

## Decision Framework Validation

Let's verify this scenario against all Phase 3 decision trees (from PHASE3-REVIEW-REPORT.md):

### Tree 1: By Primary Learning Objective ✅

Mental Model Building → Python Tutor + NM Validators ✅ (Python Tutor selected)
Debugging Skills → CodeWrite → ✅ (Comprehension-first approach selected)
Conceptual Understanding → AI Tutoring ✅ (AI tutoring selected)

**Verdict**: All trees align

### Tree 2: By Student Level ✅

Beginner → Visualization + Comprehension-First + AI Tutoring ✅ (all selected)
Avoid QLCs, Complex Debugging ✅ (avoided until later weeks)

**Verdict**: Aligned with beginner needs

### Tree 3: By Deployment Context ✅

Classroom → Passive Visualization ✅ (Python Tutor demos)
Labs → Interactive Stepping ✅ (CodeWrite exercises)
Homework → Autograders + AI ✅ (both selected)

**Verdict**: Aligned with deployment realities

### Tree 4: By Pedagogical Approach ✅

Comprehension-First → CodeWrite-style ✅ (selected)
NM Validation → Visualization ✅ (Python Tutor selected)

**Verdict**: Philosophy matches tool selection

## Expected Outcomes

Based on research evidence:

**Mental Model Accuracy** (Guo 2013, Ben-Ari 2011):
- Students develop accurate call stack, scope, reference mental models
- Fewer misconceptions than traditional instruction
- Visualization-supported learning improves prediction accuracy

**Debugging Skills** (Xie 2019):
- 10-15% learning improvement expected from comprehension-first
- Systematic debugging strategies vs random trial-and-error
- Higher engagement with debugging exercises

**Conceptual Understanding** (Liffiton 2023, Kazemitabaar 2024):
- AI tutoring improves accessibility of conceptual explanations
- 24/7 support increases homework success
- Proper guardrails prevent over-reliance

**Code Quality** (Introduced, not mastered):
- Awareness of quality beyond correctness
- Foundation for CS2 quality focus
- Naming conventions learned

## Alternative Scenarios Considered

### Alternative A: Domain-Specific Platform First (e.g., Scratch)

**Approach**: Weeks 1-4 with Scratch, transition to JavaScript Week 5

**Pros**:
- Lower initial cognitive load
- Visual, block-based reduces syntax errors
- Proven effective for absolute beginners (Maloney 2010)

**Cons**:
- Transfer challenges to JavaScript
- 4-week Scratch = less JavaScript time
- University stakeholders expect "real" language from day 1

**Decision**: Not selected (university context expects JavaScript throughout)

### Alternative B: Heavy QLC Focus from Day 1

**Approach**: Assess code quality from Week 1

**Pros**:
- Build quality habits early
- Professional standards

**Cons**:
- Overwhelms beginners
- Correctness must come first

**Decision**: Not selected (introduce quality Weeks 10-14 only)

### Alternative C: No AI Tutoring (Traditional Only)

**Approach**: Instructor/TA support only, no AI

**Pros**:
- No AI risks (uncritical acceptance, hallucination)
- Simpler for students

**Cons**:
- 60 students > 3 instructors = Limited support availability
- Late-night homework no support
- Missed opportunity for personalized explanations

**Decision**: Not selected (AI benefits outweigh risks when properly scaffolded)

## Adaptation for Different Contexts

### Larger Class (200+ students)

**Changes**:
- Add more TAs (1 TA per 30 students ideal)
- Increase autograder usage (less manual grading)
- Stronger reliance on AI tutoring (instructor can't scale)
- Async lecture videos + active learning labs

**Tools Remain Similar**: Visualization, autograders, AI tutoring, comprehension-first

### Smaller Class (20 students)

**Changes**:
- More manual code review (instructor time available)
- Introduce quality feedback earlier (Week 6)
- More one-on-one debugging mentorship
- Less reliance on autograders (manual grading feasible)

**Tools Addition**: Manual code review, earlier quality focus

### Different Language (e.g., Python)

**Changes**:
- Python Tutor (Python mode) - same tool, different language
- Python-specific misconceptions (indentation, mutable defaults)
- Otherwise similar tool suite

**Tools Remain Same**: Visualization, comprehension-first, AI tutoring, autograders

## References to Phase 3 Documents

This scenario integrates:

- **[Tool Selection Framework](./tool-selection-framework.md)**: All 4 decision trees applied
- **[Pedagogical Approaches](./categorization-by-pedagogical-approach.md)**: Comprehension-first + NM validation
- **[Learning Objectives](./categorization-by-learning-objectives.md)**: Mental models + debugging + concepts
- **[Deployment Context](./categorization-by-deployment-context.md)**: Classroom + lab + homework
- **[Tool Integration Patterns](./tool-integration-patterns.md)**: Visualization + Debugging pattern
- **[Feedback Loop Patterns](./feedback-loop-patterns.md)**: Immediate (autograder) + Guided (AI) + Predictive (POE)
- **[Taxonomy Support](./lt-taxonomy-support.md)**: SOLO progression, Block Model alignment
- **[Misconception Prevention](./lt-misconception-prevention.md)**: Visualization corrects misconceptions
- **[Progressive Disclosure](./progressive-disclosure-in-tools.md)**: Fading visualization, complexity progression

**Phase 3 Validation**: This scenario was tested in Phase 3 Review (Scenario A) and all decision trees converged successfully.

---

## Summary

**Tool Suite**: Python Tutor + CodeWrite-style debugging + AI tutoring + Autograders + (later) Basic quality feedback

**Total Tools**: 4-5 tools, all complementary

**Evidence Backing**: All selected tools have research supporting effectiveness (Guo 2013, Xie 2019, Liffiton 2023, Kazemitabaar 2024)

**Decision Framework**: All 4 decision trees align, no conflicts

**Feasibility**: Proven in Phase 3 review testing

**Expected Outcome**: Effective CS1 course preparing students for CS2, building strong foundations in mental models, debugging, and core programming concepts.
