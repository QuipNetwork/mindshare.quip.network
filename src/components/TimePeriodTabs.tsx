import { TIME_PERIODS } from '@/lib/types';
import type { TimePeriod } from '@/lib/types';

interface TimePeriodTabsProps {
  active: TimePeriod;
  onChange: (period: TimePeriod) => void;
  disabled?: boolean;
}

export function TimePeriodTabs({
  active,
  onChange,
  disabled,
}: TimePeriodTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TIME_PERIODS.map(({ value, label }) => (
        <button
          key={value}
          className={`btn ${value === active ? 'btn-active' : ''}`}
          onClick={() => onChange(value)}
          disabled={disabled}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
