# Notional Machine Examples

**Purpose**: Provide concrete, annotated code examples showing what each notional machine "sees" and how it helps students understand JavaScript execution.

**Format**: For each NM, provide 3-5 examples progressing from simple to complex, with:
- **Code**: The example program
- **What NM Shows**: Visual/textual representation of NM perspective
- **Student Understanding**: What insight this provides
- **Common Misconception Addressed**: Wrong mental model corrected

---

## 1. Call Stack Model Examples

### Example 1.1: Basic Function Calls (Beginner)

**Code**:
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

function main() {
  const message = greet('Alice');
  console.log(message);
}

main();
```

**What Call Stack Shows**:
```
Step 1:  [main]
Step 2:  [main, greet]        ← greet executing
Step 3:  [main]               ← greet returned, back to main
Step 4:  []                   ← main finished
```

**Student Understanding**: Functions execute one at a time, LIFO order. The most recently called function executes first.

**Misconception Addressed**: "Functions run in definition order" → No, they run in call order.

---

### Example 1.2: Nested Function Calls (Beginner)

**Code**:
```javascript
function add(a, b) {
  return a + b;
}

function multiply(x, y) {
  return x * y;
}

function calculate() {
  const sum = add(2, 3);           // Line 10
  const product = multiply(sum, 4); // Line 11
  return product;
}

calculate();
```

**What Call Stack Shows**:
```
Line 10: [calculate]
Line 10: [calculate, add]          ← add(2, 3) executing
Line 10: [calculate]               ← add returns 5
Line 11: [calculate, multiply]     ← multiply(5, 4) executing
Line 11: [calculate]               ← multiply returns 20
Return:  []
```

**Student Understanding**: Caller waits for callee to complete before continuing.

**Misconception Addressed**: "All functions execute simultaneously" → No, sequential execution.

---

### Example 1.3: Recursion (Intermediate)

**Code**:
```javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

factorial(3);
```

**What Call Stack Shows**:
```
Call factorial(3):
  [factorial(3)]
  [factorial(3), factorial(2)]
  [factorial(3), factorial(2), factorial(1)]  ← Base case
  [factorial(3), factorial(2)]               ← Returns 1
  [factorial(3)]                             ← Returns 2
  []                                         ← Returns 6
```

**Stack Frame Details**:
```
factorial(3): n=3, waiting for factorial(2)
factorial(2): n=2, waiting for factorial(1)
factorial(1): n=1, returns 1 immediately
```

**Student Understanding**: Recursion creates multiple stack frames for the same function with different parameter values. Stack builds up, then unwinds.

**Misconception Addressed**: "Recursion is magic" → No, it's just function calls creating stack frames.

---

### Example 1.4: Stack Overflow (Advanced)

**Code**:
```javascript
function infiniteRecursion() {
  return infiniteRecursion();  // No base case!
}

infiniteRecursion();  // RangeError: Maximum call stack size exceeded
```

**What Call Stack Shows**:
```
[infiniteRecursion]
[infiniteRecursion, infiniteRecursion]
[infiniteRecursion, infiniteRecursion, infiniteRecursion]
...
(continues until stack limit ~10,000 frames)
💥 CRASH: Stack overflow
```

**Student Understanding**: Stack has finite size. Missing base case in recursion causes overflow.

**Misconception Addressed**: "Recursion can go forever" → No, physical memory limits exist.

---

## 2. Memory Model Examples

### Example 2.1: Primitive Variables (Beginner)

**Code**:
```javascript
let x = 5;
let y = x;
y = 10;

console.log(x);  // 5
console.log(y);  // 10
```

**What Memory Model Shows**:
```
Stack (after line 2):
┌─────┬───────┐
│ x   │   5   │
│ y   │   5   │  ← Copy of value
└─────┴───────┘

Stack (after line 3):
┌─────┬───────┐
│ x   │   5   │  ← Unchanged
│ y   │  10   │  ← Updated independently
└─────┴───────┘
```

**Student Understanding**: Primitives are copied. Variables are independent.

**Misconception Addressed**: "Variables are linked" → No, primitives copy values.

---

### Example 2.2: Object References (Intermediate)

**Code**:
```javascript
let obj1 = {count: 5};
let obj2 = obj1;
obj2.count = 10;

console.log(obj1.count);  // 10 (surprise!)
console.log(obj2.count);  // 10
```

**What Memory Model Shows**:
```
Stack:                    Heap:
┌──────┬────────┐        ┌─────────────┐
│ obj1 │  ref1 ─┼───────→│ {count: 5}  │
│ obj2 │  ref1 ─┼───┐    └─────────────┘
└──────┴────────┘   │
                    └─→ (same object!)

After mutation:
Stack:                    Heap:
┌──────┬────────┐        ┌─────────────┐
│ obj1 │  ref1 ─┼───────→│ {count: 10} │ ← Both see change
│ obj2 │  ref1 ─┼───┘    └─────────────┘
└──────┴────────┘
```

**Student Understanding**: Objects are shared via references. Mutation affects all references.

**Misconception Addressed**: "Assignment copies objects" → No, it copies references.

---

### Example 2.3: Function Parameters (Intermediate)

**Code**:
```javascript
function modifyPrimitive(num) {
  num = 99;
}

function modifyObject(obj) {
  obj.value = 99;
}

let x = 5;
let y = {value: 5};

modifyPrimitive(x);
modifyObject(y);

console.log(x);        // 5 (unchanged)
console.log(y.value);  // 99 (changed!)
```

**What Memory Model Shows**:
```
modifyPrimitive call:
┌─────┬─────┐
│ x   │  5  │  ← Caller
│ num │  5  │  ← Parameter gets copy
└─────┴─────┘
After num = 99:
┌─────┬─────┐
│ x   │  5  │  ← Unchanged
│ num │ 99  │  ← Local change only
└─────┴─────┘

modifyObject call:
Stack:                    Heap:
┌─────┬────────┐        ┌─────────────┐
│ y   │  ref1 ─┼───────→│ {value: 5}  │
│ obj │  ref1 ─┼───┘    └─────────────┘
└─────┴────────┘
After obj.value = 99:
Stack:                    Heap:
┌─────┬────────┐        ┌─────────────┐
│ y   │  ref1 ─┼───────→│ {value: 99} │ ← Both see mutation
│ obj │  ref1 ─┼───┘    └─────────────┘
└─────┴────────┘
```

**Student Understanding**: Parameters always get copies. For objects, the copy is a reference.

**Misconception Addressed**: "Objects are passed by reference" → Technically, references are passed by value.

---

## 3. Event Loop Model Examples

### Example 3.1: setTimeout Order (Beginner)

**Code**:
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// Output: 1, 3, 2
```

**What Event Loop Shows**:
```
1. Sync code executes:
   Call Stack: [console.log('1')]
   Output: "1"

2. setTimeout registers callback:
   Call Stack: [setTimeout]
   Macrotask Queue: [() => console.log('2')]

3. Sync code continues:
   Call Stack: [console.log('3')]
   Output: "3"

4. Call stack empty, event loop checks queues:
   Call Stack: []
   Macrotask Queue: [() => console.log('2')]

5. Event loop dequeues callback:
   Call Stack: [callback]
   Output: "2"
```

**Student Understanding**: `setTimeout` doesn't execute immediately. Sync code finishes first.

**Misconception Addressed**: "`setTimeout(fn, 0)` runs immediately" → No, queued after sync code.

---

### Example 3.2: Promises vs setTimeout (Intermediate)

**Code**:
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2
```

**What Event Loop Shows**:
```
1. Sync: console.log('1')
   Output: "1"

2. setTimeout queues macrotask:
   Macrotask Queue: [() => console.log('2')]

3. Promise queues microtask:
   Microtask Queue: [() => console.log('3')]

4. Sync: console.log('4')
   Output: "4"

5. Call stack empty → process microtasks:
   Microtask Queue: [() => console.log('3')]
   Output: "3"

6. Microtasks empty → process macrotasks:
   Macrotask Queue: [() => console.log('2')]
   Output: "2"
```

**Queue Priority**:
```
High Priority: Microtask Queue (promises)
Low Priority:  Macrotask Queue (setTimeout)
```

**Student Understanding**: Microtasks (promises) run before macrotasks (setTimeout).

**Misconception Addressed**: "Async tasks run in code order" → No, queue priority matters.

---

### Example 3.3: Async/Await Order (Advanced)

**Code**:
```javascript
async function foo() {
  console.log('1');
  await Promise.resolve();
  console.log('2');
}

console.log('3');
foo();
console.log('4');
// Output: 3, 1, 4, 2
```

**What Event Loop Shows**:
```
1. Sync: console.log('3')
   Output: "3"

2. Call foo():
   Call Stack: [foo]
   Output: "1"

3. Hit await, function suspends:
   Call Stack: []
   Microtask Queue: [resume foo at line 3]

4. Sync continues: console.log('4')
   Output: "4"

5. Call stack empty, process microtasks:
   Call Stack: [foo (resumed)]
   Output: "2"
```

**Student Understanding**: `await` suspends function execution, queues continuation as microtask.

**Misconception Addressed**: "`await` blocks everything" → No, only suspends current async function.

---

## 4. Scope Chain Model Examples

### Example 4.1: Nested Scope Access (Beginner)

**Code**:
```javascript
const outer = 'outer';

function foo() {
  const inner = 'inner';
  console.log(outer);  // 'outer'
  console.log(inner);  // 'inner'
}

foo();
console.log(outer);    // 'outer'
console.log(inner);    // ReferenceError
```

**What Scope Chain Shows**:
```
Global Scope:
┌──────────────┐
│ outer: 'outer' │
│ foo: function │
└──────────────┘
        ↑
        │ (scope link)
        │
foo() Scope:
┌─────────────┐
│ inner: 'inner' │
└─────────────┘

Variable resolution:
- inner: Found in foo() scope
- outer: Walk up to global scope, found
```

**Student Understanding**: Inner scopes can access outer variables. Outer can't access inner.

**Misconception Addressed**: "Inner functions can't access outer variables" → They can, via scope chain.

---

### Example 4.2: Closure (Intermediate)

**Code**:
```javascript
function makeCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter1 = makeCounter();
const counter2 = makeCounter();

console.log(counter1());  // 1
console.log(counter1());  // 2
console.log(counter2());  // 1
```

**What Scope Chain Shows**:
```
makeCounter call 1:
┌─────────────┐
│ count: 0    │ ← Scope persists after return
└─────────────┘
      ↑
      │ (closure captures)
      │
counter1 function:
┌────────────────────┐
│ [[Environment]]: → │─────┘
└────────────────────┘

makeCounter call 2:
┌─────────────┐
│ count: 0    │ ← Separate scope
└─────────────┘
      ↑
counter2 function captures this one
```

**Student Understanding**: Each function call creates new scope. Closures capture scope reference.

**Misconception Addressed**: "Closures capture values" → No, they capture scope references.

---

### Example 4.3: var vs let in Loops (Advanced)

**Code**:
```javascript
// With var:
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Output: 3, 3, 3

// With let:
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0);
}
// Output: 0, 1, 2
```

**What Scope Chain Shows**:
```
var version:
Function Scope:          Closures:
┌───────────┐           ┌────────────┐
│ i: 3      │←─────────│ All closures │
└───────────┘           │ reference    │
                        │ same 'i'     │
                        └────────────┘

let version:
Block Scope (iter 0):    Closure 1:
┌───────────┐           ┌──────────┐
│ j: 0      │←─────────│ Captures │
└───────────┘           │ j=0      │
                        └──────────┘
Block Scope (iter 1):    Closure 2:
┌───────────┐           ┌──────────┐
│ j: 1      │←─────────│ Captures │
└───────────┘           │ j=1      │
                        └──────────┘
Block Scope (iter 2):    Closure 3:
┌───────────┐           ┌──────────┐
│ j: 2      │←─────────│ Captures │
└───────────┘           │ j=2      │
                        └──────────┘
```

**Student Understanding**: `var` creates one variable (function scope), `let` creates new variable per iteration (block scope).

**Misconception Addressed**: "`var` and `let` work the same" → No, scoping differs critically.

---

## 5. Prototype Chain Model Examples

### Example 5.1: Basic Prototype Lookup (Beginner)

**Code**:
```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

const dog = new Animal('Buddy');
console.log(dog.speak());  // "Buddy makes a sound"
console.log(dog.name);      // "Buddy"
```

**What Prototype Chain Shows**:
```
dog object:
┌─────────────┐
│ name: 'Buddy' │ ← Own property
└─────────────┘
      ↓ [[Prototype]]
Animal.prototype:
┌────────────────────────┐
│ speak: function        │ ← Inherited property
│ constructor: Animal    │
└────────────────────────┘
      ↓ [[Prototype]]
Object.prototype:
┌────────────────────────┐
│ toString: function     │
│ hasOwnProperty: function│
└────────────────────────┘
      ↓ [[Prototype]]
     null

Property lookup for dog.speak():
1. Check dog object: not found
2. Walk up to Animal.prototype: found!
```

**Student Understanding**: Objects delegate property lookup to prototype chain. Properties aren't copied.

**Misconception Addressed**: "Objects copy from prototypes" → No, they link to prototypes.

---

### Example 5.2: Dynamic Prototype Modification (Intermediate)

**Code**:
```javascript
function Dog(name) {
  this.name = name;
}

const dog1 = new Dog('Buddy');
const dog2 = new Dog('Max');

// Add method after instances created
Dog.prototype.bark = function() {
  return `${this.name} barks!`;
};

console.log(dog1.bark());  // "Buddy barks!" (works!)
console.log(dog2.bark());  // "Max barks!" (works!)
```

**What Prototype Chain Shows**:
```
Before adding bark:
dog1 → Dog.prototype (empty) → Object.prototype

After adding bark:
dog1 → Dog.prototype {bark: function} → Object.prototype
dog2 → Dog.prototype {bark: function} → Object.prototype
       ↑
       └─ Both instances see change immediately
```

**Student Understanding**: Prototype changes affect all linked instances instantly (delegation, not copying).

**Misconception Addressed**: "Prototype changes don't affect existing instances" → They do (live link).

---

### Example 5.3: Shadowing (Advanced)

**Code**:
```javascript
function Animal() {}
Animal.prototype.type = 'generic';

const cat = new Animal();
console.log(cat.type);  // 'generic' (from prototype)

cat.type = 'feline';
console.log(cat.type);  // 'feline' (own property shadows)

delete cat.type;
console.log(cat.type);  // 'generic' (prototype visible again)
```

**What Prototype Chain Shows**:
```
After cat.type = 'feline':
cat:
┌─────────────────┐
│ type: 'feline'  │ ← Shadows prototype
└─────────────────┘
      ↓ [[Prototype]]
Animal.prototype:
┌─────────────────┐
│ type: 'generic' │ ← Still exists, but hidden
└─────────────────┘

After delete cat.type:
cat:
┌─────────────────┐
│ (empty)         │ ← Own property removed
└─────────────────┘
      ↓ [[Prototype]]
Animal.prototype:
┌─────────────────┐
│ type: 'generic' │ ← Now visible
└─────────────────┘
```

**Student Understanding**: Own properties shadow prototype properties. Deletion reveals prototype.

**Misconception Addressed**: "Setting property replaces prototype property" → No, it shadows.

---

## 6. This Binding Model Examples

### Example 6.1: Method Call (Beginner)

**Code**:
```javascript
const obj = {
  name: 'Object',
  greet: function() {
    return `Hello from ${this.name}`;
  }
};

console.log(obj.greet());  // "Hello from Object"
```

**What This Binding Shows**:
```
Call site: obj.greet()
           ↑   ↑
           │   └─ Method name
           └─ Context (becomes 'this')

Inside greet():
┌────────────────┐
│ this → obj     │
└────────────────┘

this.name resolves to obj.name ('Object')
```

**Student Understanding**: Method calls bind `this` to the object before the dot.

**Misconception Addressed**: "`this` refers to the function" → No, it refers to call-site context.

---

### Example 6.2: Lost Binding (Intermediate)

**Code**:
```javascript
const obj = {
  name: 'Object',
  greet: function() {
    return `Hello from ${this.name}`;
  }
};

const greetFunc = obj.greet;
console.log(greetFunc());  // "Hello from undefined"
```

**What This Binding Shows**:
```
Call site: greetFunc()
           ↑
           └─ No context object (standalone call)

Inside greet():
┌────────────────┐
│ this → undefined│ (strict mode)
│ this → global  │ (non-strict)
└────────────────┘

this.name is undefined.name (error or undefined)
```

**Student Understanding**: Extracting method loses binding. `this` is call-site dependent.

**Misconception Addressed**: "`this` is lexical scope" → No, it's dynamic (call-time binding).

---

### Example 6.3: Arrow Function Lexical This (Advanced)

**Code**:
```javascript
const obj = {
  name: 'Object',
  greet: function() {
    setTimeout(function() {
      console.log(this.name);  // undefined (lost binding)
    }, 0);

    setTimeout(() => {
      console.log(this.name);  // 'Object' (lexical binding)
    }, 0);
  }
};

obj.greet();
```

**What This Binding Shows**:
```
Regular function in setTimeout:
┌────────────────────┐
│ this → undefined   │ ← Default binding (no call-site context)
└────────────────────┘

Arrow function in setTimeout:
┌────────────────────┐
│ this → obj         │ ← Captured from enclosing greet() scope
└────────────────────┘

Arrow functions don't have own 'this' - they capture from lexical scope
```

**Student Understanding**: Arrow functions use lexical `this` (captured at creation), not call-site binding.

**Misconception Addressed**: "Arrow functions can be rebound" → No, `this` is fixed at creation.

---

## 7. Operator Evaluation Model Examples

### Example 7.1: Precedence (Beginner)

**Code**:
```javascript
const result = 2 + 3 * 4;
console.log(result);  // 14, not 20
```

**What Operator Evaluation Shows**:
```
Expression tree:
       +
      / \
     2   *
        / \
       3   4

Evaluation order:
1. 3 * 4 = 12 (multiply has higher precedence)
2. 2 + 12 = 14

NOT left-to-right: (2 + 3) * 4 = 20
```

**Student Understanding**: Precedence determines evaluation order, not left-to-right reading.

**Misconception Addressed**: "Expressions evaluate left-to-right" → No, precedence matters.

---

### Example 7.2: Short-Circuit Evaluation (Intermediate)

**Code**:
```javascript
function expensiveCheck() {
  console.log('Expensive check running');
  return true;
}

const result = false && expensiveCheck();
// Output: (nothing)
// result: false
```

**What Operator Evaluation Shows**:
```
Expression: false && expensiveCheck()

Evaluation:
1. Evaluate left side: false
2. && operator checks: left is falsy
3. Result already determined: false
4. Right side NOT evaluated (expensiveCheck never called)

Short-circuit: Skip right side when left determines result
```

**Student Understanding**: Logical operators skip unnecessary evaluation.

**Misconception Addressed**: "Both sides always evaluate" → No, short-circuit optimization.

---

## 8. Type Coercion Model Examples

### Example 8.1: Plus Operator Overloading (Beginner)

**Code**:
```javascript
console.log(5 + 3);      // 8 (number addition)
console.log('5' + 3);    // '53' (string concatenation)
console.log(5 + '3');    // '53' (string concatenation)
console.log('5' + '3');  // '53' (string concatenation)
```

**What Type Coercion Shows**:
```
5 + 3:
  Both numbers → numeric addition → 8

'5' + 3:
  String + number → convert number to string
  '5' + '3' → string concatenation → '53'

5 + '3':
  Number + string → convert number to string
  '5' + '3' → string concatenation → '53'
```

**Student Understanding**: `+` prefers string concatenation. If either operand is string, both become strings.

**Misconception Addressed**: "Type conversion is random" → No, systematic rules apply.

---

### Example 8.2: Equality Coercion (Intermediate)

**Code**:
```javascript
console.log(5 == '5');     // true (coercion)
console.log(5 === '5');    // false (no coercion)
console.log(null == undefined);  // true (special rule)
console.log(null === undefined); // false (strict)
```

**What Type Coercion Shows**:
```
5 == '5':
  1. Types differ (number vs string)
  2. Convert string to number: '5' → 5
  3. Compare: 5 == 5 → true

5 === '5':
  1. Types differ
  2. No coercion with ===
  3. Return false immediately

null == undefined:
  Special rule: null and undefined are loosely equal
```

**Student Understanding**: `==` coerces types, `===` doesn't. Special rules exist.

**Misconception Addressed**: "`==` and `===` are almost the same" → Very different behavior.

---

## 9. Reference vs. Value Model Examples

### Example 9.1: Array Mutation (Beginner)

**Code**:
```javascript
const arr1 = [1, 2, 3];
const arr2 = arr1;

arr2.push(4);

console.log(arr1);  // [1, 2, 3, 4]
console.log(arr2);  // [1, 2, 3, 4]
```

**What Reference vs. Value Shows**:
```
Stack:                     Heap:
┌──────┬────────┐         ┌─────────────┐
│ arr1 │  ref1 ─┼────────→│ [1, 2, 3]   │
│ arr2 │  ref1 ─┼────┘    └─────────────┘
└──────┴────────┘

After arr2.push(4):
Stack:                     Heap:
┌──────┬────────┐         ┌──────────────┐
│ arr1 │  ref1 ─┼────────→│ [1, 2, 3, 4] │ ← Shared array
│ arr2 │  ref1 ─┼────┘    └──────────────┘
└──────┴────────┘
```

**Student Understanding**: Arrays are shared via references. Mutation affects all references.

**Misconception Addressed**: "Assignment copies arrays" → No, copies reference.

---

### Example 9.2: Spread Operator Shallow Copy (Intermediate)

**Code**:
```javascript
const original = {x: 1, nested: {y: 2}};
const copy = {...original};

copy.x = 99;
copy.nested.y = 99;

console.log(original.x);        // 1 (unchanged)
console.log(original.nested.y); // 99 (changed!)
```

**What Reference vs. Value Shows**:
```
After spread:
Stack:                          Heap:
┌──────────┬────────┐          ┌─────────────┐
│ original │  ref1 ─┼─────────→│ {x: 1,      │
└──────────┴────────┘          │  nested: ref3}
                               └─────────────┘
┌──────────┬────────┐          ┌─────────────┐
│ copy     │  ref2 ─┼─────────→│ {x: 1,      │ ← New object
└──────────┴────────┘          │  nested: ref3}
                               └─────────────┘
                                      ↓
                               ┌─────────────┐
                               │ {y: 2}      │ ← Shared nested object
                               └─────────────┘

Spread copies top level, but nested objects remain references
```

**Student Understanding**: Spread creates shallow copy. Nested objects still shared.

**Misconception Addressed**: "Spread copies everything" → Only shallow (one level).

---

## 10. Static vs. Instance Model Examples

### Example 10.1: Static Factory Method (Intermediate)

**Code**:
```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  static fromJSON(json) {
    return new User(json.name, json.email);
  }

  greet() {
    return `Hello, ${this.name}`;
  }
}

const user = User.fromJSON({name: 'Alice', email: 'alice@example.com'});
console.log(user.greet());  // "Hello, Alice"
```

**What Static vs. Instance Shows**:
```
User class (constructor function):
┌────────────────────────────┐
│ fromJSON: function (static)│ ← On class itself
└────────────────────────────┘
         ↓ prototype
┌────────────────────────────┐
│ greet: function (instance) │ ← On prototype
└────────────────────────────┘

user instance:
┌────────────────────────────┐
│ name: 'Alice'              │ ← Instance properties
│ email: 'alice@...'         │
└────────────────────────────┘
         ↓ [[Prototype]]
    User.prototype (has greet)

Call sites:
- User.fromJSON(): static method on class
- user.greet(): instance method on object
```

**Student Understanding**: Static methods on class, instance methods on prototype. Different call sites.

**Misconception Addressed**: "Static methods work on instances" → No, class-level only.

---

## 11. Class Syntax Model Examples

### Example 11.1: Class Desugaring (Advanced)

**Code**:
```javascript
// Class syntax:
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} speaks`;
  }
}

// Equivalent prototype code:
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return `${this.name} speaks`;
};
```

**What Class Syntax Shows**:
```
Class desugars to:
1. Constructor function: class body → function
2. Methods → prototype properties
3. Constructor method → actual constructor
4. Other methods → prototype.method

Both create identical structure:
Animal (constructor)
    ↓ prototype
Animal.prototype {speak: function}
```

**Student Understanding**: Classes are syntactic sugar over prototypes. Same underlying mechanism.

**Misconception Addressed**: "Classes are a new type" → No, still prototype-based.

---

### Example 11.2: Private Fields (Advanced)

**Code**:
```javascript
class BankAccount {
  #balance = 0;  // Private field

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(100);
console.log(account.getBalance());  // 100
console.log(account.#balance);       // SyntaxError: Private field
```

**What Class Syntax Shows**:
```
BankAccount instance:
┌────────────────────────────┐
│ (public properties)        │
└────────────────────────────┘
         + (hidden)
┌────────────────────────────┐
│ #balance: 100 (private)    │ ← Truly inaccessible outside class
└────────────────────────────┘

Private fields implemented via internal slots, not prototype
```

**Student Understanding**: Private fields are truly private (not convention like `_prop`). Enforced by syntax.

**Misconception Addressed**: "Private fields are just naming convention" → No, language-enforced privacy.

---

## Cross-NM Example: Complex Async with Closures

**Code**:
```javascript
function createAsyncCounter() {
  let count = 0;  // Closure captures

  return {
    incrementAsync: function() {
      setTimeout(() => {
        count++;
        console.log(count);
      }, 100);
    }
  };
}

const counter = createAsyncCounter();
counter.incrementAsync();  // Logs: 1 (after 100ms)
counter.incrementAsync();  // Logs: 2 (after 100ms)
```

**Multiple NMs Needed**:

**Scope Chain**: Closure captures `count`
```
createAsyncCounter scope:
┌─────────────┐
│ count: 0    │ ← Persists after return
└─────────────┘
      ↑
incrementAsync closures capture this
```

**Event Loop**: setTimeout queues callbacks
```
1. counter.incrementAsync() calls setTimeout
2. Callback queued in macrotask queue
3. After 100ms, event loop executes callback
```

**Memory Model**: `count` shared via closure reference
```
Both callbacks reference same 'count' variable
First callback: count becomes 1
Second callback: count becomes 2 (shared state)
```

**Student Understanding**: Multiple NMs interact - closures + async + memory references all matter.

**Misconception Addressed**: "One model explains everything" → Complex code needs multiple perspectives.

---

## Summary: Using Examples for Teaching

**Progression Strategy**:
1. Start with simple examples showing core concept
2. Add complexity revealing edge cases
3. Show misconception-correcting examples
4. Demonstrate multi-NM integration

**Example Selection Criteria**:
- Clear illustration of single NM concept
- Addresses common misconception
- Builds on previous examples
- Scales to real-world patterns

**Pedagogical Value**:
- Concrete code grounds abstract concepts
- Visual representations aid mental model construction
- Misconception confrontation enables conceptual change
- Multi-NM examples show integration needs
