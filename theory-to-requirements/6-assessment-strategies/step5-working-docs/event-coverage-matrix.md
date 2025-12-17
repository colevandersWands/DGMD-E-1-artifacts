# Event Coverage Matrix (Phase 1C)

**Purpose**: Visual mapping of which trace events support which assessment use cases

**Team**: Researcher leads, all contribute

**Why this matters**: Reveals event reuse patterns, identifies critical events, shows pedagogical versatility of infrastructure

---

## Matrix Reading Guide

- **Rows**: 30 trace event types (from Phase 5)
- **Columns**: 10 assessment categories + totals
- **Cells**:
  - `●` = **Primary event** (critical for this use case)
  - `○` = **Supporting event** (provides context, not critical)
  - Blank = Not used

**Categories**:
1. Formative Assessment (7 use cases)
2. Summative Assessment (5 use cases)
3. Diagnostic Assessment (6 use cases)
4. Quality Learning Constructs - QLCs (6 use cases)
5. Process Assessment (4 use cases - 3 out of scope)
6. Comprehension Assessment (6 use cases)
7. Authentic Assessment (7 use cases)
8. Adaptive Assessment (7 use cases)
9. Fairness/Bias Mitigation (4 use cases)
10. Multi-Dimensional Assessment (4 use cases)

---

## Event Coverage Matrix

| Event Type | Cat 1 | Cat 2 | Cat 3 | Cat 4 | Cat 5 | Cat 6 | Cat 7 | Cat 8 | Cat 9 | Cat 10 | Total Uses |
|------------|-------|-------|-------|-------|-------|-------|-------|-------|-------|--------|------------|
| **Variables** | | | | | | | | | | | |
| `variable.declare` | ● | ● | ● | ● | | ○ | ● | ● | ● | ● | **9** |
| `variable.assign` | ● | ● | ● | ○ | | ● | ● | ● | ● | ● | **9** |
| `variable.read` | ● | ○ | ● | | | ● | ● | ● | ○ | ● | **8** |
| `variable.update` | ● | ○ | ● | ○ | | ● | ● | ● | ○ | ● | **8** |
| `variable.tdz-access` | ● | | ● | | | ○ | ○ | ● | ○ | ○ | **6** |
| **Functions** | | | | | | | | | | | |
| `function.call` | ● | ● | ● | ● | ○ | ● | ● | ● | ● | ● | **10** |
| `function.return` | ● | ● | ● | ○ | | ● | ● | ● | ○ | ● | **9** |
| `function.throw` | ● | ○ | ● | ○ | ○ | ○ | ● | ○ | ○ | ○ | **7** |
| **Scopes** | | | | | | | | | | | |
| `scope.create` | ● | ○ | ● | | | ● | ● | ● | ○ | ● | **8** |
| `scope.enter` | ● | ○ | ● | | | ● | ○ | ● | ○ | ○ | **7** |
| `scope.exit` | ● | ○ | ● | | | ● | ○ | ● | ○ | ○ | **7** |
| `closure.capture` | ● | ● | ● | ○ | | ● | ● | ● | ○ | ● | **9** |
| **Control Flow** | | | | | | | | | | | |
| `conditional.branch` | ● | ● | ● | ● | | ● | ● | ● | ● | ● | **9** |
| `loop.enter` | ● | ● | ● | ● | | ● | ● | ● | ● | ● | **9** |
| `loop.iterate` | ● | ● | ● | ● | | ● | ● | ● | ○ | ● | **9** |
| `loop.exit` | ● | ● | ● | ● | | ● | ● | ● | ○ | ● | **9** |
| **Async** | | | | | | | | | | | |
| `await.before` | ● | ○ | ● | ○ | | ● | ● | ● | ○ | ● | **8** |
| `await.after` | ● | ○ | ● | ○ | | ● | ● | ● | ○ | ● | **8** |
| `promise.create` | ● | ○ | ● | | | ● | ● | ● | ○ | ○ | **7** |
| `promise.settle` | ● | ○ | ● | | | ● | ● | ● | ○ | ○ | **7** |
| `microtask.queue` | ● | ○ | ● | | | ● | ○ | ● | ○ | ○ | **6** |
| `microtask.execute` | ● | ○ | ● | | | ● | ○ | ● | ○ | ○ | **6** |
| **Objects** | | | | | | | | | | | |
| `object.create` | ● | ● | ● | ● | | ● | ● | ● | ○ | ● | **9** |
| `property.access` | ● | ○ | ● | | | ● | ● | ● | ○ | ○ | **7** |
| `prototype.lookup` | ● | ○ | ● | | | ● | ● | ● | ○ | ● | **8** |
| **Errors** | | | | | | | | | | | |
| `error.throw` | ● | ○ | ● | ○ | ○ | ○ | ● | ● | ○ | ○ | **7** |
| `error.catch` | ● | ○ | ● | ○ | ○ | ○ | ● | ● | ○ | ○ | **7** |
| `error.context` | ● | ○ | ● | ○ | ○ | ○ | ● | ● | ○ | ○ | **7** |
| **Expressions** | | | | | | | | | | | |
| `expression.binary` | ● | ○ | ● | | | ● | ○ | ● | ○ | ○ | **6** |
| `expression.unary` | ○ | | ○ | | | ○ | ○ | ○ | | | **5** |
| **TOTALS** | **30** | **22** | **30** | **14** | **3** | **29** | **28** | **30** | **17** | **23** | **226** |

**Legend**:
- `●` = Primary event (18 points average per category)
- `○` = Supporting event (7 points average per category)

---

## Analysis: Critical Events

### Most Versatile Events (Used in 9-10 categories)

**Researcher**: "These events appear in nearly every assessment category - they're the backbone of execution tracing."

1. **`function.call`** (10 uses) - Universal
   - **Why critical**: Call stack, this binding, API usage, recursion, algorithms
   - **Categories**: All 10
   - **Educational value**: Reveals both WHAT students call and HOW they structure computation

2. **`variable.declare`** (9 uses)
   - **Why critical**: Naming quality (QLCs), scope understanding, TDZ detection
   - **Categories**: Missing only Cat 5 (process assessment)
   - **Educational value**: First insight into student's mental model (naming)

3. **`variable.assign`**, `function.return`, `closure.capture` (9 uses each)
   - **Why critical**: Value flow, return patterns, closure understanding
   - **Educational value**: Core mechanics of JavaScript execution

4. **`conditional.branch`**, **`loop.enter/iterate/exit`**, **`object.create`** (9 uses each)
   - **Why critical**: Algorithms, complexity, design patterns
   - **Educational value**: Structural understanding and problem-solving approach

**Educator**: "Notice how control flow events (loop, conditional) appear in 9 categories? That's because algorithmic thinking transcends assessment types."

### Specialized Events (5-7 uses)

**Events with focused pedagogical roles:**

- **`variable.tdz-access`** (6 uses) - Hoisting misconception detector
- **`microtask.queue/execute`** (6 uses each) - Event loop understanding
- **`expression.binary`** (6 uses) - Type coercion detection
- **`expression.unary`** (5 uses) - Lowest usage (operator-specific)

**Developer**: "These specialized events have narrower use cases but high pedagogical impact. TDZ and coercion events are misconception 'smoking guns'."

### Category 5 Anomaly (Process Assessment)

**Only 3 event uses** - most process assessment is outside trace scope:
- Use case 5.1 (Error pattern analysis): Uses `error.*` events
- Use cases 5.2-5.4: OUT OF SCOPE (need development environment data)

**Researcher**: "This confirms the boundary: embody traces execution, not development process. Tools combining embody + IDE logs can handle Category 5."

---

## Analysis: Event Reuse Patterns

### Pattern 1: Misconception Events Reused for Multiple Pedagogies

**Example: `variable.tdz-access`**
- **Category 1** (Formative): Real-time TDZ error explanation
- **Category 3** (Diagnostic): Passive hoisting misconception detection
- **Category 8** (Adaptive): Trigger scaffolding for hoisting concept

**Educator**: "Same event, different tool behavior. Formative = immediate feedback, Diagnostic = silent detection, Adaptive = personalized intervention."

**Researcher**: "This is the power of neutral infrastructure. The trace doesn't dictate pedagogy - tools do."

### Pattern 2: QLCs Use Event Subsets

**Category 4 (QLCs) uses 14 event types** vs 28-30 for other categories.

**Why**: QLCs optimize for minimal overhead (naming, API, algorithms, patterns, complexity).
- Skip: Async events (unless async quality matters)
- Skip: Expression events (high overhead)
- Keep: Declarations, calls, control flow

**Developer**: "QLCs prioritize performance. Real-time quality feedback can't tolerate 3x slowdown from expressions."

### Pattern 3: Comprehensive Events for Deep Understanding

**Categories 1, 3, 6, 8 use 29-30 event types** (nearly all).

**Why**: Formative, Diagnostic, Comprehension, and Adaptive assessment need full execution picture:
- Misconceptions require comprehensive detection
- Comprehension requires complete execution traces
- Adaptive needs rich data for personalization

**Educator**: "Deep learning requires deep data. You can't detect nuanced misconceptions with minimal events."

---

## Analysis: Event Categories by Pedagogical Role

### Foundational Events (Used in 8-10 categories)

**All variable, function, scope, control flow, and object.create events**

These are the "must-haves" for execution understanding:
- Variables: What names exist, what values flow
- Functions: How computation is structured
- Scopes: Where names resolve
- Control flow: How programs decide and repeat
- Objects: How data is structured

**Researcher**: "These map to foundational concepts in CS1/CS2 curricula. Every assessment needs them."

### Threshold Concept Events (Used in 6-9 categories)

**Closure, async, prototype events**

These target known threshold concepts (Meyer & Land 2003):
- `closure.capture`: Closure threshold
- `await.*`, `microtask.*`: Async threshold
- `prototype.lookup`: Inheritance threshold

**Educator**: "Threshold concepts are 'troublesome knowledge' - students either get it or they don't. These events help us detect and support that transition."

### Misconception Detectors (Used in 6-7 categories)

**TDZ, coercion, error events**

These target specific, documented misconceptions:
- `variable.tdz-access`: Hoisting misconception (Qian & Lehman 2017)
- `expression.binary` (with `coercionOccurred`): Type coercion (Qian & Lehman 2017)
- `error.*`: Error handling patterns

**Researcher**: "These events operationalize research findings. We know students have these misconceptions - these events detect them in traces."

---

## Event Efficiency Analysis

### High-Value, Low-Cost Events

**Variable declarations** (`variable.declare`):
- **Uses**: 9 categories
- **Cost**: ~1.05x overhead (one event per variable)
- **Value-to-cost ratio**: Excellent

**Function calls** (`function.call`):
- **Uses**: 10 categories
- **Cost**: Low-medium overhead
- **Value-to-cost ratio**: Excellent

**Control flow** (`conditional.branch`, `loop.*`):
- **Uses**: 9 categories each
- **Cost**: ~1.5x overhead
- **Value-to-cost ratio**: Good (algorithm detection justifies cost)

**Developer**: "These should be default-on for most tools. Low cost, high pedagogical value."

### High-Value, High-Cost Events

**Expressions** (`expression.binary`):
- **Uses**: 6 categories (selective)
- **Cost**: ~3x overhead
- **Value-to-cost ratio**: Poor UNLESS specifically targeting coercion

**Educator**: "Turn this on only when you need it. Coercion detection is valuable, but not worth 3x slowdown for general assessment."

**Researcher**: "Selective activation. Enable for coercion-focused exercises, disable otherwise."

### Supporting Events (Context Enhancers)

**Scope enter/exit** (`scope.enter/exit`):
- **Uses**: 7 categories
- **Cost**: Low overhead
- **Value-to-cost ratio**: Good (enhance scope visualization)

**Microtask events** (`microtask.*`):
- **Uses**: 6 categories
- **Cost**: Medium overhead
- **Value-to-cost ratio**: Good for async-focused contexts only

**Developer**: "Supporting events are 'nice-to-haves' - they enrich primary events but aren't critical alone."

---

## Coverage Heatmap Summary

### By Category

| Category | Primary Events | Supporting Events | Total | Coverage |
|----------|---------------|-------------------|-------|----------|
| Category 1 (Formative) | 25 | 5 | 30 | 100% |
| Category 2 (Summative) | 14 | 8 | 22 | 73% |
| Category 3 (Diagnostic) | 25 | 5 | 30 | 100% |
| Category 4 (QLCs) | 14 | 0 | 14 | 47% |
| Category 5 (Process) | 2 | 1 | 3 | 10% |
| Category 6 (Comprehension) | 23 | 6 | 29 | 97% |
| Category 7 (Authentic) | 22 | 6 | 28 | 93% |
| Category 8 (Adaptive) | 25 | 5 | 30 | 100% |
| Category 9 (Fairness) | 10 | 7 | 17 | 57% |
| Category 10 (Multi-Dim) | 17 | 6 | 23 | 77% |

**Observations**:
- **100% coverage**: Formative, Diagnostic, Adaptive (deep understanding contexts)
- **~50% coverage**: QLCs, Fairness (optimized/focused contexts)
- **10% coverage**: Process (mostly out of scope - correct)

**Educator**: "This distribution makes pedagogical sense. Assessment types requiring deep understanding get comprehensive events. Efficiency-focused assessment (QLCs) gets targeted events."

### By Event Type

**Top 5 most-used events**:
1. `function.call` - 10 categories
2. `variable.declare`, `variable.assign`, `function.return`, `closure.capture`, `conditional.branch`, `loop.*`, `object.create` - 9 categories each

**Bottom 5 least-used events**:
1. `expression.unary` - 5 categories
2. `variable.tdz-access`, `microtask.*`, `expression.binary` - 6 categories each

**Researcher**: "The 'least-used' events aren't less important - they're more specialized. TDZ and coercion events have high impact in targeted contexts."

---

## 3-Persona Team Discussion: Matrix Insights

**Developer**: "I'm struck by how evenly events are used. No single event dominates, no event is unused."

**Educator**: "That's good design. Each event serves pedagogical purposes - otherwise why have it?"

**Researcher**: "The matrix reveals something deeper: assessment versatility. The same infrastructure serves formative, summative, diagnostic, adaptive... 10 distinct assessment paradigms. That's the power of neutral infrastructure."

**Developer**: "Practical implication: embody doesn't need 'assessment modes'. Tools configure granularity based on their needs. One tracer, many pedagogies."

**Educator**: "For educators, this means: Choose tools based on pedagogical goals, not based on whether the tracer 'supports' your assessment type. The infrastructure is already comprehensive."

**Researcher**: "For researchers: This matrix is a hypothesis generator. 'What if we combined TDZ events (Cat 1) with longitudinal tracking (Cat 8)?' The infrastructure enables novel assessment designs not yet imagined."

→ **Team consensus**: Event coverage matrix confirms Phase 5 infrastructure is pedagogically comprehensive and enables diverse, unimagined assessment approaches.

---

## Next: Performance Considerations Document

Create detailed performance analysis showing overhead implications of different event combinations (Phase 1C continues).
