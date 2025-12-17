# Trace Event Catalog

**Purpose**: Comprehensive reference of all education-relevant trace events for JavaScript execution, with detailed object schemas.

**Target Audience**: Tool developers implementing educational visualizations, validators, and assessments for JavaScript notional machines.

**Critical Boundary**: This catalog specifies WHAT trace events should contain (educational semantics). HOW to generate these from instrumentation (Aran mapping) is out of scope.

---

## Design Principles

### Common Fields

All trace events share these required fields:

```typescript
{
  type: string,              // Event identifier using JS-correct vocabulary
  timestamp: number,         // Milliseconds since trace start
  sequenceNumber: number,    // Global ordering for all events (handles async)
  sourceLocation?: {         // Where in source code (when applicable)
    file: string,
    line: number,
    column: number
  }
}
```

### Educational Event Naming

- Use **JS-correct vocabulary**: `microtask`, `promise`, `prototype`, `closure`, `hoisting`
- Avoid **implementation details**: Not `apply@before` or Aran-specific terms
- Use **learner-friendly terms**: `function-called` not `ApplyExpression`
- Follow **JavaScript documentation**: MDN terminology preferred

### Data Structure Guidelines

1. **Use IDs for references**: `object-id`, `scope-id`, `closure-id` (not full objects)
2. **Optional fields**: Can be omitted based on config granularity
3. **Arrays show structure**: Full content when short, length + sample when long
4. **Types are explicit**: `is-primitive`, `value-type` fields clarify data types

---

## Event Categories

- [Function Execution Events](#function-execution-events)
- [Variable Lifecycle Events](#variable-lifecycle-events)
- [Object & Property Events](#object--property-events)
- [Prototype & Inheritance Events](#prototype--inheritance-events)
- [Scope & Closure Events](#scope--closure-events)
- [Async & Promise Events](#async--promise-events)
- [Control Flow Events](#control-flow-events)
- [Operator & Expression Events](#operator--expression-events)
- [Type Coercion Events](#type-coercion-events)
- [This Binding Events](#this-binding-events)
- [Class & Constructor Events](#class--constructor-events)
- [Error & Exception Events](#error--exception-events)
- [Module & Import Events](#module--import-events)
- [Memory & GC Events](#memory--gc-events)

---

## Function Execution Events

### `function-called`

**When**: Function invocation begins (before body execution)

**Purpose**: Build call stack, track execution flow, correlate arguments to parameters

```javascript
{
  type: "function-called",
  timestamp: 1234567890,
  sequenceNumber: 42,
  functionName: "calculateSum",      // Name or "<anonymous>"
  arguments: [5, 10],                // Actual argument values
  callSite: {
    file: "main.js",
    line: 15,
    column: 8
  },
  callStack: ["main", "processData", "calculateSum"], // Current stack (after push)
  callStackDepth: 3,
  thisBinding: "globalObject",       // Reference to `this` value
  isAsync: false,
  isGenerator: false,
  isConstructor: false,              // Called with `new`
  sourceLocation: {                  // Function definition location
    file: "utils.js",
    line: 42,
    column: 1
  }
}
```

---

### `function-returned`

**When**: Function returns normally (not via exception)

**Purpose**: Track return flow, measure execution time, show stack unwinding

```javascript
{
  type: "function-returned",
  timestamp: 1234567895,
  sequenceNumber: 43,
  functionName: "calculateSum",
  returnValue: 15,
  executionTime: 5,                  // Milliseconds
  callStackDepth: 2,                 // After pop
  sourceLocation: {                  // Return statement location
    file: "utils.js",
    line: 45,
    column: 3
  }
}
```

---

### `function-exited-with-exception`

**When**: Function exits via thrown exception

**Purpose**: Track error propagation up call stack

```javascript
{
  type: "function-exited-with-exception",
  timestamp: 1234567892,
  sequenceNumber: 44,
  functionName: "calculateSum",
  exceptionType: "ReferenceError",
  exceptionMessage: "x is not defined",
  callStackDepth: 2                  // After pop
}
```

---

## Variable Lifecycle Events

### `variable-declared`

**When**: Variable declaration registered in scope (creation phase for var/function, execution phase for let/const)

**Purpose**: Track when variables enter scope, distinguish var vs let/const hoisting

```javascript
{
  type: "variable-declared",
  timestamp: 1234567890,
  sequenceNumber: 45,
  variableName: "counter",
  kind: "let",                       // "var" | "let" | "const" | "function" | "class"
  scopeId: "block-scope-123",
  initialValue: undefined,           // For var: undefined, for let/const: <TDZ>
  isInTDZ: true,                     // let/const before initialization
  isFunctionScoped: false,           // var = true, let/const = false
  sourceLocation: {
    file: "main.js",
    line: 10,
    column: 6
  }
}
```

---

### `variable-initialized`

**When**: let/const exits TDZ, becomes accessible

**Purpose**: Mark TDZ end, show when variable becomes usable

```javascript
{
  type: "variable-initialized",
  timestamp: 1234567891,
  sequenceNumber: 46,
  variableName: "counter",
  initialValue: 0,
  scopeId: "block-scope-123",
  sourceLocation: {
    file: "main.js",
    line: 10,
    column: 6
  }
}
```

---

### `value-assigned`

**When**: Value written to variable (assignment, mutation)

**Purpose**: Track data flow, show value changes, detect reference aliasing

```javascript
{
  type: "value-assigned",
  timestamp: 1234567892,
  sequenceNumber: 47,
  variableName: "counter",
  previousValue: 0,
  newValue: 1,
  valueType: "number",               // "number" | "string" | "boolean" | "object" | "function" | ...
  isPrimitive: true,
  scopeId: "block-scope-123",
  assignmentOperator: "+=",          // "=" | "+=" | "++" | "--" | ...
  isReferenceAssignment: false,      // true if assigning object reference
  objectId: null,                    // Set if isReferenceAssignment = true
  sourceLocation: {
    file: "main.js",
    line: 12,
    column: 3
  }
}
```

---

### `variable-read`

**When**: Variable accessed for its value

**Purpose**: Track data flow, show variable resolution through scope chain

```javascript
{
  type: "variable-read",
  timestamp: 1234567893,
  sequenceNumber: 48,
  variableName: "counter",
  value: 1,
  valueType: "number",
  resolvedFromScope: "block-scope-123", // Which scope provided the variable
  scopeChain: ["block-scope-123", "function-scope-456", "global"],
  isClosureCapture: false,           // Reading from captured scope
  sourceLocation: {
    file: "main.js",
    line: 13,
    column: 15
  }
}
```

---

### `variable-in-tdz-accessed`

**When**: Attempt to access let/const before initialization

**Purpose**: Explain TDZ errors, show why ReferenceError thrown

```javascript
{
  type: "variable-in-tdz-accessed",
  timestamp: 1234567890,
  sequenceNumber: 49,
  variableName: "counter",
  scopeId: "block-scope-123",
  willThrowReferenceError: true,
  sourceLocation: {
    file: "main.js",
    line: 9,
    column: 13
  }
}
```

---

## Object & Property Events

### `object-created`

**When**: New object allocated (literal, constructor, Object.create)

**Purpose**: Track heap allocations, show object lifecycle, correlate references

```javascript
{
  type: "object-created",
  timestamp: 1234567890,
  sequenceNumber: 50,
  objectId: "obj-123",
  objectType: "Object",              // "Object" | "Array" | "Function" | custom constructor name
  creationMethod: "literal",         // "literal" | "constructor" | "Object.create" | "class"
  prototypeId: "Object.prototype",
  properties: {                      // Initial properties
    x: 1,
    y: 2
  },
  sourceLocation: {
    file: "main.js",
    line: 20,
    column: 14
  }
}
```

---

### `property-set`

**When**: Property assigned on object

**Purpose**: Track object mutations, show property additions/updates

```javascript
{
  type: "property-set",
  timestamp: 1234567891,
  sequenceNumber: 51,
  objectId: "obj-123",
  propertyName: "z",
  previousValue: undefined,          // undefined if new property
  newValue: 3,
  valueType: "number",
  isNewProperty: true,
  sourceLocation: {
    file: "main.js",
    line: 21,
    column: 1
  }
}
```

---

### `property-read`

**When**: Property accessed from object

**Purpose**: Track data flow, show where values come from

```javascript
{
  type: "property-read",
  timestamp: 1234567892,
  sequenceNumber: 52,
  objectId: "obj-123",
  propertyName: "x",
  value: 1,
  foundOnObject: true,               // false if from prototype
  sourceLocation: {
    file: "main.js",
    line: 22,
    column: 10
  }
}
```

---

## Prototype & Inheritance Events

### `prototype-lookup`

**When**: Property accessed, requires walking prototype chain

**Purpose**: Show prototype chain traversal, explain inheritance

```javascript
{
  type: "prototype-lookup",
  timestamp: 1234567890,
  sequenceNumber: 60,
  objectId: "obj-123",
  propertyName: "toString",
  lookupPath: [                      // Chain walked
    { objectId: "obj-123", found: false },
    { objectId: "CustomProto-456", found: false },
    { objectId: "Object.prototype", found: true }
  ],
  foundAt: "Object.prototype",
  value: "<function toString>",
  wasInherited: true,
  sourceLocation: {
    file: "main.js",
    line: 25,
    column: 5
  }
}
```

---

### `prototype-assigned`

**When**: Object's [[Prototype]] set or changed

**Purpose**: Show prototype relationships, explain Object.setPrototypeOf

```javascript
{
  type: "prototype-assigned",
  timestamp: 1234567891,
  sequenceNumber: 61,
  objectId: "obj-123",
  oldPrototypeId: "Object.prototype",
  newPrototypeId: "CustomProto-456",
  sourceLocation: {
    file: "main.js",
    line: 26,
    column: 1
  }
}
```

---

### `prototype-mutation`

**When**: Property added/changed on a prototype object

**Purpose**: Show how prototype changes affect all instances

```javascript
{
  type: "prototype-mutation",
  timestamp: 1234567892,
  sequenceNumber: 62,
  prototypeId: "CustomProto-456",
  propertyName: "greet",
  newValue: "<function greet>",
  affectedObjects: ["obj-123", "obj-789"], // Objects with this prototype
  sourceLocation: {
    file: "main.js",
    line: 27,
    column: 1
  }
}
```

---

## Scope & Closure Events

### `scope-entered`

**When**: Execution enters new scope (function, block, global)

**Purpose**: Build scope hierarchy, show scope chain

```javascript
{
  type: "scope-entered",
  timestamp: 1234567890,
  sequenceNumber: 70,
  scopeId: "function-scope-456",
  scopeType: "function",             // "global" | "function" | "block" | "module"
  parentScopeId: "global",
  scopeChain: ["function-scope-456", "global"],
  sourceLocation: {
    file: "main.js",
    line: 30,
    column: 1
  }
}
```

---

### `scope-exited`

**When**: Execution leaves scope

**Purpose**: Show scope cleanup, explain when variables become inaccessible

```javascript
{
  type: "scope-exited",
  timestamp: 1234567895,
  sequenceNumber: 71,
  scopeId: "function-scope-456",
  scopeType: "function",
  isPersisted: false,                // true if captured by closure
  sourceLocation: {
    file: "main.js",
    line: 35,
    column: 1
  }
}
```

---

### `closure-created`

**When**: Function captures variables from outer scope

**Purpose**: Explain closures, show what variables are captured

```javascript
{
  type: "closure-created",
  timestamp: 1234567890,
  sequenceNumber: 72,
  closureId: "closure-789",
  functionName: "inner",
  capturedVariables: [               // Variables from outer scope(s)
    {
      variableName: "count",
      scopeId: "function-scope-456",
      currentValue: 0
    }
  ],
  capturingScopes: ["function-scope-456"], // Outer scopes kept alive
  sourceLocation: {
    file: "main.js",
    line: 32,
    column: 10
  }
}
```

---

### `closure-variable-accessed`

**When**: Closure reads/writes captured variable

**Purpose**: Show closure accessing outer scope, prove reference capture (not value)

```javascript
{
  type: "closure-variable-accessed",
  timestamp: 1234567892,
  sequenceNumber: 73,
  closureId: "closure-789",
  variableName: "count",
  accessType: "read",                // "read" | "write"
  value: 0,
  scopeId: "function-scope-456",    // Outer scope
  sourceLocation: {
    file: "main.js",
    line: 33,
    column: 12
  }
}
```

---

## Async & Promise Events

### `promise-created`

**When**: New Promise instantiated

**Purpose**: Track async operations, build promise chain

```javascript
{
  type: "promise-created",
  timestamp: 1234567890,
  sequenceNumber: 80,
  promiseId: "promise-001",
  executor: "fetchUserData",         // Executor function name
  state: "pending",                  // "pending" | "fulfilled" | "rejected"
  parentPromiseId: null,             // For promise chains
  sourceLocation: {
    file: "api.js",
    line: 10,
    column: 14
  }
}
```

---

### `promise-resolved`

**When**: Promise transitions to fulfilled state

**Purpose**: Show async resolution, track fulfillment values

```javascript
{
  type: "promise-resolved",
  timestamp: 1234567950,
  sequenceNumber: 81,
  promiseId: "promise-001",
  state: "fulfilled",
  value: { userId: 42, name: "Alice" },
  executionTime: 60                  // Time from creation to resolution
}
```

---

### `promise-rejected`

**When**: Promise transitions to rejected state

**Purpose**: Track async errors, show rejection reasons

```javascript
{
  type: "promise-rejected",
  timestamp: 1234567950,
  sequenceNumber: 82,
  promiseId: "promise-002",
  state: "rejected",
  reason: "Network error",
  reasonType: "Error",
  executionTime: 60
}
```

---

### `microtask-queued`

**When**: Microtask (promise callback) added to microtask queue

**Purpose**: Explain event loop, show why promises resolve before setTimeout

```javascript
{
  type: "microtask-queued",
  timestamp: 1234567892,
  sequenceNumber: 83,
  taskId: "micro-001",
  promiseId: "promise-001",
  callbackType: "then",              // "then" | "catch" | "finally"
  queueLength: 3,                    // Current microtask queue length
  sourceLocation: {
    file: "api.js",
    line: 12,
    column: 10
  }
}
```

---

### `microtask-executed`

**When**: Microtask callback runs

**Purpose**: Show event loop processing, demonstrate queue consumption

```javascript
{
  type: "microtask-executed",
  timestamp: 1234567893,
  sequenceNumber: 84,
  taskId: "micro-001",
  promiseId: "promise-001",
  executionTime: 1,
  queueLength: 2                     // After dequeue
}
```

---

### `macrotask-scheduled`

**When**: Macrotask (setTimeout, setInterval) scheduled

**Purpose**: Track async timers, distinguish from microtasks

```javascript
{
  type: "macrotask-scheduled",
  timestamp: 1234567890,
  sequenceNumber: 85,
  taskId: "macro-001",
  taskType: "setTimeout",            // "setTimeout" | "setInterval" | "setImmediate"
  delay: 1000,                       // Milliseconds
  callbackName: "handleTimeout",
  sourceLocation: {
    file: "main.js",
    line: 40,
    column: 1
  }
}
```

---

### `macrotask-queued`

**When**: Timer expires, callback added to macrotask queue

**Purpose**: Show transition from scheduled → queued

```javascript
{
  type: "macrotask-queued",
  timestamp: 1234568890,
  sequenceNumber: 86,
  taskId: "macro-001",
  actualDelay: 1002,                 // Actual time elapsed
  queueLength: 1
}
```

---

### `macrotask-executed`

**When**: Macrotask callback runs

**Purpose**: Show event loop processing macrotasks

```javascript
{
  type: "macrotask-executed",
  timestamp: 1234568891,
  sequenceNumber: 87,
  taskId: "macro-001",
  executionTime: 5,
  queueLength: 0
}
```

---

## Control Flow Events

### `conditional-evaluated`

**When**: if/else, ternary, switch condition evaluated

**Purpose**: Track branching decisions, show which paths taken

```javascript
{
  type: "conditional-evaluated",
  timestamp: 1234567890,
  sequenceNumber: 90,
  conditionType: "if",               // "if" | "ternary" | "switch"
  condition: "x > 10",               // Condition expression
  result: true,
  branchTaken: "then",               // "then" | "else"
  sourceLocation: {
    file: "main.js",
    line: 50,
    column: 5
  }
}
```

---

### `loop-iteration`

**When**: Loop body executes (each iteration)

**Purpose**: Count iterations, show loop progress, detect infinite loops

```javascript
{
  type: "loop-iteration",
  timestamp: 1234567890,
  sequenceNumber: 91,
  loopType: "for",                   // "for" | "while" | "do-while" | "for-of" | "for-in"
  iterationCount: 5,
  condition: "i < 10",
  conditionResult: true,
  loopVariable: "i",
  loopVariableValue: 5,
  sourceLocation: {
    file: "main.js",
    line: 60,
    column: 1
  }
}
```

---

### `loop-exited`

**When**: Loop terminates (naturally or via break)

**Purpose**: Show loop completion, distinguish natural exit vs break

```javascript
{
  type: "loop-exited",
  timestamp: 1234567895,
  sequenceNumber: 92,
  loopType: "for",
  exitReason: "condition-false",     // "condition-false" | "break" | "return"
  totalIterations: 10,
  sourceLocation: {
    file: "main.js",
    line: 60,
    column: 1
  }
}
```

---

## Operator & Expression Events

### `operator-applied`

**When**: Binary/unary operator evaluated

**Purpose**: Show operator precedence, evaluation order, operand values

```javascript
{
  type: "operator-applied",
  timestamp: 1234567890,
  sequenceNumber: 100,
  operator: "+",
  operatorType: "binary",            // "binary" | "unary"
  leftOperand: 5,
  leftOperandType: "number",
  rightOperand: 3,
  rightOperandType: "number",
  result: 8,
  resultType: "number",
  sourceLocation: {
    file: "main.js",
    line: 70,
    column: 10
  }
}
```

---

### `short-circuit-triggered`

**When**: Logical operator short-circuits (&&, ||, ??)

**Purpose**: Explain short-circuit evaluation, show unevaluated operands

```javascript
{
  type: "short-circuit-triggered",
  timestamp: 1234567890,
  sequenceNumber: 101,
  operator: "&&",
  leftOperand: false,
  result: false,
  rightOperandUnevaluated: true,     // Right side never evaluated
  sourceLocation: {
    file: "main.js",
    line: 71,
    column: 8
  }
}
```

---

### `expression-evaluated`

**When**: Complex expression fully evaluated

**Purpose**: Show expression tree, evaluation order

```javascript
{
  type: "expression-evaluated",
  timestamp: 1234567890,
  sequenceNumber: 102,
  expression: "2 + 3 * 4",
  result: 14,
  evaluationOrder: [                 // Order operators applied
    { operator: "*", operands: [3, 4], result: 12 },
    { operator: "+", operands: [2, 12], result: 14 }
  ],
  sourceLocation: {
    file: "main.js",
    line: 72,
    column: 14
  }
}
```

---

## Type Coercion Events

### `type-coerced`

**When**: Value implicitly converted to different type

**Purpose**: Explain coercion rules, show ToPrimitive/ToNumber/ToString algorithms

```javascript
{
  type: "type-coerced",
  timestamp: 1234567890,
  sequenceNumber: 110,
  beforeValue: "5",
  beforeType: "string",
  afterValue: 5,
  afterType: "number",
  coercionReason: "numeric-context", // "numeric-context" | "string-context" | "boolean-context" | "comparison"
  algorithm: "ToNumber",             // "ToPrimitive" | "ToNumber" | "ToString" | "ToBoolean"
  coercionSteps: [                   // For complex coercions
    { step: "ToPrimitive", hint: "number", result: "5" },
    { step: "ToNumber", result: 5 }
  ],
  sourceLocation: {
    file: "main.js",
    line: 80,
    column: 10
  }
}
```

---

### `comparison-evaluated`

**When**: Comparison operator evaluated (==, ===, <, >, etc.)

**Purpose**: Show comparison rules, distinguish == vs ===

```javascript
{
  type: "comparison-evaluated",
  timestamp: 1234567890,
  sequenceNumber: 111,
  operator: "==",
  leftOperand: "5",
  leftType: "string",
  rightOperand: 5,
  rightType: "number",
  result: true,
  coercionOccurred: true,
  coercionDetails: {
    coercedValue: 5,
    coercedType: "number"
  },
  sourceLocation: {
    file: "main.js",
    line: 81,
    column: 8
  }
}
```

---

## This Binding Events

### `this-bound`

**When**: Function called, `this` value determined

**Purpose**: Explain this binding rules, show which rule applied

```javascript
{
  type: "this-bound",
  timestamp: 1234567890,
  sequenceNumber: 120,
  functionName: "handleClick",
  thisValue: "HTMLButtonElement#456",
  thisType: "object",
  bindingType: "implicit",           // "implicit" | "explicit" | "new" | "arrow" | "default"
  bindingRule: "method-call",        // "method-call" | "call/apply/bind" | "new" | "lexical" | "global-or-undefined"
  callSite: {
    file: "events.js",
    line: 25,
    column: 10
  },
  sourceLocation: {                  // Function definition
    file: "handlers.js",
    line: 10,
    column: 1
  }
}
```

---

### `this-binding-lost`

**When**: Method extracted, loses implicit binding

**Purpose**: Explain common this pitfall, suggest fixes

```javascript
{
  type: "this-binding-lost",
  timestamp: 1234567890,
  sequenceNumber: 121,
  functionName: "handleClick",
  expectedThis: "MyComponent#789",
  actualThis: "undefined",           // Or globalThis in non-strict
  extractionSite: {
    file: "events.js",
    line: 24,
    column: 30
  },
  suggestedFixes: ["bind", "arrow", "self-capture"]
}
```

---

## Class & Constructor Events

### `class-defined`

**When**: Class declaration processed

**Purpose**: Show class structure, static vs instance members

```javascript
{
  type: "class-defined",
  timestamp: 1234567890,
  sequenceNumber: 130,
  className: "User",
  extendsClass: "Person",            // null if no extends
  constructorDefined: true,
  staticMembers: ["fromJSON", "count"],
  instanceMembers: ["getName", "setName"],
  privateFields: ["#password"],
  sourceLocation: {
    file: "models.js",
    line: 10,
    column: 1
  }
}
```

---

### `constructor-called`

**When**: Constructor invoked with `new`

**Purpose**: Track object instantiation, show constructor execution

```javascript
{
  type: "constructor-called",
  timestamp: 1234567891,
  sequenceNumber: 131,
  className: "User",
  arguments: ["Alice", 30],
  newObjectId: "user-obj-456",
  prototypeId: "User.prototype",
  sourceLocation: {
    file: "main.js",
    line: 50,
    column: 16
  }
}
```

---

### `super-called`

**When**: super() called in subclass constructor

**Purpose**: Show inheritance chain initialization

```javascript
{
  type: "super-called",
  timestamp: 1234567892,
  sequenceNumber: 132,
  subclass: "Admin",
  superclass: "User",
  arguments: ["Bob", 25],
  thisValue: "admin-obj-789",
  sourceLocation: {
    file: "models.js",
    line: 30,
    column: 5
  }
}
```

---

## Error & Exception Events

### `exception-thrown`

**When**: Error thrown (throw statement or runtime error)

**Purpose**: Track error origin, show call stack at throw point

```javascript
{
  type: "exception-thrown",
  timestamp: 1234567890,
  sequenceNumber: 140,
  errorType: "ReferenceError",
  message: "x is not defined",
  stack: [
    { functionName: "calculateSum", file: "utils.js", line: 45 },
    { functionName: "processData", file: "main.js", line: 20 },
    { functionName: "main", file: "main.js", line: 10 }
  ],
  isCaught: false,                   // Will be caught by try/catch?
  sourceLocation: {
    file: "utils.js",
    line: 45,
    column: 10
  }
}
```

---

### `exception-caught`

**When**: Exception caught by try/catch

**Purpose**: Show where exception handled, explain error propagation

```javascript
{
  type: "exception-caught",
  timestamp: 1234567891,
  sequenceNumber: 141,
  errorType: "ReferenceError",
  catchVariable: "error",
  catchBlockLocation: {
    file: "main.js",
    line: 25,
    column: 3
  }
}
```

---

### `finally-executed`

**When**: Finally block executes

**Purpose**: Show finally always runs, even after return/throw

```javascript
{
  type: "finally-executed",
  timestamp: 1234567892,
  sequenceNumber: 142,
  hadException: false,
  hadReturn: true,
  sourceLocation: {
    file: "main.js",
    line: 30,
    column: 3
  }
}
```

---

## Module & Import Events

### `module-loaded`

**When**: ES module fully loaded and evaluated

**Purpose**: Track module initialization, show module scope creation

```javascript
{
  type: "module-loaded",
  timestamp: 1234567890,
  sequenceNumber: 150,
  modulePath: "./utils.js",
  exports: ["add", "subtract", "default"],
  imports: [
    { from: "./math.js", imported: ["multiply"] }
  ],
  scopeId: "module-scope-123",
  loadTime: 50                       // Milliseconds
}
```

---

### `import-resolved`

**When**: Import binding resolved (creation phase)

**Purpose**: Explain hoisting of imports, show module dependencies

```javascript
{
  type: "import-resolved",
  timestamp: 1234567890,
  sequenceNumber: 151,
  importedName: "multiply",
  fromModule: "./math.js",
  boundTo: "multiply",               // Local binding name
  isDefault: false,
  sourceLocation: {
    file: "utils.js",
    line: 1,
    column: 1
  }
}
```

---

## Memory & GC Events

### `garbage-collected`

**When**: Object eligible for garbage collection (not always immediate)

**Purpose**: Show object lifetime, explain memory management

```javascript
{
  type: "garbage-collected",
  timestamp: 1234570000,
  sequenceNumber: 160,
  objectId: "obj-123",
  objectType: "Object",
  createdAt: 1234567890,
  lifetime: 2110,                    // Milliseconds
  reason: "no-references"            // "no-references" | "scope-exited" | "closure-released"
}
```

---

### `memory-snapshot`

**When**: Periodic memory state capture (optional, config-driven)

**Purpose**: Track memory usage over time, detect leaks

```javascript
{
  type: "memory-snapshot",
  timestamp: 1234567900,
  sequenceNumber: 161,
  heapUsed: 1048576,                 // Bytes
  heapTotal: 2097152,
  objectCount: 150,
  closureCount: 12,
  topObjectsBySize: [
    { objectId: "array-456", type: "Array", size: 102400 }
  ]
}
```

---

## Special Events

### `console-output`

**When**: console.log/warn/error called

**Purpose**: Track program output, validate predictions

```javascript
{
  type: "console-output",
  timestamp: 1234567890,
  sequenceNumber: 170,
  method: "log",                     // "log" | "warn" | "error" | "info"
  arguments: ["Result:", 42],
  sourceLocation: {
    file: "main.js",
    line: 100,
    column: 3
  }
}
```

---

### `breakpoint-hit`

**When**: Execution reaches breakpoint (debugging support)

**Purpose**: Pause execution, allow state inspection

```javascript
{
  type: "breakpoint-hit",
  timestamp: 1234567890,
  sequenceNumber: 171,
  breakpointId: "bp-001",
  callStack: ["main", "processData", "calculateSum"],
  scopeChain: ["function-scope-456", "global"],
  sourceLocation: {
    file: "main.js",
    line: 50,
    column: 1
  }
}
```

---

## Usage Notes

### Filtering by Notional Machine

Tools can filter events by NM to focus visualization:

- **Call Stack**: `function-called`, `function-returned`, `function-exited-with-exception`
- **Memory Model**: `variable-declared`, `value-assigned`, `object-created`, `garbage-collected`
- **Event Loop**: `promise-created`, `microtask-queued`, `macrotask-scheduled`, `*-executed`
- **Scope Chain**: `scope-entered`, `scope-exited`, `closure-created`, `variable-read`
- **Prototype Chain**: `prototype-lookup`, `prototype-assigned`, `prototype-mutation`
- **This Binding**: `this-bound`, `this-binding-lost`
- **Operators**: `operator-applied`, `short-circuit-triggered`, `expression-evaluated`
- **Type Coercion**: `type-coerced`, `comparison-evaluated`
- **Classes**: `class-defined`, `constructor-called`, `super-called`
- **Control Flow**: `conditional-evaluated`, `loop-iteration`, `loop-exited`
- **Errors**: `exception-thrown`, `exception-caught`, `finally-executed`
- **Modules**: `module-loaded`, `import-resolved`

### Performance Considerations

- **Sequence numbers**: Enable O(1) event ordering despite async
- **Object IDs**: Prevent circular reference serialization issues
- **Optional fields**: Reduce trace size based on config granularity
- **Sampling**: Config can enable periodic events (e.g., `memory-snapshot`) vs continuous

### Extensibility

This catalog can be extended with:
- Tool-specific events (e.g., `user-annotation`, `prediction-made`)
- Language-specific events (e.g., `generator-yielded`, `async-awaited`)
- Domain-specific events (e.g., `dom-element-accessed` for browser contexts)

---

## Next Steps

- Map these educational events to Aran instrumentation (implementation milestone)
- Create configuration schema showing how to enable/disable event categories
- Develop visualization guidelines showing how tools should render each event type

See `/4-notional-machines/trace-data-requirements-by-nm.md` for NM-specific event requirements and correlations.
