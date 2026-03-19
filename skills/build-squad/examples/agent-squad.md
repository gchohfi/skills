## Instructions

You are being asked to coordinate multiple Claude agents to work together on a complex task. An agent squad breaks a large problem into subtasks, assigns specialized agents, runs them in parallel, and synthesizes the results.

## When to Use Agent Squads

Use agent squads when a task:
- Has **independent subtasks** that can run in parallel
- Benefits from **multiple perspectives** (e.g., security review + performance review + UX review)
- Is **too large** for a single agent to handle efficiently
- Requires **specialized expertise** across different domains

## Agent Roles

Choose from these agent archetypes based on the task:

| Agent Role | Purpose | Best For |
|------------|---------|----------|
| **Researcher** | Explore codebase, read docs, gather context | Understanding existing code, finding patterns |
| **Implementer** | Write code, create files, make changes | Feature development, bug fixes |
| **Reviewer** | Analyze code quality, find issues, suggest improvements | Code review, security audit, performance analysis |
| **Tester** | Write and run tests, verify behavior | Test coverage, regression testing |
| **Architect** | Design solutions, plan implementation strategy | System design, refactoring plans |
| **Explorer** | Quick codebase navigation, file discovery | Finding files, understanding structure |

## Squad Patterns

### Pattern 1: Parallel Research
Use when you need to gather information from multiple sources simultaneously.

```
Task: "Understand how authentication works in this app"

Squad:
  Agent 1 (Explorer): Find all auth-related files
  Agent 2 (Researcher): Read auth middleware and understand the flow
  Agent 3 (Researcher): Read auth tests to understand expected behavior

Synthesis: Combine findings into a complete picture
```

### Pattern 2: Divide and Conquer
Use when implementing a feature that spans multiple files or modules.

```
Task: "Add dark mode support to the app"

Squad:
  Agent 1 (Architect): Plan the implementation, identify all files to change
  --- wait for plan ---
  Agent 2 (Implementer): Update CSS/theme files
  Agent 3 (Implementer): Update component files
  Agent 4 (Implementer): Update settings/config
  --- wait for implementation ---
  Agent 5 (Tester): Run tests and verify

Synthesis: Merge all changes, resolve conflicts
```

### Pattern 3: Multi-Perspective Review
Use when you need diverse viewpoints on the same code.

```
Task: "Review this PR for production readiness"

Squad:
  Agent 1 (Reviewer): Security review — check for vulnerabilities
  Agent 2 (Reviewer): Performance review — check for bottlenecks
  Agent 3 (Reviewer): Code quality — check patterns, readability, DRY
  Agent 4 (Reviewer): Test coverage — check if critical paths are tested

Synthesis: Consolidate all review comments by severity
```

### Pattern 4: Spike and Implement
Use when you need to explore options before committing to an approach.

```
Task: "Migrate from REST to GraphQL"

Squad:
  Agent 1 (Researcher): Research GraphQL libraries compatible with our stack
  Agent 2 (Researcher): Analyze current REST endpoints to map to GraphQL schema
  --- wait for research ---
  Agent 3 (Architect): Design the migration plan based on findings
  --- wait for plan ---
  Agent 4+ (Implementer): Execute the plan in parallel

Synthesis: Deliver the completed migration
```

## Workflow

### Step 1: Decompose the Task
Break the user's request into independent subtasks. Ask yourself:
- Can these subtasks run in parallel, or do some depend on others?
- What agent role is best for each subtask?
- What information does each agent need to succeed?

### Step 2: Launch the Squad
Use the Agent tool to launch agents. Key rules:
- **Independent tasks**: Launch all agents in a single message (parallel execution)
- **Dependent tasks**: Wait for prerequisite agents to complete before launching the next wave
- **Clear prompts**: Each agent gets a complete, self-contained prompt with all context needed
- **Specify research vs. code**: Tell each agent whether to research only or write code

### Step 3: Synthesize Results
After all agents complete:
- Combine findings, removing duplicates
- Resolve any contradictions between agent outputs
- Present a unified result to the user
- If agents wrote code, verify there are no conflicts

## Prompt Template for Agents

When launching an agent, use this structure:

```
You are the [ROLE] agent in a squad working on: [OVERALL TASK]

Your specific subtask: [SUBTASK DESCRIPTION]

Context:
- [Any relevant context the agent needs]
- [File paths, constraints, preferences]

Expected output:
- [What this agent should return]
- [Format: summary, code, list of issues, etc.]

Important:
- [Research only / Write code]
- [Any constraints or boundaries]
```

## Tips

- Start with 2-3 agents max for simple tasks; scale up for complex ones
- Always include an Explorer or Researcher agent first if you lack context
- Use `run_in_background: true` for truly independent agents when you have other work to do
- Prefer foreground agents when you need their results before proceeding
- Keep agent prompts focused — one clear objective per agent
- Name your agents descriptively (e.g., "security-reviewer", "auth-researcher")
