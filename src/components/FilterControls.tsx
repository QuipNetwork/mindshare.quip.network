import { useLeaderboardStore } from '@/store/leaderboard';
import type { SortBy } from '@/store/leaderboard';
import { SearchBar } from './SearchBar';

export function FilterControls() {
  const { searchQuery, setSearchQuery, sortBy, setSortBy } =
    useLeaderboardStore();

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <SearchBar
          placeholder="Search by Username"
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>
      <ViewToggle value={sortBy} onChange={setSortBy} />
    </div>
  );
}

function ViewToggle({
  value,
  onChange,
}: {
  value: SortBy;
  onChange: (v: SortBy) => void;
}) {
  return (
    <div className="flex h-9 items-center rounded-full border border-(--brand-purple-medium)/30 bg-white/5 p-0.5 text-xs font-medium">
      <button
        onClick={() => onChange('weekly')}
        className={`rounded-full px-3 py-1.5 transition-colors cursor-pointer ${
          value === 'weekly'
            ? 'bg-(--brand-cyan) text-black'
            : 'text-(--color-scheme-1--text) hover:text-white'
        }`}
      >
        Weekly
      </button>
      <button
        onClick={() => onChange('yearly')}
        className={`rounded-full px-3 py-1.5 transition-colors cursor-pointer ${
          value === 'yearly'
            ? 'bg-(--brand-cyan) text-black'
            : 'text-(--color-scheme-1--text) hover:text-white'
        }`}
      >
        Season
      </button>
    </div>
  );
}
