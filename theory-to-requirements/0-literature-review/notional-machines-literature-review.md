# Notional Machines Literature Review

**Phase 1: Academic Literature Foundation**
**Date Started:** 2025-01-29
**Search Strategy:** Language-agnostic, focused depth (10-15 key papers)

---

## Search Methodology

### Databases Searched
- **Google Scholar** - Primary citation chain exploration from Sorva (2013)
- **ACM Digital Library** - "notional machine" + programming education
- **IEEE Xplore** - Program visualization + pedagogy
- **ResearchGate** - Author network exploration

### Search Terms Used
- "notional machine" AND programming
- "mental model" AND "computer science education"
- "program visualization" AND pedagogy
- "runtime comprehension" AND novice
- Python Tutor + educational research
- Jeliot + program visualization

### Date Range
- Primary focus: 2013-2025
- Backward citations: Followed regardless of date for foundational work

---

## Foundational Papers

### Sorva, J. (2013). Notional Machines and Introductory Programming Education

**Publication:** ACM Transactions on Computing Education, Vol. 13, No. 2, Article 8
**DOI:** https://doi.org/10.1145/2483710.2483713
**Citations:** 284+ (as of search date)

**Core Contributions:**
- Synthesized multiple research threads: programming misconceptions, cognitive theory of mental models, constructivist theory, phenomenographic research, threshold concepts
- Defined notional machine as "an abstract computer for executing programs of a particular kind"
- Argued that literature points to notional machines as a major challenge in introductory programming education
- Recommended instructors acknowledge notional machine as an explicit learning objective

**Key Findings:**
- Teaching within some paradigms (e.g., OOP) may benefit from multiple notional machines at different abstraction levels
- Runtime dynamics of programs represent major learning challenge
- Mental model accuracy underpins successful computational thinking

**JavaScript Relevance:** High - addresses runtime dynamics particularly relevant to event-driven/asynchronous execution
**Methodology:** Literature review synthesis
**Empirical Validation:** Review of existing empirical studies

---

### Fincher, S. & Jeuring, J. (2020). Notional Machines in Computing Education: The Education of Attention

**Publication:** ITiCSE 2020 Working Group Reports
**DOI:** https://doi.org/10.1145/3437800.3439202

**Core Contributions:**
- Provided definitional characteristics for identifying notional machines
- Systematic literature review tracking use and development of NM concept
- First-hand report of origin of notional machines
- Collection of examples from experienced teacher interviews
- Preliminary explorations of NM use in practice
- Examples of instructors using multiple NMs in sequence

**Key Findings:**
- Accurate notional machines underpin successful computational thinking performance
- Understanding notional machines is prerequisite for effective computing teaching
- Multiple NMs at different abstraction levels commonly used in practice

**JavaScript Relevance:** Framework applicable across languages
**Methodology:** Systematic literature review + teacher interviews
**Research Gap Noted:** Absence of research instruments for surveying mental models

---

## Empirical Validation Studies

### Guo, P.J. (2013). Online Python Tutor: Embeddable Web-based Program Visualization for CS Education

**Publication:** ACM Technical Symposium on Computer Science Education (SIGCSE)

**Core Contributions:**
- Widely-deployed program visualization tool (75+ million code visualizations, 5+ million users in 180+ countries as of research)
- Visualizes program state including memory layout (stack/heap)
- Supports Python, C/C++, Java

**Key Findings:**
- Program visualizations can help beginners develop viable understanding of notional machine
- Potential to help students avoid and overcome misconceptions about tricky concepts (parameters, constructors, recursion)
- Large-scale deployment demonstrates practical viability

**Implementation Details:**
- Automatic visualization from source code
- Real-time state representation
- Cross-language support

**JavaScript Relevance:** Direct - concepts transferable to JS visualization
**Methodology:** Tool development + deployment analysis
**Data Requirements Demonstrated:** Variable state, call stack, heap structure, execution flow

---

### Ben-Ari, M., Bednarik, R., Ben-Bassat Levy, R., Ebel, G., Moreno, A., Myller, N., & Sutinen, E. (2011). A Decade of Research and Development on Program Animation: The Jeliot Experience

**Publication:** Journal of Visual Languages and Computing
**DOI:** https://www.sciencedirect.com/science/article/abs/pii/S1045926X11000310

**Core Contributions:**
- Long-term research sequence (10+ years) on educational software tool
- Pioneered automatic animation from source code
- Extensive pedagogical research on learning improvements, attention effects, teacher acceptance

**Key Findings:**
- Jeliot improves learning outcomes
- Encourages student attention in class
- Complete, continuous, automatically generated animation reduces effort barrier
- Best results with students new to programming
- Significant percentage of students achieved better results with visualization

**Implementation Details:**
- Automatic animation without teacher/student effort
- Support for objects and classes (Jeliot 3)
- Open-source under GNU GPL
- Standalone or BlueJ plugin

**JavaScript Relevance:** Design principles applicable to JS tools
**Methodology:** Longitudinal empirical studies over decade
**Data Requirements Demonstrated:** Complete execution trace, object state, control flow

---

## Research Gaps Identified

### JavaScript-Specific Notional Machine Research

**Finding:** Searches for JavaScript-specific notional machine research yielded primarily tutorial/blog content, not peer-reviewed academic research.

**Search Evidence:**
- Query: "JavaScript event loop notional machine asynchronous programming education"
- Results: Developer tutorials (GeeksforGeeks, MDN, Medium, Stack Overflow)
- Academic papers: None found specifically addressing JS event loop as notional machine

**Gap Description:**
- Event loop widely taught conceptually but not researched as notional machine
- Async/await mental models not academically studied
- Promise execution mental models not researched
- Closure and lexical scope visualization not academically validated

**Implication:** JavaScript-specific notional machines represent significant research gap despite widespread use of conceptual models in tutorials.

---

### Mental Model Assessment Instruments

**Finding:** Fincher & Jeuring (2020) explicitly noted "absence of development of research instruments for surveying mental models"

**Gap Description:**
- No standardized tools for measuring mental model accuracy
- Limited frameworks for assessing notional machine comprehension
- Insufficient research on impact of learning interventions on mental model construction

**Implication:** Difficulty validating effectiveness of different notional machine approaches

---

### Longitudinal Mental Model Development

**Finding:** Limited research tracking how mental models evolve over time

**Gap Description:**
- Few studies track mental model construction progression
- Limited understanding of threshold crossings in notional machine comprehension
- Insufficient data on long-term retention of accurate mental models

**Implication:** Unknown optimal timing and sequencing of notional machine instruction

---

## Papers Requiring Further Analysis

### Identified but Not Yet Reviewed

1. **"Using Notional Machines to Automatically Assess Students' Comprehension of Their Own Code"** (SIGCSE 2024)
   - Recent work combining NMs with automated assessment
   - Question-learning catalysts approach

2. **"Understanding Notional Machines through Traditional Teaching with Conceptual Contraposition and Program Memory Tracing"**
   - Empirical study on building correct mental models of C/C++ notional machine
   - Method evaluation

3. **"Video Analysis of a Teacher's Use of Notional Machines in an Introductory High School Electronic Textile Unit"** (WiPSCE 2022)
   - Three-tier framework for capturing NMs in practice
   - Real classroom observation

4. **"The state of play: A notional machine for learning programming"**
   - Game-based notional machine approach

5. **Meta-study of 24 experimental studies on Algorithm Visualization (AV) technology**
   - Systematic analysis of effectiveness factors
   - Learning theory analysis

---

## Key Concepts Requiring Definition

### From Literature

**Notional Machine (Sorva 2013):**
"An abstract computer for executing programs of a particular kind" - a set of abstractions defining structure and behavior of a computational device, specific to a programming paradigm.

**Visual Program Simulation (VPS):**
Interactive simulations where learner takes role of computer as executor, using visualization of notional machine to illustrate what happens in memory as computer processes program.

**Program Visualization (PV):**
Tools that automatically visualize program execution state, control flow, and data structures to aid comprehension.

---

## Methodology Patterns Observed

### Common Research Approaches

1. **Tool Development + Deployment Study**
   - Python Tutor, Jeliot models
   - Large-scale usage analysis
   - Student survey/feedback

2. **Controlled Empirical Studies**
   - A/B testing with/without visualization
   - Pre/post testing
   - Performance comparison

3. **Systematic Literature Reviews**
   - Sorva (2013), Fincher & Jeuring (2020)
   - Citation analysis
   - Synthesis of research threads

4. **Teacher/Expert Interviews**
   - Fincher & Jeuring (2020)
   - Practice documentation
   - Multiple NM usage patterns

---

## Next Steps for Deeper Analysis

1. Access full texts of papers identified in citation chains
2. Analyze specific notional machines documented in Fincher & Jeuring (2020)
3. Review Python Tutor and Jeliot effectiveness studies in detail
4. Investigate 2024 SIGCSE paper on automated assessment
5. Document specific NM design principles from empirical studies

---

## Documentation Standards Applied

- All findings tied to specific academic sources
- Search terms and databases documented for reproducibility
- Research gaps noted where literature is silent
- No speculation added to fill gaps
- Conflicting findings to be presented without resolution
- Incomplete coverage acknowledged
