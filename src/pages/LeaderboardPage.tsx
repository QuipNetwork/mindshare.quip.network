import { AllRanks } from '@/components/AllRanks';
import { Explainer } from '@/components/Explainer';
import { Hero } from '@/components/Hero';
import { Podium } from '@/components/Podium';
import { StatsStrip } from '@/components/StatsStrip';
import { useLeaderboardStore } from '@/store/leaderboard';
import { onMounted } from '@/hooks';

export function LeaderboardPage() {
  const fetchData = useLeaderboardStore((s) => s.fetch);
  onMounted(fetchData);

  return (
    <>
      <Hero />
      <StatsStrip />
      <Podium />
      <AllRanks />
      <Explainer />
    </>
  );
}
