'use client';

import Card from '../ui/Card';
import { SupervisorStatusData } from '@/lib/prompts/supervisor';

type StatusKey = 'concluido' | 'pendente';

interface StatusItem {
  modulo: string;
  icone: string;
  status: StatusKey;
  detalhe: string;
}

const statusConfig: Record<StatusKey, { label: string; borderColor: string; badge: string; icon: string }> = {
  concluido: { label: 'Concluido', borderColor: 'border-l-green-500', badge: 'bg-green-100 text-green-700', icon: '✅' },
  pendente: { label: 'Pendente', borderColor: 'border-l-gray-300', badge: 'bg-gray-100 text-gray-600', icon: '⏳' },
};

export default function StatusDashboard({ statusData }: { statusData: SupervisorStatusData }) {
  const { doctor, temAnalisePerfil, temConcorrencia, temTendencias, temEstrategia, temCarrossel, quantidadePosts, temMetricas } = statusData;

  const items: StatusItem[] = [
    { modulo: 'Perfil Medico', icone: '⚙️', status: doctor ? 'concluido' : 'pendente', detalhe: doctor ? `${doctor.especialidade} — ${doctor.cidade}/${doctor.estado}` : 'Configure seu perfil' },
    { modulo: 'Analise de Perfil', icone: '🔍', status: temAnalisePerfil ? 'concluido' : 'pendente', detalhe: temAnalisePerfil ? 'Posicionamento analisado' : 'Analise pendente' },
    { modulo: 'Concorrencia', icone: '📊', status: temConcorrencia ? 'concluido' : 'pendente', detalhe: temConcorrencia ? 'Benchmarks identificados' : 'Analise pendente' },
    { modulo: 'Tendencias', icone: '📈', status: temTendencias ? 'concluido' : 'pendente', detalhe: temTendencias ? 'Temas em alta mapeados' : 'Pesquisa pendente' },
    { modulo: 'Estrategia', icone: '📋', status: temEstrategia ? 'concluido' : 'pendente', detalhe: temEstrategia ? 'Plano editorial criado' : 'Plano pendente' },
    { modulo: 'Carrossel', icone: '🎨', status: temCarrossel ? 'concluido' : 'pendente', detalhe: temCarrossel ? 'Carrossel gerado' : 'Nenhum carrossel criado' },
    { modulo: 'Metricas', icone: '📉', status: temMetricas ? 'concluido' : 'pendente', detalhe: temMetricas ? `${quantidadePosts} post(s) analisados` : 'Nenhum dado registrado' },
  ];

  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Status dos Modulos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const cfg = statusConfig[item.status];
          return (
            <Card key={item.modulo} className={`border-l-4 ${cfg.borderColor} !p-4`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{item.icone}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-gray-900">{item.modulo}</h3>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${cfg.badge}`}>
                      {cfg.icon} {cfg.label}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">{item.detalhe}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
