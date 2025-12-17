# Prototype Chain Model

**What it teaches**: Object inheritance, property lookup, prototype relationships

## Key Concepts

- Every object has a hidden `[[Prototype]]` link
- Property lookup walks up the prototype chain
- Constructor functions set `prototype` property
- `Object.create()` creates explicit prototype relationships

## Example Scenario

```javascript
const animal = {
  speak() { return 'sound'; }
};

const dog = Object.create(animal);
dog.bark = function() { return 'woof'; };

dog.bark();   // Found on dog directly
dog.speak();  // Not on dog, walks to animal prototype
dog.fly();    // Not on dog, not on animal, not on Object.prototype → undefined
```

**Prototype chain diagram:**
```
dog
  bark: <function>
  [[Prototype]] ──→ animal
                      speak: <function>
                      [[Prototype]] ──→ Object.prototype
                                          toString: <function>
                                          [[Prototype]] ──→ null
```

## Common Misconceptions This Addresses

### ❌ "Objects copy properties from prototypes"
**Reality**: Objects *link* to prototypes; properties aren't copied.

```javascript
const parent = {x: 1};
const child = Object.create(parent);
console.log(child.x); // 1 (found via prototype)
parent.x = 2;
console.log(child.x); // 2 (still linked, sees change)
```

### ❌ "Changing a prototype doesn't affect existing objects"
**Reality**: All objects linked to prototype immediately see changes.

```javascript
function Dog(name) { this.name = name; }
const buddy = new Dog('Buddy');

Dog.prototype.speak = function() { return 'woof'; };
buddy.speak(); // 'woof' (prototype changed after buddy was created)
```

### ❌ "`obj.prop` always means the property is on `obj`"
**Reality**: Property could be on the object OR on any prototype in the chain.

```javascript
const obj = {};
obj.toString(); // Works! toString is on Object.prototype, not obj
```

### ❌ "Prototypes and classes are the same"
**Reality**: Classes are syntactic sugar over prototypes.

```javascript
// Class syntax
class Animal {
  speak() { return 'sound'; }
}

// Equivalent prototype syntax
function Animal() {}
Animal.prototype.speak = function() { return 'sound'; };
```

## Pedagogical Value

**For beginners:**
- Explains method inheritance in JavaScript
- Clarifies why built-in methods (toString, etc.) work on all objects
- Introduces property lookup mechanism

**For intermediate learners:**
- Explains constructor functions and `new` operator
- Clarifies `class` as syntax sugar over prototypes
- Introduces prototype chain concept

**For advanced learners:**
- Foundation for understanding inheritance patterns
- Basis for performance considerations (prototype vs own properties)
- Prerequisite for understanding `Object.create()` vs `new`

## Visualization Approaches

**Chain diagram:**
```
obj ──→ Parent.prototype ──→ GrandParent.prototype ──→ Object.prototype ──→ null
```

**Property lookup animation:**
1. Search object's own properties
2. If not found, follow `[[Prototype]]` link
3. Search prototype's own properties
4. Repeat until found or reach `null`
5. If not found: return `undefined`

**Two-path visualization:**
```
Own Properties    vs    Prototype Chain
(hasOwnProperty)        ([[Prototype]])
```

## Detailed Example: Constructor Functions

```javascript
function Person(name) {
  this.name = name;  // Own property
}

Person.prototype.greet = function() {  // Prototype property
  return `Hello, I'm ${this.name}`;
};

const alice = new Person('Alice');
const bob = new Person('Bob');

alice.greet(); // "Hello, I'm Alice"
bob.greet();   // "Hello, I'm Bob"

// Both share the same greet method via prototype
alice.greet === bob.greet; // true (same function object)
```

**Memory diagram:**
```
alice                           Person.prototype
  name: 'Alice'                   greet: <function>
  [[Prototype]] ──────────────→   [[Prototype]] ──→ Object.prototype

bob
  name: 'Bob'
  [[Prototype]] ──────────────→ (same Person.prototype)
```

## Own Property vs Prototype Property

```javascript
const obj = Object.create({inherited: 'from prototype'});
obj.own = 'on object';

console.log(obj.own);         // 'on object'
console.log(obj.inherited);   // 'from prototype'

obj.hasOwnProperty('own');        // true
obj.hasOwnProperty('inherited');  // false

for (let key in obj) {
  console.log(key); // Logs both 'own' and 'inherited'
}

Object.keys(obj); // ['own'] (only own properties)
```

## Shadowing

```javascript
const parent = {x: 1};
const child = Object.create(parent);

console.log(child.x); // 1 (from prototype)

child.x = 2;          // Creates own property (shadows prototype)
console.log(child.x); // 2 (own property)
console.log(parent.x); // 1 (prototype unchanged)

delete child.x;       // Removes own property
console.log(child.x); // 1 (prototype property visible again)
```

**Shadowing diagram:**
```
Before:
child
  [[Prototype]] ──→ parent
                      x: 1

After child.x = 2:
child
  x: 2 (shadows prototype)
  [[Prototype]] ──→ parent
                      x: 1 (still there, but hidden)
```

## Class Syntax Desugaring

```javascript
// Class syntax
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return 'sound';
  }
}

// Equivalent prototype-based code
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return 'sound';
};
```

## Inheritance with Prototypes

```javascript
const animal = {
  eat() { return 'eating'; }
};

const dog = Object.create(animal);
dog.bark = function() { return 'woof'; };

const puppy = Object.create(dog);
puppy.play = function() { return 'playing'; };

// Puppy has 3-level chain
puppy.play();  // Found on puppy
puppy.bark();  // Found on dog (1 level up)
puppy.eat();   // Found on animal (2 levels up)
```

**Chain visualization:**
```
puppy ──→ dog ──→ animal ──→ Object.prototype ──→ null
play      bark    eat        toString
```

## Connections to Other Notional Machines

- **Memory Model**: Prototype links are references in memory
- **Scope Chain Model**: Similar "walk up chain" pattern for different purpose
- **Reference vs. Value Model**: Prototype links are references, shared across instances
