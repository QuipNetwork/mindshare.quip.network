import type { ReactNode } from 'react';
import { PrimarySiteHeader } from './PrimarySiteHeader';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PrimarySiteHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        {children}
      </main>

      <footer className="border-t border-(--brand-purple-medium)/30 px-4 py-6 text-center text-xs text-(--color-scheme-1--text)">
        &copy; {new Date().getFullYear()} QUIP Network. All rights reserved.
      </footer>
    </div>
  );
}
