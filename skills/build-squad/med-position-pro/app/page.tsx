'use client';
import Link from 'next/link';
import { useDoctor } from '@/context/DoctorContext';
import Card from '@/components/ui/Card';

const modules = [
  { href: '/profile-diagnosis', icon: '🔍', title: 'Diagnostico do Perfil', desc: 'Scores de clareza, autoridade, coerencia e conversao' },
  { href: '/competitor-analysis', icon: '📊', title: 'Concorrencia', desc: 'Mapa de concorrentes, gaps e oportunidades' },
  { href: '/reference-audience', icon: '🎯', title: 'Referencias & Publico', desc: 'Analise de referencias e persona da paciente ideal' },
  { href: '/positioning', icon: '💎', title: 'Posicionamento', desc: 'Tese central, territorio, diferenciacao e metodo' },
  { href: '/content-architect', icon: '📐', title: 'Plano & Conteudo', desc: 'Calendario editorial + gerador de carrosseis e reels' },
  { href: '/compliance', icon: '🛡️', title: 'Compliance CFM', desc: 'Revisao de conteudo para conformidade regulatoria' },
  { href: '/metrics-learning', icon: '📈', title: 'Metricas & Aprendizado', desc: 'Performance, testes A/B e otimizacao continua' },
  { href: '/brand-memory', icon: '🧠', title: 'Memoria da Marca', desc: 'Golden cases, frases aprovadas, riscos conhecidos' },
];

export default function DashboardPage() {
  const { doctor } = useDoctor();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{doctor ? `Dra. ${doctor.nome}` : 'med-position-pro'}</h1>
        <p className="mt-1 text-sm text-gray-500">{doctor ? `${doctor.especialidade} — ${doctor.instagramHandle}` : 'Posicionamento medico premium com IA'}</p>
      </div>
      {!doctor && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Comece configurando o perfil da medica. <Link href="/setup" className="underline font-medium">Configurar agora</Link>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((m) => (
          <Link key={m.href} href={m.href}>
            <Card className="hover:shadow-lg hover:border-[#e2c799]/30 transition-all cursor-pointer h-full">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{m.icon}</span>
                <div><h3 className="text-sm font-semibold text-gray-900">{m.title}</h3><p className="mt-1 text-xs text-gray-500">{m.desc}</p></div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
