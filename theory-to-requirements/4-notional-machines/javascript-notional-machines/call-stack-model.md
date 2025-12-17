# Call Stack Model

**What it teaches**: Function execution order, activation records, return flow

## Key Concepts

- Functions execute in LIFO (last-in-first-out) order
- Each call creates a new "frame" with local variables and parameters
- Return removes the frame and resumes the caller
- Stack grows downward (or upward, depending on visualization)

## Example Scenario

```javascript
function a() { return b() + 1; }
function b() { return c() * 2; }
function c() { return 5; }
a();
```

**Stack progression:**
```
[] → [a] → [a, b] → [a, b, c] → [a, b] → [a] → []
```

**Step-by-step:**
1. `a()` called → Stack: `[a]`, waiting for `b() + 1`
2. `b()` called from `a` → Stack: `[a, b]`, waiting for `c() * 2`
3. `c()` called from `b` → Stack: `[a, b, c]`, returns `5`
4. `c` frame removed → Stack: `[a, b]`, `b` continues with `5 * 2 = 10`
5. `b` frame removed → Stack: `[a]`, `a` continues with `10 + 1 = 11`
6. `a` frame removed → Stack: `[]`, final result `11`

## Common Misconceptions This Addresses

### ❌ "Functions run in the order they're defined"
**Reality**: Functions run in the order they're *called*, not defined.

```javascript
function first() { console.log('first'); }
function second() { console.log('second'); }
second(); // Prints 'second' first
first();  // Prints 'first' second
```

### ❌ "All functions execute simultaneously"
**Reality**: One function at a time on the call stack (JavaScript is single-threaded for synchronous code).

### ❌ "Recursion is mysterious magic"
**Reality**: Just more stack frames. Each recursive call adds a frame.

```javascript
function countdown(n) {
  if (n === 0) return;
  console.log(n);
  countdown(n - 1);
}
countdown(3);
// Stack: [countdown(3)] → [countdown(3), countdown(2)] →
//        [countdown(3), countdown(2), countdown(1)] →
//        [countdown(3), countdown(2), countdown(1), countdown(0)] →
//        [countdown(3), countdown(2), countdown(1)] → ...
```

### ❌ "Stack overflow errors are random"
**Reality**: Too many frames exceed the stack size limit.

```javascript
function infinite() {
  infinite(); // Never returns, keeps adding frames
}
infinite(); // Eventually: RangeError: Maximum call stack size exceeded
```

## Pedagogical Value

**For beginners:**
- Makes function calls concrete and visual
- Explains why local variables don't interfere (separate frames)
- Clarifies parameter passing mechanism

**For intermediate learners:**
- Explains recursion behavior
- Helps debug stack overflow errors
- Introduces concept of execution context

**For advanced learners:**
- Foundation for understanding closures (frames capture scope)
- Basis for understanding async execution (call stack must empty)
- Prerequisite for event loop model

## Visualization Approaches

**Stack frame diagrams:**
```
┌─────────────────┐
│ c()             │  ← Top of stack (currently executing)
│ returns: 5      │
├─────────────────┤
│ b()             │
│ waiting for: c()│
├─────────────────┤
│ a()             │
│ waiting for: b()│
└─────────────────┘
```

**Timeline view:**
```
Time →
a() ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    b() ━━━━━━━━━━━━━━━━━━━━━
        c() ━━━
```

**Interactive stepping:**
- Step forward/backward through execution
- Highlight currently executing function
- Show parameter values and local variables in each frame

## Connections to Other Notional Machines

- **Memory Model**: Each stack frame has its own local variable storage
- **Scope Chain Model**: Each frame has a scope; closures capture frames
- **Event Loop Model**: Async callbacks only run when call stack is empty
