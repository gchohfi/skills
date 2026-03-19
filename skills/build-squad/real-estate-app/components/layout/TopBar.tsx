'use client';

import { usePropertyContext } from '../../context/PropertyContext';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { property } = usePropertyContext();

  return (
    <header className="flex items-center gap-4 bg-white border-b border-gray-200 px-4 py-3 md:px-6 sticky top-0 z-10">
      {/* Hamburger — somente no mobile */}
      <button
        type="button"
        onClick={onMenuClick}
        className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0e6b6e]"
        aria-label="Abrir menu"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Título do app */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold text-gray-900 truncate md:text-base">
          Venda Seu Imóvel com IA
        </h1>
        {property?.endereco && (
          <p className="text-xs text-gray-500 truncate">
            {property.endereco}
            {property.cidade ? `, ${property.cidade}` : ''}
            {property.estado ? ` - ${property.estado}` : ''}
          </p>
        )}
      </div>

      {/* Lado direito */}
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline-flex items-center rounded-full bg-[#f0fafa] px-3 py-1 text-xs font-medium text-[#0e6b6e]">
          IA Ativa
        </span>
      </div>
    </header>
  );
}
