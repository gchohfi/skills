import { PropertyProfile } from '../../types/property';

export type SocialPlatform = 'instagram' | 'facebook' | 'whatsapp' | 'twitter';

export const systemPromptStrategy = `Você é um especialista em marketing imobiliário no Brasil. Elabore uma estratégia de divulgação personalizada para venda de imóveis, indicando os melhores canais disponíveis no mercado brasileiro: OLX, ZAP Imóveis, VivaReal, Quinto Andar, Facebook Marketplace, Instagram, grupos de WhatsApp, placas físicas e corretores parceiros. Para cada canal recomendado, explique o motivo da indicação, o público atingido, dicas de uso e ordem de prioridade. Considere o perfil do imóvel e o público-alvo mais provável.`;

export const systemPromptSocial = `Você é um especialista em marketing digital imobiliário no Brasil. Crie posts otimizados para redes sociais com foco na venda de imóveis. Use linguagem adequada a cada plataforma, emojis relevantes, hashtags eficazes e chamadas para ação (CTA) claras. Os posts devem ser atrativos, transmitir confiança e despertar o interesse de potenciais compradores brasileiros.`;

export function buildStrategyPrompt(property: PropertyProfile): string {
  const formataPreco = (valor: number) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const tipoLabel: Record<PropertyProfile['tipo'], string> = {
    casa: 'Casa',
    apartamento: 'Apartamento',
    terreno: 'Terreno',
    comercial: 'Imóvel Comercial',
  };

  const caracteristicasLista =
    property.caracteristicas.length > 0
      ? property.caracteristicas.join(', ')
      : 'Não informadas';

  return `Elabore uma estratégia completa de marketing e divulgação para a venda do seguinte imóvel no mercado brasileiro.

DADOS DO IMÓVEL:
- Tipo: ${tipoLabel[property.tipo]}
- Endereço: ${property.endereco}
- Bairro/Cidade/Estado: ${property.cidade} - ${property.estado}
- Quartos: ${property.quartos}
- Banheiros: ${property.banheiros}
- Área útil: ${property.areaUtil} m²
- Área total: ${property.areaTotal} m²
- Vagas de garagem: ${property.vagas}
${property.andarPavimento ? `- Andar/Pavimento: ${property.andarPavimento}` : ''}
${property.condominio !== undefined ? `- Condomínio: ${formataPreco(property.condominio)}/mês` : ''}
${property.iptu !== undefined ? `- IPTU: ${formataPreco(property.iptu)}/ano` : ''}
- Preço de venda: ${formataPreco(property.precoDesejado)}
- Características: ${caracteristicasLista}
- Descrição: ${property.descricao || 'Não informada'}

Por favor, forneça:
1) Análise do perfil do comprador ideal para este imóvel
2) Canais de divulgação recomendados em ordem de prioridade (OLX, ZAP Imóveis, VivaReal, Quinto Andar, Facebook Marketplace, Instagram, grupos de WhatsApp, placas físicas, corretores parceiros)
3) Para cada canal: justificativa, público atingido, dicas práticas de uso e frequência de publicação recomendada
4) Estratégia de precificação para anúncios (se deve anunciar com margem de negociação)
5) Dicas de fotografia e apresentação do imóvel
6) Cronograma sugerido para as primeiras 4 semanas de divulgação`;
}

export function buildSocialPrompt(property: PropertyProfile, platform: SocialPlatform): string {
  const formataPreco = (valor: number) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const tipoLabel: Record<PropertyProfile['tipo'], string> = {
    casa: 'Casa',
    apartamento: 'Apartamento',
    terreno: 'Terreno',
    comercial: 'Imóvel Comercial',
  };

  const platformLabel: Record<SocialPlatform, string> = {
    instagram: 'Instagram',
    facebook: 'Facebook / Facebook Marketplace',
    whatsapp: 'WhatsApp (mensagem para grupos ou status)',
    twitter: 'Twitter/X',
  };

  const platformInstructions: Record<SocialPlatform, string> = {
    instagram:
      'Caption para feed (até 2.200 caracteres), com emojis, parágrafos curtos, hashtags no final (mínimo 10 hashtags relevantes como #imóveis #compracasa #decoração #apartamento) e CTA para contato via Direct ou link na bio.',
    facebook:
      'Post para feed e Marketplace (até 500 palavras), tom mais informativo, com emojis moderados, detalhes do imóvel, link para mais fotos e CTA para WhatsApp ou telefone.',
    whatsapp:
      'Mensagem direta e objetiva (até 300 caracteres), com poucos emojis, link de contato e destaque do maior diferencial do imóvel. Deve parecer natural para envio em grupos imobiliários.',
    twitter:
      'Tweet conciso (até 280 caracteres) com 2-3 emojis, 2-3 hashtags populares e CTA curto.',
  };

  const caracteristicasLista =
    property.caracteristicas.length > 0
      ? property.caracteristicas.join(', ')
      : 'Não informadas';

  return `Crie um post otimizado para ${platformLabel[platform]} para divulgar o seguinte imóvel à venda no Brasil.

DADOS DO IMÓVEL:
- Tipo: ${tipoLabel[property.tipo]}
- Endereço/Bairro: ${property.endereco}, ${property.cidade} - ${property.estado}
- Quartos: ${property.quartos} | Banheiros: ${property.banheiros} | Vagas: ${property.vagas}
- Área útil: ${property.areaUtil} m² | Área total: ${property.areaTotal} m²
${property.andarPavimento ? `- Andar/Pavimento: ${property.andarPavimento}` : ''}
${property.condominio !== undefined ? `- Condomínio: ${formataPreco(property.condominio)}/mês` : ''}
${property.iptu !== undefined ? `- IPTU: ${formataPreco(property.iptu)}/ano` : ''}
- Preço: ${formataPreco(property.precoDesejado)}
- Características: ${caracteristicasLista}
- Descrição: ${property.descricao || 'Não informada'}

PLATAFORMA ALVO: ${platformLabel[platform]}
INSTRUÇÕES ESPECÍFICAS: ${platformInstructions[platform]}

Gere o post completo, pronto para publicação, com emojis e hashtags adequados à plataforma.`;
}
