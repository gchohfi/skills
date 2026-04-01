'use client';
import { useDoctor } from '@/context/DoctorContext';
import { useStreamingResponse } from '@/hooks/useStreamingResponse';
import ModuleHeader from '@/components/layout/ModuleHeader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import StreamingText from '@/components/ui/StreamingText';

export default function PositioningPage() {
  const { doctor } = useDoctor();
  const { response, isLoading, error, trigger } = useStreamingResponse();

  function run() {
    if (!doctor) return;
    trigger('/api/positioning', { doctor });
  }

  return (
    <div className="space-y-6">
      <ModuleHeader title="Posicionamento Estrategico" description="Tese central, territorio editorial, diferenciacao, arquetipo e metodo proprietario." icon="💎" />
      {!doctor && <Card><p className="text-sm text-amber-600">Configure o perfil da medica primeiro.</p></Card>}
      {doctor && (
        <>
          <div className="flex items-center gap-3">
            <Button onClick={run} loading={isLoading}>Definir Posicionamento</Button>
          </div>
          {error && <Card><p className="text-sm text-red-600">{error}</p></Card>}
          {response && <Card><div className="prose prose-sm max-w-none"><StreamingText text={response} isLoading={isLoading} /></div></Card>}
        </>
      )}
    </div>
  );
}
