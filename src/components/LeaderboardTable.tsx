import { useLeaderboardStore } from '@/store/leaderboard';
import { LeaderboardRow } from '@/components/LeaderboardRow';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Pagination } from '@/components/Pagination';

export function LeaderboardTable() {
  const store = useLeaderboardStore();
  const { entries, loading, error, sortBy, setSortBy, fetch: refetch } = store;

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (entries.length === 0) {
    return (
      <p className="py-12 text-center text-(--color-scheme-1--text)">
        No leaderboard data available for this period.
      </p>
    );
  }

  const pagedEntries = store.pageEntries();
  const totalPages = store.totalPages();
  const topMindshare = store.topMindshare();

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-(--brand-purple-medium)/30">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-(--brand-purple-medium)/40 text-xs uppercase tracking-wider text-(--color-scheme-1--text)">
              <th
                className="py-3 pl-4 pr-2 text-left font-medium cursor-pointer select-none"
                onClick={() => setSortBy('yearly')}
              >
                Season Rank
                <ArrowDown visible={sortBy === 'yearly'} />
              </th>
              <th className="py-3 px-2 text-left font-medium">User</th>
              <th className="py-3 px-2 pr-8 text-left font-medium">
                Mindshare
              </th>
              <th className="py-3 px-2 text-left font-medium">
                Season Rewards
              </th>
              <th
                className="py-3 px-2 text-left font-medium cursor-pointer select-none"
                onClick={() => setSortBy('weekly')}
              >
                Weekly Rank
                <ArrowDown visible={sortBy === 'weekly'} />
              </th>
            </tr>
          </thead>
          <tbody>
            {pagedEntries.map((entry) => (
              <LeaderboardRow
                key={entry.x_user_id}
                entry={entry}
                topMindshare={topMindshare}
                sortBy={sortBy}
              />
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
}

function ArrowDown({ visible }: { visible: boolean }) {
  if (!visible) return '';
  return <span className="ml-1">&#9660;</span>;
}
