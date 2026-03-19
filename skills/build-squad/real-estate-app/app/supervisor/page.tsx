'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import ModuleHeader from '../../components/layout/ModuleHeader';
import StatusDashboard, { StatusItem } from '../../components/supervisor/StatusDashboard';
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

  const statusItems: StatusItem[] = useMemo(() => [
    {
      modulo: 'Imóvel',
      icone: '🏠',
      status: property ? 'concluido' : 'atencao',
      detalhe: property ? `${property.tipo} - ${property.cidade}/${property.estado}` : 'Configure seu imóvel para começar',
    },
    {
      modulo: 'Precificação',
      icone: '💰',
      status: property ? 'em_andamento' : 'pendente',
      detalhe: property ? 'Disponível para análise' : 'Aguardando cadastro do imóvel',
    },
    {
      modulo: 'Anúncio',
      icone: '📝',
      status: temAnuncio ? 'concluido' : (property ? 'pendente' : 'pendente'),
      detalhe: temAnuncio ? 'Anúncio gerado' : 'Aguardando geração',
    },
    {
      modulo: 'Marketing',
      icone: '📣',
      status: temEstrategia ? 'concluido' : 'pendente',
      detalhe: temEstrategia ? 'Estratégia definida' : 'Aguardando planejamento',
    },
    {
      modulo: 'Visitas',
      icone: '📅',
      status: showings.length > 0 ? 'em_andamento' : 'pendente',
      detalhe: showings.length > 0
        ? `${showings.length} visita(s), ${visitasConfirmadas} confirmada(s)`
        : 'Nenhuma visita agendada',
    },
    {
      modulo: 'Documentos',
      icone: '📄',
      status: docsPreenchidos === totalDocumentos ? 'concluido' : (docsPreenchidos > 0 ? 'em_andamento' : 'pendente'),
      detalhe: `${docsPreenchidos} de ${totalDocumentos} preenchidos`,
    },
    {
      modulo: 'Negociação',
      icone: '🤝',
      status: propostaAceita ? 'concluido' : (offers.length > 0 ? 'em_andamento' : 'pendente'),
      detalhe: propostaAceita
        ? 'Proposta aceita!'
        : offers.length > 0
          ? `${offers.length} proposta(s) recebida(s)`
          : 'Nenhuma proposta recebida',
    },
  ], [property, temAnuncio, temEstrategia, showings, visitasConfirmadas, docsPreenchidos, offers, propostaAceita]);

  const pendentes = statusItems.filter(i => i.status === 'pendente' || i.status === 'atencao');

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
      <StatusDashboard items={statusItems} />

      {/* Botão de análise */}
      <div className="flex justify-center">
        <Button variant="primary" size="lg" loading={isLoading} onClick={handleAnalise}>
          👔 Analisar e Recomendar
        </Button>
      </div>

      {/* Painel do Supervisor */}
      <SupervisorPanel text={response} isLoading={isLoading} />

      {/* Ações rápidas — módulos que precisam de atenção */}
      {pendentes.length > 0 && (
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
