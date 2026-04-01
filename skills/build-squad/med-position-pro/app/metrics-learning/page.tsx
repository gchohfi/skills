'use client';
import { useState } from 'react';
import { useDoctor } from '@/context/DoctorContext';
import { useStreamingResponse } from '@/hooks/useStreamingResponse';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { PostMetrics } from '@/types/metrics';
import ModuleHeader from '@/components/layout/ModuleHeader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import StreamingText from '@/components/ui/StreamingText';

const emptyPost: Omit<PostMetrics, 'id'> = { data: '', tipo: 'carrossel', tema: '', pilar: '', alcance: 0, impressoes: 0, curtidas: 0, comentarios: 0, salvamentos: 0, compartilhamentos: 0, novosSeguidos: 0, dmsGeradas: 0 };

export default function MetricsLearningPage() {
  const { doctor } = useDoctor();
  const { response, isLoading, error, trigger } = useStreamingResponse();
  const [posts, setPosts] = useLocalStorage<PostMetrics[]>('mpp_posts', []);
  const [form, setForm] = useState(emptyPost);
  const [showForm, setShowForm] = useState(false);

  function addPost() {
    if (!form.data || !form.tema) return;
    const post: PostMetrics = { ...form, id: Date.now().toString() };
    setPosts([...posts, post]);
    setForm(emptyPost);
    setShowForm(false);
  }

  function removePost(id: string) { setPosts(posts.filter(p => p.id !== id)); }

  function analyze() {
    if (!doctor) return;
    trigger('/api/metrics-learning', { doctor, posts });
  }

  const ic = 'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#e2c799] focus:outline-none';
  const lc = 'block text-xs font-medium text-gray-600 mb-1';

  return (
    <div className="space-y-6">
      <ModuleHeader title="Metricas & Aprendizado" description="Registre posts, analise performance e descubra padroes de sucesso." icon="📈" />
      {!doctor && <Card><p className="text-sm text-amber-600">Configure o perfil da medica primeiro.</p></Card>}
      {doctor && (
        <>
          <div className="flex items-center gap-3">
            <Button onClick={analyze} loading={isLoading} disabled={posts.length === 0}>Analisar Performance</Button>
            <Button variant="secondary" onClick={() => setShowForm(!showForm)}>+ Registrar Post</Button>
            <span className="text-sm text-gray-500">{posts.length} post(s) registrado(s)</span>
          </div>

          {showForm && (
            <Card>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Novo Post</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div><label className={lc}>Data</label><input className={ic} type="date" value={form.data} onChange={e => setForm(f => ({ ...f, data: e.target.value }))} /></div>
                <div><label className={lc}>Tipo</label><select className={ic} value={form.tipo} onChange={e => setForm(f => ({ ...f, tipo: e.target.value as PostMetrics['tipo'] }))}><option value="carrossel">Carrossel</option><option value="reels">Reels</option><option value="stories">Stories</option><option value="post_unico">Post unico</option></select></div>
                <div><label className={lc}>Pilar</label><input className={ic} value={form.pilar} onChange={e => setForm(f => ({ ...f, pilar: e.target.value }))} placeholder="Ex: Educativo" /></div>
                <div className="md:col-span-3"><label className={lc}>Tema</label><input className={ic} value={form.tema} onChange={e => setForm(f => ({ ...f, tema: e.target.value }))} placeholder="Ex: 5 sinais de desidratacao" /></div>
                <div><label className={lc}>Alcance</label><input className={ic} type="number" value={form.alcance} onChange={e => setForm(f => ({ ...f, alcance: Number(e.target.value) }))} /></div>
                <div><label className={lc}>Impressoes</label><input className={ic} type="number" value={form.impressoes} onChange={e => setForm(f => ({ ...f, impressoes: Number(e.target.value) }))} /></div>
                <div><label className={lc}>Curtidas</label><input className={ic} type="number" value={form.curtidas} onChange={e => setForm(f => ({ ...f, curtidas: Number(e.target.value) }))} /></div>
                <div><label className={lc}>Comentarios</label><input className={ic} type="number" value={form.comentarios} onChange={e => setForm(f => ({ ...f, comentarios: Number(e.target.value) }))} /></div>
                <div><label className={lc}>Salvamentos</label><input className={ic} type="number" value={form.salvamentos} onChange={e => setForm(f => ({ ...f, salvamentos: Number(e.target.value) }))} /></div>
                <div><label className={lc}>Compartilhamentos</label><input className={ic} type="number" value={form.compartilhamentos} onChange={e => setForm(f => ({ ...f, compartilhamentos: Number(e.target.value) }))} /></div>
                <div><label className={lc}>Novos seguidos</label><input className={ic} type="number" value={form.novosSeguidos} onChange={e => setForm(f => ({ ...f, novosSeguidos: Number(e.target.value) }))} /></div>
                <div><label className={lc}>DMs geradas</label><input className={ic} type="number" value={form.dmsGeradas} onChange={e => setForm(f => ({ ...f, dmsGeradas: Number(e.target.value) }))} /></div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" onClick={addPost}>Salvar Post</Button>
                <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>Cancelar</Button>
              </div>
            </Card>
          )}

          {posts.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Posts Registrados</h3>
              <div className="space-y-2">
                {posts.map(p => (
                  <div key={p.id} className="flex items-center justify-between text-sm border-b border-gray-100 pb-2">
                    <div>
                      <span className="font-medium">{p.data}</span> — <span className="text-gray-500">{p.tipo}</span> — {p.tema}
                      <span className="ml-2 text-xs text-gray-400">❤️{p.curtidas} 💾{p.salvamentos} 💬{p.comentarios}</span>
                    </div>
                    <button onClick={() => removePost(p.id)} className="text-xs text-gray-400 hover:text-red-500">remover</button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {error && <Card><p className="text-sm text-red-600">{error}</p></Card>}
          {response && <Card><div className="prose prose-sm max-w-none"><StreamingText text={response} isLoading={isLoading} /></div></Card>}
        </>
      )}
    </div>
  );
}
