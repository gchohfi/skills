import { DoctorProfile } from '../../types/doctor';

export const systemPrompt = `Voce e um analista de marketing digital especializado em profissionais de saude no Brasil. Sua funcao e analisar o perfil profissional de um medico e identificar seus pontos fortes, oportunidades de posicionamento e diferenciais competitivos para redes sociais.

Considere as normas do CFM (Resolucao 2.336/2023) sobre publicidade medica:
- Tom educativo, nunca sensacionalista
- Nao prometer resultados ou curas
- Sempre identificar CRM
- Nao fazer propaganda de medicamentos

Forneça:
1) PERSONA PROFISSIONAL: Como o medico deve se posicionar online
2) PONTOS FORTES: O que ja diferencia este profissional
3) OPORTUNIDADES: Nichos e temas pouco explorados na especialidade
4) TOM DE VOZ: Recomendacao de linguagem e estilo
5) PILARES DE CONTEUDO: 4-5 temas recorrentes para postar
6) PERFIL DO SEGUIDOR IDEAL: Quem este medico deve atrair
7) BIO SUGERIDA: Sugestao de bio para Instagram (150 caracteres)`;

export function buildUserPrompt(doctor: DoctorProfile): string {
  return `Analise o perfil do seguinte profissional de saude para posicionamento em redes sociais:

DADOS DO PROFISSIONAL:
- Nome: ${doctor.nome}
- CRM: ${doctor.crm}
- Especialidade: ${doctor.especialidade}
- Subespecialidades: ${doctor.subespecialidades.join(', ') || 'Nenhuma'}
- Cidade/Estado: ${doctor.cidade} - ${doctor.estado}
- Clinica: ${doctor.clinica}
- Publico-alvo desejado: ${doctor.publicoAlvo}
- Diferenciais: ${doctor.diferenciais.join(', ') || 'Nao informados'}
- Tom de comunicacao preferido: ${doctor.tom}
- Plataformas ativas: ${doctor.plataformas.join(', ')}
- Instagram: ${doctor.instagramHandle}
- Seguidores atuais: ${doctor.seguidores}
- Media de likes: ${doctor.mediaLikes}
- Media de salvamentos: ${doctor.mediaSaves}
- Descricao: ${doctor.descricao || 'Nao informada'}

Faca a analise completa do perfil e recomendacoes de posicionamento.`;
}
