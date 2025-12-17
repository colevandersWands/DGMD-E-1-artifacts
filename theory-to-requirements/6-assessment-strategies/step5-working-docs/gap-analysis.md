# Gap Analysis: Event Types and Config Options (Phase 1C)

**Purpose**: Verify that existing embody infrastructure (Phase 5) fully supports all 50 assessment use cases mapped in Phase 1B

**Team**: Developer leads, all review

**Date**: Phase 1C execution

---

## Methodology

1. **Extract event types** from all 50 use case mappings in `assessment-event-mapping-work.md`
2. **Cross-check** against Phase 5's 30+ event types in `trace-event-schemas.md`
3. **Identify gaps** - any event types needed but not defined
4. **Check config options** - verify granularity/filter controls support mappings
5. **Document findings** - gaps or confirmations

---

## Event Type Coverage Analysis

### All Event Types Referenced in Mappings

**Phase 1B mapping referenced these event types across 50 use cases:**

#### Variables (5 types)
- `variable.declare` ✅
- `variable.assign` ✅
- `variable.read` ✅
- `variable.update` ✅
- `variable.tdz-access` ✅

#### Functions (3 types)
- `function.call` ✅
- `function.return` ✅
- `function.throw` ✅

#### Scopes (4 types)
- `scope.create` ✅
- `scope.enter` ✅
- `scope.exit` ✅
- `closure.capture` ✅

#### Control Flow (4 types)
- `conditional.branch` ✅
- `loop.enter` ✅
- `loop.iterate` ✅
- `loop.exit` ✅

#### Async (6 types)
- `await.before` ✅
- `await.after` ✅
- `promise.create` ✅
- `promise.settle` ✅
- `microtask.queue` ✅
- `microtask.execute` ✅

#### Objects (3 types)
- `object.create` ✅
- `property.access` ✅
- `prototype.lookup` ✅

#### Errors (3 types)
- `error.throw` ✅
- `error.catch` ✅
- `error.context` ✅

#### Expressions (2 types)
- `expression.binary` ✅
- `expression.unary` ✅

**Total event types used in mappings**: 30

---

## Gap Identification Results

### Missing Event Types

**Result**: **ZERO GAPS**

All 30 event types referenced in assessment use case mappings are defined in Phase 5 (`trace-event-schemas.md`).

### Verification Against Schema

Cross-checked each event type:

| Event Type | In Mappings | In Schema | Status |
|------------|-------------|-----------|--------|
| `variable.declare` | ✅ | ✅ (lines 40-46) | Match |
| `variable.assign` | ✅ | ✅ (lines 54-63) | Match |
| `variable.read` | ✅ | ✅ (lines 71-79) | Match |
| `variable.update` | ✅ | ✅ (lines 87-96) | Match |
| `variable.tdz-access` | ✅ | ✅ (lines 105-112) | Match |
| `function.call` | ✅ | ✅ (lines 124-135) | Match |
| `function.return` | ✅ | ✅ (lines 143-149) | Match |
| `function.throw` | ✅ | ✅ (lines 157-165) | Match |
| `scope.create` | ✅ | ✅ (lines 177-184) | Match |
| `scope.enter` | ✅ | ✅ (lines 192-197) | Match |
| `scope.exit` | ✅ | ✅ (lines 205-210) | Match |
| `closure.capture` | ✅ | ✅ (lines 218-226) | Match |
| `conditional.branch` | ✅ | ✅ (lines 238-245) | Match |
| `loop.enter` | ✅ | ✅ (lines 253-259) | Match |
| `loop.iterate` | ✅ | ✅ (lines 267-275) | Match |
| `loop.exit` | ✅ | ✅ (lines 283-289) | Match |
| `await.before` | ✅ | ✅ (lines 300-306) | Match |
| `await.after` | ✅ | ✅ (lines 314-320) | Match |
| `promise.create` | ✅ | ✅ (lines 328-335) | Match |
| `promise.settle` | ✅ | ✅ (lines 342-350) | Match |
| `microtask.queue` | ✅ | ✅ (lines 357-364) | Match |
| `microtask.execute` | ✅ | ✅ (lines 372-377) | Match |
| `object.create` | ✅ | ✅ (lines 389-396) | Match |
| `property.access` | ✅ | ✅ (lines 403-413) | Match |
| `prototype.lookup` | ✅ | ✅ (lines 420-430) | Match |
| `error.throw` | ✅ | ✅ (lines 441-449) | Match |
| `error.catch` | ✅ | ✅ (lines 457-463) | Match |
| `error.context` | ✅ | ✅ (lines 471-482) | Match |
| `expression.binary` | ✅ | ✅ (lines 497-505) | Match |
| `expression.unary` | ✅ | ✅ (lines 513-520) | Match |

**Conclusion**: 100% coverage. No new event types needed.

---

## Critical Event Fields Verification

### Key Data Fields Used in Mappings

**Researcher**: "We need to verify not just event types, but critical data fields too. Let's check the most pedagogically important fields."

**Developer**: "Agreed. I'll verify each field referenced in mappings exists in schema."

#### Hoisting/TDZ Detection
- `variable.tdz-access.inTDZ` → Schema: ✅ Exists (implied by event type)
- `variable.declare.kind` → Schema: ✅ Line 44
- `variable.declare.inTDZ` → Schema: ✅ Line 45

#### Type Coercion Detection
- `expression.binary.coercionOccurred` → Schema: ✅ Line 503
- `expression.binary.operator` → Schema: ✅ Line 499
- `expression.binary.left/right/result` → Schema: ✅ Lines 500-502

#### Closure Tracking
- `closure.capture.capturedVariables` → Schema: ✅ Line 224
- `closure.capture.capturedScopeId` → Schema: ✅ Line 223
- `closure.capture.capturedInLoop` → Schema: ❓ **NOT in schema**

**Educator**: "Wait, `capturedInLoop` isn't in the schema? That's critical for the loop+closure misconception (use case 3.3)!"

**Developer**: "Let me check the mapping... Category 3.3 references this field. But looking at trace-event-schemas.md lines 218-226, the `closure.capture` event doesn't include `capturedInLoop`."

**Researcher**: "This is a gap. The field was referenced in `event-type-reference.md` (line 41) as 'Critical: capturedInLoop reveals loop+closure reference bugs', but it's missing from the actual schema."

→ **GAP IDENTIFIED**: `closure.capture.capturedInLoop` field

#### Prototype Delegation
- `prototype.lookup.lookupChain` → Schema: ✅ Line 426
- `prototype.lookup.foundAt` → Schema: ✅ Line 427

#### Async Event Loop
- Base event `sequenceId` → Schema: ✅ Line 17 (all events)
- `microtask.queue.taskType` → Schema: ✅ Line 362

#### Reference Tracking
- `object.create.objectId` → Schema: ✅ Line 392
- `variable.assign.value` → Schema: ✅ Line 60 (SerializedValue with objectId)

#### This Binding
- `function.call.thisValue` → Schema: ✅ Line 130
- `function.call.callType` → Schema: ✅ Line 129

**All critical fields verified** (except 1 gap noted above).

---

## Config Option Coverage Analysis

### Granularity Options Referenced in Mappings

**Developer**: "Now checking config options against `trace-configuration.md`..."

#### Variables Granularity
- Mappings use: `"all"`, `"declarations-only"`, `"writes-only"`, `"none"`
- Schema supports: ✅ All four options (trace-configuration.md lines 26-43)

#### Functions Granularity
- Mappings use: `"all"`, `"user-code-only"`, `"none"`
- Schema supports: ✅ All three options (lines 46-59)

#### Scopes Granularity
- Mappings use: `"all"`, `"function-only"`, `"none"`
- Schema supports: ✅ All three options (lines 62-75)

#### Control Flow Granularity
- Mappings use: `"detailed"`, `"basic"`, `"none"`
- Schema supports: ✅ All three options (lines 78-91)

#### Async Granularity
- Mappings use: `"all"`, `"await-only"`, `"none"`
- Schema supports: ✅ All three options (lines 94-107)

#### Objects Granularity
- Mappings use: `"all"`, `"creation-only"`, `"none"`
- Schema supports: ✅ All three options (lines 110-123)

#### Errors Granularity
- Mappings use: `"all"`, `"throws-only"`, `"none"`
- Schema supports: ✅ All three options (lines 126-139)

#### Expressions Toggle
- Mappings use: `true`, `false`
- Schema supports: ✅ Boolean (lines 142-152)

**All granularity options: 100% coverage**

### Filter Options Referenced in Mappings

#### Variable Name Filtering
- Mappings use: `excludeBuiltins: true`
- Schema supports: ✅ Line 186

#### Function Name Filtering
- Mappings use: Built-in exclusion (covered by `excludeBuiltins`)
- Schema supports: ✅ Lines 172-179

**All filter options: 100% coverage**

### Performance Options Referenced in Mappings

#### Sampling
- Mappings use: `{ enabled: true, rate: 3-5, strategy: "systematic" }`
- Schema supports: ✅ Lines 217-227

#### Event Limits
- Mappings use: `maxEvents: 5000-50000`
- Schema supports: ✅ Lines 208-213

#### Streaming
- Mappings use: `streaming: true`
- Schema supports: ✅ Lines 232-239

**All performance options: 100% coverage**

### Serialization Options Referenced in Mappings

#### Value Depth
- Mappings use: `"none"`, `"shallow"`, `"deep"`
- Schema supports: ✅ Lines 246-260

#### Max Depth
- Mappings use: `maxDepth: 1-3`
- Schema supports: ✅ Lines 263-269

#### Circular References
- Mappings use: `"registry"`, `"mark"`
- Schema supports: ✅ Lines 272-282

**All serialization options: 100% coverage**

---

## Summary of Gaps

### Event Type Gaps
**Count**: 0
**Status**: ✅ Complete coverage

### Event Field Gaps
**Count**: 1
**Gap identified**:
- `closure.capture.capturedInLoop` (boolean field)
  - **Impact**: Needed for use case 3.3 (Closure variable reference misconception)
  - **Severity**: MEDIUM - workaround possible (tools can infer from loop events + closure timing)
  - **Recommendation**: Add field to `closure.capture` event schema

**Educator**: "Can tools work around this gap?"

**Developer**: "Yes. Tools can detect if a closure was captured inside a loop by checking if a `loop.enter` or `loop.iterate` event occurred between the scope creation and the closure capture. It's inferrable from event ordering."

**Researcher**: "That's a valid workaround, but explicit is better than implicit. The field should be in the schema to reduce tool complexity. Recommendation: Add this field in a schema revision."

→ **Consensus**: Document gap, proceed with current mappings (tools can infer), recommend schema enhancement

### Config Option Gaps
**Count**: 0
**Status**: ✅ Complete coverage

### Overall Assessment

**Event Coverage**: 30/30 event types (100%)
**Field Coverage**: Critical fields present (1 enhancement recommended)
**Config Coverage**: All granularity, filter, performance, serialization options (100%)

**Conclusion**: Existing embody infrastructure (Phase 5) fully supports 50 assessment use cases with only 1 minor field enhancement recommended (non-blocking).

---

## 3-Persona Team Review

**Developer**: "I'm surprised. Zero event type gaps. The Phase 5 event taxonomy must have been comprehensive."

**Educator**: "It makes sense - the 30+ events cover all major JavaScript language features: variables, functions, scopes, control flow, async, objects, errors, and expressions. What else is there in execution?"

**Researcher**: "This validates the Phase 5 research. The event taxonomy was grounded in both language semantics AND educational research (misconceptions, threshold concepts, QLCs). The 100% coverage confirms theoretical soundness."

**Developer**: "The one gap (`capturedInLoop`) is interesting. It's an optimization - tools CAN infer it, but having it explicit reduces tool complexity."

**Educator**: "From a pedagogy standpoint, that field directly addresses a documented misconception. Making it explicit signals to tool developers 'this matters pedagogically'."

**Researcher**: "Agreed. I recommend we add it to Phase 5 schemas in a future revision. For now, document the workaround."

→ **Team consensus**: Proceed to Phase 1D (event coverage matrix) with current infrastructure. Document `capturedInLoop` enhancement for future schema revision.

---

## Next: Event Coverage Matrix

Create visual matrix showing which events support which assessment use cases (Phase 1D task).
