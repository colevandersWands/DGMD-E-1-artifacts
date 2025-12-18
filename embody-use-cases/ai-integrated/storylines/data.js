// ============================================
// DEMO CODE (Real variable swap program)
// ============================================
const DEMO_CODE = `let a = 2;
let b = 1;
let temp;

temp = a;
a = b;
b = temp;`;

// ============================================
// PICKLED TRACE DATA
// ============================================
const DEMO_TRACE = [
  // let a = 2;
  {
    line: 1,
    category: 'binding',
    kind: 'declarative',
    keyword: 'let',
    name: 'a',
    event: 'declare'
  },
  {
    line: 1,
    category: 'binding',
    kind: 'declarative',
    keyword: 'let',
    name: 'a',
    event: 'initialize',
    value: 2
  },
  {
    line: 1,
    category: 'binding',
    kind: 'declarative',
    keyword: 'let',
    name: 'a',
    event: 'available'
  },

  // let b = 1;
  {
    line: 2,
    category: 'binding',
    kind: 'declarative',
    keyword: 'let',
    name: 'b',
    event: 'declare'
  },
  {
    line: 2,
    category: 'binding',
    kind: 'declarative',
    keyword: 'let',
    name: 'b',
    event: 'initialize',
    value: 1
  },
  {
    line: 2,
    category: 'binding',
    kind: 'declarative',
    keyword: 'let',
    name: 'b',
    event: 'available'
  },

  // let temp;
  {
    line: 3,
    category: 'binding',
    kind: 'declarative',
    keyword: 'let',
    name: 'temp',
    event: 'declare'
  },
  {
    line: 3,
    category: 'binding',
    kind: 'declarative',
    keyword: 'let',
    name: 'temp',
    event: 'initialize',
    value: undefined,
    implicit: true
  },
  {
    line: 3,
    category: 'binding',
    kind: 'declarative',
    keyword: 'let',
    name: 'temp',
    event: 'available'
  },

  // temp = a;
  {
    line: 5,
    category: 'binding',
    kind: 'declarative',
    keyword: 'let',
    name: 'a',
    event: 'read',
    value: 2
  },
  {
    line: 5,
    category: 'binding',
    kind: 'declarative',
    keyword: 'let',
    name: 'temp',
    event: 'assign',
    value: 2
  },

  // a = b;
  {
    line: 6,
    category: 'binding',
    kind: 'declarative',
    keyword: 'let',
    name: 'b',
    event: 'read',
    value: 1
  },
  {
    line: 6,
    category: 'binding',
    kind: 'declarative',
    keyword: 'let',
    name: 'a',
    event: 'assign',
    value: 1
  },

  // b = temp;
  {
    line: 7,
    category: 'binding',
    kind: 'declarative',
    keyword: 'let',
    name: 'temp',
    event: 'read',
    value: 2
  },
  {
    line: 7,
    category: 'binding',
    kind: 'declarative',
    keyword: 'let',
    name: 'b',
    event: 'assign',
    value: 2
  }
];

// ============================================
// TRACE PARSING FUNCTIONS
// ============================================
function buildMemoryStateAtIndex(traceEvents, upToIndex) {
  const variables = {};

  // Process events up to the specified index
  for (let i = 0; i <= upToIndex && i < traceEvents.length; i++) {
    const event = traceEvents[i];

    if (event.category === 'binding') {
      const name = event.name;

      switch (event.event) {
        case 'declare':
          // Variable is declared but not yet available (TDZ for let/const)
          if (!variables[name]) {
            variables[name] = { declared: true, available: false, value: undefined };
          }
          break;

        case 'initialize':
          // Variable gets its initial value
          if (variables[name]) {
            variables[name].value = event.value;
          }
          break;

        case 'available':
          // Variable becomes usable
          if (variables[name]) {
            variables[name].available = true;
          }
          break;

        case 'assign':
          // Variable value is updated
          if (variables[name]) {
            variables[name].value = event.value;
          }
          break;

        case 'read':
          // Just a read event, doesn't change state
          break;
      }
    }
  }

  // Format for display
  const variableStrings = [];
  for (const [name, info] of Object.entries(variables)) {
    if (info.available) {
      const displayValue = info.value === undefined ? 'undefined' : info.value;
      variableStrings.push(`${name}: ${displayValue}`);
    }
  }

  return {
    scopes: [
      {
        name: 'Global',
        variables: variableStrings
      }
    ],
    heap: []
  };
}

// ============================================
// GENERATE MEMORY STATES FROM TRACE
// ============================================
function generateMemoryStatesFromTrace(traceEvents) {
  const states = [];
  const totalEvents = traceEvents.length;

  // Create a state for each trace event
  for (let i = 0; i < totalEvents; i++) {
    const step = Math.floor((i / (totalEvents - 1)) * 100);
    const memoryState = buildMemoryStateAtIndex(traceEvents, i);

    states.push({
      step: step,
      eventIndex: i,
      eventType: traceEvents[i].event,
      eventName: traceEvents[i].name,
      ...memoryState
    });
  }

  return states;
}

// ============================================
// MEMORY STATES FOR TIMELINE
// ============================================
const MEMORY_STATES = generateMemoryStatesFromTrace(DEMO_TRACE);

// Add trace event information for step markers
const TRACE_EVENTS = DEMO_TRACE.map((event, index) => ({
  index,
  step: Math.floor((index / (DEMO_TRACE.length - 1)) * 100),
  event: event.event,
  name: event.name,
  value: event.value,
  category: event.category,
  line: event.line // ADD LINE NUMBER for execution highlighting
}));

// ============================================
// ES MODULE EXPORTS
// ============================================
export { DEMO_CODE, DEMO_TRACE, MEMORY_STATES, TRACE_EVENTS };
