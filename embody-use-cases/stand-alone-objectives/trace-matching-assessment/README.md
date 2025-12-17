# Trace-Matching Assessment

> I didn't draft a full UX for this assessment. To me, the value of `embody` + this MCQ is that it can be (relatively) easily embedded in existing assessment environments.

This type of assessment goes two ways:

1. Given a program, select the correct trace.
2. Given a trace, select the correct program.

## #1 Program -> Trace

To create this quiz you would trace the program using `embody` with [config.json](./config.json), then copy the trace multiple times making misconception-based distractors to diagnose a learners' understanding.

Trace modification logic falls outside `embody`'s responsibility.

## #2 Trace -> Program

To create this quiz you would trace the program with [config.json](./config.json), then use static analysis (not provided by `embody`) to modify the program into misconception-based variations to diagnose a learners' understanding.

# `declare`/`available` discrepancy

There is a discrepancy between how "declare" and "available" are used in the trace data and the trace quiz. This is an example of the boundary between `embody` and the pedagogical software that consumes the traces:

- `embody`'s trace is close to the JS spec. It logs "declaration" events when a scope is created, while `let` and `const` variables are still in the _temporal dead zone_ (TDZ). The "available" event is logged when the declaration line in the source code is reached.
- The beginner-level (higher abstraction) notional machine represented by the trace assessment ignores the TDZ and simply refers to "declaration" as the line where the `let`/`const` keyword was used.
