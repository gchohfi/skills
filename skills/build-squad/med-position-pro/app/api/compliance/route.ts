import anthropic, { MODEL } from '@/lib/anthropic';
import { createStreamResponse } from '@/lib/stream';
import { systemPrompt, buildUserPrompt } from '@/lib/prompts/compliance';
import { DoctorProfile } from '@/types/doctor';

export async function POST(req: Request) {
  try {
    const { doctor, conteudo } = (await req.json()) as { doctor: DoctorProfile; conteudo: string };
    if (!doctor?.nome) return Response.json({ error: 'Perfil nao configurado' }, { status: 400 });
    if (!conteudo?.trim()) return Response.json({ error: 'Conteudo obrigatorio para revisao' }, { status: 400 });
    const stream = anthropic.messages.stream({ model: MODEL, max_tokens: 4096, system: systemPrompt, messages: [{ role: 'user', content: buildUserPrompt(doctor, conteudo) }] });
    return createStreamResponse(stream);
  } catch (e: any) { return Response.json({ error: e.message }, { status: 500 }); }
}
