'use client';

import Card from '../ui/Card';
import StreamingText from '../ui/StreamingText';

interface SupervisorPanelProps {
  text: string;
  isLoading: boolean;
}

export default function SupervisorPanel({ text, isLoading }: SupervisorPanelProps) {
  if (!text && !isLoading) return null;

  return (
    <Card className="!bg-[#1a1a2e] !border-[#1a1a2e]">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl">
          👔
        </span>
        <div>
          <h3 className="text-base font-bold text-white">Gerente Supervisor</h3>
          <p className="text-xs text-white/50">Análise e recomendações do processo de venda</p>
        </div>
      </div>
      <div className="text-sm text-white/90 leading-relaxed">
        <StreamingText text={text} isLoading={isLoading} />
      </div>
    </Card>
  );
}
