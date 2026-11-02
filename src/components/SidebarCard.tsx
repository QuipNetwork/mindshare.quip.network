import type { ReactNode } from 'react';

type Tint = 'yellow' | 'mint' | 'lilac';

const TINTS: Record<Tint, string> = {
  yellow: 'linear-gradient(160deg, #FFFCDA 0%, transparent 65%)',
  mint: 'linear-gradient(160deg, #EEFDCA 0%, transparent 65%)',
  lilac: 'linear-gradient(160deg, #E6D7FF 0%, transparent 65%)',
};

// Diagonal hatch over a light wash: marks a card as no longer current while
// keeping its content readable and its links clickable.
const ARCHIVED_SHADE =
  'repeating-linear-gradient(-45deg, rgb(9 9 11 / 0.07) 0 1px, transparent 1px 7px), linear-gradient(rgb(244 244 245 / 0.5), rgb(244 244 245 / 0.5))';

export function SidebarCard({
  children,
  tint,
  archived = false,
}: {
  children: ReactNode;
  tint: Tint;
  archived?: boolean;
}) {
  return (
    <div className="relative overflow-hidden border border-zinc-200 bg-zinc-50 p-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{ backgroundImage: TINTS[tint] }}
      />
      <div className="relative z-[1]">{children}</div>
      {archived && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{ backgroundImage: ARCHIVED_SHADE }}
        />
      )}
    </div>
  );
}
