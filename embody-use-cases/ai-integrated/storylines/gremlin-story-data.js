// ============================================
// THE GREMLIN STORY DATA STRUCTURE
// ============================================
// Maps story segments to code lines and trace events for dynamic UI connections

const GREMLIN_STORY = {
  title: "THE GREMLIN & THE SPELL OF TRANSFERENCE",
  subtitle: "The Ritual of Value Exchange",

  segments: [
    {
      id: "intro",
      text: "A gremlin approaches a blank chalkboard, clutching an ancient scroll that glows faintly.",
      steps: [0, 0],      // Before any code executes
      lines: [],          // No code lines highlighted
      events: [],         // No trace events yet
      memory: {           // Expected memory state
        variables: []
      }
    },

    {
      id: "ritual-begins",
      text: "\"The Ritual of Value Exchange,\" it whispers, unrolling the parchment with reverence.",
      steps: [0, 0],
      lines: [],
      events: [],
      memory: {
        variables: []
      }
    },

    // let a = 2;
    {
      id: "let-a",
      text: "`let a = 2;` — The first incantation! The gremlin draws a box labeled [a] and inscribes \"2\" within.",
      steps: [0, 14],     // Maps to timeline position 0-14%
      lines: [1],         // Highlights line 1 in code
      events: [0, 1, 2],  // Events: declare, initialize, available for 'a'
      memory: {
        variables: ["a: 2"]
      }
    },

    // let b = 1;
    {
      id: "let-b",
      text: "`let b = 1;` — Another verse. A second box [b] appears, blessed with \"1\".",
      steps: [15, 35],    // Timeline 15-35%
      lines: [2],         // Line 2 in code
      events: [3, 4, 5],  // Events: declare, initialize, available for 'b'
      memory: {
        variables: ["a: 2", "b: 1"]
      }
    },

    // let temp;
    {
      id: "let-temp",
      text: "`let temp;` — The third chant. Box [temp] materializes, empty and waiting.",
      steps: [36, 50],    // Timeline 36-50%
      lines: [3],         // Line 3 in code
      events: [6, 7, 8],  // Events: declare, initialize (undefined), available for 'temp'
      memory: {
        variables: ["a: 2", "b: 1", "temp: undefined"]
      }
    },

    {
      id: "transference-begins",
      text: "\"Now for the transference spell,\" the gremlin mutters, chalk trembling.",
      steps: [50, 55],    // Brief pause before the swap
      lines: [],          // No specific line
      events: [],
      memory: {
        variables: ["a: 2", "b: 1", "temp: undefined"]
      }
    },

    // temp = a;
    {
      id: "temp-gets-a",
      text: "`temp = a;` — It peers into [a], sees the sacred 2, duplicates it into [temp].",
      steps: [56, 71],    // Timeline 56-71%
      lines: [5],         // Line 5 (line 4 is empty)
      events: [9, 10],    // Events: read 'a', assign 'temp'
      memory: {
        variables: ["a: 2", "b: 1", "temp: 2"]
      }
    },

    // a = b;
    {
      id: "a-gets-b",
      text: "`a = b;` — Gazing at [b]'s 1, it erases [a]'s old mark, inscribing the new.",
      steps: [72, 85],    // Timeline 72-85%
      lines: [6],         // Line 6
      events: [11, 12],   // Events: read 'b', assign 'a'
      memory: {
        variables: ["a: 1", "b: 1", "temp: 2"]
      }
    },

    // b = temp;
    {
      id: "b-gets-temp",
      text: "`b = temp;` — Finally, [temp]'s 2 flows into [b], completing the exchange.",
      steps: [86, 100],   // Timeline 86-100%
      lines: [7],         // Line 7
      events: [13, 14],   // Events: read 'temp', assign 'b'
      memory: {
        variables: ["a: 1", "b: 2", "temp: 2"]
      }
    },

    {
      id: "ritual-complete",
      text: "The gremlin steps back, exhausted. The ritual is complete: [a] holds 1, [b] holds 2.",
      steps: [100, 100],  // End state
      lines: [],          // No specific line
      events: [],
      memory: {
        variables: ["a: 1", "b: 2", "temp: 2"]
      }
    },

    {
      id: "finale",
      text: "\"The ancient magic works!\" it gasps. The values have danced their mystical swap.",
      steps: [100, 100],  // End state
      lines: [],
      events: [],
      memory: {
        variables: ["a: 1", "b: 2", "temp: 2"]
      }
    }
  ]
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Find the story segment for a given timeline step
 * @param {number} step - Timeline position (0-100)
 * @returns {Object} The matching story segment
 */
function getStorySegmentForStep(step) {
  return GREMLIN_STORY.segments.find(segment =>
    step >= segment.steps[0] && step <= segment.steps[1]
  ) || GREMLIN_STORY.segments[0];
}

/**
 * Find story segments that reference a specific code line
 * @param {number} lineNumber - Line number in the code
 * @returns {Array} Array of matching segments
 */
function getSegmentsForLine(lineNumber) {
  return GREMLIN_STORY.segments.filter(segment =>
    segment.lines.includes(lineNumber)
  );
}

/**
 * Get the timeline range for a story segment
 * @param {string} segmentId - The segment's ID
 * @returns {Array} [start, end] timeline positions
 */
function getTimelineRangeForSegment(segmentId) {
  const segment = GREMLIN_STORY.segments.find(s => s.id === segmentId);
  return segment ? segment.steps : [0, 0];
}

// ============================================
// EXPORTS
// ============================================
export {
  GREMLIN_STORY,
  getStorySegmentForStep,
  getSegmentsForLine,
  getTimelineRangeForSegment
};