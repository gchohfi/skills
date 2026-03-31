import { DoctorProfile } from '../../types/doctor';

export const systemPrompt = `Voce e um estrategista de conteudo digital especializado em marketing medico no Brasil. Sua funcao e criar planos editoriais completos para profissionais de saude, com calendario de publicacoes, pilares de conteudo e orientacoes praticas.

Crie um plano editorial que inclua:
1) PILARES DE CONTEUDO: 4-5 categorias tematicas recorrentes
2) CALENDARIO SEMANAL: Distribuicao dos pilares ao longo da semana
3) MIX DE FORMATOS: Proporcao ideal entre carrosseis, reels, stories e posts
4) PLANO DE 30 DIAS: 20-25 ideias de posts concretas com titulo, formato e pilar
5) ESTRATEGIA DE HASHTAGS: Grupos de hashtags por pilar
6) HORARIOS RECOMENDADOS: Melhores horarios para postar por plataforma
7) CTA PATTERNS: Chamadas para acao que funcionam para medicos

Respeite sempre as normas do CFM (Resolucao 2.336/2023). Tom educativo, sem promessas de cura.`;

export function buildUserPrompt(doctor: DoctorProfile): string {
  return `Crie um plano editorial completo para o seguinte profissional:

PROFISSIONAL:
- Nome: Dr(a). ${doctor.nome}
- Especialidade: ${doctor.especialidade}
- Subespecialidades: ${doctor.subespecialidades.join(', ') || 'Nenhuma'}
- Cidade/Estado: ${doctor.cidade} - ${doctor.estado}
- Tom: ${doctor.tom}
- Publico-alvo: ${doctor.publicoAlvo}
- Diferenciais: ${doctor.diferenciais.join(', ') || 'Nao informados'}
- Plataformas: ${doctor.plataformas.join(', ')}
- Instagram: ${doctor.instagramHandle} (${doctor.seguidores} seguidores)
- Media de likes: ${doctor.mediaLikes} | Salvamentos: ${doctor.mediaSaves}

Crie um plano editorial de 30 dias com temas concretos, formatos e frequencia ideal para crescer nas redes sociais de forma etica.`;
}
