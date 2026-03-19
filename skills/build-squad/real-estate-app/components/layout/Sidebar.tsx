'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Dashboard', icon: '🏠' },
  { href: '/supervisor', label: 'Supervisor', icon: '👔' },
  { href: '/setup', label: 'Configurar Imóvel', icon: '⚙️' },
  { href: '/precificacao', label: 'Precificação', icon: '💰' },
  { href: '/anuncio', label: 'Anúncio', icon: '📝' },
  { href: '/marketing', label: 'Marketing', icon: '📣' },
  { href: '/visitas', label: 'Visitas', icon: '📅' },
  { href: '/documentos', label: 'Documentos', icon: '📄' },
  { href: '/negociacao', label: 'Negociação', icon: '🤝' },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          'fixed top-0 left-0 z-30 h-full w-64 bg-[#0e6b6e] text-white flex flex-col transition-transform duration-300',
          'md:relative md:translate-x-0 md:flex',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        ].join(' ')}
      >
        {/* App name */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
          <span className="text-xl">🏡</span>
          <span className="text-sm font-bold leading-tight">
            Venda Seu Imóvel com IA
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={[
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'text-white/75 hover:bg-white/10 hover:text-white',
                    ].join(' ')}
                  >
                    <span className="text-base">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/10">
          <p className="text-xs text-white/50">Desenvolvido com IA · v1.0</p>
        </div>
      </aside>
    </>
  );
}
