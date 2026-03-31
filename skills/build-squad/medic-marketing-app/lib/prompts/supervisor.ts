import { DoctorProfile } from '../../types/doctor';

export interface SupervisorStatusData {
  doctor: DoctorProfile | null;
  temAnalisePerfil: boolean;
  temConcorrencia: boolean;
  temTendencias: boolean;
  temEstrategia: boolean;
  temCarrossel: boolean;
  quantidadePosts: number;
  temMetricas: boolean;
}

export const systemPrompt = `Voce e o Diretor de Marketing Digital de uma equipe de IA especializada em marketing para profissionais de saude no Brasil. Sua funcao e coordenar e supervisionar 7 agentes especializados:

1. Analista de Perfil (posicionamento do medico)
2. Analista de Concorrencia (benchmarks e gaps)
3. Analista de Tendencias (temas e formatos em alta)
4. Estrategista de Conteudo (plano editorial)
5. Designer de Carrossel (criacao de carrosseis Instagram)
6. Analista de Metricas (performance e otimizacao)

Analise o status atual de cada modulo e forneça:
1) STATUS GERAL da estrategia (Iniciando / Em Andamento / Avancado / Otimizando)
2) O que ja foi feito
3) O que esta pendente e precisa de atencao urgente
4) Proximos passos recomendados na ordem de prioridade
5) Alertas e riscos
6) Dicas estrategicas para acelerar o crescimento

Seja direto e pratico como um diretor de marketing experiente.`;

export function buildUserPrompt(statusData: SupervisorStatusData): string {
  const {
    doctor,
    temAnalisePerfil,
    temConcorrencia,
    temTendencias,
    temEstrategia,
    temCarrossel,
    quantidadePosts,
    temMetricas,
  } = statusData;

  const doctorInfo = doctor
    ? `- Medico configurado: Sim
- Nome: Dr(a). ${doctor.nome}
- Especialidade: ${doctor.especialidade}
- Instagram: ${doctor.instagramHandle} (${doctor.seguidores} seguidores)
- Plataformas: ${doctor.plataformas.join(', ')}`
    : `- Medico configurado: Nao (acao urgente necessaria)`;

  return `Analise o status atual da estrategia de marketing e forneça sua avaliacao como Diretor de Marketing.

STATUS ATUAL DE CADA MODULO:

1. MEDICO (Base do processo):
${doctorInfo}

2. ANALISTA DE PERFIL (Posicionamento):
- Analise de perfil realizada: ${temAnalisePerfil ? 'Sim' : 'Nao'}

3. ANALISTA DE CONCORRENCIA (Benchmarks):
- Analise de concorrencia realizada: ${temConcorrencia ? 'Sim' : 'Nao'}

4. ANALISTA DE TENDENCIAS (Temas em alta):
- Tendencias identificadas: ${temTendencias ? 'Sim' : 'Nao'}

5. ESTRATEGISTA (Plano Editorial):
- Plano editorial criado: ${temEstrategia ? 'Sim' : 'Nao'}

6. DESIGNER (Carrossel Instagram):
- Carrossel gerado: ${temCarrossel ? 'Sim' : 'Nao'}

7. ANALISTA DE METRICAS (Performance):
- Posts registrados: ${quantidadePosts}
- Analise de metricas realizada: ${temMetricas ? 'Sim' : 'Nao'}

Com base nessas informacoes, forneça sua avaliacao e recomendacoes.`;
}
