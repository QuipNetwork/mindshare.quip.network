import { useLeaderboardStore } from '@/store/leaderboard-context';
import { OutlineButton } from './OutlineButton';

export function LoadMore() {
  const { visibleCount, totalCount, loadMore } = useLeaderboardStore();
  const total = totalCount();
  const shown = Math.min(visibleCount, total);
  const hasMore = shown < total;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-1 pt-6 font-mono text-xs uppercase tracking-[0.4px] text-zinc-500">
      <span>
        Showing {shown.toLocaleString()} of {total.toLocaleString()}
      </span>
      {hasMore && <OutlineButton onClick={loadMore}>Load more</OutlineButton>}
    </div>
  );
}
