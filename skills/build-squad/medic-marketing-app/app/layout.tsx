'use client';

import './globals.css';
import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { DoctorProvider } from '@/context/DoctorContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900">
        <DoctorProvider>
          <div className="flex min-h-screen">
            <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
            <div className="flex-1 flex flex-col min-w-0">
              <header className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-white">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <span className="text-sm font-bold">Medic Marketing AI</span>
              </header>
              <main className="flex-1 p-4 md:p-8 max-w-5xl w-full mx-auto">
                {children}
              </main>
            </div>
          </div>
        </DoctorProvider>
      </body>
    </html>
  );
}
