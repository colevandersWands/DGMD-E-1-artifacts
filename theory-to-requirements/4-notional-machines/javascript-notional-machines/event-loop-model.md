# Event Loop Model

**What it teaches**: Asynchronous execution, callback queues, non-blocking I/O

## Key Concepts

- Call stack must be empty before processing next event
- Callbacks queued in task queue, not executed immediately
- Microtask queue (promises) runs before macrotask queue (setTimeout)
- Event loop continuously checks: stack empty? → process next task

## Example Scenario

```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
```

**Output**: `1, 4, 3, 2`

**Why?**
1. Synchronous code runs first: `1`, `4`
2. Microtasks (promise `.then()`) run next: `3`
3. Macrotasks (setTimeout) run last: `2`

**Event loop progression:**
```
Call Stack          Microtask Queue     Macrotask Queue
──────────────────────────────────────────────────────────
[console.log('1')]
[setTimeout(...)]                       [() => log('2')]
[Promise.then(...)] [() => log('3')]    [() => log('2')]
[console.log('4')]  [() => log('3')]    [() => log('2')]
[]                  [() => log('3')]    [() => log('2')]  ← Stack empty!
[() => log('3')]    []                  [() => log('2')]  ← Process microtask
[]                  []                  [() => log('2')]  ← Stack empty again!
[() => log('2')]    []                  []                ← Process macrotask
[]                  []                  []                ← Done
```

## Common Misconceptions This Addresses

### ❌ "`setTimeout(fn, 0)` runs immediately"
**Reality**: Queued after synchronous code, runs when stack is empty.

```javascript
console.log('A');
setTimeout(() => console.log('B'), 0);
console.log('C');
// Output: A, C, B (not A, B, C)
```

### ❌ "Promises are synchronous"
**Reality**: `.then()` callbacks are microtasks, queued for later.

```javascript
console.log('A');
Promise.resolve().then(() => console.log('B'));
console.log('C');
// Output: A, C, B (then callback is queued)
```

### ❌ "Async code runs in parallel"
**Reality**: JavaScript is single-threaded; callbacks run sequentially when stack is empty.

```javascript
setTimeout(() => { while(true) {} }, 0);  // Blocks entire thread
console.log('This will never run');        // Never reached
```

### ❌ "`setTimeout(fn, 100)` runs in exactly 100ms"
**Reality**: Runs *at least* 100ms later, when stack is empty.

```javascript
setTimeout(() => console.log('timer'), 100);
// Blocking code
for (let i = 0; i < 1e9; i++) {} // Takes 5 seconds
// Timer callback only runs AFTER loop finishes
```

## Pedagogical Value

**For beginners:**
- Explains why async code doesn't run immediately
- Clarifies order of execution with timers and promises
- Introduces non-blocking I/O concept

**For intermediate learners:**
- Explains microtask vs macrotask priorities
- Clarifies promise chaining execution order
- Introduces event-driven programming model

**For advanced learners:**
- Foundation for understanding async/await mechanics
- Basis for performance optimization (avoiding stack blocking)
- Prerequisite for understanding Node.js event loop phases

## Visualization Approaches

**Three-region layout:**
```
┌─────────────────┐
│  Call Stack     │
│  [main()]       │
└─────────────────┘
         ↓
    Stack empty?
         ↓
┌─────────────────┐     ┌─────────────────┐
│ Microtask Queue │ →   │ Macrotask Queue │
│ [Promise.then]  │     │ [setTimeout]    │
└─────────────────┘     └─────────────────┘
```

**Animation sequence:**
1. Show synchronous code executing on stack
2. Show async operations registering callbacks in queues
3. Show stack emptying
4. Show microtasks processing (all at once)
5. Show one macrotask processing
6. Repeat from step 4 until all queues empty

**Timeline view:**
```
Time →
Sync code   ██████████
Microtasks            ███
Macrotask 1              ██
Macrotask 2                ██
```

## Detailed Example: Promise vs setTimeout

```javascript
console.log('start');

setTimeout(() => {
  console.log('timeout1');
}, 0);

Promise.resolve().then(() => {
  console.log('promise1');
}).then(() => {
  console.log('promise2');
});

setTimeout(() => {
  console.log('timeout2');
}, 0);

console.log('end');
```

**Output**: `start, end, promise1, promise2, timeout1, timeout2`

**Execution trace:**
1. **Sync**: `start` logged
2. **Sync**: setTimeout registered → macrotask queue: `[timeout1]`
3. **Sync**: Promise.then registered → microtask queue: `[promise1]`
4. **Sync**: setTimeout registered → macrotask queue: `[timeout1, timeout2]`
5. **Sync**: `end` logged
6. **Stack empty!**
7. **Microtask**: `promise1` logged, second `.then()` registered → microtask queue: `[promise2]`
8. **Microtask**: `promise2` logged
9. **All microtasks done!**
10. **Macrotask**: `timeout1` logged
11. **Stack empty, no microtasks!**
12. **Macrotask**: `timeout2` logged

## Async/Await Translation

```javascript
// Promise-based
fetch('/data').then(data => console.log(data));

// Async/await (same behavior)
const data = await fetch('/data'); // Suspends, queued as microtask
console.log(data);
```

**Key insight**: `await` doesn't block the stack; it queues the continuation as a microtask.

## Connections to Other Notional Machines

- **Call Stack Model**: Event loop waits for stack to empty
- **Scope Chain Model**: Async callbacks capture scope (closures)
- **Memory Model**: Callbacks remain in memory while queued
