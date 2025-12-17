# Type Coercion Model

**What it teaches**: Implicit type conversion, comparison behavior, truthiness

## Key Concepts

- JavaScript converts types implicitly in many operations
- `==` performs coercion, `===` does not
- Different operators coerce differently (+ vs - vs <)
- Truthiness: `false`, `0`, `''`, `null`, `undefined`, `NaN` are falsy
- `ToPrimitive`, `ToNumber`, `ToString` conversion abstract operations

## Example Scenario

```javascript
// Implicit coercion
'5' + 3        // '53' (number → string because + favors string)
'5' - 3        // 2 (string → number because - is only numeric)
!!'text'       // true (string → boolean: non-empty is truthy)

// Comparison coercion
5 == '5'       // true (string coerced to number)
5 === '5'      // false (no coercion)
0 == false     // true (boolean → number, then compare)
'' == false    // true (both coerced to 0)

// Surprising cases
[] + []        // '' (arrays → strings → concatenate)
[] + {}        // '[object Object]' (array → '', object → '[object Object]')
{} + []        // 0 (WHY? {} parsed as block, +[] coerces to 0)
```

## Common Misconceptions This Addresses

### ❌ "JavaScript is untyped"
**Reality**: JavaScript is dynamically typed with coercion rules.

```javascript
typeof '5'  // 'string'
typeof 5    // 'number'
// Types exist, they just convert automatically
```

### ❌ "Type conversions are random"
**Reality**: They follow ECMAScript specification rules.

```javascript
// String + anything → String concatenation
'5' + 3        // '53'
'5' + true     // '5true'
'5' + null     // '5null'

// Numeric operators → Number conversion
'5' - 3        // 2
'5' * 2        // 10
'5' / 1        // 5
```

### ❌ "`==` and `===` are almost the same"
**Reality**: Profoundly different! `==` performs type coercion, `===` doesn't.

```javascript
5 == '5'       // true (coercion happens)
5 === '5'      // false (different types)

0 == false     // true (both coerce to 0)
0 === false    // false (different types)

null == undefined  // true (special case)
null === undefined // false (different types)
```

### ❌ "Truthiness is intuitive"
**Reality**: Many surprising cases.

```javascript
// Falsy values (only these 6)
Boolean(false)     // false
Boolean(0)         // false
Boolean('')        // false
Boolean(null)      // false
Boolean(undefined) // false
Boolean(NaN)       // false

// Everything else is truthy (including these surprises)
Boolean('0')       // true (non-empty string)
Boolean('false')   // true (non-empty string)
Boolean([])        // true (object)
Boolean({})        // true (object)
Boolean(function(){}) // true (function)
```

## Pedagogical Value

**For beginners:**
- Explains why `'5' + 3` produces `'53'`
- Clarifies when to use `==` vs `===`
- Introduces truthiness for conditionals

**For intermediate learners:**
- Explains comparison operator behavior
- Clarifies implicit conversion rules
- Introduces ECMAScript abstract operations

**For advanced learners:**
- Foundation for understanding performance implications
- Basis for writing safer code (avoiding coercion pitfalls)
- Prerequisite for understanding valueOf/toString methods

## Coercion Rules by Operator

### Addition (+)
```javascript
// String + anything → String
'5' + 3           // '53'
'5' + true        // '5true'
'5' + null        // '5null'
'5' + undefined   // '5undefined'

// Number + Number → Number
5 + 3             // 8

// Special cases
[] + []           // '' (both to string: '' + '' = '')
[] + {}           // '[object Object]'
{} + []           // 0 (WHY? {} treated as empty block, +[] = 0)
```

### Subtraction (-), Multiplication (*), Division (/)
```javascript
// Always convert to Number
'5' - 3           // 2
'5' * 2           // 10
'5' / 1           // 5
true - false      // 1 (true=1, false=0)
'10' - '5'        // 5 (both to number)

// Results in NaN if conversion fails
'text' - 5        // NaN
```

### Comparison (<, >, <=, >=)
```javascript
// String comparison if both strings
'10' < '9'        // true (lexicographic: '1' < '9')

// Numeric comparison otherwise
'10' < 9          // false (10 < 9)
10 < '9'          // false (10 < 9)

// Special cases
null < 1          // true (null → 0)
undefined < 1     // false (undefined → NaN, NaN comparisons are always false)
```

## The `==` Coercion Algorithm (Simplified)

```javascript
// If same type, compare like ===
5 == 5            // true

// null and undefined are equal to each other (only)
null == undefined // true
null == 0         // false

// Number vs String: convert String to Number
5 == '5'          // true (5 == 5)

// Boolean: convert Boolean to Number
true == 1         // true (1 == 1)
false == 0        // true (0 == 0)

// Object vs Primitive: convert Object to Primitive (valueOf/toString)
[1] == 1          // true ([1].toString() = '1', '1' == 1, 1 == 1)
```

## ToPrimitive, ToNumber, ToString

### ToPrimitive (Object → Primitive)
```javascript
const obj = {
  valueOf() { return 42; },
  toString() { return '99'; }
};

obj + 1           // 43 (valueOf called first, 42 + 1)
String(obj)       // '99' (toString called)
```

### ToNumber (Primitive → Number)
```javascript
Number('5')       // 5
Number('5.5')     // 5.5
Number('')        // 0
Number('text')    // NaN
Number(true)      // 1
Number(false)     // 0
Number(null)      // 0
Number(undefined) // NaN
```

### ToString (Any → String)
```javascript
String(5)         // '5'
String(true)      // 'true'
String(null)      // 'null'
String(undefined) // 'undefined'
String([1, 2])    // '1,2'
String({})        // '[object Object]'
```

## Detailed Example: The `==` Table

```javascript
// Comparing different types with ==
'1' == 1          // true (string → number)
true == 1         // true (boolean → number)
false == 0        // true (boolean → number)
null == undefined // true (special case)
'' == 0           // true (string → number, '' becomes 0)
' ' == 0          // true (string → number, ' ' becomes 0)

// But watch out:
'0' == false      // true ('0' → 0, false → 0)
'0' == 0          // true ('0' → 0)
0 == false        // true (false → 0)
// Transitivity broken: '0' == false and '0' == 0, but false !== 0 with ===

// Use === to avoid surprises
'1' === 1         // false
true === 1        // false
null === undefined // false
```

## Truthy/Falsy in Conditionals

```javascript
// if statement coerces to boolean
if ('0') {
  console.log('Executes!'); // '0' is truthy
}

if (0) {
  console.log('Does not execute'); // 0 is falsy
}

// Common pattern: check for existence
if (user) {
  // user exists and is not null/undefined/false/0/''
}

// Problem: 0 is falsy but might be a valid value
let count = 0;
if (count) {
  // Never executes, even though count is defined
}
// Better: explicit check
if (count !== undefined) {
  // Executes
}
```

## Explicit Conversion (Recommended)

```javascript
// Instead of relying on coercion, be explicit:

// To Number
+'5'              // 5
Number('5')       // 5
parseInt('5')     // 5
parseFloat('5.5') // 5.5

// To String
5 + ''            // '5' (works, but unclear)
String(5)         // '5' (clear intent)
(5).toString()    // '5'

// To Boolean
!!'value'         // true (works, but unclear)
Boolean('value')  // true (clear intent)
```

## The `{}` Ambiguity

```javascript
// As object literal
({} + [])         // '[object Object]' (object + array)

// As block statement
{} + []           // 0 (empty block, +[] = 0)

// Context matters!
const x = {} + [] // '[object Object]' (in expression context)
```

## Connections to Other Notional Machines

- **Operator Evaluation Model**: Operators trigger different coercions
- **Type System** (if we add one): Coercion vs explicit typing trade-offs
- **Memory Model**: Type information affects how values are stored
