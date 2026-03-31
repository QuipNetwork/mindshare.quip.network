import {
  formatPercent,
  getPointsForRank,
  QUIP_REWARDS,
  RANK_REWARDS,
} from '@/lib/format';
import { ProgressBar } from './ProgressBar';
import { RewardBadge } from './RewardBadge';
import { LeaderboardEntryRanked } from '@/lib/types';
import type { SortBy } from '@/store/leaderboard';

const MEDALS = ['🥇', '🥈', '🥉'];

interface LeaderboardRowProps {
  entry: LeaderboardEntryRanked;
  topMindshare: number;
  sortBy: SortBy;
  isFirst?: boolean;
  dimSeason?: boolean;
  dimWeekly?: boolean;
  dimDaily?: boolean;
}

function RankDisplay({ rank }: { rank: number }) {
  const medal = rank <= 3 ? MEDALS[rank - 1] : null;

  if (medal)
    return (
      <span className="mr-2.5 inline-block min-w-6 text-right text-lg leading-none align-middle">
        {medal}
      </span>
    );

  return (
    <span className="mr-2.5 inline-block min-w-6 text-right font-mono text-[13px] font-semibold text-text-muted">
      {rank}
    </span>
  );
}

const DIM = 'opacity-40 transition-opacity duration-250';
const BRIGHT = 'opacity-100 transition-opacity duration-250';

export function LeaderboardRow({
  entry,
  topMindshare,
  sortBy,
  isFirst,
  dimSeason,
  dimWeekly,
  dimDaily,
}: LeaderboardRowProps) {
  const seasonStyle = dimSeason ? DIM : BRIGHT;
  const weeklyStyle = dimWeekly ? DIM : BRIGHT;
  const dailyStyle = dimDaily ? DIM : BRIGHT;
  const mindsharePercent = entry.mindshare_percent[sortBy];
  const progress =
    topMindshare > 0 ? (mindsharePercent / topMindshare) * 100 : 0;

  const seasonRank = entry.rank.yearly + 1;
  const weeklyRank = entry.rank.weekly + 1;
  const dailyRank = entry.rank.daily + 1;
  const quipReward = getPointsForRank(seasonRank, QUIP_REWARDS);
  const weeklyReward = getPointsForRank(weeklyRank, RANK_REWARDS);

  return (
    <tr className="border-b border-white/3 transition-colors duration-150 last:border-b-0 hover:bg-white/2.5">
      {/* User */}
      <td className="py-4 pl-5 pr-4">
        <a
          href={entry.x_link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 text-white no-underline"
        >
          {entry.x_avatar_url ? (
            <img
              src={entry.x_avatar_url}
              alt=""
              className={`h-9.5 w-9.5 shrink-0 rounded-full border-2 object-cover ${
                isFirst
                  ? 'border-[rgba(255,215,0,0.35)] shadow-[0_0_12px_rgba(255,215,0,0.15)]'
                  : 'border-white/8'
              }`}
              loading="lazy"
            />
          ) : (
            <div className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-full border-2 border-white/8 bg-purple-dark text-xs font-bold text-cyan">
              {entry.x_display_name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <span className="block max-w-50 truncate text-sm font-semibold text-white group-hover:text-cyan max-sm:max-w-30">
              {entry.x_display_name}
            </span>
            <span className="text-xs text-text-muted">
              @{entry.x_username}
            </span>
          </div>
        </a>
      </td>

      {/* Mindshare */}
      <td className="min-w-35 py-4 px-4">
        <div className="mb-1.5 font-mono text-[13px] font-medium text-text">
          {formatPercent(mindsharePercent)}
        </div>
        <ProgressBar progress={progress} />
      </td>

      {/* Season Rank */}
      <td className={`whitespace-nowrap py-4 px-4 text-right ${seasonStyle}`}>
        <RankDisplay rank={seasonRank} />
        {quipReward ? (
          <RewardBadge variant="pink">
            ${quipReward.toLocaleString()}
          </RewardBadge>
        ) : (
          <RewardBadge variant="empty">--</RewardBadge>
        )}
      </td>

      {/* Weekly Rank */}
      <td className={`whitespace-nowrap py-4 px-4 text-right ${weeklyStyle}`}>
        <RankDisplay rank={weeklyRank} />
        {weeklyReward ? (
          <RewardBadge variant="cyan">
            {weeklyReward.toLocaleString()}
          </RewardBadge>
        ) : (
          <RewardBadge variant="empty">--</RewardBadge>
        )}
      </td>

      {/* Daily Rank */}
      <td className={`whitespace-nowrap py-4 px-4 text-right ${dailyStyle}`}>
        <RankDisplay rank={dailyRank} />
      </td>
    </tr>
  );
}
