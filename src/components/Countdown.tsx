import { useState, useEffect } from 'react';

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeRemaining(target: Date): CountdownValues {
  const diff = Math.max(0, target.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function useCountdown(getTarget: () => Date): CountdownValues {
  const [target, setTarget] = useState(getTarget);
  const [remaining, setRemaining] = useState(() => computeRemaining(target));

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      if (now >= target.getTime()) {
        setTarget(getTarget());
      }
      setRemaining(computeRemaining(target));
    };

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target, getTarget]);

  return remaining;
}

function getNextWave(): Date {
  const now = new Date();
  const dayOfWeek = now.getUTCDay();
  const daysUntilMonday = (1 - dayOfWeek + 7) % 7;

  const candidate = new Date(now);
  candidate.setUTCDate(now.getUTCDate() + daysUntilMonday);
  candidate.setUTCHours(13, 0, 0, 0);

  if (candidate <= now) {
    candidate.setUTCDate(candidate.getUTCDate() + 7);
  }

  return candidate;
}

export function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(getNextWave);

  return (
    <div className="mt-5">
      <p className="mb-2 text-xs uppercase tracking-widest text-(--color-scheme-1--text)">
        Next point wave in
      </p>
      <div className="inline-flex gap-3">
        <TimeUnit value={days} label="Days" />
        <TimeUnit value={hours} label="Hrs" />
        <TimeUnit value={minutes} label="Min" />
        <TimeUnit value={seconds} label="Sec" />
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-(--brand-purple-medium)/30 bg-(--brand-purple-dark)/40 px-3 py-2 min-w-14">
      <span className="text-2xl font-bold tabular-nums text-white">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[0.65rem] uppercase tracking-wider text-(--color-scheme-1--text)">
        {label}
      </span>
    </div>
  );
}
