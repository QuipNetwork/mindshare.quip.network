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
  page: number;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  sortBy: SortBy;
  filteredEntries: () => LeaderboardEntryMerged[];
  rankedEntries: () => LeaderboardEntryRanked[];
  pageEntries: () => LeaderboardEntryRanked[];
  topMindshare: () => number;
  totalPages: () => number;
  setPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: SortBy) => void;
  fetch: () => Promise<void>;
}

export const useLeaderboardStore = create<LeaderboardState>((set, get) => ({
  entries: [],
  page: 1,
  loading: false,
  error: null,
  searchQuery: '',
  sortBy: 'yearly' as SortBy,

  filteredEntries: () => {
    const { entries, searchQuery } = get();
    if (!searchQuery) return entries;
    const q = searchQuery.toLowerCase();
    return entries.filter(
      (e) =>
        e.x_username.toLowerCase().includes(q) ||
        e.x_display_name.toLowerCase().includes(q)
    );
  },

  rankedEntries: () => {
    return calculateRanks(get().filteredEntries(), get().sortBy);
  },

  pageEntries: () => {
    const { rankedEntries, page } = get();
    const entries = rankedEntries();
    const start = (page - 1) * ITEMS_PER_PAGE;
    return entries.slice(start, start + ITEMS_PER_PAGE);
  },

  totalPages: () => {
    const { filteredEntries } = get();
    return Math.ceil(filteredEntries().length / ITEMS_PER_PAGE);
  },

  topMindshare: () => {
    const entries = get().rankedEntries();
    const period = get().sortBy;
    const topMindshare =
      (entries[0]?.mindshare_percent?.[period] ||
        entries[0]?.mindshare_percent?.yearly) ??
      0;
    return topMindshare;
  },

  setPage: (page) => set({ page }),

  setSearchQuery: (query) => set({ searchQuery: query, page: 1 }),

  setSortBy: (sortBy) => set({ sortBy, page: 1 }),

  fetch: async () => {
    set({ loading: true, error: null });

    try {
      const entries = await fetchLeaderboard();
      set({ entries, loading: false, page: 1 });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to load leaderboard';
      set({ error: message, loading: false });
    }
  },
}));
