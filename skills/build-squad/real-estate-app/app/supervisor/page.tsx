'use client';

import Link from 'next/link';
import ModuleHeader from '../../components/layout/ModuleHeader';
import StatusDashboard from '../../components/supervisor/StatusDashboard';
import SupervisorPanel from '../../components/supervisor/SupervisorPanel';
import Button from '../../components/ui/Button';
import { usePropertyContext } from '../../context/PropertyContext';
import { useShowings } from '../../hooks/useShowings';
import { useOffers } from '../../hooks/useOffers';
import { useStreamingResponse } from '../../hooks/useStreamingResponse';
import { SupervisorStatusData } from '../../lib/prompts/supervisor';

export default function SupervisorPage() {
  const { property } = usePropertyContext();
  const { showings } = useShowings();
  const { offers } = useOffers();
  const { response, isLoading, trigger } = useStreamingResponse();

  // Check localStorage for module completions
  const temAnuncio = typeof window !== 'undefined' && !!localStorage.getItem('via_anuncio');
  const temEstrategia = typeof window !== 'undefined' && !!localStorage.getItem('via_estrategia');
  const docsPreenchidos = typeof window !== 'undefined'
    ? Object.keys(localStorage).filter(k => k.startsWith('via_doc_')).length
    : 0;

  const totalDocumentos = 3;
  const visitasConfirmadas = showings.filter(s => s.status === 'confirmado').length;
  const propostaAceita = offers.some(o => o.status === 'aceita');

  const statusData: SupervisorStatusData = {
    property: property ?? null,
    temAnuncio,
    temEstrategia,
    quantidadeVisitas: showings.length,
    visitasConfirmadas,
    documentosPreenchidos: docsPreenchidos,
    totalDocumentos,
    quantidadePropostas: offers.length,
    propostaAceita,
  };

  function handleAnalise() {
    trigger('/api/supervisor', { statusData });
  }

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Gerente Supervisor"
        description="Coordenação e supervisão de todo o processo de venda do seu imóvel"
        icon="👔"
      />

      {/* Status Dashboard */}
      <StatusDashboard statusData={statusData} />

      {/* Botão de análise */}
      <div className="flex justify-center">
        <Button variant="primary" size="lg" loading={isLoading} onClick={handleAnalise}>
          👔 Analisar e Recomendar
        </Button>
      </div>

      {/* Painel do Supervisor */}
      <SupervisorPanel text={response} isLoading={isLoading} />

      {/* Ações rápidas — módulos que precisam de atenção */}
      {(!property || !temAnuncio || !temEstrategia || showings.length === 0 || docsPreenchidos < totalDocumentos) && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-5">
          <h3 className="text-sm font-semibold text-amber-800 mb-3">
            Módulos que precisam de atenção
          </h3>
          <div className="flex flex-wrap gap-2">
            {!property && (
              <Link href="/setup">
                <Button variant="secondary" size="sm">⚙️ Configurar Imóvel</Button>
              </Link>
            )}
            {property && !temAnuncio && (
              <Link href="/anuncio">
                <Button variant="secondary" size="sm">📝 Criar Anúncio</Button>
              </Link>
            )}
            {!temEstrategia && (
              <Link href="/marketing">
                <Button variant="secondary" size="sm">📣 Planejar Marketing</Button>
              </Link>
            )}
            {showings.length === 0 && (
              <Link href="/visitas">
                <Button variant="secondary" size="sm">📅 Agendar Visitas</Button>
              </Link>
            )}
            {docsPreenchidos < totalDocumentos && (
              <Link href="/documentos">
                <Button variant="secondary" size="sm">📄 Preparar Documentos</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
