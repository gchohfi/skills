'use client';
import { useDoctor } from '@/context/DoctorContext';
import { useStreamingResponse } from '@/hooks/useStreamingResponse';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { SupervisorStatusData } from '@/lib/prompts/supervisor';
import { PostMetrics, BrandMemoryEntry } from '@/types/metrics';
import ModuleHeader from '@/components/layout/ModuleHeader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import StreamingText from '@/components/ui/StreamingText';
import StatusDashboard from '@/components/supervisor/StatusDashboard';

export default function SupervisorPage() {
  const { doctor } = useDoctor();
  const { response, isLoading, error, trigger } = useStreamingResponse();
  const [diagDone] = useLocalStorage('mpp_diagnosis_done', false);
  const [compDone] = useLocalStorage('mpp_competitor_done', false);
  const [refDone] = useLocalStorage('mpp_reference_done', false);
  const [posDone] = useLocalStorage('mpp_positioning_done', false);
  const [planDone] = useLocalStorage('mpp_planner_done', false);
  const [carDone] = useLocalStorage('mpp_carousel_done', false);
  const [complDone] = useLocalStorage('mpp_compliance_done', false);
  const [posts] = useLocalStorage<PostMetrics[]>('mpp_posts', []);
  const [brandMemory] = useLocalStorage<BrandMemoryEntry[]>('mpp_brand_memory', []);

  const status: SupervisorStatusData = {
    temPerfil: !!doctor,
    temDiagnostico: diagDone,
    temConcorrencia: compDone,
    temReferencias: refDone,
    temPosicionamento: posDone,
    temPlanoEditorial: planDone,
    temCarrossel: carDone,
    temCompliance: complDone,
    temMetricas: posts.length > 0,
    temBrandMemory: brandMemory.length > 0,
  };

  function run() {
    if (!doctor) return;
    trigger('/api/supervisor', { doctor, status });
  }

  return (
    <div className="space-y-6">
      <ModuleHeader title="Supervisor" description="Visao executiva do projeto de posicionamento e proximos passos priorizados." icon="👔" />
      {!doctor && <Card><p className="text-sm text-amber-600">Configure o perfil da medica primeiro.</p></Card>}
      {doctor && (
        <>
          <StatusDashboard status={status} />
          <Button onClick={run} loading={isLoading}>Gerar Analise Executiva</Button>
          {error && <Card><p className="text-sm text-red-600">{error}</p></Card>}
          {response && <Card><div className="prose prose-sm max-w-none"><StreamingText text={response} isLoading={isLoading} /></div></Card>}
        </>
      )}
    </div>
  );
}
