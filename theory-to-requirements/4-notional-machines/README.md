# Notional Machines

**Phase 1.B**: Domain-specific theories for JavaScript execution

Pedagogical models that make program execution explicit and comprehensible to learners. This section documents 12 JavaScript-specific notional machines—domain models that translate general execution theories into language-specific pedagogical frameworks.

**Target Audience**: Educational tool developers and technical educators implementing JavaScript execution visualization, validation, and assessment tools.

## Quick Start Guide

- **New to notional machines?** → [What Are Notional Machines?](#what-are-notional-machines)
- **Building a debugging/visualization tool?** → [Use Cases](./notional-machines-use-cases.md) + [Tool Scenarios](./nm-tool-scenarios.md)
- **Designing curriculum or lesson plans?** → [Learning Progression](./nm-learning-progression.md) + [Educational Patterns](./nm-educational-patterns.md)
- **Need research citations?** → [Research Foundation](#research-foundation) + [Literature Review](../0-literature-review/notional-machines-literature-review.md)
- **Looking for term definitions?** → [Glossary](./glossary.md)

## Table of Contents

- [What Are Notional Machines?](#what-are-notional-machines)
- [Why This Matters for Educational Tools](#why-this-matters-for-educational-tools)
- [JavaScript Notional Machines](#javascript-notional-machines)
- [Integration with Educational Frameworks](#integration-with-educational-frameworks)
- [Research Foundation](#research-foundation)
- [Directory Organization](#directory-organization)

## What Are Notional Machines?

A **[notional machine](./glossary.md#notional-machine-nm)** (NM) is a simplified, pedagogical model of how a computer executes programs (Sorva 2013). It abstracts away implementation details to make runtime behavior comprehensible.

**Key characteristics:**

- **Simplified but accurate**: Hides complexity without introducing [misconceptions](./glossary.md#misconception)
- **Paradigm-specific**: Object-oriented vs functional vs procedural execution differs
- **Multiple abstraction levels**: Single concept may need multiple models for different learning stages
- **Explicit representations**: Makes implicit execution behavior visible to learners

**Example**: The "[call stack](./glossary.md#lifo-last-in-first-out)" notional machine shows function calls as frames stacked on top of each other ([LIFO](./glossary.md#lifo-last-in-first-out) order), making the abstract concept of execution context concrete and visual.

## Why This Matters for Educational Tools

Research shows that accurate notional machines underpin successful computational thinking (Fincher & Jeuring 2020). Students with incorrect mental models struggle to:

- Debug effectively (they don't know what to look for)
- Predict program behavior (their predictions don't match reality)
- Transfer knowledge (their understanding doesn't generalize)

**The execution trace foundation:**

Educational tools need runtime data to validate and teach notional machines. The relationship:

```
Code execution → Detailed trace events → Tool interpretation → NM visualization/validation → Student mental model
```

Our responsibility: Provide the execution trace data that makes notional machine implementation possible.
Tool responsibility: Interpret that data through pedagogical lenses to build student understanding.

**Tool-theory co-evolution**: Building the tracer required developing these domain-specific models—we couldn't specify what to trace without theories of what matters educationally.

## JavaScript Notional Machines

We've identified **12 core notional machines** for JavaScript education, grounded in established NM research and extrapolated to JS-specific concepts:

### How the 12 Notional Machines Connect

```
Variable Lifecycle (threads through all layers):
┌──────────────────────────┐
│ 1. DECLARE (parse-time)  │────→ Creation/Execution Phase
│         ↓                │
│ 2. INITIALIZE (TDZ→value)│────→ Memory Model
│         ↓                │
│ 3. ASSIGN (expressions)  │────→ Expression Layer
│         ↓                │
│ 4. READ (resolution)     │────→ Scope Chain
│         ↓                │
│ 5. UPDATE (mutation)     │────→ Reference vs. Value
└──────────────────────────┘
         ║
    [Flows through]
         ↓

Foundation Layer (Parse + Basic Runtime + Expression Evaluation):
┌─────────────────────────────────────────────────────────┐
│  Creation/Execution Phase ──→ Memory Model             │
│  (var/let/const declared)     (storage allocated)       │
│         ↓                          ↓                    │
│    Expression Layer:                                    │
│    • Operator Evaluation (precedence, order)           │
│    • Type Coercion (implicit conversions)              │
│    • Reference vs. Value (assignment semantics)        │
│    [Variables assigned values via expressions]         │
│                     ↓                                    │
│              Call Stack Model                           │
│              (local variables per frame)                │
└─────────────────────────────────────────────────────────┘
                    ↓
Execution Layer (Control Flow & Scoping):
┌─────────────────────────────────────────────────────────┐
│  Scope Chain (closures)                                 │
│  [Variables resolved through scope hierarchy]           │
│         ↓                                                │
│  Event Loop (async)                                      │
│  [Variables captured in closures for async callbacks]   │
└─────────────────────────────────────────────────────────┘
                    ↓
OOP Layer:
┌──────────────────────┐
│ Prototype Chain      │
│ [Properties as       │
│  object variables]   │
│         ↓            │
│ This Binding ───┐    │
│ [Context vars]  │    │
│         ↓       │    │
│ Static/Instance │    │
│ [Class vs        │    │
│  instance vars]  │    │
│         ↓       │    │
│ Class Syntax    │    │
│ [Field syntax]  │    │
└──────────────────────┘

Key Relationships:
• Variable Lifecycle → Creation/Execution: Declaration during parse phase (hoisting)
• Variable Lifecycle → Memory: Storage allocation, initialization, TDZ handling
• Variable Lifecycle → Expression Layer: Assignment expressions evaluate right-hand side
• Variable Lifecycle → Scope Chain: Variable resolution through scope hierarchy
• Variable Lifecycle → Reference vs. Value: Mutation semantics (primitives vs objects)
• Creation/Execution → Memory: When/where variables allocated
• Memory → Expression Layer: Values needed for expression evaluation
• Expression Layer → Call Stack: Evaluated expressions become arguments
• Call Stack → Scope Chain: Function calls create scopes (new variable environments)
• Scope Chain + Call Stack → Event Loop: Closure capture (variables persist)
• Memory → Prototype Chain: Object storage and references (object-as-variable storage)
• Prototype Chain → This Binding: Method inheritance
• This Binding → Static/Instance: Context determination
• Static/Instance → Class Syntax: Syntactic sugar over prototypes
```

**Critical Insights**:
- **Variables are fundamental**: The variable lifecycle (declare → initialize → assign → read → update) threads through the entire execution model, connecting parse-time behavior (Creation/Execution Phase), memory management (Memory Model), value semantics (Expression Layer), visibility rules (Scope Chain), and mutation behavior (Reference vs. Value).
- **Expression evaluation is foundational**: Function arguments must be evaluated as expressions first, and return values can be directly operated on without variable capture.

### The 12 Notional Machines (Pedagogical Order)

**Foundation Layer** (Parse + Basic Runtime + Expressions):

1. **[Creation/Execution Phase Model](./javascript-notional-machines/creation-execution-phase-model.md)** - Parse-time vs run-time distinction, [hoisting](./glossary.md#hoisting), [TDZ](./glossary.md#temporal-dead-zone-tdz)
2. **[Memory Model](./javascript-notional-machines/memory-model.md)** - Variable lifecycle, [stack vs heap](./glossary.md#stack-memory), storage locations
3. **[Operator Evaluation Model](./javascript-notional-machines/operator-evaluation-model.md)** - Evaluation order, precedence, short-circuiting
4. **[Type Coercion Model](./javascript-notional-machines/type-coercion-model.md)** - Implicit conversions ([ToPrimitive](./glossary.md#toprimitive), [ToNumber](./glossary.md#tonumber), [ToString](./glossary.md#tostring))
5. **[Reference vs. Value Model](./javascript-notional-machines/reference-value-model.md)** - Assignment semantics, [mutation](./glossary.md#mutation) vs reassignment

**Execution Layer** (Control Flow & Scoping):

6. **[Call Stack Model](./javascript-notional-machines/call-stack-model.md)** - Function execution order and activation records ([LIFO](./glossary.md#lifo-last-in-first-out))
7. **[Scope Chain Model](./javascript-notional-machines/scope-chain-model.md)** - Variable resolution, [closures](./glossary.md#closure), [lexical scope](./glossary.md#lexical-scope)
8. **[Event Loop Model](./javascript-notional-machines/event-loop-model.md)** - Asynchronous execution, [microtasks](./glossary.md#microtask) vs [macrotasks](./glossary.md#macrotask)

**OOP Layer**:

9. **[Prototype Chain Model](./javascript-notional-machines/prototype-chain-model.md)** - Object inheritance, property delegation
10. **[This Binding Model](./javascript-notional-machines/this-binding-model.md)** - Dynamic context binding, four binding rules
11. **[Static vs. Instance Model](./javascript-notional-machines/static-instance-model.md)** - Class-level vs object-level properties/methods
12. **[Class Syntax Model](./javascript-notional-machines/class-syntax-model.md)** - Classes as syntactic sugar over prototypes

**Detailed descriptions**: See [`/javascript-notional-machines/`](./javascript-notional-machines/) for comprehensive documentation of each model.

### Why These 12 Models?

Each notional machine addresses a distinct aspect of JavaScript execution with unique pedagogical challenges:

- **Creation/Execution Phase**: Explains [hoisting](./glossary.md#hoisting) without "code moves" misconception
- **Call Stack + Memory**: Foundation for understanding any imperative language
- **Event Loop**: JavaScript's unique single-threaded concurrency model
- **Scope Chain**: Explains closures (a [threshold concept](./glossary.md#threshold-concept))
- **Prototype Chain**: JavaScript's distinctive inheritance mechanism (delegation, not copying)
- **This Binding**: Dynamic binding (contrasts with lexical scope)
- **Static/Instance + Class Syntax**: Modern OOP patterns and their prototype foundations
- **Operators + Type Coercion**: Expression evaluation and implicit conversions
- **Reference/Value**: Fundamental to understanding shared state and mutation

These 12 cover the mental models students need for JavaScript proficiency, from parsing to execution to object-oriented patterns.

### Research Validation Status

| Notional Machine       | Validation      | Primary Citations                        |
| ---------------------- | --------------- | ---------------------------------------- |
| **Call Stack**         | 🔬 Validated    | Guo 2013, Ben-Ari 2011                   |
| **Memory Model**       | 🔬 Validated    | Guo 2013, Ben-Ari 2011                   |
| **Event Loop**         | 📐 Extrapolated | Applied NM theory to ECMAScript spec     |
| **Scope Chain**        | 📐 Extrapolated | Applied NM theory to lexical scope       |
| **Prototype Chain**    | 📐 Extrapolated | Applied NM theory to delegation          |
| **This Binding**       | 📐 Extrapolated | Applied NM theory to dynamic binding     |
| **Static/Instance**    | 📐 Extrapolated | Applied NM theory to OOP patterns        |
| **Class Syntax**       | 📐 Extrapolated | Applied NM theory to syntactic sugar     |
| **Operator Eval**      | 📐 Extrapolated | Applied NM theory to expression trees    |
| **Type Coercion**      | 📐 Extrapolated | Applied NM theory to conversion rules    |
| **Reference/Value**    | 📐 Extrapolated | Applied NM theory to reference semantics |
| **Creation/Execution** | 📐 Extrapolated | Applied NM theory to parse vs runtime    |

**Legend**: 🔬 = Academically validated in educational research | 📐 = Extrapolated from established NM principles to JavaScript concepts

## Integration with Educational Frameworks

Notional machines connect to all previous educational frameworks:

**Taxonomies** ([SOLO](./glossary.md#solo-taxonomy), [Block Model](./glossary.md#block-model), [BSI](./glossary.md#bsi-framework), Abstraction Transition):

- Different NMs support different cognitive levels
- Progression from concrete (Memory Model) to abstract (Prototype Chain)
- See: [`nm-solo-taxonomy-mapping.md`](./nm-solo-taxonomy-mapping.md), [`nm-block-model-alignment.md`](./nm-block-model-alignment.md), [`nm-bsi-abstraction-levels.md`](./nm-bsi-abstraction-levels.md)

**[Misconceptions](./glossary.md#misconception) Prevention**:

- Each NM addresses specific student misconceptions
- Call Stack prevents "functions run in definition order" errors
- Memory Model prevents "assignment copies objects" confusion
- Creation/Execution prevents "hoisting moves code" misunderstanding
- See: [`nm-misconceptions-prevention.md`](./nm-misconceptions-prevention.md)

**[Threshold Concepts](./glossary.md#threshold-concept) Support**:

- Some NMs ARE threshold concepts (Event Loop, Closures, Prototypes)
- Others help students cross [liminal states](./glossary.md#liminal-state)
- Creation/Execution Phase aids threshold crossing for hoisting
- See: [`nm-threshold-concepts-support.md`](./nm-threshold-concepts-support.md)

**Categorizations for Tool Design**:

- By complexity: [`categorization-by-complexity.md`](./categorization-by-complexity.md) (Beginner/Intermediate/Advanced)
- By paradigm: [`categorization-by-paradigm.md`](./categorization-by-paradigm.md) (Imperative/OOP/Functional/Async/Event-Driven)
- By granularity: [`categorization-by-granularity.md`](./categorization-by-granularity.md) (Micro/Meso/Macro execution levels)

## Research Foundation

**Established NM Theory:**

- **Sorva (2013)**: Defined notional machines, argued they are major challenge in intro programming, recommended making them explicit learning objectives
- **Fincher & Jeuring (2020)**: Accurate NMs underpin computational thinking, multiple abstraction levels commonly used, called for assessment instruments
- **Guo (2013)**: Python Tutor demonstrates automatic visualization improves mental model accuracy (**75M+ visualizations deployed**, measurable improvement in debugging ability)
- **Ben-Ari et al. (2011)**: Jeliot shows automatic animation improves learning outcomes, especially for beginners (faster task completion, fewer errors)

**JavaScript-Specific Gap**:

No academic research specifically addresses JavaScript event loop, closures, prototypes, hoisting, or type coercion as notional machines, despite their widespread coverage in educational materials. This represents a significant gap between practice and research.

**Our Approach**: Apply established NM principles (Sorva, Guo, Ben-Ari) to JavaScript-specific concepts based on:

- ECMAScript specification behavior
- Documented student misconceptions (from educational practice)
- Pedagogical patterns from general programming education research

**Validation Status**: 2 of 12 models directly validated (Call Stack, Memory), 10 extrapolated systematically from established principles. See validation table above for details.

**Full literature review**: See [`/0-literature-review/notional-machines-literature-review.md`](../0-literature-review/notional-machines-literature-review.md) for comprehensive research foundation including methodology for extrapolation.

## Directory Organization

**Phase 2 - Research-Based Synthesis** (this README):

- High-level introduction to notional machines
- All 12 JavaScript NMs overview with rationale
- Research grounding and validation status
- NM relationship diagram

**Phase 2 - Detailed NM Descriptions**:

- [`/javascript-notional-machines/`](./javascript-notional-machines/) - Complete documentation of all **12 JavaScript notional machines**, including the new Creation/Execution Phase Model
- Each NM doc includes: key concepts, common misconceptions, pedagogical value by level, connections to other NMs

**Phase 3 - Integration Documents**:

- **Taxonomy mappings**: [`nm-solo-taxonomy-mapping.md`](./nm-solo-taxonomy-mapping.md) (SOLO levels), [`nm-block-model-alignment.md`](./nm-block-model-alignment.md) (Text/Execution/Function), [`nm-bsi-abstraction-levels.md`](./nm-bsi-abstraction-levels.md) (Behavior/Strategy/Implementation)
- **Chapter correlations**: [`nm-misconceptions-prevention.md`](./nm-misconceptions-prevention.md) (misconception mapping), [`nm-threshold-concepts-support.md`](./nm-threshold-concepts-support.md) (liminal states)
- **Categorization schemes**: [`categorization-by-complexity.md`](./categorization-by-complexity.md) (learning progression), [`categorization-by-paradigm.md`](./categorization-by-paradigm.md) (imperative/OOP/functional/async/event-driven/declarative), [`categorization-by-granularity.md`](./categorization-by-granularity.md) (micro/meso/macro)
- **Code examples**: [`notional-machine-examples.md`](./notional-machine-examples.md) - Annotated examples for each NM

**Phase 4 - Use Cases & Examples** (completed):

- [`notional-machines-use-cases.md`](./notional-machines-use-cases.md) - Comprehensive **4-column use case table** (**100+ use cases** across all 12 NMs) with trace data requirements
- [`nm-educational-patterns.md`](./nm-educational-patterns.md) - **12 pedagogical patterns** (Predict-Observe-Explain, Progressive Disclosure, Contrast Learning, etc.)
- [`nm-learning-progression.md`](./nm-learning-progression.md) - Prerequisites, teaching sequences, pacing (16-27 weeks total)
- [`nm-tool-scenarios.md`](./nm-tool-scenarios.md) - **15 concrete tool scenarios** showing NMs in classroom practice

**Phase 5 - Trace Data Requirements** (completed):

- [`trace-event-catalog.md`](./trace-event-catalog.md) - **Comprehensive event catalog** with detailed object schemas for all education-relevant trace events
- [`trace-data-requirements-by-nm.md`](./trace-data-requirements-by-nm.md) - **Requirements by notional machine**: essential events, config mapping, granularity levels, performance notes
- **4th column in use cases**: "How Trace Data Enables" column added to all use case tables showing specific trace events needed
- **Individual NM docs**: Trace Requirements sections added (see [creation-execution-phase-model.md](./javascript-notional-machines/creation-execution-phase-model.md) for example)

**Supporting Documents**:

- [`glossary.md`](./glossary.md) - Technical term definitions with inline links throughout documentation

---

**Phase 5 Boundary**: This documentation specifies WHAT trace events educational tools need (educational semantics) using JS-correct vocabulary. HOW to generate these events from Aran instrumentation (implementation mapping) belongs to a separate milestone outside this directory's scope.
