# Role-Skill Matrix System

Sistema completo de mapeamento de roles para skills em squads de IA.

## Conceitos

### Role (Papel)
Um agente com responsabilidades especificas dentro do squad.
Cada role tem: nome, tipo (supervisor/manager/specialist), skills, API, output.

### Skill (Habilidade)
Uma capacidade ou competencia que um agente pode exercer.
Skills sao agrupadas em categorias.

### Skill Assignment (Atribuicao)
A relacao entre um role e suas skills.
Regra: cada specialist deve ter 1-3 skills focadas. Supervisores tem apenas "coordenacao".

---

## Catalogo de Skills

### Categoria: Analise & Pesquisa

| Skill | Descricao | Exemplo de Output |
|-------|-----------|-------------------|
| `pesquisa` | Investigar dados, fontes, referencias | Relatorio de pesquisa |
| `benchmarks` | Comparar com concorrentes/mercado | Tabela comparativa |
| `diagnostico` | Avaliar estado atual e problemas | Lista de issues + severidade |
| `auditoria` | Verificar conformidade e qualidade | Checklist de auditoria |
| `analise-dados` | Interpretar metricas e numeros | Insights + graficos |
| `posicionamento` | Definir como se diferenciar | Mapa de posicionamento |
| `persona` | Criar perfil do publico-alvo | Persona detalhada |

### Categoria: Estrategia & Planejamento

| Skill | Descricao | Exemplo de Output |
|-------|-----------|-------------------|
| `planejamento` | Criar planos de acao | Plano com etapas + prazos |
| `calendario` | Organizar cronograma | Calendario editorial/operacional |
| `roadmap` | Definir visao de longo prazo | Roadmap trimestral/anual |
| `prioridades` | Ordenar tarefas por impacto | Lista priorizada + justificativa |
| `orcamento` | Planejar gastos e investimentos | Planilha de orcamento |
| `metas` | Definir objetivos mensuráveis | OKRs / KPIs |

### Categoria: Producao & Criacao

| Skill | Descricao | Exemplo de Output |
|-------|-----------|-------------------|
| `copywriting` | Escrever textos persuasivos | Posts, anuncios, emails |
| `design-carrossel` | Criar slides visuais | JSON + PNGs 1080x1350 |
| `video-script` | Roteiros para video/reels | Script com cenas + falas |
| `email-marketing` | Criar campanhas de email | Templates + sequencias |
| `landing-page` | Criar textos para paginas | Copy da landing page |
| `apresentacao` | Criar decks/slides | Estrutura de apresentacao |

### Categoria: Medicao & Otimizacao

| Skill | Descricao | Exemplo de Output |
|-------|-----------|-------------------|
| `metricas` | Coletar e reportar dados | Dashboard de metricas |
| `KPIs` | Definir indicadores-chave | Lista de KPIs + metas |
| `comparativos` | Comparar periodos/campanhas | Relatorio before/after |
| `otimizacao` | Sugerir melhorias baseadas em dados | Lista de acoes + impacto esperado |
| `projecoes` | Estimar resultados futuros | Graficos de projecao |

### Categoria: Coordenacao & Gestao

| Skill | Descricao | Exemplo de Output |
|-------|-----------|-------------------|
| `supervisao` | Acompanhar status de todos | Dashboard consolidado |
| `alertas` | Identificar riscos e urgencias | Lista de alertas priorizados |
| `proximos-passos` | Recomendar acoes imediatas | Lista ordenada de acoes |
| `status-report` | Gerar relatorio de progresso | Relatorio executivo |

### Categoria: Compliance & Legal

| Skill | Descricao | Exemplo de Output |
|-------|-----------|-------------------|
| `normas-cfm` | Regras do Conselho Federal de Medicina | Checklist CFM |
| `normas-oab` | Regras da Ordem dos Advogados | Checklist OAB |
| `normas-creci` | Regras do conselho imobiliario | Checklist CRECI |
| `lgpd` | Lei Geral de Protecao de Dados | Checklist LGPD |
| `revisao-legal` | Revisar conteudo para conformidade | Parecer de conformidade |
| `termos-uso` | Gerar termos e politicas | Documentos legais |

---

## Regras de Atribuicao

### 1. Principio da Responsabilidade Unica
Cada specialist deve ter 1-3 skills focadas. Se um agente precisa de mais de 3 skills, considere dividir em dois agentes.

### 2. Principio da Hierarquia
- **Supervisor**: apenas `supervisao`, `alertas`, `proximos-passos`, `status-report`
- **Manager**: skills de coordenacao + 1-2 skills do dominio
- **Specialist**: 1-3 skills focadas do dominio

### 3. Principio do Compliance
Todo agente que produz conteudo externo (voltado ao publico) deve ter acesso a skill de compliance do dominio.

### 4. Principio da Independencia
Cada agente deve poder operar de forma independente (stateless). Comunicacao entre agentes e feita pelo Supervisor.

---

## Gerando a Skill Matrix

### Template

```
Agente              | Tipo        | Skills                          | API Route
--------------------|-------------|-------------------------------- |------------------
Supervisor          | supervisor  | supervisao, alertas, prioridades| /api/supervisor
[Nome Agente 1]     | specialist  | skill_a, skill_b                | /api/agente-1
[Nome Agente 2]     | specialist  | skill_c                         | /api/agente-2
[Nome Agente 3]     | specialist  | skill_d, skill_e                | /api/agente-3
```

### Validacao

Verifique:
1. Todo agente tem pelo menos 1 skill?
2. Nenhum specialist tem mais de 3 skills?
3. Todas as skills necessarias estao cobertas?
4. Compliance esta atribuida aos agentes que produzem conteudo externo?
5. O supervisor NAO tem skills de producao?

---

## Exemplo: Squad de Marketing Medico

```
Agente                | Tipo        | Skills                              | API Route
----------------------|-------------|-------------------------------------|--------------------
Diretor Marketing     | supervisor  | supervisao, alertas, prioridades    | /api/supervisor
Analista de Perfil    | specialist  | analise, posicionamento, persona    | /api/analise-perfil
Analista Concorrencia | specialist  | pesquisa, benchmarks                | /api/concorrencia
Analista Tendencias   | specialist  | pesquisa, tendencias                | /api/tendencias
Estrategista          | specialist  | planejamento, calendario, metas     | /api/estrategia
Designer Carrossel    | specialist  | design-carrossel, copywriting       | /api/carrossel
Analista Metricas     | specialist  | metricas, KPIs, otimizacao          | /api/metricas
```

Compliance: todos os agentes de producao (Estrategista, Designer) tem `normas-cfm` implicita no prompt.
