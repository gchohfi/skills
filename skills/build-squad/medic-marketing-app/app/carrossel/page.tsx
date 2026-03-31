'use client';

import { useState, useRef } from 'react';
import { useDoctor } from '@/context/DoctorContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import ModuleHeader from '@/components/layout/ModuleHeader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { CarouselRoteiro, BrandIdentity, DEFAULT_BRAND, CarouselSlide } from '@/types/carousel';

function highlightText(text: string): string {
  return (text || '').replace(/\*(.+?)\*/g, '<em>$1</em>');
}

function SlidePreview({ slide, total, brand }: { slide: CarouselSlide; total: number; brand: BrandIdentity }) {
  const num = slide.numero;
  const layout = slide.layout;

  const baseStyle: React.CSSProperties = {
    width: 360,
    height: 450,
    position: 'relative',
    overflow: 'hidden',
    background: layout === 'light' ? brand.corTexto : brand.corFundo,
    fontFamily: `'${brand.fonteCorpo}', sans-serif`,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 8,
  };

  const textColor = layout === 'light' ? brand.corFundo : brand.corTexto;
  const mutedColor = layout === 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.5)';

  const header = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px 0', zIndex: 10, flexShrink: 0 }}>
      <span style={{ fontFamily: `'${brand.fonteDisplay}', sans-serif`, fontSize: 11, letterSpacing: 2, color: layout === 'light' ? brand.corFundo : brand.corDestaque }}>{brand.brandName}</span>
      <span style={{ fontSize: 7, color: mutedColor }}>{brand.handle}</span>
    </div>
  );

  const footer = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px 12px', zIndex: 10, flexShrink: 0, marginTop: 'auto' }}>
      <span style={{ fontSize: 7, color: mutedColor }}>{String(num).padStart(2, '0')}/{total}</span>
      <span style={{ fontSize: 7, color: mutedColor }}>{num === 1 ? 'deslize →' : num === total ? 'salva 🔖' : ''}</span>
    </div>
  );

  if (layout === 'capa') {
    return (
      <div style={{ ...baseStyle, display: 'block' }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${brand.corFundo}, ${brand.corFundo}dd)` }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>{header}</div>
        <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, padding: '0 16px', zIndex: 10 }}>
          <p style={{ fontSize: 7, letterSpacing: 3, color: brand.corDestaque, textTransform: 'uppercase', marginBottom: 6 }}>{slide.eyebrow}</p>
          <h1 style={{ fontFamily: `'${brand.fonteDisplay}', sans-serif`, fontSize: 32, lineHeight: 0.93, color: brand.corTexto, textTransform: 'uppercase' }} dangerouslySetInnerHTML={{ __html: highlightText(slide.headline || '') }} />
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10 }}>{footer}</div>
      </div>
    );
  }

  const bodyContent = () => {
    switch (layout) {
      case 'stat':
        return (
          <>
            <p style={{ fontFamily: `'${brand.fonteDisplay}', sans-serif`, fontSize: 48, lineHeight: 0.85, color: brand.corDestaque }}>{slide.stat_number}</p>
            <p style={{ fontSize: 7, color: mutedColor, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>{slide.stat_unit}</p>
            <p style={{ fontSize: 9, lineHeight: 1.5, color: textColor }} dangerouslySetInnerHTML={{ __html: highlightText(slide.texto || '') }} />
          </>
        );
      case 'turning':
        return (
          <>
            <div style={{ width: '100%', height: 3, background: brand.corDestaque, marginBottom: 8 }} />
            <span style={{ fontSize: 7, letterSpacing: 3, color: brand.corDestaque, textTransform: 'uppercase' }}>minha leitura</span>
            <h2 style={{ fontFamily: `'${brand.fonteDisplay}', sans-serif`, fontSize: 22, lineHeight: 0.93, color: textColor }} dangerouslySetInnerHTML={{ __html: highlightText(slide.turn_text || '') }} />
            <p style={{ fontSize: 9, lineHeight: 1.5, color: textColor, fontStyle: 'italic', opacity: 0.85 }}>&ldquo;{slide.opinion}&rdquo;</p>
          </>
        );
      case 'final':
        return (
          <>
            <h2 style={{ fontFamily: `'${brand.fonteDisplay}', sans-serif`, fontSize: 22, lineHeight: 0.93, color: textColor }} dangerouslySetInnerHTML={{ __html: highlightText(slide.conclusion || '') }} />
            <div style={{ background: brand.corDestaque, padding: '8px 10px', borderRadius: 4 }}>
              <p style={{ fontSize: 8, fontWeight: 700, color: brand.corFundo }}>Siga para mais conteudo como esse.</p>
            </div>
            <p style={{ fontSize: 7, color: mutedColor, borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 8 }}>{slide.pergunta_comentario}</p>
          </>
        );
      case 'tonly':
        return (
          <>
            <span style={{ fontSize: 7, letterSpacing: 3, color: brand.corDestaque, textTransform: 'uppercase' }}>{slide.zone_label}</span>
            <div style={{ width: 20, height: 2, background: brand.corDestaque }} />
            <h2 style={{ fontFamily: `'${brand.fonteDisplay}', sans-serif`, fontSize: 22, lineHeight: 0.95, color: textColor }} dangerouslySetInnerHTML={{ __html: highlightText(slide.big_text || '') }} />
            <p style={{ fontSize: 9, lineHeight: 1.5, color: textColor }} dangerouslySetInnerHTML={{ __html: highlightText(slide.texto || '') }} />
          </>
        );
      default: // timg, light
        return (
          <>
            <h2 style={{ fontFamily: `'${brand.fonteDisplay}', sans-serif`, fontSize: 18, lineHeight: 0.97, color: textColor }} dangerouslySetInnerHTML={{ __html: highlightText(slide.mini_titulo || '') }} />
            <p style={{ fontSize: 9, lineHeight: 1.5, color: textColor }} dangerouslySetInnerHTML={{ __html: highlightText(slide.texto || '') }} />
          </>
        );
    }
  };

  return (
    <div style={baseStyle}>
      {header}
      <div style={{ flex: 1, padding: '10px 16px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8, overflow: 'hidden' }}>
        {bodyContent()}
      </div>
      {footer}
    </div>
  );
}

export default function CarrosselPage() {
  const { doctor } = useDoctor();
  const [roteiro, setRoteiro] = useState<CarouselRoteiro | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tema, setTema] = useState('');
  const [current, setCurrent] = useState(0);
  const [brand] = useLocalStorage<BrandIdentity>('medic_brand', DEFAULT_BRAND);
  const [, setTemCarrossel] = useLocalStorage<boolean>('medic_carrossel', false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  async function handleGerar() {
    if (!doctor || !tema.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/carrossel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doctor, tema }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro ao gerar carrossel');
      }
      const data = await res.json();
      setRoteiro(data.roteiro);
      setTemCarrossel(true);
      setCurrent(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  }

  if (!doctor) {
    return (
      <div>
        <ModuleHeader title="Gerador de Carrossel" description="Crie carrosseis prontos para Instagram." icon="🎨" />
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          Perfil nao configurado. <a href="/setup" className="underline font-medium">Configurar agora</a>
        </div>
      </div>
    );
  }

  const total = roteiro?.slides.length || 0;

  return (
    <div className="space-y-8">
      <ModuleHeader title="Gerador de Carrossel" description="Crie carrosseis prontos para Instagram." icon="🎨" />

      <Card>
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Tema do Carrossel</h3>
        <div className="flex gap-3">
          <input
            className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#4ecdc4] focus:outline-none"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            placeholder="Ex: 5 sinais de que voce precisa procurar um dermatologista"
            onKeyDown={(e) => e.key === 'Enter' && handleGerar()}
          />
          <Button onClick={handleGerar} loading={isLoading} disabled={!tema.trim()}>
            {isLoading ? 'Gerando...' : 'Gerar'}
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {['Mitos e verdades', 'Sinais de alerta', 'Dicas praticas', 'Voce sabia?', 'Antes e depois educativo'].map((s) => (
            <button key={s} onClick={() => setTema(s)} className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600 hover:bg-[#4ecdc4]/10 hover:text-[#0a1628] transition-colors">
              {s}
            </button>
          ))}
        </div>
      </Card>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>}

      {roteiro && (
        <Card className="border-[#4ecdc4]/20 bg-gradient-to-br from-[#4ecdc4]/5 to-white">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4ecdc4]/10 text-xl">🎨</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Carrossel Gerado ({total} slides)</h3>
              <p className="text-xs text-gray-500">Preview — clique nos numeros para navegar</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap mb-4">
            {roteiro.slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={[
                  'px-3 py-1.5 rounded text-xs font-medium border transition-colors',
                  current === i ? 'bg-[#4ecdc4] text-[#0a1628] border-[#4ecdc4]' : 'bg-transparent text-gray-500 border-gray-200',
                ].join(' ')}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="flex justify-center bg-gray-900 rounded-lg p-6">
            <div ref={(el) => { slideRefs.current[current] = el; }}>
              <SlidePreview slide={roteiro.slides[current]} total={total} brand={brand} />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Slide {current + 1}/{total} — <span className="font-medium text-gray-700">{roteiro.slides[current]?.layout}</span>
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}>← Anterior</Button>
              <Button variant="ghost" size="sm" onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))} disabled={current === total - 1}>Proximo →</Button>
            </div>
          </div>
        </Card>
      )}

      {!roteiro && !isLoading && (
        <Card className="border-dashed border-gray-200 bg-gray-50">
          <p className="text-center text-sm italic text-gray-400">Escolha um tema e clique em &quot;Gerar&quot; para criar um carrossel de Instagram.</p>
        </Card>
      )}
    </div>
  );
}
