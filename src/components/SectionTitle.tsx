import type { ReactNode } from 'react';

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-[clamp(28px,calc(1.8vw+20px),44px)] font-medium leading-[1.05] tracking-[-0.02em] text-zinc-950">
      {children}
    </h2>
  );
}
