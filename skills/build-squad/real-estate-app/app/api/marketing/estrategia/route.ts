import anthropic, { MODEL } from '@/lib/anthropic'
import { createStreamResponse } from '@/lib/stream'
import { systemPromptStrategy, buildStrategyPrompt } from '@/lib/prompts/marketing'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { property } = body

    const stream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: 4096,
      system: systemPromptStrategy,
      messages: [{ role: 'user', content: buildStrategyPrompt(property) }],
    })

    return createStreamResponse(stream)
  } catch (error) {
    console.error('Error in /api/marketing/estrategia:', error)
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
