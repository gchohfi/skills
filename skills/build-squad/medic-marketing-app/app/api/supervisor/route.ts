import anthropic, { MODEL } from '@/lib/anthropic';
import { createStreamResponse } from '@/lib/stream';
import { systemPrompt, buildUserPrompt } from '@/lib/prompts/supervisor';

export async function POST(request: Request) {
  try {
    const { statusData } = await request.json();
    const stream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: buildUserPrompt(statusData) }],
    });
    return createStreamResponse(stream);
  } catch (error) {
    console.error('Error in /api/supervisor:', error);
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
