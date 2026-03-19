'use client';

import { Showing } from '@/types/showing';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface ShowingListProps {
  showings: Showing[];
  onUpdateStatus: (id: string, status: Showing['status']) => void;
}

const statusVariant: Record<Showing['status'], 'success' | 'warning' | 'error' | 'info'> = {
  confirmado: 'success',
  pendente: 'warning',
  cancelado: 'error',
  realizado: 'info',
};

const statusLabel: Record<Showing['status'], string> = {
  confirmado: 'Confirmado',
  pendente: 'Pendente',
  cancelado: 'Cancelado',
  realizado: 'Realizado',
};

function formatDate(data: string, horario: string): string {
  if (!data) return '';
  const [year, month, day] = data.split('-');
  return `${day}/${month}/${year} às ${horario}`;
}

export default function ShowingList({ showings, onUpdateStatus }: ShowingListProps) {
  const sorted = [...showings].sort((a, b) => {
    const dateA = new Date(`${a.data}T${a.horario}`).getTime();
    const dateB = new Date(`${b.data}T${b.horario}`).getTime();
    return dateA - dateB;
  });

  if (sorted.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-sm text-gray-500">
        Nenhuma visita agendada. Use o formulário acima para agendar a primeira visita.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sorted.map((showing) => (
        <div
          key={showing.id}
          className="flex flex-col gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{showing.nomeComprador}</span>
              <Badge variant={statusVariant[showing.status]}>
                {statusLabel[showing.status]}
              </Badge>
            </div>
            <span className="text-sm text-gray-500">
              📅 {formatDate(showing.data, showing.horario)}
            </span>
            {showing.telefone && (
              <span className="text-sm text-gray-500">📞 {showing.telefone}</span>
            )}
            {showing.notas && (
              <span className="text-sm text-gray-400 italic">{showing.notas}</span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            {showing.status !== 'confirmado' && showing.status !== 'realizado' && showing.status !== 'cancelado' && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onUpdateStatus(showing.id, 'confirmado')}
              >
                Confirmar
              </Button>
            )}
            {showing.status !== 'realizado' && showing.status !== 'cancelado' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onUpdateStatus(showing.id, 'realizado')}
              >
                Realizado
              </Button>
            )}
            {showing.status !== 'cancelado' && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:bg-red-50"
                onClick={() => onUpdateStatus(showing.id, 'cancelado')}
              >
                Cancelar
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
