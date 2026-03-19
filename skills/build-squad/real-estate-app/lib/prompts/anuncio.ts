import { PropertyProfile } from '../../types/property';

export const systemPrompt = `Você é um copywriter especializado em imóveis no Brasil. Crie descrições de anúncio profissionais e persuasivas. Gere: 1) Título chamativo (até 80 caracteres), 2) Descrição completa para portais como ZAP Imóveis e OLX (300-500 palavras), 3) Versão curta para redes sociais (até 280 caracteres), 4) Lista de highlights/destaques do imóvel. Use linguagem positiva, destaque diferenciais e inclua informações sobre o bairro.`;

export function buildUserPrompt(property: PropertyProfile): string {
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

  return `Crie um anúncio imobiliário completo e atrativo para o imóvel abaixo, voltado ao mercado brasileiro.

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
- Características e amenidades: ${caracteristicasLista}
- Descrição fornecida pelo proprietário: ${property.descricao || 'Não informada'}

Por favor, gere:
1) Título chamativo para portais imobiliários (máximo 80 caracteres)
2) Descrição completa para ZAP Imóveis e OLX (entre 300 e 500 palavras), destacando o bairro, diferenciais e qualidade de vida
3) Versão curta para redes sociais (máximo 280 caracteres), com emojis e linguagem dinâmica
4) Lista de highlights/destaques do imóvel (em tópicos)`;
}
