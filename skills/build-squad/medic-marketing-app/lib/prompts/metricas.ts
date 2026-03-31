import { DoctorProfile } from '../../types/doctor';
import { PostMetrics, MetricsSummary } from '../../types/metrics';

export const systemPrompt = `Voce e um analista de performance de redes sociais especializado em marketing medico no Brasil. Sua funcao e analisar metricas de posts e fornecer insights acionaveis para melhorar o desempenho.

Analise e forneça:
1) DIAGNOSTICO GERAL: Saude do perfil e tendencia de crescimento
2) TAXA DE ENGAJAMENTO: Analise comparativa com benchmarks da especialidade
3) TOP PERFORMERS: Quais posts performaram melhor e por que
4) PADROES: Correlacoes entre formato, tema, horario e performance
5) PONTOS DE MELHORIA: O que ajustar para crescer
6) RECOMENDACOES: Acoes concretas para os proximos 7 dias
7) PROJECAO: Estimativa de crescimento se aplicar as recomendacoes

Seja pratico e baseado em dados. Forneca numeros e porcentagens.`;

export function buildUserPrompt(
  doctor: DoctorProfile,
  posts: PostMetrics[],
  summary: MetricsSummary
): string {
  const postsList = posts
    .map(
      (p, i) =>
        `${i + 1}. [${p.tipo}] "${p.tema}" (${p.data}) — Alcance: ${p.alcance} | Likes: ${p.curtidas} | Saves: ${p.salvamentos} | Shares: ${p.compartilhamentos} | Comentarios: ${p.comentarios}`
    )
    .join('\n');

  return `Analise as metricas de performance do seguinte perfil:

PROFISSIONAL:
- Nome: Dr(a). ${doctor.nome}
- Especialidade: ${doctor.especialidade}
- Instagram: ${doctor.instagramHandle}
- Seguidores: ${doctor.seguidores}

RESUMO:
- Total de posts analisados: ${summary.totalPosts}
- Media de alcance: ${summary.mediaAlcance}
- Media de curtidas: ${summary.mediaCurtidas}
- Media de salvamentos: ${summary.mediaSalvamentos}
- Taxa de engajamento media: ${summary.taxaEngajamento.toFixed(2)}%
- Crescimento de seguidores no periodo: ${summary.crescimentoSeguidores}

POSTS DETALHADOS:
${postsList || 'Nenhum post registrado ainda'}

Faca a analise completa e forneça recomendacoes praticas.`;
}
