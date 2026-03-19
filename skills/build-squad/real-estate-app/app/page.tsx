'use client';

import Link from 'next/link';
import { usePropertyContext } from '../context/PropertyContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const modules = [
  {
    icon: '💰',
    title: 'Precificação',
    description: 'Descubra o valor ideal do seu imóvel com análise de mercado baseada em IA.',
    href: '/precificacao',
  },
  {
    icon: '📝',
    title: 'Anúncio',
    description: 'Crie descrições atraentes e profissionais para anunciar seu imóvel.',
    href: '/anuncio',
  },
  {
    icon: '📣',
    title: 'Marketing',
    description: 'Gere estratégias e conteúdos de marketing para divulgar seu imóvel.',
    href: '/marketing',
  },
  {
    icon: '📅',
    title: 'Visitas',
    description: 'Organize e gerencie as visitas ao seu imóvel de forma eficiente.',
    href: '/visitas',
  },
  {
    icon: '📄',
    title: 'Documentos',
    description: 'Prepare e organize toda a documentação necessária para a venda.',
    href: '/documentos',
  },
  {
    icon: '🤝',
    title: 'Negociação',
    description: 'Receba orientações para negociar o melhor preço e condições de venda.',
    href: '/negociacao',
  },
];

export default function DashboardPage() {
  const { property, isLoaded } = usePropertyContext();

  return (
    <div className="space-y-8">
      {/* CTA de configuração quando não há imóvel configurado */}
      {isLoaded && !property && (
        <div className="rounded-xl bg-[#f0fafa] border border-[#0e6b6e]/20 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-base font-semibold text-[#0e6b6e]">
              Comece configurando seu imóvel
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Adicione as informações do seu imóvel para obter análises personalizadas e resultados mais precisos.
            </p>
          </div>
          <Link href="/setup">
            <Button variant="primary" size="md">
              ⚙️ Configurar Imóvel
            </Button>
          </Link>
        </div>
      )}

      {/* Card do Gerente Supervisor */}
      <Link href="/supervisor" className="block group">
        <div className="rounded-xl bg-[#1a1a2e] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-shadow hover:shadow-xl">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-3xl">
            👔
          </span>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-white">
              Gerente Supervisor
            </h2>
            <p className="mt-1 text-sm text-white/60">
              Coordene e supervisione todo o processo de venda. Receba análises, recomendações e próximos passos priorizados.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#c9943a] group-hover:underline">
            Acessar
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>

      {/* Cabeçalho do dashboard */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Selecione um módulo para começar a vender seu imóvel com o apoio da inteligência artificial.
        </p>
      </div>

      {/* Grade de módulos */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) => (
          <Link key={mod.href} href={mod.href} className="group block">
            <Card className="h-full transition-shadow hover:shadow-lg hover:border-[#0e6b6e]/30 cursor-pointer">
              <div className="flex flex-col gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0fafa] text-2xl group-hover:bg-[#0e6b6e]/10 transition-colors">
                  {mod.icon}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#0e6b6e] transition-colors">
                    {mod.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                    {mod.description}
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#0e6b6e] group-hover:underline">
                    Acessar módulo
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
