# Notional Machines for Misconception Prevention

**Purpose**: Cross-reference notional machines with misconceptions from `/2-misconceptions/`, showing which NMs address which incorrect mental models and how.

**Key Principle**: Notional machines make implicit execution explicit, preventing and correcting misconceptions through visualization and validation.

---

## Call Stack Misconceptions

### Misconception: "Functions run in definition order"
**Source**: Prestructural understanding of program flow

**How Call Stack NM Prevents**:
- Shows functions entering stack in **call order**, not definition order
- Visualizes which function is currently executing (top of stack)
- Demonstrates functions defined anywhere can be called anytime

**Intervention Strategy**:
1. Show code with functions defined in one order, called in different order
2. Animate stack building in call order
3. Ask student to predict next function to execute
4. Validate prediction against actual stack behavior

**Example Code**:
```javascript
function third() { console.log('3'); }
function first() { console.log('1'); second(); }
function second() { console.log('2'); third(); }
first(); // Calls: first → second → third (not first, second, third by definition)
```

---

### Misconception: "All functions execute simultaneously"
**Source**: Confusion between concurrent and sequential execution

**How Call Stack NM Prevents**:
- Shows one function at a time on top of stack
- Demonstrates LIFO execution (finish current before returning to previous)
- Visualizes wait state for callers

**Intervention Strategy**:
1. Show stack with only one active frame at a time
2. Highlight "waiting" status for frames below top
3. Demonstrate sequential execution through stepping

---

### Misconception: "Recursion is mysterious magic"
**Source**: Lack of mental model for self-reference

**How Call Stack NM Prevents**:
- Shows recursive calls as multiple frames of same function
- Visualizes base case stopping recursion
- Demonstrates parameter values changing across frames
- Shows stack unwinding as frames return

**Intervention Strategy**:
1. Trace recursive calls building stack
2. Highlight base case frame (green)
3. Show return values propagating back up
4. Compare to iteration with explicit loop

---

## Memory Model Misconceptions

### Misconception: "Variables contain objects"
**Source**: Conflating variable and value

**How Memory NM Prevents**:
- Shows variables holding **references** (arrows) to objects
- Visualizes objects in separate heap space
- Demonstrates multiple variables pointing to same object

**Intervention Strategy**:
1. Draw stack with variables holding references
2. Draw heap with actual objects
3. Show arrows from variables to objects
4. Mutate object, show all referencing variables affected

---

### Misconception: "Assignment copies objects"
**Source**: Primitive assignment generalized incorrectly

**How Memory NM Prevents**:
- Shows assignment copying **reference**, not object
- Visualizes both variables pointing to same heap object
- Demonstrates shared mutations

**Intervention Strategy**:
1. Show `let b = a` for primitive (value copy)
2. Show `let b = a` for object (reference copy)
3. Mutate via `b`, show `a` affected
4. Contrast with primitive case where `a` unaffected

**Example Code**:
```javascript
let obj1 = {x: 5};
let obj2 = obj1;  // Copy reference, not object
obj2.x = 10;
console.log(obj1.x); // 10 (surprise!)
```

---

### Misconception: "Objects are passed by value to functions"
**Source**: Confusion about parameter passing

**How Memory NM Prevents**:
- Shows function parameter receiving reference copy
- Demonstrates mutations inside function affect original
- Visualizes reassignment inside function doesn't affect original

**Intervention Strategy**:
1. Show function call passing object
2. Visualize parameter getting reference copy
3. Show mutation affecting original
4. Show reassignment not affecting original

---

## Event Loop Misconceptions

### Misconception: "`setTimeout(fn, 0)` runs immediately"
**Source**: Misunderstanding of "0 milliseconds"

**How Event Loop NM Prevents**:
- Shows callback queued in macrotask queue
- Visualizes synchronous code completing first
- Demonstrates call stack must empty before callback runs

**Intervention Strategy**:
1. Show `setTimeout` registering callback
2. Animate synchronous code executing
3. Show stack empty → event loop picks callback
4. Run callback showing it executes last

**Example Code**:
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// Output: 1, 3, 2 (not 1, 2, 3)
```

---

### Misconception: "Promises are synchronous"
**Source**: `.then()` looks like immediate execution

**How Event Loop NM Prevents**:
- Shows `.then()` callback queued as microtask
- Visualizes microtask queue separate from synchronous code
- Demonstrates microtasks run after synchronous code

**Intervention Strategy**:
1. Show promise resolution queuing `.then()` callback
2. Animate synchronous code completing
3. Show microtask queue processing
4. Compare to macrotask timing

---

### Misconception: "Async code runs in parallel"
**Source**: Conflating async with multi-threading

**How Event Loop NM Prevents**:
- Shows single call stack (one thing at a time)
- Visualizes queues waiting for stack to empty
- Demonstrates task switching, not parallel execution

**Intervention Strategy**:
1. Show call stack executing one task
2. Emphasize "single-threaded"
3. Show how callbacks wait in queues
4. Demonstrate sequential execution of queued tasks

---

## Scope Chain Misconceptions

### Misconception: "Inner functions can't access outer variables"
**Source**: Overgeneralization of encapsulation

**How Scope Chain NM Prevents**:
- Shows nested scope boxes
- Visualizes variable resolution walking up chain
- Demonstrates inner scope can see outer scope

**Intervention Strategy**:
1. Draw nested scopes
2. Show inner function accessing outer variable
3. Trace resolution path up chain
4. Contrast with outer trying to access inner (fails)

---

### Misconception: "Closures capture variable values"
**Source**: Misunderstanding capture mechanism

**How Scope Chain NM Prevents**:
- Shows closures capturing **scope reference**, not values
- Visualizes closure seeing current values when executed
- Demonstrates variable changes affecting closure

**Intervention Strategy**:
1. Show closure creation capturing scope
2. Modify outer variable
3. Execute closure showing new value
4. Explain reference vs value capture

**Example Code**:
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Output: 3, 3, 3 (not 0, 1, 2)
// All closures reference same 'i', which is 3 after loop
```

---

### Misconception: "`var` and `let` work the same"
**Source**: Not understanding scoping differences

**How Scope Chain NM Prevents**:
- Shows `var` creating function scope
- Shows `let` creating block scope
- Visualizes different scope lifetimes

**Intervention Strategy**:
1. Show `var` in loop creating one variable
2. Show `let` in loop creating variable per iteration
3. Demonstrate closure capture differences
4. Compare visibility in if blocks

---

## Prototype Chain Misconceptions

### Misconception: "Objects copy properties from prototypes"
**Source**: Confusion with class-based inheritance

**How Prototype Chain NM Prevents**:
- Shows prototype **links**, not copies
- Visualizes property lookup walking chain
- Demonstrates prototype changes affecting instances immediately

**Intervention Strategy**:
1. Create instance from constructor
2. Show prototype link (not property copy)
3. Modify prototype
4. Show instance seeing change via lookup

**Example Code**:
```javascript
function Animal(name) { this.name = name; }
const dog = new Animal('Buddy');
Animal.prototype.speak = function() { return 'woof'; };
dog.speak(); // Works! Prototype changed after instance created
```

---

### Misconception: "`obj.prop` always means property is on `obj`"
**Source**: Not understanding delegation

**How Prototype Chain NM Prevents**:
- Shows property might be on any level of chain
- Visualizes chain walking until property found
- Demonstrates `hasOwnProperty` vs inherited properties

**Intervention Strategy**:
1. Access property on object
2. Show it's not on object directly
3. Trace lookup up prototype chain
4. Highlight where property actually lives

---

## This Binding Misconceptions

### Misconception: "`this` refers to the function itself"
**Source**: `this` sounds like self-reference

**How This Binding NM Prevents**:
- Shows `this` pointing to call-site context, not function
- Visualizes different `this` values for same function
- Demonstrates function object is separate from `this`

**Intervention Strategy**:
1. Show function with `this` reference
2. Call function different ways
3. Show `this` changes based on call
4. Contrast with closure capturing `self` variable

---

### Misconception: "`this` is lexical scope"
**Source**: Confusion with closure capture

**How This Binding NM Prevents**:
- Shows `this` determined at call time (dynamic)
- Contrasts with closure variables (lexical)
- Demonstrates lost binding in callbacks

**Intervention Strategy**:
1. Show method with `this` and closure variable
2. Extract method, call standalone
3. Show `this` lost but closure variable preserved
4. Explain dynamic vs lexical binding

**Example Code**:
```javascript
const obj = {
  name: 'Object',
  method: function() {
    const captured = 'captured';
    setTimeout(function() {
      console.log(this.name);  // undefined (this lost)
      console.log(captured);    // 'captured' (closure works)
    }, 0);
  }
};
```

---

### Misconception: "Arrow functions can be rebound with `.bind()`"
**Source**: Not understanding arrow function `this` is fixed

**How This Binding NM Prevents**:
- Shows arrow function `this` set at creation (lexical)
- Demonstrates `.bind()` has no effect on arrows
- Contrasts with regular functions (rebindable)

**Intervention Strategy**:
1. Create arrow function
2. Try to rebind with `.bind()`
3. Show `this` unchanged
4. Compare with regular function successfully rebound

---

## Type Coercion Misconceptions

### Misconception: "Type conversions are random"
**Source**: Surprising coercion results without understanding rules

**How Type Coercion NM Prevents**:
- Shows systematic conversion algorithms (ToPrimitive, ToNumber, ToString)
- Visualizes step-by-step coercion process
- Demonstrates consistent rules, not randomness

**Intervention Strategy**:
1. Show surprising coercion (`[] + {}`)
2. Break down conversion steps
3. Show algorithm being followed
4. Generate similar examples following same rules

---

### Misconception: "`==` and `===` are almost the same"
**Source**: Not understanding coercion implications

**How Type Coercion NM Prevents**:
- Shows `==` performing type coercion steps
- Shows `===` skipping coercion entirely
- Visualizes different results for same operands

**Intervention Strategy**:
1. Compare `5 == '5'` (true) vs `5 === '5'` (false)
2. Show coercion steps for `==`
3. Show `===` immediate type check
4. Demonstrate transitivity breaking with `==`

---

## Reference vs. Value Misconceptions

### Misconception: "Everything is passed by reference"
**Source**: Overgeneralization from object behavior

**How Reference vs. Value NM Prevents**:
- Shows primitives copied by value
- Shows objects copied by reference
- Visualizes different parameter passing behavior

**Intervention Strategy**:
1. Pass primitive to function, modify it
2. Show original unchanged (value copy)
3. Pass object to function, mutate it
4. Show original changed (reference copy)

---

### Misconception: "Changing parameter changes original"
**Source**: Confusion about mutation vs reassignment

**How Reference vs. Value NM Prevents**:
- Shows mutation affects shared object
- Shows reassignment only affects local parameter
- Visualizes reference breaking on reassignment

**Intervention Strategy**:
1. Pass object to function
2. Mutate property → original affected
3. Reassign parameter → original unaffected
4. Explain mutation vs reassignment

**Example Code**:
```javascript
function modify(obj, num) {
  obj.x = 99;  // Mutation: affects original
  obj = {x: 0}; // Reassignment: doesn't affect original
  num = 99;    // Reassignment: doesn't affect original
}
let myObj = {x: 1};
let myNum = 1;
modify(myObj, myNum);
console.log(myObj.x); // 99
console.log(myNum);   // 1
```

---

## Operator Evaluation Misconceptions

### Misconception: "Expressions evaluate left to right"
**Source**: Reading order generalized to evaluation order

**How Operator Evaluation NM Prevents**:
- Shows evaluation tree with precedence
- Visualizes evaluation order (bottom-up, right precedence first)
- Demonstrates parentheses changing order

**Intervention Strategy**:
1. Show expression: `2 + 3 * 4`
2. Build evaluation tree (multiply first)
3. Show step-by-step evaluation
4. Compare with `(2 + 3) * 4` (different tree)

---

### Misconception: "`&&` and `||` always evaluate both sides"
**Source**: Not understanding short-circuit evaluation

**How Operator Evaluation NM Prevents**:
- Shows left side evaluated first
- Visualizes right side skipped if result determined
- Demonstrates side effects not executing

**Intervention Strategy**:
1. Show `false && expensiveFunction()`
2. Animate left side evaluation
3. Show right side grayed out (not executed)
4. Explain short-circuit optimization

---

## Static vs. Instance Misconceptions

### Misconception: "Static methods work on instances"
**Source**: Confusion about static member access

**How Static vs. Instance NM Prevents**:
- Shows static members on class level
- Shows instance members on object level
- Demonstrates calling contexts are different

**Intervention Strategy**:
1. Show class with static method
2. Try calling on instance → error
3. Show correct call on class itself
4. Contrast with instance method

---

## Class Syntax Misconceptions

### Misconception: "Classes are a new type"
**Source**: Not understanding syntactic sugar

**How Class Syntax NM Prevents**:
- Shows class desugaring to function + prototype
- Demonstrates `typeof MyClass === 'function'`
- Visualizes equivalent prototype-based code

**Intervention Strategy**:
1. Show class syntax
2. Desugar to prototype equivalent
3. Execute both, show identical behavior
4. Explain syntactic sugar concept

---

## Summary: Misconception Categories

**Execution Order Misconceptions** (Call Stack, Event Loop):
- Functions run in definition order
- Async code runs immediately
- All functions execute simultaneously

**Memory Model Misconceptions** (Memory, Reference vs. Value):
- Variables contain objects
- Assignment copies objects
- Everything passed by reference/value (overgeneralization)

**Scope Misconceptions** (Scope Chain, This Binding):
- Inner can't access outer
- Closures capture values (not references)
- `this` is lexical scope

**Inheritance Misconceptions** (Prototype Chain, Class Syntax):
- Objects copy from prototypes
- Classes are new types
- Property always on object itself

**Type Misconceptions** (Type Coercion):
- Coercion is random
- `==` and `===` are almost the same

**Strategy Misconceptions** (Operator Evaluation):
- Left-to-right evaluation
- All operators evaluate both sides

---

## Prevention vs. Correction

**Prevention** (before misconception forms):
- Introduce NM early
- Build correct mental model from start
- Use NM for all examples

**Correction** (after misconception detected):
- Confront with counterexample
- Show NM revealing actual behavior
- Explain why misconception formed
- Practice with NM-validated predictions

**Detection Patterns**:
- Wrong predictions → misconception likely
- Surprise at output → mental model mismatch
- Repeated similar errors → systematic misconception
