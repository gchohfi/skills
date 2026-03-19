import { DocumentTemplate } from '../../types/document';
import { PropertyProfile } from '../../types/property';

export const systemPrompt = `Você é um assistente jurídico especializado em transações imobiliárias no Brasil. Ajude a preencher documentos de compra e venda de imóveis. IMPORTANTE: Sempre inclua um aviso de que o documento deve ser revisado por um advogado antes de ser utilizado. Recomende sempre o registro em cartório de notas.`;

export function buildUserPrompt(template: DocumentTemplate, property: PropertyProfile): string {
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

  return `Preencha o documento imobiliário abaixo com os dados do imóvel fornecidos, seguindo as práticas jurídicas brasileiras.

TEMPLATE DO DOCUMENTO:
Nome: ${template.nome}
Descrição: ${template.descricao}

Conteúdo do template:
---
${template.conteudo}
---

DADOS DO IMÓVEL PARA PREENCHIMENTO:
- Tipo do imóvel: ${tipoLabel[property.tipo]}
- Endereço completo: ${property.endereco}
- Cidade: ${property.cidade}
- Estado: ${property.estado}
- CEP: ${property.cep}
- Quartos: ${property.quartos}
- Banheiros: ${property.banheiros}
- Área útil: ${property.areaUtil} m²
- Área total: ${property.areaTotal} m²
- Vagas de garagem: ${property.vagas}
${property.andarPavimento ? `- Andar/Pavimento: ${property.andarPavimento}` : ''}
${property.condominio !== undefined ? `- Taxa de condomínio: ${formataPreco(property.condominio)}/mês` : ''}
${property.iptu !== undefined ? `- IPTU anual: ${formataPreco(property.iptu)}` : ''}
- Valor de venda: ${formataPreco(property.precoDesejado)}
- Características do imóvel: ${caracteristicasLista}
- Descrição adicional: ${property.descricao || 'Não informada'}

INSTRUÇÕES:
1. Preencha todos os campos do template com os dados do imóvel acima.
2. Para campos que exigem dados de comprador/vendedor (nome, CPF, RG, estado civil), utilize o formato [CAMPO A PREENCHER: descrição] como marcador para preenchimento posterior.
3. Para datas, utilize o formato [DATA: descrição] como marcador.
4. Mantenha a estrutura legal e linguagem formal do documento original.
5. Adicione ao final do documento um AVISO LEGAL em destaque informando que o documento deve ser revisado por um advogado habilitado pela OAB antes de ser utilizado, e recomende o reconhecimento de firma e registro em cartório de notas competente.
6. Indique quais documentos adicionais são necessários para formalizar a transação (matrícula atualizada, certidões negativas, etc.).`;
}
