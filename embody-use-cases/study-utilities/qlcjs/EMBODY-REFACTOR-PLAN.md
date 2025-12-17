# qlcjs → Embody Refactor Plan

**Date:** 2025-01-07
**Strategy:** Minimal-change facade pattern
**Approach:** Swap instrumentation implementation, preserve all interfaces

- [Executive Summary](#executive-summary)
  - [Recommendation: Adopt Embody](#recommendation-adopt-embody)
- [Current Instrumentation Implementation](#current-instrumentation-implementation)
  - [File: `src/executor/index.ts` (lines 1-192)](#file-srcexecutorindexts-lines-1-192)
- [Embody API Summary](#embody-api-summary)
- [Migration Path: Current → Embody](#migration-path-current--embody)
  - [High-Level Strategy](#high-level-strategy)
  - [File Changes Overview](#file-changes-overview)
- [Detailed Refactor Tasks](#detailed-refactor-tasks)
  - [Task 1: Install Embody Dependency](#task-1-install-embody-dependency)
  - [Task 2: Create Embody Configuration](#task-2-create-embody-configuration)
  - [Task 3: Create Embody Integration Layer](#task-3-create-embody-integration-layer)
  - [Task 4: Update Main Entry Point](#task-4-update-main-entry-point)
  - [Task 5: Remove Old Instrumentation Files](#task-5-remove-old-instrumentation-files)
  - [Task 6: Update Type Exports](#task-6-update-type-exports)
  - [Task 7: Update README - Architecture Overview](#task-7-update-readme---architecture-overview)
  - [Task 8: Update README - Technical Details](#task-8-update-readme---technical-details)
  - [Task 10: Update CHANGELOG](#task-10-update-changelog)
- [Verification Checklist](#verification-checklist)
- [Rollback Plan](#rollback-plan)
- [Success Criteria](#success-criteria)
- [Next Steps After Refactor](#next-steps-after-refactor)
- [Notes](#notes)

---

## Executive Summary

### Recommendation: Adopt Embody

**Trade-offs:**

| Aspect             | With Embody                               | Without Embody                                   |
| ------------------ | ----------------------------------------- | ------------------------------------------------ |
| **Maintenance**    | Experts maintain instrumentation upstream | qlcjs team maintains growing instrumentation     |
| **Development**    | Configure events, transform to questions  | Implement AST instrumentation per feature        |
| **Bug Risk**       | Low (comprehensive edge case handling)    | High (hoisting, TDZ, closures, async complexity) |
| **Team Expertise** | Use API, understand events                | Deep PL knowledge (Aran, AST, JS semantics)      |
| **Extensibility**  | Add question types via config             | Add question types via new instrumentation       |
| **Ecosystem**      | Study Lenses integration, shared format   | Isolated, qlcjs-specific implementation          |

**Key insight:** For non-PL-expert team building growing educational platform, embody shifts complex instrumentation responsibility from "our problem" to "npm dependency."

---

## Current Instrumentation Implementation

### File: `src/executor/index.ts` (lines 1-192)

**Architecture:**

```
Source code → Shift AST → Custom transformation → Instrumented code → Eval → History
```

**What it does:**

1. **`transformToRecorded(tree, scope)`** (lines 66-160)
   - Walks Shift AST recursively via `transform()` helper
   - Wraps 4 node types with `__record(index, name, value)` calls:
     - `VariableDeclarator` (lines 80-94): `let n = 1` → `let n = __record(0, "n", 1)`
     - `AssignmentExpression` (lines 95-112): `n = 2` → `n = __record(0, "n", 2)`
     - `CompoundAssignmentExpression` (lines 113-127): `n += 5` → `n = __record(0, "n", n + 5)`
     - `UpdateExpression` (lines 128-147): `i++` → `__record(1, "i", i, ++i)` (postfix handling)
   - Excludes function expressions (lines 84, 98)
   - Returns `{ tree, script, variables }`

2. **`evaluateRecorded(script, functionName, args)`** (lines 162-180)
   - Injects `__record()` and `__record_store` into global scope
   - Executes instrumented code via `new Function()`
   - Optionally calls target function with arguments
   - Returns `__record_store` object: `{ "index_name": [values] }`

3. **`recordVariableHistory(tree, scope, functionName, args)`** (lines 182-191)
   - Orchestrates transformation + execution
   - Returns format expected by question generators:
     ```typescript
     {
       arguments: SimpleValue[],
       variables: RecordableVariable[],  // { index, name, writes, recorded }
       history: { "0_n": [1, 2, 4, 8], "1_i": [0, 1, 2] }
     }
     ```

**Dependencies:**

- `src/executor/compound.ts` - Unpacks `CompoundAssignmentExpression` to `BinaryExpression`
- `src/trees/transform.ts` - Recursive AST walker
- `src/trees/transformChildren.ts` - Child node traversal
- `shift-codegen` - Generates JavaScript from transformed AST
- `shift-scope` - Provides scope analysis and variable references

**Integration point:**

- Called from `src/index.ts:40-46` in `createProgramModel()`
- Data flows to `src/questions/dynamic.ts` for question generation

---

## Embody API Summary

**Core function:**

```typescript
embody(code: string, config: EmbodyConfig, options?: ExecutionOptions): TraceEvent[]
```

**Configuration structure:**

```typescript
{
  preset: 'overview' | 'detailed' | 'exhaustive',  // Base configuration level
  variables: {
    declare: { var, let, const, function, implicit },  // Declaration types to track
    assign: boolean,                                    // Track assignments
    read: boolean,                                      // Track reads
    filter: string[]                                    // Variable name filter
  },
  functions: { calls, returns, declarations, ... },
  controlFlow: { conditionals, loops, switches, ... },
  operators: { computing, selecting, mutating, ... },
  scopes: { closures, ... },
  async: { timers, promises, await, ... },
  // ... more options
}
```

**Output format:**

```typescript
type TraceEvent = VariableEvent | FunctionEvent | ControlFlowEvent | ...;

interface VariableEvent {
  type: 'variable';
  subtype: 'declare' | 'write' | 'read';
  timestamp: number;
  metadata: {
    variableName: string;
    variableIndex?: number;
    scopeId: string;
    // ... more metadata
  };
  values: {
    value: any;           // The actual value
    // ... more value info
  };
}
```

**Key characteristics:**

- **Neutral data:** Reports what happened, no pedagogical interpretation
- **Comprehensive:** All execution events, filterable by config
- **Metadata-rich:** Timing, scope, context available
- **Type-safe:** TypeScript definitions for events and config

**Note:** Embody's config structure and event types are still under active development. Expect API changes as the library matures. This refactor uses the conceptual API; actual implementation may differ in details.

---

## Migration Path: Current → Embody

### High-Level Strategy

**Facade Pattern:** Replace implementation, preserve interface

```
BEFORE:
  Source → AST → transform() → instrumented code → eval → history format

AFTER:
  Source → embody() → TraceEvent[] → transform to history format → same output
```

**Why this works:**

- Question generators expect specific format: `{ arguments, variables, history }`
- Embody provides raw events: `TraceEvent[]`
- New integration layer transforms events → existing format
- Zero changes needed outside instrumentation

### File Changes Overview

| File                             | Change Type   | Description                                         |
| -------------------------------- | ------------- | --------------------------------------------------- |
| `src/embody-integration.ts`      | **NEW**       | Embody wrapper + event transformation               |
| `src/index.ts`                   | **MODIFY**    | Line 40-46: Pass `source` instead of `tree, scope`  |
| `src/executor/index.ts`          | **DELETE**    | Remove old instrumentation (lines 1-192)            |
| `src/executor/compound.ts`       | **DELETE**    | No longer needed (embody handles)                   |
| `src/trees/transform.ts`         | **DELETE**    | No longer needed                                    |
| `src/trees/transformChildren.ts` | **DELETE**    | No longer needed                                    |
| `package.json`                   | **MODIFY**    | Add `@study-lenses/embody`, remove `shift-codegen`  |
| `README.md`                      | **MODIFY**    | Add architecture section on embody integration      |
| All other files                  | **UNCHANGED** | Questions, types, analysis, helpers - all preserved |

---

## Detailed Refactor Tasks

### Task 1: Install Embody Dependency

**File:** `package.json`

**Action:** Add embody dependency

```json
"dependencies": {
  "@study-lenses/embody": "^1.0.0",
  "shift-ast": "^6.1.0",
  "shift-parser": "^7.0.3",
  "shift-scope": "^5.0.0"
  // Remove "shift-codegen": "^7.0.3" (no longer needed)
}
```

**Verification:**

```bash
npm install
npm list @study-lenses/embody  # Confirm installed
```

---

### Task 2: Create Embody Configuration

**File:** `src/embody-config.ts` (NEW)

**Content:**

```typescript
import { EmbodyConfig } from '@study-lenses/embody';

/**
 * qlcjs configuration for embody execution tracing.
 *
 * Focuses on variable tracking for current VariableTrace question type.
 * Future question types will extend this configuration.
 */
export const qlcjsTraceConfig: EmbodyConfig = {
  preset: 'detailed',

  // Track variable operations (critical for VariableTrace)
  variables: {
    declare: {
      var: true,
      let: true,
      const: true,
      function: false, // Excluded per original implementation
      implicit: false
    },
    assign: true, // Track assignments
    read: false // Not needed for VariableTrace (could enable later)
  },

  // Disable other features (enable as new question types require)
  functions: false,
  controlFlow: false,
  operators: false,
  scopes: false,
  async: false,
  errors: false
};

// Example future configs (commented out for now):
// export const functionTraceConfig: EmbodyConfig = {
//   ...qlcjsTraceConfig,
//   functions: { calls: true, returns: true }
// };
```

**Lines:** ~40 lines

---

### Task 3: Create Embody Integration Layer

**File:** `src/embody-integration.ts` (NEW)

**Purpose:** Transform embody TraceEvents → qlcjs format

**Content:**

```typescript
import { embody, TraceEvent } from '@study-lenses/embody';
import { qlcjsTraceConfig } from './embody-config';
import { SimpleValue } from './helpers/simpleValues';

/**
 * qlcjs format for recorded execution data.
 * Maintains backward compatibility with existing question generators.
 */
export interface RecordableVariable {
  index: number;
  name: string;
  writes: any[]; // Original AST nodes (not used post-embody, kept for compatibility)
  recorded: any[]; // Original recorded nodes (not used post-embody, kept for compatibility)
}

export interface RecordedHistory {
  arguments?: SimpleValue[];
  variables: RecordableVariable[];
  history: { [key: string]: SimpleValue[] };
}

/**
 * Records variable history using embody execution tracing.
 *
 * This is the main integration point between qlcjs and embody.
 * Maintains the same interface as the original recordVariableHistory()
 * so that no other files need to change.
 *
 * @param source - JavaScript source code
 * @param functionName - Optional function to execute during tracing
 * @param functionArguments - Optional arguments to pass to function
 * @returns RecordedHistory in qlcjs format
 */
export function recordVariableHistory(
  source: string,
  functionName?: string,
  functionArguments?: SimpleValue[]
): RecordedHistory {
  // Execute code with embody tracing
  const trace = embody(source, qlcjsTraceConfig, {
    execute: functionName
      ? {
          function: functionName,
          arguments: functionArguments
        }
      : undefined
  });

  // Transform embody events to qlcjs format
  return {
    arguments: functionArguments,
    variables: extractVariables(trace),
    history: buildHistory(trace)
  };
}

/**
 * Extract unique variables from trace events.
 * Builds the variables array expected by question generators.
 */
function extractVariables(trace: TraceEvent[]): RecordableVariable[] {
  // Filter to variable declaration events
  const declareEvents = trace.filter(e => e.type === 'variable' && e.subtype === 'declare');

  // Build unique variable list with indices
  const uniqueVars = new Map<string, RecordableVariable>();
  declareEvents.forEach((event, globalIndex) => {
    const varName = event.metadata.variableName;
    if (!uniqueVars.has(varName)) {
      uniqueVars.set(varName, {
        index: globalIndex,
        name: varName,
        writes: [], // Not used post-embody, kept for compatibility
        recorded: [] // Not used post-embody, kept for compatibility
      });
    }
  });

  return Array.from(uniqueVars.values());
}

/**
 * Build variable history from trace events.
 *
 * Converts embody's event stream into qlcjs's history format:
 * { "index_name": [value1, value2, value3, ...] }
 *
 * This format is expected by the VariableTrace question generator.
 */
function buildHistory(trace: TraceEvent[]): { [key: string]: SimpleValue[] } {
  const history: { [key: string]: SimpleValue[] } = {};

  // Filter to variable write events (declare + assign)
  const writeEvents = trace.filter(
    e => e.type === 'variable' && (e.subtype === 'declare' || e.subtype === 'write')
  );

  // Group by variable and build value arrays
  writeEvents.forEach(event => {
    const varName = event.metadata.variableName;
    const varIndex = event.metadata.variableIndex ?? 0;
    const key = `${varIndex}_${varName}`;

    if (!history[key]) {
      history[key] = [];
    }

    // Extract value from event
    const value = event.values?.value;
    if (value !== undefined) {
      history[key].push(value as SimpleValue);
    }
  });

  return history;
}
```

**Lines:** ~130 lines

**Key design decisions:**

- **Facade pattern:** Same interface as old `recordVariableHistory()`, different implementation
- **Transformation logic:** Embody events → qlcjs format happens here, isolated
- **Compatibility fields:** `writes` and `recorded` arrays kept empty but present (in case any code checks for them)
- **Clear boundary:** Embody provides neutral data, this layer adds qlcjs-specific structure

---

### Task 4: Update Main Entry Point

**File:** `src/index.ts`

**Location:** Lines 40-46 in `createProgramModel()`

**Change:**

```typescript
// BEFORE:
import { recordVariableHistory } from './executor';

export const createProgramModel = (
  source: string,
  input?: ProgramInput,
  getFunctions?: boolean,
  recordEvaluation?: boolean
): ProgramModel => {
  const { tree, locations, comments } = parseScriptWithLocation(source);
  const scope = analyze(tree);
  return {
    tree,
    locations,
    comments,
    scope,
    input,
    functions: getFunctions ? getFunctionsWithVariables(scope, tree) : undefined,
    recorded: recordEvaluation
      ? recordVariableHistory(
          tree, // OLD: AST tree
          scope, // OLD: scope analysis
          input?.functionName,
          pickOne(input?.arguments || [])
        )
      : undefined
  };
};
```

```typescript
// AFTER:
import { recordVariableHistory } from './embody-integration'; // Changed import

export const createProgramModel = (
  source: string,
  input?: ProgramInput,
  getFunctions?: boolean,
  recordEvaluation?: boolean
): ProgramModel => {
  const { tree, locations, comments } = parseScriptWithLocation(source);
  const scope = analyze(tree);
  return {
    tree,
    locations,
    comments,
    scope,
    input,
    functions: getFunctions ? getFunctionsWithVariables(scope, tree) : undefined,
    recorded: recordEvaluation
      ? recordVariableHistory(
          source, // NEW: source code string
          input?.functionName,
          pickOne(input?.arguments || [])
        )
      : undefined
  };
};
```

**Specific changes:**

- Line 1: Change import from `'./executor'` to `'./embody-integration'`
- Line 40-46: Change `recordVariableHistory(tree, scope, ...)` to `recordVariableHistory(source, ...)`

**Impact:** This is the ONLY change outside the instrumentation layer. Everything else stays the same.

---

### Task 5: Remove Old Instrumentation Files

**Files to delete:**

- `src/executor/index.ts` (entire file, 192 lines)
- `src/executor/compound.ts` (entire file, 96 lines)
- `src/trees/transform.ts` (entire file, 19 lines)
- `src/trees/transformChildren.ts` (entire file, implementation)

**Verification after deletion:**

```bash
# These should show no results (except the new embody-integration.ts):
grep -r "transformToRecorded" src/
grep -r "evaluateRecorded" src/
grep -r "unpackCompoundExpression" src/
grep -r "from.*transform" src/

# This should work (embody-integration provides recordVariableHistory):
npm run build
```

**Note:** If `src/executor/` directory has no other files, delete the directory too.

---

### Task 6: Update Type Exports

**File:** `src/index.ts` (top-level exports)

**Check:** Ensure `RecordableVariable` is still exported if needed elsewhere

**Current exports (lines 17-20):**

```typescript
export { QLC, QLCType, QLCPrepared, ProgramInput, ProgramModel } from './types';
export { SimpleValue } from './helpers/simpleValues';
export { qlcToText, qlcsToText } from './format';
export { transformToRecorded, evaluateRecorded } from './executor';
```

**After refactor:**

```typescript
export { QLC, QLCType, QLCPrepared, ProgramInput, ProgramModel } from './types';
export { SimpleValue } from './helpers/simpleValues';
export { qlcToText, qlcsToText } from './format';
// Remove executor exports (no longer exist)
// embody-integration.ts exports are internal, not part of public API
```

**Check if anyone imports `transformToRecorded` or `evaluateRecorded`:**

```bash
grep -r "import.*transformToRecorded" .
grep -r "import.*evaluateRecorded" .
```

If no external usage, safe to remove exports.

---

### Task 7: Update README - Architecture Overview

**File:** `README.md`

**Location:** After "Usage" section, before "References"

**Add new section:**

```markdown
---

## Architecture: Neutral Infrastructure + Pedagogical Logic

qlcjs demonstrates a clear boundary between execution infrastructure and educational assessment:

### Embody's Responsibility: Neutral Execution Data

Embody provides comprehensive, interpretation-free execution traces:

- **Variable operations:** Declarations, assignments, reads
- **Function events:** Calls, returns, yields
- **Control flow:** Conditionals, loops, branches taken
- **Metadata:** Timing, scope, context

Embody doesn't know or care about questions—it faithfully reports what happened during execution.

### qlcjs's Responsibility: Pedagogical Transformation

qlcjs transforms neutral traces into educationally meaningful questions:

**VariableTrace:** Filters to write events → analyzes value sequences → generates questions about variable state progression

**FunctionCallSequence** (future): Filters to call events → builds execution order → generates questions about call stack

**ConditionalBranchTaken** (future): Filters to branch events → determines path taken → generates questions about control flow

### Why This Separation Matters

1. **Embody optimization** doesn't require qlcjs changes
2. **New question types** don't require embody changes
3. **Clear testing boundaries:** Infrastructure tests separate from pedagogy tests
4. **Reusable traces:** Multiple educational tools can consume same embody output
5. **Expertise separation:** PL experts maintain instrumentation, educators maintain questions

### Reference Implementation

This refactor serves as a reference for consuming embody in educational tools:

1. Configure embody for needed events (`src/embody-config.ts`)
2. Transform events to tool-specific format (`src/embody-integration.ts`)
3. Build pedagogical logic on transformed data (`src/questions/`)

See `src/embody-integration.ts` for the integration pattern.

**Note:** Embody's configuration structure and event types are under active development. Expect API refinements as the library matures.
```

---

### Task 8: Update README - Technical Details

**File:** `README.md`

**Location:** In existing "Usage" section after the API examples

**Add subsection:**

````markdown
### Dynamic Analysis with Embody

Questions about execution behavior use [@study-lenses/embody](https://github.com/study-lenses/embody) for instrumentation:

```typescript
import { generate } from '@teemulehtinen/qlcjs';

// Code with execution-dependent behavior
const code = `
  function fibonacci(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
      [a, b] = [b, a + b];
    }
    return b;
  }
`;

// Generate questions about variable state during execution
const questions = generate(code, [{ count: 2, types: ['VariableTrace'] }], {
  functionName: 'fibonacci',
  arguments: [[5]]
});

// Questions will ask about the sequence of values assigned to variables
// during execution of fibonacci(5)
```
````

**How it works:**

1. Embody instruments and executes the code, producing a trace of all variable operations
2. `src/embody-integration.ts` transforms events into qlcjs format: `{ "index_name": [values] }`
3. Question generators in `src/questions/dynamic.ts` create assessment items from the trace

**Why embody:**

- Maintained by PL experts (handles JS edge cases: hoisting, TDZ, closures, async)
- Configurable granularity (enable only needed events)
- Production-tested by Study Lenses ecosystem
- Extensible for future question types without qlcjs instrumentation changes

````

---

### Task 9: Update Tests

**File:** `test/index.ts` (main test file)

**Changes needed:** Likely NONE if tests use public API

**Verification:**
```bash
npm test
````

**If tests fail:**

- Check if any tests directly import from `executor/` (update to `embody-integration` if needed)
- Check if any tests mock instrumentation internals (may need to update mocks)
- Check if any tests verify specific AST transformation behavior (may need to change to verify output format instead)

**Most likely scenario:** Tests pass without changes because they test question generation API, not instrumentation internals.

---

### Task 10: Update CHANGELOG

**File:** `CHANGELOG.md` (create if doesn't exist)

**Add entry:**

```markdown
## [2.0.0] - YYYY-MM-DD

### Changed

- **BREAKING (internal):** Replaced custom AST instrumentation with @study-lenses/embody
  - `recordVariableHistory()` now takes source code string instead of AST tree + scope
  - Public API unchanged: question generation interface identical
  - Improved edge case handling (hoisting, TDZ, closures, async)

### Added

- Embody integration for robust, expert-maintained execution tracing
- Configuration system for future dynamic question types
- Architecture documentation explaining infrastructure/pedagogy boundary

### Removed

- Custom AST transformation code (`src/executor/`, `src/trees/transform*`)
- `shift-codegen` dependency (embody handles code generation internally)
- `transformToRecorded` and `evaluateRecorded` exports (internal implementation details)

### Migration Guide

**For library users:** No changes needed. Question generation API is identical.

**For contributors:**

- Dynamic question types now use embody events instead of custom instrumentation
- See `src/embody-integration.ts` for transformation pattern
- See README "Architecture" section for design philosophy

### Technical Notes

- Embody's API is under development; expect refinements in future releases
- Current implementation uses facade pattern for backward compatibility
- Performance characteristics similar to previous implementation
```

---

## Verification Checklist

After completing all tasks, verify:

- [ ] `npm install` succeeds
- [ ] `npm run build` succeeds
- [ ] `npm run types` succeeds (TypeScript type checking)
- [ ] `npm test` succeeds (all tests pass)
- [ ] Generated questions match previous output format
- [ ] Example from README works correctly
- [ ] No orphaned imports referencing deleted files
- [ ] README accurately describes new architecture
- [ ] CHANGELOG documents breaking changes

**Test command for comprehensive verification:**

```bash
npm install && npm run types && npm test && npm run build
```

---

## Rollback Plan

If issues discovered after deployment:

**Option 1: Quick patch**

- Fix integration layer bugs in `src/embody-integration.ts`
- Issue patch release (2.0.1)

**Option 2: Revert to previous version**

```bash
git revert <merge-commit>
npm version 1.x.y
npm publish
```

**Option 3: Maintain compatibility branch**

- Keep 1.x branch with old instrumentation
- Parallel development until embody proven stable

---

## Success Criteria

**Must achieve:**

- All existing tests pass
- Question generation output identical to previous version
- No breaking changes to public API
- Build succeeds without errors

**Should achieve:**

- Clearer codebase (fewer files, clearer separation)
- Easier to add new question types (demonstrated in README)
- Better documentation of architecture decisions

**Nice to have:**

- Performance equal or better
- Community interest in embody pattern
- Other Study Lenses tools adopt similar pattern

---

## Next Steps After Refactor

1. **Add test for embody integration specifically** (`test/embody-integration.test.ts`)
2. **Consider adding second dynamic question type** to validate extensibility (e.g., FunctionCallSequence)
3. **Contribute findings back to embody** (use cases, API feedback)
4. **Document in Study Lenses ecosystem** as reference implementation

---

## Notes

- **Minimal disruption:** Only 2 files change outside new integration layer
- **Backward compatible:** Question generators unchanged
- **Clear boundaries:** Embody = execution, qlcjs = education
- **Reference pattern:** Other tools can follow this integration approach
- **Embody API stability:** Config/events under development, expect changes

This refactor positions qlcjs as both a better-maintained tool (offloading instrumentation complexity) and a reference implementation (demonstrating embody integration for educational tools).
