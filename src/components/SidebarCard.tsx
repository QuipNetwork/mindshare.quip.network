import type { ReactNode } from 'react';

export function SidebarCard({ children }: { children: ReactNode }) {
  return (
    <div className="gradient-diagonal mx-auto max-w-md rounded-xl border border-(--brand-purple-medium)/40 p-4 text-left text-sm w-full">
      {children}
    </div>
  );
}
