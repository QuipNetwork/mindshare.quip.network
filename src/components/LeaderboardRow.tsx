import { formatPercent, getPointsForRank, QUIP_REWARDS } from '@/lib/format';
import { ProgressBar } from './ProgressBar';
import { RewardBadge } from './RewardBadge';
import { LeaderboardEntryRanked } from '@/lib/types';

const MEDALS = ['🥇', '🥈', '🥉'];

interface LeaderboardRowProps {
  entry: LeaderboardEntryRanked;
  topMindshare: number;
}

function RankWithMedal({ rank }: { rank: number }) {
  const medal = rank < 3 ? MEDALS[rank] : null;

  if (medal) return <span className="text-lg min-w-8">{medal}</span>;
  else return <span className="min-w-8">{rank + 1}</span>;
}

export function LeaderboardRow({ entry, topMindshare }: LeaderboardRowProps) {
  const progress =
    topMindshare > 0
      ? (entry.mindshare_percent.yearly / topMindshare) * 100
      : 0;

  const quip$ = getPointsForRank(entry.rank.yearly, QUIP_REWARDS);

  return (
    <tr className="border-b border-(--brand-purple-medium)/20 transition-colors hover:bg-white/2">
      <td className="py-3 pl-4 pr-2 text-center text-sm font-medium text-(--color-scheme-1--text)">
        <div className="flex flex-row items-center justify-center gap-2">
          <RankWithMedal rank={entry.rank.yearly} />

          {quip$ ? (
            <RewardBadge variant="pink">
              <b>${quip$.toLocaleString()}</b>
            </RewardBadge>
          ) : (
            ''
          )}
        </div>
      </td>

      <td className="py-3 px-2">
        <a
          href={entry.x_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-white no-underline hover:text-(--brand-cyan)"
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

      <td className="py-3 pl-2 pr-2 space-y-1">
        <div className="w-14 text-xs font-mono text-(--color-scheme-1--text)">
          {formatPercent(entry.mindshare_percent.yearly)}
        </div>

        <ProgressBar progress={progress} />
      </td>

      <td className="py-3 px-2">
        <div className="flex flex-row items-center justify-center gap-4">
          <span className="text-sm font-medium text-(--color-scheme-1--text)">
            {entry.rank.weekly + 1}
          </span>

          <RewardBadge variant="cyan">
            {getPointsForRank(entry.rank.weekly).toLocaleString()}
          </RewardBadge>
        </div>
      </td>
    </tr>
  );
}
