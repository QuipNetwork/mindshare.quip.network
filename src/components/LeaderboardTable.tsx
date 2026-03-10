import { useLeaderboardStore } from '@/store/leaderboard';
import { ITEMS_PER_PAGE } from '@/lib/types';
import { LeaderboardRow } from '@/components/LeaderboardRow';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Pagination } from '@/components/Pagination';

export function LeaderboardTable() {
  const store = useLeaderboardStore();
  const { entries, page, loading, error, fetch: refetch } = store;

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (entries.length === 0) {
    return (
      <p className="py-12 text-center text-(--color-scheme-1--text)">
        No leaderboard data available for this period.
      </p>
    );
  }

  const filtered = store.filteredEntries();
  const pageEntries = store.pageEntries();
  const totalPages = store.totalPages();
  const start = (page - 1) * ITEMS_PER_PAGE;
  const topMindshare = filtered[0]?.mindshare_percent ?? 0;

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-(--brand-purple-medium)/30">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-(--brand-purple-medium)/40 text-xs uppercase tracking-wider text-(--color-scheme-1--text)">
              <th className="py-3 pl-4 pr-2 text-center font-medium">Rank</th>
              <th className="py-3 px-2 text-left font-medium">User</th>
              <th className="py-3 px-2 text-right font-medium">Mindshare</th>
              <th className="py-3 px-2 text-right font-medium">Quip Points (Weekly)</th>
              <th className="py-3 pl-2 pr-4 text-right font-medium">$QUIP (Season 1)</th>
            </tr>
          </thead>
          <tbody>
            {pageEntries.map((entry, i) => (
              <LeaderboardRow
                key={entry.x_user_id}
                entry={entry}
                rank={start + i + 1}
                topMindshare={topMindshare}
              />
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
}
