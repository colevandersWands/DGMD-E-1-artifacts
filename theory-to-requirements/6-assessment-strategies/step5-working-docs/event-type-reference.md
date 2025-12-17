# Event Type Reference (Phase 1A Working Document)

**Purpose**: Quick reference for mapping assessment use cases to trace events

**Team**: Developer + Researcher created this from trace-event-schemas.md

---

## Event Categories Summary

| Category | Event Types | Overhead | Key Assessment Uses |
|----------|-------------|----------|---------------------|
| **Variables** | declare, assign, read, update, tdz-access | Low-Med | Naming (QLCs), TDZ (hoisting), scope understanding, mutation patterns |
| **Functions** | call, return, throw | Low-Med | Call stack, this binding, recursion, API usage (QLCs), algorithms |
| **Scopes** | create, enter, exit, closure.capture | Low | Scope chain, closures, lexical scoping misconceptions |
| **Control Flow** | conditional.branch, loop.* (4 types) | Med | Algorithms (QLCs), branch coverage, iteration counting, complexity |
| **Async** | await.*, promise.*, microtask.* (6 types) | Med | Event loop misconceptions, async timing, microtask ordering |
| **Objects** | create, property.access, prototype.lookup | Low-Med | Prototype misconceptions, reference vs value, object patterns |
| **Errors** | throw, catch, context | Low | Error handling, debugging, exception flow |
| **Expressions** | binary, unary | **HIGH** | Type coercion detection (key for misconceptions!) |

---

## Critical Event Types for Assessment

### For Misconceptions (Category 3, 5, 9)

**Hoisting/TDZ**:
- `variable.tdz-access` - **THE** hoisting detector (has `inTDZ` flag)
- `variable.declare` - Shows declaration sequence
- **Data**: `inTDZ` boolean, `kind` (let/const/var)

**Type Coercion**:
- `expression.binary` - **KEY** for coercion (has `coercionOccurred` flag)
- **Warning**: HIGH OVERHEAD (~3x slowdown) - use sparingly
- **Data**: `coercionOccurred` boolean, operator, left, right, result

**Closures + Loops**:
- `closure.capture` - Captures variables from scope
- **Data**: `capturedVariables[]`, `capturedScopeId`, `capturedInLoop` boolean
- **Critical**: `capturedInLoop` reveals loop+closure reference bugs

**Prototype Delegation**:
- `prototype.lookup` - Shows prototype chain traversal
- **Data**: `lookupChain[]` (object IDs traversed), `foundAt` (where found)

**Async Event Loop**:
- `microtask.queue` + `microtask.execute` - Event loop ordering
- `await.before` + `await.after` - Async timing
- **Data**: Sequence IDs critical for ordering

**Reference vs Value**:
- `variable.assign` + `variable.update` - Value flow
- **Data**: Object IDs for reference tracking, `value` for primitives

### For QLCs (Category 4 - Quality Assessment)

**Naming Quality**:
- `variable.declare` - provides `variableName` field
- `function.call` - provides `functionName` field
- **Config**: `granularity: { variables: "declarations-only" }` for efficiency

**API Usage**:
- `function.call` - shows which APIs student chooses
- **Config**: `functions: "user-code-only"` vs `"all"` (include/exclude built-ins)
- **Data**: `functionName`, `arguments[]`

**Algorithms**:
- `loop.*` events - iteration vs recursion detection
- `conditional.branch` - decision complexity
- `function.call` (recursive) - recursion detection
- **Config**: `controlFlow: "detailed"` for full algorithm visibility

**Design Patterns**:
- `object.create` - object creation patterns
- `closure.capture` - module pattern, factory pattern
- `function.call` patterns - observer, strategy, etc.
- **Config**: Moderate - enough structure without noise

**Complexity**:
- `conditional.branch` - cyclomatic complexity (decision paths)
- `loop.enter` - nesting depth
- `function.*` boundaries - function length proxy
- **Config**: `controlFlow: "detailed"` + basic function tracking

### For Threshold Concepts (Category 2, 3, 8)

**Closures**:
- `closure.capture` - **THE** closure detector
- `scope.create/enter/exit` - Scope lifetime
- `variable.read` with `resolvedScopeId` - Where variable found
- **Config**: `scopes: "all"`, `variables: "all"`

**Async/Promises**:
- `await.before/after` - Timing
- `promise.create/settle` - Lifecycle
- `microtask.queue/execute` - Event loop understanding
- **Config**: `async: "all"` for comprehensive tracking

**Prototypes**:
- `prototype.lookup` - Delegation chain
- `object.create` - Prototype assignment
- **Config**: `objects: "all"`

**Recursion**:
- `function.call` + `function.return` - Call stack depth
- **Data**: Match `functionId` across call/return for same function
- **Config**: `functions: "all"` (need to see recursive calls)

### For Process Assessment (Category 5)

**NOTE**: Most process assessment is OUTSIDE trace scope (development environment concern)

**One exception - Error patterns**:
- `error.throw` - Error types and frequency
- `error.catch` - Whether students handle errors
- `error.context` - Stack traces
- **Use**: Distinguish systematic debugging from trial-and-error (error→fix cycles)

### For Comprehension (Category 6)

**Prediction Tasks**:
- **Any/all events** - Full trace for comparison to student prediction
- **Config**: Depends on what's being predicted (variables? order? output?)

**Trace Completion**:
- **Comprehensive events** - Student fills missing values
- **Config**: `granularity: all high`

**Minimal Pairs**:
- **Comprehensive events** - Capture behavioral differences
- **Config**: Same as prediction - depends on the difference being tested

---

## Config Patterns by Overhead

### Minimal Overhead (Real-time formative)
```javascript
{
  granularity: {
    variables: "declarations-only",  // Just names
    functions: "user-code-only",     // No built-ins
    scopes: "none",                  // Skip scope detail
    controlFlow: "basic",            // Just loop boundaries
    async: "none",
    objects: "creation-only",
    errors: "throws-only",
    expressions: false               // NEVER for real-time
  }
}
```
**Use**: Live coding quality feedback, QLCs naming/API

### Moderate Overhead (Diagnostic, small scale)
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
    expressions: false  // Still avoid
  }
}
```
**Use**: Threshold state detection, closure understanding, comprehensive diagnostic

### High Overhead (Specific misconception detection only)
```javascript
{
  granularity: {
    // ... moderate settings ...
    expressions: true  // ⚠️ 3x slowdown - use ONLY for coercion detection
  }
}
```
**Use**: Type coercion misconceptions, expression evaluation order

---

## Key Design Decisions from Phase 5

1. **Sequence IDs**: Maintain global ordering across async (critical for event loop pedagogy)
2. **Object IDs**: Track references without modifying objects (WeakMap pattern)
3. **Value Serialization**: Configurable depth (performance vs detail)
4. **TDZ Marking**: Special `inTDZ` flag (not just undefined value)
5. **Coercion Detection**: Explicit `coercionOccurred` boolean (not inferred)
6. **Closure Context**: `capturedInLoop` boolean (specific to common bug pattern)

---

## Common Fields Across All Events

**Every event has**:
- `type`: Event identifier (e.g., "variable.declare")
- `timestamp`: Millisecond timestamp
- `sequenceId`: Global sequence number (async ordering)
- `location`: { line, column, source } (correlate with code)

**Why these matter for assessment**:
- `timestamp`: Performance analysis, timing-based detection
- `sequenceId`: Event loop understanding, async ordering misconceptions
- `location`: Connect trace events to student code for targeted feedback

---

## Performance Notes

**Event overhead ranking** (approximate):
1. Expressions: ~3x slowdown (avoid unless needed)
2. Detailed control flow: ~1.5x slowdown
3. All variables (reads): ~1.2x slowdown
4. Declarations only: ~1.05x slowdown
5. Errors only: <1.05x slowdown

**MOOC Scale Strategies**:
- Sampling: `{ sampling: { rate: 5, strategy: "systematic" } }`
- Event limits: `{ maxEvents: 50000 }`
- Streaming: `{ streaming: true, format: "ndjson" }`

---

## Quick Reference: Event → Assessment Dimension

| Assessment Goal | Critical Events | Config Tip |
|-----------------|----------------|------------|
| Naming quality | `variable.declare`, `function.call` | declarations-only |
| Hoisting misconception | `variable.tdz-access` | variables: all |
| Type coercion | `expression.binary` | expressions: true (costly!) |
| Closure understanding | `closure.capture`, `scope.*` | scopes: all |
| Event loop | `microtask.*`, `await.*` | async: all |
| Algorithm detection | `loop.*`, `conditional.branch` | controlFlow: detailed |
| Prototype delegation | `prototype.lookup` | objects: all |
| Recursion | `function.call/return` patterns | functions: all |
| Error handling | `error.throw/catch` | errors: all |
| API appropriateness | `function.call` | functions: user-code vs all |

---

## Next: Use This Reference

When mapping each assessment use case:
1. **Identify observable pattern** - What in execution reveals this?
2. **Find events** - Which event types capture that pattern?
3. **Check data fields** - Do events have the needed information?
4. **Determine config** - What granularity/filters are needed?
5. **Note performance** - Is overhead justified for this assessment context?
