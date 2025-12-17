# Assessment Use Cases by Scale & Deployment Context

**Step 4 Deliverable**: Organize assessment by classroom size and deployment context

**Who this serves**:
- **Educators**: Understand scalability requirements
- **Tool developers**: Design for appropriate deployment contexts
- **Researchers**: Study scale effects on assessment

---

## Introduction

Assessment strategies must adapt to scale:
- **Individual (1)**: Full personalization possible
- **Classroom (20-50)**: Instructor oversight feasible
- **MOOC (1000s)**: Full automation required
- **Professional/IDE**: Authentic tools, real workflows

**Key insight**: Scale affects automation requirements, feedback latency, fairness importance.

---

## 1. Individual Self-Study

**Context**: Learner working alone, self-paced, self-directed

**Scale**: 1 student

**Unique challenges**: Motivation, self-regulation, misconception persistence without intervention

### Assessment Characteristics

**Personalization**
- Full adaptation to individual pace
- No comparison to peers (can be isolating)
- Progress entirely self-driven

**Timing**
- Student controls when to attempt assessment
- No external deadlines (unless self-imposed)
- Can repeat indefinitely

**Feedback**
- Must be fully automated or none
- Scaffolding/hints critical (no instructor)
- Metacognitive prompts important

### Use Cases

**Adaptive difficulty progression**
- What: Adjust task complexity based on performance history
- Why: No instructor to assign appropriate level
- Example: Mastered loops → Unlock recursion challenges

**Threshold readiness detection**
- What: Auto-detect when ready for next threshold concept
- Why: Self-paced means no fixed curriculum schedule
- Example: Closures attempted 10x, success increasing → Suggest async next

**Longitudinal progress visualization**
- What: Show growth over weeks/months to sustain motivation
- Why: No external validation/grades
- Example: Dashboard showing QLCs improvement: Naming D→B, API C→B+

**Misconception persistence tracking**
- What: Flag repeatedly occurring errors for focused review
- Why: No instructor to notice patterns
- Example: "Variable initialization errors in 6 of last 8 exercises - review needed?"

**POE with delayed reveal**
- What: Force prediction before showing result
- Why: Easy to skip to answer without thinking when self-paced
- Example: Can't execute until prediction submitted

### Design Principles

**Motivation**:
- Gamification elements (progress bars, achievements)
- Explicit milestone celebration
- Growth visualization

**Self-regulation support**:
- Suggested pacing ("Most learners spend 3 weeks on async")
- Reflection prompts ("What did you learn this session?")
- Goal-setting tools

**Misconception intervention**:
- Automated pattern detection → Review suggestions
- Can't be ignored (self-study risks skipping hard topics)

**Automation level**: 100% - no human in loop

**Framework implications**: Individual scale enables full threshold state tracking via longitudinal pattern analysis (weeks of data per student). All notional machines assessable through adaptive visualization (student controls pacing). Misconception persistence tracking identifies patterns needing focused review. Taxonomy progression (SOLO levels) visible through portfolio analysis. QLCs quality improvement measurable across all submissions.

---

## 2. Classroom (20-50 students)

**Context**: Traditional CS course, instructor available, synchronous/hybrid

**Scale**: 20-50 students

**Unique affordances**: Instructor oversight, peer learning, manageable personalization

### Assessment Characteristics

**Instructor involvement**
- Can review flagged cases manually
- Dashboard shows class-wide patterns
- 1-on-1 interventions feasible

**Peer interaction**
- Code review among students
- Discussion of alternative approaches
- Collaborative debugging

**Partial automation**
- Automated initial assessment
- Instructor reviews edge cases/appeals
- Balance automation + human judgment

### Use Cases

**Class-wide misconception dashboard**
- What: Instructor sees which misconceptions affect multiple students
- Why: Adjust instruction to address common gaps
- Example: "15 of 30 students show scope chain confusion → Dedicate next lecture to scoping"

**Flagged case manual review**
- What: Automated assessment with confidence scores, flag low-confidence for instructor
- Why: Maintain fairness while automating routine cases
- Example: "Unusual solution - passes tests but looks suspicious. Instructor review requested."

**Peer code review assignments**
- What: Students review each other's code using rubrics
- Why: Reviewing teaches as much as writing
- Example: "Review 2 peer solutions, identify 1 strength + 1 improvement area using QLCs rubric"

**Office hours targeting**
- What: Students struggling with specific misconceptions invited to targeted sessions
- Why: Efficient use of instructor time
- Example: "Students with threshold liminal state for async invited to Friday workshop"

**Comparative analytics**
- What: Student sees own progress vs anonymized class distribution
- Why: Context for self-assessment without unhealthy comparison
- Example: "Your quality improvement in top 25% of class"

**Adaptive grouping**
- What: Group students by current level for differentiated instruction
- Why: One-size-fits-all inefficient in mixed-ability classroom
- Example: "3 groups: mastering basics, mid-level challenges, advanced extensions"

### Design Principles

**Efficiency**:
- Automate routine assessment
- Reserve instructor time for high-value interactions
- Dashboard highlights priorities

**Fairness**:
- Consistent automated rubrics
- Human review for edge cases
- Transparent criteria

**Community**:
- Enable peer learning
- Class-wide analytics inform shared instruction
- Collaborative debugging sessions

**Automation level**: 70-80% automated, 20-30% instructor oversight

**Framework implications**: Classroom scale allows instructor manual verification of notional machine understanding for flagged cases (automated detection + human confirmation). Threshold state detection automated, but liminal state students get instructor-led scaffolding sessions. Misconception dashboard shows class-wide patterns (15 students with scope confusion → adjust lecture). QLCs automated for routine submissions, instructor reviews edge cases. Taxonomy level diagnosis guides differentiated instruction grouping.

---

## 3. MOOC (1000s of students)

**Context**: Massive scale, fully online, minimal human interaction

**Scale**: 1,000+ students

**Unique constraints**: Full automation required, fairness critical, human intervention impossible

### Assessment Characteristics

**Automation imperative**
- No manual grading possible
- All feedback generated automatically
- Edge case handling automated or formulaic

**Fairness priority**
- Psychometric validation essential (IRT, DIF)
- Bias detection critical (demographic disparities)
- Consistency across cohorts

**Latency tolerance**
- Seconds for simple checks
- Minutes for deep analysis acceptable
- Hours for batch processing (overnight)

### Use Cases

**Automated QLCs at scale (Lehtinen 2023)**
- What: Quality assessment for thousands of submissions automatically
- Why: Enables feedback beyond correctness at scale previously impossible
- Example: "Naming: B-, API: C+, Algorithm: B (processed 5,000 submissions)"

**Psychometric item validation**
- What: IRT analysis to detect too-hard/too-easy items, adjust scoring
- Why: Fair measurement across diverse population
- Example: "Item 12 has 0.15 discrimination - review for ambiguity"

**Differential item functioning (DIF) analysis**
- What: Detect items that disadvantage specific demographics
- Why: Ensure fairness, remove biased items
- Example: "Item 8 shows DIF by English proficiency - language complexity issue identified"

**Batch pattern analysis**
- What: Nightly processing of all submissions for misconception trends
- Why: Inform instructional videos, FAQ updates
- Example: "Top 3 misconceptions this week: async timing (45%), closure scope (32%), reference aliasing (28%)"

**Automated plagiarism detection**
- What: Similarity analysis across submissions
- Why: Academic integrity at scale
- Example: "15 submissions show 95%+ similarity - flag for review"

**A/B testing at scale**
- What: Randomized feedback type experiments
- Why: Research on what feedback works best
- Example: "Group A: corrective feedback. Group B: explanatory. Measure post-test performance difference."

### Design Principles

**Scalability**:
- Efficient algorithms (O(n log n) acceptable, O(n²) impossible)
- Parallel processing
- Incremental computation

**Validity**:
- Psychometric analysis standard
- Regular item review
- Bias auditing

**Automation completeness**:
- No "instructor will review" options
- Graceful degradation for edge cases
- Clear rubrics for automated application

**Research integration**:
- Data collection infrastructure
- Experiment framework
- Ethics review for studies

**Automation level**: 100% - human-scale intervention impossible

**Framework implications**: MOOC scale requires fully automated misconception detection—pattern matching only, no human diagnosis. QLCs framework designed explicitly for MOOC scale (Lehtinen et al. 2023 validated on thousands). Threshold state detection limited to automated pattern recognition (liminal state indicators like prediction inconsistency). Taxonomy level diagnosis through Item Response Theory calibration. Notional machine assessment via automated visualization—no instructor-led model building. Psychometric validation (IRT, DIF) essential at this scale for fairness.

---

## 4. Professional/IDE Integration

**Context**: Professional developers, real workflows, production code

**Scale**: Individual to team

**Unique characteristics**: Authentic tools, real consequences, professional standards

### Assessment Characteristics

**Authenticity priority**
- Real debuggers, profilers, linters
- Production codebase complexity
- Professional quality standards

**Just-in-time delivery**
- Feedback during actual work
- No artificial exercises
- Real problems, real stakes

**Team context**
- Code review cultural norms
- Shared standards (style guides)
- Collective quality ownership

### Use Cases

**IDE-integrated linting**
- What: Real-time code quality feedback in professional IDE
- Why: Catches issues before commit
- Example: ESLint, TypeScript errors inline

**Performance profiling**
- What: Execution trace analysis for optimization
- Why: Production performance matters
- Example: Chrome DevTools profiler showing hotspots

**Code review automation**
- What: Automated quality checks in PR workflow
- Why: Scale code review, enforce standards
- Example: GitHub Actions running QLCs analysis, posting review comments

**Production debugging**
- What: Trace analysis of production errors
- Why: Fix real bugs affecting users
- Example: Sentry error tracking with execution context

**Team quality metrics**
- What: Aggregate QLCs across team's codebase
- Why: Track technical debt, prioritize refactoring
- Example: "Team naming quality: B+, complexity increasing → Schedule refactoring sprint"

**Onboarding quality feedback**
- What: New team member code reviewed with educational feedback
- Why: Learn team standards through practice
- Example: "Your solution works, but we prefer `.map()` over manual loops for clarity"

### Design Principles

**Non-intrusiveness**:
- Fit into existing workflow
- Don't slow down productivity
- Configurable verbosity

**Professional standards**:
- Team/company style guides
- Industry best practices
- Production quality bars

**Continuous improvement**:
- Track quality trends
- Identify training needs
- Celebrate improvements

**Automation level**: Variable - linting 100%, code review mixed automated + human

**Framework implications**: Professional context uses QLCs in CI/CD pipelines—automated quality gates before merge. Misconception detection less relevant (professionals have resolved most), but anti-pattern detection valuable (callback hell, promise misuse). Notional machine understanding assumed—tools provide advanced debugging (async stack traces, prototype chain inspection) not educational visualization. Threshold concepts already crossed—assessment focuses on advanced integration. Taxonomy assessment shifted to architectural level (design patterns, system design).

---

## Cross-Scale Patterns

| Assessment Type | Individual | Classroom | MOOC | Professional |
|-----------------|------------|-----------|------|--------------|
| **Automation required** | High | Medium | Total | Medium-High |
| **Human oversight** | None | Yes | Minimal | Team-based |
| **Fairness priority** | Low | High | Critical | Standards-based |
| **Peer interaction** | None | Yes | Limited | Central |
| **Latency tolerance** | Seconds | Seconds-Minutes | Minutes | Milliseconds |
| **Personalization** | Full | Partial | Minimal | Context-specific |

---

## Scaling Principles

**Automation requirements scale with student count**:
- 1 student: Could be manual, but automation enables personalization
- 50 students: Automation saves instructor time
- 5,000 students: Automation only option

**Fairness importance scales with stakes**:
- Self-study: Low stakes, fairness less critical
- Classroom: Grades matter, fairness important
- MOOC: Diverse population, fairness critical

**Latency tolerance varies by context**:
- Real-time coding: Milliseconds-seconds
- Batch grading: Hours acceptable
- Professional debugging: Immediate for critical bugs

**Community affordances by scale**:
- Individual: No peers
- Classroom: Rich peer interaction
- MOOC: Limited (forums, peer review)
- Professional: Team collaboration

---

## Summary

**Individual**: Full automation, personalization, motivation support
**Classroom**: Partial automation, instructor oversight, peer learning
**MOOC**: Total automation, fairness-critical, research-enabled
**Professional**: Authentic tools, production context, team standards

**Universal principle**: Scale determines automation requirements and fairness priorities.

---

## References

- Lehtinen, T., Alaparthi, S., Mossakowski, J., & Csallner, C. (2023). Questions about learners' code: Towards scalable, automated, and language-agnostic assessment. *Proceedings of SIGCSE 2023*. (QLCs at MOOC scale)
- Ko, A. J., et al. (2021). Assessing algorithmic thinking in CS1 using item response theory. *Proceedings of SIGCSE 2021*. (Psychometric validation)
- Embretson, S. E., & Reise, S. P. (2000). *Item response theory for psychologists*. Lawrence Erlbaum Associates. (IRT fundamentals)
- Zumbo, B. D. (2007). Three generations of differential item functioning (DIF) analyses. *Language Assessment Quarterly*, 4(2), 225-233. (DIF detection)
- Porter, L., Guzdial, M., McDowell, C., & Simon, B. (2013). Success in introductory programming: What works? *Communications of the ACM*, 56(8), 34-36. (Classroom scale effectiveness)
