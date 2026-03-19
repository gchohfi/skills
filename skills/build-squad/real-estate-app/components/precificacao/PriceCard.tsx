import Card from '@/components/ui/Card';
import StreamingText from '@/components/ui/StreamingText';

interface PriceCardProps {
  text: string;
  isLoading: boolean;
}

export default function PriceCard({ text, isLoading }: PriceCardProps) {
  const isEmpty = !text && !isLoading;

  return (
    <Card className="border-[#0e6b6e]/20 bg-gradient-to-br from-[#f0fafa] to-white">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0e6b6e]/10 text-xl">
          💰
        </span>
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Análise de Precificação
          </h2>
          <p className="text-xs text-gray-500">Resultado gerado por IA</p>
        </div>
      </div>

      <div className="min-h-[160px] rounded-lg border border-[#0e6b6e]/10 bg-white p-4 text-sm leading-relaxed text-gray-700">
        {isEmpty ? (
          <p className="text-gray-400 italic">
            Preencha os imóveis comparativos e clique em &quot;Analisar Precificação&quot; para
            receber a análise de preço.
          </p>
        ) : (
          <StreamingText text={text} isLoading={isLoading} />
        )}
      </div>
    </Card>
  );
}
