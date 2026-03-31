'use client';

import Link from 'next/link';
import ModuleHeader from '@/components/layout/ModuleHeader';
import StatusDashboard from '@/components/supervisor/StatusDashboard';
import StreamingText from '@/components/ui/StreamingText';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useDoctor } from '@/context/DoctorContext';
import { useStreamingResponse } from '@/hooks/useStreamingResponse';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { SupervisorStatusData } from '@/lib/prompts/supervisor';

export default function SupervisorPage() {
  const { doctor } = useDoctor();
  const { response, isLoading, error, trigger } = useStreamingResponse();

  const [temAnalisePerfil] = useLocalStorage<boolean>('medic_analise_perfil', false);
  const [temConcorrencia] = useLocalStorage<boolean>('medic_concorrencia', false);
  const [temTendencias] = useLocalStorage<boolean>('medic_tendencias', false);
  const [temEstrategia] = useLocalStorage<boolean>('medic_estrategia', false);
  const [temCarrossel] = useLocalStorage<boolean>('medic_carrossel', false);
  const [posts] = useLocalStorage<unknown[]>('medic_posts', []);
  const [temMetricas] = useLocalStorage<boolean>('medic_metricas', false);

  const statusData: SupervisorStatusData = {
    doctor: doctor ?? null,
    temAnalisePerfil,
    temConcorrencia,
    temTendencias,
    temEstrategia,
    temCarrossel,
    quantidadePosts: posts.length,
    temMetricas,
  };

  function handleAnalise() {
    trigger('/api/supervisor', { statusData });
  }

  const quickActions = [
    { show: !doctor, href: '/setup', icon: '⚙️', label: 'Configurar Perfil' },
    { show: !temAnalisePerfil, href: '/analise-perfil', icon: '🔍', label: 'Analisar Perfil' },
    { show: !temConcorrencia, href: '/concorrencia', icon: '📊', label: 'Analisar Concorrencia' },
    { show: !temTendencias, href: '/tendencias', icon: '📈', label: 'Buscar Tendencias' },
    { show: !temEstrategia, href: '/estrategia', icon: '📋', label: 'Criar Estrategia' },
    { show: !temCarrossel, href: '/carrossel', icon: '🎨', label: 'Gerar Carrossel' },
    { show: !temMetricas, href: '/metricas', icon: '📉', label: 'Registrar Metricas' },
  ].filter((a) => a.show);

  return (
    <div className="space-y-8">
      <ModuleHeader title="Diretor de Marketing" description="Coordenacao e supervisao de todos os agentes" icon="👔" />

      <StatusDashboard statusData={statusData} />

      <div className="flex flex-col items-center gap-3">
        <Button variant="primary" size="lg" loading={isLoading} onClick={handleAnalise} className="min-w-[240px]">
          {isLoading ? 'Analisando...' : '👔 Analisar e Recomendar'}
        </Button>
        {!isLoading && !response && (
          <p className="text-xs text-gray-400">O Diretor de Marketing avaliara todos os modulos e recomendara os proximos passos.</p>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
      )}

      {(response || isLoading) && (
        <Card className="border-[#4ecdc4]/20 bg-gradient-to-br from-[#4ecdc4]/5 to-white">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4ecdc4]/10 text-xl">👔</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Analise do Supervisor</h3>
              <p className="text-xs text-gray-500">Recomendacoes baseadas no status atual</p>
            </div>
          </div>
          <div className="rounded-lg border border-[#4ecdc4]/10 bg-white p-4 text-sm leading-relaxed text-gray-700">
            <StreamingText text={response} isLoading={isLoading} />
          </div>
        </Card>
      )}

      {quickActions.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="mb-1 text-sm font-semibold text-amber-800">Modulos que precisam de atencao</h3>
          <p className="mb-4 text-xs text-amber-600">Acesse os modulos abaixo para avancar na estrategia.</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <Button variant="secondary" size="sm">{action.icon} {action.label}</Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
