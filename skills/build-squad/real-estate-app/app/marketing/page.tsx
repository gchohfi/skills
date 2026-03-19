'use client';

import { useProperty } from '@/hooks/useProperty';
import { useStreamingResponse } from '@/hooks/useStreamingResponse';
import ModuleHeader from '@/components/layout/ModuleHeader';
import SocialPostPanel from '@/components/marketing/SocialPostPanel';
import StreamingText from '@/components/ui/StreamingText';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function MarketingPage() {
  const { property } = useProperty();
  const {
    response: estrategiaResponse,
    isLoading: estrategiaLoading,
    error: estrategiaError,
    trigger: triggerEstrategia,
  } = useStreamingResponse();

  async function handleGerar() {
    if (!property) return;
    await triggerEstrategia('/api/marketing/estrategia', { property });
  }

  if (!property) {
    return (
      <div>
        <ModuleHeader
          title="Plano de Marketing"
          description="Crie estratégias e conteúdos de marketing para divulgar seu imóvel."
          icon="📣"
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
    <div className="space-y-8">
      <ModuleHeader
        title="Plano de Marketing"
        description="Crie estratégias e conteúdos de marketing para divulgar seu imóvel."
        icon="📣"
      />

      {/* Seção: Estratégia */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800">Estratégia</h2>
          <Button onClick={handleGerar} loading={estrategiaLoading} size="md">
            {estrategiaLoading ? 'Gerando estratégia...' : 'Gerar Estratégia'}
          </Button>
        </div>

        {estrategiaError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            ❌ {estrategiaError}
          </div>
        )}

        {(estrategiaResponse || estrategiaLoading) && (
          <Card className="border-[#0e6b6e]/20 bg-gradient-to-br from-[#f0fafa] to-white">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0e6b6e]/10 text-xl">
                📣
              </span>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Plano de Marketing Gerado
                </h3>
                <p className="text-xs text-gray-500">Resultado gerado por IA</p>
              </div>
            </div>
            <div className="rounded-lg border border-[#0e6b6e]/10 bg-white p-4 text-sm leading-relaxed text-gray-700">
              <StreamingText text={estrategiaResponse} isLoading={estrategiaLoading} />
            </div>
          </Card>
        )}

        {!estrategiaResponse && !estrategiaLoading && (
          <Card className="border-dashed border-gray-200 bg-gray-50">
            <p className="text-center text-sm italic text-gray-400">
              Clique em &quot;Gerar Estratégia&quot; para receber um plano de marketing personalizado para o seu imóvel.
            </p>
          </Card>
        )}
      </section>

      {/* Seção: Posts para Redes Sociais */}
      <section>
        <h2 className="mb-4 text-base font-semibold text-gray-800">
          Posts para Redes Sociais
        </h2>
        <SocialPostPanel />
      </section>
    </div>
  );
}
