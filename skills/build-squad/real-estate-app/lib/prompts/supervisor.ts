import { PropertyProfile } from '../../types/property';

export interface SupervisorStatusData {
  property: PropertyProfile | null;
  temAnuncio: boolean;
  temEstrategia: boolean;
  temCarrossel: boolean;
  quantidadeVisitas: number;
  visitasConfirmadas: number;
  documentosPreenchidos: number;
  totalDocumentos: number;
  quantidadePropostas: number;
  propostaAceita: boolean;
}

export const systemPrompt = `Você é o Gerente Supervisor de uma equipe de IA especializada em venda de imóveis no Brasil. Sua função é coordenar e supervisionar 7 agentes especializados: Avaliador (precificação), Copywriter (anúncio), Marqueteiro (marketing), Designer (carrossel Instagram), Secretário (visitas), Assessor Jurídico (documentos) e Negociador (negociação). Analise o status atual de cada módulo e forneça: 1) Status geral da venda (em uma escala: Iniciando / Em Andamento / Avançado / Próximo do Fechamento), 2) O que já foi feito, 3) O que está pendente e precisa de atenção urgente, 4) Próximos passos recomendados na ordem de prioridade, 5) Alertas e riscos, 6) Dicas estratégicas para acelerar a venda. Seja direto e prático como um gerente de projeto experiente.`;

export function buildUserPrompt(statusData: SupervisorStatusData): string {
  const {
    property,
    temAnuncio,
    temEstrategia,
    temCarrossel,
    quantidadeVisitas,
    visitasConfirmadas,
    documentosPreenchidos,
    totalDocumentos,
    quantidadePropostas,
    propostaAceita,
  } = statusData;

  const imovelInfo = property
    ? `- Imóvel configurado: Sim
- Tipo: ${property.tipo}
- Endereço: ${property.endereco}, ${property.cidade} - ${property.estado}
- Área útil: ${property.areaUtil} m²
- Quartos: ${property.quartos} | Banheiros: ${property.banheiros} | Vagas: ${property.vagas}
- Preço desejado: ${property.precoDesejado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    : `- Imóvel configurado: Não (ação urgente necessária)`;

  return `Analise o status atual do processo de venda do imóvel e forneça sua avaliação completa como Gerente Supervisor.

STATUS ATUAL DE CADA MÓDULO:

1. IMÓVEL (Base do processo):
${imovelInfo}

2. AVALIADOR (Precificação):
- Status: ${property ? 'Imóvel cadastrado e disponível para precificação' : 'Aguardando cadastro do imóvel'}

3. COPYWRITER (Anúncio):
- Anúncio gerado: ${temAnuncio ? 'Sim' : 'Não'}

4. MARQUETEIRO (Marketing):
- Estratégia de marketing gerada: ${temEstrategia ? 'Sim' : 'Não'}

5. DESIGNER (Carrossel Instagram):
- Carrossel gerado: ${temCarrossel ? 'Sim' : 'Não'}

7. SECRETÁRIO (Visitas):
- Total de visitas agendadas: ${quantidadeVisitas}
- Visitas confirmadas: ${visitasConfirmadas}
- Visitas pendentes de confirmação: ${quantidadeVisitas - visitasConfirmadas}

8. ASSESSOR JURÍDICO (Documentos):
- Documentos preenchidos: ${documentosPreenchidos} de ${totalDocumentos}
- Progresso: ${totalDocumentos > 0 ? Math.round((documentosPreenchidos / totalDocumentos) * 100) : 0}%

9. NEGOCIADOR (Negociação):
- Propostas recebidas: ${quantidadePropostas}
- Proposta aceita: ${propostaAceita ? 'Sim - venda em fase de fechamento!' : 'Não'}

Com base nessas informações, forneça:
1) Status geral da venda (Iniciando / Em Andamento / Avançado / Próximo do Fechamento)
2) O que já foi concluído com sucesso
3) O que está pendente e precisa de atenção urgente
4) Próximos passos recomendados em ordem de prioridade
5) Alertas e riscos identificados
6) Dicas estratégicas para acelerar o fechamento da venda`;
}
