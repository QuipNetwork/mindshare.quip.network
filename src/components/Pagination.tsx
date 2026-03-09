import { useLeaderboardStore } from '@/store/leaderboard';

interface PaginationProps {
  totalPages: number;
}

export function Pagination({ totalPages }: PaginationProps) {
  const { page, setPage } = useLeaderboardStore();

  const pages = buildPageNumbers(page, totalPages);

  return (
    <div className="mt-4 flex items-center justify-center gap-1">
      <button
        className="btn"
        onClick={() => setPage(page - 1)}
        disabled={page <= 1}
      >
        Prev
      </button>

      {pages.map((p, i) =>
        p === null ? (
          <span
            key={`ellipsis-${i}`}
            className="px-2 text-[var(--color-scheme-1--text)]"
          >
            ...
          </span>
        ) : (
          <button
            key={p}
            className={`btn ${p === page ? 'btn-active' : ''}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        )
      )}

      <button
        className="btn"
        onClick={() => setPage(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}

function buildPageNumbers(
  current: number,
  total: number
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
