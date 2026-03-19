'use client';

import { useState } from 'react';
import { Offer } from '@/types/offer';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

interface OfferFormProps {
  onAdd: (offer: Omit<Offer, 'id' | 'dataCriacao'>) => void;
}

const emptyForm = {
  valorOferta: '',
  formaPagamento: 'avista' as Offer['formaPagamento'],
  condicoes: '',
  prazoEscritura: '',
  observacoes: '',
};

const formaPagamentoOptions = [
  { value: 'avista', label: 'À vista' },
  { value: 'financiamento', label: 'Financiamento' },
  { value: 'fgts', label: 'FGTS' },
  { value: 'misto', label: 'Misto' },
];

export default function OfferForm({ onAdd }: OfferFormProps) {
  const [form, setForm] = useState(emptyForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valorNum = parseFloat(
      form.valorOferta.replace(/\./g, '').replace(',', '.')
    );
    if (isNaN(valorNum) || valorNum <= 0) return;

    onAdd({
      valorOferta: valorNum,
      formaPagamento: form.formaPagamento,
      condicoes: form.condicoes
        .split('\n')
        .map((c) => c.trim())
        .filter(Boolean),
      prazoEscritura: form.prazoEscritura,
      observacoes: form.observacoes,
      status: 'recebida',
    });
    setForm(emptyForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-gray-100 bg-white p-6 shadow-md"
    >
      <h2 className="mb-4 text-base font-semibold text-gray-800">Registrar Nova Oferta</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Valor da Oferta (R$)"
          name="valorOferta"
          value={form.valorOferta}
          onChange={handleChange}
          placeholder="Ex: 450000"
          required
        />

        <Select
          label="Forma de Pagamento"
          name="formaPagamento"
          value={form.formaPagamento}
          onChange={handleChange}
          options={formaPagamentoOptions}
        />

        <Input
          label="Prazo para Escritura"
          name="prazoEscritura"
          type="date"
          value={form.prazoEscritura}
          onChange={handleChange}
          required
        />

        <div className="sm:col-span-2">
          <Textarea
            label="Condições (uma por linha)"
            name="condicoes"
            value={form.condicoes}
            onChange={handleChange}
            placeholder="Ex: Entrega das chaves em 30 dias&#10;Mobília incluída&#10;Revisão elétrica pelo vendedor"
            rows={3}
          />
        </div>

        <div className="sm:col-span-2">
          <Textarea
            label="Observações"
            name="observacoes"
            value={form.observacoes}
            onChange={handleChange}
            placeholder="Informações adicionais sobre a oferta..."
            rows={3}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="submit">Registrar Oferta</Button>
      </div>
    </form>
  );
}
