'use client';

import { useState } from 'react';
import { Showing } from '@/types/showing';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

interface ShowingFormProps {
  onAdd: (showing: Omit<Showing, 'id'>) => void;
}

const emptyForm = {
  nomeComprador: '',
  telefone: '',
  email: '',
  data: '',
  horario: '',
  notas: '',
};

export default function ShowingForm({ onAdd }: ShowingFormProps) {
  const [form, setForm] = useState(emptyForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ ...form, status: 'pendente' });
    setForm(emptyForm);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-100 shadow-md p-6">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Agendar Nova Visita</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Nome do Comprador"
          name="nomeComprador"
          value={form.nomeComprador}
          onChange={handleChange}
          placeholder="João da Silva"
          required
        />
        <Input
          label="Telefone"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          placeholder="(11) 99999-0000"
          required
        />
        <Input
          label="E-mail"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="joao@email.com"
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Data"
            name="data"
            type="date"
            value={form.data}
            onChange={handleChange}
            required
          />
          <Input
            label="Horário"
            name="horario"
            type="time"
            value={form.horario}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <Textarea
            label="Notas"
            name="notas"
            value={form.notas}
            onChange={handleChange}
            placeholder="Observações sobre a visita..."
            rows={3}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button type="submit">Agendar Visita</Button>
      </div>
    </form>
  );
}
