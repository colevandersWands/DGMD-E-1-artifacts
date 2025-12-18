// ============================================
// ESM IMPORTS
// ============================================
// import { CodeJar } from 'https://cdn.jsdelivr.net/npm/codejar@4.3.0/dist/codejar.js';  // Removed - using static display
import { DEMO_CODE, MEMORY_STATES, TRACE_EVENTS } from './data.js';
import { GREMLIN_STORY, getStorySegmentForStep, getSegmentsForLine, getTimelineRangeForSegment } from './gremlin-story-data.js';
// STORIES import removed - not exported from data.js

// ============================================
// GLOBAL VARIABLES
// ============================================
let editor;
let currentStep = 30; // Start at 30 to match wireframe
let maxSteps = 100;
let currentHighlights = new Set();

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Initializing Embody + AI Storytelling Demo');

  displayCode(); // Changed from initializeCodeEditor
  displayStory(); // Display the gremlin story
  setupEventListeners();
  updateLineRangeDisplay();
  generateStepMarkers(); // Add step markers to timeline
  updateMemoryVisualization(currentStep);

  // Set initial line highlight based on current step
  handleTimelineChange({ target: { value: currentStep } });
});

// ============================================
// CODE DISPLAY (Static with Prism)
// ============================================
function displayCode() {
  const editorElement = document.getElementById('codeEditor');

  // Create pre element with line-numbers class for Prism plugin
  // data-line attribute starts empty for line-highlight plugin
  editorElement.innerHTML = `<pre data-line="" class="language-javascript line-numbers"><code>${DEMO_CODE}</code></pre>`;

  // Let Prism highlight the code and initialize plugins
  const codeElement = editorElement.querySelector('code');
  if (codeElement && window.Prism) {
    // This will trigger both syntax highlighting and line-numbers plugin
    Prism.highlightElement(codeElement);
  }

  console.log('✅ Code display initialized with line numbers');
}

// ============================================
// STORY DISPLAY
// ============================================
function displayStory() {
  const storyDisplay = document.getElementById('storyDisplay');

  // Clear placeholder content
  storyDisplay.innerHTML = '';

  // Add title
  const title = document.createElement('h2');
  title.textContent = GREMLIN_STORY.title;
  title.style.fontSize = '1.2em';
  title.style.marginBottom = '0.5em';
  title.style.color = 'var(--primary-blue)';
  storyDisplay.appendChild(title);

  const subtitle = document.createElement('h3');
  subtitle.textContent = GREMLIN_STORY.subtitle;
  subtitle.style.fontSize = '0.9em';
  subtitle.style.marginBottom = '1em';
  subtitle.style.color = 'var(--text-secondary)';
  subtitle.style.fontStyle = 'italic';
  storyDisplay.appendChild(subtitle);

  // Add each story segment
  GREMLIN_STORY.segments.forEach(segment => {
    const paragraph = document.createElement('p');
    paragraph.textContent = segment.text;
    paragraph.className = 'story-segment';
    paragraph.dataset.segmentId = segment.id;
    paragraph.dataset.startStep = segment.steps[0];
    paragraph.dataset.endStep = segment.steps[1];
    paragraph.dataset.lines = JSON.stringify(segment.lines);
    paragraph.dataset.events = JSON.stringify(segment.events);
    paragraph.style.marginBottom = '1em';
    paragraph.style.padding = '0.5em';
    paragraph.style.borderRadius = '4px';
    paragraph.style.transition = 'background-color 0.3s ease';

    // Add click handler for navigation
    paragraph.addEventListener('click', () => {
      const startStep = segment.steps[0];
      const timeline = document.getElementById('timeline');
      timeline.value = startStep;
      timeline.dispatchEvent(new Event('input'));
    });

    // Add hover effects
    paragraph.addEventListener('mouseenter', () => {
      if (segment.lines.length > 0) {
        // Preview line highlights on hover
        const preElement = document.querySelector('#codeEditor pre');
        if (preElement) {
          preElement.setAttribute('data-line-preview', segment.lines.join(','));
        }
      }
    });

    paragraph.addEventListener('mouseleave', () => {
      // Remove preview
      const preElement = document.querySelector('#codeEditor pre');
      if (preElement) {
        preElement.removeAttribute('data-line-preview');
      }
    });

    storyDisplay.appendChild(paragraph);
  });

  console.log('📖 Story loaded with', GREMLIN_STORY.segments.length, 'segments');
}

// ============================================
// STORY HIGHLIGHTING
// ============================================
function highlightStorySegment(segmentId) {
  // Remove all existing highlights
  document.querySelectorAll('.story-segment').forEach(segment => {
    segment.classList.remove('active');
    segment.style.backgroundColor = '';
  });

  // Add highlight to active segment
  const activeSegment = document.querySelector(`[data-segment-id="${segmentId}"]`);
  if (activeSegment) {
    activeSegment.classList.add('active');
    activeSegment.style.backgroundColor = 'rgba(74, 144, 226, 0.1)';

    // Scroll segment into view if needed
    const storyDisplay = document.getElementById('storyDisplay');
    const segmentTop = activeSegment.offsetTop;
    const segmentBottom = segmentTop + activeSegment.offsetHeight;
    const scrollTop = storyDisplay.scrollTop;
    const scrollBottom = scrollTop + storyDisplay.clientHeight;

    if (segmentTop < scrollTop || segmentBottom > scrollBottom) {
      activeSegment.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

// ============================================
// LINE HIGHLIGHTING FOR EXECUTION
// ============================================
function highlightExecutionLine(lineNumber) {
  const preElement = document.querySelector('#codeEditor pre');

  if (!preElement) return;

  // Update the data-line attribute
  preElement.setAttribute('data-line', lineNumber ? lineNumber.toString() : '');

  // Re-trigger the Prism line-highlight plugin
  // The plugin automatically removes old highlights when called again
  if (window.Prism?.plugins?.lineHighlight) {
    Prism.plugins.lineHighlight.highlightLines(preElement);
  }

  console.log(`📍 Highlighting line ${lineNumber}`);
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
  // Line range controls
  document.getElementById('lineStart').addEventListener('input', updateLineRangeDisplay);
  document.getElementById('lineEnd').addEventListener('input', updateLineRangeDisplay);

  // Generate button - DISABLED (story functionality commented out)
  // document.getElementById('generateBtn').addEventListener('click', handleGenerateStory);

  // Timeline controls
  document.getElementById('timeline').addEventListener('input', handleTimelineChange);
  document.getElementById('skipStart').addEventListener('click', () => setTimeline(0));
  document.getElementById('skipEnd').addEventListener('click', () => setTimeline(100));
  document.getElementById('stepBack').addEventListener('click', () => stepTimeline(-5));
  document.getElementById('stepForward').addEventListener('click', () => stepTimeline(5));

  // Story segment clicks - DISABLED (story functionality commented out)
  // setupHighlightHandlers();

  console.log('✅ Event listeners attached');
}

// ============================================
// STEP MARKERS GENERATION
// ============================================
function generateStepMarkers() {
  const markersContainer = document.getElementById('stepMarkers');

  // Clear existing markers
  markersContainer.innerHTML = '';

  // Check if TRACE_EVENTS is available (imported from data.js)
  if (!TRACE_EVENTS) {
    console.warn('⚠️ TRACE_EVENTS not found. Step markers will not be generated.');
    return;
  }

  // Generate a marker for each trace event
  TRACE_EVENTS.forEach((event, index) => {
    const marker = document.createElement('div');
    marker.className = `step-marker ${event.event}`;
    marker.style.left = `${event.step}%`;
    marker.setAttribute('data-event-index', index);
    marker.setAttribute(
      'data-tooltip',
      `${event.event}: ${event.name}${event.value !== undefined ? ' = ' + event.value : ''}`
    );

    // Click handler to jump to this event
    marker.addEventListener('click', () => {
      setTimeline(event.step);
      updateEventInfo(index);
    });

    markersContainer.appendChild(marker);
  });

  console.log(`✅ Generated ${TRACE_EVENTS.length} step markers`);
}

// ============================================
// EVENT INFO DISPLAY
// ============================================
function updateEventInfo(eventIndex) {
  const currentEventSpan = document.getElementById('currentEvent');
  const currentStepSpan = document.getElementById('currentStep');

  if (TRACE_EVENTS && TRACE_EVENTS[eventIndex]) {
    const event = TRACE_EVENTS[eventIndex];
    currentEventSpan.textContent = `Event: ${event.event} (${event.name})`;
    currentStepSpan.textContent = `Step: ${event.step}`;

    // Update active marker
    document.querySelectorAll('.step-marker').forEach(marker => {
      marker.classList.remove('active');
    });
    const activeMarker = document.querySelector(`.step-marker[data-event-index="${eventIndex}"]`);
    if (activeMarker) {
      activeMarker.classList.add('active');
    }

    // Highlight the line being executed
    if (event.line) {
      highlightExecutionLine(event.line);
    }
  } else {
    currentStepSpan.textContent = `Step: ${currentStep}`;
  }
}

// ============================================
// LINE RANGE MANAGEMENT
// ============================================
function updateLineRangeDisplay() {
  const startVal = document.getElementById('lineStart').value;
  const endVal = document.getElementById('lineEnd').value;

  // Update display values
  document.getElementById('lineStartVal').textContent = startVal;
  document.getElementById('lineEndVal').textContent = endVal;

  // Ensure end is not less than start
  if (parseInt(endVal) < parseInt(startVal)) {
    document.getElementById('lineEnd').value = startVal;
    document.getElementById('lineEndVal').textContent = startVal;
  }

  // Re-highlight code
  if (editor) {
    editor.updateCode(editor.toString());
  }
}

// ============================================
// STORY GENERATION

// ============================================
// TIMELINE CONTROLS
// ============================================
function handleTimelineChange(e) {
  currentStep = parseInt(e.target.value);
  updateMemoryVisualization(currentStep);

  // Find and highlight the corresponding story segment
  const storySegment = getStorySegmentForStep(currentStep);
  if (storySegment) {
    highlightStorySegment(storySegment.id);
  }

  // Find the closest trace event for this step
  if (TRACE_EVENTS) {
    let closestIndex = 0;
    let minDiff = Math.abs(TRACE_EVENTS[0].step - currentStep);

    for (let i = 1; i < TRACE_EVENTS.length; i++) {
      const diff = Math.abs(TRACE_EVENTS[i].step - currentStep);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }

    updateEventInfo(closestIndex);
  }

  console.log(`📍 Timeline at step ${currentStep}, story: ${storySegment?.id || 'none'}`);
}

function setTimeline(value) {
  document.getElementById('timeline').value = value;
  handleTimelineChange({ target: { value } });
}

function stepTimeline(direction) {
  const timeline = document.getElementById('timeline');
  const newValue = Math.max(0, Math.min(100, parseInt(timeline.value) + direction));
  setTimeline(newValue);
}

// ============================================
// MEMORY VISUALIZATION
// ============================================
function updateMemoryVisualization(step) {
  // Find the memory state for this step (get the last state with step <= current step)
  let memoryState = null;
  for (let i = MEMORY_STATES.length - 1; i >= 0; i--) {
    if (MEMORY_STATES[i].step <= step) {
      memoryState = MEMORY_STATES[i];
      break;
    }
  }
  if (!memoryState) memoryState = MEMORY_STATES[0];

  if (!memoryState) return;

  const memoryViz = document.getElementById('memoryViz');
  let html = '';

  // Render scopes
  if (memoryState.scopes) {
    memoryState.scopes.forEach((scope, idx) => {
      const scopeClass = scope.name === 'Global' ? 'global-scope' : 'function-scope';
      html += `<div class="scope-box ${scopeClass}">
                       <h4>Scope:</h4>`;

      scope.variables.forEach(variable => {
        html += `<div class="variable">${variable}</div>`;
      });

      // Add reference arrow if needed
      if (scope.hasReference) {
        html += `<div class="reference-arrow">↘</div>`;
      }

      html += `</div>`;
    });
  }

  // Render heap
  if (memoryState.heap && memoryState.heap.length > 0) {
    html += `<div class="heap-section">
                   <h4>Heap:</h4>`;

    memoryState.heap.forEach(heapObj => {
      html += `<div class="data-structure">
                       <span>${heapObj.label.split('\n')[0]}</span>
                       <span>${heapObj.label.split('\n')[1] || ''}</span>
                     </div>`;
    });

    html += `</div>`;
  }

  memoryViz.innerHTML = html;
}

// ============================================
// HIGHLIGHTING & CONNECTIONS
// ============================================
// STORY-RELATED FUNCTIONS - COMMENTED OUT
/* Commenting out all story-related functionality to focus on memory viz
function setupHighlightHandlers() {
  // Delegate click handling to parent
  document.addEventListener('click', e => {
    const segment = e.target.closest('.story-segment[data-line-refs]');
    if (segment) {
      handleSegmentClick(segment);
    }

    const codeLine = e.target.closest('.code-line[data-line]');
    if (codeLine) {
      handleCodeLineClick(codeLine);
    }
  });
}

function attachSegmentHandlers() {
  // Add hover effects for segments
  document.querySelectorAll('.story-segment[data-line-refs]').forEach(segment => {
    segment.addEventListener('mouseenter', () => previewHighlight(segment));
    segment.addEventListener('mouseleave', () => clearPreview());
  });
}

function handleSegmentClick(segment) {
  // Toggle selection
  const isSelected = segment.classList.contains('active');

  // Clear all previous selections
  clearAllHighlights();

  if (!isSelected) {
    // Highlight this segment
    segment.classList.add('active');

    // Highlight corresponding code lines
    const lineRefs = segment.dataset.lineRefs?.split(',').map(Number) || [];
    highlightCodeLines(lineRefs);

    // Store in active highlights
    currentHighlights = new Set(lineRefs);

    console.log(`🔦 Highlighting lines: ${lineRefs.join(', ')}`);
  }
}

function handleCodeLineClick(codeLine) {
  const lineNum = parseInt(codeLine.dataset.line);

  // Find story segments that reference this line
  const segments = document.querySelectorAll('.story-segment[data-line-refs]');

  segments.forEach(segment => {
    const lineRefs = segment.dataset.lineRefs?.split(',').map(Number) || [];
    if (lineRefs.includes(lineNum)) {
      segment.classList.add('active');
    } else {
      segment.classList.remove('active');
    }
  });

  // Highlight the clicked line
  clearCodeHighlights();
  codeLine.classList.add('highlighted');
}

function highlightCodeLines(lineNumbers) {
  clearCodeHighlights();

  lineNumbers.forEach(lineNum => {
    const line = document.querySelector(`.code-line[data-line="${lineNum}"]`);
    if (line) {
      line.classList.add('highlighted');

      // Scroll into view if needed (first line only)
      if (lineNumbers[0] === lineNum) {
        line.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
}

function previewHighlight(segment) {
  const lineRefs = segment.dataset.lineRefs?.split(',').map(Number) || [];
  lineRefs.forEach(lineNum => {
    const line = document.querySelector(`.code-line[data-line="${lineNum}"]`);
    if (line && !line.classList.contains('highlighted')) {
      line.style.backgroundColor = 'rgba(74, 144, 226, 0.05)';
    }
  });
}

function clearPreview() {
  document.querySelectorAll('.code-line').forEach(line => {
    if (!line.classList.contains('highlighted')) {
      line.style.backgroundColor = '';
    }
  });
}

function clearAllHighlights() {
  // Clear story segment highlights
  document.querySelectorAll('.story-segment').forEach(segment => {
    segment.classList.remove('active');
  });

  // Clear code line highlights (but keep the line range highlighting)
  clearCodeHighlights();

  // Clear stored highlights
  currentHighlights.clear();
}

function clearCodeHighlights() {
  // Only clear temporary highlights, not the line range highlights
  const startLine = parseInt(document.getElementById('lineStart').value);
  const endLine = parseInt(document.getElementById('lineEnd').value);

  document.querySelectorAll('.code-line').forEach(line => {
    const lineNum = parseInt(line.dataset.line);
    // Keep the highlight if it's in the selected range
    if (lineNum < startLine || lineNum > endLine) {
      line.classList.remove('highlighted');
    }
    line.style.backgroundColor = '';
  });
}
*/ // End of story-related functions comment block

console.log('✨ Demo ready! Use the timeline to explore the variable swap.');
