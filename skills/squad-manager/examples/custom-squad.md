# Custom Squad Template

Use este template para construir um squad sob medida para qualquer dominio.

## Passo 1: Defina a Entidade Principal

Qual e o "sujeito" do seu app? Exemplos:
- Medico (DoctorProfile)
- Imovel (PropertyProfile)
- Empresa (CompanyProfile)
- Produto (ProductProfile)
- Profissional (ProfessionalProfile)

```typescript
// types/[entidade].ts
export interface EntityProfile {
  nome: string;
  // ... campos especificos do dominio
}
```

## Passo 2: Defina os Agentes

Preencha a tabela abaixo:

| # | Role | Tipo | Skills | API Route | Output |
|---|------|------|--------|-----------|--------|
| 1 | Supervisor | supervisor | coordenacao | `/api/supervisor` | Visao geral |
| 2 | _________ | specialist | _________ | `/api/_____` | _________ |
| 3 | _________ | specialist | _________ | `/api/_____` | _________ |
| 4 | _________ | specialist | _________ | `/api/_____` | _________ |
| 5 | _________ | specialist | _________ | `/api/_____` | _________ |

## Passo 3: Defina a Hierarquia

```
              SUPERVISOR
                  |
         +--------+--------+
         |        |        |
    AREA_1    AREA_2    AREA_3
         |        |        |
    Agent_A  Agent_C  Agent_E
    Agent_B  Agent_D  Agent_F
```

## Passo 4: Skill Matrix

Para cada agente, marque quais skills ele pode acessar:

```
               skill_1  skill_2  skill_3  skill_4  skill_5
Supervisor       -        -        -        -        ★
Agent_A          ★        ★        -        -        -
Agent_B          ★        -        -        -        -
Agent_C          -        -        ★        -        -
Agent_D          -        -        ★        ★        -
Agent_E          -        -        -        ★        ★
Agent_F          -        -        -        -        ★
```

## Passo 5: Compliance

Qual regulamentacao se aplica?

| Dominio | Orgao | Regras Principais |
|---------|-------|-------------------|
| Medico | CFM | Res. 2.336/2023 - sem promessas de cura |
| Imoveis | CRECI | Transparencia de precos e dados |
| Juridico | OAB | Sem captacao de clientela |
| Financeiro | CVM/BACEN | Sem garantia de rentabilidade |
| Educacao | MEC | Dados verificaveis |
| _______ | ____ | _________________________ |

## Passo 6: Gerar o App

Com as informacoes acima, peca ao Claude:

```
Crie um app Next.js completo com [N] agentes seguindo
a hierarquia acima. Use o squad-manager skill como
referencia para a estrutura de arquivos.
```

## Passo 7: Supervisor StatusData

```typescript
export interface SupervisorStatusData {
  entity: EntityProfile | null;
  temModuloA: boolean;    // um flag por agente
  temModuloB: boolean;
  temModuloC: boolean;
  // ...
}
```

## Checklist de Verificacao

- [ ] Entidade principal definida com todos os campos
- [ ] Todos os agentes tem role, skills, API route e output
- [ ] Hierarquia tem no maximo 3 niveis
- [ ] Skill matrix preenchida (quem acessa o que)
- [ ] Compliance identificada para o dominio
- [ ] Supervisor recebe status de todos os modulos
- [ ] Cada agente tem prompt com role + deliverables + compliance
- [ ] Fluxo de trabalho definido (ordem de execucao)
