# Trace Event Schemas

**Phase 5 Technical Specification**: Neutral infrastructure event types for `embody(script, config) → trace`

**Critical Boundary**: This document specifies ONLY the data structures embody provides. Educational interpretation, UI rendering, assessment logic, and pedagogical strategies are implemented by tools consuming these events.

---

## Event Structure Common Fields

All events share these base fields:

```typescript
interface BaseEvent {
  type: string;           // Event type identifier (e.g., "variable.declare")
  timestamp: number;       // Millisecond timestamp
  sequenceId: number;      // Global sequence number for async ordering
  location: SourceLocation;  // Where in source code
}

interface SourceLocation {
  line: number;
  column: number;
  source: string;  // Optional: source file identifier
}
```

**Rationale**:
- `sequenceId`: Critical for maintaining event order across async boundaries
- `location`: Enables tools to correlate events with source code
- `timestamp`: Supports performance analysis and timing-based tools

---

## 1. Variable Events

### 1.1 Variable Declaration

```typescript
interface VariableDeclareEvent extends BaseEvent {
  type: "variable.declare";
  scopeId: string;        // Which scope contains this variable
  variableName: string;   // Identifier name
  kind: "let" | "const" | "var";
  inTDZ: boolean;        // True initially for let/const
}
```

**Use Cases Enabled**: Scope chain visualization, hoisting misconception correction, TDZ detection

**Tools Decide**: How to visualize TDZ, what pedagogy to apply, UI representation

### 1.2 Variable Assignment

```typescript
interface VariableAssignEvent extends BaseEvent {
  type: "variable.assign";
  scopeId: string;
  variableName: string;
  value: SerializedValue;  // See Value Serialization section
  isInitialization: boolean;  // True for first assignment
  wasInTDZ: boolean;          // True if exiting TDZ
}
```

**Use Cases Enabled**: Variable lifecycle tracking, initialization detection, value flow analysis

**Tools Decide**: How to display value changes, assessment of initialization patterns

### 1.3 Variable Read

```typescript
interface VariableReadEvent extends BaseEvent {
  type: "variable.read";
  scopeId: string;
  variableName: string;
  value: SerializedValue;
  resolvedScopeId: string;  // Where variable was found (for closure tracking)
}
```

**Use Cases Enabled**: Closure visualization, scope chain lookups, variable usage patterns

**Tools Decide**: How to highlight closures, usage pattern assessment

### 1.4 Variable Update

```typescript
interface VariableUpdateEvent extends BaseEvent {
  type: "variable.update";
  scopeId: string;
  variableName: string;
  oldValue: SerializedValue;
  newValue: SerializedValue;
  operator?: string;  // e.g., "+=", "++"
}
```

**Use Cases Enabled**: Mutation tracking, operator usage analysis

**Tools Decide**: How to show mutations, assessment of update patterns

### 1.5 TDZ Access Error

```typescript
interface TDZAccessEvent extends BaseEvent {
  type: "variable.tdz-access";
  scopeId: string;
  variableName: string;
  kind: "let" | "const";
}
```

**Use Cases Enabled**: Hoisting misconception detection, TDZ error explanation

**Tools Decide**: Pedagogical explanation of TDZ, how to correct misconception

---

## 2. Function Events

### 2.1 Function Call

```typescript
interface FunctionCallEvent extends BaseEvent {
  type: "function.call";
  functionName: string | null;  // Null for anonymous
  functionId: string;            // Unique identifier for function object
  callType: "direct" | "method" | "constructor" | "apply" | "call" | "bind";
  thisValue: SerializedValue | null;  // For this binding tracking
  arguments: SerializedValue[];
  scopeId: string;  // Scope where call occurs
  newScopeId: string;  // New scope created for function execution
}
```

**Use Cases Enabled**: Call stack visualization, this binding tracking, argument evaluation order

**Tools Decide**: How to render call stack, this binding pedagogy, assessment of function usage

### 2.2 Function Return

```typescript
interface FunctionReturnEvent extends BaseEvent {
  type: "function.return";
  functionId: string;
  returnValue: SerializedValue;
  scopeId: string;  // Scope being exited
}
```

**Use Cases Enabled**: Call stack pop visualization, return value tracking

**Tools Decide**: Stack frame rendering, return value display

### 2.3 Function Throw

```typescript
interface FunctionThrowEvent extends BaseEvent {
  type: "function.throw";
  functionId: string;
  error: SerializedValue;
  scopeId: string;
}
```

**Use Cases Enabled**: Error flow visualization, exception handling analysis

**Tools Decide**: Error display strategy, debugging guidance

---

## 3. Scope Events

### 3.1 Scope Creation

```typescript
interface ScopeCreateEvent extends BaseEvent {
  type: "scope.create";
  scopeId: string;
  parentScopeId: string | null;  // Null for global scope
  scopeType: "global" | "function" | "block" | "catch";
  associatedFunction?: string;  // If function scope
}
```

**Use Cases Enabled**: Scope chain visualization, lexical scoping explanation

**Tools Decide**: Hierarchy rendering, scope pedagogy

### 3.2 Scope Enter

```typescript
interface ScopeEnterEvent extends BaseEvent {
  type: "scope.enter";
  scopeId: string;
}
```

**Use Cases Enabled**: Execution flow tracking, scope lifetime visualization

**Tools Decide**: When/how to show scope entry

### 3.3 Scope Exit

```typescript
interface ScopeExitEvent extends BaseEvent {
  type: "scope.exit";
  scopeId: string;
}
```

**Use Cases Enabled**: Scope lifetime visualization, closure persistence detection

**Tools Decide**: Scope disposal rendering, closure pedagogy

### 3.4 Closure Capture

```typescript
interface ClosureCaptureEvent extends BaseEvent {
  type: "closure.capture";
  functionId: string;
  capturedScopeId: string;
  capturedVariables: string[];  // Which variables captured
}
```

**Use Cases Enabled**: Closure visualization, variable capture explanation

**Tools Decide**: Closure rendering strategy, misconception correction pedagogy

---

## 4. Control Flow Events

### 4.1 Conditional Branch

```typescript
interface ConditionalBranchEvent extends BaseEvent {
  type: "conditional.branch";
  conditionValue: boolean;
  branchTaken: "consequent" | "alternate" | "none";  // None for no else
  conditionExpression?: string;  // Optional source
}
```

**Use Cases Enabled**: Branch coverage analysis, execution path visualization

**Tools Decide**: Path highlighting, coverage assessment

### 4.2 Loop Enter

```typescript
interface LoopEnterEvent extends BaseEvent {
  type: "loop.enter";
  loopId: string;  // Unique identifier for this loop
  loopType: "for" | "while" | "do-while" | "for-in" | "for-of";
}
```

**Use Cases Enabled**: Loop execution tracking, iteration counting

**Tools Decide**: Loop visualization, iteration display

### 4.3 Loop Iteration

```typescript
interface LoopIterationEvent extends BaseEvent {
  type: "loop.iterate";
  loopId: string;
  iterationNumber: number;  // 0-indexed
  conditionValue: boolean;  // True if continuing, false if exiting
}
```

**Use Cases Enabled**: Iteration counting, infinite loop detection

**Tools Decide**: Iteration display, performance warnings

### 4.4 Loop Exit

```typescript
interface LoopExitEvent extends BaseEvent {
  type: "loop.exit";
  loopId: string;
  totalIterations: number;
  exitReason: "condition-false" | "break" | "return" | "throw";
}
```

**Use Cases Enabled**: Loop behavior analysis, exit condition tracking

**Tools Decide**: Loop completion visualization, assessment

---

## 5. Async Events

### 5.1 Await Before

```typescript
interface AwaitBeforeEvent extends BaseEvent {
  type: "await.before";
  promiseValue: SerializedValue;  // The promise being awaited
  scopeId: string;
}
```

**Use Cases Enabled**: Async execution ordering, event loop visualization

**Tools Decide**: Event loop rendering, async pedagogy

### 5.2 Await After

```typescript
interface AwaitAfterEvent extends BaseEvent {
  type: "await.after";
  resolvedValue: SerializedValue;
  scopeId: string;
}
```

**Use Cases Enabled**: Promise resolution tracking, async timing

**Tools Decide**: Resolution visualization, timing display

### 5.3 Promise Create

```typescript
interface PromiseCreateEvent extends BaseEvent {
  type: "promise.create";
  promiseId: string;
  executorCalled: boolean;
}
```

**Use Cases Enabled**: Promise lifecycle tracking

**Tools Decide**: Promise state visualization

### 5.4 Promise Settle

```typescript
interface PromiseSettleEvent extends BaseEvent {
  type: "promise.settle";
  promiseId: string;
  state: "fulfilled" | "rejected";
  value: SerializedValue;
}
```

**Use Cases Enabled**: Promise state transitions, resolution tracking

**Tools Decide**: State transition rendering

### 5.5 Microtask Queue

```typescript
interface MicrotaskQueueEvent extends BaseEvent {
  type: "microtask.queue";
  taskId: string;
  taskType: "promise-then" | "promise-catch" | "promise-finally" | "queueMicrotask";
}
```

**Use Cases Enabled**: Event loop visualization, microtask ordering

**Tools Decide**: Queue visualization, execution order pedagogy

### 5.6 Microtask Execute

```typescript
interface MicrotaskExecuteEvent extends BaseEvent {
  type: "microtask.execute";
  taskId: string;
}
```

**Use Cases Enabled**: Event loop step-through, timing visualization

**Tools Decide**: Execution timing display

---

## 6. Object & Property Events

### 6.1 Object Create

```typescript
interface ObjectCreateEvent extends BaseEvent {
  type: "object.create";
  objectId: string;  // Unique identifier
  prototype: string | null;  // Prototype object ID
  properties: Record<string, SerializedValue>;
}
```

**Use Cases Enabled**: Object creation tracking, prototype chain visualization

**Tools Decide**: Object diagram rendering, memory visualization

### 6.2 Property Access

```typescript
interface PropertyAccessEvent extends BaseEvent {
  type: "property.access";
  objectId: string;
  propertyName: string;
  value: SerializedValue;
  accessType: "get" | "set";
  found: boolean;  // False if undefined
}
```

**Use Cases Enabled**: Property usage tracking, undefined access detection

**Tools Decide**: Property access visualization, assessment

### 6.3 Prototype Lookup

```typescript
interface PrototypeLookupEvent extends BaseEvent {
  type: "prototype.lookup";
  objectId: string;
  propertyName: string;
  lookupChain: string[];  // Object IDs traversed
  foundAt: string | null;  // Where property was found (object ID)
  value: SerializedValue;
}
```

**Use Cases Enabled**: Prototype chain visualization, delegation explanation

**Tools Decide**: Chain rendering, delegation pedagogy

---

## 7. Error Events

### 7.1 Throw Error

```typescript
interface ThrowErrorEvent extends BaseEvent {
  type: "error.throw";
  error: SerializedValue;
  errorType: string;  // e.g., "TypeError", "ReferenceError"
  message: string;
  scopeId: string;
}
```

**Use Cases Enabled**: Error tracking, error type analysis

**Tools Decide**: Error display, debugging guidance

### 7.2 Catch Error

```typescript
interface CatchErrorEvent extends BaseEvent {
  type: "error.catch";
  error: SerializedValue;
  catchScopeId: string;  // Scope of catch block
}
```

**Use Cases Enabled**: Exception handling visualization, catch tracking

**Tools Decide**: Exception flow rendering

### 7.3 Error Context

```typescript
interface ErrorContextEvent extends BaseEvent {
  type: "error.context";
  error: SerializedValue;
  callStack: Array<{
    functionName: string | null;
    location: SourceLocation;
  }>;
  scopeChain: string[];  // Scope IDs
}
```

**Use Cases Enabled**: Full error context for debugging, stack trace analysis

**Tools Decide**: Stack trace display, debugging workflow

---

## 8. Expression Events (Micro-Level)

**Note**: Expression-level events are optional (configurable). High overhead, use for detailed analysis only.

### 8.1 Binary Operation

```typescript
interface BinaryOperationEvent extends BaseEvent {
  type: "expression.binary";
  operator: string;  // "+", "-", "===", etc.
  left: SerializedValue;
  right: SerializedValue;
  result: SerializedValue;
  coercionOccurred: boolean;  // True if type coercion happened
}
```

**Use Cases Enabled**: Expression evaluation visualization, coercion detection

**Tools Decide**: Evaluation order rendering, coercion pedagogy

### 8.2 Unary Operation

```typescript
interface UnaryOperationEvent extends BaseEvent {
  type: "expression.unary";
  operator: string;  // "!", "typeof", etc.
  operand: SerializedValue;
  result: SerializedValue;
}
```

**Use Cases Enabled**: Operator usage analysis

**Tools Decide**: Operator visualization

---

## 9. Value Serialization

All `SerializedValue` types follow this structure:

```typescript
type SerializedValue =
  | PrimitiveValue
  | ObjectValue
  | FunctionValue
  | SpecialValue;

interface PrimitiveValue {
  type: "primitive";
  valueType: "number" | "string" | "boolean" | "null" | "undefined" | "bigint" | "symbol";
  value: number | string | boolean | null | undefined | bigint | symbol;
}

interface ObjectValue {
  type: "object";
  objectId: string;  // Reference ID
  constructor: string;  // Constructor name
  properties?: Record<string, SerializedValue>;  // If configured for deep serialization
  isArray: boolean;
  isCircular: boolean;  // If circular reference detected
}

interface FunctionValue {
  type: "function";
  functionId: string;
  name: string | null;
  source?: string;  // If configured
  location: SourceLocation;
}

interface SpecialValue {
  type: "special";
  kind: "tdz" | "uninitialized" | "NaN" | "Infinity" | "-Infinity";
}
```

**Rationale**:
- Object IDs enable reference tracking without modifying objects
- Circular reference handling prevents infinite serialization
- Function source optional (can be large)
- Special values (TDZ, NaN) explicitly marked

**Tools Decide**: How deep to serialize, how to display values, value comparison strategies

---

## 10. Complete Event Type Summary

| Category | Event Type | Primary Use Cases |
|----------|-----------|-------------------|
| **Variables** | `variable.declare` | Scope visualization, TDZ tracking |
| | `variable.assign` | Value flow, initialization tracking |
| | `variable.read` | Closure detection, usage analysis |
| | `variable.update` | Mutation tracking |
| | `variable.tdz-access` | Hoisting misconception detection |
| **Functions** | `function.call` | Call stack, this binding, argument evaluation |
| | `function.return` | Stack visualization, return tracking |
| | `function.throw` | Error flow |
| **Scopes** | `scope.create` | Scope chain visualization |
| | `scope.enter` | Execution flow |
| | `scope.exit` | Scope lifetime |
| | `closure.capture` | Closure visualization |
| **Control Flow** | `conditional.branch` | Branch coverage, path visualization |
| | `loop.enter` | Loop tracking |
| | `loop.iterate` | Iteration counting |
| | `loop.exit` | Loop completion analysis |
| **Async** | `await.before` | Event loop visualization |
| | `await.after` | Promise resolution |
| | `promise.create` | Promise lifecycle |
| | `promise.settle` | State transitions |
| | `microtask.queue` | Microtask queue visualization |
| | `microtask.execute` | Event loop steps |
| **Objects** | `object.create` | Object tracking, prototype chain |
| | `property.access` | Property usage |
| | `prototype.lookup` | Delegation visualization |
| **Errors** | `error.throw` | Error tracking |
| | `error.catch` | Exception handling |
| | `error.context` | Debugging context |
| **Expressions** | `expression.binary` | Expression evaluation (optional) |
| | `expression.unary` | Operator analysis (optional) |

---

## Boundary Compliance Checklist

For each event schema above:

✅ **Specifies data structure** - What fields exist, what types
✅ **Enables tool capabilities** - Allows tools to build features
✅ **Remains neutral** - No pedagogical interpretation
✅ **Configurable** - Granularity controlled by config, not hardcoded
✅ **Implementable** - Clear enough for embody implementation

❌ **Does NOT specify** - How to visualize/render
❌ **Does NOT specify** - Assessment logic or quality criteria
❌ **Does NOT specify** - Pedagogical strategies
❌ **Does NOT specify** - UI interaction patterns
❌ **Does NOT specify** - Student mental model comparison

---

## Implementation Notes for Embody

**Event Generation**:
- Events emitted from Aran advice functions
- Sequence IDs must be globally unique and monotonically increasing
- Timestamps should be high-resolution performance.now()
- Object/function/scope IDs must be stable across events

**Configuration Impact**:
- Granularity settings filter which events are emitted
- Expression-level events (micro) default OFF (high overhead)
- Tools request granularity via config, embody honors request

**Performance**:
- Event generation overhead proportional to configured granularity
- Advice functions must be optimized (called frequently)
- Consider event batching for streaming mode

---

## Next Phase 5 Documents

- **trace-configuration.md**: How to configure which events are generated
- **trace-data-formats.md**: Overall trace structure and ordering guarantees
- **use-cases-table.md**: Map these events to 77 educational use cases
- **tool-integration-guide.md**: How tool developers consume these events
