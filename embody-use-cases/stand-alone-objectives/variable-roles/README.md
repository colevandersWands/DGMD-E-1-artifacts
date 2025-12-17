# Variable Roles

build a utility that:

- takes a program as an argument
  - calls `embody` with code and configs focusing only on variable events
- analyzies the trace
- returns a data structure like this:
  - ```json
    {
      "varName": {
            role: ["role1", "role2", ...],
            // scope IDs are determined by their creation sequence in execution, nothing clever
            scope: 2 // for when there is more than one with the same name
      },
      // ...
    }
    ```

Then we can build environments that use this utility to, for example:

- quiz learners on the variable roles in their programs
- suggest program style improvements detectable by variable use patterns
- add breadcrumbs to code in an editor labeling and explaining variable roles
