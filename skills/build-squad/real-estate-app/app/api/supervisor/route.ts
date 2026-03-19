import anthropic, { MODEL } from '@/lib/anthropic';
import { createStreamResponse } from '@/lib/stream';
import { systemPrompt, buildUserPrompt } from '@/lib/prompts/supervisor';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { statusData } = body;

    const stream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: buildUserPrompt(statusData) }],
    });

    return createStreamResponse(stream);
  } catch (error) {
    console.error('Erro em /api/supervisor:', error);
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
