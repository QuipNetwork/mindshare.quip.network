import type { LeaderboardEntryRanked } from '@/lib/types';
import {
  formatPercent,
  getPointsForRank,
  RANK_REWARDS,
} from '@/lib/format';
import { MedalIcon } from './icons';
import { UserIdentity } from './UserIdentity';

type Tone = 'light' | 'dark';

const ORDINALS = ['First', 'Second', 'Third'] as const;

interface PodiumCardProps {
  entry: LeaderboardEntryRanked;
  place: number;
}

export function PodiumCard({ entry, place }: PodiumCardProps) {
  const isFirst = place === 1;
  const tone: Tone = isFirst ? 'dark' : 'light';
  const weeklyRank = entry.rank.weekly + 1;
  const weeklyReward = getPointsForRank(weeklyRank, RANK_REWARDS);

  const cardTheme = isFirst
    ? 'bg-zinc-950 text-zinc-50 hover:bg-zinc-900'
    : 'bg-zinc-100 hover:bg-zinc-150';
  const muted = isFirst ? 'text-zinc-400' : 'text-zinc-500';
  const strong = isFirst ? 'text-zinc-50' : 'text-zinc-950';
  const borderTop = isFirst ? 'border-zinc-700' : 'border-zinc-200';

  return (
    <a
      href={entry.x_link}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative flex min-h-[280px] flex-col p-6 transition-colors duration-200 ${cardTheme}`}
    >
      <div className="mb-7 flex items-center justify-between">
        <div className="inline-flex items-baseline gap-2.5">
          <span
            className={`font-display text-[56px] font-medium leading-[0.85] tracking-[-0.04em] ${strong}`}
          >
            {String(place).padStart(2, '0')}
          </span>
          <span
            className={`font-mono text-xs uppercase tracking-[0.4px] ${muted}`}
          >
            {ORDINALS[place - 1]}
          </span>
        </div>
        <MedalIcon place={place} className="h-7 w-7" />
      </div>

      <div className="mt-auto mb-5">
        <UserIdentity
          src={entry.x_avatar_url}
          name={entry.x_display_name}
          handle={entry.x_username}
          size="md"
          tone={tone}
        />
      </div>

      <div className={`grid grid-cols-2 gap-4 border-t pt-5 ${borderTop}`}>
        <PodiumMetric
          tone={tone}
          label="Mindshare"
          value={formatPercent(entry.mindshare_percent.yearly)}
          sub="of the conversation"
        />
        <PodiumMetric
          tone={tone}
          label="Weekly rank"
          value={`#${weeklyRank}`}
          sub={`${weeklyReward.toLocaleString()} $QUIP Points`}
        />
      </div>
    </a>
  );
}

function PodiumMetric({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  tone: Tone;
}) {
  const muted = tone === 'dark' ? 'text-zinc-400' : 'text-zinc-500';
  const strong = tone === 'dark' ? 'text-zinc-50' : 'text-zinc-950';
  return (
    <div>
      <div
        className={`mb-1.5 font-mono text-[11px] uppercase tracking-[0.4px] ${muted}`}
      >
        {label}
      </div>
      <div
        className={`font-display text-[22px] font-medium leading-none tracking-[-0.02em] ${strong}`}
      >
        {value}
      </div>
      <div className={`mt-1 font-mono text-[11px] ${muted}`}>{sub}</div>
    </div>
  );
}

