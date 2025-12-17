# This Binding Model

**What it teaches**: `this` as a context-dependent free variable, binding rules, execution context

## Key Concepts

- `this` is a special variable that refers to an execution context
- `this` binding determined at **call time**, not definition time (except arrows)
- Four binding rules: implicit, explicit, `new`, arrow functions
- `this` is NOT the function itself or its lexical scope
- Different rules have different precedence

## Example Scenario

```javascript
const obj = {
  name: 'Alice',
  greet: function() {
    console.log(`Hello, ${this.name}`);
  }
};

obj.greet();  // "Hello, Alice" (implicit binding)

const greet = obj.greet;
greet();  // "Hello, undefined" (default binding, this is global/undefined)

const obj2 = {name: 'Bob'};
obj.greet.call(obj2);  // "Hello, Bob" (explicit binding)

const BoundGreet = obj.greet.bind(obj);
BoundGreet();  // "Hello, Alice" (hard binding)

const arrowGreet = () => console.log(`Hello, ${this.name}`);
obj.arrowGreet = arrowGreet;
obj.arrowGreet();  // "Hello, undefined" (arrow ignores call-site, uses lexical this)
```

## Common Misconceptions This Addresses

### ❌ "`this` refers to the function itself"
**Reality**: `this` refers to the execution context, not the function object.

```javascript
function countCalls() {
  this.count++;  // 'this' is NOT the function
}
countCalls.count = 0;
countCalls();
countCalls();
console.log(countCalls.count);  // 0 (unchanged! 'this' was global, not the function)

// To fix: explicitly bind or use closure
let count = 0;
function countCallsCorrect() {
  count++;
}
```

### ❌ "`this` refers to the function's lexical scope"
**Reality**: `this` has nothing to do with lexical scope (except for arrow functions).

```javascript
function outer() {
  let name = 'Outer';
  function inner() {
    console.log(this.name);  // 'this' is NOT the outer scope
  }
  inner();  // undefined or global.name, not 'Outer'
}
```

### ❌ "`this` is set where the function is defined"
**Reality**: `this` is set where the function is **called** (except arrow functions).

```javascript
const obj = {
  name: 'Object',
  getName: function() {
    return this.name;
  }
};

const getName = obj.getName;  // Extract method
console.log(getName());  // undefined (not 'Object')
// Call-site matters, not definition site
```

### ❌ "Arrow functions can be rebound with `call`/`apply`/`bind`"
**Reality**: Arrow functions lock in `this` at definition time, can't be rebound.

```javascript
const obj = {
  name: 'Object',
  arrow: () => this.name,
  regular: function() { return this.name; }
};

obj.arrow();   // undefined (lexical this from outer scope)
obj.regular(); // 'Object' (implicit binding)

const newObj = {name: 'New'};
obj.arrow.call(newObj);   // undefined (can't rebind arrow)
obj.regular.call(newObj); // 'New' (can rebind regular)
```

## Pedagogical Value

**For beginners:**
- Explains why methods lose `this` when extracted
- Clarifies event handler `this` confusion
- Introduces context vs scope distinction

**For intermediate learners:**
- Explains `call`, `apply`, `bind` usage
- Clarifies arrow function `this` behavior
- Introduces execution context concept

**For advanced learners:**
- Foundation for understanding frameworks (React, Vue components)
- Basis for functional programming alternatives
- Prerequisite for understanding `this` in classes

## The Four Binding Rules

### 1. Default Binding (Standalone Function Call)
```javascript
function showThis() {
  console.log(this);
}

showThis();  // global object (window/global) or undefined in strict mode
```

**In strict mode:**
```javascript
'use strict';
function showThis() {
  console.log(this);
}
showThis();  // undefined (not global)
```

### 2. Implicit Binding (Method Call)
```javascript
const obj = {
  name: 'Object',
  showName: function() {
    console.log(this.name);
  }
};

obj.showName();  // 'Object' (this is obj)

// But watch out for lost binding:
const fn = obj.showName;
fn();  // undefined (default binding, not implicit)
```

**Nested objects:**
```javascript
const outer = {
  inner: {
    name: 'Inner',
    showName: function() {
      console.log(this.name);
    }
  }
};

outer.inner.showName();  // 'Inner' (this is outer.inner, not outer)
```

### 3. Explicit Binding (`call`, `apply`, `bind`)
```javascript
function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

const person = {name: 'Alice'};

// call: arguments individually
greet.call(person, 'Hello');  // "Hello, Alice"

// apply: arguments as array
greet.apply(person, ['Hi']);  // "Hi, Alice"

// bind: returns new function with fixed 'this'
const boundGreet = greet.bind(person, 'Hey');
boundGreet();  // "Hey, Alice"
```

**Hard binding (bind is permanent):**
```javascript
const obj1 = {name: 'First'};
const obj2 = {name: 'Second'};

function showName() {
  console.log(this.name);
}

const bound = showName.bind(obj1);
bound();  // 'First'
bound.call(obj2);  // Still 'First' (bind can't be overridden)
```

### 4. `new` Binding (Constructor Call)
```javascript
function Person(name) {
  this.name = name;  // 'this' is the new object being created
}

const alice = new Person('Alice');
console.log(alice.name);  // 'Alice'
```

**What `new` does:**
1. Creates a new empty object
2. Sets `this` to that object
3. Executes the constructor function
4. Returns the object (unless constructor explicitly returns something else)

### 5. Arrow Function Lexical Binding
```javascript
const obj = {
  name: 'Object',
  regularMethod: function() {
    console.log(this.name);  // 'Object'

    const inner = function() {
      console.log(this.name);  // undefined (lost binding)
    };
    inner();

    const arrow = () => {
      console.log(this.name);  // 'Object' (captured from outer)
    };
    arrow();
  }
};

obj.regularMethod();
```

**Arrow functions capture `this` from enclosing scope:**
```javascript
function Timer() {
  this.seconds = 0;

  setInterval(() => {
    this.seconds++;  // 'this' is Timer instance (captured from constructor)
  }, 1000);
}

const timer = new Timer();
```

## Binding Rule Precedence

**Precedence order (highest to lowest):**
1. Arrow function (lexical, can't be overridden)
2. `new` binding
3. Explicit binding (`call`/`apply`/`bind`)
4. Implicit binding (method call)
5. Default binding (standalone call)

```javascript
function test() {
  console.log(this.name);
}

const obj = {name: 'Implicit'};
test.call(obj);  // 'Implicit' (explicit wins over default)

obj.test = test;
obj.test();  // 'Implicit' (implicit binding)

const BoundTest = test.bind({name: 'Bound'});
BoundTest.call(obj);  // 'Bound' (bind wins over call)

function Test(name) {
  this.name = name;
}
const NewTest = new (Test.bind({name: 'Ignored'}))('New');
console.log(NewTest.name);  // 'New' (new wins over bind)
```

## Common Pitfalls

### Callback Functions Lose `this`
```javascript
const obj = {
  name: 'Object',
  delayedGreet: function() {
    setTimeout(function() {
      console.log(`Hello, ${this.name}`);  // undefined (lost binding)
    }, 1000);
  }
};

obj.delayedGreet();
```

**Solution 1: Arrow function**
```javascript
delayedGreet: function() {
  setTimeout(() => {
    console.log(`Hello, ${this.name}`);  // 'Object' (captured)
  }, 1000);
}
```

**Solution 2: `bind`**
```javascript
delayedGreet: function() {
  setTimeout(function() {
    console.log(`Hello, ${this.name}`);  // 'Object' (bound)
  }.bind(this), 1000);
}
```

**Solution 3: Capture `this` in variable**
```javascript
delayedGreet: function() {
  const self = this;  // or const that = this
  setTimeout(function() {
    console.log(`Hello, ${self.name}`);  // 'Object' (closure)
  }, 1000);
}
```

### Event Handlers Rebind `this`
```javascript
const button = document.querySelector('button');
const obj = {
  name: 'Object',
  handleClick: function() {
    console.log(this.name);
  }
};

button.addEventListener('click', obj.handleClick);  // 'this' will be the button!

// Solution: bind or arrow
button.addEventListener('click', obj.handleClick.bind(obj));
```

### Array Methods and `this`
```javascript
const obj = {
  numbers: [1, 2, 3],
  multiplier: 2,
  multiply: function() {
    return this.numbers.map(function(n) {
      return n * this.multiplier;  // undefined (lost binding)
    });
  }
};

// Solution 1: Arrow function
multiply: function() {
  return this.numbers.map(n => n * this.multiplier);  // Works
}

// Solution 2: thisArg parameter
multiply: function() {
  return this.numbers.map(function(n) {
    return n * this.multiplier;
  }, this);  // Pass 'this' as second argument to map
}
```

## `this` in Classes

```javascript
class Person {
  constructor(name) {
    this.name = name;  // 'this' is the instance
  }

  greet() {
    console.log(`Hello, ${this.name}`);
  }

  arrowGreet = () => {
    console.log(`Hello, ${this.name}`);  // Always bound to instance
  }
}

const person = new Person('Alice');
person.greet();  // "Hello, Alice"

const greet = person.greet;
greet();  // undefined (lost binding)

const arrowGreet = person.arrowGreet;
arrowGreet();  // "Hello, Alice" (arrow locks in 'this')
```

## Strict Mode Differences

```javascript
// Non-strict mode
function test() {
  console.log(this);
}
test();  // global object (window/global)

// Strict mode
'use strict';
function test() {
  console.log(this);
}
test();  // undefined (safer!)
```

## Connections to Other Notional Machines

- **Scope Chain Model**: `this` is NOT part of lexical scope (except arrows)
- **Call Stack Model**: Each call creates new `this` binding
- **Static vs. Instance Model**: Instance methods use `this` to access instance data
- **Class Syntax Model**: Classes have stricter `this` behavior (implicit strict mode)
- **Prototype Chain Model**: Methods on prototype use `this` to access instance properties
