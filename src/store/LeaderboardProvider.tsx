import { useState, type ReactNode } from 'react';
import { createLeaderboardStore, type InitialLeaderboard } from './leaderboard';
import { LeaderboardContext } from './leaderboard-context';

export function LeaderboardProvider({
  initial,
  children,
}: {
  initial: InitialLeaderboard;
  children: ReactNode;
}) {
  const [store] = useState(() => createLeaderboardStore(initial));
  return (
    <LeaderboardContext.Provider value={store}>
      {children}
    </LeaderboardContext.Provider>
  );
}
