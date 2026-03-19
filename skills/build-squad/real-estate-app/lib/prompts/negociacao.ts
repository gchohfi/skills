import { PropertyProfile } from '../../types/property';
import { Offer } from '../../types/offer';

export const systemPrompt = `Você é um consultor de negociação imobiliária no Brasil. Analise a proposta recebida considerando: valor oferecido vs pedido, forma de pagamento (à vista, financiamento, FGTS), prazo, condições. Forneça: 1) Análise da proposta (forte/média/fraca), 2) Contraproposta sugerida, 3) Pontos de negociação, 4) Riscos a considerar, 5) Dicas para a próxima rodada de negociação.`;

export function buildUserPrompt(property: PropertyProfile, offer: Offer): string {
  const formataPreco = (valor: number) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const diferencaValor = property.precoDesejado - offer.valorOferta;
  const percentualOferta = ((offer.valorOferta / property.precoDesejado) * 100).toFixed(1);
  const descontoSolicitado = (
    ((property.precoDesejado - offer.valorOferta) / property.precoDesejado) *
    100
  ).toFixed(1);

  const formaPagamentoLabel: Record<Offer['formaPagamento'], string> = {
    avista: 'À vista',
    financiamento: 'Financiamento bancário',
    fgts: 'FGTS',
    misto: 'Misto (combinação de formas de pagamento)',
  };

  const statusLabel: Record<Offer['status'], string> = {
    recebida: 'Recebida',
    analisando: 'Em análise',
    aceita: 'Aceita',
    recusada: 'Recusada',
    contraproposta: 'Contraproposta enviada',
  };

  const condicoesLista =
    offer.condicoes.length > 0
      ? offer.condicoes.map((c) => `  - ${c}`).join('\n')
      : '  Nenhuma condição especial informada';

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

  return `Analise a proposta de compra recebida para o imóvel abaixo e oriente o vendedor sobre como proceder na negociação, considerando as práticas do mercado imobiliário brasileiro.

DADOS DO IMÓVEL À VENDA:
- Tipo: ${tipoLabel[property.tipo]}
- Endereço: ${property.endereco}
- Cidade/Estado: ${property.cidade} - ${property.estado}
- Quartos: ${property.quartos} | Banheiros: ${property.banheiros} | Vagas: ${property.vagas}
- Área útil: ${property.areaUtil} m² | Área total: ${property.areaTotal} m²
${property.andarPavimento ? `- Andar/Pavimento: ${property.andarPavimento}` : ''}
${property.condominio !== undefined ? `- Condomínio: ${formataPreco(property.condominio)}/mês` : ''}
${property.iptu !== undefined ? `- IPTU: ${formataPreco(property.iptu)}/ano` : ''}
- Preço pedido: ${formataPreco(property.precoDesejado)}
- Características: ${caracteristicasLista}
- Descrição: ${property.descricao || 'Não informada'}

PROPOSTA RECEBIDA:
- ID da proposta: ${offer.id}
- Valor ofertado: ${formataPreco(offer.valorOferta)}
- Percentual do preço pedido: ${percentualOferta}%
- Desconto solicitado: ${descontoSolicitado}% (${formataPreco(diferencaValor)} abaixo do pedido)
- Forma de pagamento: ${formaPagamentoLabel[offer.formaPagamento]}
- Prazo para escritura: ${offer.prazoEscritura || 'Não informado'}
- Condições especiais:
${condicoesLista}
- Observações do comprador: ${offer.observacoes || 'Nenhuma observação adicional'}
- Status atual da proposta: ${statusLabel[offer.status]}
- Data da proposta: ${offer.dataCriacao}

Por favor, forneça:
1) Análise da proposta (classificação: forte / média / fraca) com justificativa
2) Contraproposta sugerida (valor, condições e forma de pagamento recomendados)
3) Pontos de negociação mais relevantes para este caso
4) Riscos a considerar (forma de pagamento, prazo, condições especiais)
5) Dicas práticas para a próxima rodada de negociação com este comprador`;
}
