'use client';

import { useState } from 'react';
import { useDoctor } from '@/context/DoctorContext';
import { DoctorProfile, Especialidade, Plataforma } from '@/types/doctor';
import ModuleHeader from '@/components/layout/ModuleHeader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const especialidades: { value: Especialidade; label: string }[] = [
  { value: 'dermatologia', label: 'Dermatologia' },
  { value: 'cardiologia', label: 'Cardiologia' },
  { value: 'ortopedia', label: 'Ortopedia' },
  { value: 'pediatria', label: 'Pediatria' },
  { value: 'ginecologia', label: 'Ginecologia' },
  { value: 'neurologia', label: 'Neurologia' },
  { value: 'psiquiatria', label: 'Psiquiatria' },
  { value: 'oftalmologia', label: 'Oftalmologia' },
  { value: 'odontologia', label: 'Odontologia' },
  { value: 'nutrição', label: 'Nutricao' },
  { value: 'cirurgia plastica', label: 'Cirurgia Plastica' },
  { value: 'medicina estetica', label: 'Medicina Estetica' },
  { value: 'endocrinologia', label: 'Endocrinologia' },
  { value: 'urologia', label: 'Urologia' },
  { value: 'outra', label: 'Outra' },
];

const plataformas: { value: Plataforma; label: string }[] = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'linkedin', label: 'LinkedIn' },
];

const tons = [
  { value: 'educativo', label: 'Educativo' },
  { value: 'acessivel', label: 'Acessivel' },
  { value: 'tecnico', label: 'Tecnico' },
  { value: 'humanizado', label: 'Humanizado' },
  { value: 'descontraido', label: 'Descontraido' },
] as const;

export default function SetupPage() {
  const { doctor, setDoctor } = useDoctor();

  const [form, setForm] = useState<DoctorProfile>(
    doctor || {
      nome: '',
      crm: '',
      especialidade: 'dermatologia',
      subespecialidades: [],
      cidade: '',
      estado: '',
      clinica: '',
      publicoAlvo: '',
      diferenciais: [],
      tom: 'educativo',
      plataformas: ['instagram'],
      instagramHandle: '',
      seguidores: 0,
      mediaLikes: 0,
      mediaSaves: 0,
      descricao: '',
      concorrentes: [],
    }
  );

  const [subEspInput, setSubEspInput] = useState('');
  const [difInput, setDifInput] = useState('');
  const [concInput, setConcInput] = useState('');
  const [saved, setSaved] = useState(false);

  function update<K extends keyof DoctorProfile>(key: K, value: DoctorProfile[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function togglePlat(p: Plataforma) {
    const has = form.plataformas.includes(p);
    update('plataformas', has ? form.plataformas.filter((x) => x !== p) : [...form.plataformas, p]);
  }

  function addToList(key: 'subespecialidades' | 'diferenciais' | 'concorrentes', value: string, setter: (v: string) => void) {
    if (!value.trim()) return;
    update(key, [...form[key], value.trim()]);
    setter('');
  }

  function removeFromList(key: 'subespecialidades' | 'diferenciais' | 'concorrentes', idx: number) {
    update(key, form[key].filter((_, i) => i !== idx));
  }

  function handleSave() {
    setDoctor(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const inputClass = 'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#4ecdc4] focus:outline-none';
  const labelClass = 'block text-xs font-medium text-gray-600 mb-1';

  return (
    <div className="space-y-8">
      <ModuleHeader title="Configurar Perfil Medico" description="Cadastre seus dados profissionais para personalizar as analises de marketing." icon="⚙️" />

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Nome completo</label>
            <input className={inputClass} value={form.nome} onChange={(e) => update('nome', e.target.value)} placeholder="Dr(a). Maria Silva" />
          </div>
          <div>
            <label className={labelClass}>CRM</label>
            <input className={inputClass} value={form.crm} onChange={(e) => update('crm', e.target.value)} placeholder="CRM/SP 123456" />
          </div>
          <div>
            <label className={labelClass}>Especialidade</label>
            <select className={inputClass} value={form.especialidade} onChange={(e) => update('especialidade', e.target.value as Especialidade)}>
              {especialidades.map((e) => <option key={e.value} value={e.value}>{e.label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Tom de comunicacao</label>
            <select className={inputClass} value={form.tom} onChange={(e) => update('tom', e.target.value as DoctorProfile['tom'])}>
              {tons.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Cidade</label>
            <input className={inputClass} value={form.cidade} onChange={(e) => update('cidade', e.target.value)} placeholder="Sao Paulo" />
          </div>
          <div>
            <label className={labelClass}>Estado</label>
            <input className={inputClass} value={form.estado} onChange={(e) => update('estado', e.target.value)} placeholder="SP" />
          </div>
          <div>
            <label className={labelClass}>Clinica / Consultorio</label>
            <input className={inputClass} value={form.clinica} onChange={(e) => update('clinica', e.target.value)} placeholder="Clinica Saude Total" />
          </div>
          <div>
            <label className={labelClass}>Publico-alvo</label>
            <input className={inputClass} value={form.publicoAlvo} onChange={(e) => update('publicoAlvo', e.target.value)} placeholder="Mulheres 25-45 anos, classe A/B" />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Redes Sociais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Instagram Handle</label>
            <input className={inputClass} value={form.instagramHandle} onChange={(e) => update('instagramHandle', e.target.value)} placeholder="@dra.maria.derma" />
          </div>
          <div>
            <label className={labelClass}>Seguidores atuais</label>
            <input className={inputClass} type="number" value={form.seguidores} onChange={(e) => update('seguidores', Number(e.target.value))} />
          </div>
          <div>
            <label className={labelClass}>Media de likes por post</label>
            <input className={inputClass} type="number" value={form.mediaLikes} onChange={(e) => update('mediaLikes', Number(e.target.value))} />
          </div>
          <div>
            <label className={labelClass}>Media de salvamentos por post</label>
            <input className={inputClass} type="number" value={form.mediaSaves} onChange={(e) => update('mediaSaves', Number(e.target.value))} />
          </div>
        </div>
        <div className="mt-4">
          <label className={labelClass}>Plataformas ativas</label>
          <div className="flex flex-wrap gap-2">
            {plataformas.map((p) => (
              <button
                key={p.value}
                onClick={() => togglePlat(p.value)}
                className={[
                  'px-3 py-1.5 rounded-lg text-sm border transition-colors',
                  form.plataformas.includes(p.value)
                    ? 'bg-[#4ecdc4] text-[#0a1628] border-[#4ecdc4] font-medium'
                    : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-400',
                ].join(' ')}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Detalhes</h3>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Subespecialidades</label>
            <div className="flex gap-2">
              <input className={inputClass} value={subEspInput} onChange={(e) => setSubEspInput(e.target.value)} placeholder="Ex: Acne, Cosmiatra" onKeyDown={(e) => e.key === 'Enter' && addToList('subespecialidades', subEspInput, setSubEspInput)} />
              <Button variant="secondary" size="sm" onClick={() => addToList('subespecialidades', subEspInput, setSubEspInput)}>+</Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">{form.subespecialidades.map((s, i) => (
              <span key={i} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                {s} <button onClick={() => removeFromList('subespecialidades', i)} className="text-gray-400 hover:text-red-500">x</button>
              </span>
            ))}</div>
          </div>
          <div>
            <label className={labelClass}>Diferenciais</label>
            <div className="flex gap-2">
              <input className={inputClass} value={difInput} onChange={(e) => setDifInput(e.target.value)} placeholder="Ex: 15 anos de experiencia" onKeyDown={(e) => e.key === 'Enter' && addToList('diferenciais', difInput, setDifInput)} />
              <Button variant="secondary" size="sm" onClick={() => addToList('diferenciais', difInput, setDifInput)}>+</Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">{form.diferenciais.map((d, i) => (
              <span key={i} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                {d} <button onClick={() => removeFromList('diferenciais', i)} className="text-gray-400 hover:text-red-500">x</button>
              </span>
            ))}</div>
          </div>
          <div>
            <label className={labelClass}>Concorrentes (handles do Instagram)</label>
            <div className="flex gap-2">
              <input className={inputClass} value={concInput} onChange={(e) => setConcInput(e.target.value)} placeholder="@dra.concorrente" onKeyDown={(e) => e.key === 'Enter' && addToList('concorrentes', concInput, setConcInput)} />
              <Button variant="secondary" size="sm" onClick={() => addToList('concorrentes', concInput, setConcInput)}>+</Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">{form.concorrentes.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                {c} <button onClick={() => removeFromList('concorrentes', i)} className="text-gray-400 hover:text-red-500">x</button>
              </span>
            ))}</div>
          </div>
          <div>
            <label className={labelClass}>Descricao (sobre voce)</label>
            <textarea className={inputClass + ' h-24'} value={form.descricao} onChange={(e) => update('descricao', e.target.value)} placeholder="Fale um pouco sobre sua pratica, abordagem e o que te motiva..." />
          </div>
        </div>
      </Card>

      <div className="flex items-center gap-4">
        <Button onClick={handleSave} size="lg">Salvar Perfil</Button>
        {saved && <span className="text-sm text-green-600 font-medium">Perfil salvo com sucesso!</span>}
      </div>
    </div>
  );
}
