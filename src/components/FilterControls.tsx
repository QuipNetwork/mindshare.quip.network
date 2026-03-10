import { useLeaderboardStore } from '@/store/leaderboard';
import { SearchBar } from './SearchBar';

export function FilterControls() {
  const { searchQuery, setSearchQuery } = useLeaderboardStore();

  return (
    <div>
      <SearchBar
        placeholder="Search by Username"
        value={searchQuery}
        onChange={setSearchQuery}
      />
    </div>
  );
}
