# QLCJS

[QLCJS](https://github.com/teemulehtinen/qlcjs) is a library for generating questions about learner's code to assess understanding of code they developed. In Teemu's own words:

> Generates questions about concrete constructs and patterns in a given JavaScript program. These questions (including answering options) can be posed to a learner to practice introductory programming. These questions include elements to develop program comprehension and program tracing.
>
> Automatic generation enables systems to pose the generated questions to leaners about their own programs that they previously programmed. Such Questions About Learners' Code (QLCs) may have self-reflection and self-explanation effects that are of interest in computing education research.

Below are the live demo links from the [acos-webdev-editor](https://github.com/teemulehtinen/acos-webdev-editor?tab=readme-ov-file) repository:

- [replay a use-case](https://acos.cs.aalto.fi/html/webdev/webdev-editor/replay)
- exercises: [`halveNumber`](https://acos.cs.aalto.fi/html/webdev/webdev-editor/half_number_function), [`countWord`](https://acos.cs.aalto.fi/html/webdev/webdev-editor/travel_array), [`repeatNote`](https://acos.cs.aalto.fi/html/webdev/webdev-editor/repeat_note), [while loop](https://acos.cs.aalto.fi/html/webdev/webdev-editor/while_loop)

## QLCJS refactor with `embody`

The purpose of `embody` is to support the development of tools and experiments like QLCJS. One exercise I undertook while planning `embody`'s config options and trace format was to check if `embody` would actually simplify building and maintaining QLCJS.

Below is a list of markdown docs produced with Claude while considering a refactor using `embody`. Claude needed a lot of hand-holding, but was very good at the details once we were aligned:

1. [CLAUDE.md](CLAUDE.md): Claude's initial documentation
2. [DYNAMIC-ANALYSIS.md](./DYNAMIC-ANALYSIS.md): a co-led deeper dive into qlcjs's dynamic analysis used to generate it's single dynamic - _VariableTrace_.
3. [EMBODY-ASSESSMENT.md](./EMBODY-ASSESSMENT.md): a co-led evaluation of the feasibility and trade-offs of refactoring the qlcjs codebase to use the generic `embody` dependency instead of the current tailor-made variable instrumentation. Spoiler alert, it would simplify the qlcjs codebase _and_ make it easier to expand the question base.
4. [EMBODY-REFACTOR-PLAN.md](./EMBODY-REFACTOR-PLAN.md): a co-led plan for refactoring from the custom instrumentation to `embody`.

## `embody` configs for _while_loop_ demo

This [demo while loop exercise](https://acos.cs.aalto.fi/html/webdev/webdev-editor/while_loop) uses the dynamic tracing question to quiz learners on the sequence of values contained in their stepper variable. Linked is [a sample solution](./program.js) you can copy-paste to demo the environment. The environment appears to:

1. Statically analyzing the program to find the first variable declared.
   - I tested this hypothesis by declaring a variable before the stepper. Only this first variable was traced instead.
   - It only identifies variables declared with `var` and `let`, it does not recognize implicit global declarations.
2. Calls QLCJS with this variable name to generate MCQ data with the values stored in it through execution. (using the trace logic built into qlcjs)
3. Generate distractor traces.
4. Present the options as a MCQ.

Below is how the quiz environment would share responsibilities `embody` if QLCJS used `embody`:

1. The quiz environment implements it's own static analysis to find the first variable name.
2. The quiz environment passes the learner's code to QLCJS which:
   1. QLCJS generates [this config](./config.json) for `embody` using the detected variable's name
   2. QLCJS calls `embody` with this config & the learner code.
      1. `embody` traces all values stored in the variable through the program's execution, returning this [trace data](trace.json) (assuming [this sample solution](./program.js)).
   3. QLCJS generates misconception-based distractors: _miss first_, _miss last_, _extra last_, _shuffled_.
   4. Randomizes the order of the options and returns a data structure representing this MCQ
3. Renders the returnedhis MCQ data into the UI.
4. Evaluates the learner's choice by comparing their selection to the known correct option.
