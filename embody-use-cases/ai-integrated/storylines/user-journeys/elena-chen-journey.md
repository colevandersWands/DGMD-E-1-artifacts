# User Journey: Elena Chen
## Learning Variable Swapping Through Fantasy Narratives

---

### Context
**User**: Elena Chen, 19-year-old CS sophomore
**Goal**: Understand why her array swap function doesn't work and fix her sorting algorithm
**Scenario**: Late night debugging session in dorm room, assignment due tomorrow
**Emotional State**: Frustrated, desperate, approaching panic

---

## Journey Stages

### 1. Discovery & Skepticism
**11:47 PM - Dorm Room**

Elena stares at her broken swap function for the third hour. Her sorting algorithm keeps producing wrong results.

```javascript
// Her code that's failing
function swap(arr, i, j) {
    arr[i] = arr[j];
    arr[j] = arr[i]; // This should work, right?
}
```

**Actions**:
- Opens 12th Stack Overflow tab
- Considers messaging TA again (too embarrassed)
- Remembers TA mentioning "StoryLines" tool
- Google searches "StoryLines code visualization"

**Thoughts**:
> "This is probably for kids... but I'm desperate. How is this different from a debugger?"

**Pain Points**:
- Traditional debugger shows values but not WHY they change
- Can't visualize what happens between lines

**Touchpoint**: Google search → StoryLines website

---

### 2. First Interaction
**11:52 PM - StoryLines Homepage**

Elena hesitantly opens StoryLines. The interface is cleaner than expected - not childish.

**Actions**:
- Clicks "Try Now" (no signup required - relief!)
- Sees metaphor selection screen
- Hovers over options: Sports (nah), Cooking (meh), Fantasy (!)
- Selects "Fantasy Quest" theme

**Thoughts**:
> "Fantasy? Like D&D? Okay, this might not be terrible. At least nobody can see me using this."

**Emotions**: Skepticism → Curiosity

**UI Elements Used**:
- Metaphor selector
- Preview animations showing gremlin character

---

### 3. Initial Exploration
**11:55 PM - Code Input Screen**

Elena decides to start simple before tackling her array problem.

**Actions**:
- Pastes simple variable swap example first
- Hits "Visualize" button
- Watches gremlin animation begin

```javascript
// Starting with basics
let a = 2;
let b = 1;
let temp;
temp = a;
a = b;
b = temp;
```

**Experience**:
- Gremlin appears at chalkboard
- Each line triggers animation
- Variables shown as labeled boxes
- Values depicted as scrolls

**Revelation Moment**:
> "Wait... the gremlin COPIES the scroll from box A to temp. It doesn't MOVE it!"

**Emotion**: Confusion → First "aha!"

---

### 4. The Breakthrough
**12:03 AM - Understanding Emerges**

Elena uses timeline slider to replay the critical moment.

**Actions**:
- Drags timeline back to `temp = a`
- Watches frame-by-frame
- Sees value "2" being duplicated, not moved
- Notices original box 'a' still contains "2" after copy

**Mental Model Shift**:
> "Oh my god. Variables aren't containers that empty. They're labels that can be rewritten! The value gets COPIED first, then OVERWRITTEN!"

**UI Interaction**:
- Timeline scrubbing
- Pause at each assignment
- Memory panel showing all values simultaneously

**Emotion**: Breakthrough excitement

---

### 5. Applying to Real Problem
**12:08 AM - Array Swap Understanding**

Elena now tackles her actual array swap problem with new understanding.

**Actions**:
- Clears editor
- Pastes her broken array swap
- Watches it fail in slow motion
- Sees the gremlin overwrite arr[i] first
- Realizes arr[j] = arr[i] copies the NEW value

**Story Integration**:
- Array becomes "spellbook"
- Indices are "page numbers"
- Gremlin tries to swap spells but loses the original

**Fixed Code Emerges**:
```javascript
function swap(arr, i, j) {
    let temp = arr[i];  // Save spell from page i
    arr[i] = arr[j];    // Copy spell from page j to page i
    arr[j] = temp;      // Copy saved spell to page j
}
```

**Emotion**: Relief, genuine understanding

---

### 6. Testing & Validation
**12:15 AM - Confidence Building**

Elena tests her new understanding with her actual sorting algorithm.

**Actions**:
- Copies fixed swap function to her IDE
- Runs her bubble sort - IT WORKS!
- Returns to StoryLines to trace through bubble sort
- Watches array elements swap correctly

**Thoughts**:
> "I can actually SEE the sorting happen. The spells are reorganizing in the spellbook!"

**Features Used**:
- Copy code button
- Share visualization link (saves for later)
- Speed control (slow for complex parts)

---

### 7. Knowledge Consolidation
**12:22 AM - Taking Notes**

Elena documents her learning while it's fresh.

**Actions**:
- Takes screenshot of key frame
- Draws spellbook diagram in notebook
- Writes note: "COPY then OVERWRITE, not MOVE"
- Bookmarks StoryLines

**Reflection**:
> "This is actually how I should think about all assignments. The gremlin thing is silly but... it works?"

**Emotion**: Accomplishment, reduced anxiety

---

### 8. Social Proof
**12:28 AM - Sharing Discovery**

Elena's confidence has grown enough to help others.

**Actions**:
- Messages study group: "Found something that actually helps!"
- Shares StoryLines link
- Screenshots her working code
- Offers to explain tomorrow

**Social Dynamics**:
- No longer embarrassed about struggling
- Positioned as helpful peer, not struggling student
- Builds reputation as resource finder

---

### 9. Extended Learning
**Next Day - Library Study Room**

Elena uses StoryLines to understand more complex concepts.

**Actions**:
- Shows tool to struggling classmate
- Explains swap using gremlin metaphor
- Explores quicksort visualization together
- Takes turns predicting what happens next

**Peer Learning**:
> "See how the gremlin partitions the spellbook? That's the pivot!"

**Features Discovered**:
- Predictive mode (guess before revealing)
- Multiple example library
- Adjustable detail levels

---

### 10. Long-term Impact
**Week 8 → Week 12**

Elena's relationship with programming fundamentally changes.

**Behavioral Changes**:
- Checks StoryLines before implementing new algorithms
- Uses spellbook metaphor in study group explanations
- Confidence in debugging increases dramatically
- Grades improve from C+ to B+

**Tool Usage Evolution**:
- Week 8-9: Every assignment
- Week 10-11: Complex problems only
- Week 12: Helping others learn

**Final Reflection**:
> "I don't need the gremlin for simple stuff anymore. But when recursion comes up, you bet I'm loading up StoryLines!"

---

## Journey Metrics

### Success Indicators
- **Time to Understanding**: 20 minutes (vs 3+ hours traditional)
- **Emotional Journey**: Frustration → Curiosity → Understanding → Confidence
- **Retention**: Can explain swap weeks later using gremlin metaphor
- **Social Impact**: Helps 3 other students
- **Academic Impact**: Assignment submitted on time, full marks

### Key Moments
1. **Lowest Point**: "I'm not a real programmer" (11:47 PM)
2. **Turning Point**: "Values are COPIED not MOVED!" (12:03 AM)
3. **Victory**: "My sort works!" (12:15 AM)
4. **Advocacy**: "Found something that helps!" (12:28 AM)

### Features That Mattered Most
1. No signup friction
2. Fantasy metaphor resonance
3. Timeline scrubbing control
4. Frame-by-frame replay
5. Clean, non-patronizing interface

### Barriers Overcome
- Initial skepticism ("tool for kids")
- Imposter syndrome
- Fear of being judged
- Mental model misconception

---

## Design Implications

### Critical Success Factors
- **Immediate value** without account creation
- **Metaphor choice** that resonates personally
- **Granular control** over execution speed
- **Non-patronizing** presentation
- **Social sharing** without embarrassment

### Must-Have Features for Elena's Success
1. Code input (Story #1)
2. Step execution (Story #2)
3. Timeline control (Story #3)
4. Memory visualization (Story #4)
5. Fantasy metaphor theme (Story #19)

### Emotional Design Considerations
- Reduce fear of judgment
- Build confidence incrementally
- Enable peer helping
- Celebrate understanding moments