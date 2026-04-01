'use client';
import { SupervisorStatusData } from '@/lib/prompts/supervisor';
import Card from '@/components/ui/Card';

const modules: { key: string; label: string; href: string; icon: string; getStatus: (s: SupervisorStatusData) => boolean }[] = [
  { key: 'doctor', label: 'Perfil Configurado', href: '/setup', icon: '⚙️', getStatus: s => !!s.doctor },
  { key: 'diag', label: 'Diagnostico do Perfil', href: '/profile-diagnosis', icon: '🔍', getStatus: s => s.temDiagnostico },
  { key: 'comp', label: 'Analise de Concorrencia', href: '/competitor-analysis', icon: '📊', getStatus: s => s.temConcorrencia },
  { key: 'ref', label: 'Referencias & Publico', href: '/reference-audience', icon: '🎯', getStatus: s => s.temReferencias },
  { key: 'pos', label: 'Posicionamento', href: '/positioning', icon: '💎', getStatus: s => s.temPosicionamento },
  { key: 'plan', label: 'Plano Editorial', href: '/content-architect', icon: '📐', getStatus: s => s.temPlanoEditorial },
  { key: 'car', label: 'Gerador de Conteudo', href: '/content-architect', icon: '🎨', getStatus: s => s.temCarrossel },
  { key: 'compl', label: 'Compliance CFM', href: '/compliance', icon: '🛡️', getStatus: s => s.temCompliance },
  { key: 'met', label: 'Metricas & Aprendizado', href: '/metrics-learning', icon: '📈', getStatus: s => s.temMetricas },
  { key: 'mem', label: 'Memoria da Marca', href: '/brand-memory', icon: '🧠', getStatus: s => s.quantidadeMemoria > 0 },
];

export default function StatusDashboard({ status }: { status: SupervisorStatusData }) {
  const completed = modules.filter(m => m.getStatus(status)).length;
  const total = modules.length;
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
        {modules.map(m => {
          const done = m.getStatus(status);
          return (
            <a key={m.key} href={m.href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 transition-colors">
              <span>{m.icon}</span>
              <span className="flex-1 text-gray-700">{m.label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${done ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {done ? 'Completo' : 'Pendente'}
              </span>
            </a>
          );
        })}
      </div>
    </Card>
  );
}
