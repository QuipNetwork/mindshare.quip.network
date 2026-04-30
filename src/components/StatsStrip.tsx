import type { ReactNode } from 'react';
import { Em } from './Em';
import { Page } from './Page';

export function StatsStrip() {
  return (
    <Page>
      <div className="grid grid-cols-1 divide-y divide-zinc-150 border-y border-zinc-200 min-[720px]:grid-cols-3 min-[720px]:divide-x min-[720px]:divide-y-0">
        <Stat
          label="Season 01 rewards"
          value="$100,000"
          sub="in $QUIP Token Rewards · Top 315 · Paid at TGE"
        />
        <Stat
          label="Weekly Winners"
          value="Top 1,000"
          sub="$QUIP Points · Every Monday at 1pm UTC"
        />
        <Stat
          label="Season"
          value={
            <>
              01{' '}
              <Em className="font-display text-xl text-zinc-500">(live)</Em>
            </>
          }
          sub="Updated hourly"
        />
      </div>
    </Page>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: ReactNode;
  sub: string;
}) {
  return (
    <div className="py-5 min-[720px]:px-6 min-[720px]:py-[22px]">
      <div className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.4px] text-zinc-500">
        {label}
      </div>
      <div className="font-display text-[28px] font-medium leading-none tracking-[-0.02em] text-zinc-950">
        {value}
      </div>
      <div className="mt-2 font-mono text-[11px] text-zinc-500">{sub}</div>
    </div>
  );
}
