import anthropic, { MODEL } from '@/lib/anthropic'
import { createStreamResponse } from '@/lib/stream'
import { systemPrompt, buildUserPrompt } from '@/lib/prompts/precificacao'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { property, comparativos } = body

    const stream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: buildUserPrompt(property, comparativos) }],
    })

    return createStreamResponse(stream)
  } catch (error) {
    console.error('Error in /api/precificacao:', error)
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
