# Notional Machine Tool Scenarios

**Purpose**: Concrete scenarios showing how educational tools can use notional machines in practice.

**Note**: These scenarios describe WHAT tools do, not HOW trace data enables them (Phase 5).

---

## Scenario 1: Interactive Debugger with Integrated NMs

**Tool Type**: IDE Plugin / Standalone Debugger

**What It Does**:
- Student sets breakpoints in JavaScript code
- At each breakpoint, tool displays:
  - **Call Stack NM**: Current stack frames with parameters and locals
  - **Memory NM**: Heap and stack layout showing all live objects
  - **Scope Chain NM**: Nested scopes with variable resolution paths
  - **This Binding NM**: Current `this` value and binding rule applied
- Student can switch between NM views while maintaining execution state
- Student can step forward/backward through execution
- All NM visualizations update synchronously

**Educational Goal**: Complete execution understanding at any point

**Use Cases Applied**:
- Call stack frame rendering
- Memory layout display
- Scope chain nesting
- This binding determination
- Interactive stack manipulation
- Memory state time travel

---

## Scenario 2: Async Execution Visualizer

**Tool Type**: Web-based Learning Environment

**What It Does**:
- Student writes async JavaScript (promises, async/await, setTimeout)
- Tool shows three synchronized visualizations:
  - **Call Stack**: Currently executing code
  - **Microtask Queue**: Pending promise .then() callbacks
  - **Macrotask Queue**: Pending setTimeout/setInterval callbacks
- Animation shows event loop processing:
  - Execute sync code
  - Empty microtask queue
  - Take one macrotask
  - Repeat
- Student can pause at any event loop tick
- Student can predict next callback to run, tool validates

**Educational Goal**: Understand async execution order and priorities

**Use Cases Applied**:
- Event loop animation
- Callback queue progression
- Async order prediction
- Event loop introduction (scaffolding)
- Misconception detection: setTimeout immediate

---

## Scenario 3: Closure Quiz Generator

**Tool Type**: Assessment System

**What It Does**:
- Generates code snippets with closures
- Student must predict: what variables are captured, what values they'll have
- After student prediction, tool shows:
  - **Scope Chain NM**: Which variables actually captured
  - **Memory NM**: Where closures stored, what they reference
  - **Call Stack NM**: When outer function exits, inner persists
- Tool detects common misconceptions:
  - "Inner functions can't access outer variables" → targeted hint
  - "Captured variables have values at creation time" → show they're references
- Adapts difficulty based on student accuracy

**Educational Goal**: Build accurate closure mental model through assessment

**Use Cases Applied**:
- Closure capture visualization
- Scope resolution validation
- Misconception detection: closure capture
- Targeted hints: closures
- Adaptive detail level

---

## Scenario 4: Reference vs. Value Explorer

**Tool Type**: Interactive Tutorial

**What It Does**:
- Presents code with primitive and object assignments
- Student predicts: will changes affect original variable?
- Tool shows **Memory NM** with:
  - Stack variables pointing to values or references
  - Arrows showing shared references
  - Annotations marking "value copy" vs "reference copy"
- After prediction, animates the actual execution
- If wrong, shows **Contrast Learning**: side-by-side primitive vs object
- Generates similar exercises until student demonstrates mastery

**Educational Goal**: Internalize reference vs. value semantics

**Use Cases Applied**:
- Reference vs value copying visualization
- Reference sharing detection
- Misconception detection: assignment copying
- Contrast learning pattern
- Counterexample generation

---

## Scenario 5: Recursion Stepper

**Tool Type**: Specialized Learning Tool

**What It Does**:
- Student writes or reads recursive function
- Tool provides **Call Stack NM** with special recursion features:
  - Stack frames color-coded by recursion depth
  - Base case highlighted in green
  - Recursive case highlighted in blue
  - Arrows showing parameter values across calls
- Student can:
  - Step into recursion (add frame)
  - Step out (remove frame)
  - Jump to base case
  - See maximum stack depth reached
- Shows what happens with:
  - Missing base case (stack overflow)
  - Incorrect base case (wrong result)
  - Tail recursion (if optimized)

**Educational Goal**: Demystify recursion through concrete visualization

**Use Cases Applied**:
- Recursive call visualization
- Stack frame prediction
- Progressive stack detail (scaffolding)
- Error-driven learning (stack overflow)
- Targeted hints: recursion

---

## Scenario 6: Prototype Chain Inspector

**Tool Type**: Browser DevTools Extension

**What It Does**:
- Student inspects any JavaScript object in running page
- Tool shows **Prototype Chain NM**:
  - Object → Prototype → ... → Object.prototype → null
  - Each level shows own properties
  - Hover over property shows which level it came from
  - Click "modify prototype" button to change parent prototype
  - Immediately shows effect on child objects
- Special modes:
  - "Class view": Shows class-based code
  - "Prototype view": Shows equivalent prototype code
  - **Class Syntax NM**: Highlights what's sugar vs unique
- Detects misconception: if student expects child unchanged after prototype modification

**Educational Goal**: Understand prototype-based inheritance deeply

**Use Cases Applied**:
- Prototype chain walking visualization
- Prototype lookup verification
- Prototype mutation impact analysis
- Misconception detection: prototype copying
- Class desugaring visualization
- Class vs prototype comparison

---

## Scenario 7: This Binding Detective

**Tool Type**: Linting/Teaching Tool

**What It Does**:
- Analyzes student's JavaScript code for `this` usage
- For each `this` reference, shows **This Binding NM**:
  - Call site highlighted
  - Binding rule applied (implicit, explicit, `new`, arrow, default)
  - Predicted `this` value
  - Warning if likely lost binding (extracted method, callback)
- Suggests fixes:
  - Add `.bind(this)`
  - Change to arrow function
  - Capture `const self = this`
- Shows side-by-side comparison of each fix strategy
- Quiz mode: hides `this` value, asks student to predict

**Educational Goal**: Master `this` binding rules and avoidance strategies

**Use Cases Applied**:
- This binding determination
- This value prediction
- Misconception detection: this lexical
- Binding method comparison
- Targeted hints: this binding
- Comparative diagnosis

---

## Scenario 8: Type Coercion Explainer

**Tool Type**: REPL with Explanations

**What It Does**:
- Student enters JavaScript expressions with mixed types
- Tool shows **Type Coercion NM** before executing:
  - Original types highlighted
  - Conversion steps numbered
  - Algorithm used (ToPrimitive, ToNumber, ToString)
  - Intermediate values during conversion
  - Final result with final types
- Special modes:
  - `==` vs `===` comparison
  - Implicit vs explicit coercion
  - Truthy/falsy evaluation
- Detects surprises: when result doesn't match student prediction
- Generates similar examples for practice

**Educational Goal**: Understand systematic coercion rules, not "random magic"

**Use Cases Applied**:
- Type coercion steps visualization
- Coercion outcome verification
- Misconception detection: random coercion
- Coercion rule introduction (scaffolding)
- Coercion strategy comparison

---

## Scenario 9: Multi-NM Integrated Debugger

**Tool Type**: Advanced IDE Feature

**What It Does**:
- Student codes complex JavaScript (async + closures + OOP)
- At breakpoint, shows 4 NMs simultaneously:
  - **Call Stack**: What's executing
  - **Memory**: What's allocated
  - **Scope Chain**: What's accessible
  - **Event Loop**: What's queued
- Click on variable → highlights in all relevant NMs:
  - Memory: where stored
  - Scope: which scope provides it
  - Stack: which frame owns it
- Click on function → shows:
  - Call Stack: where it's called from
  - Scope: what it captures
  - Memory: where function object lives
  - Event Loop: if it's queued as callback
- Timeline scrubber: rewind/forward, all NMs update synchronously

**Educational Goal**: Holistic program understanding

**Use Cases Applied**:
- Complete program comprehension (multi-NM)
- Time travel debugging
- Integrated debugging pattern
- Layered abstraction
- Multi-modal representation

---

## Scenario 10: Adaptive Learning Platform

**Tool Type**: Intelligent Tutoring System

**What It Does**:
- Tracks student interactions across all NM-based exercises
- Builds student model:
  - SOLO level per NM (prestructural → extended abstract)
  - Misconception inventory (which ones detected)
  - Threshold concept status (liminal vs crossed)
- Adapts content:
  - If student struggles with **Memory NM** → more primitive examples
  - If student excels at **Call Stack** → introduce recursion early
  - If student hits **Event Loop** threshold → extra scaffolding
- Selects exercises using:
  - **Predict-Observe-Explain** for active learning
  - **Misconception Confrontation** when incorrect model detected
  - **Contrast Learning** to highlight critical differences
- Visualizations adapt:
  - Beginners: full automatic visualization
  - Intermediate: must request specific NM views
  - Advanced: predict first, verify with NM only if wrong

**Educational Goal**: Personalized learning path through all 11 NMs

**Use Cases Applied**:
- SOLO level classification
- Misconception detection (all types)
- Threshold concept crossing detection
- Adaptive detail level
- Scaffolded independence
- All educational patterns as appropriate

---

## Scenario 11: Pair Programming Assistant

**Tool Type**: AI Coding Partner

**What It Does**:
- Watches as student codes
- Asks Socratic questions based on NMs:
  - "What will be on the call stack when this function runs?"
  - "Which scope will provide this variable?"
  - "When will this async callback execute?"
- If student answers wrong:
  - Shows relevant NM visualization
  - Asks follow-up: "Why did you think...?"
  - Identifies misconception
  - Provides targeted explanation
- If student answers right:
  - Confirms with NM visualization
  - Asks extension question
  - Gradually increases difficulty
- During debugging:
  - Suggests which NM to inspect
  - "Check the call stack to see where you are"
  - "Look at the scope chain to see what's captured"

**Educational Goal**: Guided discovery with scaffolded questioning

**Use Cases Applied**:
- Question-driven exploration (all NMs)
- Misconception detection
- Targeted hints
- Progressive disclosure
- Scaffolded independence

---

## Scenario 12: Code Review Educator

**Tool Type**: Pull Request Analysis Tool

**What It Does**:
- Analyzes student's code submission
- Compares to reference solution using NMs:
  - **Call Stack**: Do they use recursion when iteration better?
  - **Memory**: Do they create unnecessary object copies?
  - **Event Loop**: Do they block with sync code in async context?
  - **Scope**: Do they pollute global scope unnecessarily?
  - **Prototype**: Do they use deep inheritance when composition better?
- Shows side-by-side NM visualizations:
  - Student approach
  - Reference approach
  - Differences highlighted
- Explains trade-offs:
  - "Your approach uses more memory but is clearer"
  - "Reference solution is faster but harder to understand"
- Suggests improvements with NM justification:
  - "Change this to arrow function (This Binding NM shows lost binding)"
  - "Extract this closure (Scope Chain NM shows unnecessary captures)"

**Educational Goal**: Learn from expert solutions, understand trade-offs

**Use Cases Applied**:
- Comparative diagnosis
- Performance analysis pattern
- Pattern recognition highlighting
- Targeted hints (various)
- Side-by-side execution comparison

---

## Scenario 13: Live Coding Lecture Assistant

**Tool Type**: Instructor Presentation Tool

**What It Does**:
- Instructor writes code live during lecture
- Tool projects NM visualizations on screen:
  - As instructor types, NMs update automatically
  - Instructor can freeze visualization at key moments
  - Instructor can ask class: "What will the call stack look like?"
  - Then reveal actual NM visualization
- Poll mode:
  - Students submit predictions via devices
  - Tool shows distribution of student answers
  - Identifies common misconceptions in class
  - Instructor addresses most common wrong answer
- Replay mode:
  - After lecture, students can replay with NM visualizations
  - Students can control pace
  - Students can toggle NM views on/off

**Educational Goal**: Enhanced live instruction with immediate visualization

**Use Cases Applied**:
- All visualization use cases
- Mental model comparison (class-wide)
- Misconception detection (class-wide)
- Multi-modal representation

---

## Scenario 14: Gamified NM Learning

**Tool Type**: Educational Game

**What It Does**:
- Presents JavaScript code challenges
- Player must build correct NM visualization:
  - Drag stack frames to build call stack
  - Draw arrows between variables and objects (memory)
  - Arrange scopes in hierarchy (scope chain)
  - Order callbacks in queues (event loop)
- Tool validates against actual execution
- Points awarded for:
  - Correct NM construction
  - Speed (faster = more points)
  - Fewer hints used
- Progressive unlocking:
  - Level 1: Memory Model (primitives)
  - Level 5: Memory Model (references)
  - Level 10: Call Stack (simple)
  - Level 15: Call Stack (recursion)
  - Level 20: Event Loop
  - Level 25: All NMs integrated
- Leaderboard showing class progress

**Educational Goal**: Engage students through gamification

**Use Cases Applied**:
- All visualization use cases (student constructs them)
- Validation use cases
- Scaffolded independence
- Progressive disclosure

---

## Scenario 15: NM-Based Code Search

**Tool Type**: Educational Code Repository

**What It Does**:
- Large repository of JavaScript code examples
- Students can search by NM patterns:
  - "Show me examples of deep recursion"
  - "Find closures that capture loop variables"
  - "Examples where prototype modified after instance creation"
  - "Code with mixed promises and setTimeout"
- Each example includes:
  - Code
  - All NM visualizations
  - Explanation of why pattern used
  - Common mistakes with this pattern
- Students can:
  - Filter by complexity level
  - Compare similar patterns
  - Add examples to personal collection
  - Annotate with own notes

**Educational Goal**: Learn from curated examples with NM context

**Use Cases Applied**:
- Pattern recognition highlighting
- All visualization use cases
- Categorization by complexity
- Comparison use cases

---

## Common Scenario Elements

All effective tools share these elements:

**1. Multiple NM Support**: Tools should support multiple notional machines, not just one

**2. Interactivity**: Students should manipulate, predict, explore - not just watch

**3. Immediate Feedback**: Validation happens immediately, not delayed

**4. Adaptive Difficulty**: Content adjusts based on student demonstrated ability

**5. Misconception Detection**: Tools actively identify and address wrong mental models

**6. Clear Boundary**: Tools visualize and validate, but students write the code

**7. Transfer Support**: Help students apply NM knowledge to debugging and design

**8. Integration**: Multiple NMs shown together for holistic understanding

---

## Implementation Priorities for Tool Developers

**Must Have** (MVP):
- At least 2-3 core NMs (Call Stack, Memory, Scope recommended)
- Predict-Observe-Explain pattern
- Basic visualization
- Step-through capability

**Should Have** (V1):
- 5-6 NMs covering foundation + integration layers
- Misconception detection (at least common ones)
- Adaptive scaffolding
- Time travel debugging

**Nice to Have** (V2):
- All 11 NMs
- AI-powered questioning
- Gamification elements
- Class-wide analytics
- Personalized learning paths

**Future** (V3+):
- Real-time pair programming assistant
- Automated exercise generation
- Cross-language NM comparison
- VR/AR visualization modes
