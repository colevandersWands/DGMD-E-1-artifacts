# Memory Model

**What it teaches**: Variable lifecycle, storage locations, reference relationships

## Key Concepts

- Variables hold values in specific memory locations
- Primitives stored by value, objects stored by reference
- Stack memory (local variables) vs heap memory (objects)
- Garbage collection when no references remain

## Example Scenario

```javascript
let x = 5;           // Stack: x → 5
let obj = {a: 10};   // Stack: obj → ref#1234
                     // Heap: ref#1234 = {a: 10}
let y = obj;         // Stack: y → ref#1234 (same reference!)
y.a = 20;            // Heap: ref#1234 = {a: 20}
console.log(obj.a);  // 20 (both point to same object)
```

**Memory diagram:**
```
STACK                   HEAP
┌──────────────┐       ┌─────────────────┐
│ x: 5         │       │ ref#1234:       │
│ obj: ref#1234│───────→│  {a: 20}        │
│ y: ref#1234  │───────→│                 │
└──────────────┘       └─────────────────┘
```

## Common Misconceptions This Addresses

### ❌ "Variables contain objects"
**Reality**: Variables contain *references* to objects.

```javascript
let arr = [1, 2, 3];
// arr doesn't contain [1,2,3], it contains a reference to the array
```

### ❌ "Assignment copies objects"
**Reality**: Assignment copies the *reference*, not the object.

```javascript
let original = {x: 1};
let copy = original;  // copy gets same reference
copy.x = 2;
console.log(original.x); // 2 (not 1!)
```

### ❌ "`let y = obj` creates a new object"
**Reality**: Creates a new *reference* to the same object.

```javascript
let obj1 = {value: 'shared'};
let obj2 = obj1;  // Two references, one object
obj2.value = 'modified';
console.log(obj1.value); // 'modified'
```

### ❌ "Primitives and objects work the same"
**Reality**: Primitives are copied by value.

```javascript
let a = 5;
let b = a;  // b gets a copy of 5
b = 10;
console.log(a); // 5 (unchanged)
```

## Pedagogical Value

**For beginners:**
- Explains why object mutations affect all references
- Clarifies difference between primitives and objects
- Introduces memory management concepts

**For intermediate learners:**
- Explains shallow vs deep copy
- Clarifies parameter passing behavior
- Introduces garbage collection basics

**For advanced learners:**
- Foundation for understanding memory leaks
- Basis for circular reference detection
- Prerequisite for understanding WeakMap/WeakSet

## Visualization Approaches

**Two-region layout:**
```
┌────────────────────────────────────────┐
│ STACK (Local Variables)               │
│ function scope: x=5, y=ref#123        │
└────────────────────────────────────────┘
┌────────────────────────────────────────┐
│ HEAP (Objects)                        │
│ ref#123: {a: 10, b: [1,2,3]}          │
│ ref#456: [4,5,6]                      │
└────────────────────────────────────────┘
```

**Reference arrows:**
```
Stack                    Heap
[obj1] ─────────────→ {value: 'shared'}
[obj2] ─────────────┘
```

**Lifecycle animation:**
1. Variable declared (allocated in stack/heap)
2. Value assigned (memory written)
3. Value read (memory accessed)
4. Reference lost (eligible for GC)
5. Garbage collected (memory freed)

## Memory Lifecycle Examples

### Primitive Lifecycle
```javascript
let x;        // Stack: x → undefined (allocated)
x = 5;        // Stack: x → 5 (assigned)
let y = x;    // Stack: y → 5 (value copied)
x = 10;       // Stack: x → 10 (reassigned, y unchanged)
// End of scope → x and y deallocated
```

### Object Lifecycle
```javascript
let obj = {a: 1};  // Heap: new object allocated
                   // Stack: obj → reference
let ref = obj;     // Stack: ref → same reference
obj = null;        // Stack: obj → null (but object still referenced by ref)
ref = null;        // No more references → object eligible for GC
```

### Garbage Collection Example
```javascript
function create() {
  let temp = {data: 'large object'};  // Allocated
  return temp.data;                    // Return value, not object
} // temp goes out of scope → object eligible for GC

let result = create(); // Only string 'large object' retained
```

## Connections to Other Notional Machines

- **Call Stack Model**: Each stack frame has its own variables
- **Reference vs. Value Model**: Extends to explain assignment semantics
- **Scope Chain Model**: Variables in outer scopes remain in memory (closures)
- **Prototype Chain Model**: Prototype links are references in memory
