'use client';

import StreamingText from '../ui/StreamingText';

interface SupervisorPanelProps {
  text: string;
  isLoading: boolean;
}

export default function SupervisorPanel({ text, isLoading }: SupervisorPanelProps) {
  if (!text && !isLoading) return null;

  return (
    <div className="rounded-xl border border-[#1a1a2e] bg-[#1a1a2e] shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl flex-shrink-0">
          👔
        </span>
        <div>
          <h3 className="text-base font-bold text-white leading-tight">Gerente Supervisor</h3>
          <p className="text-xs text-white/50 mt-0.5">
            Análise e recomendações do processo de venda
          </p>
        </div>
        {isLoading && (
          <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-white/40">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/40 animate-pulse" />
            Analisando...
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-5 py-5">
        <div className="text-sm text-white/90 leading-relaxed">
          <StreamingText text={text} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
