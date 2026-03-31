import { PropertyProfile } from '../../types/property';

export const systemPromptCarrossel = `Você é um especialista em criação de carrosséis para Instagram voltados ao mercado imobiliário brasileiro. Sua tarefa é gerar o roteiro (script) de um carrossel com 7 a 10 slides para divulgar a venda de um imóvel.

Cada slide deve ser um objeto JSON com os campos:
- "numero": número sequencial do slide (1, 2, 3...)
- "layout": um dos tipos: "capa", "timg", "tonly", "stat", "turning", "light", "final"
- Campos específicos por layout (veja abaixo)

LAYOUTS DISPONÍVEIS:

1. "capa" (SEMPRE o primeiro slide):
   - "eyebrow": texto curto acima do título (ex: "OPORTUNIDADE ÚNICA")
   - "headline": título grande e impactante. Use *asteriscos* para destacar palavras-chave.

2. "timg" (texto + imagem):
   - "mini_titulo": título curto
   - "texto": corpo do texto. Use *asteriscos* para destaque e <strong>negrito</strong>.
   - "imagem": "foto_0", "foto_1", etc. (referência às fotos do imóvel)

3. "tonly" (somente texto):
   - "zone_label": label pequeno (ex: "LOCALIZAÇÃO", "DIFERENCIAIS")
   - "big_text": título grande. Use *asteriscos* para destaque.
   - "texto": corpo do texto.

4. "stat" (estatística em destaque):
   - "stat_number": número grande (ex: "120", "3", "R$500")
   - "stat_unit": unidade (ex: "m² de área útil", "quartos suítes")
   - "texto": contexto sobre o número.
   - "e_dai": frase com o impacto prático do número (ex: "Espaço de sobra para toda a família")

5. "turning" (ponto de virada / opinião):
   - "turn_text": título forte. Use *asteriscos* para destaque.
   - "opinion": frase de opinião ou insight entre aspas.

6. "light" (fundo claro, contraste):
   - "mini_titulo": título
   - "texto": corpo do texto
   - "imagem": referência à foto (opcional)

7. "final" (SEMPRE o último slide):
   - "conclusion": frase de fechamento. Use *asteriscos* para destaque.
   - "pergunta_comentario": pergunta para engajamento nos comentários.

REGRAS:
- O primeiro slide DEVE ser "capa" e o último DEVE ser "final".
- Use de 7 a 10 slides no total.
- Varie os layouts entre os slides intermediários para manter o visual dinâmico.
- Use linguagem persuasiva e emocional, focando em benefícios e estilo de vida.
- Adapte os destaques ao perfil do imóvel.
- Referencie fotos como "foto_0", "foto_1", etc.

RESPONDA APENAS com o JSON válido, sem markdown, sem explicação. O formato deve ser:
{"slides": [...]}`;

export function buildCarrosselPrompt(property: PropertyProfile): string {
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

  return `Crie um carrossel de Instagram para divulgar a venda do seguinte imóvel:

DADOS DO IMÓVEL:
- Tipo: ${tipoLabel[property.tipo]}
- Endereço: ${property.endereco}, ${property.cidade} - ${property.estado}
- Quartos: ${property.quartos} | Banheiros: ${property.banheiros} | Vagas: ${property.vagas}
- Área útil: ${property.areaUtil} m² | Área total: ${property.areaTotal} m²
${property.andarPavimento ? `- Andar/Pavimento: ${property.andarPavimento}` : ''}
${property.condominio !== undefined ? `- Condomínio: ${formataPreco(property.condominio)}/mês` : ''}
${property.iptu !== undefined ? `- IPTU: ${formataPreco(property.iptu)}/ano` : ''}
- Preço: ${formataPreco(property.precoDesejado)}
- Características: ${caracteristicasLista}
- Descrição: ${property.descricao || 'Não informada'}
- Fotos disponíveis: ${property.fotos.length > 0 ? property.fotos.length + ' foto(s)' : 'Nenhuma foto cadastrada'}

Gere o roteiro JSON do carrossel com 7 a 10 slides.`;
}
