# PERSONA: Marcus Thompson

> "I barely understand recursion myself - how am I supposed to teach it to 30 teenagers?"

## Background

Marcus is a 41-year-old math teacher at Lincoln High in suburban Atlanta. He's been teaching algebra and geometry for 15 years with consistently excellent results. But this year, due to budget cuts and the new state mandate for computer science education, he was "voluntold" to teach two sections of Introduction to Programming alongside his regular math classes. His only programming experience? A single JavaScript workshop last summer and whatever he can learn from YouTube the night before each lesson.

His math classroom - now doing double duty as a computer lab - still has his geometric proofs on the walls, but they're joined by hastily-printed programming concept posters he found online. Where he once felt confident explaining quadratic equations, he now fumbles through explanations of loops and functions, often learning the material just days ahead of his students. His secret fear? That his brightest students already know more than he does.

## Current Situation

It's November, and Marcus has reached the recursion unit in the curriculum - the topic he's been dreading since August. He spent last weekend watching six different YouTube videos about recursion, taking pages of notes, but he still doesn't fully grasp it himself. His attempts to explain it so far have been disasters:

- Tried using Russian nesting dolls (confused himself halfway through)
- Drew a factorial diagram that even he couldn't follow
- Attempted to trace through fibonacci(5) on the board, got lost at fibonacci(3)
- His "recursion is like looking in parallel mirrors" analogy just confused everyone more

When he shows students this code:

```javascript
function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  const leftRecursion = fibonacci(n - 1);
  const rightRecursion = fibonacci(n - 2);
  return leftRecursion + rightRecursion;
}

fibonacci(5); // What happens?!
```

He's as lost as his students. He can't explain why `fibonacci(5)` becomes `fibonacci(4) + fibonacci(3)` because he's not entirely sure himself. When a student asks "What happens to all those function calls?" Marcus deflects with "Great question! Let's... explore that together." His internal monologue: _Please don't ask follow-up questions._

## Motivations

- **Primary:** Survive teaching programming without embarrassing himself in front of students
- **Secondary:** Actually understand the material well enough to help struggling students
- **Hidden:** Prove to himself he can master something completely outside his comfort zone

Marcus knows he's a good teacher - his math students consistently score well and genuinely enjoy his classes. But programming makes him feel like a first-year teacher again: unprepared, uncertain, and constantly worried he's doing more harm than good. He desperately needs resources that explain concepts to him first, then show him how to teach them.

## Pain Points

- He doesn't understand recursion well enough to explain it confidently
- Most online resources assume programming knowledge he doesn't have
- Students can tell when he's faking understanding
- No time to properly learn concepts (teaching 5 classes + grading)
- Fear that tech-savvy students will expose his ignorance
- Imposter syndrome from teaching outside his expertise

## How He Uses StoryLines

Marcus discovers StoryLines through a desperate 2 AM Google search: "explain recursion like I'm five." The next day, during his prep period, he runs fibonacci(3) through StoryLines for himself first, repeatedly. Finally, FINALLY, something clicks.

He tests it with his most challenging class - 4th period. Instead of pretending to be the expert, he's honest: "I found something that finally helped me understand recursion. Let's learn it together." He projects StoryLines on the smartboard and loads the fibonacci function, selecting the "Master Chef's Recipe" metaphor:

```javascript
function fibonacci(n) {
  // "Chef needs to make fibonacci dish #5"
  if (n <= 1) {
    return n; // "Dishes 0 and 1 are pre-made - just grab from the shelf!"
  }

  // "Recipe says: first order the n-1 dish..."
  const leftRecursion = fibonacci(n - 1); // "Write ticket for dish #4, wait at pass..."

  // "Then order the n-2 dish..."
  const rightRecursion = fibonacci(n - 2); // "Write ticket for dish #3, wait at pass..."

  // "Combine both dishes to complete the order!"
  return leftRecursion + rightRecursion; // "Mix the two dishes together, serve!"
}
```

The cooking metaphor finally makes recursion click for Marcus:

- The head chef (original call) delegates to sous chefs (recursive calls)
- Each chef writes "order tickets" (pushes to call stack) and waits at the pass
- Base cases are "pre-made dishes" on the shelf (no cooking needed!)
- The separate variables (`leftRecursion`, `rightRecursion`) are like labeled plates waiting to be combined
- Chefs combine returned dishes (unwinding the stack)
- The kitchen's order board shows all pending tickets (visualized call stack)

For the first time, Marcus genuinely understands what's happening. "Oh! So `leftRecursion` is like putting the first dish on the counter while we wait for the second one!" His relief is visible to students, and his authentic discovery makes them pay attention. A student chimes in: "So that's why we need variables - to hold the dishes!" Marcus: "YES! Exactly! I didn't get that until just now!"

## Classroom Integration

**Tuesday's Lesson Plan (written at 11 PM Monday night):**

**Opening (5 min):** "I'll be honest - recursion broke my brain when I first saw it. Today we're going to figure it out together."

**Introduction (15 min):** Marcus runs StoryLines with fibonacci(2) first

- "Let's start small. I need to see this myself too."
- He genuinely learns alongside students
- "Wait, so fibonacci(2) calls fibonacci(1) AND fibonacci(0)? Let me replay that..."
- His visible learning process normalizes struggle

**Guided Practice (15 min):** Class tackles fibonacci(3) together

- Marcus: "I think the head chef writes two tickets. You think so too? Let's check..."
- Students feel safe being wrong because Marcus is learning too
- "Can someone help me understand line 2? I'm still fuzzy on the base case"

**Independent Work (10 min):** Students explore fibonacci(4) in pairs

- Marcus circulates, learning from students who get it faster
- "Show me how you're thinking about this - that helps me too"

**Closure (2 min):** "What's one thing that clicked for you today? Still confused? Me too on some parts. We'll practice more tomorrow."

## Metaphor Preference

**Cooking/Recipe Metaphors** - Marcus finds culinary analogies universally relatable:

- Recipes calling other recipes (recursive calls)
- Mise en place preparation (base cases)
- Kitchen hierarchy (call stack)
- Order tickets (function calls waiting to return)
- Plating the final dish (returning the final result)

The cooking metaphor works because:

- Every student has some kitchen experience
- The delegation model matches restaurant kitchens
- "Waiting for ingredients" explains suspended execution
- Combining dishes parallels combining recursive results

## Differentiated Instruction

Using StoryLines' configuration controls, Marcus adapts for different learners:

- **Struggling students:** Start with fibonacci(2), slow timeline speed
- **Advanced students:** Explore fibonacci(8), discuss optimization needs
- **Visual learners:** Focus on call stack visualization panel
- **Kinesthetic learners:** Act out the chef metaphor physically

## Success Criteria

- Marcus can trace through fibonacci(5) without notes
- Students see him as a fellow learner, not a fake expert
- Class participation increases (students less afraid to be wrong)
- 70% of students can explain recursion using cooking metaphor
- Marcus gains confidence to tackle next difficult topic

## Technical Context

- Classroom: 30 aging Windows desktops (half work properly)
- Personal laptop: 5-year-old Dell he brings from home
- Smartboard: Frequently glitches, he's learned workarounds
- Students: Mix of personal devices and school Chromebooks
- Prep: Uses his planning period to pre-run tomorrow's examples

## Emotional Journey

Terror at teaching CS → Frustration with incomprehensible resources → Desperation at 2 AM → "Aha!" moment with StoryLines → Relief at understanding → Joy at learning alongside students → Confidence from authentic teaching

## Teaching Innovation

After surviving the recursion unit, Marcus:

- Creates a "Learning Together" classroom culture where confusion is normalized
- Develops a peer teaching system where students who "get it" help explain
- Starts a teacher support group for non-CS teachers forced to teach programming
- Maintains a shared document: "Concepts That Broke My Brain (And How I Fixed Them)"

## Long-term Impact

Marcus's vulnerable teaching approach:

- Creates a classroom where failure is part of learning
- Inspires other non-CS teachers to embrace teaching programming
- Leads to district providing actual training for conscripted CS teachers
- Proves that expertise isn't required for effective teaching - curiosity and persistence are
