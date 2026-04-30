import type { ReactNode } from 'react';

export function SidebarHeading({ children }: { children: ReactNode }) {
  return (
    <div className="font-display text-xl font-medium leading-[1.15] tracking-[-0.02em] text-zinc-950">
      {children}
    </div>
  );
}
