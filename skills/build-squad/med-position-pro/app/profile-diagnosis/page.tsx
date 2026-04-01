'use client';
import { useDoctor } from '@/context/DoctorContext';
import { useStreamingResponse } from '@/hooks/useStreamingResponse';
import ModuleHeader from '@/components/layout/ModuleHeader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import StreamingText from '@/components/ui/StreamingText';

export default function ProfileDiagnosisPage() {
  const { doctor } = useDoctor();
  const { response, isLoading, error, trigger } = useStreamingResponse();

  function run() {
    if (!doctor) return;
    trigger('/api/profile-diagnosis', { doctor });
  }

  return (
    <div className="space-y-6">
      <ModuleHeader title="Diagnostico do Perfil" description="Analise completa do perfil Instagram com scores de clareza, autoridade, coerencia e conversao." icon="🔍" />
      {!doctor && <Card><p className="text-sm text-amber-600">Configure o perfil da medica antes de rodar o diagnostico.</p></Card>}
      {doctor && (
        <>
          <div className="flex items-center gap-3">
            <Button onClick={run} loading={isLoading}>Rodar Diagnostico</Button>
            {doctor.instagramHandle && <span className="text-sm text-gray-500">{doctor.instagramHandle} — {doctor.seguidores.toLocaleString('pt-BR')} seguidores</span>}
          </div>
          {error && <Card><p className="text-sm text-red-600">{error}</p></Card>}
          {response && <Card><div className="prose prose-sm max-w-none"><StreamingText text={response} isLoading={isLoading} /></div></Card>}
        </>
      )}
    </div>
  );
}
