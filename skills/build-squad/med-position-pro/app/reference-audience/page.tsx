'use client';
import { useDoctor } from '@/context/DoctorContext';
import { useStreamingResponse } from '@/hooks/useStreamingResponse';
import ModuleHeader from '@/components/layout/ModuleHeader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import StreamingText from '@/components/ui/StreamingText';

export default function ReferenceAudiencePage() {
  const { doctor } = useDoctor();
  const { response, isLoading, error, trigger } = useStreamingResponse();

  function run() {
    if (!doctor) return;
    trigger('/api/reference-audience', { doctor });
  }

  return (
    <div className="space-y-6">
      <ModuleHeader title="Referencias & Publico" description="Analise de referencias, padrao ouro do nicho e persona da paciente ideal." icon="🎯" />
      {!doctor && <Card><p className="text-sm text-amber-600">Configure o perfil da medica primeiro.</p></Card>}
      {doctor && (
        <>
          <div className="flex items-center gap-3">
            <Button onClick={run} loading={isLoading}>Analisar Referencias</Button>
            {doctor.referencias.length > 0 && <span className="text-sm text-gray-500">{doctor.referencias.length} referencia(s) cadastrada(s)</span>}
          </div>
          {error && <Card><p className="text-sm text-red-600">{error}</p></Card>}
          {response && <Card><div className="prose prose-sm max-w-none"><StreamingText text={response} isLoading={isLoading} /></div></Card>}
        </>
      )}
    </div>
  );
}
