'use client';

import { useState } from 'react';
import { useDoctor } from '@/context/DoctorContext';
import { useStreamingResponse } from '@/hooks/useStreamingResponse';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import ModuleHeader from '@/components/layout/ModuleHeader';
import StreamingText from '@/components/ui/StreamingText';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { PostMetrics, MetricsSummary } from '@/types/metrics';

function calcSummary(posts: PostMetrics[], seguidores: number): MetricsSummary {
  if (posts.length === 0) {
    return { totalPosts: 0, mediaAlcance: 0, mediaCurtidas: 0, mediaSalvamentos: 0, taxaEngajamento: 0, melhorPost: null, piorPost: null, crescimentoSeguidores: 0 };
  }
  const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const sorted = [...posts].sort((a, b) => (b.curtidas + b.salvamentos) - (a.curtidas + a.salvamentos));
  const totalEngagement = posts.reduce((s, p) => s + p.curtidas + p.comentarios + p.salvamentos + p.compartilhamentos, 0);
  return {
    totalPosts: posts.length,
    mediaAlcance: Math.round(avg(posts.map((p) => p.alcance))),
    mediaCurtidas: Math.round(avg(posts.map((p) => p.curtidas))),
    mediaSalvamentos: Math.round(avg(posts.map((p) => p.salvamentos))),
    taxaEngajamento: seguidores > 0 ? (totalEngagement / posts.length / seguidores) * 100 : 0,
    melhorPost: sorted[0],
    piorPost: sorted[sorted.length - 1],
    crescimentoSeguidores: posts.reduce((s, p) => s + p.novosSeguidos, 0),
  };
}

const emptyPost: PostMetrics = {
  id: '',
  data: new Date().toISOString().split('T')[0],
  tipo: 'carrossel',
  tema: '',
  alcance: 0,
  impressoes: 0,
  curtidas: 0,
  comentarios: 0,
  salvamentos: 0,
  compartilhamentos: 0,
  cliquesLink: 0,
  novosSeguidos: 0,
};

export default function MetricasPage() {
  const { doctor } = useDoctor();
  const { response, isLoading, error, trigger } = useStreamingResponse();
  const [posts, setPosts] = useLocalStorage<PostMetrics[]>('medic_posts', []);
  const [, setTemMetricas] = useLocalStorage<boolean>('medic_metricas', false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<PostMetrics>({ ...emptyPost, id: crypto.randomUUID() });

  function addPost() {
    if (!form.tema.trim()) return;
    setPosts([...posts, form]);
    setForm({ ...emptyPost, id: crypto.randomUUID() });
    setShowForm(false);
  }

  function removePost(id: string) {
    setPosts(posts.filter((p) => p.id !== id));
  }

  async function handleAnalisar() {
    if (!doctor || posts.length === 0) return;
    const summary = calcSummary(posts, doctor.seguidores);
    await trigger('/api/metricas', { doctor, posts, summary });
    setTemMetricas(true);
  }

  if (!doctor) {
    return (
      <div>
        <ModuleHeader title="Metricas e Performance" description="Analise resultados e otimize sua estrategia." icon="📉" />
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          Perfil nao configurado. <a href="/setup" className="underline font-medium">Configurar agora</a>
        </div>
      </div>
    );
  }

  const summary = calcSummary(posts, doctor.seguidores);
  const inputClass = 'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#4ecdc4] focus:outline-none';

  return (
    <div className="space-y-8">
      <ModuleHeader title="Metricas e Performance" description="Analise resultados e otimize sua estrategia." icon="📉" />

      {/* Resumo */}
      {posts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Posts', value: summary.totalPosts },
            { label: 'Engajamento', value: `${summary.taxaEngajamento.toFixed(2)}%` },
            { label: 'Media Likes', value: summary.mediaCurtidas },
            { label: 'Media Saves', value: summary.mediaSalvamentos },
          ].map((s) => (
            <Card key={s.label} className="!p-4 text-center">
              <p className="text-2xl font-bold text-[#4ecdc4]">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </Card>
          ))}
        </div>
      )}

      {/* Lista de posts */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-800">Posts Registrados ({posts.length})</h2>
          <Button variant="secondary" size="sm" onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancelar' : '+ Adicionar Post'}</Button>
        </div>

        {showForm && (
          <Card className="mb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Tema</label>
                <input className={inputClass} value={form.tema} onChange={(e) => setForm({ ...form, tema: e.target.value })} placeholder="5 dicas para pele saudavel" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Data</label>
                <input className={inputClass} type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Tipo</label>
                <select className={inputClass} value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value as PostMetrics['tipo'] })}>
                  <option value="carrossel">Carrossel</option>
                  <option value="reels">Reels</option>
                  <option value="stories">Stories</option>
                  <option value="post_unico">Post unico</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Alcance</label>
                <input className={inputClass} type="number" value={form.alcance} onChange={(e) => setForm({ ...form, alcance: Number(e.target.value) })} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Curtidas</label>
                <input className={inputClass} type="number" value={form.curtidas} onChange={(e) => setForm({ ...form, curtidas: Number(e.target.value) })} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Salvamentos</label>
                <input className={inputClass} type="number" value={form.salvamentos} onChange={(e) => setForm({ ...form, salvamentos: Number(e.target.value) })} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Compartilhamentos</label>
                <input className={inputClass} type="number" value={form.compartilhamentos} onChange={(e) => setForm({ ...form, compartilhamentos: Number(e.target.value) })} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Comentarios</label>
                <input className={inputClass} type="number" value={form.comentarios} onChange={(e) => setForm({ ...form, comentarios: Number(e.target.value) })} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Novos seguidores</label>
                <input className={inputClass} type="number" value={form.novosSeguidos} onChange={(e) => setForm({ ...form, novosSeguidos: Number(e.target.value) })} />
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <Button size="sm" onClick={addPost}>Salvar Post</Button>
            </div>
          </Card>
        )}

        {posts.length > 0 && (
          <div className="space-y-2">
            {posts.map((p) => (
              <Card key={p.id} className="!p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{p.tema}</p>
                  <p className="text-xs text-gray-400">{p.data} — {p.tipo} — ❤️{p.curtidas} 🔖{p.salvamentos} 💬{p.comentarios}</p>
                </div>
                <button onClick={() => removePost(p.id)} className="text-xs text-red-400 hover:text-red-600">remover</button>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Analise */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-800">Analise de Performance</h2>
          <Button onClick={handleAnalisar} loading={isLoading} disabled={posts.length === 0}>
            {isLoading ? 'Analisando...' : 'Analisar Metricas'}
          </Button>
        </div>
        {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>}
        {(response || isLoading) && (
          <Card className="border-[#4ecdc4]/20 bg-gradient-to-br from-[#4ecdc4]/5 to-white">
            <div className="rounded-lg border border-[#4ecdc4]/10 bg-white p-4 text-sm leading-relaxed text-gray-700">
              <StreamingText text={response} isLoading={isLoading} />
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}
