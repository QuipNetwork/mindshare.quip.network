import { SidebarCard } from '@/components/SidebarCard';

const weeklyRewards = [
  ['1', '2,000'],
  ['2', '1,800'],
  ['3', '1,600'],
  ['4–5', '1,400'],
  ['6–10', '1,200'],
  ['11–25', '1,000'],
  ['26–50', '800'],
  ['51–100', '600'],
  ['101–250', '400'],
  ['251–500', '300'],
  ['501–1000', '200'],
] as const;

const seasonRewards = [
  ['1', '$5,000'],
  ['2', '$4,000'],
  ['3', '$3,000'],
  ['4–10', '$2,000'],
  ['11–25', '$1,000'],
  ['26–100', '$500'],
  ['101–315', '$100'],
] as const;

export function SeasonRewardsCard() {
  return (
    <SidebarCard>
      <h3 className="mb-4 text-[15px] font-bold text-white">
        Season 1 $QUIP Token Prizes
      </h3>
      <div className="mb-4 text-xs leading-snug text-text-muted">
        Top 315 &middot; $100k in $QUIP at TGE
      </div>
      <RewardTable
        headers={['Rank', 'Reward']}
        rows={seasonRewards}
        footer={['Total', '$100,000']}
      />
    </SidebarCard>
  );
}

export function WeeklyRewardsCard() {
  return (
    <SidebarCard>
      <h3 className="mb-4 text-[15px] font-bold text-white">
        Weekly Points Rewards
      </h3>
      <div className="mb-4 text-xs leading-snug text-text-muted">
        Distributed every Monday to top 1,000 users
      </div>
      <RewardTable headers={['Rank', 'Points']} rows={weeklyRewards} />
    </SidebarCard>
  );
}

function RewardTable({
  headers,
  rows,
  footer,
}: {
  headers: [string, string];
  rows: readonly (readonly [string, string])[];
  footer?: [string, string];
}) {
  return (
    <table className="w-full border-collapse text-[13px]">
      <thead>
        <tr className="border-b border-white/6">
          <th className="pb-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.8px] text-text-muted">
            {headers[0]}
          </th>
          <th className="pb-2.5 text-right text-[11px] font-semibold uppercase tracking-[0.8px] text-text-muted">
            {headers[1]}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([rank, value]) => (
          <tr key={rank} className="border-b border-white/3 last:border-b-0">
            <td className="py-2.5 text-text">{rank}</td>
            <td className="py-2.5 text-right font-mono text-xs font-medium text-white">
              {value}
            </td>
          </tr>
        ))}
      </tbody>
      {footer && (
        <tfoot>
          <tr>
            <td className="border-t border-white/6 pt-3.5 text-sm font-bold text-white">
              {footer[0]}
            </td>
            <td className="border-t border-white/6 pt-3.5 text-right font-mono text-sm font-bold text-white">
              {footer[1]}
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
}
