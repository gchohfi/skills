'use client';

import { BrandIdentity } from '@/types/carousel';

interface BrandFormProps {
  brand: BrandIdentity;
  onChange: (brand: BrandIdentity) => void;
}

const FONT_OPTIONS_DISPLAY = ['Bebas Neue', 'Oswald', 'Archivo Black', 'Black Han Sans', 'Righteous'];
const FONT_OPTIONS_CORPO = ['Inter', 'DM Sans', 'Lato', 'Nunito', 'Roboto'];

export default function BrandForm({ brand, onChange }: BrandFormProps) {
  function update(key: keyof BrandIdentity, value: string) {
    onChange({ ...brand, [key]: value });
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Nome da Marca</label>
        <input
          type="text"
          value={brand.brandName}
          onChange={(e) => update('brandName', e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#0e6b6e] focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Handle</label>
        <input
          type="text"
          value={brand.handle}
          onChange={(e) => update('handle', e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#0e6b6e] focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Cor Fundo</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={brand.corFundo}
            onChange={(e) => update('corFundo', e.target.value)}
            className="h-8 w-8 rounded border border-gray-200 cursor-pointer"
          />
          <span className="text-xs text-gray-400">{brand.corFundo}</span>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Cor Destaque</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={brand.corDestaque}
            onChange={(e) => update('corDestaque', e.target.value)}
            className="h-8 w-8 rounded border border-gray-200 cursor-pointer"
          />
          <span className="text-xs text-gray-400">{brand.corDestaque}</span>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Cor Texto</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={brand.corTexto}
            onChange={(e) => update('corTexto', e.target.value)}
            className="h-8 w-8 rounded border border-gray-200 cursor-pointer"
          />
          <span className="text-xs text-gray-400">{brand.corTexto}</span>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Fonte Display</label>
        <select
          value={brand.fonteDisplay}
          onChange={(e) => update('fonteDisplay', e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#0e6b6e] focus:outline-none"
        >
          {FONT_OPTIONS_DISPLAY.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Fonte Corpo</label>
        <select
          value={brand.fonteCorpo}
          onChange={(e) => update('fonteCorpo', e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#0e6b6e] focus:outline-none"
        >
          {FONT_OPTIONS_CORPO.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
