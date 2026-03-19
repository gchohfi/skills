'use client';

import Card from '../ui/Card';
import { SupervisorStatusData } from '@/lib/prompts/supervisor';

type StatusKey = 'concluido' | 'em_andamento' | 'pendente' | 'atencao';

interface StatusItem {
  modulo: string;
  icone: string;
  status: StatusKey;
  detalhe: string;
}

const statusConfig: Record<StatusKey, {
  label: string;
  borderColor: string;
  badge: string;
  icon: string;
}> = {
  concluido: {
    label: 'Concluído',
    borderColor: 'border-l-green-500',
    badge: 'bg-green-100 text-green-700',
    icon: '✅',
  },
  em_andamento: {
    label: 'Em Andamento',
    borderColor: 'border-l-yellow-500',
    badge: 'bg-yellow-100 text-yellow-700',
    icon: '🔄',
  },
  pendente: {
    label: 'Pendente',
    borderColor: 'border-l-gray-300',
    badge: 'bg-gray-100 text-gray-600',
    icon: '⏳',
  },
  atencao: {
    label: 'Atenção',
    borderColor: 'border-l-red-500',
    badge: 'bg-red-100 text-red-700',
    icon: '⚠️',
  },
};

interface StatusDashboardProps {
  statusData: SupervisorStatusData;
}

export default function StatusDashboard({ statusData }: StatusDashboardProps) {
  const {
    property,
    temAnuncio,
    temEstrategia,
    quantidadeVisitas,
    visitasConfirmadas,
    documentosPreenchidos,
    totalDocumentos,
    quantidadePropostas,
    propostaAceita,
  } = statusData;

  const items: StatusItem[] = [
    {
      modulo: 'Avaliador — Precificação',
      icone: '💰',
      status: property ? 'concluido' : 'atencao',
      detalhe: property
        ? `${property.tipo} em ${property.cidade} — ${property.estado}`
        : 'Configure seu imóvel para começar',
    },
    {
      modulo: 'Copywriter — Anúncio',
      icone: '📝',
      status: temAnuncio ? 'concluido' : 'pendente',
      detalhe: temAnuncio ? 'Anúncio gerado com sucesso' : 'Anúncio ainda não gerado',
    },
    {
      modulo: 'Marqueteiro — Marketing',
      icone: '📣',
      status: temEstrategia ? 'concluido' : 'pendente',
      detalhe: temEstrategia ? 'Estratégia de marketing definida' : 'Estratégia não planejada',
    },
    {
      modulo: 'Secretário — Visitas',
      icone: '📅',
      status:
        quantidadeVisitas === 0
          ? 'pendente'
          : visitasConfirmadas < quantidadeVisitas
            ? 'em_andamento'
            : 'concluido',
      detalhe:
        quantidadeVisitas === 0
          ? 'Nenhuma visita agendada'
          : `${quantidadeVisitas} visita(s) agendada(s), ${visitasConfirmadas} confirmada(s)`,
    },
    {
      modulo: 'Assessor Jurídico — Documentos',
      icone: '📄',
      status:
        documentosPreenchidos === 0
          ? 'pendente'
          : documentosPreenchidos < totalDocumentos
            ? 'em_andamento'
            : 'concluido',
      detalhe:
        documentosPreenchidos === 0
          ? 'Nenhum documento gerado'
          : `${documentosPreenchidos} de ${totalDocumentos} documento(s) (${
              totalDocumentos > 0
                ? Math.round((documentosPreenchidos / totalDocumentos) * 100)
                : 0
            }%)`,
    },
    {
      modulo: 'Negociador — Negociação',
      icone: '🤝',
      status: propostaAceita
        ? 'concluido'
        : quantidadePropostas > 0
          ? 'em_andamento'
          : 'pendente',
      detalhe: propostaAceita
        ? 'Proposta aceita — venda em fechamento!'
        : quantidadePropostas > 0
          ? `${quantidadePropostas} proposta(s) recebida(s)`
          : 'Nenhuma proposta recebida ainda',
    },
  ];

  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Status dos Módulos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const cfg = statusConfig[item.status];
          return (
            <Card key={item.modulo} className={`border-l-4 ${cfg.borderColor} !p-4`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{item.icone}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                      {item.modulo}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${cfg.badge}`}
                    >
                      {cfg.icon} {cfg.label}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">{item.detalhe}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
