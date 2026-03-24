import { formatPercent, getPointsForRank, QUIP_REWARDS } from '@/lib/format';
import { ProgressBar } from './ProgressBar';
import { RewardBadge } from './RewardBadge';
import { LeaderboardEntryRanked } from '@/lib/types';
import type { SortBy } from '@/store/leaderboard';

const MEDALS = ['🥇', '🥈', '🥉'];

interface LeaderboardRowProps {
  entry: LeaderboardEntryRanked;
  topMindshare: number;
  sortBy: SortBy;
}

function RankWithMedal({ rank }: { rank: number }) {
  const medal = rank < 3 ? MEDALS[rank] : null;

  if (medal) return <span className="text-lg min-w-8">{medal}</span>;
  else return <span className="min-w-8">{rank + 1}</span>;
}

export function LeaderboardRow({
  entry,
  topMindshare,
  sortBy,
}: LeaderboardRowProps) {
  const mindshare = entry.mindshare_percent[sortBy];
  const progress = topMindshare > 0 ? (mindshare / topMindshare) * 100 : 0;

  const rank = entry.rank[sortBy];
  const isWeekly = sortBy === 'weekly';
  const rewards = isWeekly
    ? getPointsForRank(rank + 1)
    : getPointsForRank(rank + 1, QUIP_REWARDS);

  return (
    <tr className="border-b border-(--brand-purple-medium)/20 transition-colors hover:bg-white/2">
      <td className="py-3 pl-2 pr-1 sm:pl-4 sm:pr-2 text-center text-sm font-medium text-(--color-scheme-1--text)">
        <RankWithMedal rank={rank} />
      </td>

      <td className="py-3 px-1 sm:px-2 max-w-32 sm:max-w-none">
        <a
          href={entry.x_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-white no-underline hover:text-(--brand-cyan) min-w-0"
        >
          {entry.x_avatar_url ? (
            <img
              src={entry.x_avatar_url}
              alt=""
              className="h-8 w-8 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--brand-purple-dark) text-xs font-bold text-(--brand-cyan)">
              {entry.x_display_name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">
              {entry.x_display_name}
            </div>
            <div className="truncate text-xs text-(--color-scheme-1--text)">
              @{entry.x_username}
            </div>
          </div>
        </a>
      </td>

      <td className="py-3 px-1 sm:pl-2 sm:pr-8 space-y-1">
        <div className="w-14 text-xs font-mono text-(--color-scheme-1--text)">
          {formatPercent(mindshare)}
        </div>

        <ProgressBar progress={progress} />
      </td>

      <td className="py-3 px-1 sm:px-2 text-center">
        {rewards ? (
          <RewardBadge variant={isWeekly ? 'cyan' : 'pink'}>
            {isWeekly ? (
              rewards.toLocaleString()
            ) : (
              <b>${rewards.toLocaleString()}</b>
            )}
          </RewardBadge>
        ) : (
          ''
        )}
      </td>
    </tr>
  );
}
