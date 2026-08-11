import clsx from 'clsx';
import { useLeaderboardStore } from '@/store/leaderboard';
import { LeaderboardRow } from '@/components/LeaderboardRow';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { LoadMore } from '@/components/Pagination';

export function LeaderboardTable() {
  const store = useLeaderboardStore();
  const { entries, loading, error, sortBy, setSortBy, fetch: refetch } = store;

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (entries.length === 0) {
    return (
      <p className="py-12 text-center font-mono text-xs uppercase tracking-[0.4px] text-zinc-500">
        No leaderboard data available.
      </p>
    );
  }

  const pagedEntries = store.pageEntries();
  const topMindshare = store.topMindshare();

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse border-t border-zinc-200">
          <colgroup>
            <col className="w-[100px]" />
            <col className="w-[200px]" />
            <col className="w-[150px]" />
            <col className="w-[90px]" />
            <col className="w-[90px]" />
          </colgroup>
          <thead>
            <tr className="border-b border-zinc-200">
              <SortableTh
                active={sortBy === 'yearly'}
                onClick={() => setSortBy('yearly')}
                className="pl-1"
              >
                Season Rank
              </SortableTh>
              <Th>User</Th>
              <Th>Mindshare</Th>
              <SortableTh
                active={sortBy === 'weekly'}
                onClick={() => setSortBy('weekly')}
              >
                Weekly
              </SortableTh>
              <Th align="right" className="pr-1">
                Reward
              </Th>
            </tr>
          </thead>
          <tbody>
            {pagedEntries.map((entry) => (
              <LeaderboardRow
                key={entry.x_user_id}
                entry={entry}
                topMindshare={topMindshare}
              />
            ))}
          </tbody>
        </table>
      </div>
      <LoadMore />
    </div>
  );
}

function Th({
  children,
  align = 'left',
  className,
}: {
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}) {
  return (
    <th
      className={clsx(
        'select-none whitespace-nowrap px-3 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.4px] text-zinc-500',
        align === 'right' ? 'text-right' : 'text-left',
        className
      )}
    >
      {children}
    </th>
  );
}

function SortableTh({
  active,
  onClick,
  children,
  className,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      onClick={onClick}
      className={clsx(
        'cursor-pointer select-none whitespace-nowrap px-3 py-3.5 text-left font-mono text-[11px] font-medium uppercase tracking-[0.4px] transition-colors duration-150',
        active ? 'text-zinc-950' : 'text-zinc-500 hover:text-zinc-950',
        className
      )}
    >
      {children}
      {active && <span className="ml-1 inline-block text-[8px]">▼</span>}
    </th>
  );
}
