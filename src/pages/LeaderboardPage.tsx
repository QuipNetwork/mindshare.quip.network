import { Hero } from '@/components/Hero';
import { TimePeriodTabs } from '@/components/TimePeriodTabs';
import { FilterControls } from '@/components/FilterControls';
import { LeaderboardTable } from '@/components/LeaderboardTable';
import { Explanation } from '@/components/Explanation';
import { useLeaderboardStore } from '@/store/leaderboard';
import { onMounted } from '@/hooks';

export function LeaderboardPage() {
  const fetchData = useLeaderboardStore((s) => s.fetch);

  onMounted(fetchData);

  return (
    <>
      <Hero />
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <FilterControls />
        <TimePeriodTabs />
      </div>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="min-w-0 flex-1">
          <LeaderboardTable />
        </div>
        <aside className="w-full lg:w-72 shrink-0">
          <Explanation />
        </aside>
      </div>
    </>
  );
}
