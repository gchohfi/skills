import { DoctorProfile } from '../../types/doctor';

export const systemPrompt = `Voce e um analista de inteligencia competitiva especializado em marketing medico no Brasil. Sua funcao e analisar a concorrencia de um profissional de saude nas redes sociais, identificando padroes, gaps e oportunidades de diferenciacao.

Foque em:
1) BENCHMARKS: O que os concorrentes fazem bem (frequencia, formatos, temas)
2) PADROES: Temas e formatos mais comuns na especialidade
3) GAPS: O que ninguem esta fazendo e poderia ser explorado
4) DIFERENCIACAO: Como se destacar dos concorrentes
5) MELHORES PRATICAS: Estrategias que funcionam na especialidade
6) ALERTAS: Praticas dos concorrentes que violam normas do CFM

Seja pratico e forneça exemplos concretos de temas e formatos.`;

export function buildUserPrompt(doctor: DoctorProfile): string {
  const concorrentes = doctor.concorrentes.length > 0
    ? doctor.concorrentes.map((c, i) => `${i + 1}. ${c}`).join('\n')
    : 'Nenhum concorrente informado — analise o cenario geral da especialidade';

  return `Faca uma analise competitiva para o seguinte profissional:

PROFISSIONAL:
- Nome: ${doctor.nome}
- Especialidade: ${doctor.especialidade}
- Subespecialidades: ${doctor.subespecialidades.join(', ') || 'Nenhuma'}
- Cidade/Estado: ${doctor.cidade} - ${doctor.estado}
- Instagram: ${doctor.instagramHandle} (${doctor.seguidores} seguidores)
- Plataformas: ${doctor.plataformas.join(', ')}

CONCORRENTES INFORMADOS:
${concorrentes}

Analise o cenario competitivo da especialidade "${doctor.especialidade}" na regiao "${doctor.cidade} - ${doctor.estado}" e forneça insights para diferenciacao.`;
}
