# Dynamic Analysis in qlcjs

This document explains how qlcjs performs lightweight AST instrumentation for dynamic program analysis to generate execution trace questions.

## Overview: Single-Purpose Dynamic Analysis

**Critical fact**: Only ONE question type uses dynamic execution - `VariableTrace`.

All other questions (`FunctionName`, `ParameterName`, `ParameterValue`, `LoopEnd`, `VariableDeclaration`, `MethodCall`) rely purely on static AST analysis.

## Architecture: Three-Phase Execution

```
┌─────────────────────────────────────────────────────────────┐
│  Phase 1: AST Transformation (transformToRecorded)          │
│  - Walk Shift AST tree recursively                          │
│  - Wrap variable writes with __record() calls               │
│  - Generate instrumented JavaScript code                    │
├─────────────────────────────────────────────────────────────┤
│  Phase 2: Execution (evaluateRecorded)                      │
│  - Define __record() and __record_store in scope            │
│  - Execute instrumented code via new Function()             │
│  - Optionally call target function with test arguments      │
├─────────────────────────────────────────────────────────────┤
│  Phase 3: History Extraction (recordVariableHistory)        │
│  - Return { variables, history, arguments }                 │
│  - history: { "index_name": [val1, val2, ...] }            │
│  - Used by VariableTrace question generator                 │
└─────────────────────────────────────────────────────────────┘
```

## Phase 1: Lightweight AST Instrumentation

### What Gets Instrumented

Located in `src/executor/index.ts:66-160`, the `transformToRecorded()` function instruments four types of variable writes:

1. **Variable Declaration** (`VariableDeclarator`)
   ```javascript
   // Original AST
   let n = 1;

   // Instrumented AST
   let n = __record(0, "n", 1);
   ```

2. **Assignment Expression** (`AssignmentExpression`)
   ```javascript
   // Original
   n = 5;

   // Instrumented
   n = __record(0, "n", 5);
   ```

3. **Compound Assignment** (`CompoundAssignmentExpression`)
   ```javascript
   // Original
   n *= a;

   // Instrumented (unpacked to binary op first)
   n = __record(0, "n", n * a);
   ```

4. **Update Expression** (`UpdateExpression`) - prefix vs postfix handling
   ```javascript
   // Original (prefix)
   ++i;

   // Instrumented
   __record(1, "i", ++i);

   // Original (postfix)
   i++;

   // Instrumented (records old value, evaluates new)
   __record(1, "i", i, ++i);
   // Note: 4th argument means "record this value instead of 3rd"
   ```

### What Gets EXCLUDED

From `src/executor/index.ts:84-85` and `98`:
- **Function expressions** are NOT instrumented
- Function assignments like `const fn = () => {}` are skipped
- Only primitive value assignments are tracked

### The Transformation Mechanism

Uses `src/trees/transform.ts` - a simple recursive AST walker:
```typescript
transform(root, (node: Node): Node => {
  switch (node.type) {
    case 'VariableDeclarator':
      // Check if this variable write should be recorded
      // If yes, wrap with __record() call
      return instrumentedNode;
    // ... other cases
    default:
      return node; // Pass through unchanged
  }
});
```

**Key insight**: This is NOT heavy instrumentation like Aran. It only wraps write operations with recording calls. No control flow tracking, no statement-level hooks, no runtime state management beyond variable values.

## Phase 2: Execution via new Function()

From `src/executor/index.ts:162-180`:

```javascript
evaluateRecorded = (script, functionName?, functionArguments?) => {
  return new Function(`
    __record_store = {};
    __record = (index, name, value, rec) => {
      const key = index + '_' + name;
      __record_store[key] = (__record_store[key] || []).concat(
        rec !== undefined ? rec : value
      );
      return value;  // CRITICAL: return value for assignment chain
    };
    ${script};  // Execute instrumented code
    ${functionName ? `${functionName}(${argstr})` : ''}
    return __record_store;
  `)();
};
```

### The __record() Function

**Signature**: `__record(index, name, value, rec?)`
- `index`: Variable's numeric index (from scope analysis)
- `name`: Variable name (for debugging/keying)
- `value`: The expression result being assigned
- `rec` (optional): For postfix operators - value to record differs from return value

**Behavior**:
1. Build key: `"${index}_${name}"` (e.g., `"0_n"`)
2. Append value to history array (or initialize array if first write)
3. Return `value` unchanged - crucial for assignment chain correctness

### Execution Context

- **Scope**: Global scope via `new Function()` - can access anything in scope
- **Target function call**: Optional - if `functionName` provided, calls it with `functionArguments`
- **Security**: No sandboxing - executes arbitrary code directly

## Phase 3: History Extraction

From `src/executor/index.ts:182-191`:

```typescript
recordVariableHistory = (root, global, functionName?, functionArguments?) => {
  const { script, variables } = transformToRecorded(root, global);
  const history = evaluateRecorded(script, functionName, functionArguments);
  return {
    arguments: functionArguments,
    variables,  // RecordableVariable[] with index, name, writes metadata
    history     // { "0_n": [1, 2, 4, 8], "1_i": [0, 1, 2, 3] }
  };
};
```

**Stored in ProgramModel**: `model.recorded` when `wantsRecordedEvaluation: true`

## Usage: VariableTrace Question Generation

From `src/questions/dynamic.ts:12-84`:

```typescript
variableTrace: QLCPrepararer = ({ input, recorded }) => {
  if (recorded === undefined) return [];

  return recorded.variables
    .filter(({ index, name }) =>
      recorded.history[`${index}_${name}`] !== undefined
    )
    .map(({ index, name }) => () => {
      const vals = recorded.history[`${index}_${name}`];
      return {
        question: `Which is the ordered sequence of values assigned to ${name}?`,
        options: [
          { answer: "0, 1, 2", correct: true },       // Correct trace
          { answer: "0, 1", info: "Missing a value" }, // vals.slice(0, -1)
          { answer: "0, 1, 2, 3", info: "Extra value" }, // vals.concat(next)
          { answer: "1, 2, 0", info: "Wrong order" }  // shuffle(vals)
        ]
      };
    });
};
```

## Comparison to Heavy Instrumentation (e.g., Aran)

| Aspect | qlcjs | Aran Framework |
|--------|-------|----------------|
| **Granularity** | Variable writes only | Every operation + control flow |
| **Instrumentation points** | 4 node types | 20+ advice hooks |
| **State management** | Simple key-value store | Context-threaded state |
| **Performance overhead** | Low - wraps assignments | High - intercepts everything |
| **Use case** | Educational traces | Full dynamic analysis |
| **Async support** | Implicit (JS execution) | Explicit context threading |

## Critical Implementation Details

### Variable Indexing Strategy

From `src/executor/index.ts:67-77`:
```typescript
const variables: RecordableVariable[] = getVariables(global, VariableDeclarations)
  .map((v, i) => ({
    ...v,
    index: i,  // Sequential index for array position
    writes: v.references
      .filter(r => r.accessibility.isWrite)
      .map(({ node }) => node),
    recorded: []  // Populated during transformation
  }));
```

**Scope analysis** from shift-scope provides:
- All variable declarations in scope
- References to each variable (reads vs writes)
- Write accessibility flags

### Compound Assignment Unpacking

From `src/executor/compound.ts:80-86`:
```typescript
// n *= a  →  n = n * a
unpackCompoundExpression(node) {
  return new BinaryExpression({
    left: unpackAssignmentIdentifier(node.binding),  // n
    operator: COMPOUND_TO_BINARY[node.operator],     // *= → *
    right: node.expression                           // a
  });
}
```

**Reason**: Recording needs to capture the computed value, not the compound operator AST node.

### Postfix Operator Edge Case

From `src/executor/index.ts:128-144`:
```typescript
case 'UpdateExpression':
  if (node.isPrefix) {
    // ++i returns new value
    return __record(index, name, ++i);
  } else {
    // i++ returns old value, but we want to record iterations
    return __record(index, name, i, ++i);
    //                          ^   ^-- evaluate this (side effect)
    //                          |------ but record this (old value)
  }
```

**Critical**: For `i++` in loop conditions, we want to record each iteration value (0, 1, 2...), not the post-incremented values.

## Single Source of Truth

All dynamic analysis flows through **one entry point**:
- `src/index.ts:39-46` checks `isEvaluated(templates)`
- If true, calls `recordVariableHistory()`
- Result stored in `model.recorded`
- Only `VariableTrace` accesses this data

**Implication**: Adding new dynamic questions requires:
1. Set `wantsRecordedEvaluation: true` on template
2. Access `recorded` in prepare function
3. No new instrumentation needed - reuses same infrastructure

## Limitations & Design Decisions

1. **No scope filtering**: All variables in scope are instrumented, even if question won't use them
   - Trade-off: Simplicity over performance

2. **No control flow tracking**: Can't answer "which branch was taken?" questions
   - Design choice: Keep instrumentation minimal

3. **Function expressions excluded**: Can't trace closures or callbacks
   - Practical limitation: Would complicate value serialization

4. **Global execution context**: No isolation between test runs
   - Risk: Side effects from one execution could affect another

5. **Array concatenation for history**: Memory inefficient for long traces
   - From `evaluateRecorded`: `(array || []).concat(value)`
   - Could use pre-sized arrays if trace length known

## Example Walkthrough

### Input Code
```javascript
function power(a, b) {
  let n = 1;
  for (let i = 0; i < b; i++) {
    n *= a;
  }
  return n;
}
```

### After Instrumentation
```javascript
function power(a, b) {
  let n = __record(0, "n", 1);
  for (let i = __record(1, "i", 0); i < b; i = __record(1, "i", i, ++i)) {
    n = __record(0, "n", n * a);
  }
  return n;
}
```

### Execution: `power(2, 3)`
```javascript
__record_store = {
  "0_n": [1, 2, 4, 8],      // n: 1 → 2 → 4 → 8
  "1_i": [0, 1, 2]           // i: 0 → 1 → 2 (loop exits at i=3)
};
```

### Generated Question
> Which is the ordered sequence of values assigned to variable *n* while executing *power(2, 3)*?
> - [ ] 1, 2, 4 (missing last value)
> - [x] 1, 2, 4, 8 (correct)
> - [ ] 1, 2, 4, 8, 16 (extra value)
> - [ ] 2, 4, 1, 8 (shuffled)

## Summary

**Yes, it's lightweight Shift tree instrumentation**, but critically:
- **Only wraps writes**, not all operations
- **Only for VariableTrace**, not all dynamic questions (there's only one)
- **Uses existing JS execution**, not custom interpreter
- **Simple key-value recording**, not stateful advice system

This is approximately **5-10% of Aran's complexity** while serving the specific needs of educational variable tracing questions.
