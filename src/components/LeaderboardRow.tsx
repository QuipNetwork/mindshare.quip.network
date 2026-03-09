import type { LeaderboardEntry } from '@/lib/types';
import { formatScore, formatPercent } from '@/lib/format';

const MEDALS = ['', '🥇', '🥈', '🥉'];

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  rank: number;
}

export function LeaderboardRow({ entry, rank }: LeaderboardRowProps) {
  const medal = rank <= 3 ? MEDALS[rank] : null;

  return (
    <tr className="border-b border-[var(--brand-purple-medium)]/20 transition-colors hover:bg-white/[0.02]">
      <td className="py-3 pl-4 pr-2 text-center text-sm font-medium text-[var(--color-scheme-1--text)]">
        {medal ? (
          <span className="text-lg">{medal}</span>
        ) : (
          <span>{rank}</span>
        )}
      </td>

      <td className="py-3 px-2">
        <a
          href={entry.x_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-white no-underline hover:text-[var(--brand-cyan)]"
        >
          {entry.x_avatar_url ? (
            <img
              src={entry.x_avatar_url}
              alt=""
              className="h-8 w-8 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-purple-dark)] text-xs font-bold text-[var(--brand-cyan)]">
              {entry.x_display_name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">
              {entry.x_display_name}
            </div>
            <div className="truncate text-xs text-[var(--color-scheme-1--text)]">
              @{entry.x_username}
            </div>
          </div>
        </a>
      </td>

      <td className="py-3 px-2 text-right text-sm font-mono text-white">
        {formatScore(entry.mindshare_score)}
      </td>

      <td className="py-3 pl-2 pr-4">
        <div className="flex items-center gap-2">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--brand-purple-dark)]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--brand-cyan)] to-[var(--brand-pink)]"
              style={{ width: `${Math.min(entry.mindshare_percent * 10, 100)}%` }}
            />
          </div>
          <span className="w-14 text-right text-xs font-mono text-[var(--color-scheme-1--text)]">
            {formatPercent(entry.mindshare_percent)}
          </span>
        </div>
      </td>
    </tr>
  );
}
