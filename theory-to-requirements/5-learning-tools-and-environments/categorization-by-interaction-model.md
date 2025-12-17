# Learning Tools Categorized by Interaction Model

How students interact with learning tools and the pedagogical implications of each interaction model.

## Overview

Learning tools employ different interaction models - from passive observation to active experimentation to conversational tutoring. This categorization organizes tools by interaction style to match learning preferences and pedagogical goals.

## Five Interaction Models

### 1. Passive Visualization (Watch Execution)

**Interaction**: Student observes program execution without control

**Characteristics**:
- Automatic animation of code execution
- No student input during visualization
- Pre-set execution speed
- Demonstration-focused (instructor shows, students watch)

**Primary Tools**:
- Jeliot (automatic animation - Ben-Ari et al. 2011)
- Recorded execution visualizations
- Live coding demonstrations (instructor-controlled)

**Pedagogical Value**:
- Low cognitive load (no decisions required)
- Clear demonstration (everyone sees same thing)
- Lecture-friendly (instructor controls pacing)

**Limitations**:
- No active engagement (passive watching)
- Fixed pacing (may be too fast/slow for individuals)
- No exploration (can't try "what if?")

**Best For**:
- Initial concept introduction (first exposure)
- Whole-class instruction (synchronous)
- Complex concepts (too much to actively explore initially)

**Research**: Ben-Ari et al. (2011) - automatic animation improves learning, especially for beginners

### 2. Interactive Stepping (Control Execution Pace)

**Interaction**: Student controls execution pace (step forward/back, play/pause)

**Characteristics**:
- Student-controlled stepping through execution
- Inspection at each step (variables, stack, etc.)
- Breakpoints (stop at specific locations)
- Replay capability (step backward)

**Primary Tools**:
- Python Tutor (step-by-step mode)
- Traditional debuggers (IDE debuggers)
- Interactive visualization tools

**Pedagogical Value**:
- Active engagement (student controls pace)
- Personalized pacing (pause to think, re-examine)
- Focused inspection (stop at confusing points)
- Discovery learning (explore execution)

**Limitations**:
- More cognitive load (must decide when to step)
- Can get lost (too many steps, lose context)
- Requires more time (student-paced vs automatic)

**Best For**:
- Individual learning (self-paced)
- Debugging practice (controlled exploration)
- Deep understanding (examine execution details)
- After initial demonstration (follow-up to passive visualization)

**Research**: Guo (2013) - Python Tutor stepping model used by 75M+ visualizations

### 3. Prediction-Based (Predict, Observe, Explain)

**Interaction**: Student predicts behavior before observing, then explains discrepancies

**Characteristics**:
- **Predict**: Student writes predicted output/state before execution
- **Observe**: Execute code, observe actual behavior
- **Explain**: Student explains why prediction was wrong (if it was)

**Pedagogical Cycle** (POE):
1. Present code
2. Student predicts what will happen
3. Execute code (visualization or actual)
4. Student observes actual behavior
5. If prediction ≠ actual, student explains discrepancy
6. Resolve misconception or deepen understanding

**Primary Tools**:
- POE-enabled visualizers (prediction mode before execution)
- Comprehension-first platforms (CodeWrite)
- Notional machine validators (prediction testing)

**Pedagogical Value**:
- Externalizes mental models (predictions reveal thinking)
- Exposes misconceptions (wrong predictions → teachable moments)
- Active learning (prediction engages cognitively)
- Self-assessment (students see own understanding gaps)

**Limitations**:
- Requires explicit prediction interface (tool support)
- More time-consuming (predict, observe, explain vs just observe)
- Can be intimidating (fear of wrong prediction)

**Best For**:
- Mental model validation (check understanding)
- Misconception detection and correction
- After basic familiarity (need some understanding to predict)
- Assessment (prediction accuracy indicates understanding)

**Research Context**: While POE is established pedagogy, limited research on POE in programming learning tools specifically

### 4. Query-Driven (Ask Questions About Execution)

**Interaction**: Student asks specific questions about execution, tool answers

**Characteristics**:
- "Why did X happen?" questions
- "Why didn't Y happen?" questions
- Causal explanation focus
- Natural language or structured queries

**Primary Tools**:
- Whyline (Ko & Myers 2008): "Why did/didn't" questions
- Dynamic slicing tools (show what influenced a value)
- AI tutoring (natural language "why" questions)

**Pedagogical Value**:
- Student-driven learning (ask what they're curious about)
- Causal reasoning (tool shows causality)
- Efficient (answer specific confusion, not explain everything)
- Debugging support (trace error causality)

**Example Interactions**:
- **Student**: "Why did `arr1` change when I only modified `arr2`?"
- **Tool**: Highlights `arr2 = arr1` showing reference assignment, explains both variables reference same array

**Limitations**:
- Requires sophisticated tool (understand natural language or provide query UI)
- May not ask right questions (students don't know what to ask)
- Scope limited to tool's query capabilities

**Best For**:
- Debugging (trace bug causality)
- Curiosity-driven learning
- When student has specific confusion
- Advanced students (know what to ask)

**Research**: Ko & Myers (2008) - Whyline "why did/didn't" questions improve debugging

### 5. Conversational (AI Tutoring, Natural Language)

**Interaction**: Back-and-forth conversation with AI tutor

**Characteristics**:
- Natural language questions and explanations
- Multi-turn conversations (follow-up questions)
- Adaptive responses (based on student's questions/code)
- Personalized scaffolding

**Primary Tools**:
- CodeHelp (Liffiton et al. 2023)
- CodeAid (Kazemitabaar et al. 2024)
- ChatGPT/Copilot (general LLMs applied to learning)

**Pedagogical Value**:
- Natural interaction (like asking teacher)
- Personalized explanations (adapted to student confusion)
- Available 24/7 (no waiting for teacher)
- Multiple perspectives (can explain many ways)
- Follow-up support (ask clarifying questions)

**Example Interaction**:
- **Student**: "I don't understand closures"
- **AI**: "Closures happen when an inner function accesses variables from an outer function's scope. Want to see an example?"
- **Student**: "Yes"
- **AI**: [Provides example with explanation]
- **Student**: "Why doesn't the variable disappear when the outer function returns?"
- **AI**: "Great question! The inner function keeps a reference to the outer scope..."

**Limitations**:
- Risk of incorrect information (AI hallucination)
- Uncritical acceptance (Finnie-Ansley et al. 2022)
- May give answers vs scaffold discovery
- Dependence risk (students rely on AI too much)

**Mitigation Strategies**:
- Helpfulness metrics (Liffiton 2023)
- Execution-based validation (verify AI suggestions)
- Scaffolded AI (guide productive struggle, don't just answer)

**Best For**:
- Conceptual questions (why/how questions)
- When teacher unavailable (asynchronous learning)
- Personalized explanation needs
- Follow-up after other learning modes

**Research**: Liffiton et al. (2023) - CodeHelp effectiveness; Kazemitabaar et al. (2024) - CodeAid with scaffolding; Finnie-Ansley et al. (2022) - uncritical acceptance risks

## Interaction Model Comparison

| Model | Cognitive Load | Engagement | Personalization | Tool Complexity | Best For |
|-------|----------------|------------|-----------------|-----------------|----------|
| Passive Visualization | Low | Low | None | Low | Initial demos, lectures |
| Interactive Stepping | Medium | Medium | Self-paced | Medium | Individual exploration |
| Prediction-Based (POE) | High | High | Medium | Medium | Mental model validation |
| Query-Driven | Medium | High | High | High | Debugging, specific questions |
| Conversational | Medium | High | Very High | Very High | Conceptual understanding |

## Multi-Modal Interaction Patterns

### Pattern 1: Passive → Interactive → Prediction

**Progression**:
1. **Passive**: Instructor demonstrates with automatic visualization (whole class)
2. **Interactive**: Students explore same code with stepping (individually)
3. **Prediction**: Students predict variants, check understanding (POE)

**Pedagogical Rationale**: Scaffold from low cognitive load (passive) to high (prediction)

### Pattern 2: Interactive + Query-Driven

**Integration**: Student steps through execution, asks "why" questions when confused
**Example**: Step through code, see unexpected value, ask "Why did X become 5?"
**Tools**: Debugger + Whyline or AI tutor

### Pattern 3: Prediction + Conversational

**Integration**: Student predicts, observes discrepancy, asks AI to explain
**Example**: "I predicted this would return 5, but it returned undefined. Why?"
**Tools**: POE platform + AI tutoring

### Pattern 4: All Five Modes (Comprehensive)

**Learning Sequence**:
1. **Passive** (Week 1): Watch instructor demonstrations
2. **Interactive** (Weeks 2-4): Self-paced stepping and exploration
3. **Prediction** (Weeks 5-8): POE exercises for mental model validation
4. **Query-Driven** (Weeks 9-12): Debug with "why" questions
5. **Conversational** (Throughout): AI support when stuck

## Interaction Model Selection Guidelines

### Choose Passive Visualization When:
- Introducing new concept (first exposure)
- Whole-class instruction (synchronous)
- Complex execution (too much to control initially)
- Cognitive load concerns (simplify for beginners)

### Choose Interactive Stepping When:
- Individual learning (self-paced)
- Students have basic understanding (not first exposure)
- Debugging practice
- Detailed exploration needed

### Choose Prediction-Based (POE) When:
- Mental model assessment desired
- Misconception detection needed
- Active engagement critical
- Students have foundation (can predict meaningfully)

### Choose Query-Driven When:
- Debugging focused
- Student has specific confusion
- Causal reasoning instruction
- Advanced students (know what to ask)

### Choose Conversational When:
- Conceptual questions (why/how)
- Personalized explanation needed
- Teacher unavailable (asynchronous)
- Multiple perspectives valuable

## Research Backing

**Citations**:
- Passive: Ben-Ari et al. (2011) - Jeliot automatic animation
- Interactive: Guo (2013) - Python Tutor stepping model
- Prediction: POE established pedagogy, limited tool research
- Query-driven: Ko & Myers (2008) - Whyline
- Conversational: Liffiton et al. (2023) - CodeHelp, Kazemitabaar et al. (2024) - CodeAid, Finnie-Ansley et al. (2022) - AI acceptance risks

**Synthesis**: This categorization extracts interaction patterns from research and creates interaction model selection framework.

---

**Related Documents**:
- Pedagogical approaches: [`categorization-by-pedagogical-approach.md`](./categorization-by-pedagogical-approach.md)
- Learning objectives: [`categorization-by-learning-objectives.md`](./categorization-by-learning-objectives.md)
