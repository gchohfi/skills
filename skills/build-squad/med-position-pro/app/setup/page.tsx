'use client';
import { useState } from 'react';
import { useDoctor } from '@/context/DoctorContext';
import { DoctorProfile, Especialidade, Tom } from '@/types/doctor';
import ModuleHeader from '@/components/layout/ModuleHeader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const especialidades: { value: Especialidade; label: string }[] = [
  { value: 'dermatologia', label: 'Dermatologia' }, { value: 'cirurgia plastica', label: 'Cirurgia Plastica' },
  { value: 'medicina estetica', label: 'Medicina Estetica' }, { value: 'ginecologia', label: 'Ginecologia' },
  { value: 'pediatria', label: 'Pediatria' }, { value: 'cardiologia', label: 'Cardiologia' },
  { value: 'ortopedia', label: 'Ortopedia' }, { value: 'neurologia', label: 'Neurologia' },
  { value: 'psiquiatria', label: 'Psiquiatria' }, { value: 'oftalmologia', label: 'Oftalmologia' },
  { value: 'odontologia', label: 'Odontologia' }, { value: 'nutrição', label: 'Nutricao' },
  { value: 'endocrinologia', label: 'Endocrinologia' }, { value: 'urologia', label: 'Urologia' },
  { value: 'outra', label: 'Outra' },
];
const tons: { value: Tom; label: string }[] = [
  { value: 'educativo', label: 'Educativo' }, { value: 'acessivel', label: 'Acessivel' },
  { value: 'tecnico', label: 'Tecnico' }, { value: 'humanizado', label: 'Humanizado' },
  { value: 'sofisticado', label: 'Sofisticado' }, { value: 'descontraido', label: 'Descontraido' },
];

const empty: DoctorProfile = { nome: '', crm: '', especialidade: 'dermatologia', subespecialidades: [], cidade: '', estado: '', clinica: '', publicoAlvo: '', diferenciais: [], tom: 'sofisticado', instagramHandle: '', seguidores: 0, mediaLikes: 0, mediaSaves: 0, mediaComments: 0, bio: '', destaques: [], metodoPropio: '', referencias: [], concorrentes: [], objetivoPrincipal: '' };

export default function SetupPage() {
  const { doctor, setDoctor } = useDoctor();
  const [form, setForm] = useState<DoctorProfile>(doctor || empty);
  const [saved, setSaved] = useState(false);
  const [listInputs, setListInputs] = useState({ sub: '', dif: '', dest: '', ref: '', conc: '' });

  function u<K extends keyof DoctorProfile>(k: K, v: DoctorProfile[K]) { setForm(f => ({ ...f, [k]: v })); }
  function addList(k: 'subespecialidades' | 'diferenciais' | 'destaques' | 'referencias' | 'concorrentes', inputKey: keyof typeof listInputs) {
    const val = listInputs[inputKey].trim();
    if (!val) return;
    u(k, [...form[k], val]);
    setListInputs(p => ({ ...p, [inputKey]: '' }));
  }
  function rmList(k: 'subespecialidades' | 'diferenciais' | 'destaques' | 'referencias' | 'concorrentes', i: number) {
    u(k, form[k].filter((_, idx) => idx !== i));
  }
  function save() { setDoctor(form); setSaved(true); setTimeout(() => setSaved(false), 3000); }

  const ic = 'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#e2c799] focus:outline-none';
  const lc = 'block text-xs font-medium text-gray-600 mb-1';

  function ListField({ label, k, inputKey, placeholder }: { label: string; k: 'subespecialidades' | 'diferenciais' | 'destaques' | 'referencias' | 'concorrentes'; inputKey: keyof typeof listInputs; placeholder: string }) {
    return (
      <div>
        <label className={lc}>{label}</label>
        <div className="flex gap-2">
          <input className={ic} value={listInputs[inputKey]} onChange={e => setListInputs(p => ({ ...p, [inputKey]: e.target.value }))} placeholder={placeholder} onKeyDown={e => e.key === 'Enter' && addList(k, inputKey)} />
          <Button variant="secondary" size="sm" onClick={() => addList(k, inputKey)}>+</Button>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">{form[k].map((s, i) => (
          <span key={i} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{s} <button onClick={() => rmList(k, i)} className="text-gray-400 hover:text-red-500">x</button></span>
        ))}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ModuleHeader title="Configurar Perfil" description="Cadastre os dados da profissional para personalizar todas as analises." icon="⚙️" />
      <Card>
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Dados Profissionais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={lc}>Nome</label><input className={ic} value={form.nome} onChange={e => u('nome', e.target.value)} placeholder="Dra. Maria Silva" /></div>
          <div><label className={lc}>CRM</label><input className={ic} value={form.crm} onChange={e => u('crm', e.target.value)} placeholder="CRM/SP 123456" /></div>
          <div><label className={lc}>Especialidade</label><select className={ic} value={form.especialidade} onChange={e => u('especialidade', e.target.value as Especialidade)}>{especialidades.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}</select></div>
          <div><label className={lc}>Tom de comunicacao</label><select className={ic} value={form.tom} onChange={e => u('tom', e.target.value as Tom)}>{tons.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
          <div><label className={lc}>Cidade</label><input className={ic} value={form.cidade} onChange={e => u('cidade', e.target.value)} /></div>
          <div><label className={lc}>Estado</label><input className={ic} value={form.estado} onChange={e => u('estado', e.target.value)} /></div>
          <div><label className={lc}>Clinica</label><input className={ic} value={form.clinica} onChange={e => u('clinica', e.target.value)} /></div>
          <div><label className={lc}>Publico-alvo</label><input className={ic} value={form.publicoAlvo} onChange={e => u('publicoAlvo', e.target.value)} placeholder="Mulheres 30-50, classe A/B" /></div>
        </div>
      </Card>
      <Card>
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Instagram</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={lc}>Handle</label><input className={ic} value={form.instagramHandle} onChange={e => u('instagramHandle', e.target.value)} placeholder="@dra.maria.derma" /></div>
          <div><label className={lc}>Seguidores</label><input className={ic} type="number" value={form.seguidores} onChange={e => u('seguidores', Number(e.target.value))} /></div>
          <div><label className={lc}>Media likes</label><input className={ic} type="number" value={form.mediaLikes} onChange={e => u('mediaLikes', Number(e.target.value))} /></div>
          <div><label className={lc}>Media salvamentos</label><input className={ic} type="number" value={form.mediaSaves} onChange={e => u('mediaSaves', Number(e.target.value))} /></div>
          <div className="md:col-span-2"><label className={lc}>Bio atual</label><textarea className={ic + ' h-20'} value={form.bio} onChange={e => u('bio', e.target.value)} placeholder="Bio atual do Instagram..." /></div>
        </div>
      </Card>
      <Card>
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Posicionamento & Metodo</h3>
        <div className="space-y-4">
          <div><label className={lc}>Objetivo principal</label><input className={ic} value={form.objetivoPrincipal} onChange={e => u('objetivoPrincipal', e.target.value)} placeholder="Ex: Ser referencia em harmonizacao facial na minha cidade" /></div>
          <div><label className={lc}>Metodo proprio (se houver)</label><textarea className={ic + ' h-20'} value={form.metodoPropio} onChange={e => u('metodoPropio', e.target.value)} placeholder="Descreva seu metodo, abordagem ou protocolo diferenciado..." /></div>
          <ListField label="Subespecialidades" k="subespecialidades" inputKey="sub" placeholder="Ex: Acne, Cosmiatra" />
          <ListField label="Diferenciais" k="diferenciais" inputKey="dif" placeholder="Ex: 15 anos de experiencia" />
          <ListField label="Destaques do Instagram" k="destaques" inputKey="dest" placeholder="Ex: Tratamentos, Resultados, Dicas" />
          <ListField label="Referencias (handles)" k="referencias" inputKey="ref" placeholder="@perfil.referencia" />
          <ListField label="Concorrentes (handles)" k="concorrentes" inputKey="conc" placeholder="@concorrente" />
        </div>
      </Card>
      <div className="flex items-center gap-4">
        <Button onClick={save} size="lg">Salvar Perfil</Button>
        {saved && <span className="text-sm text-green-600 font-medium">Salvo!</span>}
      </div>
    </div>
  );
}
