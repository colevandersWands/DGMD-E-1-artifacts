# Creation vs. Execution Phase Model

**Category**: Foundation (Pre-Runtime vs Runtime)

**Complexity**: ★★★☆☆ (Intermediate - conceptually tricky, critical for understanding timing)

**What It Models**: The distinction between parse-time (creation phase) and run-time (execution phase) in JavaScript, explaining hoisting, TDZ, module loading, and when different errors occur.

---

## Key Concepts

### 1. Two-Phase Processing

**Creation Phase** (Parse Time):
- JavaScript parser reads entire script/module
- Creates execution contexts (global, function, module)
- Registers variable and function declarations
- Does NOT execute code or assign values

**Execution Phase** (Run Time):
- Code executes top-to-bottom
- Variable assignments happen
- Function calls execute
- Expressions evaluate

**Key Insight**: Understanding this distinction explains why certain code "works" despite appearing out of order.

---

### 2. Hoisting Behavior

**Function Declarations**:
```javascript
greet(); // Works! Function available in creation phase

function greet() {
  console.log('Hello');
}
```

**Creation Phase**: `greet` function registered in environment
**Execution Phase**: `greet()` call finds registered function

---

**Var Declarations**:
```javascript
console.log(x); // undefined (not ReferenceError!)
var x = 5;
console.log(x); // 5
```

**Creation Phase**: `x` declared, initialized to `undefined`
**Execution Phase**:
- Line 1: `x` exists (undefined)
- Line 2: `x` assigned 5
- Line 3: `x` is 5

**Common Misconception**: "JavaScript moves `var x` to the top"
**Reality**: Parser registers `x` during creation, but assignment stays at original line

---

**Let/Const Temporal Dead Zone (TDZ)**:
```javascript
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;
```

**Creation Phase**: `y` declared but NOT initialized (TDZ begins)
**Execution Phase**:
- Line 1: `y` exists but in TDZ → ReferenceError
- Line 2: `y` initialized to 10 (TDZ ends)

**Key Difference**: `let`/`const` are hoisted but NOT initialized, creating TDZ. `var` is hoisted AND initialized to `undefined`.

---

### 3. Function Expressions vs Declarations

**Function Declaration** (Hoisted):
```javascript
sayHi(); // Works

function sayHi() {
  console.log('Hi');
}
```

**Function Expression** (Not Hoisted):
```javascript
sayBye(); // TypeError: sayBye is not a function

var sayBye = function() {
  console.log('Bye');
};
```

**Why**:
- Creation Phase: `sayBye` variable declared (initialized to `undefined`)
- Execution Phase Line 1: `sayBye` is `undefined`, calling it throws TypeError
- Execution Phase Line 3: `sayBye` assigned function

With `const`/`let`:
```javascript
sayBye(); // ReferenceError: Cannot access before initialization

const sayBye = function() {
  console.log('Bye');
};
```

**TDZ**: `sayBye` declared but not initialized → ReferenceError

---

### 4. Module Import Hoisting

**ES Modules**:
```javascript
greet(); // Works! Import processed in creation phase

import { greet } from './utils.js';
```

**Creation Phase**: All imports resolved and bindings created
**Execution Phase**: `greet()` call uses pre-loaded binding

**Import vs Require**:
```javascript
greet(); // ReferenceError: greet is not defined

const { greet } = require('./utils.js');
```

**CommonJS `require`**: Executes at runtime, not creation phase
**Line 1**: `greet` doesn't exist yet → error
**Line 3**: `require` executes, `greet` assigned

---

### 5. Error Types by Phase

**SyntaxError** (Creation Phase):
```javascript
let x = ;  // SyntaxError: Unexpected token
// Code never runs - fails during parsing
```

**ReferenceError** (Execution Phase - TDZ or Undeclared):
```javascript
console.log(y); // ReferenceError: y is not defined (never declared)

console.log(z); // ReferenceError: Cannot access before initialization
let z = 5;      // (declared but in TDZ)
```

**TypeError** (Execution Phase - Wrong Operation):
```javascript
var fn = undefined;
fn(); // TypeError: fn is not a function (wrong type at runtime)
```

**Key Distinction**:
- **SyntaxError**: Code never executes (parse failure)
- **ReferenceError**: Code executes, but variable access fails
- **TypeError**: Code executes, variable exists, but wrong type

---

## Common Misconceptions

### Misconception 1: "Hoisting moves code to the top"

**Wrong Mental Model**: JavaScript physically moves declarations upward

**Correct Model**: Parser registers declarations in creation phase, code stays in place

**Why This Matters**: Students write code expecting textual reordering rather than understanding environment setup

**Example**:
```javascript
console.log(a); // undefined (not moved, just registered)
var a = 5;
console.log(a); // 5 (assignment still at line 2)
```

---

### Misconception 2: "let and const are not hoisted"

**Wrong Mental Model**: Only `var` hoists, `let`/`const` don't

**Correct Model**: All declarations hoist, but `let`/`const` aren't initialized (TDZ)

**Why This Matters**: Explains ReferenceError vs `undefined` behavior

**Example**:
```javascript
{
  console.log(x); // undefined (var hoisted + initialized)
  var x = 1;
}

{
  console.log(y); // ReferenceError (let hoisted but TDZ)
  let y = 2;
}
```

---

### Misconception 3: "JavaScript runs code twice"

**Wrong Mental Model**: Parser executes code once to find declarations, then again for real

**Correct Model**: Single creation pass (no execution), then execution pass

**Why This Matters**: Students think code has side effects during parsing

**Example**:
```javascript
console.log('Start'); // Only prints once, during execution

function setup() {
  console.log('Setup'); // Doesn't run during creation phase
}

setup(); // Runs here, during execution
```

---

### Misconception 4: "Function expressions are not hoisted"

**Wrong Mental Model**: Function expressions have no hoisting at all

**Correct Model**: Variable name hoists (if `var`), but function value assigned at execution

**Why This Matters**: Explains TypeError vs ReferenceError

**Example**:
```javascript
greet(); // TypeError: greet is not a function (not "is not defined")

var greet = function() {
  console.log('Hi');
};
```

**Creation Phase**: `greet` variable declared, initialized to `undefined`
**Execution Line 1**: `greet` is `undefined`, calling throws TypeError

---

## Pedagogical Value by Learner Level

### Beginners (First 4 weeks)
**Value**: ★★☆☆☆ (Low - too abstract initially)

**Recommendation**: Avoid explicit teaching of phases. Show simple top-to-bottom execution.

**When to introduce**: After students comfortable with variables and functions (week 3-4), show hoisting as "surprising behavior"

**Simple Example**:
```javascript
console.log(x); // undefined - weird but works
var x = 5;
```

Say: "JavaScript sets up variables before running code" (avoid "creation phase" jargon)

---

### Intermediate (Weeks 5-12)
**Value**: ★★★★☆ (High - explains many confusing behaviors)

**Recommendation**: Explicitly teach creation vs execution phases when introducing `let`/`const`

**Key Lesson**: Contrast `var` (initialized) vs `let`/`const` (TDZ)

**Teaching Sequence**:
1. Review `var` hoisting (already seen)
2. Introduce `let`/`const` TDZ behavior
3. Explain creation phase (environment setup) vs execution phase (code runs)
4. Show function declaration vs expression hoisting
5. Practice: Predict output of hoisting examples

**Assessment**:
```javascript
// Can student predict output?
foo(); // ?
bar(); // ?

function foo() { console.log('foo'); }
var bar = function() { console.log('bar'); };
```

**Correct Answer**: `foo` prints, `bar` throws TypeError

---

### Advanced (Weeks 13+)
**Value**: ★★★★★ (Essential - foundation for modules, optimization, transpilation)

**Recommendation**: Deep dive into creation phase mechanics

**Advanced Topics**:
- Module import hoisting and circular dependencies
- Why ES6 imports are statically analyzable (creation phase)
- CommonJS vs ES6 module timing
- Optimization: JIT compilation uses creation phase info
- Transpilation: How Babel handles hoisting
- Execution context creation (formal spec)

**Example - Circular Dependencies**:
```javascript
// a.js
import { b } from './b.js';
export const a = () => b();

// b.js
import { a } from './a.js';
export const b = () => console.log('b');
```

**Why This Works**: Creation phase resolves both imports before execution

---

## Connections to Other Notional Machines

### Memory Model
**Connection**: Creation phase allocates memory for variables

**Example**:
```javascript
var x; // Memory allocated during creation, value: undefined
x = 5; // Memory updated during execution
```

**Integration**: Memory Model shows WHERE values stored, Creation/Execution shows WHEN they're stored

---

### Scope Chain Model
**Connection**: Scope chains created during creation phase

**Example**:
```javascript
function outer() {
  var x = 1;
  function inner() {
    console.log(x); // Scope chain established at creation
  }
  return inner;
}
```

**Integration**: Creation phase links scopes, execution phase uses them

---

### Call Stack Model
**Connection**: Function availability determined in creation phase, calls happen in execution phase

**Example**:
```javascript
foo(); // Call during execution

function foo() {} // Available from creation phase
```

**Integration**: Creation makes function callable, Call Stack shows execution

---

### Event Loop Model
**Connection**: Module loading and parsing (creation phase) blocks event loop

**Example**:
```javascript
// long-module.js (10MB)
import './long-module.js'; // Blocks until parsed
console.log('After import'); // Doesn't print until creation complete
```

**Integration**: Creation phase is synchronous (blocking), execution can be async

---

## Visualization Needs

### For Beginners
**Show**:
- Two-column view: "Before Running" (creation) and "During Running" (execution)
- Highlight which variables exist vs which have values

**Example Display**:
```
Creation Phase:        Execution Phase (Line 1):
┌────────────────┐     ┌────────────────┐
│ x: undefined   │     │ x: undefined   │ ← prints this
└────────────────┘     └────────────────┘

Execution Phase (Line 2):
┌────────────────┐
│ x: 5           │
└────────────────┘
```

---

### For Intermediate
**Show**:
- TDZ visualization (variable exists but inaccessible)
- Side-by-side function declaration vs expression

**Example Display**:
```
Creation Phase:
┌─────────────────────┐
│ x: TDZ              │ ← In temporal dead zone
│ y: undefined        │ ← var initialized
│ foo: function {...} │ ← Declaration available
│ bar: undefined      │ ← Expression not yet
└─────────────────────┘

Execution Line 1: Access x → ReferenceError (TDZ)
Execution Line 2: Access y → undefined (ok)
```

---

### For Advanced
**Show**:
- Execution context creation stack
- Module dependency graph with creation-phase resolution
- Scope chain links established at creation

---

## Teaching Strategies

### Strategy 1: Prediction-Observation-Explanation (POE)

**Predict**:
```javascript
console.log(a);
var a = 5;
```

Ask: "What will print? Error? undefined? 5?"

**Observe**: Run code, see `undefined`

**Explain**: Creation phase sets up `a` (undefined), execution phase logs then assigns

---

### Strategy 2: Contrast Examples

Show pairs:
```javascript
// Pair 1: var vs let
console.log(x); var x = 5;   // undefined
console.log(y); let y = 5;   // ReferenceError

// Pair 2: Declaration vs Expression
foo(); function foo() {}     // Works
bar(); var bar = function() {}; // TypeError
```

Ask: "Why do these behave differently?"

---

### Strategy 3: Timeline Visualization

Draw timeline:
```
Time →
[Creation Phase: scan code, register declarations]
              ↓
[Execution Phase: run line by line]
```

Mark which operations happen when

---

### Strategy 4: Misconception Confrontation

**Setup**: "Many students think JavaScript moves code. Let's test that."

**Code**:
```javascript
console.log('Does this print during creation?');
var x = 5;
```

**Question**: "If hoisting moved code, would the console.log run twice?"

**Observation**: Only prints once

**Conclusion**: No code execution during creation phase

---

## Tool Implementation Needs

### Beginner Tool Requirements
1. **Two-phase toggle**: Show "setup" (creation) vs "running" (execution)
2. **Highlight TDZ**: Gray out variables in dead zone
3. **Timeline**: Show which phase currently in

---

### Intermediate Tool Requirements
4. **Phase transition animation**: Smooth transition from creation → execution
5. **Error type indicators**: Show why ReferenceError (TDZ) vs TypeError (wrong type)
6. **Function availability markers**: Visual difference between declared and expressed functions

---

### Advanced Tool Requirements
7. **Module loading sequence**: Show import resolution order
8. **Execution context stack**: Display creation-phase context setup
9. **Optimization hints**: Show what JIT compiler knows from creation phase

---

## Assessment Examples

### Beginner Assessment
```javascript
console.log(a);
var a = 10;
console.log(a);
```

**Question**: What prints? (Choose: "error, 10" or "undefined, 10" or "10, 10")

**Correct**: `undefined, 10`

**Tests**: Basic hoisting understanding

---

### Intermediate Assessment
```javascript
foo();
bar();

function foo() { console.log('foo'); }
const bar = () => console.log('bar');
```

**Question**: What happens? (Describe errors if any)

**Correct**: `foo` prints, `bar` throws ReferenceError (TDZ)

**Tests**: Function declaration vs expression + TDZ

---

### Advanced Assessment
```javascript
// file1.js
export const getValue = () => {
  return data.value;
};

import { data } from './file2.js';

// file2.js
export const data = { value: 42 };
```

**Question**: Does this work? Why or why not?

**Correct**: Yes - creation phase resolves imports before execution

**Tests**: Module loading and creation phase sequencing

---

## Trace Data Requirements

### Essential Events

To visualize and teach the Creation/Execution Phase Model, educational tools need these trace events:

#### Variable Declarations
```javascript
{
  type: "variable-declared",
  variableName: "x",
  kind: "var",                      // "var" | "let" | "const" | "function"
  initialValue: undefined,          // var: undefined, let/const: <TDZ>
  isInTDZ: false,                   // true for let/const before initialization
  isFunctionScoped: true,           // var: true, let/const: false
  scopeId: "global",
  sourceLocation: { file: "main.js", line: 1, column: 5 }
}
```

#### Variable Initialization (TDZ End)
```javascript
{
  type: "variable-initialized",
  variableName: "y",
  initialValue: 10,
  scopeId: "block-123",
  sourceLocation: { file: "main.js", line: 3, column: 6 }
}
```

#### TDZ Access Attempts
```javascript
{
  type: "variable-in-tdz-accessed",
  variableName: "y",
  scopeId: "block-123",
  willThrowReferenceError: true,
  sourceLocation: { file: "main.js", line: 2, column: 13 }
}
```

#### Function Availability
```javascript
{
  type: "function-called",
  functionName: "greet",
  callStack: ["main", "greet"],
  sourceLocation: { file: "main.js", line: 1, column: 1 }
}
```

#### Module Loading
```javascript
{
  type: "module-loaded",
  modulePath: "./utils.js",
  exports: ["add", "subtract"],
  imports: [{ from: "./math.js", imported: ["multiply"] }],
  scopeId: "module-123"
}

{
  type: "import-resolved",
  importedName: "multiply",
  fromModule: "./math.js",
  boundTo: "multiply",
  sourceLocation: { file: "utils.js", line: 1, column: 1 }
}
```

#### Error Type Distinction
```javascript
{
  type: "exception-thrown",
  errorType: "SyntaxError",         // Parse-time error
  message: "Unexpected token",
  // ... no stack (never executed)
}

{
  type: "exception-thrown",
  errorType: "ReferenceError",      // Execution-time TDZ error
  message: "Cannot access 'y' before initialization",
  stack: [...],                     // Has stack (during execution)
  sourceLocation: { file: "main.js", line: 2, column: 13 }
}
```

### Config Mapping

Uses existing config structure:

```javascript
{
  variables: {
    trace: true,
    includeKind: true,              // Distinguish var/let/const
    includeTDZ: true,               // Track temporal dead zone
    trackDeclarations: true
  },
  functions: {
    trace: true,
    includeDeclarations: true,      // Hoisted availability
    trackCalls: true
  },
  modules: {
    traceLoading: true,             // Creation phase
    traceImports: true
  }
}
```

### Granularity by Preset

**Overview Preset**:
- `variable-declared` with `kind` only
- `function-called` (names only)
- Minimal TDZ tracking

**Detailed Preset** (recommended):
- + `isInTDZ`, `isFunctionScoped` flags
- + `variable-initialized` events
- + `import-resolved` for modules
- + Full error type distinction

**Exhaustive Preset**:
- + `variable-in-tdz-accessed` (all TDZ attempts)
- + `module-loaded` with full dependency info
- + Source locations for all events

### Example Trace Output

For this code:
```javascript
console.log(x); // undefined
var x = 5;

console.log(y); // ReferenceError
let y = 10;
```

Trace shows:
```javascript
[
  // Creation Phase
  { type: "variable-declared", variableName: "x", kind: "var", initialValue: undefined, isInTDZ: false },
  { type: "variable-declared", variableName: "y", kind: "let", initialValue: "<TDZ>", isInTDZ: true },

  // Execution Phase
  { type: "variable-read", variableName: "x", value: undefined },  // Line 1
  { type: "console-output", method: "log", arguments: [undefined] },
  { type: "value-assigned", variableName: "x", newValue: 5 },      // Line 2
  { type: "variable-in-tdz-accessed", variableName: "y", willThrowReferenceError: true }, // Line 4
  { type: "exception-thrown", errorType: "ReferenceError", message: "Cannot access 'y' before initialization" }
]
```

### Visualization Needs

Educational tools should:

1. **Two-Phase Timeline**: Show creation phase events before execution phase events
2. **TDZ Highlighting**: Gray out or mark let/const variables during TDZ
3. **Hoisting Comparison**: Side-by-side var (initialized) vs let (TDZ) behavior
4. **Function Availability**: Show when functions become callable (creation) vs when called (execution)
5. **Error Type Badges**: Visual distinction for SyntaxError (creation) vs ReferenceError (execution)

### Performance Notes

- Creation phase events are low-frequency (once per variable/function declaration)
- Minimal overhead for classroom deployment
- TDZ tracking adds negligible cost (flag check on variable access)

### Cross-NM Correlation

This model's trace data also serves:
- **Memory Model**: `variable-declared` shows stack allocations
- **Scope Chain Model**: `scopeId` links variables to scopes
- **Call Stack Model**: `function-called` shows hoisted availability

See `/4-notional-machines/trace-data-requirements-by-nm.md` for complete requirements across all NMs.

---

## Summary

**Creation/Execution Phase Model** explains:
- ✓ Hoisting (why code works "out of order")
- ✓ TDZ (why `let`/`const` throw ReferenceError)
- ✓ Function declaration vs expression timing
- ✓ Module import resolution
- ✓ Error types (Syntax vs Reference vs Type)

**Educational Value**: Demystifies JavaScript's "weird" hoisting behavior with accurate mental model

**Tool Implementation**: Requires pre-execution visualization showing variable registration before code runs

**Integration**: Connects Memory (where), Scope Chain (how), Call Stack (when executed), Event Loop (blocking)

**Target Learners**: Intermediate+ (too abstract for absolute beginners, essential for advanced)
