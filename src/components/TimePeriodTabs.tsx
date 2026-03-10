import { TIME_PERIODS } from '@/lib/types';
import { useLeaderboardStore } from '@/store/leaderboard';

export function TimePeriodTabs() {
  const { period, setPeriod, loading } = useLeaderboardStore();

  return (
    <div className="flex flex-wrap gap-2 items-center justify-center">
      {TIME_PERIODS.map(({ value, label }) => (
        <button
          key={value}
          className={`btn ${value === period ? 'btn-active' : ''}`}
          onClick={() => setPeriod(value)}
          disabled={loading}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
