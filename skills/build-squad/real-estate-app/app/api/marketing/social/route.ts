import anthropic, { MODEL } from '@/lib/anthropic'
import { createStreamResponse } from '@/lib/stream'
import { systemPromptSocial, buildSocialPrompt } from '@/lib/prompts/marketing'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { property, platform } = body

    const stream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: 4096,
      system: systemPromptSocial,
      messages: [{ role: 'user', content: buildSocialPrompt(property, platform) }],
    })

    return createStreamResponse(stream)
  } catch (error) {
    console.error('Error in /api/marketing/social:', error)
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
