import { create } from 'zustand';
import { fetchLeaderboard } from '@/lib/api';
import type { TimePeriod, LeaderboardEntry } from '@/lib/types';

interface LeaderboardState {
  entries: LeaderboardEntry[];
  period: TimePeriod;
  page: number;
  loading: boolean;
  error: string | null;
  privateIds: string;
  excludedIds: string;
  setPeriod: (period: TimePeriod) => void;
  setPage: (page: number) => void;
  setPrivateIds: (ids: string) => void;
  setExcludedIds: (ids: string) => void;
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

  setPeriod: (period) => {
    set({ period, page: 1 });
    get().fetch();
  },

  setPage: (page) => set({ page }),

  setPrivateIds: (ids) => set({ privateIds: ids }),

  setExcludedIds: (ids) => set({ excludedIds: ids }),

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
