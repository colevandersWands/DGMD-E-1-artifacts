# Operator Evaluation Model

**What it teaches**: Expression evaluation order, operator precedence, short-circuiting

## Key Concepts

- Operators have precedence (multiply before add)
- Evaluation order follows precedence and associativity rules
- Short-circuit operators (`&&`, `||`, `??`) don't always evaluate right side
- Side effects in expressions can surprise developers

## Example Scenario

```javascript
// Precedence and order
let x = 2 + 3 * 4;  // 14, not 20 (multiply before add)

// Short-circuiting
let a = false && expensiveFunction();  // expensiveFunction() never called
let b = true || expensiveFunction();   // expensiveFunction() never called
let c = null ?? expensiveFunction();   // expensiveFunction() called

// Side effects
let count = 0;
let result = ++count + count++;  // What is result? What is count?
// Step-by-step: count becomes 1, then 1 + 1 (then count becomes 2)
// result = 2, count = 2
```

## Common Misconceptions This Addresses

### ❌ "Expressions evaluate left to right"
**Reality**: Precedence determines order, not position.

```javascript
let x = 10 - 5 - 2;  // Left-to-right: (10 - 5) - 2 = 3
let y = 2 ** 3 ** 2; // Right-to-left: 2 ** (3 ** 2) = 512 (not 64)
```

### ❌ "`&&` and `||` always evaluate both sides"
**Reality**: Short-circuit evaluation stops when result is determined.

```javascript
function log(msg) {
  console.log(msg);
  return msg;
}

false && log('right'); // 'right' never logged
true || log('right');  // 'right' never logged
true && log('right');  // 'right' logged
```

### ❌ "Operator order doesn't matter with parentheses"
**Reality**: Parentheses override precedence but not associativity within them.

```javascript
let a = (2 + 3) * 4;     // 20 (parentheses change order)
let b = 2 + (3 * 4);     // 14 (same as without parentheses)
```

### ❌ "Side effects in expressions are predictable"
**Reality**: Often unclear without explicit order knowledge.

```javascript
let arr = [1, 2, 3];
let i = 0;
arr[i] = i++;  // What happens?
// arr[0] is assigned the value of i (0), THEN i is incremented
// Result: arr = [0, 2, 3], i = 1
```

## Pedagogical Value

**For beginners:**
- Explains why `2 + 3 * 4` isn't `20`
- Clarifies parentheses usage
- Introduces operator precedence concept

**For intermediate learners:**
- Explains short-circuit evaluation for optimization
- Clarifies postfix vs prefix increment behavior
- Introduces associativity concept

**For advanced learners:**
- Foundation for understanding performance optimizations
- Basis for understanding lazy evaluation
- Prerequisite for functional programming patterns (short-circuit chaining)

## Operator Precedence Table (Simplified)

**Higher precedence (evaluated first):**
```
1. Grouping                 ()
2. Member access            . []
3. Function call            ()
4. Postfix increment        ++ --
5. Prefix increment/negation ++  --  !  ~  +  -
6. Exponentiation           **
7. Multiplication/Division  *  /  %
8. Addition/Subtraction     +  -
9. Comparison               <  >  <=  >=
10. Equality                ==  !=  ===  !==
11. Logical AND             &&
12. Logical OR              ||
13. Nullish coalescing      ??
14. Assignment              =  +=  -=  *=  /=
```

**Lower precedence (evaluated last)**

## Visualization Approaches

**Expression tree:**
```
      +
     / \
    2   *
       / \
      3   4

Evaluation order: 3 * 4 = 12, then 2 + 12 = 14
```

**Step-by-step animation:**
```
2 + 3 * 4
2 + (3 * 4)     ← Identify highest precedence
2 + 12           ← Evaluate subexpression
14               ← Final result
```

**Short-circuit visualization:**
```
false && expensiveFunction()
  ↓
false  ← Result determined, right side skipped
```

## Detailed Example: Short-Circuiting

### Logical AND (`&&`)
```javascript
function check(value) {
  console.log('Checking:', value);
  return value > 10;
}

// Both sides evaluated
true && check(15);   // Logs "Checking: 15", returns true

// Right side skipped
false && check(15);  // Nothing logged, returns false
```

**Common pattern: Conditional execution**
```javascript
isLoggedIn && showUserProfile();  // Only calls function if isLoggedIn is true
```

### Logical OR (`||`)
```javascript
// Right side skipped
true || check(15);   // Nothing logged, returns true

// Both sides evaluated
false || check(15);  // Logs "Checking: 15", returns true
```

**Common pattern: Default values (pre-??)**
```javascript
let username = getUserInput() || 'Anonymous';
```

### Nullish Coalescing (`??`)
```javascript
// Different from || - only checks for null/undefined
let count = 0;
let value1 = count || 10;   // 10 (0 is falsy)
let value2 = count ?? 10;   // 0 (0 is not null/undefined)

null ?? 'default';      // 'default'
undefined ?? 'default'; // 'default'
0 ?? 'default';         // 0
'' ?? 'default';        // ''
false ?? 'default';     // false
```

## Detailed Example: Side Effects and Evaluation Order

```javascript
let x = 1;
let result = ++x + x++ + x;
// Step-by-step:
// ++x: x becomes 2, evaluates to 2
// x++: evaluates to 2, then x becomes 3
// x: evaluates to 3
// result = 2 + 2 + 3 = 7
// Final: result = 7, x = 3
```

**With function calls:**
```javascript
function getValue() {
  console.log('getValue called');
  return 5;
}

let y = getValue() + getValue() + getValue();
// Logs "getValue called" three times
// y = 15
```

## Associativity

**Left-associative (most operators):**
```javascript
10 - 5 - 2  // (10 - 5) - 2 = 3
```

**Right-associative (assignment, exponentiation):**
```javascript
a = b = c = 5  // a = (b = (c = 5))
2 ** 3 ** 2    // 2 ** (3 ** 2) = 512
```

## Comma Operator (Often Overlooked)

```javascript
let x = (1, 2, 3);  // x = 3 (comma evaluates all, returns last)

// Common use: multiple expressions in for loop
for (let i = 0, j = 10; i < j; i++, j--) {
  console.log(i, j);
}
```

## Ternary Operator Short-Circuiting

```javascript
condition ? expensiveOperation() : cheapOperation();
// Only one side evaluated based on condition
```

## Connections to Other Notional Machines

- **Call Stack Model**: Function calls in expressions follow precedence rules
- **Type Coercion Model**: Operators trigger coercion (covered separately)
- **Memory Model**: Side effects modify memory during evaluation
