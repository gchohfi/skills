'use client';

import Card from '@/components/ui/Card';
import StreamingText from '@/components/ui/StreamingText';

interface CoachingPanelProps {
  text: string;
  isLoading: boolean;
}

export default function CoachingPanel({ text, isLoading }: CoachingPanelProps) {
  return (
    <Card>
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f0fafa] text-lg">
          🤝
        </span>
        <h2 className="text-base font-semibold text-gray-800">Análise de Negociação</h2>
      </div>

      {(text || isLoading) ? (
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-800 leading-relaxed">
          <StreamingText text={text} isLoading={isLoading} />
        </div>
      ) : (
        <div className="flex min-h-[160px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-sm text-gray-400">
          Clique em "Analisar" em uma oferta para receber orientações de negociação da IA.
        </div>
      )}
    </Card>
  );
}
