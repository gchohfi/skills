---
name: squad-manager
description: >
  Create, organize and manage AI agent squads with role-based skill assignments.
  Use this skill when asked to: build a squad, create a team, organize roles,
  assign skills to team members, map responsibilities, set up a hierarchical
  agent structure, define who does what, distribute tasks across agents,
  or create a skill matrix for a team. Works for any industry — medical,
  real estate, e-commerce, SaaS, education, legal, finance, etc.
  Generates complete squad definitions with hierarchy, role descriptions,
  skill assignments per member, API routes, and prompt engineering for each agent.
---

# Squad Manager

Build hierarchical AI agent squads with role-based skill assignments for any domain.

## When to Use

- User wants to create a team/squad of AI agents for a specific business
- User wants to assign specific skills/capabilities to each team member
- User wants a role-to-skill matrix showing who accesses what
- User wants to generate a complete Next.js app with multiple specialized agents

## How to Use

### Step 1: Identify the Domain

Ask the user:
1. What industry/domain? (medical, real estate, legal, education, etc.)
2. What is the main goal? (marketing, operations, sales, support, etc.)
3. How many agents/roles are needed?
4. What skills should the squad cover?

### Step 2: Choose a Squad Template

Load the appropriate template from `examples/`:

| Template | File | Use Case |
|----------|------|----------|
| Marketing Squad | `examples/marketing-squad.md` | Social media, content, analytics |
| Operations Squad | `examples/operations-squad.md` | Process, compliance, reporting |
| Custom Squad | `examples/custom-squad.md` | Build from scratch |

### Step 3: Generate the Squad

Use the role-skill matrix system from `references/role-skill-matrix.md` to:

1. Define the hierarchy (Supervisor → Managers → Specialists)
2. Map skills to each role
3. Generate the complete structure

### Step 4: Output

Generate one or more of:
- **Squad Charter** (SQUAD.md) — hierarchy, roles, skills, flows
- **Next.js App** — complete app with API routes, pages, prompts per agent
- **Skill Matrix** — table showing role × skill assignments
- **Notion Board** — if user has Notion MCP, create a board with tasks

---

## Squad Architecture Pattern

Every squad follows this 3-tier hierarchy:

```
Tier 1: SUPERVISOR (1 agent)
   - Coordinates all agents
   - Tracks module completion
   - Recommends priorities

Tier 2: MANAGERS (2-3 agents)
   - Each manages a domain area
   - Groups related specialists

Tier 3: SPECIALISTS (3-7 agents)
   - Each has ONE focused skill
   - Produces specific outputs
```

### Naming Convention

Each agent has:
- **Role Name** (Portuguese): Nome do papel
- **Agent Type**: supervisor | manager | specialist
- **Skills**: List of capabilities this agent has access to
- **API Route**: `/api/[agent-name]`
- **Prompt File**: `lib/prompts/[agent-name].ts`
- **Page**: `app/[agent-name]/page.tsx`

---

## Role-Skill Matrix System

Read `references/role-skill-matrix.md` for the complete matrix system.

The matrix maps:
```
ROLE → SKILLS → TOOLS → OUTPUTS
```

Example:
```
Analista de Perfil → [analise, posicionamento, persona] → [Claude API streaming] → [relatorio de posicionamento]
Designer de Carrossel → [design, copywriting, layout] → [Claude API JSON, html2canvas] → [PNG slides 1080x1350]
```

### Skill Categories

| Category | Skills | Description |
|----------|--------|-------------|
| **Analise** | pesquisa, benchmarks, diagnostico, auditoria | Investigar e reportar |
| **Estrategia** | planejamento, calendario, roadmap, prioridades | Planejar e recomendar |
| **Producao** | copywriting, design, carrossel, video-script | Criar conteudo |
| **Medicao** | metricas, KPIs, dashboards, comparativos | Medir e otimizar |
| **Coordenacao** | supervisao, status, alertas, proximos-passos | Gerenciar o squad |
| **Compliance** | normas, etica, regulamentacao, revisao-legal | Garantir conformidade |

---

## Generating a Next.js App

When the user wants a complete app, generate:

### File Structure
```
app-name/
├── SQUAD.md                    # Squad charter with hierarchy
├── package.json                # Dependencies
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── .gitignore
├── app/
│   ├── globals.css
│   ├── layout.tsx              # Root layout with Sidebar + Context
│   ├── page.tsx                # Dashboard
│   ├── setup/page.tsx          # Entity configuration form
│   ├── supervisor/page.tsx     # Supervisor dashboard
│   └── [agent-name]/page.tsx   # One page per specialist agent
├── app/api/
│   ├── supervisor/route.ts     # Supervisor API
│   └── [agent-name]/route.ts   # One API route per agent
├── lib/
│   ├── anthropic.ts            # Claude SDK init
│   ├── stream.ts               # SSE stream helper
│   └── prompts/
│       ├── supervisor.ts       # Supervisor prompt
│       └── [agent-name].ts     # One prompt per agent
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         # Navigation with all modules
│   │   └── ModuleHeader.tsx
│   ├── supervisor/
│   │   └── StatusDashboard.tsx # Module status cards
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Spinner.tsx
│       └── StreamingText.tsx
├── context/
│   └── [Entity]Context.tsx     # Shared state (localStorage)
├── hooks/
│   ├── useLocalStorage.ts
│   └── useStreamingResponse.ts
└── types/
    └── [domain-types].ts       # Domain-specific types
```

### API Pattern

**Streaming agents** (most agents):
```typescript
// app/api/[agent]/route.ts
import anthropic, { MODEL } from '@/lib/anthropic';
import { createStreamResponse } from '@/lib/stream';
import { systemPrompt, buildUserPrompt } from '@/lib/prompts/[agent]';

export async function POST(request: Request) {
  const body = await request.json();
  const stream = anthropic.messages.stream({
    model: MODEL,
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: 'user', content: buildUserPrompt(body) }],
  });
  return createStreamResponse(stream);
}
```

**JSON agents** (carousel, structured output):
```typescript
// app/api/[agent]/route.ts — non-streaming, returns parsed JSON
const response = await anthropic.messages.create({ ... });
const text = response.content.find(b => b.type === 'text');
return Response.json({ result: JSON.parse(text.text) });
```

### Supervisor Pattern

The Supervisor always:
1. Receives `StatusData` with boolean flags for each module
2. Has a system prompt listing all agents it coordinates
3. Returns prioritized recommendations
4. Has a StatusDashboard component showing cards per module

```typescript
export interface SupervisorStatusData {
  entity: EntityProfile | null;     // The main entity (doctor, property, etc.)
  temModuloA: boolean;              // Each module has a boolean flag
  temModuloB: boolean;
  // ... one flag per specialist agent
}
```

---

## Prompt Engineering Guidelines

Every agent prompt must:

1. **Define the role** clearly in the first sentence
2. **List numbered deliverables** (what the agent must output)
3. **Include domain compliance** rules (CFM for medical, CRECI for real estate, etc.)
4. **Specify the tone** (educativo, tecnico, acessivel, etc.)
5. **For JSON agents**: explicitly say "RESPONDA APENAS com JSON valido, sem markdown"

### Prompt Template
```typescript
export const systemPrompt = `Voce e um [ROLE] especializado em [DOMAIN] no Brasil.
Sua funcao e [MAIN_TASK].

[COMPLIANCE_RULES]

Forneça:
1) [DELIVERABLE_1]
2) [DELIVERABLE_2]
...
N) [DELIVERABLE_N]

[TONE_AND_STYLE_INSTRUCTIONS]`;
```

---

## Pre-built Squad Templates

Read the examples directory for ready-to-use templates:

- `examples/marketing-squad.md` — 7 agents for digital marketing
- `examples/operations-squad.md` — 6 agents for business operations
- `examples/custom-squad.md` — Template for building any squad from scratch
