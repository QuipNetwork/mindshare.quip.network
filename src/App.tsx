import { Layout } from '@/components/Layout';
import { LeaderboardPage } from '@/components/LeaderboardPage';
import { Toaster } from 'react-hot-toast';
import { LeaderboardProvider } from './store/LeaderboardProvider';
import type { InitialLeaderboard } from './store/leaderboard';

export default function App({
  initial = {},
}: {
  initial?: InitialLeaderboard;
}) {
  return (
    <LeaderboardProvider initial={initial}>
      <Layout>
        <LeaderboardPage />
      </Layout>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'toast-base',
          error: { className: 'toast-base toast-error' },
        }}
      />
    </LeaderboardProvider>
  );
}
