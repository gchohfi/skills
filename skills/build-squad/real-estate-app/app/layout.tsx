'use client';

import { Inter } from 'next/font/google';
import { useState } from 'react';
import { PropertyProvider } from '../context/PropertyContext';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <PropertyProvider>
          <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Sidebar — oculta no mobile, visível no md+ */}
            <div className="hidden md:flex md:flex-shrink-0">
              <Sidebar />
            </div>

            {/* Sidebar mobile (controlada) */}
            <div className="md:hidden">
              <Sidebar
                mobileOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />
            </div>

            {/* Área de conteúdo principal */}
            <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
              <TopBar onMenuClick={() => setSidebarOpen((v) => !v)} />
              <main className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </PropertyProvider>
      </body>
    </html>
  );
}
