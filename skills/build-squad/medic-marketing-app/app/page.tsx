'use client';

import Link from 'next/link';
import { useDoctor } from '@/context/DoctorContext';
import Card from '@/components/ui/Card';

const modules = [
  { href: '/analise-perfil', icon: '🔍', title: 'Analise de Perfil', desc: 'Analise seu posicionamento e identifique oportunidades' },
  { href: '/concorrencia', icon: '📊', title: 'Concorrencia', desc: 'Benchmarks e gaps competitivos na sua especialidade' },
  { href: '/tendencias', icon: '📈', title: 'Tendencias', desc: 'Temas e formatos em alta para sua especialidade' },
  { href: '/estrategia', icon: '📋', title: 'Estrategia', desc: 'Plano editorial de 30 dias personalizado' },
  { href: '/carrossel', icon: '🎨', title: 'Carrossel', desc: 'Gere carrosseis prontos para Instagram' },
  { href: '/metricas', icon: '📉', title: 'Metricas', desc: 'Analise performance e otimize resultados' },
];

export default function DashboardPage() {
  const { doctor } = useDoctor();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {doctor ? `Ola, Dr(a). ${doctor.nome}` : 'Medic Marketing AI'}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {doctor
            ? `${doctor.especialidade} — ${doctor.cidade}/${doctor.estado}`
            : 'Configure seu perfil para comecar'}
        </p>
      </div>

      {!doctor && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Comece configurando seu perfil profissional.{' '}
          <Link href="/setup" className="underline font-medium">
            Configurar agora
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((m) => (
          <Link key={m.href} href={m.href}>
            <Card className="hover:shadow-lg hover:border-[#4ecdc4]/30 transition-all cursor-pointer h-full">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{m.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{m.title}</h3>
                  <p className="mt-1 text-xs text-gray-500">{m.desc}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {doctor && (
        <Link href="/supervisor">
          <Card className="border-[#4ecdc4]/30 bg-gradient-to-r from-[#0a1628]/5 to-[#4ecdc4]/5 hover:shadow-lg transition-all cursor-pointer mt-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👔</span>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Supervisor — Visao Geral</h3>
                <p className="text-xs text-gray-500">Veja o status de todos os modulos e receba recomendacoes</p>
              </div>
            </div>
          </Card>
        </Link>
      )}
    </div>
  );
}
