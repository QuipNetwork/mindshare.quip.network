import type { ReactNode } from 'react';

type Tint = 'yellow' | 'mint' | 'lilac';

const TINTS: Record<Tint, string> = {
  yellow: 'linear-gradient(160deg, #FFFCDA 0%, transparent 65%)',
  mint: 'linear-gradient(160deg, #EEFDCA 0%, transparent 65%)',
  lilac: 'linear-gradient(160deg, #E6D7FF 0%, transparent 65%)',
};

export function SidebarCard({
  children,
  tint,
}: {
  children: ReactNode;
  tint: Tint;
}) {
  return (
    <div className="relative overflow-hidden border border-zinc-200 bg-zinc-50 p-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{ backgroundImage: TINTS[tint] }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
