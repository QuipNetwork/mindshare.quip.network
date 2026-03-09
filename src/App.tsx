import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { TimePeriodTabs } from '@/components/TimePeriodTabs';
import { FilterControls } from '@/components/FilterControls';
import { LeaderboardTable } from '@/components/LeaderboardTable';
import { RewardTiers } from '@/components/RewardTiers';
import { useLeaderboardStore } from '@/store/leaderboard';

function LeaderboardPage() {
  const { period, setPeriod, loading, fetch: fetchData } =
    useLeaderboardStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Hero />
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TimePeriodTabs
          active={period}
          onChange={setPeriod}
          disabled={loading}
        />
      </div>
      <FilterControls />
      <LeaderboardTable />
      <RewardTiers />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="*" element={<LeaderboardPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
