# Trace Data Requirements by Notional Machine

**Purpose**: Document which trace events and data each of the 12 JavaScript notional machines requires, organized by educational purpose.

**Target Audience**: Tool developers implementing visualizations, validators, and assessments for specific notional machines.

**Critical Boundary**: This document specifies educational requirements only. Implementation mapping to instrumentation belongs to separate milestone.

---

## Document Organization

For each notional machine:
1. **Essential Events**: Minimum events needed for basic visualization
2. **Enrichment Events**: Additional events for deeper understanding
3. **Config Mapping**: How existing config categories support this NM
4. **Granularity Levels**: Progressive detail from overview to exhaustive
5. **Performance Notes**: Classroom deployment considerations
6. **Cross-NM Dependencies**: Which other NMs this one depends on

---

## 1. Creation/Execution Phase Model

### Purpose
Explain parse-time vs run-time distinction, hoisting, TDZ, module loading, error timing.

### Essential Events
- `variable-declared` (with `kind`, `isInTDZ`, `isFunctionScoped`)
- `variable-initialized` (marks TDZ end for let/const)
- `function-called` (shows when functions become available)
- `module-loaded` (creation phase for modules)
- `import-resolved` (creation phase import hoisting)

### Enrichment Events
- `exception-thrown` (with `errorType` to distinguish SyntaxError vs ReferenceError vs TypeError)
- `variable-in-tdz-accessed` (explains TDZ errors)
- `scope-entered` (shows when scopes created)

### Config Mapping
```javascript
{
  variables: {
    trace: true,                    // Captures declarations
    includeKind: true,              // Distinguishes var/let/const
    includeTDZ: true                // Tracks temporal dead zone
  },
  functions: {
    trace: true,                    // Hoisted function availability
    includeDeclarations: true
  },
  modules: {
    traceLoading: true              // Module creation phase
  }
}
```

### Granularity Levels
- **Overview**: `variable-declared` with `kind` only
- **Detailed**: + `isInTDZ`, `variable-initialized`
- **Exhaustive**: + `variable-in-tdz-accessed`, error types

### Performance Notes
Minimal overhead - creation phase events are infrequent (once per variable/function).

### Cross-NM Dependencies
- **Memory Model**: Variable declarations allocate memory
- **Scope Chain Model**: Scope setup happens in creation phase
- **Call Stack Model**: Function availability determined in creation phase

---

## 2. Call Stack Model

### Purpose
Show function execution order (LIFO), activation records, recursion mechanics.

### Essential Events
- `function-called` (with `functionName`, `callStack`, `callStackDepth`)
- `function-returned` (with `returnValue`)

### Enrichment Events
- `function-exited-with-exception` (abnormal exit)
- `arguments` field in `function-called` (parameter values)
- `executionTime` in `function-returned` (performance)
- `sourceLocation` (definition vs call site)

### Config Mapping
```javascript
{
  functions: {
    trace: true,
    includeArguments: true,         // Show parameter values
    includeReturnValues: true,
    includeCallStack: true,
    maxStackDepth: 100              // Recursion limit
  }
}
```

### Granularity Levels
- **Overview**: Function names only
- **Detailed**: + arguments, return values
- **Exhaustive**: + execution time, source locations, stack depth

### Performance Notes
High-frequency events in recursive code. Consider `maxStackDepth` config to limit trace size.

### Cross-NM Dependencies
- **Memory Model**: Stack frames contain local variables
- **Scope Chain Model**: Each call creates new scope
- **This Binding Model**: Function calls establish `this` binding

---

## 3. Memory Model

### Purpose
Show variable lifecycle, stack vs heap allocation, reference relationships, garbage collection.

### Essential Events
- `variable-declared` (stack allocation)
- `object-created` (heap allocation)
- `value-assigned` (with `isPrimitive`, `objectId`)
- `reference-copied` vs `value-copied` distinction

### Enrichment Events
- `garbage-collected` (object lifetime)
- `memory-snapshot` (periodic memory state)
- `property-set` (object mutations)

### Config Mapping
```javascript
{
  variables: {
    trace: true,
    trackValues: true,
    trackPrimitives: true
  },
  objects: {
    trace: true,
    trackAllocations: true,
    trackReferences: true,
    includeGC: false                // Optional: GC tracking
  }
}
```

### Granularity Levels
- **Overview**: Variables and objects without values
- **Detailed**: + values, primitive vs reference distinction
- **Exhaustive**: + garbage collection, memory snapshots

### Performance Notes
Object tracking can generate large traces. Use `trackReferences: false` for overview preset.

### Cross-NM Dependencies
- **Creation/Execution Phase**: Allocations happen in phases
- **Call Stack Model**: Stack frames contain local variables
- **Reference vs. Value Model**: Shows copy semantics

---

## 4. Scope Chain Model

### Purpose
Variable resolution, lexical scoping, closure creation, block vs function scopes.

### Essential Events
- `scope-entered` (with `scopeType`, `parentScopeId`)
- `scope-exited` (with `isPersisted`)
- `variable-read` (with `resolvedFromScope`, `scopeChain`)
- `closure-created` (with `capturedVariables`)

### Enrichment Events
- `closure-variable-accessed` (reads/writes to captured variables)
- `variable-declared` (populates scopes)

### Config Mapping
```javascript
{
  scopes: {
    trace: true,
    trackChain: true,               // Full scope chain
    trackClosures: true,
    includeCapturedVariables: true
  },
  variables: {
    trace: true,
    trackReads: true                // Variable resolution
  }
}
```

### Granularity Levels
- **Overview**: Current scope only
- **Detailed**: + parent scope, scope chain
- **Exhaustive**: + captured variables, closure access tracking

### Performance Notes
Closure tracking minimal overhead. Scope chain traversal already happens during execution.

### Cross-NM Dependencies
- **Creation/Execution Phase**: Scopes created in phases
- **Memory Model**: Closures keep scopes alive (prevent GC)
- **Call Stack Model**: Each call creates function scope

---

## 5. Event Loop Model

### Purpose
Asynchronous execution, microtask vs macrotask queues, non-blocking I/O.

### Essential Events
- `promise-created` (with `promiseId`, `state`)
- `promise-resolved` / `promise-rejected`
- `microtask-queued` (with `queueLength`)
- `microtask-executed`
- `macrotask-scheduled` (with `delay`, `taskType`)
- `macrotask-queued`
- `macrotask-executed`

### Enrichment Events
- `callback-queued` (general callback tracking)
- `timestamp` (critical for showing timing)
- `sequenceNumber` (ordering across async boundaries)

### Config Mapping
```javascript
{
  async: {
    tracePromises: true,
    traceTimers: true,
    traceCallbacks: true,
    includeQueueState: true,        // Queue lengths
    includeTimings: true            // Timestamps, delays
  }
}
```

### Granularity Levels
- **Overview**: Promise creation/resolution only
- **Detailed**: + microtask queue, timers
- **Exhaustive**: + queue lengths, precise timing, all callback types

### Performance Notes
High event volume in async-heavy code. Consider sampling for overview preset.

### Cross-NM Dependencies
- **Call Stack Model**: Async callbacks push onto stack
- **Scope Chain Model**: Closures capture scope for async callbacks
- **Memory Model**: Callbacks persist in memory until executed

---

## 6. Prototype Chain Model

### Purpose
Object inheritance via delegation, property lookup, prototype relationships.

### Essential Events
- `prototype-lookup` (with `lookupPath`, `foundAt`)
- `object-created` (with `prototypeId`)
- `prototype-assigned` (with `oldPrototypeId`, `newPrototypeId`)

### Enrichment Events
- `prototype-mutation` (with `affectedObjects`)
- `property-read` (with `foundOnObject` flag)
- `property-set` (distinguishes own vs inherited)

### Config Mapping
```javascript
{
  objects: {
    trace: true,
    trackPrototypes: true,
    trackPrototypeLookup: true,
    trackMutations: true
  },
  properties: {
    trackReads: true,
    trackWrites: true,
    distinguishOwnVsInherited: true
  }
}
```

### Granularity Levels
- **Overview**: Direct prototype only
- **Detailed**: + full lookup path
- **Exhaustive**: + prototype mutations, affected objects

### Performance Notes
Lookup tracking adds overhead to all property access. Use sparingly in tight loops.

### Cross-NM Dependencies
- **Memory Model**: Prototypes are objects in heap
- **This Binding Model**: Method inheritance via prototype
- **Class Syntax Model**: Classes create prototype relationships

---

## 7. This Binding Model

### Purpose
Dynamic `this` binding, four binding rules, execution context.

### Essential Events
- `this-bound` (with `thisValue`, `bindingType`, `bindingRule`)
- `function-called` (provides binding context)

### Enrichment Events
- `this-binding-lost` (common error, suggests fixes)
- `call-site` vs `sourceLocation` (where called vs defined)

### Config Mapping
```javascript
{
  functions: {
    trace: true,
    trackThis: true,                // This binding tracking
    includeBindingType: true,
    suggestFixes: true              // For lost bindings
  }
}
```

### Granularity Levels
- **Overview**: `thisValue` only
- **Detailed**: + `bindingType`, `bindingRule`
- **Exhaustive**: + lost binding detection, suggested fixes

### Performance Notes
Minimal overhead - one event per function call.

### Cross-NM Dependencies
- **Call Stack Model**: This determined at call time
- **Prototype Chain Model**: Methods inherit via prototype
- **Class Syntax Model**: Constructor/method binding

---

## 8. Static vs. Instance Model

### Purpose
Class-level vs object-level properties/methods, static member semantics.

### Essential Events
- `class-defined` (with `staticMembers`, `instanceMembers`)
- `object-created` (distinguishes instance)
- `property-read` / `property-set` (with `isStatic` flag)

### Enrichment Events
- `constructor-called` (instance creation)
- `this-bound` (static: class, instance: object)

### Config Mapping
```javascript
{
  classes: {
    trace: true,
    trackStaticMembers: true,
    trackInstanceMembers: true,
    distinguishStatic: true
  },
  objects: {
    trace: true,
    trackConstructors: true
  }
}
```

### Granularity Levels
- **Overview**: Static vs instance distinction
- **Detailed**: + member lists
- **Exhaustive**: + access tracking, this binding

### Performance Notes
Low overhead - primarily creation-time events.

### Cross-NM Dependencies
- **Class Syntax Model**: Classes define static/instance split
- **This Binding Model**: Different binding for static vs instance
- **Prototype Chain Model**: Instance methods via prototype

---

## 9. Class Syntax Model

### Purpose
Classes as syntactic sugar over prototypes, unique class features (private fields).

### Essential Events
- `class-defined` (with structure)
- `constructor-called` (initialization)
- `super-called` (inheritance)

### Enrichment Events
- `prototype-assigned` (shows underlying prototype)
- `property-set` (private field access)

### Config Mapping
```javascript
{
  classes: {
    trace: true,
    includePrivateFields: true,
    trackInheritance: true,
    showPrototypeEquivalent: false  // Optional: desugar to prototype
  }
}
```

### Granularity Levels
- **Overview**: Class structure only
- **Detailed**: + constructor calls, inheritance
- **Exhaustive**: + prototype equivalent, private field tracking

### Performance Notes
Low overhead - primarily creation-time events.

### Cross-NM Dependencies
- **Prototype Chain Model**: Classes create prototype relationships
- **Static vs. Instance Model**: Classes have both levels
- **This Binding Model**: Constructor binding rules

---

## 10. Operator Evaluation Model

### Purpose
Expression evaluation order, operator precedence, short-circuiting, side effects.

### Essential Events
- `operator-applied` (with `operator`, `operands`, `result`)
- `expression-evaluated` (with `evaluationOrder`)

### Enrichment Events
- `short-circuit-triggered` (logical operators)
- `side-effect-detected` (e.g., ++ in expression)

### Config Mapping
```javascript
{
  expressions: {
    traceOperators: true,
    includeOperands: true,
    includeEvaluationOrder: true,
    trackShortCircuit: true
  }
}
```

### Granularity Levels
- **Overview**: Final result only
- **Detailed**: + operator sequence
- **Exhaustive**: + operand values, short-circuit detection

### Performance Notes
High event volume. Consider filtering to specific expressions for classroom use.

### Cross-NM Dependencies
- **Type Coercion Model**: Operators trigger coercion
- **Reference vs. Value Model**: Affects operand semantics

---

## 11. Type Coercion Model

### Purpose
Implicit type conversion, comparison behavior, truthiness, ToPrimitive/ToNumber/ToString algorithms.

### Essential Events
- `type-coerced` (with `beforeType`, `afterType`, `algorithm`)
- `comparison-evaluated` (with `coercionOccurred`)

### Enrichment Events
- `coercionSteps` (for complex conversions)
- `ToPrimitive` / `ToNumber` / `ToString` sub-steps

### Config Mapping
```javascript
{
  types: {
    traceCoercion: true,
    includeAlgorithmSteps: true,    // ToPrimitive, etc.
    trackComparisons: true,
    distinguishEqVsStrictEq: true
  }
}
```

### Granularity Levels
- **Overview**: Before/after types only
- **Detailed**: + algorithm used
- **Exhaustive**: + algorithm sub-steps

### Performance Notes
Moderate overhead - frequent in loose comparison code.

### Cross-NM Dependencies
- **Operator Evaluation Model**: Operators trigger coercion
- **Prototype Chain Model**: ToPrimitive uses valueOf/toString methods

---

## 12. Reference vs. Value Model

### Purpose
Assignment semantics, mutation vs reassignment, parameter passing, copying strategies.

### Essential Events
- `value-assigned` (with `isPrimitive`, `objectId`)
- `reference-copied` (shared references)
- `function-called` (with `arguments` showing parameter passing)

### Enrichment Events
- `object-mutated` (changes via reference)
- `shared-object-id` (multiple variables → same object)

### Config Mapping
```javascript
{
  variables: {
    trace: true,
    trackValues: true,
    distinguishPrimitiveVsReference: true
  },
  objects: {
    trace: true,
    trackReferences: true,
    trackMutations: true,
    showSharedReferences: true
  }
}
```

### Granularity Levels
- **Overview**: Primitive vs reference flag only
- **Detailed**: + object IDs, shared references
- **Exhaustive**: + mutation tracking, full reference graph

### Performance Notes
Reference tracking adds memory overhead for ID mapping. Moderate event volume.

### Cross-NM Dependencies
- **Memory Model**: Shows where references point
- **Operator Evaluation Model**: Assignment operators
- **Call Stack Model**: Parameter passing semantics

---

## Multi-NM Coordination

Some educational scenarios require coordinating multiple NMs:

### Complete Program Comprehension
**NMs**: All 12
**Requirement**: Single trace with all event types; UI filters by NM; `sequenceNumber` synchronizes views
**Config**: Enable all categories at appropriate granularity

### Async Closure Debugging
**NMs**: Event Loop + Scope Chain + Memory
**Requirement**: Link `callback-queued` → `closure-created` → `captured-variables` → `scope-persisted`
**Config**:
```javascript
{
  async: { tracePromises: true, traceCallbacks: true },
  scopes: { trackClosures: true, includeCapturedVariables: true },
  objects: { trackReferences: true }
}
```

### OOP Pattern Analysis
**NMs**: Prototype Chain + Static/Instance + This Binding + Class Syntax
**Requirement**: Correlate `class-defined`, `object-created`, `prototype-lookup`, `this-bound`
**Config**:
```javascript
{
  classes: { trace: true, trackInheritance: true },
  objects: { trackPrototypes: true },
  functions: { trackThis: true }
}
```

---

## Performance Guidelines for Classroom Deployment

### 20+ Students Running Traces Simultaneously

**Overview Preset** (lightweight):
- Functions: Names only, no arguments/returns
- Variables: Declarations only, no values
- Objects: Creation only, no properties/mutations
- Async: Promise creation/resolution, no queue state
- **Expected overhead**: 10-20%

**Detailed Preset** (balanced):
- Functions: + arguments, returns
- Variables: + values for primitives
- Objects: + property tracking
- Async: + microtask queue
- **Expected overhead**: 30-50%

**Exhaustive Preset** (comprehensive):
- All events enabled
- Full scope chains, prototype paths
- Algorithm sub-steps (coercion, etc.)
- **Expected overhead**: 100-200%
- **Recommendation**: Use for small code snippets only

---

## Next Steps

- Implement event generation from Aran instrumentation (separate milestone)
- Create visualization guidelines showing how to render each event type
- Develop assessment rubrics based on trace analysis patterns

See `/4-notional-machines/trace-event-catalog.md` for detailed event schemas and `/4-notional-machines/notional-machines-use-cases.md` for how trace data enables specific educational use cases.
