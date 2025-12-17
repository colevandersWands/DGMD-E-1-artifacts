# Trace Table Assessment

Trace tables are a classic (and empircally validated) way to teach and learn algorithms. Trace tables without automated validation help study algorithms for learners who already understand program semantics. However they are less helpful for learners to _early_ in their journey because it's very hard for to catch their own mistakes, which can lead to learners cementing misconceptions. [Trace tables with automatic feedback _can_ help learners master program semantics](https://onlinelibrary.wiley.com/doi/pdf/10.1111/jcal.12757).

## Manual Validation with Automated Traces

The first Study Lenses prototype provides 3 types of trace table at different levels of granularity that learners can position over their editor; [_variable steps_](./variable-steps/manual-validation-prototype.gif), [_variable values_](./variable-values/manual-validation-prototype.gif), and [_operators_](./operators/manual-validation-prototype.gif). Learners can validate their manual traces by comparing their work to an automated trace printed to the console\*.

This is better than nothing (which is why I made it), but the UX would be much better if learners recieved automated feedback directly in their trace table:

- A "feedback" button would be available at the top of the table.
- It would indicate extra or missing rows with a breadcrumb.
- It would highlight correct entries one color/texture and signal a √.
- It would highlight incorrect entries a different color/texture and signal an _x_.
- Additional logic could be implemented to give more descriptive feedback on which concepts/features were incorrectly traced (eg. declarations, coercion, assign vs. compare, ...)

\* These traces are generated using the predecessor to `embody` that logged directly to the console (did not return a trace array) and used an earlier version of Aran.

## Automated Feedback with `embody`

I have included the configs and trace data that would be necessary to automatically validate the trace tables in each example gif. The logic to compare the completed tables to the trace data falls outside `embody`'s responsibility.

The configured demo traces also contain type data not currently represented in the trace table gifs that would allow more granular assessment of learners' understanding of types & coercion (even if these particular examples doesn't feature coercion). This will bloat the trace, but is pedagogically justifiable as coercion is both a challenging aspect of JS _and_ central to understanding operators.

There is also a discrepancy between how "declare" and "available" are used in the trace data and the trace tables. This is an example of the boundary between `embody` and the pedagogical software that consumes the traces:

- `embody`'s trace is close to the JS spec. It logs "declaration" events when a scope is created, while `let` and `const` variables are still in the _temporal dead zone_ (TDZ). The "available" event is logged when the declaration line in the source code is reached.
- The beginner-level (higher abstraction) notional machine represented by the trace table ignores the TDZ and simply refers to "declaration" as the line where the `let`/`const` keyword was used.

## Other Use Cases for automated Trace Tables

Yoshi Malaise's paper [JsStories: Improving Social Inclusion in Computer Science Education Through Interactive Stories](https://arxiv.org/abs/2504.04006) discusses using generated trace tables to walk learners through a function's execution:

> Next, in the run phase, students are required to execute the provided code while following along with an automatically filled-in trace table. Each line of the code execution is highlighted, allowing students to observe changes in the trace table for that specific line. This type of exercise was included because tracing code, i.e. simulating its execution, enhances understanding. An example of this exercise is shown in Figure 3. As illustrated, the fourth line of the code currently being executed is highlighted and the trace table shows the value assigned to the capital variable. Initially, we implemented the run exercise by using the JavaScript parser Acorn3 to generate an abstract syntax tree (AST). Additionally, Acorn-walk4 was used to traverse the tree and extract all the necessary information to build the trace table. However, this functionality was later reimplemented using the Aran5 library. Aran allows developers to utilise Aspect-oriented Programming to weave advice into the AST of the code. By injecting some code every time a READ or WRITE occurs, we can automatically build a trace table based on any arbitrary piece of JavaScript code.
