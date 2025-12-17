# Reference vs. Value Model

**What it teaches**: Assignment semantics, mutation vs reassignment, parameter passing

## Key Concepts

- Primitives (number, string, boolean, null, undefined, symbol, bigint) passed by value
- Objects (including arrays, functions) passed by reference
- Assignment copies the value OR the reference
- Mutation changes the object; reassignment changes what the variable points to

## Example Scenario

```javascript
// Primitives: pass by value
let a = 5;
let b = a;   // b gets a COPY of 5
b = 10;      // Changes b's value, not a's
console.log(a); // 5 (unchanged)

// Objects: pass by reference
let obj1 = {x: 5};
let obj2 = obj1;  // obj2 gets a COPY of the REFERENCE
obj2.x = 10;      // Mutates the shared object
console.log(obj1.x); // 10 (both variables point to same object)

// Reassignment vs mutation
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2.push(4);        // Mutation: both see [1,2,3,4]
arr2 = [5, 6];       // Reassignment: arr2 now points elsewhere, arr1 unchanged
```

## Common Misconceptions This Addresses

### ❌ "Everything is passed by reference"
**Reality**: Primitives passed by value, objects by reference.

```javascript
function modify(num, obj) {
  num = 99;    // Local reassignment, doesn't affect caller
  obj.x = 99;  // Mutation, affects caller
}

let myNum = 5;
let myObj = {x: 10};
modify(myNum, myObj);
console.log(myNum);    // 5 (unchanged)
console.log(myObj.x);  // 99 (changed)
```

### ❌ "Everything is passed by value"
**Reality**: Objects passed by reference (technically, reference is passed by value).

```javascript
function addItem(array) {
  array.push('new');  // Mutates original array
}

let list = ['a', 'b'];
addItem(list);
console.log(list);  // ['a', 'b', 'new']
```

### ❌ "Changing a parameter changes the original"
**Reality**: Depends on value vs reference AND mutation vs reassignment!

```javascript
function test(num, obj, arr) {
  num = 99;          // Reassignment: no effect on original
  obj.x = 99;        // Mutation: changes original
  arr = [99];        // Reassignment: no effect on original
  arr.push(100);     // Mutation of NEW array: no effect on original
}

let n = 5;
let o = {x: 10};
let a = [1, 2];
test(n, o, a);
console.log(n);    // 5
console.log(o.x);  // 99
console.log(a);    // [1, 2]
```

### ❌ "Arrays are special"
**Reality**: Arrays are objects, follow reference semantics.

```javascript
let arr1 = [1, 2, 3];
let arr2 = arr1;  // Reference copy
arr2[0] = 99;
console.log(arr1[0]); // 99 (arrays are objects!)
```

### ❌ "Assignment creates a copy"
**Reality**: Only for primitives, not objects.

```javascript
// Primitives: copy
let x = 5;
let y = x;  // y gets copy
x = 10;
console.log(y); // 5

// Objects: reference copy
let obj1 = {x: 5};
let obj2 = obj1;  // obj2 gets reference
obj1.x = 10;
console.log(obj2.x); // 10
```

## Pedagogical Value

**For beginners:**
- Explains why object changes affect multiple variables
- Clarifies function parameter behavior
- Introduces mutation vs reassignment distinction

**For intermediate learners:**
- Explains shallow vs deep copy need
- Clarifies reference equality vs value equality
- Introduces defensive copying patterns

**For advanced learners:**
- Foundation for understanding immutability patterns
- Basis for understanding functional programming
- Prerequisite for understanding React state management

## Visualization Approaches

**Value semantics:**
```
a: [5]    b: [10]    ← Two independent boxes
```

**Reference semantics:**
```
obj1: ──→ {x: 10}  ← Both variables point to same box
obj2: ──┘
```

**Timeline of mutation vs reassignment:**
```
let arr = [1,2,3]
let ref = arr

arr.push(4)        → Both see [1,2,3,4] (mutation)
arr = [5,6]        → arr: [5,6], ref: [1,2,3,4] (reassignment)
```

## Detailed Example: Function Parameters

```javascript
function modifyPrimitive(x) {
  x = 100;  // Local reassignment
  return x;
}

function modifyObject(obj) {
  obj.value = 100;  // Mutation
  return obj;
}

function reassignObject(obj) {
  obj = {value: 100};  // Local reassignment
  return obj;
}

let num = 10;
let object = {value: 10};

modifyPrimitive(num);
console.log(num); // 10 (unchanged)

modifyObject(object);
console.log(object.value); // 100 (changed)

let result = reassignObject(object);
console.log(object.value); // 100 (still, unchanged by reassignment)
console.log(result.value); // 100 (new object returned)
```

**Memory diagram:**
```
Before reassignObject:
object ──→ {value: 100}
obj ──────┘

During reassignObject after reassignment:
object ──→ {value: 100}
obj ──────→ {value: 100} (new object)

After reassignObject:
object ──→ {value: 100}
result ──→ {value: 100} (returned object)
```

## Equality: `==` and `===` with References

```javascript
let obj1 = {x: 1};
let obj2 = {x: 1};
let obj3 = obj1;

obj1 === obj2  // false (different objects, even if same content)
obj1 === obj3  // true (same reference)

// Content equality requires manual comparison
JSON.stringify(obj1) === JSON.stringify(obj2)  // true (but fragile)
```

## Copying Strategies

### Primitive Copying (Automatic)
```javascript
let a = 5;
let b = a;  // Copy happens automatically
```

### Shallow Copy (Objects)
```javascript
let original = {a: 1, b: {c: 2}};

// Method 1: Spread operator
let copy1 = {...original};

// Method 2: Object.assign
let copy2 = Object.assign({}, original);

// Problem: Nested objects still share references
copy1.b.c = 99;
console.log(original.b.c); // 99 (nested object not copied)
```

### Deep Copy (Objects)
```javascript
let original = {a: 1, b: {c: 2}};

// Method 1: JSON (limited, loses functions/dates/etc)
let deepCopy1 = JSON.parse(JSON.stringify(original));

// Method 2: structuredClone (modern browsers)
let deepCopy2 = structuredClone(original);

// Method 3: Manual recursive copy
function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(deepCopy);
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, deepCopy(v)])
  );
}
```

## Mutation Methods (Arrays)

```javascript
let arr = [1, 2, 3];

// Mutating methods (change original)
arr.push(4);      // [1, 2, 3, 4]
arr.pop();        // [1, 2, 3]
arr.shift();      // [2, 3]
arr.unshift(1);   // [1, 2, 3]
arr.splice(1, 1); // [1, 3]
arr.sort();       // Mutates
arr.reverse();    // Mutates

// Non-mutating methods (return new array)
let newArr = arr.concat([4, 5]);  // Original unchanged
let sliced = arr.slice(1, 2);     // Original unchanged
let mapped = arr.map(x => x * 2); // Original unchanged
let filtered = arr.filter(x => x > 1); // Original unchanged
```

## Immutability Pattern

```javascript
// Mutable approach
function addTodo(todos, text) {
  todos.push({text, done: false});
  return todos;
}

// Immutable approach
function addTodo(todos, text) {
  return [...todos, {text, done: false}];
}

// Usage difference
let todos = [{text: 'Learn JS', done: true}];

// Mutable: modifies original
addTodo(todos, 'Practice');
// todos is now modified

// Immutable: returns new array
let newTodos = addTodo(todos, 'Practice');
// todos is unchanged, newTodos has the addition
```

## Const with Objects

```javascript
const obj = {x: 1};
obj.x = 2;       // Allowed (mutation)
obj = {x: 2};    // Error (reassignment)

const arr = [1, 2];
arr.push(3);     // Allowed (mutation)
arr = [1, 2, 3]; // Error (reassignment)

// const prevents reassignment, not mutation
```

## Connections to Other Notional Machines

- **Memory Model**: Foundation for understanding where values live
- **Call Stack Model**: Each stack frame has its own variables (by value/reference)
- **Scope Chain Model**: Closures capture references to outer scope variables
