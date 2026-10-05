import { AllRanks } from '@/components/AllRanks';
import { Explainer } from '@/components/Explainer';
import { Hero } from '@/components/Hero';
import { Podium } from '@/components/Podium';
import { StatsStrip } from '@/components/StatsStrip';
import { useLeaderboardStore } from '@/store/leaderboard-context';
import { onMounted } from '@/hooks';

export function LeaderboardPage() {
  const fetchData = useLeaderboardStore((s) => s.fetch);
  const loading = useLeaderboardStore((s) => s.loading);
  onMounted(() => {
    if (loading) void fetchData();
  });

  return (
    <>
      <Hero />
      <noscript>
        <p className="px-5 py-3 text-center text-sm text-zinc-600">
          Enable JavaScript to search the leaderboard.
        </p>
      </noscript>
      <StatsStrip />
      <Podium />
      <AllRanks />
      <Explainer />
    </>
  );
}
