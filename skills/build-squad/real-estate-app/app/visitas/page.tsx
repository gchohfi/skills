'use client';

import { useShowings } from '@/hooks/useShowings';
import ModuleHeader from '@/components/layout/ModuleHeader';
import ShowingForm from '@/components/visitas/ShowingForm';
import ShowingList from '@/components/visitas/ShowingList';
import { Showing } from '@/types/showing';

export default function VisitasPage() {
  const { showings, addShowing, updateShowing } = useShowings();

  function handleUpdateStatus(id: string, status: Showing['status']) {
    updateShowing(id, { status });
  }

  return (
    <div>
      <ModuleHeader
        title="Agenda de Visitas"
        description="Gerencie o agendamento de visitas ao imóvel com compradores interessados."
        icon="📅"
      />

      <div className="space-y-6">
        <ShowingForm onAdd={addShowing} />

        <div>
          <h2 className="mb-3 text-base font-semibold text-gray-800">
            Visitas Agendadas ({showings.length})
          </h2>
          <ShowingList showings={showings} onUpdateStatus={handleUpdateStatus} />
        </div>
      </div>
    </div>
  );
}
