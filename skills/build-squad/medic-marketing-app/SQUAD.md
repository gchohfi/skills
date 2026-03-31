# Squad: Medic Marketing AI

## Missao

Plataforma de marketing medico com IA que analisa perfis de medicos, concorrencia e tendencias,
sugere estrategias e carrosseis para Instagram, e mede resultados — ajudando profissionais de
saude a crescerem nas redes sociais de forma etica e eficiente.

---

## Hierarquia do Squad (8 Agentes)

```
                    ┌─────────────────┐
                    │   SUPERVISOR    │
                    │  Diretor de     │
                    │  Marketing      │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
     ┌──────┴──────┐  ┌─────┴──────┐  ┌──────┴──────┐
     │ INTELIGENCIA│  │ ESTRATEGIA │  │  PRODUCAO   │
     │  DE MERCADO │  │  & CONTEUDO│  │  & METRICAS │
     └──────┬──────┘  └─────┬──────┘  └──────┬──────┘
            │               │                │
     ┌──────┴──────┐  ┌─────┴──────┐  ┌──────┴──────┐
     │             │  │            │  │             │
  Analista    Analista  Estrategista  Designer    Analista
  de Perfil   de        de Conteudo   de          de
  Medico     Concorrencia             Carrossel   Metricas
```

---

## Agentes Especializados

### Nivel 1: Coordenacao

| # | Agente | Papel | Entrada | Saida |
|---|--------|-------|---------|-------|
| 1 | **Supervisor** (Diretor de Marketing) | Coordena todos os agentes, analisa status geral, recomenda proximos passos | Status de todos os modulos | Analise consolidada + prioridades |

### Nivel 2: Inteligencia de Mercado

| # | Agente | Papel | Entrada | Saida |
|---|--------|-------|---------|-------|
| 2 | **Analista de Perfil** | Analisa o perfil do medico (especialidade, publico, tom, diferenciais) | Dados do medico + redes sociais | Persona profissional + pontos fortes + oportunidades |
| 3 | **Analista de Concorrencia** | Pesquisa concorrentes na mesma especialidade e regiao | Especialidade + cidade + handles | Benchmarks + gaps + oportunidades de diferenciacao |

### Nivel 3: Estrategia & Conteudo

| # | Agente | Papel | Entrada | Saida |
|---|--------|-------|---------|-------|
| 4 | **Analista de Tendencias** | Identifica tendencias de conteudo medico nas redes | Especialidade + plataforma | Temas em alta + formatos + hashtags + hooks |
| 5 | **Estrategista de Conteudo** | Cria plano editorial e calendario de publicacoes | Perfil + concorrencia + tendencias | Calendario semanal + pilares de conteudo + frequencia |

### Nivel 4: Producao & Medicao

| # | Agente | Papel | Entrada | Saida |
|---|--------|-------|---------|-------|
| 6 | **Designer de Carrossel** | Gera roteiros de carrossel Instagram (7-10 slides) | Tema + perfil + identidade visual | JSON do roteiro + preview + PNGs 1080x1350 |
| 7 | **Analista de Metricas** | Analisa resultados e sugere otimizacoes | Metricas de posts (curtidas, saves, shares) | Diagnostico + recomendacoes + comparativo |

---

## Fluxo de Trabalho

```
1. Setup → Medico cadastra perfil (especialidade, cidade, redes, publico-alvo)
      │
2. Analise de Perfil → IA analisa pontos fortes e oportunidades
      │
3. Concorrencia → IA pesquisa concorrentes e identifica gaps
      │
4. Tendencias → IA identifica temas em alta na especialidade
      │
5. Estrategia → IA cria plano editorial baseado em 2+3+4
      │
6. Carrossel → IA gera carrosseis prontos para publicar
      │
7. Metricas → Medico insere resultados, IA analisa e ajusta
      │
8. Supervisor → Visao consolidada + recomendacoes
```

---

## Stack Tecnica

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilo**: Tailwind CSS
- **IA**: Claude API (@anthropic-ai/sdk)
- **Deploy**: Vercel
- **Repo**: GitHub
- **Export PNG**: html2canvas (client-side)

---

## Modulos do App

| Rota | Modulo | Agente |
|------|--------|--------|
| `/setup` | Cadastro do Medico | - |
| `/analise-perfil` | Analise de Perfil | Analista de Perfil |
| `/concorrencia` | Analise de Concorrencia | Analista de Concorrencia |
| `/tendencias` | Tendencias de Conteudo | Analista de Tendencias |
| `/estrategia` | Plano Editorial | Estrategista de Conteudo |
| `/carrossel` | Gerador de Carrossel | Designer de Carrossel |
| `/metricas` | Dashboard de Metricas | Analista de Metricas |
| `/supervisor` | Painel do Supervisor | Diretor de Marketing |

---

## Conformidade Etica

O app deve respeitar as normas do CFM (Conselho Federal de Medicina):
- Resolucao CFM 2.336/2023 sobre publicidade medica
- Nao prometer resultados ou curas
- Nao usar fotos de antes/depois sem autorizacao
- Identificar sempre o CRM do medico
- Nao fazer propaganda de medicamentos
- Tom educativo, nunca sensacionalista
