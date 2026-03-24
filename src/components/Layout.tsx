import type { ReactNode } from 'react';
import { PrimarySiteHeader } from './PrimarySiteHeader';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] h-1/2 w-1/2 animate-[float1_20s_ease-in-out_infinite] rounded-full bg-[radial-gradient(ellipse,rgba(0,212,255,0.06)_0%,transparent_70%)] blur-[80px]" />
        <div className="absolute -right-[10%] -bottom-[10%] h-[45%] w-[45%] animate-[float2_25s_ease-in-out_infinite] rounded-full bg-[radial-gradient(ellipse,rgba(224,64,224,0.05)_0%,transparent_70%)] blur-[80px]" />
      </div>
      <div className="relative z-1 flex min-h-screen flex-col">
        <PrimarySiteHeader />

        <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 pt-10 pb-15">
          {children}
        </main>

        <footer className="border-t border-white/6 px-4 py-6 text-center text-xs text-text">
          &copy; {new Date().getFullYear()} QUIP Network. All rights reserved.
        </footer>
      </div>
    </>
  );
}
