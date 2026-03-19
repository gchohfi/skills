'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

export interface Comparativo {
  endereco: string;
  precoVenda: string;
  areaUtil: string;
  dataVenda: string;
  fonte: string;
}

interface CompsFormProps {
  onSubmit: (comparativos: Comparativo[]) => void;
  isLoading: boolean;
}

const fonteOptions = [
  { value: 'FipeZap', label: 'FipeZap' },
  { value: 'OLX', label: 'OLX' },
  { value: 'ZAP', label: 'ZAP Imóveis' },
  { value: 'outro', label: 'Outro' },
];

const emptyComp = (): Comparativo => ({
  endereco: '',
  precoVenda: '',
  areaUtil: '',
  dataVenda: '',
  fonte: 'ZAP',
});

const MAX_COMPS = 5;

export default function CompsForm({ onSubmit, isLoading }: CompsFormProps) {
  const [comps, setComps] = useState<Comparativo[]>([emptyComp()]);

  function updateComp(index: number, field: keyof Comparativo, value: string) {
    setComps((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  }

  function addComp() {
    if (comps.length < MAX_COMPS) {
      setComps((prev) => [...prev, emptyComp()]);
    }
  }

  function removeComp(index: number) {
    setComps((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(comps);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">
          Imóveis Comparativos
        </h2>
        {comps.length < MAX_COMPS && (
          <Button type="button" variant="secondary" size="sm" onClick={addComp}>
            + Adicionar comp
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {comps.map((comp, index) => (
          <Card key={index} className="relative border border-gray-200 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Comparativo {index + 1}
              </span>
              {comps.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeComp(index)}
                  className="rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  aria-label="Remover comparativo"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                label="Endereço"
                name={`endereco-${index}`}
                value={comp.endereco}
                onChange={(e) => updateComp(index, 'endereco', e.target.value)}
                placeholder="Rua, número, bairro"
                required
              />
              <Input
                label="Preço de venda (R$)"
                name={`precoVenda-${index}`}
                type="number"
                value={comp.precoVenda}
                onChange={(e) => updateComp(index, 'precoVenda', e.target.value)}
                placeholder="0"
                min={0}
                required
              />
              <Input
                label="Área útil (m²)"
                name={`areaUtil-${index}`}
                type="number"
                value={comp.areaUtil}
                onChange={(e) => updateComp(index, 'areaUtil', e.target.value)}
                placeholder="0"
                min={0}
                required
              />
              <Input
                label="Data de venda"
                name={`dataVenda-${index}`}
                type="date"
                value={comp.dataVenda}
                onChange={(e) => updateComp(index, 'dataVenda', e.target.value)}
                required
              />
              <Select
                label="Fonte"
                name={`fonte-${index}`}
                value={comp.fonte}
                onChange={(e) => updateComp(index, 'fonte', e.target.value)}
                options={fonteOptions}
              />
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Button type="submit" loading={isLoading} className="w-full">
          {isLoading ? 'Analisando...' : 'Analisar Precificação'}
        </Button>
      </div>
    </form>
  );
}
