import anthropic, { MODEL } from '@/lib/anthropic'
import { createStreamResponse } from '@/lib/stream'
import { systemPrompt, buildUserPrompt } from '@/lib/prompts/anuncio'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { property } = body

    const stream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: buildUserPrompt(property) }],
    })

    return createStreamResponse(stream)
  } catch (error) {
    console.error('Error in /api/anuncio:', error)
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
