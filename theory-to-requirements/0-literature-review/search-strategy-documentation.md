# Literature Review Search Strategy Documentation

## Search Strategy Overview

Comprehensive 3-4 day literature review targeting programming misconceptions research with focus on data collection requirements for tool developers.

## Primary Search Targets

### 1. ACM Digital Library Search Strategy

**Search Keywords:**
- "programming misconceptions" 
- "novice programmers"
- "debugging education"
- "CS1 difficulties"
- "student programming errors"
- "introductory programming education"

**Search Filters:**
- Publication Date: 2000-2025 (prioritize 2015+)
- Document Types: Research articles, conference papers
- Subject Areas: Education, Programming Languages, Human-Computer Interaction

**Expected Yield:** 50-75 relevant papers for initial screening

### 2. IEEE Xplore Search Strategy

**Search Keywords:**
- "computer science education"
- "programming education research"
- "student errors"
- "programming comprehension"
- "novice programmer behavior"

**Search Filters:**
- Publication Year: 2000-2025
- Content Type: Conference Publications, Journals
- Index Terms: Education, Programming, Learning

**Expected Yield:** 40-60 relevant papers

### 3. Google Scholar Search Strategy

**Primary Queries:**
1. "Students' Misconceptions and Other Difficulties in Introductory Programming"
2. "programming misconceptions novice students data collection"
3. "debugging behavior analysis programming education"
4. "trace data programming comprehension education"

**Citation Chain Strategy:**
- Start with Qian & Lehman (2017) - follow all citations forward and backward
- Use "Cited by" feature extensively
- Track key author networks (Sorva, Robins, Soloway, etc.)

**Expected Yield:** 100+ papers through citation chains

### 4. ResearchGate Search Strategy

**Network-Based Approach:**
- Follow progmiscon.org research base
- Track researcher networks from target papers
- Use "Similar research" recommendations
- Access preprints and working papers

**Target Researchers:**
- Juha Sorva (Aalto University)
- Anthony Robins (University of Otago)  
- Yizhou Qian (University of Rochester)
- Researchers from SIGCSE, ICER conferences

### 5. Educational Database Search

**ERIC Database:**
- "programming education misconceptions"
- "computer science learning difficulties"
- "student debugging behavior"

**Education Source:**
- Focus on empirical studies in CS education
- Look for mixed-methods research with data collection protocols

## Data Extraction Protocol

For each relevant paper, extract:

```
Paper: [Title, Authors, Year, Venue]
Study Type: [Empirical/Theoretical/Literature Review]
Participants: [Number, Level (novice/intermediate), Context]
Sample Size: [How many students/observations]

Misconceptions Identified: [Complete list with descriptions]
Data Collection Method: [Observation/Traces/Interviews/Tests]
Raw Data Required: [What was actually measured/captured]
Raw Data Captured: [Variables, interactions, time, errors, etc.]
Granularity: [Line-level/Function-level/Program-level/Session-level]
Timing Requirements: [Real-time/Post-hoc/Session-based]
Timing: [Real-time/Post-session/Longitudinal]

Detection Indicators: [What patterns revealed misconceptions]
Tool/Environment: [IDE, debugger, custom system, etc.]
JavaScript Relevance: [Direct/Adaptable/Not applicable]
Data Infrastructure Notes: [What would be needed to replicate]
```

## Quality Criteria

**Inclusion Criteria:**
- Empirical studies with clear methodology
- Focus on novice/beginner programmers (CS1/CS2 level)
- Clear identification of specific misconceptions
- Documented data collection procedures
- Published in peer-reviewed venues

**Priority Papers:**
- Recent studies (2015+) with robust data collection
- Studies that include trace data or detailed behavioral analysis  
- Cross-institutional or large-scale studies
- Papers that propose taxonomies or classification systems

**Exclusion Criteria:**
- Purely theoretical frameworks without empirical validation
- Advanced programming topics (graduate level)
- Hardware/systems programming focus
- Opinion pieces or experience reports without data

## Documentation Requirements

### Daily Progress Tracking

**Day 1:** ACM Digital Library + IEEE Xplore initial search
**Day 2:** Google Scholar + Citation chain following
**Day 3:** ResearchGate networks + Educational databases  
**Day 4:** Quality screening + data extraction completion

### Weekly Deliverables

1. **comprehensive-bibliography.md** - Complete annotated bibliography
2. **methodology-analysis.md** - Analysis of data collection methods
3. **key-findings-synthesis.md** - Synthesis of misconception patterns
4. **search-strategy-documentation.md** - This document with results

## Success Metrics

- **Breadth:** 100+ papers reviewed across all databases
- **Depth:** 25+ papers with detailed data extraction
- **Quality:** Focus on empirical studies with clear methodologies
- **Relevance:** Strong emphasis on data collection requirements
- **Currency:** Prioritize recent research while following key citations

## Search Progress Tracking

- [ ] ACM Digital Library search completed
- [ ] IEEE Xplore search completed  
- [ ] Google Scholar initial search completed
- [ ] Citation chain following completed
- [ ] ResearchGate network exploration completed
- [ ] Educational database search completed
- [ ] Quality screening and filtering completed
- [ ] Data extraction templates completed
- [ ] Bibliography compilation completed