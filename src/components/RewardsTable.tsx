import type { ReactNode } from 'react';
import { Em } from '@/components/Em';
import { SidebarCard } from '@/components/SidebarCard';
import { SidebarHeading } from '@/components/SidebarHeading';
import { QUIP_REWARDS, RANK_REWARDS, rewardRows } from '@/lib/format';

const formatPoints = (n: number) => n.toLocaleString();
const formatDollars = (n: number) => `$${n.toLocaleString()}`;

export function TokenRewardsCard() {
  return (
    <SidebarCard tint="mint">
      <SidebarHeading>
        $QUIP <Em>Token Prizes</Em>
      </SidebarHeading>
      <SideSub>Top 315 · $100k in $QUIP at TGE</SideSub>
      <SideTable
        headers={['Rank', 'Reward']}
        rows={rewardRows(QUIP_REWARDS, formatDollars)}
        total={['Total', '$100,000']}
      />
    </SidebarCard>
  );
}

export function WeeklyRewardsCard() {
  return (
    <SidebarCard tint="lilac">
      <SidebarHeading>
        Weekly <Em>Points Rewards</Em>
      </SidebarHeading>
      <SideSub>Distributed every Monday to top 1,000 users</SideSub>
      <SideTable
        headers={['Rank', 'Points']}
        rows={rewardRows(RANK_REWARDS, formatPoints)}
      />
    </SidebarCard>
  );
}

function SideSub({ children }: { children: ReactNode }) {
  return (
    <div className="mt-1.5 mb-3.5 font-mono text-[11px] uppercase tracking-[0.4px] text-zinc-500">
      {children}
    </div>
  );
}

function SideTable({
  headers,
  rows,
  total,
}: {
  headers: [string, string];
  rows: readonly (readonly [string, string])[];
  total?: [string, string];
}) {
  return (
    <table className="w-full border-collapse font-mono text-xs tabular-nums">
      <thead>
        <tr>
          <th className="border-b border-zinc-200 pt-1.5 pb-2 text-left text-[10px] font-medium uppercase tracking-[0.5px] text-zinc-500">
            {headers[0]}
          </th>
          <th className="border-b border-zinc-200 pt-1.5 pb-2 text-right text-[10px] font-medium uppercase tracking-[0.5px] text-zinc-500">
            {headers[1]}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([rank, value], i) => {
          const isLast = i === rows.length - 1 && !total;
          const cellBorder = isLast ? '' : 'border-b border-zinc-150';
          return (
            <tr key={rank}>
              <td className={`py-[9px] text-zinc-800 ${cellBorder}`}>{rank}</td>
              <td
                className={`py-[9px] text-right font-medium text-zinc-950 ${cellBorder}`}
              >
                {value}
              </td>
            </tr>
          );
        })}
        {total && (
          <tr>
            <td className="border-t border-zinc-200 pt-3 font-display text-[15px] font-medium tracking-[-0.01em] text-zinc-950">
              {total[0]}
            </td>
            <td className="border-t border-zinc-200 pt-3 text-right font-display text-[15px] font-medium tracking-[-0.01em] text-zinc-950">
              {total[1]}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
