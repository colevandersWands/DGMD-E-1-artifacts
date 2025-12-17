# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

```bash
# Development
npm run build           # Build all distribution formats (ESM, CJS, UMD)
npm run types          # Type check without emitting files
npm run lint           # ESLint source files
npm test               # Run test suite with uvu

# Publishing
npm run prepublishOnly # Automatically builds before publishing
```

## Architecture Overview

**qlcjs** generates educational questions about JavaScript programs for programming education. It analyzes code statically and dynamically to create multiple-choice questions about constructs, execution, and patterns.

### Three-Layer Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Question Generation Layer    (src/questions/)              │
│  - naming.ts: FunctionName, ParameterName                  │
│  - functions.ts: ParameterValue                            │
│  - lines.ts: LoopEnd, VariableDeclaration                  │
│  - dynamic.ts: VariableTrace (requires execution)          │
├─────────────────────────────────────────────────────────────┤
│  Analysis Layer               (src/analysis/, src/executor/)│
│  - Static: AST + scope analysis via Shift tools           │
│  - Dynamic: Program instrumentation & execution recording  │
├─────────────────────────────────────────────────────────────┤
│  Foundation Layer             (src/helpers/, src/trees/)    │
│  - AST traversal and transformation utilities              │
│  - Value serialization and formatting                      │
└─────────────────────────────────────────────────────────────┘
```

## Core Concepts

### Question Types (QLCType)

Seven question types defined in `src/types.ts:78-86`:
- **FunctionName**: Identify function names vs parameters/keywords
- **ParameterName**: Select all parameter names from distractors
- **ParameterValue**: Determine argument values for specific parameters
- **LoopEnd**: Find last line inside a loop block
- **VariableDeclaration**: Locate variable declaration line from references
- **MethodCall**: Identify method calls (implementation pending)
- **VariableTrace**: Trace ordered sequence of values assigned to a variable

### Program Model (ProgramModel)

Central data structure created by `createProgramModel()` in `src/index.ts:22-48`:
```typescript
{
  tree: Script,              // Shift AST
  locations: LocationMap,    // Source location mapping
  comments: Comment[],       // Code comments
  scope: Scope,             // Scope analysis from shift-scope
  input?: ProgramInput,     // Function name + test arguments
  functions?: FunctionWithVariables[],  // When question needs functions
  recorded?: {              // When question needs execution data
    variables: RecordableVariable[],
    history: { [name: string]: SimpleValue[] },
    arguments?: SimpleValue[]
  }
}
```

### Question Generation Flow

1. **Prepare Phase** (`prepare()` in `src/index.ts:61-81`):
   - Parse source code into AST with Shift parser
   - Run scope analysis with shift-scope
   - Optionally extract functions with variables
   - Optionally record execution with instrumentation
   - Each question template generates 0+ question generators

2. **Generate Phase** (`generate()` in `src/index.ts:97-122`):
   - Takes prepared questions and request specification
   - Randomly selects questions matching type filters
   - Supports `uniqueTypes` (one per type) or position-based deduplication
   - Returns sorted by position in code

### Dynamic Execution System

**TL;DR**: Lightweight Shift AST instrumentation that wraps variable writes with recording calls. Only ONE question type uses this: `VariableTrace`.

Located in `src/executor/`:
- **transformToRecorded()**: Instruments code to track variable assignments
- **recordVariableHistory()**: Executes instrumented code and captures history
- **evaluateRecorded()**: Extracts recorded values for specific variables

**For comprehensive deep-dive**, see [DYNAMIC-ANALYSIS.md](./DYNAMIC-ANALYSIS.md) which covers:
- What gets instrumented (4 AST node types: declarations, assignments, compound ops, updates)
- What gets excluded (function expressions)
- How `__record()` capturing works
- Postfix operator edge cases (`i++` vs `++i`)
- Comparison to heavy instrumentation frameworks like Aran (~5-10% of complexity)

## Key Files Reference

- **Entry point**: `src/index.ts` - Main API exports
- **Type definitions**: `src/types.ts` - Core TypeScript interfaces
- **Question templates**: `src/questions/*.ts` - Individual question types
- **AST utilities**: `src/trees/*.ts` - Tree traversal/transformation
- **Analysis**: `src/analysis/*.ts` - Static code analysis helpers
- **i18n**: `src/i18n.ts` - Internationalization strings and formatting
- **Build config**: `rollup.config.js` - Multi-format bundle configuration

## Development Patterns

### Adding a New Question Type

1. Define type in `src/types.ts` QLCType union
2. Create question template in `src/questions/`
3. Export from `src/questions/index.ts`
4. Template must implement:
   ```typescript
   export const type: QLCType = 'NewQuestionType';
   export const wantsFunctions?: boolean;
   export const wantsRecordedEvaluation?: boolean;
   export const prepare: QLCPrepararer = (model) => {
     // Return array of generator functions
     return model.tree.statements.map(stmt => () => ({
       question: "Question text?",
       options: [
         { type: 'distractor', answer: 'wrong', info: 'Why wrong' },
         { type: 'correct', answer: 'right', correct: true, info: 'Why right' }
       ]
     }));
   };
   ```

### Testing Strategy

Tests use `uvu` framework (lightweight alternative to Jest/Mocha):
```bash
npm test                    # Watch mode
npx uvu test specific.ts   # Single test file
```

Current test structure in `test/`:
- `index.ts`: Main generation workflow tests
- `test-code.ts`: Sample code fixtures
- `help.ts`: Test utilities

## Technical Dependencies

### Shift Tools Ecosystem

All AST operations use [Shift tools](https://shift-ast.org/):
- **shift-parser**: Parse JavaScript → AST with source locations
- **shift-scope**: Analyze variable scopes and bindings
- **shift-codegen**: Generate JavaScript from AST
- **shift-ast**: TypeScript type definitions for AST nodes

### Build Pipeline

Rollup produces three formats from single TypeScript source:
- **ESM** (`dist/index.mjs`): Modern module format
- **CJS** (`dist/index.js`): Node.js compatibility
- **UMD** (`dist/qlcjs.min.js`): Browser `<script>` tag, minified

TypeScript declarations generated to `types/` directory.

## Critical Implementation Notes

1. **Question randomness**: `pickOne()` from `src/helpers/arrays.ts` provides randomization - deterministic seeding not currently supported

2. **Execution safety**: Dynamic execution runs user code directly - no sandboxing. Only use with trusted code or in isolated environments.

3. **Type safety**: Strict TypeScript configuration enabled - all code must satisfy `strict: true` and `noImplicitAny: true`

4. **AST node type guards**: Use `isNode<T>(node, ['TypeName'])` helper from `src/types.ts:13-16` for type-safe node checks

5. **Internationalization**: All user-facing strings in `src/i18n.ts` - currently English only but structured for future localization

## Project Context

Originally inspired by [study-lenses](https://github.com/colevandersWands/study-lenses) by Evan Cole. Research foundation from Lehtinen et al. paper on Questions About Learners' Code (QLCs).

Educational philosophy: Generate questions about learners' own code to promote self-reflection and program comprehension skills.
