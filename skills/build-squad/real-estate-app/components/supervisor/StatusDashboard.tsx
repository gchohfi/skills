'use client';

import Card from '../ui/Card';

export interface StatusItem {
  modulo: string;
  icone: string;
  status: 'concluido' | 'em_andamento' | 'pendente' | 'atencao';
  detalhe: string;
}

interface StatusDashboardProps {
  items: StatusItem[];
}

const statusConfig = {
  concluido: { label: 'Concluído', color: 'border-l-green-500', badge: 'bg-green-100 text-green-700', icon: '✅' },
  em_andamento: { label: 'Em Andamento', color: 'border-l-yellow-500', badge: 'bg-yellow-100 text-yellow-700', icon: '🔄' },
  pendente: { label: 'Pendente', color: 'border-l-gray-300', badge: 'bg-gray-100 text-gray-600', icon: '⏳' },
  atencao: { label: 'Atenção', color: 'border-l-red-500', badge: 'bg-red-100 text-red-700', icon: '⚠️' },
};

export default function StatusDashboard({ items }: StatusDashboardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => {
        const cfg = statusConfig[item.status];
        return (
          <Card key={item.modulo} className={`border-l-4 ${cfg.color} !p-4`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{item.icone}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">{item.modulo}</h3>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${cfg.badge}`}>
                    {cfg.icon} {cfg.label}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">{item.detalhe}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
