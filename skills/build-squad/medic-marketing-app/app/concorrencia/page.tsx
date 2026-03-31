'use client';

import { useDoctor } from '@/context/DoctorContext';
import { useStreamingResponse } from '@/hooks/useStreamingResponse';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import ModuleHeader from '@/components/layout/ModuleHeader';
import StreamingText from '@/components/ui/StreamingText';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ConcorrenciaPage() {
  const { doctor } = useDoctor();
  const { response, isLoading, error, trigger } = useStreamingResponse();
  const [, setTemConcorrencia] = useLocalStorage<boolean>('medic_concorrencia', false);

  async function handleGerar() {
    if (!doctor) return;
    await trigger('/api/concorrencia', { doctor });
    setTemConcorrencia(true);
  }

  if (!doctor) {
    return (
      <div>
        <ModuleHeader title="Analise de Concorrencia" description="Benchmarks e gaps competitivos na sua especialidade." icon="📊" />
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          Perfil nao configurado. <a href="/setup" className="underline font-medium">Configurar agora</a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ModuleHeader title="Analise de Concorrencia" description="Benchmarks e gaps competitivos na sua especialidade." icon="📊" />
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">Cenario Competitivo</h2>
        <Button onClick={handleGerar} loading={isLoading}>{isLoading ? 'Analisando...' : 'Analisar Concorrencia'}</Button>
      </div>
      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>}
      {(response || isLoading) && (
        <Card className="border-[#4ecdc4]/20 bg-gradient-to-br from-[#4ecdc4]/5 to-white">
          <div className="rounded-lg border border-[#4ecdc4]/10 bg-white p-4 text-sm leading-relaxed text-gray-700">
            <StreamingText text={response} isLoading={isLoading} />
          </div>
        </Card>
      )}
      {!response && !isLoading && (
        <Card className="border-dashed border-gray-200 bg-gray-50">
          <p className="text-center text-sm italic text-gray-400">Clique em &quot;Analisar Concorrencia&quot; para entender o cenario competitivo da sua especialidade.</p>
        </Card>
      )}
    </div>
  );
}
