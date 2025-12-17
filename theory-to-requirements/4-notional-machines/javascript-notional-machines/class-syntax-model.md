# Class Syntax Model

**What it teaches**: Class syntax as syntactic sugar over prototypes, unique class features, class vs prototype semantics

## Key Concepts

- Classes are syntactic sugar over constructor functions and prototypes
- Classes have stricter semantics than constructor functions
- Some class features don't translate directly to prototype patterns
- Classes enable new patterns (private fields, static blocks)
- Understanding the desugaring helps debug and understand behavior

## Example Scenario

```javascript
// Class syntax
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

// Roughly equivalent prototype-based code
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};
```

**Key differences:**
```javascript
// Classes must be called with 'new'
const a1 = Animal('Buddy');  // TypeError with class, works with function

// Class methods are non-enumerable
Object.keys(new Animal('x'));  // [] (class), ['speak'] (function)

// Classes have implicit strict mode
class Example {
  method() {
    console.log(this);  // undefined if called without context
  }
}
```

## Common Misconceptions This Addresses

### ❌ "Classes are a new type in JavaScript"
**Reality**: Classes are syntactic sugar over existing prototype system.

```javascript
class Dog {}
console.log(typeof Dog);  // 'function' (not 'class')
console.log(Dog.prototype); // Object with constructor property
```

### ❌ "Classes and constructor functions work exactly the same"
**Reality**: Classes have stricter semantics and additional features.

```javascript
// Constructor function: can be called without 'new'
function OldWay() {
  this.x = 1;
}
const o1 = OldWay();  // Works (creates global x in non-strict mode)

// Class: must be called with 'new'
class NewWay {
  constructor() {
    this.x = 1;
  }
}
const o2 = NewWay();  // TypeError: Class constructor cannot be invoked without 'new'
```

### ❌ "All class features can be replicated with prototypes"
**Reality**: Some features (private fields, static blocks) are unique to class syntax.

```javascript
class WithPrivate {
  #privateField = 42;  // Cannot replicate with simple prototypes

  getPrivate() {
    return this.#privateField;
  }
}

// No prototype equivalent for true private fields
```

### ❌ "Class methods are own properties"
**Reality**: Class methods are on the prototype (like prototype-based code).

```javascript
class Example {
  method() {}
}

const e = new Example();
e.hasOwnProperty('method');  // false (on prototype)
Example.prototype.hasOwnProperty('method');  // true
```

## Pedagogical Value

**For beginners:**
- Provides cleaner syntax for OOP patterns
- Introduces encapsulation concepts (private fields)
- Makes inheritance more intuitive (`extends`)

**For intermediate learners:**
- Clarifies relationship to prototypes
- Explains when classes are just sugar vs unique features
- Introduces strict mode implications

**For advanced learners:**
- Foundation for understanding framework conventions
- Basis for choosing between class and prototype patterns
- Prerequisite for understanding TypeScript class features

## Visualization Approaches

**Desugaring comparison:**
```
CLASS SYNTAX                 PROTOTYPE EQUIVALENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class Animal {               function Animal(name) {
  constructor(name) {          this.name = name;
    this.name = name;        }
  }
  speak() {                  Animal.prototype.speak =
    return 'sound';            function() {
  }                              return 'sound';
}                              };
```

**Feature availability matrix:**
```
Feature              | Constructor Fn | Class
─────────────────────|────────────────|──────
Basic methods        | ✓              | ✓
Static methods       | ✓              | ✓
Private fields       | ✗              | ✓
Private methods      | ✗              | ✓
Static blocks        | ✗              | ✓
Hoisting             | ✓              | ✗ (TDZ)
Call without 'new'   | ✓              | ✗
```

## Detailed Example: Class Strictness

### Must Use `new`
```javascript
// Function: flexible
function FlexibleConstructor() {}
FlexibleConstructor();  // Works (in non-strict mode)
new FlexibleConstructor();  // Also works

// Class: strict
class StrictClass {}
StrictClass();  // TypeError
new StrictClass();  // Works
```

### Temporal Dead Zone
```javascript
// Function: hoisted
const f = new FunctionConstructor();  // Works
function FunctionConstructor() {}

// Class: TDZ
const c = new ClassConstructor();  // ReferenceError: Cannot access before initialization
class ClassConstructor {}
```

### Implicit Strict Mode
```javascript
// Function: non-strict by default
function OldConstructor() {
  unknownVar = 5;  // Creates global in non-strict mode
}

// Class: always strict
class NewConstructor {
  constructor() {
    unknownVar = 5;  // ReferenceError: unknownVar is not defined
  }
}
```

## Unique Class Features

### Private Fields (#)
```javascript
class Counter {
  #count = 0;  // Private field

  increment() {
    this.#count++;
  }

  getCount() {
    return this.#count;
  }
}

const c = new Counter();
c.increment();
console.log(c.getCount());  // 1
console.log(c.#count);  // SyntaxError: Private field
console.log(c.count);   // undefined (not accessible)

// No prototype equivalent for true privacy
```

### Private Methods
```javascript
class SecretKeeper {
  #secret = 'hidden';

  #getSecret() {  // Private method
    return this.#secret;
  }

  revealSecret() {
    return this.#getSecret();  // Can call privately
  }
}

const sk = new SecretKeeper();
console.log(sk.revealSecret());  // 'hidden'
sk.#getSecret();  // SyntaxError
```

### Static Initialization Blocks
```javascript
class Database {
  static #connection;

  static {
    // Runs once when class is defined
    console.log('Setting up database...');
    this.#connection = {host: 'localhost', port: 5432};
  }

  static getConnection() {
    return this.#connection;
  }
}

// No simple prototype equivalent
```

## Class Inheritance vs Prototype Inheritance

### Class Syntax (Clean)
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return 'sound';
  }
}

class Dog extends Animal {
  speak() {
    return super.speak() + ' - woof!';
  }
}

const dog = new Dog('Buddy');
dog.speak();  // 'sound - woof!'
```

### Prototype Equivalent (Complex)
```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return 'sound';
};

function Dog(name) {
  Animal.call(this, name);  // Call parent constructor
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Override method
Dog.prototype.speak = function() {
  return Animal.prototype.speak.call(this) + ' - woof!';
};

const dog = new Dog('Buddy');
dog.speak();  // 'sound - woof!'
```

## Method Enumerability

```javascript
class ClassExample {
  constructor() {
    this.ownProp = 'own';
  }
  method() {}
}

function FunctionExample() {
  this.ownProp = 'own';
}
FunctionExample.prototype.method = function() {};

const c = new ClassExample();
const f = new FunctionExample();

// Class methods are non-enumerable
for (let key in c) {
  console.log(key);  // Only 'ownProp'
}

// Function prototype methods are enumerable (unless explicitly set otherwise)
for (let key in f) {
  console.log(key);  // 'ownProp' and 'method'
}
```

## Super Keyword

```javascript
class Parent {
  constructor(x) {
    this.x = x;
  }
  greet() {
    return 'Hello';
  }
}

class Child extends Parent {
  constructor(x, y) {
    super(x);  // Call parent constructor
    this.y = y;
  }

  greet() {
    return super.greet() + ' World';  // Call parent method
  }
}

// Prototype equivalent requires manual tracking of parent
function Child(x, y) {
  Parent.call(this, x);
  this.y = y;
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.greet = function() {
  return Parent.prototype.greet.call(this) + ' World';
};
```

## Field Declarations

```javascript
class WithFields {
  // Instance field declarations (ES2022)
  x = 10;
  y = 20;

  constructor() {
    console.log(this.x, this.y);  // 10, 20
  }
}

// Roughly equivalent to:
function WithFields() {
  this.x = 10;
  this.y = 20;
}
```

## When to Use Classes vs Prototypes

**Use classes when:**
- You need private fields/methods
- You want cleaner inheritance syntax
- You're working with frameworks expecting classes (React, Angular)
- You want strict semantics (must use `new`, non-enumerable methods)

**Use prototypes when:**
- You need function call flexibility (with/without `new`)
- You're working with older codebases
- You need maximum backward compatibility
- You want enumerable methods

## Connections to Other Notional Machines

- **Prototype Chain Model**: Classes build on prototype mechanism
- **Static vs Instance Model**: Classes have cleaner static syntax
- **Memory Model**: Class instances and prototype instances have same memory layout
- **Scope Chain Model**: Class bodies have their own lexical scope
