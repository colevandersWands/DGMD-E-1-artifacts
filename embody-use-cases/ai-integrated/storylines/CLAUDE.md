# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

StoryLines is an AI-integrated educational demo that generates narrative stories to explain program execution. It demonstrates how the `embody` execution tracer can provide data to LLMs for creating engaging, accurate metaphorical explanations of code behavior.

This is part of the larger Study Lenses ecosystem, specifically showcasing AI-integrated use cases for the embody tracer.

## Architecture

### Core Components

```
index.html           - Main UI with configuration controls and visualization panels
app.js              - Application logic, event handling, UI updates
data.js             - Execution trace data and memory states
gremlin-story-data.js - Story segments mapped to code lines and trace events
styles.css          - Comprehensive UI styling with CSS variables
```

### Data Flow

1. **Static Display**: Code is displayed using Prism.js for syntax highlighting (not editable)
2. **Timeline Control**: Slider controls step through execution trace events (0-100)
3. **Story Synchronization**: Story segments highlight based on current timeline position
4. **Memory Visualization**: Shows variable states at each execution step
5. **Code Highlighting**: Lines highlight dynamically based on current trace position

## Key Development Commands

Since this is a static demo without build tools:

```bash
# Development
python3 -m http.server 8000    # Serve locally for development
# or
npx serve .                     # If you have Node.js

# No build/test commands - pure client-side application
```

## Technical Details

### Module Structure

The application uses ES modules with CDN imports:
- Prism.js for syntax highlighting (with line-numbers and line-highlight plugins)
- All local modules use relative imports (`./data.js`, `./gremlin-story-data.js`)

### Story-Code Mapping

Each story segment in `gremlin-story-data.js` contains:
- `steps`: Timeline range [start%, end%]
- `lines`: Array of code line numbers to highlight
- `events`: Array of trace event indices
- `memory`: Expected memory state visualization

### UI State Management

- Timeline position drives all UI updates
- Story segments activate based on timeline ranges
- Code highlights update per segment's line mappings
- Memory panel reflects trace state at current step

### Configuration Controls

The UI provides controls for:
- Line range selection (visual only, for future implementation)
- Language features filter (placeholder)
- Metaphor selection (Gremlin Story currently active)
- Detail level slider
- Playback speed control

## Important Context from Parent Projects

### Embody Tracer Philosophy

This demo showcases the embody principle: "We provide execution data, educational tools provide intelligence." The trace data in `data.js` represents raw execution events that the AI story generator would consume.

### Educational Pitfalls to Watch

As noted in README.md: "LLMs are not guaranteed to produce accurate metaphors." The Gremlin story was carefully crafted to avoid misconceptions like "values are removed from one variable when assigned to another."

### Study Lenses Integration

While this is a standalone demo, it demonstrates how Study Lenses tools can layer pedagogical intelligence on top of neutral execution traces. The story generation would be one "lens" among many possible analytical perspectives.

## Common Tasks

### Adding New Story Segments

1. Update `gremlin-story-data.js` with new segment objects
2. Map segments to appropriate timeline ranges (`steps` property)
3. Associate with code lines and trace events
4. Test timeline scrubbing to ensure proper activation

### Modifying the Demo Code

1. Update `DEMO_CODE` constant in `data.js`
2. Regenerate trace data to match new code
3. Update story segments to align with new execution flow
4. Adjust timeline step counts if needed

### Styling Updates

CSS variables in `:root` control the color scheme:
- `--primary-blue`: Main accent color
- `--highlight-yellow`: Active story segment background
- `--code-highlight`: Active code line background

## Development Gotchas

1. **Prism.js Initialization**: Must call `Prism.highlightElement()` after DOM updates
2. **Timeline Events**: Use `input` event for continuous updates, `change` for final values
3. **Story Navigation**: Clicking story segments dispatches synthetic timeline events
4. **Memory States**: Hardcoded in `MEMORY_STATES` array, must sync with trace data
5. **Line Highlighting**: Uses Prism's `data-line` attribute, requires re-highlighting after changes

## Future Integration Points

This demo is designed to eventually connect with:
- Real `embody` tracer for dynamic trace generation
- LLM API for dynamic story generation
- Variable role analysis tools
- Static analysis from hypothetical `examine` tool
- ESLint data for code quality context