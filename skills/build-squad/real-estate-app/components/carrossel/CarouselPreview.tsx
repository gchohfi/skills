'use client';

import { useState, useRef } from 'react';
import { CarouselRoteiro, BrandIdentity } from '@/types/carousel';
import SlideRenderer from './SlideRenderer';
import Button from '@/components/ui/Button';

interface CarouselPreviewProps {
  roteiro: CarouselRoteiro;
  brand: BrandIdentity;
  fotos: string[];
}

export default function CarouselPreview({ roteiro, brand, fotos }: CarouselPreviewProps) {
  const [current, setCurrent] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [exporting, setExporting] = useState(false);

  const total = roteiro.slides.length;

  async function handleDownloadAll() {
    setExporting(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      for (let i = 0; i < total; i++) {
        const el = slideRefs.current[i];
        if (!el) continue;
        const canvas = await html2canvas(el, {
          width: 1080,
          height: 1350,
          scale: 1,
          useCORS: true,
          backgroundColor: null,
        });
        const link = document.createElement('a');
        link.download = `slide_${String(i + 1).padStart(2, '0')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    } catch (err) {
      console.error('Erro ao exportar slides:', err);
    } finally {
      setExporting(false);
    }
  }

  async function handleDownloadCurrent() {
    const el = slideRefs.current[current];
    if (!el) return;
    setExporting(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(el, {
        width: 1080,
        height: 1350,
        scale: 1,
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement('a');
      link.download = `slide_${String(current + 1).padStart(2, '0')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Erro ao exportar slide:', err);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Navigation buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {roteiro.slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={[
              'px-3 py-1.5 rounded text-xs font-medium border transition-colors',
              current === i
                ? 'bg-[#0e6b6e] text-white border-[#0e6b6e]'
                : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-400',
            ].join(' ')}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Preview area */}
      <div className="flex justify-center bg-gray-900 rounded-lg p-4 overflow-hidden">
        <div style={{ width: 360, height: 450, position: 'relative' }}>
          {roteiro.slides.map((slide, i) => (
            <div
              key={i}
              ref={(el) => { slideRefs.current[i] = el; }}
              style={{
                position: i === current ? 'relative' : 'absolute',
                top: 0,
                left: i === current ? 'auto' : -9999,
                width: 1080,
                height: 1350,
                transform: 'scale(0.3333)',
                transformOrigin: 'top left',
                visibility: i === current ? 'visible' : 'hidden',
              }}
            >
              <SlideRenderer slide={slide} total={total} brand={brand} fotos={fotos} />
            </div>
          ))}
        </div>
      </div>

      {/* Slide info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Slide {current + 1} de {total} &mdash; Layout: <span className="font-medium text-gray-700">{roteiro.slides[current]?.layout}</span>
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handleDownloadCurrent} loading={exporting}>
            Baixar Slide
          </Button>
          <Button variant="primary" size="sm" onClick={handleDownloadAll} loading={exporting}>
            Baixar Todos (PNG)
          </Button>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="flex justify-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
        >
          \u2190 Anterior
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
          disabled={current === total - 1}
        >
          Proximo \u2192
        </Button>
      </div>
    </div>
  );
}
