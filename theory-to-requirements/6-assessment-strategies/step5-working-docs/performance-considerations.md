# Performance Considerations for Assessment Configs (Phase 1C)

**Purpose**: Analyze performance implications of trace configs mapped to 50 assessment use cases

**Team**: Developer + Educator collaborate

**Why this matters**: Educators need to understand performance trade-offs when choosing assessment approaches. Real-time formative ≠ batch diagnostic in overhead tolerance.

---

## Performance Analysis Methodology

**Developer**: "I'll analyze each config pattern from Phase 1B mappings and calculate overhead."

**Educator**: "And I'll assess whether the overhead is acceptable for the pedagogical context."

### Overhead Calculation Formula

**Base overhead**: Minimal instrumentation (~5% slowdown for bare-bones tracing)

**Additive overhead per granularity setting**:
- Variables `"all"` (with reads): +15%
- Variables `"declarations-only"`: +5%
- Variables `"writes-only"`: +8%
- Functions `"all"` (with built-ins): +35%
- Functions `"user-code-only"`: +15%
- Scopes `"all"`: +10%
- Scopes `"function-only"`: +5%
- Control flow `"detailed"`: +40%
- Control flow `"basic"`: +10%
- Async `"all"`: +25%
- Async `"await-only"`: +10%
- Objects `"all"`: +25%
- Objects `"creation-only"`: +8%
- Errors `"all"`: +3% (infrequent)
- Errors `"throws-only"`: +1%
- Expressions `true`: **+200%** (3x total slowdown)

**Note**: These are approximate, additive estimates. Actual overhead depends on code characteristics (loop-heavy code = higher control flow overhead, etc.).

---

## Config Pattern Analysis

### Pattern 1: Comprehensive Misconception Detection

**Used in**: Category 1 (Formative), Category 3 (Diagnostic), Category 8 (Adaptive)

```javascript
{
  granularity: {
    variables: "all",           // +15%
    functions: "all",           // +35%
    scopes: "all",              // +10%
    controlFlow: "detailed",    // +40%
    async: "all",               // +25%
    objects: "all",             // +25%
    errors: "all",              // +3%
    expressions: true           // +200%
  }
}
```

**Overhead calculation**: 5% + 15% + 35% + 10% + 40% + 25% + 25% + 3% + 200% = **~358%** (4.58x slowdown)

**Developer**: "This is expensive. Expression events dominate the overhead."

**Educator**: "But it's necessary for type coercion detection - a documented misconception. Can we optimize?"

**Optimization**: Turn off `expressions` unless specifically targeting coercion:

```javascript
{
  // Same as above but...
  expressions: false  // Drops to ~158% (2.58x slowdown)
}
```

**Revised overhead**: 5% + 15% + 35% + 10% + 40% + 25% + 25% + 3% = **~158%** (2.58x slowdown)

**Educator**: "2.6x is acceptable for diagnostic assessment (offline batch processing). But formative needs real-time responsiveness. Can students tolerate 2.6x delay?"

**Developer**: "Depends on exercise size. For snippets (<50 LOC), 2.6x of 50ms = 130ms (imperceptible). For programs (>500 LOC), 2.6x of 2s = 5.2s (noticeable)."

→ **Recommendation**:
- **Formative (real-time)**: Disable `expressions` unless coercion-focused exercise
- **Diagnostic (batch)**: Enable full config including `expressions` if needed
- **Adaptive (personalized)**: Disable `expressions` for baseline, enable for coercion-targeted scaffolding

---

### Pattern 2: QLCs Quality Assessment (Minimal Overhead)

**Used in**: Category 4 (QLCs) - use cases 4.1-4.6

```javascript
{
  granularity: {
    variables: "declarations-only",  // +5%
    functions: "user-code-only",     // +15%
    scopes: "none",                  // +0%
    controlFlow: "detailed",         // +40%
    async: "await-only",             // +10%
    objects: "creation-only",        // +8%
    errors: "throws-only",           // +1%
    expressions: false               // +0%
  }
}
```

**Overhead calculation**: 5% + 5% + 15% + 0% + 40% + 10% + 8% + 1% + 0% = **~84%** (1.84x slowdown)

**Developer**: "Much better. This is acceptable for real-time quality feedback."

**Educator**: "QLCs are designed for scale - thousands of students, MOOC contexts. 1.8x is good but can we go lower for truly massive scale?"

**Further optimization for MOOC scale**:

```javascript
{
  granularity: {
    variables: "declarations-only",
    functions: "user-code-only",
    scopes: "none",
    controlFlow: "basic",      // Changed: +10% instead of +40%
    async: "none",             // Changed: +0% instead of +10%
    objects: "creation-only",
    errors: "throws-only",
    expressions: false
  },
  performance: {
    sampling: { enabled: true, rate: 3, strategy: "systematic" }  // ~66% reduction
  }
}
```

**Revised overhead**: 5% + 5% + 15% + 0% + 10% + 0% + 8% + 1% + 0% = **~44%** (1.44x slowdown)
**With sampling**: 1.44 × 0.33 = **~15%** (1.15x slowdown)

**Developer**: "Now we're at near-native performance. Sampling trades precision for speed."

**Educator**: "For aggregate QLCs (e.g., 'What % of students use good names?'), sampling is fine. For individual student feedback, we need full fidelity."

→ **Recommendation**:
- **Individual QLCs**: Use Pattern 2 baseline (1.8x) - acceptable for real-time
- **Aggregate QLCs (MOOC)**: Use Pattern 2 + sampling (1.15x) - near-native performance
- **Trade-off**: Sampling acceptable for statistical analysis, not detailed individual feedback

---

### Pattern 3: Threshold Concept Tracking

**Used in**: Category 2 (Summative - use case 2.5), Category 8 (Adaptive - closures, async, prototypes)

```javascript
{
  granularity: {
    variables: "all",            // +15%
    functions: "all",            // +35%
    scopes: "all",               // +10%
    controlFlow: "basic",        // +10%
    async: "all",                // +25%
    objects: "all",              // +25%
    errors: "all",               // +3%
    expressions: false           // +0%
  }
}
```

**Overhead calculation**: 5% + 15% + 35% + 10% + 10% + 25% + 25% + 3% + 0% = **~128%** (2.28x slowdown)

**Educator**: "Threshold concepts are high-stakes assessment - closures, async, prototypes. 2.3x seems acceptable for summative exams."

**Developer**: "Agree. Summative is not real-time - students submit, then we assess. Batch processing tolerates higher overhead."

**Optimization for specific thresholds**:

**Closure-only tracking**:
```javascript
{
  granularity: {
    variables: "all",        // Need reads for closure detection
    functions: "user-code-only",  // +15% instead of +35%
    scopes: "all",
    controlFlow: "basic",
    async: "none",           // +0% instead of +25%
    objects: "none",         // +0% instead of +25%
    errors: "throws-only",   // +1% instead of +3%
    expressions: false
  }
}
```
**Overhead**: 5% + 15% + 15% + 10% + 10% + 0% + 0% + 1% = **~56%** (1.56x slowdown)

**Async-only tracking**:
```javascript
{
  granularity: {
    variables: "writes-only",    // +8% (enough for value flow)
    functions: "user-code-only", // +15%
    scopes: "function-only",     // +5%
    controlFlow: "basic",        // +10%
    async: "all",                // +25%
    objects: "none",             // +0%
    errors: "all",               // +3%
    expressions: false
  }
}
```
**Overhead**: 5% + 8% + 15% + 5% + 10% + 25% + 0% + 3% = **~71%** (1.71x slowdown)

**Educator**: "Focusing on one threshold at a time reduces overhead significantly. Good for targeted summative tasks."

→ **Recommendation**:
- **Multiple thresholds**: Use full config (2.3x) for comprehensive assessment
- **Single threshold**: Use focused config (1.5-1.7x) for targeted exercises

---

### Pattern 4: Algorithm Detection (QLCs 4.3)

**Used in**: Category 4.3 (Algorithm detection)

```javascript
{
  granularity: {
    variables: "declarations-only",  // +5%
    functions: "user-code-only",     // +15%
    scopes: "none",                  // +0%
    controlFlow: "detailed",         // +40%
    async: "none",                   // +0%
    objects: "creation-only",        // +8%
    errors: "throws-only",           // +1%
    expressions: false               // +0%
  }
}
```

**Overhead calculation**: 5% + 5% + 15% + 0% + 40% + 0% + 8% + 1% + 0% = **~74%** (1.74x slowdown)

**Developer**: "Control flow `detailed` adds 40% but it's necessary for algorithm detection - we need iteration counts, branch coverage."

**Educator**: "Algorithm detection is key for QLCs. Students choosing iteration vs recursion, nested loops vs single pass - that's algorithmic thinking."

**Can we optimize further?**

**Basic control flow** (just loop boundaries, no iteration events):
```javascript
{
  // Same as above but...
  controlFlow: "basic"  // +10% instead of +40%
}
```
**Revised overhead**: 5% + 5% + 15% + 0% + 10% + 0% + 8% + 1% + 0% = **~44%** (1.44x slowdown)

**Trade-off**: Lose iteration counts (can't distinguish 10 iterations vs 1000).

**Educator**: "For algorithm *identification* (is this a loop? recursion?), basic is enough. For algorithm *complexity* (how many iterations?), we need detailed."

→ **Recommendation**:
- **Algorithm identification**: Use `controlFlow: "basic"` (1.4x)
- **Algorithm complexity**: Use `controlFlow: "detailed"` (1.7x)
- **Context**: Complexity matters more in summative than formative

---

### Pattern 5: Comprehension Assessment

**Used in**: Category 6 (Comprehension - prediction, trace completion, minimal pairs)

```javascript
{
  granularity: {
    variables: "all",           // +15%
    functions: "all",           // +35%
    scopes: "all",              // +10%
    controlFlow: "detailed",    // +40%
    async: "all",               // +25%
    objects: "all",             // +25%
    errors: "all",              // +3%
    expressions: false          // +0%
  }
}
```

**Overhead calculation**: 5% + 15% + 35% + 10% + 40% + 25% + 25% + 3% + 0% = **~158%** (2.58x slowdown)

**Educator**: "Comprehension assessment is offline - students predict, then we show actual trace. Overhead is fine."

**Developer**: "For trace completion exercises, we need complete traces. Can't skimp on events."

**Optimization for minimal pairs** (comparing two similar code snippets):

**If the difference is known** (e.g., comparing `let` vs `var`):
```javascript
{
  granularity: {
    variables: "all",        // Focus on the difference
    functions: "user-code-only",  // +15% instead of +35%
    scopes: "all",
    controlFlow: "basic",    // +10% instead of +40% (if difference isn't algorithmic)
    async: "none",           // +0% if not async-related
    objects: "none",         // +0% if not object-related
    errors: "all",
    expressions: false
  }
}
```
**Overhead**: 5% + 15% + 15% + 10% + 10% + 0% + 0% + 3% = **~58%** (1.58x slowdown)

**Educator**: "Minimal pairs should highlight *one specific difference*. We can focus events on that dimension."

→ **Recommendation**:
- **Full comprehension**: Use comprehensive config (2.6x)
- **Targeted minimal pairs**: Focus events on difference dimension (1.5-1.8x)
- **Prediction tasks**: Need full trace for comparison - use comprehensive

---

### Pattern 6: Authentic Assessment (Code Review Simulation)

**Used in**: Category 7.4 (Code review assessment)

```javascript
{
  granularity: {
    variables: "all",
    functions: "all",
    scopes: "all",
    controlFlow: "detailed",
    async: "all",
    objects: "all",
    errors: "all",
    expressions: false
  },
  filters: {
    excludeBuiltins: true
  }
}
```

**Overhead calculation**: Same as comprehensive (~158% / 2.58x slowdown)

**Educator**: "Code review is asynchronous - students review at their own pace. Performance isn't critical."

**Developer**: "But if we're reviewing large codebases, trace generation could take minutes. We might want to optimize."

**Optimization**: Use sampling for large programs:
```javascript
{
  // Same granularity but...
  performance: {
    maxEvents: 50000,  // Prevent runaway traces
    sampling: { enabled: true, rate: 5, strategy: "systematic" }
  }
}
```

**Educator**: "For code review, we're looking for patterns, not exhaustive execution. Sampling is acceptable."

→ **Recommendation**:
- **Small programs (<200 LOC)**: Full config (2.6x)
- **Large programs (>500 LOC)**: Use sampling or event limits to prevent excessive trace sizes

---

## Performance by Context Matrix

| Assessment Context | Config Pattern | Overhead | Acceptable? | Rationale |
|--------------------|---------------|----------|-------------|-----------|
| **Real-time formative** | QLCs minimal | 1.8x | ✅ Yes | Sub-second feedback needed |
| **Real-time formative (coercion)** | Comprehensive + expressions | 4.6x | ⚠️ Maybe | Only for targeted exercises |
| **Batch diagnostic** | Comprehensive | 2.6x | ✅ Yes | Offline processing tolerates overhead |
| **Batch diagnostic (coercion)** | Comprehensive + expressions | 4.6x | ✅ Yes | Offline + high pedagogical value |
| **MOOC scale** | QLCs + sampling | 1.15x | ✅ Yes | Near-native performance, aggregate stats |
| **Summative exam** | Threshold-focused | 2.3x | ✅ Yes | One-time assessment, comprehensive needed |
| **Comprehension (offline)** | Comprehensive | 2.6x | ✅ Yes | Student works at own pace |
| **Authentic (small programs)** | Comprehensive | 2.6x | ✅ Yes | Async review, performance not critical |
| **Authentic (large programs)** | Comprehensive + sampling | 1.5x | ✅ Yes | Sampling acceptable for review |
| **Adaptive (baseline)** | Comprehensive | 2.6x | ✅ Yes | Offline profiling, then real-time delivery |

**Key Insight**: Context determines acceptable overhead. Real-time formative needs <2x, batch processing tolerates >4x.

---

## Overhead Mitigation Strategies

### Strategy 1: Lazy Evaluation

**Developer**: "Don't generate all events upfront. Generate on-demand as tools request analysis."

**Implementation**: Stream events, let tools filter early.

```javascript
{
  performance: {
    streaming: true,  // Events available immediately, don't wait for full trace
  },
  output: {
    format: "ndjson"  // Newline-delimited JSON for streaming
  }
}
```

**Benefit**: Reduces memory overhead, enables early filtering.

### Strategy 2: Event Limits

**Developer**: "Set hard limits to prevent runaway traces in student code with infinite loops."

```javascript
{
  performance: {
    maxEvents: 50000  // Stop after 50k events
  }
}
```

**Educator**: "This also protects assessment platforms from malicious or buggy student code."

### Strategy 3: Granularity Profiles

**Developer**: "Predefine common configs so educators don't need to understand internals."

**Example profiles**:
- `"minimal"`: QLCs config (1.8x)
- `"standard"`: Comprehensive without expressions (2.6x)
- `"comprehensive"`: Everything including expressions (4.6x)
- `"mooc"`: Minimal + sampling (1.15x)

**Educator**: "Profiles abstract complexity. Educators choose pedagogical goal, not technical settings."

→ **Note**: This is FUTURE WORK (user-identified requirement), not Step 5 deliverable.

### Strategy 4: Conditional Expression Events

**Developer**: "Only enable expressions for code sections likely to have coercion."

```javascript
{
  granularity: {
    expressions: true  // High overhead
  },
  filters: {
    sourceLocations: {
      lineRange: { start: 10, end: 20 }  // Only lines 10-20
    }
  }
}
```

**Educator**: "If we know which function has coercion issues (from prior diagnostic), focus expressions there."

---

## Performance Testing Recommendations

**Developer**: "We should empirically test these overhead estimates on real student code."

**Test suite design**:
1. **Micro-benchmarks**: Isolate each granularity setting
   - Variable-heavy code (many declares/reads)
   - Function-heavy code (deep call stack)
   - Loop-heavy code (nested iterations)
   - Expression-heavy code (complex arithmetic)

2. **Macro-benchmarks**: Real student submissions
   - CS1 exercises (small, ~50 LOC)
   - CS2 exercises (medium, ~200 LOC)
   - Project code (large, ~1000 LOC)

3. **Profiling**: Identify bottlenecks
   - Which advice functions are slowest?
   - Which events dominate overhead?
   - Memory consumption vs execution time trade-offs

**Educator**: "Empirical data will help us give concrete guidance: 'For formative assessment, expect X ms delay on typical CS1 exercises.'"

→ **Action**: Document performance testing plan for embody implementation phase (after Step 5).

---

## 3-Persona Team Discussion: Performance Trade-Offs

**Developer**: "The data shows expressions are the killer. 200% overhead for one feature."

**Educator**: "But type coercion is *the* misconception in JavaScript. Students struggle with `==` vs `===`, truthy/falsy, implicit conversion. We can't ignore it."

**Researcher**: "The literature supports this. Qian & Lehman 2017 found coercion is among the top misconceptions. The pedagogical value justifies the cost *in targeted contexts*."

**Developer**: "So the strategy is: default OFF, enable ON for coercion-focused exercises."

**Educator**: "Exactly. And communicate this to tool developers: 'Expression events are expensive. Use them wisely.'"

**Researcher**: "This is why neutral infrastructure matters. Tools decide when to pay the cost. Embody just provides the capability."

**Developer**: "The other insight: sampling is powerful for scale. MOOC contexts can't tolerate 2.6x across thousands of students. But 1.15x with sampling? Feasible."

**Educator**: "Sampling has pedagogical limits though. You can't give individualized feedback from sampled traces. It's for aggregate statistics only."

**Researcher**: "That's a clear boundary: sampling for summative/aggregate QLCs, full fidelity for formative/individual feedback."

→ **Team consensus**: Performance is not a blocker. Context-appropriate configs enable all 50 use cases with acceptable overhead. Expression events require careful use; sampling enables scale.

---

## Summary: Performance Recommendations

### By Assessment Type

| Assessment Type | Recommended Config | Expected Overhead | Notes |
|-----------------|-------------------|-------------------|-------|
| Formative (real-time) | QLCs minimal | 1.8x | Responsive feedback |
| Formative (coercion) | Comprehensive + expressions | 4.6x | Only for targeted exercises |
| Summative (comprehensive) | Comprehensive | 2.6x | Offline acceptable |
| Summative (threshold) | Threshold-focused | 1.5-2.3x | Focus on specific concept |
| Diagnostic | Comprehensive | 2.6x | Batch processing |
| QLCs (individual) | QLCs minimal | 1.8x | Real-time quality feedback |
| QLCs (aggregate/MOOC) | QLCs + sampling | 1.15x | Near-native, statistical analysis |
| Comprehension | Comprehensive | 2.6x | Offline, student-paced |
| Authentic | Comprehensive | 2.6x | Async review |
| Adaptive (profiling) | Comprehensive | 2.6x | Offline profiling for personalization |

### Key Principles

1. **Real-time requires <2x overhead** - QLCs minimal config or threshold-focused
2. **Batch tolerates >4x overhead** - Enable expressions if pedagogically justified
3. **Scale requires sampling** - MOOC contexts use sampling for aggregate stats
4. **Focus pays off** - Targeting specific thresholds reduces overhead 30-50%
5. **Expression events are expensive** - Default OFF, enable selectively

### Critical Warnings for Tool Developers

⚠️ **Expressions**: 3x slowdown - only enable for coercion detection
⚠️ **Functions "all"**: Includes built-ins - high overhead, exclude unless assessing API usage
⚠️ **Sampling**: Acceptable for aggregate stats, NOT for individual feedback
⚠️ **Event limits**: Protect against infinite loops in student code

---

## Next: Phase 1 Summary and Team Review

Consolidate Phase 1 findings (event mapping, gap analysis, coverage matrix, performance) and conduct 3-persona review before proceeding to Phase 2.
