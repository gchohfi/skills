# Marketing Squad Template

Squad de marketing digital com 7 agentes especializados.
Aplicavel a qualquer industria que precise de presenca digital.

## Hierarquia

```
                 SUPERVISOR
              Diretor de Marketing
                      |
         +------------+------------+
         |            |            |
    INTELIGENCIA  ESTRATEGIA   PRODUCAO
    DE MERCADO    & CONTEUDO   & METRICAS
         |            |            |
    Analista de  Analista de  Designer de
    Perfil       Tendencias   Carrossel
         |            |            |
    Analista de  Estrategista Analista de
    Concorrencia de Conteudo  Metricas
```

## Roles & Skills

### Tier 1: Coordenacao

| Role | Skills | API | Output |
|------|--------|-----|--------|
| **Supervisor** (Diretor de Marketing) | coordenacao, status, alertas, prioridades | `/api/supervisor` | Analise consolidada + proximos passos |

### Tier 2: Inteligencia de Mercado

| Role | Skills | API | Output |
|------|--------|-----|--------|
| **Analista de Perfil** | analise, posicionamento, persona, branding | `/api/analise-perfil` | Persona + pilares + oportunidades |
| **Analista de Concorrencia** | pesquisa, benchmarks, gaps, diferenciacao | `/api/concorrencia` | Benchmarks + gaps + estrategia |

### Tier 3: Estrategia & Conteudo

| Role | Skills | API | Output |
|------|--------|-----|--------|
| **Analista de Tendencias** | tendencias, hashtags, hooks, formatos | `/api/tendencias` | Temas em alta + formatos + hashtags |
| **Estrategista de Conteudo** | planejamento, calendario, pilares, frequencia | `/api/estrategia` | Plano editorial 30 dias |

### Tier 4: Producao & Medicao

| Role | Skills | API | Output |
|------|--------|-----|--------|
| **Designer de Carrossel** | design, copywriting, layout, JSON | `/api/carrossel` | Roteiro JSON + preview + PNGs |
| **Analista de Metricas** | metricas, KPIs, diagnostico, otimizacao | `/api/metricas` | Diagnostico + recomendacoes |

## Skill Matrix

```
                    analise  pesquisa  estrategia  producao  metricas  coordenacao  compliance
Supervisor            -        -          -          -         -          ★            ★
Analista Perfil       ★        ★          -          -         -          -            ★
Analista Concorr.     ★        ★          -          -         -          -            -
Analista Tendencias   ★        ★          ★          -         -          -            -
Estrategista          -        -          ★          -         -          -            ★
Designer Carrossel    -        -          -          ★         -          -            ★
Analista Metricas     ★        -          -          -         ★          -            -
```

★ = tem acesso a essa skill

## Fluxo de Trabalho

```
1. Setup           → Cadastro da entidade principal
2. Analise Perfil  → Posicionamento e oportunidades
3. Concorrencia    → Benchmarks e gaps
4. Tendencias      → Temas em alta
5. Estrategia      → Plano editorial (usa 2+3+4)
6. Carrossel       → Producao de conteudo visual
7. Metricas        → Medicao e otimizacao
8. Supervisor      → Visao consolidada
```

## Adaptacoes por Industria

| Industria | Entidade | Compliance | Diferencial |
|-----------|----------|------------|-------------|
| Medica | DoctorProfile | CFM 2.336/2023 | Tom educativo, sem promessas de cura |
| Imobiliaria | PropertyProfile | CRECI | Fotos do imovel, dados de mercado |
| Juridica | LawyerProfile | OAB | Linguagem formal, sem captacao |
| Educacional | SchoolProfile | MEC | Resultados pedagogicos |
| E-commerce | StoreProfile | CDC | Precos, ofertas, reviews |
| Fitness | TrainerProfile | CREF | Saude e bem-estar, sem promessas |
| Odontologica | DentistProfile | CFO | Similar ao CFM |
