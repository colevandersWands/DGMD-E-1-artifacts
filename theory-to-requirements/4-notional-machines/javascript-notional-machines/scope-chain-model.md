# Scope Chain Model

**What it teaches**: Variable resolution, lexical scoping, closure creation

## Key Concepts

- Each function creates a new scope
- Variable lookup walks up the scope chain (inner → outer)
- Closures capture outer scope at creation time
- Block scopes (let/const) vs function scopes (var)

## Example Scenario

```javascript
let global = 'global';

function outer() {
  let outerVar = 'outer';

  function inner() {
    let innerVar = 'inner';
    console.log(innerVar);   // Found in inner scope
    console.log(outerVar);   // Found in outer scope (closure)
    console.log(global);     // Found in global scope
    console.log(notDefined); // ReferenceError: walks entire chain, not found
  }

  return inner;
}

const closure = outer(); // inner() captured outerVar even though outer() finished
closure(); // Still has access to outerVar
```

**Scope chain diagram:**
```
┌──────────────────────────┐
│ Global Scope             │
│ global: 'global'         │
│ outer: <function>        │
└──────────────────────────┘
        ↑
┌──────────────────────────┐
│ outer() Scope            │
│ outerVar: 'outer'        │
│ inner: <function>        │
└──────────────────────────┘
        ↑
┌──────────────────────────┐
│ inner() Scope            │
│ innerVar: 'inner'        │
└──────────────────────────┘
```

## Common Misconceptions This Addresses

### ❌ "Inner functions can't access outer variables"
**Reality**: Inner functions can access all outer scope variables via scope chain.

```javascript
function makeCounter() {
  let count = 0;
  return function() {
    count++;  // Accesses outer 'count'
    return count;
  };
}
const counter = makeCounter();
counter(); // 1
counter(); // 2 (count persists!)
```

### ❌ "Variables are global unless declared local"
**Reality**: Depends on scope rules and declaration keywords.

```javascript
function test() {
  x = 5;        // No 'let/const/var' → creates global (strict mode: error)
  let y = 10;   // Block-scoped
  var z = 15;   // Function-scoped
}
```

### ❌ "Closures are a special feature"
**Reality**: Natural consequence of lexical scoping - functions remember their creation environment.

```javascript
function makeGreeter(name) {
  return function() {
    return `Hello, ${name}`;  // Captures 'name' from outer scope
  };
}
const greetAlice = makeGreeter('Alice');
greetAlice(); // "Hello, Alice" (name captured in closure)
```

### ❌ "`var` and `let` work the same"
**Reality**: Different scope rules - `var` is function-scoped, `let` is block-scoped.

```javascript
function scopeTest() {
  if (true) {
    var x = 1;   // Function-scoped (visible outside if)
    let y = 2;   // Block-scoped (only inside if)
  }
  console.log(x); // 1 (accessible)
  console.log(y); // ReferenceError: y is not defined
}
```

## Pedagogical Value

**For beginners:**
- Explains where variables are accessible
- Clarifies why some variables can't be accessed
- Introduces function scope concept

**For intermediate learners:**
- Explains closure mechanism
- Clarifies var vs let/const scoping differences
- Introduces lexical vs dynamic scoping

**For advanced learners:**
- Foundation for module pattern
- Basis for understanding private variables
- Prerequisite for understanding advanced closure patterns

## Visualization Approaches

**Nested boxes:**
```
┌─ Global ─────────────────────┐
│ let global = 'global'        │
│ ┌─ outer() ────────────────┐ │
│ │ let outerVar = 'outer'   │ │
│ │ ┌─ inner() ────────────┐ │ │
│ │ │ let innerVar = 'inner'│ │ │
│ │ │ // Can see all 3 vars │ │ │
│ │ └──────────────────────┘ │ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
```

**Scope chain arrows:**
```
inner scope → outer scope → global scope → ReferenceError
```

**Lookup animation:**
1. Search current scope for variable
2. If not found, move to parent scope
3. Repeat until found or reach global
4. If not found in global: ReferenceError

## Detailed Example: Closure with Multiple References

```javascript
function createCounter(initial) {
  let count = initial;

  return {
    increment: function() { count++; },
    decrement: function() { count--; },
    getValue: function() { return count; }
  };
}

const counter = createCounter(10);
counter.increment();
counter.increment();
console.log(counter.getValue()); // 12

// All three methods share the same 'count' via closure
```

**Scope diagram:**
```
┌─ Global ──────────────────────────────────┐
│ createCounter: <function>                 │
│ counter: {increment, decrement, getValue} │
│                                           │
│ ┌─ createCounter(10) Scope ─────────────┐ │
│ │ count: 12                             │ │
│ │ (captured by all three methods)       │ │
│ └───────────────────────────────────────┘ │
└───────────────────────────────────────────┘
```

## Block Scope vs Function Scope

```javascript
function scopeComparison() {
  // var: function-scoped
  for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log('var:', i), 0);
  }
  // Output: var: 3, var: 3, var: 3 (all closures see same 'i')

  // let: block-scoped
  for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log('let:', j), 0);
  }
  // Output: let: 0, let: 1, let: 2 (each iteration has its own 'j')
}
```

**Why the difference?**
- `var i`: One variable for entire function, shared by all callbacks
- `let j`: New variable for each loop iteration, each callback captures its own

## Hoisting and Temporal Dead Zone

```javascript
function hoistingExample() {
  console.log(x); // undefined (var is hoisted)
  console.log(y); // ReferenceError: Cannot access 'y' before initialization (TDZ)

  var x = 1;
  let y = 2;
}
```

**Scope chain with hoisting:**
```
Function scope (created before execution):
  x: undefined (hoisted)
  y: <uninitialized> (TDZ)

After declarations:
  x: 1
  y: 2
```

## Connections to Other Notional Machines

- **Call Stack Model**: Each stack frame has a scope
- **Memory Model**: Closures keep outer scopes in memory
- **Reference vs. Value Model**: Variables in scope hold values or references
