import {
  formatPercent,
  getPointsForRank,
  QUIP_REWARDS,
  RANK_REWARDS,
} from '@/lib/format';
import { ProgressBar } from './ProgressBar';
import { UserIdentity } from './UserIdentity';
import type { LeaderboardEntryRanked } from '@/lib/types';

interface LeaderboardRowProps {
  entry: LeaderboardEntryRanked;
  topMindshare: number;
}

export function LeaderboardRow({ entry, topMindshare }: LeaderboardRowProps) {
  const seasonRank = entry.rank.yearly + 1;
  const weeklyRank = entry.rank.weekly + 1;
  const quipReward = getPointsForRank(seasonRank, QUIP_REWARDS);
  const weeklyReward = getPointsForRank(weeklyRank, RANK_REWARDS);
  const progress =
    topMindshare > 0
      ? (entry.mindshare_percent.yearly / topMindshare) * 100
      : 0;

  return (
    <tr className="border-b border-zinc-150 transition-colors duration-150 hover:bg-zinc-100">
      <td className="w-14 py-4 pl-1 pr-3 font-mono text-sm font-medium tabular-nums text-zinc-950">
        {String(seasonRank).padStart(2, '0')}
      </td>
      <td className="min-w-0 px-3 py-4">
        <UserIdentity
          src={entry.x_avatar_url}
          name={entry.x_display_name}
          handle={entry.x_username}
          href={entry.x_link}
        />
      </td>
      <td className="min-w-[200px] px-3 py-4">
        <div className="flex items-center gap-3">
          <span className="w-[52px] shrink-0 font-mono text-[13px] font-medium tabular-nums text-zinc-950">
            {formatPercent(entry.mindshare_percent.yearly)}
          </span>
          <ProgressBar progress={progress} />
        </div>
      </td>
      <td className="w-[110px] px-3 py-4 font-mono text-[13px] tabular-nums">
        <div className="font-medium text-zinc-950">#{weeklyRank}</div>
        <div className="mt-0.5 text-[11px] text-zinc-500">
          {weeklyReward.toLocaleString()} pts
        </div>
      </td>
      <td className="w-[100px] py-4 pl-3 pr-1 text-right font-mono text-[13px] font-medium tabular-nums text-zinc-950">
        {quipReward ? (
          `$${quipReward.toLocaleString()}`
        ) : (
          <span className="text-zinc-400">—</span>
        )}
      </td>
    </tr>
  );
}
