import type { ReactNode } from 'react';

export function SidebarCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/6 bg-white/3 p-6 text-sm">
      {children}
    </div>
  );
}
