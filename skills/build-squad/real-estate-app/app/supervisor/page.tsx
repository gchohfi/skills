'use client';

import Link from 'next/link';
import ModuleHeader from '@/components/layout/ModuleHeader';
import StatusDashboard from '@/components/supervisor/StatusDashboard';
import SupervisorPanel from '@/components/supervisor/SupervisorPanel';
import Button from '@/components/ui/Button';
import { useProperty } from '@/hooks/useProperty';
import { useShowings } from '@/hooks/useShowings';
import { useOffers } from '@/hooks/useOffers';
import { useStreamingResponse } from '@/hooks/useStreamingResponse';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { SupervisorStatusData } from '@/lib/prompts/supervisor';

const TOTAL_DOCUMENTOS = 3;

export default function SupervisorPage() {
  const { property } = useProperty();
  const { showings } = useShowings();
  const { offers } = useOffers();
  const { response, isLoading, error, trigger } = useStreamingResponse();

  // Rastrear conclusão dos módulos via localStorage
  const [temAnuncio] = useLocalStorage<boolean>('via_anuncio', false);
  const [temEstrategia] = useLocalStorage<boolean>('via_estrategia', false);
  const [documentosPreenchidos] = useLocalStorage<number>('via_documentos_count', 0);

  const visitasConfirmadas = showings.filter((s) => s.status === 'confirmado').length;
  const propostaAceita = offers.some((o) => o.status === 'aceita');

  const statusData: SupervisorStatusData = {
    property: property ?? null,
    temAnuncio,
    temEstrategia,
    quantidadeVisitas: showings.length,
    visitasConfirmadas,
    documentosPreenchidos,
    totalDocumentos: TOTAL_DOCUMENTOS,
    quantidadePropostas: offers.length,
    propostaAceita,
  };

  function handleAnalise() {
    trigger('/api/supervisor', { statusData });
  }

  // Botões de ação rápida para módulos que precisam de atenção
  const quickActions = [
    { show: !property, href: '/setup', icon: '⚙️', label: 'Configurar Imóvel' },
    { show: !!property, href: '/precificacao', icon: '💰', label: 'Precificação' },
    { show: !temAnuncio, href: '/anuncio', icon: '📝', label: 'Criar Anúncio' },
    { show: !temEstrategia, href: '/marketing', icon: '📣', label: 'Planejar Marketing' },
    { show: showings.length === 0, href: '/visitas', icon: '📅', label: 'Agendar Visitas' },
    {
      show: documentosPreenchidos < TOTAL_DOCUMENTOS,
      href: '/documentos',
      icon: '📄',
      label: 'Preparar Documentos',
    },
    { show: !propostaAceita, href: '/negociacao', icon: '🤝', label: 'Negociar Propostas' },
  ].filter((a) => a.show);

  return (
    <div className="space-y-8">
      <ModuleHeader
        title="Gerente Supervisor"
        description="Coordenação e supervisão de todos os módulos"
        icon="👔"
      />

      {/* Dashboard de status dos módulos */}
      <StatusDashboard statusData={statusData} />

      {/* Botão de análise */}
      <div className="flex flex-col items-center gap-3">
        <Button
          variant="primary"
          size="lg"
          loading={isLoading}
          onClick={handleAnalise}
          className="min-w-[240px]"
        >
          {isLoading ? 'Analisando...' : '👔 Analisar e Recomendar'}
        </Button>
        {!isLoading && !response && (
          <p className="text-xs text-gray-400">
            O Gerente Supervisor avaliará todos os módulos e recomendará os próximos passos.
          </p>
        )}
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          ❌ {error}
        </div>
      )}

      {/* Painel de análise do Supervisor */}
      <SupervisorPanel text={response} isLoading={isLoading} />

      {/* Ações rápidas — módulos que precisam de atenção */}
      {quickActions.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="mb-1 text-sm font-semibold text-amber-800">
            Módulos que precisam de atenção
          </h3>
          <p className="mb-4 text-xs text-amber-600">
            Acesse os módulos abaixo para avançar no processo de venda.
          </p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <Button variant="secondary" size="sm">
                  {action.icon} {action.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
