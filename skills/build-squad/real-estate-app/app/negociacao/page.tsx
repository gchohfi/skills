'use client';

import { useProperty } from '@/hooks/useProperty';
import { useOffers } from '@/hooks/useOffers';
import { useStreamingResponse } from '@/hooks/useStreamingResponse';
import ModuleHeader from '@/components/layout/ModuleHeader';
import OfferForm from '@/components/negociacao/OfferForm';
import CoachingPanel from '@/components/negociacao/CoachingPanel';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Offer } from '@/types/offer';

const statusVariant: Record<Offer['status'], 'success' | 'warning' | 'error' | 'info'> = {
  recebida: 'info',
  analisando: 'warning',
  aceita: 'success',
  recusada: 'error',
  contraproposta: 'warning',
};

const statusLabel: Record<Offer['status'], string> = {
  recebida: 'Recebida',
  analisando: 'Analisando',
  aceita: 'Aceita',
  recusada: 'Recusada',
  contraproposta: 'Contraproposta',
};

const formaPagamentoLabel: Record<Offer['formaPagamento'], string> = {
  avista: 'À vista',
  financiamento: 'Financiamento',
  fgts: 'FGTS',
  misto: 'Misto',
};

function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function NegociacaoPage() {
  const { property } = useProperty();
  const { offers, addOffer } = useOffers();
  const { response, isLoading, error, trigger } = useStreamingResponse();

  async function handleAnalyze(offer: Offer) {
    if (!property) return;
    await trigger('/api/negociacao', { property, offer });
  }

  if (!property) {
    return (
      <div>
        <ModuleHeader
          title="Coach de Negociação"
          description="Registre ofertas recebidas e obtenha orientações de negociação baseadas em IA."
          icon="🤝"
        />
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          ⚠️ Imóvel não configurado. Acesse{' '}
          <a href="/setup" className="font-medium underline">
            Configuração
          </a>{' '}
          para cadastrar seu imóvel primeiro.
        </div>
      </div>
    );
  }

  return (
    <div>
      <ModuleHeader
        title="Coach de Negociação"
        description="Registre ofertas recebidas e obtenha orientações de negociação baseadas em IA."
        icon="🤝"
      />

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          ❌ {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Section 1: Register new offer */}
        <OfferForm onAdd={addOffer} />

        {/* Section 2: List of registered offers */}
        <div>
          <h2 className="mb-3 text-base font-semibold text-gray-800">
            Ofertas Registradas ({offers.length})
          </h2>

          {offers.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-sm text-gray-500">
              Nenhuma oferta registrada ainda. Use o formulário acima para adicionar.
            </div>
          ) : (
            <div className="space-y-3">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="flex flex-col gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg font-semibold text-gray-900">
                        {formatBRL(offer.valorOferta)}
                      </span>
                      <Badge variant={statusVariant[offer.status]}>
                        {statusLabel[offer.status]}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">
                      💳 {formaPagamentoLabel[offer.formaPagamento]}
                    </span>
                    {offer.prazoEscritura && (
                      <span className="text-sm text-gray-500">
                        📅 Escritura até:{' '}
                        {new Date(offer.prazoEscritura + 'T00:00:00').toLocaleDateString('pt-BR')}
                      </span>
                    )}
                    {offer.condicoes.length > 0 && (
                      <span className="text-sm text-gray-400">
                        {offer.condicoes.length} condição(ões) registrada(s)
                      </span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    loading={isLoading}
                    onClick={() => handleAnalyze(offer)}
                  >
                    Analisar
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 3: AI coaching panel */}
        <CoachingPanel text={response} isLoading={isLoading} />
      </div>
    </div>
  );
}
