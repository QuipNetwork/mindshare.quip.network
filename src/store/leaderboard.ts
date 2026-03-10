import { create } from 'zustand';
import { fetchLeaderboard } from '@/lib/api';
import type { TimePeriod, LeaderboardEntry } from '@/lib/types';
import { ITEMS_PER_PAGE } from '@/lib/types';

interface LeaderboardState {
  entries: LeaderboardEntry[];
  period: TimePeriod;
  page: number;
  loading: boolean;
  error: string | null;
  privateIds: string;
  excludedIds: string;
  searchQuery: string;
  filteredEntries: () => LeaderboardEntry[];
  pageEntries: () => LeaderboardEntry[];
  totalPages: () => number;
  setPeriod: (period: TimePeriod) => void;
  setPage: (page: number) => void;
  setPrivateIds: (ids: string) => void;
  setExcludedIds: (ids: string) => void;
  setSearchQuery: (query: string) => void;
  fetch: () => Promise<void>;
}

export const useLeaderboardStore = create<LeaderboardState>((set, get) => ({
  entries: [],
  period: 7,
  page: 1,
  loading: false,
  error: null,
  privateIds: '',
  excludedIds: '',
  searchQuery: '',

  filteredEntries: () => {
    const { entries, searchQuery } = get();
    if (!searchQuery) return entries;
    const q = searchQuery.toLowerCase();
    return entries.filter(
      (e) =>
        e.x_username.toLowerCase().includes(q) ||
        e.x_display_name.toLowerCase().includes(q),
    );
  },

  pageEntries: () => {
    const { filteredEntries, page } = get();
    const filtered = filteredEntries();
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  },

  totalPages: () => {
    const { filteredEntries } = get();
    return Math.ceil(filteredEntries().length / ITEMS_PER_PAGE);
  },

  setPeriod: (period) => {
    set({ period, page: 1 });
    get().fetch();
  },

  setPage: (page) => set({ page }),

  setPrivateIds: (ids) => set({ privateIds: ids }),

  setExcludedIds: (ids) => set({ excludedIds: ids }),

  setSearchQuery: (query) => set({ searchQuery: query, page: 1 }),

  fetch: async () => {
    const { period, privateIds, excludedIds } = get();
    set({ loading: true, error: null });

    try {
      const entries = await fetchLeaderboard({
        period,
        privateIds: privateIds || undefined,
        excludedIds: excludedIds || undefined,
      });
      set({ entries, loading: false, page: 1 });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to load leaderboard';
      set({ error: message, loading: false });
    }
  },
}));
