import anthropic, { MODEL } from '@/lib/anthropic';
import { systemPromptCarrossel, buildCarrosselPrompt } from '@/lib/prompts/carrossel';

export async function POST(request: Request) {
  try {
    const { doctor, tema } = await request.json();

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4096,
      system: systemPromptCarrossel,
      messages: [{ role: 'user', content: buildCarrosselPrompt(doctor, tema) }],
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      return Response.json({ error: 'Resposta vazia do modelo' }, { status: 500 });
    }

    const roteiro = JSON.parse(textBlock.text);
    return Response.json({ roteiro });
  } catch (error) {
    console.error('Error in /api/carrossel:', error);
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
