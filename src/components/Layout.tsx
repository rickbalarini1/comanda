import React from 'react';
import { Flame, Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-orange-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Espetaço</h1>
          </div>
          <button className="p-2 hover:bg-orange-700 rounded-lg transition-colors">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}