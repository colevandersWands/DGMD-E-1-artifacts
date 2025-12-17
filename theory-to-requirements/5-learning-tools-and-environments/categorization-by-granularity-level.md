# Learning Tools Categorized by Granularity Level

How learning tools support different levels of execution detail and abstraction.

## Overview

Learning tools provide different granularities of execution visibility - from individual operations to program-level behavior. This categorization organizes tools by execution granularity to match pedagogical needs.

## Three Granularity Levels

### 1. Micro-Level Tools (Individual Operations and Expressions)

**Focus**: Expression evaluation, operator precedence, type coercion steps

**Granularity**: Sub-statement level (individual operations within statements)

**Pedagogical Value**:
- Understand expression evaluation order
- Learn operator precedence and associativity
- Grasp type coercion mechanics
- Debug unexpected expression results

**Example Visualizations**:
```javascript
a() + b() * c()

Micro-level trace:
Step 1: Call b() → 2
Step 2: Call c() → 3
Step 3: Multiply: 2 * 3 → 6
Step 4: Call a() → 1
Step 5: Add: 1 + 6 → 7
```

**Primary Tools**:
- Expression-level debuggers
- Operator evaluation visualizers
- Type coercion step-by-step tools
- AST-based execution visualizers

**Supported Notional Machines**:
- Operator Evaluation Model
- Type Coercion Model
- Expression Layer (from 12 JavaScript NMs)

**Taxonomy Alignment**:
- SOLO: Unistructural → Multistructural (understand individual operations)
- Block Model: Text Block (expression syntax)
- BSI: Behavior Layer (what expressions produce)

**When To Use**:
- Teaching beginners (expression basics)
- Debugging expression bugs (unexpected results)
- Type coercion instruction (demystify coercion)
- Operator precedence confusion

**Challenges**:
- Too detailed for macro understanding (can't see forest for trees)
- Performance overhead (many trace events)
- Cognitive overload risk (too much information)

**Research Gap**: Limited research on expression-level learning tools

### 2. Meso-Level Tools (Statement and Function Execution)

**Focus**: Statement execution, function calls/returns, variable lifecycle, control flow

**Granularity**: Statement level (each line of code, function boundaries)

**Pedagogical Value**:
- Understand control flow (loops, conditionals)
- Learn function execution (call stack, parameters, returns)
- Grasp variable lifecycle (declare, initialize, assign, read, update)
- Debug logic errors (wrong control flow, incorrect function calls)

**Example Visualizations**:
```javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
factorial(3);

Meso-level trace:
Line 5: Call factorial(3)
Line 2:   Condition: 3 <= 1 → false
Line 3:   Call factorial(2)
Line 2:     Condition: 2 <= 1 → false
Line 3:     Call factorial(1)
Line 2:       Condition: 1 <= 1 → true
Line 2:       Return 1
Line 3:     Return 2 * 1 → 2
Line 3:   Return 3 * 2 → 6
```

**Primary Tools**:
- Python Tutor (statement-level stepping)
- Jeliot (line-by-line animation)
- Traditional debuggers (breakpoints, stepping)
- Call stack visualizers

**Supported Notional Machines**:
- Call Stack Model (function execution)
- Memory Model (variable lifecycle)
- Scope Chain Model (variable resolution)
- Creation/Execution Phase Model (var hoisting)

**Taxonomy Alignment**:
- SOLO: Multistructural → Relational (connect statements, understand flow)
- Block Model: Execution Block (runtime behavior)
- BSI: Behavior → Strategy (what code does, how it works)

**When To Use**:
- Most common granularity (balance detail and overview)
- Teaching control flow (loops, recursion, conditionals)
- Debugging logic errors (wrong algorithm, incorrect flow)
- Function execution instruction (call stack, scope)

**Advantages**:
- Not too detailed, not too abstract (goldilocks zone)
- Matches source code structure (line-by-line)
- Performance reasonable (trace size manageable)

**Research Backing**: Guo (2013) Python Tutor, Ben-Ari et al. (2011) Jeliot - meso-level tools

### 3. Macro-Level Tools (Program Structure and Algorithmic Patterns)

**Focus**: Overall program flow, design patterns, complexity analysis, architectural decisions

**Granularity**: Function/module level (multi-statement patterns)

**Pedagogical Value**:
- Understand algorithmic approaches (iteration vs recursion, BFS vs DFS)
- Learn design patterns (factory, observer, etc.)
- Grasp architectural concepts (MVC, client-server)
- Analyze complexity (O(n), O(n²), etc.)

**Example Visualizations**:
```javascript
// Macro-level: "This program uses iterative approach with array accumulation"
function sum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

// vs

// Macro-level: "This program uses recursive approach with base case + reduction"
function sum(arr, i = 0) {
  if (i >= arr.length) return 0;
  return arr[i] + sum(arr, i + 1);
}
```

**Primary Tools**:
- Trace-based QLCs (algorithmic pattern detection)
- Design pattern analyzers
- Complexity analyzers (Big-O detection)
- Architecture visualization tools (dependency graphs)

**Supported Notional Machines**:
- Call Stack Model (recursion depth)
- Scope Chain Model (closure patterns)
- Event Loop Model (async patterns)

**Taxonomy Alignment**:
- SOLO: Relational → Extended Abstract (patterns, generalization)
- Block Model: Function Block (purpose, design)
- BSI: Strategy → Implementation (algorithmic choices, code quality)

**When To Use**:
- Intermediate to advanced students (beyond basic syntax)
- Code quality instruction (design patterns, best practices)
- Algorithmic thinking (different approaches to same problem)
- Architecture understanding (system-level design)

**Challenges**:
- Too abstract for beginners (need micro/meso foundation first)
- Hard to automate (pattern recognition complex)
- May miss details (can't debug if you can't see details)

**Research Context**: Ko (2019) QLCs, Lehtinen (2023) trace-based pattern detection

## Multi-Granularity Tools

**Adaptive Granularity**: Tools that allow switching between levels

**Example**: Start macro ("this is iteration pattern"), zoom to meso (step through loop), zoom to micro (see array[i] expression evaluation)

**Advantages**:
- Match student need (beginner → more detail, advanced → less)
- Debug at appropriate level (find bug macro, fix bug micro)
- Progressive disclosure (show detail when needed, hide when not)

**Implementation**:
- Collapsible traces (expand/collapse sections)
- Granularity controls (slider: micro ← → meso ← → macro)
- Context-sensitive (auto-adjust based on what's being taught)

**Research Gap**: No published research on adaptive granularity learning tools

## Granularity Selection Guidelines

### Use Micro-Level When:
- Teaching expression basics (operator precedence, coercion)
- Debugging expression bugs ("why does `"5" + 3` give `"53"`?")
- Students ask about specific operation result
- Beginner confusion about operation order

### Use Meso-Level When:
- Teaching general programming (control flow, functions)
- Debugging logic errors (algorithm incorrect)
- Building mental models (call stack, scope, memory)
- Most classroom instruction (balance detail/overview)

### Use Macro-Level When:
- Teaching design patterns and architecture
- Code quality and algorithmic thinking
- Intermediate to advanced students
- Comparing different approaches to same problem

### Use Multi-Granularity When:
- Diverse student levels (beginners + advanced in same class)
- Comprehensive learning platform (support all skill levels)
- Debugging complex issues (start macro, zoom to micro)
- Progressive disclosure pedagogy (reveal complexity gradually)

## Granularity and Trace Data

**Embody Trace Data Support**:

The `embody(script, config) → trace` can provide all three granularities through configuration:

**Micro-Level Config**:
```javascript
{
  expressions: { evaluate: true, operatorOrder: true },
  coercion: { implicitConversions: true, steps: true },
  operations: { allOperators: true }
}
```

**Meso-Level Config**:
```javascript
{
  statements: { execute: true },
  functions: { calls: true, returns: true },
  variables: { declare: true, assign: true, read: true },
  controlFlow: { loops: true, conditionals: true }
}
```

**Macro-Level Config**:
```javascript
{
  patterns: { detect: true },
  functions: { calls: true, returns: true }, // but not internal details
  complexity: { analyze: true }
}
```

**Educational Tool Responsibility**: Consume appropriate granularity trace and implement pedagogical intelligence

## Research Backing

**Citations**:
- Meso-level tools: Guo (2013) - Python Tutor, Ben-Ari et al. (2011) - Jeliot
- Macro-level analysis: Ko (2019) - QLCs, Lehtinen (2023) - trace-based patterns
- Micro-level: No specific research (gap)

**Synthesis**: This categorization extracts granularity patterns from existing tools and creates granularity selection framework.

---

**Related Documents**:
- Notional machines: [`lt-notional-machines.md`](./lt-notional-machines.md) (NMs operate at different granularities)
- Taxonomy support: [`lt-taxonomy-support.md`](./lt-taxonomy-support.md) (taxonomies align with granularity levels)
