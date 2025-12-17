# Config Options Reference (Phase 1A Working Document)

**Purpose**: Quick reference for configuring trace granularity/filters for assessment use cases

**Team**: Developer led, Educator + Researcher reviewed

---

## Config Object Structure

```typescript
{
  granularity: { ... },    // WHAT events to generate
  filters: { ... },        // WHICH specific items to include/exclude
  performance: { ... },    // Performance vs detail trade-offs
  serialization: { ... },  // HOW deep to capture values
  output: { ... }          // Format and structure
}
```

---

## 1. Granularity Options (Event Category Control)

### Variables
```typescript
variables: "all" | "declarations-only" | "writes-only" | "none"
```

**"all"**: `declare`, `assign`, `read`, `update`, `tdz-access`
- **Use when**: Need closure tracking, scope understanding, TDZ detection
- **Overhead**: Medium (reads are frequent)

**"declarations-only"**: Just `declare`
- **Use when**: Naming quality assessment (QLCs)
- **Overhead**: Low (one event per variable)

**"writes-only"**: `declare`, `assign`, `update` (NO reads)
- **Use when**: Mutation tracking, initialization patterns
- **Overhead**: Low-Medium

**"none"**: No variable events
- **Use when**: Focus on algorithms/structure, not variable details

### Functions
```typescript
functions: "all" | "user-code-only" | "none"
```

**"all"**: Includes built-in functions (Array.map, etc.)
- **Use when**: API usage assessment (which library functions chosen)
- **Overhead**: Medium-High (many built-in calls)

**"user-code-only"**: Only student-defined functions
- **Use when**: Algorithm detection, recursion, call patterns
- **Overhead**: Low-Medium

**"none"**: No function events
- **Use when**: Variable-focused or control-flow-focused analysis

### Scopes
```typescript
scopes: "all" | "function-only" | "none"
```

**"all"**: `create`, `enter`, `exit`, `closure.capture` for all scope types
- **Use when**: Closure understanding, scope chain visualization, lexical scoping
- **Overhead**: Low-Medium

**"function-only"**: Only function scopes (no blocks)
- **Use when**: Basic scope understanding, skip block detail
- **Overhead**: Low

**"none"**: No scope events
- **Use when**: Focus on values/control flow, not scope

### Control Flow
```typescript
controlFlow: "detailed" | "basic" | "none"
```

**"detailed"**: `conditional.branch`, `loop.enter`, `loop.iterate`, `loop.exit`
- **Use when**: Algorithm detection, complexity assessment, iteration counting
- **Overhead**: Medium (iteration events add up in loops)

**"basic"**: `loop.enter`, `loop.exit` only (NO iteration events)
- **Use when**: Basic algorithm structure, avoid iteration overhead
- **Overhead**: Low

**"none"**: No control flow events
- **Use when**: Variable/function focus only

### Async
```typescript
async: "all" | "await-only" | "none"
```

**"all"**: All promise + microtask events (6 types)
- **Use when**: Event loop understanding, async timing misconceptions
- **Overhead**: Medium

**"await-only"**: Just `await.before`, `await.after`
- **Use when**: Basic async tracking without event loop detail
- **Overhead**: Low

**"none"**: No async events
- **Use when**: Synchronous code only

### Objects
```typescript
objects: "all" | "creation-only" | "none"
```

**"all"**: `create`, `property.access`, `prototype.lookup`
- **Use when**: Prototype understanding, property access patterns
- **Overhead**: Medium (property access is frequent)

**"creation-only"**: Just `object.create`
- **Use when**: Design patterns, object structure (not detailed access)
- **Overhead**: Low

**"none"**: No object events
- **Use when**: Primitive-focused code

### Errors
```typescript
errors: "all" | "throws-only" | "none"
```

**"all"**: `throw`, `catch`, `context`
- **Use when**: Exception handling analysis, debugging
- **Overhead**: Low (errors are infrequent)

**"throws-only"**: Just `throw`
- **Use when**: Error occurrence tracking (not handling)
- **Overhead**: Very low

**"none"**: No error events
- **Use when**: Success-path analysis only

### Expressions
```typescript
expressions: boolean  // Default: false
```

**true**: `expression.binary`, `expression.unary`
- **Use when**: Type coercion detection (CRITICAL for coercion misconceptions)
- **Overhead**: ⚠️ **HIGH** (~3x slowdown) - use sparingly!
- **Key data**: `coercionOccurred` boolean

**false**: No expression events
- **Use when**: Almost always (avoid unless specifically needed)

---

## 2. Filter Options (Fine-Grained Selection)

### Variable Name Filtering
```typescript
filters: {
  variableNames: {
    include: ["sum", "count"],     // Only these
    exclude: ["temp", "_internal"], // Not these
    pattern: /^[a-z][a-zA-Z]*$/    // Match pattern
  }
}
```

**Use when**: Focus on specific variables for debugging exercise

### Function Name Filtering
```typescript
filters: {
  functionNames: {
    include: ["processData", "calculate"],
    exclude: ["describe", "it", "expect"]  // Exclude test framework
  }
}
```

**Use when**: Filter test framework noise, focus on student functions

### Built-in Exclusion
```typescript
filters: {
  excludeBuiltins: true  // Most common filter
}
```

**Use when**: Focus on student code, exclude Array.map/etc.

### Source Location Filtering
```typescript
filters: {
  sourceLocations: {
    lineRange: { start: 10, end: 50 }  // Only lines 10-50
  }
}
```

**Use when**: Trace specific code section (e.g., student's solution, not test setup)

---

## 3. Performance Options (Scale vs Detail)

### Event Limits
```typescript
performance: {
  maxEvents: 50000  // Stop after 50k events
}
```

**Use when**: Large programs, prevent runaway traces

### Sampling
```typescript
performance: {
  sampling: {
    enabled: true,
    rate: 5,  // Sample 1 in 5 events
    strategy: "systematic"  // or "random"
  }
}
```

**Use when**: MOOC scale (thousands of students), approximate analysis acceptable

**Trade-off**: Lose detailed timing, but gain performance

### Streaming
```typescript
performance: {
  streaming: true
}
```

**Use when**: Real-time visualization, large traces
**Impact**: Lower memory footprint, events available immediately

---

## 4. Serialization Options (Value Detail)

### Value Depth
```typescript
serialization: {
  values: "none" | "shallow" | "deep"
}
```

**"none"**: No value serialization (just IDs)
- **Use when**: Structure analysis only, not value contents

**"shallow"**: Top-level value (default)
- **Use when**: Most cases - IDs sufficient for object tracking

**"deep"**: Full object/array contents
- **Use when**: Need actual values for analysis
- **Warning**: High memory for large objects

### Max Depth
```typescript
serialization: {
  maxDepth: 3  // How deep into nested objects
}
```

**Use when**: Deep serialization enabled, control memory

### Circular References
```typescript
serialization: {
  circularRefs: "mark" | "omit" | "registry"
}
```

**"mark"**: Mark as circular, don't serialize
**"omit"**: Skip circular references
**"registry"**: Track all references by ID (most detailed)

**Use when**: Objects with potential circular refs

---

## 5. Output Options (Format)

### Format
```typescript
output: {
  format: "json" | "ndjson" | "binary"
}
```

**"json"**: Standard JSON object
- **Use when**: Small traces, easy parsing

**"ndjson"**: Newline-delimited JSON
- **Use when**: Streaming, large traces, parallel processing

**"binary"**: Compact binary encoding
- **Use when**: Minimize size, fastest (needs decoder)

### Ordering
```typescript
output: {
  ordering: "sequential" | "async-aware"
}
```

**"sequential"**: Events ordered as executed (sync code)
**"async-aware"**: Global ordering using sequence IDs
- **Use when**: Event loop understanding matters

---

## Common Config Patterns by Assessment Type

### Misconception Detection
```javascript
{
  granularity: {
    variables: "all",      // TDZ, scope confusion
    functions: "all",      // this binding
    scopes: "all",         // Scope chain bugs
    controlFlow: "detailed",
    async: "all",          // Event loop
    objects: "all",        // Prototype, reference
    errors: "all",
    expressions: true      // ⚠️ Coercion (expensive!)
  },
  filters: { excludeBuiltins: true },
  serialization: { values: "shallow" }
}
```

### QLCs Quality Assessment
```javascript
{
  granularity: {
    variables: "declarations-only",  // Naming
    functions: "user-code-only",     // API choices
    scopes: "none",
    controlFlow: "detailed",         // Algorithms
    async: "await-only",
    objects: "creation-only",        // Design patterns
    errors: "throws-only",
    expressions: false
  },
  filters: { excludeBuiltins: true },
  serialization: { values: "shallow", maxDepth: 1 }
}
```

### Threshold Concept Tracking
```javascript
{
  granularity: {
    variables: "all",
    functions: "all",
    scopes: "all",         // Closures
    controlFlow: "basic",
    async: "all",          // Async threshold
    objects: "all",        // Prototype threshold
    errors: "all",
    expressions: false
  },
  filters: { excludeBuiltins: true },
  serialization: { values: "shallow", maxDepth: 2 }
}
```

### MOOC Scale Batch Processing
```javascript
{
  granularity: {
    // Minimal for performance
    variables: "declarations-only",
    functions: "user-code-only",
    scopes: "none",
    controlFlow: "basic",
    async: "none",
    objects: "none",
    errors: "throws-only",
    expressions: false
  },
  performance: {
    maxEvents: 5000,
    sampling: { enabled: true, rate: 3, strategy: "systematic" }
  },
  serialization: { values: "shallow", maxDepth: 1 },
  output: { format: "ndjson" }  // Streaming
}
```

---

## Quick Decision Guide

**Question**: What are you assessing?

**Naming quality** → `variables: "declarations-only"`
**Algorithms** → `controlFlow: "detailed"`, `functions: "user-code-only"`
**Closures** → `scopes: "all"`, `variables: "all"` (for reads)
**Event loop** → `async: "all"`, `microtask` events
**Type coercion** → `expressions: true` (expensive!)
**Prototypes** → `objects: "all"`
**API usage** → `functions: "all"` (include built-ins)
**Error handling** → `errors: "all"`

**Question**: What scale?

**Individual/classroom** → Full granularity, no sampling
**MOOC (1000s)** → Minimal granularity, sampling, streaming
**Real-time** → Low granularity, streaming

**Question**: Performance concerns?

**Yes** → Avoid `expressions`, use `"declarations-only"`, basic control flow
**No** → Use comprehensive settings as needed

---

## Performance Impact Reference

| Setting | Impact | When Justified |
|---------|--------|----------------|
| `expressions: true` | 🔴 ~3x slowdown | Type coercion detection ONLY |
| `variables: "all"` (with reads) | 🟡 ~1.2x | Closure, scope understanding |
| `controlFlow: "detailed"` | 🟡 ~1.5x | Algorithm detection |
| `objects: "all"` | 🟡 ~1.3x | Prototype understanding |
| `functions: "all"` (with built-ins) | 🟡 ~1.4x | API usage assessment |
| `declarations-only` | 🟢 ~1.05x | Always (naming quality) |
| `sampling: rate 5` | 🟢 Reduces cost | MOOC scale |

---

## Critical Reminders

1. **`expressions: true` is expensive** - Use ONLY for coercion detection
2. **`excludeBuiltins: true` is common** - Focus on student code
3. **Sampling loses precision** - Acceptable for aggregate stats, not individual debugging
4. **Shallow serialization** is usually sufficient - Object IDs enable tracking
5. **NDJSON for large traces** - Streaming reduces memory
6. **`async: "all"` for event loop** - Must have microtask events

---

## Next: Use This for Mapping

When specifying config for each use case:
1. Start minimal - only events needed
2. Add granularity based on assessment goal
3. Consider scale (classroom vs MOOC)
4. Note performance implications
5. Document rationale for expensive settings (esp. expressions)
