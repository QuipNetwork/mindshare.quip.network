import { useLeaderboardStore } from '@/store/leaderboard';
import { SearchBar } from './SearchBar';

export function FilterControls() {
  const { searchQuery, setSearchQuery, sortBy, setSortBy } =
    useLeaderboardStore();

  return (
    <div className="animate-fade-up delay-200 mb-5 flex flex-wrap items-center justify-between gap-3">
      <div className="inline-flex rounded-[10px] border border-white/6 bg-white/4 p-[3px]">
        <ToggleButton
          active={sortBy === 'yearly'}
          onClick={() => setSortBy('yearly')}
        >
          Season
        </ToggleButton>
        <ToggleButton
          active={sortBy === 'weekly'}
          onClick={() => setSortBy('weekly')}
        >
          Weekly
        </ToggleButton>
      </div>

      <SearchBar
        placeholder="Search by username..."
        value={searchQuery}
        onChange={setSearchQuery}
      />
    </div>
  );
}

function ToggleButton({
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
      className={`relative z-1 cursor-pointer rounded-lg border-none px-5 py-2 font-inherit text-[13px] font-semibold transition-all duration-250 ${
        active
          ? 'bg-white/10 text-white shadow-[0_1px_6px_rgba(0,0,0,0.4)]'
          : 'bg-transparent text-text-muted hover:text-text'
      }`}
    >
      {children}
    </button>
  );
}
