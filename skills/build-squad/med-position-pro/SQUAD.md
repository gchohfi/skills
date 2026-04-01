# med-position-pro — PRD Tecnico

## Produto

Plataforma de posicionamento medico premium com IA.
Analisa perfil, concorrencia, referencias, define posicionamento,
gera conteudo (carrosseis, reels, legendas), revisa compliance CFM,
mede performance e mantem memoria viva por medica.

---

## Squad: Versao Lean (11 Agentes)

```
Medical Growth Supervisor
├── Profile Intelligence Manager
│   ├── Instagram Profile Analyst
│   ├── Competitor & Market Analyst
│   └── Reference & Audience Analyst
├── Editorial Positioning Manager
│   ├── Medical Positioning Strategist
│   ├── Content Architect
│   └── Compliance Reviewer
└── Performance & Learning Manager
    └── Metrics & Learning Analyst
```

Nota: Memory & Knowledge Curator opera como funcao interna
do Performance & Learning Manager, nao como agente separado.

---

## Agentes — Detalhamento

### Tier 1: Supervisor

| # | Role | Missao | Inputs | Outputs |
|---|------|--------|--------|---------|
| 1 | **Medical Growth Supervisor** | Coordenar o squad, decidir prioridade do ciclo, consolidar outputs, garantir coerencia | Status de todos os modulos | Analise consolidada + prioridades + alertas |

### Tier 2: Managers (implicitos nos prompts, nao sao agentes separados)

Os 3 managers sao representados pela logica de agrupamento e handoff,
nao como agentes com API propria. Isso evita overhead desnecessario na v1.

### Tier 3: Specialists

| # | Role | Missao | API | Modo |
|---|------|--------|-----|------|
| 2 | **Instagram Profile Analyst** | Ler bio, grid, destaques, linguagem. Gerar scores de clareza, autoridade, coerencia, conversao | `/api/profile-diagnosis` | streaming |
| 3 | **Competitor & Market Analyst** | Mapear concorrentes locais/aspiracionais, padroes do nicho, saturacoes, oportunidades | `/api/competitor-analysis` | streaming |
| 4 | **Reference & Audience Analyst** | Organizar referencias + ler dores, desejos, objecoes e linguagem da paciente ideal | `/api/reference-audience` | streaming |
| 5 | **Medical Positioning Strategist** | Definir tese central, territorio, diferenciacao, arquetipo, metodo proprietario | `/api/positioning` | streaming |
| 6 | **Content Architect** | Decidir formato, funcao da peca, sequencia narrativa, calendario + gerar carrosseis/reels/legendas | `/api/content-architect` | json (carrossel) + streaming (plano) |
| 7 | **Compliance Reviewer** | Revisar CFM, LGPD, claims, promessas, linguagem de risco | `/api/compliance` | streaming |
| 8 | **Metrics & Learning Analyst** | Ler metricas, explicar performance, propor testes, atualizar memoria | `/api/metrics-learning` | streaming |

---

## Handoff Chain

```
1. Profile Analyst → diagnostico do perfil + scores
2. Competitor Analyst → mapa de concorrencia + gaps
3. Reference & Audience Analyst → referencias + desejos do publico
         ↓ (consolidado)
4. Positioning Strategist → tese central + metodo + diferenciacao
         ↓
5. Content Architect → pilares + calendario + pecas (carrossel/reels/legenda)
         ↓
6. Compliance Reviewer → aprovado ou ajustes
         ↓
7. [Publicacao]
         ↓
8. Metrics & Learning Analyst → leitura + aprendizado + memoria
         ↓
9. Supervisor → visao consolidada + proximo ciclo
```

---

## Telas do App

| Rota | Tela | Agente(s) |
|------|------|-----------|
| `/setup` | Cadastro da medica | - |
| `/profile-diagnosis` | Diagnostico do Perfil | Instagram Profile Analyst |
| `/competitor-analysis` | Analise de Concorrencia | Competitor & Market Analyst |
| `/reference-audience` | Referencias & Publico | Reference & Audience Analyst |
| `/positioning` | Posicionamento | Medical Positioning Strategist |
| `/content-architect` | Plano Editorial & Gerador | Content Architect |
| `/compliance` | Revisao de Compliance | Compliance Reviewer |
| `/metrics-learning` | Performance & Aprendizado | Metrics & Learning Analyst |
| `/brand-memory` | Memoria da Marca | (leitura de localStorage) |
| `/supervisor` | Supervisor | Medical Growth Supervisor |

---

## Skill Matrix

```
                          analise  pesquisa  estrategia  producao  metricas  compliance  coordenacao
Supervisor                  ★        -          ★          -         ★          ★           ★
Profile Analyst             ★        ★          -          -         -          -           -
Competitor Analyst          ★        ★          -          -         -          -           -
Reference & Audience        ★        ★          ★          -         -          -           -
Positioning Strategist      ★        -          ★          -         -          -           -
Content Architect           -        -          ★          ★         -          -           -
Compliance Reviewer         ★        -          -          -         -          ★           -
Metrics & Learning          ★        -          ★          -         ★          -           -
```

---

## Regras Anti-Caos

1. Specialists nao falam direto com o Supervisor
2. Todo specialist entrega em formato padronizado
3. Compliance revisa DEPOIS da estrategia, nao antes
4. Metricas ajustam a estrategia, nao matam a marca
5. Memoria viva e obrigatoria — sem ela o sistema recomeça

---

## Compliance

- CFM Resolucao 2.336/2023
- Tom educativo, nunca sensacionalista
- Nao prometer resultados ou curas
- Identificar CRM sempre
- Nao fazer propaganda de medicamentos
- LGPD quando aplicavel (dados de pacientes)

---

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Claude API (@anthropic-ai/sdk)
- html2canvas (export PNG)
- Deploy: Vercel
- Repo: GitHub

---

## Versao Expandida (19 agentes)

Para escalar, dividir:
- Reference & Audience → Reference Mapping Specialist + Audience & Desire Analyst
- Content Architect → Content Architecture Specialist + Carousel Copy Architect + Reels Hook Specialist + Visual Direction Specialist
- Metrics & Learning → Metrics Analyst + Content Performance Diagnostician + Experimentation Specialist + Memory & Knowledge Curator
- Adicionar: Proprietary Method Architect (sob Positioning)
