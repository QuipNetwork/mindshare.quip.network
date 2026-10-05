import { createContext, useContext } from 'react';
import { useStore } from 'zustand';
import type { createLeaderboardStore } from './leaderboard';

type LeaderboardStore = ReturnType<typeof createLeaderboardStore>;
type LeaderboardState = ReturnType<LeaderboardStore['getState']>;
export const LeaderboardContext = createContext<LeaderboardStore | null>(null);

export function useLeaderboardStore(): LeaderboardState;
export function useLeaderboardStore<T>(
  selector: (state: LeaderboardState) => T
): T;
export function useLeaderboardStore<T = LeaderboardState>(
  selector: (state: LeaderboardState) => T = ((state) => state) as (
    state: LeaderboardState
  ) => T
) {
  const store = useContext(LeaderboardContext);
  if (!store) throw new Error('LeaderboardProvider is required');
  return useStore(store, selector);
}
