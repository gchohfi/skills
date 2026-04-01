'use client';
import { useState } from 'react';
import { useDoctor } from '@/context/DoctorContext';
import { useStreamingResponse } from '@/hooks/useStreamingResponse';
import { CarouselRoteiro } from '@/types/carousel';
import ModuleHeader from '@/components/layout/ModuleHeader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import StreamingText from '@/components/ui/StreamingText';

export default function ContentArchitectPage() {
  const { doctor } = useDoctor();
  const planner = useStreamingResponse();
  const [tema, setTema] = useState('');
  const [roteiro, setRoteiro] = useState<CarouselRoteiro | null>(null);
  const [carLoading, setCarLoading] = useState(false);
  const [carError, setCarError] = useState<string | null>(null);
  const [mode, setMode] = useState<'planner' | 'carrossel'>('planner');

  function runPlanner() {
    if (!doctor) return;
    planner.trigger('/api/content-architect', { doctor, mode: 'planner' });
  }

  async function runCarrossel() {
    if (!doctor || !tema.trim()) return;
    setCarLoading(true); setCarError(null); setRoteiro(null);
    try {
      const res = await fetch('/api/content-architect', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ doctor, mode: 'carrossel', tema }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao gerar carrossel');
      setRoteiro(data.roteiro);
    } catch (e: any) { setCarError(e.message); }
    finally { setCarLoading(false); }
  }

  const layoutColors: Record<string, string> = { capa: 'bg-purple-100 text-purple-800', timg: 'bg-blue-100 text-blue-800', tonly: 'bg-gray-100 text-gray-800', stat: 'bg-amber-100 text-amber-800', turning: 'bg-rose-100 text-rose-800', light: 'bg-green-100 text-green-800', final: 'bg-indigo-100 text-indigo-800' };

  return (
    <div className="space-y-6">
      <ModuleHeader title="Plano & Conteudo" description="Planejamento editorial + gerador de carrosseis com IA." icon="📐" />
      {!doctor && <Card><p className="text-sm text-amber-600">Configure o perfil da medica primeiro.</p></Card>}
      {doctor && (
        <>
          <div className="flex gap-2">
            <button onClick={() => setMode('planner')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'planner' ? 'bg-[#e2c799] text-[#0f172a]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Plano Editorial</button>
            <button onClick={() => setMode('carrossel')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'carrossel' ? 'bg-[#e2c799] text-[#0f172a]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Gerar Carrossel</button>
          </div>

          {mode === 'planner' && (
            <>
              <Button onClick={runPlanner} loading={planner.isLoading}>Gerar Plano Editorial</Button>
              {planner.error && <Card><p className="text-sm text-red-600">{planner.error}</p></Card>}
              {planner.response && <Card><div className="prose prose-sm max-w-none"><StreamingText text={planner.response} isLoading={planner.isLoading} /></div></Card>}
            </>
          )}

          {mode === 'carrossel' && (
            <>
              <Card>
                <label className="block text-xs font-medium text-gray-600 mb-1">Tema do carrossel</label>
                <textarea className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#e2c799] focus:outline-none h-20" value={tema} onChange={e => setTema(e.target.value)} placeholder="Ex: 5 sinais de que sua pele precisa de mais hidratacao" />
                <div className="mt-3"><Button onClick={runCarrossel} loading={carLoading} disabled={!tema.trim()}>Gerar Carrossel</Button></div>
              </Card>
              {carError && <Card><p className="text-sm text-red-600">{carError}</p></Card>}
              {roteiro && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-800">Roteiro — {roteiro.slides.length} slides</h3>
                  {roteiro.slides.map((slide, i) => (
                    <Card key={i}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-gray-400">#{slide.numero}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${layoutColors[slide.layout] || 'bg-gray-100'}`}>{slide.layout}</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        {slide.eyebrow && <p className="text-xs text-gray-500 uppercase tracking-wide">{slide.eyebrow}</p>}
                        {slide.headline && <p className="font-bold text-lg">{slide.headline}</p>}
                        {slide.mini_titulo && <p className="font-semibold">{slide.mini_titulo}</p>}
                        {slide.texto && <p className="text-gray-700">{slide.texto}</p>}
                        {slide.stat_number && <p className="text-3xl font-black text-[#e2c799]">{slide.stat_number} <span className="text-base font-normal text-gray-600">{slide.stat_unit}</span></p>}
                        {slide.big_text && <p className="text-gray-700">{slide.big_text}</p>}
                        {slide.turn_text && <p className="font-bold text-rose-700">{slide.turn_text}</p>}
                        {slide.e_dai && <p className="text-gray-600 italic">{slide.e_dai}</p>}
                        {slide.opinion && <p className="text-gray-700 italic">"{slide.opinion}"</p>}
                        {slide.conclusion && <p className="font-semibold">{slide.conclusion}</p>}
                        {slide.pergunta_comentario && <p className="text-[#e2c799] font-medium">{slide.pergunta_comentario}</p>}
                        {slide.zone_label && <p className="text-xs text-gray-400 mt-1">Imagem: {slide.zone_label}</p>}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
