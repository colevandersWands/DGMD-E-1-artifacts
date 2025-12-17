# Static vs. Instance Model

**What it teaches**: Class-level vs object-level properties and methods, `this` binding

## Key Concepts

- **Instance properties/methods**: Each object gets its own copy (or shares via prototype)
- **Static properties/methods**: Belong to the class itself, shared by all instances
- Instance methods access instance data via `this`
- Static methods don't have access to instance `this`
- Static methods called on the class, not on instances

## Example Scenario

```javascript
class Counter {
  static totalCounters = 0;  // Static property: shared by all

  constructor(name) {
    this.name = name;          // Instance property: unique per object
    this.count = 0;            // Instance property: unique per object
    Counter.totalCounters++;   // Update class-level counter
  }

  increment() {                // Instance method: operates on 'this'
    this.count++;
  }

  static getTotalCounters() {  // Static method: no access to instance 'this'
    return Counter.totalCounters;
  }
}

const c1 = new Counter('c1');
const c2 = new Counter('c2');

c1.increment();
c1.increment();
c2.increment();

console.log(c1.count);  // 2 (instance property)
console.log(c2.count);  // 1 (instance property)
console.log(Counter.getTotalCounters());  // 2 (static method)
console.log(Counter.totalCounters);       // 2 (static property)

// Error: static members not on instances
c1.getTotalCounters();  // TypeError: c1.getTotalCounters is not a function
c1.totalCounters;       // undefined (not on instance)
```

## Common Misconceptions This Addresses

### ❌ "Static methods can access `this` like instance methods"
**Reality**: Static methods don't have instance `this`.

```javascript
class Example {
  constructor() {
    this.value = 10;
  }

  instanceMethod() {
    return this.value;  // Works: 'this' is the instance
  }

  static staticMethod() {
    return this.value;  // 'this' is the class, not an instance
  }
}

const e = new Example();
e.instanceMethod();      // 10
Example.staticMethod();  // undefined (class doesn't have 'value')
```

### ❌ "Static methods are available on instances"
**Reality**: Static methods called on the class, not instances.

```javascript
class Math {
  static abs(x) {
    return x < 0 ? -x : x;
  }
}

Math.abs(-5);        // 5 (correct: called on class)
const m = new Math();
m.abs(-5);           // TypeError: m.abs is not a function
```

### ❌ "All instances share the same instance properties"
**Reality**: Each instance has its own copy of instance properties (unless using prototype).

```javascript
class Person {
  constructor(name) {
    this.name = name;  // Each instance gets its own 'name'
  }
}

const p1 = new Person('Alice');
const p2 = new Person('Bob');
console.log(p1.name);  // 'Alice'
console.log(p2.name);  // 'Bob' (independent)
```

### ❌ "Static properties are like constants"
**Reality**: Static properties are mutable and shared across all instances.

```javascript
class AppState {
  static theme = 'light';  // Mutable static property
}

AppState.theme = 'dark';  // Modifies class property
console.log(AppState.theme);  // 'dark' (changed)
```

## Pedagogical Value

**For beginners:**
- Explains difference between class-level and object-level data
- Clarifies when to use static vs instance methods
- Introduces the concept of shared state

**For intermediate learners:**
- Explains `this` binding in different contexts
- Clarifies factory methods and utility methods (often static)
- Introduces singleton-like patterns

**For advanced learners:**
- Foundation for design patterns (Factory, Singleton)
- Basis for understanding framework conventions (React static methods)
- Prerequisite for metaprogramming with classes

## Visualization Approaches

**Two-tier diagram:**
```
┌─────────────────────────────────┐
│ Class: Counter                  │  ← Class level
│ static totalCounters: 2         │
│ static getTotalCounters()       │
└─────────────────────────────────┘
         ↓ creates
┌─────────────────┐  ┌─────────────────┐
│ c1: Counter     │  │ c2: Counter     │  ← Instance level
│ name: 'c1'      │  │ name: 'c2'      │
│ count: 2        │  │ count: 1        │
│ increment()     │  │ increment()     │
└─────────────────┘  └─────────────────┘
```

**Memory layout:**
```
CLASS (Counter)                     INSTANCES
┌─────────────────────┐            ┌──────────┐  ┌──────────┐
│ static properties   │            │ c1       │  │ c2       │
│ totalCounters: 2    │            │ name:c1  │  │ name:c2  │
│                     │            │ count: 2 │  │ count: 1 │
│ static methods      │            └──────────┘  └──────────┘
│ getTotalCounters()  │                 ↑             ↑
└─────────────────────┘                 │             │
                                    prototype     prototype
                                        chain        chain
```

## Detailed Example: Static Factory Methods

```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  // Static factory method: creates instances
  static fromJSON(json) {
    const data = JSON.parse(json);
    return new User(data.name, data.email);
  }

  // Static factory method: creates special instances
  static createGuest() {
    return new User('Guest', 'guest@example.com');
  }

  // Instance method: operates on 'this'
  getDisplayName() {
    return `${this.name} <${this.email}>`;
  }
}

// Using static factory methods
const user1 = User.fromJSON('{"name":"Alice","email":"alice@example.com"}');
const user2 = User.createGuest();

console.log(user1.getDisplayName());  // Alice <alice@example.com>
console.log(user2.getDisplayName());  // Guest <guest@example.com>
```

## Static vs Instance Method Usage Patterns

### Static Methods: Utility Functions
```javascript
class StringUtils {
  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static reverse(str) {
    return str.split('').reverse().join('');
  }
}

StringUtils.capitalize('hello');  // 'Hello'
StringUtils.reverse('hello');     // 'olleh'
```

### Instance Methods: Object Behavior
```javascript
class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }

  deposit(amount) {      // Instance method: modifies 'this'
    this.balance += amount;
  }

  withdraw(amount) {     // Instance method: uses 'this'
    if (amount <= this.balance) {
      this.balance -= amount;
      return true;
    }
    return false;
  }
}
```

## Static Property Initialization

```javascript
class Config {
  // Static property with initializer
  static apiUrl = 'https://api.example.com';
  static timeout = 5000;

  // Static property computed from other statics
  static defaultHeaders = {
    'Content-Type': 'application/json',
    'X-API-URL': Config.apiUrl  // Reference to own static property
  };
}

console.log(Config.apiUrl);  // https://api.example.com
```

## `this` in Static Methods

```javascript
class Counter {
  static count = 0;

  static increment() {
    this.count++;  // 'this' is the class (Counter)
    return this.count;
  }

  static getCount() {
    return this.count;  // 'this' is the class
  }
}

Counter.increment();  // 1
Counter.increment();  // 2
console.log(Counter.getCount());  // 2

// 'this' refers to Counter class
console.log(Counter.count);  // 2
```

## Static Blocks (ES2022)

```javascript
class Database {
  static connection;

  static {
    // Static initialization block
    console.log('Initializing database connection...');
    Database.connection = {
      host: 'localhost',
      port: 5432
    };
  }

  static query(sql) {
    return `Executing on ${this.connection.host}:${this.connection.port}: ${sql}`;
  }
}

// Static block runs when class is defined
// Output: "Initializing database connection..."
```

## Private Static Members

```javascript
class SecretCounter {
  static #secretCount = 0;  // Private static property

  static #incrementSecret() {  // Private static method
    this.#secretCount++;
  }

  static addOne() {
    this.#incrementSecret();  // Can call private static method
    return this.#secretCount;
  }
}

SecretCounter.addOne();  // 1
console.log(SecretCounter.#secretCount);  // SyntaxError: private field
```

## When to Use Static vs Instance

**Use static when:**
- Utility functions that don't need instance data
- Factory methods that create instances
- Constants shared by all instances
- Counters/caches shared across instances

**Use instance when:**
- Method needs access to instance-specific data
- Behavior varies per object
- Represents an action the object performs

## Connections to Other Notional Machines

- **Prototype Chain Model**: Instance methods typically on prototype, statics on constructor
- **Memory Model**: Static members in one place, instance members per object
- **Scope Chain Model**: Static and instance methods have different `this` contexts
- **Class Syntax Model**: Relationship between class syntax and prototype implementation
