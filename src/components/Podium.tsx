import { useMemo } from 'react';
import { calculateRanks } from '@/lib/leaderboard';
import { useLeaderboardStore } from '@/store/leaderboard-context';
import { Em } from './Em';
import { Page } from './Page';
import { PodiumCard } from './PodiumCard';
import { SectionTitle } from './SectionTitle';

export function Podium() {
  const entries = useLeaderboardStore((s) => s.entries);
  const top3 = useMemo(
    () => calculateRanks(entries, 'yearly').slice(0, 3),
    [entries]
  );
  if (top3.length === 0) return null;

  return (
    <section className="py-[clamp(48px,5vw,72px)]">
      <Page>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-6">
          <SectionTitle>
            Top <Em>three</Em> overall
          </SectionTitle>
          <div className="font-mono text-xs uppercase tracking-[0.4px] text-zinc-500">
            Updated hourly
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 min-[880px]:grid-cols-3">
          {top3.map((entry, i) => (
            <PodiumCard key={entry.x_user_id} entry={entry} place={i + 1} />
          ))}
        </div>
      </Page>
    </section>
  );
}
