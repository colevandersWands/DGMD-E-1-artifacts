# WhyLine

The WhyLine is a Java debugging/exploration tool that allows learners to timetravel through their code's execution investigating the internal causes of visible behavior in an animation. It works by instrumenting the Java bytecode, allowing detailed introspection and visualizations.

From the demos and paper, I estimate`embody`'s trace data is detailed enough to replicate a JS WhyLine. It can trace an program's entire execution at the operator level including all bindings, the object heap, references, and even the provenance of primitive values. Embody doesn't provide a virtual environment, but has enough information (when all config options are enabled) that you could simulate the program's execution.

However, the instrumentation is applied to the pre-compiled source code (as much as JS is compiled), so visualizing the "why"s of learner code which uses an animation/drawing library (like p5.js) would either be limited to the site where library code is called ("shallow" instrumentation), or all code used from the library would also need to be instrumented resulting in heavy traces.

I think the right level of abstraction may be the learner's code, instrument library _calls_ but not library _source_. Learners don't need to see inside the library. Instead, you could recognize library calls and inject their documentation to the WhyLine visualization. Then to ask "why" questions about the graphic you could persist and inspect the state of the canvas element, correlating changes back to the most recent library calls.

You could also set up the trace to initially trace at a lower granularity, then rerun the trace for higher granularity around the lines/aspects the learner is investigating. The tradeoffs are: The upfront cost of a slower trace + larger data in memory _vs._ the cost of more frequent but lighter, targeted runs.

WhyLine references:

- [reflection video](https://www.youtube.com/watch?v=UDb2ztrygvs)
- [video demo](https://www.youtube.com/watch?v=pbElN8nfe3k)
- [source code](https://github.com/amyjko/whyline?tab=readme-ov-file)
- [landing page](https://www.cs.cmu.edu/~NatProg/whyline-java.html)
- [retrospective blog post](https://medium.com/bits-and-behavior/ten-years-after-the-whyline-a965d3233909)
