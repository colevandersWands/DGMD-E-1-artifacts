# User Journey: Marcus Thompson
## Teaching Recursion While Learning It Himself

---

### Context
**User**: Marcus Thompson, 41-year-old math teacher forced to teach programming
**Goal**: Understand recursion well enough to teach it tomorrow
**Scenario**: Night before recursion lesson, has avoided this topic for weeks
**Emotional State**: Panic mixed with resignation - the teaching equivalent of stage fright

---

## Journey Stages

### 1. The Dread Builds
**Sunday, 8:00 PM - Home Office**

Marcus opens his lesson plan for tomorrow. Topic: Recursion with Fibonacci. His stomach drops.

**Current Preparation**:
- Has watched 6 YouTube videos (more confused than before)
- Printed Stack Overflow explanations (don't make sense)
- Attempted to trace fibonacci(5) on paper (got lost at fibonacci(3))

**The Code He Must Teach**:
```javascript
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

**Internal Monologue**:
> "I'm a fraud. Fifteen years teaching math successfully, and tomorrow I'll be exposed. Maybe I can call in sick?"

**Attempted Explanation to Mirror**:
> "So class, recursion is when a function calls itself... and then... it keeps calling... until... something?"

**Emotion**: Dread, impostor syndrome at maximum

---

### 2. Desperate Late-Night Search
**10:45 PM - Still at Computer**

Marcus has cycled through frustration to desperation.

**Search History**:
- "explain recursion to a 5 year old"
- "recursion for dummies"
- "recursion without computer science degree"
- "how to teach something you don't understand"
- "recursion math teacher help"
- "explain recursion like I'm five" ← Current search

**Failed Attempts**:
- Russian dolls analogy (confused himself)
- Mirror facing mirror (made it worse)
- Mathematical induction connection (not the same thing)

**Breaking Point**:
> "If I can explain quadratic equations to struggling students, why can't I understand this?"

---

### 3. StoryLines Discovery
**11:15 PM - Last Hope**

Google search leads to StoryLines via a teacher forum post: "Finally understood recursion after 3 months!"

**Initial Reaction**:
> "StoryLines? Probably another tool that assumes I already understand. But what else do I have?"

**First Impressions**:
- No signup (relief - no evidence of struggle)
- Metaphor selection catches eye
- Sees "Master Chef's Recipe" option
- "I cook. I understand recipes. Maybe?"

**Decision**:
> "One more try. If this doesn't work, I'm YouTubing it live in class tomorrow."

---

### 4. The First Glimmer
**11:25 PM - Starting Simple**

Marcus starts with fibonacci(2) - keeping it manageable.

**The Cooking Metaphor Appears**:
```javascript
function fibonacci(n) {
    // "Head chef gets order for Fibonacci Dish #2"
    if (n <= 1) {
        return n; // "Dishes 0 and 1 are pre-made!"
    }

    // "Recipe says: order two smaller dishes first"
    const leftRecursion = fibonacci(n - 1);  // "Order ticket for Dish #1"
    const rightRecursion = fibonacci(n - 2); // "Order ticket for Dish #0"

    return leftRecursion + rightRecursion;   // "Combine both dishes!"
}
```

**First Understanding**:
> "Wait... so the head chef doesn't make everything. He delegates? Like a kitchen brigade?"

**Visual Elements That Click**:
- Order tickets stacking up (call stack!)
- Chefs waiting for dishes (suspended execution!)
- Pre-made dishes (base cases!)

**Emotion**: Confusion → First ray of hope

---

### 5. The Breakthrough
**11:35 PM - It Clicks**

Marcus watches fibonacci(3) execute with the cooking metaphor.

**The "AHA!" Moment**:
- Head chef (fibonacci(3)) writes two order tickets
- First sous chef (fibonacci(2)) writes two more tickets
- Second sous chef (fibonacci(1)) grabs pre-made dish
- Dishes bubble back up as they're completed
- Order tickets disappear as dishes are served

**Out Loud Realization**:
> "OH MY GOD! The function doesn't do everything at once! It delegates and WAITS! That's why it needs to remember - it's waiting for the dishes to come back!"

**Wife From Other Room**:
> "You okay in there?"

**Marcus**:
> "I UNDERSTAND RECURSION!"

**Emotion**: Genuine breakthrough joy

---

### 6. Building Teaching Confidence
**11:50 PM - Lesson Plan Revision**

Marcus frantically rewrites tomorrow's lesson plan.

**New Approach**:
1. Start with StoryLines on the smartboard
2. Begin with fibonacci(2) - tiny kitchen
3. Build to fibonacci(3) - show delegation
4. Let students predict fibonacci(4)
5. Everyone draws their own "kitchen order board"

**Key Teaching Insights**:
> "I need to be honest with them. 'Class, recursion broke my brain too. Let's figure it out together.'"

**Prepared Statements**:
- "Think of it like a restaurant kitchen"
- "The head chef can't do everything alone"
- "What happens when we run out of pre-made dishes?"

**Emotion**: Anxiety → Preparation confidence

---

### 7. The Honest Classroom
**Monday, 10:00 AM - 4th Period CS Class**

Marcus projects StoryLines on the smartboard.

**Opening Honesty**:
> "I'll be real with you all. Recursion has been my nightmare topic. Last night at 11 PM, I finally got it. Want to see what helped me?"

**Student Reactions**:
- Surprise at teacher vulnerability
- Relief that it's not just them struggling
- Increased attention from honesty

**Classroom Dynamics**:
- Students more willing to admit confusion
- "Mr. T, I'm lost" becomes acceptable
- Collaborative discovery atmosphere

---

### 8. Learning Together
**10:15 AM - Interactive Discovery**

Marcus runs fibonacci(2) with the cooking metaphor.

**Teaching Approach**:
> "Okay, I think the head chef writes an order ticket for Dish #1. You think so too? Let's check..."

*[Runs visualization]*

> "We were right! Now what happens with that ticket?"

**Student Participation**:
- "The sous chef gets it!"
- "Wait, he writes ANOTHER ticket?"
- "When does the cooking actually happen?"

**Key Moment**:
Student: "Mr. T, you're learning this with us!"
Marcus: "Yep! And you know what? That's okay!"

**Breakthrough for Shy Student**:
> "So it's like my mom calling me to make dinner, but I call my sister to help, and she calls dad?"

**Marcus**:
> "YES! EXACTLY! You just explained recursion!"

---

### 9. The Confidence Build
**10:30 AM - Students Teaching Marcus**

The classroom dynamic has completely shifted.

**Role Reversal**:
- Students explaining to Marcus
- Marcus asking genuine questions
- Collaborative problem solving

**Example Exchange**:
> Student: "Mr. T, what if we do fibonacci(0)?"
> Marcus: "I... don't know. Let's find out together!"
> *[Runs visualization]*
> Both: "Oh! It's pre-made! It just returns 0!"

**Class Energy**:
- Engaged and participating
- No fear of being wrong
- Teaching each other

**Success Metric**:
- 70% of class can trace fibonacci(4) by end
- Marcus can too!

---

### 10. The Ripple Effect
**Two Weeks Later**

Marcus has transformed his teaching approach.

**Changes in Teaching Style**:
- Admits when he doesn't know
- Learns alongside students
- Uses StoryLines for new topics
- Creates "Learning Together" atmosphere

**Student Feedback**:
> "Mr. T is the best because he doesn't pretend to know everything"
> "I like that we figure stuff out together"
> "Not scared to be wrong anymore"

**Department Meeting**:
> Marcus: "I've started using this visualization tool. My recursion unit pass rate went from 60% to 85%."
> Other Teacher: "But you're not a CS expert..."
> Marcus: "Exactly! That's why it works!"

**New Initiative**:
- Starts teacher support group
- "Non-CS Teachers Teaching CS"
- Weekly StoryLines exploration sessions
- Shared document: "Concepts We Learned Together This Week"

---

## Journey Metrics

### Success Indicators
- **Personal**: From panic to understanding in 45 minutes
- **Teaching**: 85% student comprehension (up from 60%)
- **Classroom**: Participation increased 3x
- **Cultural**: Created safe learning environment
- **Professional**: Became resource for other conscripted CS teachers

### Transformation Timeline
1. **8:00 PM**: "I'm a fraud"
2. **11:25 PM**: "One more try"
3. **11:35 PM**: "I UNDERSTAND RECURSION!"
4. **10:00 AM**: "Let's learn together"
5. **10:30 AM**: Students teaching teacher
6. **Two weeks later**: Leading teacher support group

### Critical Features for Marcus
1. No signup (no evidence of struggle)
2. Start simple option (fibonacci(2))
3. Cooking metaphor (familiar context)
4. Visual call stack (order tickets)
5. Speed control (replay moments)
6. Classroom projection mode

### Emotional Journey
- Terror → Desperation → Hope → Understanding → Vulnerability → Empowerment

---

## Design Implications

### What Worked for Marcus
- **Familiar metaphor** (cooking) over technical jargon
- **Start tiny** (fibonacci(2)) not fibonacci(5)
- **Honest struggle** visible in tool design
- **Classroom-ready** projection and controls
- **Replay capability** for "let's check that again"

### Features for Teacher Success
1. Teacher mode with presentation controls
2. Progressive complexity options
3. Student prediction features
4. Collaborative exploration tools
5. No account requirement (dignity preserved)
6. Export lesson materials

### Supporting Vulnerable Users
- Acknowledge that confusion is normal
- Start with smallest possible example
- Celebrate incremental understanding
- Enable learning alongside students
- Make vulnerability a strength

### Marcus's Testimonial
> "StoryLines saved my teaching career. Not because it made me an expert, but because it let me learn alongside my students. My vulnerability became my strength. When I said 'I don't know, let's find out,' my classroom transformed."

### Feature Request from Marcus
> "Can you add a 'Teacher Learning Mode' that explicitly says 'It's okay not to know this yet'? And maybe suggested questions to ask students? Sometimes the best teachers are the ones learning alongside their students."