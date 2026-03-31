'use client';

import { useState } from 'react';
import { useProperty } from '@/hooks/useProperty';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import ModuleHeader from '@/components/layout/ModuleHeader';
import CarouselPreview from '@/components/carrossel/CarouselPreview';
import BrandForm from '@/components/carrossel/BrandForm';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { CarouselRoteiro, BrandIdentity, DEFAULT_BRAND } from '@/types/carousel';

export default function CarrosselPage() {
  const { property } = useProperty();
  const [roteiro, setRoteiro] = useState<CarouselRoteiro | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [brand, setBrand] = useLocalStorage<BrandIdentity>('via_brand', DEFAULT_BRAND);
  const [, setTemCarrossel] = useLocalStorage<boolean>('via_carrossel', false);
  const [showBrand, setShowBrand] = useState(false);

  async function handleGerar() {
    if (!property) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/carrossel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ property }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro ao gerar carrossel');
      }
      const data = await res.json();
      setRoteiro(data.roteiro);
      setTemCarrossel(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  }

  if (!property) {
    return (
      <div>
        <ModuleHeader
          title="Carrossel Instagram"
          description="Crie carrosseis visuais para divulgar seu imovel no Instagram."
          icon="🎨"
        />
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          Imovel nao configurado. Acesse{' '}
          <a href="/setup" className="underline font-medium">
            Configuracao
          </a>{' '}
          para cadastrar seu imovel primeiro.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ModuleHeader
        title="Carrossel Instagram"
        description="Crie carrosseis visuais para divulgar seu imovel no Instagram."
        icon="🎨"
      />

      {/* Identidade visual */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800">Identidade Visual</h2>
          <Button variant="ghost" size="sm" onClick={() => setShowBrand(!showBrand)}>
            {showBrand ? 'Ocultar' : 'Configurar'}
          </Button>
        </div>
        {showBrand && (
          <Card className="border-[#0e6b6e]/20">
            <BrandForm brand={brand} onChange={setBrand} />
          </Card>
        )}
      </section>

      {/* Gerar */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800">Carrossel</h2>
          <Button onClick={handleGerar} loading={isLoading} size="md">
            {isLoading ? 'Gerando roteiro...' : 'Gerar Carrossel'}
          </Button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}

        {roteiro && (
          <Card className="border-[#0e6b6e]/20 bg-gradient-to-br from-[#f0fafa] to-white">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0e6b6e]/10 text-xl">
                🎨
              </span>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Carrossel Gerado ({roteiro.slides.length} slides)
                </h3>
                <p className="text-xs text-gray-500">Preview interativo — clique nos numeros para navegar</p>
              </div>
            </div>
            <CarouselPreview roteiro={roteiro} brand={brand} fotos={property.fotos || []} />
          </Card>
        )}

        {!roteiro && !isLoading && (
          <Card className="border-dashed border-gray-200 bg-gray-50">
            <p className="text-center text-sm italic text-gray-400">
              Clique em &quot;Gerar Carrossel&quot; para criar um carrossel de Instagram personalizado para o seu imovel.
            </p>
          </Card>
        )}
      </section>
    </div>
  );
}
