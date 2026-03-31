# Operations Squad Template

Squad de operacoes empresariais com 6 agentes especializados.
Para gestao interna, processos, compliance e reporting.

## Hierarquia

```
              SUPERVISOR
           Gerente de Operacoes
                   |
         +---------+---------+
         |         |         |
     PROCESSOS  PESSOAS  FINANCEIRO
         |         |         |
    Analista   Analista  Analista
    de Proc.   de RH     Financ.
         |
    Auditor de
    Compliance
```

## Roles & Skills

### Tier 1: Coordenacao

| Role | Skills | API | Output |
|------|--------|-----|--------|
| **Supervisor** (Gerente de Operacoes) | coordenacao, status, alertas, KPIs | `/api/supervisor` | Dashboard operacional + prioridades |

### Tier 2: Processos

| Role | Skills | API | Output |
|------|--------|-----|--------|
| **Analista de Processos** | mapeamento, otimizacao, fluxos, SOP | `/api/processos` | Mapa de processos + melhorias |
| **Auditor de Compliance** | auditoria, normas, riscos, checklists | `/api/compliance` | Relatorio de conformidade + alertas |

### Tier 3: Pessoas

| Role | Skills | API | Output |
|------|--------|-----|--------|
| **Analista de RH** | recrutamento, onboarding, avaliacao, cultura | `/api/rh` | Planos de acao + avaliacoes |

### Tier 4: Financeiro

| Role | Skills | API | Output |
|------|--------|-----|--------|
| **Analista Financeiro** | orcamento, fluxo-caixa, projecoes, custos | `/api/financeiro` | Relatorios + projecoes |
| **Analista de Metricas** | KPIs, dashboards, comparativos, metas | `/api/metricas` | Dashboard + recomendacoes |

## Skill Matrix

```
                    processos  compliance  pessoas  financeiro  metricas  coordenacao
Supervisor            -           -          -         -          -          ★
Analista Processos    ★           ★          -         -          -          -
Auditor Compliance    ★           ★          -         -          -          -
Analista RH           -           ★          ★         -          -          -
Analista Financeiro   -           ★          -         ★          ★          -
Analista Metricas     -           -          -         -          ★          -
```

## Fluxo de Trabalho

```
1. Setup          → Cadastro da empresa
2. Processos      → Mapeamento e otimizacao
3. Compliance     → Auditoria e conformidade
4. RH             → Gestao de pessoas
5. Financeiro     → Analise financeira
6. Metricas       → KPIs e dashboard
7. Supervisor     → Visao consolidada
```
