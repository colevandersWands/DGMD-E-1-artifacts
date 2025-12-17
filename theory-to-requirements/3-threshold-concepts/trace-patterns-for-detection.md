# Trace Patterns for Threshold Concept Detection

**What tool developers want**: Concrete examples of analyzing trace data for threshold indicators

**How they achieve this**: Extract patterns from `embody(script, config)` trace arrays

**How trace data enables this**: Rich execution data contains behavioral signatures of confusion and breakthroughs

---

## General Pattern: Extract Then Analyze

```javascript
// Step 1: Get trace from embody
const trace = embody(studentScript, {
  variables: { read: true, write: true },
  functions: { calls: true, returns: true },
  async: { promises: true, timing: true }
});

// Step 2: Educational tool implements analysis
const asyncPatterns = analyzeAsyncPatterns(trace);
const closurePatterns = analyzeClosurePatterns(trace);
const confusionIndicators = detectConfusion(trace);
```

---

## Async Execution Threshold

### What to look for: Timing prediction errors

**Confusion pattern**:
```javascript
// Student script showing confusion
console.log('A');
setTimeout(() => console.log('B'), 0);
console.log('C');
// Student expects: A, B, C
// Actual output: A, C, B
```

**Trace analysis**:
```javascript
function analyzeAsyncPatterns(trace) {
  // Look for setTimeout calls with timing misunderstandings
  const asyncCalls = trace.filter(event => 
    event.type === 'function-call' && 
    event.function === 'setTimeout'
  );
  
  // Check execution order vs student predictions
  const executionOrder = trace
    .filter(event => event.type === 'console-log')
    .map(event => event.value);
    
  return {
    hasAsyncCalls: asyncCalls.length > 0,
    executionOrder: executionOrder,
    likelyConfused: hasSequentialExpectation(executionOrder)
  };
}
```

### Breakthrough indicators:
- Correct prediction of microtask vs task queue ordering
- Successful combination of Promise + setTimeout
- Appropriate async pattern selection

---

## Closure Threshold

### What to look for: Variable lifetime surprises

**Confusion pattern**:
```javascript
// Student script showing confusion
function makeCounter() {
  let count = 0;
  return function() {
    count++; // Student surprised this works
    return count;
  };
}
```

**Trace analysis**:
```javascript
function analyzeClosurePatterns(trace) {
  // Look for variable access across function boundaries
  const variableAccess = trace.filter(event => 
    event.type === 'variable-read' && 
    event.scope !== event.declarationScope
  );
  
  // Check for persistence patterns
  const persistentVariables = variableAccess.filter(access =>
    access.afterFunctionReturn === true
  );
  
  return {
    crossScopeAccess: variableAccess.length,
    persistentAccess: persistentVariables.length,
    likelyClosureUsage: persistentVariables.length > 0
  };
}
```

### Breakthrough indicators:
- Intentional closure creation for encapsulation
- Module pattern implementation
- Higher-order function usage

---

## Prototype Threshold

### What to look for: Property lookup confusion

**Confusion pattern**:
```javascript
// Student script showing confusion
function Dog(name) { this.name = name; }
Dog.prototype.speak = function() { return "Woof!"; };

const dog = new Dog("Rex");
delete dog.speak; // Student confused why this doesn't work
```

**Trace analysis**:
```javascript
function analyzePrototypePatterns(trace) {
  // Look for prototype chain traversal
  const propertyLookups = trace.filter(event =>
    event.type === 'property-access' &&
    event.foundOnPrototype === true
  );
  
  // Check for constructor usage
  const constructorCalls = trace.filter(event =>
    event.type === 'function-call' &&
    event.isConstructor === true
  );
  
  return {
    prototypeAccess: propertyLookups.length,
    constructorUsage: constructorCalls.length,
    understandsDelegation: propertyLookups.some(lookup => 
      lookup.attempted === 'delete' && lookup.succeeded === false
    )
  };
}
```

---

## Recursion Threshold

### What to look for: Self-reference confusion

**Confusion pattern**:
```javascript
// Student attempts recursion but makes errors
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n); // Missing n-1, infinite recursion
}
```

**Trace analysis**:
```javascript
function analyzeRecursionPatterns(trace) {
  // Look for self-referential function calls
  const functionCalls = trace.filter(event => event.type === 'function-call');
  
  const recursiveCalls = functionCalls.filter(call => {
    const callerFunction = findCallerFunction(trace, call.timestamp);
    return callerFunction && callerFunction.name === call.function;
  });
  
  return {
    hasRecursion: recursiveCalls.length > 0,
    stackDepth: calculateMaxStackDepth(recursiveCalls),
    hasBaseCase: hasBaseCase(trace),
    infiniteRecursion: recursiveCalls.length > 1000 // threshold
  };
}
```

---

## Liminal State Detection

### General confusion indicators across all thresholds:

```javascript
function detectLiminalState(trace) {
  return {
    // Oscillating behavior
    oscillation: detectOscillation(trace),
    
    // High error frequency
    errorSpike: countErrors(trace) > averageErrors * 2,
    
    // Repeated similar attempts
    repetitivePatterns: detectRepetition(trace),
    
    // Partial success followed by regression
    regressionAfterProgress: detectRegression(trace)
  };
}
```

---

## Implementation Notes

**Key insight**: Embody provides raw trace data. Educational tools implement ALL pattern analysis.

**Performance**: Cache analysis results, run detection after each code execution.

**Validation**: Compare detection results against expert assessment to tune thresholds.