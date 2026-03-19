## Instructions

You are being asked to create or organize a development squad. A squad is a small, cross-functional, autonomous team (typically 3-8 people) aligned around a single mission or product area.

## Before You Start

Gather the following information from the user (ask if not provided):

1. **Squad mission**: What is this squad responsible for? (e.g., "Payments platform", "Mobile onboarding", "API infrastructure")
2. **Team size**: How many people are on the squad?
3. **Members** (optional): Names and current roles of the team members
4. **Methodology preference**: Scrum, Kanban, or a hybrid? (default: Scrum)
5. **Sprint cadence**: 1-week or 2-week sprints? (default: 2 weeks)

## Squad Structure

Every squad should have these roles defined:

| Role | Responsibility | Count |
|------|---------------|-------|
| **Tech Lead** | Architecture decisions, code quality, technical direction | 1 |
| **Product Owner** | Backlog prioritization, stakeholder communication, acceptance criteria | 1 |
| **Backend Engineer** | API design, services, data layer | 1-3 |
| **Frontend Engineer** | UI/UX implementation, client-side logic | 1-2 |
| **QA/Test Engineer** | Test strategy, automation, quality gates | 0-1 |

Adjust roles based on squad size and mission. Smaller squads may combine roles.

## Output Format

Generate the squad charter using this format:

```
# [Squad Name] Squad Charter

## Mission
[1-2 sentences describing the squad's purpose and scope]

## Members
| Name | Role | Focus Area |
|------|------|------------|
| [Name] | [Role] | [What they own] |

## Working Agreements
1. [Agreement about code reviews, e.g., "All PRs require at least 1 approval"]
2. [Agreement about communication, e.g., "Async-first, use threads in Slack"]
3. [Agreement about availability, e.g., "Core hours: 10am-4pm local time"]
4. [Agreement about quality, e.g., "No merging without passing CI"]

## Definition of Done
- [ ] Code reviewed and approved
- [ ] Tests written and passing (unit + integration)
- [ ] Documentation updated (if applicable)
- [ ] Deployed to staging and verified
- [ ] Product Owner accepted

## Rituals
[Load examples/squad-rituals.md for detailed ceremony guidelines]

## Initial Backlog
| Priority | Story | Owner | Estimate |
|----------|-------|-------|----------|
| P0 | [Critical item] | [Name] | [Points/Size] |
| P1 | [Important item] | [Name] | [Points/Size] |
| P2 | [Nice to have] | [Name] | [Points/Size] |

## Communication Channels
- **Primary**: [e.g., #squad-payments in Slack]
- **Standup**: [e.g., Daily at 10am via Slack huddle]
- **Docs**: [e.g., Notion/Confluence space]
- **Board**: [e.g., Linear/Jira project]
```

## Tips

- Keep squads small (Amazon's "two-pizza team" rule)
- Every squad should own something end-to-end — avoid shared ownership
- The squad should be able to ship independently without waiting on other teams
- Rotate the "on-call" or "bug duty" role weekly so everyone shares the burden
- Celebrate wins in retros — it builds team morale
