import { create } from 'zustand';
import { fetchLeaderboard } from '@/lib/api';
import type {
  LeaderboardEntryMerged,
  LeaderboardEntryRanked,
} from '@/lib/types';
import { ITEMS_PER_PAGE } from '@/lib/types';
import { calculateRanks } from '@/lib/leaderboard';

export type SortBy = 'yearly' | 'weekly';

interface LeaderboardState {
  entries: LeaderboardEntryMerged[];
  visibleCount: number;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  sortBy: SortBy;
  rankedEntries: () => LeaderboardEntryRanked[];
  pageEntries: () => LeaderboardEntryRanked[];
  topMindshare: () => number;
  totalCount: () => number;
  loadMore: () => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: SortBy) => void;
  fetch: () => Promise<void>;
}

export const useLeaderboardStore = create<LeaderboardState>((set, get) => ({
  entries: [],
  visibleCount: ITEMS_PER_PAGE,
  loading: true,
  error: null,
  searchQuery: '',
  sortBy: 'yearly' as SortBy,

  rankedEntries: () => {
    const { entries, searchQuery, sortBy } = get();
    const ranked = calculateRanks(entries, sortBy);
    if (!searchQuery) return ranked;
    const q = searchQuery.toLowerCase();
    return ranked.filter(
      (e) =>
        e.x_username.toLowerCase().includes(q) ||
        e.x_display_name.toLowerCase().includes(q)
    );
  },

  pageEntries: () => {
    const { rankedEntries, visibleCount } = get();
    return rankedEntries().slice(0, visibleCount);
  },

  totalCount: () => get().rankedEntries().length,

  topMindshare: () => {
    const entries = get().rankedEntries();
    const topMindshare =
      (entries[0]?.mindshare_percent?.yearly ||
        entries[0]?.mindshare_percent?.weekly) ??
      0;
    return topMindshare;
  },

  loadMore: () =>
    set((s) => ({ visibleCount: s.visibleCount + ITEMS_PER_PAGE })),

  setSearchQuery: (query) =>
    set({ searchQuery: query, visibleCount: ITEMS_PER_PAGE }),

  setSortBy: (sortBy) => set({ sortBy, visibleCount: ITEMS_PER_PAGE }),

  fetch: async () => {
    set({ loading: true, error: null });

    try {
      const entries = await fetchLeaderboard();
      set({ entries, loading: false, visibleCount: ITEMS_PER_PAGE });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to load leaderboard';
      set({ error: message, loading: false });
    }
  },
}));
