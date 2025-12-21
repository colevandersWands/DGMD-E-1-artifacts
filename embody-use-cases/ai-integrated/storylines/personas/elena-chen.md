# PERSONA: Elena Chen

> "I can write the code, but I don't really understand what's happening when it runs."

## Background

Elena is a 19-year-old computer science sophomore at State University, originally from San Francisco. She chose CS because she loved the logical puzzles in her high school AP Computer Science class, but university-level programming has proven more challenging than expected. She's the first in her immigrant family to study technology, and there's subtle pressure to succeed - her parents sacrificed a lot to send her to college.

Elena excelled at math throughout school and thought programming would be similar. She can solve algorithmic problems on paper, but struggles to bridge the gap between static code and dynamic execution. When her programs don't work as expected, she often resorts to random changes rather than systematic debugging because she can't visualize what's happening inside the computer.

## Current Situation

It's week 8 of her Data Structures course, and Elena is working on implementing a sorting algorithm that requires swapping elements. She understands the high-level concept - exchange two values' positions - but when her implementation doesn't work, she can't figure out why. She's tried:

```javascript
// Her broken attempt
function swap(arr, i, j) {
  arr[i] = arr[j];
  arr[j] = arr[i]; // Why doesn't this work???
}
```

She discovered StoryLines through a TA who noticed her struggling during office hours. "Try this," they said, "it might help you see what your code is actually doing." Elena is skeptical but desperate. She's already failed one quiz because she couldn't trace through variable assignments during the exam.

## Motivations

- **Primary:** Understand execution flow well enough to debug independently
- **Secondary:** Build confidence to tackle more complex programming concepts
- **Hidden:** Prove to herself (and her family) that she belongs in tech

She wants to move from "coding by coincidence" to genuinely understanding execution flow. Elena needs to see the invisible - how values move through variables, how assignments happen sequentially, not simultaneously. Traditional debuggers overwhelm her with too much information; she needs something more intuitive.

## Pain Points

- Traditional debuggers show state but don't explain state changes
- Can't mentally simulate code execution beyond 2-3 steps
- Learns better through narrative and metaphor than abstract concepts
- Imposter syndrome makes her reluctant to ask for help
- Time pressure (4 other courses + part-time campus job)

## How She Uses StoryLines

Elena pastes her broken swap function into StoryLines at 11 PM in her dorm room. She selects the "Fantasy Quest" metaphor theme because she's always loved fantasy novels - they help her escape stress.

First, she studies the simpler variable swap to understand the core concept:

```javascript
// Simple variable swap she starts with
let a = 2;
let b = 1;
let temp;

temp = a; // The gremlin copies the scroll...
a = b; // Then overwrites the first...
b = temp; // Finally uses the copy!
```

The Gremlin story helps her visualize: "Oh! The value isn't _moving_ from `a` to `temp` - it's being _copied_!" This fundamental insight clicks.

Then she applies this understanding to her actual problem - array swapping:

```javascript
// The correct array swap she needs
function swap(arr, i, j) {
  let temp = arr[i];  // "Gremlin copies the spell from spellbook[3]..."
  arr[i] = arr[j];    // "Overwrites position 3 with spell from position 7..."
  arr[j] = temp;      // "Places the copied spell into position 7!"
}

// She can now trace through:
let spells = ["fire", "ice", "wind", "earth"];
swap(spells, 1, 3);  // Swapping "ice" and "earth"
```

The fantasy metaphor extends beautifully - the array becomes a spellbook, indices are page numbers, and the gremlin is reorganizing spells. She finally understands why her original attempt failed: `arr[j] = arr[i]` would just copy the already-overwritten value!

She adjusts the timeline slider slowly, watching the array's memory visualization change. For the first time, she sees that array elements are just variables with numeric names, and the same copy-then-overwrite pattern applies. The narrative gives her mental hooks to remember the sequence.

## Metaphor Preference

**Fantasy/Adventure Stories** - Elena connects deeply with quest narratives, magical transformations, and mystical explanations. The Gremlin tale resonates because:

- It transforms abstract operations into tangible magical acts
- The "ancient scroll" framing makes the code feel like discovering secret knowledge
- Fantasy elements make the learning process feel less intimidating and more engaging

She finds that whimsical, narrative-driven explanations stick in her memory better than technical descriptions. During her next quiz, she literally pictures the gremlin at the chalkboard reorganizing spells in his book when tracing through array swap operations.

## Success Criteria

- Can correctly predict code output before running it
- Debugging time reduced from hours to minutes
- Confidence transitioning to professional debuggers to study her class assignments.
- Confidence to help classmates with similar problems
- Grades improve from C+ to B+ or better
- Stops saying "I'm not a real programmer"

## Technical Context

- Uses MacBook Air (hand-me-down from cousin)
- Codes in VS Code but doesn't use advanced features
- Browser: Chrome with 47 tabs open at any given time
- Prefers video tutorials over written documentation
- Takes handwritten notes while using StoryLines, drawing arrays as spellbooks

## Emotional Journey

Frustration → Skepticism → "This is for kids..." → "Wait, this actually helps" → "Aha!" moment → Growing confidence → Evangelizing to study group

## Learning Evolution

**Week 1-2:** Uses StoryLines for every assignment, even simple ones
**Week 3-4:** Starts predicting what the visualization will show before running
**Week 5-6:** Can mentally simulate array swaps using the spellbook metaphor
**Week 7-8:** Helps roommate debug their bubble sort implementation
**By Finals:** Tutoring other students, explaining arrays as magical spellbooks
