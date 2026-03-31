import { useLeaderboardStore } from '@/store/leaderboard';
import { LeaderboardRow } from '@/components/LeaderboardRow';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Pagination } from '@/components/Pagination';

const TH =
  'py-3.5 px-4 text-right text-[11px] font-semibold uppercase tracking-[1px] text-text-muted transition-opacity duration-250';

export function LeaderboardTable() {
  const store = useLeaderboardStore();
  const { entries, loading, error, sortBy, fetch: refetch } = store;

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (entries.length === 0) {
    return (
      <p className="py-12 text-center text-text">
        No leaderboard data available for this period.
      </p>
    );
  }

  const pagedEntries = store.pageEntries();
  const totalPages = store.totalPages();
  const topMindshare = store.topMindshare();

  const dimSeason = sortBy !== 'yearly';
  const dimWeekly = sortBy !== 'weekly';
  const dimDaily = sortBy !== 'daily';

  console.log('!!!!', entries);

  return (
    <div>
      <div className="animate-fade-up delay-[250ms] overflow-hidden rounded-2xl border border-white/6 bg-white/3">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] border-collapse">
            <thead>
              <tr className="border-b border-white/6 bg-white/[0.015]">
                <th className="py-3.5 pl-5 pr-4 text-left text-[11px] font-semibold uppercase tracking-[1px] text-text-muted">
                  User
                </th>
                <th className="py-3.5 px-4 text-left text-[11px] font-semibold uppercase tracking-[1px] text-text-muted">
                  Mindshare
                </th>
                <th
                  className={`${TH} ${dimSeason ? 'opacity-40' : 'opacity-100'}`}
                >
                  Season Rank
                </th>
                <th
                  className={`${TH} ${dimWeekly ? 'opacity-40' : 'opacity-100'}`}
                >
                  Weekly Rank
                </th>
                <th
                  className={`${TH} ${dimDaily ? 'opacity-40' : 'opacity-100'}`}
                >
                  Daily Rank
                </th>
              </tr>
            </thead>
            <tbody>
              {pagedEntries.map((entry, index) => (
                <LeaderboardRow
                  key={entry.x_user_id}
                  entry={entry}
                  topMindshare={topMindshare}
                  isFirst={index === 0 && store.page === 1}
                  sortBy={sortBy}
                  dimSeason={dimSeason}
                  dimWeekly={dimWeekly}
                  dimDaily={dimDaily}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
}
