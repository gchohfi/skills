import { PropertyProfile } from '../../types/property';

export interface Comparativo {
  endereco: string;
  tipo: string;
  areaUtil: number;
  quartos: number;
  vagas: number;
  preco: number;
  precoM2: number;
  fonte: string;
}

export const systemPrompt = `Você é um avaliador imobiliário experiente no mercado brasileiro. Analise as informações do imóvel e os comparativos fornecidos para sugerir uma faixa de preço justa. Considere localização, metragem, estado de conservação, amenidades e tendências do mercado local. Use referências como FipeZap e valores praticados na região. Forneça: 1) Faixa de preço sugerida (mínimo e máximo), 2) Preço ideal recomendado, 3) Preço por m² calculado, 4) Justificativa detalhada, 5) Fatores que podem valorizar ou desvalorizar o imóvel.`;

export function buildUserPrompt(property: PropertyProfile, comparativos: Comparativo[]): string {
  const formataPreco = (valor: number) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const precoM2 =
    property.areaUtil > 0
      ? formataPreco(property.precoDesejado / property.areaUtil)
      : 'Não calculável';

  const caracteristicasLista =
    property.caracteristicas.length > 0
      ? property.caracteristicas.join(', ')
      : 'Nenhuma característica adicional informada';

  const comparativosTexto =
    comparativos.length > 0
      ? comparativos
          .map(
            (c, i) =>
              `  Comparativo ${i + 1}:
    - Endereço: ${c.endereco}
    - Tipo: ${c.tipo}
    - Área útil: ${c.areaUtil} m²
    - Quartos: ${c.quartos}
    - Vagas: ${c.vagas}
    - Preço: ${formataPreco(c.preco)}
    - Preço por m²: ${formataPreco(c.precoM2)}
    - Fonte: ${c.fonte}`
          )
          .join('\n\n')
      : '  Nenhum comparativo fornecido. Utilize dados públicos disponíveis de FipeZap, ZAP Imóveis e VivaReal para a região informada.';

  return `Avalie o imóvel abaixo e sugira uma faixa de preço adequada para o mercado brasileiro.

DADOS DO IMÓVEL:
- Endereço: ${property.endereco}
- Cidade/Estado: ${property.cidade} - ${property.estado}
- CEP: ${property.cep}
- Tipo: ${property.tipo}
- Quartos: ${property.quartos}
- Banheiros: ${property.banheiros}
- Área útil: ${property.areaUtil} m²
- Área total: ${property.areaTotal} m²
- Vagas de garagem: ${property.vagas}
${property.andarPavimento ? `- Andar/Pavimento: ${property.andarPavimento}` : ''}
${property.condominio !== undefined ? `- Condomínio: ${formataPreco(property.condominio)}/mês` : ''}
${property.iptu !== undefined ? `- IPTU: ${formataPreco(property.iptu)}/ano` : ''}
- Preço pedido pelo proprietário: ${formataPreco(property.precoDesejado)}
- Preço por m² pedido: ${precoM2}
- Características e amenidades: ${caracteristicasLista}
- Descrição do imóvel: ${property.descricao || 'Não informada'}

IMÓVEIS COMPARATIVOS NA REGIÃO:
${comparativosTexto}

Por favor, forneça:
1) Faixa de preço sugerida (valor mínimo e máximo recomendados)
2) Preço ideal recomendado para venda
3) Preço por m² calculado com base no mercado
4) Justificativa detalhada considerando todos os fatores acima
5) Fatores que podem valorizar ou desvalorizar este imóvel`;
}
