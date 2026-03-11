import type { LeaderboardEntryMerged } from '@/lib/types';

export async function fetchLeaderboard(): Promise<LeaderboardEntryMerged[]> {
  const response = await fetch('/api/leaderboard');

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(
      (body as { error?: string }).error || `API error: ${response.status}`
    );
  }

  return response.json();
}
