---
name: build-squad
description: Build and manage development squads — both human dev teams (agile structure, roles, ceremonies, backlog) and AI agent squads (coordinating multiple Claude agents working together on complex tasks). Use this skill when asked to create a squad, organize a team, set up agile workflows, or coordinate multiple agents on a project.
---

# Build Squad

## When to use this skill

Use this skill when the user wants to:
- **Dev Squads**: Create or organize a development squad/team with roles, responsibilities, and agile ceremonies
- **Agent Squads**: Coordinate multiple Claude agents to work together on a complex task (parallel research, divide-and-conquer implementations, multi-perspective reviews)
- **Hybrid**: Combine both — define a human squad structure and use agent squads to accelerate their work

## How to use this skill

1. **Identify the squad type** from the request
2. **Load the appropriate guideline file** from the `examples/` directory:
   - `examples/dev-squad.md` - For creating and organizing human development squads
   - `examples/agent-squad.md` - For coordinating multiple Claude agents on a task
   - `examples/squad-rituals.md` - For agile ceremonies, rituals, and recurring workflows
3. **Follow the specific instructions** in that file

## Squad Types

### Dev Squad (Human Teams)

A dev squad is a small, cross-functional, autonomous team organized around a mission. Use the dev squad template to:
- Define the squad's mission and scope
- Assign roles (Tech Lead, Backend, Frontend, QA, Product)
- Set up agile rituals (standups, planning, retros)
- Create an initial backlog structure
- Establish working agreements and Definition of Done

### Agent Squad (AI Coordination)

An agent squad coordinates multiple Claude agents to tackle complex tasks in parallel. Use the agent squad template to:
- Break a large task into independent subtasks
- Assign specialized agents (researcher, implementer, reviewer, tester)
- Run agents in parallel for maximum throughput
- Aggregate and synthesize results
- Handle dependencies between agent outputs

### Combining Both

For maximum impact, define the human squad structure AND use agent squads to accelerate execution. For example:
- A human squad plans the sprint, then agent squads execute research and implementation in parallel
- An agent squad generates a proposal, then the human squad reviews and iterates

## Keywords
squad, team, agile, scrum, kanban, sprint, backlog, roles, agents, parallel, coordination, multi-agent, dev team, cross-functional
