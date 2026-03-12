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

export function RewardsTable() {
  return (
    <SidebarCard>
      <h3 className="mb-3 font-semibold text-white">Rewards</h3>

      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-(--color-scheme-1--text)">
        Weekly Mindshare Points
      </p>
      <table className="mb-4 w-full text-xs">
        <thead>
          <tr className="border-b border-(--brand-purple-medium)/30 text-(--color-scheme-1--text)">
            <th className="pb-1.5 text-left font-medium">Rank</th>
            <th className="pb-1.5 text-right font-medium">Points</th>
          </tr>
        </thead>
        <tbody>
          {weeklyRewards.map(([rank, points]) => (
            <tr
              key={rank}
              className="border-b border-(--brand-purple-medium)/15"
            >
              <td className="py-1.5 text-(--color-scheme-1--text)">{rank}</td>
              <td className="py-1.5 text-right tabular-nums text-white">
                {points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-(--color-scheme-1--text)">
        Season 1 $QUIP Prizes
      </p>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-(--brand-purple-medium)/30 text-(--color-scheme-1--text)">
            <th className="pb-1.5 text-left font-medium">Rank</th>
            <th className="pb-1.5 text-right font-medium">Reward</th>
          </tr>
        </thead>
        <tbody>
          {seasonRewards.map(([rank, reward]) => (
            <tr
              key={rank}
              className="border-b border-(--brand-purple-medium)/15"
            >
              <td className="py-1.5 text-(--color-scheme-1--text)">{rank}</td>
              <td className="py-1.5 text-right tabular-nums text-white">
                {reward}
              </td>
            </tr>
          ))}
          <tr className="font-semibold">
            <td className="pt-2 text-(--color-scheme-1--text)">Total</td>
            <td className="pt-2 text-right tabular-nums text-(--brand-cyan)">
              $100,000
            </td>
          </tr>
        </tbody>
      </table>
    </SidebarCard>
  );
}
