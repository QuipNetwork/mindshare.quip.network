import clsx from 'clsx';
import { useLeaderboardStore } from '@/store/leaderboard';
import { FollowCta } from './FollowCta';
import { SearchBar } from './SearchBar';

export function FilterControls() {
  const { searchQuery, setSearchQuery, sortBy, setSortBy } =
    useLeaderboardStore();

  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
      <div
        className="inline-flex items-stretch divide-x divide-zinc-200 border border-zinc-200"
        role="group"
        aria-label="Sort"
      >
        <SortButton
          active={sortBy === 'yearly'}
          onClick={() => setSortBy('yearly')}
        >
          Overall
        </SortButton>
        <SortButton
          active={sortBy === 'weekly'}
          onClick={() => setSortBy('weekly')}
        >
          Weekly
        </SortButton>
      </div>
      <FollowCta />
      <SearchBar
        placeholder="Search by username"
        value={searchQuery}
        onChange={setSearchQuery}
      />
    </div>
  );
}

function SortButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'cursor-pointer px-3 pt-2 pb-[7px] font-mono text-xs uppercase tracking-[0.4px] transition-colors duration-150',
        active
          ? 'bg-zinc-950 text-zinc-50'
          : 'bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950'
      )}
    >
      {children}
    </button>
  );
}
