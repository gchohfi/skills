'use client';

import { useProperty } from '@/hooks/useProperty';
import { useStreamingResponse } from '@/hooks/useStreamingResponse';
import ModuleHeader from '@/components/layout/ModuleHeader';
import ListingPreview from '@/components/anuncio/ListingPreview';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function AnuncioPage() {
  const { property } = useProperty();
  const { response, isLoading, error, trigger } = useStreamingResponse();

  async function handleGerar() {
    if (!property) return;
    await trigger('/api/anuncio', { property });
  }

  if (!property) {
    return (
      <div>
        <ModuleHeader
          title="Criador de Anúncio"
          description="Gere descrições atraentes e profissionais para o seu imóvel."
          icon="📝"
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
    <div className="space-y-6">
      <ModuleHeader
        title="Criador de Anúncio"
        description="Gere descrições atraentes e profissionais para o seu imóvel."
        icon="📝"
      />

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          ❌ {error}
        </div>
      )}

      <Card>
        <h2 className="mb-4 text-base font-semibold text-gray-800">Resumo do Imóvel</h2>
        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          <div>
            <span className="block text-xs font-medium uppercase tracking-wide text-gray-400">
              Tipo
            </span>
            <span className="mt-0.5 block capitalize text-gray-700">{property.tipo}</span>
          </div>
          <div>
            <span className="block text-xs font-medium uppercase tracking-wide text-gray-400">
              Cidade
            </span>
            <span className="mt-0.5 block text-gray-700">
              {property.cidade} — {property.estado}
            </span>
          </div>
          {property.quartos > 0 && (
            <div>
              <span className="block text-xs font-medium uppercase tracking-wide text-gray-400">
                Quartos
              </span>
              <span className="mt-0.5 block text-gray-700">{property.quartos}</span>
            </div>
          )}
          {property.banheiros > 0 && (
            <div>
              <span className="block text-xs font-medium uppercase tracking-wide text-gray-400">
                Banheiros
              </span>
              <span className="mt-0.5 block text-gray-700">{property.banheiros}</span>
            </div>
          )}
          {property.areaUtil > 0 && (
            <div>
              <span className="block text-xs font-medium uppercase tracking-wide text-gray-400">
                Área útil
              </span>
              <span className="mt-0.5 block text-gray-700">{property.areaUtil} m²</span>
            </div>
          )}
          {property.vagas > 0 && (
            <div>
              <span className="block text-xs font-medium uppercase tracking-wide text-gray-400">
                Vagas
              </span>
              <span className="mt-0.5 block text-gray-700">{property.vagas}</span>
            </div>
          )}
          <div>
            <span className="block text-xs font-medium uppercase tracking-wide text-gray-400">
              Preço
            </span>
            <span className="mt-0.5 block text-gray-700">
              {property.precoDesejado.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </div>

        {property.caracteristicas.length > 0 && (
          <div className="mt-4">
            <span className="block text-xs font-medium uppercase tracking-wide text-gray-400">
              Características
            </span>
            <div className="mt-1 flex flex-wrap gap-2">
              {property.caracteristicas.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-[#f0fafa] px-2.5 py-0.5 text-xs text-[#0e6b6e]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5">
          <Button onClick={handleGerar} loading={isLoading} size="lg">
            {isLoading ? 'Gerando anúncio...' : 'Gerar Anúncio'}
          </Button>
        </div>
      </Card>

      <ListingPreview text={response} isLoading={isLoading} />
    </div>
  );
}
