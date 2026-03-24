import { Hero } from '@/components/Hero';
import { FilterControls } from '@/components/FilterControls';
import { LeaderboardTable } from '@/components/LeaderboardTable';
import { Explanation } from '@/components/Explanation';
import { SeasonRewardsCard, WeeklyRewardsCard } from '@/components/RewardsTable';
import { useLeaderboardStore } from '@/store/leaderboard';
import { onMounted } from '@/hooks';

export function LeaderboardPage() {
  const fetchData = useLeaderboardStore((s) => s.fetch);

  onMounted(fetchData);

  return (
    <>
      <Hero />
      <FilterControls />
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <LeaderboardTable />
        </div>
        <aside className="animate-fade-up delay-300 flex flex-col gap-4">
          <Explanation />
          <SeasonRewardsCard />
          <WeeklyRewardsCard />
        </aside>
      </div>
    </>
  );
}
