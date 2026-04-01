'use client';
import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { BrandMemoryEntry } from '@/types/metrics';
import ModuleHeader from '@/components/layout/ModuleHeader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const tipos: { value: BrandMemoryEntry['tipo']; label: string; color: string }[] = [
  { value: 'golden_case', label: 'Golden Case', color: 'bg-amber-100 text-amber-800' },
  { value: 'frase_aprovada', label: 'Frase Aprovada', color: 'bg-green-100 text-green-800' },
  { value: 'tema_forte', label: 'Tema Forte', color: 'bg-blue-100 text-blue-800' },
  { value: 'tema_fraco', label: 'Tema Fraco', color: 'bg-red-100 text-red-800' },
  { value: 'risco', label: 'Risco CFM', color: 'bg-rose-100 text-rose-800' },
  { value: 'referencia', label: 'Referencia', color: 'bg-purple-100 text-purple-800' },
  { value: 'aprendizado', label: 'Aprendizado', color: 'bg-indigo-100 text-indigo-800' },
];

const emptyEntry = { tipo: 'golden_case' as BrandMemoryEntry['tipo'], conteudo: '', fonte: '', data: new Date().toISOString().slice(0, 10) };

export default function BrandMemoryPage() {
  const [entries, setEntries] = useLocalStorage<BrandMemoryEntry[]>('mpp_brand_memory', []);
  const [form, setForm] = useState(emptyEntry);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  function add() {
    if (!form.conteudo.trim()) return;
    const entry: BrandMemoryEntry = { ...form, id: Date.now().toString() };
    setEntries([...entries, entry]);
    setForm(emptyEntry);
    setShowForm(false);
  }

  function remove(id: string) { setEntries(entries.filter(e => e.id !== id)); }

  const filtered = filter === 'all' ? entries : entries.filter(e => e.tipo === filter);
  const ic = 'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#e2c799] focus:outline-none';
  const lc = 'block text-xs font-medium text-gray-600 mb-1';

  return (
    <div className="space-y-6">
      <ModuleHeader title="Memoria da Marca" description="Acumule golden cases, frases aprovadas, temas fortes/fracos e aprendizados." icon="🧠" />

      <div className="flex items-center gap-3 flex-wrap">
        <Button variant="secondary" onClick={() => setShowForm(!showForm)}>+ Nova Entrada</Button>
        <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">Todos ({entries.length})</option>
          {tipos.map(t => {
            const count = entries.filter(e => e.tipo === t.value).length;
            return <option key={t.value} value={t.value}>{t.label} ({count})</option>;
          })}
        </select>
      </div>

      {showForm && (
        <Card>
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Nova Entrada</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label className={lc}>Tipo</label><select className={ic} value={form.tipo} onChange={e => setForm(f => ({ ...f, tipo: e.target.value as BrandMemoryEntry['tipo'] }))}>{tipos.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
            <div><label className={lc}>Data</label><input className={ic} type="date" value={form.data} onChange={e => setForm(f => ({ ...f, data: e.target.value }))} /></div>
            <div className="md:col-span-2"><label className={lc}>Conteudo</label><textarea className={ic + ' h-20'} value={form.conteudo} onChange={e => setForm(f => ({ ...f, conteudo: e.target.value }))} placeholder="Descreva o golden case, frase, tema ou aprendizado..." /></div>
            <div className="md:col-span-2"><label className={lc}>Fonte</label><input className={ic} value={form.fonte} onChange={e => setForm(f => ({ ...f, fonte: e.target.value }))} placeholder="Ex: Post do dia 15/03, Analise de metricas, Feedback paciente" /></div>
          </div>
          <div className="mt-3 flex gap-2">
            <Button size="sm" onClick={add}>Salvar</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>Cancelar</Button>
          </div>
        </Card>
      )}

      {filtered.length === 0 && <Card><p className="text-sm text-gray-500">Nenhuma entrada registrada. Comece adicionando golden cases e aprendizados.</p></Card>}
      {filtered.length > 0 && (
        <div className="space-y-2">
          {filtered.map(entry => {
            const tipo = tipos.find(t => t.value === entry.tipo);
            return (
              <Card key={entry.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tipo?.color || 'bg-gray-100'}`}>{tipo?.label || entry.tipo}</span>
                      <span className="text-xs text-gray-400">{entry.data}</span>
                    </div>
                    <p className="text-sm text-gray-800">{entry.conteudo}</p>
                    {entry.fonte && <p className="text-xs text-gray-400 mt-1">Fonte: {entry.fonte}</p>}
                  </div>
                  <button onClick={() => remove(entry.id)} className="text-xs text-gray-400 hover:text-red-500 shrink-0">remover</button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
