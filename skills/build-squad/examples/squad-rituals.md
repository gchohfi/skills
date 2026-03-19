## Instructions

You are being asked to set up agile rituals (ceremonies) for a development squad. These are the recurring meetings and workflows that keep the squad aligned and productive.

## Core Rituals

### 1. Daily Standup
**Purpose**: Quick sync on progress and blockers
**Duration**: 15 minutes max
**Cadence**: Daily (same time every day)

```
Format (per person, 1-2 minutes each):
- What I did yesterday
- What I'm doing today
- Any blockers
```

**Rules**:
- Start on time, no waiting for latecomers
- Keep it standing (literally or figuratively) to enforce brevity
- Take detailed discussions offline ("parking lot")
- Rotate who facilitates weekly

---

### 2. Sprint Planning
**Purpose**: Decide what the squad will deliver this sprint
**Duration**: 1-2 hours (for 2-week sprint)
**Cadence**: Start of each sprint

```
Agenda:
1. Review sprint goal (Product Owner, 10 min)
2. Walk through prioritized backlog items (Product Owner, 20 min)
3. Break stories into tasks and estimate (Team, 30-60 min)
4. Commit to sprint scope (Team, 10 min)
```

**Output**: Sprint backlog with committed stories, each with:
- Clear acceptance criteria
- Task breakdown
- Point estimate (Fibonacci: 1, 2, 3, 5, 8, 13)
- Assigned owner

---

### 3. Sprint Review / Demo
**Purpose**: Show what was built, get stakeholder feedback
**Duration**: 30-60 minutes
**Cadence**: End of each sprint

```
Agenda:
1. Sprint goal recap (Tech Lead, 5 min)
2. Live demo of completed work (Team, 20-40 min)
3. Stakeholder Q&A and feedback (All, 10-15 min)
4. Metrics review: velocity, burndown, quality (5 min)
```

**Rules**:
- Only demo "Done" items (meets Definition of Done)
- Show working software, not slides
- Celebrate wins publicly

---

### 4. Retrospective
**Purpose**: Reflect on the process and improve
**Duration**: 45-60 minutes
**Cadence**: End of each sprint (after review)

```
Format (choose one):

Option A — Classic:
  - What went well?
  - What didn't go well?
  - What can we improve?

Option B — Start/Stop/Continue:
  - Start doing: [new practices to try]
  - Stop doing: [practices that aren't working]
  - Continue doing: [practices that are working]

Option C — 4Ls:
  - Liked: [what did we enjoy?]
  - Learned: [what did we learn?]
  - Lacked: [what was missing?]
  - Longed for: [what do we wish we had?]
```

**Output**: 1-3 concrete action items for next sprint. Assign an owner to each.

---

### 5. Backlog Refinement (Grooming)
**Purpose**: Keep the backlog healthy and ready for planning
**Duration**: 30-60 minutes
**Cadence**: Mid-sprint (weekly for 2-week sprints)

```
Agenda:
1. Review upcoming stories (Product Owner, 10 min)
2. Clarify acceptance criteria (Team, 20 min)
3. Estimate stories (Team, 15 min)
4. Identify dependencies and risks (Team, 10 min)
```

**Goal**: Top of backlog (next 2 sprints worth) should always be "ready" — meaning:
- Clear description and acceptance criteria
- Estimated by the team
- Dependencies identified
- Small enough to complete in one sprint

---

## Optional Rituals

### Tech Debt Hour
**Cadence**: Weekly (1 hour)
**Purpose**: Address technical debt without needing sprint backlog approval. Each engineer picks one small improvement.

### Architecture Review
**Cadence**: Bi-weekly or as needed
**Purpose**: Review design decisions for major features before implementation begins.

### Pair Programming Sessions
**Cadence**: As needed
**Purpose**: Knowledge sharing, onboarding, tackling complex problems together.

### Squad Health Check
**Cadence**: Monthly
**Purpose**: Assess squad health across dimensions (delivery speed, code quality, team morale, learning).

```
Rate 1-5 on each dimension:
- Delivery Speed: Are we shipping at a good pace?
- Code Quality: Are we proud of our code?
- Team Morale: Is the team happy and motivated?
- Learning: Are we growing our skills?
- Autonomy: Can we make decisions without waiting?
- Collaboration: Do we work well together?
```

## Tips

- Don't skip retros — they're the most important ritual for continuous improvement
- Timebox everything ruthlessly; meetings that run over lose the team's trust
- Rotate facilitators to develop leadership across the squad
- Cancel meetings that have no agenda or purpose — protect the team's focus time
- Keep Fridays light on meetings to allow deep work and week-end wrap-up
