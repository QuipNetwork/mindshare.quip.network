import type { LeaderboardEntry } from '@/lib/types';
import { formatPercent, formatScore } from '@/lib/format';
import { ProgressBar } from './ProgressBar';

const MEDALS = ['', '🥇', '🥈', '🥉'];

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  rank: number;
  topMindshare: number;
}

export function LeaderboardRow({
  entry,
  rank,
  topMindshare,
}: LeaderboardRowProps) {
  const medal = rank <= 3 ? MEDALS[rank] : null;

  const progress =
    topMindshare > 0 ? (entry.mindshare_percent / topMindshare) * 100 : 0;

  return (
    <tr className="border-b border-(--brand-purple-medium)/20 transition-colors hover:bg-white/2">
      <td className="py-3 pl-4 pr-2 text-center text-sm font-medium text-(--color-scheme-1--text)">
        {medal ? <span className="text-lg">{medal}</span> : <span>{rank}</span>}
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
          {formatPercent(entry.mindshare_percent)}
        </div>

        <ProgressBar progress={progress} />
      </td>

      <td className="py-3 px-2 text-right text-sm font-mono text-(--color-scheme-1--text)">
        {formatScore(entry.mindshare_score)}
      </td>

      <td className="py-3 pl-2 pr-4 text-right text-sm font-mono text-(--color-scheme-1--text)">
        TBD
      </td>
    </tr>
  );
}
