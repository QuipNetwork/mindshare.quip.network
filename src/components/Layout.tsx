import type { ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-[var(--brand-purple-medium)]/30 px-4 py-4">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <span className="text-xl font-bold text-[var(--brand-cyan)]">Q</span>
          <span className="text-sm font-semibold tracking-wide text-white/80">
            QUIP NETWORK
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        {children}
      </main>

      <footer className="border-t border-[var(--brand-purple-medium)]/30 px-4 py-6 text-center text-xs text-[var(--color-scheme-1--text)]">
        &copy; {new Date().getFullYear()} QUIP Network. All rights reserved.
      </footer>
    </div>
  );
}
