import anthropic, { MODEL } from '@/lib/anthropic';
import { createStreamResponse } from '@/lib/stream';
import { systemPrompt, buildUserPrompt } from '@/lib/prompts/metrics-learning';
import { DoctorProfile } from '@/types/doctor';
import { PostMetrics } from '@/types/metrics';

export async function POST(req: Request) {
  try {
    const { doctor, posts } = (await req.json()) as { doctor: DoctorProfile; posts: PostMetrics[] };
    if (!doctor?.nome) return Response.json({ error: 'Perfil nao configurado' }, { status: 400 });
    const stream = anthropic.messages.stream({ model: MODEL, max_tokens: 4096, system: systemPrompt, messages: [{ role: 'user', content: buildUserPrompt(doctor, posts || []) }] });
    return createStreamResponse(stream);
  } catch (e: any) { return Response.json({ error: e.message }, { status: 500 }); }
}
