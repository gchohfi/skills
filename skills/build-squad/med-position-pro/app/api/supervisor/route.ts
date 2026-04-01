import anthropic, { MODEL } from '@/lib/anthropic';
import { createStreamResponse } from '@/lib/stream';
import { systemPrompt, buildUserPrompt, SupervisorStatusData } from '@/lib/prompts/supervisor';
import { DoctorProfile } from '@/types/doctor';

export async function POST(req: Request) {
  try {
    const { doctor, status } = (await req.json()) as { doctor: DoctorProfile; status: SupervisorStatusData };
    if (!doctor?.nome) return Response.json({ error: 'Perfil nao configurado' }, { status: 400 });
    const stream = anthropic.messages.stream({ model: MODEL, max_tokens: 4096, system: systemPrompt, messages: [{ role: 'user', content: buildUserPrompt(doctor, status) }] });
    return createStreamResponse(stream);
  } catch (e: any) { return Response.json({ error: e.message }, { status: 500 }); }
}
