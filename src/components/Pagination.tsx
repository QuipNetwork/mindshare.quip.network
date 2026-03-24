import { useLeaderboardStore } from '@/store/leaderboard';

interface PaginationProps {
  totalPages: number;
}

const BTN =
  'cursor-pointer rounded-lg border border-white/6 bg-white/3 px-3.5 py-1.5 text-sm font-medium text-text-muted transition-all duration-150 hover:bg-white/6 hover:text-text-primary';
const BTN_ACTIVE =
  'cursor-pointer rounded-lg border border-cyan/20 bg-cyan/10 px-3.5 py-1.5 text-sm font-medium text-cyan shadow-[0_0_12px_rgba(0,212,255,0.1)]';

export function Pagination({ totalPages }: PaginationProps) {
  const { page, setPage } = useLeaderboardStore();

  const pages = buildPageNumbers(page, totalPages);

  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-1">
      {page > 1 && (
        <button className={BTN} onClick={() => setPage(page - 1)}>
          Prev
        </button>
      )}

      {pages.map((p, i) =>
        p === null ? (
          <span key={`ellipsis-${i}`} className="px-2 text-text-muted">
            ...
          </span>
        ) : (
          <button
            key={p}
            className={p === page ? BTN_ACTIVE : BTN}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ),
      )}

      {page < totalPages && (
        <button className={BTN} onClick={() => setPage(page + 1)}>
          Next
        </button>
      )}
    </div>
  );
}

function buildPageNumbers(
  current: number,
  total: number,
): Array<number | null> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: Array<number | null> = [1];

  if (current > 3) pages.push(null);

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push(null);

  pages.push(total);
  return pages;
}
