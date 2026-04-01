'use client';
import { SupervisorStatusData } from '@/lib/prompts/supervisor';
import Card from '@/components/ui/Card';

const modules: { key: keyof SupervisorStatusData; label: string; href: string; icon: string }[] = [
  { key: 'temPerfil', label: 'Perfil Configurado', href: '/setup', icon: '⚙️' },
  { key: 'temDiagnostico', label: 'Diagnostico do Perfil', href: '/profile-diagnosis', icon: '🔍' },
  { key: 'temConcorrencia', label: 'Analise de Concorrencia', href: '/competitor-analysis', icon: '📊' },
  { key: 'temReferencias', label: 'Referencias & Publico', href: '/reference-audience', icon: '🎯' },
  { key: 'temPosicionamento', label: 'Posicionamento', href: '/positioning', icon: '💎' },
  { key: 'temPlanoEditorial', label: 'Plano Editorial', href: '/content-architect', icon: '📐' },
  { key: 'temCarrossel', label: 'Gerador de Conteudo', href: '/content-architect', icon: '🎨' },
  { key: 'temCompliance', label: 'Compliance CFM', href: '/compliance', icon: '🛡️' },
  { key: 'temMetricas', label: 'Metricas & Aprendizado', href: '/metrics-learning', icon: '📈' },
  { key: 'temBrandMemory', label: 'Memoria da Marca', href: '/brand-memory', icon: '🧠' },
];

export default function StatusDashboard({ status }: { status: SupervisorStatusData }) {
  const completed = Object.values(status).filter(Boolean).length;
  const total = Object.keys(status).length;
  const pct = Math.round((completed / total) * 100);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">Status dos Modulos</h3>
        <span className="text-sm font-bold text-[#e2c799]">{completed}/{total} ({pct}%)</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div className="bg-[#e2c799] h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {modules.map(m => (
          <a key={m.key} href={m.href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 transition-colors">
            <span>{m.icon}</span>
            <span className="flex-1 text-gray-700">{m.label}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status[m.key] ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              {status[m.key] ? 'Completo' : 'Pendente'}
            </span>
          </a>
        ))}
      </div>
    </Card>
  );
}
