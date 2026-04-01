import anthropic, { MODEL } from '@/lib/anthropic';
import { createStreamResponse } from '@/lib/stream';
import { systemPromptPlanner, buildPlannerPrompt, systemPromptCarrossel, buildCarrosselPrompt } from '@/lib/prompts/content-architect';
import { DoctorProfile } from '@/types/doctor';

export async function POST(req: Request) {
  try {
    const { doctor, mode, tema } = (await req.json()) as { doctor: DoctorProfile; mode: 'planner' | 'carrossel'; tema?: string };
    if (!doctor?.nome) return Response.json({ error: 'Perfil nao configurado' }, { status: 400 });

    if (mode === 'carrossel') {
      if (!tema) return Response.json({ error: 'Tema obrigatorio para carrossel' }, { status: 400 });
      const msg = await anthropic.messages.create({ model: MODEL, max_tokens: 4096, system: systemPromptCarrossel, messages: [{ role: 'user', content: buildCarrosselPrompt(doctor, tema) }] });
      const text = msg.content[0].type === 'text' ? msg.content[0].text : '';
      try {
        const roteiro = JSON.parse(text);
        return Response.json({ roteiro });
      } catch { return Response.json({ error: 'Resposta invalida do agente', raw: text }, { status: 500 }); }
    }

    const stream = anthropic.messages.stream({ model: MODEL, max_tokens: 4096, system: systemPromptPlanner, messages: [{ role: 'user', content: buildPlannerPrompt(doctor) }] });
    return createStreamResponse(stream);
  } catch (e: any) { return Response.json({ error: e.message }, { status: 500 }); }
}
