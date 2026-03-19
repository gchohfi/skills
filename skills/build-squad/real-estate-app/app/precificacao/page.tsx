'use client';

import { useState } from 'react';
import { useProperty } from '@/hooks/useProperty';
import { useStreamingResponse } from '@/hooks/useStreamingResponse';
import ModuleHeader from '@/components/layout/ModuleHeader';
import CompsForm, { Comparativo } from '@/components/precificacao/CompsForm';
import PriceCard from '@/components/precificacao/PriceCard';

export default function PrecificacaoPage() {
  const { property } = useProperty();
  const { response, isLoading, error, trigger } = useStreamingResponse();
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(comparativos: Comparativo[]) {
    if (!property) return;
    setSubmitted(true);
    await trigger('/api/precificacao', { property, comparativos });
  }

  if (!property) {
    return (
      <div>
        <ModuleHeader
          title="Precificação Inteligente"
          description="Análise de preço baseada em comparativos de mercado."
          icon="💰"
        />
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          ⚠️ Imóvel não configurado. Acesse{' '}
          <a href="/setup" className="underline font-medium">
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
        title="Precificação Inteligente"
        description="Analise o preço ideal do seu imóvel com base em comparativos reais de mercado."
        icon="💰"
      />

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          ❌ {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <CompsForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        <div className="lg:sticky lg:top-6">
          <PriceCard text={response} isLoading={isLoading && submitted} />
        </div>
      </div>
    </div>
  );
}
