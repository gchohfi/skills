'use client';

import { useState } from 'react';
import { useProperty } from '@/hooks/useProperty';
import { PropertyProfile } from '@/types/property';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import ModuleHeader from '@/components/layout/ModuleHeader';

const tipoOptions = [
  { value: 'casa', label: 'Casa' },
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'comercial', label: 'Comercial' },
];

const estadoOptions = [
  { value: 'AC', label: 'AC' },
  { value: 'AL', label: 'AL' },
  { value: 'AM', label: 'AM' },
  { value: 'AP', label: 'AP' },
  { value: 'BA', label: 'BA' },
  { value: 'CE', label: 'CE' },
  { value: 'DF', label: 'DF' },
  { value: 'ES', label: 'ES' },
  { value: 'GO', label: 'GO' },
  { value: 'MA', label: 'MA' },
  { value: 'MG', label: 'MG' },
  { value: 'MS', label: 'MS' },
  { value: 'MT', label: 'MT' },
  { value: 'PA', label: 'PA' },
  { value: 'PB', label: 'PB' },
  { value: 'PE', label: 'PE' },
  { value: 'PI', label: 'PI' },
  { value: 'PR', label: 'PR' },
  { value: 'RJ', label: 'RJ' },
  { value: 'RN', label: 'RN' },
  { value: 'RO', label: 'RO' },
  { value: 'RR', label: 'RR' },
  { value: 'RS', label: 'RS' },
  { value: 'SC', label: 'SC' },
  { value: 'SE', label: 'SE' },
  { value: 'SP', label: 'SP' },
  { value: 'TO', label: 'TO' },
];

interface FormState {
  tipo: 'casa' | 'apartamento' | 'terreno' | 'comercial';
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  quartos: string;
  banheiros: string;
  areaUtil: string;
  areaTotal: string;
  vagas: string;
  condominio: string;
  iptu: string;
  precoDesejado: string;
  caracteristicas: string;
  descricao: string;
}

const initialForm: FormState = {
  tipo: 'apartamento',
  endereco: '',
  bairro: '',
  cidade: '',
  estado: 'SP',
  cep: '',
  quartos: '',
  banheiros: '',
  areaUtil: '',
  areaTotal: '',
  vagas: '',
  condominio: '',
  iptu: '',
  precoDesejado: '',
  caracteristicas: '',
  descricao: '',
};

export default function SetupPage() {
  const { property, setProperty } = useProperty();
  const [form, setForm] = useState<FormState>(() => {
    if (property) {
      return {
        tipo: property.tipo,
        endereco: property.endereco,
        bairro: property.endereco.split(',')[1]?.trim() ?? '',
        cidade: property.cidade,
        estado: property.estado,
        cep: property.cep,
        quartos: String(property.quartos),
        banheiros: String(property.banheiros),
        areaUtil: String(property.areaUtil),
        areaTotal: String(property.areaTotal),
        vagas: String(property.vagas),
        condominio: property.condominio != null ? String(property.condominio) : '',
        iptu: property.iptu != null ? String(property.iptu) : '',
        precoDesejado: String(property.precoDesejado),
        caracteristicas: property.caracteristicas.join('\n'),
        descricao: property.descricao,
      };
    }
    return initialForm;
  });
  const [saved, setSaved] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setSaved(false);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const profile: PropertyProfile = {
      tipo: form.tipo,
      endereco: form.endereco,
      cidade: form.cidade,
      estado: form.estado,
      cep: form.cep,
      quartos: Number(form.quartos) || 0,
      banheiros: Number(form.banheiros) || 0,
      areaUtil: Number(form.areaUtil) || 0,
      areaTotal: Number(form.areaTotal) || 0,
      vagas: Number(form.vagas) || 0,
      condominio: form.condominio ? Number(form.condominio) : undefined,
      iptu: form.iptu ? Number(form.iptu) : undefined,
      precoDesejado: Number(form.precoDesejado) || 0,
      caracteristicas: form.caracteristicas
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      descricao: form.descricao,
      fotos: property?.fotos ?? [],
    };

    setProperty(profile);
    setSaved(true);
  }

  return (
    <div>
      <ModuleHeader
        title="Configuração do Imóvel"
        description="Preencha os dados do imóvel para usar em todos os módulos."
        icon="🏠"
      />

      {saved && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          ✅ Imóvel salvo com sucesso! Você já pode usar os módulos de IA.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <h2 className="mb-4 text-base font-semibold text-gray-800">Tipo e Localização</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select
              label="Tipo de imóvel"
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              options={tipoOptions}
              required
            />
            <Input
              label="Endereço"
              name="endereco"
              value={form.endereco}
              onChange={handleChange}
              placeholder="Rua, número, complemento"
              required
            />
            <Input
              label="Bairro"
              name="bairro"
              value={form.bairro}
              onChange={handleChange}
              placeholder="Nome do bairro"
            />
            <Input
              label="Cidade"
              name="cidade"
              value={form.cidade}
              onChange={handleChange}
              placeholder="Ex: São Paulo"
              required
            />
            <Select
              label="Estado"
              name="estado"
              value={form.estado}
              onChange={handleChange}
              options={estadoOptions}
              required
            />
            <Input
              label="CEP"
              name="cep"
              value={form.cep}
              onChange={handleChange}
              placeholder="00000-000"
            />
          </div>
        </Card>

        <Card className="mb-6">
          <h2 className="mb-4 text-base font-semibold text-gray-800">Características</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Input
              label="Quartos"
              name="quartos"
              type="number"
              value={form.quartos}
              onChange={handleChange}
              placeholder="0"
              min={0}
            />
            <Input
              label="Banheiros"
              name="banheiros"
              type="number"
              value={form.banheiros}
              onChange={handleChange}
              placeholder="0"
              min={0}
            />
            <Input
              label="Vagas de garagem"
              name="vagas"
              type="number"
              value={form.vagas}
              onChange={handleChange}
              placeholder="0"
              min={0}
            />
            <Input
              label="Área útil (m²)"
              name="areaUtil"
              type="number"
              value={form.areaUtil}
              onChange={handleChange}
              placeholder="0"
              min={0}
            />
            <Input
              label="Área total (m²)"
              name="areaTotal"
              type="number"
              value={form.areaTotal}
              onChange={handleChange}
              placeholder="0"
              min={0}
            />
          </div>
        </Card>

        <Card className="mb-6">
          <h2 className="mb-4 text-base font-semibold text-gray-800">Valores</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input
              label="Preço desejado (R$)"
              name="precoDesejado"
              type="number"
              value={form.precoDesejado}
              onChange={handleChange}
              placeholder="0"
              min={0}
              required
            />
            <Input
              label="Condomínio (R$/mês)"
              name="condominio"
              type="number"
              value={form.condominio}
              onChange={handleChange}
              placeholder="0"
              min={0}
            />
            <Input
              label="IPTU (R$/ano)"
              name="iptu"
              type="number"
              value={form.iptu}
              onChange={handleChange}
              placeholder="0"
              min={0}
            />
          </div>
        </Card>

        <Card className="mb-6">
          <h2 className="mb-4 text-base font-semibold text-gray-800">Descrição e Diferenciais</h2>
          <div className="flex flex-col gap-4">
            <Textarea
              label="Características (uma por linha)"
              name="caracteristicas"
              value={form.caracteristicas}
              onChange={handleChange}
              placeholder={"Piscina\nVaranda gourmet\nArmários planejados"}
              rows={4}
            />
            <Textarea
              label="Descrição geral do imóvel"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              placeholder="Descreva o imóvel com detalhes relevantes para compradores..."
              rows={5}
            />
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Salvar Imóvel
          </Button>
        </div>
      </form>
    </div>
  );
}
