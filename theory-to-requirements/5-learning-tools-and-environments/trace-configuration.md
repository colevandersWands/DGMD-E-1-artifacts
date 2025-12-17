# Trace Configuration Specification

**Phase 5 Technical Specification**: Configuration API for `embody(script, config) → trace`

**Critical Boundary**: This document specifies ONLY configuration options that control which trace events are generated and how values are serialized. Pedagogical decisions about how to use traces remain with educational tools.

---

## Configuration Object Structure

```typescript
interface EmbodyConfig {
  // Event granularity control
  granularity?: GranularityConfig;

  // Event filtering
  filters?: FilterConfig;

  // Performance tuning
  performance?: PerformanceConfig;

  // Value serialization
  serialization?: SerializationConfig;

  // Output format
  output?: OutputConfig;
}
```

---

## 1. Granularity Configuration

Controls which event categories are generated and at what detail level.

```typescript
interface GranularityConfig {
  // Variable events
  variables?: "all" | "declarations-only" | "writes-only" | "none";

  // Function events
  functions?: "all" | "user-code-only" | "none";

  // Scope events
  scopes?: "all" | "function-only" | "none";

  // Control flow events
  controlFlow?: "detailed" | "basic" | "none";

  // Async events
  async?: "all" | "await-only" | "none";

  // Object/property events
  objects?: "all" | "creation-only" | "none";

  // Error events
  errors?: "all" | "throws-only" | "none";

  // Expression-level events (micro granularity)
  expressions?: boolean;  // Default: false (high overhead)
}
```

### Granularity Level Meanings

**Variables**:
- `"all"`: `declare`, `assign`, `read`, `update`, `tdz-access` events
- `"declarations-only"`: Only `declare` events
- `"writes-only"`: `declare`, `assign`, `update` events (no reads)
- `"none"`: No variable events

**Functions**:
- `"all"`: `call`, `return`, `throw` for all functions including built-ins
- `"user-code-only"`: Only user-defined functions (excludes Array.map, etc.)
- `"none"`: No function events

**Scopes**:
- `"all"`: `create`, `enter`, `exit`, `closure.capture` events
- `"function-only"`: Only function scopes (excludes blocks)
- `"none"`: No scope events

**Control Flow**:
- `"detailed"`: `conditional.branch`, `loop.enter`, `loop.iterate`, `loop.exit`
- `"basic"`: Only `loop.enter`, `loop.exit` (no iteration events)
- `"none"`: No control flow events

**Async**:
- `"all"`: All promise and microtask events
- `"await-only"`: Only `await.before`, `await.after`
- `"none"`: No async events

**Objects**:
- `"all"`: `create`, `property.access`, `prototype.lookup`
- `"creation-only"`: Only `object.create`
- `"none"`: No object events

**Errors**:
- `"all"`: `throw`, `catch`, `context`
- `"throws-only"`: Only `throw` events
- `"none"`: No error events

**Expressions**:
- `true`: Generate `expression.binary`, `expression.unary` (micro-level, high overhead)
- `false`: No expression events (default)

### Example Configurations by Use Case

**Beginner Visualization** (weeks 1-4):
```javascript
{
  granularity: {
    variables: "all",
    functions: "user-code-only",
    scopes: "function-only",
    controlFlow: "basic",
    async: "none",
    objects: "creation-only",
    errors: "all",
    expressions: false
  }
}
```

**Advanced Debugging** (intermediate+):
```javascript
{
  granularity: {
    variables: "all",
    functions: "all",
    scopes: "all",
    controlFlow: "detailed",
    async: "all",
    objects: "all",
    errors: "all",
    expressions: true  // Full detail
  }
}
```

**Code Quality Assessment** (trace-based QLCs):
```javascript
{
  granularity: {
    variables: "declarations-only",  // Just naming patterns
    functions: "user-code-only",
    scopes: "none",  // Don't need scope detail
    controlFlow: "detailed",  // Algorithm detection
    async: "await-only",
    objects: "creation-only",
    errors: "throws-only",
    expressions: false
  }
}
```

---

## 2. Filter Configuration

Fine-grained filtering of events beyond granularity.

```typescript
interface FilterConfig {
  // Variable name filtering
  variableNames?: VariableNameFilter;

  // Function filtering
  functionNames?: FunctionNameFilter;

  // Scope filtering
  scopeTypes?: ("global" | "function" | "block" | "catch")[];

  // Source location filtering
  sourceLocations?: SourceLocationFilter;

  // Built-in exclusion
  excludeBuiltins?: boolean;
}

interface VariableNameFilter {
  include?: string[];  // Only these variable names
  exclude?: string[];  // Exclude these variable names
  pattern?: RegExp;    // Match pattern
}

interface FunctionNameFilter {
  include?: string[];
  exclude?: string[];
  pattern?: RegExp;
}

interface SourceLocationFilter {
  includeFiles?: string[];  // Only these source files
  excludeFiles?: string[];
  lineRange?: { start: number; end: number };
}
```

### Filter Examples

**Focus on Specific Variables** (student debugging exercise):
```javascript
{
  filters: {
    variableNames: {
      include: ["sum", "count", "result"]  // Only trace these
    }
  }
}
```

**Exclude Test Framework Noise**:
```javascript
{
  filters: {
    functionNames: {
      exclude: ["describe", "it", "expect", "beforeEach", "afterEach"]
    },
    excludeBuiltins: true
  }
}
```

**Trace Specific Code Section**:
```javascript
{
  filters: {
    sourceLocations: {
      lineRange: { start: 10, end: 50 }  // Only lines 10-50
    }
  }
}
```

---

## 3. Performance Configuration

Controls trade-offs between trace detail and performance.

```typescript
interface PerformanceConfig {
  // Maximum events limit
  maxEvents?: number;  // Stop tracing after N events

  // Sampling
  sampling?: SamplingConfig;

  // Streaming vs buffering
  streaming?: boolean;  // Default: false (buffer all)

  // Memory limits
  maxMemoryMB?: number;  // Estimated trace size limit
}

interface SamplingConfig {
  enabled: boolean;
  rate: number;        // Sample 1 in N events
  strategy: "random" | "systematic";  // Random or every Nth
}
```

### Performance Examples

**Large Program with Sampling**:
```javascript
{
  performance: {
    maxEvents: 100000,  // Cap at 100k events
    sampling: {
      enabled: true,
      rate: 10,  // Sample 1 in 10 events
      strategy: "systematic"
    }
  }
}
```

**Streaming for Real-Time Visualization**:
```javascript
{
  performance: {
    streaming: true,  // Events emitted as generated
    maxMemoryMB: 50   // Limit buffered events
  }
}
```

**Small Example (No Limits)**:
```javascript
{
  performance: {
    maxEvents: undefined,  // No limit
    sampling: { enabled: false }
  }
}
```

---

## 4. Serialization Configuration

Controls how values are serialized in events.

```typescript
interface SerializationConfig {
  // Value serialization depth
  values?: "none" | "shallow" | "deep";

  // Object detail level
  objects?: ObjectSerializationConfig;

  // Function detail level
  functions?: FunctionSerializationConfig;

  // Circular reference handling
  circularRefs?: "mark" | "omit" | "registry";

  // Maximum serialization depth
  maxDepth?: number;  // For deep serialization
}

interface ObjectSerializationConfig {
  properties?: "all" | "own-only" | "none";
  prototype?: boolean;  // Include prototype chain
  constructor?: boolean;  // Include constructor name
}

interface FunctionSerializationConfig {
  source?: boolean;  // Include function source code
  name?: boolean;    // Include function name
  location?: boolean;  // Include source location
}
```

### Serialization Examples

**Minimal Serialization** (performance-critical):
```javascript
{
  serialization: {
    values: "shallow",  // Just type and top-level value
    objects: {
      properties: "none",
      prototype: false,
      constructor: true  // Just constructor name
    },
    functions: {
      source: false,
      name: true,
      location: false
    },
    circularRefs: "mark",  // Just mark as circular
    maxDepth: 1
  }
}
```

**Deep Serialization** (detailed analysis):
```javascript
{
  serialization: {
    values: "deep",
    objects: {
      properties: "all",
      prototype: true,
      constructor: true
    },
    functions: {
      source: true,  // Include source
      name: true,
      location: true
    },
    circularRefs: "registry",  // Full reference tracking
    maxDepth: 10
  }
}
```

**Reference-Only** (large objects):
```javascript
{
  serialization: {
    values: "shallow",  // Just object IDs
    objects: {
      properties: "none",  // No property enumeration
      prototype: false,
      constructor: true
    },
    circularRefs: "registry"  // Track by ID only
  }
}
```

---

## 5. Output Configuration

Controls trace output format and structure.

```typescript
interface OutputConfig {
  // Output format
  format?: "json" | "ndjson" | "binary";

  // Event ordering guarantee
  ordering?: "sequential" | "async-aware";

  // Include metadata
  metadata?: boolean;

  // Include summary
  summary?: boolean;
}
```

### Output Format Meanings

**JSON** (default):
- Single JSON object with `metadata`, `events[]`, `summary`
- All events buffered before output
- Easy to parse, large memory footprint

**NDJSON** (newline-delimited JSON):
- Each event as separate JSON line
- Enables streaming
- Lower memory footprint
- Good for large traces

**Binary**:
- Compact binary encoding
- Smallest size, fastest
- Requires decoder

**Ordering**:
- `"sequential"`: Events ordered as executed in synchronous code
- `"async-aware"`: Global ordering including async (uses `sequenceId`)

### Output Examples

**Streaming Large Trace**:
```javascript
{
  output: {
    format: "ndjson",
    ordering: "async-aware",
    metadata: true,
    summary: false  // No summary in streaming mode
  },
  performance: {
    streaming: true
  }
}
```

**Buffered Complete Trace**:
```javascript
{
  output: {
    format: "json",
    ordering: "async-aware",
    metadata: true,
    summary: true
  }
}
```

---

## 6. Preset Configurations

Common configuration presets for typical use cases.

### Preset: Beginner Visualization

```javascript
const BEGINNER_VISUALIZATION = {
  granularity: {
    variables: "all",
    functions: "user-code-only",
    scopes: "function-only",
    controlFlow: "basic",
    async: "none",
    objects: "creation-only",
    errors: "all",
    expressions: false
  },
  filters: {
    excludeBuiltins: true
  },
  serialization: {
    values: "shallow",
    maxDepth: 2
  },
  output: {
    format: "json",
    metadata: true,
    summary: true
  }
};
```

**Use Cases**: Python Tutor-style visualization for CS1 students

### Preset: Comprehensive Debugging

```javascript
const COMPREHENSIVE_DEBUGGING = {
  granularity: {
    variables: "all",
    functions: "all",
    scopes: "all",
    controlFlow: "detailed",
    async: "all",
    objects: "all",
    errors: "all",
    expressions: true
  },
  serialization: {
    values: "deep",
    maxDepth: 5
  },
  output: {
    format: "json",
    ordering: "async-aware",
    metadata: true,
    summary: true
  }
};
```

**Use Cases**: Advanced debugging, complete execution analysis

### Preset: Code Quality Assessment (QLCs)

```javascript
const CODE_QUALITY_ASSESSMENT = {
  granularity: {
    variables: "declarations-only",
    functions: "user-code-only",
    scopes: "none",
    controlFlow: "detailed",
    async: "await-only",
    objects: "creation-only",
    errors: "throws-only",
    expressions: false
  },
  filters: {
    excludeBuiltins: true
  },
  serialization: {
    values: "shallow",
    functions: {
      source: false,
      name: true,
      location: true
    }
  },
  output: {
    format: "json"
  }
};
```

**Use Cases**: Trace-based QLCs, algorithm detection, naming analysis

### Preset: Performance-Optimized Sampling

```javascript
const PERFORMANCE_SAMPLING = {
  granularity: {
    variables: "writes-only",
    functions: "user-code-only",
    scopes: "function-only",
    controlFlow: "basic",
    async: "await-only",
    objects: "none",
    errors: "all",
    expressions: false
  },
  performance: {
    maxEvents: 50000,
    sampling: {
      enabled: true,
      rate: 5,
      strategy: "systematic"
    }
  },
  serialization: {
    values: "shallow",
    maxDepth: 1
  },
  output: {
    format: "ndjson",
    ordering: "sequential"
  }
};
```

**Use Cases**: Large programs, MOOCs at scale, production performance

---

## 7. Configuration Validation

Embody should validate configurations and provide clear errors:

```typescript
interface ConfigValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

// Example validation errors:
// "serialization.maxDepth must be positive integer"
// "filters.variableNames.include and exclude are mutually exclusive"
// "performance.sampling.rate must be >= 1"

// Example warnings:
// "expressions: true will significantly impact performance"
// "values: 'deep' with large objects may cause memory issues"
// "maxEvents may truncate trace before completion"
```

---

## 8. Configuration Composition

Tools can compose configurations:

```javascript
// Start with preset
const config = { ...BEGINNER_VISUALIZATION };

// Override specific options
config.granularity.async = "all";  // Add async events
config.filters = {
  variableNames: { include: ["sum", "count"] }
};

// Result: Beginner preset + async + variable filter
embody(code, config);
```

---

## 9. Configuration Impact Summary

| Configuration | Performance Impact | Memory Impact | Use When |
|---------------|-------------------|---------------|----------|
| `expressions: true` | 🔴 High | 🔴 High | Detailed expression analysis only |
| `values: "deep"` | 🟡 Medium | 🔴 High | Need complete object state |
| `values: "shallow"` | 🟢 Low | 🟢 Low | IDs sufficient, large objects |
| `sampling` | 🟢 Low (reduced) | 🟢 Low (reduced) | Large programs |
| `streaming` | 🟢 Low | 🟢 Low (reduced) | Real-time visualization |
| `functions: "all"` | 🟡 Medium | 🟡 Medium | Need built-in tracking |
| `controlFlow: "detailed"` | 🟡 Medium | 🟡 Medium | Algorithm analysis |

---

## 10. Boundary Compliance

This configuration specification:

✅ **Specifies** which events are generated (neutral infrastructure control)
✅ **Specifies** value serialization options (data format control)
✅ **Specifies** performance trade-offs (infrastructure concerns)
✅ **Provides** presets based on common use patterns
✅ **Enables** tool developers to request needed data

❌ **Does NOT specify** how to interpret trace data (pedagogy)
❌ **Does NOT specify** assessment logic or algorithms
❌ **Does NOT specify** visualization rendering strategies
❌ **Does NOT specify** feedback generation approaches
❌ **Does NOT specify** student interaction patterns

---

## Implementation Notes

**Configuration Processing**:
1. Validate configuration object
2. Apply defaults for unspecified options
3. Generate Aran advice functions based on config
4. Honor granularity/filter settings during execution
5. Apply serialization rules to event values

**Default Configuration** (if none provided):
```javascript
const DEFAULT_CONFIG = {
  granularity: {
    variables: "all",
    functions: "user-code-only",
    scopes: "function-only",
    controlFlow: "basic",
    async: "await-only",
    objects: "creation-only",
    errors: "all",
    expressions: false
  },
  filters: {
    excludeBuiltins: true
  },
  serialization: {
    values: "shallow",
    maxDepth: 3
  },
  performance: {
    streaming: false
  },
  output: {
    format: "json",
    ordering: "async-aware",
    metadata: true,
    summary: true
  }
};
```

---

## Next Phase 5 Documents

- **trace-data-formats.md**: Complete trace structure with all configured events
- **use-cases-table.md**: Map configurations to 77 use cases
- **performance-considerations.md**: Detailed performance analysis
- **tool-integration-guide.md**: How tools choose configurations
